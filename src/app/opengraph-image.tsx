import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — Belleza, bienestar y formación`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#153B2A",
          color: "#FAFAF6",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 999,
            border: "1px solid rgba(199,166,106,0.35)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -40,
            top: -80,
            width: 360,
            height: 360,
            borderRadius: 999,
            border: "1px solid rgba(250,250,246,0.12)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              border: "1px solid rgba(250,250,246,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E4C98F",
              fontFamily: "Georgia, serif",
              fontSize: 18,
            }}
          >
            SVB
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 26 }}>
              Salud Vida
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(250,250,246,0.5)",
              }}
            >
              &amp; Bienestar
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#E4C98F",
            }}
          >
            Belleza · Bienestar · Formación
          </span>
          <span
            style={{
              marginTop: 22,
              fontFamily: "Georgia, serif",
              fontSize: 74,
              lineHeight: 1.03,
              letterSpacing: -2,
            }}
          >
            Tu belleza, tu bienestar,
            <br />
            <span style={{ color: "#E4C98F", fontStyle: "italic" }}>
              tu mejor versión.
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(250,250,246,0.12)",
            paddingTop: 22,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(250,250,246,0.4)",
          }}
        >
          <span>Experiencia demostrativa</span>
          <span>{siteConfig.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
