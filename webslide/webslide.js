/* ===== WebSlide の動き（webslide.js）=====
  ■ スライドの中身は、このファイルを読み込む HTML（template.html をコピーしたもの）に書く。
    見出しの帯・下の帯（著者・題目・日付・ページ番号）・色は、書かなくても自動で付く。見た目はテーマで決まる。
    テーマは <html theme="Madrid"> のように選ぶ（themes/ の中のファイルの名前）。
    図を描くコードは、その HTML の最後の <script> に FIG["svg の id"] = function (svg) { … } の形で書く（mk・txt が使える）。
    動く図は figure("svg の id", function (svg, still) { … }) の形で書く（下の「動く図」）。

  ページ
    <cover>…</cover>                    表紙（中身は template.html の例を見る）
    <slide title="見出し">…</slide>      ふつうのページ
    <divider>参考資料</divider>          区切りのページ

  ページの中
    <p>…</p>                            段落
    <list><item>…</item></list>         箇条書き（□）。item の中に list を入れると 2 段目（➢）
    <block title="…" cite="[…]">…</block>   箱（青）。<alertblock>（赤）・<exampleblock>（緑）も同じ
    <note>…</note>                      緑の枠の一言（中央に置く）
    <down>…</down>                      赤い下向きの矢印と、中央寄せの一言
    <columns><column>…</column><column>…</column></columns>   2 段組
    <figure><img src="図.png"><figcaption>…</figcaption></figure>   図
    <table class="tbl">…</table>        表（見出しの行は青の地に白の字、1 行おきに薄い地。--edge・--ink2・--zebra で色を変える）

  部品（class で使う）
    <p class="qa"><span class="qa-label"><navy>入力</navy>$\,$：</span>…</p>   「入力：」「問い：」をそろえ、2 行目以降の頭もそろえる
    <span class="navy-normal">…</span>  青の字（<navy> と同じ）
    <span class="label">…</span>        クリーム色の地にオレンジの枠の札
    <p class="pink">…</p>               ピンクの枠の一言（中央に置く）
    <div class="frame" step></div>      赤の角丸の枠（図などを囲む。位置と大きさは、そのスライドの CSS で決める）
    <span step class="mark"></span>     何も表示しない step（図を動かすきっかけ。下の「動く図」）
    <div class="bar"><i>n</i><input type="range" min="3" max="12" value="6"><span>6</span></div>   名前・スライダー・値の 1 行
    <button class="play" aria-label="再生"></button>   再生のボタン（字は出さず、三角だけ）
    <div class="sw"><button class="sel">A</button><button>B</button></div>   切り替えのボタン（選んでいるほうに sel を付ける）
    バーとボタンを操作しても、ページは進まない。操作し終えると、キーはページ送りに戻る。

  文の中
    <red>…</red> 赤　<navy>…</navy> 青（Beamer の \structure と同じ色）　<b>…</b> 太字
    ➡ と書くと、赤い矢印になる
    $G = (V, E)$                        数式（TeX の書き方）。$$…$$ は 1 行に取って中央に置く
                                        \underbrace の下の説明は _{\textstyle\text{…}} と書くと本文と同じ大きさになる
    <cite>[著者 et al., 年]</cite>      文献
    <frac><num>分子</num><den>分母</den></frac>   分数
    <ruby>漢字<rt>かんじ</rt></ruby>  ふりがな
    <nobr>…</nobr>                      ここでは改行しない
    <br>                                改行

  段階表示：タグに step を付けると、クリック（→）で 1 つずつ出る。例：<item step>…</item>
        出るまでの時間はすぐ（0 秒）。変えたいときは、HTML の <script src> の下に <style>:root { --fade: .2s }</style> と書く。
  大きさ：ふだんは書かない（Beamer の 12pt と同じ割合。本文とキャプション 24pt、見出しと題目 34.3pt、箱の見出し 28.6pt）。
        例外のときだけ、タグに size="32" のように pt で付ける。例：<p size="32">…</p>
  行間・空き：ふだんは書かない。変えたいときだけ、どのタグにも付けられる（PowerPoint の「段落」と同じ 3 つ）。
        line="1.4"（行間。文字の大きさの何倍か。ふだんは 1.2）
        before="12"・after="12"（その前・後ろの空き。pt）。例：<block before="24">…</block>
  箱の見出し：太字にしない（Beamer と同じ）。全角数字は少し下げて描く（書体の数字は漢字より背が低く、上に寄って見えるため）。
        見出しに $n$ のような数式を入れると、行の箱が大きくなって字が上にずれる。title なしで cite だけの箱も書ける。
  表紙：題目は青の角丸の箱に入り、その下に著者（1 行）・所属・会の名前・日付が中央にそろって並ぶ（全体を上下の真ん中に置く）。
        所属は同じものを 1 つにまとめる。所属が 2 つ以上あるときは、名前と所属に番号が付く。
  ページの中身：見出しの帯と下の帯の間の上下の真ん中に置く（Beamer と同じ）。
  かっこ・句読点：全角（1 字分）の幅で組む（Beamer と同じ）。続くときは詰める。
        題目が長いときは <headline size="38"> のように小さくする。
  下の帯：左から、発表者（presenter を付けた author。なければ最初の著者）と所属・題目・日付とページ番号。表紙から自動で取る。
        長くて入らないときは、そのタグに short="…" で短い文を書く。例：<date short="2026年11月10日">…</date>
  文は右端まで詰めて折り返す。ここで折りたいところにだけ <br> を書く。
  タグは必ず閉じる（<down/> のような書き方はしない）。

  ■ 書体：英数字は Computer Modern Sans（KaTeX の数式の書体と同じもの。< > \ { | } ` はこの書体にないので、日本語の書体で出る）、
    日本語は IPA Pゴシック（どちらも fonts/ の中に埋め込んである。そのまま公開してよい）
    日本語の字（太字でないところ）の太さは、ふだんは Beamer と同じ。
    発表の場で太くしたいときは、左下のメニューの「−」「+」で 0.1pt ずつ変える（真ん中の数字を押すと元に戻る）。
    変えた太さはそのブラウザが覚えていて、開き直しても、ほかのスライドでも同じ太さになる。
    ファイルで決めておきたいときは、HTML の <script src> の下に <style>:root { --ja-stroke: .3pt }</style> と書く（0 で足さない）。

  ■ 文字の大きさ（絶対に守る）
    本文は 24pt を割らない。24pt を割ってよいのはキャプション・文献などだけで、それも 20pt を割らない。
    20pt を割ってよいのは、本当に要らない情報のときだけ。
    例外：数式の添字と、分数の中の分数、文の中（$…$）の \frac は小さくなってよい（本文 24pt のとき 16.8pt）。
          文の中の分数を大きくしたいときは \dfrac と書く。

  ■ 発表
    → / Space / Enter / クリックで進む。← / 画面の左 1/4 のクリックで戻る。Home / End。
    ⌘F 全画面、⌘B ページ一覧（左に並ぶ。押すとそのページへ。出している間は ↑ ↓ でもページを移る）、⌘K ポインター、
    ⌘E 選択、⌘U キー無効、⌘P 印刷（Windows では Ctrl）。
    同じボタンは、左下の ▷ を押すと出て、◁ でしまえる。▷ はマウスを動かしたときだけ出る。
    ボタンの名前は英語：Pages（ページ一覧）・Fullscreen・Pointer・Select（選択）・Keys off（キー無効）・Print・PDF・− +（字の太さ）。
    選択：文字を選べる。ページは ← → だけで送る（クリックでは進まない）。右上に ⌘E と出る。
    キー無効：どのキー・クリックでもページは進まない（3D の図を回すときなど）。ページ一覧からは飛べる。右上に ⌘U と出る。
    印刷：1 ページ 1 枚。
          Print（⌘P）：アニメーションなし。step を全部出した形で、スライド 1 枚を 1 ページにする（ページ数が少ない）。
          PDF：アニメーション込み。step のあるページは、1 つずつ出る様子を別々のページにする（ページ数が多い）。
          どちらも印刷の画面が出る。PDF にするときは、そこで「PDF に保存」を選ぶ。
    ファイル名のあとに #s5 を付けると 5 枚目から開く。開いたまま番号を書き換えても、そのページへ移る。
    ← で戻るときは、動きをとばして、すぐ前の形にする。
    指で触る画面（スマホなど）では、画面の下（横向きは左右）に ◀ ▶ のボタンが出る。← → のキーと同じ。印刷には出ない。
    数式を含む文をコピーすると、数式は見た目の字をつなげた文字列になる（例：x∈ℝ+）。

  ■ 動く図（図のコードから、そのままの名前で使える）
    figure("id", function (svg, still) { … })   動く図を登録する。still が false なら本物のページ、true なら写し（一覧・印刷・PDF）。
        写しは動かないので、still のときは、まわりの step の .on を見て、出ている段階のとおりに 1 回だけ描いて終える。
    follow(mark, draw, open)   目印 mark（step）が出たら t を 0 → 1 へ open ミリ秒で動かし、そのたびに draw(t) を呼ぶ。
        ← で戻るときとページを移ったときは、動かさずにすぐその形を描く。返す関数は今の t を返す。
    watchStep(mark, cb)        目印の出し入れのたびに cb(出ているか, ページを移ったときか) を呼ぶ。
    RUNNING                    動いている途中のもの（{ finish() } を持つ）を入れておく集まり。次のキーかクリックで全部最後の形にしてから進む。
    ease(x)                    0〜1 をなめらかにする
    sub・add・mul・dot・cross・norm   3 次元のベクトル（[x, y, z]）
    rot(p, o, u, th)           点 p を、o を通る向き u（単位ベクトル）の直線のまわりに角 th だけ回す
    camera(az, el)             方位・仰角から見る向き（.c）と画面の右（.r）・上（.up）。Mathematica の既定の視点は camera(MMA_AZ, MMA_EL)
    shade(nx, ny)              Mathematica の既定の光で描いたときの面の色（nx・ny は画面から見た面の向きの横・縦の成分）。少し明るくしてある
    shadeToWhite(nx, ny, k)    同じ色を k の割合で白に寄せる（k = 1 で白）
    lid(parent, [x, y], "n", 不透明度, 斜体か)   図の中に、数式の書体で 24pt の字を書く
    fromPrev(page, cb)         前のページから → で進んだとき（そのページの段階表示がまだ 1 つも出ていないとき）だけ、cb(前のページ) を呼ぶ。
        前のページの図の位置から動かすときに使う。前のページはもう隠れているので、測るときは一瞬 style.display = "block" にして戻す。
        ← で戻ったとき・ほかのページから飛んだときは呼ばない
    動き終えた形は CSS に書き、動いている間だけ JS で途中の形を書き込む（写し・印刷も、CSS の形で正しく出る）。
    CSS で動かすときは、slide:has(.目印.on) .動かすもの { … } と書く。
    赤の ×：<g class="cross"> に <line> を 2 本入れて、.on を付けると一度に出る（CSS で出すときは visibility を切り替える）。

  ■ このフォルダ（webslide/）の中身
    webslide.js          このファイル。ほかのファイルを読み込み、ページを組み立てて動かす
    figure.js            図の道具（上の「動く図」。Mathematica の既定の光で描いたときの面の色の表も入っている）
    base.css             どのテーマにも共通の見た目
    themes/              テーマごとの見た目（色・見出しの帯・下の帯・箇条書きの印・箱・表紙・区切り）
    fonts/               文の書体（ipa-pgothic.css：IPA Pゴシック、IPA フォント使用許諾 v1.0。cm-sans.css：Computer Modern Sans、MIT）
    katex/               数式：KaTeX 0.18.11（本体・$ を探す auto-render・CSS・数式の書体）。MIT（本体のうち stretchy.js の部分は SIL OFL 1.1）
    許諾文は、それぞれのファイルの最初にある。
*/
var WebSlide = {};
(function () {
"use strict";

/* ===== 読み込み：このファイルと同じフォルダの、見た目（CSS）・書体・KaTeX・図の道具を読み込む =====
   テーマは <html theme="Madrid"> のように選ぶ（書かなければ Madrid）。
   document.write で、このファイルを読んだところに書き込む（ページの最後の <script> より先に、図の道具を使えるようにするため。
   書体は、ファイルを直接開いたとき（file://）に .ttf などを読めないので、CSS の中に埋め込んである） */
const dir = document.currentScript.src.replace(/[^/]*$/, "");
const name = document.documentElement.getAttribute("theme") || "Madrid";
WebSlide.theme = /^[A-Za-z]+$/.test(name) ? name : "Madrid";
["katex/katex.css", "fonts/ipa-pgothic.css", "fonts/cm-sans.css", "base.css", "themes/" + WebSlide.theme + ".css"].forEach(function (f) {
  document.write('<link rel="stylesheet" href="' + dir + f + '">');
});
["katex/katex.js", "figure.js"].forEach(function (f) {
  document.write('<script src="' + dir + f + '"><\/script>');
});

/* ===== 中身のタグから、ページを組み立てて動かす（中身を読み終えてから）===== */
function build() {
const $new = function (tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};

/* ===== タグから、見出しの帯・下の帯の付いたページを組み立てる ===== */
const stage = $new("div", "stage"), deck = $new("div", "deck");
deck.appendChild(stage);
const pages = [].filter.call(document.body.children, e => /^(COVER|SLIDE|DIVIDER)$/.test(e.tagName));
const STEP = "[step]:not(input)";   // 段階表示の目印（<input> の step は刻みの幅）

/* 下の帯に出す文は、表紙から取る（組み立てる前に）。short="…" があれば、そちらを使う。
   ふりがな（<rt>）は除き、<br> は空白にする */
function plain(e) {
  if (e.hasAttribute("short")) return e.getAttribute("short");
  const c = e.cloneNode(true);
  c.querySelectorAll("rt").forEach(r => r.remove());
  c.querySelectorAll("br").forEach(b => b.replaceWith(" "));
  return c.textContent.replace(/\s+/g, " ").trim();
}
const FOOT = { who: "", title: "", date: "" };
const cov = pages.find(e => e.tagName === "COVER");
if (cov) {
  const a = cov.querySelector("author[presenter]") || cov.querySelector("author"), h = cov.querySelector("headline"), d = cov.querySelector("date");
  if (a) FOOT.who = a.hasAttribute("short") ? a.getAttribute("short") : plain(a) + (a.hasAttribute("aff") ? "  (" + a.getAttribute("aff") + ")" : "");
  if (h) FOOT.title = plain(h);
  if (d) FOOT.date = plain(d);
}
function foot(i) {
  const f = $new("div", "foot"), f3 = $new("div", "f3");
  f3.append($new("span", "fdate", FOOT.date), $new("span", "pageno", (i + 1) + " / " + pages.length));
  f.append($new("div", "f1", FOOT.who), $new("div", "f2", FOOT.title), f3);
  return f;
}

/* ➡ を赤い矢印に置きかえる */
function arrows(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), hits = [];
  while (w.nextNode()) if (w.currentNode.nodeValue.indexOf("➡") >= 0) hits.push(w.currentNode);
  hits.forEach(function (t) {
    const parts = t.nodeValue.split(/➡[︎️]?/), frag = document.createDocumentFragment();
    parts.forEach(function (s, i) {
      if (i) frag.appendChild($new("span", "arw"));
      if (s) frag.appendChild(document.createTextNode(s));
    });
    t.parentNode.replaceChild(frag, t);
  });
}

pages.forEach(function (pg, i) {
  const sec = $new("section", "page");
  const tag = pg.tagName;

  if (tag === "SLIDE") {
    /* 見出しの文は span 1 つにまとめる（.ttl は flex なので、日本語の .ja で分かれると、文がばらばらに並ぶ） */
    sec.appendChild($new("div", "ttl")).appendChild($new("span", null, pg.getAttribute("title") || ""));
    pg.removeAttribute("title");   // 残すと、マウスを乗せたときに見出しが吹き出しで出てしまう
  }

  /* 区切りのページは、中身を角丸の箱に入れる */
  if (tag === "DIVIDER") {
    const box = $new("div", "sbox");
    while (pg.firstChild) box.appendChild(pg.firstChild);
    pg.appendChild(box);
  }

  /* 表紙：題目の箱・著者（1 行）・所属・会の名前と日付の順に並べる（QR コードは右下に置くので、どこにあってもよい）。
     所属は同じものを 1 つにまとめ、2 つ以上あるときは、名前と所属に番号を付けてつなぐ */
  if (tag === "COVER") {
    const ct = $new("div", "ctitle"), meta = $new("div", "cmeta"), box = $new("div", "authors"), insts = $new("div", "insts");
    pg.querySelectorAll("headline").forEach(e => ct.appendChild(e));
    pg.querySelectorAll("meeting, date").forEach(e => meta.appendChild(e));
    const authors = pg.querySelectorAll("author"), affs = [];
    authors.forEach(function (a) { const f = a.getAttribute("aff"); if (f && affs.indexOf(f) < 0) affs.push(f); });
    authors.forEach(function (a) {
      if (affs.length > 1 && a.hasAttribute("aff")) a.appendChild($new("sup", null, String(affs.indexOf(a.getAttribute("aff")) + 1)));
      box.appendChild(a);
    });
    affs.forEach(function (f, k) {
      const s = insts.appendChild($new("span"));
      if (affs.length > 1) s.appendChild($new("sup", null, String(k + 1)));
      s.appendChild(document.createTextNode(f));
    });
    pg.prepend(ct, box, insts, meta);
    pg.querySelectorAll("qr").forEach(function (q) {
      const img = $new("img"), cap = $new("div", "qcap");
      img.src = q.getAttribute("src"); img.alt = "";
      while (q.firstChild) cap.appendChild(q.firstChild);
      q.append(img, cap);
    });
  }

  pg.querySelectorAll("block, alertblock, exampleblock").forEach(function (b) {
    /* 見出しの文は span 1 つにまとめる（.bt は flex で、すき間を空けて並べるので、文が分かれるとすき間が入る）。
       その中で、全角数字だけは .zd の span に入れて少し下げる。title がないときは span を作らない（出典が gap の分だけ右にずれるため） */
    const bt = $new("div", "bt"), bb = $new("div", "bb"), title = b.getAttribute("title") || "";
    if (title) {
      const ttl = bt.appendChild($new("span"));
      title.split(/([０-９]+)/).forEach(function (s, k) {
        if (s) ttl.appendChild(k % 2 ? $new("span", "zd", s) : document.createTextNode(s));
      });
    }
    if (b.hasAttribute("cite")) bt.appendChild($new("cite", null, b.getAttribute("cite")));
    b.removeAttribute("title");
    while (b.firstChild) bb.appendChild(b.firstChild);
    b.append(bt, bb);
  });

  arrows(pg);
  sec.appendChild(pg);
  sec.appendChild(foot(i));
  stage.appendChild(sec);
});
document.body.prepend(deck);

/* ===== size="32" のように pt で書いた大きさにする ===== */
stage.querySelectorAll("[size]").forEach(function (e) {
  const pt = parseFloat(e.getAttribute("size"));
  if (pt > 0) e.style.fontSize = (pt * 4 / 3) + "px";
});

/* ===== line="1.2"（行間。文字の大きさの何倍か）と、before="12"・after="12"（前・後ろの空き。pt） ===== */
stage.querySelectorAll("[line]").forEach(function (e) {
  const v = parseFloat(e.getAttribute("line"));
  if (!(v > 0)) return;
  e.style.lineHeight = v;
  const bb = e.querySelector(":scope > .bb");   // 箱は中身（.bb）に行間を持っているので、そちらにも付ける
  if (bb) bb.style.lineHeight = v;
});
[["before", "marginTop"], ["after", "marginBottom"]].forEach(function (a) {
  stage.querySelectorAll("[" + a[0] + "]").forEach(function (e) {
    const pt = parseFloat(e.getAttribute(a[0]));
    if (pt >= 0) e.style[a[1]] = (pt * 4 / 3) + "px";
  });
});

/* ===== $…$ と $$…$$ を数式にする（KaTeX）。読み上げ用の MathML は出さない（コピーしたとき、数式の字が改行付きで 2〜3 回入るため） ===== */
if (window.renderMathInElement && window.katex) {
  renderMathInElement(stage, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
    throwOnError: false, output: "html"
  });
}

/* ===== 全角のかっこ・句読点を、全角（1 字分）の幅にする（LuaLaTeX などで組んだ Beamer と同じ）。
   IPA Pゴシックのかっこ・句読点は、幅が半分ほどしかない。そこで 1 字ずつ span に入れ、足りない幅を空きで足す。
   開きかっこは左に、閉じかっこと句読点は右に、中黒・コロンなどは両側に足す。
   続くときは詰める（閉じかっこ・句読点の次がかっこ・句読点なら右を足さず、開きかっこが続くときは後ろの左を足さない）。
   数字は、その字の送り幅（em。書体のファイルから読んだもの） ===== */
(function () {
  const OPEN = { "（": .5498, "「": .5698, "『": .6099, "【": .5498, "［": .6001, "〔": .5498, "｛": .52, "〈": .6499, "《": .6602 };
  const CLOSE = { "）": .5498, "」": .5698, "』": .6099, "】": .5498, "］": .6001, "〕": .5498, "｝": .52, "〉": .6499, "》": .6602,
                  "、": .5, "。": .5, "，": .5, "．": .5 };
  const MID = { "・": .5, "：": .5, "；": .5, "！": .48, "？": .7202 };
  const PUNCT = /[（「『【［〔｛〈《）」』】］〕｝〉》、。，．・：；！？]/;
  const w = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT), hits = [];
  while (w.nextNode()) {
    const t = w.currentNode, p = t.parentElement;
    if (p && PUNCT.test(t.nodeValue) && !p.closest(".katex, svg")) hits.push(t);
  }
  hits.forEach(function (t) {
    const s = t.nodeValue, frag = document.createDocumentFragment();
    let plain = "";
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (!PUNCT.test(c)) { plain += c; continue; }
      if (plain) { frag.appendChild(document.createTextNode(plain)); plain = ""; }
      const prev = s[i - 1] || "", next = s[i + 1] || "", sp = $new("span", "jp", c);
      if (c in OPEN) { if (!(prev in OPEN)) sp.style.paddingLeft = (1 - OPEN[c]).toFixed(4) + "em"; }
      else if (c in CLOSE) { if (!PUNCT.test(next)) sp.style.paddingRight = (1 - CLOSE[c]).toFixed(4) + "em"; }
      else { sp.style.padding = "0 " + ((1 - MID[c]) / 2).toFixed(4) + "em"; }
      frag.appendChild(sp);
    }
    if (plain) frag.appendChild(document.createTextNode(plain));
    t.parentNode.replaceChild(frag, t);
  });
})();

