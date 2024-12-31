import { computed as Yt, onMounted as lr, openBlock as fr, createElementBlock as dr } from "vue";
const Jt = {};
function hr(e) {
  let t = Jt[e];
  if (t)
    return t;
  t = Jt[e] = [];
  for (let u = 0; u < 128; u++) {
    const i = String.fromCharCode(u);
    t.push(i);
  }
  for (let u = 0; u < e.length; u++) {
    const i = e.charCodeAt(u);
    t[i] = "%" + ("0" + i.toString(16).toUpperCase()).slice(-2);
  }
  return t;
}
function t0(e, t) {
  typeof t != "string" && (t = t0.defaultChars);
  const u = hr(t);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(i) {
    let r = "";
    for (let n = 0, c = i.length; n < c; n += 3) {
      const a = parseInt(i.slice(n + 1, n + 3), 16);
      if (a < 128) {
        r += u[a];
        continue;
      }
      if ((a & 224) === 192 && n + 3 < c) {
        const s = parseInt(i.slice(n + 4, n + 6), 16);
        if ((s & 192) === 128) {
          const l = a << 6 & 1984 | s & 63;
          l < 128 ? r += "��" : r += String.fromCharCode(l), n += 3;
          continue;
        }
      }
      if ((a & 240) === 224 && n + 6 < c) {
        const s = parseInt(i.slice(n + 4, n + 6), 16), l = parseInt(i.slice(n + 7, n + 9), 16);
        if ((s & 192) === 128 && (l & 192) === 128) {
          const f = a << 12 & 61440 | s << 6 & 4032 | l & 63;
          f < 2048 || f >= 55296 && f <= 57343 ? r += "���" : r += String.fromCharCode(f), n += 6;
          continue;
        }
      }
      if ((a & 248) === 240 && n + 9 < c) {
        const s = parseInt(i.slice(n + 4, n + 6), 16), l = parseInt(i.slice(n + 7, n + 9), 16), f = parseInt(i.slice(n + 10, n + 12), 16);
        if ((s & 192) === 128 && (l & 192) === 128 && (f & 192) === 128) {
          let m = a << 18 & 1835008 | s << 12 & 258048 | l << 6 & 4032 | f & 63;
          m < 65536 || m > 1114111 ? r += "����" : (m -= 65536, r += String.fromCharCode(55296 + (m >> 10), 56320 + (m & 1023))), n += 9;
          continue;
        }
      }
      r += "�";
    }
    return r;
  });
}
t0.defaultChars = ";/?:@&=+$,#";
t0.componentChars = "";
const Qt = {};
function pr(e) {
  let t = Qt[e];
  if (t)
    return t;
  t = Qt[e] = [];
  for (let u = 0; u < 128; u++) {
    const i = String.fromCharCode(u);
    /^[0-9a-z]$/i.test(i) ? t.push(i) : t.push("%" + ("0" + u.toString(16).toUpperCase()).slice(-2));
  }
  for (let u = 0; u < e.length; u++)
    t[e.charCodeAt(u)] = e[u];
  return t;
}
function l0(e, t, u) {
  typeof t != "string" && (u = t, t = l0.defaultChars), typeof u > "u" && (u = !0);
  const i = pr(t);
  let r = "";
  for (let n = 0, c = e.length; n < c; n++) {
    const a = e.charCodeAt(n);
    if (u && a === 37 && n + 2 < c && /^[0-9a-f]{2}$/i.test(e.slice(n + 1, n + 3))) {
      r += e.slice(n, n + 3), n += 2;
      continue;
    }
    if (a < 128) {
      r += i[a];
      continue;
    }
    if (a >= 55296 && a <= 57343) {
      if (a >= 55296 && a <= 56319 && n + 1 < c) {
        const s = e.charCodeAt(n + 1);
        if (s >= 56320 && s <= 57343) {
          r += encodeURIComponent(e[n] + e[n + 1]), n++;
          continue;
        }
      }
      r += "%EF%BF%BD";
      continue;
    }
    r += encodeURIComponent(e[n]);
  }
  return r;
}
l0.defaultChars = ";/?:@&=+$,-_.!~*'()#";
l0.componentChars = "-_.!~*'()";
function St(e) {
  let t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
function A0() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const br = /^([a-z0-9.+-]+:)/i, mr = /:[0-9]*$/, _r = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, gr = ["<", ">", '"', "`", " ", "\r", `
`, "	"], xr = ["{", "}", "|", "\\", "^", "`"].concat(gr), yr = ["'"].concat(xr), eu = ["%", "/", "?", ";", "#"].concat(yr), tu = ["/", "?", "#"], vr = 255, uu = /^[+a-z0-9A-Z_-]{0,63}$/, kr = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, nu = {
  javascript: !0,
  "javascript:": !0
}, ru = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function Dt(e, t) {
  if (e && e instanceof A0) return e;
  const u = new A0();
  return u.parse(e, t), u;
}
A0.prototype.parse = function(e, t) {
  let u, i, r, n = e;
  if (n = n.trim(), !t && e.split("#").length === 1) {
    const l = _r.exec(n);
    if (l)
      return this.pathname = l[1], l[2] && (this.search = l[2]), this;
  }
  let c = br.exec(n);
  if (c && (c = c[0], u = c.toLowerCase(), this.protocol = c, n = n.substr(c.length)), (t || c || n.match(/^\/\/[^@\/]+@[^@\/]+/)) && (r = n.substr(0, 2) === "//", r && !(c && nu[c]) && (n = n.substr(2), this.slashes = !0)), !nu[c] && (r || c && !ru[c])) {
    let l = -1;
    for (let o = 0; o < tu.length; o++)
      i = n.indexOf(tu[o]), i !== -1 && (l === -1 || i < l) && (l = i);
    let f, m;
    l === -1 ? m = n.lastIndexOf("@") : m = n.lastIndexOf("@", l), m !== -1 && (f = n.slice(0, m), n = n.slice(m + 1), this.auth = f), l = -1;
    for (let o = 0; o < eu.length; o++)
      i = n.indexOf(eu[o]), i !== -1 && (l === -1 || i < l) && (l = i);
    l === -1 && (l = n.length), n[l - 1] === ":" && l--;
    const _ = n.slice(0, l);
    n = n.slice(l), this.parseHost(_), this.hostname = this.hostname || "";
    const y = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!y) {
      const o = this.hostname.split(/\./);
      for (let p = 0, d = o.length; p < d; p++) {
        const k = o[p];
        if (k && !k.match(uu)) {
          let h = "";
          for (let b = 0, w = k.length; b < w; b++)
            k.charCodeAt(b) > 127 ? h += "x" : h += k[b];
          if (!h.match(uu)) {
            const b = o.slice(0, p), w = o.slice(p + 1), g = k.match(kr);
            g && (b.push(g[1]), w.unshift(g[2])), w.length && (n = w.join(".") + n), this.hostname = b.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > vr && (this.hostname = ""), y && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const a = n.indexOf("#");
  a !== -1 && (this.hash = n.substr(a), n = n.slice(0, a));
  const s = n.indexOf("?");
  return s !== -1 && (this.search = n.substr(s), n = n.slice(0, s)), n && (this.pathname = n), ru[u] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
A0.prototype.parseHost = function(e) {
  let t = mr.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
const wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: t0,
  encode: l0,
  format: St,
  parse: Dt
}, Symbol.toStringTag, { value: "Module" })), ju = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Zu = /[\0-\x1F\x7F-\x9F]/, Er = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Tt = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Vu = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, Ku = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, Ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: ju,
  Cc: Zu,
  Cf: Er,
  P: Tt,
  S: Vu,
  Z: Ku
}, Symbol.toStringTag, { value: "Module" })), Cr = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), Sr = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var G0;
const Dr = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), Tr = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (G0 = String.fromCodePoint) !== null && G0 !== void 0 ? G0 : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function Mr(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Dr.get(e)) !== null && t !== void 0 ? t : e;
}
var be;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(be || (be = {}));
const Nr = 32;
var He;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(He || (He = {}));
function Et(e) {
  return e >= be.ZERO && e <= be.NINE;
}
function Rr(e) {
  return e >= be.UPPER_A && e <= be.UPPER_F || e >= be.LOWER_A && e <= be.LOWER_F;
}
function Fr(e) {
  return e >= be.UPPER_A && e <= be.UPPER_Z || e >= be.LOWER_A && e <= be.LOWER_Z || Et(e);
}
function Or(e) {
  return e === be.EQUALS || Fr(e);
}
var pe;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(pe || (pe = {}));
var Ue;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Ue || (Ue = {}));
class zr {
  constructor(t, u, i) {
    this.decodeTree = t, this.emitCodePoint = u, this.errors = i, this.state = pe.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Ue.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = pe.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, u) {
    switch (this.state) {
      case pe.EntityStart:
        return t.charCodeAt(u) === be.NUM ? (this.state = pe.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = pe.NamedEntity, this.stateNamedEntity(t, u));
      case pe.NumericStart:
        return this.stateNumericStart(t, u);
      case pe.NumericDecimal:
        return this.stateNumericDecimal(t, u);
      case pe.NumericHex:
        return this.stateNumericHex(t, u);
      case pe.NamedEntity:
        return this.stateNamedEntity(t, u);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, u) {
    return u >= t.length ? -1 : (t.charCodeAt(u) | Nr) === be.LOWER_X ? (this.state = pe.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = pe.NumericDecimal, this.stateNumericDecimal(t, u));
  }
  addToNumericResult(t, u, i, r) {
    if (u !== i) {
      const n = i - u;
      this.result = this.result * Math.pow(r, n) + parseInt(t.substr(u, n), r), this.consumed += n;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, u) {
    const i = u;
    for (; u < t.length; ) {
      const r = t.charCodeAt(u);
      if (Et(r) || Rr(r))
        u += 1;
      else
        return this.addToNumericResult(t, i, u, 16), this.emitNumericEntity(r, 3);
    }
    return this.addToNumericResult(t, i, u, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, u) {
    const i = u;
    for (; u < t.length; ) {
      const r = t.charCodeAt(u);
      if (Et(r))
        u += 1;
      else
        return this.addToNumericResult(t, i, u, 10), this.emitNumericEntity(r, 2);
    }
    return this.addToNumericResult(t, i, u, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, u) {
    var i;
    if (this.consumed <= u)
      return (i = this.errors) === null || i === void 0 || i.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === be.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Ue.Strict)
      return 0;
    return this.emitCodePoint(Mr(this.result), this.consumed), this.errors && (t !== be.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, u) {
    const { decodeTree: i } = this;
    let r = i[this.treeIndex], n = (r & He.VALUE_LENGTH) >> 14;
    for (; u < t.length; u++, this.excess++) {
      const c = t.charCodeAt(u);
      if (this.treeIndex = Ir(i, r, this.treeIndex + Math.max(1, n), c), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === Ue.Attribute && // We shouldn't have consumed any characters after the entity,
        (n === 0 || // And there should be no invalid characters.
        Or(c)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (r = i[this.treeIndex], n = (r & He.VALUE_LENGTH) >> 14, n !== 0) {
        if (c === be.SEMI)
          return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
        this.decodeMode !== Ue.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: u, decodeTree: i } = this, r = (i[u] & He.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(u, r, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, u, i) {
    const { decodeTree: r } = this;
    return this.emitCodePoint(u === 1 ? r[t] & ~He.VALUE_LENGTH : r[t + 1], i), u === 3 && this.emitCodePoint(r[t + 2], i), i;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case pe.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Ue.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case pe.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case pe.NumericHex:
        return this.emitNumericEntity(0, 3);
      case pe.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case pe.EntityStart:
        return 0;
    }
  }
}
function Wu(e) {
  let t = "";
  const u = new zr(e, (i) => t += Tr(i));
  return function(r, n) {
    let c = 0, a = 0;
    for (; (a = r.indexOf("&", a)) >= 0; ) {
      t += r.slice(c, a), u.startEntity(n);
      const l = u.write(
        r,
        // Skip the "&"
        a + 1
      );
      if (l < 0) {
        c = a + u.end();
        break;
      }
      c = a + l, a = l === 0 ? c + 1 : c;
    }
    const s = t + r.slice(c);
    return t = "", s;
  };
}
function Ir(e, t, u, i) {
  const r = (t & He.BRANCH_LENGTH) >> 7, n = t & He.JUMP_TABLE;
  if (r === 0)
    return n !== 0 && i === n ? u : -1;
  if (n) {
    const s = i - n;
    return s < 0 || s >= r ? -1 : e[u + s] - 1;
  }
  let c = u, a = c + r - 1;
  for (; c <= a; ) {
    const s = c + a >>> 1, l = e[s];
    if (l < i)
      c = s + 1;
    else if (l > i)
      a = s - 1;
    else
      return e[s + r];
  }
  return -1;
}
const Lr = Wu(Cr);
Wu(Sr);
function Xu(e, t = Ue.Legacy) {
  return Lr(e, t);
}
function Br(e) {
  return Object.prototype.toString.call(e);
}
function Mt(e) {
  return Br(e) === "[object String]";
}
const Pr = Object.prototype.hasOwnProperty;
function qr(e, t) {
  return Pr.call(e, t);
}
function T0(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(u) {
    if (u) {
      if (typeof u != "object")
        throw new TypeError(u + "must be object");
      Object.keys(u).forEach(function(i) {
        e[i] = u[i];
      });
    }
  }), e;
}
function Yu(e, t, u) {
  return [].concat(e.slice(0, t), u, e.slice(t + 1));
}
function Nt(e) {
  return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function C0(e) {
  if (e > 65535) {
    e -= 65536;
    const t = 55296 + (e >> 10), u = 56320 + (e & 1023);
    return String.fromCharCode(t, u);
  }
  return String.fromCharCode(e);
}
const Ju = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, $r = /&([a-z#][a-z0-9]{1,31});/gi, Ur = new RegExp(Ju.source + "|" + $r.source, "gi"), Hr = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function Gr(e, t) {
  if (t.charCodeAt(0) === 35 && Hr.test(t)) {
    const i = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
    return Nt(i) ? C0(i) : e;
  }
  const u = Xu(e);
  return u !== e ? u : e;
}
function jr(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(Ju, "$1");
}
function u0(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(Ur, function(t, u, i) {
    return u || Gr(t, i);
  });
}
const Zr = /[&<>"]/, Vr = /[&<>"]/g, Kr = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function Wr(e) {
  return Kr[e];
}
function Ge(e) {
  return Zr.test(e) ? e.replace(Vr, Wr) : e;
}
const Xr = /[.?*+^$[\]\\(){}|-]/g;
function Yr(e) {
  return e.replace(Xr, "\\$&");
}
function oe(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function i0(e) {
  if (e >= 8192 && e <= 8202)
    return !0;
  switch (e) {
    case 9:
    // \t
    case 10:
    // \n
    case 11:
    // \v
    case 12:
    // \f
    case 13:
    // \r
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function o0(e) {
  return Tt.test(e) || Vu.test(e);
}
function s0(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function M0(e) {
  return e = e.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (e = e.replace(/ẞ/g, "ß")), e.toLowerCase().toUpperCase();
}
const Jr = { mdurl: wr, ucmicro: Ar }, Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayReplaceAt: Yu,
  assign: T0,
  escapeHtml: Ge,
  escapeRE: Yr,
  fromCodePoint: C0,
  has: qr,
  isMdAsciiPunct: s0,
  isPunctChar: o0,
  isSpace: oe,
  isString: Mt,
  isValidEntityCode: Nt,
  isWhiteSpace: i0,
  lib: Jr,
  normalizeReference: M0,
  unescapeAll: u0,
  unescapeMd: jr
}, Symbol.toStringTag, { value: "Module" }));
function ea(e, t, u) {
  let i, r, n, c;
  const a = e.posMax, s = e.pos;
  for (e.pos = t + 1, i = 1; e.pos < a; ) {
    if (n = e.src.charCodeAt(e.pos), n === 93 && (i--, i === 0)) {
      r = !0;
      break;
    }
    if (c = e.pos, e.md.inline.skipToken(e), n === 91) {
      if (c === e.pos - 1)
        i++;
      else if (u)
        return e.pos = s, -1;
    }
  }
  let l = -1;
  return r && (l = e.pos), e.pos = s, l;
}
function ta(e, t, u) {
  let i, r = t;
  const n = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (e.charCodeAt(r) === 60) {
    for (r++; r < u; ) {
      if (i = e.charCodeAt(r), i === 10 || i === 60)
        return n;
      if (i === 62)
        return n.pos = r + 1, n.str = u0(e.slice(t + 1, r)), n.ok = !0, n;
      if (i === 92 && r + 1 < u) {
        r += 2;
        continue;
      }
      r++;
    }
    return n;
  }
  let c = 0;
  for (; r < u && (i = e.charCodeAt(r), !(i === 32 || i < 32 || i === 127)); ) {
    if (i === 92 && r + 1 < u) {
      if (e.charCodeAt(r + 1) === 32)
        break;
      r += 2;
      continue;
    }
    if (i === 40 && (c++, c > 32))
      return n;
    if (i === 41) {
      if (c === 0)
        break;
      c--;
    }
    r++;
  }
  return t === r || c !== 0 || (n.str = u0(e.slice(t, r)), n.pos = r, n.ok = !0), n;
}
function ua(e, t, u, i) {
  let r, n = t;
  const c = {
    // if `true`, this is a valid link title
    ok: !1,
    // if `true`, this link can be continued on the next line
    can_continue: !1,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (i)
    c.str = i.str, c.marker = i.marker;
  else {
    if (n >= u)
      return c;
    let a = e.charCodeAt(n);
    if (a !== 34 && a !== 39 && a !== 40)
      return c;
    t++, n++, a === 40 && (a = 41), c.marker = a;
  }
  for (; n < u; ) {
    if (r = e.charCodeAt(n), r === c.marker)
      return c.pos = n + 1, c.str += u0(e.slice(t, n)), c.ok = !0, c;
    if (r === 40 && c.marker === 41)
      return c;
    r === 92 && n + 1 < u && n++, n++;
  }
  return c.can_continue = !0, c.str += u0(e.slice(t, n)), c;
}
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseLinkDestination: ta,
  parseLinkLabel: ea,
  parseLinkTitle: ua
}, Symbol.toStringTag, { value: "Module" })), ze = {};
ze.code_inline = function(e, t, u, i, r) {
  const n = e[t];
  return "<code" + r.renderAttrs(n) + ">" + Ge(n.content) + "</code>";
};
ze.code_block = function(e, t, u, i, r) {
  const n = e[t];
  return "<pre" + r.renderAttrs(n) + "><code>" + Ge(e[t].content) + `</code></pre>
`;
};
ze.fence = function(e, t, u, i, r) {
  const n = e[t], c = n.info ? u0(n.info).trim() : "";
  let a = "", s = "";
  if (c) {
    const f = c.split(/(\s+)/g);
    a = f[0], s = f.slice(2).join("");
  }
  let l;
  if (u.highlight ? l = u.highlight(n.content, a, s) || Ge(n.content) : l = Ge(n.content), l.indexOf("<pre") === 0)
    return l + `
`;
  if (c) {
    const f = n.attrIndex("class"), m = n.attrs ? n.attrs.slice() : [];
    f < 0 ? m.push(["class", u.langPrefix + a]) : (m[f] = m[f].slice(), m[f][1] += " " + u.langPrefix + a);
    const _ = {
      attrs: m
    };
    return `<pre><code${r.renderAttrs(_)}>${l}</code></pre>
`;
  }
  return `<pre><code${r.renderAttrs(n)}>${l}</code></pre>
`;
};
ze.image = function(e, t, u, i, r) {
  const n = e[t];
  return n.attrs[n.attrIndex("alt")][1] = r.renderInlineAsText(n.children, u, i), r.renderToken(e, t, u);
};
ze.hardbreak = function(e, t, u) {
  return u.xhtmlOut ? `<br />
` : `<br>
`;
};
ze.softbreak = function(e, t, u) {
  return u.breaks ? u.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
ze.text = function(e, t) {
  return Ge(e[t].content);
};
ze.html_block = function(e, t) {
  return e[t].content;
};
ze.html_inline = function(e, t) {
  return e[t].content;
};
function n0() {
  this.rules = T0({}, ze);
}
n0.prototype.renderAttrs = function(t) {
  let u, i, r;
  if (!t.attrs)
    return "";
  for (r = "", u = 0, i = t.attrs.length; u < i; u++)
    r += " " + Ge(t.attrs[u][0]) + '="' + Ge(t.attrs[u][1]) + '"';
  return r;
};
n0.prototype.renderToken = function(t, u, i) {
  const r = t[u];
  let n = "";
  if (r.hidden)
    return "";
  r.block && r.nesting !== -1 && u && t[u - 1].hidden && (n += `
`), n += (r.nesting === -1 ? "</" : "<") + r.tag, n += this.renderAttrs(r), r.nesting === 0 && i.xhtmlOut && (n += " /");
  let c = !1;
  if (r.block && (c = !0, r.nesting === 1 && u + 1 < t.length)) {
    const a = t[u + 1];
    (a.type === "inline" || a.hidden || a.nesting === -1 && a.tag === r.tag) && (c = !1);
  }
  return n += c ? `>
` : ">", n;
};
n0.prototype.renderInline = function(e, t, u) {
  let i = "";
  const r = this.rules;
  for (let n = 0, c = e.length; n < c; n++) {
    const a = e[n].type;
    typeof r[a] < "u" ? i += r[a](e, n, t, u, this) : i += this.renderToken(e, n, t);
  }
  return i;
};
n0.prototype.renderInlineAsText = function(e, t, u) {
  let i = "";
  for (let r = 0, n = e.length; r < n; r++)
    switch (e[r].type) {
      case "text":
        i += e[r].content;
        break;
      case "image":
        i += this.renderInlineAsText(e[r].children, t, u);
        break;
      case "html_inline":
      case "html_block":
        i += e[r].content;
        break;
      case "softbreak":
      case "hardbreak":
        i += `
`;
        break;
    }
  return i;
};
n0.prototype.render = function(e, t, u) {
  let i = "";
  const r = this.rules;
  for (let n = 0, c = e.length; n < c; n++) {
    const a = e[n].type;
    a === "inline" ? i += this.renderInline(e[n].children, t, u) : typeof r[a] < "u" ? i += r[a](e, n, t, u, this) : i += this.renderToken(e, n, t, u);
  }
  return i;
};
function ke() {
  this.__rules__ = [], this.__cache__ = null;
}
ke.prototype.__find__ = function(e) {
  for (let t = 0; t < this.__rules__.length; t++)
    if (this.__rules__[t].name === e)
      return t;
  return -1;
};
ke.prototype.__compile__ = function() {
  const e = this, t = [""];
  e.__rules__.forEach(function(u) {
    u.enabled && u.alt.forEach(function(i) {
      t.indexOf(i) < 0 && t.push(i);
    });
  }), e.__cache__ = {}, t.forEach(function(u) {
    e.__cache__[u] = [], e.__rules__.forEach(function(i) {
      i.enabled && (u && i.alt.indexOf(u) < 0 || e.__cache__[u].push(i.fn));
    });
  });
};
ke.prototype.at = function(e, t, u) {
  const i = this.__find__(e), r = u || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__[i].fn = t, this.__rules__[i].alt = r.alt || [], this.__cache__ = null;
};
ke.prototype.before = function(e, t, u, i) {
  const r = this.__find__(e), n = i || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(r, 0, {
    name: t,
    enabled: !0,
    fn: u,
    alt: n.alt || []
  }), this.__cache__ = null;
};
ke.prototype.after = function(e, t, u, i) {
  const r = this.__find__(e), n = i || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(r + 1, 0, {
    name: t,
    enabled: !0,
    fn: u,
    alt: n.alt || []
  }), this.__cache__ = null;
};
ke.prototype.push = function(e, t, u) {
  const i = u || {};
  this.__rules__.push({
    name: e,
    enabled: !0,
    fn: t,
    alt: i.alt || []
  }), this.__cache__ = null;
};
ke.prototype.enable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const u = [];
  return e.forEach(function(i) {
    const r = this.__find__(i);
    if (r < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + i);
    }
    this.__rules__[r].enabled = !0, u.push(i);
  }, this), this.__cache__ = null, u;
};
ke.prototype.enableOnly = function(e, t) {
  Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(u) {
    u.enabled = !1;
  }), this.enable(e, t);
};
ke.prototype.disable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const u = [];
  return e.forEach(function(i) {
    const r = this.__find__(i);
    if (r < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + i);
    }
    this.__rules__[r].enabled = !1, u.push(i);
  }, this), this.__cache__ = null, u;
};
ke.prototype.getRules = function(e) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
function Te(e, t, u) {
  this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = u, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
Te.prototype.attrIndex = function(t) {
  if (!this.attrs)
    return -1;
  const u = this.attrs;
  for (let i = 0, r = u.length; i < r; i++)
    if (u[i][0] === t)
      return i;
  return -1;
};
Te.prototype.attrPush = function(t) {
  this.attrs ? this.attrs.push(t) : this.attrs = [t];
};
Te.prototype.attrSet = function(t, u) {
  const i = this.attrIndex(t), r = [t, u];
  i < 0 ? this.attrPush(r) : this.attrs[i] = r;
};
Te.prototype.attrGet = function(t) {
  const u = this.attrIndex(t);
  let i = null;
  return u >= 0 && (i = this.attrs[u][1]), i;
};
Te.prototype.attrJoin = function(t, u) {
  const i = this.attrIndex(t);
  i < 0 ? this.attrPush([t, u]) : this.attrs[i][1] = this.attrs[i][1] + " " + u;
};
function Qu(e, t, u) {
  this.src = e, this.env = u, this.tokens = [], this.inlineMode = !1, this.md = t;
}
Qu.prototype.Token = Te;
const ra = /\r\n?|\n/g, aa = /\0/g;
function ia(e) {
  let t;
  t = e.src.replace(ra, `
`), t = t.replace(aa, "�"), e.src = t;
}
function oa(e) {
  let t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function sa(e) {
  const t = e.tokens;
  for (let u = 0, i = t.length; u < i; u++) {
    const r = t[u];
    r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
  }
}
function ca(e) {
  return /^<a[>\s]/i.test(e);
}
function la(e) {
  return /^<\/a\s*>/i.test(e);
}
function fa(e) {
  const t = e.tokens;
  if (e.md.options.linkify)
    for (let u = 0, i = t.length; u < i; u++) {
      if (t[u].type !== "inline" || !e.md.linkify.pretest(t[u].content))
        continue;
      let r = t[u].children, n = 0;
      for (let c = r.length - 1; c >= 0; c--) {
        const a = r[c];
        if (a.type === "link_close") {
          for (c--; r[c].level !== a.level && r[c].type !== "link_open"; )
            c--;
          continue;
        }
        if (a.type === "html_inline" && (ca(a.content) && n > 0 && n--, la(a.content) && n++), !(n > 0) && a.type === "text" && e.md.linkify.test(a.content)) {
          const s = a.content;
          let l = e.md.linkify.match(s);
          const f = [];
          let m = a.level, _ = 0;
          l.length > 0 && l[0].index === 0 && c > 0 && r[c - 1].type === "text_special" && (l = l.slice(1));
          for (let y = 0; y < l.length; y++) {
            const o = l[y].url, p = e.md.normalizeLink(o);
            if (!e.md.validateLink(p))
              continue;
            let d = l[y].text;
            l[y].schema ? l[y].schema === "mailto:" && !/^mailto:/i.test(d) ? d = e.md.normalizeLinkText("mailto:" + d).replace(/^mailto:/, "") : d = e.md.normalizeLinkText(d) : d = e.md.normalizeLinkText("http://" + d).replace(/^http:\/\//, "");
            const k = l[y].index;
            if (k > _) {
              const g = new e.Token("text", "", 0);
              g.content = s.slice(_, k), g.level = m, f.push(g);
            }
            const h = new e.Token("link_open", "a", 1);
            h.attrs = [["href", p]], h.level = m++, h.markup = "linkify", h.info = "auto", f.push(h);
            const b = new e.Token("text", "", 0);
            b.content = d, b.level = m, f.push(b);
            const w = new e.Token("link_close", "a", -1);
            w.level = --m, w.markup = "linkify", w.info = "auto", f.push(w), _ = l[y].lastIndex;
          }
          if (_ < s.length) {
            const y = new e.Token("text", "", 0);
            y.content = s.slice(_), y.level = m, f.push(y);
          }
          t[u].children = r = Yu(r, c, f);
        }
      }
    }
}
const en = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, da = /\((c|tm|r)\)/i, ha = /\((c|tm|r)\)/ig, pa = {
  c: "©",
  r: "®",
  tm: "™"
};
function ba(e, t) {
  return pa[t.toLowerCase()];
}
function ma(e) {
  let t = 0;
  for (let u = e.length - 1; u >= 0; u--) {
    const i = e[u];
    i.type === "text" && !t && (i.content = i.content.replace(ha, ba)), i.type === "link_open" && i.info === "auto" && t--, i.type === "link_close" && i.info === "auto" && t++;
  }
}
function _a(e) {
  let t = 0;
  for (let u = e.length - 1; u >= 0; u--) {
    const i = e[u];
    i.type === "text" && !t && en.test(i.content) && (i.content = i.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), i.type === "link_open" && i.info === "auto" && t--, i.type === "link_close" && i.info === "auto" && t++;
  }
}
function ga(e) {
  let t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (da.test(e.tokens[t].content) && ma(e.tokens[t].children), en.test(e.tokens[t].content) && _a(e.tokens[t].children));
}
const xa = /['"]/, au = /['"]/g, iu = "’";
function y0(e, t, u) {
  return e.slice(0, t) + u + e.slice(t + 1);
}
function ya(e, t) {
  let u;
  const i = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r], c = e[r].level;
    for (u = i.length - 1; u >= 0 && !(i[u].level <= c); u--)
      ;
    if (i.length = u + 1, n.type !== "text")
      continue;
    let a = n.content, s = 0, l = a.length;
    e:
      for (; s < l; ) {
        au.lastIndex = s;
        const f = au.exec(a);
        if (!f)
          break;
        let m = !0, _ = !0;
        s = f.index + 1;
        const y = f[0] === "'";
        let o = 32;
        if (f.index - 1 >= 0)
          o = a.charCodeAt(f.index - 1);
        else
          for (u = r - 1; u >= 0 && !(e[u].type === "softbreak" || e[u].type === "hardbreak"); u--)
            if (e[u].content) {
              o = e[u].content.charCodeAt(e[u].content.length - 1);
              break;
            }
        let p = 32;
        if (s < l)
          p = a.charCodeAt(s);
        else
          for (u = r + 1; u < e.length && !(e[u].type === "softbreak" || e[u].type === "hardbreak"); u++)
            if (e[u].content) {
              p = e[u].content.charCodeAt(0);
              break;
            }
        const d = s0(o) || o0(String.fromCharCode(o)), k = s0(p) || o0(String.fromCharCode(p)), h = i0(o), b = i0(p);
        if (b ? m = !1 : k && (h || d || (m = !1)), h ? _ = !1 : d && (b || k || (_ = !1)), p === 34 && f[0] === '"' && o >= 48 && o <= 57 && (_ = m = !1), m && _ && (m = d, _ = k), !m && !_) {
          y && (n.content = y0(n.content, f.index, iu));
          continue;
        }
        if (_)
          for (u = i.length - 1; u >= 0; u--) {
            let w = i[u];
            if (i[u].level < c)
              break;
            if (w.single === y && i[u].level === c) {
              w = i[u];
              let g, x;
              y ? (g = t.md.options.quotes[2], x = t.md.options.quotes[3]) : (g = t.md.options.quotes[0], x = t.md.options.quotes[1]), n.content = y0(n.content, f.index, x), e[w.token].content = y0(
                e[w.token].content,
                w.pos,
                g
              ), s += x.length - 1, w.token === r && (s += g.length - 1), a = n.content, l = a.length, i.length = u;
              continue e;
            }
          }
        m ? i.push({
          token: r,
          pos: f.index,
          single: y,
          level: c
        }) : _ && y && (n.content = y0(n.content, f.index, iu));
      }
  }
}
function va(e) {
  if (e.md.options.typographer)
    for (let t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !xa.test(e.tokens[t].content) || ya(e.tokens[t].children, e);
}
function ka(e) {
  let t, u;
  const i = e.tokens, r = i.length;
  for (let n = 0; n < r; n++) {
    if (i[n].type !== "inline") continue;
    const c = i[n].children, a = c.length;
    for (t = 0; t < a; t++)
      c[t].type === "text_special" && (c[t].type = "text");
    for (t = u = 0; t < a; t++)
      c[t].type === "text" && t + 1 < a && c[t + 1].type === "text" ? c[t + 1].content = c[t].content + c[t + 1].content : (t !== u && (c[u] = c[t]), u++);
    t !== u && (c.length = u);
  }
}
const j0 = [
  ["normalize", ia],
  ["block", oa],
  ["inline", sa],
  ["linkify", fa],
  ["replacements", ga],
  ["smartquotes", va],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", ka]
];
function Rt() {
  this.ruler = new ke();
  for (let e = 0; e < j0.length; e++)
    this.ruler.push(j0[e][0], j0[e][1]);
}
Rt.prototype.process = function(e) {
  const t = this.ruler.getRules("");
  for (let u = 0, i = t.length; u < i; u++)
    t[u](e);
};
Rt.prototype.State = Qu;
function Ie(e, t, u, i) {
  this.src = e, this.md = t, this.env = u, this.tokens = i, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
  const r = this.src;
  for (let n = 0, c = 0, a = 0, s = 0, l = r.length, f = !1; c < l; c++) {
    const m = r.charCodeAt(c);
    if (!f)
      if (oe(m)) {
        a++, m === 9 ? s += 4 - s % 4 : s++;
        continue;
      } else
        f = !0;
    (m === 10 || c === l - 1) && (m !== 10 && c++, this.bMarks.push(n), this.eMarks.push(c), this.tShift.push(a), this.sCount.push(s), this.bsCount.push(0), f = !1, a = 0, s = 0, n = c + 1);
  }
  this.bMarks.push(r.length), this.eMarks.push(r.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Ie.prototype.push = function(e, t, u) {
  const i = new Te(e, t, u);
  return i.block = !0, u < 0 && this.level--, i.level = this.level, u > 0 && this.level++, this.tokens.push(i), i;
};
Ie.prototype.isEmpty = function(t) {
  return this.bMarks[t] + this.tShift[t] >= this.eMarks[t];
};
Ie.prototype.skipEmptyLines = function(t) {
  for (let u = this.lineMax; t < u && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++)
    ;
  return t;
};
Ie.prototype.skipSpaces = function(t) {
  for (let u = this.src.length; t < u; t++) {
    const i = this.src.charCodeAt(t);
    if (!oe(i))
      break;
  }
  return t;
};
Ie.prototype.skipSpacesBack = function(t, u) {
  if (t <= u)
    return t;
  for (; t > u; )
    if (!oe(this.src.charCodeAt(--t)))
      return t + 1;
  return t;
};
Ie.prototype.skipChars = function(t, u) {
  for (let i = this.src.length; t < i && this.src.charCodeAt(t) === u; t++)
    ;
  return t;
};
Ie.prototype.skipCharsBack = function(t, u, i) {
  if (t <= i)
    return t;
  for (; t > i; )
    if (u !== this.src.charCodeAt(--t))
      return t + 1;
  return t;
};
Ie.prototype.getLines = function(t, u, i, r) {
  if (t >= u)
    return "";
  const n = new Array(u - t);
  for (let c = 0, a = t; a < u; a++, c++) {
    let s = 0;
    const l = this.bMarks[a];
    let f = l, m;
    for (a + 1 < u || r ? m = this.eMarks[a] + 1 : m = this.eMarks[a]; f < m && s < i; ) {
      const _ = this.src.charCodeAt(f);
      if (oe(_))
        _ === 9 ? s += 4 - (s + this.bsCount[a]) % 4 : s++;
      else if (f - l < this.tShift[a])
        s++;
      else
        break;
      f++;
    }
    s > i ? n[c] = new Array(s - i + 1).join(" ") + this.src.slice(f, m) : n[c] = this.src.slice(f, m);
  }
  return n.join("");
};
Ie.prototype.Token = Te;
const wa = 65536;
function Z0(e, t) {
  const u = e.bMarks[t] + e.tShift[t], i = e.eMarks[t];
  return e.src.slice(u, i);
}
function ou(e) {
  const t = [], u = e.length;
  let i = 0, r = e.charCodeAt(i), n = !1, c = 0, a = "";
  for (; i < u; )
    r === 124 && (n ? (a += e.substring(c, i - 1), c = i) : (t.push(a + e.substring(c, i)), a = "", c = i + 1)), n = r === 92, i++, r = e.charCodeAt(i);
  return t.push(a + e.substring(c)), t;
}
function Ea(e, t, u, i) {
  if (t + 2 > u)
    return !1;
  let r = t + 1;
  if (e.sCount[r] < e.blkIndent || e.sCount[r] - e.blkIndent >= 4)
    return !1;
  let n = e.bMarks[r] + e.tShift[r];
  if (n >= e.eMarks[r])
    return !1;
  const c = e.src.charCodeAt(n++);
  if (c !== 124 && c !== 45 && c !== 58 || n >= e.eMarks[r])
    return !1;
  const a = e.src.charCodeAt(n++);
  if (a !== 124 && a !== 45 && a !== 58 && !oe(a) || c === 45 && oe(a))
    return !1;
  for (; n < e.eMarks[r]; ) {
    const w = e.src.charCodeAt(n);
    if (w !== 124 && w !== 45 && w !== 58 && !oe(w))
      return !1;
    n++;
  }
  let s = Z0(e, t + 1), l = s.split("|");
  const f = [];
  for (let w = 0; w < l.length; w++) {
    const g = l[w].trim();
    if (!g) {
      if (w === 0 || w === l.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(g))
      return !1;
    g.charCodeAt(g.length - 1) === 58 ? f.push(g.charCodeAt(0) === 58 ? "center" : "right") : g.charCodeAt(0) === 58 ? f.push("left") : f.push("");
  }
  if (s = Z0(e, t).trim(), s.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4)
    return !1;
  l = ou(s), l.length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop();
  const m = l.length;
  if (m === 0 || m !== f.length)
    return !1;
  if (i)
    return !0;
  const _ = e.parentType;
  e.parentType = "table";
  const y = e.md.block.ruler.getRules("blockquote"), o = e.push("table_open", "table", 1), p = [t, 0];
  o.map = p;
  const d = e.push("thead_open", "thead", 1);
  d.map = [t, t + 1];
  const k = e.push("tr_open", "tr", 1);
  k.map = [t, t + 1];
  for (let w = 0; w < l.length; w++) {
    const g = e.push("th_open", "th", 1);
    f[w] && (g.attrs = [["style", "text-align:" + f[w]]]);
    const x = e.push("inline", "", 0);
    x.content = l[w].trim(), x.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let h, b = 0;
  for (r = t + 2; r < u && !(e.sCount[r] < e.blkIndent); r++) {
    let w = !1;
    for (let x = 0, A = y.length; x < A; x++)
      if (y[x](e, r, u, !0)) {
        w = !0;
        break;
      }
    if (w || (s = Z0(e, r).trim(), !s) || e.sCount[r] - e.blkIndent >= 4 || (l = ou(s), l.length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop(), b += m - l.length, b > wa))
      break;
    if (r === t + 2) {
      const x = e.push("tbody_open", "tbody", 1);
      x.map = h = [t + 2, 0];
    }
    const g = e.push("tr_open", "tr", 1);
    g.map = [r, r + 1];
    for (let x = 0; x < m; x++) {
      const A = e.push("td_open", "td", 1);
      f[x] && (A.attrs = [["style", "text-align:" + f[x]]]);
      const C = e.push("inline", "", 0);
      C.content = l[x] ? l[x].trim() : "", C.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return h && (e.push("tbody_close", "tbody", -1), h[1] = r), e.push("table_close", "table", -1), p[1] = r, e.parentType = _, e.line = r, !0;
}
function Aa(e, t, u) {
  if (e.sCount[t] - e.blkIndent < 4)
    return !1;
  let i = t + 1, r = i;
  for (; i < u; ) {
    if (e.isEmpty(i)) {
      i++;
      continue;
    }
    if (e.sCount[i] - e.blkIndent >= 4) {
      i++, r = i;
      continue;
    }
    break;
  }
  e.line = r;
  const n = e.push("code_block", "code", 0);
  return n.content = e.getLines(t, r, 4 + e.blkIndent, !1) + `
`, n.map = [t, e.line], !0;
}
function Ca(e, t, u, i) {
  let r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || r + 3 > n)
    return !1;
  const c = e.src.charCodeAt(r);
  if (c !== 126 && c !== 96)
    return !1;
  let a = r;
  r = e.skipChars(r, c);
  let s = r - a;
  if (s < 3)
    return !1;
  const l = e.src.slice(a, r), f = e.src.slice(r, n);
  if (c === 96 && f.indexOf(String.fromCharCode(c)) >= 0)
    return !1;
  if (i)
    return !0;
  let m = t, _ = !1;
  for (; m++, !(m >= u || (r = a = e.bMarks[m] + e.tShift[m], n = e.eMarks[m], r < n && e.sCount[m] < e.blkIndent)); )
    if (e.src.charCodeAt(r) === c && !(e.sCount[m] - e.blkIndent >= 4) && (r = e.skipChars(r, c), !(r - a < s) && (r = e.skipSpaces(r), !(r < n)))) {
      _ = !0;
      break;
    }
  s = e.sCount[t], e.line = m + (_ ? 1 : 0);
  const y = e.push("fence", "code", 0);
  return y.info = f, y.content = e.getLines(t + 1, m, s, !0), y.markup = l, y.map = [t, e.line], !0;
}
function Sa(e, t, u, i) {
  let r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  const c = e.lineMax;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(r) !== 62)
    return !1;
  if (i)
    return !0;
  const a = [], s = [], l = [], f = [], m = e.md.block.ruler.getRules("blockquote"), _ = e.parentType;
  e.parentType = "blockquote";
  let y = !1, o;
  for (o = t; o < u; o++) {
    const b = e.sCount[o] < e.blkIndent;
    if (r = e.bMarks[o] + e.tShift[o], n = e.eMarks[o], r >= n)
      break;
    if (e.src.charCodeAt(r++) === 62 && !b) {
      let g = e.sCount[o] + 1, x, A;
      e.src.charCodeAt(r) === 32 ? (r++, g++, A = !1, x = !0) : e.src.charCodeAt(r) === 9 ? (x = !0, (e.bsCount[o] + g) % 4 === 3 ? (r++, g++, A = !1) : A = !0) : x = !1;
      let C = g;
      for (a.push(e.bMarks[o]), e.bMarks[o] = r; r < n; ) {
        const D = e.src.charCodeAt(r);
        if (oe(D))
          D === 9 ? C += 4 - (C + e.bsCount[o] + (A ? 1 : 0)) % 4 : C++;
        else
          break;
        r++;
      }
      y = r >= n, s.push(e.bsCount[o]), e.bsCount[o] = e.sCount[o] + 1 + (x ? 1 : 0), l.push(e.sCount[o]), e.sCount[o] = C - g, f.push(e.tShift[o]), e.tShift[o] = r - e.bMarks[o];
      continue;
    }
    if (y)
      break;
    let w = !1;
    for (let g = 0, x = m.length; g < x; g++)
      if (m[g](e, o, u, !0)) {
        w = !0;
        break;
      }
    if (w) {
      e.lineMax = o, e.blkIndent !== 0 && (a.push(e.bMarks[o]), s.push(e.bsCount[o]), f.push(e.tShift[o]), l.push(e.sCount[o]), e.sCount[o] -= e.blkIndent);
      break;
    }
    a.push(e.bMarks[o]), s.push(e.bsCount[o]), f.push(e.tShift[o]), l.push(e.sCount[o]), e.sCount[o] = -1;
  }
  const p = e.blkIndent;
  e.blkIndent = 0;
  const d = e.push("blockquote_open", "blockquote", 1);
  d.markup = ">";
  const k = [t, 0];
  d.map = k, e.md.block.tokenize(e, t, o);
  const h = e.push("blockquote_close", "blockquote", -1);
  h.markup = ">", e.lineMax = c, e.parentType = _, k[1] = e.line;
  for (let b = 0; b < f.length; b++)
    e.bMarks[b + t] = a[b], e.tShift[b + t] = f[b], e.sCount[b + t] = l[b], e.bsCount[b + t] = s[b];
  return e.blkIndent = p, !0;
}
function Da(e, t, u, i) {
  const r = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let n = e.bMarks[t] + e.tShift[t];
  const c = e.src.charCodeAt(n++);
  if (c !== 42 && c !== 45 && c !== 95)
    return !1;
  let a = 1;
  for (; n < r; ) {
    const l = e.src.charCodeAt(n++);
    if (l !== c && !oe(l))
      return !1;
    l === c && a++;
  }
  if (a < 3)
    return !1;
  if (i)
    return !0;
  e.line = t + 1;
  const s = e.push("hr", "hr", 0);
  return s.map = [t, e.line], s.markup = Array(a + 1).join(String.fromCharCode(c)), !0;
}
function su(e, t) {
  const u = e.eMarks[t];
  let i = e.bMarks[t] + e.tShift[t];
  const r = e.src.charCodeAt(i++);
  if (r !== 42 && r !== 45 && r !== 43)
    return -1;
  if (i < u) {
    const n = e.src.charCodeAt(i);
    if (!oe(n))
      return -1;
  }
  return i;
}
function cu(e, t) {
  const u = e.bMarks[t] + e.tShift[t], i = e.eMarks[t];
  let r = u;
  if (r + 1 >= i)
    return -1;
  let n = e.src.charCodeAt(r++);
  if (n < 48 || n > 57)
    return -1;
  for (; ; ) {
    if (r >= i)
      return -1;
    if (n = e.src.charCodeAt(r++), n >= 48 && n <= 57) {
      if (r - u >= 10)
        return -1;
      continue;
    }
    if (n === 41 || n === 46)
      break;
    return -1;
  }
  return r < i && (n = e.src.charCodeAt(r), !oe(n)) ? -1 : r;
}
function Ta(e, t) {
  const u = e.level + 2;
  for (let i = t + 2, r = e.tokens.length - 2; i < r; i++)
    e.tokens[i].level === u && e.tokens[i].type === "paragraph_open" && (e.tokens[i + 2].hidden = !0, e.tokens[i].hidden = !0, i += 2);
}
function Ma(e, t, u, i) {
  let r, n, c, a, s = t, l = !0;
  if (e.sCount[s] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[s] - e.listIndent >= 4 && e.sCount[s] < e.blkIndent)
    return !1;
  let f = !1;
  i && e.parentType === "paragraph" && e.sCount[s] >= e.blkIndent && (f = !0);
  let m, _, y;
  if ((y = cu(e, s)) >= 0) {
    if (m = !0, c = e.bMarks[s] + e.tShift[s], _ = Number(e.src.slice(c, y - 1)), f && _ !== 1) return !1;
  } else if ((y = su(e, s)) >= 0)
    m = !1;
  else
    return !1;
  if (f && e.skipSpaces(y) >= e.eMarks[s])
    return !1;
  if (i)
    return !0;
  const o = e.src.charCodeAt(y - 1), p = e.tokens.length;
  m ? (a = e.push("ordered_list_open", "ol", 1), _ !== 1 && (a.attrs = [["start", _]])) : a = e.push("bullet_list_open", "ul", 1);
  const d = [s, 0];
  a.map = d, a.markup = String.fromCharCode(o);
  let k = !1;
  const h = e.md.block.ruler.getRules("list"), b = e.parentType;
  for (e.parentType = "list"; s < u; ) {
    n = y, r = e.eMarks[s];
    const w = e.sCount[s] + y - (e.bMarks[s] + e.tShift[s]);
    let g = w;
    for (; n < r; ) {
      const T = e.src.charCodeAt(n);
      if (T === 9)
        g += 4 - (g + e.bsCount[s]) % 4;
      else if (T === 32)
        g++;
      else
        break;
      n++;
    }
    const x = n;
    let A;
    x >= r ? A = 1 : A = g - w, A > 4 && (A = 1);
    const C = w + A;
    a = e.push("list_item_open", "li", 1), a.markup = String.fromCharCode(o);
    const D = [s, 0];
    a.map = D, m && (a.info = e.src.slice(c, y - 1));
    const E = e.tight, O = e.tShift[s], M = e.sCount[s], I = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = C, e.tight = !0, e.tShift[s] = x - e.bMarks[s], e.sCount[s] = g, x >= r && e.isEmpty(s + 1) ? e.line = Math.min(e.line + 2, u) : e.md.block.tokenize(e, s, u, !0), (!e.tight || k) && (l = !1), k = e.line - s > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = I, e.tShift[s] = O, e.sCount[s] = M, e.tight = E, a = e.push("list_item_close", "li", -1), a.markup = String.fromCharCode(o), s = e.line, D[1] = s, s >= u || e.sCount[s] < e.blkIndent || e.sCount[s] - e.blkIndent >= 4)
      break;
    let B = !1;
    for (let T = 0, $ = h.length; T < $; T++)
      if (h[T](e, s, u, !0)) {
        B = !0;
        break;
      }
    if (B)
      break;
    if (m) {
      if (y = cu(e, s), y < 0)
        break;
      c = e.bMarks[s] + e.tShift[s];
    } else if (y = su(e, s), y < 0)
      break;
    if (o !== e.src.charCodeAt(y - 1))
      break;
  }
  return m ? a = e.push("ordered_list_close", "ol", -1) : a = e.push("bullet_list_close", "ul", -1), a.markup = String.fromCharCode(o), d[1] = s, e.line = s, e.parentType = b, l && Ta(e, p), !0;
}
function Na(e, t, u, i) {
  let r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t], c = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(r) !== 91)
    return !1;
  function a(h) {
    const b = e.lineMax;
    if (h >= b || e.isEmpty(h))
      return null;
    let w = !1;
    if (e.sCount[h] - e.blkIndent > 3 && (w = !0), e.sCount[h] < 0 && (w = !0), !w) {
      const A = e.md.block.ruler.getRules("reference"), C = e.parentType;
      e.parentType = "reference";
      let D = !1;
      for (let E = 0, O = A.length; E < O; E++)
        if (A[E](e, h, b, !0)) {
          D = !0;
          break;
        }
      if (e.parentType = C, D)
        return null;
    }
    const g = e.bMarks[h] + e.tShift[h], x = e.eMarks[h];
    return e.src.slice(g, x + 1);
  }
  let s = e.src.slice(r, n + 1);
  n = s.length;
  let l = -1;
  for (r = 1; r < n; r++) {
    const h = s.charCodeAt(r);
    if (h === 91)
      return !1;
    if (h === 93) {
      l = r;
      break;
    } else if (h === 10) {
      const b = a(c);
      b !== null && (s += b, n = s.length, c++);
    } else if (h === 92 && (r++, r < n && s.charCodeAt(r) === 10)) {
      const b = a(c);
      b !== null && (s += b, n = s.length, c++);
    }
  }
  if (l < 0 || s.charCodeAt(l + 1) !== 58)
    return !1;
  for (r = l + 2; r < n; r++) {
    const h = s.charCodeAt(r);
    if (h === 10) {
      const b = a(c);
      b !== null && (s += b, n = s.length, c++);
    } else if (!oe(h)) break;
  }
  const f = e.md.helpers.parseLinkDestination(s, r, n);
  if (!f.ok)
    return !1;
  const m = e.md.normalizeLink(f.str);
  if (!e.md.validateLink(m))
    return !1;
  r = f.pos;
  const _ = r, y = c, o = r;
  for (; r < n; r++) {
    const h = s.charCodeAt(r);
    if (h === 10) {
      const b = a(c);
      b !== null && (s += b, n = s.length, c++);
    } else if (!oe(h)) break;
  }
  let p = e.md.helpers.parseLinkTitle(s, r, n);
  for (; p.can_continue; ) {
    const h = a(c);
    if (h === null) break;
    s += h, r = n, n = s.length, c++, p = e.md.helpers.parseLinkTitle(s, r, n, p);
  }
  let d;
  for (r < n && o !== r && p.ok ? (d = p.str, r = p.pos) : (d = "", r = _, c = y); r < n; ) {
    const h = s.charCodeAt(r);
    if (!oe(h))
      break;
    r++;
  }
  if (r < n && s.charCodeAt(r) !== 10 && d)
    for (d = "", r = _, c = y; r < n; ) {
      const h = s.charCodeAt(r);
      if (!oe(h))
        break;
      r++;
    }
  if (r < n && s.charCodeAt(r) !== 10)
    return !1;
  const k = M0(s.slice(1, l));
  return k ? (i || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[k] > "u" && (e.env.references[k] = { title: d, href: m }), e.line = c), !0) : !1;
}
const Ra = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Fa = "[a-zA-Z_:][a-zA-Z0-9:._-]*", Oa = "[^\"'=<>`\\x00-\\x20]+", za = "'[^']*'", Ia = '"[^"]*"', La = "(?:" + Oa + "|" + za + "|" + Ia + ")", Ba = "(?:\\s+" + Fa + "(?:\\s*=\\s*" + La + ")?)", tn = "<[A-Za-z][A-Za-z0-9\\-]*" + Ba + "*\\s*\\/?>", un = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", Pa = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->", qa = "<[?][\\s\\S]*?[?]>", $a = "<![A-Za-z][^>]*>", Ua = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", Ha = new RegExp("^(?:" + tn + "|" + un + "|" + Pa + "|" + qa + "|" + $a + "|" + Ua + ")"), Ga = new RegExp("^(?:" + tn + "|" + un + ")"), Ye = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + Ra.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(Ga.source + "\\s*$"), /^$/, !1]
];
function ja(e, t, u, i) {
  let r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(r) !== 60)
    return !1;
  let c = e.src.slice(r, n), a = 0;
  for (; a < Ye.length && !Ye[a][0].test(c); a++)
    ;
  if (a === Ye.length)
    return !1;
  if (i)
    return Ye[a][2];
  let s = t + 1;
  if (!Ye[a][1].test(c)) {
    for (; s < u && !(e.sCount[s] < e.blkIndent); s++)
      if (r = e.bMarks[s] + e.tShift[s], n = e.eMarks[s], c = e.src.slice(r, n), Ye[a][1].test(c)) {
        c.length !== 0 && s++;
        break;
      }
  }
  e.line = s;
  const l = e.push("html_block", "", 0);
  return l.map = [t, s], l.content = e.getLines(t, s, e.blkIndent, !0), !0;
}
function Za(e, t, u, i) {
  let r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let c = e.src.charCodeAt(r);
  if (c !== 35 || r >= n)
    return !1;
  let a = 1;
  for (c = e.src.charCodeAt(++r); c === 35 && r < n && a <= 6; )
    a++, c = e.src.charCodeAt(++r);
  if (a > 6 || r < n && !oe(c))
    return !1;
  if (i)
    return !0;
  n = e.skipSpacesBack(n, r);
  const s = e.skipCharsBack(n, 35, r);
  s > r && oe(e.src.charCodeAt(s - 1)) && (n = s), e.line = t + 1;
  const l = e.push("heading_open", "h" + String(a), 1);
  l.markup = "########".slice(0, a), l.map = [t, e.line];
  const f = e.push("inline", "", 0);
  f.content = e.src.slice(r, n).trim(), f.map = [t, e.line], f.children = [];
  const m = e.push("heading_close", "h" + String(a), -1);
  return m.markup = "########".slice(0, a), !0;
}
function Va(e, t, u) {
  const i = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  const r = e.parentType;
  e.parentType = "paragraph";
  let n = 0, c, a = t + 1;
  for (; a < u && !e.isEmpty(a); a++) {
    if (e.sCount[a] - e.blkIndent > 3)
      continue;
    if (e.sCount[a] >= e.blkIndent) {
      let y = e.bMarks[a] + e.tShift[a];
      const o = e.eMarks[a];
      if (y < o && (c = e.src.charCodeAt(y), (c === 45 || c === 61) && (y = e.skipChars(y, c), y = e.skipSpaces(y), y >= o))) {
        n = c === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[a] < 0)
      continue;
    let _ = !1;
    for (let y = 0, o = i.length; y < o; y++)
      if (i[y](e, a, u, !0)) {
        _ = !0;
        break;
      }
    if (_)
      break;
  }
  if (!n)
    return !1;
  const s = e.getLines(t, a, e.blkIndent, !1).trim();
  e.line = a + 1;
  const l = e.push("heading_open", "h" + String(n), 1);
  l.markup = String.fromCharCode(c), l.map = [t, e.line];
  const f = e.push("inline", "", 0);
  f.content = s, f.map = [t, e.line - 1], f.children = [];
  const m = e.push("heading_close", "h" + String(n), -1);
  return m.markup = String.fromCharCode(c), e.parentType = r, !0;
}
function Ka(e, t, u) {
  const i = e.md.block.ruler.getRules("paragraph"), r = e.parentType;
  let n = t + 1;
  for (e.parentType = "paragraph"; n < u && !e.isEmpty(n); n++) {
    if (e.sCount[n] - e.blkIndent > 3 || e.sCount[n] < 0)
      continue;
    let l = !1;
    for (let f = 0, m = i.length; f < m; f++)
      if (i[f](e, n, u, !0)) {
        l = !0;
        break;
      }
    if (l)
      break;
  }
  const c = e.getLines(t, n, e.blkIndent, !1).trim();
  e.line = n;
  const a = e.push("paragraph_open", "p", 1);
  a.map = [t, e.line];
  const s = e.push("inline", "", 0);
  return s.content = c, s.map = [t, e.line], s.children = [], e.push("paragraph_close", "p", -1), e.parentType = r, !0;
}
const v0 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", Ea, ["paragraph", "reference"]],
  ["code", Aa],
  ["fence", Ca, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", Sa, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", Da, ["paragraph", "reference", "blockquote", "list"]],
  ["list", Ma, ["paragraph", "reference", "blockquote"]],
  ["reference", Na],
  ["html_block", ja, ["paragraph", "reference", "blockquote"]],
  ["heading", Za, ["paragraph", "reference", "blockquote"]],
  ["lheading", Va],
  ["paragraph", Ka]
];
function N0() {
  this.ruler = new ke();
  for (let e = 0; e < v0.length; e++)
    this.ruler.push(v0[e][0], v0[e][1], { alt: (v0[e][2] || []).slice() });
}
N0.prototype.tokenize = function(e, t, u) {
  const i = this.ruler.getRules(""), r = i.length, n = e.md.options.maxNesting;
  let c = t, a = !1;
  for (; c < u && (e.line = c = e.skipEmptyLines(c), !(c >= u || e.sCount[c] < e.blkIndent)); ) {
    if (e.level >= n) {
      e.line = u;
      break;
    }
    const s = e.line;
    let l = !1;
    for (let f = 0; f < r; f++)
      if (l = i[f](e, c, u, !1), l) {
        if (s >= e.line)
          throw new Error("block rule didn't increment state.line");
        break;
      }
    if (!l) throw new Error("none of the block rules matched");
    e.tight = !a, e.isEmpty(e.line - 1) && (a = !0), c = e.line, c < u && e.isEmpty(c) && (a = !0, c++, e.line = c);
  }
};
N0.prototype.parse = function(e, t, u, i) {
  if (!e)
    return;
  const r = new this.State(e, t, u, i);
  this.tokenize(r, r.line, r.lineMax);
};
N0.prototype.State = Ie;
function f0(e, t, u, i) {
  this.src = e, this.env = u, this.md = t, this.tokens = i, this.tokens_meta = Array(i.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
f0.prototype.pushPending = function() {
  const e = new Te("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
};
f0.prototype.push = function(e, t, u) {
  this.pending && this.pushPending();
  const i = new Te(e, t, u);
  let r = null;
  return u < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), i.level = this.level, u > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], r = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(i), this.tokens_meta.push(r), i;
};
f0.prototype.scanDelims = function(e, t) {
  const u = this.posMax, i = this.src.charCodeAt(e), r = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  let n = e;
  for (; n < u && this.src.charCodeAt(n) === i; )
    n++;
  const c = n - e, a = n < u ? this.src.charCodeAt(n) : 32, s = s0(r) || o0(String.fromCharCode(r)), l = s0(a) || o0(String.fromCharCode(a)), f = i0(r), m = i0(a), _ = !m && (!l || f || s), y = !f && (!s || m || l);
  return { can_open: _ && (t || !y || s), can_close: y && (t || !_ || l), length: c };
};
f0.prototype.Token = Te;
function Wa(e) {
  switch (e) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function Xa(e, t) {
  let u = e.pos;
  for (; u < e.posMax && !Wa(e.src.charCodeAt(u)); )
    u++;
  return u === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, u)), e.pos = u, !0);
}
const Ya = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function Ja(e, t) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const u = e.pos, i = e.posMax;
  if (u + 3 > i || e.src.charCodeAt(u) !== 58 || e.src.charCodeAt(u + 1) !== 47 || e.src.charCodeAt(u + 2) !== 47) return !1;
  const r = e.pending.match(Ya);
  if (!r) return !1;
  const n = r[1], c = e.md.linkify.matchAtStart(e.src.slice(u - n.length));
  if (!c) return !1;
  let a = c.url;
  if (a.length <= n.length) return !1;
  a = a.replace(/\*+$/, "");
  const s = e.md.normalizeLink(a);
  if (!e.md.validateLink(s)) return !1;
  if (!t) {
    e.pending = e.pending.slice(0, -n.length);
    const l = e.push("link_open", "a", 1);
    l.attrs = [["href", s]], l.markup = "linkify", l.info = "auto";
    const f = e.push("text", "", 0);
    f.content = e.md.normalizeLinkText(a);
    const m = e.push("link_close", "a", -1);
    m.markup = "linkify", m.info = "auto";
  }
  return e.pos += a.length - n.length, !0;
}
function Qa(e, t) {
  let u = e.pos;
  if (e.src.charCodeAt(u) !== 10)
    return !1;
  const i = e.pending.length - 1, r = e.posMax;
  if (!t)
    if (i >= 0 && e.pending.charCodeAt(i) === 32)
      if (i >= 1 && e.pending.charCodeAt(i - 1) === 32) {
        let n = i - 1;
        for (; n >= 1 && e.pending.charCodeAt(n - 1) === 32; ) n--;
        e.pending = e.pending.slice(0, n), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (u++; u < r && oe(e.src.charCodeAt(u)); )
    u++;
  return e.pos = u, !0;
}
const Ft = [];
for (let e = 0; e < 256; e++)
  Ft.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  Ft[e.charCodeAt(0)] = 1;
});
function ei(e, t) {
  let u = e.pos;
  const i = e.posMax;
  if (e.src.charCodeAt(u) !== 92 || (u++, u >= i)) return !1;
  let r = e.src.charCodeAt(u);
  if (r === 10) {
    for (t || e.push("hardbreak", "br", 0), u++; u < i && (r = e.src.charCodeAt(u), !!oe(r)); )
      u++;
    return e.pos = u, !0;
  }
  let n = e.src[u];
  if (r >= 55296 && r <= 56319 && u + 1 < i) {
    const a = e.src.charCodeAt(u + 1);
    a >= 56320 && a <= 57343 && (n += e.src[u + 1], u++);
  }
  const c = "\\" + n;
  if (!t) {
    const a = e.push("text_special", "", 0);
    r < 256 && Ft[r] !== 0 ? a.content = n : a.content = c, a.markup = c, a.info = "escape";
  }
  return e.pos = u + 1, !0;
}
function ti(e, t) {
  let u = e.pos;
  if (e.src.charCodeAt(u) !== 96)
    return !1;
  const r = u;
  u++;
  const n = e.posMax;
  for (; u < n && e.src.charCodeAt(u) === 96; )
    u++;
  const c = e.src.slice(r, u), a = c.length;
  if (e.backticksScanned && (e.backticks[a] || 0) <= r)
    return t || (e.pending += c), e.pos += a, !0;
  let s = u, l;
  for (; (l = e.src.indexOf("`", s)) !== -1; ) {
    for (s = l + 1; s < n && e.src.charCodeAt(s) === 96; )
      s++;
    const f = s - l;
    if (f === a) {
      if (!t) {
        const m = e.push("code_inline", "code", 0);
        m.markup = c, m.content = e.src.slice(u, l).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      return e.pos = s, !0;
    }
    e.backticks[f] = l;
  }
  return e.backticksScanned = !0, t || (e.pending += c), e.pos += a, !0;
}
function ui(e, t) {
  const u = e.pos, i = e.src.charCodeAt(u);
  if (t || i !== 126)
    return !1;
  const r = e.scanDelims(e.pos, !0);
  let n = r.length;
  const c = String.fromCharCode(i);
  if (n < 2)
    return !1;
  let a;
  n % 2 && (a = e.push("text", "", 0), a.content = c, n--);
  for (let s = 0; s < n; s += 2)
    a = e.push("text", "", 0), a.content = c + c, e.delimiters.push({
      marker: i,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: r.can_open,
      close: r.can_close
    });
  return e.pos += r.length, !0;
}
function lu(e, t) {
  let u;
  const i = [], r = t.length;
  for (let n = 0; n < r; n++) {
    const c = t[n];
    if (c.marker !== 126 || c.end === -1)
      continue;
    const a = t[c.end];
    u = e.tokens[c.token], u.type = "s_open", u.tag = "s", u.nesting = 1, u.markup = "~~", u.content = "", u = e.tokens[a.token], u.type = "s_close", u.tag = "s", u.nesting = -1, u.markup = "~~", u.content = "", e.tokens[a.token - 1].type === "text" && e.tokens[a.token - 1].content === "~" && i.push(a.token - 1);
  }
  for (; i.length; ) {
    const n = i.pop();
    let c = n + 1;
    for (; c < e.tokens.length && e.tokens[c].type === "s_close"; )
      c++;
    c--, n !== c && (u = e.tokens[c], e.tokens[c] = e.tokens[n], e.tokens[n] = u);
  }
}
function ni(e) {
  const t = e.tokens_meta, u = e.tokens_meta.length;
  lu(e, e.delimiters);
  for (let i = 0; i < u; i++)
    t[i] && t[i].delimiters && lu(e, t[i].delimiters);
}
const nn = {
  tokenize: ui,
  postProcess: ni
};
function ri(e, t) {
  const u = e.pos, i = e.src.charCodeAt(u);
  if (t || i !== 95 && i !== 42)
    return !1;
  const r = e.scanDelims(e.pos, i === 42);
  for (let n = 0; n < r.length; n++) {
    const c = e.push("text", "", 0);
    c.content = String.fromCharCode(i), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: i,
      // Total length of these series of delimiters.
      //
      length: r.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: r.can_open,
      close: r.can_close
    });
  }
  return e.pos += r.length, !0;
}
function fu(e, t) {
  const u = t.length;
  for (let i = u - 1; i >= 0; i--) {
    const r = t[i];
    if (r.marker !== 95 && r.marker !== 42 || r.end === -1)
      continue;
    const n = t[r.end], c = i > 0 && t[i - 1].end === r.end + 1 && // check that first two markers match and adjacent
    t[i - 1].marker === r.marker && t[i - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    t[r.end + 1].token === n.token + 1, a = String.fromCharCode(r.marker), s = e.tokens[r.token];
    s.type = c ? "strong_open" : "em_open", s.tag = c ? "strong" : "em", s.nesting = 1, s.markup = c ? a + a : a, s.content = "";
    const l = e.tokens[n.token];
    l.type = c ? "strong_close" : "em_close", l.tag = c ? "strong" : "em", l.nesting = -1, l.markup = c ? a + a : a, l.content = "", c && (e.tokens[t[i - 1].token].content = "", e.tokens[t[r.end + 1].token].content = "", i--);
  }
}
function ai(e) {
  const t = e.tokens_meta, u = e.tokens_meta.length;
  fu(e, e.delimiters);
  for (let i = 0; i < u; i++)
    t[i] && t[i].delimiters && fu(e, t[i].delimiters);
}
const rn = {
  tokenize: ri,
  postProcess: ai
};
function ii(e, t) {
  let u, i, r, n, c = "", a = "", s = e.pos, l = !0;
  if (e.src.charCodeAt(e.pos) !== 91)
    return !1;
  const f = e.pos, m = e.posMax, _ = e.pos + 1, y = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (y < 0)
    return !1;
  let o = y + 1;
  if (o < m && e.src.charCodeAt(o) === 40) {
    for (l = !1, o++; o < m && (u = e.src.charCodeAt(o), !(!oe(u) && u !== 10)); o++)
      ;
    if (o >= m)
      return !1;
    if (s = o, r = e.md.helpers.parseLinkDestination(e.src, o, e.posMax), r.ok) {
      for (c = e.md.normalizeLink(r.str), e.md.validateLink(c) ? o = r.pos : c = "", s = o; o < m && (u = e.src.charCodeAt(o), !(!oe(u) && u !== 10)); o++)
        ;
      if (r = e.md.helpers.parseLinkTitle(e.src, o, e.posMax), o < m && s !== o && r.ok)
        for (a = r.str, o = r.pos; o < m && (u = e.src.charCodeAt(o), !(!oe(u) && u !== 10)); o++)
          ;
    }
    (o >= m || e.src.charCodeAt(o) !== 41) && (l = !0), o++;
  }
  if (l) {
    if (typeof e.env.references > "u")
      return !1;
    if (o < m && e.src.charCodeAt(o) === 91 ? (s = o + 1, o = e.md.helpers.parseLinkLabel(e, o), o >= 0 ? i = e.src.slice(s, o++) : o = y + 1) : o = y + 1, i || (i = e.src.slice(_, y)), n = e.env.references[M0(i)], !n)
      return e.pos = f, !1;
    c = n.href, a = n.title;
  }
  if (!t) {
    e.pos = _, e.posMax = y;
    const p = e.push("link_open", "a", 1), d = [["href", c]];
    p.attrs = d, a && d.push(["title", a]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = o, e.posMax = m, !0;
}
function oi(e, t) {
  let u, i, r, n, c, a, s, l, f = "";
  const m = e.pos, _ = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91)
    return !1;
  const y = e.pos + 2, o = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
  if (o < 0)
    return !1;
  if (n = o + 1, n < _ && e.src.charCodeAt(n) === 40) {
    for (n++; n < _ && (u = e.src.charCodeAt(n), !(!oe(u) && u !== 10)); n++)
      ;
    if (n >= _)
      return !1;
    for (l = n, a = e.md.helpers.parseLinkDestination(e.src, n, e.posMax), a.ok && (f = e.md.normalizeLink(a.str), e.md.validateLink(f) ? n = a.pos : f = ""), l = n; n < _ && (u = e.src.charCodeAt(n), !(!oe(u) && u !== 10)); n++)
      ;
    if (a = e.md.helpers.parseLinkTitle(e.src, n, e.posMax), n < _ && l !== n && a.ok)
      for (s = a.str, n = a.pos; n < _ && (u = e.src.charCodeAt(n), !(!oe(u) && u !== 10)); n++)
        ;
    else
      s = "";
    if (n >= _ || e.src.charCodeAt(n) !== 41)
      return e.pos = m, !1;
    n++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (n < _ && e.src.charCodeAt(n) === 91 ? (l = n + 1, n = e.md.helpers.parseLinkLabel(e, n), n >= 0 ? r = e.src.slice(l, n++) : n = o + 1) : n = o + 1, r || (r = e.src.slice(y, o)), c = e.env.references[M0(r)], !c)
      return e.pos = m, !1;
    f = c.href, s = c.title;
  }
  if (!t) {
    i = e.src.slice(y, o);
    const p = [];
    e.md.inline.parse(
      i,
      e.md,
      e.env,
      p
    );
    const d = e.push("image", "img", 0), k = [["src", f], ["alt", ""]];
    d.attrs = k, d.children = p, d.content = i, s && k.push(["title", s]);
  }
  return e.pos = n, e.posMax = _, !0;
}
const si = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, ci = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function li(e, t) {
  let u = e.pos;
  if (e.src.charCodeAt(u) !== 60)
    return !1;
  const i = e.pos, r = e.posMax;
  for (; ; ) {
    if (++u >= r) return !1;
    const c = e.src.charCodeAt(u);
    if (c === 60) return !1;
    if (c === 62) break;
  }
  const n = e.src.slice(i + 1, u);
  if (ci.test(n)) {
    const c = e.md.normalizeLink(n);
    if (!e.md.validateLink(c))
      return !1;
    if (!t) {
      const a = e.push("link_open", "a", 1);
      a.attrs = [["href", c]], a.markup = "autolink", a.info = "auto";
      const s = e.push("text", "", 0);
      s.content = e.md.normalizeLinkText(n);
      const l = e.push("link_close", "a", -1);
      l.markup = "autolink", l.info = "auto";
    }
    return e.pos += n.length + 2, !0;
  }
  if (si.test(n)) {
    const c = e.md.normalizeLink("mailto:" + n);
    if (!e.md.validateLink(c))
      return !1;
    if (!t) {
      const a = e.push("link_open", "a", 1);
      a.attrs = [["href", c]], a.markup = "autolink", a.info = "auto";
      const s = e.push("text", "", 0);
      s.content = e.md.normalizeLinkText(n);
      const l = e.push("link_close", "a", -1);
      l.markup = "autolink", l.info = "auto";
    }
    return e.pos += n.length + 2, !0;
  }
  return !1;
}
function fi(e) {
  return /^<a[>\s]/i.test(e);
}
function di(e) {
  return /^<\/a\s*>/i.test(e);
}
function hi(e) {
  const t = e | 32;
  return t >= 97 && t <= 122;
}
function pi(e, t) {
  if (!e.md.options.html)
    return !1;
  const u = e.posMax, i = e.pos;
  if (e.src.charCodeAt(i) !== 60 || i + 2 >= u)
    return !1;
  const r = e.src.charCodeAt(i + 1);
  if (r !== 33 && r !== 63 && r !== 47 && !hi(r))
    return !1;
  const n = e.src.slice(i).match(Ha);
  if (!n)
    return !1;
  if (!t) {
    const c = e.push("html_inline", "", 0);
    c.content = n[0], fi(c.content) && e.linkLevel++, di(c.content) && e.linkLevel--;
  }
  return e.pos += n[0].length, !0;
}
const bi = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, mi = /^&([a-z][a-z0-9]{1,31});/i;
function _i(e, t) {
  const u = e.pos, i = e.posMax;
  if (e.src.charCodeAt(u) !== 38 || u + 1 >= i) return !1;
  if (e.src.charCodeAt(u + 1) === 35) {
    const n = e.src.slice(u).match(bi);
    if (n) {
      if (!t) {
        const c = n[1][0].toLowerCase() === "x" ? parseInt(n[1].slice(1), 16) : parseInt(n[1], 10), a = e.push("text_special", "", 0);
        a.content = Nt(c) ? C0(c) : C0(65533), a.markup = n[0], a.info = "entity";
      }
      return e.pos += n[0].length, !0;
    }
  } else {
    const n = e.src.slice(u).match(mi);
    if (n) {
      const c = Xu(n[0]);
      if (c !== n[0]) {
        if (!t) {
          const a = e.push("text_special", "", 0);
          a.content = c, a.markup = n[0], a.info = "entity";
        }
        return e.pos += n[0].length, !0;
      }
    }
  }
  return !1;
}
function du(e) {
  const t = {}, u = e.length;
  if (!u) return;
  let i = 0, r = -2;
  const n = [];
  for (let c = 0; c < u; c++) {
    const a = e[c];
    if (n.push(0), (e[i].marker !== a.marker || r !== a.token - 1) && (i = c), r = a.token, a.length = a.length || 0, !a.close) continue;
    t.hasOwnProperty(a.marker) || (t[a.marker] = [-1, -1, -1, -1, -1, -1]);
    const s = t[a.marker][(a.open ? 3 : 0) + a.length % 3];
    let l = i - n[i] - 1, f = l;
    for (; l > s; l -= n[l] + 1) {
      const m = e[l];
      if (m.marker === a.marker && m.open && m.end < 0) {
        let _ = !1;
        if ((m.close || a.open) && (m.length + a.length) % 3 === 0 && (m.length % 3 !== 0 || a.length % 3 !== 0) && (_ = !0), !_) {
          const y = l > 0 && !e[l - 1].open ? n[l - 1] + 1 : 0;
          n[c] = c - l + y, n[l] = y, a.open = !1, m.end = c, m.close = !1, f = -1, r = -2;
          break;
        }
      }
    }
    f !== -1 && (t[a.marker][(a.open ? 3 : 0) + (a.length || 0) % 3] = f);
  }
}
function gi(e) {
  const t = e.tokens_meta, u = e.tokens_meta.length;
  du(e.delimiters);
  for (let i = 0; i < u; i++)
    t[i] && t[i].delimiters && du(t[i].delimiters);
}
function xi(e) {
  let t, u, i = 0;
  const r = e.tokens, n = e.tokens.length;
  for (t = u = 0; t < n; t++)
    r[t].nesting < 0 && i--, r[t].level = i, r[t].nesting > 0 && i++, r[t].type === "text" && t + 1 < n && r[t + 1].type === "text" ? r[t + 1].content = r[t].content + r[t + 1].content : (t !== u && (r[u] = r[t]), u++);
  t !== u && (r.length = u);
}
const V0 = [
  ["text", Xa],
  ["linkify", Ja],
  ["newline", Qa],
  ["escape", ei],
  ["backticks", ti],
  ["strikethrough", nn.tokenize],
  ["emphasis", rn.tokenize],
  ["link", ii],
  ["image", oi],
  ["autolink", li],
  ["html_inline", pi],
  ["entity", _i]
], K0 = [
  ["balance_pairs", gi],
  ["strikethrough", nn.postProcess],
  ["emphasis", rn.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", xi]
];
function d0() {
  this.ruler = new ke();
  for (let e = 0; e < V0.length; e++)
    this.ruler.push(V0[e][0], V0[e][1]);
  this.ruler2 = new ke();
  for (let e = 0; e < K0.length; e++)
    this.ruler2.push(K0[e][0], K0[e][1]);
}
d0.prototype.skipToken = function(e) {
  const t = e.pos, u = this.ruler.getRules(""), i = u.length, r = e.md.options.maxNesting, n = e.cache;
  if (typeof n[t] < "u") {
    e.pos = n[t];
    return;
  }
  let c = !1;
  if (e.level < r) {
    for (let a = 0; a < i; a++)
      if (e.level++, c = u[a](e, !0), e.level--, c) {
        if (t >= e.pos)
          throw new Error("inline rule didn't increment state.pos");
        break;
      }
  } else
    e.pos = e.posMax;
  c || e.pos++, n[t] = e.pos;
};
d0.prototype.tokenize = function(e) {
  const t = this.ruler.getRules(""), u = t.length, i = e.posMax, r = e.md.options.maxNesting;
  for (; e.pos < i; ) {
    const n = e.pos;
    let c = !1;
    if (e.level < r) {
      for (let a = 0; a < u; a++)
        if (c = t[a](e, !1), c) {
          if (n >= e.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    }
    if (c) {
      if (e.pos >= i)
        break;
      continue;
    }
    e.pending += e.src[e.pos++];
  }
  e.pending && e.pushPending();
};
d0.prototype.parse = function(e, t, u, i) {
  const r = new this.State(e, t, u, i);
  this.tokenize(r);
  const n = this.ruler2.getRules(""), c = n.length;
  for (let a = 0; a < c; a++)
    n[a](r);
};
d0.prototype.State = f0;
function yi(e) {
  const t = {};
  e = e || {}, t.src_Any = ju.source, t.src_Cc = Zu.source, t.src_Z = Ku.source, t.src_P = Tt.source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
  const u = "[><｜]";
  return t.src_pseudo_letter = "(?:(?!" + u + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + u + "|" + t.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + u + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + u + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
}
function At(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(u) {
    u && Object.keys(u).forEach(function(i) {
      e[i] = u[i];
    });
  }), e;
}
function R0(e) {
  return Object.prototype.toString.call(e);
}
function vi(e) {
  return R0(e) === "[object String]";
}
function ki(e) {
  return R0(e) === "[object Object]";
}
function wi(e) {
  return R0(e) === "[object RegExp]";
}
function hu(e) {
  return R0(e) === "[object Function]";
}
function Ei(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const an = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function Ai(e) {
  return Object.keys(e || {}).reduce(function(t, u) {
    return t || an.hasOwnProperty(u);
  }, !1);
}
const Ci = {
  "http:": {
    validate: function(e, t, u) {
      const i = e.slice(t);
      return u.re.http || (u.re.http = new RegExp(
        "^\\/\\/" + u.re.src_auth + u.re.src_host_port_strict + u.re.src_path,
        "i"
      )), u.re.http.test(i) ? i.match(u.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(e, t, u) {
      const i = e.slice(t);
      return u.re.no_http || (u.re.no_http = new RegExp(
        "^" + u.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + u.re.src_domain + ")\\.)+" + u.re.src_domain_root + ")" + u.re.src_port + u.re.src_host_terminator + u.re.src_path,
        "i"
      )), u.re.no_http.test(i) ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : i.match(u.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(e, t, u) {
      const i = e.slice(t);
      return u.re.mailto || (u.re.mailto = new RegExp(
        "^" + u.re.src_email_name + "@" + u.re.src_host_strict,
        "i"
      )), u.re.mailto.test(i) ? i.match(u.re.mailto)[0].length : 0;
    }
  }
}, Si = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Di = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Ti(e) {
  e.__index__ = -1, e.__text_cache__ = "";
}
function Mi(e) {
  return function(t, u) {
    const i = t.slice(u);
    return e.test(i) ? i.match(e)[0].length : 0;
  };
}
function pu() {
  return function(e, t) {
    t.normalize(e);
  };
}
function S0(e) {
  const t = e.re = yi(e.__opts__), u = e.__tlds__.slice();
  e.onCompile(), e.__tlds_replaced__ || u.push(Si), u.push(t.src_xn), t.src_tlds = u.join("|");
  function i(a) {
    return a.replace("%TLDS%", t.src_tlds);
  }
  t.email_fuzzy = RegExp(i(t.tpl_email_fuzzy), "i"), t.link_fuzzy = RegExp(i(t.tpl_link_fuzzy), "i"), t.link_no_ip_fuzzy = RegExp(i(t.tpl_link_no_ip_fuzzy), "i"), t.host_fuzzy_test = RegExp(i(t.tpl_host_fuzzy_test), "i");
  const r = [];
  e.__compiled__ = {};
  function n(a, s) {
    throw new Error('(LinkifyIt) Invalid schema "' + a + '": ' + s);
  }
  Object.keys(e.__schemas__).forEach(function(a) {
    const s = e.__schemas__[a];
    if (s === null)
      return;
    const l = { validate: null, link: null };
    if (e.__compiled__[a] = l, ki(s)) {
      wi(s.validate) ? l.validate = Mi(s.validate) : hu(s.validate) ? l.validate = s.validate : n(a, s), hu(s.normalize) ? l.normalize = s.normalize : s.normalize ? n(a, s) : l.normalize = pu();
      return;
    }
    if (vi(s)) {
      r.push(a);
      return;
    }
    n(a, s);
  }), r.forEach(function(a) {
    e.__compiled__[e.__schemas__[a]] && (e.__compiled__[a].validate = e.__compiled__[e.__schemas__[a]].validate, e.__compiled__[a].normalize = e.__compiled__[e.__schemas__[a]].normalize);
  }), e.__compiled__[""] = { validate: null, normalize: pu() };
  const c = Object.keys(e.__compiled__).filter(function(a) {
    return a.length > 0 && e.__compiled__[a];
  }).map(Ei).join("|");
  e.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + c + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + c + ")", "ig"), e.re.schema_at_start = RegExp("^" + e.re.schema_search.source, "i"), e.re.pretest = RegExp(
    "(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@",
    "i"
  ), Ti(e);
}
function Ni(e, t) {
  const u = e.__index__, i = e.__last_index__, r = e.__text_cache__.slice(u, i);
  this.schema = e.__schema__.toLowerCase(), this.index = u + t, this.lastIndex = i + t, this.raw = r, this.text = r, this.url = r;
}
function Ct(e, t) {
  const u = new Ni(e, t);
  return e.__compiled__[u.schema].normalize(u, e), u;
}
function Ae(e, t) {
  if (!(this instanceof Ae))
    return new Ae(e, t);
  t || Ai(e) && (t = e, e = {}), this.__opts__ = At({}, an, t), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = At({}, Ci, e), this.__compiled__ = {}, this.__tlds__ = Di, this.__tlds_replaced__ = !1, this.re = {}, S0(this);
}
Ae.prototype.add = function(t, u) {
  return this.__schemas__[t] = u, S0(this), this;
};
Ae.prototype.set = function(t) {
  return this.__opts__ = At(this.__opts__, t), this;
};
Ae.prototype.test = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length)
    return !1;
  let u, i, r, n, c, a, s, l, f;
  if (this.re.schema_test.test(t)) {
    for (s = this.re.schema_search, s.lastIndex = 0; (u = s.exec(t)) !== null; )
      if (n = this.testSchemaAt(t, u[2], s.lastIndex), n) {
        this.__schema__ = u[2], this.__index__ = u.index + u[1].length, this.__last_index__ = u.index + u[0].length + n;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (l = t.search(this.re.host_fuzzy_test), l >= 0 && (this.__index__ < 0 || l < this.__index__) && (i = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (c = i.index + i[1].length, (this.__index__ < 0 || c < this.__index__) && (this.__schema__ = "", this.__index__ = c, this.__last_index__ = i.index + i[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (f = t.indexOf("@"), f >= 0 && (r = t.match(this.re.email_fuzzy)) !== null && (c = r.index + r[1].length, a = r.index + r[0].length, (this.__index__ < 0 || c < this.__index__ || c === this.__index__ && a > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = c, this.__last_index__ = a))), this.__index__ >= 0;
};
Ae.prototype.pretest = function(t) {
  return this.re.pretest.test(t);
};
Ae.prototype.testSchemaAt = function(t, u, i) {
  return this.__compiled__[u.toLowerCase()] ? this.__compiled__[u.toLowerCase()].validate(t, i, this) : 0;
};
Ae.prototype.match = function(t) {
  const u = [];
  let i = 0;
  this.__index__ >= 0 && this.__text_cache__ === t && (u.push(Ct(this, i)), i = this.__last_index__);
  let r = i ? t.slice(i) : t;
  for (; this.test(r); )
    u.push(Ct(this, i)), r = r.slice(this.__last_index__), i += this.__last_index__;
  return u.length ? u : null;
};
Ae.prototype.matchAtStart = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length) return null;
  const u = this.re.schema_at_start.exec(t);
  if (!u) return null;
  const i = this.testSchemaAt(t, u[2], u[0].length);
  return i ? (this.__schema__ = u[2], this.__index__ = u.index + u[1].length, this.__last_index__ = u.index + u[0].length + i, Ct(this, 0)) : null;
};
Ae.prototype.tlds = function(t, u) {
  return t = Array.isArray(t) ? t : [t], u ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function(i, r, n) {
    return i !== n[r - 1];
  }).reverse(), S0(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, S0(this), this);
};
Ae.prototype.normalize = function(t) {
  t.schema || (t.url = "http://" + t.url), t.schema === "mailto:" && !/^mailto:/i.test(t.url) && (t.url = "mailto:" + t.url);
};
Ae.prototype.onCompile = function() {
};
const e0 = 2147483647, Fe = 36, Ot = 1, c0 = 26, Ri = 38, Fi = 700, on = 72, sn = 128, cn = "-", Oi = /^xn--/, zi = /[^\0-\x7F]/, Ii = /[\x2E\u3002\uFF0E\uFF61]/g, Li = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, W0 = Fe - Ot, Oe = Math.floor, X0 = String.fromCharCode;
function $e(e) {
  throw new RangeError(Li[e]);
}
function Bi(e, t) {
  const u = [];
  let i = e.length;
  for (; i--; )
    u[i] = t(e[i]);
  return u;
}
function ln(e, t) {
  const u = e.split("@");
  let i = "";
  u.length > 1 && (i = u[0] + "@", e = u[1]), e = e.replace(Ii, ".");
  const r = e.split("."), n = Bi(r, t).join(".");
  return i + n;
}
function fn(e) {
  const t = [];
  let u = 0;
  const i = e.length;
  for (; u < i; ) {
    const r = e.charCodeAt(u++);
    if (r >= 55296 && r <= 56319 && u < i) {
      const n = e.charCodeAt(u++);
      (n & 64512) == 56320 ? t.push(((r & 1023) << 10) + (n & 1023) + 65536) : (t.push(r), u--);
    } else
      t.push(r);
  }
  return t;
}
const Pi = (e) => String.fromCodePoint(...e), qi = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Fe;
}, bu = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, dn = function(e, t, u) {
  let i = 0;
  for (e = u ? Oe(e / Fi) : e >> 1, e += Oe(e / t); e > W0 * c0 >> 1; i += Fe)
    e = Oe(e / W0);
  return Oe(i + (W0 + 1) * e / (e + Ri));
}, hn = function(e) {
  const t = [], u = e.length;
  let i = 0, r = sn, n = on, c = e.lastIndexOf(cn);
  c < 0 && (c = 0);
  for (let a = 0; a < c; ++a)
    e.charCodeAt(a) >= 128 && $e("not-basic"), t.push(e.charCodeAt(a));
  for (let a = c > 0 ? c + 1 : 0; a < u; ) {
    const s = i;
    for (let f = 1, m = Fe; ; m += Fe) {
      a >= u && $e("invalid-input");
      const _ = qi(e.charCodeAt(a++));
      _ >= Fe && $e("invalid-input"), _ > Oe((e0 - i) / f) && $e("overflow"), i += _ * f;
      const y = m <= n ? Ot : m >= n + c0 ? c0 : m - n;
      if (_ < y)
        break;
      const o = Fe - y;
      f > Oe(e0 / o) && $e("overflow"), f *= o;
    }
    const l = t.length + 1;
    n = dn(i - s, l, s == 0), Oe(i / l) > e0 - r && $e("overflow"), r += Oe(i / l), i %= l, t.splice(i++, 0, r);
  }
  return String.fromCodePoint(...t);
}, pn = function(e) {
  const t = [];
  e = fn(e);
  const u = e.length;
  let i = sn, r = 0, n = on;
  for (const s of e)
    s < 128 && t.push(X0(s));
  const c = t.length;
  let a = c;
  for (c && t.push(cn); a < u; ) {
    let s = e0;
    for (const f of e)
      f >= i && f < s && (s = f);
    const l = a + 1;
    s - i > Oe((e0 - r) / l) && $e("overflow"), r += (s - i) * l, i = s;
    for (const f of e)
      if (f < i && ++r > e0 && $e("overflow"), f === i) {
        let m = r;
        for (let _ = Fe; ; _ += Fe) {
          const y = _ <= n ? Ot : _ >= n + c0 ? c0 : _ - n;
          if (m < y)
            break;
          const o = m - y, p = Fe - y;
          t.push(
            X0(bu(y + o % p, 0))
          ), m = Oe(o / p);
        }
        t.push(X0(bu(m, 0))), n = dn(r, l, a === c), r = 0, ++a;
      }
    ++r, ++i;
  }
  return t.join("");
}, $i = function(e) {
  return ln(e, function(t) {
    return Oi.test(t) ? hn(t.slice(4).toLowerCase()) : t;
  });
}, Ui = function(e) {
  return ln(e, function(t) {
    return zi.test(t) ? "xn--" + pn(t) : t;
  });
}, bn = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: fn,
    encode: Pi
  },
  decode: hn,
  encode: pn,
  toASCII: Ui,
  toUnicode: $i
}, Hi = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, Gi = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, ji = {
  options: {
    // Enable HTML tags in source
    html: !0,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !0,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, Zi = {
  default: Hi,
  zero: Gi,
  commonmark: ji
}, Vi = /^(vbscript|javascript|file|data):/, Ki = /^data:image\/(gif|png|jpeg|webp);/;
function Wi(e) {
  const t = e.trim().toLowerCase();
  return Vi.test(t) ? Ki.test(t) : !0;
}
const mn = ["http:", "https:", "mailto:"];
function Xi(e) {
  const t = Dt(e, !0);
  if (t.hostname && (!t.protocol || mn.indexOf(t.protocol) >= 0))
    try {
      t.hostname = bn.toASCII(t.hostname);
    } catch {
    }
  return l0(St(t));
}
function Yi(e) {
  const t = Dt(e, !0);
  if (t.hostname && (!t.protocol || mn.indexOf(t.protocol) >= 0))
    try {
      t.hostname = bn.toUnicode(t.hostname);
    } catch {
    }
  return t0(St(t), t0.defaultChars + "%");
}
function Ce(e, t) {
  if (!(this instanceof Ce))
    return new Ce(e, t);
  t || Mt(e) || (t = e || {}, e = "default"), this.inline = new d0(), this.block = new N0(), this.core = new Rt(), this.renderer = new n0(), this.linkify = new Ae(), this.validateLink = Wi, this.normalizeLink = Xi, this.normalizeLinkText = Yi, this.utils = Qr, this.helpers = T0({}, na), this.options = {}, this.configure(e), t && this.set(t);
}
Ce.prototype.set = function(e) {
  return T0(this.options, e), this;
};
Ce.prototype.configure = function(e) {
  const t = this;
  if (Mt(e)) {
    const u = e;
    if (e = Zi[u], !e)
      throw new Error('Wrong `markdown-it` preset "' + u + '", check name');
  }
  if (!e)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(u) {
    e.components[u].rules && t[u].ruler.enableOnly(e.components[u].rules), e.components[u].rules2 && t[u].ruler2.enableOnly(e.components[u].rules2);
  }), this;
};
Ce.prototype.enable = function(e, t) {
  let u = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(r) {
    u = u.concat(this[r].ruler.enable(e, !0));
  }, this), u = u.concat(this.inline.ruler2.enable(e, !0));
  const i = e.filter(function(r) {
    return u.indexOf(r) < 0;
  });
  if (i.length && !t)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + i);
  return this;
};
Ce.prototype.disable = function(e, t) {
  let u = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(r) {
    u = u.concat(this[r].ruler.disable(e, !0));
  }, this), u = u.concat(this.inline.ruler2.disable(e, !0));
  const i = e.filter(function(r) {
    return u.indexOf(r) < 0;
  });
  if (i.length && !t)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + i);
  return this;
};
Ce.prototype.use = function(e) {
  const t = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e.apply(e, t), this;
};
Ce.prototype.parse = function(e, t) {
  if (typeof e != "string")
    throw new Error("Input data should be a String");
  const u = new this.core.State(e, this, t);
  return this.core.process(u), u.tokens;
};
Ce.prototype.render = function(e, t) {
  return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
};
Ce.prototype.parseInline = function(e, t) {
  const u = new this.core.State(e, this, t);
  return u.inlineMode = !0, this.core.process(u), u.tokens;
};
Ce.prototype.renderInline = function(e, t) {
  return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
};
const Ji = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function Qi(e, t) {
  const u = e.posMax, i = e.pos;
  if (e.src.charCodeAt(i) !== 126 || t || i + 2 >= u)
    return !1;
  e.pos = i + 1;
  let r = !1;
  for (; e.pos < u; ) {
    if (e.src.charCodeAt(e.pos) === 126) {
      r = !0;
      break;
    }
    e.md.inline.skipToken(e);
  }
  if (!r || i + 1 === e.pos)
    return e.pos = i, !1;
  const n = e.src.slice(i + 1, e.pos);
  if (n.match(/(^|[^\\])(\\\\)*\s/))
    return e.pos = i, !1;
  e.posMax = e.pos, e.pos = i + 1;
  const c = e.push("sub_open", "sub", 1);
  c.markup = "~";
  const a = e.push("text", "", 0);
  a.content = n.replace(Ji, "$1");
  const s = e.push("sub_close", "sub", -1);
  return s.markup = "~", e.pos = e.posMax + 1, e.posMax = u, !0;
}
function eo(e) {
  e.inline.ruler.after("emphasis", "sub", Qi);
}
const to = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function uo(e, t) {
  const u = e.posMax, i = e.pos;
  if (e.src.charCodeAt(i) !== 94 || t || i + 2 >= u)
    return !1;
  e.pos = i + 1;
  let r = !1;
  for (; e.pos < u; ) {
    if (e.src.charCodeAt(e.pos) === 94) {
      r = !0;
      break;
    }
    e.md.inline.skipToken(e);
  }
  if (!r || i + 1 === e.pos)
    return e.pos = i, !1;
  const n = e.src.slice(i + 1, e.pos);
  if (n.match(/(^|[^\\])(\\\\)*\s/))
    return e.pos = i, !1;
  e.posMax = e.pos, e.pos = i + 1;
  const c = e.push("sup_open", "sup", 1);
  c.markup = "^";
  const a = e.push("text", "", 0);
  a.content = n.replace(to, "$1");
  const s = e.push("sup_close", "sup", -1);
  return s.markup = "^", e.pos = e.posMax + 1, e.posMax = u, !0;
}
function no(e) {
  e.inline.ruler.after("emphasis", "sup", uo);
}
function F0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Y0, mu;
function je() {
  if (mu) return Y0;
  mu = 1;
  function e(t, u, i) {
    var r = "KaTeX parse error: " + t;
    if (u !== void 0 && i !== void 0) {
      r += " at position " + i + ": ";
      var n = u._input;
      n = n.slice(0, i) + "̲" + n.slice(i);
      var c = Math.max(0, i - 15), a = i + 15;
      r += n.slice(c, a);
    }
    var s = new Error(r);
    return s.name = "ParseError", s.__proto__ = e.prototype, s.position = i, s;
  }
  return e.prototype.__proto__ = Error.prototype, Y0 = e, Y0;
}
var J0, _u;
function _n() {
  if (_u) return J0;
  _u = 1;
  function e(u, i) {
    return u === void 0 ? i : u;
  }
  function t(u) {
    u = u || {}, this.displayMode = e(u.displayMode, !1), this.throwOnError = e(u.throwOnError, !0), this.errorColor = e(u.errorColor, "#cc0000");
  }
  return J0 = t, J0;
}
var Q0, gu;
function O0() {
  if (gu) return Q0;
  gu = 1;
  function e(k, h, b, w) {
    this.id = k, this.size = h, this.cramped = w, this.sizeMultiplier = b;
  }
  e.prototype.sup = function() {
    return m[_[this.id]];
  }, e.prototype.sub = function() {
    return m[y[this.id]];
  }, e.prototype.fracNum = function() {
    return m[o[this.id]];
  }, e.prototype.fracDen = function() {
    return m[p[this.id]];
  }, e.prototype.cramp = function() {
    return m[d[this.id]];
  }, e.prototype.cls = function() {
    return l[this.size] + (this.cramped ? " cramped" : " uncramped");
  }, e.prototype.reset = function() {
    return f[this.size];
  };
  var t = 0, u = 1, i = 2, r = 3, n = 4, c = 5, a = 6, s = 7, l = [
    "displaystyle textstyle",
    "textstyle",
    "scriptstyle",
    "scriptscriptstyle"
  ], f = [
    "reset-textstyle",
    "reset-textstyle",
    "reset-scriptstyle",
    "reset-scriptscriptstyle"
  ], m = [
    new e(t, 0, 1, !1),
    new e(u, 0, 1, !0),
    new e(i, 1, 1, !1),
    new e(r, 1, 1, !0),
    new e(n, 2, 0.7, !1),
    new e(c, 2, 0.7, !0),
    new e(a, 3, 0.5, !1),
    new e(s, 3, 0.5, !0)
  ], _ = [n, c, n, c, a, s, a, s], y = [c, c, c, c, s, s, s, s], o = [i, r, n, c, a, s, a, s], p = [r, r, c, c, s, s, s, s], d = [u, u, r, r, c, c, s, s];
  return Q0 = {
    DISPLAY: m[t],
    TEXT: m[i],
    SCRIPT: m[n],
    SCRIPTSCRIPT: m[a]
  }, Q0;
}
var et, xu;
function Be() {
  if (xu) return et;
  xu = 1;
  var e = Array.prototype.indexOf, t = function(y, o) {
    if (y == null)
      return -1;
    if (e && y.indexOf === e)
      return y.indexOf(o);
    for (var p = 0, d = y.length; p < d; p++)
      if (y[p] === o)
        return p;
    return -1;
  }, u = function(y, o) {
    return t(y, o) !== -1;
  }, i = function(y, o) {
    return y === void 0 ? o : y;
  }, r = /([A-Z])/g, n = function(y) {
    return y.replace(r, "-$1").toLowerCase();
  }, c = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    '"': "&quot;",
    "'": "&#x27;"
  }, a = /[&><"']/g;
  function s(y) {
    return c[y];
  }
  function l(y) {
    return ("" + y).replace(a, s);
  }
  var f;
  if (typeof document < "u") {
    var m = document.createElement("span");
    "textContent" in m ? f = function(y, o) {
      y.textContent = o;
    } : f = function(y, o) {
      y.innerText = o;
    };
  }
  function _(y) {
    f(y, "");
  }
  return et = {
    contains: u,
    deflt: i,
    escape: l,
    hyphenate: n,
    indexOf: t,
    setTextContent: f,
    clearNode: _
  }, et;
}
var tt, yu;
function gn() {
  if (yu) return tt;
  yu = 1;
  var e = Be(), t = function(n) {
    n = n.slice();
    for (var c = n.length - 1; c >= 0; c--)
      n[c] || n.splice(c, 1);
    return n.join(" ");
  };
  function u(n, c, a, s, l, f) {
    this.classes = n || [], this.children = c || [], this.height = a || 0, this.depth = s || 0, this.maxFontSize = l || 0, this.style = f || {}, this.attributes = {};
  }
  u.prototype.setAttribute = function(n, c) {
    this.attributes[n] = c;
  }, u.prototype.toNode = function() {
    var n = document.createElement("span");
    n.className = t(this.classes);
    for (var c in this.style)
      Object.prototype.hasOwnProperty.call(this.style, c) && (n.style[c] = this.style[c]);
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) && n.setAttribute(a, this.attributes[a]);
    for (var s = 0; s < this.children.length; s++)
      n.appendChild(this.children[s].toNode());
    return n;
  }, u.prototype.toMarkup = function() {
    var n = "<span";
    this.classes.length && (n += ' class="', n += e.escape(t(this.classes)), n += '"');
    var c = "";
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (c += e.hyphenate(a) + ":" + this.style[a] + ";");
    c && (n += ' style="' + e.escape(c) + '"');
    for (var s in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, s) && (n += " " + s + '="', n += e.escape(this.attributes[s]), n += '"');
    n += ">";
    for (var l = 0; l < this.children.length; l++)
      n += this.children[l].toMarkup();
    return n += "</span>", n;
  };
  function i(n, c, a, s) {
    this.children = n || [], this.height = c || 0, this.depth = a || 0, this.maxFontSize = s || 0;
  }
  i.prototype.toNode = function() {
    for (var n = document.createDocumentFragment(), c = 0; c < this.children.length; c++)
      n.appendChild(this.children[c].toNode());
    return n;
  }, i.prototype.toMarkup = function() {
    for (var n = "", c = 0; c < this.children.length; c++)
      n += this.children[c].toMarkup();
    return n;
  };
  function r(n, c, a, s, l, f, m) {
    this.value = n || "", this.height = c || 0, this.depth = a || 0, this.italic = s || 0, this.skew = l || 0, this.classes = f || [], this.style = m || {}, this.maxFontSize = 0;
  }
  return r.prototype.toNode = function() {
    var n = document.createTextNode(this.value), c = null;
    this.italic > 0 && (c = document.createElement("span"), c.style.marginRight = this.italic + "em"), this.classes.length > 0 && (c = c || document.createElement("span"), c.className = t(this.classes));
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (c = c || document.createElement("span"), c.style[a] = this.style[a]);
    return c ? (c.appendChild(n), c) : n;
  }, r.prototype.toMarkup = function() {
    var n = !1, c = "<span";
    this.classes.length && (n = !0, c += ' class="', c += e.escape(t(this.classes)), c += '"');
    var a = "";
    this.italic > 0 && (a += "margin-right:" + this.italic + "em;");
    for (var s in this.style)
      this.style.hasOwnProperty(s) && (a += e.hyphenate(s) + ":" + this.style[s] + ";");
    a && (n = !0, c += ' style="' + e.escape(a) + '"');
    var l = e.escape(this.value);
    return n ? (c += ">", c += l, c += "</span>", c) : l;
  }, tt = {
    span: u,
    documentFragment: i,
    symbolNode: r
  }, tt;
}
var ut, vu;
function ro() {
  return vu || (vu = 1, ut = {
    "AMS-Regular": {
      65: [0, 0.68889, 0, 0],
      66: [0, 0.68889, 0, 0],
      67: [0, 0.68889, 0, 0],
      68: [0, 0.68889, 0, 0],
      69: [0, 0.68889, 0, 0],
      70: [0, 0.68889, 0, 0],
      71: [0, 0.68889, 0, 0],
      72: [0, 0.68889, 0, 0],
      73: [0, 0.68889, 0, 0],
      74: [0.16667, 0.68889, 0, 0],
      75: [0, 0.68889, 0, 0],
      76: [0, 0.68889, 0, 0],
      77: [0, 0.68889, 0, 0],
      78: [0, 0.68889, 0, 0],
      79: [0.16667, 0.68889, 0, 0],
      80: [0, 0.68889, 0, 0],
      81: [0.16667, 0.68889, 0, 0],
      82: [0, 0.68889, 0, 0],
      83: [0, 0.68889, 0, 0],
      84: [0, 0.68889, 0, 0],
      85: [0, 0.68889, 0, 0],
      86: [0, 0.68889, 0, 0],
      87: [0, 0.68889, 0, 0],
      88: [0, 0.68889, 0, 0],
      89: [0, 0.68889, 0, 0],
      90: [0, 0.68889, 0, 0],
      107: [0, 0.68889, 0, 0],
      165: [0, 0.675, 0.025, 0],
      174: [0.15559, 0.69224, 0, 0],
      240: [0, 0.68889, 0, 0],
      295: [0, 0.68889, 0, 0],
      710: [0, 0.825, 0, 0],
      732: [0, 0.9, 0, 0],
      770: [0, 0.825, 0, 0],
      771: [0, 0.9, 0, 0],
      989: [0.08167, 0.58167, 0, 0],
      1008: [0, 0.43056, 0.04028, 0],
      8245: [0, 0.54986, 0, 0],
      8463: [0, 0.68889, 0, 0],
      8487: [0, 0.68889, 0, 0],
      8498: [0, 0.68889, 0, 0],
      8502: [0, 0.68889, 0, 0],
      8503: [0, 0.68889, 0, 0],
      8504: [0, 0.68889, 0, 0],
      8513: [0, 0.68889, 0, 0],
      8592: [-0.03598, 0.46402, 0, 0],
      8594: [-0.03598, 0.46402, 0, 0],
      8602: [-0.13313, 0.36687, 0, 0],
      8603: [-0.13313, 0.36687, 0, 0],
      8606: [0.01354, 0.52239, 0, 0],
      8608: [0.01354, 0.52239, 0, 0],
      8610: [0.01354, 0.52239, 0, 0],
      8611: [0.01354, 0.52239, 0, 0],
      8619: [0, 0.54986, 0, 0],
      8620: [0, 0.54986, 0, 0],
      8621: [-0.13313, 0.37788, 0, 0],
      8622: [-0.13313, 0.36687, 0, 0],
      8624: [0, 0.69224, 0, 0],
      8625: [0, 0.69224, 0, 0],
      8630: [0, 0.43056, 0, 0],
      8631: [0, 0.43056, 0, 0],
      8634: [0.08198, 0.58198, 0, 0],
      8635: [0.08198, 0.58198, 0, 0],
      8638: [0.19444, 0.69224, 0, 0],
      8639: [0.19444, 0.69224, 0, 0],
      8642: [0.19444, 0.69224, 0, 0],
      8643: [0.19444, 0.69224, 0, 0],
      8644: [0.1808, 0.675, 0, 0],
      8646: [0.1808, 0.675, 0, 0],
      8647: [0.1808, 0.675, 0, 0],
      8648: [0.19444, 0.69224, 0, 0],
      8649: [0.1808, 0.675, 0, 0],
      8650: [0.19444, 0.69224, 0, 0],
      8651: [0.01354, 0.52239, 0, 0],
      8652: [0.01354, 0.52239, 0, 0],
      8653: [-0.13313, 0.36687, 0, 0],
      8654: [-0.13313, 0.36687, 0, 0],
      8655: [-0.13313, 0.36687, 0, 0],
      8666: [0.13667, 0.63667, 0, 0],
      8667: [0.13667, 0.63667, 0, 0],
      8669: [-0.13313, 0.37788, 0, 0],
      8672: [-0.064, 0.437, 0, 0],
      8674: [-0.064, 0.437, 0, 0],
      8705: [0, 0.825, 0, 0],
      8708: [0, 0.68889, 0, 0],
      8709: [0.08167, 0.58167, 0, 0],
      8717: [0, 0.43056, 0, 0],
      8722: [-0.03598, 0.46402, 0, 0],
      8724: [0.08198, 0.69224, 0, 0],
      8726: [0.08167, 0.58167, 0, 0],
      8733: [0, 0.69224, 0, 0],
      8736: [0, 0.69224, 0, 0],
      8737: [0, 0.69224, 0, 0],
      8738: [0.03517, 0.52239, 0, 0],
      8739: [0.08167, 0.58167, 0, 0],
      8740: [0.25142, 0.74111, 0, 0],
      8741: [0.08167, 0.58167, 0, 0],
      8742: [0.25142, 0.74111, 0, 0],
      8756: [0, 0.69224, 0, 0],
      8757: [0, 0.69224, 0, 0],
      8764: [-0.13313, 0.36687, 0, 0],
      8765: [-0.13313, 0.37788, 0, 0],
      8769: [-0.13313, 0.36687, 0, 0],
      8770: [-0.03625, 0.46375, 0, 0],
      8774: [0.30274, 0.79383, 0, 0],
      8776: [-0.01688, 0.48312, 0, 0],
      8778: [0.08167, 0.58167, 0, 0],
      8782: [0.06062, 0.54986, 0, 0],
      8783: [0.06062, 0.54986, 0, 0],
      8785: [0.08198, 0.58198, 0, 0],
      8786: [0.08198, 0.58198, 0, 0],
      8787: [0.08198, 0.58198, 0, 0],
      8790: [0, 0.69224, 0, 0],
      8791: [0.22958, 0.72958, 0, 0],
      8796: [0.08198, 0.91667, 0, 0],
      8806: [0.25583, 0.75583, 0, 0],
      8807: [0.25583, 0.75583, 0, 0],
      8808: [0.25142, 0.75726, 0, 0],
      8809: [0.25142, 0.75726, 0, 0],
      8812: [0.25583, 0.75583, 0, 0],
      8814: [0.20576, 0.70576, 0, 0],
      8815: [0.20576, 0.70576, 0, 0],
      8816: [0.30274, 0.79383, 0, 0],
      8817: [0.30274, 0.79383, 0, 0],
      8818: [0.22958, 0.72958, 0, 0],
      8819: [0.22958, 0.72958, 0, 0],
      8822: [0.1808, 0.675, 0, 0],
      8823: [0.1808, 0.675, 0, 0],
      8828: [0.13667, 0.63667, 0, 0],
      8829: [0.13667, 0.63667, 0, 0],
      8830: [0.22958, 0.72958, 0, 0],
      8831: [0.22958, 0.72958, 0, 0],
      8832: [0.20576, 0.70576, 0, 0],
      8833: [0.20576, 0.70576, 0, 0],
      8840: [0.30274, 0.79383, 0, 0],
      8841: [0.30274, 0.79383, 0, 0],
      8842: [0.13597, 0.63597, 0, 0],
      8843: [0.13597, 0.63597, 0, 0],
      8847: [0.03517, 0.54986, 0, 0],
      8848: [0.03517, 0.54986, 0, 0],
      8858: [0.08198, 0.58198, 0, 0],
      8859: [0.08198, 0.58198, 0, 0],
      8861: [0.08198, 0.58198, 0, 0],
      8862: [0, 0.675, 0, 0],
      8863: [0, 0.675, 0, 0],
      8864: [0, 0.675, 0, 0],
      8865: [0, 0.675, 0, 0],
      8872: [0, 0.69224, 0, 0],
      8873: [0, 0.69224, 0, 0],
      8874: [0, 0.69224, 0, 0],
      8876: [0, 0.68889, 0, 0],
      8877: [0, 0.68889, 0, 0],
      8878: [0, 0.68889, 0, 0],
      8879: [0, 0.68889, 0, 0],
      8882: [0.03517, 0.54986, 0, 0],
      8883: [0.03517, 0.54986, 0, 0],
      8884: [0.13667, 0.63667, 0, 0],
      8885: [0.13667, 0.63667, 0, 0],
      8888: [0, 0.54986, 0, 0],
      8890: [0.19444, 0.43056, 0, 0],
      8891: [0.19444, 0.69224, 0, 0],
      8892: [0.19444, 0.69224, 0, 0],
      8901: [0, 0.54986, 0, 0],
      8903: [0.08167, 0.58167, 0, 0],
      8905: [0.08167, 0.58167, 0, 0],
      8906: [0.08167, 0.58167, 0, 0],
      8907: [0, 0.69224, 0, 0],
      8908: [0, 0.69224, 0, 0],
      8909: [-0.03598, 0.46402, 0, 0],
      8910: [0, 0.54986, 0, 0],
      8911: [0, 0.54986, 0, 0],
      8912: [0.03517, 0.54986, 0, 0],
      8913: [0.03517, 0.54986, 0, 0],
      8914: [0, 0.54986, 0, 0],
      8915: [0, 0.54986, 0, 0],
      8916: [0, 0.69224, 0, 0],
      8918: [0.0391, 0.5391, 0, 0],
      8919: [0.0391, 0.5391, 0, 0],
      8920: [0.03517, 0.54986, 0, 0],
      8921: [0.03517, 0.54986, 0, 0],
      8922: [0.38569, 0.88569, 0, 0],
      8923: [0.38569, 0.88569, 0, 0],
      8926: [0.13667, 0.63667, 0, 0],
      8927: [0.13667, 0.63667, 0, 0],
      8928: [0.30274, 0.79383, 0, 0],
      8929: [0.30274, 0.79383, 0, 0],
      8934: [0.23222, 0.74111, 0, 0],
      8935: [0.23222, 0.74111, 0, 0],
      8936: [0.23222, 0.74111, 0, 0],
      8937: [0.23222, 0.74111, 0, 0],
      8938: [0.20576, 0.70576, 0, 0],
      8939: [0.20576, 0.70576, 0, 0],
      8940: [0.30274, 0.79383, 0, 0],
      8941: [0.30274, 0.79383, 0, 0],
      8994: [0.19444, 0.69224, 0, 0],
      8995: [0.19444, 0.69224, 0, 0],
      9416: [0.15559, 0.69224, 0, 0],
      9484: [0, 0.69224, 0, 0],
      9488: [0, 0.69224, 0, 0],
      9492: [0, 0.37788, 0, 0],
      9496: [0, 0.37788, 0, 0],
      9585: [0.19444, 0.68889, 0, 0],
      9586: [0.19444, 0.74111, 0, 0],
      9632: [0, 0.675, 0, 0],
      9633: [0, 0.675, 0, 0],
      9650: [0, 0.54986, 0, 0],
      9651: [0, 0.54986, 0, 0],
      9654: [0.03517, 0.54986, 0, 0],
      9660: [0, 0.54986, 0, 0],
      9661: [0, 0.54986, 0, 0],
      9664: [0.03517, 0.54986, 0, 0],
      9674: [0.11111, 0.69224, 0, 0],
      9733: [0.19444, 0.69224, 0, 0],
      10003: [0, 0.69224, 0, 0],
      10016: [0, 0.69224, 0, 0],
      10731: [0.11111, 0.69224, 0, 0],
      10846: [0.19444, 0.75583, 0, 0],
      10877: [0.13667, 0.63667, 0, 0],
      10878: [0.13667, 0.63667, 0, 0],
      10885: [0.25583, 0.75583, 0, 0],
      10886: [0.25583, 0.75583, 0, 0],
      10887: [0.13597, 0.63597, 0, 0],
      10888: [0.13597, 0.63597, 0, 0],
      10889: [0.26167, 0.75726, 0, 0],
      10890: [0.26167, 0.75726, 0, 0],
      10891: [0.48256, 0.98256, 0, 0],
      10892: [0.48256, 0.98256, 0, 0],
      10901: [0.13667, 0.63667, 0, 0],
      10902: [0.13667, 0.63667, 0, 0],
      10933: [0.25142, 0.75726, 0, 0],
      10934: [0.25142, 0.75726, 0, 0],
      10935: [0.26167, 0.75726, 0, 0],
      10936: [0.26167, 0.75726, 0, 0],
      10937: [0.26167, 0.75726, 0, 0],
      10938: [0.26167, 0.75726, 0, 0],
      10949: [0.25583, 0.75583, 0, 0],
      10950: [0.25583, 0.75583, 0, 0],
      10955: [0.28481, 0.79383, 0, 0],
      10956: [0.28481, 0.79383, 0, 0],
      57350: [0.08167, 0.58167, 0, 0],
      57351: [0.08167, 0.58167, 0, 0],
      57352: [0.08167, 0.58167, 0, 0],
      57353: [0, 0.43056, 0.04028, 0],
      57356: [0.25142, 0.75726, 0, 0],
      57357: [0.25142, 0.75726, 0, 0],
      57358: [0.41951, 0.91951, 0, 0],
      57359: [0.30274, 0.79383, 0, 0],
      57360: [0.30274, 0.79383, 0, 0],
      57361: [0.41951, 0.91951, 0, 0],
      57366: [0.25142, 0.75726, 0, 0],
      57367: [0.25142, 0.75726, 0, 0],
      57368: [0.25142, 0.75726, 0, 0],
      57369: [0.25142, 0.75726, 0, 0],
      57370: [0.13597, 0.63597, 0, 0],
      57371: [0.13597, 0.63597, 0, 0]
    },
    "Caligraphic-Regular": {
      48: [0, 0.43056, 0, 0],
      49: [0, 0.43056, 0, 0],
      50: [0, 0.43056, 0, 0],
      51: [0.19444, 0.43056, 0, 0],
      52: [0.19444, 0.43056, 0, 0],
      53: [0.19444, 0.43056, 0, 0],
      54: [0, 0.64444, 0, 0],
      55: [0.19444, 0.43056, 0, 0],
      56: [0, 0.64444, 0, 0],
      57: [0.19444, 0.43056, 0, 0],
      65: [0, 0.68333, 0, 0.19445],
      66: [0, 0.68333, 0.03041, 0.13889],
      67: [0, 0.68333, 0.05834, 0.13889],
      68: [0, 0.68333, 0.02778, 0.08334],
      69: [0, 0.68333, 0.08944, 0.11111],
      70: [0, 0.68333, 0.09931, 0.11111],
      71: [0.09722, 0.68333, 0.0593, 0.11111],
      72: [0, 0.68333, 965e-5, 0.11111],
      73: [0, 0.68333, 0.07382, 0],
      74: [0.09722, 0.68333, 0.18472, 0.16667],
      75: [0, 0.68333, 0.01445, 0.05556],
      76: [0, 0.68333, 0, 0.13889],
      77: [0, 0.68333, 0, 0.13889],
      78: [0, 0.68333, 0.14736, 0.08334],
      79: [0, 0.68333, 0.02778, 0.11111],
      80: [0, 0.68333, 0.08222, 0.08334],
      81: [0.09722, 0.68333, 0, 0.11111],
      82: [0, 0.68333, 0, 0.08334],
      83: [0, 0.68333, 0.075, 0.13889],
      84: [0, 0.68333, 0.25417, 0],
      85: [0, 0.68333, 0.09931, 0.08334],
      86: [0, 0.68333, 0.08222, 0],
      87: [0, 0.68333, 0.08222, 0.08334],
      88: [0, 0.68333, 0.14643, 0.13889],
      89: [0.09722, 0.68333, 0.08222, 0.08334],
      90: [0, 0.68333, 0.07944, 0.13889]
    },
    "Fraktur-Regular": {
      33: [0, 0.69141, 0, 0],
      34: [0, 0.69141, 0, 0],
      38: [0, 0.69141, 0, 0],
      39: [0, 0.69141, 0, 0],
      40: [0.24982, 0.74947, 0, 0],
      41: [0.24982, 0.74947, 0, 0],
      42: [0, 0.62119, 0, 0],
      43: [0.08319, 0.58283, 0, 0],
      44: [0, 0.10803, 0, 0],
      45: [0.08319, 0.58283, 0, 0],
      46: [0, 0.10803, 0, 0],
      47: [0.24982, 0.74947, 0, 0],
      48: [0, 0.47534, 0, 0],
      49: [0, 0.47534, 0, 0],
      50: [0, 0.47534, 0, 0],
      51: [0.18906, 0.47534, 0, 0],
      52: [0.18906, 0.47534, 0, 0],
      53: [0.18906, 0.47534, 0, 0],
      54: [0, 0.69141, 0, 0],
      55: [0.18906, 0.47534, 0, 0],
      56: [0, 0.69141, 0, 0],
      57: [0.18906, 0.47534, 0, 0],
      58: [0, 0.47534, 0, 0],
      59: [0.12604, 0.47534, 0, 0],
      61: [-0.13099, 0.36866, 0, 0],
      63: [0, 0.69141, 0, 0],
      65: [0, 0.69141, 0, 0],
      66: [0, 0.69141, 0, 0],
      67: [0, 0.69141, 0, 0],
      68: [0, 0.69141, 0, 0],
      69: [0, 0.69141, 0, 0],
      70: [0.12604, 0.69141, 0, 0],
      71: [0, 0.69141, 0, 0],
      72: [0.06302, 0.69141, 0, 0],
      73: [0, 0.69141, 0, 0],
      74: [0.12604, 0.69141, 0, 0],
      75: [0, 0.69141, 0, 0],
      76: [0, 0.69141, 0, 0],
      77: [0, 0.69141, 0, 0],
      78: [0, 0.69141, 0, 0],
      79: [0, 0.69141, 0, 0],
      80: [0.18906, 0.69141, 0, 0],
      81: [0.03781, 0.69141, 0, 0],
      82: [0, 0.69141, 0, 0],
      83: [0, 0.69141, 0, 0],
      84: [0, 0.69141, 0, 0],
      85: [0, 0.69141, 0, 0],
      86: [0, 0.69141, 0, 0],
      87: [0, 0.69141, 0, 0],
      88: [0, 0.69141, 0, 0],
      89: [0.18906, 0.69141, 0, 0],
      90: [0.12604, 0.69141, 0, 0],
      91: [0.24982, 0.74947, 0, 0],
      93: [0.24982, 0.74947, 0, 0],
      94: [0, 0.69141, 0, 0],
      97: [0, 0.47534, 0, 0],
      98: [0, 0.69141, 0, 0],
      99: [0, 0.47534, 0, 0],
      100: [0, 0.62119, 0, 0],
      101: [0, 0.47534, 0, 0],
      102: [0.18906, 0.69141, 0, 0],
      103: [0.18906, 0.47534, 0, 0],
      104: [0.18906, 0.69141, 0, 0],
      105: [0, 0.69141, 0, 0],
      106: [0, 0.69141, 0, 0],
      107: [0, 0.69141, 0, 0],
      108: [0, 0.69141, 0, 0],
      109: [0, 0.47534, 0, 0],
      110: [0, 0.47534, 0, 0],
      111: [0, 0.47534, 0, 0],
      112: [0.18906, 0.52396, 0, 0],
      113: [0.18906, 0.47534, 0, 0],
      114: [0, 0.47534, 0, 0],
      115: [0, 0.47534, 0, 0],
      116: [0, 0.62119, 0, 0],
      117: [0, 0.47534, 0, 0],
      118: [0, 0.52396, 0, 0],
      119: [0, 0.52396, 0, 0],
      120: [0.18906, 0.47534, 0, 0],
      121: [0.18906, 0.47534, 0, 0],
      122: [0.18906, 0.47534, 0, 0],
      8216: [0, 0.69141, 0, 0],
      8217: [0, 0.69141, 0, 0],
      58112: [0, 0.62119, 0, 0],
      58113: [0, 0.62119, 0, 0],
      58114: [0.18906, 0.69141, 0, 0],
      58115: [0.18906, 0.69141, 0, 0],
      58116: [0.18906, 0.47534, 0, 0],
      58117: [0, 0.69141, 0, 0],
      58118: [0, 0.62119, 0, 0],
      58119: [0, 0.47534, 0, 0]
    },
    "Main-Bold": {
      33: [0, 0.69444, 0, 0],
      34: [0, 0.69444, 0, 0],
      35: [0.19444, 0.69444, 0, 0],
      36: [0.05556, 0.75, 0, 0],
      37: [0.05556, 0.75, 0, 0],
      38: [0, 0.69444, 0, 0],
      39: [0, 0.69444, 0, 0],
      40: [0.25, 0.75, 0, 0],
      41: [0.25, 0.75, 0, 0],
      42: [0, 0.75, 0, 0],
      43: [0.13333, 0.63333, 0, 0],
      44: [0.19444, 0.15556, 0, 0],
      45: [0, 0.44444, 0, 0],
      46: [0, 0.15556, 0, 0],
      47: [0.25, 0.75, 0, 0],
      48: [0, 0.64444, 0, 0],
      49: [0, 0.64444, 0, 0],
      50: [0, 0.64444, 0, 0],
      51: [0, 0.64444, 0, 0],
      52: [0, 0.64444, 0, 0],
      53: [0, 0.64444, 0, 0],
      54: [0, 0.64444, 0, 0],
      55: [0, 0.64444, 0, 0],
      56: [0, 0.64444, 0, 0],
      57: [0, 0.64444, 0, 0],
      58: [0, 0.44444, 0, 0],
      59: [0.19444, 0.44444, 0, 0],
      60: [0.08556, 0.58556, 0, 0],
      61: [-0.10889, 0.39111, 0, 0],
      62: [0.08556, 0.58556, 0, 0],
      63: [0, 0.69444, 0, 0],
      64: [0, 0.69444, 0, 0],
      65: [0, 0.68611, 0, 0],
      66: [0, 0.68611, 0, 0],
      67: [0, 0.68611, 0, 0],
      68: [0, 0.68611, 0, 0],
      69: [0, 0.68611, 0, 0],
      70: [0, 0.68611, 0, 0],
      71: [0, 0.68611, 0, 0],
      72: [0, 0.68611, 0, 0],
      73: [0, 0.68611, 0, 0],
      74: [0, 0.68611, 0, 0],
      75: [0, 0.68611, 0, 0],
      76: [0, 0.68611, 0, 0],
      77: [0, 0.68611, 0, 0],
      78: [0, 0.68611, 0, 0],
      79: [0, 0.68611, 0, 0],
      80: [0, 0.68611, 0, 0],
      81: [0.19444, 0.68611, 0, 0],
      82: [0, 0.68611, 0, 0],
      83: [0, 0.68611, 0, 0],
      84: [0, 0.68611, 0, 0],
      85: [0, 0.68611, 0, 0],
      86: [0, 0.68611, 0.01597, 0],
      87: [0, 0.68611, 0.01597, 0],
      88: [0, 0.68611, 0, 0],
      89: [0, 0.68611, 0.02875, 0],
      90: [0, 0.68611, 0, 0],
      91: [0.25, 0.75, 0, 0],
      92: [0.25, 0.75, 0, 0],
      93: [0.25, 0.75, 0, 0],
      94: [0, 0.69444, 0, 0],
      95: [0.31, 0.13444, 0.03194, 0],
      96: [0, 0.69444, 0, 0],
      97: [0, 0.44444, 0, 0],
      98: [0, 0.69444, 0, 0],
      99: [0, 0.44444, 0, 0],
      100: [0, 0.69444, 0, 0],
      101: [0, 0.44444, 0, 0],
      102: [0, 0.69444, 0.10903, 0],
      103: [0.19444, 0.44444, 0.01597, 0],
      104: [0, 0.69444, 0, 0],
      105: [0, 0.69444, 0, 0],
      106: [0.19444, 0.69444, 0, 0],
      107: [0, 0.69444, 0, 0],
      108: [0, 0.69444, 0, 0],
      109: [0, 0.44444, 0, 0],
      110: [0, 0.44444, 0, 0],
      111: [0, 0.44444, 0, 0],
      112: [0.19444, 0.44444, 0, 0],
      113: [0.19444, 0.44444, 0, 0],
      114: [0, 0.44444, 0, 0],
      115: [0, 0.44444, 0, 0],
      116: [0, 0.63492, 0, 0],
      117: [0, 0.44444, 0, 0],
      118: [0, 0.44444, 0.01597, 0],
      119: [0, 0.44444, 0.01597, 0],
      120: [0, 0.44444, 0, 0],
      121: [0.19444, 0.44444, 0.01597, 0],
      122: [0, 0.44444, 0, 0],
      123: [0.25, 0.75, 0, 0],
      124: [0.25, 0.75, 0, 0],
      125: [0.25, 0.75, 0, 0],
      126: [0.35, 0.34444, 0, 0],
      168: [0, 0.69444, 0, 0],
      172: [0, 0.44444, 0, 0],
      175: [0, 0.59611, 0, 0],
      176: [0, 0.69444, 0, 0],
      177: [0.13333, 0.63333, 0, 0],
      180: [0, 0.69444, 0, 0],
      215: [0.13333, 0.63333, 0, 0],
      247: [0.13333, 0.63333, 0, 0],
      305: [0, 0.44444, 0, 0],
      567: [0.19444, 0.44444, 0, 0],
      710: [0, 0.69444, 0, 0],
      711: [0, 0.63194, 0, 0],
      713: [0, 0.59611, 0, 0],
      714: [0, 0.69444, 0, 0],
      715: [0, 0.69444, 0, 0],
      728: [0, 0.69444, 0, 0],
      729: [0, 0.69444, 0, 0],
      730: [0, 0.69444, 0, 0],
      732: [0, 0.69444, 0, 0],
      768: [0, 0.69444, 0, 0],
      769: [0, 0.69444, 0, 0],
      770: [0, 0.69444, 0, 0],
      771: [0, 0.69444, 0, 0],
      772: [0, 0.59611, 0, 0],
      774: [0, 0.69444, 0, 0],
      775: [0, 0.69444, 0, 0],
      776: [0, 0.69444, 0, 0],
      778: [0, 0.69444, 0, 0],
      779: [0, 0.69444, 0, 0],
      780: [0, 0.63194, 0, 0],
      824: [0.19444, 0.69444, 0, 0],
      915: [0, 0.68611, 0, 0],
      916: [0, 0.68611, 0, 0],
      920: [0, 0.68611, 0, 0],
      923: [0, 0.68611, 0, 0],
      926: [0, 0.68611, 0, 0],
      928: [0, 0.68611, 0, 0],
      931: [0, 0.68611, 0, 0],
      933: [0, 0.68611, 0, 0],
      934: [0, 0.68611, 0, 0],
      936: [0, 0.68611, 0, 0],
      937: [0, 0.68611, 0, 0],
      8211: [0, 0.44444, 0.03194, 0],
      8212: [0, 0.44444, 0.03194, 0],
      8216: [0, 0.69444, 0, 0],
      8217: [0, 0.69444, 0, 0],
      8220: [0, 0.69444, 0, 0],
      8221: [0, 0.69444, 0, 0],
      8224: [0.19444, 0.69444, 0, 0],
      8225: [0.19444, 0.69444, 0, 0],
      8242: [0, 0.55556, 0, 0],
      8407: [0, 0.72444, 0.15486, 0],
      8463: [0, 0.69444, 0, 0],
      8465: [0, 0.69444, 0, 0],
      8467: [0, 0.69444, 0, 0],
      8472: [0.19444, 0.44444, 0, 0],
      8476: [0, 0.69444, 0, 0],
      8501: [0, 0.69444, 0, 0],
      8592: [-0.10889, 0.39111, 0, 0],
      8593: [0.19444, 0.69444, 0, 0],
      8594: [-0.10889, 0.39111, 0, 0],
      8595: [0.19444, 0.69444, 0, 0],
      8596: [-0.10889, 0.39111, 0, 0],
      8597: [0.25, 0.75, 0, 0],
      8598: [0.19444, 0.69444, 0, 0],
      8599: [0.19444, 0.69444, 0, 0],
      8600: [0.19444, 0.69444, 0, 0],
      8601: [0.19444, 0.69444, 0, 0],
      8636: [-0.10889, 0.39111, 0, 0],
      8637: [-0.10889, 0.39111, 0, 0],
      8640: [-0.10889, 0.39111, 0, 0],
      8641: [-0.10889, 0.39111, 0, 0],
      8656: [-0.10889, 0.39111, 0, 0],
      8657: [0.19444, 0.69444, 0, 0],
      8658: [-0.10889, 0.39111, 0, 0],
      8659: [0.19444, 0.69444, 0, 0],
      8660: [-0.10889, 0.39111, 0, 0],
      8661: [0.25, 0.75, 0, 0],
      8704: [0, 0.69444, 0, 0],
      8706: [0, 0.69444, 0.06389, 0],
      8707: [0, 0.69444, 0, 0],
      8709: [0.05556, 0.75, 0, 0],
      8711: [0, 0.68611, 0, 0],
      8712: [0.08556, 0.58556, 0, 0],
      8715: [0.08556, 0.58556, 0, 0],
      8722: [0.13333, 0.63333, 0, 0],
      8723: [0.13333, 0.63333, 0, 0],
      8725: [0.25, 0.75, 0, 0],
      8726: [0.25, 0.75, 0, 0],
      8727: [-0.02778, 0.47222, 0, 0],
      8728: [-0.02639, 0.47361, 0, 0],
      8729: [-0.02639, 0.47361, 0, 0],
      8730: [0.18, 0.82, 0, 0],
      8733: [0, 0.44444, 0, 0],
      8734: [0, 0.44444, 0, 0],
      8736: [0, 0.69224, 0, 0],
      8739: [0.25, 0.75, 0, 0],
      8741: [0.25, 0.75, 0, 0],
      8743: [0, 0.55556, 0, 0],
      8744: [0, 0.55556, 0, 0],
      8745: [0, 0.55556, 0, 0],
      8746: [0, 0.55556, 0, 0],
      8747: [0.19444, 0.69444, 0.12778, 0],
      8764: [-0.10889, 0.39111, 0, 0],
      8768: [0.19444, 0.69444, 0, 0],
      8771: [222e-5, 0.50222, 0, 0],
      8776: [0.02444, 0.52444, 0, 0],
      8781: [222e-5, 0.50222, 0, 0],
      8801: [222e-5, 0.50222, 0, 0],
      8804: [0.19667, 0.69667, 0, 0],
      8805: [0.19667, 0.69667, 0, 0],
      8810: [0.08556, 0.58556, 0, 0],
      8811: [0.08556, 0.58556, 0, 0],
      8826: [0.08556, 0.58556, 0, 0],
      8827: [0.08556, 0.58556, 0, 0],
      8834: [0.08556, 0.58556, 0, 0],
      8835: [0.08556, 0.58556, 0, 0],
      8838: [0.19667, 0.69667, 0, 0],
      8839: [0.19667, 0.69667, 0, 0],
      8846: [0, 0.55556, 0, 0],
      8849: [0.19667, 0.69667, 0, 0],
      8850: [0.19667, 0.69667, 0, 0],
      8851: [0, 0.55556, 0, 0],
      8852: [0, 0.55556, 0, 0],
      8853: [0.13333, 0.63333, 0, 0],
      8854: [0.13333, 0.63333, 0, 0],
      8855: [0.13333, 0.63333, 0, 0],
      8856: [0.13333, 0.63333, 0, 0],
      8857: [0.13333, 0.63333, 0, 0],
      8866: [0, 0.69444, 0, 0],
      8867: [0, 0.69444, 0, 0],
      8868: [0, 0.69444, 0, 0],
      8869: [0, 0.69444, 0, 0],
      8900: [-0.02639, 0.47361, 0, 0],
      8901: [-0.02639, 0.47361, 0, 0],
      8902: [-0.02778, 0.47222, 0, 0],
      8968: [0.25, 0.75, 0, 0],
      8969: [0.25, 0.75, 0, 0],
      8970: [0.25, 0.75, 0, 0],
      8971: [0.25, 0.75, 0, 0],
      8994: [-0.13889, 0.36111, 0, 0],
      8995: [-0.13889, 0.36111, 0, 0],
      9651: [0.19444, 0.69444, 0, 0],
      9657: [-0.02778, 0.47222, 0, 0],
      9661: [0.19444, 0.69444, 0, 0],
      9667: [-0.02778, 0.47222, 0, 0],
      9711: [0.19444, 0.69444, 0, 0],
      9824: [0.12963, 0.69444, 0, 0],
      9825: [0.12963, 0.69444, 0, 0],
      9826: [0.12963, 0.69444, 0, 0],
      9827: [0.12963, 0.69444, 0, 0],
      9837: [0, 0.75, 0, 0],
      9838: [0.19444, 0.69444, 0, 0],
      9839: [0.19444, 0.69444, 0, 0],
      10216: [0.25, 0.75, 0, 0],
      10217: [0.25, 0.75, 0, 0],
      10815: [0, 0.68611, 0, 0],
      10927: [0.19667, 0.69667, 0, 0],
      10928: [0.19667, 0.69667, 0, 0]
    },
    "Main-Italic": {
      33: [0, 0.69444, 0.12417, 0],
      34: [0, 0.69444, 0.06961, 0],
      35: [0.19444, 0.69444, 0.06616, 0],
      37: [0.05556, 0.75, 0.13639, 0],
      38: [0, 0.69444, 0.09694, 0],
      39: [0, 0.69444, 0.12417, 0],
      40: [0.25, 0.75, 0.16194, 0],
      41: [0.25, 0.75, 0.03694, 0],
      42: [0, 0.75, 0.14917, 0],
      43: [0.05667, 0.56167, 0.03694, 0],
      44: [0.19444, 0.10556, 0, 0],
      45: [0, 0.43056, 0.02826, 0],
      46: [0, 0.10556, 0, 0],
      47: [0.25, 0.75, 0.16194, 0],
      48: [0, 0.64444, 0.13556, 0],
      49: [0, 0.64444, 0.13556, 0],
      50: [0, 0.64444, 0.13556, 0],
      51: [0, 0.64444, 0.13556, 0],
      52: [0.19444, 0.64444, 0.13556, 0],
      53: [0, 0.64444, 0.13556, 0],
      54: [0, 0.64444, 0.13556, 0],
      55: [0.19444, 0.64444, 0.13556, 0],
      56: [0, 0.64444, 0.13556, 0],
      57: [0, 0.64444, 0.13556, 0],
      58: [0, 0.43056, 0.0582, 0],
      59: [0.19444, 0.43056, 0.0582, 0],
      61: [-0.13313, 0.36687, 0.06616, 0],
      63: [0, 0.69444, 0.1225, 0],
      64: [0, 0.69444, 0.09597, 0],
      65: [0, 0.68333, 0, 0],
      66: [0, 0.68333, 0.10257, 0],
      67: [0, 0.68333, 0.14528, 0],
      68: [0, 0.68333, 0.09403, 0],
      69: [0, 0.68333, 0.12028, 0],
      70: [0, 0.68333, 0.13305, 0],
      71: [0, 0.68333, 0.08722, 0],
      72: [0, 0.68333, 0.16389, 0],
      73: [0, 0.68333, 0.15806, 0],
      74: [0, 0.68333, 0.14028, 0],
      75: [0, 0.68333, 0.14528, 0],
      76: [0, 0.68333, 0, 0],
      77: [0, 0.68333, 0.16389, 0],
      78: [0, 0.68333, 0.16389, 0],
      79: [0, 0.68333, 0.09403, 0],
      80: [0, 0.68333, 0.10257, 0],
      81: [0.19444, 0.68333, 0.09403, 0],
      82: [0, 0.68333, 0.03868, 0],
      83: [0, 0.68333, 0.11972, 0],
      84: [0, 0.68333, 0.13305, 0],
      85: [0, 0.68333, 0.16389, 0],
      86: [0, 0.68333, 0.18361, 0],
      87: [0, 0.68333, 0.18361, 0],
      88: [0, 0.68333, 0.15806, 0],
      89: [0, 0.68333, 0.19383, 0],
      90: [0, 0.68333, 0.14528, 0],
      91: [0.25, 0.75, 0.1875, 0],
      93: [0.25, 0.75, 0.10528, 0],
      94: [0, 0.69444, 0.06646, 0],
      95: [0.31, 0.12056, 0.09208, 0],
      97: [0, 0.43056, 0.07671, 0],
      98: [0, 0.69444, 0.06312, 0],
      99: [0, 0.43056, 0.05653, 0],
      100: [0, 0.69444, 0.10333, 0],
      101: [0, 0.43056, 0.07514, 0],
      102: [0.19444, 0.69444, 0.21194, 0],
      103: [0.19444, 0.43056, 0.08847, 0],
      104: [0, 0.69444, 0.07671, 0],
      105: [0, 0.65536, 0.1019, 0],
      106: [0.19444, 0.65536, 0.14467, 0],
      107: [0, 0.69444, 0.10764, 0],
      108: [0, 0.69444, 0.10333, 0],
      109: [0, 0.43056, 0.07671, 0],
      110: [0, 0.43056, 0.07671, 0],
      111: [0, 0.43056, 0.06312, 0],
      112: [0.19444, 0.43056, 0.06312, 0],
      113: [0.19444, 0.43056, 0.08847, 0],
      114: [0, 0.43056, 0.10764, 0],
      115: [0, 0.43056, 0.08208, 0],
      116: [0, 0.61508, 0.09486, 0],
      117: [0, 0.43056, 0.07671, 0],
      118: [0, 0.43056, 0.10764, 0],
      119: [0, 0.43056, 0.10764, 0],
      120: [0, 0.43056, 0.12042, 0],
      121: [0.19444, 0.43056, 0.08847, 0],
      122: [0, 0.43056, 0.12292, 0],
      126: [0.35, 0.31786, 0.11585, 0],
      163: [0, 0.69444, 0, 0],
      305: [0, 0.43056, 0, 0.02778],
      567: [0.19444, 0.43056, 0, 0.08334],
      768: [0, 0.69444, 0, 0],
      769: [0, 0.69444, 0.09694, 0],
      770: [0, 0.69444, 0.06646, 0],
      771: [0, 0.66786, 0.11585, 0],
      772: [0, 0.56167, 0.10333, 0],
      774: [0, 0.69444, 0.10806, 0],
      775: [0, 0.66786, 0.11752, 0],
      776: [0, 0.66786, 0.10474, 0],
      778: [0, 0.69444, 0, 0],
      779: [0, 0.69444, 0.1225, 0],
      780: [0, 0.62847, 0.08295, 0],
      915: [0, 0.68333, 0.13305, 0],
      916: [0, 0.68333, 0, 0],
      920: [0, 0.68333, 0.09403, 0],
      923: [0, 0.68333, 0, 0],
      926: [0, 0.68333, 0.15294, 0],
      928: [0, 0.68333, 0.16389, 0],
      931: [0, 0.68333, 0.12028, 0],
      933: [0, 0.68333, 0.11111, 0],
      934: [0, 0.68333, 0.05986, 0],
      936: [0, 0.68333, 0.11111, 0],
      937: [0, 0.68333, 0.10257, 0],
      8211: [0, 0.43056, 0.09208, 0],
      8212: [0, 0.43056, 0.09208, 0],
      8216: [0, 0.69444, 0.12417, 0],
      8217: [0, 0.69444, 0.12417, 0],
      8220: [0, 0.69444, 0.1685, 0],
      8221: [0, 0.69444, 0.06961, 0],
      8463: [0, 0.68889, 0, 0]
    },
    "Main-Regular": {
      32: [0, 0, 0, 0],
      33: [0, 0.69444, 0, 0],
      34: [0, 0.69444, 0, 0],
      35: [0.19444, 0.69444, 0, 0],
      36: [0.05556, 0.75, 0, 0],
      37: [0.05556, 0.75, 0, 0],
      38: [0, 0.69444, 0, 0],
      39: [0, 0.69444, 0, 0],
      40: [0.25, 0.75, 0, 0],
      41: [0.25, 0.75, 0, 0],
      42: [0, 0.75, 0, 0],
      43: [0.08333, 0.58333, 0, 0],
      44: [0.19444, 0.10556, 0, 0],
      45: [0, 0.43056, 0, 0],
      46: [0, 0.10556, 0, 0],
      47: [0.25, 0.75, 0, 0],
      48: [0, 0.64444, 0, 0],
      49: [0, 0.64444, 0, 0],
      50: [0, 0.64444, 0, 0],
      51: [0, 0.64444, 0, 0],
      52: [0, 0.64444, 0, 0],
      53: [0, 0.64444, 0, 0],
      54: [0, 0.64444, 0, 0],
      55: [0, 0.64444, 0, 0],
      56: [0, 0.64444, 0, 0],
      57: [0, 0.64444, 0, 0],
      58: [0, 0.43056, 0, 0],
      59: [0.19444, 0.43056, 0, 0],
      60: [0.0391, 0.5391, 0, 0],
      61: [-0.13313, 0.36687, 0, 0],
      62: [0.0391, 0.5391, 0, 0],
      63: [0, 0.69444, 0, 0],
      64: [0, 0.69444, 0, 0],
      65: [0, 0.68333, 0, 0],
      66: [0, 0.68333, 0, 0],
      67: [0, 0.68333, 0, 0],
      68: [0, 0.68333, 0, 0],
      69: [0, 0.68333, 0, 0],
      70: [0, 0.68333, 0, 0],
      71: [0, 0.68333, 0, 0],
      72: [0, 0.68333, 0, 0],
      73: [0, 0.68333, 0, 0],
      74: [0, 0.68333, 0, 0],
      75: [0, 0.68333, 0, 0],
      76: [0, 0.68333, 0, 0],
      77: [0, 0.68333, 0, 0],
      78: [0, 0.68333, 0, 0],
      79: [0, 0.68333, 0, 0],
      80: [0, 0.68333, 0, 0],
      81: [0.19444, 0.68333, 0, 0],
      82: [0, 0.68333, 0, 0],
      83: [0, 0.68333, 0, 0],
      84: [0, 0.68333, 0, 0],
      85: [0, 0.68333, 0, 0],
      86: [0, 0.68333, 0.01389, 0],
      87: [0, 0.68333, 0.01389, 0],
      88: [0, 0.68333, 0, 0],
      89: [0, 0.68333, 0.025, 0],
      90: [0, 0.68333, 0, 0],
      91: [0.25, 0.75, 0, 0],
      92: [0.25, 0.75, 0, 0],
      93: [0.25, 0.75, 0, 0],
      94: [0, 0.69444, 0, 0],
      95: [0.31, 0.12056, 0.02778, 0],
      96: [0, 0.69444, 0, 0],
      97: [0, 0.43056, 0, 0],
      98: [0, 0.69444, 0, 0],
      99: [0, 0.43056, 0, 0],
      100: [0, 0.69444, 0, 0],
      101: [0, 0.43056, 0, 0],
      102: [0, 0.69444, 0.07778, 0],
      103: [0.19444, 0.43056, 0.01389, 0],
      104: [0, 0.69444, 0, 0],
      105: [0, 0.66786, 0, 0],
      106: [0.19444, 0.66786, 0, 0],
      107: [0, 0.69444, 0, 0],
      108: [0, 0.69444, 0, 0],
      109: [0, 0.43056, 0, 0],
      110: [0, 0.43056, 0, 0],
      111: [0, 0.43056, 0, 0],
      112: [0.19444, 0.43056, 0, 0],
      113: [0.19444, 0.43056, 0, 0],
      114: [0, 0.43056, 0, 0],
      115: [0, 0.43056, 0, 0],
      116: [0, 0.61508, 0, 0],
      117: [0, 0.43056, 0, 0],
      118: [0, 0.43056, 0.01389, 0],
      119: [0, 0.43056, 0.01389, 0],
      120: [0, 0.43056, 0, 0],
      121: [0.19444, 0.43056, 0.01389, 0],
      122: [0, 0.43056, 0, 0],
      123: [0.25, 0.75, 0, 0],
      124: [0.25, 0.75, 0, 0],
      125: [0.25, 0.75, 0, 0],
      126: [0.35, 0.31786, 0, 0],
      160: [0, 0, 0, 0],
      168: [0, 0.66786, 0, 0],
      172: [0, 0.43056, 0, 0],
      175: [0, 0.56778, 0, 0],
      176: [0, 0.69444, 0, 0],
      177: [0.08333, 0.58333, 0, 0],
      180: [0, 0.69444, 0, 0],
      215: [0.08333, 0.58333, 0, 0],
      247: [0.08333, 0.58333, 0, 0],
      305: [0, 0.43056, 0, 0],
      567: [0.19444, 0.43056, 0, 0],
      710: [0, 0.69444, 0, 0],
      711: [0, 0.62847, 0, 0],
      713: [0, 0.56778, 0, 0],
      714: [0, 0.69444, 0, 0],
      715: [0, 0.69444, 0, 0],
      728: [0, 0.69444, 0, 0],
      729: [0, 0.66786, 0, 0],
      730: [0, 0.69444, 0, 0],
      732: [0, 0.66786, 0, 0],
      768: [0, 0.69444, 0, 0],
      769: [0, 0.69444, 0, 0],
      770: [0, 0.69444, 0, 0],
      771: [0, 0.66786, 0, 0],
      772: [0, 0.56778, 0, 0],
      774: [0, 0.69444, 0, 0],
      775: [0, 0.66786, 0, 0],
      776: [0, 0.66786, 0, 0],
      778: [0, 0.69444, 0, 0],
      779: [0, 0.69444, 0, 0],
      780: [0, 0.62847, 0, 0],
      824: [0.19444, 0.69444, 0, 0],
      915: [0, 0.68333, 0, 0],
      916: [0, 0.68333, 0, 0],
      920: [0, 0.68333, 0, 0],
      923: [0, 0.68333, 0, 0],
      926: [0, 0.68333, 0, 0],
      928: [0, 0.68333, 0, 0],
      931: [0, 0.68333, 0, 0],
      933: [0, 0.68333, 0, 0],
      934: [0, 0.68333, 0, 0],
      936: [0, 0.68333, 0, 0],
      937: [0, 0.68333, 0, 0],
      8211: [0, 0.43056, 0.02778, 0],
      8212: [0, 0.43056, 0.02778, 0],
      8216: [0, 0.69444, 0, 0],
      8217: [0, 0.69444, 0, 0],
      8220: [0, 0.69444, 0, 0],
      8221: [0, 0.69444, 0, 0],
      8224: [0.19444, 0.69444, 0, 0],
      8225: [0.19444, 0.69444, 0, 0],
      8230: [0, 0.12, 0, 0],
      8242: [0, 0.55556, 0, 0],
      8407: [0, 0.71444, 0.15382, 0],
      8463: [0, 0.68889, 0, 0],
      8465: [0, 0.69444, 0, 0],
      8467: [0, 0.69444, 0, 0.11111],
      8472: [0.19444, 0.43056, 0, 0.11111],
      8476: [0, 0.69444, 0, 0],
      8501: [0, 0.69444, 0, 0],
      8592: [-0.13313, 0.36687, 0, 0],
      8593: [0.19444, 0.69444, 0, 0],
      8594: [-0.13313, 0.36687, 0, 0],
      8595: [0.19444, 0.69444, 0, 0],
      8596: [-0.13313, 0.36687, 0, 0],
      8597: [0.25, 0.75, 0, 0],
      8598: [0.19444, 0.69444, 0, 0],
      8599: [0.19444, 0.69444, 0, 0],
      8600: [0.19444, 0.69444, 0, 0],
      8601: [0.19444, 0.69444, 0, 0],
      8614: [0.011, 0.511, 0, 0],
      8617: [0.011, 0.511, 0, 0],
      8618: [0.011, 0.511, 0, 0],
      8636: [-0.13313, 0.36687, 0, 0],
      8637: [-0.13313, 0.36687, 0, 0],
      8640: [-0.13313, 0.36687, 0, 0],
      8641: [-0.13313, 0.36687, 0, 0],
      8652: [0.011, 0.671, 0, 0],
      8656: [-0.13313, 0.36687, 0, 0],
      8657: [0.19444, 0.69444, 0, 0],
      8658: [-0.13313, 0.36687, 0, 0],
      8659: [0.19444, 0.69444, 0, 0],
      8660: [-0.13313, 0.36687, 0, 0],
      8661: [0.25, 0.75, 0, 0],
      8704: [0, 0.69444, 0, 0],
      8706: [0, 0.69444, 0.05556, 0.08334],
      8707: [0, 0.69444, 0, 0],
      8709: [0.05556, 0.75, 0, 0],
      8711: [0, 0.68333, 0, 0],
      8712: [0.0391, 0.5391, 0, 0],
      8715: [0.0391, 0.5391, 0, 0],
      8722: [0.08333, 0.58333, 0, 0],
      8723: [0.08333, 0.58333, 0, 0],
      8725: [0.25, 0.75, 0, 0],
      8726: [0.25, 0.75, 0, 0],
      8727: [-0.03472, 0.46528, 0, 0],
      8728: [-0.05555, 0.44445, 0, 0],
      8729: [-0.05555, 0.44445, 0, 0],
      8730: [0.2, 0.8, 0, 0],
      8733: [0, 0.43056, 0, 0],
      8734: [0, 0.43056, 0, 0],
      8736: [0, 0.69224, 0, 0],
      8739: [0.25, 0.75, 0, 0],
      8741: [0.25, 0.75, 0, 0],
      8743: [0, 0.55556, 0, 0],
      8744: [0, 0.55556, 0, 0],
      8745: [0, 0.55556, 0, 0],
      8746: [0, 0.55556, 0, 0],
      8747: [0.19444, 0.69444, 0.11111, 0],
      8764: [-0.13313, 0.36687, 0, 0],
      8768: [0.19444, 0.69444, 0, 0],
      8771: [-0.03625, 0.46375, 0, 0],
      8773: [-0.022, 0.589, 0, 0],
      8776: [-0.01688, 0.48312, 0, 0],
      8781: [-0.03625, 0.46375, 0, 0],
      8784: [-0.133, 0.67, 0, 0],
      8800: [0.215, 0.716, 0, 0],
      8801: [-0.03625, 0.46375, 0, 0],
      8804: [0.13597, 0.63597, 0, 0],
      8805: [0.13597, 0.63597, 0, 0],
      8810: [0.0391, 0.5391, 0, 0],
      8811: [0.0391, 0.5391, 0, 0],
      8826: [0.0391, 0.5391, 0, 0],
      8827: [0.0391, 0.5391, 0, 0],
      8834: [0.0391, 0.5391, 0, 0],
      8835: [0.0391, 0.5391, 0, 0],
      8838: [0.13597, 0.63597, 0, 0],
      8839: [0.13597, 0.63597, 0, 0],
      8846: [0, 0.55556, 0, 0],
      8849: [0.13597, 0.63597, 0, 0],
      8850: [0.13597, 0.63597, 0, 0],
      8851: [0, 0.55556, 0, 0],
      8852: [0, 0.55556, 0, 0],
      8853: [0.08333, 0.58333, 0, 0],
      8854: [0.08333, 0.58333, 0, 0],
      8855: [0.08333, 0.58333, 0, 0],
      8856: [0.08333, 0.58333, 0, 0],
      8857: [0.08333, 0.58333, 0, 0],
      8866: [0, 0.69444, 0, 0],
      8867: [0, 0.69444, 0, 0],
      8868: [0, 0.69444, 0, 0],
      8869: [0, 0.69444, 0, 0],
      8872: [0.249, 0.75, 0, 0],
      8900: [-0.05555, 0.44445, 0, 0],
      8901: [-0.05555, 0.44445, 0, 0],
      8902: [-0.03472, 0.46528, 0, 0],
      8904: [5e-3, 0.505, 0, 0],
      8942: [0.03, 0.9, 0, 0],
      8943: [-0.19, 0.31, 0, 0],
      8945: [-0.1, 0.82, 0, 0],
      8968: [0.25, 0.75, 0, 0],
      8969: [0.25, 0.75, 0, 0],
      8970: [0.25, 0.75, 0, 0],
      8971: [0.25, 0.75, 0, 0],
      8994: [-0.14236, 0.35764, 0, 0],
      8995: [-0.14236, 0.35764, 0, 0],
      9136: [0.244, 0.744, 0, 0],
      9137: [0.244, 0.744, 0, 0],
      9651: [0.19444, 0.69444, 0, 0],
      9657: [-0.03472, 0.46528, 0, 0],
      9661: [0.19444, 0.69444, 0, 0],
      9667: [-0.03472, 0.46528, 0, 0],
      9711: [0.19444, 0.69444, 0, 0],
      9824: [0.12963, 0.69444, 0, 0],
      9825: [0.12963, 0.69444, 0, 0],
      9826: [0.12963, 0.69444, 0, 0],
      9827: [0.12963, 0.69444, 0, 0],
      9837: [0, 0.75, 0, 0],
      9838: [0.19444, 0.69444, 0, 0],
      9839: [0.19444, 0.69444, 0, 0],
      10216: [0.25, 0.75, 0, 0],
      10217: [0.25, 0.75, 0, 0],
      10222: [0.244, 0.744, 0, 0],
      10223: [0.244, 0.744, 0, 0],
      10229: [0.011, 0.511, 0, 0],
      10230: [0.011, 0.511, 0, 0],
      10231: [0.011, 0.511, 0, 0],
      10232: [0.024, 0.525, 0, 0],
      10233: [0.024, 0.525, 0, 0],
      10234: [0.024, 0.525, 0, 0],
      10236: [0.011, 0.511, 0, 0],
      10815: [0, 0.68333, 0, 0],
      10927: [0.13597, 0.63597, 0, 0],
      10928: [0.13597, 0.63597, 0, 0]
    },
    "Math-BoldItalic": {
      47: [0.19444, 0.69444, 0, 0],
      65: [0, 0.68611, 0, 0],
      66: [0, 0.68611, 0.04835, 0],
      67: [0, 0.68611, 0.06979, 0],
      68: [0, 0.68611, 0.03194, 0],
      69: [0, 0.68611, 0.05451, 0],
      70: [0, 0.68611, 0.15972, 0],
      71: [0, 0.68611, 0, 0],
      72: [0, 0.68611, 0.08229, 0],
      73: [0, 0.68611, 0.07778, 0],
      74: [0, 0.68611, 0.10069, 0],
      75: [0, 0.68611, 0.06979, 0],
      76: [0, 0.68611, 0, 0],
      77: [0, 0.68611, 0.11424, 0],
      78: [0, 0.68611, 0.11424, 0],
      79: [0, 0.68611, 0.03194, 0],
      80: [0, 0.68611, 0.15972, 0],
      81: [0.19444, 0.68611, 0, 0],
      82: [0, 0.68611, 421e-5, 0],
      83: [0, 0.68611, 0.05382, 0],
      84: [0, 0.68611, 0.15972, 0],
      85: [0, 0.68611, 0.11424, 0],
      86: [0, 0.68611, 0.25555, 0],
      87: [0, 0.68611, 0.15972, 0],
      88: [0, 0.68611, 0.07778, 0],
      89: [0, 0.68611, 0.25555, 0],
      90: [0, 0.68611, 0.06979, 0],
      97: [0, 0.44444, 0, 0],
      98: [0, 0.69444, 0, 0],
      99: [0, 0.44444, 0, 0],
      100: [0, 0.69444, 0, 0],
      101: [0, 0.44444, 0, 0],
      102: [0.19444, 0.69444, 0.11042, 0],
      103: [0.19444, 0.44444, 0.03704, 0],
      104: [0, 0.69444, 0, 0],
      105: [0, 0.69326, 0, 0],
      106: [0.19444, 0.69326, 0.0622, 0],
      107: [0, 0.69444, 0.01852, 0],
      108: [0, 0.69444, 88e-4, 0],
      109: [0, 0.44444, 0, 0],
      110: [0, 0.44444, 0, 0],
      111: [0, 0.44444, 0, 0],
      112: [0.19444, 0.44444, 0, 0],
      113: [0.19444, 0.44444, 0.03704, 0],
      114: [0, 0.44444, 0.03194, 0],
      115: [0, 0.44444, 0, 0],
      116: [0, 0.63492, 0, 0],
      117: [0, 0.44444, 0, 0],
      118: [0, 0.44444, 0.03704, 0],
      119: [0, 0.44444, 0.02778, 0],
      120: [0, 0.44444, 0, 0],
      121: [0.19444, 0.44444, 0.03704, 0],
      122: [0, 0.44444, 0.04213, 0],
      915: [0, 0.68611, 0.15972, 0],
      916: [0, 0.68611, 0, 0],
      920: [0, 0.68611, 0.03194, 0],
      923: [0, 0.68611, 0, 0],
      926: [0, 0.68611, 0.07458, 0],
      928: [0, 0.68611, 0.08229, 0],
      931: [0, 0.68611, 0.05451, 0],
      933: [0, 0.68611, 0.15972, 0],
      934: [0, 0.68611, 0, 0],
      936: [0, 0.68611, 0.11653, 0],
      937: [0, 0.68611, 0.04835, 0],
      945: [0, 0.44444, 0, 0],
      946: [0.19444, 0.69444, 0.03403, 0],
      947: [0.19444, 0.44444, 0.06389, 0],
      948: [0, 0.69444, 0.03819, 0],
      949: [0, 0.44444, 0, 0],
      950: [0.19444, 0.69444, 0.06215, 0],
      951: [0.19444, 0.44444, 0.03704, 0],
      952: [0, 0.69444, 0.03194, 0],
      953: [0, 0.44444, 0, 0],
      954: [0, 0.44444, 0, 0],
      955: [0, 0.69444, 0, 0],
      956: [0.19444, 0.44444, 0, 0],
      957: [0, 0.44444, 0.06898, 0],
      958: [0.19444, 0.69444, 0.03021, 0],
      959: [0, 0.44444, 0, 0],
      960: [0, 0.44444, 0.03704, 0],
      961: [0.19444, 0.44444, 0, 0],
      962: [0.09722, 0.44444, 0.07917, 0],
      963: [0, 0.44444, 0.03704, 0],
      964: [0, 0.44444, 0.13472, 0],
      965: [0, 0.44444, 0.03704, 0],
      966: [0.19444, 0.44444, 0, 0],
      967: [0.19444, 0.44444, 0, 0],
      968: [0.19444, 0.69444, 0.03704, 0],
      969: [0, 0.44444, 0.03704, 0],
      977: [0, 0.69444, 0, 0],
      981: [0.19444, 0.69444, 0, 0],
      982: [0, 0.44444, 0.03194, 0],
      1009: [0.19444, 0.44444, 0, 0],
      1013: [0, 0.44444, 0, 0]
    },
    "Math-Italic": {
      47: [0.19444, 0.69444, 0, 0],
      65: [0, 0.68333, 0, 0.13889],
      66: [0, 0.68333, 0.05017, 0.08334],
      67: [0, 0.68333, 0.07153, 0.08334],
      68: [0, 0.68333, 0.02778, 0.05556],
      69: [0, 0.68333, 0.05764, 0.08334],
      70: [0, 0.68333, 0.13889, 0.08334],
      71: [0, 0.68333, 0, 0.08334],
      72: [0, 0.68333, 0.08125, 0.05556],
      73: [0, 0.68333, 0.07847, 0.11111],
      74: [0, 0.68333, 0.09618, 0.16667],
      75: [0, 0.68333, 0.07153, 0.05556],
      76: [0, 0.68333, 0, 0.02778],
      77: [0, 0.68333, 0.10903, 0.08334],
      78: [0, 0.68333, 0.10903, 0.08334],
      79: [0, 0.68333, 0.02778, 0.08334],
      80: [0, 0.68333, 0.13889, 0.08334],
      81: [0.19444, 0.68333, 0, 0.08334],
      82: [0, 0.68333, 773e-5, 0.08334],
      83: [0, 0.68333, 0.05764, 0.08334],
      84: [0, 0.68333, 0.13889, 0.08334],
      85: [0, 0.68333, 0.10903, 0.02778],
      86: [0, 0.68333, 0.22222, 0],
      87: [0, 0.68333, 0.13889, 0],
      88: [0, 0.68333, 0.07847, 0.08334],
      89: [0, 0.68333, 0.22222, 0],
      90: [0, 0.68333, 0.07153, 0.08334],
      97: [0, 0.43056, 0, 0],
      98: [0, 0.69444, 0, 0],
      99: [0, 0.43056, 0, 0.05556],
      100: [0, 0.69444, 0, 0.16667],
      101: [0, 0.43056, 0, 0.05556],
      102: [0.19444, 0.69444, 0.10764, 0.16667],
      103: [0.19444, 0.43056, 0.03588, 0.02778],
      104: [0, 0.69444, 0, 0],
      105: [0, 0.65952, 0, 0],
      106: [0.19444, 0.65952, 0.05724, 0],
      107: [0, 0.69444, 0.03148, 0],
      108: [0, 0.69444, 0.01968, 0.08334],
      109: [0, 0.43056, 0, 0],
      110: [0, 0.43056, 0, 0],
      111: [0, 0.43056, 0, 0.05556],
      112: [0.19444, 0.43056, 0, 0.08334],
      113: [0.19444, 0.43056, 0.03588, 0.08334],
      114: [0, 0.43056, 0.02778, 0.05556],
      115: [0, 0.43056, 0, 0.05556],
      116: [0, 0.61508, 0, 0.08334],
      117: [0, 0.43056, 0, 0.02778],
      118: [0, 0.43056, 0.03588, 0.02778],
      119: [0, 0.43056, 0.02691, 0.08334],
      120: [0, 0.43056, 0, 0.02778],
      121: [0.19444, 0.43056, 0.03588, 0.05556],
      122: [0, 0.43056, 0.04398, 0.05556],
      915: [0, 0.68333, 0.13889, 0.08334],
      916: [0, 0.68333, 0, 0.16667],
      920: [0, 0.68333, 0.02778, 0.08334],
      923: [0, 0.68333, 0, 0.16667],
      926: [0, 0.68333, 0.07569, 0.08334],
      928: [0, 0.68333, 0.08125, 0.05556],
      931: [0, 0.68333, 0.05764, 0.08334],
      933: [0, 0.68333, 0.13889, 0.05556],
      934: [0, 0.68333, 0, 0.08334],
      936: [0, 0.68333, 0.11, 0.05556],
      937: [0, 0.68333, 0.05017, 0.08334],
      945: [0, 0.43056, 37e-4, 0.02778],
      946: [0.19444, 0.69444, 0.05278, 0.08334],
      947: [0.19444, 0.43056, 0.05556, 0],
      948: [0, 0.69444, 0.03785, 0.05556],
      949: [0, 0.43056, 0, 0.08334],
      950: [0.19444, 0.69444, 0.07378, 0.08334],
      951: [0.19444, 0.43056, 0.03588, 0.05556],
      952: [0, 0.69444, 0.02778, 0.08334],
      953: [0, 0.43056, 0, 0.05556],
      954: [0, 0.43056, 0, 0],
      955: [0, 0.69444, 0, 0],
      956: [0.19444, 0.43056, 0, 0.02778],
      957: [0, 0.43056, 0.06366, 0.02778],
      958: [0.19444, 0.69444, 0.04601, 0.11111],
      959: [0, 0.43056, 0, 0.05556],
      960: [0, 0.43056, 0.03588, 0],
      961: [0.19444, 0.43056, 0, 0.08334],
      962: [0.09722, 0.43056, 0.07986, 0.08334],
      963: [0, 0.43056, 0.03588, 0],
      964: [0, 0.43056, 0.1132, 0.02778],
      965: [0, 0.43056, 0.03588, 0.02778],
      966: [0.19444, 0.43056, 0, 0.08334],
      967: [0.19444, 0.43056, 0, 0.05556],
      968: [0.19444, 0.69444, 0.03588, 0.11111],
      969: [0, 0.43056, 0.03588, 0],
      977: [0, 0.69444, 0, 0.08334],
      981: [0.19444, 0.69444, 0, 0.08334],
      982: [0, 0.43056, 0.02778, 0],
      1009: [0.19444, 0.43056, 0, 0.08334],
      1013: [0, 0.43056, 0, 0.05556]
    },
    "Math-Regular": {
      65: [0, 0.68333, 0, 0.13889],
      66: [0, 0.68333, 0.05017, 0.08334],
      67: [0, 0.68333, 0.07153, 0.08334],
      68: [0, 0.68333, 0.02778, 0.05556],
      69: [0, 0.68333, 0.05764, 0.08334],
      70: [0, 0.68333, 0.13889, 0.08334],
      71: [0, 0.68333, 0, 0.08334],
      72: [0, 0.68333, 0.08125, 0.05556],
      73: [0, 0.68333, 0.07847, 0.11111],
      74: [0, 0.68333, 0.09618, 0.16667],
      75: [0, 0.68333, 0.07153, 0.05556],
      76: [0, 0.68333, 0, 0.02778],
      77: [0, 0.68333, 0.10903, 0.08334],
      78: [0, 0.68333, 0.10903, 0.08334],
      79: [0, 0.68333, 0.02778, 0.08334],
      80: [0, 0.68333, 0.13889, 0.08334],
      81: [0.19444, 0.68333, 0, 0.08334],
      82: [0, 0.68333, 773e-5, 0.08334],
      83: [0, 0.68333, 0.05764, 0.08334],
      84: [0, 0.68333, 0.13889, 0.08334],
      85: [0, 0.68333, 0.10903, 0.02778],
      86: [0, 0.68333, 0.22222, 0],
      87: [0, 0.68333, 0.13889, 0],
      88: [0, 0.68333, 0.07847, 0.08334],
      89: [0, 0.68333, 0.22222, 0],
      90: [0, 0.68333, 0.07153, 0.08334],
      97: [0, 0.43056, 0, 0],
      98: [0, 0.69444, 0, 0],
      99: [0, 0.43056, 0, 0.05556],
      100: [0, 0.69444, 0, 0.16667],
      101: [0, 0.43056, 0, 0.05556],
      102: [0.19444, 0.69444, 0.10764, 0.16667],
      103: [0.19444, 0.43056, 0.03588, 0.02778],
      104: [0, 0.69444, 0, 0],
      105: [0, 0.65952, 0, 0],
      106: [0.19444, 0.65952, 0.05724, 0],
      107: [0, 0.69444, 0.03148, 0],
      108: [0, 0.69444, 0.01968, 0.08334],
      109: [0, 0.43056, 0, 0],
      110: [0, 0.43056, 0, 0],
      111: [0, 0.43056, 0, 0.05556],
      112: [0.19444, 0.43056, 0, 0.08334],
      113: [0.19444, 0.43056, 0.03588, 0.08334],
      114: [0, 0.43056, 0.02778, 0.05556],
      115: [0, 0.43056, 0, 0.05556],
      116: [0, 0.61508, 0, 0.08334],
      117: [0, 0.43056, 0, 0.02778],
      118: [0, 0.43056, 0.03588, 0.02778],
      119: [0, 0.43056, 0.02691, 0.08334],
      120: [0, 0.43056, 0, 0.02778],
      121: [0.19444, 0.43056, 0.03588, 0.05556],
      122: [0, 0.43056, 0.04398, 0.05556],
      915: [0, 0.68333, 0.13889, 0.08334],
      916: [0, 0.68333, 0, 0.16667],
      920: [0, 0.68333, 0.02778, 0.08334],
      923: [0, 0.68333, 0, 0.16667],
      926: [0, 0.68333, 0.07569, 0.08334],
      928: [0, 0.68333, 0.08125, 0.05556],
      931: [0, 0.68333, 0.05764, 0.08334],
      933: [0, 0.68333, 0.13889, 0.05556],
      934: [0, 0.68333, 0, 0.08334],
      936: [0, 0.68333, 0.11, 0.05556],
      937: [0, 0.68333, 0.05017, 0.08334],
      945: [0, 0.43056, 37e-4, 0.02778],
      946: [0.19444, 0.69444, 0.05278, 0.08334],
      947: [0.19444, 0.43056, 0.05556, 0],
      948: [0, 0.69444, 0.03785, 0.05556],
      949: [0, 0.43056, 0, 0.08334],
      950: [0.19444, 0.69444, 0.07378, 0.08334],
      951: [0.19444, 0.43056, 0.03588, 0.05556],
      952: [0, 0.69444, 0.02778, 0.08334],
      953: [0, 0.43056, 0, 0.05556],
      954: [0, 0.43056, 0, 0],
      955: [0, 0.69444, 0, 0],
      956: [0.19444, 0.43056, 0, 0.02778],
      957: [0, 0.43056, 0.06366, 0.02778],
      958: [0.19444, 0.69444, 0.04601, 0.11111],
      959: [0, 0.43056, 0, 0.05556],
      960: [0, 0.43056, 0.03588, 0],
      961: [0.19444, 0.43056, 0, 0.08334],
      962: [0.09722, 0.43056, 0.07986, 0.08334],
      963: [0, 0.43056, 0.03588, 0],
      964: [0, 0.43056, 0.1132, 0.02778],
      965: [0, 0.43056, 0.03588, 0.02778],
      966: [0.19444, 0.43056, 0, 0.08334],
      967: [0.19444, 0.43056, 0, 0.05556],
      968: [0.19444, 0.69444, 0.03588, 0.11111],
      969: [0, 0.43056, 0.03588, 0],
      977: [0, 0.69444, 0, 0.08334],
      981: [0.19444, 0.69444, 0, 0.08334],
      982: [0, 0.43056, 0.02778, 0],
      1009: [0.19444, 0.43056, 0, 0.08334],
      1013: [0, 0.43056, 0, 0.05556]
    },
    "SansSerif-Regular": {
      33: [0, 0.69444, 0, 0],
      34: [0, 0.69444, 0, 0],
      35: [0.19444, 0.69444, 0, 0],
      36: [0.05556, 0.75, 0, 0],
      37: [0.05556, 0.75, 0, 0],
      38: [0, 0.69444, 0, 0],
      39: [0, 0.69444, 0, 0],
      40: [0.25, 0.75, 0, 0],
      41: [0.25, 0.75, 0, 0],
      42: [0, 0.75, 0, 0],
      43: [0.08333, 0.58333, 0, 0],
      44: [0.125, 0.08333, 0, 0],
      45: [0, 0.44444, 0, 0],
      46: [0, 0.08333, 0, 0],
      47: [0.25, 0.75, 0, 0],
      48: [0, 0.65556, 0, 0],
      49: [0, 0.65556, 0, 0],
      50: [0, 0.65556, 0, 0],
      51: [0, 0.65556, 0, 0],
      52: [0, 0.65556, 0, 0],
      53: [0, 0.65556, 0, 0],
      54: [0, 0.65556, 0, 0],
      55: [0, 0.65556, 0, 0],
      56: [0, 0.65556, 0, 0],
      57: [0, 0.65556, 0, 0],
      58: [0, 0.44444, 0, 0],
      59: [0.125, 0.44444, 0, 0],
      61: [-0.13, 0.37, 0, 0],
      63: [0, 0.69444, 0, 0],
      64: [0, 0.69444, 0, 0],
      65: [0, 0.69444, 0, 0],
      66: [0, 0.69444, 0, 0],
      67: [0, 0.69444, 0, 0],
      68: [0, 0.69444, 0, 0],
      69: [0, 0.69444, 0, 0],
      70: [0, 0.69444, 0, 0],
      71: [0, 0.69444, 0, 0],
      72: [0, 0.69444, 0, 0],
      73: [0, 0.69444, 0, 0],
      74: [0, 0.69444, 0, 0],
      75: [0, 0.69444, 0, 0],
      76: [0, 0.69444, 0, 0],
      77: [0, 0.69444, 0, 0],
      78: [0, 0.69444, 0, 0],
      79: [0, 0.69444, 0, 0],
      80: [0, 0.69444, 0, 0],
      81: [0.125, 0.69444, 0, 0],
      82: [0, 0.69444, 0, 0],
      83: [0, 0.69444, 0, 0],
      84: [0, 0.69444, 0, 0],
      85: [0, 0.69444, 0, 0],
      86: [0, 0.69444, 0.01389, 0],
      87: [0, 0.69444, 0.01389, 0],
      88: [0, 0.69444, 0, 0],
      89: [0, 0.69444, 0.025, 0],
      90: [0, 0.69444, 0, 0],
      91: [0.25, 0.75, 0, 0],
      93: [0.25, 0.75, 0, 0],
      94: [0, 0.69444, 0, 0],
      95: [0.35, 0.09444, 0.02778, 0],
      97: [0, 0.44444, 0, 0],
      98: [0, 0.69444, 0, 0],
      99: [0, 0.44444, 0, 0],
      100: [0, 0.69444, 0, 0],
      101: [0, 0.44444, 0, 0],
      102: [0, 0.69444, 0.06944, 0],
      103: [0.19444, 0.44444, 0.01389, 0],
      104: [0, 0.69444, 0, 0],
      105: [0, 0.67937, 0, 0],
      106: [0.19444, 0.67937, 0, 0],
      107: [0, 0.69444, 0, 0],
      108: [0, 0.69444, 0, 0],
      109: [0, 0.44444, 0, 0],
      110: [0, 0.44444, 0, 0],
      111: [0, 0.44444, 0, 0],
      112: [0.19444, 0.44444, 0, 0],
      113: [0.19444, 0.44444, 0, 0],
      114: [0, 0.44444, 0.01389, 0],
      115: [0, 0.44444, 0, 0],
      116: [0, 0.57143, 0, 0],
      117: [0, 0.44444, 0, 0],
      118: [0, 0.44444, 0.01389, 0],
      119: [0, 0.44444, 0.01389, 0],
      120: [0, 0.44444, 0, 0],
      121: [0.19444, 0.44444, 0.01389, 0],
      122: [0, 0.44444, 0, 0],
      126: [0.35, 0.32659, 0, 0],
      305: [0, 0.44444, 0, 0],
      567: [0.19444, 0.44444, 0, 0],
      768: [0, 0.69444, 0, 0],
      769: [0, 0.69444, 0, 0],
      770: [0, 0.69444, 0, 0],
      771: [0, 0.67659, 0, 0],
      772: [0, 0.60889, 0, 0],
      774: [0, 0.69444, 0, 0],
      775: [0, 0.67937, 0, 0],
      776: [0, 0.67937, 0, 0],
      778: [0, 0.69444, 0, 0],
      779: [0, 0.69444, 0, 0],
      780: [0, 0.63194, 0, 0],
      915: [0, 0.69444, 0, 0],
      916: [0, 0.69444, 0, 0],
      920: [0, 0.69444, 0, 0],
      923: [0, 0.69444, 0, 0],
      926: [0, 0.69444, 0, 0],
      928: [0, 0.69444, 0, 0],
      931: [0, 0.69444, 0, 0],
      933: [0, 0.69444, 0, 0],
      934: [0, 0.69444, 0, 0],
      936: [0, 0.69444, 0, 0],
      937: [0, 0.69444, 0, 0],
      8211: [0, 0.44444, 0.02778, 0],
      8212: [0, 0.44444, 0.02778, 0],
      8216: [0, 0.69444, 0, 0],
      8217: [0, 0.69444, 0, 0],
      8220: [0, 0.69444, 0, 0],
      8221: [0, 0.69444, 0, 0]
    },
    "Script-Regular": {
      65: [0, 0.7, 0.22925, 0],
      66: [0, 0.7, 0.04087, 0],
      67: [0, 0.7, 0.1689, 0],
      68: [0, 0.7, 0.09371, 0],
      69: [0, 0.7, 0.18583, 0],
      70: [0, 0.7, 0.13634, 0],
      71: [0, 0.7, 0.17322, 0],
      72: [0, 0.7, 0.29694, 0],
      73: [0, 0.7, 0.19189, 0],
      74: [0.27778, 0.7, 0.19189, 0],
      75: [0, 0.7, 0.31259, 0],
      76: [0, 0.7, 0.19189, 0],
      77: [0, 0.7, 0.15981, 0],
      78: [0, 0.7, 0.3525, 0],
      79: [0, 0.7, 0.08078, 0],
      80: [0, 0.7, 0.08078, 0],
      81: [0, 0.7, 0.03305, 0],
      82: [0, 0.7, 0.06259, 0],
      83: [0, 0.7, 0.19189, 0],
      84: [0, 0.7, 0.29087, 0],
      85: [0, 0.7, 0.25815, 0],
      86: [0, 0.7, 0.27523, 0],
      87: [0, 0.7, 0.27523, 0],
      88: [0, 0.7, 0.26006, 0],
      89: [0, 0.7, 0.2939, 0],
      90: [0, 0.7, 0.24037, 0]
    },
    "Size1-Regular": {
      40: [0.35001, 0.85, 0, 0],
      41: [0.35001, 0.85, 0, 0],
      47: [0.35001, 0.85, 0, 0],
      91: [0.35001, 0.85, 0, 0],
      92: [0.35001, 0.85, 0, 0],
      93: [0.35001, 0.85, 0, 0],
      123: [0.35001, 0.85, 0, 0],
      125: [0.35001, 0.85, 0, 0],
      710: [0, 0.72222, 0, 0],
      732: [0, 0.72222, 0, 0],
      770: [0, 0.72222, 0, 0],
      771: [0, 0.72222, 0, 0],
      8214: [-99e-5, 0.601, 0, 0],
      8593: [1e-5, 0.6, 0, 0],
      8595: [1e-5, 0.6, 0, 0],
      8657: [1e-5, 0.6, 0, 0],
      8659: [1e-5, 0.6, 0, 0],
      8719: [0.25001, 0.75, 0, 0],
      8720: [0.25001, 0.75, 0, 0],
      8721: [0.25001, 0.75, 0, 0],
      8730: [0.35001, 0.85, 0, 0],
      8739: [-599e-5, 0.606, 0, 0],
      8741: [-599e-5, 0.606, 0, 0],
      8747: [0.30612, 0.805, 0.19445, 0],
      8748: [0.306, 0.805, 0.19445, 0],
      8749: [0.306, 0.805, 0.19445, 0],
      8750: [0.30612, 0.805, 0.19445, 0],
      8896: [0.25001, 0.75, 0, 0],
      8897: [0.25001, 0.75, 0, 0],
      8898: [0.25001, 0.75, 0, 0],
      8899: [0.25001, 0.75, 0, 0],
      8968: [0.35001, 0.85, 0, 0],
      8969: [0.35001, 0.85, 0, 0],
      8970: [0.35001, 0.85, 0, 0],
      8971: [0.35001, 0.85, 0, 0],
      9168: [-99e-5, 0.601, 0, 0],
      10216: [0.35001, 0.85, 0, 0],
      10217: [0.35001, 0.85, 0, 0],
      10752: [0.25001, 0.75, 0, 0],
      10753: [0.25001, 0.75, 0, 0],
      10754: [0.25001, 0.75, 0, 0],
      10756: [0.25001, 0.75, 0, 0],
      10758: [0.25001, 0.75, 0, 0]
    },
    "Size2-Regular": {
      40: [0.65002, 1.15, 0, 0],
      41: [0.65002, 1.15, 0, 0],
      47: [0.65002, 1.15, 0, 0],
      91: [0.65002, 1.15, 0, 0],
      92: [0.65002, 1.15, 0, 0],
      93: [0.65002, 1.15, 0, 0],
      123: [0.65002, 1.15, 0, 0],
      125: [0.65002, 1.15, 0, 0],
      710: [0, 0.75, 0, 0],
      732: [0, 0.75, 0, 0],
      770: [0, 0.75, 0, 0],
      771: [0, 0.75, 0, 0],
      8719: [0.55001, 1.05, 0, 0],
      8720: [0.55001, 1.05, 0, 0],
      8721: [0.55001, 1.05, 0, 0],
      8730: [0.65002, 1.15, 0, 0],
      8747: [0.86225, 1.36, 0.44445, 0],
      8748: [0.862, 1.36, 0.44445, 0],
      8749: [0.862, 1.36, 0.44445, 0],
      8750: [0.86225, 1.36, 0.44445, 0],
      8896: [0.55001, 1.05, 0, 0],
      8897: [0.55001, 1.05, 0, 0],
      8898: [0.55001, 1.05, 0, 0],
      8899: [0.55001, 1.05, 0, 0],
      8968: [0.65002, 1.15, 0, 0],
      8969: [0.65002, 1.15, 0, 0],
      8970: [0.65002, 1.15, 0, 0],
      8971: [0.65002, 1.15, 0, 0],
      10216: [0.65002, 1.15, 0, 0],
      10217: [0.65002, 1.15, 0, 0],
      10752: [0.55001, 1.05, 0, 0],
      10753: [0.55001, 1.05, 0, 0],
      10754: [0.55001, 1.05, 0, 0],
      10756: [0.55001, 1.05, 0, 0],
      10758: [0.55001, 1.05, 0, 0]
    },
    "Size3-Regular": {
      40: [0.95003, 1.45, 0, 0],
      41: [0.95003, 1.45, 0, 0],
      47: [0.95003, 1.45, 0, 0],
      91: [0.95003, 1.45, 0, 0],
      92: [0.95003, 1.45, 0, 0],
      93: [0.95003, 1.45, 0, 0],
      123: [0.95003, 1.45, 0, 0],
      125: [0.95003, 1.45, 0, 0],
      710: [0, 0.75, 0, 0],
      732: [0, 0.75, 0, 0],
      770: [0, 0.75, 0, 0],
      771: [0, 0.75, 0, 0],
      8730: [0.95003, 1.45, 0, 0],
      8968: [0.95003, 1.45, 0, 0],
      8969: [0.95003, 1.45, 0, 0],
      8970: [0.95003, 1.45, 0, 0],
      8971: [0.95003, 1.45, 0, 0],
      10216: [0.95003, 1.45, 0, 0],
      10217: [0.95003, 1.45, 0, 0]
    },
    "Size4-Regular": {
      40: [1.25003, 1.75, 0, 0],
      41: [1.25003, 1.75, 0, 0],
      47: [1.25003, 1.75, 0, 0],
      91: [1.25003, 1.75, 0, 0],
      92: [1.25003, 1.75, 0, 0],
      93: [1.25003, 1.75, 0, 0],
      123: [1.25003, 1.75, 0, 0],
      125: [1.25003, 1.75, 0, 0],
      710: [0, 0.825, 0, 0],
      732: [0, 0.825, 0, 0],
      770: [0, 0.825, 0, 0],
      771: [0, 0.825, 0, 0],
      8730: [1.25003, 1.75, 0, 0],
      8968: [1.25003, 1.75, 0, 0],
      8969: [1.25003, 1.75, 0, 0],
      8970: [1.25003, 1.75, 0, 0],
      8971: [1.25003, 1.75, 0, 0],
      9115: [0.64502, 1.155, 0, 0],
      9116: [1e-5, 0.6, 0, 0],
      9117: [0.64502, 1.155, 0, 0],
      9118: [0.64502, 1.155, 0, 0],
      9119: [1e-5, 0.6, 0, 0],
      9120: [0.64502, 1.155, 0, 0],
      9121: [0.64502, 1.155, 0, 0],
      9122: [-99e-5, 0.601, 0, 0],
      9123: [0.64502, 1.155, 0, 0],
      9124: [0.64502, 1.155, 0, 0],
      9125: [-99e-5, 0.601, 0, 0],
      9126: [0.64502, 1.155, 0, 0],
      9127: [1e-5, 0.9, 0, 0],
      9128: [0.65002, 1.15, 0, 0],
      9129: [0.90001, 0, 0, 0],
      9130: [0, 0.3, 0, 0],
      9131: [1e-5, 0.9, 0, 0],
      9132: [0.65002, 1.15, 0, 0],
      9133: [0.90001, 0, 0, 0],
      9143: [0.88502, 0.915, 0, 0],
      10216: [1.25003, 1.75, 0, 0],
      10217: [1.25003, 1.75, 0, 0],
      57344: [-499e-5, 0.605, 0, 0],
      57345: [-499e-5, 0.605, 0, 0],
      57680: [0, 0.12, 0, 0],
      57681: [0, 0.12, 0, 0],
      57682: [0, 0.12, 0, 0],
      57683: [0, 0.12, 0, 0]
    },
    "Typewriter-Regular": {
      33: [0, 0.61111, 0, 0],
      34: [0, 0.61111, 0, 0],
      35: [0, 0.61111, 0, 0],
      36: [0.08333, 0.69444, 0, 0],
      37: [0.08333, 0.69444, 0, 0],
      38: [0, 0.61111, 0, 0],
      39: [0, 0.61111, 0, 0],
      40: [0.08333, 0.69444, 0, 0],
      41: [0.08333, 0.69444, 0, 0],
      42: [0, 0.52083, 0, 0],
      43: [-0.08056, 0.53055, 0, 0],
      44: [0.13889, 0.125, 0, 0],
      45: [-0.08056, 0.53055, 0, 0],
      46: [0, 0.125, 0, 0],
      47: [0.08333, 0.69444, 0, 0],
      48: [0, 0.61111, 0, 0],
      49: [0, 0.61111, 0, 0],
      50: [0, 0.61111, 0, 0],
      51: [0, 0.61111, 0, 0],
      52: [0, 0.61111, 0, 0],
      53: [0, 0.61111, 0, 0],
      54: [0, 0.61111, 0, 0],
      55: [0, 0.61111, 0, 0],
      56: [0, 0.61111, 0, 0],
      57: [0, 0.61111, 0, 0],
      58: [0, 0.43056, 0, 0],
      59: [0.13889, 0.43056, 0, 0],
      60: [-0.05556, 0.55556, 0, 0],
      61: [-0.19549, 0.41562, 0, 0],
      62: [-0.05556, 0.55556, 0, 0],
      63: [0, 0.61111, 0, 0],
      64: [0, 0.61111, 0, 0],
      65: [0, 0.61111, 0, 0],
      66: [0, 0.61111, 0, 0],
      67: [0, 0.61111, 0, 0],
      68: [0, 0.61111, 0, 0],
      69: [0, 0.61111, 0, 0],
      70: [0, 0.61111, 0, 0],
      71: [0, 0.61111, 0, 0],
      72: [0, 0.61111, 0, 0],
      73: [0, 0.61111, 0, 0],
      74: [0, 0.61111, 0, 0],
      75: [0, 0.61111, 0, 0],
      76: [0, 0.61111, 0, 0],
      77: [0, 0.61111, 0, 0],
      78: [0, 0.61111, 0, 0],
      79: [0, 0.61111, 0, 0],
      80: [0, 0.61111, 0, 0],
      81: [0.13889, 0.61111, 0, 0],
      82: [0, 0.61111, 0, 0],
      83: [0, 0.61111, 0, 0],
      84: [0, 0.61111, 0, 0],
      85: [0, 0.61111, 0, 0],
      86: [0, 0.61111, 0, 0],
      87: [0, 0.61111, 0, 0],
      88: [0, 0.61111, 0, 0],
      89: [0, 0.61111, 0, 0],
      90: [0, 0.61111, 0, 0],
      91: [0.08333, 0.69444, 0, 0],
      92: [0.08333, 0.69444, 0, 0],
      93: [0.08333, 0.69444, 0, 0],
      94: [0, 0.61111, 0, 0],
      95: [0.09514, 0, 0, 0],
      96: [0, 0.61111, 0, 0],
      97: [0, 0.43056, 0, 0],
      98: [0, 0.61111, 0, 0],
      99: [0, 0.43056, 0, 0],
      100: [0, 0.61111, 0, 0],
      101: [0, 0.43056, 0, 0],
      102: [0, 0.61111, 0, 0],
      103: [0.22222, 0.43056, 0, 0],
      104: [0, 0.61111, 0, 0],
      105: [0, 0.61111, 0, 0],
      106: [0.22222, 0.61111, 0, 0],
      107: [0, 0.61111, 0, 0],
      108: [0, 0.61111, 0, 0],
      109: [0, 0.43056, 0, 0],
      110: [0, 0.43056, 0, 0],
      111: [0, 0.43056, 0, 0],
      112: [0.22222, 0.43056, 0, 0],
      113: [0.22222, 0.43056, 0, 0],
      114: [0, 0.43056, 0, 0],
      115: [0, 0.43056, 0, 0],
      116: [0, 0.55358, 0, 0],
      117: [0, 0.43056, 0, 0],
      118: [0, 0.43056, 0, 0],
      119: [0, 0.43056, 0, 0],
      120: [0, 0.43056, 0, 0],
      121: [0.22222, 0.43056, 0, 0],
      122: [0, 0.43056, 0, 0],
      123: [0.08333, 0.69444, 0, 0],
      124: [0.08333, 0.69444, 0, 0],
      125: [0.08333, 0.69444, 0, 0],
      126: [0, 0.61111, 0, 0],
      127: [0, 0.61111, 0, 0],
      305: [0, 0.43056, 0, 0],
      567: [0.22222, 0.43056, 0, 0],
      768: [0, 0.61111, 0, 0],
      769: [0, 0.61111, 0, 0],
      770: [0, 0.61111, 0, 0],
      771: [0, 0.61111, 0, 0],
      772: [0, 0.56555, 0, 0],
      774: [0, 0.61111, 0, 0],
      776: [0, 0.61111, 0, 0],
      778: [0, 0.61111, 0, 0],
      780: [0, 0.56597, 0, 0],
      915: [0, 0.61111, 0, 0],
      916: [0, 0.61111, 0, 0],
      920: [0, 0.61111, 0, 0],
      923: [0, 0.61111, 0, 0],
      926: [0, 0.61111, 0, 0],
      928: [0, 0.61111, 0, 0],
      931: [0, 0.61111, 0, 0],
      933: [0, 0.61111, 0, 0],
      934: [0, 0.61111, 0, 0],
      936: [0, 0.61111, 0, 0],
      937: [0, 0.61111, 0, 0],
      2018: [0, 0.61111, 0, 0],
      2019: [0, 0.61111, 0, 0],
      8242: [0, 0.61111, 0, 0]
    }
  }), ut;
}
var nt, ku;
function h0() {
  if (ku) return nt;
  ku = 1;
  var e = O0(), t = 0.431, u = 1, i = 0.677, r = 0.394, n = 0.444, c = 0.686, a = 0.345, s = 0.413, l = 0.363, f = 0.289, m = 0.15, _ = 0.247, y = 0.386, o = 0.05, p = 2.39, d = 1.01, k = 0.81, h = 0.71, b = 0.25, w = 0.04, g = 0.111, x = 0.166, A = 0.2, C = 0.6, D = 0.1, E = 10, O = 2 / E, M = {
    xHeight: t,
    quad: u,
    num1: i,
    num2: r,
    num3: n,
    denom1: c,
    denom2: a,
    sup1: s,
    sup2: l,
    sup3: f,
    sub1: m,
    sub2: _,
    supDrop: y,
    subDrop: o,
    axisHeight: b,
    defaultRuleThickness: w,
    bigOpSpacing1: g,
    bigOpSpacing2: x,
    bigOpSpacing3: A,
    bigOpSpacing4: C,
    bigOpSpacing5: D,
    ptPerEm: E,
    emPerEx: t / u,
    doubleRuleSep: O,
    // TODO(alpert): Missing parallel structure here. We should probably add
    // style-specific metrics for all of these.
    delim1: p,
    getDelim2: function(T) {
      if (T.size === e.TEXT.size)
        return d;
      if (T.size === e.SCRIPT.size)
        return k;
      if (T.size === e.SCRIPTSCRIPT.size)
        return h;
      throw new Error("Unexpected style size: " + T.size);
    }
  }, I = ro(), B = function(T, $) {
    var z = I[$][T.charCodeAt(0)];
    if (z)
      return {
        depth: z[0],
        height: z[1],
        italic: z[2],
        skew: z[3],
        width: z[4]
      };
  };
  return nt = {
    metrics: M,
    getCharacterMetrics: B
  }, nt;
}
var rt = { exports: {} }, wu;
function z0() {
  return wu || (wu = 1, function(e) {
    e.exports = {
      math: {},
      text: {}
    };
    function t(x, A, C, D, E) {
      e.exports[x][E] = {
        font: A,
        group: C,
        replace: D
      };
    }
    var u = "math", i = "text", r = "main", n = "ams", c = "accent", a = "bin", s = "close", l = "inner", f = "mathord", m = "op", _ = "open", y = "punct", o = "rel", p = "spacing", d = "textord";
    t(u, r, o, "≡", "\\equiv"), t(u, r, o, "≺", "\\prec"), t(u, r, o, "≻", "\\succ"), t(u, r, o, "∼", "\\sim"), t(u, r, o, "⊥", "\\perp"), t(u, r, o, "⪯", "\\preceq"), t(u, r, o, "⪰", "\\succeq"), t(u, r, o, "≃", "\\simeq"), t(u, r, o, "∣", "\\mid"), t(u, r, o, "≪", "\\ll"), t(u, r, o, "≫", "\\gg"), t(u, r, o, "≍", "\\asymp"), t(u, r, o, "∥", "\\parallel"), t(u, r, o, "⋈", "\\bowtie"), t(u, r, o, "⌣", "\\smile"), t(u, r, o, "⊑", "\\sqsubseteq"), t(u, r, o, "⊒", "\\sqsupseteq"), t(u, r, o, "≐", "\\doteq"), t(u, r, o, "⌢", "\\frown"), t(u, r, o, "∋", "\\ni"), t(u, r, o, "∝", "\\propto"), t(u, r, o, "⊢", "\\vdash"), t(u, r, o, "⊣", "\\dashv"), t(u, r, o, "∋", "\\owns"), t(u, r, y, ".", "\\ldotp"), t(u, r, y, "⋅", "\\cdotp"), t(u, r, d, "#", "\\#"), t(u, r, d, "&", "\\&"), t(u, r, d, "ℵ", "\\aleph"), t(u, r, d, "∀", "\\forall"), t(u, r, d, "ℏ", "\\hbar"), t(u, r, d, "∃", "\\exists"), t(u, r, d, "∇", "\\nabla"), t(u, r, d, "♭", "\\flat"), t(u, r, d, "ℓ", "\\ell"), t(u, r, d, "♮", "\\natural"), t(u, r, d, "♣", "\\clubsuit"), t(u, r, d, "℘", "\\wp"), t(u, r, d, "♯", "\\sharp"), t(u, r, d, "♢", "\\diamondsuit"), t(u, r, d, "ℜ", "\\Re"), t(u, r, d, "♡", "\\heartsuit"), t(u, r, d, "ℑ", "\\Im"), t(u, r, d, "♠", "\\spadesuit"), t(u, r, d, "†", "\\dag"), t(u, r, d, "‡", "\\ddag"), t(u, r, s, "⎱", "\\rmoustache"), t(u, r, _, "⎰", "\\lmoustache"), t(u, r, s, "⟯", "\\rgroup"), t(u, r, _, "⟮", "\\lgroup"), t(u, r, a, "∓", "\\mp"), t(u, r, a, "⊖", "\\ominus"), t(u, r, a, "⊎", "\\uplus"), t(u, r, a, "⊓", "\\sqcap"), t(u, r, a, "∗", "\\ast"), t(u, r, a, "⊔", "\\sqcup"), t(u, r, a, "◯", "\\bigcirc"), t(u, r, a, "∙", "\\bullet"), t(u, r, a, "‡", "\\ddagger"), t(u, r, a, "≀", "\\wr"), t(u, r, a, "⨿", "\\amalg"), t(u, r, o, "⟵", "\\longleftarrow"), t(u, r, o, "⇐", "\\Leftarrow"), t(u, r, o, "⟸", "\\Longleftarrow"), t(u, r, o, "⟶", "\\longrightarrow"), t(u, r, o, "⇒", "\\Rightarrow"), t(u, r, o, "⟹", "\\Longrightarrow"), t(u, r, o, "↔", "\\leftrightarrow"), t(u, r, o, "⟷", "\\longleftrightarrow"), t(u, r, o, "⇔", "\\Leftrightarrow"), t(u, r, o, "⟺", "\\Longleftrightarrow"), t(u, r, o, "↦", "\\mapsto"), t(u, r, o, "⟼", "\\longmapsto"), t(u, r, o, "↗", "\\nearrow"), t(u, r, o, "↩", "\\hookleftarrow"), t(u, r, o, "↪", "\\hookrightarrow"), t(u, r, o, "↘", "\\searrow"), t(u, r, o, "↼", "\\leftharpoonup"), t(u, r, o, "⇀", "\\rightharpoonup"), t(u, r, o, "↙", "\\swarrow"), t(u, r, o, "↽", "\\leftharpoondown"), t(u, r, o, "⇁", "\\rightharpoondown"), t(u, r, o, "↖", "\\nwarrow"), t(u, r, o, "⇌", "\\rightleftharpoons"), t(u, n, o, "≮", "\\nless"), t(u, n, o, "", "\\nleqslant"), t(u, n, o, "", "\\nleqq"), t(u, n, o, "⪇", "\\lneq"), t(u, n, o, "≨", "\\lneqq"), t(u, n, o, "", "\\lvertneqq"), t(u, n, o, "⋦", "\\lnsim"), t(u, n, o, "⪉", "\\lnapprox"), t(u, n, o, "⊀", "\\nprec"), t(u, n, o, "⋠", "\\npreceq"), t(u, n, o, "⋨", "\\precnsim"), t(u, n, o, "⪹", "\\precnapprox"), t(u, n, o, "≁", "\\nsim"), t(u, n, o, "", "\\nshortmid"), t(u, n, o, "∤", "\\nmid"), t(u, n, o, "⊬", "\\nvdash"), t(u, n, o, "⊭", "\\nvDash"), t(u, n, o, "⋪", "\\ntriangleleft"), t(u, n, o, "⋬", "\\ntrianglelefteq"), t(u, n, o, "⊊", "\\subsetneq"), t(u, n, o, "", "\\varsubsetneq"), t(u, n, o, "⫋", "\\subsetneqq"), t(u, n, o, "", "\\varsubsetneqq"), t(u, n, o, "≯", "\\ngtr"), t(u, n, o, "", "\\ngeqslant"), t(u, n, o, "", "\\ngeqq"), t(u, n, o, "⪈", "\\gneq"), t(u, n, o, "≩", "\\gneqq"), t(u, n, o, "", "\\gvertneqq"), t(u, n, o, "⋧", "\\gnsim"), t(u, n, o, "⪊", "\\gnapprox"), t(u, n, o, "⊁", "\\nsucc"), t(u, n, o, "⋡", "\\nsucceq"), t(u, n, o, "⋩", "\\succnsim"), t(u, n, o, "⪺", "\\succnapprox"), t(u, n, o, "≆", "\\ncong"), t(u, n, o, "", "\\nshortparallel"), t(u, n, o, "∦", "\\nparallel"), t(u, n, o, "⊯", "\\nVDash"), t(u, n, o, "⋫", "\\ntriangleright"), t(u, n, o, "⋭", "\\ntrianglerighteq"), t(u, n, o, "", "\\nsupseteqq"), t(u, n, o, "⊋", "\\supsetneq"), t(u, n, o, "", "\\varsupsetneq"), t(u, n, o, "⫌", "\\supsetneqq"), t(u, n, o, "", "\\varsupsetneqq"), t(u, n, o, "⊮", "\\nVdash"), t(u, n, o, "⪵", "\\precneqq"), t(u, n, o, "⪶", "\\succneqq"), t(u, n, o, "", "\\nsubseteqq"), t(u, n, a, "⊴", "\\unlhd"), t(u, n, a, "⊵", "\\unrhd"), t(u, n, o, "↚", "\\nleftarrow"), t(u, n, o, "↛", "\\nrightarrow"), t(u, n, o, "⇍", "\\nLeftarrow"), t(u, n, o, "⇏", "\\nRightarrow"), t(u, n, o, "↮", "\\nleftrightarrow"), t(u, n, o, "⇎", "\\nLeftrightarrow"), t(u, n, o, "△", "\\vartriangle"), t(u, n, d, "ℏ", "\\hslash"), t(u, n, d, "▽", "\\triangledown"), t(u, n, d, "◊", "\\lozenge"), t(u, n, d, "Ⓢ", "\\circledS"), t(u, n, d, "®", "\\circledR"), t(u, n, d, "∡", "\\measuredangle"), t(u, n, d, "∄", "\\nexists"), t(u, n, d, "℧", "\\mho"), t(u, n, d, "Ⅎ", "\\Finv"), t(u, n, d, "⅁", "\\Game"), t(u, n, d, "k", "\\Bbbk"), t(u, n, d, "‵", "\\backprime"), t(u, n, d, "▲", "\\blacktriangle"), t(u, n, d, "▼", "\\blacktriangledown"), t(u, n, d, "■", "\\blacksquare"), t(u, n, d, "⧫", "\\blacklozenge"), t(u, n, d, "★", "\\bigstar"), t(u, n, d, "∢", "\\sphericalangle"), t(u, n, d, "∁", "\\complement"), t(u, n, d, "ð", "\\eth"), t(u, n, d, "╱", "\\diagup"), t(u, n, d, "╲", "\\diagdown"), t(u, n, d, "□", "\\square"), t(u, n, d, "□", "\\Box"), t(u, n, d, "◊", "\\Diamond"), t(u, n, d, "¥", "\\yen"), t(u, n, d, "✓", "\\checkmark"), t(u, n, d, "ℶ", "\\beth"), t(u, n, d, "ℸ", "\\daleth"), t(u, n, d, "ℷ", "\\gimel"), t(u, n, d, "ϝ", "\\digamma"), t(u, n, d, "ϰ", "\\varkappa"), t(u, n, _, "┌", "\\ulcorner"), t(u, n, s, "┐", "\\urcorner"), t(u, n, _, "└", "\\llcorner"), t(u, n, s, "┘", "\\lrcorner"), t(u, n, o, "≦", "\\leqq"), t(u, n, o, "⩽", "\\leqslant"), t(u, n, o, "⪕", "\\eqslantless"), t(u, n, o, "≲", "\\lesssim"), t(u, n, o, "⪅", "\\lessapprox"), t(u, n, o, "≊", "\\approxeq"), t(u, n, a, "⋖", "\\lessdot"), t(u, n, o, "⋘", "\\lll"), t(u, n, o, "≶", "\\lessgtr"), t(u, n, o, "⋚", "\\lesseqgtr"), t(u, n, o, "⪋", "\\lesseqqgtr"), t(u, n, o, "≑", "\\doteqdot"), t(u, n, o, "≓", "\\risingdotseq"), t(u, n, o, "≒", "\\fallingdotseq"), t(u, n, o, "∽", "\\backsim"), t(u, n, o, "⋍", "\\backsimeq"), t(u, n, o, "⫅", "\\subseteqq"), t(u, n, o, "⋐", "\\Subset"), t(u, n, o, "⊏", "\\sqsubset"), t(u, n, o, "≼", "\\preccurlyeq"), t(u, n, o, "⋞", "\\curlyeqprec"), t(u, n, o, "≾", "\\precsim"), t(u, n, o, "⪷", "\\precapprox"), t(u, n, o, "⊲", "\\vartriangleleft"), t(u, n, o, "⊴", "\\trianglelefteq"), t(u, n, o, "⊨", "\\vDash"), t(u, n, o, "⊪", "\\Vvdash"), t(u, n, o, "⌣", "\\smallsmile"), t(u, n, o, "⌢", "\\smallfrown"), t(u, n, o, "≏", "\\bumpeq"), t(u, n, o, "≎", "\\Bumpeq"), t(u, n, o, "≧", "\\geqq"), t(u, n, o, "⩾", "\\geqslant"), t(u, n, o, "⪖", "\\eqslantgtr"), t(u, n, o, "≳", "\\gtrsim"), t(u, n, o, "⪆", "\\gtrapprox"), t(u, n, a, "⋗", "\\gtrdot"), t(u, n, o, "⋙", "\\ggg"), t(u, n, o, "≷", "\\gtrless"), t(u, n, o, "⋛", "\\gtreqless"), t(u, n, o, "⪌", "\\gtreqqless"), t(u, n, o, "≖", "\\eqcirc"), t(u, n, o, "≗", "\\circeq"), t(u, n, o, "≜", "\\triangleq"), t(u, n, o, "∼", "\\thicksim"), t(u, n, o, "≈", "\\thickapprox"), t(u, n, o, "⫆", "\\supseteqq"), t(u, n, o, "⋑", "\\Supset"), t(u, n, o, "⊐", "\\sqsupset"), t(u, n, o, "≽", "\\succcurlyeq"), t(u, n, o, "⋟", "\\curlyeqsucc"), t(u, n, o, "≿", "\\succsim"), t(u, n, o, "⪸", "\\succapprox"), t(u, n, o, "⊳", "\\vartriangleright"), t(u, n, o, "⊵", "\\trianglerighteq"), t(u, n, o, "⊩", "\\Vdash"), t(u, n, o, "∣", "\\shortmid"), t(u, n, o, "∥", "\\shortparallel"), t(u, n, o, "≬", "\\between"), t(u, n, o, "⋔", "\\pitchfork"), t(u, n, o, "∝", "\\varpropto"), t(u, n, o, "◀", "\\blacktriangleleft"), t(u, n, o, "∴", "\\therefore"), t(u, n, o, "∍", "\\backepsilon"), t(u, n, o, "▶", "\\blacktriangleright"), t(u, n, o, "∵", "\\because"), t(u, n, o, "⋘", "\\llless"), t(u, n, o, "⋙", "\\gggtr"), t(u, n, a, "⊲", "\\lhd"), t(u, n, a, "⊳", "\\rhd"), t(u, n, o, "≂", "\\eqsim"), t(u, r, o, "⋈", "\\Join"), t(u, n, o, "≑", "\\Doteq"), t(u, n, a, "∔", "\\dotplus"), t(u, n, a, "∖", "\\smallsetminus"), t(u, n, a, "⋒", "\\Cap"), t(u, n, a, "⋓", "\\Cup"), t(u, n, a, "⩞", "\\doublebarwedge"), t(u, n, a, "⊟", "\\boxminus"), t(u, n, a, "⊞", "\\boxplus"), t(u, n, a, "⋇", "\\divideontimes"), t(u, n, a, "⋉", "\\ltimes"), t(u, n, a, "⋊", "\\rtimes"), t(u, n, a, "⋋", "\\leftthreetimes"), t(u, n, a, "⋌", "\\rightthreetimes"), t(u, n, a, "⋏", "\\curlywedge"), t(u, n, a, "⋎", "\\curlyvee"), t(u, n, a, "⊝", "\\circleddash"), t(u, n, a, "⊛", "\\circledast"), t(u, n, a, "⋅", "\\centerdot"), t(u, n, a, "⊺", "\\intercal"), t(u, n, a, "⋒", "\\doublecap"), t(u, n, a, "⋓", "\\doublecup"), t(u, n, a, "⊠", "\\boxtimes"), t(u, n, o, "⇢", "\\dashrightarrow"), t(u, n, o, "⇠", "\\dashleftarrow"), t(u, n, o, "⇇", "\\leftleftarrows"), t(u, n, o, "⇆", "\\leftrightarrows"), t(u, n, o, "⇚", "\\Lleftarrow"), t(u, n, o, "↞", "\\twoheadleftarrow"), t(u, n, o, "↢", "\\leftarrowtail"), t(u, n, o, "↫", "\\looparrowleft"), t(u, n, o, "⇋", "\\leftrightharpoons"), t(u, n, o, "↶", "\\curvearrowleft"), t(u, n, o, "↺", "\\circlearrowleft"), t(u, n, o, "↰", "\\Lsh"), t(u, n, o, "⇈", "\\upuparrows"), t(u, n, o, "↿", "\\upharpoonleft"), t(u, n, o, "⇃", "\\downharpoonleft"), t(u, n, o, "⊸", "\\multimap"), t(u, n, o, "↭", "\\leftrightsquigarrow"), t(u, n, o, "⇉", "\\rightrightarrows"), t(u, n, o, "⇄", "\\rightleftarrows"), t(u, n, o, "↠", "\\twoheadrightarrow"), t(u, n, o, "↣", "\\rightarrowtail"), t(u, n, o, "↬", "\\looparrowright"), t(u, n, o, "↷", "\\curvearrowright"), t(u, n, o, "↻", "\\circlearrowright"), t(u, n, o, "↱", "\\Rsh"), t(u, n, o, "⇊", "\\downdownarrows"), t(u, n, o, "↾", "\\upharpoonright"), t(u, n, o, "⇂", "\\downharpoonright"), t(u, n, o, "⇝", "\\rightsquigarrow"), t(u, n, o, "⇝", "\\leadsto"), t(u, n, o, "⇛", "\\Rrightarrow"), t(u, n, o, "↾", "\\restriction"), t(u, r, d, "‘", "`"), t(u, r, d, "$", "\\$"), t(u, r, d, "%", "\\%"), t(u, r, d, "_", "\\_"), t(u, r, d, "∠", "\\angle"), t(u, r, d, "∞", "\\infty"), t(u, r, d, "′", "\\prime"), t(u, r, d, "△", "\\triangle"), t(u, r, d, "Γ", "\\Gamma"), t(u, r, d, "Δ", "\\Delta"), t(u, r, d, "Θ", "\\Theta"), t(u, r, d, "Λ", "\\Lambda"), t(u, r, d, "Ξ", "\\Xi"), t(u, r, d, "Π", "\\Pi"), t(u, r, d, "Σ", "\\Sigma"), t(u, r, d, "Υ", "\\Upsilon"), t(u, r, d, "Φ", "\\Phi"), t(u, r, d, "Ψ", "\\Psi"), t(u, r, d, "Ω", "\\Omega"), t(u, r, d, "¬", "\\neg"), t(u, r, d, "¬", "\\lnot"), t(u, r, d, "⊤", "\\top"), t(u, r, d, "⊥", "\\bot"), t(u, r, d, "∅", "\\emptyset"), t(u, n, d, "∅", "\\varnothing"), t(u, r, f, "α", "\\alpha"), t(u, r, f, "β", "\\beta"), t(u, r, f, "γ", "\\gamma"), t(u, r, f, "δ", "\\delta"), t(u, r, f, "ϵ", "\\epsilon"), t(u, r, f, "ζ", "\\zeta"), t(u, r, f, "η", "\\eta"), t(u, r, f, "θ", "\\theta"), t(u, r, f, "ι", "\\iota"), t(u, r, f, "κ", "\\kappa"), t(u, r, f, "λ", "\\lambda"), t(u, r, f, "μ", "\\mu"), t(u, r, f, "ν", "\\nu"), t(u, r, f, "ξ", "\\xi"), t(u, r, f, "o", "\\omicron"), t(u, r, f, "π", "\\pi"), t(u, r, f, "ρ", "\\rho"), t(u, r, f, "σ", "\\sigma"), t(u, r, f, "τ", "\\tau"), t(u, r, f, "υ", "\\upsilon"), t(u, r, f, "ϕ", "\\phi"), t(u, r, f, "χ", "\\chi"), t(u, r, f, "ψ", "\\psi"), t(u, r, f, "ω", "\\omega"), t(u, r, f, "ε", "\\varepsilon"), t(u, r, f, "ϑ", "\\vartheta"), t(u, r, f, "ϖ", "\\varpi"), t(u, r, f, "ϱ", "\\varrho"), t(u, r, f, "ς", "\\varsigma"), t(u, r, f, "φ", "\\varphi"), t(u, r, a, "∗", "*"), t(u, r, a, "+", "+"), t(u, r, a, "−", "-"), t(u, r, a, "⋅", "\\cdot"), t(u, r, a, "∘", "\\circ"), t(u, r, a, "÷", "\\div"), t(u, r, a, "±", "\\pm"), t(u, r, a, "×", "\\times"), t(u, r, a, "∩", "\\cap"), t(u, r, a, "∪", "\\cup"), t(u, r, a, "∖", "\\setminus"), t(u, r, a, "∧", "\\land"), t(u, r, a, "∨", "\\lor"), t(u, r, a, "∧", "\\wedge"), t(u, r, a, "∨", "\\vee"), t(u, r, d, "√", "\\surd"), t(u, r, _, "(", "("), t(u, r, _, "[", "["), t(u, r, _, "⟨", "\\langle"), t(u, r, _, "∣", "\\lvert"), t(u, r, _, "∥", "\\lVert"), t(u, r, s, ")", ")"), t(u, r, s, "]", "]"), t(u, r, s, "?", "?"), t(u, r, s, "!", "!"), t(u, r, s, "⟩", "\\rangle"), t(u, r, s, "∣", "\\rvert"), t(u, r, s, "∥", "\\rVert"), t(u, r, o, "=", "="), t(u, r, o, "<", "<"), t(u, r, o, ">", ">"), t(u, r, o, ":", ":"), t(u, r, o, "≈", "\\approx"), t(u, r, o, "≅", "\\cong"), t(u, r, o, "≥", "\\ge"), t(u, r, o, "≥", "\\geq"), t(u, r, o, "←", "\\gets"), t(u, r, o, ">", "\\gt"), t(u, r, o, "∈", "\\in"), t(u, r, o, "∉", "\\notin"), t(u, r, o, "⊂", "\\subset"), t(u, r, o, "⊃", "\\supset"), t(u, r, o, "⊆", "\\subseteq"), t(u, r, o, "⊇", "\\supseteq"), t(u, n, o, "⊈", "\\nsubseteq"), t(u, n, o, "⊉", "\\nsupseteq"), t(u, r, o, "⊨", "\\models"), t(u, r, o, "←", "\\leftarrow"), t(u, r, o, "≤", "\\le"), t(u, r, o, "≤", "\\leq"), t(u, r, o, "<", "\\lt"), t(u, r, o, "≠", "\\ne"), t(u, r, o, "≠", "\\neq"), t(u, r, o, "→", "\\rightarrow"), t(u, r, o, "→", "\\to"), t(u, n, o, "≱", "\\ngeq"), t(u, n, o, "≰", "\\nleq"), t(u, r, p, null, "\\!"), t(u, r, p, " ", "\\ "), t(u, r, p, " ", "~"), t(u, r, p, null, "\\,"), t(u, r, p, null, "\\:"), t(u, r, p, null, "\\;"), t(u, r, p, null, "\\enspace"), t(u, r, p, null, "\\qquad"), t(u, r, p, null, "\\quad"), t(u, r, p, " ", "\\space"), t(u, r, y, ",", ","), t(u, r, y, ";", ";"), t(u, r, y, ":", "\\colon"), t(u, n, a, "⊼", "\\barwedge"), t(u, n, a, "⊻", "\\veebar"), t(u, r, a, "⊙", "\\odot"), t(u, r, a, "⊕", "\\oplus"), t(u, r, a, "⊗", "\\otimes"), t(u, r, d, "∂", "\\partial"), t(u, r, a, "⊘", "\\oslash"), t(u, n, a, "⊚", "\\circledcirc"), t(u, n, a, "⊡", "\\boxdot"), t(u, r, a, "△", "\\bigtriangleup"), t(u, r, a, "▽", "\\bigtriangledown"), t(u, r, a, "†", "\\dagger"), t(u, r, a, "⋄", "\\diamond"), t(u, r, a, "⋆", "\\star"), t(u, r, a, "◃", "\\triangleleft"), t(u, r, a, "▹", "\\triangleright"), t(u, r, _, "{", "\\{"), t(u, r, s, "}", "\\}"), t(u, r, _, "{", "\\lbrace"), t(u, r, s, "}", "\\rbrace"), t(u, r, _, "[", "\\lbrack"), t(u, r, s, "]", "\\rbrack"), t(u, r, _, "⌊", "\\lfloor"), t(u, r, s, "⌋", "\\rfloor"), t(u, r, _, "⌈", "\\lceil"), t(u, r, s, "⌉", "\\rceil"), t(u, r, d, "\\", "\\backslash"), t(u, r, d, "∣", "|"), t(u, r, d, "∣", "\\vert"), t(u, r, d, "∥", "\\|"), t(u, r, d, "∥", "\\Vert"), t(u, r, o, "↑", "\\uparrow"), t(u, r, o, "⇑", "\\Uparrow"), t(u, r, o, "↓", "\\downarrow"), t(u, r, o, "⇓", "\\Downarrow"), t(u, r, o, "↕", "\\updownarrow"), t(u, r, o, "⇕", "\\Updownarrow"), t(u, u, m, "∐", "\\coprod"), t(u, u, m, "⋁", "\\bigvee"), t(u, u, m, "⋀", "\\bigwedge"), t(u, u, m, "⨄", "\\biguplus"), t(u, u, m, "⋂", "\\bigcap"), t(u, u, m, "⋃", "\\bigcup"), t(u, u, m, "∫", "\\int"), t(u, u, m, "∫", "\\intop"), t(u, u, m, "∬", "\\iint"), t(u, u, m, "∭", "\\iiint"), t(u, u, m, "∏", "\\prod"), t(u, u, m, "∑", "\\sum"), t(u, u, m, "⨂", "\\bigotimes"), t(u, u, m, "⨁", "\\bigoplus"), t(u, u, m, "⨀", "\\bigodot"), t(u, u, m, "∮", "\\oint"), t(u, u, m, "⨆", "\\bigsqcup"), t(u, u, m, "∫", "\\smallint"), t(u, r, l, "…", "\\ldots"), t(u, r, l, "⋯", "\\cdots"), t(u, r, l, "⋱", "\\ddots"), t(u, r, d, "⋮", "\\vdots"), t(u, r, c, "´", "\\acute"), t(u, r, c, "`", "\\grave"), t(u, r, c, "¨", "\\ddot"), t(u, r, c, "~", "\\tilde"), t(u, r, c, "¯", "\\bar"), t(u, r, c, "˘", "\\breve"), t(u, r, c, "ˇ", "\\check"), t(u, r, c, "^", "\\hat"), t(u, r, c, "⃗", "\\vec"), t(u, r, c, "˙", "\\dot"), t(u, r, f, "ı", "\\imath"), t(u, r, f, "ȷ", "\\jmath"), t(i, r, p, " ", "\\ "), t(i, r, p, " ", " "), t(i, r, p, " ", "~");
    var k, h, b = '0123456789/@."';
    for (k = 0; k < b.length; k++)
      h = b.charAt(k), t(u, r, d, h, h);
    var w = "0123456789`!@*()-=+[]'\";:?/.,";
    for (k = 0; k < w.length; k++)
      h = w.charAt(k), t(i, r, d, h, h);
    var g = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (k = 0; k < g.length; k++)
      h = g.charAt(k), t(u, r, f, h, h), t(i, r, d, h, h);
  }(rt)), rt.exports;
}
var at, Eu;
function I0() {
  if (Eu) return at;
  Eu = 1;
  var e = gn(), t = h0(), u = z0(), i = Be(), r = [
    "\\Gamma",
    "\\Delta",
    "\\Theta",
    "\\Lambda",
    "\\Xi",
    "\\Pi",
    "\\Sigma",
    "\\Upsilon",
    "\\Phi",
    "\\Psi",
    "\\Omega"
  ], n = [
    "ı",
    // dotless i, \imath
    "ȷ"
    // dotless j, \jmath
  ], c = function(b, w, g, x, A) {
    u[g][b] && u[g][b].replace && (b = u[g][b].replace);
    var C = t.getCharacterMetrics(b, w), D;
    return C ? D = new e.symbolNode(
      b,
      C.height,
      C.depth,
      C.italic,
      C.skew,
      A
    ) : (typeof console < "u" && console.warn(
      "No character metrics for '" + b + "' in style '" + w + "'"
    ), D = new e.symbolNode(b, 0, 0, 0, 0, A)), x && (D.style.color = x), D;
  }, a = function(b, w, g, x) {
    return b === "\\" || u[w][b].font === "main" ? c(b, "Main-Regular", w, g, x) : c(
      b,
      "AMS-Regular",
      w,
      g,
      x.concat(["amsrm"])
    );
  }, s = function(b, w, g, x, A) {
    if (A === "mathord")
      return l(b, w, g, x);
    if (A === "textord")
      return c(
        b,
        "Main-Regular",
        w,
        g,
        x.concat(["mathrm"])
      );
    throw new Error("unexpected type: " + A + " in mathDefault");
  }, l = function(b, w, g, x) {
    return /[0-9]/.test(b.charAt(0)) || // glyphs for \imath and \jmath do not exist in Math-Italic so we
    // need to use Main-Italic instead
    i.contains(n, b) || i.contains(r, b) ? c(
      b,
      "Main-Italic",
      w,
      g,
      x.concat(["mainit"])
    ) : c(
      b,
      "Math-Italic",
      w,
      g,
      x.concat(["mathit"])
    );
  }, f = function(b, w, g) {
    var x = b.mode, A = b.value;
    u[x][A] && u[x][A].replace && (A = u[x][A].replace);
    var C = ["mord"], D = w.getColor(), E = w.font;
    if (E) {
      if (E === "mathit" || i.contains(n, A))
        return l(A, x, D, C);
      var O = h[E].fontName;
      return t.getCharacterMetrics(A, O) ? c(
        A,
        O,
        x,
        D,
        C.concat([E])
      ) : s(A, x, D, C, g);
    } else
      return s(A, x, D, C, g);
  }, m = function(b) {
    var w = 0, g = 0, x = 0;
    if (b.children)
      for (var A = 0; A < b.children.length; A++)
        b.children[A].height > w && (w = b.children[A].height), b.children[A].depth > g && (g = b.children[A].depth), b.children[A].maxFontSize > x && (x = b.children[A].maxFontSize);
    b.height = w, b.depth = g, b.maxFontSize = x;
  }, _ = function(b, w, g) {
    var x = new e.span(b, w);
    return m(x), g && (x.style.color = g), x;
  }, y = function(b) {
    var w = new e.documentFragment(b);
    return m(w), w;
  }, o = function(b, w) {
    var g = _([], [new e.symbolNode("​")]);
    g.style.fontSize = w / b.style.sizeMultiplier + "em";
    var x = _(
      ["fontsize-ensurer", "reset-" + b.size, "size5"],
      [g]
    );
    return x;
  }, p = function(b, w, g, x) {
    var A, C, D;
    if (w === "individualShift") {
      var E = b;
      for (b = [E[0]], A = -E[0].shift - E[0].elem.depth, C = A, D = 1; D < E.length; D++) {
        var O = -E[D].shift - C - E[D].elem.depth, M = O - (E[D - 1].elem.height + E[D - 1].elem.depth);
        C = C + O, b.push({ type: "kern", size: M }), b.push(E[D]);
      }
    } else if (w === "top") {
      var I = g;
      for (D = 0; D < b.length; D++)
        b[D].type === "kern" ? I -= b[D].size : I -= b[D].elem.height + b[D].elem.depth;
      A = I;
    } else w === "bottom" ? A = -g : w === "shift" ? A = -b[0].elem.depth - g : w === "firstBaseline" ? A = -b[0].elem.depth : A = 0;
    var B = 0;
    for (D = 0; D < b.length; D++)
      b[D].type === "elem" && (B = Math.max(B, b[D].elem.maxFontSize));
    var T = o(x, B), $ = [];
    for (C = A, D = 0; D < b.length; D++)
      if (b[D].type === "kern")
        C += b[D].size;
      else {
        var z = b[D].elem, F = -z.depth - C;
        C += z.height + z.depth;
        var U = _([], [T, z]);
        U.height -= F, U.depth += F, U.style.top = F + "em", $.push(U);
      }
    var ne = _(
      ["baseline-fix"],
      [T, new e.symbolNode("​")]
    );
    $.push(ne);
    var te = _(["vlist"], $);
    return te.height = Math.max(C, te.height), te.depth = Math.max(-A, te.depth), te;
  }, d = {
    size1: 0.5,
    size2: 0.7,
    size3: 0.8,
    size4: 0.9,
    size5: 1,
    size6: 1.2,
    size7: 1.44,
    size8: 1.73,
    size9: 2.07,
    size10: 2.49
  }, k = {
    "\\qquad": {
      size: "2em",
      className: "qquad"
    },
    "\\quad": {
      size: "1em",
      className: "quad"
    },
    "\\enspace": {
      size: "0.5em",
      className: "enspace"
    },
    "\\;": {
      size: "0.277778em",
      className: "thickspace"
    },
    "\\:": {
      size: "0.22222em",
      className: "mediumspace"
    },
    "\\,": {
      size: "0.16667em",
      className: "thinspace"
    },
    "\\!": {
      size: "-0.16667em",
      className: "negativethinspace"
    }
  }, h = {
    // styles
    mathbf: {
      variant: "bold",
      fontName: "Main-Bold"
    },
    mathrm: {
      variant: "normal",
      fontName: "Main-Regular"
    },
    // "mathit" is missing because it requires the use of two fonts: Main-Italic
    // and Math-Italic.  This is handled by a special case in makeOrd which ends
    // up calling mathit.
    // families
    mathbb: {
      variant: "double-struck",
      fontName: "AMS-Regular"
    },
    mathcal: {
      variant: "script",
      fontName: "Caligraphic-Regular"
    },
    mathfrak: {
      variant: "fraktur",
      fontName: "Fraktur-Regular"
    },
    mathscr: {
      variant: "script",
      fontName: "Script-Regular"
    },
    mathsf: {
      variant: "sans-serif",
      fontName: "SansSerif-Regular"
    },
    mathtt: {
      variant: "monospace",
      fontName: "Typewriter-Regular"
    }
  };
  return at = {
    fontMap: h,
    makeSymbol: c,
    mathsym: a,
    makeSpan: _,
    makeFragment: y,
    makeVList: p,
    makeOrd: f,
    sizingMultiplier: d,
    spacingFunctions: k
  }, at;
}
var it, Au;
function ao() {
  if (Au) return it;
  Au = 1;
  var e = je(), t = O0(), u = I0(), i = h0(), r = z0(), n = Be(), c = u.makeSpan, a = function(E, O) {
    return r.math[E] && r.math[E].replace ? i.getCharacterMetrics(
      r.math[E].replace,
      O
    ) : i.getCharacterMetrics(
      E,
      O
    );
  }, s = function(E, O, M) {
    return u.makeSymbol(E, "Size" + O + "-Regular", M);
  }, l = function(E, O, M) {
    var I = c(
      ["style-wrap", M.style.reset(), O.cls()],
      [E]
    ), B = O.sizeMultiplier / M.style.sizeMultiplier;
    return I.height *= B, I.depth *= B, I.maxFontSize = O.sizeMultiplier, I;
  }, f = function(E, O, M, I, B) {
    var T = u.makeSymbol(E, "Main-Regular", B), $ = l(T, O, I);
    if (M) {
      var z = (1 - I.style.sizeMultiplier / O.sizeMultiplier) * i.metrics.axisHeight;
      $.style.top = z + "em", $.height -= z, $.depth += z;
    }
    return $;
  }, m = function(E, O, M, I, B) {
    var T = s(E, O, B), $ = l(
      c(
        ["delimsizing", "size" + O],
        [T],
        I.getColor()
      ),
      t.TEXT,
      I
    );
    if (M) {
      var z = (1 - I.style.sizeMultiplier) * i.metrics.axisHeight;
      $.style.top = z + "em", $.height -= z, $.depth += z;
    }
    return $;
  }, _ = function(E, O, M) {
    var I;
    O === "Size1-Regular" ? I = "delim-size1" : O === "Size4-Regular" && (I = "delim-size4");
    var B = c(
      ["delimsizinginner", I],
      [c([], [u.makeSymbol(E, O, M)])]
    );
    return { type: "elem", elem: B };
  }, y = function(E, O, M, I, B) {
    var T, $, z, F;
    T = z = F = E, $ = null;
    var U = "Size1-Regular";
    E === "\\uparrow" ? z = F = "⏐" : E === "\\Uparrow" ? z = F = "‖" : E === "\\downarrow" ? T = z = "⏐" : E === "\\Downarrow" ? T = z = "‖" : E === "\\updownarrow" ? (T = "\\uparrow", z = "⏐", F = "\\downarrow") : E === "\\Updownarrow" ? (T = "\\Uparrow", z = "‖", F = "\\Downarrow") : E === "[" || E === "\\lbrack" ? (T = "⎡", z = "⎢", F = "⎣", U = "Size4-Regular") : E === "]" || E === "\\rbrack" ? (T = "⎤", z = "⎥", F = "⎦", U = "Size4-Regular") : E === "\\lfloor" ? (z = T = "⎢", F = "⎣", U = "Size4-Regular") : E === "\\lceil" ? (T = "⎡", z = F = "⎢", U = "Size4-Regular") : E === "\\rfloor" ? (z = T = "⎥", F = "⎦", U = "Size4-Regular") : E === "\\rceil" ? (T = "⎤", z = F = "⎥", U = "Size4-Regular") : E === "(" ? (T = "⎛", z = "⎜", F = "⎝", U = "Size4-Regular") : E === ")" ? (T = "⎞", z = "⎟", F = "⎠", U = "Size4-Regular") : E === "\\{" || E === "\\lbrace" ? (T = "⎧", $ = "⎨", F = "⎩", z = "⎪", U = "Size4-Regular") : E === "\\}" || E === "\\rbrace" ? (T = "⎫", $ = "⎬", F = "⎭", z = "⎪", U = "Size4-Regular") : E === "\\lgroup" ? (T = "⎧", F = "⎩", z = "⎪", U = "Size4-Regular") : E === "\\rgroup" ? (T = "⎫", F = "⎭", z = "⎪", U = "Size4-Regular") : E === "\\lmoustache" ? (T = "⎧", F = "⎭", z = "⎪", U = "Size4-Regular") : E === "\\rmoustache" ? (T = "⎫", F = "⎩", z = "⎪", U = "Size4-Regular") : E === "\\surd" && (T = "", F = "⎷", z = "", U = "Size4-Regular");
    var ne = a(T, U), te = ne.height + ne.depth, P = a(z, U), R = P.height + P.depth, H = a(F, U), W = H.height + H.depth, K = 0, X = 1;
    if ($ !== null) {
      var se = a($, U);
      K = se.height + se.depth, X = 2;
    }
    var _e = te + W + K, we = Math.ceil(
      (O - _e) / (X * R)
    ), Ze = _e + we * X * R, Se = i.metrics.axisHeight;
    M && (Se *= I.style.sizeMultiplier);
    var Me = Ze / 2 - Se, ve = [];
    ve.push(_(F, U, B));
    var ge;
    if ($ === null)
      for (ge = 0; ge < we; ge++)
        ve.push(_(z, U, B));
    else {
      for (ge = 0; ge < we; ge++)
        ve.push(_(z, U, B));
      for (ve.push(_($, U, B)), ge = 0; ge < we; ge++)
        ve.push(_(z, U, B));
    }
    ve.push(_(T, U, B));
    var r0 = u.makeVList(ve, "bottom", Me, I);
    return l(
      c(["delimsizing", "mult"], [r0], I.getColor()),
      t.TEXT,
      I
    );
  }, o = [
    "(",
    ")",
    "[",
    "\\lbrack",
    "]",
    "\\rbrack",
    "\\{",
    "\\lbrace",
    "\\}",
    "\\rbrace",
    "\\lfloor",
    "\\rfloor",
    "\\lceil",
    "\\rceil",
    "\\surd"
  ], p = [
    "\\uparrow",
    "\\downarrow",
    "\\updownarrow",
    "\\Uparrow",
    "\\Downarrow",
    "\\Updownarrow",
    "|",
    "\\|",
    "\\vert",
    "\\Vert",
    "\\lvert",
    "\\rvert",
    "\\lVert",
    "\\rVert",
    "\\lgroup",
    "\\rgroup",
    "\\lmoustache",
    "\\rmoustache"
  ], d = [
    "<",
    ">",
    "\\langle",
    "\\rangle",
    "/",
    "\\backslash",
    "\\lt",
    "\\gt"
  ], k = [0, 1.2, 1.8, 2.4, 3], h = function(E, O, M, I) {
    if (E === "<" || E === "\\lt" ? E = "\\langle" : (E === ">" || E === "\\gt") && (E = "\\rangle"), n.contains(o, E) || n.contains(d, E))
      return m(E, O, !1, M, I);
    if (n.contains(p, E))
      return y(
        E,
        k[O],
        !1,
        M,
        I
      );
    throw new e("Illegal delimiter: '" + E + "'");
  }, b = [
    { type: "small", style: t.SCRIPTSCRIPT },
    { type: "small", style: t.SCRIPT },
    { type: "small", style: t.TEXT },
    { type: "large", size: 1 },
    { type: "large", size: 2 },
    { type: "large", size: 3 },
    { type: "large", size: 4 }
  ], w = [
    { type: "small", style: t.SCRIPTSCRIPT },
    { type: "small", style: t.SCRIPT },
    { type: "small", style: t.TEXT },
    { type: "stack" }
  ], g = [
    { type: "small", style: t.SCRIPTSCRIPT },
    { type: "small", style: t.SCRIPT },
    { type: "small", style: t.TEXT },
    { type: "large", size: 1 },
    { type: "large", size: 2 },
    { type: "large", size: 3 },
    { type: "large", size: 4 },
    { type: "stack" }
  ], x = function(E) {
    if (E.type === "small")
      return "Main-Regular";
    if (E.type === "large")
      return "Size" + E.size + "-Regular";
    if (E.type === "stack")
      return "Size4-Regular";
  }, A = function(E, O, M, I) {
    for (var B = Math.min(2, 3 - I.style.size), T = B; T < M.length && M[T].type !== "stack"; T++) {
      var $ = a(E, x(M[T])), z = $.height + $.depth;
      if (M[T].type === "small" && (z *= M[T].style.sizeMultiplier), z > O)
        return M[T];
    }
    return M[M.length - 1];
  }, C = function(E, O, M, I, B) {
    E === "<" || E === "\\lt" ? E = "\\langle" : (E === ">" || E === "\\gt") && (E = "\\rangle");
    var T;
    n.contains(d, E) ? T = b : n.contains(o, E) ? T = g : T = w;
    var $ = A(E, O, T, I);
    if ($.type === "small")
      return f(E, $.style, M, I, B);
    if ($.type === "large")
      return m(E, $.size, M, I, B);
    if ($.type === "stack")
      return y(E, O, M, I, B);
  }, D = function(E, O, M, I, B) {
    var T = i.metrics.axisHeight * I.style.sizeMultiplier, $ = 901, z = 5 / i.metrics.ptPerEm, F = Math.max(
      O - T,
      M + T
    ), U = Math.max(
      // In real TeX, calculations are done using integral values which are
      // 65536 per pt, or 655360 per em. So, the division here truncates in
      // TeX but doesn't here, producing different results. If we wanted to
      // exactly match TeX's calculation, we could do
      //   Math.floor(655360 * maxDistFromAxis / 500) *
      //    delimiterFactor / 655360
      // (To see the difference, compare
      //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
      // in TeX and KaTeX)
      F / 500 * $,
      2 * F - z
    );
    return C(E, U, !0, I, B);
  };
  return it = {
    sizedDelim: h,
    customSizedDelim: C,
    leftRightDelim: D
  }, it;
}
var ot, Cu;
function io() {
  if (Cu) return ot;
  Cu = 1;
  var e = je(), t = O0(), u = I0(), i = ao(), r = gn(), n = h0(), c = Be(), a = u.makeSpan, s = function(h, b, w) {
    for (var g = [], x = 0; x < h.length; x++) {
      var A = h[x];
      g.push(d(A, b, w)), w = A;
    }
    return g;
  }, l = {
    mathord: "mord",
    textord: "mord",
    bin: "mbin",
    rel: "mrel",
    text: "mord",
    open: "mopen",
    close: "mclose",
    inner: "minner",
    genfrac: "mord",
    array: "mord",
    spacing: "mord",
    punct: "mpunct",
    ordgroup: "mord",
    op: "mop",
    katex: "mord",
    overline: "mord",
    underline: "mord",
    rule: "mord",
    leftright: "minner",
    sqrt: "mord",
    accent: "mord"
  }, f = function(h) {
    return h == null ? l.mathord : h.type === "supsub" ? f(h.value.base) : h.type === "llap" || h.type === "rlap" ? f(h.value) : h.type === "color" || h.type === "sizing" || h.type === "styling" ? f(h.value.value) : h.type === "delimsizing" ? l[h.value.delimType] : l[h.type];
  }, m = function(h, b) {
    return h ? h.type === "op" ? h.value.limits && (b.style.size === t.DISPLAY.size || h.value.alwaysHandleSupSub) : h.type === "accent" ? y(h.value.base) : null : !1;
  }, _ = function(h) {
    return h ? h.type === "ordgroup" ? h.value.length === 1 ? _(h.value[0]) : h : h.type === "color" && h.value.value.length === 1 ? _(h.value.value[0]) : h : !1;
  }, y = function(h) {
    var b = _(h);
    return b.type === "mathord" || b.type === "textord" || b.type === "bin" || b.type === "rel" || b.type === "inner" || b.type === "open" || b.type === "close" || b.type === "punct";
  }, o = function(h) {
    return a([
      "sizing",
      "reset-" + h.size,
      "size5",
      h.style.reset(),
      t.TEXT.cls(),
      "nulldelimiter"
    ]);
  }, p = {};
  p.mathord = function(h, b, w) {
    return u.makeOrd(h, b, "mathord");
  }, p.textord = function(h, b, w) {
    return u.makeOrd(h, b, "textord");
  }, p.bin = function(h, b, w) {
    for (var g = "mbin", x = w; x && x.type === "color"; ) {
      var A = x.value.value;
      x = A[A.length - 1];
    }
    return (!w || c.contains(
      ["mbin", "mopen", "mrel", "mop", "mpunct"],
      f(x)
    )) && (h.type = "textord", g = "mord"), u.mathsym(
      h.value,
      h.mode,
      b.getColor(),
      [g]
    );
  }, p.rel = function(h, b, w) {
    return u.mathsym(
      h.value,
      h.mode,
      b.getColor(),
      ["mrel"]
    );
  }, p.open = function(h, b, w) {
    return u.mathsym(
      h.value,
      h.mode,
      b.getColor(),
      ["mopen"]
    );
  }, p.close = function(h, b, w) {
    return u.mathsym(
      h.value,
      h.mode,
      b.getColor(),
      ["mclose"]
    );
  }, p.inner = function(h, b, w) {
    return u.mathsym(
      h.value,
      h.mode,
      b.getColor(),
      ["minner"]
    );
  }, p.punct = function(h, b, w) {
    return u.mathsym(
      h.value,
      h.mode,
      b.getColor(),
      ["mpunct"]
    );
  }, p.ordgroup = function(h, b, w) {
    return a(
      ["mord", b.style.cls()],
      s(h.value, b.reset())
    );
  }, p.text = function(h, b, w) {
    return a(
      ["text", "mord", b.style.cls()],
      s(h.value.body, b.reset())
    );
  }, p.color = function(h, b, w) {
    var g = s(
      h.value.value,
      b.withColor(h.value.color),
      w
    );
    return new u.makeFragment(g);
  }, p.supsub = function(h, b, w) {
    if (m(h.value.base, b))
      return p[h.value.base.type](h, b, w);
    var g = d(h.value.base, b.reset()), x, A, C, D;
    h.value.sup && (C = d(
      h.value.sup,
      b.withStyle(b.style.sup())
    ), x = a(
      [b.style.reset(), b.style.sup().cls()],
      [C]
    )), h.value.sub && (D = d(
      h.value.sub,
      b.withStyle(b.style.sub())
    ), A = a(
      [b.style.reset(), b.style.sub().cls()],
      [D]
    ));
    var E, O;
    y(h.value.base) ? (E = 0, O = 0) : (E = g.height - n.metrics.supDrop, O = g.depth + n.metrics.subDrop);
    var M;
    b.style === t.DISPLAY ? M = n.metrics.sup1 : b.style.cramped ? M = n.metrics.sup3 : M = n.metrics.sup2;
    var I = t.TEXT.sizeMultiplier * b.style.sizeMultiplier, B = 0.5 / n.metrics.ptPerEm / I + "em", T;
    if (!h.value.sup)
      O = Math.max(
        O,
        n.metrics.sub1,
        D.height - 0.8 * n.metrics.xHeight
      ), T = u.makeVList([
        { type: "elem", elem: A }
      ], "shift", O, b), T.children[0].style.marginRight = B, g instanceof r.symbolNode && (T.children[0].style.marginLeft = -g.italic + "em");
    else if (!h.value.sub)
      E = Math.max(
        E,
        M,
        C.depth + 0.25 * n.metrics.xHeight
      ), T = u.makeVList([
        { type: "elem", elem: x }
      ], "shift", -E, b), T.children[0].style.marginRight = B;
    else {
      E = Math.max(
        E,
        M,
        C.depth + 0.25 * n.metrics.xHeight
      ), O = Math.max(O, n.metrics.sub2);
      var $ = n.metrics.defaultRuleThickness;
      if (E - C.depth - (D.height - O) < 4 * $) {
        O = 4 * $ - (E - C.depth) + D.height;
        var z = 0.8 * n.metrics.xHeight - (E - C.depth);
        z > 0 && (E += z, O -= z);
      }
      T = u.makeVList([
        { type: "elem", elem: A, shift: O },
        { type: "elem", elem: x, shift: -E }
      ], "individualShift", null, b), g instanceof r.symbolNode && (T.children[0].style.marginLeft = -g.italic + "em"), T.children[0].style.marginRight = B, T.children[1].style.marginRight = B;
    }
    return a(
      [f(h.value.base)],
      [g, T]
    );
  }, p.genfrac = function(h, b, w) {
    var g = b.style;
    h.value.size === "display" ? g = t.DISPLAY : h.value.size === "text" && (g = t.TEXT);
    var x = g.fracNum(), A = g.fracDen(), C = d(h.value.numer, b.withStyle(x)), D = a([g.reset(), x.cls()], [C]), E = d(h.value.denom, b.withStyle(A)), O = a([g.reset(), A.cls()], [E]), M;
    h.value.hasBarLine ? M = n.metrics.defaultRuleThickness / b.style.sizeMultiplier : M = 0;
    var I, B, T;
    g.size === t.DISPLAY.size ? (I = n.metrics.num1, M > 0 ? B = 3 * M : B = 7 * n.metrics.defaultRuleThickness, T = n.metrics.denom1) : (M > 0 ? (I = n.metrics.num2, B = M) : (I = n.metrics.num3, B = 3 * n.metrics.defaultRuleThickness), T = n.metrics.denom2);
    var $;
    if (M === 0) {
      var z = I - C.depth - (E.height - T);
      z < B && (I += 0.5 * (B - z), T += 0.5 * (B - z)), $ = u.makeVList([
        { type: "elem", elem: O, shift: T },
        { type: "elem", elem: D, shift: -I }
      ], "individualShift", null, b);
    } else {
      var F = n.metrics.axisHeight;
      I - C.depth - (F + 0.5 * M) < B && (I += B - (I - C.depth - (F + 0.5 * M))), F - 0.5 * M - (E.height - T) < B && (T += B - (F - 0.5 * M - (E.height - T)));
      var U = a(
        [b.style.reset(), t.TEXT.cls(), "frac-line"]
      );
      U.height = M;
      var ne = -(F - 0.5 * M);
      $ = u.makeVList([
        { type: "elem", elem: O, shift: T },
        { type: "elem", elem: U, shift: ne },
        { type: "elem", elem: D, shift: -I }
      ], "individualShift", null, b);
    }
    $.height *= g.sizeMultiplier / b.style.sizeMultiplier, $.depth *= g.sizeMultiplier / b.style.sizeMultiplier;
    var te;
    g.size === t.DISPLAY.size ? te = n.metrics.delim1 : te = n.metrics.getDelim2(g);
    var P, R;
    return h.value.leftDelim == null ? P = o(b) : P = i.customSizedDelim(
      h.value.leftDelim,
      te,
      !0,
      b.withStyle(g),
      h.mode
    ), h.value.rightDelim == null ? R = o(b) : R = i.customSizedDelim(
      h.value.rightDelim,
      te,
      !0,
      b.withStyle(g),
      h.mode
    ), a(
      ["mord", b.style.reset(), g.cls()],
      [P, a(["mfrac"], [$]), R],
      b.getColor()
    );
  }, p.array = function(h, b, w) {
    var g, x, A = h.value.body.length, C = 0, D = new Array(A), E = 1 / n.metrics.ptPerEm, O = 5 * E, M = 12 * E, I = c.deflt(h.value.arraystretch, 1), B = I * M, T = 0.7 * B, $ = 0.3 * B, z = 0;
    for (g = 0; g < h.value.body.length; ++g) {
      var F = h.value.body[g], U = T, ne = $;
      C < F.length && (C = F.length);
      var te = new Array(F.length);
      for (x = 0; x < F.length; ++x) {
        var P = d(F[x], b);
        ne < P.depth && (ne = P.depth), U < P.height && (U = P.height), te[x] = P;
      }
      var R = 0;
      if (h.value.rowGaps[g]) {
        switch (R = h.value.rowGaps[g].value, R.unit) {
          case "em":
            R = R.number;
            break;
          case "ex":
            R = R.number * n.metrics.emPerEx;
            break;
          default:
            console.error("Can't handle unit " + R.unit), R = 0;
        }
        R > 0 && (R += $, ne < R && (ne = R), R = 0);
      }
      te.height = U, te.depth = ne, z += U, te.pos = z, z += ne + R, D[g] = te;
    }
    var H = z / 2 + n.metrics.axisHeight, W = h.value.cols || [], K = [], X, se;
    for (
      x = 0, se = 0;
      // Continue while either there are more columns or more column
      // descriptions, so trailing separators don't get lost.
      x < C || se < W.length;
      ++x, ++se
    ) {
      for (var _e = W[se] || {}, we = !0; _e.type === "separator"; ) {
        if (we || (X = a(["arraycolsep"], []), X.style.width = n.metrics.doubleRuleSep + "em", K.push(X)), _e.separator === "|") {
          var Ze = a(
            ["vertical-separator"],
            []
          );
          Ze.style.height = z + "em", Ze.style.verticalAlign = -(z - H) + "em", K.push(Ze);
        } else
          throw new e(
            "Invalid separator type: " + _e.separator
          );
        se++, _e = W[se] || {}, we = !1;
      }
      if (!(x >= C)) {
        var Se;
        (x > 0 || h.value.hskipBeforeAndAfter) && (Se = c.deflt(_e.pregap, O), Se !== 0 && (X = a(["arraycolsep"], []), X.style.width = Se + "em", K.push(X)));
        var Me = [];
        for (g = 0; g < A; ++g) {
          var ve = D[g], ge = ve[x];
          if (ge) {
            var r0 = ve.pos - H;
            ge.depth = ve.depth, ge.height = ve.height, Me.push({ type: "elem", elem: ge, shift: r0 });
          }
        }
        Me = u.makeVList(Me, "individualShift", null, b), Me = a(
          ["col-align-" + (_e.align || "c")],
          [Me]
        ), K.push(Me), (x < C - 1 || h.value.hskipBeforeAndAfter) && (Se = c.deflt(_e.postgap, O), Se !== 0 && (X = a(["arraycolsep"], []), X.style.width = Se + "em", K.push(X)));
      }
    }
    return D = a(["mtable"], K), a(["mord"], [D], b.getColor());
  }, p.spacing = function(h, b, w) {
    return h.value === "\\ " || h.value === "\\space" || h.value === " " || h.value === "~" ? a(
      ["mord", "mspace"],
      [u.mathsym(h.value, h.mode)]
    ) : a(
      [
        "mord",
        "mspace",
        u.spacingFunctions[h.value].className
      ]
    );
  }, p.llap = function(h, b, w) {
    var g = a(
      ["inner"],
      [d(h.value.body, b.reset())]
    ), x = a(["fix"], []);
    return a(
      ["llap", b.style.cls()],
      [g, x]
    );
  }, p.rlap = function(h, b, w) {
    var g = a(
      ["inner"],
      [d(h.value.body, b.reset())]
    ), x = a(["fix"], []);
    return a(
      ["rlap", b.style.cls()],
      [g, x]
    );
  }, p.op = function(h, b, w) {
    var g, x, A = !1;
    h.type === "supsub" && (g = h.value.sup, x = h.value.sub, h = h.value.base, A = !0);
    var C = [
      "\\smallint"
    ], D = !1;
    b.style.size === t.DISPLAY.size && h.value.symbol && !c.contains(C, h.value.body) && (D = !0);
    var E, O = 0, M = 0;
    if (h.value.symbol) {
      var I = D ? "Size2-Regular" : "Size1-Regular";
      E = u.makeSymbol(
        h.value.body,
        I,
        "math",
        b.getColor(),
        ["op-symbol", D ? "large-op" : "small-op", "mop"]
      ), O = (E.height - E.depth) / 2 - n.metrics.axisHeight * b.style.sizeMultiplier, M = E.italic;
    } else {
      for (var B = [], T = 1; T < h.value.body.length; T++)
        B.push(u.mathsym(h.value.body[T], h.mode));
      E = a(["mop"], B, b.getColor());
    }
    if (A) {
      E = a([], [E]);
      var $, z, F, U;
      if (g) {
        var ne = d(
          g,
          b.withStyle(b.style.sup())
        );
        $ = a(
          [b.style.reset(), b.style.sup().cls()],
          [ne]
        ), z = Math.max(
          n.metrics.bigOpSpacing1,
          n.metrics.bigOpSpacing3 - ne.depth
        );
      }
      if (x) {
        var te = d(
          x,
          b.withStyle(b.style.sub())
        );
        F = a(
          [b.style.reset(), b.style.sub().cls()],
          [te]
        ), U = Math.max(
          n.metrics.bigOpSpacing2,
          n.metrics.bigOpSpacing4 - te.height
        );
      }
      var P, R, H;
      if (!g)
        R = E.height - O, P = u.makeVList([
          { type: "kern", size: n.metrics.bigOpSpacing5 },
          { type: "elem", elem: F },
          { type: "kern", size: U },
          { type: "elem", elem: E }
        ], "top", R, b), P.children[0].style.marginLeft = -M + "em";
      else if (!x)
        H = E.depth + O, P = u.makeVList([
          { type: "elem", elem: E },
          { type: "kern", size: z },
          { type: "elem", elem: $ },
          { type: "kern", size: n.metrics.bigOpSpacing5 }
        ], "bottom", H, b), P.children[1].style.marginLeft = M + "em";
      else {
        if (!g && !x)
          return E;
        H = n.metrics.bigOpSpacing5 + F.height + F.depth + U + E.depth + O, P = u.makeVList([
          { type: "kern", size: n.metrics.bigOpSpacing5 },
          { type: "elem", elem: F },
          { type: "kern", size: U },
          { type: "elem", elem: E },
          { type: "kern", size: z },
          { type: "elem", elem: $ },
          { type: "kern", size: n.metrics.bigOpSpacing5 }
        ], "bottom", H, b), P.children[0].style.marginLeft = -M + "em", P.children[2].style.marginLeft = M + "em";
      }
      return a(["mop", "op-limits"], [P]);
    } else
      return h.value.symbol && (E.style.top = O + "em"), E;
  }, p.katex = function(h, b, w) {
    var g = a(
      ["k"],
      [u.mathsym("K", h.mode)]
    ), x = a(
      ["a"],
      [u.mathsym("A", h.mode)]
    );
    x.height = (x.height + 0.2) * 0.75, x.depth = (x.height - 0.2) * 0.75;
    var A = a(
      ["t"],
      [u.mathsym("T", h.mode)]
    ), C = a(
      ["e"],
      [u.mathsym("E", h.mode)]
    );
    C.height = C.height - 0.2155, C.depth = C.depth + 0.2155;
    var D = a(
      ["x"],
      [u.mathsym("X", h.mode)]
    );
    return a(
      ["katex-logo", "mord"],
      [g, x, A, C, D],
      b.getColor()
    );
  }, p.overline = function(h, b, w) {
    var g = d(
      h.value.body,
      b.withStyle(b.style.cramp())
    ), x = n.metrics.defaultRuleThickness / b.style.sizeMultiplier, A = a(
      [b.style.reset(), t.TEXT.cls(), "overline-line"]
    );
    A.height = x, A.maxFontSize = 1;
    var C = u.makeVList([
      { type: "elem", elem: g },
      { type: "kern", size: 3 * x },
      { type: "elem", elem: A },
      { type: "kern", size: x }
    ], "firstBaseline", null, b);
    return a(["overline", "mord"], [C], b.getColor());
  }, p.underline = function(h, b, w) {
    var g = d(h.value.body, b), x = n.metrics.defaultRuleThickness / b.style.sizeMultiplier, A = a(
      [b.style.reset(), t.TEXT.cls(), "underline-line"]
    );
    A.height = x, A.maxFontSize = 1;
    var C = u.makeVList([
      { type: "kern", size: x },
      { type: "elem", elem: A },
      { type: "kern", size: 3 * x },
      { type: "elem", elem: g }
    ], "top", g.height, b);
    return a(["underline", "mord"], [C], b.getColor());
  }, p.sqrt = function(h, b, w) {
    var g = d(
      h.value.body,
      b.withStyle(b.style.cramp())
    ), x = n.metrics.defaultRuleThickness / b.style.sizeMultiplier, A = a(
      [b.style.reset(), t.TEXT.cls(), "sqrt-line"],
      [],
      b.getColor()
    );
    A.height = x, A.maxFontSize = 1;
    var C = x;
    b.style.id < t.TEXT.id && (C = n.metrics.xHeight);
    var D = x + C / 4, E = (g.height + g.depth) * b.style.sizeMultiplier, O = E + D + x, M = a(
      ["sqrt-sign"],
      [
        i.customSizedDelim(
          "\\surd",
          O,
          !1,
          b,
          h.mode
        )
      ],
      b.getColor()
    ), I = M.height + M.depth - x;
    I > g.height + g.depth + D && (D = (D + I - g.height - g.depth) / 2);
    var B = -(g.height + D + x) + M.height;
    M.style.top = B + "em", M.height -= B, M.depth += B;
    var T;
    if (g.height === 0 && g.depth === 0 ? T = a() : T = u.makeVList([
      { type: "elem", elem: g },
      { type: "kern", size: D },
      { type: "elem", elem: A },
      { type: "kern", size: x }
    ], "firstBaseline", null, b), h.value.index) {
      var $ = d(
        h.value.index,
        b.withStyle(t.SCRIPTSCRIPT)
      ), z = a(
        [b.style.reset(), t.SCRIPTSCRIPT.cls()],
        [$]
      ), F = Math.max(M.height, T.height), U = Math.max(M.depth, T.depth), ne = 0.6 * (F - U), te = u.makeVList(
        [{ type: "elem", elem: z }],
        "shift",
        -ne,
        b
      ), P = a(["root"], [te]);
      return a(["sqrt", "mord"], [P, M, T]);
    } else
      return a(["sqrt", "mord"], [M, T]);
  }, p.sizing = function(h, b, w) {
    var g = s(
      h.value.value,
      b.withSize(h.value.size),
      w
    ), x = a(
      ["mord"],
      [a(
        [
          "sizing",
          "reset-" + b.size,
          h.value.size,
          b.style.cls()
        ],
        g
      )]
    ), A = u.sizingMultiplier[h.value.size];
    return x.maxFontSize = A * b.style.sizeMultiplier, x;
  }, p.styling = function(h, b, w) {
    var g = {
      display: t.DISPLAY,
      text: t.TEXT,
      script: t.SCRIPT,
      scriptscript: t.SCRIPTSCRIPT
    }, x = g[h.value.style], A = s(
      h.value.value,
      b.withStyle(x),
      w
    );
    return a([b.style.reset(), x.cls()], A);
  }, p.font = function(h, b, w) {
    var g = h.value.font;
    return d(h.value.body, b.withFont(g), w);
  }, p.delimsizing = function(h, b, w) {
    var g = h.value.value;
    return g === "." ? a([l[h.value.delimType]]) : a(
      [l[h.value.delimType]],
      [i.sizedDelim(
        g,
        h.value.size,
        b,
        h.mode
      )]
    );
  }, p.leftright = function(h, b, w) {
    for (var g = s(h.value.body, b.reset()), x = 0, A = 0, C = 0; C < g.length; C++)
      x = Math.max(g[C].height, x), A = Math.max(g[C].depth, A);
    x *= b.style.sizeMultiplier, A *= b.style.sizeMultiplier;
    var D;
    h.value.left === "." ? D = o(b) : D = i.leftRightDelim(
      h.value.left,
      x,
      A,
      b,
      h.mode
    ), g.unshift(D);
    var E;
    return h.value.right === "." ? E = o(b) : E = i.leftRightDelim(
      h.value.right,
      x,
      A,
      b,
      h.mode
    ), g.push(E), a(
      ["minner", b.style.cls()],
      g,
      b.getColor()
    );
  }, p.rule = function(h, b, w) {
    var g = a(["mord", "rule"], [], b.getColor()), x = 0;
    h.value.shift && (x = h.value.shift.number, h.value.shift.unit === "ex" && (x *= n.metrics.xHeight));
    var A = h.value.width.number;
    h.value.width.unit === "ex" && (A *= n.metrics.xHeight);
    var C = h.value.height.number;
    return h.value.height.unit === "ex" && (C *= n.metrics.xHeight), x /= b.style.sizeMultiplier, A /= b.style.sizeMultiplier, C /= b.style.sizeMultiplier, g.style.borderRightWidth = A + "em", g.style.borderTopWidth = C + "em", g.style.bottom = x + "em", g.width = A, g.height = C + x, g.depth = -x, g;
  }, p.accent = function(h, b, w) {
    var g = h.value.base, x;
    if (h.type === "supsub") {
      var A = h;
      h = A.value.base, g = h.value.base, A.value.base = g, x = d(
        A,
        b.reset(),
        w
      );
    }
    var C = d(
      g,
      b.withStyle(b.style.cramp())
    ), D;
    if (y(g)) {
      var E = _(g), O = d(
        E,
        b.withStyle(b.style.cramp())
      );
      D = O.skew;
    } else
      D = 0;
    var M = Math.min(C.height, n.metrics.xHeight), I = u.makeSymbol(
      h.value.accent,
      "Main-Regular",
      "math",
      b.getColor()
    );
    I.italic = 0;
    var B = h.value.accent === "\\vec" ? "accent-vec" : null, T = a(["accent-body", B], [
      a([], [I])
    ]);
    T = u.makeVList([
      { type: "elem", elem: C },
      { type: "kern", size: -M },
      { type: "elem", elem: T }
    ], "firstBaseline", null, b), T.children[1].style.marginLeft = 2 * D + "em";
    var $ = a(["mord", "accent"], [T]);
    return x ? (x.children[0] = $, x.height = Math.max($.height, x.height), x.classes[0] = "mord", x) : $;
  }, p.phantom = function(h, b, w) {
    var g = s(
      h.value.value,
      b.withPhantom(),
      w
    );
    return new u.makeFragment(g);
  };
  var d = function(h, b, w) {
    if (!h)
      return a();
    if (p[h.type]) {
      var g = p[h.type](h, b, w), x;
      return b.style !== b.parentStyle && (x = b.style.sizeMultiplier / b.parentStyle.sizeMultiplier, g.height *= x, g.depth *= x), b.size !== b.parentSize && (x = u.sizingMultiplier[b.size] / u.sizingMultiplier[b.parentSize], g.height *= x, g.depth *= x), g;
    } else
      throw new e(
        "Got group of unknown type: '" + h.type + "'"
      );
  }, k = function(h, b) {
    h = JSON.parse(JSON.stringify(h));
    var w = s(h, b), g = a(["base", b.style.cls()], w), x = a(["strut"]), A = a(["strut", "bottom"]);
    x.style.height = g.height + "em", A.style.height = g.height + g.depth + "em", A.style.verticalAlign = -g.depth + "em";
    var C = a(["katex-html"], [x, A, g]);
    return C.setAttribute("aria-hidden", "true"), C;
  };
  return ot = k, ot;
}
var st, Su;
function oo() {
  if (Su) return st;
  Su = 1;
  var e = Be();
  function t(i, r) {
    this.type = i, this.attributes = {}, this.children = r || [];
  }
  t.prototype.setAttribute = function(i, r) {
    this.attributes[i] = r;
  }, t.prototype.toNode = function() {
    var i = document.createElementNS(
      "http://www.w3.org/1998/Math/MathML",
      this.type
    );
    for (var r in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, r) && i.setAttribute(r, this.attributes[r]);
    for (var n = 0; n < this.children.length; n++)
      i.appendChild(this.children[n].toNode());
    return i;
  }, t.prototype.toMarkup = function() {
    var i = "<" + this.type;
    for (var r in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, r) && (i += " " + r + '="', i += e.escape(this.attributes[r]), i += '"');
    i += ">";
    for (var n = 0; n < this.children.length; n++)
      i += this.children[n].toMarkup();
    return i += "</" + this.type + ">", i;
  };
  function u(i) {
    this.text = i;
  }
  return u.prototype.toNode = function() {
    return document.createTextNode(this.text);
  }, u.prototype.toMarkup = function() {
    return e.escape(this.text);
  }, st = {
    MathNode: t,
    TextNode: u
  }, st;
}
var ct, Du;
function so() {
  if (Du) return ct;
  Du = 1;
  var e = I0(), t = h0(), u = oo(), i = je(), r = z0(), n = Be(), c = e.makeSpan, a = e.fontMap, s = function(o, p) {
    return r[p][o] && r[p][o].replace && (o = r[p][o].replace), new u.TextNode(o);
  }, l = function(o, p) {
    var d = p.font;
    if (!d)
      return null;
    var k = o.mode;
    if (d === "mathit")
      return "italic";
    var h = o.value;
    if (n.contains(["\\imath", "\\jmath"], h))
      return null;
    r[k][h] && r[k][h].replace && (h = r[k][h].replace);
    var b = a[d].fontName;
    return t.getCharacterMetrics(h, b) ? a[p.font].variant : null;
  }, f = {};
  f.mathord = function(o, p) {
    var d = new u.MathNode(
      "mi",
      [s(o.value, o.mode)]
    ), k = l(o, p);
    return k && d.setAttribute("mathvariant", k), d;
  }, f.textord = function(o, p) {
    var d = s(o.value, o.mode), k = l(o, p) || "normal", h;
    return /[0-9]/.test(o.value) ? (h = new u.MathNode("mn", [d]), p.font && h.setAttribute("mathvariant", k)) : (h = new u.MathNode("mi", [d]), h.setAttribute("mathvariant", k)), h;
  }, f.bin = function(o) {
    var p = new u.MathNode(
      "mo",
      [s(o.value, o.mode)]
    );
    return p;
  }, f.rel = function(o) {
    var p = new u.MathNode(
      "mo",
      [s(o.value, o.mode)]
    );
    return p;
  }, f.open = function(o) {
    var p = new u.MathNode(
      "mo",
      [s(o.value, o.mode)]
    );
    return p;
  }, f.close = function(o) {
    var p = new u.MathNode(
      "mo",
      [s(o.value, o.mode)]
    );
    return p;
  }, f.inner = function(o) {
    var p = new u.MathNode(
      "mo",
      [s(o.value, o.mode)]
    );
    return p;
  }, f.punct = function(o) {
    var p = new u.MathNode(
      "mo",
      [s(o.value, o.mode)]
    );
    return p.setAttribute("separator", "true"), p;
  }, f.ordgroup = function(o, p) {
    var d = m(o.value, p), k = new u.MathNode("mrow", d);
    return k;
  }, f.text = function(o, p) {
    var d = m(o.value.body, p), k = new u.MathNode("mtext", d);
    return k;
  }, f.color = function(o, p) {
    var d = m(o.value.value, p), k = new u.MathNode("mstyle", d);
    return k.setAttribute("mathcolor", o.value.color), k;
  }, f.supsub = function(o, p) {
    var d = [_(o.value.base, p)];
    o.value.sub && d.push(_(o.value.sub, p)), o.value.sup && d.push(_(o.value.sup, p));
    var k;
    o.value.sub ? o.value.sup ? k = "msubsup" : k = "msub" : k = "msup";
    var h = new u.MathNode(k, d);
    return h;
  }, f.genfrac = function(o, p) {
    var d = new u.MathNode(
      "mfrac",
      [
        _(o.value.numer, p),
        _(o.value.denom, p)
      ]
    );
    if (o.value.hasBarLine || d.setAttribute("linethickness", "0px"), o.value.leftDelim != null || o.value.rightDelim != null) {
      var k = [];
      if (o.value.leftDelim != null) {
        var h = new u.MathNode(
          "mo",
          [new u.TextNode(o.value.leftDelim)]
        );
        h.setAttribute("fence", "true"), k.push(h);
      }
      if (k.push(d), o.value.rightDelim != null) {
        var b = new u.MathNode(
          "mo",
          [new u.TextNode(o.value.rightDelim)]
        );
        b.setAttribute("fence", "true"), k.push(b);
      }
      var w = new u.MathNode("mrow", k);
      return w;
    }
    return d;
  }, f.array = function(o, p) {
    return new u.MathNode(
      "mtable",
      o.value.body.map(function(d) {
        return new u.MathNode(
          "mtr",
          d.map(function(k) {
            return new u.MathNode(
              "mtd",
              [_(k, p)]
            );
          })
        );
      })
    );
  }, f.sqrt = function(o, p) {
    var d;
    return o.value.index ? d = new u.MathNode(
      "mroot",
      [
        _(o.value.body, p),
        _(o.value.index, p)
      ]
    ) : d = new u.MathNode(
      "msqrt",
      [_(o.value.body, p)]
    ), d;
  }, f.leftright = function(o, p) {
    var d = m(o.value.body, p);
    if (o.value.left !== ".") {
      var k = new u.MathNode(
        "mo",
        [s(o.value.left, o.mode)]
      );
      k.setAttribute("fence", "true"), d.unshift(k);
    }
    if (o.value.right !== ".") {
      var h = new u.MathNode(
        "mo",
        [s(o.value.right, o.mode)]
      );
      h.setAttribute("fence", "true"), d.push(h);
    }
    var b = new u.MathNode("mrow", d);
    return b;
  }, f.accent = function(o, p) {
    var d = new u.MathNode(
      "mo",
      [s(o.value.accent, o.mode)]
    ), k = new u.MathNode(
      "mover",
      [
        _(o.value.base, p),
        d
      ]
    );
    return k.setAttribute("accent", "true"), k;
  }, f.spacing = function(o) {
    var p;
    return o.value === "\\ " || o.value === "\\space" || o.value === " " || o.value === "~" ? p = new u.MathNode(
      "mtext",
      [new u.TextNode(" ")]
    ) : (p = new u.MathNode("mspace"), p.setAttribute(
      "width",
      e.spacingFunctions[o.value].size
    )), p;
  }, f.op = function(o) {
    var p;
    return o.value.symbol ? p = new u.MathNode(
      "mo",
      [s(o.value.body, o.mode)]
    ) : p = new u.MathNode(
      "mi",
      [new u.TextNode(o.value.body.slice(1))]
    ), p;
  }, f.katex = function(o) {
    var p = new u.MathNode(
      "mtext",
      [new u.TextNode("KaTeX")]
    );
    return p;
  }, f.font = function(o, p) {
    var d = o.value.font;
    return _(o.value.body, p.withFont(d));
  }, f.delimsizing = function(o) {
    var p = [];
    o.value.value !== "." && p.push(s(o.value.value, o.mode));
    var d = new u.MathNode("mo", p);
    return o.value.delimType === "open" || o.value.delimType === "close" ? d.setAttribute("fence", "true") : d.setAttribute("fence", "false"), d;
  }, f.styling = function(o, p) {
    var d = m(o.value.value, p), k = new u.MathNode("mstyle", d), h = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"]
    }, b = h[o.value.style];
    return k.setAttribute("scriptlevel", b[0]), k.setAttribute("displaystyle", b[1]), k;
  }, f.sizing = function(o, p) {
    var d = m(o.value.value, p), k = new u.MathNode("mstyle", d);
    return k.setAttribute(
      "mathsize",
      e.sizingMultiplier[o.value.size] + "em"
    ), k;
  }, f.overline = function(o, p) {
    var d = new u.MathNode(
      "mo",
      [new u.TextNode("‾")]
    );
    d.setAttribute("stretchy", "true");
    var k = new u.MathNode(
      "mover",
      [
        _(o.value.body, p),
        d
      ]
    );
    return k.setAttribute("accent", "true"), k;
  }, f.underline = function(o, p) {
    var d = new u.MathNode(
      "mo",
      [new u.TextNode("‾")]
    );
    d.setAttribute("stretchy", "true");
    var k = new u.MathNode(
      "munder",
      [
        _(o.value.body, p),
        d
      ]
    );
    return k.setAttribute("accentunder", "true"), k;
  }, f.rule = function(o) {
    var p = new u.MathNode("mrow");
    return p;
  }, f.llap = function(o, p) {
    var d = new u.MathNode(
      "mpadded",
      [_(o.value.body, p)]
    );
    return d.setAttribute("lspace", "-1width"), d.setAttribute("width", "0px"), d;
  }, f.rlap = function(o, p) {
    var d = new u.MathNode(
      "mpadded",
      [_(o.value.body, p)]
    );
    return d.setAttribute("width", "0px"), d;
  }, f.phantom = function(o, p, d) {
    var k = m(o.value.value, p);
    return new u.MathNode("mphantom", k);
  };
  var m = function(o, p) {
    for (var d = [], k = 0; k < o.length; k++) {
      var h = o[k];
      d.push(_(h, p));
    }
    return d;
  }, _ = function(o, p) {
    if (!o)
      return new u.MathNode("mrow");
    if (f[o.type])
      return f[o.type](o, p);
    throw new i(
      "Got group of unknown type: '" + o.type + "'"
    );
  }, y = function(o, p, d) {
    var k = m(o, d), h = new u.MathNode("mrow", k), b = new u.MathNode(
      "annotation",
      [new u.TextNode(p)]
    );
    b.setAttribute("encoding", "application/x-tex");
    var w = new u.MathNode(
      "semantics",
      [h, b]
    ), g = new u.MathNode("math", [w]);
    return c(["katex-mathml"], [g]);
  };
  return ct = y, ct;
}
var lt, Tu;
function co() {
  if (Tu) return lt;
  Tu = 1;
  function e(u) {
    this.style = u.style, this.color = u.color, this.size = u.size, this.phantom = u.phantom, this.font = u.font, u.parentStyle === void 0 ? this.parentStyle = u.style : this.parentStyle = u.parentStyle, u.parentSize === void 0 ? this.parentSize = u.size : this.parentSize = u.parentSize;
  }
  e.prototype.extend = function(u) {
    var i = {
      style: this.style,
      size: this.size,
      color: this.color,
      parentStyle: this.style,
      parentSize: this.size,
      phantom: this.phantom,
      font: this.font
    };
    for (var r in u)
      u.hasOwnProperty(r) && (i[r] = u[r]);
    return new e(i);
  }, e.prototype.withStyle = function(u) {
    return this.extend({
      style: u
    });
  }, e.prototype.withSize = function(u) {
    return this.extend({
      size: u
    });
  }, e.prototype.withColor = function(u) {
    return this.extend({
      color: u
    });
  }, e.prototype.withPhantom = function() {
    return this.extend({
      phantom: !0
    });
  }, e.prototype.withFont = function(u) {
    return this.extend({
      font: u
    });
  }, e.prototype.reset = function() {
    return this.extend({});
  };
  var t = {
    "katex-blue": "#6495ed",
    "katex-orange": "#ffa500",
    "katex-pink": "#ff00af",
    "katex-red": "#df0030",
    "katex-green": "#28ae7b",
    "katex-gray": "gray",
    "katex-purple": "#9d38bd",
    "katex-blueA": "#c7e9f1",
    "katex-blueB": "#9cdceb",
    "katex-blueC": "#58c4dd",
    "katex-blueD": "#29abca",
    "katex-blueE": "#1c758a",
    "katex-tealA": "#acead7",
    "katex-tealB": "#76ddc0",
    "katex-tealC": "#5cd0b3",
    "katex-tealD": "#55c1a7",
    "katex-tealE": "#49a88f",
    "katex-greenA": "#c9e2ae",
    "katex-greenB": "#a6cf8c",
    "katex-greenC": "#83c167",
    "katex-greenD": "#77b05d",
    "katex-greenE": "#699c52",
    "katex-goldA": "#f7c797",
    "katex-goldB": "#f9b775",
    "katex-goldC": "#f0ac5f",
    "katex-goldD": "#e1a158",
    "katex-goldE": "#c78d46",
    "katex-redA": "#f7a1a3",
    "katex-redB": "#ff8080",
    "katex-redC": "#fc6255",
    "katex-redD": "#e65a4c",
    "katex-redE": "#cf5044",
    "katex-maroonA": "#ecabc1",
    "katex-maroonB": "#ec92ab",
    "katex-maroonC": "#c55f73",
    "katex-maroonD": "#a24d61",
    "katex-maroonE": "#94424f",
    "katex-purpleA": "#caa3e8",
    "katex-purpleB": "#b189c6",
    "katex-purpleC": "#9a72ac",
    "katex-purpleD": "#715582",
    "katex-purpleE": "#644172",
    "katex-mintA": "#f5f9e8",
    "katex-mintB": "#edf2df",
    "katex-mintC": "#e0e5cc",
    "katex-grayA": "#fdfdfd",
    "katex-grayB": "#f7f7f7",
    "katex-grayC": "#eeeeee",
    "katex-grayD": "#dddddd",
    "katex-grayE": "#cccccc",
    "katex-grayF": "#aaaaaa",
    "katex-grayG": "#999999",
    "katex-grayH": "#555555",
    "katex-grayI": "#333333",
    "katex-kaBlue": "#314453",
    "katex-kaGreen": "#639b24"
  };
  return e.prototype.getColor = function() {
    return this.phantom ? "transparent" : t[this.color] || this.color;
  }, lt = e, lt;
}
var ft, Mu;
function lo() {
  if (Mu) return ft;
  Mu = 1;
  var e = io(), t = so(), u = I0(), i = co(), r = _n(), n = O0(), c = u.makeSpan, a = function(s, l, f) {
    f = f || new r({});
    var m = n.TEXT;
    f.displayMode && (m = n.DISPLAY);
    var _ = new i({
      style: m,
      size: "size5"
    }), y = t(s, l, _), o = e(s, _), p = c(["katex"], [
      y,
      o
    ]);
    return f.displayMode ? c(["katex-display"], [p]) : p;
  };
  return ft = a, ft;
}
var dt = { exports: {} }, Nu;
function fo() {
  return Nu || (Nu = 1, function(e) {
    var t = Be(), u = je();
    function i(a, s, l) {
      typeof a == "string" && (a = [a]), typeof s == "number" && (s = { numArgs: s });
      for (var f = {
        numArgs: s.numArgs,
        argTypes: s.argTypes,
        greediness: s.greediness === void 0 ? 1 : s.greediness,
        allowedInText: !!s.allowedInText,
        numOptionalArgs: s.numOptionalArgs || 0,
        handler: l
      }, m = 0; m < a.length; ++m)
        e.exports[a[m]] = f;
    }
    i("\\sqrt", {
      numArgs: 1,
      numOptionalArgs: 1
    }, function(a, s) {
      var l = s[0], f = s[1];
      return {
        type: "sqrt",
        body: f,
        index: l
      };
    }), i("\\text", {
      numArgs: 1,
      argTypes: ["text"],
      greediness: 2
    }, function(a, s) {
      var l = s[0], f;
      return l.type === "ordgroup" ? f = l.value : f = [l], {
        type: "text",
        body: f
      };
    }), i("\\color", {
      numArgs: 2,
      allowedInText: !0,
      greediness: 3,
      argTypes: ["color", "original"]
    }, function(a, s) {
      var l = s[0], f = s[1], m;
      return f.type === "ordgroup" ? m = f.value : m = [f], {
        type: "color",
        color: l.value,
        value: m
      };
    }), i("\\overline", {
      numArgs: 1
    }, function(a, s) {
      var l = s[0];
      return {
        type: "overline",
        body: l
      };
    }), i("\\underline", {
      numArgs: 1
    }, function(a, s) {
      var l = s[0];
      return {
        type: "underline",
        body: l
      };
    }), i("\\rule", {
      numArgs: 2,
      numOptionalArgs: 1,
      argTypes: ["size", "size", "size"]
    }, function(a, s) {
      var l = s[0], f = s[1], m = s[2];
      return {
        type: "rule",
        shift: l && l.value,
        width: f.value,
        height: m.value
      };
    }), i("\\KaTeX", {
      numArgs: 0
    }, function(a) {
      return {
        type: "katex"
      };
    }), i("\\phantom", {
      numArgs: 1
    }, function(a, s) {
      var l = s[0], f;
      return l.type === "ordgroup" ? f = l.value : f = [l], {
        type: "phantom",
        value: f
      };
    });
    var r = {
      "\\bigl": { type: "open", size: 1 },
      "\\Bigl": { type: "open", size: 2 },
      "\\biggl": { type: "open", size: 3 },
      "\\Biggl": { type: "open", size: 4 },
      "\\bigr": { type: "close", size: 1 },
      "\\Bigr": { type: "close", size: 2 },
      "\\biggr": { type: "close", size: 3 },
      "\\Biggr": { type: "close", size: 4 },
      "\\bigm": { type: "rel", size: 1 },
      "\\Bigm": { type: "rel", size: 2 },
      "\\biggm": { type: "rel", size: 3 },
      "\\Biggm": { type: "rel", size: 4 },
      "\\big": { type: "textord", size: 1 },
      "\\Big": { type: "textord", size: 2 },
      "\\bigg": { type: "textord", size: 3 },
      "\\Bigg": { type: "textord", size: 4 }
    }, n = [
      "(",
      ")",
      "[",
      "\\lbrack",
      "]",
      "\\rbrack",
      "\\{",
      "\\lbrace",
      "\\}",
      "\\rbrace",
      "\\lfloor",
      "\\rfloor",
      "\\lceil",
      "\\rceil",
      "<",
      ">",
      "\\langle",
      "\\rangle",
      "\\lt",
      "\\gt",
      "\\lvert",
      "\\rvert",
      "\\lVert",
      "\\rVert",
      "\\lgroup",
      "\\rgroup",
      "\\lmoustache",
      "\\rmoustache",
      "/",
      "\\backslash",
      "|",
      "\\vert",
      "\\|",
      "\\Vert",
      "\\uparrow",
      "\\Uparrow",
      "\\downarrow",
      "\\Downarrow",
      "\\updownarrow",
      "\\Updownarrow",
      "."
    ], c = {
      "\\Bbb": "\\mathbb",
      "\\bold": "\\mathbf",
      "\\frak": "\\mathfrak"
    };
    i([
      "\\blue",
      "\\orange",
      "\\pink",
      "\\red",
      "\\green",
      "\\gray",
      "\\purple",
      "\\blueA",
      "\\blueB",
      "\\blueC",
      "\\blueD",
      "\\blueE",
      "\\tealA",
      "\\tealB",
      "\\tealC",
      "\\tealD",
      "\\tealE",
      "\\greenA",
      "\\greenB",
      "\\greenC",
      "\\greenD",
      "\\greenE",
      "\\goldA",
      "\\goldB",
      "\\goldC",
      "\\goldD",
      "\\goldE",
      "\\redA",
      "\\redB",
      "\\redC",
      "\\redD",
      "\\redE",
      "\\maroonA",
      "\\maroonB",
      "\\maroonC",
      "\\maroonD",
      "\\maroonE",
      "\\purpleA",
      "\\purpleB",
      "\\purpleC",
      "\\purpleD",
      "\\purpleE",
      "\\mintA",
      "\\mintB",
      "\\mintC",
      "\\grayA",
      "\\grayB",
      "\\grayC",
      "\\grayD",
      "\\grayE",
      "\\grayF",
      "\\grayG",
      "\\grayH",
      "\\grayI",
      "\\kaBlue",
      "\\kaGreen"
    ], {
      numArgs: 1,
      allowedInText: !0,
      greediness: 3
    }, function(a, s) {
      var l = s[0], f;
      return l.type === "ordgroup" ? f = l.value : f = [l], {
        type: "color",
        color: "katex-" + a.funcName.slice(1),
        value: f
      };
    }), i([
      "\\arcsin",
      "\\arccos",
      "\\arctan",
      "\\arg",
      "\\cos",
      "\\cosh",
      "\\cot",
      "\\coth",
      "\\csc",
      "\\deg",
      "\\dim",
      "\\exp",
      "\\hom",
      "\\ker",
      "\\lg",
      "\\ln",
      "\\log",
      "\\sec",
      "\\sin",
      "\\sinh",
      "\\tan",
      "\\tanh"
    ], {
      numArgs: 0
    }, function(a) {
      return {
        type: "op",
        limits: !1,
        symbol: !1,
        body: a.funcName
      };
    }), i([
      "\\det",
      "\\gcd",
      "\\inf",
      "\\lim",
      "\\liminf",
      "\\limsup",
      "\\max",
      "\\min",
      "\\Pr",
      "\\sup"
    ], {
      numArgs: 0
    }, function(a) {
      return {
        type: "op",
        limits: !0,
        symbol: !1,
        body: a.funcName
      };
    }), i([
      "\\int",
      "\\iint",
      "\\iiint",
      "\\oint"
    ], {
      numArgs: 0
    }, function(a) {
      return {
        type: "op",
        limits: !1,
        symbol: !0,
        body: a.funcName
      };
    }), i([
      "\\coprod",
      "\\bigvee",
      "\\bigwedge",
      "\\biguplus",
      "\\bigcap",
      "\\bigcup",
      "\\intop",
      "\\prod",
      "\\sum",
      "\\bigotimes",
      "\\bigoplus",
      "\\bigodot",
      "\\bigsqcup",
      "\\smallint"
    ], {
      numArgs: 0
    }, function(a) {
      return {
        type: "op",
        limits: !0,
        symbol: !0,
        body: a.funcName
      };
    }), i([
      "\\dfrac",
      "\\frac",
      "\\tfrac",
      "\\dbinom",
      "\\binom",
      "\\tbinom"
    ], {
      numArgs: 2,
      greediness: 2
    }, function(a, s) {
      var l = s[0], f = s[1], m, _ = null, y = null, o = "auto";
      switch (a.funcName) {
        case "\\dfrac":
        case "\\frac":
        case "\\tfrac":
          m = !0;
          break;
        case "\\dbinom":
        case "\\binom":
        case "\\tbinom":
          m = !1, _ = "(", y = ")";
          break;
        default:
          throw new Error("Unrecognized genfrac command");
      }
      switch (a.funcName) {
        case "\\dfrac":
        case "\\dbinom":
          o = "display";
          break;
        case "\\tfrac":
        case "\\tbinom":
          o = "text";
          break;
      }
      return {
        type: "genfrac",
        numer: l,
        denom: f,
        hasBarLine: m,
        leftDelim: _,
        rightDelim: y,
        size: o
      };
    }), i(["\\llap", "\\rlap"], {
      numArgs: 1,
      allowedInText: !0
    }, function(a, s) {
      var l = s[0];
      return {
        type: a.funcName.slice(1),
        body: l
      };
    }), i([
      "\\bigl",
      "\\Bigl",
      "\\biggl",
      "\\Biggl",
      "\\bigr",
      "\\Bigr",
      "\\biggr",
      "\\Biggr",
      "\\bigm",
      "\\Bigm",
      "\\biggm",
      "\\Biggm",
      "\\big",
      "\\Big",
      "\\bigg",
      "\\Bigg",
      "\\left",
      "\\right"
    ], {
      numArgs: 1
    }, function(a, s) {
      var l = s[0];
      if (!t.contains(n, l.value))
        throw new u(
          "Invalid delimiter: '" + l.value + "' after '" + a.funcName + "'",
          a.lexer,
          a.positions[1]
        );
      return a.funcName === "\\left" || a.funcName === "\\right" ? {
        type: "leftright",
        value: l.value
      } : {
        type: "delimsizing",
        size: r[a.funcName].size,
        delimType: r[a.funcName].type,
        value: l.value
      };
    }), i([
      "\\tiny",
      "\\scriptsize",
      "\\footnotesize",
      "\\small",
      "\\normalsize",
      "\\large",
      "\\Large",
      "\\LARGE",
      "\\huge",
      "\\Huge"
    ], 0, null), i([
      "\\displaystyle",
      "\\textstyle",
      "\\scriptstyle",
      "\\scriptscriptstyle"
    ], 0, null), i([
      // styles
      "\\mathrm",
      "\\mathit",
      "\\mathbf",
      // families
      "\\mathbb",
      "\\mathcal",
      "\\mathfrak",
      "\\mathscr",
      "\\mathsf",
      "\\mathtt",
      // aliases
      "\\Bbb",
      "\\bold",
      "\\frak"
    ], {
      numArgs: 1,
      greediness: 2
    }, function(a, s) {
      var l = s[0], f = a.funcName;
      return f in c && (f = c[f]), {
        type: "font",
        font: f.slice(1),
        body: l
      };
    }), i([
      "\\acute",
      "\\grave",
      "\\ddot",
      "\\tilde",
      "\\bar",
      "\\breve",
      "\\check",
      "\\hat",
      "\\vec",
      "\\dot"
      // We don't support expanding accents yet
      // "\\widetilde", "\\widehat"
    ], {
      numArgs: 1
    }, function(a, s) {
      var l = s[0];
      return {
        type: "accent",
        accent: a.funcName,
        base: l
      };
    }), i(["\\over", "\\choose"], {
      numArgs: 0
    }, function(a) {
      var s;
      switch (a.funcName) {
        case "\\over":
          s = "\\frac";
          break;
        case "\\choose":
          s = "\\binom";
          break;
        default:
          throw new Error("Unrecognized infix genfrac command");
      }
      return {
        type: "infix",
        replaceWith: s
      };
    }), i(["\\\\", "\\cr"], {
      numArgs: 0,
      numOptionalArgs: 1,
      argTypes: ["size"]
    }, function(a, s) {
      var l = s[0];
      return {
        type: "cr",
        size: l
      };
    }), i(["\\begin", "\\end"], {
      numArgs: 1,
      argTypes: ["text"]
    }, function(a, s) {
      var l = s[0];
      if (l.type !== "ordgroup")
        throw new u(
          "Invalid environment name",
          a.lexer,
          a.positions[1]
        );
      for (var f = "", m = 0; m < l.value.length; ++m)
        f += l.value[m].value;
      return {
        type: "environment",
        name: f,
        namepos: a.positions[1]
      };
    });
  }(dt)), dt.exports;
}
var ht = { exports: {} }, pt, Ru;
function xn() {
  if (Ru) return pt;
  Ru = 1;
  function e(t, u, i) {
    this.type = t, this.value = u, this.mode = i;
  }
  return pt = {
    ParseNode: e
  }, pt;
}
var Fu;
function ho() {
  return Fu || (Fu = 1, function(e) {
    var t = h0(), u = xn(), i = je(), r = u.ParseNode;
    function n(a, s) {
      for (var l = [], f = [l], m = []; ; ) {
        var _ = a.parseExpression(!1, null);
        l.push(new r("ordgroup", _, a.mode));
        var y = a.nextToken.text;
        if (y === "&")
          a.consume();
        else {
          if (y === "\\end")
            break;
          if (y === "\\\\" || y === "\\cr") {
            var o = a.parseFunction();
            m.push(o.value.size), l = [], f.push(l);
          } else {
            var p = Math.min(a.pos + 1, a.lexer._input.length);
            throw new i(
              "Expected & or \\\\ or \\end",
              a.lexer,
              p
            );
          }
        }
      }
      return s.body = f, s.rowGaps = m, new r(s.type, s, a.mode);
    }
    function c(a, s, l) {
      typeof a == "string" && (a = [a]), typeof s == "number" && (s = { numArgs: s });
      for (var f = {
        numArgs: s.numArgs || 0,
        argTypes: s.argTypes,
        greediness: 1,
        allowedInText: !!s.allowedInText,
        numOptionalArgs: s.numOptionalArgs || 0,
        handler: l
      }, m = 0; m < a.length; ++m)
        e.exports[a[m]] = f;
    }
    c("array", {
      numArgs: 1
    }, function(a, s) {
      var l = s[0];
      l = l.value.map ? l.value : [l];
      var f = l.map(function(_) {
        var y = _.value;
        if ("lcr".indexOf(y) !== -1)
          return {
            type: "align",
            align: y
          };
        if (y === "|")
          return {
            type: "separator",
            separator: "|"
          };
        throw new i(
          "Unknown column alignment: " + _.value,
          a.lexer,
          a.positions[1]
        );
      }), m = {
        type: "array",
        cols: f,
        hskipBeforeAndAfter: !0
        // \@preamble in lttab.dtx
      };
      return m = n(a.parser, m), m;
    }), c([
      "matrix",
      "pmatrix",
      "bmatrix",
      "Bmatrix",
      "vmatrix",
      "Vmatrix"
    ], {}, function(a) {
      var s = {
        matrix: null,
        pmatrix: ["(", ")"],
        bmatrix: ["[", "]"],
        Bmatrix: ["\\{", "\\}"],
        vmatrix: ["|", "|"],
        Vmatrix: ["\\Vert", "\\Vert"]
      }[a.envName], l = {
        type: "array",
        hskipBeforeAndAfter: !1
        // \hskip -\arraycolsep in amsmath
      };
      return l = n(a.parser, l), s && (l = new r("leftright", {
        body: [l],
        left: s[0],
        right: s[1]
      }, a.mode)), l;
    }), c("cases", {}, function(a) {
      var s = {
        type: "array",
        arraystretch: 1.2,
        cols: [{
          type: "align",
          align: "l",
          pregap: 0,
          postgap: t.metrics.quad
        }, {
          type: "align",
          align: "l",
          pregap: 0,
          postgap: 0
        }]
      };
      return s = n(a.parser, s), s = new r("leftright", {
        body: [s],
        left: "\\{",
        right: "."
      }, a.mode), s;
    }), c("aligned", {}, function(a) {
      var s = {
        type: "array",
        cols: []
      };
      s = n(a.parser, s);
      var l = new r("ordgroup", [], a.mode), f = 0;
      s.value.body.forEach(function(o) {
        var p;
        for (p = 1; p < o.length; p += 2)
          o[p].value.unshift(l);
        f < o.length && (f = o.length);
      });
      for (var m = 0; m < f; ++m) {
        var _ = "r", y = 0;
        m % 2 === 1 ? _ = "l" : m > 0 && (y = 2), s.value.cols[m] = {
          type: "align",
          align: _,
          pregap: y,
          postgap: 0
        };
      }
      return s;
    });
  }(ht)), ht.exports;
}
var bt, Ou;
function po() {
  if (Ou) return bt;
  Ou = 1;
  function e(u) {
    if (!u.__matchAtRelocatable) {
      var i = u.source + "|()", r = "g" + (u.ignoreCase ? "i" : "") + (u.multiline ? "m" : "") + (u.unicode ? "u" : "");
      u.__matchAtRelocatable = new RegExp(i, r);
    }
    return u.__matchAtRelocatable;
  }
  function t(u, i, r) {
    if (u.global || u.sticky)
      throw new Error("matchAt(...): Only non-global regexes are supported");
    var n = e(u);
    n.lastIndex = r;
    var c = n.exec(i);
    return c[c.length - 1] == null ? (c.length = c.length - 1, c) : null;
  }
  return bt = t, bt;
}
var mt, zu;
function bo() {
  if (zu) return mt;
  zu = 1;
  var e = po(), t = je();
  function u(s) {
    this._input = s;
  }
  function i(s, l, f) {
    this.text = s, this.data = l, this.position = f;
  }
  var r = new RegExp(
    `([ \r
	]+)|(---?|[!-\\[\\]-‧‪-퟿豈-￿]|[\uD800-\uDBFF][\uDC00-\uDFFF]|\\\\(?:[a-zA-Z]+|[^\uD800-\uDFFF]))`
  ), n = /\s*/;
  u.prototype._innerLex = function(s, l) {
    var f = this._input;
    if (s === f.length)
      return new i("EOF", null, s);
    var m = e(r, f, s);
    if (m === null)
      throw new t(
        "Unexpected character: '" + f[s] + "'",
        this,
        s
      );
    return m[2] ? new i(m[2], null, s + m[2].length) : l ? this._innerLex(s + m[1].length, !0) : new i(" ", null, s + m[1].length);
  };
  var c = /#[a-z0-9]+|[a-z]+/i;
  u.prototype._innerLexColor = function(s) {
    var l = this._input, f = e(n, l, s)[0];
    s += f.length;
    var m;
    if (m = e(c, l, s))
      return new i(m[0], null, s + m[0].length);
    throw new t("Invalid color", this, s);
  };
  var a = /(-?)\s*(\d+(?:\.\d*)?|\.\d+)\s*([a-z]{2})/;
  return u.prototype._innerLexSize = function(s) {
    var l = this._input, f = e(n, l, s)[0];
    s += f.length;
    var m;
    if (m = e(a, l, s)) {
      var _ = m[3];
      if (_ !== "em" && _ !== "ex")
        throw new t("Invalid unit: '" + _ + "'", this, s);
      return new i(m[0], {
        number: +(m[1] + m[2]),
        unit: _
      }, s + m[0].length);
    }
    throw new t("Invalid size", this, s);
  }, u.prototype._innerLexWhitespace = function(s) {
    var l = this._input, f = e(n, l, s)[0];
    return s += f.length, new i(f[0], null, s);
  }, u.prototype.lex = function(s, l) {
    if (l === "math")
      return this._innerLex(s, !0);
    if (l === "text")
      return this._innerLex(s, !1);
    if (l === "color")
      return this._innerLexColor(s);
    if (l === "size")
      return this._innerLexSize(s);
    if (l === "whitespace")
      return this._innerLexWhitespace(s);
  }, mt = u, mt;
}
var _t, Iu;
function mo() {
  if (Iu) return _t;
  Iu = 1;
  var e = fo(), t = ho(), u = bo(), i = z0(), r = Be(), n = xn(), c = je();
  function a(o, p) {
    this.lexer = new u(o), this.settings = p;
  }
  var s = n.ParseNode;
  function l(o, p) {
    this.result = o, this.isFunction = p;
  }
  a.prototype.expect = function(o, p) {
    if (this.nextToken.text !== o)
      throw new c(
        "Expected '" + o + "', got '" + this.nextToken.text + "'",
        this.lexer,
        this.nextToken.position
      );
    p !== !1 && this.consume();
  }, a.prototype.consume = function() {
    this.pos = this.nextToken.position, this.nextToken = this.lexer.lex(this.pos, this.mode);
  }, a.prototype.parse = function() {
    this.mode = "math", this.pos = 0, this.nextToken = this.lexer.lex(this.pos, this.mode);
    var o = this.parseInput();
    return o;
  }, a.prototype.parseInput = function() {
    var o = this.parseExpression(!1);
    return this.expect("EOF", !1), o;
  };
  var f = ["}", "\\end", "\\right", "&", "\\\\", "\\cr"];
  a.prototype.parseExpression = function(o, p) {
    for (var d = []; ; ) {
      var k = this.nextToken, h = this.pos;
      if (f.indexOf(k.text) !== -1 || p && k.text === p)
        break;
      var b = this.parseAtom();
      if (!b) {
        if (!this.settings.throwOnError && k.text[0] === "\\") {
          var w = this.handleUnsupportedCmd();
          d.push(w), h = k.position;
          continue;
        }
        break;
      }
      if (o && b.type === "infix") {
        this.pos = h, this.nextToken = k;
        break;
      }
      d.push(b);
    }
    return this.handleInfixNodes(d);
  }, a.prototype.handleInfixNodes = function(o) {
    for (var p = -1, d, k = 0; k < o.length; k++) {
      var h = o[k];
      if (h.type === "infix") {
        if (p !== -1)
          throw new c(
            "only one infix operator per group",
            this.lexer,
            -1
          );
        p = k, d = h.value.replaceWith;
      }
    }
    if (p !== -1) {
      var b, w, g = o.slice(0, p), x = o.slice(p + 1);
      g.length === 1 && g[0].type === "ordgroup" ? b = g[0] : b = new s("ordgroup", g, this.mode), x.length === 1 && x[0].type === "ordgroup" ? w = x[0] : w = new s("ordgroup", x, this.mode);
      var A = this.callFunction(
        d,
        [b, w],
        null
      );
      return [new s(A.type, A, this.mode)];
    } else
      return o;
  };
  var m = 1;
  a.prototype.handleSupSubscript = function(o) {
    var p = this.nextToken.text, d = this.pos;
    this.consume();
    var k = this.parseGroup();
    if (k)
      if (k.isFunction) {
        var h = e[k.result].greediness;
        if (h > m)
          return this.parseFunction(k);
        throw new c(
          "Got function '" + k.result + "' with no arguments as " + o,
          this.lexer,
          d + 1
        );
      } else
        return k.result;
    else {
      if (!this.settings.throwOnError && this.nextToken.text[0] === "\\")
        return this.handleUnsupportedCmd();
      throw new c(
        "Expected group after '" + p + "'",
        this.lexer,
        d + 1
      );
    }
  }, a.prototype.handleUnsupportedCmd = function() {
    for (var o = this.nextToken.text, p = [], d = 0; d < o.length; d++)
      p.push(new s("textord", o[d], "text"));
    var k = new s(
      "text",
      {
        body: p,
        type: "text"
      },
      this.mode
    ), h = new s(
      "color",
      {
        color: this.settings.errorColor,
        value: [k],
        type: "color"
      },
      this.mode
    );
    return this.consume(), h;
  }, a.prototype.parseAtom = function() {
    var o = this.parseImplicitGroup();
    if (this.mode === "text")
      return o;
    for (var p, d; ; ) {
      var k = this.nextToken;
      if (k.text === "\\limits" || k.text === "\\nolimits") {
        if (!o || o.type !== "op")
          throw new c(
            "Limit controls must follow a math operator",
            this.lexer,
            this.pos
          );
        var h = k.text === "\\limits";
        o.value.limits = h, o.value.alwaysHandleSupSub = !0, this.consume();
      } else if (k.text === "^") {
        if (p)
          throw new c(
            "Double superscript",
            this.lexer,
            this.pos
          );
        p = this.handleSupSubscript("superscript");
      } else if (k.text === "_") {
        if (d)
          throw new c(
            "Double subscript",
            this.lexer,
            this.pos
          );
        d = this.handleSupSubscript("subscript");
      } else if (k.text === "'") {
        var b = new s("textord", "\\prime", this.mode), w = [b];
        for (this.consume(); this.nextToken.text === "'"; )
          w.push(b), this.consume();
        p = new s("ordgroup", w, this.mode);
      } else
        break;
    }
    return p || d ? new s("supsub", {
      base: o,
      sup: p,
      sub: d
    }, this.mode) : o;
  };
  var _ = [
    "\\tiny",
    "\\scriptsize",
    "\\footnotesize",
    "\\small",
    "\\normalsize",
    "\\large",
    "\\Large",
    "\\LARGE",
    "\\huge",
    "\\Huge"
  ], y = [
    "\\displaystyle",
    "\\textstyle",
    "\\scriptstyle",
    "\\scriptscriptstyle"
  ];
  return a.prototype.parseImplicitGroup = function() {
    var o = this.parseSymbol();
    if (o == null)
      return this.parseFunction();
    var p = o.result, d;
    if (p === "\\left") {
      var k = this.parseFunction(o);
      d = this.parseExpression(!1), this.expect("\\right", !1);
      var h = this.parseFunction();
      return new s("leftright", {
        body: d,
        left: k.value.value,
        right: h.value.value
      }, this.mode);
    } else if (p === "\\begin") {
      var b = this.parseFunction(o), w = b.value.name;
      if (!t.hasOwnProperty(w))
        throw new c(
          "No such environment: " + w,
          this.lexer,
          b.value.namepos
        );
      var g = t[w], x = this.parseArguments("\\begin{" + w + "}", g), A = {
        mode: this.mode,
        envName: w,
        parser: this,
        lexer: this.lexer,
        positions: x.pop()
      }, C = g.handler(A, x);
      this.expect("\\end", !1);
      var D = this.parseFunction();
      if (D.value.name !== w)
        throw new c(
          "Mismatch: \\begin{" + w + "} matched by \\end{" + D.value.name + "}",
          this.lexer
          /* , end.value.namepos */
        );
      return C.position = D.position, C;
    } else return r.contains(_, p) ? (d = this.parseExpression(!1), new s("sizing", {
      // Figure out what size to use based on the list of functions above
      size: "size" + (r.indexOf(_, p) + 1),
      value: d
    }, this.mode)) : r.contains(y, p) ? (d = this.parseExpression(!0), new s("styling", {
      // Figure out what style to use by pulling out the style from
      // the function name
      style: p.slice(1, p.length - 5),
      value: d
    }, this.mode)) : this.parseFunction(o);
  }, a.prototype.parseFunction = function(o) {
    if (o || (o = this.parseGroup()), o)
      if (o.isFunction) {
        var p = o.result, d = e[p];
        if (this.mode === "text" && !d.allowedInText)
          throw new c(
            "Can't use function '" + p + "' in text mode",
            this.lexer,
            o.position
          );
        var k = this.parseArguments(p, d), h = this.callFunction(p, k, k.pop());
        return new s(h.type, h, this.mode);
      } else
        return o.result;
    else
      return null;
  }, a.prototype.callFunction = function(o, p, d) {
    var k = {
      funcName: o,
      parser: this,
      lexer: this.lexer,
      positions: d
    };
    return e[o].handler(k, p);
  }, a.prototype.parseArguments = function(o, p) {
    var d = p.numArgs + p.numOptionalArgs;
    if (d === 0)
      return [[this.pos]];
    for (var k = p.greediness, h = [this.pos], b = [], w = 0; w < d; w++) {
      var g = p.argTypes && p.argTypes[w], x;
      if (w < p.numOptionalArgs) {
        if (g ? x = this.parseSpecialGroup(g, !0) : x = this.parseOptionalGroup(), !x) {
          b.push(null), h.push(this.pos);
          continue;
        }
      } else if (g ? x = this.parseSpecialGroup(g) : x = this.parseGroup(), !x)
        if (!this.settings.throwOnError && this.nextToken.text[0] === "\\")
          x = new l(
            this.handleUnsupportedCmd(this.nextToken.text),
            !1
          );
        else
          throw new c(
            "Expected group after '" + o + "'",
            this.lexer,
            this.pos
          );
      var A;
      if (x.isFunction) {
        var C = e[x.result].greediness;
        if (C > k)
          A = this.parseFunction(x);
        else
          throw new c(
            "Got function '" + x.result + "' as argument to '" + o + "'",
            this.lexer,
            this.pos - 1
          );
      } else
        A = x.result;
      b.push(A), h.push(this.pos);
    }
    return b.push(h), b;
  }, a.prototype.parseSpecialGroup = function(o, p) {
    var d = this.mode;
    if (o === "original" && (o = d), o === "color" || o === "size") {
      var k = this.nextToken;
      if (p && k.text !== "[")
        return null;
      this.mode = o, this.expect(p ? "[" : "{");
      var h = this.nextToken;
      this.mode = d;
      var b;
      return o === "color" ? b = h.text : b = h.data, this.consume(), this.expect(p ? "]" : "}"), new l(
        new s(o, b, d),
        !1
      );
    } else if (o === "text") {
      var w = this.lexer.lex(this.pos, "whitespace");
      this.pos = w.position;
    }
    this.mode = o, this.nextToken = this.lexer.lex(this.pos, o);
    var g;
    return p ? g = this.parseOptionalGroup() : g = this.parseGroup(), this.mode = d, this.nextToken = this.lexer.lex(this.pos, d), g;
  }, a.prototype.parseGroup = function() {
    if (this.nextToken.text === "{") {
      this.consume();
      var o = this.parseExpression(!1);
      return this.expect("}"), new l(
        new s("ordgroup", o, this.mode),
        !1
      );
    } else
      return this.parseSymbol();
  }, a.prototype.parseOptionalGroup = function() {
    if (this.nextToken.text === "[") {
      this.consume();
      var o = this.parseExpression(!1, "]");
      return this.expect("]"), new l(
        new s("ordgroup", o, this.mode),
        !1
      );
    } else
      return null;
  }, a.prototype.parseSymbol = function() {
    var o = this.nextToken;
    return e[o.text] ? (this.consume(), new l(
      o.text,
      !0
    )) : i[this.mode][o.text] ? (this.consume(), new l(
      new s(
        i[this.mode][o.text].group,
        o.text,
        this.mode
      ),
      !1
    )) : null;
  }, a.prototype.ParseNode = s, _t = a, _t;
}
var gt, Lu;
function _o() {
  if (Lu) return gt;
  Lu = 1;
  var e = mo(), t = function(u, i) {
    var r = new e(u, i);
    return r.parse();
  };
  return gt = t, gt;
}
var xt, Bu;
function go() {
  if (Bu) return xt;
  Bu = 1;
  var e = je(), t = _n(), u = lo(), i = _o(), r = Be(), n = function(s, l, f) {
    r.clearNode(l);
    var m = new t(f), _ = i(s, m), y = u(_, s, m).toNode();
    l.appendChild(y);
  };
  typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn(
    "Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."
  ), n = function() {
    throw new e("KaTeX doesn't work in quirks mode.");
  });
  var c = function(s, l) {
    var f = new t(l), m = i(s, f);
    return u(m, s, f).toMarkup();
  }, a = function(s, l) {
    var f = new t(l);
    return i(s, f);
  };
  return xt = {
    render: n,
    renderToString: c,
    /**
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __parse: a,
    ParseError: e
  }, xt;
}
var yt, Pu;
function xo() {
  if (Pu) return yt;
  Pu = 1;
  var e = go();
  function t(r, n) {
    var c, a, s = r.posMax, l = !0, f = !0;
    return c = n > 0 ? r.src.charCodeAt(n - 1) : -1, a = n + 1 <= s ? r.src.charCodeAt(n + 1) : -1, (c === 32 || c === 9 || a >= 48 && a <= 57) && (f = !1), (a === 32 || a === 9) && (l = !1), {
      can_open: l,
      can_close: f
    };
  }
  function u(r, n) {
    var c, a, s, l, f;
    if (r.src[r.pos] !== "$")
      return !1;
    if (l = t(r, r.pos), !l.can_open)
      return n || (r.pending += "$"), r.pos += 1, !0;
    for (c = r.pos + 1, a = c; (a = r.src.indexOf("$", a)) !== -1; ) {
      for (f = a - 1; r.src[f] === "\\"; )
        f -= 1;
      if ((a - f) % 2 == 1)
        break;
      a += 1;
    }
    return a === -1 ? (n || (r.pending += "$"), r.pos = c, !0) : a - c === 0 ? (n || (r.pending += "$$"), r.pos = c + 1, !0) : (l = t(r, a), l.can_close ? (n || (s = r.push("math_inline", "math", 0), s.markup = "$", s.content = r.src.slice(c, a)), r.pos = a + 1, !0) : (n || (r.pending += "$"), r.pos = c, !0));
  }
  function i(r, n, c, a) {
    var s, l, f, m, _ = !1, y, o = r.bMarks[n] + r.tShift[n], p = r.eMarks[n];
    if (o + 2 > p || r.src.slice(o, o + 2) !== "$$")
      return !1;
    if (o += 2, s = r.src.slice(o, p), a)
      return !0;
    for (s.trim().slice(-2) === "$$" && (s = s.trim().slice(0, -2), _ = !0), f = n; !_ && (f++, !(f >= c || (o = r.bMarks[f] + r.tShift[f], p = r.eMarks[f], o < p && r.tShift[f] < r.blkIndent))); )
      r.src.slice(o, p).trim().slice(-2) === "$$" && (m = r.src.slice(0, p).lastIndexOf("$$"), l = r.src.slice(o, m), _ = !0);
    return r.line = f + 1, y = r.push("math_block", "math", 0), y.block = !0, y.content = (s && s.trim() ? s + `
` : "") + r.getLines(n + 1, f, r.tShift[n], !0) + (l && l.trim() ? l : ""), y.map = [n, r.line], y.markup = "$$", !0;
  }
  return yt = function(n, c) {
    c = c || {};
    var a = function(m) {
      c.displayMode = !1;
      try {
        return e.renderToString(m, c);
      } catch (_) {
        return c.throwOnError && console.log(_), m;
      }
    }, s = function(m, _) {
      return a(m[_].content);
    }, l = function(m) {
      c.displayMode = !0;
      try {
        return "<p>" + e.renderToString(m, c) + "</p>";
      } catch (_) {
        return c.throwOnError && console.log(_), m;
      }
    }, f = function(m, _) {
      return l(m[_].content) + `
`;
    };
    n.inline.ruler.after("escape", "math_inline", u), n.block.ruler.after("blockquote", "math_block", i, {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }), n.renderer.rules.math_inline = s, n.renderer.rules.math_block = f;
  }, yt;
}
var yo = xo();
const vo = /* @__PURE__ */ F0(yo), ko = "echarts_content_", yn = "300px", Je = {
  container: `
        width: 100%;
        height: ${yn};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fafafa;
        border-radius: 4px;
    `,
  spinner: `
        position: relative;
        width: 40px;
        height: 40px;
        margin-bottom: 12px;
    `,
  innerRing: `
        position: absolute;
        width: 40px;
        height: 40px;
        border: 2px solid transparent;
        border-top-color: #1890ff;
        border-right-color: #1890ff;
        border-radius: 50%;
        animation: spinnerOne 1s linear infinite;
    `,
  outerRing: `
        position: absolute;
        width: 32px;
        height: 32px;
        border: 2px solid transparent;
        border-top-color: #40a9ff;
        border-right-color: #40a9ff;
        border-radius: 50%;
        top: 4px;
        left: 4px;
        animation: spinnerTwo 0.8s linear infinite;
    `,
  text: `
        color: #666;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        opacity: 0.85;
        background: linear-gradient(45deg, #1890ff, #40a9ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 500;
    `,
  keyframes: `
        @keyframes spinnerOne {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes spinnerTwo {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(4px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
    `
};
function wo(e, t = 300) {
  let u = null;
  return function(...i) {
    u && clearTimeout(u), u = setTimeout(() => e.apply(this, i), t);
  };
}
const vt = /* @__PURE__ */ new Map();
function Eo(e, t) {
  const u = e.renderer.rules.fence.bind(e.renderer.rules);
  function i(n) {
    const c = vt.get(n);
    c && (c.dispose(), vt.delete(n));
  }
  function r(n, c) {
    try {
      const a = echarts.init(document.getElementById(n));
      vt.set(n, a), t || a.setOption(c);
      const s = wo(() => a.resize());
      return window.addEventListener("resize", s), () => {
        window.removeEventListener("resize", s), i(n);
      };
    } catch (a) {
      return console.error("Chart initialization failed:", a), null;
    }
  }
  e.renderer.rules.fence = (n, c, a, s, l) => {
    const f = n[c];
    if (f.info !== "echarts")
      return u(n, c, a, s, l);
    try {
      const m = f.content.trim(), _ = JSON.parse(m), y = `${ko}${Math.random().toString(36).slice(-10)}`;
      if (!_ || typeof _ != "object")
        throw new Error("Invalid chart configuration");
      return t ? `
                    <div style="${Je.container}">
                        <div class="loading-spinner" style="${Je.spinner}">
                            <div class="spinner-ring-outer" style="${Je.outerRing}"></div>
                            <div class="spinner-ring-inner" style="${Je.innerRing}"></div>
                        </div>
                        <div style="${Je.text}">图表加载中...</div>
                        <style>
                            ${Je.keyframes}
                            .loading-spinner {
                                filter: drop-shadow(0 0 1px rgba(24, 144, 255, 0.2));
                            }
                            .spinner-ring-inner, .spinner-ring-outer {
                                box-shadow: 0 0 8px rgba(24, 144, 255, 0.1);
                            }
                            .loading-spinner + div {
                                animation: fadeIn 0.4s ease, pulse 2s ease-in-out infinite;
                            }
                        </style>
                    </div>
                ` : (setTimeout(() => r(y, _), 0), `<div id="${y}" style="width: 100%; height: ${yn}"></div>`);
    } catch (m) {
      return console.error("Chart parsing failed:", m), `<pre class="error">图表配置错误: ${m.message}</pre>`;
    }
  };
}
function Ao(e) {
  e.inline.ruler.push("utils", (t, u) => {
    const i = t.pos, r = t.posMax;
    if (t.src[i] !== "[" || t.src[i + 1] !== "[")
      return !1;
    let n = i + 2;
    for (; n < r && (t.src[n] !== "]" || t.src[n + 1] !== "]"); )
      n++;
    if (n >= r)
      return !1;
    if (!u) {
      const c = t.push("custom_inline", "", 0), a = t.src.slice(i + 2, n), s = /「(\[.*\])」/, l = a.match(s);
      let f = [];
      if (l && l[1])
        try {
          f = JSON.parse(l[1]), c.content = a.replace(s, ""), c.comeForm = f;
        } catch (m) {
          console.error("解析数组失败:", m);
        }
      else
        console.log("未找到符合条件的数组");
    }
    return t.pos = n + 2, !0;
  }), e.renderer.rules.custom_inline = (t, u) => {
    let i = "";
    for (let r = 0; r < t[u].comeForm.length; r++) {
      const n = t[u].comeForm[r];
      i += `<a class="come-from" target="_blank" href="${n.href}">${n.index}
                         <span class="come-from-detail">${n.value}</span>
                     </a> `;
    }
    return `<span class="custom">
                    ${t[u].content}
                    <span class="from">${i}</span>
                    <style>
                     .custom:hover{
                          border-bottom: 1px dashed #7269FB;
                        }
                        .come-from{
                          position: relative;
                          overflow: visible;
                          clip: auto;
                          display: inline-block;
                          text-decoration: none;
                          color: #7269FB;
                          line-height: 20px;
                          width: 20px;
                          margin-right: 10px;
                          text-align: center;
                          font-size: 12px;
                          background: #7269FB1A;
                          border-radius: 50%;
                        }
                        .come-from:hover {
                          color: white;
                          background: #7269FB;
                          border-radius: 50%;
                        }
                       
                        .come-from-detail{
                          visibility: hidden;
                          max-width: 300px;
                          min-width: 250px;
                          max-height: 500px;
                          overflow-y: scroll;
                          background: rgba(0, 0, 0, 0.7);
                          color: #fff;
                          padding: 10px;
                          border-radius: 10px;
                          text-align: center;
                          position: absolute;
                          z-index: 10;
                          top: 30px;
                          left: 0;
                          right: 0;
                        }
                        .come-from:hover .come-from-detail{
                          visibility: visible;
                        }
                        </style>
                 </span>`;
  };
}
function Co(e) {
  function t(i, r) {
    const n = i.pos, c = i.src.charCodeAt(n);
    if (r || c !== 43)
      return !1;
    const a = i.scanDelims(i.pos, !0);
    let s = a.length;
    const l = String.fromCharCode(c);
    if (s < 2)
      return !1;
    if (s % 2) {
      const f = i.push("text", "", 0);
      f.content = l, s--;
    }
    for (let f = 0; f < s; f += 2) {
      const m = i.push("text", "", 0);
      m.content = l + l, !(!a.can_open && !a.can_close) && i.delimiters.push({
        marker: c,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        jump: f / 2,
        // 1 delimiter = 2 characters
        token: i.tokens.length - 1,
        end: -1,
        open: a.can_open,
        close: a.can_close
      });
    }
    return i.pos += a.length, !0;
  }
  function u(i, r) {
    let n;
    const c = [], a = r.length;
    for (let s = 0; s < a; s++) {
      const l = r[s];
      if (l.marker !== 43 || l.end === -1)
        continue;
      const f = r[l.end];
      n = i.tokens[l.token], n.type = "ins_open", n.tag = "ins", n.nesting = 1, n.markup = "++", n.content = "", n = i.tokens[f.token], n.type = "ins_close", n.tag = "ins", n.nesting = -1, n.markup = "++", n.content = "", i.tokens[f.token - 1].type === "text" && i.tokens[f.token - 1].content === "+" && c.push(f.token - 1);
    }
    for (; c.length; ) {
      const s = c.pop();
      let l = s + 1;
      for (; l < i.tokens.length && i.tokens[l].type === "ins_close"; )
        l++;
      l--, s !== l && (n = i.tokens[l], i.tokens[l] = i.tokens[s], i.tokens[s] = n);
    }
  }
  e.inline.ruler.before("emphasis", "ins", t), e.inline.ruler2.before("emphasis", "ins", function(i) {
    const r = i.tokens_meta, n = (i.tokens_meta || []).length;
    u(i, i.delimiters);
    for (let c = 0; c < n; c++)
      r[c] && r[c].delimiters && u(i, r[c].delimiters);
  });
}
function So(e, t) {
  return e[t].content;
}
function Do(e, t, u, i, r) {
  const n = e.utils.arrayReplaceAt, c = e.utils.lib.ucmicro, a = e.utils.has, s = new RegExp([c.Z.source, c.P.source, c.Cc.source].join("|"));
  function l(f, m, _) {
    let y = 0;
    const o = [];
    if (f.replace(r, function(p, d, k) {
      let h;
      if (a(u, p)) {
        if (h = u[p], d > 0 && !s.test(k[d - 1]) || d + p.length < k.length && !s.test(k[d + p.length]))
          return;
      } else
        h = p.slice(1, -1);
      if (d > y) {
        const w = new _("text", "", 0);
        w.content = f.slice(y, d), o.push(w);
      }
      const b = new _("emoji", "", 0);
      b.markup = h, b.content = t[h], o.push(b), y = d + p.length;
    }), y < f.length) {
      const p = new _("text", "", 0);
      p.content = f.slice(y), o.push(p);
    }
    return o;
  }
  return function(m) {
    let _;
    const y = m.tokens;
    let o = 0;
    for (let p = 0, d = y.length; p < d; p++) {
      if (y[p].type !== "inline")
        continue;
      let k = y[p].children;
      for (let h = k.length - 1; h >= 0; h--)
        _ = k[h], (_.type === "link_open" || _.type === "link_close") && _.info === "auto" && (o -= _.nesting), _.type === "text" && o === 0 && i.test(_.content) && (y[p].children = k = n(
          k,
          h,
          l(_.content, _.level, m.Token)
        ));
    }
  };
}
function To(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
function Mo(e) {
  let t = e.defs;
  e.enabled.length && (t = Object.keys(t).reduce((a, s) => (e.enabled.indexOf(s) >= 0 && (a[s] = t[s]), a), {}));
  const u = Object.keys(e.shortcuts).reduce((a, s) => t[s] ? Array.isArray(e.shortcuts[s]) ? (e.shortcuts[s].forEach((l) => {
    a[l] = s;
  }), a) : (a[e.shortcuts[s]] = s, a) : a, {}), i = Object.keys(t);
  let r;
  i.length === 0 ? r = "^$" : r = i.map((a) => `:${a}:`).concat(Object.keys(u)).sort().reverse().map((a) => To(a)).join("|");
  const n = RegExp(r), c = RegExp(r, "g");
  return {
    defs: t,
    shortcuts: u,
    scanRE: n,
    replaceRE: c
  };
}
function No(e, t) {
  const u = {
    defs: {},
    shortcuts: {},
    enabled: []
  }, i = Mo(e.utils.assign({}, u, t || {}));
  e.renderer.rules.emoji = So, e.core.ruler.after(
    "linkify",
    "emoji",
    Do(e, i.defs, i.shortcuts, i.scanRE, i.replaceRE)
  );
}
const Ro = {
  angry: [">:(", ">:-("],
  blush: [':")', ':-")'],
  broken_heart: ["</3", "<\\3"],
  // :\ and :-\ not used because of conflict with markdown escaping
  confused: [":/", ":-/"],
  // twemoji shows question
  cry: [":'(", ":'-(", ":,(", ":,-("],
  frowning: [":(", ":-("],
  heart: ["<3"],
  imp: ["]:(", "]:-("],
  innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"],
  joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"],
  kissing: [":*", ":-*"],
  laughing: ["x-)", "X-)"],
  neutral_face: [":|", ":-|"],
  open_mouth: [":o", ":-o", ":O", ":-O"],
  rage: [":@", ":-@"],
  smile: [":D", ":-D"],
  smiley: [":)", ":-)"],
  smiling_imp: ["]:)", "]:-)"],
  sob: [":,'(", ":,'-(", ";(", ";-("],
  stuck_out_tongue: [":P", ":-P"],
  sunglasses: ["8-)", "B-)"],
  sweat: [",:(", ",:-("],
  sweat_smile: [",:)", ",:-)"],
  unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"],
  wink: [";)", ";-)"]
}, Fo = {
  100: "💯",
  1234: "🔢",
  grinning: "😀",
  smiley: "😃",
  smile: "😄",
  grin: "😁",
  laughing: "😆",
  satisfied: "😆",
  sweat_smile: "😅",
  rofl: "🤣",
  joy: "😂",
  slightly_smiling_face: "🙂",
  upside_down_face: "🙃",
  melting_face: "🫠",
  wink: "😉",
  blush: "😊",
  innocent: "😇",
  smiling_face_with_three_hearts: "🥰",
  heart_eyes: "😍",
  star_struck: "🤩",
  kissing_heart: "😘",
  kissing: "😗",
  relaxed: "☺️",
  kissing_closed_eyes: "😚",
  kissing_smiling_eyes: "😙",
  smiling_face_with_tear: "🥲",
  yum: "😋",
  stuck_out_tongue: "😛",
  stuck_out_tongue_winking_eye: "😜",
  zany_face: "🤪",
  stuck_out_tongue_closed_eyes: "😝",
  money_mouth_face: "🤑",
  hugs: "🤗",
  hand_over_mouth: "🤭",
  face_with_open_eyes_and_hand_over_mouth: "🫢",
  face_with_peeking_eye: "🫣",
  shushing_face: "🤫",
  thinking: "🤔",
  saluting_face: "🫡",
  zipper_mouth_face: "🤐",
  raised_eyebrow: "🤨",
  neutral_face: "😐",
  expressionless: "😑",
  no_mouth: "😶",
  dotted_line_face: "🫥",
  face_in_clouds: "😶‍🌫️",
  smirk: "😏",
  unamused: "😒",
  roll_eyes: "🙄",
  grimacing: "😬",
  face_exhaling: "😮‍💨",
  lying_face: "🤥",
  shaking_face: "🫨",
  relieved: "😌",
  pensive: "😔",
  sleepy: "😪",
  drooling_face: "🤤",
  sleeping: "😴",
  mask: "😷",
  face_with_thermometer: "🤒",
  face_with_head_bandage: "🤕",
  nauseated_face: "🤢",
  vomiting_face: "🤮",
  sneezing_face: "🤧",
  hot_face: "🥵",
  cold_face: "🥶",
  woozy_face: "🥴",
  dizzy_face: "😵",
  face_with_spiral_eyes: "😵‍💫",
  exploding_head: "🤯",
  cowboy_hat_face: "🤠",
  partying_face: "🥳",
  disguised_face: "🥸",
  sunglasses: "😎",
  nerd_face: "🤓",
  monocle_face: "🧐",
  confused: "😕",
  face_with_diagonal_mouth: "🫤",
  worried: "😟",
  slightly_frowning_face: "🙁",
  frowning_face: "☹️",
  open_mouth: "😮",
  hushed: "😯",
  astonished: "😲",
  flushed: "😳",
  pleading_face: "🥺",
  face_holding_back_tears: "🥹",
  frowning: "😦",
  anguished: "😧",
  fearful: "😨",
  cold_sweat: "😰",
  disappointed_relieved: "😥",
  cry: "😢",
  sob: "😭",
  scream: "😱",
  confounded: "😖",
  persevere: "😣",
  disappointed: "😞",
  sweat: "😓",
  weary: "😩",
  tired_face: "😫",
  yawning_face: "🥱",
  triumph: "😤",
  rage: "😡",
  pout: "😡",
  angry: "😠",
  cursing_face: "🤬",
  smiling_imp: "😈",
  imp: "👿",
  skull: "💀",
  skull_and_crossbones: "☠️",
  hankey: "💩",
  poop: "💩",
  shit: "💩",
  clown_face: "🤡",
  japanese_ogre: "👹",
  japanese_goblin: "👺",
  ghost: "👻",
  alien: "👽",
  space_invader: "👾",
  robot: "🤖",
  smiley_cat: "😺",
  smile_cat: "😸",
  joy_cat: "😹",
  heart_eyes_cat: "😻",
  smirk_cat: "😼",
  kissing_cat: "😽",
  scream_cat: "🙀",
  crying_cat_face: "😿",
  pouting_cat: "😾",
  see_no_evil: "🙈",
  hear_no_evil: "🙉",
  speak_no_evil: "🙊",
  love_letter: "💌",
  cupid: "💘",
  gift_heart: "💝",
  sparkling_heart: "💖",
  heartpulse: "💗",
  heartbeat: "💓",
  revolving_hearts: "💞",
  two_hearts: "💕",
  heart_decoration: "💟",
  heavy_heart_exclamation: "❣️",
  broken_heart: "💔",
  heart_on_fire: "❤️‍🔥",
  mending_heart: "❤️‍🩹",
  heart: "❤️",
  pink_heart: "🩷",
  orange_heart: "🧡",
  yellow_heart: "💛",
  green_heart: "💚",
  blue_heart: "💙",
  light_blue_heart: "🩵",
  purple_heart: "💜",
  brown_heart: "🤎",
  black_heart: "🖤",
  grey_heart: "🩶",
  white_heart: "🤍",
  kiss: "💋",
  anger: "💢",
  boom: "💥",
  collision: "💥",
  dizzy: "💫",
  sweat_drops: "💦",
  dash: "💨",
  hole: "🕳️",
  speech_balloon: "💬",
  eye_speech_bubble: "👁️‍🗨️",
  left_speech_bubble: "🗨️",
  right_anger_bubble: "🗯️",
  thought_balloon: "💭",
  zzz: "💤",
  wave: "👋",
  raised_back_of_hand: "🤚",
  raised_hand_with_fingers_splayed: "🖐️",
  hand: "✋",
  raised_hand: "✋",
  vulcan_salute: "🖖",
  rightwards_hand: "🫱",
  leftwards_hand: "🫲",
  palm_down_hand: "🫳",
  palm_up_hand: "🫴",
  leftwards_pushing_hand: "🫷",
  rightwards_pushing_hand: "🫸",
  ok_hand: "👌",
  pinched_fingers: "🤌",
  pinching_hand: "🤏",
  v: "✌️",
  crossed_fingers: "🤞",
  hand_with_index_finger_and_thumb_crossed: "🫰",
  love_you_gesture: "🤟",
  metal: "🤘",
  call_me_hand: "🤙",
  point_left: "👈",
  point_right: "👉",
  point_up_2: "👆",
  middle_finger: "🖕",
  fu: "🖕",
  point_down: "👇",
  point_up: "☝️",
  index_pointing_at_the_viewer: "🫵",
  "+1": "👍",
  thumbsup: "👍",
  "-1": "👎",
  thumbsdown: "👎",
  fist_raised: "✊",
  fist: "✊",
  fist_oncoming: "👊",
  facepunch: "👊",
  punch: "👊",
  fist_left: "🤛",
  fist_right: "🤜",
  clap: "👏",
  raised_hands: "🙌",
  heart_hands: "🫶",
  open_hands: "👐",
  palms_up_together: "🤲",
  handshake: "🤝",
  pray: "🙏",
  writing_hand: "✍️",
  nail_care: "💅",
  selfie: "🤳",
  muscle: "💪",
  mechanical_arm: "🦾",
  mechanical_leg: "🦿",
  leg: "🦵",
  foot: "🦶",
  ear: "👂",
  ear_with_hearing_aid: "🦻",
  nose: "👃",
  brain: "🧠",
  anatomical_heart: "🫀",
  lungs: "🫁",
  tooth: "🦷",
  bone: "🦴",
  eyes: "👀",
  eye: "👁️",
  tongue: "👅",
  lips: "👄",
  biting_lip: "🫦",
  baby: "👶",
  child: "🧒",
  boy: "👦",
  girl: "👧",
  adult: "🧑",
  blond_haired_person: "👱",
  man: "👨",
  bearded_person: "🧔",
  man_beard: "🧔‍♂️",
  woman_beard: "🧔‍♀️",
  red_haired_man: "👨‍🦰",
  curly_haired_man: "👨‍🦱",
  white_haired_man: "👨‍🦳",
  bald_man: "👨‍🦲",
  woman: "👩",
  red_haired_woman: "👩‍🦰",
  person_red_hair: "🧑‍🦰",
  curly_haired_woman: "👩‍🦱",
  person_curly_hair: "🧑‍🦱",
  white_haired_woman: "👩‍🦳",
  person_white_hair: "🧑‍🦳",
  bald_woman: "👩‍🦲",
  person_bald: "🧑‍🦲",
  blond_haired_woman: "👱‍♀️",
  blonde_woman: "👱‍♀️",
  blond_haired_man: "👱‍♂️",
  older_adult: "🧓",
  older_man: "👴",
  older_woman: "👵",
  frowning_person: "🙍",
  frowning_man: "🙍‍♂️",
  frowning_woman: "🙍‍♀️",
  pouting_face: "🙎",
  pouting_man: "🙎‍♂️",
  pouting_woman: "🙎‍♀️",
  no_good: "🙅",
  no_good_man: "🙅‍♂️",
  ng_man: "🙅‍♂️",
  no_good_woman: "🙅‍♀️",
  ng_woman: "🙅‍♀️",
  ok_person: "🙆",
  ok_man: "🙆‍♂️",
  ok_woman: "🙆‍♀️",
  tipping_hand_person: "💁",
  information_desk_person: "💁",
  tipping_hand_man: "💁‍♂️",
  sassy_man: "💁‍♂️",
  tipping_hand_woman: "💁‍♀️",
  sassy_woman: "💁‍♀️",
  raising_hand: "🙋",
  raising_hand_man: "🙋‍♂️",
  raising_hand_woman: "🙋‍♀️",
  deaf_person: "🧏",
  deaf_man: "🧏‍♂️",
  deaf_woman: "🧏‍♀️",
  bow: "🙇",
  bowing_man: "🙇‍♂️",
  bowing_woman: "🙇‍♀️",
  facepalm: "🤦",
  man_facepalming: "🤦‍♂️",
  woman_facepalming: "🤦‍♀️",
  shrug: "🤷",
  man_shrugging: "🤷‍♂️",
  woman_shrugging: "🤷‍♀️",
  health_worker: "🧑‍⚕️",
  man_health_worker: "👨‍⚕️",
  woman_health_worker: "👩‍⚕️",
  student: "🧑‍🎓",
  man_student: "👨‍🎓",
  woman_student: "👩‍🎓",
  teacher: "🧑‍🏫",
  man_teacher: "👨‍🏫",
  woman_teacher: "👩‍🏫",
  judge: "🧑‍⚖️",
  man_judge: "👨‍⚖️",
  woman_judge: "👩‍⚖️",
  farmer: "🧑‍🌾",
  man_farmer: "👨‍🌾",
  woman_farmer: "👩‍🌾",
  cook: "🧑‍🍳",
  man_cook: "👨‍🍳",
  woman_cook: "👩‍🍳",
  mechanic: "🧑‍🔧",
  man_mechanic: "👨‍🔧",
  woman_mechanic: "👩‍🔧",
  factory_worker: "🧑‍🏭",
  man_factory_worker: "👨‍🏭",
  woman_factory_worker: "👩‍🏭",
  office_worker: "🧑‍💼",
  man_office_worker: "👨‍💼",
  woman_office_worker: "👩‍💼",
  scientist: "🧑‍🔬",
  man_scientist: "👨‍🔬",
  woman_scientist: "👩‍🔬",
  technologist: "🧑‍💻",
  man_technologist: "👨‍💻",
  woman_technologist: "👩‍💻",
  singer: "🧑‍🎤",
  man_singer: "👨‍🎤",
  woman_singer: "👩‍🎤",
  artist: "🧑‍🎨",
  man_artist: "👨‍🎨",
  woman_artist: "👩‍🎨",
  pilot: "🧑‍✈️",
  man_pilot: "👨‍✈️",
  woman_pilot: "👩‍✈️",
  astronaut: "🧑‍🚀",
  man_astronaut: "👨‍🚀",
  woman_astronaut: "👩‍🚀",
  firefighter: "🧑‍🚒",
  man_firefighter: "👨‍🚒",
  woman_firefighter: "👩‍🚒",
  police_officer: "👮",
  cop: "👮",
  policeman: "👮‍♂️",
  policewoman: "👮‍♀️",
  detective: "🕵️",
  male_detective: "🕵️‍♂️",
  female_detective: "🕵️‍♀️",
  guard: "💂",
  guardsman: "💂‍♂️",
  guardswoman: "💂‍♀️",
  ninja: "🥷",
  construction_worker: "👷",
  construction_worker_man: "👷‍♂️",
  construction_worker_woman: "👷‍♀️",
  person_with_crown: "🫅",
  prince: "🤴",
  princess: "👸",
  person_with_turban: "👳",
  man_with_turban: "👳‍♂️",
  woman_with_turban: "👳‍♀️",
  man_with_gua_pi_mao: "👲",
  woman_with_headscarf: "🧕",
  person_in_tuxedo: "🤵",
  man_in_tuxedo: "🤵‍♂️",
  woman_in_tuxedo: "🤵‍♀️",
  person_with_veil: "👰",
  man_with_veil: "👰‍♂️",
  woman_with_veil: "👰‍♀️",
  bride_with_veil: "👰‍♀️",
  pregnant_woman: "🤰",
  pregnant_man: "🫃",
  pregnant_person: "🫄",
  breast_feeding: "🤱",
  woman_feeding_baby: "👩‍🍼",
  man_feeding_baby: "👨‍🍼",
  person_feeding_baby: "🧑‍🍼",
  angel: "👼",
  santa: "🎅",
  mrs_claus: "🤶",
  mx_claus: "🧑‍🎄",
  superhero: "🦸",
  superhero_man: "🦸‍♂️",
  superhero_woman: "🦸‍♀️",
  supervillain: "🦹",
  supervillain_man: "🦹‍♂️",
  supervillain_woman: "🦹‍♀️",
  mage: "🧙",
  mage_man: "🧙‍♂️",
  mage_woman: "🧙‍♀️",
  fairy: "🧚",
  fairy_man: "🧚‍♂️",
  fairy_woman: "🧚‍♀️",
  vampire: "🧛",
  vampire_man: "🧛‍♂️",
  vampire_woman: "🧛‍♀️",
  merperson: "🧜",
  merman: "🧜‍♂️",
  mermaid: "🧜‍♀️",
  elf: "🧝",
  elf_man: "🧝‍♂️",
  elf_woman: "🧝‍♀️",
  genie: "🧞",
  genie_man: "🧞‍♂️",
  genie_woman: "🧞‍♀️",
  zombie: "🧟",
  zombie_man: "🧟‍♂️",
  zombie_woman: "🧟‍♀️",
  troll: "🧌",
  massage: "💆",
  massage_man: "💆‍♂️",
  massage_woman: "💆‍♀️",
  haircut: "💇",
  haircut_man: "💇‍♂️",
  haircut_woman: "💇‍♀️",
  walking: "🚶",
  walking_man: "🚶‍♂️",
  walking_woman: "🚶‍♀️",
  standing_person: "🧍",
  standing_man: "🧍‍♂️",
  standing_woman: "🧍‍♀️",
  kneeling_person: "🧎",
  kneeling_man: "🧎‍♂️",
  kneeling_woman: "🧎‍♀️",
  person_with_probing_cane: "🧑‍🦯",
  man_with_probing_cane: "👨‍🦯",
  woman_with_probing_cane: "👩‍🦯",
  person_in_motorized_wheelchair: "🧑‍🦼",
  man_in_motorized_wheelchair: "👨‍🦼",
  woman_in_motorized_wheelchair: "👩‍🦼",
  person_in_manual_wheelchair: "🧑‍🦽",
  man_in_manual_wheelchair: "👨‍🦽",
  woman_in_manual_wheelchair: "👩‍🦽",
  runner: "🏃",
  running: "🏃",
  running_man: "🏃‍♂️",
  running_woman: "🏃‍♀️",
  woman_dancing: "💃",
  dancer: "💃",
  man_dancing: "🕺",
  business_suit_levitating: "🕴️",
  dancers: "👯",
  dancing_men: "👯‍♂️",
  dancing_women: "👯‍♀️",
  sauna_person: "🧖",
  sauna_man: "🧖‍♂️",
  sauna_woman: "🧖‍♀️",
  climbing: "🧗",
  climbing_man: "🧗‍♂️",
  climbing_woman: "🧗‍♀️",
  person_fencing: "🤺",
  horse_racing: "🏇",
  skier: "⛷️",
  snowboarder: "🏂",
  golfing: "🏌️",
  golfing_man: "🏌️‍♂️",
  golfing_woman: "🏌️‍♀️",
  surfer: "🏄",
  surfing_man: "🏄‍♂️",
  surfing_woman: "🏄‍♀️",
  rowboat: "🚣",
  rowing_man: "🚣‍♂️",
  rowing_woman: "🚣‍♀️",
  swimmer: "🏊",
  swimming_man: "🏊‍♂️",
  swimming_woman: "🏊‍♀️",
  bouncing_ball_person: "⛹️",
  bouncing_ball_man: "⛹️‍♂️",
  basketball_man: "⛹️‍♂️",
  bouncing_ball_woman: "⛹️‍♀️",
  basketball_woman: "⛹️‍♀️",
  weight_lifting: "🏋️",
  weight_lifting_man: "🏋️‍♂️",
  weight_lifting_woman: "🏋️‍♀️",
  bicyclist: "🚴",
  biking_man: "🚴‍♂️",
  biking_woman: "🚴‍♀️",
  mountain_bicyclist: "🚵",
  mountain_biking_man: "🚵‍♂️",
  mountain_biking_woman: "🚵‍♀️",
  cartwheeling: "🤸",
  man_cartwheeling: "🤸‍♂️",
  woman_cartwheeling: "🤸‍♀️",
  wrestling: "🤼",
  men_wrestling: "🤼‍♂️",
  women_wrestling: "🤼‍♀️",
  water_polo: "🤽",
  man_playing_water_polo: "🤽‍♂️",
  woman_playing_water_polo: "🤽‍♀️",
  handball_person: "🤾",
  man_playing_handball: "🤾‍♂️",
  woman_playing_handball: "🤾‍♀️",
  juggling_person: "🤹",
  man_juggling: "🤹‍♂️",
  woman_juggling: "🤹‍♀️",
  lotus_position: "🧘",
  lotus_position_man: "🧘‍♂️",
  lotus_position_woman: "🧘‍♀️",
  bath: "🛀",
  sleeping_bed: "🛌",
  people_holding_hands: "🧑‍🤝‍🧑",
  two_women_holding_hands: "👭",
  couple: "👫",
  two_men_holding_hands: "👬",
  couplekiss: "💏",
  couplekiss_man_woman: "👩‍❤️‍💋‍👨",
  couplekiss_man_man: "👨‍❤️‍💋‍👨",
  couplekiss_woman_woman: "👩‍❤️‍💋‍👩",
  couple_with_heart: "💑",
  couple_with_heart_woman_man: "👩‍❤️‍👨",
  couple_with_heart_man_man: "👨‍❤️‍👨",
  couple_with_heart_woman_woman: "👩‍❤️‍👩",
  family: "👪",
  family_man_woman_boy: "👨‍👩‍👦",
  family_man_woman_girl: "👨‍👩‍👧",
  family_man_woman_girl_boy: "👨‍👩‍👧‍👦",
  family_man_woman_boy_boy: "👨‍👩‍👦‍👦",
  family_man_woman_girl_girl: "👨‍👩‍👧‍👧",
  family_man_man_boy: "👨‍👨‍👦",
  family_man_man_girl: "👨‍👨‍👧",
  family_man_man_girl_boy: "👨‍👨‍👧‍👦",
  family_man_man_boy_boy: "👨‍👨‍👦‍👦",
  family_man_man_girl_girl: "👨‍👨‍👧‍👧",
  family_woman_woman_boy: "👩‍👩‍👦",
  family_woman_woman_girl: "👩‍👩‍👧",
  family_woman_woman_girl_boy: "👩‍👩‍👧‍👦",
  family_woman_woman_boy_boy: "👩‍👩‍👦‍👦",
  family_woman_woman_girl_girl: "👩‍👩‍👧‍👧",
  family_man_boy: "👨‍👦",
  family_man_boy_boy: "👨‍👦‍👦",
  family_man_girl: "👨‍👧",
  family_man_girl_boy: "👨‍👧‍👦",
  family_man_girl_girl: "👨‍👧‍👧",
  family_woman_boy: "👩‍👦",
  family_woman_boy_boy: "👩‍👦‍👦",
  family_woman_girl: "👩‍👧",
  family_woman_girl_boy: "👩‍👧‍👦",
  family_woman_girl_girl: "👩‍👧‍👧",
  speaking_head: "🗣️",
  bust_in_silhouette: "👤",
  busts_in_silhouette: "👥",
  people_hugging: "🫂",
  footprints: "👣",
  monkey_face: "🐵",
  monkey: "🐒",
  gorilla: "🦍",
  orangutan: "🦧",
  dog: "🐶",
  dog2: "🐕",
  guide_dog: "🦮",
  service_dog: "🐕‍🦺",
  poodle: "🐩",
  wolf: "🐺",
  fox_face: "🦊",
  raccoon: "🦝",
  cat: "🐱",
  cat2: "🐈",
  black_cat: "🐈‍⬛",
  lion: "🦁",
  tiger: "🐯",
  tiger2: "🐅",
  leopard: "🐆",
  horse: "🐴",
  moose: "🫎",
  donkey: "🫏",
  racehorse: "🐎",
  unicorn: "🦄",
  zebra: "🦓",
  deer: "🦌",
  bison: "🦬",
  cow: "🐮",
  ox: "🐂",
  water_buffalo: "🐃",
  cow2: "🐄",
  pig: "🐷",
  pig2: "🐖",
  boar: "🐗",
  pig_nose: "🐽",
  ram: "🐏",
  sheep: "🐑",
  goat: "🐐",
  dromedary_camel: "🐪",
  camel: "🐫",
  llama: "🦙",
  giraffe: "🦒",
  elephant: "🐘",
  mammoth: "🦣",
  rhinoceros: "🦏",
  hippopotamus: "🦛",
  mouse: "🐭",
  mouse2: "🐁",
  rat: "🐀",
  hamster: "🐹",
  rabbit: "🐰",
  rabbit2: "🐇",
  chipmunk: "🐿️",
  beaver: "🦫",
  hedgehog: "🦔",
  bat: "🦇",
  bear: "🐻",
  polar_bear: "🐻‍❄️",
  koala: "🐨",
  panda_face: "🐼",
  sloth: "🦥",
  otter: "🦦",
  skunk: "🦨",
  kangaroo: "🦘",
  badger: "🦡",
  feet: "🐾",
  paw_prints: "🐾",
  turkey: "🦃",
  chicken: "🐔",
  rooster: "🐓",
  hatching_chick: "🐣",
  baby_chick: "🐤",
  hatched_chick: "🐥",
  bird: "🐦",
  penguin: "🐧",
  dove: "🕊️",
  eagle: "🦅",
  duck: "🦆",
  swan: "🦢",
  owl: "🦉",
  dodo: "🦤",
  feather: "🪶",
  flamingo: "🦩",
  peacock: "🦚",
  parrot: "🦜",
  wing: "🪽",
  black_bird: "🐦‍⬛",
  goose: "🪿",
  frog: "🐸",
  crocodile: "🐊",
  turtle: "🐢",
  lizard: "🦎",
  snake: "🐍",
  dragon_face: "🐲",
  dragon: "🐉",
  sauropod: "🦕",
  "t-rex": "🦖",
  whale: "🐳",
  whale2: "🐋",
  dolphin: "🐬",
  flipper: "🐬",
  seal: "🦭",
  fish: "🐟",
  tropical_fish: "🐠",
  blowfish: "🐡",
  shark: "🦈",
  octopus: "🐙",
  shell: "🐚",
  coral: "🪸",
  jellyfish: "🪼",
  snail: "🐌",
  butterfly: "🦋",
  bug: "🐛",
  ant: "🐜",
  bee: "🐝",
  honeybee: "🐝",
  beetle: "🪲",
  lady_beetle: "🐞",
  cricket: "🦗",
  cockroach: "🪳",
  spider: "🕷️",
  spider_web: "🕸️",
  scorpion: "🦂",
  mosquito: "🦟",
  fly: "🪰",
  worm: "🪱",
  microbe: "🦠",
  bouquet: "💐",
  cherry_blossom: "🌸",
  white_flower: "💮",
  lotus: "🪷",
  rosette: "🏵️",
  rose: "🌹",
  wilted_flower: "🥀",
  hibiscus: "🌺",
  sunflower: "🌻",
  blossom: "🌼",
  tulip: "🌷",
  hyacinth: "🪻",
  seedling: "🌱",
  potted_plant: "🪴",
  evergreen_tree: "🌲",
  deciduous_tree: "🌳",
  palm_tree: "🌴",
  cactus: "🌵",
  ear_of_rice: "🌾",
  herb: "🌿",
  shamrock: "☘️",
  four_leaf_clover: "🍀",
  maple_leaf: "🍁",
  fallen_leaf: "🍂",
  leaves: "🍃",
  empty_nest: "🪹",
  nest_with_eggs: "🪺",
  mushroom: "🍄",
  grapes: "🍇",
  melon: "🍈",
  watermelon: "🍉",
  tangerine: "🍊",
  orange: "🍊",
  mandarin: "🍊",
  lemon: "🍋",
  banana: "🍌",
  pineapple: "🍍",
  mango: "🥭",
  apple: "🍎",
  green_apple: "🍏",
  pear: "🍐",
  peach: "🍑",
  cherries: "🍒",
  strawberry: "🍓",
  blueberries: "🫐",
  kiwi_fruit: "🥝",
  tomato: "🍅",
  olive: "🫒",
  coconut: "🥥",
  avocado: "🥑",
  eggplant: "🍆",
  potato: "🥔",
  carrot: "🥕",
  corn: "🌽",
  hot_pepper: "🌶️",
  bell_pepper: "🫑",
  cucumber: "🥒",
  leafy_green: "🥬",
  broccoli: "🥦",
  garlic: "🧄",
  onion: "🧅",
  peanuts: "🥜",
  beans: "🫘",
  chestnut: "🌰",
  ginger_root: "🫚",
  pea_pod: "🫛",
  bread: "🍞",
  croissant: "🥐",
  baguette_bread: "🥖",
  flatbread: "🫓",
  pretzel: "🥨",
  bagel: "🥯",
  pancakes: "🥞",
  waffle: "🧇",
  cheese: "🧀",
  meat_on_bone: "🍖",
  poultry_leg: "🍗",
  cut_of_meat: "🥩",
  bacon: "🥓",
  hamburger: "🍔",
  fries: "🍟",
  pizza: "🍕",
  hotdog: "🌭",
  sandwich: "🥪",
  taco: "🌮",
  burrito: "🌯",
  tamale: "🫔",
  stuffed_flatbread: "🥙",
  falafel: "🧆",
  egg: "🥚",
  fried_egg: "🍳",
  shallow_pan_of_food: "🥘",
  stew: "🍲",
  fondue: "🫕",
  bowl_with_spoon: "🥣",
  green_salad: "🥗",
  popcorn: "🍿",
  butter: "🧈",
  salt: "🧂",
  canned_food: "🥫",
  bento: "🍱",
  rice_cracker: "🍘",
  rice_ball: "🍙",
  rice: "🍚",
  curry: "🍛",
  ramen: "🍜",
  spaghetti: "🍝",
  sweet_potato: "🍠",
  oden: "🍢",
  sushi: "🍣",
  fried_shrimp: "🍤",
  fish_cake: "🍥",
  moon_cake: "🥮",
  dango: "🍡",
  dumpling: "🥟",
  fortune_cookie: "🥠",
  takeout_box: "🥡",
  crab: "🦀",
  lobster: "🦞",
  shrimp: "🦐",
  squid: "🦑",
  oyster: "🦪",
  icecream: "🍦",
  shaved_ice: "🍧",
  ice_cream: "🍨",
  doughnut: "🍩",
  cookie: "🍪",
  birthday: "🎂",
  cake: "🍰",
  cupcake: "🧁",
  pie: "🥧",
  chocolate_bar: "🍫",
  candy: "🍬",
  lollipop: "🍭",
  custard: "🍮",
  honey_pot: "🍯",
  baby_bottle: "🍼",
  milk_glass: "🥛",
  coffee: "☕",
  teapot: "🫖",
  tea: "🍵",
  sake: "🍶",
  champagne: "🍾",
  wine_glass: "🍷",
  cocktail: "🍸",
  tropical_drink: "🍹",
  beer: "🍺",
  beers: "🍻",
  clinking_glasses: "🥂",
  tumbler_glass: "🥃",
  pouring_liquid: "🫗",
  cup_with_straw: "🥤",
  bubble_tea: "🧋",
  beverage_box: "🧃",
  mate: "🧉",
  ice_cube: "🧊",
  chopsticks: "🥢",
  plate_with_cutlery: "🍽️",
  fork_and_knife: "🍴",
  spoon: "🥄",
  hocho: "🔪",
  knife: "🔪",
  jar: "🫙",
  amphora: "🏺",
  earth_africa: "🌍",
  earth_americas: "🌎",
  earth_asia: "🌏",
  globe_with_meridians: "🌐",
  world_map: "🗺️",
  japan: "🗾",
  compass: "🧭",
  mountain_snow: "🏔️",
  mountain: "⛰️",
  volcano: "🌋",
  mount_fuji: "🗻",
  camping: "🏕️",
  beach_umbrella: "🏖️",
  desert: "🏜️",
  desert_island: "🏝️",
  national_park: "🏞️",
  stadium: "🏟️",
  classical_building: "🏛️",
  building_construction: "🏗️",
  bricks: "🧱",
  rock: "🪨",
  wood: "🪵",
  hut: "🛖",
  houses: "🏘️",
  derelict_house: "🏚️",
  house: "🏠",
  house_with_garden: "🏡",
  office: "🏢",
  post_office: "🏣",
  european_post_office: "🏤",
  hospital: "🏥",
  bank: "🏦",
  hotel: "🏨",
  love_hotel: "🏩",
  convenience_store: "🏪",
  school: "🏫",
  department_store: "🏬",
  factory: "🏭",
  japanese_castle: "🏯",
  european_castle: "🏰",
  wedding: "💒",
  tokyo_tower: "🗼",
  statue_of_liberty: "🗽",
  church: "⛪",
  mosque: "🕌",
  hindu_temple: "🛕",
  synagogue: "🕍",
  shinto_shrine: "⛩️",
  kaaba: "🕋",
  fountain: "⛲",
  tent: "⛺",
  foggy: "🌁",
  night_with_stars: "🌃",
  cityscape: "🏙️",
  sunrise_over_mountains: "🌄",
  sunrise: "🌅",
  city_sunset: "🌆",
  city_sunrise: "🌇",
  bridge_at_night: "🌉",
  hotsprings: "♨️",
  carousel_horse: "🎠",
  playground_slide: "🛝",
  ferris_wheel: "🎡",
  roller_coaster: "🎢",
  barber: "💈",
  circus_tent: "🎪",
  steam_locomotive: "🚂",
  railway_car: "🚃",
  bullettrain_side: "🚄",
  bullettrain_front: "🚅",
  train2: "🚆",
  metro: "🚇",
  light_rail: "🚈",
  station: "🚉",
  tram: "🚊",
  monorail: "🚝",
  mountain_railway: "🚞",
  train: "🚋",
  bus: "🚌",
  oncoming_bus: "🚍",
  trolleybus: "🚎",
  minibus: "🚐",
  ambulance: "🚑",
  fire_engine: "🚒",
  police_car: "🚓",
  oncoming_police_car: "🚔",
  taxi: "🚕",
  oncoming_taxi: "🚖",
  car: "🚗",
  red_car: "🚗",
  oncoming_automobile: "🚘",
  blue_car: "🚙",
  pickup_truck: "🛻",
  truck: "🚚",
  articulated_lorry: "🚛",
  tractor: "🚜",
  racing_car: "🏎️",
  motorcycle: "🏍️",
  motor_scooter: "🛵",
  manual_wheelchair: "🦽",
  motorized_wheelchair: "🦼",
  auto_rickshaw: "🛺",
  bike: "🚲",
  kick_scooter: "🛴",
  skateboard: "🛹",
  roller_skate: "🛼",
  busstop: "🚏",
  motorway: "🛣️",
  railway_track: "🛤️",
  oil_drum: "🛢️",
  fuelpump: "⛽",
  wheel: "🛞",
  rotating_light: "🚨",
  traffic_light: "🚥",
  vertical_traffic_light: "🚦",
  stop_sign: "🛑",
  construction: "🚧",
  anchor: "⚓",
  ring_buoy: "🛟",
  boat: "⛵",
  sailboat: "⛵",
  canoe: "🛶",
  speedboat: "🚤",
  passenger_ship: "🛳️",
  ferry: "⛴️",
  motor_boat: "🛥️",
  ship: "🚢",
  airplane: "✈️",
  small_airplane: "🛩️",
  flight_departure: "🛫",
  flight_arrival: "🛬",
  parachute: "🪂",
  seat: "💺",
  helicopter: "🚁",
  suspension_railway: "🚟",
  mountain_cableway: "🚠",
  aerial_tramway: "🚡",
  artificial_satellite: "🛰️",
  rocket: "🚀",
  flying_saucer: "🛸",
  bellhop_bell: "🛎️",
  luggage: "🧳",
  hourglass: "⌛",
  hourglass_flowing_sand: "⏳",
  watch: "⌚",
  alarm_clock: "⏰",
  stopwatch: "⏱️",
  timer_clock: "⏲️",
  mantelpiece_clock: "🕰️",
  clock12: "🕛",
  clock1230: "🕧",
  clock1: "🕐",
  clock130: "🕜",
  clock2: "🕑",
  clock230: "🕝",
  clock3: "🕒",
  clock330: "🕞",
  clock4: "🕓",
  clock430: "🕟",
  clock5: "🕔",
  clock530: "🕠",
  clock6: "🕕",
  clock630: "🕡",
  clock7: "🕖",
  clock730: "🕢",
  clock8: "🕗",
  clock830: "🕣",
  clock9: "🕘",
  clock930: "🕤",
  clock10: "🕙",
  clock1030: "🕥",
  clock11: "🕚",
  clock1130: "🕦",
  new_moon: "🌑",
  waxing_crescent_moon: "🌒",
  first_quarter_moon: "🌓",
  moon: "🌔",
  waxing_gibbous_moon: "🌔",
  full_moon: "🌕",
  waning_gibbous_moon: "🌖",
  last_quarter_moon: "🌗",
  waning_crescent_moon: "🌘",
  crescent_moon: "🌙",
  new_moon_with_face: "🌚",
  first_quarter_moon_with_face: "🌛",
  last_quarter_moon_with_face: "🌜",
  thermometer: "🌡️",
  sunny: "☀️",
  full_moon_with_face: "🌝",
  sun_with_face: "🌞",
  ringed_planet: "🪐",
  star: "⭐",
  star2: "🌟",
  stars: "🌠",
  milky_way: "🌌",
  cloud: "☁️",
  partly_sunny: "⛅",
  cloud_with_lightning_and_rain: "⛈️",
  sun_behind_small_cloud: "🌤️",
  sun_behind_large_cloud: "🌥️",
  sun_behind_rain_cloud: "🌦️",
  cloud_with_rain: "🌧️",
  cloud_with_snow: "🌨️",
  cloud_with_lightning: "🌩️",
  tornado: "🌪️",
  fog: "🌫️",
  wind_face: "🌬️",
  cyclone: "🌀",
  rainbow: "🌈",
  closed_umbrella: "🌂",
  open_umbrella: "☂️",
  umbrella: "☔",
  parasol_on_ground: "⛱️",
  zap: "⚡",
  snowflake: "❄️",
  snowman_with_snow: "☃️",
  snowman: "⛄",
  comet: "☄️",
  fire: "🔥",
  droplet: "💧",
  ocean: "🌊",
  jack_o_lantern: "🎃",
  christmas_tree: "🎄",
  fireworks: "🎆",
  sparkler: "🎇",
  firecracker: "🧨",
  sparkles: "✨",
  balloon: "🎈",
  tada: "🎉",
  confetti_ball: "🎊",
  tanabata_tree: "🎋",
  bamboo: "🎍",
  dolls: "🎎",
  flags: "🎏",
  wind_chime: "🎐",
  rice_scene: "🎑",
  red_envelope: "🧧",
  ribbon: "🎀",
  gift: "🎁",
  reminder_ribbon: "🎗️",
  tickets: "🎟️",
  ticket: "🎫",
  medal_military: "🎖️",
  trophy: "🏆",
  medal_sports: "🏅",
  "1st_place_medal": "🥇",
  "2nd_place_medal": "🥈",
  "3rd_place_medal": "🥉",
  soccer: "⚽",
  baseball: "⚾",
  softball: "🥎",
  basketball: "🏀",
  volleyball: "🏐",
  football: "🏈",
  rugby_football: "🏉",
  tennis: "🎾",
  flying_disc: "🥏",
  bowling: "🎳",
  cricket_game: "🏏",
  field_hockey: "🏑",
  ice_hockey: "🏒",
  lacrosse: "🥍",
  ping_pong: "🏓",
  badminton: "🏸",
  boxing_glove: "🥊",
  martial_arts_uniform: "🥋",
  goal_net: "🥅",
  golf: "⛳",
  ice_skate: "⛸️",
  fishing_pole_and_fish: "🎣",
  diving_mask: "🤿",
  running_shirt_with_sash: "🎽",
  ski: "🎿",
  sled: "🛷",
  curling_stone: "🥌",
  dart: "🎯",
  yo_yo: "🪀",
  kite: "🪁",
  gun: "🔫",
  "8ball": "🎱",
  crystal_ball: "🔮",
  magic_wand: "🪄",
  video_game: "🎮",
  joystick: "🕹️",
  slot_machine: "🎰",
  game_die: "🎲",
  jigsaw: "🧩",
  teddy_bear: "🧸",
  pinata: "🪅",
  mirror_ball: "🪩",
  nesting_dolls: "🪆",
  spades: "♠️",
  hearts: "♥️",
  diamonds: "♦️",
  clubs: "♣️",
  chess_pawn: "♟️",
  black_joker: "🃏",
  mahjong: "🀄",
  flower_playing_cards: "🎴",
  performing_arts: "🎭",
  framed_picture: "🖼️",
  art: "🎨",
  thread: "🧵",
  sewing_needle: "🪡",
  yarn: "🧶",
  knot: "🪢",
  eyeglasses: "👓",
  dark_sunglasses: "🕶️",
  goggles: "🥽",
  lab_coat: "🥼",
  safety_vest: "🦺",
  necktie: "👔",
  shirt: "👕",
  tshirt: "👕",
  jeans: "👖",
  scarf: "🧣",
  gloves: "🧤",
  coat: "🧥",
  socks: "🧦",
  dress: "👗",
  kimono: "👘",
  sari: "🥻",
  one_piece_swimsuit: "🩱",
  swim_brief: "🩲",
  shorts: "🩳",
  bikini: "👙",
  womans_clothes: "👚",
  folding_hand_fan: "🪭",
  purse: "👛",
  handbag: "👜",
  pouch: "👝",
  shopping: "🛍️",
  school_satchel: "🎒",
  thong_sandal: "🩴",
  mans_shoe: "👞",
  shoe: "👞",
  athletic_shoe: "👟",
  hiking_boot: "🥾",
  flat_shoe: "🥿",
  high_heel: "👠",
  sandal: "👡",
  ballet_shoes: "🩰",
  boot: "👢",
  hair_pick: "🪮",
  crown: "👑",
  womans_hat: "👒",
  tophat: "🎩",
  mortar_board: "🎓",
  billed_cap: "🧢",
  military_helmet: "🪖",
  rescue_worker_helmet: "⛑️",
  prayer_beads: "📿",
  lipstick: "💄",
  ring: "💍",
  gem: "💎",
  mute: "🔇",
  speaker: "🔈",
  sound: "🔉",
  loud_sound: "🔊",
  loudspeaker: "📢",
  mega: "📣",
  postal_horn: "📯",
  bell: "🔔",
  no_bell: "🔕",
  musical_score: "🎼",
  musical_note: "🎵",
  notes: "🎶",
  studio_microphone: "🎙️",
  level_slider: "🎚️",
  control_knobs: "🎛️",
  microphone: "🎤",
  headphones: "🎧",
  radio: "📻",
  saxophone: "🎷",
  accordion: "🪗",
  guitar: "🎸",
  musical_keyboard: "🎹",
  trumpet: "🎺",
  violin: "🎻",
  banjo: "🪕",
  drum: "🥁",
  long_drum: "🪘",
  maracas: "🪇",
  flute: "🪈",
  iphone: "📱",
  calling: "📲",
  phone: "☎️",
  telephone: "☎️",
  telephone_receiver: "📞",
  pager: "📟",
  fax: "📠",
  battery: "🔋",
  low_battery: "🪫",
  electric_plug: "🔌",
  computer: "💻",
  desktop_computer: "🖥️",
  printer: "🖨️",
  keyboard: "⌨️",
  computer_mouse: "🖱️",
  trackball: "🖲️",
  minidisc: "💽",
  floppy_disk: "💾",
  cd: "💿",
  dvd: "📀",
  abacus: "🧮",
  movie_camera: "🎥",
  film_strip: "🎞️",
  film_projector: "📽️",
  clapper: "🎬",
  tv: "📺",
  camera: "📷",
  camera_flash: "📸",
  video_camera: "📹",
  vhs: "📼",
  mag: "🔍",
  mag_right: "🔎",
  candle: "🕯️",
  bulb: "💡",
  flashlight: "🔦",
  izakaya_lantern: "🏮",
  lantern: "🏮",
  diya_lamp: "🪔",
  notebook_with_decorative_cover: "📔",
  closed_book: "📕",
  book: "📖",
  open_book: "📖",
  green_book: "📗",
  blue_book: "📘",
  orange_book: "📙",
  books: "📚",
  notebook: "📓",
  ledger: "📒",
  page_with_curl: "📃",
  scroll: "📜",
  page_facing_up: "📄",
  newspaper: "📰",
  newspaper_roll: "🗞️",
  bookmark_tabs: "📑",
  bookmark: "🔖",
  label: "🏷️",
  moneybag: "💰",
  coin: "🪙",
  yen: "💴",
  dollar: "💵",
  euro: "💶",
  pound: "💷",
  money_with_wings: "💸",
  credit_card: "💳",
  receipt: "🧾",
  chart: "💹",
  envelope: "✉️",
  email: "📧",
  "e-mail": "📧",
  incoming_envelope: "📨",
  envelope_with_arrow: "📩",
  outbox_tray: "📤",
  inbox_tray: "📥",
  package: "📦",
  mailbox: "📫",
  mailbox_closed: "📪",
  mailbox_with_mail: "📬",
  mailbox_with_no_mail: "📭",
  postbox: "📮",
  ballot_box: "🗳️",
  pencil2: "✏️",
  black_nib: "✒️",
  fountain_pen: "🖋️",
  pen: "🖊️",
  paintbrush: "🖌️",
  crayon: "🖍️",
  memo: "📝",
  pencil: "📝",
  briefcase: "💼",
  file_folder: "📁",
  open_file_folder: "📂",
  card_index_dividers: "🗂️",
  date: "📅",
  calendar: "📆",
  spiral_notepad: "🗒️",
  spiral_calendar: "🗓️",
  card_index: "📇",
  chart_with_upwards_trend: "📈",
  chart_with_downwards_trend: "📉",
  bar_chart: "📊",
  clipboard: "📋",
  pushpin: "📌",
  round_pushpin: "📍",
  paperclip: "📎",
  paperclips: "🖇️",
  straight_ruler: "📏",
  triangular_ruler: "📐",
  scissors: "✂️",
  card_file_box: "🗃️",
  file_cabinet: "🗄️",
  wastebasket: "🗑️",
  lock: "🔒",
  unlock: "🔓",
  lock_with_ink_pen: "🔏",
  closed_lock_with_key: "🔐",
  key: "🔑",
  old_key: "🗝️",
  hammer: "🔨",
  axe: "🪓",
  pick: "⛏️",
  hammer_and_pick: "⚒️",
  hammer_and_wrench: "🛠️",
  dagger: "🗡️",
  crossed_swords: "⚔️",
  bomb: "💣",
  boomerang: "🪃",
  bow_and_arrow: "🏹",
  shield: "🛡️",
  carpentry_saw: "🪚",
  wrench: "🔧",
  screwdriver: "🪛",
  nut_and_bolt: "🔩",
  gear: "⚙️",
  clamp: "🗜️",
  balance_scale: "⚖️",
  probing_cane: "🦯",
  link: "🔗",
  chains: "⛓️",
  hook: "🪝",
  toolbox: "🧰",
  magnet: "🧲",
  ladder: "🪜",
  alembic: "⚗️",
  test_tube: "🧪",
  petri_dish: "🧫",
  dna: "🧬",
  microscope: "🔬",
  telescope: "🔭",
  satellite: "📡",
  syringe: "💉",
  drop_of_blood: "🩸",
  pill: "💊",
  adhesive_bandage: "🩹",
  crutch: "🩼",
  stethoscope: "🩺",
  x_ray: "🩻",
  door: "🚪",
  elevator: "🛗",
  mirror: "🪞",
  window: "🪟",
  bed: "🛏️",
  couch_and_lamp: "🛋️",
  chair: "🪑",
  toilet: "🚽",
  plunger: "🪠",
  shower: "🚿",
  bathtub: "🛁",
  mouse_trap: "🪤",
  razor: "🪒",
  lotion_bottle: "🧴",
  safety_pin: "🧷",
  broom: "🧹",
  basket: "🧺",
  roll_of_paper: "🧻",
  bucket: "🪣",
  soap: "🧼",
  bubbles: "🫧",
  toothbrush: "🪥",
  sponge: "🧽",
  fire_extinguisher: "🧯",
  shopping_cart: "🛒",
  smoking: "🚬",
  coffin: "⚰️",
  headstone: "🪦",
  funeral_urn: "⚱️",
  nazar_amulet: "🧿",
  hamsa: "🪬",
  moyai: "🗿",
  placard: "🪧",
  identification_card: "🪪",
  atm: "🏧",
  put_litter_in_its_place: "🚮",
  potable_water: "🚰",
  wheelchair: "♿",
  mens: "🚹",
  womens: "🚺",
  restroom: "🚻",
  baby_symbol: "🚼",
  wc: "🚾",
  passport_control: "🛂",
  customs: "🛃",
  baggage_claim: "🛄",
  left_luggage: "🛅",
  warning: "⚠️",
  children_crossing: "🚸",
  no_entry: "⛔",
  no_entry_sign: "🚫",
  no_bicycles: "🚳",
  no_smoking: "🚭",
  do_not_litter: "🚯",
  "non-potable_water": "🚱",
  no_pedestrians: "🚷",
  no_mobile_phones: "📵",
  underage: "🔞",
  radioactive: "☢️",
  biohazard: "☣️",
  arrow_up: "⬆️",
  arrow_upper_right: "↗️",
  arrow_right: "➡️",
  arrow_lower_right: "↘️",
  arrow_down: "⬇️",
  arrow_lower_left: "↙️",
  arrow_left: "⬅️",
  arrow_upper_left: "↖️",
  arrow_up_down: "↕️",
  left_right_arrow: "↔️",
  leftwards_arrow_with_hook: "↩️",
  arrow_right_hook: "↪️",
  arrow_heading_up: "⤴️",
  arrow_heading_down: "⤵️",
  arrows_clockwise: "🔃",
  arrows_counterclockwise: "🔄",
  back: "🔙",
  end: "🔚",
  on: "🔛",
  soon: "🔜",
  top: "🔝",
  place_of_worship: "🛐",
  atom_symbol: "⚛️",
  om: "🕉️",
  star_of_david: "✡️",
  wheel_of_dharma: "☸️",
  yin_yang: "☯️",
  latin_cross: "✝️",
  orthodox_cross: "☦️",
  star_and_crescent: "☪️",
  peace_symbol: "☮️",
  menorah: "🕎",
  six_pointed_star: "🔯",
  khanda: "🪯",
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpius: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
  ophiuchus: "⛎",
  twisted_rightwards_arrows: "🔀",
  repeat: "🔁",
  repeat_one: "🔂",
  arrow_forward: "▶️",
  fast_forward: "⏩",
  next_track_button: "⏭️",
  play_or_pause_button: "⏯️",
  arrow_backward: "◀️",
  rewind: "⏪",
  previous_track_button: "⏮️",
  arrow_up_small: "🔼",
  arrow_double_up: "⏫",
  arrow_down_small: "🔽",
  arrow_double_down: "⏬",
  pause_button: "⏸️",
  stop_button: "⏹️",
  record_button: "⏺️",
  eject_button: "⏏️",
  cinema: "🎦",
  low_brightness: "🔅",
  high_brightness: "🔆",
  signal_strength: "📶",
  wireless: "🛜",
  vibration_mode: "📳",
  mobile_phone_off: "📴",
  female_sign: "♀️",
  male_sign: "♂️",
  transgender_symbol: "⚧️",
  heavy_multiplication_x: "✖️",
  heavy_plus_sign: "➕",
  heavy_minus_sign: "➖",
  heavy_division_sign: "➗",
  heavy_equals_sign: "🟰",
  infinity: "♾️",
  bangbang: "‼️",
  interrobang: "⁉️",
  question: "❓",
  grey_question: "❔",
  grey_exclamation: "❕",
  exclamation: "❗",
  heavy_exclamation_mark: "❗",
  wavy_dash: "〰️",
  currency_exchange: "💱",
  heavy_dollar_sign: "💲",
  medical_symbol: "⚕️",
  recycle: "♻️",
  fleur_de_lis: "⚜️",
  trident: "🔱",
  name_badge: "📛",
  beginner: "🔰",
  o: "⭕",
  white_check_mark: "✅",
  ballot_box_with_check: "☑️",
  heavy_check_mark: "✔️",
  x: "❌",
  negative_squared_cross_mark: "❎",
  curly_loop: "➰",
  loop: "➿",
  part_alternation_mark: "〽️",
  eight_spoked_asterisk: "✳️",
  eight_pointed_black_star: "✴️",
  sparkle: "❇️",
  copyright: "©️",
  registered: "®️",
  tm: "™️",
  hash: "#️⃣",
  asterisk: "*️⃣",
  zero: "0️⃣",
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
  eight: "8️⃣",
  nine: "9️⃣",
  keycap_ten: "🔟",
  capital_abcd: "🔠",
  abcd: "🔡",
  symbols: "🔣",
  abc: "🔤",
  a: "🅰️",
  ab: "🆎",
  b: "🅱️",
  cl: "🆑",
  cool: "🆒",
  free: "🆓",
  information_source: "ℹ️",
  id: "🆔",
  m: "Ⓜ️",
  new: "🆕",
  ng: "🆖",
  o2: "🅾️",
  ok: "🆗",
  parking: "🅿️",
  sos: "🆘",
  up: "🆙",
  vs: "🆚",
  koko: "🈁",
  sa: "🈂️",
  ideograph_advantage: "🉐",
  accept: "🉑",
  congratulations: "㊗️",
  secret: "㊙️",
  u6e80: "🈵",
  red_circle: "🔴",
  orange_circle: "🟠",
  yellow_circle: "🟡",
  green_circle: "🟢",
  large_blue_circle: "🔵",
  purple_circle: "🟣",
  brown_circle: "🟤",
  black_circle: "⚫",
  white_circle: "⚪",
  red_square: "🟥",
  orange_square: "🟧",
  yellow_square: "🟨",
  green_square: "🟩",
  blue_square: "🟦",
  purple_square: "🟪",
  brown_square: "🟫",
  black_large_square: "⬛",
  white_large_square: "⬜",
  black_medium_square: "◼️",
  white_medium_square: "◻️",
  black_medium_small_square: "◾",
  white_medium_small_square: "◽",
  black_small_square: "▪️",
  white_small_square: "▫️",
  large_orange_diamond: "🔶",
  large_blue_diamond: "🔷",
  small_orange_diamond: "🔸",
  small_blue_diamond: "🔹",
  small_red_triangle: "🔺",
  small_red_triangle_down: "🔻",
  diamond_shape_with_a_dot_inside: "💠",
  radio_button: "🔘",
  white_square_button: "🔳",
  black_square_button: "🔲",
  checkered_flag: "🏁",
  triangular_flag_on_post: "🚩",
  crossed_flags: "🎌",
  black_flag: "🏴",
  white_flag: "🏳️",
  rainbow_flag: "🏳️‍🌈",
  transgender_flag: "🏳️‍⚧️",
  pirate_flag: "🏴‍☠️",
  ascension_island: "🇦🇨",
  andorra: "🇦🇩",
  united_arab_emirates: "🇦🇪",
  afghanistan: "🇦🇫",
  antigua_barbuda: "🇦🇬",
  anguilla: "🇦🇮",
  albania: "🇦🇱",
  armenia: "🇦🇲",
  angola: "🇦🇴",
  antarctica: "🇦🇶",
  argentina: "🇦🇷",
  american_samoa: "🇦🇸",
  austria: "🇦🇹",
  australia: "🇦🇺",
  aruba: "🇦🇼",
  aland_islands: "🇦🇽",
  azerbaijan: "🇦🇿",
  bosnia_herzegovina: "🇧🇦",
  barbados: "🇧🇧",
  bangladesh: "🇧🇩",
  belgium: "🇧🇪",
  burkina_faso: "🇧🇫",
  bulgaria: "🇧🇬",
  bahrain: "🇧🇭",
  burundi: "🇧🇮",
  benin: "🇧🇯",
  st_barthelemy: "🇧🇱",
  bermuda: "🇧🇲",
  brunei: "🇧🇳",
  bolivia: "🇧🇴",
  caribbean_netherlands: "🇧🇶",
  brazil: "🇧🇷",
  bahamas: "🇧🇸",
  bhutan: "🇧🇹",
  bouvet_island: "🇧🇻",
  botswana: "🇧🇼",
  belarus: "🇧🇾",
  belize: "🇧🇿",
  canada: "🇨🇦",
  cocos_islands: "🇨🇨",
  congo_kinshasa: "🇨🇩",
  central_african_republic: "🇨🇫",
  congo_brazzaville: "🇨🇬",
  switzerland: "🇨🇭",
  cote_divoire: "🇨🇮",
  cook_islands: "🇨🇰",
  chile: "🇨🇱",
  cameroon: "🇨🇲",
  cn: "🇨🇳",
  colombia: "🇨🇴",
  clipperton_island: "🇨🇵",
  costa_rica: "🇨🇷",
  cuba: "🇨🇺",
  cape_verde: "🇨🇻",
  curacao: "🇨🇼",
  christmas_island: "🇨🇽",
  cyprus: "🇨🇾",
  czech_republic: "🇨🇿",
  de: "🇩🇪",
  diego_garcia: "🇩🇬",
  djibouti: "🇩🇯",
  denmark: "🇩🇰",
  dominica: "🇩🇲",
  dominican_republic: "🇩🇴",
  algeria: "🇩🇿",
  ceuta_melilla: "🇪🇦",
  ecuador: "🇪🇨",
  estonia: "🇪🇪",
  egypt: "🇪🇬",
  western_sahara: "🇪🇭",
  eritrea: "🇪🇷",
  es: "🇪🇸",
  ethiopia: "🇪🇹",
  eu: "🇪🇺",
  european_union: "🇪🇺",
  finland: "🇫🇮",
  fiji: "🇫🇯",
  falkland_islands: "🇫🇰",
  micronesia: "🇫🇲",
  faroe_islands: "🇫🇴",
  fr: "🇫🇷",
  gabon: "🇬🇦",
  gb: "🇬🇧",
  uk: "🇬🇧",
  grenada: "🇬🇩",
  georgia: "🇬🇪",
  french_guiana: "🇬🇫",
  guernsey: "🇬🇬",
  ghana: "🇬🇭",
  gibraltar: "🇬🇮",
  greenland: "🇬🇱",
  gambia: "🇬🇲",
  guinea: "🇬🇳",
  guadeloupe: "🇬🇵",
  equatorial_guinea: "🇬🇶",
  greece: "🇬🇷",
  south_georgia_south_sandwich_islands: "🇬🇸",
  guatemala: "🇬🇹",
  guam: "🇬🇺",
  guinea_bissau: "🇬🇼",
  guyana: "🇬🇾",
  hong_kong: "🇭🇰",
  heard_mcdonald_islands: "🇭🇲",
  honduras: "🇭🇳",
  croatia: "🇭🇷",
  haiti: "🇭🇹",
  hungary: "🇭🇺",
  canary_islands: "🇮🇨",
  indonesia: "🇮🇩",
  ireland: "🇮🇪",
  israel: "🇮🇱",
  isle_of_man: "🇮🇲",
  india: "🇮🇳",
  british_indian_ocean_territory: "🇮🇴",
  iraq: "🇮🇶",
  iran: "🇮🇷",
  iceland: "🇮🇸",
  it: "🇮🇹",
  jersey: "🇯🇪",
  jamaica: "🇯🇲",
  jordan: "🇯🇴",
  jp: "🇯🇵",
  kenya: "🇰🇪",
  kyrgyzstan: "🇰🇬",
  cambodia: "🇰🇭",
  kiribati: "🇰🇮",
  comoros: "🇰🇲",
  st_kitts_nevis: "🇰🇳",
  north_korea: "🇰🇵",
  kr: "🇰🇷",
  kuwait: "🇰🇼",
  cayman_islands: "🇰🇾",
  kazakhstan: "🇰🇿",
  laos: "🇱🇦",
  lebanon: "🇱🇧",
  st_lucia: "🇱🇨",
  liechtenstein: "🇱🇮",
  sri_lanka: "🇱🇰",
  liberia: "🇱🇷",
  lesotho: "🇱🇸",
  lithuania: "🇱🇹",
  luxembourg: "🇱🇺",
  latvia: "🇱🇻",
  libya: "🇱🇾",
  morocco: "🇲🇦",
  monaco: "🇲🇨",
  moldova: "🇲🇩",
  montenegro: "🇲🇪",
  st_martin: "🇲🇫",
  madagascar: "🇲🇬",
  marshall_islands: "🇲🇭",
  macedonia: "🇲🇰",
  mali: "🇲🇱",
  myanmar: "🇲🇲",
  mongolia: "🇲🇳",
  macau: "🇲🇴",
  northern_mariana_islands: "🇲🇵",
  martinique: "🇲🇶",
  mauritania: "🇲🇷",
  montserrat: "🇲🇸",
  malta: "🇲🇹",
  mauritius: "🇲🇺",
  maldives: "🇲🇻",
  malawi: "🇲🇼",
  mexico: "🇲🇽",
  malaysia: "🇲🇾",
  mozambique: "🇲🇿",
  namibia: "🇳🇦",
  new_caledonia: "🇳🇨",
  niger: "🇳🇪",
  norfolk_island: "🇳🇫",
  nigeria: "🇳🇬",
  nicaragua: "🇳🇮",
  netherlands: "🇳🇱",
  norway: "🇳🇴",
  nepal: "🇳🇵",
  nauru: "🇳🇷",
  niue: "🇳🇺",
  new_zealand: "🇳🇿",
  oman: "🇴🇲",
  panama: "🇵🇦",
  peru: "🇵🇪",
  french_polynesia: "🇵🇫",
  papua_new_guinea: "🇵🇬",
  philippines: "🇵🇭",
  pakistan: "🇵🇰",
  poland: "🇵🇱",
  st_pierre_miquelon: "🇵🇲",
  pitcairn_islands: "🇵🇳",
  puerto_rico: "🇵🇷",
  palestinian_territories: "🇵🇸",
  portugal: "🇵🇹",
  palau: "🇵🇼",
  paraguay: "🇵🇾",
  qatar: "🇶🇦",
  reunion: "🇷🇪",
  romania: "🇷🇴",
  serbia: "🇷🇸",
  ru: "🇷🇺",
  rwanda: "🇷🇼",
  saudi_arabia: "🇸🇦",
  solomon_islands: "🇸🇧",
  seychelles: "🇸🇨",
  sudan: "🇸🇩",
  sweden: "🇸🇪",
  singapore: "🇸🇬",
  st_helena: "🇸🇭",
  slovenia: "🇸🇮",
  svalbard_jan_mayen: "🇸🇯",
  slovakia: "🇸🇰",
  sierra_leone: "🇸🇱",
  san_marino: "🇸🇲",
  senegal: "🇸🇳",
  somalia: "🇸🇴",
  suriname: "🇸🇷",
  south_sudan: "🇸🇸",
  sao_tome_principe: "🇸🇹",
  el_salvador: "🇸🇻",
  sint_maarten: "🇸🇽",
  syria: "🇸🇾",
  swaziland: "🇸🇿",
  tristan_da_cunha: "🇹🇦",
  turks_caicos_islands: "🇹🇨",
  chad: "🇹🇩",
  french_southern_territories: "🇹🇫",
  togo: "🇹🇬",
  thailand: "🇹🇭",
  tajikistan: "🇹🇯",
  tokelau: "🇹🇰",
  timor_leste: "🇹🇱",
  turkmenistan: "🇹🇲",
  tunisia: "🇹🇳",
  tonga: "🇹🇴",
  tr: "🇹🇷",
  trinidad_tobago: "🇹🇹",
  tuvalu: "🇹🇻",
  taiwan: "🇹🇼",
  tanzania: "🇹🇿",
  ukraine: "🇺🇦",
  uganda: "🇺🇬",
  us_outlying_islands: "🇺🇲",
  united_nations: "🇺🇳",
  us: "🇺🇸",
  uruguay: "🇺🇾",
  uzbekistan: "🇺🇿",
  vatican_city: "🇻🇦",
  st_vincent_grenadines: "🇻🇨",
  venezuela: "🇻🇪",
  british_virgin_islands: "🇻🇬",
  us_virgin_islands: "🇻🇮",
  vietnam: "🇻🇳",
  vanuatu: "🇻🇺",
  wallis_futuna: "🇼🇫",
  samoa: "🇼🇸",
  kosovo: "🇽🇰",
  yemen: "🇾🇪",
  mayotte: "🇾🇹",
  south_africa: "🇿🇦",
  zambia: "🇿🇲",
  zimbabwe: "🇿🇼",
  england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿"
};
function Oo(e, t) {
  const u = {
    defs: Fo,
    shortcuts: Ro,
    enabled: []
  }, i = e.utils.assign({}, u, t || {});
  No(e, i);
}
var kt, qu;
function zo() {
  if (qu) return kt;
  qu = 1;
  var e = !0, t = !1, u = !1;
  kt = function(p, d) {
    d && (e = !d.enabled, t = !!d.label, u = !!d.labelAfter), p.core.ruler.after("inline", "github-task-lists", function(k) {
      for (var h = k.tokens, b = 2; b < h.length; b++)
        n(h, b) && (c(h[b], k.Token), i(h[b - 2], "class", "task-list-item" + (e ? "" : " enabled")), i(h[r(h, b - 2)], "class", "contains-task-list"));
    });
  };
  function i(p, d, k) {
    var h = p.attrIndex(d), b = [d, k];
    h < 0 ? p.attrPush(b) : p.attrs[h] = b;
  }
  function r(p, d) {
    for (var k = p[d].level - 1, h = d - 1; h >= 0; h--)
      if (p[h].level === k)
        return h;
    return -1;
  }
  function n(p, d) {
    return m(p[d]) && _(p[d - 1]) && y(p[d - 2]) && o(p[d]);
  }
  function c(p, d) {
    if (p.children.unshift(a(p, d)), p.children[1].content = p.children[1].content.slice(3), p.content = p.content.slice(3), t)
      if (u) {
        p.children.pop();
        var k = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
        p.children[0].content = p.children[0].content.slice(0, -1) + ' id="' + k + '">', p.children.push(f(p.content, k, d));
      } else
        p.children.unshift(s(d)), p.children.push(l(d));
  }
  function a(p, d) {
    var k = new d("html_inline", "", 0), h = e ? ' disabled="" ' : "";
    return p.content.indexOf("[ ] ") === 0 ? k.content = '<input class="task-list-item-checkbox"' + h + 'type="checkbox">' : (p.content.indexOf("[x] ") === 0 || p.content.indexOf("[X] ") === 0) && (k.content = '<input class="task-list-item-checkbox" checked=""' + h + 'type="checkbox">'), k;
  }
  function s(p) {
    var d = new p("html_inline", "", 0);
    return d.content = "<label>", d;
  }
  function l(p) {
    var d = new p("html_inline", "", 0);
    return d.content = "</label>", d;
  }
  function f(p, d, k) {
    var h = new k("html_inline", "", 0);
    return h.content = '<label class="task-list-item-label" for="' + d + '">' + p + "</label>", h.attrs = [{ for: d }], h;
  }
  function m(p) {
    return p.type === "inline";
  }
  function _(p) {
    return p.type === "paragraph_open";
  }
  function y(p) {
    return p.type === "list_item_open";
  }
  function o(p) {
    return p.content.indexOf("[ ] ") === 0 || p.content.indexOf("[x] ") === 0 || p.content.indexOf("[X] ") === 0;
  }
  return kt;
}
var Io = zo();
const Lo = /* @__PURE__ */ F0(Io);
function Bo(e) {
  const t = e.utils.isSpace;
  function u(n, c) {
    let a = n.bMarks[c] + n.tShift[c];
    const s = n.eMarks[c];
    if (a >= s)
      return -1;
    const l = n.src.charCodeAt(a++);
    if (l !== 126 && l !== 58)
      return -1;
    const f = n.skipSpaces(a);
    return a === f || f >= s ? -1 : a;
  }
  function i(n, c) {
    const a = n.level + 2;
    for (let s = c + 2, l = n.tokens.length - 2; s < l; s++)
      n.tokens[s].level === a && n.tokens[s].type === "paragraph_open" && (n.tokens[s + 2].hidden = !0, n.tokens[s].hidden = !0, s += 2);
  }
  function r(n, c, a, s) {
    if (s)
      return n.ddIndent < 0 ? !1 : u(n, c) >= 0;
    let l = c + 1;
    if (l >= a || n.isEmpty(l) && (l++, l >= a) || n.sCount[l] < n.blkIndent)
      return !1;
    let f = u(n, l);
    if (f < 0)
      return !1;
    const m = n.tokens.length;
    let _ = !0;
    const y = n.push("dl_open", "dl", 1), o = [c, 0];
    y.map = o;
    let p = c, d = l;
    e:
      for (; ; ) {
        let k = !1;
        const h = n.push("dt_open", "dt", 1);
        h.map = [p, p];
        const b = n.push("inline", "", 0);
        for (b.map = [p, p], b.content = n.getLines(p, p + 1, n.blkIndent, !1).trim(), b.children = [], n.push("dt_close", "dt", -1); ; ) {
          const w = n.push("dd_open", "dd", 1), g = [l, 0];
          w.map = g;
          let x = f;
          const A = n.eMarks[d];
          let C = n.sCount[d] + f - (n.bMarks[d] + n.tShift[d]);
          for (; x < A; ) {
            const T = n.src.charCodeAt(x);
            if (t(T))
              T === 9 ? C += 4 - C % 4 : C++;
            else
              break;
            x++;
          }
          f = x;
          const D = n.tight, E = n.ddIndent, O = n.blkIndent, M = n.tShift[d], I = n.sCount[d], B = n.parentType;
          if (n.blkIndent = n.ddIndent = n.sCount[d] + 2, n.tShift[d] = f - n.bMarks[d], n.sCount[d] = C, n.tight = !0, n.parentType = "deflist", n.md.block.tokenize(n, d, a, !0), (!n.tight || k) && (_ = !1), k = n.line - d > 1 && n.isEmpty(n.line - 1), n.tShift[d] = M, n.sCount[d] = I, n.tight = D, n.parentType = B, n.blkIndent = O, n.ddIndent = E, n.push("dd_close", "dd", -1), g[1] = l = n.line, l >= a || n.sCount[l] < n.blkIndent)
            break e;
          if (f = u(n, l), f < 0)
            break;
          d = l;
        }
        if (l >= a || (p = l, n.isEmpty(p)) || n.sCount[p] < n.blkIndent || (d = p + 1, d >= a) || (n.isEmpty(d) && d++, d >= a) || n.sCount[d] < n.blkIndent || (f = u(n, d), f < 0))
          break;
      }
    return n.push("dl_close", "dl", -1), o[1] = l, n.line = l, _ && i(n, m), !0;
  }
  e.block.ruler.before("paragraph", "deflist", r, { alt: ["paragraph", "reference", "blockquote"] });
}
function Po(e, t, u) {
  function i(_) {
    return _.trim().split(" ", 2)[0] === t;
  }
  function r(_, y, o, p, d) {
    return _[y].nesting === 1 && _[y].attrJoin("class", t), d.renderToken(_, y, o, p, d);
  }
  u = u || {};
  const n = 3, c = u.marker || ":", a = c.charCodeAt(0), s = c.length, l = u.validate || i, f = u.render || r;
  function m(_, y, o, p) {
    let d, k = !1, h = _.bMarks[y] + _.tShift[y], b = _.eMarks[y];
    if (a !== _.src.charCodeAt(h))
      return !1;
    for (d = h + 1; d <= b && c[(d - h) % s] === _.src[d]; d++)
      ;
    const w = Math.floor((d - h) / s);
    if (w < n)
      return !1;
    d -= (d - h) % s;
    const g = _.src.slice(h, d), x = _.src.slice(d, b);
    if (!l(x, g))
      return !1;
    if (p)
      return !0;
    let A = y;
    for (; A++, !(A >= o || (h = _.bMarks[A] + _.tShift[A], b = _.eMarks[A], h < b && _.sCount[A] < _.blkIndent)); )
      if (a === _.src.charCodeAt(h) && !(_.sCount[A] - _.blkIndent >= 4)) {
        for (d = h + 1; d <= b && c[(d - h) % s] === _.src[d]; d++)
          ;
        if (!(Math.floor((d - h) / s) < w) && (d -= (d - h) % s, d = _.skipSpaces(d), !(d < b))) {
          k = !0;
          break;
        }
      }
    const C = _.parentType, D = _.lineMax;
    _.parentType = "container", _.lineMax = A;
    const E = _.push("container_" + t + "_open", "div", 1);
    E.markup = g, E.block = !0, E.info = x, E.map = [y, A], _.md.block.tokenize(_, y + 1, A);
    const O = _.push("container_" + t + "_close", "div", -1);
    return O.markup = _.src.slice(h, d), O.block = !0, _.parentType = C, _.lineMax = D, _.line = A + (k ? 1 : 0), !0;
  }
  e.block.ruler.before("fence", "container_" + t, m, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  }), e.renderer.rules["container_" + t + "_open"] = f, e.renderer.rules["container_" + t + "_close"] = f;
}
var wt, $u;
function qo() {
  if ($u) return wt;
  $u = 1;
  function e(v) {
    return v instanceof Map ? v.clear = v.delete = v.set = function() {
      throw new Error("map is read-only");
    } : v instanceof Set && (v.add = v.clear = v.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(v), Object.getOwnPropertyNames(v).forEach((S) => {
      const L = v[S], J = typeof L;
      (J === "object" || J === "function") && !Object.isFrozen(L) && e(L);
    }), v;
  }
  class t {
    /**
     * @param {CompiledMode} mode
     */
    constructor(S) {
      S.data === void 0 && (S.data = {}), this.data = S.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function u(v) {
    return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function i(v, ...S) {
    const L = /* @__PURE__ */ Object.create(null);
    for (const J in v)
      L[J] = v[J];
    return S.forEach(function(J) {
      for (const ce in J)
        L[ce] = J[ce];
    }), /** @type {T} */
    L;
  }
  const r = "</span>", n = (v) => !!v.scope, c = (v, { prefix: S }) => {
    if (v.startsWith("language:"))
      return v.replace("language:", "language-");
    if (v.includes(".")) {
      const L = v.split(".");
      return [
        `${S}${L.shift()}`,
        ...L.map((J, ce) => `${J}${"_".repeat(ce + 1)}`)
      ].join(" ");
    }
    return `${S}${v}`;
  };
  class a {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(S, L) {
      this.buffer = "", this.classPrefix = L.classPrefix, S.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(S) {
      this.buffer += u(S);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(S) {
      if (!n(S)) return;
      const L = c(
        S.scope,
        { prefix: this.classPrefix }
      );
      this.span(L);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(S) {
      n(S) && (this.buffer += r);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(S) {
      this.buffer += `<span class="${S}">`;
    }
  }
  const s = (v = {}) => {
    const S = { children: [] };
    return Object.assign(S, v), S;
  };
  class l {
    constructor() {
      this.rootNode = s(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(S) {
      this.top.children.push(S);
    }
    /** @param {string} scope */
    openNode(S) {
      const L = s({ scope: S });
      this.add(L), this.stack.push(L);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(S) {
      return this.constructor._walk(S, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(S, L) {
      return typeof L == "string" ? S.addText(L) : L.children && (S.openNode(L), L.children.forEach((J) => this._walk(S, J)), S.closeNode(L)), S;
    }
    /**
     * @param {Node} node
     */
    static _collapse(S) {
      typeof S != "string" && S.children && (S.children.every((L) => typeof L == "string") ? S.children = [S.children.join("")] : S.children.forEach((L) => {
        l._collapse(L);
      }));
    }
  }
  class f extends l {
    /**
     * @param {*} options
     */
    constructor(S) {
      super(), this.options = S;
    }
    /**
     * @param {string} text
     */
    addText(S) {
      S !== "" && this.add(S);
    }
    /** @param {string} scope */
    startScope(S) {
      this.openNode(S);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(S, L) {
      const J = S.root;
      L && (J.scope = `language:${L}`), this.add(J);
    }
    toHTML() {
      return new a(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function m(v) {
    return v ? typeof v == "string" ? v : v.source : null;
  }
  function _(v) {
    return p("(?=", v, ")");
  }
  function y(v) {
    return p("(?:", v, ")*");
  }
  function o(v) {
    return p("(?:", v, ")?");
  }
  function p(...v) {
    return v.map((L) => m(L)).join("");
  }
  function d(v) {
    const S = v[v.length - 1];
    return typeof S == "object" && S.constructor === Object ? (v.splice(v.length - 1, 1), S) : {};
  }
  function k(...v) {
    return "(" + (d(v).capture ? "" : "?:") + v.map((J) => m(J)).join("|") + ")";
  }
  function h(v) {
    return new RegExp(v.toString() + "|").exec("").length - 1;
  }
  function b(v, S) {
    const L = v && v.exec(S);
    return L && L.index === 0;
  }
  const w = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function g(v, { joinWith: S }) {
    let L = 0;
    return v.map((J) => {
      L += 1;
      const ce = L;
      let le = m(J), j = "";
      for (; le.length > 0; ) {
        const G = w.exec(le);
        if (!G) {
          j += le;
          break;
        }
        j += le.substring(0, G.index), le = le.substring(G.index + G[0].length), G[0][0] === "\\" && G[1] ? j += "\\" + String(Number(G[1]) + ce) : (j += G[0], G[0] === "(" && L++);
      }
      return j;
    }).map((J) => `(${J})`).join(S);
  }
  const x = /\b\B/, A = "[a-zA-Z]\\w*", C = "[a-zA-Z_]\\w*", D = "\\b\\d+(\\.\\d+)?", E = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", O = "\\b(0b[01]+)", M = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", I = (v = {}) => {
    const S = /^#![ ]*\//;
    return v.binary && (v.begin = p(
      S,
      /.*\b/,
      v.binary,
      /\b.*/
    )), i({
      scope: "meta",
      begin: S,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (L, J) => {
        L.index !== 0 && J.ignoreMatch();
      }
    }, v);
  }, B = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, T = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [B]
  }, $ = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [B]
  }, z = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, F = function(v, S, L = {}) {
    const J = i(
      {
        scope: "comment",
        begin: v,
        end: S,
        contains: []
      },
      L
    );
    J.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const ce = k(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return J.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: p(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          ce,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), J;
  }, U = F("//", "$"), ne = F("/\\*", "\\*/"), te = F("#", "$"), P = {
    scope: "number",
    begin: D,
    relevance: 0
  }, R = {
    scope: "number",
    begin: E,
    relevance: 0
  }, H = {
    scope: "number",
    begin: O,
    relevance: 0
  }, W = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      B,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [B]
      }
    ]
  }, K = {
    scope: "title",
    begin: A,
    relevance: 0
  }, X = {
    scope: "title",
    begin: C,
    relevance: 0
  }, se = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + C,
    relevance: 0
  };
  var we = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: T,
    BACKSLASH_ESCAPE: B,
    BINARY_NUMBER_MODE: H,
    BINARY_NUMBER_RE: O,
    COMMENT: F,
    C_BLOCK_COMMENT_MODE: ne,
    C_LINE_COMMENT_MODE: U,
    C_NUMBER_MODE: R,
    C_NUMBER_RE: E,
    END_SAME_AS_BEGIN: function(v) {
      return Object.assign(
        v,
        {
          /** @type {ModeCallback} */
          "on:begin": (S, L) => {
            L.data._beginMatch = S[1];
          },
          /** @type {ModeCallback} */
          "on:end": (S, L) => {
            L.data._beginMatch !== S[1] && L.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: te,
    IDENT_RE: A,
    MATCH_NOTHING_RE: x,
    METHOD_GUARD: se,
    NUMBER_MODE: P,
    NUMBER_RE: D,
    PHRASAL_WORDS_MODE: z,
    QUOTE_STRING_MODE: $,
    REGEXP_MODE: W,
    RE_STARTERS_RE: M,
    SHEBANG: I,
    TITLE_MODE: K,
    UNDERSCORE_IDENT_RE: C,
    UNDERSCORE_TITLE_MODE: X
  });
  function Ze(v, S) {
    v.input[v.index - 1] === "." && S.ignoreMatch();
  }
  function Se(v, S) {
    v.className !== void 0 && (v.scope = v.className, delete v.className);
  }
  function Me(v, S) {
    S && v.beginKeywords && (v.begin = "\\b(" + v.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", v.__beforeBegin = Ze, v.keywords = v.keywords || v.beginKeywords, delete v.beginKeywords, v.relevance === void 0 && (v.relevance = 0));
  }
  function ve(v, S) {
    Array.isArray(v.illegal) && (v.illegal = k(...v.illegal));
  }
  function ge(v, S) {
    if (v.match) {
      if (v.begin || v.end) throw new Error("begin & end are not supported with match");
      v.begin = v.match, delete v.match;
    }
  }
  function r0(v, S) {
    v.relevance === void 0 && (v.relevance = 1);
  }
  const Rn = (v, S) => {
    if (!v.beforeMatch) return;
    if (v.starts) throw new Error("beforeMatch cannot be used with starts");
    const L = Object.assign({}, v);
    Object.keys(v).forEach((J) => {
      delete v[J];
    }), v.keywords = L.keywords, v.begin = p(L.beforeMatch, _(L.begin)), v.starts = {
      relevance: 0,
      contains: [
        Object.assign(L, { endsParent: !0 })
      ]
    }, v.relevance = 0, delete L.beforeMatch;
  }, Fn = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], On = "keyword";
  function zt(v, S, L = On) {
    const J = /* @__PURE__ */ Object.create(null);
    return typeof v == "string" ? ce(L, v.split(" ")) : Array.isArray(v) ? ce(L, v) : Object.keys(v).forEach(function(le) {
      Object.assign(
        J,
        zt(v[le], S, le)
      );
    }), J;
    function ce(le, j) {
      S && (j = j.map((G) => G.toLowerCase())), j.forEach(function(G) {
        const Y = G.split("|");
        J[Y[0]] = [le, zn(Y[0], Y[1])];
      });
    }
  }
  function zn(v, S) {
    return S ? Number(S) : In(v) ? 0 : 1;
  }
  function In(v) {
    return Fn.includes(v.toLowerCase());
  }
  const It = {}, Ve = (v) => {
    console.error(v);
  }, Lt = (v, ...S) => {
    console.log(`WARN: ${v}`, ...S);
  }, We = (v, S) => {
    It[`${v}/${S}`] || (console.log(`Deprecated as of ${v}. ${S}`), It[`${v}/${S}`] = !0);
  }, p0 = new Error();
  function Bt(v, S, { key: L }) {
    let J = 0;
    const ce = v[L], le = {}, j = {};
    for (let G = 1; G <= S.length; G++)
      j[G + J] = ce[G], le[G + J] = !0, J += h(S[G - 1]);
    v[L] = j, v[L]._emit = le, v[L]._multi = !0;
  }
  function Ln(v) {
    if (Array.isArray(v.begin)) {
      if (v.skip || v.excludeBegin || v.returnBegin)
        throw Ve("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), p0;
      if (typeof v.beginScope != "object" || v.beginScope === null)
        throw Ve("beginScope must be object"), p0;
      Bt(v, v.begin, { key: "beginScope" }), v.begin = g(v.begin, { joinWith: "" });
    }
  }
  function Bn(v) {
    if (Array.isArray(v.end)) {
      if (v.skip || v.excludeEnd || v.returnEnd)
        throw Ve("skip, excludeEnd, returnEnd not compatible with endScope: {}"), p0;
      if (typeof v.endScope != "object" || v.endScope === null)
        throw Ve("endScope must be object"), p0;
      Bt(v, v.end, { key: "endScope" }), v.end = g(v.end, { joinWith: "" });
    }
  }
  function Pn(v) {
    v.scope && typeof v.scope == "object" && v.scope !== null && (v.beginScope = v.scope, delete v.scope);
  }
  function qn(v) {
    Pn(v), typeof v.beginScope == "string" && (v.beginScope = { _wrap: v.beginScope }), typeof v.endScope == "string" && (v.endScope = { _wrap: v.endScope }), Ln(v), Bn(v);
  }
  function $n(v) {
    function S(j, G) {
      return new RegExp(
        m(j),
        "m" + (v.case_insensitive ? "i" : "") + (v.unicodeRegex ? "u" : "") + (G ? "g" : "")
      );
    }
    class L {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(G, Y) {
        Y.position = this.position++, this.matchIndexes[this.matchAt] = Y, this.regexes.push([Y, G]), this.matchAt += h(G) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const G = this.regexes.map((Y) => Y[1]);
        this.matcherRe = S(g(G, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(G) {
        this.matcherRe.lastIndex = this.lastIndex;
        const Y = this.matcherRe.exec(G);
        if (!Y)
          return null;
        const he = Y.findIndex((a0, B0) => B0 > 0 && a0 !== void 0), fe = this.matchIndexes[he];
        return Y.splice(0, he), Object.assign(Y, fe);
      }
    }
    class J {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(G) {
        if (this.multiRegexes[G]) return this.multiRegexes[G];
        const Y = new L();
        return this.rules.slice(G).forEach(([he, fe]) => Y.addRule(he, fe)), Y.compile(), this.multiRegexes[G] = Y, Y;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(G, Y) {
        this.rules.push([G, Y]), Y.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(G) {
        const Y = this.getMatcher(this.regexIndex);
        Y.lastIndex = this.lastIndex;
        let he = Y.exec(G);
        if (this.resumingScanAtSamePosition() && !(he && he.index === this.lastIndex)) {
          const fe = this.getMatcher(0);
          fe.lastIndex = this.lastIndex + 1, he = fe.exec(G);
        }
        return he && (this.regexIndex += he.position + 1, this.regexIndex === this.count && this.considerAll()), he;
      }
    }
    function ce(j) {
      const G = new J();
      return j.contains.forEach((Y) => G.addRule(Y.begin, { rule: Y, type: "begin" })), j.terminatorEnd && G.addRule(j.terminatorEnd, { type: "end" }), j.illegal && G.addRule(j.illegal, { type: "illegal" }), G;
    }
    function le(j, G) {
      const Y = (
        /** @type CompiledMode */
        j
      );
      if (j.isCompiled) return Y;
      [
        Se,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        ge,
        qn,
        Rn
      ].forEach((fe) => fe(j, G)), v.compilerExtensions.forEach((fe) => fe(j, G)), j.__beforeBegin = null, [
        Me,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        ve,
        // default to 1 relevance if not specified
        r0
      ].forEach((fe) => fe(j, G)), j.isCompiled = !0;
      let he = null;
      return typeof j.keywords == "object" && j.keywords.$pattern && (j.keywords = Object.assign({}, j.keywords), he = j.keywords.$pattern, delete j.keywords.$pattern), he = he || /\w+/, j.keywords && (j.keywords = zt(j.keywords, v.case_insensitive)), Y.keywordPatternRe = S(he, !0), G && (j.begin || (j.begin = /\B|\b/), Y.beginRe = S(Y.begin), !j.end && !j.endsWithParent && (j.end = /\B|\b/), j.end && (Y.endRe = S(Y.end)), Y.terminatorEnd = m(Y.end) || "", j.endsWithParent && G.terminatorEnd && (Y.terminatorEnd += (j.end ? "|" : "") + G.terminatorEnd)), j.illegal && (Y.illegalRe = S(
        /** @type {RegExp | string} */
        j.illegal
      )), j.contains || (j.contains = []), j.contains = [].concat(...j.contains.map(function(fe) {
        return Un(fe === "self" ? j : fe);
      })), j.contains.forEach(function(fe) {
        le(
          /** @type Mode */
          fe,
          Y
        );
      }), j.starts && le(j.starts, G), Y.matcher = ce(Y), Y;
    }
    if (v.compilerExtensions || (v.compilerExtensions = []), v.contains && v.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return v.classNameAliases = i(v.classNameAliases || {}), le(
      /** @type Mode */
      v
    );
  }
  function Pt(v) {
    return v ? v.endsWithParent || Pt(v.starts) : !1;
  }
  function Un(v) {
    return v.variants && !v.cachedVariants && (v.cachedVariants = v.variants.map(function(S) {
      return i(v, { variants: null }, S);
    })), v.cachedVariants ? v.cachedVariants : Pt(v) ? i(v, { starts: v.starts ? i(v.starts) : null }) : Object.isFrozen(v) ? i(v) : v;
  }
  var Hn = "11.11.1";
  class Gn extends Error {
    constructor(S, L) {
      super(S), this.name = "HTMLInjectionError", this.html = L;
    }
  }
  const L0 = u, qt = i, $t = Symbol("nomatch"), jn = 7, Ut = function(v) {
    const S = /* @__PURE__ */ Object.create(null), L = /* @__PURE__ */ Object.create(null), J = [];
    let ce = !0;
    const le = "Could not find the language '{}', did you forget to load/include a language module?", j = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let G = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: f
    };
    function Y(N) {
      return G.noHighlightRe.test(N);
    }
    function he(N) {
      let V = N.className + " ";
      V += N.parentNode ? N.parentNode.className : "";
      const ue = G.languageDetectRe.exec(V);
      if (ue) {
        const ae = Pe(ue[1]);
        return ae || (Lt(le.replace("{}", ue[1])), Lt("Falling back to no-highlight mode for this block.", N)), ae ? ue[1] : "no-highlight";
      }
      return V.split(/\s+/).find((ae) => Y(ae) || Pe(ae));
    }
    function fe(N, V, ue) {
      let ae = "", de = "";
      typeof V == "object" ? (ae = N, ue = V.ignoreIllegals, de = V.language) : (We("10.7.0", "highlight(lang, code, ...args) has been deprecated."), We("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), de = N, ae = V), ue === void 0 && (ue = !0);
      const De = {
        code: ae,
        language: de
      };
      m0("before:highlight", De);
      const qe = De.result ? De.result : a0(De.language, De.code, ue);
      return qe.code = De.code, m0("after:highlight", qe), qe;
    }
    function a0(N, V, ue, ae) {
      const de = /* @__PURE__ */ Object.create(null);
      function De(q, Z) {
        return q.keywords[Z];
      }
      function qe() {
        if (!Q.keywords) {
          me.addText(ie);
          return;
        }
        let q = 0;
        Q.keywordPatternRe.lastIndex = 0;
        let Z = Q.keywordPatternRe.exec(ie), ee = "";
        for (; Z; ) {
          ee += ie.substring(q, Z.index);
          const re = Re.case_insensitive ? Z[0].toLowerCase() : Z[0], xe = De(Q, re);
          if (xe) {
            const [Le, sr] = xe;
            if (me.addText(ee), ee = "", de[re] = (de[re] || 0) + 1, de[re] <= jn && (x0 += sr), Le.startsWith("_"))
              ee += Z[0];
            else {
              const cr = Re.classNameAliases[Le] || Le;
              Ne(Z[0], cr);
            }
          } else
            ee += Z[0];
          q = Q.keywordPatternRe.lastIndex, Z = Q.keywordPatternRe.exec(ie);
        }
        ee += ie.substring(q), me.addText(ee);
      }
      function _0() {
        if (ie === "") return;
        let q = null;
        if (typeof Q.subLanguage == "string") {
          if (!S[Q.subLanguage]) {
            me.addText(ie);
            return;
          }
          q = a0(Q.subLanguage, ie, !0, Xt[Q.subLanguage]), Xt[Q.subLanguage] = /** @type {CompiledMode} */
          q._top;
        } else
          q = P0(ie, Q.subLanguage.length ? Q.subLanguage : null);
        Q.relevance > 0 && (x0 += q.relevance), me.__addSublanguage(q._emitter, q.language);
      }
      function Ee() {
        Q.subLanguage != null ? _0() : qe(), ie = "";
      }
      function Ne(q, Z) {
        q !== "" && (me.startScope(Z), me.addText(q), me.endScope());
      }
      function Zt(q, Z) {
        let ee = 1;
        const re = Z.length - 1;
        for (; ee <= re; ) {
          if (!q._emit[ee]) {
            ee++;
            continue;
          }
          const xe = Re.classNameAliases[q[ee]] || q[ee], Le = Z[ee];
          xe ? Ne(Le, xe) : (ie = Le, qe(), ie = ""), ee++;
        }
      }
      function Vt(q, Z) {
        return q.scope && typeof q.scope == "string" && me.openNode(Re.classNameAliases[q.scope] || q.scope), q.beginScope && (q.beginScope._wrap ? (Ne(ie, Re.classNameAliases[q.beginScope._wrap] || q.beginScope._wrap), ie = "") : q.beginScope._multi && (Zt(q.beginScope, Z), ie = "")), Q = Object.create(q, { parent: { value: Q } }), Q;
      }
      function Kt(q, Z, ee) {
        let re = b(q.endRe, ee);
        if (re) {
          if (q["on:end"]) {
            const xe = new t(q);
            q["on:end"](Z, xe), xe.isMatchIgnored && (re = !1);
          }
          if (re) {
            for (; q.endsParent && q.parent; )
              q = q.parent;
            return q;
          }
        }
        if (q.endsWithParent)
          return Kt(q.parent, Z, ee);
      }
      function nr(q) {
        return Q.matcher.regexIndex === 0 ? (ie += q[0], 1) : (H0 = !0, 0);
      }
      function rr(q) {
        const Z = q[0], ee = q.rule, re = new t(ee), xe = [ee.__beforeBegin, ee["on:begin"]];
        for (const Le of xe)
          if (Le && (Le(q, re), re.isMatchIgnored))
            return nr(Z);
        return ee.skip ? ie += Z : (ee.excludeBegin && (ie += Z), Ee(), !ee.returnBegin && !ee.excludeBegin && (ie = Z)), Vt(ee, q), ee.returnBegin ? 0 : Z.length;
      }
      function ar(q) {
        const Z = q[0], ee = V.substring(q.index), re = Kt(Q, q, ee);
        if (!re)
          return $t;
        const xe = Q;
        Q.endScope && Q.endScope._wrap ? (Ee(), Ne(Z, Q.endScope._wrap)) : Q.endScope && Q.endScope._multi ? (Ee(), Zt(Q.endScope, q)) : xe.skip ? ie += Z : (xe.returnEnd || xe.excludeEnd || (ie += Z), Ee(), xe.excludeEnd && (ie = Z));
        do
          Q.scope && me.closeNode(), !Q.skip && !Q.subLanguage && (x0 += Q.relevance), Q = Q.parent;
        while (Q !== re.parent);
        return re.starts && Vt(re.starts, q), xe.returnEnd ? 0 : Z.length;
      }
      function ir() {
        const q = [];
        for (let Z = Q; Z !== Re; Z = Z.parent)
          Z.scope && q.unshift(Z.scope);
        q.forEach((Z) => me.openNode(Z));
      }
      let g0 = {};
      function Wt(q, Z) {
        const ee = Z && Z[0];
        if (ie += q, ee == null)
          return Ee(), 0;
        if (g0.type === "begin" && Z.type === "end" && g0.index === Z.index && ee === "") {
          if (ie += V.slice(Z.index, Z.index + 1), !ce) {
            const re = new Error(`0 width match regex (${N})`);
            throw re.languageName = N, re.badRule = g0.rule, re;
          }
          return 1;
        }
        if (g0 = Z, Z.type === "begin")
          return rr(Z);
        if (Z.type === "illegal" && !ue) {
          const re = new Error('Illegal lexeme "' + ee + '" for mode "' + (Q.scope || "<unnamed>") + '"');
          throw re.mode = Q, re;
        } else if (Z.type === "end") {
          const re = ar(Z);
          if (re !== $t)
            return re;
        }
        if (Z.type === "illegal" && ee === "")
          return ie += `
`, 1;
        if (U0 > 1e5 && U0 > Z.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return ie += ee, ee.length;
      }
      const Re = Pe(N);
      if (!Re)
        throw Ve(le.replace("{}", N)), new Error('Unknown language: "' + N + '"');
      const or = $n(Re);
      let $0 = "", Q = ae || or;
      const Xt = {}, me = new G.__emitter(G);
      ir();
      let ie = "", x0 = 0, Ke = 0, U0 = 0, H0 = !1;
      try {
        if (Re.__emitTokens)
          Re.__emitTokens(V, me);
        else {
          for (Q.matcher.considerAll(); ; ) {
            U0++, H0 ? H0 = !1 : Q.matcher.considerAll(), Q.matcher.lastIndex = Ke;
            const q = Q.matcher.exec(V);
            if (!q) break;
            const Z = V.substring(Ke, q.index), ee = Wt(Z, q);
            Ke = q.index + ee;
          }
          Wt(V.substring(Ke));
        }
        return me.finalize(), $0 = me.toHTML(), {
          language: N,
          value: $0,
          relevance: x0,
          illegal: !1,
          _emitter: me,
          _top: Q
        };
      } catch (q) {
        if (q.message && q.message.includes("Illegal"))
          return {
            language: N,
            value: L0(V),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: q.message,
              index: Ke,
              context: V.slice(Ke - 100, Ke + 100),
              mode: q.mode,
              resultSoFar: $0
            },
            _emitter: me
          };
        if (ce)
          return {
            language: N,
            value: L0(V),
            illegal: !1,
            relevance: 0,
            errorRaised: q,
            _emitter: me,
            _top: Q
          };
        throw q;
      }
    }
    function B0(N) {
      const V = {
        value: L0(N),
        illegal: !1,
        relevance: 0,
        _top: j,
        _emitter: new G.__emitter(G)
      };
      return V._emitter.addText(N), V;
    }
    function P0(N, V) {
      V = V || G.languages || Object.keys(S);
      const ue = B0(N), ae = V.filter(Pe).filter(jt).map(
        (Ee) => a0(Ee, N, !1)
      );
      ae.unshift(ue);
      const de = ae.sort((Ee, Ne) => {
        if (Ee.relevance !== Ne.relevance) return Ne.relevance - Ee.relevance;
        if (Ee.language && Ne.language) {
          if (Pe(Ee.language).supersetOf === Ne.language)
            return 1;
          if (Pe(Ne.language).supersetOf === Ee.language)
            return -1;
        }
        return 0;
      }), [De, qe] = de, _0 = De;
      return _0.secondBest = qe, _0;
    }
    function Zn(N, V, ue) {
      const ae = V && L[V] || ue;
      N.classList.add("hljs"), N.classList.add(`language-${ae}`);
    }
    function q0(N) {
      let V = null;
      const ue = he(N);
      if (Y(ue)) return;
      if (m0(
        "before:highlightElement",
        { el: N, language: ue }
      ), N.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", N);
        return;
      }
      if (N.children.length > 0 && (G.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(N)), G.throwUnescapedHTML))
        throw new Gn(
          "One of your code blocks includes unescaped HTML.",
          N.innerHTML
        );
      V = N;
      const ae = V.textContent, de = ue ? fe(ae, { language: ue, ignoreIllegals: !0 }) : P0(ae);
      N.innerHTML = de.value, N.dataset.highlighted = "yes", Zn(N, ue, de.language), N.result = {
        language: de.language,
        // TODO: remove with version 11.0
        re: de.relevance,
        relevance: de.relevance
      }, de.secondBest && (N.secondBest = {
        language: de.secondBest.language,
        relevance: de.secondBest.relevance
      }), m0("after:highlightElement", { el: N, result: de, text: ae });
    }
    function Vn(N) {
      G = qt(G, N);
    }
    const Kn = () => {
      b0(), We("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Wn() {
      b0(), We("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Ht = !1;
    function b0() {
      function N() {
        b0();
      }
      if (document.readyState === "loading") {
        Ht || window.addEventListener("DOMContentLoaded", N, !1), Ht = !0;
        return;
      }
      document.querySelectorAll(G.cssSelector).forEach(q0);
    }
    function Xn(N, V) {
      let ue = null;
      try {
        ue = V(v);
      } catch (ae) {
        if (Ve("Language definition for '{}' could not be registered.".replace("{}", N)), ce)
          Ve(ae);
        else
          throw ae;
        ue = j;
      }
      ue.name || (ue.name = N), S[N] = ue, ue.rawDefinition = V.bind(null, v), ue.aliases && Gt(ue.aliases, { languageName: N });
    }
    function Yn(N) {
      delete S[N];
      for (const V of Object.keys(L))
        L[V] === N && delete L[V];
    }
    function Jn() {
      return Object.keys(S);
    }
    function Pe(N) {
      return N = (N || "").toLowerCase(), S[N] || S[L[N]];
    }
    function Gt(N, { languageName: V }) {
      typeof N == "string" && (N = [N]), N.forEach((ue) => {
        L[ue.toLowerCase()] = V;
      });
    }
    function jt(N) {
      const V = Pe(N);
      return V && !V.disableAutodetect;
    }
    function Qn(N) {
      N["before:highlightBlock"] && !N["before:highlightElement"] && (N["before:highlightElement"] = (V) => {
        N["before:highlightBlock"](
          Object.assign({ block: V.el }, V)
        );
      }), N["after:highlightBlock"] && !N["after:highlightElement"] && (N["after:highlightElement"] = (V) => {
        N["after:highlightBlock"](
          Object.assign({ block: V.el }, V)
        );
      });
    }
    function er(N) {
      Qn(N), J.push(N);
    }
    function tr(N) {
      const V = J.indexOf(N);
      V !== -1 && J.splice(V, 1);
    }
    function m0(N, V) {
      const ue = N;
      J.forEach(function(ae) {
        ae[ue] && ae[ue](V);
      });
    }
    function ur(N) {
      return We("10.7.0", "highlightBlock will be removed entirely in v12.0"), We("10.7.0", "Please use highlightElement now."), q0(N);
    }
    Object.assign(v, {
      highlight: fe,
      highlightAuto: P0,
      highlightAll: b0,
      highlightElement: q0,
      // TODO: Remove with v12 API
      highlightBlock: ur,
      configure: Vn,
      initHighlighting: Kn,
      initHighlightingOnLoad: Wn,
      registerLanguage: Xn,
      unregisterLanguage: Yn,
      listLanguages: Jn,
      getLanguage: Pe,
      registerAliases: Gt,
      autoDetection: jt,
      inherit: qt,
      addPlugin: er,
      removePlugin: tr
    }), v.debugMode = function() {
      ce = !1;
    }, v.safeMode = function() {
      ce = !0;
    }, v.versionString = Hn, v.regex = {
      concat: p,
      lookahead: _,
      either: k,
      optional: o,
      anyNumberOfTimes: y
    };
    for (const N in we)
      typeof we[N] == "object" && e(we[N]);
    return Object.assign(v, we), v;
  }, Xe = Ut({});
  return Xe.newInstance = () => Ut({}), wt = Xe, Xe.HighlightJS = Xe, Xe.default = Xe, wt;
}
var $o = /* @__PURE__ */ qo();
const ye = /* @__PURE__ */ F0($o);
function Uo(e) {
  const t = e.regex, u = {}, i = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [u]
      }
      // default values
    ]
  };
  Object.assign(u, {
    className: "variable",
    variants: [
      { begin: t.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      i
    ]
  });
  const r = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, n = e.inherit(
    e.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), c = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, a = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      u,
      r
    ]
  };
  r.contains.push(a);
  const s = {
    match: /\\"/
  }, l = {
    className: "string",
    begin: /'/,
    end: /'/
  }, f = {
    match: /\\'/
  }, m = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      u
    ]
  }, _ = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], y = e.SHEBANG({
    binary: `(${_.join("|")})`,
    relevance: 10
  }), o = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, p = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], d = [
    "true",
    "false"
  ], k = { match: /(\/[a-z._-]+)+/ }, h = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], b = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], w = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], g = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: p,
      literal: d,
      built_in: [
        ...h,
        ...b,
        // Shell modifiers
        "set",
        "shopt",
        ...w,
        ...g
      ]
    },
    contains: [
      y,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      o,
      m,
      n,
      c,
      k,
      a,
      s,
      l,
      f,
      u
    ]
  };
}
const Uu = "[A-Za-z$_][0-9A-Za-z$_]*", Ho = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], Go = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], vn = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], kn = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], wn = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], jo = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Zo = [].concat(
  wn,
  vn,
  kn
);
function Vo(e) {
  const t = e.regex, u = (F, { after: U }) => {
    const ne = "</" + F[0].slice(1);
    return F.input.indexOf(ne, U) !== -1;
  }, i = Uu, r = {
    begin: "<>",
    end: "</>"
  }, n = /<[A-Za-z0-9\\._:-]+\s*\/>/, c = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (F, U) => {
      const ne = F[0].length + F.index, te = F.input[ne];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        te === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        te === ","
      ) {
        U.ignoreMatch();
        return;
      }
      te === ">" && (u(F, { after: ne }) || U.ignoreMatch());
      let P;
      const R = F.input.substring(ne);
      if (P = R.match(/^\s*=/)) {
        U.ignoreMatch();
        return;
      }
      if ((P = R.match(/^\s+extends\s+/)) && P.index === 0) {
        U.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: Uu,
    keyword: Ho,
    literal: Go,
    built_in: Zo,
    "variable.language": jo
  }, s = "[0-9](_?[0-9])*", l = `\\.(${s})`, f = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", m = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${f})((${l})|\\.)?|(${l}))[eE][+-]?(${s})\\b` },
      { begin: `\\b(${f})\\b((${l})\\b|\\.)?|(${l})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, _ = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, y = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "xml"
    }
  }, o = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "css"
    }
  }, p = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "graphql"
    }
  }, d = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      _
    ]
  }, h = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: i + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, b = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    y,
    o,
    p,
    d,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    m
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  _.contains = b.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(b)
  });
  const w = [].concat(h, _.contains), g = w.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(w)
    }
  ]), x = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: g
  }, A = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          i,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(i, "(", t.concat(/\./, i), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          i
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, C = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...vn,
        ...kn
      ]
    }
  }, D = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, E = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          i,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [x],
    illegal: /%/
  }, O = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function M(F) {
    return t.concat("(?!", F.join("|"), ")");
  }
  const I = {
    match: t.concat(
      /\b/,
      M([
        ...wn,
        "super",
        "import"
      ].map((F) => `${F}\\s*\\(`)),
      i,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, B = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(i, /(?![0-9A-Za-z$_(])/)
    )),
    end: i,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, T = {
    match: [
      /get|set/,
      /\s+/,
      i,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      x
    ]
  }, $ = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", z = {
    match: [
      /const|var|let/,
      /\s+/,
      i,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead($)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      x
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: g, CLASS_REFERENCE: C },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      D,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      y,
      o,
      p,
      d,
      h,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      m,
      C,
      {
        scope: "attr",
        match: i + t.lookahead(":"),
        relevance: 0
      },
      z,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          h,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: $,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: g
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: r.begin, end: r.end },
              { match: n },
              {
                begin: c.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": c.isTrulyOpeningTag,
                end: c.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: c.begin,
                end: c.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      E,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          x,
          e.inherit(e.TITLE_MODE, { begin: i, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      B,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + i,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [x]
      },
      I,
      O,
      A,
      T,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
const D0 = "[A-Za-z$_][0-9A-Za-z$_]*", En = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], An = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Cn = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Sn = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Dn = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], Tn = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Mn = [].concat(
  Dn,
  Cn,
  Sn
);
function Ko(e) {
  const t = e.regex, u = (F, { after: U }) => {
    const ne = "</" + F[0].slice(1);
    return F.input.indexOf(ne, U) !== -1;
  }, i = D0, r = {
    begin: "<>",
    end: "</>"
  }, n = /<[A-Za-z0-9\\._:-]+\s*\/>/, c = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (F, U) => {
      const ne = F[0].length + F.index, te = F.input[ne];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        te === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        te === ","
      ) {
        U.ignoreMatch();
        return;
      }
      te === ">" && (u(F, { after: ne }) || U.ignoreMatch());
      let P;
      const R = F.input.substring(ne);
      if (P = R.match(/^\s*=/)) {
        U.ignoreMatch();
        return;
      }
      if ((P = R.match(/^\s+extends\s+/)) && P.index === 0) {
        U.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: D0,
    keyword: En,
    literal: An,
    built_in: Mn,
    "variable.language": Tn
  }, s = "[0-9](_?[0-9])*", l = `\\.(${s})`, f = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", m = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${f})((${l})|\\.)?|(${l}))[eE][+-]?(${s})\\b` },
      { begin: `\\b(${f})\\b((${l})\\b|\\.)?|(${l})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, _ = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, y = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "xml"
    }
  }, o = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "css"
    }
  }, p = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "graphql"
    }
  }, d = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      _
    ]
  }, h = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: i + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, b = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    y,
    o,
    p,
    d,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    m
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  _.contains = b.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(b)
  });
  const w = [].concat(h, _.contains), g = w.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(w)
    }
  ]), x = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: g
  }, A = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          i,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(i, "(", t.concat(/\./, i), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          i
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, C = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Cn,
        ...Sn
      ]
    }
  }, D = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, E = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          i,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [x],
    illegal: /%/
  }, O = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function M(F) {
    return t.concat("(?!", F.join("|"), ")");
  }
  const I = {
    match: t.concat(
      /\b/,
      M([
        ...Dn,
        "super",
        "import"
      ].map((F) => `${F}\\s*\\(`)),
      i,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, B = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(i, /(?![0-9A-Za-z$_(])/)
    )),
    end: i,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, T = {
    match: [
      /get|set/,
      /\s+/,
      i,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      x
    ]
  }, $ = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", z = {
    match: [
      /const|var|let/,
      /\s+/,
      i,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead($)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      x
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: g, CLASS_REFERENCE: C },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      D,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      y,
      o,
      p,
      d,
      h,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      m,
      C,
      {
        scope: "attr",
        match: i + t.lookahead(":"),
        relevance: 0
      },
      z,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          h,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: $,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: g
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: r.begin, end: r.end },
              { match: n },
              {
                begin: c.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": c.isTrulyOpeningTag,
                end: c.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: c.begin,
                end: c.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      E,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          x,
          e.inherit(e.TITLE_MODE, { begin: i, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      B,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + i,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [x]
      },
      I,
      O,
      A,
      T,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Wo(e) {
  const t = e.regex, u = Ko(e), i = D0, r = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], n = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, c = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: r
    },
    contains: [u.exports.CLASS_REFERENCE]
  }, a = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, s = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], l = {
    $pattern: D0,
    keyword: En.concat(s),
    literal: An,
    built_in: Mn.concat(r),
    "variable.language": Tn
  }, f = {
    className: "meta",
    begin: "@" + i
  }, m = (p, d, k) => {
    const h = p.contains.findIndex((b) => b.label === d);
    if (h === -1)
      throw new Error("can not find mode to replace");
    p.contains.splice(h, 1, k);
  };
  Object.assign(u.keywords, l), u.exports.PARAMS_CONTAINS.push(f);
  const _ = u.contains.find((p) => p.scope === "attr"), y = Object.assign(
    {},
    _,
    { match: t.concat(i, t.lookahead(/\s*\?:/)) }
  );
  u.exports.PARAMS_CONTAINS.push([
    u.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    _,
    // highlight the params key
    y
    // Added for optional property assignment highlighting
  ]), u.contains = u.contains.concat([
    f,
    n,
    c,
    y
    // Added for optional property assignment highlighting
  ]), m(u, "shebang", e.SHEBANG()), m(u, "use_strict", a);
  const o = u.contains.find((p) => p.label === "func.def");
  return o.relevance = 0, Object.assign(u, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), u;
}
var Qe = "[0-9](_*[0-9])*", k0 = `\\.(${Qe})`, w0 = "[0-9a-fA-F](_*[0-9a-fA-F])*", Hu = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${Qe})((${k0})|\\.)?|(${k0}))[eE][+-]?(${Qe})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${Qe})((${k0})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${k0})[fFdD]?\\b` },
    { begin: `\\b(${Qe})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${w0})\\.?|(${w0})?\\.(${w0}))[pP][+-]?(${Qe})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${w0})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function Nn(e, t, u) {
  return u === -1 ? "" : e.replace(t, (i) => Nn(e, t, u - 1));
}
function Xo(e) {
  const t = e.regex, u = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", i = u + Nn("(?:<" + u + "~~~(?:\\s*,\\s*" + u + "~~~)*>)?", /~~~/g, 2), s = {
    keyword: [
      "synchronized",
      "abstract",
      "private",
      "var",
      "static",
      "if",
      "const ",
      "for",
      "while",
      "strictfp",
      "finally",
      "protected",
      "import",
      "native",
      "final",
      "void",
      "enum",
      "else",
      "break",
      "transient",
      "catch",
      "instanceof",
      "volatile",
      "case",
      "assert",
      "package",
      "default",
      "public",
      "try",
      "switch",
      "continue",
      "throws",
      "protected",
      "public",
      "private",
      "module",
      "requires",
      "exports",
      "do",
      "sealed",
      "yield",
      "permits",
      "goto",
      "when"
    ],
    literal: [
      "false",
      "true",
      "null"
    ],
    type: [
      "char",
      "boolean",
      "long",
      "float",
      "int",
      "byte",
      "short",
      "double"
    ],
    built_in: [
      "super",
      "this"
    ]
  }, l = {
    className: "meta",
    begin: "@" + u,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
        // allow nested () inside our annotation
      }
    ]
  }, f = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    keywords: s,
    relevance: 0,
    contains: [e.C_BLOCK_COMMENT_MODE],
    endsParent: !0
  };
  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: s,
    illegal: /<\/|#/,
    contains: [
      e.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [e.BACKSLASH_ESCAPE]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          u
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        begin: [
          t.concat(/(?!else)/, u),
          /\s+/,
          u,
          /\s+/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          u
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          f,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new throw return else",
        relevance: 0
      },
      {
        begin: [
          "(?:" + i + "\\s+)",
          e.UNDERSCORE_IDENT_RE,
          /\s*(?=\()/
        ],
        className: { 2: "title.function" },
        keywords: s,
        contains: [
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: s,
            relevance: 0,
            contains: [
              l,
              e.APOS_STRING_MODE,
              e.QUOTE_STRING_MODE,
              Hu,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      Hu,
      l
    ]
  };
}
function Yo(e) {
  const t = e.regex, u = e.COMMENT("--", "$"), i = {
    scope: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ match: /''/ }]
      }
    ]
  }, r = {
    begin: /"/,
    end: /"/,
    contains: [{ match: /""/ }]
  }, n = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], c = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], a = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ], s = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], l = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ], f = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ], m = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ], _ = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ], y = f, o = [
    ...l,
    ...s
  ].filter((g) => !f.includes(g)), p = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  }, d = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, k = {
    match: t.concat(/\b/, t.either(...y), /\s*\(/),
    relevance: 0,
    keywords: { built_in: y }
  };
  function h(g) {
    return t.concat(
      /\b/,
      t.either(...g.map((x) => x.replace(/\s+/, "\\s+"))),
      /\b/
    );
  }
  const b = {
    scope: "keyword",
    match: h(_),
    relevance: 0
  };
  function w(g, {
    exceptions: x,
    when: A
  } = {}) {
    const C = A;
    return x = x || [], g.map((D) => D.match(/\|\d+$/) || x.includes(D) ? D : C(D) ? `${D}|0` : D);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: w(o, { when: (g) => g.length < 3 }),
      literal: n,
      type: a,
      built_in: m
    },
    contains: [
      {
        scope: "type",
        match: h(c)
      },
      b,
      k,
      p,
      i,
      r,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      u,
      d
    ]
  };
}
function Jo(e) {
  const t = e.regex, u = {
    className: "variable",
    variants: [
      { begin: /\$\d+/ },
      { begin: /\$\{\w+\}/ },
      { begin: t.concat(/[$@]/, e.UNDERSCORE_IDENT_RE) }
    ]
  }, r = {
    endsWithParent: !0,
    keywords: {
      $pattern: /[a-z_]{2,}|\/dev\/poll/,
      literal: [
        "on",
        "off",
        "yes",
        "no",
        "true",
        "false",
        "none",
        "blocked",
        "debug",
        "info",
        "notice",
        "warn",
        "error",
        "crit",
        "select",
        "break",
        "last",
        "permanent",
        "redirect",
        "kqueue",
        "rtsig",
        "epoll",
        "poll",
        "/dev/poll"
      ]
    },
    relevance: 0,
    illegal: "=>",
    contains: [
      e.HASH_COMMENT_MODE,
      {
        className: "string",
        contains: [
          e.BACKSLASH_ESCAPE,
          u
        ],
        variants: [
          {
            begin: /"/,
            end: /"/
          },
          {
            begin: /'/,
            end: /'/
          }
        ]
      },
      // this swallows entire URLs to avoid detecting numbers within
      {
        begin: "([a-z]+):/",
        end: "\\s",
        endsWithParent: !0,
        excludeEnd: !0,
        contains: [u]
      },
      {
        className: "regexp",
        contains: [
          e.BACKSLASH_ESCAPE,
          u
        ],
        variants: [
          {
            begin: "\\s\\^",
            end: "\\s|\\{|;",
            returnEnd: !0
          },
          // regexp locations (~, ~*)
          {
            begin: "~\\*?\\s+",
            end: "\\s|\\{|;",
            returnEnd: !0
          },
          // *.example.com
          { begin: "\\*(\\.[a-z\\-]+)+" },
          // sub.example.*
          { begin: "([a-z\\-]+\\.)+\\*" }
        ]
      },
      // IP
      {
        className: "number",
        begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
      },
      // units
      {
        className: "number",
        begin: "\\b\\d+[kKmMgGdshdwy]?\\b",
        relevance: 0
      },
      u
    ]
  };
  return {
    name: "Nginx config",
    aliases: ["nginxconf"],
    contains: [
      e.HASH_COMMENT_MODE,
      {
        beginKeywords: "upstream location",
        end: /;|\{/,
        contains: r.contains,
        keywords: { section: "upstream location" }
      },
      {
        className: "section",
        begin: t.concat(e.UNDERSCORE_IDENT_RE + t.lookahead(/\s+\{/)),
        relevance: 0
      },
      {
        begin: t.lookahead(e.UNDERSCORE_IDENT_RE + "\\s"),
        end: ";|\\{",
        contains: [
          {
            className: "attribute",
            begin: e.UNDERSCORE_IDENT_RE,
            starts: r
          }
        ],
        relevance: 0
      }
    ],
    illegal: "[^\\s\\}\\{]"
  };
}
function Qo(e) {
  const t = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  }, u = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, i = [
    "true",
    "false",
    "null"
  ], r = {
    scope: "literal",
    beginKeywords: i.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: i
    },
    contains: [
      t,
      u,
      e.QUOTE_STRING_MODE,
      r,
      e.C_NUMBER_MODE,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function es(e) {
  const t = "true false yes no null", u = "[\\w#;/?:@&=+$,.~*'()[\\]]+", i = {
    className: "attr",
    variants: [
      // added brackets support and special char support
      { begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
      {
        // double quoted keys - with brackets and special char support
        begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/
      },
      {
        // single quoted keys - with brackets and special char support
        begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/
      }
    ]
  }, r = {
    className: "template-variable",
    variants: [
      {
        // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      {
        // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  }, n = {
    className: "string",
    relevance: 0,
    begin: /'/,
    end: /'/,
    contains: [
      {
        match: /''/,
        scope: "char.escape",
        relevance: 0
      }
    ]
  }, c = {
    className: "string",
    relevance: 0,
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      e.BACKSLASH_ESCAPE,
      r
    ]
  }, a = e.inherit(c, { variants: [
    {
      begin: /'/,
      end: /'/,
      contains: [
        {
          begin: /''/,
          relevance: 0
        }
      ]
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] }), _ = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, y = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: t,
    relevance: 0
  }, o = {
    begin: /\{/,
    end: /\}/,
    contains: [y],
    illegal: "\\n",
    relevance: 0
  }, p = {
    begin: "\\[",
    end: "\\]",
    contains: [y],
    illegal: "\\n",
    relevance: 0
  }, d = [
    i,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + u
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + u + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + u
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + u
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    e.HASH_COMMENT_MODE,
    {
      beginKeywords: t,
      keywords: { literal: t }
    },
    _,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    o,
    p,
    n,
    c
  ], k = [...d];
  return k.pop(), k.push(a), y.contains = k, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: d
  };
}
function ts(e) {
  const t = e.regex, u = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), i = /[\p{L}0-9._:-]+/u, r = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, n = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, c = e.inherit(n, {
    begin: /\(/,
    end: /\)/
  }), a = e.inherit(e.APOS_STRING_MODE, { className: "string" }), s = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), l = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: i,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [r]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [r]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          n,
          s,
          a,
          c,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  n,
                  c,
                  s,
                  a
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      r,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              s
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [l],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [l],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: t.concat(
          /</,
          t.lookahead(t.concat(
            u,
            // <tag/>
            // <tag>
            // <tag ...
            t.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: u,
            relevance: 0,
            starts: l
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: t.concat(
          /<\//,
          t.lookahead(t.concat(
            u,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: u,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
function us(e) {
  return {
    name: "Shell Session",
    aliases: [
      "console",
      "shellsession"
    ],
    contains: [
      {
        className: "meta.prompt",
        // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
        // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
        // echo /path/to/home > t.exe
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
        starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash"
        }
      }
    ]
  };
}
const ns = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), rs = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], as = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], is = [
  ...rs,
  ...as
], os = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), ss = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), cs = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), ls = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function fs(e) {
  const t = e.regex, u = ns(e), i = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, r = "and or not only", n = /@-?\w[\w]*(-\w+)*/, c = "[a-zA-Z-][a-zA-Z0-9_-]*", a = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: !0,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      u.BLOCK_COMMENT,
      i,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      u.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + c,
        relevance: 0
      },
      u.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + ss.join("|") + ")" },
          { begin: ":(:)?(" + cs.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      u.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ls.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          u.BLOCK_COMMENT,
          u.HEXCOLOR,
          u.IMPORTANT,
          u.CSS_NUMBER_MODE,
          ...a,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...a,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: !0,
                excludeEnd: !0
              }
            ]
          },
          u.FUNCTION_DISPATCH
        ]
      },
      {
        begin: t.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: n
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: r,
              attribute: os.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...a,
              u.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + is.join("|") + ")\\b"
      }
    ]
  };
}
function ds(e) {
  const t = e.regex, u = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), i = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ], a = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: i,
    built_in: [
      "__import__",
      "abs",
      "all",
      "any",
      "ascii",
      "bin",
      "bool",
      "breakpoint",
      "bytearray",
      "bytes",
      "callable",
      "chr",
      "classmethod",
      "compile",
      "complex",
      "delattr",
      "dict",
      "dir",
      "divmod",
      "enumerate",
      "eval",
      "exec",
      "filter",
      "float",
      "format",
      "frozenset",
      "getattr",
      "globals",
      "hasattr",
      "hash",
      "help",
      "hex",
      "id",
      "input",
      "int",
      "isinstance",
      "issubclass",
      "iter",
      "len",
      "list",
      "locals",
      "map",
      "max",
      "memoryview",
      "min",
      "next",
      "object",
      "oct",
      "open",
      "ord",
      "pow",
      "print",
      "property",
      "range",
      "repr",
      "reversed",
      "round",
      "set",
      "setattr",
      "slice",
      "sorted",
      "staticmethod",
      "str",
      "sum",
      "super",
      "tuple",
      "type",
      "vars",
      "zip"
    ],
    literal: [
      "__debug__",
      "Ellipsis",
      "False",
      "None",
      "NotImplemented",
      "True"
    ],
    type: [
      "Any",
      "Callable",
      "Coroutine",
      "Dict",
      "List",
      "Literal",
      "Generic",
      "Optional",
      "Sequence",
      "Set",
      "Tuple",
      "Type",
      "Union"
    ]
  }, s = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  }, l = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: a,
    illegal: /#/
  }, f = {
    begin: /\{\{/,
    relevance: 0
  }, m = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          s
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          s
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          s,
          f,
          l
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          s,
          f,
          l
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          e.BACKSLASH_ESCAPE,
          f,
          l
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          e.BACKSLASH_ESCAPE,
          f,
          l
        ]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  }, _ = "[0-9](_?[0-9])*", y = `(\\b(${_}))?\\.(${_})|\\b(${_})\\.`, o = `\\b|${i.join("|")}`, p = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${_})|(${y}))[eE][+-]?(${_})[jJ]?(?=${o})`
      },
      {
        begin: `(${y})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${o})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${o})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${o})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${o})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${_})[jJ](?=${o})`
      }
    ]
  }, d = {
    className: "comment",
    begin: t.lookahead(/# type:/),
    end: /$/,
    keywords: a,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: !0
      }
    ]
  }, k = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: !0
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: a,
        contains: [
          "self",
          s,
          p,
          m,
          e.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  return l.contains = [
    m,
    p,
    s
  ], {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: !0,
    keywords: a,
    illegal: /(<\/|\?)|=>/,
    contains: [
      s,
      p,
      {
        // very common convention
        scope: "variable.language",
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      m,
      d,
      e.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          u
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [k]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              u,
              /\s*/,
              /\(\s*/,
              u,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              u
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          p,
          k,
          m
        ]
      }
    ]
  };
}
function hs(e) {
  const n = {
    keyword: [
      "break",
      "case",
      "chan",
      "const",
      "continue",
      "default",
      "defer",
      "else",
      "fallthrough",
      "for",
      "func",
      "go",
      "goto",
      "if",
      "import",
      "interface",
      "map",
      "package",
      "range",
      "return",
      "select",
      "struct",
      "switch",
      "type",
      "var"
    ],
    type: [
      "bool",
      "byte",
      "complex64",
      "complex128",
      "error",
      "float32",
      "float64",
      "int8",
      "int16",
      "int32",
      "int64",
      "string",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "int",
      "uint",
      "uintptr",
      "rune"
    ],
    literal: [
      "true",
      "false",
      "iota",
      "nil"
    ],
    built_in: [
      "append",
      "cap",
      "close",
      "complex",
      "copy",
      "imag",
      "len",
      "make",
      "new",
      "panic",
      "print",
      "println",
      "real",
      "recover",
      "delete"
    ]
  };
  return {
    name: "Go",
    aliases: ["golang"],
    keywords: n,
    illegal: "</",
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        variants: [
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          {
            begin: "`",
            end: "`"
          }
        ]
      },
      {
        className: "number",
        variants: [
          {
            match: /-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/,
            // hex without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/,
            // hex with a present digit before . (making a digit afterwards optional)
            relevance: 0
          },
          {
            match: /-?\b0[oO](_?[0-7])*i?/,
            // leading 0o octal
            relevance: 0
          },
          {
            match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/,
            // decimal without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/,
            // decimal with a present digit before . (making a digit afterwards optional)
            relevance: 0
          }
        ]
      },
      {
        begin: /:=/
        // relevance booster
      },
      {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)",
        excludeEnd: !0,
        contains: [
          e.TITLE_MODE,
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: !0,
            keywords: n,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}
function ps(e) {
  const t = e.regex, u = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), i = "decltype\\(auto\\)", r = "[a-zA-Z_]\\w*::", c = "(?!struct)(" + i + "|" + t.optional(r) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", a = {
    className: "type",
    begin: "\\b[a-z\\d_]*_t\\b"
  }, l = {
    className: "string",
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [e.BACKSLASH_ESCAPE]
      },
      {
        begin: "(u8?|U|L)?'(" + "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)" + "|.)",
        end: "'",
        illegal: "."
      },
      e.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  }, f = {
    className: "number",
    variants: [
      // Floating-point literal.
      {
        begin: "[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"
      },
      // Integer literal.
      {
        begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"
        // Note: there are user-defined literal suffixes too, but perhaps having the custom suffix not part of the
        // literal highlight actually makes it stand out more.
      }
    ],
    relevance: 0
  }, m = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      e.inherit(l, { className: "string" }),
      {
        className: "string",
        begin: /<.*?>/
      },
      u,
      e.C_BLOCK_COMMENT_MODE
    ]
  }, _ = {
    className: "title",
    begin: t.optional(r) + e.IDENT_RE,
    relevance: 0
  }, y = t.optional(r) + e.IDENT_RE + "\\s*\\(", o = [
    "alignas",
    "alignof",
    "and",
    "and_eq",
    "asm",
    "atomic_cancel",
    "atomic_commit",
    "atomic_noexcept",
    "auto",
    "bitand",
    "bitor",
    "break",
    "case",
    "catch",
    "class",
    "co_await",
    "co_return",
    "co_yield",
    "compl",
    "concept",
    "const_cast|10",
    "consteval",
    "constexpr",
    "constinit",
    "continue",
    "decltype",
    "default",
    "delete",
    "do",
    "dynamic_cast|10",
    "else",
    "enum",
    "explicit",
    "export",
    "extern",
    "false",
    "final",
    "for",
    "friend",
    "goto",
    "if",
    "import",
    "inline",
    "module",
    "mutable",
    "namespace",
    "new",
    "noexcept",
    "not",
    "not_eq",
    "nullptr",
    "operator",
    "or",
    "or_eq",
    "override",
    "private",
    "protected",
    "public",
    "reflexpr",
    "register",
    "reinterpret_cast|10",
    "requires",
    "return",
    "sizeof",
    "static_assert",
    "static_cast|10",
    "struct",
    "switch",
    "synchronized",
    "template",
    "this",
    "thread_local",
    "throw",
    "transaction_safe",
    "transaction_safe_dynamic",
    "true",
    "try",
    "typedef",
    "typeid",
    "typename",
    "union",
    "using",
    "virtual",
    "volatile",
    "while",
    "xor",
    "xor_eq"
  ], p = [
    "bool",
    "char",
    "char16_t",
    "char32_t",
    "char8_t",
    "double",
    "float",
    "int",
    "long",
    "short",
    "void",
    "wchar_t",
    "unsigned",
    "signed",
    "const",
    "static"
  ], d = [
    "any",
    "auto_ptr",
    "barrier",
    "binary_semaphore",
    "bitset",
    "complex",
    "condition_variable",
    "condition_variable_any",
    "counting_semaphore",
    "deque",
    "false_type",
    "flat_map",
    "flat_set",
    "future",
    "imaginary",
    "initializer_list",
    "istringstream",
    "jthread",
    "latch",
    "lock_guard",
    "multimap",
    "multiset",
    "mutex",
    "optional",
    "ostringstream",
    "packaged_task",
    "pair",
    "promise",
    "priority_queue",
    "queue",
    "recursive_mutex",
    "recursive_timed_mutex",
    "scoped_lock",
    "set",
    "shared_future",
    "shared_lock",
    "shared_mutex",
    "shared_timed_mutex",
    "shared_ptr",
    "stack",
    "string_view",
    "stringstream",
    "timed_mutex",
    "thread",
    "true_type",
    "tuple",
    "unique_lock",
    "unique_ptr",
    "unordered_map",
    "unordered_multimap",
    "unordered_multiset",
    "unordered_set",
    "variant",
    "vector",
    "weak_ptr",
    "wstring",
    "wstring_view"
  ], k = [
    "abort",
    "abs",
    "acos",
    "apply",
    "as_const",
    "asin",
    "atan",
    "atan2",
    "calloc",
    "ceil",
    "cerr",
    "cin",
    "clog",
    "cos",
    "cosh",
    "cout",
    "declval",
    "endl",
    "exchange",
    "exit",
    "exp",
    "fabs",
    "floor",
    "fmod",
    "forward",
    "fprintf",
    "fputs",
    "free",
    "frexp",
    "fscanf",
    "future",
    "invoke",
    "isalnum",
    "isalpha",
    "iscntrl",
    "isdigit",
    "isgraph",
    "islower",
    "isprint",
    "ispunct",
    "isspace",
    "isupper",
    "isxdigit",
    "labs",
    "launder",
    "ldexp",
    "log",
    "log10",
    "make_pair",
    "make_shared",
    "make_shared_for_overwrite",
    "make_tuple",
    "make_unique",
    "malloc",
    "memchr",
    "memcmp",
    "memcpy",
    "memset",
    "modf",
    "move",
    "pow",
    "printf",
    "putchar",
    "puts",
    "realloc",
    "scanf",
    "sin",
    "sinh",
    "snprintf",
    "sprintf",
    "sqrt",
    "sscanf",
    "std",
    "stderr",
    "stdin",
    "stdout",
    "strcat",
    "strchr",
    "strcmp",
    "strcpy",
    "strcspn",
    "strlen",
    "strncat",
    "strncmp",
    "strncpy",
    "strpbrk",
    "strrchr",
    "strspn",
    "strstr",
    "swap",
    "tan",
    "tanh",
    "terminate",
    "to_underlying",
    "tolower",
    "toupper",
    "vfprintf",
    "visit",
    "vprintf",
    "vsprintf"
  ], w = {
    type: p,
    keyword: o,
    literal: [
      "NULL",
      "false",
      "nullopt",
      "nullptr",
      "true"
    ],
    built_in: ["_Pragma"],
    _type_hints: d
  }, g = {
    className: "function.dispatch",
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: k
    },
    begin: t.concat(
      /\b/,
      /(?!decltype)/,
      /(?!if)/,
      /(?!for)/,
      /(?!switch)/,
      /(?!while)/,
      e.IDENT_RE,
      t.lookahead(/(<[^<>]+>|)\s*\(/)
    )
  }, x = [
    g,
    m,
    a,
    u,
    e.C_BLOCK_COMMENT_MODE,
    f,
    l
  ], A = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: "new throw return else",
        end: /;/
      }
    ],
    keywords: w,
    contains: x.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: w,
        contains: x.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  }, C = {
    className: "function",
    begin: "(" + c + "[\\*&\\s]+)+" + y,
    returnBegin: !0,
    end: /[{;=]/,
    excludeEnd: !0,
    keywords: w,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: i,
        keywords: w,
        relevance: 0
      },
      {
        begin: y,
        returnBegin: !0,
        contains: [_],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: !0,
        contains: [
          l,
          f
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: w,
        relevance: 0,
        contains: [
          u,
          e.C_BLOCK_COMMENT_MODE,
          l,
          f,
          a,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: w,
            relevance: 0,
            contains: [
              "self",
              u,
              e.C_BLOCK_COMMENT_MODE,
              l,
              f,
              a
            ]
          }
        ]
      },
      a,
      u,
      e.C_BLOCK_COMMENT_MODE,
      m
    ]
  };
  return {
    name: "C++",
    aliases: [
      "cc",
      "c++",
      "h++",
      "hpp",
      "hh",
      "hxx",
      "cxx"
    ],
    keywords: w,
    illegal: "</",
    classNameAliases: { "function.dispatch": "built_in" },
    contains: [].concat(
      A,
      C,
      g,
      x,
      [
        m,
        {
          // containers: ie, `vector <int> rooms (9);`
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
          end: ">",
          keywords: w,
          contains: [
            "self",
            a
          ]
        },
        {
          begin: e.IDENT_RE + "::",
          keywords: w
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    )
  };
}
ye.registerLanguage("bash", Uo);
ye.registerLanguage("javascript", Vo);
ye.registerLanguage("typescript", Wo);
ye.registerLanguage("java", Xo);
ye.registerLanguage("sql", Yo);
ye.registerLanguage("nginx", Jo);
ye.registerLanguage("json", Qo);
ye.registerLanguage("yaml", es);
ye.registerLanguage("xml", ts);
ye.registerLanguage("shell", us);
ye.registerLanguage("css", fs);
ye.registerLanguage("python", ds);
ye.registerLanguage("go", hs);
ye.registerLanguage("cpp", ps);
function bs(e) {
  e.options.highlight = function(t, u) {
    const i = parseInt(Date.now()) + Math.floor(Math.random() * 1e7);
    let r = `<div class="code-actions">
      ${u ? `<div class="lanage-name">${u}</div>` : ""}
      <a class="copy-btn" data-clipboard-action="copy" data-clipboard-target="#copy${i}">复制</a>
    </div>`;
    const n = t.split(/\n/).length - 1;
    let c = '<span aria-hidden="true" class="line-numbers-rows">';
    for (let s = 0; s < n; s++)
      c = c + "<span></span>";
    if (c += "</span>", u && ye.getLanguage(u))
      try {
        const s = ye.highlight(u, t, !0).value;
        return r = r + s, `<pre class="hljs"><code>${r}</code>${c}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${i}">${t.replace(/<\/textarea>/g, "&lt;/textarea>")}</textarea>`;
      } catch (s) {
        console.log(s);
      }
    const a = e.utils.escapeHtml(t);
    return r = r + a, `<pre class="hljs"><code>${r}</code>${c}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${i}">${t.replace(/<\/textarea>/g, "&lt;/textarea>")}</textarea>`;
  };
}
var E0 = { exports: {} };
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
var ms = E0.exports, Gu;
function _s() {
  return Gu || (Gu = 1, function(e, t) {
    (function(i, r) {
      e.exports = r();
    })(ms, function() {
      return (
        /******/
        function() {
          var u = {
            /***/
            686: (
              /***/
              function(n, c, a) {
                a.d(c, {
                  default: function() {
                    return (
                      /* binding */
                      te
                    );
                  }
                });
                var s = a(279), l = /* @__PURE__ */ a.n(s), f = a(370), m = /* @__PURE__ */ a.n(f), _ = a(817), y = /* @__PURE__ */ a.n(_);
                function o(P) {
                  try {
                    return document.execCommand(P);
                  } catch {
                    return !1;
                  }
                }
                var p = function(R) {
                  var H = y()(R);
                  return o("cut"), H;
                }, d = p;
                function k(P) {
                  var R = document.documentElement.getAttribute("dir") === "rtl", H = document.createElement("textarea");
                  H.style.fontSize = "12pt", H.style.border = "0", H.style.padding = "0", H.style.margin = "0", H.style.position = "absolute", H.style[R ? "right" : "left"] = "-9999px";
                  var W = window.pageYOffset || document.documentElement.scrollTop;
                  return H.style.top = "".concat(W, "px"), H.setAttribute("readonly", ""), H.value = P, H;
                }
                var h = function(R, H) {
                  var W = k(R);
                  H.container.appendChild(W);
                  var K = y()(W);
                  return o("copy"), W.remove(), K;
                }, b = function(R) {
                  var H = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    container: document.body
                  }, W = "";
                  return typeof R == "string" ? W = h(R, H) : R instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(R == null ? void 0 : R.type) ? W = h(R.value, H) : (W = y()(R), o("copy")), W;
                }, w = b;
                function g(P) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? g = function(H) {
                    return typeof H;
                  } : g = function(H) {
                    return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
                  }, g(P);
                }
                var x = function() {
                  var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, H = R.action, W = H === void 0 ? "copy" : H, K = R.container, X = R.target, se = R.text;
                  if (W !== "copy" && W !== "cut")
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  if (X !== void 0)
                    if (X && g(X) === "object" && X.nodeType === 1) {
                      if (W === "copy" && X.hasAttribute("disabled"))
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                      if (W === "cut" && (X.hasAttribute("readonly") || X.hasAttribute("disabled")))
                        throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                    } else
                      throw new Error('Invalid "target" value, use a valid Element');
                  if (se)
                    return w(se, {
                      container: K
                    });
                  if (X)
                    return W === "cut" ? d(X) : w(X, {
                      container: K
                    });
                }, A = x;
                function C(P) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? C = function(H) {
                    return typeof H;
                  } : C = function(H) {
                    return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
                  }, C(P);
                }
                function D(P, R) {
                  if (!(P instanceof R))
                    throw new TypeError("Cannot call a class as a function");
                }
                function E(P, R) {
                  for (var H = 0; H < R.length; H++) {
                    var W = R[H];
                    W.enumerable = W.enumerable || !1, W.configurable = !0, "value" in W && (W.writable = !0), Object.defineProperty(P, W.key, W);
                  }
                }
                function O(P, R, H) {
                  return E(P.prototype, R), E(P, H), P;
                }
                function M(P, R) {
                  if (typeof R != "function" && R !== null)
                    throw new TypeError("Super expression must either be null or a function");
                  P.prototype = Object.create(R && R.prototype, { constructor: { value: P, writable: !0, configurable: !0 } }), R && I(P, R);
                }
                function I(P, R) {
                  return I = Object.setPrototypeOf || function(W, K) {
                    return W.__proto__ = K, W;
                  }, I(P, R);
                }
                function B(P) {
                  var R = z();
                  return function() {
                    var W = F(P), K;
                    if (R) {
                      var X = F(this).constructor;
                      K = Reflect.construct(W, arguments, X);
                    } else
                      K = W.apply(this, arguments);
                    return T(this, K);
                  };
                }
                function T(P, R) {
                  return R && (C(R) === "object" || typeof R == "function") ? R : $(P);
                }
                function $(P) {
                  if (P === void 0)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return P;
                }
                function z() {
                  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                  if (typeof Proxy == "function") return !0;
                  try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                    })), !0;
                  } catch {
                    return !1;
                  }
                }
                function F(P) {
                  return F = Object.setPrototypeOf ? Object.getPrototypeOf : function(H) {
                    return H.__proto__ || Object.getPrototypeOf(H);
                  }, F(P);
                }
                function U(P, R) {
                  var H = "data-clipboard-".concat(P);
                  if (R.hasAttribute(H))
                    return R.getAttribute(H);
                }
                var ne = /* @__PURE__ */ function(P) {
                  M(H, P);
                  var R = B(H);
                  function H(W, K) {
                    var X;
                    return D(this, H), X = R.call(this), X.resolveOptions(K), X.listenClick(W), X;
                  }
                  return O(H, [{
                    key: "resolveOptions",
                    value: function() {
                      var K = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                      this.action = typeof K.action == "function" ? K.action : this.defaultAction, this.target = typeof K.target == "function" ? K.target : this.defaultTarget, this.text = typeof K.text == "function" ? K.text : this.defaultText, this.container = C(K.container) === "object" ? K.container : document.body;
                    }
                    /**
                     * Adds a click event listener to the passed trigger.
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     */
                  }, {
                    key: "listenClick",
                    value: function(K) {
                      var X = this;
                      this.listener = m()(K, "click", function(se) {
                        return X.onClick(se);
                      });
                    }
                    /**
                     * Defines a new `ClipboardAction` on each click event.
                     * @param {Event} e
                     */
                  }, {
                    key: "onClick",
                    value: function(K) {
                      var X = K.delegateTarget || K.currentTarget, se = this.action(X) || "copy", _e = A({
                        action: se,
                        container: this.container,
                        target: this.target(X),
                        text: this.text(X)
                      });
                      this.emit(_e ? "success" : "error", {
                        action: se,
                        text: _e,
                        trigger: X,
                        clearSelection: function() {
                          X && X.focus(), window.getSelection().removeAllRanges();
                        }
                      });
                    }
                    /**
                     * Default `action` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultAction",
                    value: function(K) {
                      return U("action", K);
                    }
                    /**
                     * Default `target` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultTarget",
                    value: function(K) {
                      var X = U("target", K);
                      if (X)
                        return document.querySelector(X);
                    }
                    /**
                     * Allow fire programmatically a copy action
                     * @param {String|HTMLElement} target
                     * @param {Object} options
                     * @returns Text copied.
                     */
                  }, {
                    key: "defaultText",
                    /**
                     * Default `text` lookup function.
                     * @param {Element} trigger
                     */
                    value: function(K) {
                      return U("text", K);
                    }
                    /**
                     * Destroy lifecycle.
                     */
                  }, {
                    key: "destroy",
                    value: function() {
                      this.listener.destroy();
                    }
                  }], [{
                    key: "copy",
                    value: function(K) {
                      var X = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                        container: document.body
                      };
                      return w(K, X);
                    }
                    /**
                     * Allow fire programmatically a cut action
                     * @param {String|HTMLElement} target
                     * @returns Text cutted.
                     */
                  }, {
                    key: "cut",
                    value: function(K) {
                      return d(K);
                    }
                    /**
                     * Returns the support of the given action, or all actions if no action is
                     * given.
                     * @param {String} [action]
                     */
                  }, {
                    key: "isSupported",
                    value: function() {
                      var K = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"], X = typeof K == "string" ? [K] : K, se = !!document.queryCommandSupported;
                      return X.forEach(function(_e) {
                        se = se && !!document.queryCommandSupported(_e);
                      }), se;
                    }
                  }]), H;
                }(l()), te = ne;
              }
            ),
            /***/
            828: (
              /***/
              function(n) {
                var c = 9;
                if (typeof Element < "u" && !Element.prototype.matches) {
                  var a = Element.prototype;
                  a.matches = a.matchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector || a.webkitMatchesSelector;
                }
                function s(l, f) {
                  for (; l && l.nodeType !== c; ) {
                    if (typeof l.matches == "function" && l.matches(f))
                      return l;
                    l = l.parentNode;
                  }
                }
                n.exports = s;
              }
            ),
            /***/
            438: (
              /***/
              function(n, c, a) {
                var s = a(828);
                function l(_, y, o, p, d) {
                  var k = m.apply(this, arguments);
                  return _.addEventListener(o, k, d), {
                    destroy: function() {
                      _.removeEventListener(o, k, d);
                    }
                  };
                }
                function f(_, y, o, p, d) {
                  return typeof _.addEventListener == "function" ? l.apply(null, arguments) : typeof o == "function" ? l.bind(null, document).apply(null, arguments) : (typeof _ == "string" && (_ = document.querySelectorAll(_)), Array.prototype.map.call(_, function(k) {
                    return l(k, y, o, p, d);
                  }));
                }
                function m(_, y, o, p) {
                  return function(d) {
                    d.delegateTarget = s(d.target, y), d.delegateTarget && p.call(_, d);
                  };
                }
                n.exports = f;
              }
            ),
            /***/
            879: (
              /***/
              function(n, c) {
                c.node = function(a) {
                  return a !== void 0 && a instanceof HTMLElement && a.nodeType === 1;
                }, c.nodeList = function(a) {
                  var s = Object.prototype.toString.call(a);
                  return a !== void 0 && (s === "[object NodeList]" || s === "[object HTMLCollection]") && "length" in a && (a.length === 0 || c.node(a[0]));
                }, c.string = function(a) {
                  return typeof a == "string" || a instanceof String;
                }, c.fn = function(a) {
                  var s = Object.prototype.toString.call(a);
                  return s === "[object Function]";
                };
              }
            ),
            /***/
            370: (
              /***/
              function(n, c, a) {
                var s = a(879), l = a(438);
                function f(o, p, d) {
                  if (!o && !p && !d)
                    throw new Error("Missing required arguments");
                  if (!s.string(p))
                    throw new TypeError("Second argument must be a String");
                  if (!s.fn(d))
                    throw new TypeError("Third argument must be a Function");
                  if (s.node(o))
                    return m(o, p, d);
                  if (s.nodeList(o))
                    return _(o, p, d);
                  if (s.string(o))
                    return y(o, p, d);
                  throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                }
                function m(o, p, d) {
                  return o.addEventListener(p, d), {
                    destroy: function() {
                      o.removeEventListener(p, d);
                    }
                  };
                }
                function _(o, p, d) {
                  return Array.prototype.forEach.call(o, function(k) {
                    k.addEventListener(p, d);
                  }), {
                    destroy: function() {
                      Array.prototype.forEach.call(o, function(k) {
                        k.removeEventListener(p, d);
                      });
                    }
                  };
                }
                function y(o, p, d) {
                  return l(document.body, o, p, d);
                }
                n.exports = f;
              }
            ),
            /***/
            817: (
              /***/
              function(n) {
                function c(a) {
                  var s;
                  if (a.nodeName === "SELECT")
                    a.focus(), s = a.value;
                  else if (a.nodeName === "INPUT" || a.nodeName === "TEXTAREA") {
                    var l = a.hasAttribute("readonly");
                    l || a.setAttribute("readonly", ""), a.select(), a.setSelectionRange(0, a.value.length), l || a.removeAttribute("readonly"), s = a.value;
                  } else {
                    a.hasAttribute("contenteditable") && a.focus();
                    var f = window.getSelection(), m = document.createRange();
                    m.selectNodeContents(a), f.removeAllRanges(), f.addRange(m), s = f.toString();
                  }
                  return s;
                }
                n.exports = c;
              }
            ),
            /***/
            279: (
              /***/
              function(n) {
                function c() {
                }
                c.prototype = {
                  on: function(a, s, l) {
                    var f = this.e || (this.e = {});
                    return (f[a] || (f[a] = [])).push({
                      fn: s,
                      ctx: l
                    }), this;
                  },
                  once: function(a, s, l) {
                    var f = this;
                    function m() {
                      f.off(a, m), s.apply(l, arguments);
                    }
                    return m._ = s, this.on(a, m, l);
                  },
                  emit: function(a) {
                    var s = [].slice.call(arguments, 1), l = ((this.e || (this.e = {}))[a] || []).slice(), f = 0, m = l.length;
                    for (f; f < m; f++)
                      l[f].fn.apply(l[f].ctx, s);
                    return this;
                  },
                  off: function(a, s) {
                    var l = this.e || (this.e = {}), f = l[a], m = [];
                    if (f && s)
                      for (var _ = 0, y = f.length; _ < y; _++)
                        f[_].fn !== s && f[_].fn._ !== s && m.push(f[_]);
                    return m.length ? l[a] = m : delete l[a], this;
                  }
                }, n.exports = c, n.exports.TinyEmitter = c;
              }
            )
            /******/
          }, i = {};
          function r(n) {
            if (i[n])
              return i[n].exports;
            var c = i[n] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            return u[n](c, c.exports, r), c.exports;
          }
          return function() {
            r.n = function(n) {
              var c = n && n.__esModule ? (
                /******/
                function() {
                  return n.default;
                }
              ) : (
                /******/
                function() {
                  return n;
                }
              );
              return r.d(c, { a: c }), c;
            };
          }(), function() {
            r.d = function(n, c) {
              for (var a in c)
                r.o(c, a) && !r.o(n, a) && Object.defineProperty(n, a, { enumerable: !0, get: c[a] });
            };
          }(), function() {
            r.o = function(n, c) {
              return Object.prototype.hasOwnProperty.call(n, c);
            };
          }(), r(686);
        }().default
      );
    });
  }(E0)), E0.exports;
}
var gs = _s();
const xs = /* @__PURE__ */ F0(gs), ys = (e, t) => {
  const u = e.__vccOpts || e;
  for (const [i, r] of t)
    u[i] = r;
  return u;
}, vs = ["innerHTML"], ks = {
  __name: "markdown",
  props: {
    markdownValue: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["update:markdownValue"],
  setup(e, { emit: t }) {
    const u = t, i = e, r = Yt({
      get: () => i.markdownValue,
      set: (a) => u("update:markdownValue", a)
    }), n = new Ce();
    n.use(bs).use(eo).use(no).use(Po).use(Oo).use(vo).use(Eo, i.loading).use(Ao).use(Co).use(Lo).use(Bo);
    const c = Yt(() => n.render(r.value));
    return lr(() => {
      new xs(".copy-btn").on("success", (s) => {
        const l = s.trigger;
        l.textContent = "已复制", setTimeout(() => {
          l.textContent = "复制";
        }, 1e3), s.clearSelection();
      });
    }), (a, s) => (fr(), dr("div", {
      innerHTML: c.value,
      class: "markdown-content"
    }, null, 8, vs));
  }
}, ws = /* @__PURE__ */ ys(ks, [["__scopeId", "data-v-4f3d31f4"]]), As = (e) => {
  e.component("zx-markdown", ws);
};
export {
  As as default
};
