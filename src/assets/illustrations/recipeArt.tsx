import type { ComponentType, ReactNode } from 'react';
import { Art, type ArtProps } from './Art';
import { P, line, thin } from './palette';

/*
 * One illustration per recipe, so neighbouring cards never look identical.
 * Same rules as the category art (160×160, plum outlines, pastel fills, soft lavender
 * ground shadow), built from the small shared pieces below. These are interim artwork,
 * like the rest of the SVG set (see docs/asset-checklist.md).
 */

/* Extra pastel accents, kept close to the main palette. */
const A = {
  pea: '#AFCB92',
  cucumber: '#DCEBC9',
  cucumberSeed: '#EEF5E4',
  berry: '#B98AD6',
  raspberry: '#E79AB0',
  dal: '#F2CB72',
  rice: '#FFFDF7',
  olive: '#5E4A6E',
  cabbage: '#CDB0E8',
  carrot: '#F5B98B',
  lime: '#D2E5A4',
  chickpea: '#EBCB97',
  spinach: '#9DBB86',
  tikka: '#F0A276',
  peanut: '#D9A86C',
  chilliOil: '#E58A6E',
  cream: '#FBF0DA',
  pink: '#F6D3DE',
};

/* ---------- shared pieces ---------- */

function Shadow({ rx = 56, cy = 140 }: { rx?: number; cy?: number }) {
  return <ellipse cx="80" cy={cy} rx={rx} ry="7" fill={P.shadow} />;
}

/** A round bowl seen from the side; contents are drawn first and sit behind the rim. */
function Bowl({ fill, children, deco = 'dash' }: { fill: string; children?: ReactNode; deco?: 'dash' | 'heart' | 'zigzag' | 'dots' }) {
  return (
    <>
      {children}
      <path d="M22 88 h116 C136 122 112 138 80 138 C48 138 24 122 22 88 Z" fill={fill} {...line} />
      {deco === 'dash' ? <path d="M38 104 C50 114 110 114 122 104" fill="none" stroke={P.cream} strokeWidth={2.5} strokeDasharray="5 6" strokeLinecap="round" /> : null}
      {deco === 'heart' ? <path d="M80 110 c-4 -4 -10 0 -5 5 l5 5 l5 -5 c5 -5 -1 -9 -5 -5 Z" fill={P.blush} stroke={P.ink} strokeWidth={1.6} /> : null}
      {deco === 'zigzag' ? <path d="M42 106 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4" fill="none" stroke={P.cream} strokeWidth={2.4} strokeLinecap="round" /> : null}
      {deco === 'dots' ? (
        <g fill={P.cream}>
          <circle cx="50" cy="106" r="2.6" />
          <circle cx="66" cy="112" r="2.6" />
          <circle cx="80" cy="114" r="2.6" />
          <circle cx="94" cy="112" r="2.6" />
          <circle cx="110" cy="106" r="2.6" />
        </g>
      ) : null}
    </>
  );
}

function SmallBowl({ x, y, s = 1, fill, food }: { x: number; y: number; s?: number; fill: string; food: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 -6 C-18 -16 18 -16 22 -6 Z" fill={food} {...thin} />
      <path d="M-24 -6 h48 C23 10 12 16 0 16 C-12 16 -23 10 -24 -6 Z" fill={fill} {...thin} />
    </g>
  );
}

function Plate({ rx = 64, cy = 112, fill = P.white }: { rx?: number; cy?: number; fill?: string }) {
  return (
    <>
      <ellipse cx="80" cy={cy} rx={rx} ry={rx * 0.38} fill={fill} {...line} />
      <ellipse cx="80" cy={cy - 3} rx={rx * 0.76} ry={rx * 0.26} fill="none" stroke={P.lilac} strokeWidth={2} strokeDasharray="4 5" />
    </>
  );
}

function Steam({ x = 70, y = 52, color = P.lilac }: { x?: number; y?: number; color?: string }) {
  return (
    <path
      d={`M${x - 10} ${y} q-6 -8 0 -16 q6 -8 0 -14 M${x + 10} ${y - 4} q-6 -8 0 -16 q6 -8 0 -14`}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  );
}

function Leaf({ x, y, r = 0, s = 1, fill = A.spinach }: { x: number; y: number; r?: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C6 -10 18 -10 22 0 C18 8 6 8 0 0 Z" fill={fill} {...thin} />
      <path d="M2 0 H18" stroke={P.ink} strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

function Dots({ pts, r = 3.4, fill, stroke = true }: { pts: [number, number][]; r?: number; fill: string; stroke?: boolean }) {
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={fill} {...(stroke ? { stroke: P.ink, strokeWidth: 1.4 } : {})} />
      ))}
    </g>
  );
}

function Cubes({ pts, size = 12, fill = P.cream }: { pts: [number, number, number][]; size?: number; fill?: string }) {
  return (
    <g>
      {pts.map(([x, y, r], i) => (
        <rect key={i} x={x} y={y} width={size} height={size} rx="3" fill={fill} {...thin} transform={`rotate(${r} ${x + size / 2} ${y + size / 2})`} />
      ))}
    </g>
  );
}