/* ===== 日本語の字のまとまりを <span class="ja"> で包み、線を足せるようにする（--ja-stroke。ふだんは 0）。
   英数字・太字のところ・数式・図の中の字には足さない ===== */
(function () {
  const JA = "[　-〿぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿＀-￯]";
  const has = new RegExp(JA), split = new RegExp("(" + JA + "+)");
  const w = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT), hits = [];
  while (w.nextNode()) {
    const t = w.currentNode, p = t.parentElement;
    if (!p || !has.test(t.nodeValue) || p.closest(".katex, svg")) continue;
    if (parseInt(getComputedStyle(p).fontWeight, 10) >= 600) continue;   // 太字はもともと太い
    hits.push(t);
  }
  hits.forEach(function (t) {
    const frag = document.createDocumentFragment();
    t.nodeValue.split(split).forEach(function (s, i) {
      if (!s) return;
      frag.appendChild(i % 2 ? $new("span", "ja", s) : document.createTextNode(s));
    });
    t.parentNode.replaceChild(frag, t);
  });
})();

/* 書体を全部先に読み込む。まだ出していないページの数式も、一覧や印刷ですぐ描けるように（Safari は印刷の前に待たない） */
document.fonts.forEach(function (f) { f.load().catch(function () {}); });

/* 埋め込んだ書体を読み込み終えてから見せる（別の書体が一瞬出ないように） */
stage.style.visibility = "hidden";
document.fonts.ready.then(function () { stage.style.visibility = ""; });

