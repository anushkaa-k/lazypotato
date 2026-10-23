import { Art, type ArtProps } from './Art';
import { P, line, thin } from './palette';

/* Category food illustrations: 160×160, soft lavender ground shadow, plum outlines. */

function Shadow({ rx = 56 }: { rx?: number }) {
  return <ellipse cx="80" cy="140" rx={rx} ry="7" fill={P.shadow} />;
}

export function SandwichArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow />
      <rect x="28" y="110" width="104" height="22" rx="10" fill={P.bread} {...line} />
      <path d="M30 108 h100 v6 h-100 Z" fill={P.tomato} {...thin} />
      <path d="M28 100 h104 l-4 10 l-8 -4 l-8 8 l-8 -6 l-10 8 l-8 -8 l-10 6 l-8 -8 l-10 8 l-8 -6 l-10 6 Z" fill={P.cheese} {...thin} />
      <path d="M24 98 c8 -8 12 4 20 -2 c8 -6 12 6 20 -1 c8 -6 12 6 20 -1 c8 -6 12 6 20 -1 c8 -6 12 6 20 0 l0 8 l-100 0 Z" fill={P.sage} {...thin} />
      <path d="M26 86 C24 54 136 54 134 86 C134 96 26 96 26 86 Z" fill={P.bread} {...line} />
      <path d="M40 76 C52 64 108 64 120 76" fill="none" stroke={P.crust} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <path d="M100 66 v-34" {...thin} />
      <path d="M100 32 l20 6 l-20 7 Z" fill={P.lavender} {...thin} />
      <ellipse cx="62" cy="74" rx="2" ry="3" fill={P.cream} />
      <ellipse cx="80" cy="70" rx="2" ry="3" fill={P.cream} />
      <ellipse cx="72" cy="80" rx="2" ry="3" fill={P.cream} />
    </Art>
  );
}

export function ParathaArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow rx={62} />
      <path d="M128 98 L156 86" {...line} strokeWidth={8} />
      <path d="M128 98 L156 86" stroke={P.chocolate} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx="74" cy="104" rx="62" ry="30" fill="#6F5C80" {...line} />
      <ellipse cx="74" cy="98" rx="50" ry="24" fill={P.cheese} {...line} />
      <path d="M30 98 C40 82 112 80 122 96" fill="none" stroke={P.crust} strokeWidth={2.5} strokeLinecap="round" />
      <ellipse cx="56" cy="96" rx="5" ry="3" fill={P.crust} />
      <ellipse cx="88" cy="104" rx="6" ry="3" fill={P.crust} />
      <ellipse cx="96" cy="90" rx="4" ry="2.4" fill={P.crust} />
      <ellipse cx="66" cy="108" rx="3.5" ry="2" fill={P.crust} />
      <path d="M70 86 l12 -4 l10 5 l-12 5 Z" fill="#FFF3C8" {...thin} />
      <path d="M58 60 q-6 -8 0 -16 q6 -8 0 -16 M78 56 q-6 -8 0 -16 q6 -8 0 -16" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
    </Art>
  );
}

export function PastaArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow />
      <path d="M118 30 L96 92" {...line} />
      <path d="M112 26 l-6 18 M120 29 l-6 18 M128 32 l-6 18" {...thin} />
      <g fill="none" stroke={P.ink} strokeWidth={2.4} strokeLinecap="round">
        <path d="M44 86 c-4 -18 18 -24 22 -8 c4 14 -16 16 -12 2" />
        <path d="M66 84 c0 -22 26 -22 24 -4 c-2 14 -18 10 -14 -2" />
        <path d="M88 86 c6 -18 28 -10 22 4" />
      </g>
      <path d="M40 88 c4 -10 16 -16 26 -12 c8 -10 24 -10 32 0 c10 -4 22 2 24 12 Z" fill={P.cheese} {...thin} />
      <path d="M62 82 c4 -8 14 -10 20 -4 c-4 6 -14 8 -20 4 Z" fill={P.tomato} {...thin} />
      <path d="M90 74 c6 -6 14 -4 14 2 c-6 4 -12 4 -14 -2 Z" fill={P.sage} {...thin} />
      <path d="M24 88 h112 C134 122 112 138 80 138 C48 138 26 122 24 88 Z" fill={P.lavender} {...line} />
      <path d="M38 104 C50 114 110 114 122 104" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeDasharray="5 6" strokeLinecap="round" />
    </Art>
  );
}

