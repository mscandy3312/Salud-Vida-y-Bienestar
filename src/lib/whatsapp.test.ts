import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/config";
import { cartInquiryMessage, whatsappUrl } from "@/lib/whatsapp";

describe("WhatsApp destination", () => {
  it("always targets the business number, not a stale environment fallback", () => {
    expect(siteConfig.contact.whatsapp.number).toBe("5215533548607");
    expect(whatsappUrl("pedido")).toBe(
      "https://wa.me/5215533548607?text=pedido",
    );
  });

  it("sends cart products, quantities, and totals as valid JSON", () => {
    const message = cartInquiryMessage([
      { name: "Crema facial", quantity: 2, price: 19.95 },
      { name: "Suero", quantity: 1, price: 100 },
    ]);
    const order = JSON.parse(message.slice(message.indexOf("{")));

    expect(order.articulos).toEqual([
      {
        producto: "Crema facial",
        cantidad: 2,
        precio_unitario_centavos: 1995,
        importe_centavos: 3990,
      },
      {
        producto: "Suero",
        cantidad: 1,
        precio_unitario_centavos: 10000,
        importe_centavos: 10000,
      },
    ]);
    expect(order.subtotal_centavos).toBe(13990);
    expect(order.unidad_importes).toBe("centavos");
  });
});
