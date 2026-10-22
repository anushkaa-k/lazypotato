import { Art, type ArtProps } from './Art';
import { P, line, thin } from './palette';

/*
 * Simplified SVG versions of the Lazy Potato mascot (potato + lilac bucket hat).
 * These are interim artwork; see docs/asset-checklist.md. Swap any pose for final
 * artwork by changing what the registry in ./index.ts returns.
 */

const BODY =
  'M50 132 C46 96 68 74 100 74 C134 74 156 96 152 130 C149 162 128 180 100 180 C70 180 53 162 50 132 Z';

function Body() {
  return (
    <>
      <path d={BODY} fill={P.potato} {...line} />
      <path d="M62 150 C70 168 92 174 112 172" fill="none" stroke={P.potatoShade} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
      <ellipse cx="134" cy="152" rx="4" ry="3" fill={P.potatoSpot} />
      <ellipse cx="68" cy="160" rx="3" ry="2.5" fill={P.potatoSpot} />
      <ellipse cx="140" cy="122" rx="2.6" ry="2" fill={P.potatoSpot} />
      <ellipse cx="116" cy="166" rx="2.4" ry="2" fill={P.potatoSpot} />
    </>
  );
}

function Hat({ tilt = -6 }: { tilt?: number }) {
  return (
    <g transform={`rotate(${tilt} 100 96)`}>
      <path d="M64 102 C62 82 68 58 78 53 C90 48 114 48 126 53 C136 58 140 82 138 102 Z" fill={P.hat} {...line} />
      <path d="M76 60 C90 56 114 56 128 60" fill="none" stroke={P.hatStitch} strokeWidth={1.8} strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M68 90 C88 85 116 85 136 90" fill="none" stroke={P.hatStitch} strokeWidth={1.8} strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M34 114 C40 94 160 92 168 114 C168 122 150 120 100 120 C52 120 34 122 34 114 Z" fill={P.hatShade} {...line} />
      <path d="M44 110 C70 103 132 103 158 110" fill="none" stroke={P.hatStitch} strokeWidth={1.8} strokeDasharray="4 4" strokeLinecap="round" />
    </g>
  );
}

function Blush({ y = 144 }: { y?: number }) {
  return (
    <>
      <ellipse cx="72" cy={y} rx="8" ry="5" fill={P.blush} opacity={0.85} />
      <ellipse cx="128" cy={y} rx="8" ry="5" fill={P.blush} opacity={0.85} />
    </>
  );
}

function OpenEyes({ y = 134 }: { y?: number }) {
  return (
    <>
      <circle cx="84" cy={y} r="5" fill={P.ink} />
      <circle cx="116" cy={y} r="5" fill={P.ink} />
      <circle cx="85.8" cy={y - 1.8} r="1.6" fill={P.white} />
      <circle cx="117.8" cy={y - 1.8} r="1.6" fill={P.white} />
    </>
  );
}

function HappyEyes({ y = 135 }: { y?: number }) {
  return (
    <>
      <path d={`M77 ${y} q7 -8 14 0`} fill="none" {...line} />
      <path d={`M109 ${y} q7 -8 14 0`} fill="none" {...line} />
    </>
  );
}

function CatMouth({ y = 146 }: { y?: number }) {
  return <path d={`M93 ${y} q3.5 5 7 0 q3.5 5 7 0`} fill="none" {...thin} />;
}