/* ===== 図を描く ===== */
const FIG = window.FIG || {};
for (const id in FIG) {
  const svg = document.getElementById(id);
  if (svg) FIG[id](svg);
}

const secs = [].slice.call(stage.children);
const body = document.body;

/* ページの写し（一覧と印刷に使う）。id は消し、段階表示は shown 個目まで出す */
function copyPage(sec, shown) {
  const c = sec.cloneNode(true);
  c.classList.add("on");
  c.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
  c.querySelectorAll(STEP).forEach((e, j) => e.classList.toggle("on", j < shown));
  return c;
}

/* ===== 一覧（T）：左に全ページの小さな絵を並べ、押すとそのページへ ===== */
const side = $new("div", "side");
secs.forEach(function (sec, i) {
  const th = $new("div", "thumb"), box = $new("div", "tbox");
  box.appendChild(copyPage(sec, Infinity));
  th.append(box, $new("span", "tno", String(i + 1)));
  th.addEventListener("click", function () { go(i, true); });
  side.appendChild(th);
});
body.appendChild(side);

/* ===== 印刷（P）：1 ページ 1 枚。step が n 個あるページは n + 1 枚にする（最後の 1 枚に .all を付ける） ===== */
const prn = $new("div", "print");
secs.forEach(function (sec) {
  const n = sec.querySelectorAll(STEP).length;
  for (let k = 0; k <= n; k++) {
    const pp = $new("div", k === n ? "ppage all" : "ppage");
    pp.appendChild(copyPage(sec, k));
    prn.appendChild(pp);
  }
});
body.appendChild(prn);

