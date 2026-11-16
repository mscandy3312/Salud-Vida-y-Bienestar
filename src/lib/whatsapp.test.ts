import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/config";
import { whatsappUrl } from "@/lib/whatsapp";

describe("WhatsApp destination", () => {
  it("always targets the business number, not a stale environment fallback", () => {
    expect(siteConfig.contact.whatsapp.number).toBe("5215533548607");
    expect(whatsappUrl("pedido")).toBe(
      "https://wa.me/5215533548607?text=pedido",
    );
  });
});
