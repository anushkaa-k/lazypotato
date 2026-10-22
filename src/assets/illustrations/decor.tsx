import { Art, type ArtProps } from './Art';
import { P, line, thin } from './palette';

/* Small decorative elements. Always decorative: never give these a title. */

export function HeartDoodle(props: ArtProps & { fill?: string }) {
  const { fill = P.blush, ...rest } = props;
  return (
    <Art viewBox="0 0 40 40" wobble={1} {...rest}>
      <path d="M20 12 C14 2 2 8 8 20 L20 33 L32 20 C38 8 26 2 20 12 Z" fill={fill} {...thin} />
    </Art>
  );
}

export function SparkleDoodle(props: ArtProps & { fill?: string }) {
  const { fill = P.lilac, ...rest } = props;
  return (
    <Art viewBox="0 0 40 40" wobble={1} {...rest}>
      <path d="M20 4 C22 16 24 18 36 20 C24 22 22 24 20 36 C18 24 16 22 4 20 C16 18 18 16 20 4 Z" fill={fill} {...thin} />
    </Art>
  );
}

export function LavenderSprig(props: ArtProps) {
  return (
    <Art viewBox="0 0 60 120" wobble={1} {...props}>
      <path d="M30 116 C30 80 28 50 32 14" fill="none" stroke={P.sageDeep} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M30 96 c-10 -4 -16 -14 -14 -22 c8 4 12 12 14 22 Z" fill={P.sage} {...thin} />
      {[14, 24, 34, 44, 54, 64].map((y, i) => (
        <g key={y}>
          <ellipse cx={26 - (i % 2)} cy={y} rx="5" ry="7" fill={i % 2 ? P.lilac : P.hat} {...thin} transform={`rotate(-20 ${26 - (i % 2)} ${y})`} />
          <ellipse cx={37 - (i % 2)} cy={y + 4} rx="5" ry="7" fill={i % 2 ? P.hat : P.lilac} {...thin} transform={`rotate(20 ${37 - (i % 2)} ${y + 4})`} />
        </g>
      ))}
    </Art>
  );
}

export function SpatulaDoodle(props: ArtProps) {
  return (
    <Art viewBox="0 0 40 120" wobble={1} {...props}>
      <rect x="10" y="6" width="20" height="40" rx="7" fill={P.lilac} {...line} />
      <path d="M16 16 v20 M24 16 v20" stroke={P.ink} strokeWidth={2} strokeLinecap="round" />
      <rect x="16" y="44" width="8" height="70" rx="4" fill={P.peach} {...line} />
    </Art>
  );
}

export function WhiskDoodle(props: ArtProps) {
  return (
    <Art viewBox="0 0 50 120" wobble={1} {...props}>
      <path d="M25 70 C6 54 8 10 25 6 C42 10 44 54 25 70 Z" fill="none" {...thin} />
      <path d="M25 70 C14 52 16 14 25 6 C34 14 36 52 25 70 Z" fill="none" {...thin} />
      <path d="M25 70 V6" {...thin} />
      <rect x="20" y="68" width="10" height="46" rx="5" fill={P.hat} {...line} />
    </Art>
  );
}

export function SpoonDoodle(props: ArtProps) {
  return (
    <Art viewBox="0 0 40 120" wobble={1} {...props}>
      <ellipse cx="20" cy="22" rx="13" ry="17" fill={P.lavender} {...line} />
      <path d="M14 16 q3 -6 8 -6" fill="none" stroke={P.white} strokeWidth={2.5} strokeLinecap="round" />
      <rect x="16" y="38" width="8" height="76" rx="4" fill={P.lavender} {...line} />
    </Art>
  );
}

export function SteamDoodle(props: ArtProps) {
  return (
    <Art viewBox="0 0 60 60" wobble={1} {...props}>
      <path d="M18 54 q-8 -10 0 -20 q8 -10 0 -20 M34 54 q-8 -10 0 -20 q8 -10 0 -20" fill="none" stroke={P.lilac} strokeWidth={3} strokeLinecap="round" />
    </Art>
  );
}

export function Squiggle(props: ArtProps) {
  return (
    <Art viewBox="0 0 200 16" wobble={0.6} {...props}>
      <path d="M4 10 C40 4 80 4 120 8 C150 10 176 8 196 6" fill="none" stroke={P.lilac} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    </Art>
  );
}