/* ページの写し（一覧・印刷・PDF）の図は、組み立てたときのまま動かない。
   そこで、figure() で登録した図は、写しで出ている段階表示のとおりに描き直す */
body.querySelectorAll(".side svg[data-fig], .print svg[data-fig]").forEach(function (svg) {
  const draw = WebSlide.STILL[svg.getAttribute("data-fig")];
  if (!draw) return;
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  draw(svg, true);
});

/* ===== 画面に合わせて 960 × 720 を拡大縮小（一覧を出しているときは、その右に置く） ===== */
function fit() {
  const L = body.classList.contains("side-on") ? side.offsetWidth : 0, W = innerWidth - L, H = innerHeight;
  const s = Math.min(W / 960, H / 720);
  stage.style.transform = "translate(" + (L + (W - 960 * s) / 2) + "px," + (H - 720 * s) / 2 + "px) scale(" + s + ")";
}
addEventListener("resize", fit);

/* ===== 全画面（⌘F）・ページ一覧（⌘B）・ポインター（⌘K）・選択（⌘E）・キー無効（⌘U）・印刷（⌘P はブラウザのプリント）・PDF ===== */
/* 全画面の仕組みがないブラウザでは、何もしない */
function fullscreen() {
  const d = document, el = d.documentElement;
  const exit = d.exitFullscreen || d.webkitExitFullscreen, enter = el.requestFullscreen || el.webkitRequestFullscreen;
  if (d.fullscreenElement || d.webkitFullscreenElement) { if (exit) exit.call(d); }
  else if (enter) enter.call(el);
}
const tools = $new("div", "tools"), btn = {};
function toggle(name) {
  if (name === "full") { fullscreen(); return; }
  if (name === "print") { print(); return; }
  const cls = { side: "side-on", ptr: "ptr-on", edit: "edit", op: "op" }[name];
  const on = body.classList.toggle(cls);
  btn[name].classList.toggle("on", on);
  if (name === "side") { fit(); if (on) showCurrent(); }
  /* 選択とキー無効は、どちらか一方だけ。右上には、戻すキーだけを出す */
  if (on && (name === "edit" || name === "op")) {
    const other = name === "edit" ? "op" : "edit";
    body.classList.remove(other);
    btn[other].classList.remove("on");
    badge.textContent = mod + (name === "edit" ? "E" : "U");
  }
}
/* ▷ で出し、◁ でしまう */
const handle = $new("button", null, "▷");
handle.addEventListener("click", function () {
  handle.textContent = body.classList.toggle("tools-open") ? "◁" : "▷";
  handle.blur();
});
tools.appendChild(handle);
const mac = /Mac|iPhone|iPad/.test(navigator.platform), mod = mac ? "⌘" : "Ctrl+";
[["side", "Pages", "B"], ["full", "Fullscreen", "F"], ["ptr", "Pointer", "K"], ["edit", "Select", "E"], ["op", "Keys off", "U"], ["print", "Print", "P"]].forEach(function(b) {
  const el = $new("button", "op", b[1] + " " + mod + b[2]);
  el.addEventListener("click", function () { toggle(b[0]); el.blur(); });  // blur：Space でボタンがもう一度押されないように
  btn[b[0]] = el;
  tools.appendChild(el);
});

