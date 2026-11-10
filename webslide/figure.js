/* ===== WebSlide の図の道具（figure.js）。webslide.js が読み込む。触らない。使い方は webslide.js の最初の説明にある ===== */
(function () {
"use strict";

/* 面の色の表：Mathematica の既定の光で描いたときの色（既定の光のまま球を正射影で描き、面の向きごとの色を 25 × 25 に区切って読んだもの） */
const MMA_COLORS = "c26847c56b47c97048ce764ad27b4bd6814ddc8850df8e51e59554e89b55eca45fedab66f1b572f1ba78f3c283f2c78af2cd93f0d098efd4a0ecd5a4ead7a9e8d9aee5d9b1e2d9b4e1dbb9bd6244c26847c56b47c97148cf784bd47d4cd8834ede8b50e29252eda25ef6b372fbbe7ffec88bffce92fdd297f8d197f1cd94f0d29cedd4a1ebd7a8e9d9ade5d8b0e2d9b4e1dbb9ddd9bab85d43bc6144c26847c66d47cb7249d17a4bd5804de89659f2a76afbb87dffc58cffd099ffd9a3ffe0abffe4b1ffe7b5ffe6b5fae3b2ebd5a5e9d8ace6d9b0e3dab4e1dbb9dcd9bad9d9bcb45842b75b42bc6144c26847c66c47d37c4fe4905af0a36cf9b47fffc28fffcf9dffd9a9ffe2b4ffe9bcffeec3fff2c7fff3cafff2c9fbedc5ede1b9e2d9b3e1dbb9dcdabbd9d8bcd6d9c0ad513fb25641b65a42bb6043cc734edd885aea9a67f4ac7cfcbc8dffc99dffd5aaffdfb6ffe7c0ffefc9fff4d0fff8d5fffad8fffbd9fff8d8f7f2d2e9e5c5dbd9bad8d9bdd5d9c1d1d7c1a74b3eab4f3fb05441bd6248d27b56e18d60eba074f5b187fcbf98ffcca7ffd8b4ffe2c0ffeacafff1d2fff7d9fffbdffffee3ffffe5fffee5fafae2eff2d9dee1c8d4d8c1d0d7c3cdd5c4a3493ea54a3ea84b3ec3694fd47e5be09069eaa27ef3b390fac1a0ffcdaeffd9bbffe2c7ffebd1fff2dafff8e1fffde7ffffebffffedffffeefafeecf1f8e7e4eddbcdd5c3cad4c4c8d4c79d473ea0483eb05547c36c54d27e5ede9171e7a384efb397f6c0a6fbccb4ffd8c1ffe1ccffe9d6fff1dffff7e6fffcedfffff1fffff4fefff5f8fff4f0faf0e5f2e7d5e3d8c4d2c7c1d0c898453e99453eaf564bc16b57cf7d61da9076e3a18aebb19bf1beaaf6cab8fad5c5fedfd0ffe7daffeee3fff4eafff9f1fffdf5fdfff9f9fffaf4fef9edfaf6e3f3efd4e6e2bccdc9bbcdcb91423e984541ac554dbd6958ca7b65d58d7add9e8de5ad9eebbbadf0c6bbf4d1c8f8dbd3fae3dcfbebe5fcf1edfbf6f3faf9f8f7fcfbf4fdfdeffbfde8f8fadef2f5d2e7eabcd1d3b3c7ca8a403e954444a7514eb76459c47767ce897cd7998edea89fe4b6aee9c1bcedccc9f0d6d4f2dedef4e5e7f4eceef4f1f5f3f4f9f0f7fdedf8ffe8f7ffe1f4fdd8eef7cce4eebad2dbabc2cb823d3d904245a04c4eb05f58bc7168c6837ccf948fd6a3a0dcb0afe1bbbce5c6c9e8d0d4ead8deecdfe7ece5eeecebf4ebeef9e9f1fde5f2ffe0f1ffdaeefdd1e9f8c5e0efb3cedda1bac87c3b3e8a404598454ca75857b46a67be7c7bc68c8dcd9b9ed3a8add8b4bbdcbfc7dfc8d2e2d1dce3d8e5e4deede3e3f3e2e7f8e0eafcdcebfed8eafed1e7fcc9e2f7bdd9efacc8de9ab5c973383d813d4590424c9d4f54a96164b37479bc848bc3939cc9a0abceacb8d2b6c5d5c0d0d8c8dad9d0e3dad6ead9dbf1d8dff6d6e1f9d2e2fbcde2fcc7dffabed9f5b3d0eba1beda8eabc56d363e773944863f4b9245519e5760a96a75b17a87b98998bf96a7c4a2b5c8adc1cbb6cccdbfd6cfc6dfcfcce7cfd1edcdd5f2cbd8f6c7d9f8c3d8f8bcd5f5b3cff0a7c5e694b3d387a4c466333e6a35417c3b4a863f4f924b599c5e6fa56f81ac7e93b38ba2b897b0bca2bcbfacc7c1b4d1c3bbdac3c1e2c3c6e8c2caedbfccf0bbcdf2b6ccf2afc9efa6c2e999b8df83a2c87e9bc066333e66333e6f36477b3b4d843e528f516798627ba0728ca67f9cab8ba9af96b6b3a0c1b5a8cbb6b0d4b7b6dcb6bbe2b5bee6b2c0eaaec1eba9bfeba2bbe798b4e189a7d47b92ba7c95bd66333e66333e6633446f364a783a4f80435e8a54729264849872949e7ea2a289afa593baa89bc4a9a3cda9a8d4a9addaa7b1dfa4b3e2a0b3e39ab1e292acdd87a3d57c96c6798bb6798eb766333e66333e66333e6633476b354c7239557a446782547a89628a8e6f98937aa59684b0998cba9a94c39a99cb9a9ed098a1d595a3d790a2d88aa0d6819ad07a90c57580ad7683af7888b466333e66333e66333e66334166334866334d6b395d71436d78517e7e5e8d836a9a8674a6897cb08a83b88a89bf898dc58790c98491cb7e90cb798dc87788bf747cae737aa8747dab7681ae66333e66333e66333e66333d663342663348663551663961663e6f6c4b7e71578c7461987769a27870ab7876b2777ab7757cba757ebb757eba737ab47172a76f6c9d7172a27378a7747ba966333e66333e66333e66333e66333d663341663347663653663b62663f6f67457c694f886b57926d5f9b6e64a16f69a6706ba8706ca86f69a36c62986c60926e689b706d9e7171a17276a666333e66333e66333e66333e66333e66333e66333e663344663650663b5f663f6c66427666457e684c8669518c69559069569069558d664b806954886a5a8e6c61946e689b6f6b9d7170a166333e66333e66333e66333e66333e66333e66333e66333e66333e663545663955663d6066406966426f664473664573664570664877664a7c674f8369568a6b5b8f6c61946e689b6f6b9c66333e66333e66333e66333e66333e66333e66333e66333e66333e66333e66364566384b663b54663d5966406266426866457066477466497b664b7f6851856a588c6b5d906c62946e689b";

/* ===== 図を描く道具（FIG の中から使う）===== */
var SVGNS = "http://www.w3.org/2000/svg";
function mk(tag, attrs, parent) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function txt(x, y, str, attrs, parent) {
  const e = mk("text", Object.assign({ x: x, y: y, "font-family": "inherit" }, attrs || {}), parent);
  e.textContent = str;
  return e;
}
window.mk = mk;
window.txt = txt;

/* ===== 動く図の道具（図のコードから使う）===== */
window.FIG = {};
const STILL = {};
/* 動く図を登録する：draw(svg, still) を FIG[id] に入れ、<svg> に data-fig="id" を付ける（ページの写しでも残る）。
   still が true のときは、動きを付けずに、その <svg> のまわりで出ている段階表示のとおりに描く */
function figure(id, draw) {
  FIG[id] = function (svg) { svg.setAttribute("data-fig", id); draw(svg, false); };
  STILL[id] = draw;
}

/* ベクトルと、なめらかな動き */
function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function norm(a) { const l = Math.hypot(a[0], a[1], a[2]); return mul(a, 1 / l); }
function ease(x) { return x * x * (3 - 2 * x); }
/* 点 p を、点 o を通り向き u（単位ベクトル）の直線のまわりに角 th だけ回す（ロドリゲスの公式） */
function rot(p, o, u, th) {
  const v = sub(p, o), c = Math.cos(th), s = Math.sin(th);
  const r = add(add(mul(v, c), mul(cross(u, v), s)), mul(u, dot(u, v) * (1 - c)));
  return add(o, r);
}
/* 図の中に書く字。c は字の真ん中の、図の中の位置。数式と同じ書体（Sans）で、本文と同じ 24pt。
   italic のときは数式の文字（斜体）、そうでなければ数字 */
function lid(parent, c, text, opacity, italic) {
  txt(c[0].toFixed(2), c[1].toFixed(2), text, { "font-family": "KaTeX_SansSerif", "font-style": italic ? "italic" : "normal",
                                                "font-size": 32, "text-anchor": "middle", "dominant-baseline": "central",
                                                opacity: opacity == null ? 1 : opacity }, parent);
}

/* 面の色：Mathematica の既定の光で描いたときの色。表 MMA_COLORS（25 × 25）を引いて決める。
   既定の光は画面に対して固定なので、色は画面から見た面の向き（横 nx・縦 ny の成分、どちらも −1〜1）だけで決まる。
   Mathematica の色のままでは暗いので、白に LIGHTEN の割合だけ寄せて明るくする（向きによる色の違いは残る） */
const LIGHTEN = 0.35;
function shadeRGB(nx, ny) {
  const G = 25, fx = (nx + 1) / 2 * (G - 1), fy = (1 - ny) / 2 * (G - 1);
  const i0 = Math.max(0, Math.min(G - 1, Math.floor(fx))), j0 = Math.max(0, Math.min(G - 1, Math.floor(fy)));
  const i1 = Math.min(G - 1, i0 + 1), j1 = Math.min(G - 1, j0 + 1), ax = fx - i0, ay = fy - j0;
  function col(i, j, k) { const at = ((j * G + i) * 3 + k) * 2; return parseInt(MMA_COLORS.substr(at, 2), 16); }
  return [0, 1, 2].map(function (k) {
    const v = (1 - ax) * (1 - ay) * col(i0, j0, k) + ax * (1 - ay) * col(i1, j0, k) +
              (1 - ax) * ay * col(i0, j1, k) + ax * ay * col(i1, j1, k);
    return Math.round(v + (255 - v) * LIGHTEN);
  });
}
function shade(nx, ny) { return "rgb(" + shadeRGB(nx, ny).join(",") + ")"; }
/* 同じ色を k の割合で白に寄せる（k = 0 で shade の色、k = 1 で白） */
function shadeToWhite(nx, ny, k) {
  return "rgb(" + shadeRGB(nx, ny).map(function (v) { return Math.round(v + (255 - v) * k); }).join(",") + ")";
}

/* カメラ：方位 az・仰角 el から見る向き c と、画面の右 r・上 up（正射影で、点 p は画面の (p・r, −p・up) に描く）。
   Mathematica の既定の視点（ViewPoint -> {1.3, -2.4, 2}）は az = MMA_AZ、el = MMA_EL */
const MMA_AZ = Math.atan2(1.3, 2.4), MMA_EL = Math.atan2(2, Math.hypot(1.3, 2.4));
function camera(az, el) {
  const c = [Math.cos(el) * Math.sin(az), -Math.cos(el) * Math.cos(az), Math.sin(el)];
  const r = [Math.cos(az), Math.sin(az), 0];
  return { c: c, r: r, up: cross(c, r) };
}

/* 動いている途中のアニメーション（{ finish() } の集まり）。連打したときのため、次のキーかクリックが来たら、
   それを受ける前に（ページ送りより先に。捕捉の段階で受ける）、動いている途中のものを全部最後の形にする */
const RUNNING = new Set();
function finishAll() {
  Array.from(RUNNING).forEach(function (a) { a.finish(); });
  /* CSS の動きも最後の形にする（終わりのない動きは finish できないので、とばす） */
  if (document.getAnimations) document.getAnimations().forEach(function (a) { try { a.finish(); } catch (e) {} });
}
addEventListener("keydown", finishAll, true);
addEventListener("click", finishAll, true);

/* 図の中の目印（何も表示しない step）が出たら t を 1 へ open ミリ秒で動かし、そのたびに draw(t) を呼ぶ。
   ← で戻るときとページを移ったときは、動かさずにすぐその状態で描く。返す関数は今の t を返す */
function follow(mark, draw, open) {
  let t = 0, start = 0, raf = 0;
  /* 動いている途中なら RUNNING に入れておき、finish() で最後の形にする */
  const self = { finish: function () { jump(1); } };
  function frame(now) {
    /* 描画の時刻が動き始めの時刻より前に来ることがあるので、0〜1 に収める */
    const x = open > 0 ? Math.max(0, Math.min(1, (now - start) / open)) : 1;
    t = x;
    draw(t);
    raf = x < 1 ? requestAnimationFrame(frame) : 0;
    if (!raf) RUNNING.delete(self);
  }
  function jump(target) {
    cancelAnimationFrame(raf);
    raf = 0; t = target;
    RUNNING.delete(self);
    draw(t);
  }
  watchStep(mark, function (on, moved) {
    if (!on || moved) { jump(on ? 1 : 0); return; }
    cancelAnimationFrame(raf);
    start = performance.now();
    raf = requestAnimationFrame(frame);
    RUNNING.add(self);
  });
  return function () { return t; };
}

/* 目印（step）の出し入れを見て、cb(出ているか, ページを移ったときか) を呼ぶ。
   ページを移ったとき（← で次のページから戻ったときを含む）は、目印と一緒にページの出し入れも変わるので、それで見分ける */
function watchStep(mark, cb) {
  const page = mark.closest(".page");
  const watch = new MutationObserver(function (recs) {
    cb(mark.classList.contains("on"), recs.some(function (r) { return r.target === page; }));
  });
  watch.observe(mark, { attributes: true, attributeFilter: ["class"] });
  watch.observe(page, { attributes: true, attributeFilter: ["class"] });
}
/* 前のページから → で進んだとき（そのページの段階表示がまだ 1 つも出ていないとき）だけ、cb(前のページ) を呼ぶ。
   前のページの出し入れを見る。前のページから移るときは、前のページが消えた時点で、このページはもう出ている。
   ← で戻ったとき・ほかのページから飛んだとき（前のページの出し入れが変わらない）は呼ばない */
function fromPrev(page, cb) {
  const prev = page.previousElementSibling;
  if (!prev) return;
  new MutationObserver(function () {
    if (!prev.classList.contains("on") && page.classList.contains("on") && !page.querySelector("[step]:not(input).on")) cb(prev);
  }).observe(prev, { attributes: true, attributeFilter: ["class"] });
}

Object.assign(window, { fromPrev: fromPrev, figure: figure, sub: sub, add: add, mul: mul, dot: dot, cross: cross, norm: norm, ease: ease, rot: rot, lid: lid,
                        shadeRGB: shadeRGB, shade: shade, shadeToWhite: shadeToWhite, MMA_AZ: MMA_AZ, MMA_EL: MMA_EL, camera: camera,
                        RUNNING: RUNNING, follow: follow, watchStep: watchStep });

/* ページの写し（一覧・印刷・PDF）で図を描き直すときに、webslide.js が使う */
WebSlide.STILL = STILL;
})();
