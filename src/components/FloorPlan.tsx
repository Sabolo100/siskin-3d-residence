import type { Apartment } from '../data'

type PlanProps = {
  apartment: Apartment
  compact?: boolean
}

function Furniture() {
  return (
    <>
      <g className="plan-sofa">
        <rect x="0" y="0" width="92" height="34" rx="8" />
        <rect x="8" y="8" width="36" height="18" rx="5" />
        <rect x="48" y="8" width="36" height="18" rx="5" />
      </g>
      <g className="plan-table">
        <rect x="0" y="0" width="62" height="32" rx="16" />
        <circle cx="-8" cy="8" r="6" />
        <circle cx="-8" cy="24" r="6" />
        <circle cx="70" cy="8" r="6" />
        <circle cx="70" cy="24" r="6" />
      </g>
      <g className="plan-bed">
        <rect x="0" y="0" width="74" height="92" rx="5" />
        <rect x="7" y="7" width="28" height="20" rx="4" />
        <rect x="39" y="7" width="28" height="20" rx="4" />
        <path d="M7 35 Q37 49 67 35 V84 H7Z" />
      </g>
      <g className="plan-plant">
        <circle cx="0" cy="0" r="11" />
        <path d="M0 -9V9M-7 -5L7 5M7 -5L-7 5" />
      </g>
    </>
  )
}

function CompactPlan() {
  return (
    <g>
      <path className="plan-terrace" d="M82 65 H510 Q546 65 550 102 V342 Q548 370 520 374 H82Z" />
      <path className="plan-floor" d="M124 96 H484 Q510 96 510 122 V332 H124Z" />
      <path className="plan-wall" d="M124 96H484Q510 96 510 122V332H124V96ZM286 96V213H124M286 213V332M405 213V332M286 272H405" />
      <path className="plan-window" d="M166 90H252M326 90H447M504 137V196M504 238V304" />
      <g transform="translate(163 130)"><use href="#sofa" /></g>
      <g transform="translate(174 174)"><use href="#table" /></g>
      <g transform="translate(327 107)"><use href="#bed" /></g>
      <g transform="translate(425 231)"><rect className="plan-fixture" width="45" height="76" rx="5" /><circle className="plan-detail" cx="22" cy="22" r="10" /></g>
      <g transform="translate(315 232)"><path className="plan-kitchen" d="M0 0H70V22H20V65H0Z" /></g>
      <g transform="translate(468 110)"><use href="#plant" /></g>
      <g transform="translate(490 348)"><use href="#plant" /></g>
      <text className="plan-label" x="188" y="288">NAPPALI + KONYHA</text>
      <text className="plan-label" x="340" y="194">HÁLÓ</text>
      <text className="plan-label" x="421" y="319">FÜRDŐ</text>
    </g>
  )
}

function FamilyPlan() {
  return (
    <g>
      <path className="plan-terrace" d="M58 72H522Q558 72 558 108V356H58Z" />
      <path className="plan-floor" d="M104 104H513V326H104Z" />
      <path className="plan-wall" d="M104 104H513V326H104V104ZM310 104V326M410 104V225M410 225H513M310 249H410" />
      <path className="plan-window" d="M142 98H275M337 98H393M428 98H484M507 248V302" />
      <g transform="translate(138 135)"><use href="#sofa" /></g>
      <g transform="translate(172 205)"><use href="#table" /></g>
      <g transform="translate(327 118) scale(.82)"><use href="#bed" /></g>
      <g transform="translate(431 118) scale(.82)"><use href="#bed" /></g>
      <g transform="translate(334 264)"><path className="plan-kitchen" d="M0 0H55V18H18V45H0Z" /></g>
      <g transform="translate(430 245)"><rect className="plan-fixture" width="58" height="58" rx="5" /><circle className="plan-detail" cx="28" cy="20" r="9" /></g>
      <g transform="translate(90 91)"><use href="#plant" /></g>
      <g transform="translate(530 340)"><use href="#plant" /></g>
      <text className="plan-label" x="167" y="298">NAPPALI</text>
      <text className="plan-label" x="331" y="210">HÁLÓ</text>
      <text className="plan-label" x="426" y="210">DOLGOZÓ</text>
    </g>
  )
}