/* 印刷：Print（⌘P）はアニメーションなし（step を全部出した形）、PDF はアニメーション込み（step ごとに分ける）。
   PDF を押したときだけ step ごとにして、次にキーかマウスを押したら戻す（⌘P のときは ⌘ を押した時点で戻る）。
   印刷の画面を閉じてすぐに戻さないのは、Safari では印刷の画面で用紙を変えると、そのときの形で組み直すから */
function printSteps(on) { body.classList.toggle("print-steps", on); }
addEventListener("keydown", function () { printSteps(false); }, true);
addEventListener("pointerdown", function () { printSteps(false); }, true);
const pdf = $new("button", "op", "PDF");
pdf.addEventListener("click", function () { printSteps(true); pdf.blur(); print(); });
tools.appendChild(pdf);

/* 字の太さ：日本語の字に足す線（--ja-stroke）を、発表の場で 0.1pt ずつ変える。真ん中の数字を押すと、ファイルで決めた太さに戻る。
   変えた太さはブラウザに覚えさせる（開き直しても、ほかのスライドでも同じ） */
const root = document.documentElement, KEY = "webslide-ja-stroke";
const base = (function () {   // ファイルで決めた太さ（pt）。px で書いてあれば pt に直す
  const v = getComputedStyle(root).getPropertyValue("--ja-stroke").trim(), n = parseFloat(v);
  return isNaN(n) ? 0.2 : (/px$/.test(v) ? n * 0.75 : n);
})();
const val = $new("button", "op val");
function setStroke(pt, keep) {
  pt = Math.max(0, Math.round(pt * 10) / 10);
  root.style.setProperty("--ja-stroke", pt + "pt");
  val.textContent = pt.toFixed(1) + "pt";
  try { if (keep) localStorage.setItem(KEY, pt); else localStorage.removeItem(KEY); } catch (e) {}
  return pt;
}
let stroke = base;
try { const s = parseFloat(localStorage.getItem(KEY)); if (!isNaN(s)) stroke = s; } catch (e) {}
stroke = setStroke(stroke, stroke !== base);
[["−", -0.1], [null, 0], ["+", 0.1]].forEach(function (b) {
  const el = b[0] ? $new("button", "op", b[0]) : val;
  el.addEventListener("click", function () {
    stroke = b[1] ? setStroke(stroke + b[1], true) : setStroke(base, false);
    el.blur();
  });
  tools.appendChild(el);
});
body.appendChild(tools);
const badge = $new("div", "badge", mod + "E"), ptr = $new("div", "pointer");
body.append(badge, ptr);

