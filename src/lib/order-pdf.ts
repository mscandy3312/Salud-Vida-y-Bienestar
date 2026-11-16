import { jsPDF } from "jspdf";
import { siteConfig } from "@/lib/config";
import { formatMXN, multiplyCents, toCents } from "@/lib/money";

export interface OrderPdfData {
  name: string;
  phone: string;
  email: string;
  deliveryMethod: "pickup" | "delivery";
  address: string;
  notes: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
}

export function createOrderPdf(order: OrderPdfData) {
  const document = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  let y = 22;

  function addText(
    text: string,
    options: { size?: number; bold?: boolean; color?: [number, number, number] } = {},
  ) {
    const { size = 10, bold = false, color = [47, 68, 51] } = options;
    const lines = document.splitTextToSize(text, contentWidth) as string[];
    const lineHeight = size * 0.5;

    if (y + lines.length * lineHeight > 278) {
      document.addPage();
      y = 20;
    }

    document.setFont("helvetica", bold ? "bold" : "normal");
    document.setFontSize(size);
    document.setTextColor(...color);
    document.text(lines, margin, y);
    y += lines.length * lineHeight;
  }

  addText(siteConfig.name, { size: 18, bold: true });
  y += 3;
  addText("Solicitud de pedido", { size: 13, bold: true });
  addText(
    `Fecha: ${new Intl.DateTimeFormat("es-MX", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date())}`,
    { size: 9, color: [105, 105, 105] },
  );
  y += 5;

  addText("Datos de contacto", { size: 11, bold: true });
  addText(`Nombre: ${order.name}`);
  addText(`Teléfono: ${order.phone}`);
  if (order.email) addText(`Correo: ${order.email}`);
  addText(
    `Entrega: ${order.deliveryMethod === "delivery" ? "Envío a domicilio" : "Recoger en tienda"}`,
  );
  if (order.deliveryMethod === "delivery") addText(`Dirección: ${order.address}`);
  if (order.notes) addText(`Notas: ${order.notes}`);
  y += 5;

  addText("Artículos y cantidades", { size: 11, bold: true });
  y += 2;
  for (const item of order.items) {
    const unitPrice = toCents(item.price);
    const lineTotal = multiplyCents(unitPrice, item.quantity);
    addText(`${item.quantity} × ${item.name}`, { bold: true });
    addText(
      `Precio unitario: ${formatMXN(unitPrice)}  |  Importe: ${formatMXN(lineTotal)}`,
      { size: 9, color: [105, 105, 105] },
    );
    y += 2;
  }

  y += 3;
  addText(`Subtotal: ${formatMXN(toCents(order.subtotal))}`, {
    size: 12,
    bold: true,
  });
  addText("Envío: por confirmar", { size: 10 });
  y += 3;
  addText("Estado: solicitud pendiente de confirmación de pago.", {
    size: 9,
    color: [105, 105, 105],
  });

  return document;
}

export function downloadOrderPdf(order: OrderPdfData) {
  const filename = `pedido-salud-vida-y-bienestar-${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;
  createOrderPdf(order).save(filename);
}