function CornerPlan() {
  return (
    <g>
      <path className="plan-terrace" d="M63 64H506Q553 64 555 112V360H360V386H63Z" />
      <path className="plan-floor" d="M104 102H508V319H342V348H104Z" />
      <path className="plan-wall" d="M104 102H508V319H342V348H104V102ZM306 102V348M408 102V226M408 226H508M306 238H408M190 238V348" />
      <path className="plan-window" d="M137 96H273M330 96H392M426 96H486M502 245V301M218 342H285M110 264V322" />
      <g transform="translate(137 132)"><use href="#sofa" /></g>
      <g transform="translate(175 190)"><use href="#table" /></g>
      <g transform="translate(328 116) scale(.83)"><use href="#bed" /></g>
      <g transform="translate(429 116) scale(.78)"><use href="#bed" /></g>
      <g transform="translate(210 255) scale(.78)"><use href="#bed" /></g>
      <g transform="translate(327 258)"><path className="plan-kitchen" d="M0 0H58V18H18V56H0Z" /></g>
      <g transform="translate(427 247)"><rect className="plan-fixture" width="57" height="54" rx="5" /><circle className="plan-detail" cx="28" cy="20" r="8" /></g>
      <g transform="translate(80 82)"><use href="#plant" /></g>
      <g transform="translate(528 340)"><use href="#plant" /></g>
      <text className="plan-label" x="151" y="224">NAPPALI</text>
      <text className="plan-label" x="125" y="291">HÁLÓ 3</text>
      <text className="plan-label" x="332" y="216">MASTER</text>
    </g>
  )
}

function PenthousePlan() {
  return (
    <g>
      <path className="plan-terrace" d="M44 55H510Q568 55 570 113V364H376Q351 392 318 392H44Z" />
      <path className="plan-floor" d="M99 101H514V314H354Q333 347 304 347H99Z" />
      <path className="plan-wall" d="M99 101H514V314H354Q333 347 304 347H99V101ZM319 101V347M421 101V225M421 225H514M319 240H421M196 240V347" />
      <path className="plan-window" d="M136 95H284M343 95H402M440 95H492M508 244V294M223 341H295M105 260V325" />
      <g transform="translate(131 129) scale(1.08)"><use href="#sofa" /></g>
      <g transform="translate(173 193)"><use href="#table" /></g>
      <g transform="translate(340 116) scale(.86)"><use href="#bed" /></g>
      <g transform="translate(445 116) scale(.72)"><use href="#bed" /></g>
      <g transform="translate(216 257) scale(.73)"><use href="#bed" /></g>
      <g transform="translate(342 259)"><path className="plan-kitchen" d="M0 0H61V18H18V55H0Z" /></g>
      <g transform="translate(443 247)"><rect className="plan-fixture" width="50" height="47" rx="5" /><circle className="plan-detail" cx="25" cy="18" r="8" /></g>
      <g transform="translate(72 79)"><use href="#plant" /></g>
      <g transform="translate(536 331)"><use href="#plant" /></g>
      <g transform="translate(505 76)"><use href="#plant" /></g>
      <text className="plan-label" x="146" y="226">NAPPALI + ÉTKEZŐ</text>
      <text className="plan-label" x="342" y="218">MASTER SUITE</text>
      <text className="plan-label" x="111" y="293">DOLGOZÓ</text>
    </g>
  )
}

export default function FloorPlan({ apartment, compact = false }: PlanProps) {
  return (
    <div className={`floor-plan ${compact ? 'is-compact' : ''}`} style={{ '--plan-accent': apartment.accent } as React.CSSProperties}>
      <svg viewBox="0 0 620 430" role="img" aria-label={`${apartment.name} lakás alaprajza`}>
        <defs>
          <pattern id="floorPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill="#f0ece2" />
            <path d="M0 14L14 0" stroke="#e8e1d5" strokeWidth="0.7" />
          </pattern>
          <g id="sofa"><Furniture /></g>
          <g id="table" className="plan-table"><rect width="62" height="32" rx="16" /><circle cx="-8" cy="8" r="6" /><circle cx="-8" cy="24" r="6" /><circle cx="70" cy="8" r="6" /><circle cx="70" cy="24" r="6" /></g>
          <g id="bed" className="plan-bed"><rect width="74" height="92" rx="5" /><rect x="7" y="7" width="28" height="20" rx="4" /><rect x="39" y="7" width="28" height="20" rx="4" /><path d="M7 35Q37 49 67 35V84H7Z" /></g>
          <g id="plant" className="plan-plant"><circle r="11" /><path d="M0-9V9M-7-5L7 5M7-5L-7 5" /></g>
          <filter id="planShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1e2823" floodOpacity=".10" />
          </filter>
        </defs>
        <rect x="20" y="20" width="580" height="390" rx="28" className="plan-canvas" />
        <g filter="url(#planShadow)">
          {apartment.plan === 'compact' && <CompactPlan />}
          {apartment.plan === 'family' && <FamilyPlan />}
          {apartment.plan === 'corner' && <CornerPlan />}
          {apartment.plan === 'penthouse' && <PenthousePlan />}
        </g>
        <g className="plan-compass" transform="translate(566 58)">
          <circle r="22" />
          <path d="M0-14L5 3 0 0-5 3Z" />
          <text x="0" y="-27">É</text>
        </g>
      </svg>
    </div>
  )
}
