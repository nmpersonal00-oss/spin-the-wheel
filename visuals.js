/* Live procedural artwork: no screenshots, image crops or third-party animation assets. */
(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ns = 'http://www.w3.org/2000/svg';

  function make(tag, className, parent, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    parent.append(node);
    return node;
  }

  const backdrop = document.getElementById('backdrop');
  for (const side of ['left', 'right']) make('div', 'ambientCloud ' + side, document.body);
  const ambient = make('canvas', '', document.body);
  ambient.id = 'ambientCanvas';
  ambient.setAttribute('aria-hidden', 'true');

  const stage = document.getElementById('stage');
  const brand = make('h1', '', stage);
  brand.id = 'desktopBrand';
  brand.innerHTML = '<span class="heart">♡</span> Spin the Wheel <span class="heart">♡</span>';

  const decor = make('div', '', stage);
  decor.id = 'desktopDecor';
  const charms = [
    [80, 88, '✿', 83, 'flower'], [215, 163, '✧', 52, 'star'],
    [1360, 108, '☾', 110, 'moon'], [1518, 164, '✿', 76, 'flower'],
    [406, 243, '☆', 50, 'star'], [1204, 305, '♡', 63, 'heart'],
    [65, 647, '✧', 66, 'star'], [300, 735, '♡', 72, 'heart'],
    [1418, 739, '✿', 82, 'flower'], [1545, 340, '☆', 49, 'star'],
    [380, 849, '✧', 40, 'star'], [1125, 863, '♡', 56, 'heart'],
    [480, 133, '✧', 35, 'star'], [1170, 151, '✦', 32, 'star'],
    [30, 20, '✿', 71, 'flower'], [1640, 33, '✿', 67, 'flower']
  ];
  charms.forEach(([x, y, glyph, size, type], i) => {
    const c = make('span', 'sceneCharm ' + type, decor, glyph);
    c.style.cssText = 'left:' + x + 'px;top:' + y + 'px;font-size:' + size +
      'px;--period:' + (6 + (i % 6) * 1.7) + 's;animation-delay:-' + (i * .9) + 's';
  });

  const addPanel = make('div', '', stage);
  addPanel.id = 'desktopAddPanel';
  make('h2', '', addPanel, '✧ Add Items ✧');

  document.getElementById('desktopAdd').querySelector('button').textContent = '+';
  document.getElementById('spinDesktop').textContent = 'Spin';

  const ring = make('div', '', stage);
  ring.id = 'wheelRing';
  for (let i = 0; i < 32; i++) {
    const bulb = make('span', 'bulb', ring);
    const angle = i * Math.PI / 16 - Math.PI / 2;
    bulb.style.left = (50 + Math.cos(angle) * 50) + '%';
    bulb.style.top = (50 + Math.sin(angle) * 50) + '%';
    bulb.style.setProperty('--delay', -((i * 7) % 23) / 10 + 's');
  }

  function hubSvg(prefix) {
    return `<svg viewBox="0 0 220 220" role="presentation" aria-hidden="true">
    <defs>
      <radialGradient id="${prefix}core"><stop stop-color="#ffdeef"/><stop offset=".45" stop-color="#d86cb5"/><stop offset="1" stop-color="#66306e"/></radialGradient>
      <linearGradient id="${prefix}ribbon" x1="0" x2=".85" y1="0" y2="1">
        <stop stop-color="#fff4f7"/><stop offset=".26" stop-color="#ffa9d5"/><stop offset=".62" stop-color="#e673b6"/><stop offset="1" stop-color="#9b397f"/>
      </linearGradient>
      <radialGradient id="${prefix}jewel" cx=".32" cy=".21">
        <stop stop-color="#fff7fb"/><stop offset=".28" stop-color="#ffb4e0"/><stop offset=".75" stop-color="#f052a6"/><stop offset="1" stop-color="#a92977"/>
      </radialGradient>
    </defs>
    <circle cx="110" cy="110" r="68" fill="url(#${prefix}core)" stroke="#ffe2f4" stroke-width="6" opacity=".94"/>
    <circle cx="110" cy="110" r="58" fill="none" stroke="#fff1fb" stroke-width="2" opacity=".55"/>
    <path d="M101 115 Q64 151 55 192 Q84 188 104 169 Q102 195 124 208 Q143 157 122 112Z"
      fill="url(#${prefix}ribbon)" stroke="#fff0f6" stroke-width="3"/>
    <path d="M109 101 Q69 55 30 69 Q8 84 22 118 Q45 145 110 119Z"
      fill="url(#${prefix}ribbon)" stroke="#ffe9f3" stroke-width="4"/>
    <path d="M111 101 Q151 55 190 69 Q212 84 198 118 Q175 145 110 119Z"
      fill="url(#${prefix}ribbon)" stroke="#ffe9f3" stroke-width="4"/>
    <path d="M32 92 Q61 83 92 110 M187 92 Q157 83 128 110"
      stroke="#fff7fc" stroke-width="7" opacity=".64" fill="none" stroke-linecap="round"/>
    <path d="M102 111 Q82 128 48 126 M118 111 Q139 128 172 126"
      stroke="#ae3c8e" stroke-width="3" opacity=".55" fill="none"/>
    <path d="M110 99 C94 76 70 93 83 114 C92 127 103 134 110 142 C119 133 130 125 138 112 C150 89 124 77 110 99Z"
      fill="url(#${prefix}jewel)" stroke="#fff8f6" stroke-width="5"/>
    <path d="M94 101 Q102 90 109 102" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>
    </svg>`;
  }

  function pointerSvg(prefix) {
    return `<svg viewBox="0 0 124 168" role="presentation" aria-hidden="true">
    <defs>
      <linearGradient id="${prefix}pink" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#ffe9f7"/><stop offset=".38" stop-color="#ff8ed0"/><stop offset="1" stop-color="#a8398d"/>
      </linearGradient>
      <radialGradient id="${prefix}heart" cx=".3" cy=".2">
        <stop stop-color="#fff9fd"/><stop offset=".28" stop-color="#ffc7e5"/><stop offset=".72" stop-color="#f963b5"/><stop offset="1" stop-color="#a22d81"/>
      </radialGradient>
    </defs>
    <path d="M61 31 Q20 4 7 20 Q-1 39 44 49 Q13 61 14 90 Q44 69 62 52 Q80 69 110 90 Q111 61 80 49 Q125 39 117 20 Q104 4 63 31Z"
     fill="url(#${prefix}pink)" stroke="#ffe8f6" stroke-width="3"/>
    <path d="M62 52 V72" stroke="#ffdfef" stroke-width="4" stroke-linecap="round"/>
    <path d="M62 73 C40 46 12 70 25 94 C36 113 53 127 62 143 C72 127 90 113 99 94 C113 69 83 47 62 73Z"
      fill="url(#${prefix}heart)" stroke="#fff0f8" stroke-width="5"/>
    <path d="M41 79 Q48 71 57 79" fill="none" stroke="#fff8fc" opacity=".8" stroke-width="5" stroke-linecap="round"/>
    <path d="M62 143 L62 160" stroke="#ffe8f6" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="159" r="4" fill="#fff9fa"/>
    </svg>`;
  }

  const desktopHub = make('div', 'wheelHubVector', stage);
  desktopHub.id = 'desktopHubVector';
  desktopHub.innerHTML = hubSvg('desktop-');
  const desktopPointer = make('div', 'wheelPointerVector', stage);
  desktopPointer.id = 'desktopPointerVector';
  desktopPointer.innerHTML = pointerSvg('desktop-');

  const mobileWheel = document.getElementById('mobileWheelOuter');
  const mobileHub = make('div', 'wheelHubVector', mobileWheel);
  mobileHub.id = 'mobileHubVector';
  mobileHub.innerHTML = hubSvg('mobile-');
  const mobilePointer = make('div', 'wheelPointerVector', mobileWheel);
  mobilePointer.id = 'mobilePointerVector';
  mobilePointer.innerHTML = pointerSvg('mobile-');

  // The starfield and falling cherry blossom petals use live, continuously redrawn paths.
  const actx = ambient.getContext('2d');
  const stars = [], petals = [];
  let w = 1, h = 1, dpr = 1;
  function seeded(i, k) { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); }
  function resize() {
    w = innerWidth; h = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    ambient.width = Math.round(w * dpr); ambient.height = Math.round(h * dpr);
    actx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars.length = 0; petals.length = 0;
    const count = Math.min(110, Math.max(38, Math.round(w * h / 17000)));
    for (let i = 0; i < count; i++) stars.push({
      x: seeded(i, 1) * w, y: seeded(i, 2) * h,
      radius: .6 + seeded(i, 3) * 2.2, phase: seeded(i, 4) * 6.283,
      speed: .4 + seeded(i, 5) * 1.4, glow: seeded(i, 6) > .8
    });
    const n = Math.min(28, Math.max(12, Math.round(w / 65)));
    for (let i = 0; i < n; i++) petals.push({
      x: seeded(i + 220, 1) * w, y: seeded(i + 220, 2) * h,
      size: 2.7 + seeded(i + 220, 3) * 4.4,
      phase: seeded(i + 220, 4) * 6.28,
      speed: 9 + seeded(i + 220, 5) * 18,
      drift: 8 + seeded(i + 220, 6) * 18
    });
  }
  function drawPetal(p, t) {
    const x = p.x + Math.sin(t * .38 + p.phase) * p.drift;
    const y = (p.y + t * p.speed) % (h + 45) - 22;
    actx.save(); actx.translate(x, y); actx.rotate(t * .45 + p.phase);
    actx.globalAlpha = .24 + .23 * (1 + Math.cos(t + p.phase)) / 2;
    actx.fillStyle = '#ffaad4';
    actx.beginPath();
    actx.moveTo(0, -p.size);
    actx.bezierCurveTo(-p.size, -p.size * .75, -p.size, p.size * .65, 0, p.size);
    actx.bezierCurveTo(p.size, p.size * .65, p.size, -p.size * .75, 0, -p.size);
    actx.fill(); actx.restore();
  }
  // Hand-drawn silk ribbons and sakura clusters frame the moving night sky.
  function cornerFlorals(t) {
    const scale = Math.max(.48, Math.min(1.1, w / 1450));
    actx.save();
    actx.globalAlpha = .32;
    actx.lineCap = 'round';
    for (const right of [false, true]) {
      actx.save();
      if (right) { actx.translate(w, 0); actx.scale(-1, 1); }
      const ribbon = actx.createLinearGradient(0, 0, 235 * scale, 270 * scale);
      ribbon.addColorStop(0, '#ffdaef'); ribbon.addColorStop(.5, '#f27bc6');
      ribbon.addColorStop(1, '#6d306f');
      actx.strokeStyle = ribbon; actx.lineWidth = 9 * scale;
      actx.beginPath(); actx.moveTo(0, 65 * scale);
      actx.bezierCurveTo(180 * scale, 35 * scale, 40 * scale, 174 * scale, 215 * scale, 212 * scale);
      actx.stroke();
      actx.strokeStyle = '#ffe5f4'; actx.lineWidth = 2 * scale; actx.stroke();
      actx.restore();
    }
    actx.restore();
    const flowers = [
      [.016,.022,26], [.061,.046,34], [.115,.009,23], [.035,.118,17],
      [.984,.029,28], [.938,.064,35], [.884,.014,22], [.963,.130,17],
      [.018,.962,33], [.080,.993,25], [.137,.957,19],
      [.984,.964,34], [.923,.996,25], [.858,.963,19]
    ];
    for(let i=0;i<flowers.length;i++){
      const [fx,fy,r]=flowers[i],sway=reducedMotion?0:Math.sin(t*.35+i)*3.0;
      actx.save(); actx.translate(fx*w+sway,fy*h+sway*.5);
      actx.rotate((i%5)*.32+(reducedMotion?0:Math.sin(t*.2+i)*.05));
      actx.globalAlpha=.48;
      actx.shadowColor='#f977c6';actx.shadowBlur=12;
      for(let j=0;j<5;j++){
        actx.save();actx.rotate(j*Math.PI*2/5);
        const petal=actx.createLinearGradient(0,-r,0,0);
        petal.addColorStop(0,'#fff1fa');petal.addColorStop(1,'#e77bbd');
        actx.fillStyle=petal;actx.strokeStyle='#ffdef2';actx.lineWidth=1;
        actx.beginPath();actx.ellipse(0,-r*.6,r*.42,r*.66,0,0,Math.PI*2);
        actx.fill();actx.stroke();actx.restore();
      }
      actx.shadowBlur=0;actx.fillStyle='#ffe0a1';
      actx.beginPath();actx.arc(0,0,r*.16,0,Math.PI*2);actx.fill();
      actx.restore();
    }
  }
  function paint(time) {
    const t = time / 1000;
    actx.clearRect(0, 0, w, h);
    cornerFlorals(t);
    for (const s of stars) {
      const glow = .28 + .58 * (1 + Math.sin(t * s.speed + s.phase)) / 2;
      actx.globalAlpha = glow;
      actx.fillStyle = s.glow ? '#ffe6b8' : '#ffcfed';
      actx.shadowColor = s.glow ? '#ffdeaa' : '#ff8bd3';
      actx.shadowBlur = s.glow ? 15 : 5;
      actx.beginPath(); actx.arc(s.x, s.y, s.radius, 0, Math.PI * 2); actx.fill();
      if (s.glow) {
        actx.strokeStyle = '#ffddf4'; actx.lineWidth = .8;
        actx.beginPath();
        actx.moveTo(s.x - s.radius * 3.2, s.y); actx.lineTo(s.x + s.radius * 3.2, s.y);
        actx.moveTo(s.x, s.y - s.radius * 3.2); actx.lineTo(s.x, s.y + s.radius * 3.2);
        actx.stroke();
      }
    }
    actx.shadowBlur = 0; actx.globalAlpha = 1;
    for (const p of petals) drawPetal(p, reducedMotion ? 0 : t);
    if (!reducedMotion) requestAnimationFrame(paint);
  }
  resize();
  addEventListener('resize', resize);
  requestAnimationFrame(paint);

  function icon(ctx, type, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 75, size / 75);
    ctx.shadowColor = '#ffcbec'; ctx.shadowBlur = 15;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const fill = ctx.createLinearGradient(-35, -35, 35, 35);
    fill.addColorStop(0, '#fff9f3'); fill.addColorStop(.45, '#ffc1e5'); fill.addColorStop(1, '#f26fb8');
    ctx.fillStyle = fill; ctx.strokeStyle = '#fff6f9'; ctx.lineWidth = 3.2;
    if (type === 'star') {
      ctx.beginPath();
      for (let j = 0; j < 10; j++) {
        const a = -Math.PI / 2 + j * Math.PI / 5, r = j % 2 ? 18 : 39;
        const px = Math.cos(a) * r, py = Math.sin(a) * r;
        if (!j) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else if (type === 'heart') {
      ctx.beginPath(); ctx.moveTo(0, 30);
      ctx.bezierCurveTo(-12, 21, -42, -3, -32, -24);
      ctx.bezierCurveTo(-22, -44, -4, -33, 0, -23);
      ctx.bezierCurveTo(8, -38, 30, -39, 36, -20);
      ctx.bezierCurveTo(43, 0, 13, 24, 0, 30);
      ctx.fill(); ctx.stroke();
    } else if (type === 'flower') {
      for (let j = 0; j < 5; j++) {
        ctx.save(); ctx.rotate(j * Math.PI * 2 / 5);
        ctx.beginPath(); ctx.ellipse(0, -23, 16, 23, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke(); ctx.restore();
      }
      ctx.shadowBlur = 0; ctx.fillStyle = '#ffe8a5';
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
    } else if (type === 'moon') {
      ctx.beginPath(); ctx.arc(3, 0, 36, -.95, 2.15, false);
      ctx.bezierCurveTo(-16, 22, -19, -15, 3 + 36 * Math.cos(-.95), 36 * Math.sin(-.95));
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else if (type === 'paw') {
      ctx.beginPath(); ctx.ellipse(0, 18, 26, 21, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      for (const [a, b, rx, ry, angle] of [[-28,-13,10,13,-.4],[-10,-25,10,14,-.1],[13,-25,10,14,.1],[31,-12,9,12,.4]]) {
        ctx.beginPath(); ctx.ellipse(a,b,rx,ry,angle,0,Math.PI * 2); ctx.fill(); ctx.stroke();
      }
    } else if (type === 'butterfly') {
      for (const sign of [-1, 1]) {
        ctx.save(); ctx.scale(sign, 1);
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.bezierCurveTo(8, -51, 56, -46, 43, -8);
        ctx.bezierCurveTo(63, 22, 20, 43, 0, 5); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
      }
      ctx.shadowBlur = 0; ctx.strokeStyle = '#9a3b92'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(0, 26); ctx.stroke();
    } else { // ribbon bow
      for (const sign of [-1, 1]) {
        ctx.save(); ctx.scale(sign, 1);
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.bezierCurveTo(16, -36, 52, -29, 46, -2);
        ctx.bezierCurveTo(55, 25, 21, 29, 0, 8); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(1, 8); ctx.lineTo(34, 44); ctx.lineTo(30, 16); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(0, 2, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  const defaultIcons = ['bow', 'star', 'heart', 'flower', 'moon', 'paw', 'butterfly'];
  const segmentColors = [
    ['#f789c7', '#cc569e'], ['#c98bda', '#9046a5'], ['#f9a3d6', '#c567ab'],
    ['#c887d7', '#9952b4'], ['#e77bba', '#b24b98'], ['#b37dd0', '#81439e'],
    ['#ffacd9', '#cf67b3'], ['#a974cf', '#774198']
  ];
  function drawWheel(canvas, items, custom) {
    const ctx = canvas.getContext('2d');
    const sz = 740, cx = sz / 2, cy = sz / 2, radius = 357, n = items.length;
    ctx.clearRect(0, 0, sz, sz);
    ctx.save(); ctx.translate(cx, cy);
    ctx.shadowColor = '#ff7acc'; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
    const base = ctx.createRadialGradient(0, -80, 35, 0, 0, radius);
    base.addColorStop(0, '#f8bde2'); base.addColorStop(.8, '#9d3e91'); base.addColorStop(1, '#481b60');
    ctx.fillStyle = base; ctx.fill(); ctx.shadowBlur = 0;
    if (n) {
      const step = Math.PI * 2 / n;
      for (let i = 0; i < n; i++) {
        const start = -Math.PI / 2 + (i - .5) * step;
        const end = start + step, scheme = segmentColors[i % segmentColors.length];
        const gradient = ctx.createRadialGradient(-33, -50, 4, 0, 0, radius);
        gradient.addColorStop(0, '#ffe1f0'); gradient.addColorStop(.18, scheme[0]);
        gradient.addColorStop(.75, scheme[0]); gradient.addColorStop(1, scheme[1]);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, radius - 6, start, end); ctx.closePath();
        ctx.fillStyle = gradient; ctx.fill();
        ctx.strokeStyle = '#ffe2f3cc'; ctx.lineWidth = n > 24 ? 1.1 : 2.6; ctx.stroke();
        const angle = start + step / 2, p = 225;
        const x = Math.cos(angle) * p, y = Math.sin(angle) * p;
        if (!custom && n === 7) {
          icon(ctx, defaultIcons[i], x, y, 72);
        } else {
          const available = Math.max(20, Math.min(206, Math.PI * 2 * p / n * .95));
          const fontSize = n <= 8 ? 23 : n <= 14 ? 18 : n <= 24 ? 13 : 10;
          const name = items[i].length > (n < 10 ? 17 : 10) ? items[i].slice(0, n < 10 ? 16 : 9) + '…' : items[i];
          ctx.save(); ctx.translate(x, y);
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.font = 'italic bold ' + fontSize + 'px Georgia,serif';
          ctx.lineWidth = 4; ctx.strokeStyle = '#6c2a77'; ctx.strokeText(name, 0, 0, available);
          ctx.fillStyle = '#fff6fc'; ctx.shadowColor = '#ffdaef'; ctx.shadowBlur = 5;
          ctx.fillText(name, 0, 0, available); ctx.restore();
        }
        // Small, drawn-in-place glints (not raster sprites).
        if (n < 18) {
          const p2 = 315, gx = Math.cos(angle + step * .16) * p2, gy = Math.sin(angle + step * .16) * p2;
          ctx.fillStyle = '#fff5f1bd'; ctx.beginPath(); ctx.arc(gx, gy, 2.4, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    const glaze = ctx.createLinearGradient(-180, -radius, 110, radius);
    glaze.addColorStop(0, '#fff9fd42'); glaze.addColorStop(.48, '#ffffff05'); glaze.addColorStop(1, '#470a5b32');
    ctx.beginPath(); ctx.arc(0, 0, radius - 9, 0, Math.PI * 2); ctx.fillStyle = glaze; ctx.fill();
    for (const [r, width, color] of [[radius - 2, 9, '#f9bfe6'], [radius - 10, 2, '#fff8fc'], [radius - 23, 1, '#fff3f588']]) {
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.lineWidth = width; ctx.strokeStyle = color; ctx.stroke();
    }
    const center = ctx.createRadialGradient(-25, -28, 5, 0, 0, 89);
    center.addColorStop(0, '#ffdcf0'); center.addColorStop(.45, '#e687c0'); center.addColorStop(1, '#8f387e');
    ctx.beginPath(); ctx.arc(0, 0, 88, 0, Math.PI * 2); ctx.fillStyle = center;
    ctx.shadowColor = '#61215e'; ctx.shadowBlur = 14; ctx.fill();
    ctx.shadowBlur = 0; ctx.strokeStyle = '#ffe2f4'; ctx.lineWidth = 6; ctx.stroke();
    ctx.restore();
  }
  window.KawaiiVisuals = { drawWheel };
})();