/* マウスを動かすとボタンを出し、2.5 秒止まると隠す（ボタンの上にいる間は隠さない） */
let hideTimer = 0;
addEventListener("mousemove", function (e) {
  ptr.style.left = e.clientX + "px";
  ptr.style.top = e.clientY + "px";
  tools.classList.add("show");
  clearTimeout(hideTimer);
  hideTimer = setTimeout(function () { if (!tools.matches(":hover")) tools.classList.remove("show"); }, 2500);
});
fit();

/* ===== ページ送りと段階表示 ===== */
let si = 0;
function showCurrent() {
  [].forEach.call(side.children, (t, i) => t.classList.toggle("cur", i === si));
  if (body.classList.contains("side-on")) side.children[si].scrollIntoView({ block: "nearest" });
}
/* all：段階表示を全部出した状態で見せる（← で前のページに戻ったとき） */
function paint(all) {
  secs.forEach((s, i) => s.classList.toggle("on", i === si));
  secs.forEach(s => s.querySelectorAll(STEP).forEach(e => e.classList.remove("on")));
  if (all) secs[si].querySelectorAll(STEP).forEach(e => e.classList.add("on"));
  showCurrent();
  try { history.replaceState(null, "", "#s" + (si + 1)); } catch (e) {}
}
function go(k, all) { if (k < 0 || k >= secs.length) return; si = k; paint(all); }
function steps() { return [].slice.call(secs[si].querySelectorAll(STEP)); }
function next() {
  const hidden = steps().filter(e => !e.classList.contains("on"));
  if (hidden.length) { hidden[0].classList.add("on"); return; }
  go(si + 1);
}
function prev() {
  /* 動きを止める印は、切り替えが描かれたあと（2 こま後）に外す */
  root.classList.add("step-back");
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove("step-back"); }); });
  const shown = steps().filter(e => e.classList.contains("on"));
  if (shown.length) { shown[shown.length - 1].classList.remove("on"); return; }
  go(si - 1, true);
}
/* 画面の左 1/4 のクリックで戻る、それ以外で進む（ボタン・バー・一覧は除く。選択・キー無効ではクリックで進まない） */
addEventListener("click", function (e) {
  if (body.classList.contains("edit") || body.classList.contains("op") || e.target.closest("button, input, .bar, .sw, .side")) return;
  if (e.clientX < innerWidth * 0.25) prev(); else next();
});
/* 操作は ⌘（Windows では Ctrl）＋ キー。⌘T・⌘L・⌘O はブラウザが先に取るので使わない。
   ⌘P はブラウザのプリントにそのまま任せる（ページで受けると、Safari ではプリントが二重に動く）。
   選択では ← → だけでページを送る。キー無効では、どのキーでもページを送らない（キーは図などに渡す） */