function Arm({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return <ellipse cx={x} cy={y} rx="9" ry="14" transform={`rotate(${rotate} ${x} ${y})`} fill={P.potato} {...line} />;
}

function Feet() {
  return (
    <>
      <ellipse cx="82" cy="180" rx="12" ry="7" fill={P.potatoShade} {...line} />
      <ellipse cx="118" cy="180" rx="12" ry="7" fill={P.potatoShade} {...line} />
    </>
  );
}

function GroundShadow() {
  return <ellipse cx="100" cy="188" rx="64" ry="8" fill={P.shadow} />;
}

function Heart({ x, y, s = 1, fill = P.blush }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 4 C-6 -4 -14 2 -8 9 L0 16 L8 9 C14 2 6 -4 0 4 Z"
      fill={fill}
      {...thin}
    />
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

/** Greeting: waving hello. */
export function MascotWave(props: ArtProps) {
  return (
    <Art viewBox="0 0 200 200" {...props}>
      <GroundShadow />
      <Feet />
      <Arm x={50} y={150} rotate={20} />
      <Body />
      <Arm x={160} y={112} rotate={-35} />
      <path d="M172 92 q6 -4 8 -12 M178 104 q8 -2 12 -8" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
      <Hat />
      <OpenEyes />
      <Blush />
      <CatMouth />
      <Heart x={30} y={60} s={0.9} />
      <Sparkle x={170} y={50} s={0.9} />
    </Art>
  );
}

/** Cooking: apron on, spatula up. */
export function MascotCook(props: ArtProps) {
  return (
    <Art viewBox="0 0 200 200" {...props}>
      <GroundShadow />
      <Feet />
      <Arm x={50} y={148} rotate={25} />
      <Body />
      {/* apron */}
      <path d="M58 158 C80 162 120 162 142 158" fill="none" stroke={P.lilac} strokeWidth={4} strokeLinecap="round" />
      <path d="M78 160 C78 158 122 158 122 160 L120 174 C110 180 90 180 80 174 Z" fill={P.lavender} {...thin} />
      <Heart x={100} y={161} s={0.45} />
      {/* spatula */}
      <g transform="rotate(25 160 110)">
        <rect x="155" y="64" width="12" height="30" rx="4" fill={P.lilac} {...thin} />
        <path d="M158 72 v14 M164 72 v14" stroke={P.ink} strokeWidth={1.5} strokeLinecap="round" />
        <rect x="158" y="92" width="6" height="40" rx="3" fill={P.peach} {...thin} />
      </g>
      <Arm x={152} y={128} rotate={-20} />
      <Hat tilt={4} />
      <OpenEyes />
      <Blush />
      <path d="M94 145 q6 7 12 0" fill="none" {...thin} />
      <path d="M40 92 q-6 -8 0 -16 q6 -8 0 -16" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M28 100 q-5 -7 0 -14" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
    </Art>
  );
}

/** Celebrating: arms up, hearts and sparkles. */
export function MascotCelebrate(props: ArtProps) {
  return (
    <Art viewBox="0 0 200 200" {...props}>
      <GroundShadow />
      <Feet />
      <Arm x={44} y={104} rotate={35} />
      <Arm x={156} y={104} rotate={-35} />
      <Body />
      <Hat tilt={-10} />
      <HappyEyes />
      <Blush />
      <path d="M92 145 q8 12 16 0 Z" fill={P.tomato} {...thin} />
      <Heart x={22} y={50} s={1.1} />
      <Heart x={178} y={70} s={0.8} fill={P.lavender} />
      <Sparkle x={168} y={30} s={1.1} />
      <Sparkle x={40} y={20} s={0.7} fill={P.cheese} />
      <Sparkle x={186} y={128} s={0.6} fill={P.sage} />
      <circle cx="18" cy="130" r="4" fill={P.peach} {...thin} />
      <circle cx="60" cy="40" r="3" fill={P.sage} {...thin} />
      <circle cx="146" cy="40" r="3" fill={P.blush} {...thin} />
      <path d="M14 92 l8 -4 M186 96 l-8 -4" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
    </Art>
  );
}

/** Sleeping on a gingham pillow, hat tipped down. */
export function MascotSleep(props: ArtProps) {
  return (
    <Art viewBox="0 0 220 170" {...props}>
      <ellipse cx="110" cy="156" rx="90" ry="8" fill={P.shadow} />
      {/* pillow */}
      <path d="M22 132 C18 112 30 104 60 106 L170 108 C196 108 204 118 200 136 C196 152 180 154 110 152 C44 150 26 150 22 132 Z" fill={P.pillow} {...line} />
      <g stroke={P.lilac} strokeWidth={5} opacity={0.45}>
        <path d="M50 108 v42 M80 107 v44 M110 108 v44 M140 108 v44 M170 109 v42" />
        <path d="M26 122 h172 M26 138 h172" />
      </g>
      {/* body lying down */}
      <path d="M52 118 C44 86 72 66 110 68 C150 70 182 88 178 116 C175 138 150 144 112 142 C76 140 58 138 52 118 Z" fill={P.potato} {...line} />
      <path d="M70 132 C96 140 140 140 164 128" fill="none" stroke={P.potatoShade} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
      <ellipse cx="156" cy="100" rx="3.5" ry="2.6" fill={P.potatoSpot} />
      <ellipse cx="136" cy="122" rx="3" ry="2.4" fill={P.potatoSpot} />
      <ellipse cx="166" cy="116" rx="2.4" ry="2" fill={P.potatoSpot} />
      {/* hat tipped over */}
      <g transform="rotate(-18 80 80)">
        <path d="M44 88 C42 68 48 44 58 39 C70 34 94 34 106 39 C116 44 120 68 118 88 Z" fill={P.hat} {...line} />
        <path d="M52 66 C68 61 96 61 112 66" fill="none" stroke={P.hatStitch} strokeWidth={1.8} strokeDasharray="4 4" strokeLinecap="round" />
        <path d="M14 100 C20 80 140 78 148 100 C148 108 130 106 82 106 C34 106 14 108 14 100 Z" fill={P.hatShade} {...line} />
      </g>
      {/* sleepy face */}
      <path d="M92 114 q6 6 12 0" fill="none" {...line} />
      <path d="M118 112 q6 6 12 0" fill="none" {...line} />
      <ellipse cx="88" cy="124" rx="7" ry="4.5" fill={P.blush} opacity={0.85} />
      <ellipse cx="136" cy="122" rx="7" ry="4.5" fill={P.blush} opacity={0.85} />
      <ellipse cx="111" cy="126" rx="3" ry="2.4" fill="none" {...thin} />
      {/* z z z */}
      <g fill="none" stroke={P.lilac} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M160 52 h10 l-10 11 h10" />
        <path d="M178 32 h13 l-13 14 h13" />
        <path d="M198 14 h8 l-8 9 h8" />
      </g>
    </Art>
  );
}

/** Puzzled, with a magnifying glass: for "no results" and "page not found". */
export function MascotPuzzled(props: ArtProps) {
  return (
    <Art viewBox="0 0 200 200" {...props}>
      <GroundShadow />
      <Feet />
      <Arm x={50} y={150} rotate={20} />
      <Body />
      {/* magnifying glass */}
      <path d="M164 160 l16 18" {...line} strokeWidth={6} />
      <circle cx="154" cy="146" r="16" fill={P.white} fillOpacity={0.7} {...line} />
      <path d="M146 140 q4 -6 11 -6" fill="none" stroke={P.lilac} strokeWidth={3} strokeLinecap="round" />
      <Arm x={166} y={170} rotate={-40} />
      <Hat tilt={8} />
      <circle cx="84" cy="134" r="5" fill={P.ink} />
      <path d="M110 134 q6 -5 12 0" fill="none" {...line} />
      <path d="M76 122 q8 -5 15 -2" fill="none" {...thin} />
      <Blush />
      <ellipse cx="100" cy="149" rx="4" ry="3.5" fill="none" {...thin} />
      <path d="M168 40 C168 28 186 28 186 40 C186 50 176 50 176 60" fill="none" stroke={P.lilac} strokeWidth={4} strokeLinecap="round" />
      <circle cx="176" cy="72" r="2.6" fill={P.lilac} />
    </Art>
  );
}
