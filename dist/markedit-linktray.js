"use strict";const P=require("markedit-api");function b(e){const t=c(e);return t==="/"?[]:t.replace(/^\/+/,"").split("/")}function c(e){const t=e.replaceAll("\\","/"),r=t.startsWith("/"),n=[];for(const i of t.split("/"))if(!(!i||i===".")){if(i===".."){if(n.length>0&&n[n.length-1]!==".."){n.pop();continue}r||n.push(i);continue}n.push(i)}return n.length===0?r?"/":".":`${r?"/":""}${n.join("/")}`}function y(e){const t=c(e);if(t==="/"||t===".")return t;const r=t.lastIndexOf("/");return r<0?".":r===0?"/":t.slice(0,r)}function S(e){const t=c(e);if(t==="/"||t===".")return t;const r=t.lastIndexOf("/");return r<0?t:t.slice(r+1)}function z(...e){return c(e.filter(Boolean).join("/"))}function L(e,t){const r=c(t);return r.startsWith("/")?r:c(`${c(e)}/${r}`)}function k(e,t){const r=b(e),n=b(t);let i=0;for(;i<r.length&&i<n.length&&r[i]===n[i];)i+=1;const a=Array.from({length:r.length-i},()=>".."),o=n.slice(i);return[...a,...o].join("/")||"."}function I(e){const t=new Set;return[...e].sort((r,n)=>r.index-n.index).flatMap(r=>t.has(r.resolvedPath)?[]:(t.add(r.resolvedPath),[M(r)]))}function M(e){const t={status:e.exists?"existing":"missing",filename:S(e.resolvedPath),displayPath:e.displayPath,resolvedPath:e.resolvedPath};return e.exists?{...t,openPath:e.resolvedPath}:t}const T=/\[([^\]]+)\]\(([^()\s]*(?:\([^()\s]*\)[^()\s]*)*)\)/g,$=/\[\[([^[\]]+)\]\]/g;function A(e){return[...F(e),...R(e)].sort((r,n)=>r.index-n.index)}function F(e){return Array.from(e.matchAll(T),t=>{const r=t[0],n=t[2],i=f(n.trim()),a=t.index??0;return _(i)?{kind:"markdown",original:r,rawTarget:n,normalizedTarget:i,index:a}:null}).filter(t=>t!==null)}function R(e){return Array.from(e.matchAll($),t=>{const r=t[0],n=f(t[1].split("|",1)[0].trim());return n?{kind:"wiki",original:r,rawTarget:n,normalizedTarget:D(n),index:t.index??0}:null}).filter(t=>t!==null)}function f(e){const t=e.indexOf("#");return t<0?e:e.slice(0,t)}function _(e){return f(e).toLowerCase().endsWith(".md")}function D(e){const t=f(e);return _(t)?t:`${t}.md`}function j({currentFilePath:e,rawTarget:t,kind:r}){const n=y(c(e)),i=N(t,r);return L(n,i)}function C({currentFilePath:e,resolvedTargetPath:t,repoRootPath:r}){const n=c(t);return k(r?c(r):y(c(e)),n)}function O(e){const t=e.indexOf("#");return t<0?e:e.slice(0,t)}function N(e,t){const r=c(O(e.trim()));return t==="wiki"&&!r.toLowerCase().endsWith(".md")?`${r}.md`:r}const K=".linktray-overlay{position:fixed;inset:0;z-index:10001;display:grid;place-items:start center;padding:clamp(3rem,10vh,7rem) 1rem 1.5rem;background:linear-gradient(to bottom,#edf1f7c7,#edf1f7e0);backdrop-filter:blur(6px)}.linktray-panel{width:min(43rem,100%);max-height:min(78vh,42rem);display:grid;grid-template-rows:auto auto minmax(0,1fr);border:1px solid rgba(63,77,93,.14);border-radius:18px;background:#f6f9fc;font-family:SF Pro Text,SF Pro Display,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;box-shadow:0 22px 52px #1a26341f,0 1px #ffffffb3 inset;overflow:hidden}.linktray-toolbar{display:grid;gap:.28rem;padding:.82rem .98rem .72rem;border-bottom:1px solid rgba(63,77,93,.1);background:linear-gradient(to bottom,#fffc,#f3f6faeb)}.linktray-toolbar__eyebrow{font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4e5f72d1}.linktray-toolbar__headline{display:flex;align-items:baseline;justify-content:space-between;gap:1rem}.linktray-toolbar__title{margin:0;font-size:clamp(.98rem,.92rem + .36vw,1.12rem);font-weight:640;letter-spacing:-.015em;color:#131f2c}.linktray-toolbar__count{font-size:.75rem;color:#48586adb;font-variant-numeric:tabular-nums}.linktray-searchRow{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:.62rem;padding:.72rem .98rem .8rem;border-bottom:1px solid rgba(63,77,93,.1)}.linktray-searchRow__label{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4e5f72c7}.linktray-search{width:100%;border:0;outline:0;padding:0;background:transparent;color:#1c2836;font:inherit;font-size:.92rem}.linktray-search::placeholder{color:#677688c7}.linktray-body{overflow:auto;scrollbar-gutter:stable;overscroll-behavior:contain}.linktray-sectionLabel{display:block;padding:.68rem .98rem .45rem;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4e5f72c7}.linktray-list{list-style:none;margin:0;padding:0}.linktray-summary{display:flex;align-items:center;justify-content:space-between;gap:.75rem;width:100%;padding:.76rem .98rem;border:0;border-top:1px solid rgba(63,77,93,.08);background:transparent;color:#233140;font:inherit;text-align:left;cursor:pointer}.linktray-summary__label{font-size:.82rem;font-weight:620}.linktray-summary__meta{font-size:.74rem;color:#4e5f72d1}.linktray-summary.linktray-item--selected{background:#44679114}.linktray-item{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.14rem .72rem;align-items:start;padding:.78rem .98rem;border-left:3px solid transparent;transition:background-color .14s ease,border-color .14s ease,opacity .14s ease}.linktray-item+.linktray-item,.linktray-list+.linktray-sectionLabel,.linktray-summary+.linktray-sectionLabel,.linktray-summary+.linktray-list{border-top:1px solid rgba(63,77,93,.08)}.linktray-item__body{display:grid;gap:.12rem}.linktray-item__symbol{width:.48rem;height:.48rem;margin-top:.38rem;border-radius:999px}.linktray-item__symbol--existing{background:#58a884;box-shadow:0 0 0 3px #58a8841f;animation:linktray-status-pulse 2.8s ease-in-out infinite}.linktray-item__symbol--missing{border:1.5px solid rgba(191,88,88,.72);background:#bf585824}.linktray-item--selected{border-left-color:#3565a4e6;background:#44679114}.linktray-item__filename{font-size:.92rem;font-weight:620;letter-spacing:-.01em;color:#141f2b}.linktray-item__path{color:#4f5d6eeb;font-size:.79rem}.linktray-item--missing{opacity:.62}.linktray-empty{margin:0;padding:1rem .98rem 1.15rem;color:#4f5d6ee6;font-size:.84rem}@keyframes linktray-status-pulse{0%,to{box-shadow:0 0 0 3px #58a8841a;opacity:.9}50%{box-shadow:0 0 0 5px #58a88429;opacity:1}}@media(prefers-reduced-motion:reduce){.linktray-item__symbol--existing{animation:none}}",Q=`
.linktray-overlay {
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: grid;
  place-items: start center;
  padding: clamp(3rem, 10vh, 7rem) 1rem 1.5rem;
  background:
    linear-gradient(to bottom, rgba(237, 241, 247, 0.78), rgba(237, 241, 247, 0.88));
  backdrop-filter: blur(6px);
}

.linktray-panel {
  width: min(43rem, 100%);
  max-height: min(78vh, 42rem);
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  border: 1px solid rgba(63, 77, 93, 0.14);
  border-radius: 18px;
  background: rgb(246, 249, 252);
  font-family:
    "SF Pro Text",
    "SF Pro Display",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  box-shadow:
    0 22px 52px rgba(26, 38, 52, 0.12),
    0 1px 0 rgba(255, 255, 255, 0.7) inset;
  overflow: hidden;
}

.linktray-toolbar {
  display: grid;
  gap: 0.28rem;
  padding: 0.82rem 0.98rem 0.72rem;
  border-bottom: 1px solid rgba(63, 77, 93, 0.1);
  background:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(243, 246, 250, 0.92));
}

.linktray-toolbar__eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(78, 95, 114, 0.82);
}

.linktray-toolbar__headline {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.linktray-toolbar__title {
  margin: 0;
  font-size: clamp(0.98rem, 0.92rem + 0.36vw, 1.12rem);
  font-weight: 640;
  letter-spacing: -0.015em;
  color: rgb(19, 31, 44);
}

.linktray-toolbar__count {
  font-size: 0.75rem;
  color: rgba(72, 88, 106, 0.86);
  font-variant-numeric: tabular-nums;
}

.linktray-searchRow {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.62rem;
  padding: 0.72rem 0.98rem 0.8rem;
  border-bottom: 1px solid rgba(63, 77, 93, 0.1);
}

.linktray-searchRow__label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(78, 95, 114, 0.78);
}

.linktray-search {
  width: 100%;
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  color: rgb(28, 40, 54);
  font: inherit;
  font-size: 0.92rem;
}

.linktray-search::placeholder {
  color: rgba(103, 118, 136, 0.78);
}

.linktray-body {
  overflow: auto;
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
}

.linktray-sectionLabel {
  display: block;
  padding: 0.68rem 0.98rem 0.45rem;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(78, 95, 114, 0.78);
}

.linktray-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.linktray-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.76rem 0.98rem;
  border: 0;
  border-top: 1px solid rgba(63, 77, 93, 0.08);
  background: transparent;
  color: rgb(35, 49, 64);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.linktray-summary__label {
  font-size: 0.82rem;
  font-weight: 620;
}

.linktray-summary__meta {
  font-size: 0.74rem;
  color: rgba(78, 95, 114, 0.82);
}

.linktray-summary.linktray-item--selected {
  background: rgba(68, 103, 145, 0.08);
}

.linktray-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.14rem 0.72rem;
  align-items: start;
  padding: 0.78rem 0.98rem;
  border-left: 3px solid transparent;
  transition: background-color 140ms ease, border-color 140ms ease, opacity 140ms ease;
}

.linktray-item + .linktray-item,
.linktray-list + .linktray-sectionLabel,
.linktray-summary + .linktray-sectionLabel,
.linktray-summary + .linktray-list {
  border-top: 1px solid rgba(63, 77, 93, 0.08);
}

.linktray-item__body {
  display: grid;
  gap: 0.12rem;
}

.linktray-item__symbol {
  width: 0.48rem;
  height: 0.48rem;
  margin-top: 0.38rem;
  border-radius: 999px;
}

.linktray-item__symbol--existing {
  background: rgb(88, 168, 132);
  box-shadow: 0 0 0 3px rgba(88, 168, 132, 0.12);
  animation: linktray-status-pulse 2.8s ease-in-out infinite;
}

.linktray-item__symbol--missing {
  border: 1.5px solid rgba(191, 88, 88, 0.72);
  background: rgba(191, 88, 88, 0.14);
}

.linktray-item--selected {
  border-left-color: rgba(53, 101, 164, 0.9);
  background: rgba(68, 103, 145, 0.08);
}

.linktray-item__filename {
  font-size: 0.92rem;
  font-weight: 620;
  letter-spacing: -0.01em;
  color: rgb(20, 31, 43);
}

.linktray-item__path {
  color: rgba(79, 93, 110, 0.92);
  font-size: 0.79rem;
}

.linktray-item--missing {
  opacity: 0.62;
}

.linktray-empty {
  margin: 0;
  padding: 1rem 0.98rem 1.15rem;
  color: rgba(79, 93, 110, 0.9);
  font-size: 0.84rem;
}

@keyframes linktray-status-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(88, 168, 132, 0.1);
    opacity: 0.9;
  }

  50% {
    box-shadow: 0 0 0 5px rgba(88, 168, 132, 0.16);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .linktray-item__symbol--existing {
    animation: none;
  }
}
`,v="markedit-linktray-root",W="style[data-linktray-style]";function q(e,t){let r=0,n="",i=!1;return{get selectedIndex(){return r},get query(){return n},render(){return U(g(e,n,i),r,n)},handleKey(a){const s=g(e,n,i).interactiveEntries;if(a==="ArrowDown"){if(s.length===0)return;r=Math.min(r+1,s.length-1);return}if(a==="ArrowUp"){r=Math.max(r-1,0);return}if(a==="Enter"){const l=s[r];if(l?.type==="missing-summary"){i=!i,r=Math.min(r,g(e,n,i).interactiveEntries.length-1);return}h(l?.item,t);return}a==="Escape"&&t.onClose()},click(a){r=a;const o=g(e,n,i).interactiveEntries[r];if(o?.type==="missing-summary"){i=!i;return}h(o?.item,t)},hover(a){r=a},setQuery(a){n=a,r=0}}}function B(e){return async t=>{const r=e.document??globalThis.document;if(!r?.body||!r?.head)return;V(r),Y(r);const n=r.createElement("div");n.id=v,r.body.append(n);let i=!1,a=null;const o=()=>{i||(i=!0,r.removeEventListener("keydown",u,!0),r.removeEventListener("keyup",d,!0),r.removeEventListener("keypress",d,!0),n.remove())},s=q(t,{onOpen:async m=>{await e.openFile(m),o()},onClose:async()=>{o()}}),l=()=>{i||(n.innerHTML=s.render(),a=n.querySelector(".linktray-search"),a?.focus(),a?.setSelectionRange(a.value.length,a.value.length))};H(n,s,l);const u=m=>{i||!a||r.activeElement!==a||x(m.key)&&(m.preventDefault(),m.stopPropagation(),s.handleKey(m.key),!i&&m.key!=="Escape"&&l())},d=m=>{i||!a||r.activeElement!==a||x(m.key)&&(m.preventDefault(),m.stopPropagation())};return r.addEventListener("keydown",u,!0),r.addEventListener("keyup",d,!0),r.addEventListener("keypress",d,!0),l(),e.onShow?.(s),s}}function U(e,t,r){const n=e.interactiveEntries.map((l,u)=>{if(l.type==="missing-summary")return[`<button class="linktray-summary${u===t?" linktray-item--selected":""}" data-index="${u}" type="button">`,`<span class="linktray-summary__label">Missing (${l.count})</span>`,'<span class="linktray-summary__meta">Show hidden links</span>',"</button>"].join("");const d=l.item,m=["linktray-item",d.status==="missing"?"linktray-item--missing":"linktray-item--existing",u===t?"linktray-item--selected":""].filter(Boolean).join(" "),E=d.status==="missing"?' aria-disabled="true"':"";return[`<li class="${m}" data-index="${u}"${E}>`,`<span class="linktray-item__symbol linktray-item__symbol--${d.status}" aria-hidden="true"></span>`,'<div class="linktray-item__body">',`<span class="linktray-item__filename">${p(d.filename)}</span>`,`<span class="linktray-item__path">${p(d.displayPath)}</span>`,"</div>","</li>"].join("")}),i=n.slice(0,e.availableItems.length).join(""),a=e.showMissingSummary?1:0,o=a?n[e.availableItems.length]??"":"",s=n.slice(e.availableItems.length+a).join("");return['<section class="linktray-overlay" role="dialog" aria-label="Linked Markdown files">','<div class="linktray-panel">','<header class="linktray-toolbar">','<div class="linktray-toolbar__eyebrow">Index</div>','<div class="linktray-toolbar__headline">','<h2 class="linktray-toolbar__title">Linked Markdown</h2>',`<div class="linktray-toolbar__count">${p(G(e.availableItems.length,e.missingItems.length))}</div>`,"</div>","</header>",'<div class="linktray-searchRow">','<label class="linktray-searchRow__label" for="linktray-search">Filter</label>',`<input id="linktray-search" class="linktray-search" type="text" placeholder="Type a file, path, or status" value="${p(r)}" />`,"</div>",'<div class="linktray-body">',e.availableItems.length>0?'<span class="linktray-sectionLabel">Available</span>':"",e.availableItems.length>0?`<ul class="linktray-list">${i}</ul>`:"",o,e.missingItems.length>0&&!e.showMissingSummary?'<span class="linktray-sectionLabel">Missing</span>':"",s?`<ul class="linktray-list">${s}</ul>`:!i&&!o?'<p class="linktray-empty">No linked notes match this filter.</p>':"","</div>","</div>","</section>"].join("")}async function h(e,t){e?.openPath&&await t.onOpen(e.openPath)}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function w(e,t){const r=t.trim().toLowerCase();return r?e.filter(n=>`${n.filename}
${n.displayPath}
${n.status}`.toLowerCase().includes(r)):e}function g(e,t,r){const n=w(e.filter(s=>s.status==="existing"),t),i=w(e.filter(s=>s.status==="missing"),t),a=t.trim().length>0&&i.length>0,o=i.length>0&&!a&&!r;return{availableItems:n,missingItems:i,showMissingSummary:o,interactiveEntries:[...n.map(s=>({type:"item",item:s})),...o?[{type:"missing-summary",count:i.length}]:[],...o?[]:i.map(s=>({type:"item",item:s}))]}}function H(e,t,r){e.addEventListener("input",n=>{n.target.matches(".linktray-search")&&(t.setQuery(n.target.value),r())}),e.addEventListener("click",n=>{const i=n.target.closest("[data-index]");if(!i)return;const a=Number(i.dataset.index);Number.isNaN(a)||(t.click(a),r())}),e.addEventListener("mouseover",n=>{const i=n.target.closest("[data-index]");if(!i)return;const a=Number(i.dataset.index);Number.isNaN(a)||(t.hover(a),r())})}function V(e){if(e.head.querySelector(W))return;const t=e.createElement("style");t.dataset.linktrayStyle="true",t.textContent=K.trim()||Q,e.head.append(t)}function Y(e){e.getElementById(v)?.remove()}function x(e){return e==="ArrowDown"||e==="ArrowUp"||e==="Enter"||e==="Escape"}function G(e,t){return`${e} active · ${t} missing`}function J(e,t=X(e)){const r=async()=>{const n=await e.getFileInfo();if(!n?.filePath){await e.showAlert({title:"MarkEdit-linktray unavailable",message:"Open a saved Markdown file before running MarkEdit-linktray."});return}const i=await e.getFileContent(),a=A(i??"");if(a.length===0){await e.showAlert({title:"No linked Markdown files",message:"The current document does not contain any Markdown links to show."});return}const o=await Z(e,n.filePath),s=await Promise.all(a.map(async l=>{const u=j({currentFilePath:n.filePath,rawTarget:l.rawTarget,kind:l.kind}),d=await e.getFileInfo(u);return{index:l.index,resolvedPath:u,displayPath:C({currentFilePath:n.filePath,resolvedTargetPath:u,repoRootPath:o}),exists:d!==void 0}}));await t(I(s))};return e.addMainMenuItem({title:"Open Linked Markdown",key:"L",modifiers:["Command","Shift"],action:r}),r}function X(e){return e.openFile?B({openFile:t=>e.openFile?.(t)??Promise.resolve(!1)}):async()=>{}}async function Z(e,t){let r=y(c(t));for(;;){if(await e.getFileInfo(z(r,".git")))return r;const i=y(r);if(i===r)return null;r=i}}J(P.MarkEdit);
//# sourceMappingURL=markedit-linktray.js.map