document.addEventListener("keydown", function (e) {
  const k = e.key, edit = body.classList.contains("edit");
  const keys = { KeyB: "side", KeyF: "full", KeyK: "ptr", KeyE: "edit", KeyU: "op" };
  if ((mac ? e.metaKey : e.ctrlKey) && !e.shiftKey && !e.altKey && keys[e.code]) { e.preventDefault(); toggle(keys[e.code]); return; }
  if (e.metaKey || e.ctrlKey || e.altKey || body.classList.contains("op")) return;   // ほかの ⌘ ＋ キーは、ブラウザに任せる
  /* 一覧を出しているときだけ、↑ ↓ でページを移る（一覧の絵を押したときと同じく、step は全部出す） */
  if (body.classList.contains("side-on") && (k === "ArrowDown" || k === "ArrowUp")) {
    e.preventDefault();
    go(si + (k === "ArrowDown" ? 1 : -1), true);
    return;
  }
  if (k === "ArrowRight" || (!edit && (k === " " || k === "Enter" || k === "PageDown"))) { e.preventDefault(); next(); }
  else if (k === "ArrowLeft" || (!edit && k === "PageUp")) { e.preventDefault(); prev(); }
  else if (!edit && k === "Home") { e.preventDefault(); go(0); }
  else if (!edit && k === "End") { e.preventDefault(); go(secs.length - 1); }
});
/* スライドの中のバーとボタンは、操作し終えたらフォーカスを外す（キーがページ送りに戻るように） */
["change", "pointerup"].forEach(function (t) {
  stage.addEventListener(t, function (e) { if (e.target.matches("input, button")) e.target.blur(); });
});