export function ChutneyArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow />
      <path d="M46 56 h52 v12 c10 6 12 12 12 22 v34 c0 10 -6 14 -14 14 h-48 c-8 0 -14 -4 -14 -14 v-34 c0 -10 2 -16 12 -22 Z" fill={P.white} {...line} />
      <path d="M38 92 c18 -6 52 6 70 0 v32 c0 8 -4 12 -12 12 h-46 c-8 0 -12 -4 -12 -12 Z" fill={P.sageDeep} opacity={0.85} />
      <path d="M38 92 c18 -6 52 6 70 0" fill="none" {...thin} />
      <rect x="42" y="38" width="60" height="20" rx="6" fill={P.hat} {...line} />
      <g stroke={P.hatStitch} strokeWidth={2} opacity={0.6}>
        <path d="M54 40 v16 M66 40 v16 M78 40 v16 M90 40 v16" />
      </g>
      <rect x="50" y="98" width="44" height="22" rx="6" fill={P.cream} {...thin} />
      <path d="M72 104 c-3 -3 -8 0 -4 4 l4 4 l4 -4 c4 -4 -1 -7 -4 -4 Z" fill={P.blush} stroke={P.ink} strokeWidth={1.4} />
      <path d="M118 76 C122 100 124 120 126 136" {...thin} />
      <ellipse cx="117" cy="70" rx="8" ry="11" fill={P.lavender} {...thin} />
      <path d="M126 46 c6 -2 10 -10 6 -16 c-8 4 -10 10 -6 16 Z M126 46 c-6 -2 -12 0 -14 6 c6 2 12 0 14 -6 Z" fill={P.sage} {...thin} />
    </Art>
  );
}

export function SaladArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow />
      <path d="M40 84 c-8 -20 14 -30 22 -16 c4 -18 30 -16 30 2 c10 -14 32 -6 26 12 c14 0 14 16 6 18 Z" fill={P.sage} {...line} />
      <path d="M58 78 c4 -6 10 -8 16 -6 M86 72 c6 -4 12 -2 14 2" fill="none" stroke={P.sageDeep} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx="56" cy="86" r="10" fill={P.tomato} {...thin} />
      <path d="M52 84 q4 -4 8 0" fill="none" stroke={P.cream} strokeWidth={2} strokeLinecap="round" />
      <circle cx="98" cy="84" r="11" fill="#DCEBC9" {...thin} />
      <circle cx="98" cy="84" r="6" fill="#EEF5E4" />
      <path d="M95 82 l1 2 M100 81 l1 2 M98 87 l1 1" stroke={P.ink} strokeWidth={1.5} strokeLinecap="round" />
      <rect x="72" y="76" width="12" height="12" rx="3" fill={P.white} {...thin} />
      <circle cx="116" cy="80" r="4" fill="#5E4A6E" {...thin} />
      <path d="M24 88 h112 C134 122 112 138 80 138 C48 138 26 122 24 88 Z" fill={P.peach} {...line} />
      <path d="M44 108 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4" fill="none" stroke={P.cream} strokeWidth={2.4} strokeLinecap="round" />
    </Art>
  );
}

export function BowlArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow />
      <path d="M30 88 C30 58 130 58 130 88 Z" fill={P.white} {...line} />
      <g stroke={P.lilac} strokeWidth={2} strokeLinecap="round" opacity={0.6}>
        <path d="M50 76 l4 -2 M64 70 l4 -1 M80 68 l4 1 M96 70 l4 2 M110 76 l4 2 M58 82 l4 -1 M74 78 l4 0 M90 80 l4 1" />
      </g>
      <rect x="44" y="70" width="14" height="14" rx="3" fill={P.cream} {...thin} transform="rotate(-10 51 77)" />
      <rect x="60" y="66" width="14" height="14" rx="3" fill={P.cream} {...thin} transform="rotate(8 67 73)" />
      <circle cx="96" cy="72" r="4" fill={P.cheese} {...thin} />
      <circle cx="104" cy="78" r="4" fill={P.cheese} {...thin} />
      <circle cx="90" cy="80" r="4" fill={P.cheese} {...thin} />
      <ellipse cx="82" cy="70" rx="5" ry="3.5" fill={P.chocolate} {...thin} />
      <ellipse cx="112" cy="70" rx="5" ry="3.5" fill={P.chocolate} {...thin} />
      <path d="M78 84 c6 -6 16 -6 20 0" fill={P.sage} {...thin} />
      <path d="M22 88 h116 C136 122 112 138 80 138 C48 138 24 122 22 88 Z" fill={P.lavender} {...line} />
      <path d="M58 112 c-4 -4 -10 0 -5 5 l5 5 l5 -5 c5 -5 -1 -9 -5 -5 Z" fill={P.blush} stroke={P.ink} strokeWidth={1.6} />
      <path d="M128 40 l-24 40" {...line} />
      <path d="M138 44 l-24 40" {...line} />
    </Art>
  );
}

