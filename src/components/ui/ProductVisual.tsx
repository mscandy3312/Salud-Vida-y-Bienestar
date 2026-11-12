import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

interface ProductVisualProps {
  product: Product;
  className?: string;
  view?: 0 | 1 | 2;
}

function ProductLabel({
  deep,
  x,
  y,
  width,
  height,
}: {
  deep: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const center = x + width / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        fill="#FAFAF6"
        opacity="0.94"
      />
      <text
        x={center}
        y={y + height * 0.38}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize={Math.min(20, height * 0.24)}
        letterSpacing="3"
        fill={deep}
      >
        SVB
      </text>
      <line
        x1={center - width * 0.22}
        x2={center + width * 0.22}
        y1={y + height * 0.52}
        y2={y + height * 0.52}
        stroke={deep}
        opacity="0.45"
        strokeWidth="0.7"
      />
      <text
        x={center}
        y={y + height * 0.68}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={5.4}
        letterSpacing="1.6"
        fill={deep}
        opacity="0.75"
      >
        SALUD VIDA
      </text>
      <text
        x={center}
        y={y + height * 0.82}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={4.6}
        letterSpacing="1.2"
        fill={deep}
        opacity="0.5"
      >
        DEMO
      </text>
    </g>
  );
}

export function ProductVisual({ product, className, view = 0 }: ProductVisualProps) {
  const palette = product.palette;
  const prefix = `pv-${product.slug}-${view}`;
  const scale = [1, 1.09, 0.98][view] ?? 1;
  const rotate = [0, -3, 3][view] ?? 0;
  const shiftY = [0, 12, -4][view] ?? 0;
  const isTool = product.shape === "tool";

  function renderTool() {
    if (product.slug.includes("gua")) {
      return (
        <g>
          <path
            d="M128 252C110 318 158 392 232 384C302 376 324 312 298 252C282 300 244 332 200 328C166 324 142 292 128 252Z"
            fill={`url(#${prefix}-body)`}
            stroke={palette.accent}
            strokeWidth="1.2"
          />
          <path
            d="M150 286C144 326 174 358 214 362"
            stroke="#FFFFFF"
            strokeOpacity="0.28"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="215" cy="242" r="5" fill={palette.deep} opacity="0.5" />
        </g>
      );
    }

    if (product.slug.includes("rodillo")) {
      return (
        <g>
          <rect
            x="186"
            y="212"
            width="28"
            height="170"
            rx="14"
            fill={palette.deep}
          />
          <rect
            x="192"
            y="222"
            width="7"
            height="138"
            rx="3.5"
            fill="#FFFFFF"
            opacity="0.18"
          />
          <rect x="190" y="196" width="20" height="26" rx="4" fill={palette.accent} />
          <ellipse
            cx="200"
            cy="180"
            rx="78"
            ry="34"
            fill={`url(#${prefix}-body)`}
            stroke={palette.accent}
            strokeWidth="1"
          />
          <ellipse cx="200" cy="180" rx="58" ry="20" fill="#FFFFFF" opacity="0.16" />
        </g>
      );
    }

    if (product.slug.includes("neceser")) {
      return (
        <g>
          <rect
            x="116"
            y="228"
            width="168"
            height="142"
            rx="28"
            fill={`url(#${prefix}-body)`}
          />
          <line
            x1="128"
            y1="266"
            x2="272"
            y2="266"
            stroke={palette.accent}
            strokeWidth="2.5"
          />
          <circle cx="270" cy="266" r="7" fill={palette.accent} />
          <path
            d="M126 292C160 308 240 308 274 292"
            stroke="#FFFFFF"
            strokeOpacity="0.18"
            strokeWidth="5"
            fill="none"
          />
          <text
            x="200"
            y="340"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="15"
            letterSpacing="3"
            fill="#FAFAF6"
            opacity="0.8"
          >
            SVB
          </text>
        </g>
      );
    }

    return (
      <g transform="rotate(-18 200 290)">
        <rect x="188" y="118" width="24" height="212" rx="12" fill={palette.deep} />
        <rect x="194" y="132" width="6" height="150" rx="3" fill="#FFFFFF" opacity="0.16" />
        <rect x="176" y="316" width="48" height="36" rx="5" fill={palette.accent} />
        <path
          d="M172 350C176 404 224 404 228 350Z"
          fill={palette.deep}
          opacity="0.92"
        />
        <path
          d="M184 360C186 388 196 396 200 398"
          stroke="#FFFFFF"
          strokeOpacity="0.2"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Representación ilustrativa del producto ${product.name}`}
      className={cn(
        "grain relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem]",
        className,
      )}
      style={{
        background: `linear-gradient(152deg, #FAFAF6 0%, ${palette.base} 52%, #F6F1E7 100%)`,
      }}
    >
      <div
        className="absolute -right-12 top-4 h-48 w-48 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: palette.accent }}
      />
      <div
        className="absolute -left-16 bottom-0 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: palette.deep }}
      />
      <svg
        viewBox="0 0 400 480"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${prefix}-body`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.deep} />
            <stop offset="58%" stopColor={palette.deep} stopOpacity="0.92" />
            <stop offset="100%" stopColor={palette.deep} stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id={`${prefix}-shine`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${prefix}-halo`} cx="50%" cy="46%" r="58%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="400" height="480" fill={`url(#${prefix}-halo)`} />
        <circle
          cx="200"
          cy="238"
          r={128 + view * 9}
          fill="none"
          stroke={palette.deep}
          strokeOpacity="0.1"
        />
        <circle
          cx="200"
          cy="238"
          r={98 + view * 6}
          fill="none"
          stroke={palette.accent}
          strokeOpacity="0.24"
        />
        <path
          d="M318 122C306 106 298 86 298 64C316 76 326 96 318 122Z"
          fill="none"
          stroke={palette.deep}
          strokeOpacity="0.18"
        />
        <path
          d="M306 142C326 118 342 92 350 60"
          fill="none"
          stroke={palette.deep}
          strokeOpacity="0.12"
        />
        <path
          d="M74 402C90 386 100 366 102 344"
          fill="none"
          stroke={palette.deep}
          strokeOpacity="0.14"
        />
        <rect
          x="14"
          y="14"
          width="372"
          height="452"
          rx="10"
          fill="none"
          stroke={palette.deep}
          strokeOpacity="0.08"
        />

        <ellipse cx="200" cy="424" rx="88" ry="13" fill={palette.deep} opacity="0.12" />

        <g
          transform={`translate(200 290) rotate(${rotate}) scale(${scale}) translate(-200 -290) translate(0 ${shiftY})`}
        >
          {product.shape === "bottle" ? (
            <g>
              <rect x="178" y="136" width="44" height="40" fill={palette.deep} opacity="0.9" />
              <rect x="170" y="112" width="60" height="30" rx="7" fill={palette.accent} />
              <rect
                x="140"
                y="168"
                width="120"
                height="232"
                rx="26"
                fill={`url(#${prefix}-body)`}
              />
              <rect x="152" y="184" width="12" height="196" rx="6" fill={`url(#${prefix}-shine)`} />
              <ProductLabel
                deep={palette.deep}
                x={157}
                y={244}
                width={86}
                height={100}
              />
            </g>
          ) : null}

          {product.shape === "dropper" ? (
            <g>
              <rect x="178" y="150" width="44" height="40" fill={palette.deep} opacity="0.9" />
              <rect x="176" y="128" width="48" height="26" rx="5" fill={palette.accent} />
              <rect x="184" y="104" width="32" height="28" rx="14" fill={palette.deep} />
              <rect
                x="145"
                y="186"
                width="110"
                height="206"
                rx="24"
                fill={`url(#${prefix}-body)`}
              />
              <rect x="157" y="202" width="11" height="172" rx="5.5" fill={`url(#${prefix}-shine)`} />
              <ProductLabel
                deep={palette.deep}
                x={161}
                y={248}
                width={78}
                height={96}
              />
            </g>
          ) : null}

          {product.shape === "jar" ? (
            <g>
              <rect x="108" y="202" width="184" height="50" rx="16" fill={palette.accent} />
              <rect x="118" y="244" width="164" height="152" rx="28" fill={`url(#${prefix}-body)`} />
              <rect x="130" y="262" width="12" height="118" rx="6" fill={`url(#${prefix}-shine)`} />
              <ProductLabel
                deep={palette.deep}
                x={148}
                y={282}
                width={104}
                height={82}
              />
            </g>
          ) : null}

          {product.shape === "tube" ? (
            <g>
              <path
                d="M150 196C150 164 170 148 200 148C230 148 250 164 250 196L250 382C250 398 238 408 222 408L178 408C162 408 150 398 150 382Z"
                fill={`url(#${prefix}-body)`}
              />
              <rect x="162" y="382" width="76" height="30" rx="7" fill={palette.accent} />
              <rect x="162" y="212" width="11" height="144" rx="5.5" fill={`url(#${prefix}-shine)`} />
              <ProductLabel
                deep={palette.deep}
                x={164}
                y={250}
                width={72}
                height={92}
              />
            </g>
          ) : null}

          {product.shape === "flask" ? (
            <g>
              <rect x="124" y="252" width="152" height="48" rx="24" fill={palette.deep} opacity="0.35" />
              <rect x="112" y="272" width="176" height="98" rx="34" fill={`url(#${prefix}-body)`} />
              <rect x="128" y="286" width="14" height="66" rx="7" fill={`url(#${prefix}-shine)`} />
              <text
                x="200"
                y="328"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="20"
                letterSpacing="4"
                fill="#FAFAF6"
                opacity="0.85"
              >
                SVB
              </text>
            </g>
          ) : null}

          {product.shape === "compact" ? (
            <g>
              <rect x="108" y="236" width="184" height="150" rx="18" fill={`url(#${prefix}-body)`} />
              <rect
                x="120"
                y="248"
                width="160"
                height="126"
                rx="12"
                fill="#FAFAF6"
                opacity="0.92"
              />
              {[
                "#6E4736",
                "#A76F58",
                "#C7A66A",
                "#9A5A5F",
                "#7B8270",
                "#D7B98A",
              ].map((color, index) => (
                <circle
                  key={color}
                  cx={150 + (index % 3) * 50}
                  cy={282 + Math.floor(index / 3) * 46}
                  r="18"
                  fill={color}
                />
              ))}
              <text
                x="200"
                y="374"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="9"
                letterSpacing="3"
                fill={palette.deep}
                opacity="0.8"
              >
                SVB · DEMO
              </text>
            </g>
          ) : null}

          {product.shape === "sachet" ? (
            <g>
              <rect
                x="150"
                y="176"
                width="100"
                height="232"
                rx="12"
                fill={`url(#${prefix}-body)`}
              />
              <path
                d="M150 176 L150 166 L158 156 L166 166 L174 156 L182 166 L190 156 L198 166 L206 156 L214 166 L222 156 L230 166 L238 156 L246 166 L250 176 Z"
                fill={`url(#${prefix}-body)`}
              />
              <rect
                x="150"
                y="192"
                width="100"
                height="8"
                fill={palette.accent}
                opacity="0.55"
              />
              <rect
                x="160"
                y="204"
                width="9"
                height="168"
                rx="4.5"
                fill={`url(#${prefix}-shine)`}
              />
              <ProductLabel
                deep={palette.deep}
                x={165}
                y={228}
                width={70}
                height={126}
              />
            </g>
          ) : null}

          {product.shape === "tub" ? (
            <g>
              <rect x="112" y="196" width="176" height="46" rx="14" fill={palette.accent} />
              <rect x="122" y="234" width="156" height="18" rx="9" fill={palette.deep} opacity="0.32" />
              <rect
                x="120"
                y="248"
                width="160"
                height="156"
                rx="26"
                fill={`url(#${prefix}-body)`}
              />
              <rect
                x="134"
                y="268"
                width="12"
                height="118"
                rx="6"
                fill={`url(#${prefix}-shine)`}
              />
              <ProductLabel
                deep={palette.deep}
                x={150}
                y={288}
                width={100}
                height={94}
              />
            </g>
          ) : null}

          {product.shape === "capsules" ? (
            <g>
              <rect x="156" y="128" width="88" height="42" rx="9" fill={palette.accent} />
              <rect
                x="150"
                y="164"
                width="100"
                height="240"
                rx="24"
                fill={`url(#${prefix}-body)`}
              />
              <rect
                x="162"
                y="182"
                width="11"
                height="200"
                rx="5.5"
                fill={`url(#${prefix}-shine)`}
              />
              <rect
                x="168"
                y="232"
                width="64"
                height="132"
                rx="14"
                fill="#FAFAF6"
                opacity="0.94"
              />
              {[
                { x: 188, y: 268 },
                { x: 212, y: 268 },
                { x: 188, y: 320 },
                { x: 212, y: 320 },
              ].map((capsule) => (
                <g
                  key={`${capsule.x}-${capsule.y}`}
                  transform={`translate(${capsule.x} ${capsule.y}) rotate(-16)`}
                >
                  <rect x="-8" y="-20" width="16" height="20" rx="8" fill={palette.accent} />
                  <rect x="-8" y="0" width="16" height="20" rx="8" fill={palette.deep} />
                </g>
              ))}
              <text
                x="200"
                y="386"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="11"
                letterSpacing="3"
                fill="#FAFAF6"
                opacity="0.82"
              >
                SVB
              </text>
            </g>
          ) : null}

          {product.shape === "pouch" ? (
            <g>
              <path
                d="M142 174 Q142 162 154 162 L246 162 Q258 162 258 174 L258 372 Q258 400 234 400 L166 400 Q142 400 142 372 Z"
                fill={`url(#${prefix}-body)`}
              />
              <rect
                x="142"
                y="174"
                width="116"
                height="12"
                fill={palette.accent}
                opacity="0.55"
              />
              <path
                d="M142 372 Q200 396 258 372"
                fill="none"
                stroke={palette.deep}
                strokeOpacity="0.32"
                strokeWidth="2"
              />
              <rect
                x="154"
                y="188"
                width="10"
                height="176"
                rx="5"
                fill={`url(#${prefix}-shine)`}
              />
              <ProductLabel
                deep={palette.deep}
                x={160}
                y={234}
                width={80}
                height={126}
              />
            </g>
          ) : null}

          {isTool ? renderTool() : null}
        </g>

        <text
          x="26"
          y="452"
          fontFamily="Arial, sans-serif"
          fontSize="6.5"
          letterSpacing="1.8"
          fill={palette.deep}
          opacity="0.5"
        >
          {product.category.toUpperCase()} · COMPOSICIÓN DEMO
        </text>
      </svg>
    </div>
  );
}


