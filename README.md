# WebSlide

ブラウザで開いて発表するスライドの仕組みです。HTML に短いタグで中身を書くと、ページ送り・段階表示・数式・図・印刷ができます。

## このリポジトリが渡すもの

渡すのは**機能**です。見た目（テーマ）は見本です。

- ページ送り（キー・クリック・指で触る画面の ◀ ▶）、段階表示（クリックで 1 つずつ出す）
- 数式（KaTeX。`$…$`・`$$…$$`）、図と動く図（SVG）
- ページ一覧・全画面・ポインター・印刷（1 ページ 1 枚。段階ごとに分けた PDF も作れる）
- 日本語の組み方（かっこ・句読点を全角の幅で組む、字を行の上下の真ん中に置く）

見た目は、使う人が自分で入れてください。PowerPoint・Beamer・Marp など、これまで使ってきたスライドの見た目を、テーマとして書き足すことを想定しています。

## 使い方

1. `template.html` と `webslide/` フォルダをコピーする。
2. `template.html` に中身を書く。タグと部品の書き方は、`webslide/webslide.js` の最初の説明にある。
3. ブラウザで開く。ファイルを直接開けば動く（サーバーは要らない）。

テーマは `<html theme="Madrid">` のように、`webslide/themes/` の中のファイルの名前で選びます。

## 自分の見た目を入れる

1. `webslide/themes/Madrid.css` をコピーして、名前を変える（例：`MyTheme.css`）。
2. その中の色・見出しの帯・下の帯・箇条書きの印・箱・表紙・区切りのページを書き換える。
3. `<html theme="MyTheme">` で選ぶ。

どのテーマにも共通の見た目（字の大きさ・印刷・メニューなど）は `webslide/base.css` にあります。

## 見本のテーマ

| テーマ | 中身 |
| --- | --- |
| Madrid | Beamer の Madrid を参考にした見た目。CSS は一から書いたもので、Beamer のコードは使っていない |

## ライセンス

WebSlide が書いた部分（`template.html`・`webslide/webslide.js`・`webslide/figure.js`・`webslide/base.css`・`webslide/themes/`）は MIT License です（`LICENSE`）。中に入れている書体と KaTeX は、下のそれぞれのライセンスのままです。

## 中に入れているもの

| もの | ライセンス | 場所（許諾文はそれぞれのファイルの最初） |
| --- | --- | --- |
| IPA Pゴシック（日本語の書体） | IPA フォント使用許諾 v1.0 | `webslide/fonts/ipa-pgothic.css` |
| KaTeX 0.18.11（数式）と、その書体の Computer Modern Sans | MIT（本体のうち、伸びる記号を描く部分 stretchy.js だけは SIL Open Font License 1.1） | `webslide/katex/`・`webslide/fonts/cm-sans.css` |