export function DessertArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow rx={48} />
      <path d="M110 80 c18 0 18 34 0 34" fill="none" {...line} strokeWidth={6} />
      <path d="M110 80 c18 0 18 34 0 34" fill="none" stroke={P.hat} strokeWidth={2.5} />
      <path d="M40 68 h72 l-6 62 c-1 6 -6 10 -12 10 h-36 c-6 0 -11 -4 -12 -10 Z" fill={P.hat} {...line} />
      <path d="M38 70 c0 -16 76 -16 76 0 c0 6 -8 8 -38 8 c-30 0 -38 -2 -38 -8 Z" fill={P.chocolate} {...line} />
      <path d="M44 74 c0 10 6 10 6 2 M96 76 c0 12 6 12 6 0" fill={P.chocolate} {...thin} />
      <rect x="62" y="56" width="7" height="6" rx="2" fill={P.chocolateDark} />
      <rect x="80" y="60" width="7" height="6" rx="2" fill={P.chocolateDark} />
      <rect x="70" y="64" width="6" height="5" rx="2" fill={P.chocolateDark} />
      <path d="M68 104 c-4 -4 -10 0 -5 5 l5 5 l5 -5 c5 -5 -1 -9 -5 -5 Z" fill={P.blush} stroke={P.ink} strokeWidth={1.6} />
      <path d="M64 42 q-6 -8 0 -14 q6 -6 0 -14 M86 44 q-6 -8 0 -14 q6 -6 0 -14" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
    </Art>
  );
}

export function OccasionalArt(props: ArtProps) {
  return (
    <Art {...props}>
      <Shadow rx={64} />
      <ellipse cx="80" cy="112" rx="66" ry="26" fill={P.white} {...line} />
      <ellipse cx="80" cy="108" rx="50" ry="17" fill="none" stroke={P.lilac} strokeWidth={2} strokeDasharray="4 5" />
      <path d="M36 108 c0 -22 44 -28 52 -4 c2 10 -10 14 -26 14 c-16 0 -26 -2 -26 -10 Z" fill={P.tomato} {...line} />
      <path d="M48 98 l3 0 M60 94 l3 1 M70 100 l3 0" stroke={P.cream} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M58 88 l8 -3 l6 4 l-8 3 Z" fill="#FFF3C8" {...thin} />
      <path d="M50 92 c4 -6 10 -6 12 -2" fill="none" stroke={P.sageDeep} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M92 108 C90 88 128 86 128 106 C128 114 92 116 92 108 Z" fill={P.bread} {...line} />
      <path d="M100 96 c8 -4 18 -4 22 2" fill="none" stroke={P.crust} strokeWidth={3} strokeLinecap="round" />
      <path d="M100 118 C98 100 136 98 136 116 C136 124 100 126 100 118 Z" fill={P.bread} {...line} />
      <path d="M108 108 c8 -4 18 -4 22 2" fill="none" stroke={P.crust} strokeWidth={3} strokeLinecap="round" />
      <path d="M22 124 l16 -12 l4 14 Z" fill={P.cheese} {...thin} />
      <path d="M58 52 q-6 -8 0 -16 q6 -8 0 -14 M76 48 q-6 -8 0 -16 q6 -8 0 -14" fill="none" stroke={P.lilac} strokeWidth={2.5} strokeLinecap="round" />
    </Art>
  );
}
