const BUMPS = [
  [100, 18], [143, 29], [171, 62], [182, 105], [165, 146], [130, 175],
  [85, 183], [45, 165], [20, 128], [17, 85], [38, 45], [68, 22],
];

const CHIPS = [
  [72, 68, 12, 8, 20], [128, 76, 13, 9, -30], [96, 112, 11, 7, 10],
  [144, 124, 12, 8, 45], [62, 128, 11, 7, -15], [108, 152, 12, 8, 25],
  [104, 52, 8, 6, 0], [156, 96, 7, 5, 0], [46, 96, 7, 5, 60],
];

function CookieArt({ dough = '#d9993f', edge = '#b97a2e', chip = '#3b2418', className, style }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <g fill={edge}>
        {BUMPS.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="11" />)}
      </g>
      <circle cx="100" cy="100" r="82" fill={dough} />
      <circle cx="100" cy="100" r="82" fill="none" stroke="#000" opacity=".12" strokeWidth="3" />
      <g fill={chip}>
        {CHIPS.map(([cx, cy, rx, ry, r], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
                   transform={`rotate(${r} ${cx} ${cy})`} />
        ))}
      </g>
      <path d="M50 80q50-40 100-6" fill="none" stroke="#fff" opacity=".22"
            strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default CookieArt;