function CucumberSlice({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={A.cucumber} {...thin} />
      <circle cx={x} cy={y} r={r * 0.55} fill={A.cucumberSeed} />
      <path d={`M${x - 2} ${y - 2} l1 1.5 M${x + 2} ${y - 1} l1 1.5 M${x} ${y + 2} l1 1`} stroke={P.ink} strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

function LemonWedge({ x, y, r = 0, fill = P.cheese }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M-14 0 A14 14 0 0 0 14 0 Z" fill={fill} {...thin} />
      <path d="M-9 1 A9 9 0 0 0 9 1 Z" fill={P.cream} />
      <path d="M0 1 V9 M0 1 L-6 7 M0 1 L6 7" stroke={fill} strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

function Chilli({ x, y, r = 0, fill = P.tomato }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 0 C10 -2 22 4 26 16 C16 10 6 8 0 6 Z" fill={fill} {...thin} />
      <path d="M0 3 c-4 -1 -6 -4 -5 -8" fill="none" stroke={A.spinach} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

function Garlic({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -14 C-2 -8 -14 -4 -14 6 C-14 14 -6 16 0 16 C6 16 14 14 14 6 C14 -4 2 -8 0 -14 Z" fill={P.white} {...thin} />
      <path d="M-4 -2 C-6 4 -6 10 -4 14 M4 -2 C6 4 6 10 4 14" fill="none" stroke={P.lilac} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

function Peanut({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M-10 0 C-10 -7 -3 -7 -2 -3 C-1 -6 6 -8 9 -3 C12 2 8 8 2 6 C0 9 -10 8 -10 0 Z" fill={A.peanut} {...thin} />
      <path d="M-5 -1 l1 1 M4 0 l1 1" stroke={P.ink} strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

function Spoon({ x, y, r = 0, fill = P.lavender }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse cx="0" cy="0" rx="7" ry="10" fill={fill} {...thin} />
      <rect x="-2.5" y="9" width="5" height="34" rx="2.5" fill={fill} {...thin} />
    </g>
  );
}

function Fork({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 0 V46" {...line} />
      <path d="M-6 -16 V-2 C-6 2 6 2 6 -2 V-16 M0 -16 V0" fill="none" {...thin} />
    </g>
  );
}

function Chopsticks({ x = 118, y = 34 }: { x?: number; y?: number }) {
  return (
    <>
      <path d={`M${x + 10} ${y} l-24 46`} {...line} />
      <path d={`M${x + 20} ${y + 4} l-24 46`} {...line} />
    </>
  );
}

function Heart({ x, y, s = 1, fill = P.blush }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 4 C-6 -4 -14 2 -8 9 L0 16 L8 9 C14 2 6 -4 0 4 Z" fill={fill} {...thin} />
  );
}

function Sparkle({ x, y, s = 1, fill = P.lilac }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -9 C1.5 -2 2 -1.5 9 0 C2 1.5 1.5 2 0 9 C-1.5 2 -2 1.5 -9 0 C-2 -1.5 -1.5 -2 0 -9 Z"
      fill={fill}
      stroke={P.ink}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  );
}

function Pot({ fill }: { fill: string }) {
  return (
    <>
      <path d="M18 92 h-10 M142 92 h10" {...line} strokeWidth={6} />
      <path d="M24 88 h112 v34 c0 10 -8 16 -18 16 h-76 c-10 0 -18 -6 -18 -16 Z" fill={fill} {...line} />
      <path d="M36 104 h88" stroke={P.cream} strokeWidth={2.4} strokeDasharray="6 6" strokeLinecap="round" />
    </>
  );
}

function Mug({ fill, tall = false }: { fill: string; tall?: boolean }) {
  const top = tall ? 56 : 68;
  return (
    <>
      <path d={`M110 ${top + 14} c18 0 18 34 0 34`} fill="none" {...line} strokeWidth={6} />
      <path d={`M110 ${top + 14} c18 0 18 34 0 34`} fill="none" stroke={fill} strokeWidth={2.5} />
      <path d={`M40 ${top} h72 l-6 ${130 - top} c-1 6 -6 10 -12 10 h-36 c-6 0 -11 -4 -12 -10 Z`} fill={fill} {...line} />
    </>
  );
}

function Bread({ x = 28, y = 98, w = 104, h = 22 }: { x?: number; y?: number; w?: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="10" fill={P.bread} {...line} />;
}

function art(children: ReactNode) {
  return function RecipeIllustration(props: ArtProps) {
    return <Art {...props}>{children}</Art>;
  };
}

/* ---------- Sandwiches ---------- */

const PaneerTikkaSandwich = art(
  <>
    <Shadow />
    <path d="M22 126 L74 46 L126 126 Z" fill={P.bread} {...line} />
    <path d="M34 120 L74 58 L114 120 Z" fill={A.tikka} {...thin} />
    <Cubes pts={[[60, 96, -12], [78, 100, 10], [68, 80, 4], [88, 112, -6]]} size={11} />
    <path d="M42 120 c8 -6 14 4 22 -2 c8 -6 14 6 22 -1 c8 -6 14 4 20 0" fill="none" stroke={A.spinach} strokeWidth={3} strokeLinecap="round" />
    <path d="M30 126 L74 58" fill="none" stroke={P.crust} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
    <Chilli x={116} y={58} r={20} />
  </>,
);

const CheesySpinachCornSandwich = art(
  <>
    <Shadow />
    <Bread y={112} />
    <path d="M30 112 c6 -10 14 -2 20 -8 c6 -6 14 4 20 -2 c6 -6 14 4 20 -2 c6 -6 14 4 20 -2 c6 -4 10 2 10 6 v8 H30 Z" fill={A.spinach} {...thin} />
    <Dots pts={[[44, 106], [62, 104], [80, 107], [98, 104], [114, 106], [72, 111], [104, 112]]} r={3.2} fill={P.cheese} />
    <path d="M28 98 h104 v6 l-6 10 l-6 -8 l-8 12 l-6 -10 l-8 8 l-8 -10 l-8 12 l-8 -10 l-8 8 l-8 -10 l-8 10 l-6 -8 Z" fill={P.cheese} {...thin} />
    <Bread y={78} h={22} />
    <path d="M42 86 h76" stroke={P.crust} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
    <Leaf x={112} y={48} r={-30} s={1.1} />
    <Dots pts={[[40, 56], [52, 48]]} r={4} fill={P.cheese} />
  </>,
);

const ChutneyCheeseToastie = art(
  <>
    <Shadow rx={60} />
    <path d="M18 120 L60 50 L104 120 Z" fill={P.bread} {...line} />
    <path d="M30 114 L60 64 L92 114 Z" fill={P.cheese} {...thin} />
    <path d="M36 110 L60 70 L86 110" fill="none" stroke={P.sageDeep} strokeWidth={5} strokeLinejoin="round" />
    <path d="M36 92 l14 -6 M44 104 l18 -8 M56 112 l20 -8" stroke={P.crust} strokeWidth={3} strokeLinecap="round" opacity={0.8} />
    <path d="M30 120 L60 70" stroke={P.crust} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
    <SmallBowl x={122} y={112} s={0.9} fill={P.lavender} food={P.sageDeep} />
    <Spoon x={136} y={58} r={20} />
  </>,
);

const HummusCucumberSandwich = art(
  <>
    <Shadow />
    <path d="M24 118 C20 70 48 52 80 52 C112 52 140 70 136 118 Z" fill={P.bread} {...line} />
    <path d="M36 112 C34 78 56 64 80 64 C104 64 126 78 124 112 Z" fill={A.chickpea} {...thin} />
    <CucumberSlice x={60} y={86} />
    <CucumberSlice x={84} y={78} />
    <CucumberSlice x={104} y={94} />
    <CucumberSlice x={74} y={102} r={8} />
    <circle cx="50" cy="104" r="6" fill={P.tomato} {...thin} />
    <Dots pts={[[96, 110], [112, 76], [66, 70]]} r={1.6} fill={P.ink} stroke={false} />
    <path d="M24 118 h112" {...line} />
  </>,
);

/* ---------- Parathas & wraps ---------- */

const ShortcutAlooParatha = art(
  <>
    <Shadow rx={60} />
    <ellipse cx="78" cy="118" rx="56" ry="18" fill={P.crust} {...line} />
    <ellipse cx="78" cy="108" rx="56" ry="18" fill={P.bread} {...line} />
    <ellipse cx="78" cy="98" rx="56" ry="18" fill={P.cheese} {...line} />
    <ellipse cx="58" cy="96" rx="5" ry="3" fill={P.crust} />
    <ellipse cx="92" cy="102" rx="6" ry="3" fill={P.crust} />
    <ellipse cx="100" cy="92" rx="4" ry="2.4" fill={P.crust} />
    <path d="M70 88 l12 -4 l10 5 l-12 5 Z" fill="#FFF3C8" {...thin} />
    <path d="M118 52 C116 40 134 34 140 44 C146 54 140 66 128 66 C120 66 118 60 118 52 Z" fill={P.potato} {...thin} />
    <Dots pts={[[126, 50], [134, 58]]} r={1.6} fill={P.potatoSpot} stroke={false} />
    <Steam x={56} y={70} />
  </>,
);

const PaneerBhurjiParathaWrap = art(
  <>
    <Shadow rx={50} />
    <path d="M40 132 L64 46 C84 40 104 44 116 54 L72 136 Z" fill={P.bread} {...line} />
    <path d="M62 54 C78 46 100 46 114 56 C106 64 80 66 62 54 Z" fill={P.cream} {...thin} />
    <Cubes pts={[[70, 44, -8], [86, 40, 12], [98, 46, -4]]} size={9} />
    <Dots pts={[[76, 52], [92, 52], [104, 54]]} r={2.6} fill={P.tomato} />
    <path d="M64 46 L44 128" stroke={P.crust} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
    <path d="M56 92 l30 10 M50 112 l26 10" stroke={P.crust} strokeWidth={2.4} strokeLinecap="round" opacity={0.6} />
    <circle cx="124" cy="108" r="13" fill={P.tomato} {...thin} />
    <path d="M118 96 q6 -4 12 0" fill="none" stroke={A.spinach} strokeWidth={2.4} strokeLinecap="round" />
    <Leaf x={20} y={70} r={-20} />
  </>,
);

const CheeseCornParatha = art(
  <>
    <Shadow rx={60} />
    <path d="M18 112 A62 40 0 0 1 142 112 Z" fill={P.cheese} {...line} />
    <path d="M30 112 C40 124 54 118 58 128 C64 118 78 126 84 116 C92 128 104 118 112 126 C116 118 128 120 132 112" fill={P.cheese} {...thin} />
    <path d="M18 112 A62 40 0 0 1 142 112" fill={P.bread} {...line} />
    <path d="M18 112 h124" {...line} />
    <ellipse cx="62" cy="92" rx="5" ry="3" fill={P.crust} />
    <ellipse cx="96" cy="86" rx="6" ry="3" fill={P.crust} />
    <ellipse cx="114" cy="100" rx="4" ry="2.4" fill={P.crust} />
    <Dots pts={[[40, 120], [72, 124], [100, 122]]} r={3.2} fill={P.cheese} />
    <Dots pts={[[118, 46], [128, 40], [136, 50], [124, 54]]} r={4} fill={P.cheese} />
    <Sparkle x={36} y={46} s={0.8} />
  </>,
);

/* ---------- Pasta ---------- */

const CreamySpinachPasta = art(
  <>
    <Shadow />
    <Bowl fill={P.lavender}>
      <path d="M36 88 c2 -14 18 -22 30 -16 c8 -10 26 -10 32 0 c12 -4 26 4 26 16 Z" fill={A.cream} {...thin} />
      <g fill={P.cheese} stroke={P.ink} strokeWidth={1.6}>
        <rect x="48" y="72" width="18" height="8" rx="3" transform="rotate(-20 57 76)" />
        <rect x="74" y="66" width="18" height="8" rx="3" transform="rotate(15 83 70)" />
        <rect x="96" y="74" width="18" height="8" rx="3" transform="rotate(-8 105 78)" />
      </g>
      <Leaf x={60} y={84} r={-10} s={0.9} />
      <Leaf x={86} y={80} r={20} s={0.8} />
    </Bowl>
    <Fork x={130} y={34} r={20} />
  </>,
);

const TomatoGarlicPasta = art(
  <>
    <Shadow rx={64} />
    <Plate />
    <g fill="none" stroke={P.cheese} strokeWidth={5} strokeLinecap="round">
      <path d="M50 108 c0 -16 34 -18 36 -2 c2 14 -28 14 -26 0 c2 -10 18 -10 18 -2" />
      <path d="M62 116 c10 6 34 4 40 -8" />
    </g>
    <path d="M50 108 c0 -16 34 -18 36 -2 c2 14 -28 14 -26 0" fill="none" stroke={P.ink} strokeWidth={1.4} />
    <path d="M58 92 c6 -6 18 -6 22 2 c-4 6 -16 6 -22 -2 Z" fill={P.tomato} {...thin} />
    <Leaf x={86} y={92} r={-30} s={0.7} />
    <Garlic x={124} y={60} s={1.1} />
    <Dots pts={[[46, 116], [100, 100]]} r={2} fill={P.cream} />
  </>,
);

const OnePotMasalaMacaroni = art(
  <>
    <Shadow rx={62} />
    <Pot fill={P.peach} />
    <path d="M30 88 c6 -16 30 -20 50 -12 c18 -8 44 -2 50 12 Z" fill={A.tikka} {...thin} />
    <g fill="none" stroke={P.cheese} strokeWidth={5} strokeLinecap="round">
      <path d="M44 82 a6 6 0 0 1 10 -6" />
      <path d="M66 76 a6 6 0 0 1 10 -6" />
      <path d="M88 80 a6 6 0 0 1 10 -6" />
      <path d="M108 84 a6 6 0 0 1 10 -6" />
    </g>
    <Dots pts={[[58, 84], [80, 82], [100, 86]]} r={3.4} fill={A.pea} />
    <Steam x={80} y={58} />
  </>,
);

const PestoPeaPasta = art(
  <>
    <Shadow />
    <Bowl fill={P.peach} deco="zigzag">
      <path d="M36 88 c2 -14 18 -22 30 -16 c8 -10 26 -10 32 0 c12 -4 26 4 26 16 Z" fill={A.spinach} {...thin} />
      <g fill="none" stroke={A.lime} strokeWidth={4.5} strokeLinecap="round">
        <path d="M48 80 c4 -8 12 -8 14 0" />
        <path d="M72 74 c4 -8 12 -8 14 0" />
        <path d="M96 80 c4 -8 12 -8 14 0" />
      </g>
      <Dots pts={[[62, 82], [86, 80], [76, 86], [104, 84]]} r={3.6} fill={A.pea} />
    </Bowl>
    <LemonWedge x={128} y={58} r={-20} />
  </>,
);

/* ---------- Sauces & chutneys ---------- */

const GreenCorianderChutney = art(
  <>
    <Shadow rx={52} />
    <Bowl fill={P.white} deco="heart">
      <path d="M30 88 C34 72 126 72 130 88 Z" fill={P.sageDeep} {...thin} />
      <path d="M50 82 c8 -4 16 4 24 0 c8 -4 16 4 24 0" fill="none" stroke={A.lime} strokeWidth={2.4} strokeLinecap="round" />
    </Bowl>
    <Leaf x={106} y={50} r={-40} />
    <Leaf x={118} y={60} r={10} s={0.9} />
    <Leaf x={30} y={56} r={-10} s={0.8} />
  </>,
);

const PeanutChutneyPowder = art(
  <>
    <Shadow rx={50} />
    <path d="M44 62 h52 v8 c8 4 10 10 10 18 v38 c0 8 -6 12 -14 12 h-44 c-8 0 -14 -4 -14 -12 v-38 c0 -8 2 -14 10 -18 Z" fill={P.white} {...line} />
    <path d="M38 94 c16 -4 48 4 66 0 v32 c0 8 -4 12 -12 12 h-42 c-8 0 -12 -4 -12 -12 Z" fill={A.peanut} />
    <Dots pts={[[48, 104], [60, 112], [74, 102], [86, 116], [96, 106], [54, 126], [80, 128], [92, 124]]} r={1.8} fill={P.tomato} stroke={false} />
    <Dots pts={[[66, 120], [88, 100], [50, 116]]} r={1.6} fill={P.cream} stroke={false} />
    <path d="M38 94 c16 -4 48 4 66 0" fill="none" {...thin} />
    <rect x="40" y="46" width="60" height="18" rx="6" fill={P.peach} {...line} />
    <Peanut x={126} y={112} r={-20} />
    <Peanut x={124} y={88} r={30} />
  </>,
);

const MintYogurtDip = art(
  <>
    <Shadow rx={52} />
    <Bowl fill={P.lavender} deco="dots">
      <path d="M30 88 C34 70 126 70 130 88 Z" fill={P.white} {...thin} />
      <path d="M58 80 c8 -8 22 -8 26 0 c4 6 -8 8 -12 4" fill="none" stroke={A.spinach} strokeWidth={2.2} strokeLinecap="round" />
    </Bowl>
    <Leaf x={82} y={66} r={-30} s={0.9} />
    <Leaf x={96} y={70} r={20} s={0.8} fill={A.pea} />
    <Spoon x={130} y={44} r={30} fill={P.peach} />
  </>,
);

const QuickGarlicChilliOil = art(
  <>
    <Shadow rx={46} />
    <path d="M54 48 h28 v14 c12 6 18 14 18 26 v36 c0 10 -6 14 -14 14 h-36 c-8 0 -14 -4 -14 -14 v-36 c0 -12 6 -20 18 -26 Z" fill={P.white} {...line} />
    <path d="M38 96 c14 -6 46 6 60 0 v28 c0 8 -4 12 -12 12 h-36 c-8 0 -12 -4 -12 -12 Z" fill={A.chilliOil} />
    <Dots pts={[[48, 108], [62, 116], [76, 106], [88, 118], [56, 126], [82, 128]]} r={2.2} fill={P.chocolate} stroke={false} />
    <path d="M38 96 c14 -6 46 6 60 0" fill="none" {...thin} />
    <rect x="50" y="36" width="36" height="14" rx="5" fill={P.hat} {...line} />
    <Chilli x={108} y={58} r={30} />
    <Garlic x={124} y={118} s={0.9} />
  </>,
);

/* ---------- Salads ---------- */

const GreekInspiredSalad = art(
  <>
    <Shadow />
    <Bowl fill={P.white} deco="zigzag">
      <path d="M34 88 c-6 -18 14 -26 22 -14 c4 -16 30 -14 30 2 c10 -12 32 -6 28 12 Z" fill={P.sage} {...thin} />
      <Cubes pts={[[52, 72, -10], [88, 70, 8]]} size={12} fill={P.white} />
      <circle cx="74" cy="80" r="8" fill={P.tomato} {...thin} />
      <circle cx="106" cy="80" r="5" fill={A.olive} {...thin} />
      <circle cx="44" cy="84" r="4.5" fill={A.olive} {...thin} />
      <CucumberSlice x={118} y={84} r={7} />
    </Bowl>
    <path d="M118 50 c6 -2 10 -10 6 -16 c-8 4 -10 10 -6 16 Z" fill={P.sage} {...thin} />
  </>,
);

const ChickpeaCucumberSalad = art(
  <>
    <Shadow />
    <Bowl fill={A.pink} deco="dash">
      <path d="M32 88 C36 72 124 72 128 88 Z" fill={A.cucumber} {...thin} />
      <Dots pts={[[48, 82], [60, 78], [72, 84], [84, 76], [96, 82], [108, 78], [66, 72], [90, 70], [114, 84]]} r={5} fill={A.chickpea} />
      <CucumberSlice x={78} y={70} r={7} />
      <Dots pts={[[54, 72], [102, 72]]} r={3} fill={P.tomato} />
    </Bowl>
    <LemonWedge x={30} y={58} r={20} />
  </>,
);

const CornCucumberCheeseSalad = art(
  <>
    <Shadow rx={46} />
    <path d="M44 68 h72 l-10 60 c-1 6 -6 10 -12 10 h-28 c-6 0 -11 -4 -12 -10 Z" fill={P.white} fillOpacity={0.9} {...line} />
    <path d="M47 82 h66 l-7 44 c-1 5 -5 8 -10 8 h-32 c-5 0 -9 -3 -10 -8 Z" fill={P.cheese} opacity={0.35} />
    <Dots pts={[[56, 92], [68, 98], [80, 90], [92, 100], [104, 92], [62, 110], [76, 116], [90, 112], [70, 126], [86, 128], [98, 120]]} r={3.6} fill={P.cheese} />
    <CucumberSlice x={60} y={74} r={8} />
    <CucumberSlice x={96} y={72} r={8} />
    <path d="M74 66 l6 -10 l6 10 Z M84 64 l8 -8 l4 10 Z" fill={P.cheese} {...thin} />
    <Spoon x={124} y={38} r={24} fill={P.sage} />
  </>,
);

const PeanutLimeSlaw = art(
  <>
    <Shadow rx={64} />
    <Plate fill={P.cream} />
    <g fill="none" strokeLinecap="round" strokeWidth={3.5}>
      <path d="M44 106 c10 -6 22 -6 30 -2 M50 114 c12 -6 26 -4 34 0 M60 98 c12 -4 22 -2 30 2" stroke={A.cabbage} />
      <path d="M78 110 c10 -6 22 -6 30 -2 M86 102 c8 -4 16 -2 22 2" stroke={A.carrot} />
      <path d="M66 120 c10 -4 24 -2 32 2" stroke={A.lime} />
    </g>
    <Peanut x={60} y={96} r={10} />
    <Peanut x={100} y={96} r={-30} />
    <LemonWedge x={124} y={66} r={-20} fill={A.lime} />
    <Leaf x={22} y={70} r={-20} s={0.9} />
  </>,
);

/* ---------- Bowls ---------- */

const PaneerBurritoBowl = art(
  <>
    <Shadow />
    <Bowl fill={P.peach} deco="heart">
      <path d="M30 88 C30 66 80 64 80 88 Z" fill={A.rice} {...thin} />
      <path d="M80 88 C80 68 104 66 106 88 Z" fill={P.chocolate} {...thin} />
      <path d="M106 88 C106 70 130 70 130 88 Z" fill={P.cheese} {...thin} />
      <Cubes pts={[[48, 70, -8], [62, 74, 10]]} size={11} fill={P.cream} />
      <Dots pts={[[90, 78], [96, 72]]} r={2} fill={P.cream} stroke={false} />
      <Dots pts={[[114, 80], [122, 78], [118, 72]]} r={2.4} fill={P.crust} stroke={false} />
      <path d="M70 66 c4 -6 12 -6 14 0 c-4 4 -10 4 -14 0 Z" fill={P.tomato} {...thin} />
    </Bowl>
    <LemonWedge x={128} y={50} r={-30} fill={A.lime} />
  </>,
);

const JeeraRiceAndPaneerBowl = art(
  <>
    <Shadow />
    <Bowl fill={P.lavender} deco="dash">
      <path d="M30 88 C30 56 130 56 130 88 Z" fill={A.rice} {...thin} />
      <g stroke={P.chocolate} strokeWidth={2} strokeLinecap="round">
        <path d="M46 78 l3 -2 M60 70 l3 -1 M76 66 l3 1 M94 68 l3 2 M110 76 l3 2 M54 82 l3 -1 M88 80 l3 1" />
      </g>
      <Cubes pts={[[66, 64, -6], [82, 70, 12], [98, 60, 4]]} size={12} fill={P.cream} />
      <Dots pts={[[52, 74], [116, 82], [104, 78]]} r={3.4} fill={A.pea} />
    </Bowl>
    <Steam x={80} y={44} />
  </>,
);

const PalakPaneerRiceBowl = art(
  <>
    <Shadow />
    <Bowl fill={P.white} deco="zigzag">
      <path d="M30 88 C30 64 82 62 82 88 Z" fill={A.rice} {...thin} />
      <path d="M80 88 C78 64 130 64 130 88 Z" fill={A.spinach} {...thin} />
      <Cubes pts={[[90, 72, -10], [108, 70, 8], [98, 80, 0]]} size={10} fill={P.cream} />
      <path d="M88 66 c8 -4 16 4 24 0" fill="none" stroke={P.white} strokeWidth={2.4} strokeLinecap="round" />
      <g stroke={P.lilac} strokeWidth={2} strokeLinecap="round" opacity={0.7}>
        <path d="M44 78 l4 -2 M56 72 l4 -1 M66 80 l4 0" />
      </g>
    </Bowl>
    <Leaf x={26} y={56} r={-20} />
    <Steam x={104} y={50} />
  </>,
);

const MicrowaveChickpeaRiceBowl = art(
  <>
    <Shadow />
    <Bowl fill={P.sage} deco="dots">
      <path d="M30 88 C30 60 130 60 130 88 Z" fill={A.rice} {...thin} />
      <Dots pts={[[52, 78], [64, 72], [78, 76], [92, 70], [106, 76], [70, 84], [98, 84]]} r={5} fill={A.chickpea} />
      <Leaf x={40} y={82} r={-10} s={0.8} />
      <Leaf x={110} y={82} r={10} s={0.8} />
      <path d="M56 66 c10 6 20 -6 30 0 c10 6 18 -4 24 0" fill="none" stroke={P.white} strokeWidth={3.4} strokeLinecap="round" />
      <path d="M56 66 c10 6 20 -6 30 0 c10 6 18 -4 24 0" fill="none" stroke={P.ink} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
    </Bowl>
    <Steam x={80} y={46} color={P.lilac} />
    <Sparkle x={130} y={40} s={0.8} fill={P.cheese} />
  </>,
);

/* ---------- Quick desserts ---------- */

const MicrowaveMugBrownie = art(
  <>
    <Shadow rx={48} />
    <Mug fill={P.hat} />
    <path d="M38 70 c0 -16 76 -16 76 0 c0 6 -8 8 -38 8 c-30 0 -38 -2 -38 -8 Z" fill={P.chocolate} {...line} />
    <path d="M44 74 c0 10 6 10 6 2 M96 76 c0 12 6 12 6 0" fill={P.chocolate} {...thin} />
    <rect x="62" y="56" width="7" height="6" rx="2" fill={P.chocolateDark} />
    <rect x="80" y="60" width="7" height="6" rx="2" fill={P.chocolateDark} />
    <rect x="70" y="64" width="6" height="5" rx="2" fill={P.chocolateDark} />
    <Heart x={74} y={100} s={0.7} />
    <Steam x={74} y={42} />
  </>,
);

const PeanutButterChocolateMugCake = art(
  <>
    <Shadow rx={46} />
    <Mug fill={A.pink} tall />
    <path d="M38 58 c0 -18 76 -18 76 0 c0 6 -8 8 -38 8 c-30 0 -38 -2 -38 -8 Z" fill={P.chocolateDark} {...line} />
    <path d="M52 50 c10 -8 22 4 32 -2 c8 -4 14 2 16 6 c-10 6 -38 6 -48 -4 Z" fill={A.peanut} {...thin} />
    <path d="M62 48 c6 -4 12 2 18 -2" fill="none" stroke={P.cream} strokeWidth={2} strokeLinecap="round" />
    <path d="M52 92 h48 M50 104 h48" stroke={P.white} strokeWidth={2.4} strokeDasharray="4 5" strokeLinecap="round" />
    <Peanut x={128} y={128} r={-10} />
    <Sparkle x={36} y={34} s={0.8} fill={P.cheese} />
  </>,
);

const YogurtBerryCrunchCup = art(
  <>
    <Shadow rx={42} />
    <path d="M46 52 h68 l-8 74 c-1 8 -6 12 -14 12 h-24 c-8 0 -13 -4 -14 -12 Z" fill={P.white} {...line} />
    <path d="M48 70 h64 l-2 18 h-60 Z" fill={P.white} />
    <path d="M50 88 h60 l-2 14 h-56 Z" fill={A.peanut} />
    <Dots pts={[[58, 94], [72, 98], [88, 94], [100, 98]]} r={2} fill={P.crust} stroke={false} />
    <path d="M52 102 h56 l-3 22 c-1 6 -4 8 -10 8 h-30 c-6 0 -9 -2 -10 -8 Z" fill={A.raspberry} opacity={0.55} />
    <path d="M48 70 h64 M50 88 h60 M52 102 h56" stroke={P.ink} strokeWidth={1.4} />
    <circle cx="66" cy="56" r="7" fill={A.raspberry} {...thin} />
    <circle cx="82" cy="50" r="7" fill={A.berry} {...thin} />
    <circle cx="96" cy="58" r="6" fill={A.raspberry} {...thin} />
    <Leaf x={78} y={42} r={-60} s={0.6} />
    <Heart x={124} y={44} s={0.7} />
  </>,
);

/* ---------- Occasional meals ---------- */

const ShortcutPavBhaji = art(
  <>
    <Shadow rx={64} />
    <Plate />
    <path d="M36 108 c0 -22 44 -28 52 -4 c2 10 -10 14 -26 14 c-16 0 -26 -2 -26 -10 Z" fill={P.tomato} {...line} />
    <path d="M48 98 l3 0 M60 94 l3 1 M70 100 l3 0" stroke={P.cream} strokeWidth={2.5} strokeLinecap="round" />
    <path d="M58 88 l8 -3 l6 4 l-8 3 Z" fill="#FFF3C8" {...thin} />
    <path d="M92 108 C90 88 128 86 128 106 C128 114 92 116 92 108 Z" fill={P.bread} {...line} />
    <path d="M100 96 c8 -4 18 -4 22 2" fill="none" stroke={P.crust} strokeWidth={3} strokeLinecap="round" />
    <path d="M100 118 C98 100 136 98 136 116 C136 124 100 126 100 118 Z" fill={P.bread} {...line} />
    <path d="M108 108 c8 -4 18 -4 22 2" fill="none" stroke={P.crust} strokeWidth={3} strokeLinecap="round" />
    <LemonWedge x={30} y={120} r={30} />
    <Steam x={66} y={70} />
  </>,
);

const QuickVegFriedRice = art(
  <>
    <Shadow />
    <Bowl fill={P.peach} deco="dash">
      <path d="M30 88 C30 58 130 58 130 88 Z" fill={P.cheese} {...thin} />
      <g stroke={P.crust} strokeWidth={2} strokeLinecap="round" opacity={0.7}>
        <path d="M46 78 l4 -2 M62 70 l4 -1 M80 66 l4 1 M98 70 l4 2 M112 78 l4 2 M70 80 l4 0" />
      </g>
      <Dots pts={[[52, 74], [88, 74], [104, 80]]} r={3.4} fill={A.pea} />
      <Cubes pts={[[66, 68, 10], [96, 62, -10]]} size={8} fill={A.carrot} />
      <Dots pts={[[78, 78], [114, 72]]} r={3} fill={P.tomato} />
    </Bowl>
    <Chopsticks />
  </>,
);

const EasyDalAndRiceBowl = art(
  <>
    <Shadow rx={64} />
    <g transform="translate(-26 4) scale(0.8)">
      <Bowl fill={P.lavender} deco="heart">
        <path d="M30 88 C34 70 126 70 130 88 Z" fill={A.dal} {...thin} />
        <path d="M54 80 c10 -6 22 4 34 -2" fill="none" stroke="#FFF3C8" strokeWidth={3} strokeLinecap="round" />
        <Leaf x={92} y={76} r={-20} s={0.8} />
      </Bowl>
    </g>
    <g transform="translate(58 30) scale(0.62)">
      <Bowl fill={P.white} deco="dash">
        <path d="M30 88 C30 56 130 56 130 88 Z" fill={A.rice} {...thin} />
        <g stroke={P.lilac} strokeWidth={2.4} strokeLinecap="round" opacity={0.6}>
          <path d="M50 78 l5 -2 M70 70 l5 -1 M92 72 l5 2 M108 80 l5 2" />
        </g>
      </Bowl>
    </g>
    <Steam x={56} y={62} />
  </>,
);

const MicrowaveMasalaPotatoChaat = art(
  <>
    <Shadow rx={58} />
    <path d="M18 92 L142 92 L120 130 C116 136 110 138 104 138 H56 C50 138 44 136 40 130 Z" fill={P.white} {...line} />
    <path d="M30 104 h100 M38 118 h84" stroke={P.lilac} strokeWidth={2} strokeDasharray="4 5" strokeLinecap="round" />
    <Cubes pts={[[40, 72, -10], [58, 66, 8], [76, 70, -4], [94, 64, 12], [110, 72, -8], [66, 80, 4], [88, 80, -6]]} size={15} fill={P.potato} />
    <path d="M44 74 c14 8 30 -4 44 2 c14 6 24 -2 30 2" fill="none" stroke={P.white} strokeWidth={4} strokeLinecap="round" />
    <path d="M50 80 c12 4 24 -4 36 0 c10 4 20 -2 26 0" fill="none" stroke={P.sageDeep} strokeWidth={2.6} strokeLinecap="round" />
    <path d="M58 70 c10 4 18 -2 28 0" fill="none" stroke={P.chocolate} strokeWidth={2.4} strokeLinecap="round" />
    <Dots pts={[[52, 64], [84, 60], [104, 62]]} r={1.8} fill={P.tomato} stroke={false} />
    <Fork x={136} y={40} r={20} />
  </>,
);

/** Recipe id -> illustration. Every recipe in the collection has its own entry. */
export const recipeIllustrations: Record<string, ComponentType<ArtProps>> = {
  'paneer-tikka-sandwich': PaneerTikkaSandwich,
  'cheesy-spinach-corn-sandwich': CheesySpinachCornSandwich,
  'chutney-cheese-toastie': ChutneyCheeseToastie,
  'hummus-cucumber-sandwich': HummusCucumberSandwich,
  'shortcut-aloo-paratha': ShortcutAlooParatha,
  'paneer-bhurji-paratha-wrap': PaneerBhurjiParathaWrap,
  'cheese-corn-paratha': CheeseCornParatha,
  'creamy-spinach-pasta': CreamySpinachPasta,
  'tomato-garlic-pasta': TomatoGarlicPasta,
  'one-pot-masala-macaroni': OnePotMasalaMacaroni,
  'pesto-pea-pasta': PestoPeaPasta,
  'green-coriander-chutney': GreenCorianderChutney,
  'peanut-chutney-powder': PeanutChutneyPowder,
  'mint-yogurt-dip': MintYogurtDip,
  'quick-garlic-chilli-oil': QuickGarlicChilliOil,
  'greek-inspired-salad': GreekInspiredSalad,
  'chickpea-cucumber-salad': ChickpeaCucumberSalad,
  'corn-cucumber-cheese-salad': CornCucumberCheeseSalad,
  'peanut-lime-slaw': PeanutLimeSlaw,
  'paneer-burrito-bowl': PaneerBurritoBowl,
  'jeera-rice-and-paneer-bowl': JeeraRiceAndPaneerBowl,
  'palak-paneer-rice-bowl': PalakPaneerRiceBowl,
  'microwave-chickpea-rice-bowl': MicrowaveChickpeaRiceBowl,
  'microwave-mug-brownie': MicrowaveMugBrownie,
  'peanut-butter-chocolate-mug-cake': PeanutButterChocolateMugCake,
  'yogurt-berry-crunch-cup': YogurtBerryCrunchCup,
  'shortcut-pav-bhaji': ShortcutPavBhaji,
  'quick-veg-fried-rice': QuickVegFriedRice,
  'easy-dal-and-rice-bowl': EasyDalAndRiceBowl,
  'microwave-masala-potato-chaat': MicrowaveMasalaPotatoChaat,
};
