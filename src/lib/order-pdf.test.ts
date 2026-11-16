import { describe, expect, it } from "vitest";
import { createOrderPdf } from "@/lib/order-pdf";

describe("order PDF", () => {
  it("includes ordered quantities, product prices, and the subtotal", () => {
    const pdf = createOrderPdf({
      name: "Ana Pérez",
      phone: "5512345678",
      email: "",
      deliveryMethod: "pickup",
      address: "",
      notes: "",
      items: [{ name: "Crema facial", quantity: 2, price: 125 }],
      subtotal: 250,
    });

    const content = pdf.output();
    expect(content).toContain("Art");
    expect(content).toContain("2 × Crema facial");
    expect(content).toContain("Precio unitario:");
    expect(content).toContain("Importe:");
    expect(content).toContain("250");
  });
});