/* 指で触る画面でページを送る ◀ ▶（タップではページが進まないことがあるため）。押すと ← → のキーと同じ（段階表示も 1 つずつ進む） */
[["tap-prev", "前へ", "ArrowLeft"], ["tap-next", "次へ", "ArrowRight"]].forEach(function (b) {
  const el = $new("button", "tap-nav " + b[0]);
  el.setAttribute("aria-label", b[1]);
  el.addEventListener("click", function () {
    el.blur();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: b[2], bubbles: true }));
  });
  body.appendChild(el);
});

/* コピーしたときの数式：KaTeX の数式は、上付き・下付き（x ∈ ℝ^+ の + など）を表のような組み方で並べるので、
   そのままコピーすると、字の前後に改行が入る（「x∈R\n+\n」）。そこで、コピーするときは、選んだ範囲の数式を、
   見た目の字をつなげた 1 つの文字列に置き換えてから文字にする（例：「x∈ℝ+」）。白抜きの字（\mathbb）は ℝ などの 1 字に直す。
   数式でない部分は、ブラウザがふつうにコピーするときと同じ（innerText） */
const BB = { R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" };
document.addEventListener("copy", function (e) {
  const sel = getSelection();
  if (!sel.rangeCount || sel.isCollapsed) return;
  const frag = sel.getRangeAt(0).cloneContents();
  if (!frag.querySelector(".katex")) return;
  frag.querySelectorAll(".katex").forEach(function (k) {
    const html = k.querySelector(".katex-html") || k;
    html.querySelectorAll(".mathbb").forEach(function (b) { b.textContent = b.textContent.replace(/[RNZQC]/g, function (ch) { return BB[ch]; }); });
    k.replaceWith(document.createTextNode(html.textContent.replace(/\s+/g, "")));
  });
  /* 改行の入り方をふつうのコピーとそろえるため、画面の外に置いて innerText を取る */
  const box = $new("div");
  box.style.cssText = "position: fixed; left: -99999px; top: 0";
  box.appendChild(frag);
  body.appendChild(box);
  const text = box.innerText;
  box.remove();
  e.clipboardData.setData("text/plain", text);
  e.preventDefault();
});

/* #s番号：開いたときに読むほか、アドレスを書き換えて Enter を押したときも、そのページへ移る
   （ページを送るときの書き換えは history.replaceState なので、hashchange は出ない） */
function hashPage() {
  const h = parseInt((location.hash || "").replace("#s", ""), 10);
  return (h >= 1 && h <= secs.length) ? h - 1 : 0;
}
addEventListener("hashchange", function () { go(hashPage()); });
si = hashPage();
paint();
}

/* 中身を読み終えたら組み立てる */
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
else build();
})();
