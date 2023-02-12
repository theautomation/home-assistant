function t(t, e, i, n) {
  var s,
    o = arguments.length,
    r =
      o < 3 ? e : null === n ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
    r = Reflect.decorate(t, e, i, n);
  else
    for (var a = t.length - 1; a >= 0; a--)
      (s = t[a]) && (r = (o < 3 ? s(r) : o > 3 ? s(e, i, r) : s(e, i)) || r);
  return o > 3 && r && Object.defineProperty(e, i, r), r;
}
const e =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  i = Symbol(),
  n = new Map();
class s {
  constructor(t, e) {
    if (((this._$cssResult$ = !0), e !== i))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    this.cssText = t;
  }
  get styleSheet() {
    let t = n.get(this.cssText);
    return (
      e &&
        void 0 === t &&
        (n.set(this.cssText, (t = new CSSStyleSheet())),
        t.replaceSync(this.cssText)),
      t
    );
  }
  toString() {
    return this.cssText;
  }
}
const o = (t, ...e) => {
    const n =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, i, n) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ("number" == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(i) +
              t[n + 1],
            t[0]
          );
    return new s(n, i);
  },
  r = e
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = "";
              for (const i of t.cssRules) e += i.cssText;
              return ((t) => new s("string" == typeof t ? t : t + "", i))(e);
            })(t)
          : t;
var a;
const l = window.trustedTypes,
  c = l ? l.emptyScript : "",
  d = window.reactiveElementPolyfillSupport,
  h = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? c : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let i = t;
      switch (e) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    },
  },
  u = (t, e) => e !== t && (e == e || t == t),
  v = { attribute: !0, type: String, converter: h, reflect: !1, hasChanged: u };
class g extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o();
  }
  static addInitializer(t) {
    var e;
    (null !== (e = this.l) && void 0 !== e) || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, i) => {
        const n = this._$Eh(i, e);
        void 0 !== n && (this._$Eu.set(n, i), t.push(n));
      }),
      t
    );
  }
  static createProperty(t, e = v) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const i = "symbol" == typeof t ? Symbol() : "__" + t,
        n = this.getPropertyDescriptor(t, i, e);
      void 0 !== n && Object.defineProperty(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return {
      get() {
        return this[e];
      },
      set(n) {
        const s = this[t];
        (this[e] = n), this.requestUpdate(t, s, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || v;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const i of e) this.createProperty(i, t[i]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const t of i) e.unshift(r(t));
    } else void 0 !== t && e.push(r(t));
    return e;
  }
  static _$Eh(t, e) {
    const i = e.attribute;
    return !1 === i
      ? void 0
      : "string" == typeof i
      ? i
      : "string" == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  o() {
    var t;
    (this._$Ep = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Em(),
      this.requestUpdate(),
      null === (t = this.constructor.l) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var e, i;
    (null !== (e = this._$Eg) && void 0 !== e ? e : (this._$Eg = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (i = t.hostConnected) || void 0 === i || i.call(t));
  }
  removeController(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.splice(this._$Eg.indexOf(t) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Et.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const i =
      null !== (t = this.shadowRoot) && void 0 !== t
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((t, i) => {
        e
          ? (t.adoptedStyleSheets = i.map((t) =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : i.forEach((e) => {
              const i = document.createElement("style"),
                n = window.litNonce;
              void 0 !== n && i.setAttribute("nonce", n),
                (i.textContent = e.cssText),
                t.appendChild(i);
            });
      })(i, this.constructor.elementStyles),
      i
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$Eg) ||
        void 0 === t ||
        t.forEach((t) => {
          var e;
          return null === (e = t.hostConnected) || void 0 === e
            ? void 0
            : e.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$Eg) ||
      void 0 === t ||
      t.forEach((t) => {
        var e;
        return null === (e = t.hostDisconnected) || void 0 === e
          ? void 0
          : e.call(t);
      });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ES(t, e, i = v) {
    var n, s;
    const o = this.constructor._$Eh(t, i);
    if (void 0 !== o && !0 === i.reflect) {
      const r = (
        null !==
          (s =
            null === (n = i.converter) || void 0 === n
              ? void 0
              : n.toAttribute) && void 0 !== s
          ? s
          : h.toAttribute
      )(e, i.type);
      (this._$Ei = t),
        null == r ? this.removeAttribute(o) : this.setAttribute(o, r),
        (this._$Ei = null);
    }
  }
  _$AK(t, e) {
    var i, n, s;
    const o = this.constructor,
      r = o._$Eu.get(t);
    if (void 0 !== r && this._$Ei !== r) {
      const t = o.getPropertyOptions(r),
        a = t.converter,
        l =
          null !==
            (s =
              null !==
                (n =
                  null === (i = a) || void 0 === i
                    ? void 0
                    : i.fromAttribute) && void 0 !== n
                ? n
                : "function" == typeof a
                ? a
                : null) && void 0 !== s
            ? s
            : h.fromAttribute;
      (this._$Ei = r), (this[r] = l(e, t.type)), (this._$Ei = null);
    }
  }
  requestUpdate(t, e, i) {
    let n = !0;
    void 0 !== t &&
      (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || u)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          !0 === i.reflect &&
            this._$Ei !== t &&
            (void 0 === this._$EC && (this._$EC = new Map()),
            this._$EC.set(t, i)))
        : (n = !1)),
      !this.isUpdatePending && n && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = !0;
    try {
      await this._$Ep;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((t, e) => (this[e] = t)), (this._$Et = void 0));
    let e = !1;
    const i = this._$AL;
    try {
      (e = this.shouldUpdate(i)),
        e
          ? (this.willUpdate(i),
            null === (t = this._$Eg) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostUpdate) || void 0 === e
                  ? void 0
                  : e.call(t);
              }),
            this.update(i))
          : this._$EU();
    } catch (t) {
      throw ((e = !1), this._$EU(), t);
    }
    e && this._$AE(i);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.forEach((t) => {
        var e;
        return null === (e = t.hostUpdated) || void 0 === e
          ? void 0
          : e.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EU() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC &&
      (this._$EC.forEach((t, e) => this._$ES(e, this[e], t)),
      (this._$EC = void 0)),
      this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
var p;
(g.finalized = !0),
  (g.elementProperties = new Map()),
  (g.elementStyles = []),
  (g.shadowRootOptions = { mode: "open" }),
  null == d || d({ ReactiveElement: g }),
  (null !== (a = globalThis.reactiveElementVersions) && void 0 !== a
    ? a
    : (globalThis.reactiveElementVersions = [])
  ).push("1.3.0");
const f = globalThis.trustedTypes,
  _ = f ? f.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
  m = `lit$${(Math.random() + "").slice(9)}$`,
  y = "?" + m,
  b = `<${y}>`,
  $ = document,
  w = (t = "") => $.createComment(t),
  E = (t) => null === t || ("object" != typeof t && "function" != typeof t),
  A = Array.isArray,
  C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  S = /-->/g,
  O = />/g,
  j =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  T = /'/g,
  x = /"/g,
  k = /^(?:script|style|textarea|title)$/i,
  U = (
    (t) =>
    (e, ...i) => ({ _$litType$: t, strings: e, values: i })
  )(1),
  P = Symbol.for("lit-noChange"),
  M = Symbol.for("lit-nothing"),
  N = new WeakMap(),
  D = $.createTreeWalker($, 129, null, !1),
  I = (t, e) => {
    const i = t.length - 1,
      n = [];
    let s,
      o = 2 === e ? "<svg>" : "",
      r = C;
    for (let e = 0; e < i; e++) {
      const i = t[e];
      let a,
        l,
        c = -1,
        d = 0;
      for (; d < i.length && ((r.lastIndex = d), (l = r.exec(i)), null !== l); )
        (d = r.lastIndex),
          r === C
            ? "!--" === l[1]
              ? (r = S)
              : void 0 !== l[1]
              ? (r = O)
              : void 0 !== l[2]
              ? (k.test(l[2]) && (s = RegExp("</" + l[2], "g")), (r = j))
              : void 0 !== l[3] && (r = j)
            : r === j
            ? ">" === l[0]
              ? ((r = null != s ? s : C), (c = -1))
              : void 0 === l[1]
              ? (c = -2)
              : ((c = r.lastIndex - l[2].length),
                (a = l[1]),
                (r = void 0 === l[3] ? j : '"' === l[3] ? x : T))
            : r === x || r === T
            ? (r = j)
            : r === S || r === O
            ? (r = C)
            : ((r = j), (s = void 0));
      const h = r === j && t[e + 1].startsWith("/>") ? " " : "";
      o +=
        r === C
          ? i + b
          : c >= 0
          ? (n.push(a), i.slice(0, c) + "$lit$" + i.slice(c) + m + h)
          : i + m + (-2 === c ? (n.push(void 0), e) : h);
    }
    const a = o + (t[i] || "<?>") + (2 === e ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== _ ? _.createHTML(a) : a, n];
  };
class R {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let s = 0,
      o = 0;
    const r = t.length - 1,
      a = this.parts,
      [l, c] = I(t, e);
    if (
      ((this.el = R.createElement(l, i)),
      (D.currentNode = this.el.content),
      2 === e)
    ) {
      const t = this.el.content,
        e = t.firstChild;
      e.remove(), t.append(...e.childNodes);
    }
    for (; null !== (n = D.nextNode()) && a.length < r; ) {
      if (1 === n.nodeType) {
        if (n.hasAttributes()) {
          const t = [];
          for (const e of n.getAttributeNames())
            if (e.endsWith("$lit$") || e.startsWith(m)) {
              const i = c[o++];
              if ((t.push(e), void 0 !== i)) {
                const t = n.getAttribute(i.toLowerCase() + "$lit$").split(m),
                  e = /([.?@])?(.*)/.exec(i);
                a.push({
                  type: 1,
                  index: s,
                  name: e[2],
                  strings: t,
                  ctor:
                    "." === e[1] ? W : "?" === e[1] ? B : "@" === e[1] ? q : G,
                });
              } else a.push({ type: 6, index: s });
            }
          for (const e of t) n.removeAttribute(e);
        }
        if (k.test(n.tagName)) {
          const t = n.textContent.split(m),
            e = t.length - 1;
          if (e > 0) {
            n.textContent = f ? f.emptyScript : "";
            for (let i = 0; i < e; i++)
              n.append(t[i], w()),
                D.nextNode(),
                a.push({ type: 2, index: ++s });
            n.append(t[e], w());
          }
        }
      } else if (8 === n.nodeType)
        if (n.data === y) a.push({ type: 2, index: s });
        else {
          let t = -1;
          for (; -1 !== (t = n.data.indexOf(m, t + 1)); )
            a.push({ type: 7, index: s }), (t += m.length - 1);
        }
      s++;
    }
  }
  static createElement(t, e) {
    const i = $.createElement("template");
    return (i.innerHTML = t), i;
  }
}
function H(t, e, i = t, n) {
  var s, o, r, a;
  if (e === P) return e;
  let l =
    void 0 !== n
      ? null === (s = i._$Cl) || void 0 === s
        ? void 0
        : s[n]
      : i._$Cu;
  const c = E(e) ? void 0 : e._$litDirective$;
  return (
    (null == l ? void 0 : l.constructor) !== c &&
      (null === (o = null == l ? void 0 : l._$AO) ||
        void 0 === o ||
        o.call(l, !1),
      void 0 === c ? (l = void 0) : ((l = new c(t)), l._$AT(t, i, n)),
      void 0 !== n
        ? ((null !== (r = (a = i)._$Cl) && void 0 !== r ? r : (a._$Cl = []))[
            n
          ] = l)
        : (i._$Cu = l)),
    void 0 !== l && (e = H(t, l._$AS(t, e.values), l, n)),
    e
  );
}
class F {
  constructor(t, e) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const {
        el: { content: i },
        parts: n,
      } = this._$AD,
      s = (
        null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e
          ? e
          : $
      ).importNode(i, !0);
    D.currentNode = s;
    let o = D.nextNode(),
      r = 0,
      a = 0,
      l = n[0];
    for (; void 0 !== l; ) {
      if (r === l.index) {
        let e;
        2 === l.type
          ? (e = new L(o, o.nextSibling, this, t))
          : 1 === l.type
          ? (e = new l.ctor(o, l.name, l.strings, this, t))
          : 6 === l.type && (e = new J(o, this, t)),
          this.v.push(e),
          (l = n[++a]);
      }
      r !== (null == l ? void 0 : l.index) && ((o = D.nextNode()), r++);
    }
    return s;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      void 0 !== i &&
        (void 0 !== i.strings
          ? (i._$AI(t, i, e), (e += i.strings.length - 2))
          : i._$AI(t[e])),
        e++;
  }
}
class L {
  constructor(t, e, i, n) {
    var s;
    (this.type = 2),
      (this._$AH = M),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = i),
      (this.options = n),
      (this._$Cg =
        null === (s = null == n ? void 0 : n.isConnected) || void 0 === s || s);
  }
  get _$AU() {
    var t, e;
    return null !==
      (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== e
      ? e
      : this._$Cg;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = H(this, t, e)),
      E(t)
        ? t === M || null == t || "" === t
          ? (this._$AH !== M && this._$AR(), (this._$AH = M))
          : t !== this._$AH && t !== P && this.$(t)
        : void 0 !== t._$litType$
        ? this.T(t)
        : void 0 !== t.nodeType
        ? this.k(t)
        : ((t) => {
            var e;
            return (
              A(t) ||
              "function" ==
                typeof (null === (e = t) || void 0 === e
                  ? void 0
                  : e[Symbol.iterator])
            );
          })(t)
        ? this.S(t)
        : this.$(t);
  }
  A(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.A(t)));
  }
  $(t) {
    this._$AH !== M && E(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.k($.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var e;
    const { values: i, _$litType$: n } = t,
      s =
        "number" == typeof n
          ? this._$AC(t)
          : (void 0 === n.el && (n.el = R.createElement(n.h, this.options)), n);
    if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === s)
      this._$AH.m(i);
    else {
      const t = new F(s, this),
        e = t.p(this.options);
      t.m(i), this.k(e), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = N.get(t.strings);
    return void 0 === e && N.set(t.strings, (e = new R(t))), e;
  }
  S(t) {
    A(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let i,
      n = 0;
    for (const s of t)
      n === e.length
        ? e.push((i = new L(this.A(w()), this.A(w()), this, this.options)))
        : (i = e[n]),
        i._$AI(s),
        n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), (e.length = n));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for (
      null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const e = t.nextSibling;
      t.remove(), (t = e);
    }
  }
  setConnected(t) {
    var e;
    void 0 === this._$AM &&
      ((this._$Cg = t),
      null === (e = this._$AP) || void 0 === e || e.call(this, t));
  }
}
class G {
  constructor(t, e, i, n, s) {
    (this.type = 1),
      (this._$AH = M),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = n),
      (this.options = s),
      i.length > 2 || "" !== i[0] || "" !== i[1]
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = M);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (void 0 === s)
      (t = H(this, t, e, 0)),
        (o = !E(t) || (t !== this._$AH && t !== P)),
        o && (this._$AH = t);
    else {
      const n = t;
      let r, a;
      for (t = s[0], r = 0; r < s.length - 1; r++)
        (a = H(this, n[i + r], e, r)),
          a === P && (a = this._$AH[r]),
          o || (o = !E(a) || a !== this._$AH[r]),
          a === M ? (t = M) : t !== M && (t += (null != a ? a : "") + s[r + 1]),
          (this._$AH[r] = a);
    }
    o && !n && this.C(t);
  }
  C(t) {
    t === M
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class W extends G {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  C(t) {
    this.element[this.name] = t === M ? void 0 : t;
  }
}
const z = f ? f.emptyScript : "";
class B extends G {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  C(t) {
    t && t !== M
      ? this.element.setAttribute(this.name, z)
      : this.element.removeAttribute(this.name);
  }
}
class q extends G {
  constructor(t, e, i, n, s) {
    super(t, e, i, n, s), (this.type = 5);
  }
  _$AI(t, e = this) {
    var i;
    if ((t = null !== (i = H(this, t, e, 0)) && void 0 !== i ? i : M) === P)
      return;
    const n = this._$AH,
      s =
        (t === M && n !== M) ||
        t.capture !== n.capture ||
        t.once !== n.once ||
        t.passive !== n.passive,
      o = t !== M && (n === M || s);
    s && this.element.removeEventListener(this.name, this, n),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, i;
    "function" == typeof this._$AH
      ? this._$AH.call(
          null !==
            (i =
              null === (e = this.options) || void 0 === e ? void 0 : e.host) &&
            void 0 !== i
            ? i
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class J {
  constructor(t, e, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const V = window.litHtmlPolyfillSupport;
var K, Z;
null == V || V(R, L),
  (null !== (p = globalThis.litHtmlVersions) && void 0 !== p
    ? p
    : (globalThis.litHtmlVersions = [])
  ).push("2.2.0");
class Y extends g {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Dt = void 0);
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (
      (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) ||
        (e.renderBefore = i.firstChild),
      i
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Dt = ((t, e, i) => {
        var n, s;
        const o =
          null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n
            ? n
            : e;
        let r = o._$litPart$;
        if (void 0 === r) {
          const t =
            null !== (s = null == i ? void 0 : i.renderBefore) && void 0 !== s
              ? s
              : null;
          o._$litPart$ = r = new L(
            e.insertBefore(w(), t),
            t,
            void 0,
            null != i ? i : {}
          );
        }
        return r._$AI(t), r;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return P;
  }
}
(Y.finalized = !0),
  (Y._$litElement$ = !0),
  null === (K = globalThis.litElementHydrateSupport) ||
    void 0 === K ||
    K.call(globalThis, { LitElement: Y });
const Q = globalThis.litElementPolyfillSupport;
null == Q || Q({ LitElement: Y }),
  (null !== (Z = globalThis.litElementVersions) && void 0 !== Z
    ? Z
    : (globalThis.litElementVersions = [])
  ).push("3.2.0");
const X = (t, e) =>
  "method" === e.kind && e.descriptor && !("value" in e.descriptor)
    ? {
        ...e,
        finisher(i) {
          i.createProperty(e.key, t);
        },
      }
    : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: e.key,
        initializer() {
          "function" == typeof e.initializer &&
            (this[e.key] = e.initializer.call(this));
        },
        finisher(i) {
          i.createProperty(e.key, t);
        },
      };
function tt(t) {
  return (e, i) =>
    void 0 !== i
      ? ((t, e, i) => {
          e.constructor.createProperty(i, t);
        })(t, e, i)
      : X(t, e);
}
function et(t) {
  return tt({ ...t, state: !0 });
}
var it;
function nt() {
  return document.querySelector("hc-main")
    ? document.querySelector("hc-main").hass
    : document.querySelector("home-assistant")
    ? document.querySelector("home-assistant").hass
    : void 0;
}
null === (it = window.HTMLSlotElement) ||
  void 0 === it ||
  it.prototype.assignedElements;
const st = "lovelace-player-device-id";
function ot() {
  if (!localStorage[st]) {
    const t = () =>
      Math.floor(1e5 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    window.fully && "function" == typeof fully.getDeviceId
      ? (localStorage[st] = fully.getDeviceId())
      : (localStorage[st] = `${t()}${t()}-${t()}${t()}`);
  }
  return localStorage[st];
}
let rt = ot();
const at = new URLSearchParams(window.location.search);
var lt;
function ct(t) {
  return !!String(t).includes("{%") || !!String(t).includes("{{") || void 0;
}
at.get("deviceID") &&
  null !== (lt = at.get("deviceID")) &&
  ("clear" === lt ? localStorage.removeItem(st) : (localStorage[st] = lt),
  (rt = ot())),
  (window.cardMod_template_cache = window.cardMod_template_cache || {});
const dt = window.cardMod_template_cache;
async function ht(t, e, i) {
  const n = nt().connection,
    s = JSON.stringify([e, i]);
  let o = dt[s];
  o
    ? (o.callbacks.has(t) || ut(t), t(o.value), o.callbacks.add(t))
    : (ut(t),
      t(""),
      (i = Object.assign(
        {
          user: nt().user.name,
          browser: rt,
          hash: location.hash.substr(1) || "",
        },
        i
      )),
      (dt[s] = o =
        {
          template: e,
          variables: i,
          value: "",
          callbacks: new Set([t]),
          unsubscribe: n.subscribeMessage(
            (t) =>
              (function (t, e) {
                const i = dt[t];
                i &&
                  ((i.value = e.result),
                  i.callbacks.forEach((t) => t(e.result)));
              })(s, t),
            { type: "render_template", template: e, variables: i }
          ),
        }));
}
async function ut(t) {
  let e;
  for (const [i, n] of Object.entries(dt))
    if (n.callbacks.has(t)) {
      n.callbacks.delete(t),
        0 == n.callbacks.size && ((e = n.unsubscribe), delete dt[i]);
      break;
    }
  e && (await (await e)());
}
var vt;
function gt(t, e) {
  if (
    ("string" == typeof t &&
      t.startsWith("$$") &&
      ((t = t.substring(2)), (e = JSON.stringify(e))),
    "string" == typeof e &&
      "string" == typeof t &&
      ((t.startsWith("/") && t.endsWith("/")) || -1 !== t.indexOf("*")))
  ) {
    return (
      t.startsWith("/") ||
        (t = `/^${(t = t.replace(/\./g, ".").replace(/\*/g, ".*"))}$/`),
      new RegExp(t.slice(1, -1)).test(e)
    );
  }
  if ("string" == typeof t) {
    if (t.startsWith("<=")) return parseFloat(e) <= parseFloat(t.substring(2));
    if (t.startsWith(">=")) return parseFloat(e) >= parseFloat(t.substring(2));
    if (t.startsWith("<")) return parseFloat(e) < parseFloat(t.substring(1));
    if (t.startsWith(">")) return parseFloat(e) > parseFloat(t.substring(1));
    if (t.startsWith("!")) return parseFloat(e) != parseFloat(t.substring(1));
    if (t.startsWith("=")) return parseFloat(e) == parseFloat(t.substring(1));
  }
  return t === e;
}
window.autoEntities_cache =
  null !== (vt = window.autoEntities_cache) && void 0 !== vt ? vt : {};
const pt = window.autoEntities_cache;
async function ft(t) {
  var e;
  return (
    (pt.areas =
      null !== (e = pt.areas) && void 0 !== e
        ? e
        : await t.callWS({ type: "config/area_registry/list" })),
    pt.areas
  );
}
async function _t(t) {
  var e;
  return (
    (pt.devices =
      null !== (e = pt.devices) && void 0 !== e
        ? e
        : await t.callWS({ type: "config/device_registry/list" })),
    pt.devices
  );
}
async function mt(t) {
  var e;
  return (
    (pt.entities =
      null !== (e = pt.entities) && void 0 !== e
        ? e
        : await t.callWS({ type: "config/entity_registry/list" })),
    pt.entities
  );
}
const yt = {
  options: async () => !0,
  sort: async () => !0,
  domain: async (t, e, i) => gt(e, i.entity_id.split(".")[0]),
  entity_id: async (t, e, i) => gt(e, i.entity_id),
  state: async (t, e, i) => gt(e, i.state),
  name: async (t, e, i) => {
    var n;
    return gt(
      e,
      null === (n = i.attributes) || void 0 === n ? void 0 : n.friendly_name
    );
  },
  group: async (t, e, i) => {
    var n, s, o;
    return null ===
      (o =
        null ===
          (s =
            null === (n = t.states[e]) || void 0 === n
              ? void 0
              : n.attributes) || void 0 === s
          ? void 0
          : s.entity_id) || void 0 === o
      ? void 0
      : o.includes(i.entity_id);
  },
  attributes: async (t, e, i) => {
    for (const [t, n] of Object.entries(e)) {
      let e = t.split(" ")[0],
        s = i.attributes;
      for (const t of e.split(":")) s = s ? s[t] : void 0;
      if (void 0 === s || !gt(n, s)) return !1;
    }
    return !0;
  },
  not: async (t, e, i) => !(await bt(t, e, i.entity_id)),
  or: async (t, e, i) => {
    for (const n of e) if (await bt(t, n, i.entity_id)) return !0;
    return !1;
  },
  device: async (t, e, i) => {
    const n = (await mt(t)).find((t) => t.entity_id === i.entity_id);
    if (!n) return !1;
    const s = (await _t(t)).find((t) => t.id === n.device_id);
    return !!s && (gt(e, s.name_by_user) || gt(e, s.name));
  },
  device_manufacturer: async (t, e, i) => {
    const n = (await mt(t)).find((t) => t.entity_id === i.entity_id);
    if (!n) return !1;
    const s = (await _t(t)).find((t) => t.id === n.device_id);
    return !!s && gt(e, s.manufacturer);
  },
  device_model: async (t, e, i) => {
    const n = (await mt(t)).find((t) => t.entity_id === i.entity_id);
    if (!n) return !1;
    const s = (await _t(t)).find((t) => t.id === n.device_id);
    return !!s && gt(e, s.model);
  },
  area: async (t, e, i) => {
    const n = (await mt(t)).find((t) => t.entity_id === i.entity_id);
    if (!n) return !1;
    let s = (await ft(t)).find((t) => t.area_id === n.area_id);
    if (s) return gt(e, s.name) || gt(e, s.area_id);
    const o = (await _t(t)).find((t) => t.id === n.device_id);
    return (
      !!o &&
      ((s = (await ft(t)).find((t) => t.area_id === o.area_id)),
      !!s && (gt(e, s.name) || gt(e, s.area_id)))
    );
  },
  entity_category: async (t, e, i) => {
    const n = (await mt(t)).find((t) => t.entity_id === i.entity_id);
    return !!n && gt(e, n.entity_category);
  },
  last_changed: async (t, e, i) =>
    gt(e, (new Date().getTime() - new Date(i.last_changed).getTime()) / 6e4),
  last_updated: async (t, e, i) =>
    gt(e, (new Date().getTime() - new Date(i.last_updated).getTime()) / 6e4),
  last_triggered: async (t, e, i) => {
    if (null == i.attributes.last_triggered) return !1;
    return gt(
      e,
      (new Date().getTime() - new Date(i.attributes.last_triggered).getTime()) /
        6e4
    );
  },
  integration: async (t, e, i) => {
    const n = (await mt(t)).find((t) => t.entity_id === i.entity_id);
    return !!n && gt(e, n.platform);
  },
};
async function bt(t, e, i) {
  var n;
  if (!t.states[i]) return !1;
  for (let [s, o] of Object.entries(e))
    if (
      ((s = s.trim().split(" ")[0].trim()),
      !(await (null === (n = yt[s]) || void 0 === n
        ? void 0
        : n.call(yt, t, o, t.states[i]))))
    )
      return !1;
  return !0;
}
function $t(t, e, i) {
  var n, s, o, r;
  const [a, l] = i.reverse ? [-1, 1] : [1, -1];
  return (
    i.ignore_case &&
      ((t =
        null !==
          (s =
            null === (n = null == t ? void 0 : t.toLowerCase) || void 0 === n
              ? void 0
              : n.call(t)) && void 0 !== s
          ? s
          : t),
      (e =
        null !==
          (r =
            null === (o = null == e ? void 0 : e.toLowerCase) || void 0 === o
              ? void 0
              : o.call(e)) && void 0 !== r
          ? r
          : e)),
    i.numeric &&
      ((isNaN(parseFloat(t)) && isNaN(parseFloat(e))) ||
        ((t = isNaN(parseFloat(t)) ? void 0 : parseFloat(t)),
        (e = isNaN(parseFloat(e)) ? void 0 : parseFloat(e)))),
    void 0 === t && void 0 === e
      ? 0
      : void 0 === t
      ? a
      : void 0 === e
      ? l
      : i.numeric
      ? t === e
        ? 0
        : (i.reverse ? -1 : 1) * (t < e ? -1 : 1)
      : (i.reverse ? -1 : 1) * String(t).localeCompare(String(e), void 0, i)
  );
}
const wt = {
  none: () => 0,
  domain: (t, e, i) => {
    var n, s;
    return $t(
      null === (n = null == t ? void 0 : t.entity_id) || void 0 === n
        ? void 0
        : n.split(".")[0],
      null === (s = null == e ? void 0 : e.entity_id) || void 0 === s
        ? void 0
        : s.split(".")[0],
      i
    );
  },
  entity_id: (t, e, i) =>
    $t(null == t ? void 0 : t.entity_id, null == e ? void 0 : e.entity_id, i),
  friendly_name: (t, e, i) => {
    var n, s, o, r;
    return $t(
      (null === (n = null == t ? void 0 : t.attributes) || void 0 === n
        ? void 0
        : n.friendly_name) ||
        (null === (s = null == t ? void 0 : t.entity_id) || void 0 === s
          ? void 0
          : s.split(".")[1]),
      (null === (o = null == e ? void 0 : e.attributes) || void 0 === o
        ? void 0
        : o.friendly_name) ||
        (null === (r = null == e ? void 0 : e.entity_id) || void 0 === r
          ? void 0
          : r.split(".")[1]),
      i
    );
  },
  name: (t, e, i) => {
    var n, s, o, r;
    return $t(
      (null === (n = null == t ? void 0 : t.attributes) || void 0 === n
        ? void 0
        : n.friendly_name) ||
        (null === (s = null == t ? void 0 : t.entity_id) || void 0 === s
          ? void 0
          : s.split(".")[1]),
      (null === (o = null == e ? void 0 : e.attributes) || void 0 === o
        ? void 0
        : o.friendly_name) ||
        (null === (r = null == e ? void 0 : e.entity_id) || void 0 === r
          ? void 0
          : r.split(".")[1]),
      i
    );
  },
  state: (t, e, i) =>
    $t(null == t ? void 0 : t.state, null == e ? void 0 : e.state, i),
  attribute: (t, e, i) => {
    var n;
    const [s, o] = (null == i ? void 0 : i.reverse) ? [-1, 1] : [1, -1];
    let r = null == t ? void 0 : t.attributes,
      a = null == e ? void 0 : e.attributes;
    for (const t of null === (n = null == i ? void 0 : i.attribute) ||
    void 0 === n
      ? void 0
      : n.split(":")) {
      if (void 0 === r && void 0 === a) return 0;
      if (void 0 === r) return s;
      if (void 0 === a) return o;
      [r, a] = [r[t], a[t]];
    }
    return $t(r, a, i);
  },
  last_changed: (t, e, i) => {
    const [n, s] = (null == i ? void 0 : i.reverse) ? [-1, 1] : [1, -1];
    return null == (null == t ? void 0 : t.last_changed) &&
      null == (null == e ? void 0 : e.last_changed)
      ? 0
      : null == (null == t ? void 0 : t.last_changed)
      ? n
      : null == (null == e ? void 0 : e.last_changed)
      ? s
      : ((i.numeric = !0),
        $t(
          new Date(null == t ? void 0 : t.last_changed).getTime(),
          new Date(null == e ? void 0 : e.last_changed).getTime(),
          i
        ));
  },
  last_updated: (t, e, i) => {
    const [n, s] = (null == i ? void 0 : i.reverse) ? [-1, 1] : [1, -1];
    return null == (null == t ? void 0 : t.last_updated) &&
      null == (null == e ? void 0 : e.last_updated)
      ? 0
      : null == (null == t ? void 0 : t.last_updated)
      ? n
      : null == (null == e ? void 0 : e.last_updated)
      ? s
      : ((i.numeric = !0),
        $t(
          new Date(null == t ? void 0 : t.last_updated).getTime(),
          new Date(null == e ? void 0 : e.last_updated).getTime(),
          i
        ));
  },
  last_triggered: (t, e, i) => {
    var n, s, o, r, a, l;
    const [c, d] = (null == i ? void 0 : i.reverse) ? [-1, 1] : [1, -1];
    return null ==
      (null === (n = null == t ? void 0 : t.attributes) || void 0 === n
        ? void 0
        : n.last_triggered) &&
      null ==
        (null === (s = null == e ? void 0 : e.attributes) || void 0 === s
          ? void 0
          : s.last_triggered)
      ? 0
      : null ==
        (null === (o = null == t ? void 0 : t.attributes) || void 0 === o
          ? void 0
          : o.last_triggered)
      ? c
      : null ==
        (null === (r = null == e ? void 0 : e.attributes) || void 0 === r
          ? void 0
          : r.last_triggered)
      ? d
      : ((i.numeric = !0),
        $t(
          new Date(
            null === (a = null == t ? void 0 : t.attributes) || void 0 === a
              ? void 0
              : a.last_triggered
          ).getTime(),
          new Date(
            null === (l = null == e ? void 0 : e.attributes) || void 0 === l
              ? void 0
              : l.last_triggered
          ).getTime(),
          i
        ));
  },
};
function Et(t, e) {
  return function (i, n) {
    var s, o;
    return null !==
      (o =
        null === (s = wt[e.method]) || void 0 === s
          ? void 0
          : s.call(wt, t.states[i.entity], t.states[n.entity], e)) &&
      void 0 !== o
      ? o
      : 0;
  };
}
var At = "1.11.0";
const Ct = (t, e) => {
    if (t === e) return !0;
    if (typeof t != typeof e) return !1;
    if (!(t instanceof Object && e instanceof Object)) return !1;
    for (const i in t)
      if (t.hasOwnProperty(i)) {
        if (!e.hasOwnProperty(i)) return !1;
        if (t[i] !== e[i]) {
          if ("object" != typeof t[i]) return !1;
          if (!Ct(t[i], e[i])) return !1;
        }
      }
    for (const i in e)
      if (e.hasOwnProperty(i) && !t.hasOwnProperty(i)) return !1;
    return !0;
  },
  St = [
    "none",
    "domain",
    "entity_id",
    "state",
    "name",
    "group",
    "area",
    "device",
    "device_manufacturer",
    "device_model",
    "attributes",
    "last_changed",
    "last_updated",
    "last_triggered",
    "entity_category",
    "integration",
  ],
  Ot = {
    type: "select",
    options: [
      ["domain", "Entity Domain"],
      ["entity_id", "Entity ID"],
      ["state", "Entity State"],
      ["name", "Friendly Name"],
      ["group", "Member of Group"],
      ["area", "In area"],
      ["device", "Device"],
      ["device_manufacturer", "Device Manufacturer"],
      ["device_model", "Device Model"],
      ["attributes", "Attribute"],
      ["last_changed", "Last Change"],
      ["last_updated", "Last Update"],
      ["last_triggered", "Last Trigger"],
      ["entity_category", "Entity Category"],
      ["integration", "Governing integration"],
    ],
  },
  jt = ([t, e], i) => {
    var n;
    return St.includes(t)
      ? {
          type: "grid",
          name: "",
          schema: [
            Object.assign(Object.assign({}, Ot), {
              name: `key_${i}`,
              label: "Property",
            }),
            {
              name: `value_${i}`,
              selector:
                null !== (n = { attributes: { object: {} } }[t]) && void 0 !== n
                  ? n
                  : { text: {} },
              label: "Value",
            },
          ],
        }
      : {
          type: "Constant",
          name: "Some filters are not shown",
          value: "Please switch to the CODE EDITOR to access all options.",
        };
  },
  Tt = [{ name: "options", selector: { object: {} } }],
  xt = [{ name: "data", selector: { object: {} } }],
  kt = [
    {
      name: "method",
      label: "Sort method",
      type: "select",
      options: [
        ["domain", "Entity Domain"],
        ["entity_id", "Entity ID"],
        ["friendly_name", "Friendly Name"],
        ["state", "Entity State"],
        ["last_changed", "Last Change"],
        ["last_updated", "Last Update"],
        ["last_triggered", "Last Trigger"],
      ],
    },
    { type: "constant", name: "Sorting options:", value: "" },
    {
      type: "grid",
      name: "",
      schema: [
        { name: "reverse", type: "boolean", label: "Reverse" },
        { name: "ignore_case", type: "boolean", label: "Ignore case" },
        { name: "numeric", type: "boolean", label: "Numeric sort" },
      ],
    },
  ],
  Ut = [
    {
      type: "grid",
      name: "",
      schema: [
        { name: "show_empty", type: "boolean", label: "Show if empty" },
        { name: "card_param", type: "string", label: "Parameter to populate" },
      ],
    },
  ];
class Pt extends Y {
  constructor() {
    super(...arguments),
      (this._selectedTab = 0),
      (this._cardGUIMode = !0),
      (this._cardGUIModeAvailable = !0);
  }
  setConfig(t) {
    this._config = t;
  }
  connectedCallback() {
    super.connectedCallback(),
      (async () => {
        var t, e;
        if (customElements.get("ha-form")) return;
        const i = await (null === (e = (t = window).loadCardHelpers) ||
        void 0 === e
          ? void 0
          : e.call(t));
        if (!i) return;
        const n = await i.createCardElement({ type: "entity" });
        n && (await n.getConfigElement());
      })();
  }
  _handleSwitchTab(t) {
    this._selectedTab = parseInt(t.detail.index, 10);
  }
  _addFilterGroup() {
    var t;
    if (!this._config) return;
    const e = [
      ...(null === (t = this._config.filter) || void 0 === t
        ? void 0
        : t.include),
    ];
    e.push({});
    const i = Object.assign(Object.assign({}, this._config.filter), {
      include: e,
    });
    (this._config = Object.assign(Object.assign({}, this._config), {
      filter: i,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _deleteFilterGroup(t) {
    var e;
    if (!this._config) return;
    const i = [
      ...(null === (e = this._config.filter) || void 0 === e
        ? void 0
        : e.include),
    ];
    i.splice(t, 1);
    const n = Object.assign(Object.assign({}, this._config.filter), {
      include: i,
    });
    (this._config = Object.assign(Object.assign({}, this._config), {
      filter: n,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _moveFilterGroup(t, e) {
    var i;
    if (!this._config) return;
    const n = [
      ...(null === (i = this._config.filter) || void 0 === i
        ? void 0
        : i.include),
    ];
    [n[t], n[t + e]] = [n[t + e], n[t]];
    const s = Object.assign(Object.assign({}, this._config.filter), {
      include: n,
    });
    (this._config = Object.assign(Object.assign({}, this._config), {
      filter: s,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _addSpecialEntry() {
    var t;
    if (!this._config) return;
    const e = [
      ...(null === (t = this._config.filter) || void 0 === t
        ? void 0
        : t.include),
    ];
    e.push({ type: "" });
    const i = Object.assign(Object.assign({}, this._config.filter), {
      include: e,
    });
    (this._config = Object.assign(Object.assign({}, this._config), {
      filter: i,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  async _changeSpecialEntry(t, e) {
    var i, n, s, o;
    if (!this._config) return;
    const r =
      null !==
        (n = Object.assign(
          {},
          null === (i = e.detail.value) || void 0 === i ? void 0 : i.data
        )) && void 0 !== n
        ? n
        : { type: "" };
    r.type = null !== (s = r.type) && void 0 !== s ? s : "";
    const a = [
      ...(null === (o = this._config.filter) || void 0 === o
        ? void 0
        : o.include),
    ];
    a[t] = r;
    const l = Object.assign(Object.assign({}, this._config.filter), {
      include: a,
    });
    (this._config = Object.assign(Object.assign({}, this._config), {
      filter: l,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  async _changeGroupOptions(t, e) {
    var i;
    if (!this._config) return;
    const n = e.detail.value,
      s = [
        ...(null === (i = this._config.filter) || void 0 === i
          ? void 0
          : i.include),
      ];
    s[t] = Object.assign({}, n);
    const o = Object.assign(Object.assign({}, this._config.filter), {
      include: s,
    });
    (this._config = Object.assign(Object.assign({}, this._config), {
      filter: o,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _changeFilter(t, e) {
    var i;
    if (!this._config) return;
    const n = ((t, e) => {
        var i;
        const n = {};
        for (let s = 0; s <= t.filter.include.length + 1; s++)
          void 0 !== e[`key_${s}`] &&
            (n[e[`key_${s}`]] =
              null !== (i = e[`value_${s}`]) && void 0 !== i ? i : "");
        return void 0 !== e.key_new && (n[e.key_new] = ""), n;
      })(this._config, e.detail.value),
      s = [
        ...(null === (i = this._config.filter) || void 0 === i
          ? void 0
          : i.include),
      ];
    (s[t] = Object.assign(Object.assign({}, n), { options: s[t].options })),
      (this._config.filter = Object.assign(
        Object.assign({}, this._config.filter),
        { include: s }
      )),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _changeSortOptions(t) {
    if (!this._config) return;
    const e = t.detail.value;
    (this._config = Object.assign(Object.assign({}, this._config), {
      sort: e,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _changeCardOptions(t) {
    if (!this._config) return;
    const e = t.detail.value;
    (this._config = Object.assign(Object.assign({}, this._config), e)),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _showEmptyToggle() {
    if (!this._config) return;
    const t = !1 === this._config.show_empty;
    (this._config = Object.assign(Object.assign({}, this._config), {
      show_empty: t,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _changeCardParam(t) {
    if (!this._config) return;
    const e =
      "" === t.target.value || "entities" === t.target.value
        ? void 0
        : t.target.value;
    (this._config = Object.assign(Object.assign({}, this._config), {
      card_param: e,
    })),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _getCardConfig() {
    const t = Object.assign({}, this._config.card);
    return (t[this._config.card_param || "entities"] = []), t;
  }
  _handleCardConfigChanged(t) {
    if ((t.stopPropagation(), !this._config)) return;
    const e = Object.assign({}, t.detail.config);
    delete e[this._config.card_param || "entities"],
      (this._config = Object.assign(Object.assign({}, this._config), {
        card: e,
      })),
      (this._cardGUIModeAvailable = t.detail.guiModeAvailable),
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      );
  }
  _deleteCard(t) {
    this._config &&
      ((this._config = Object.assign({}, this._config)),
      delete this._config.card,
      this.dispatchEvent(
        new CustomEvent("config-changed", { detail: { config: this._config } })
      ));
  }
  _toggleCardMode(t) {
    var e;
    null === (e = this._cardEditorEl) || void 0 === e || e.toggleMode();
  }
  _cardGUIModeChanged(t) {
    t.stopPropagation(),
      (this._cardGUIMode = t.detail.guiMode),
      (this._cardGUIModeAvailable = t.detail.guiModeAvailable);
  }
  render() {
    return this.hass && this._config
      ? U`
      <div class="card-config">
        <div class="toolbar">
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"Filters"}></mwc-tab>
            <mwc-tab .label=${"Sorting"}></mwc-tab>
            <mwc-tab .label=${"Card"}></mwc-tab>
            <mwc-tab .label=${"?"} style="flex: 0 1 min-content;"></mwc-tab>
          </mwc-tab-bar>
        </div>
        <div id="editor">
          ${[
            this._renderFilterEditor,
            this._renderSortEditor,
            this._renderCardEditor,
            this._renderHelp,
          ][this._selectedTab].bind(this)()}
        </div>
      </div>
    `
      : U``;
  }
  _renderHelp() {
    return U`
      <div class="box">
        <p>Auto entities</p>
        <p>
          See
          <a
            href="https://github.com/thomasloven/lovelace-auto-entities"
            target="_blank"
            rel="no referrer"
          >
            euto-entities on github
          </a>
          for usage instructions.
        </p>
        <p>Not all options are available in the GUI editor.</p>
      </div>
    `;
  }
  _renderFilterEditor() {
    var t;
    return (null === (t = this._config.filter) || void 0 === t
      ? void 0
      : t.template) || this._config.entities
      ? U`
        <div class="box">
          <p>
            <b>Your filter method is not handled by the GUI editor.</b>
          </p>
          <p>Please switch to the CODE EDITOR to access all options.</p>
        </div>
      `
      : U`
      ${this._config.filter.include.map(
        (t, e) => U`
          <div class="box">
            <div class="toolbar">
              <mwc-icon-button
                .disabled=${0 === e}
                @click=${() => this._moveFilterGroup(e, -1)}
              >
                <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
              </mwc-icon-button>
              <mwc-icon-button
                .disabled=${e === this._config.filter.include.length - 1}
                @click=${() => this._moveFilterGroup(e, 1)}
              >
                <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
              </mwc-icon-button>
              <mwc-icon-button
                @click=${() => this._deleteFilterGroup(e)}
              >
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </mwc-icon-button>
            </div>
            ${
              void 0 === t.type
                ? U`
                  <ha-form
                    .hass=${this.hass}
                    .schema=${((t) => {
                      const e = Object.assign({}, t);
                      return (
                        delete e.options,
                        [
                          ...Object.entries(e).map(jt),
                          Object.assign(Object.assign({}, Ot), {
                            name: "key_new",
                            label: "Select property",
                          }),
                        ]
                      );
                    })(t)}
                    .data=${((t) => {
                      const e = Object.assign({}, t);
                      return (
                        delete e.options,
                        Object.assign(
                          {},
                          ...Object.entries(e).map(([t, e], i) => ({
                            [`key_${i}`]: t,
                            [`value_${i}`]: e,
                          }))
                        )
                      );
                    })(t)}
                    .computeLabel=${(t) => {
                      var e;
                      return null !== (e = t.label) && void 0 !== e
                        ? e
                        : t.name;
                    }}
                    @value-changed=${(t) => this._changeFilter(e, t)}
                  ></ha-form>
                  <p>Options:</p>
                  <ha-form
                    .hass=${this.hass}
                    .schema=${Tt}
                    .data=${t}
                    @value-changed=${(t) => this._changeGroupOptions(e, t)}
                  ></ha-form>
                `
                : U`
                  <ha-form
                    .hass=${this.hass}
                    .schema=${xt}
                    .data=${{ data: t }}
                    @value-changed=${(t) => this._changeSpecialEntry(e, t)}
                  ></ha-form>
                `
            }
          </div>
        `
      )}
      <mwc-button @click=${this._addFilterGroup}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>Add filter group
      </mwc-button>
      <mwc-button @click=${this._addSpecialEntry}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>Add non-filter entry
      </mwc-button>
    `;
  }
  _renderSortEditor() {
    var t;
    const e =
      null !== (t = this._config.sort) && void 0 !== t ? t : { method: "none" };
    return U`
      <div class="box">
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${kt}
          .computeLabel=${(t) => {
            var e;
            return null !== (e = t.label) && void 0 !== e ? e : t.name;
          }}
          @value-changed=${this._changeSortOptions}
        ></ha-form>
      </div>
    `;
  }
  _renderCardEditor() {
    var t;
    const e = Object.assign({}, this._config);
    return (
      (e.show_empty = null === (t = e.show_empty) || void 0 === t || t),
      U`
      <div class="box cards">
        <ha-form
          .hass=${this.hass}
          .schema=${Ut}
          .computeLabel=${(t) => {
            var e;
            return null !== (e = t.label) && void 0 !== e ? e : t.name;
          }}
          .data=${e}
          @value-changed=${this._changeCardOptions}
        ></ha-form>
        ${
          this._config.card
            ? U`
              <div>
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${
                    !this._cardEditorEl || this._cardGUIMode
                      ? "Show code editor"
                      : "Show Visual Editor"
                  }
                </mwc-button>
                <mwc-button
                  .title=${"Change card type"}
                  @click=${this._deleteCard}
                >
                  Change card type
                </mwc-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${this._getCardConfig()}
                @config-changed=${this._handleCardConfigChanged}
                @GUImode-changed=${this._cardGUIModeChanged}
              ></hui-card-element-editor>
            `
            : U`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardConfigChanged}
              ></hui-card-picker>
            `
        }
      </div>
    `
    );
  }
  static get styles() {
    return [
      o`
        mwc-tab-bar {
          border-bottom: 1px solid var(--divider-color);
        }

        .box {
          margin-top: 8px;
          border: 1px solid var(--divider-color);
          padding: 12px;
        }
        .option {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .box .toolbar {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          gap: 8px;
        }
        .gui-mode-button {
          margin-right: auto;
        }
        a {
          color: var(--primary-color);
        }
      `,
    ];
  }
}
t([et()], Pt.prototype, "_config", void 0),
  t([tt()], Pt.prototype, "lovelace", void 0),
  t([tt()], Pt.prototype, "hass", void 0),
  t([et()], Pt.prototype, "_selectedTab", void 0),
  t([et()], Pt.prototype, "_cardGUIMode", void 0),
  t([et()], Pt.prototype, "_cardGUIModeAvailable", void 0),
  t(
    [
      (function (t, e) {
        return (
          ({ finisher: t, descriptor: e }) =>
          (i, n) => {
            var s;
            if (void 0 === n) {
              const n =
                  null !== (s = i.originalKey) && void 0 !== s ? s : i.key,
                o =
                  null != e
                    ? {
                        kind: "method",
                        placement: "prototype",
                        key: n,
                        descriptor: e(i.key),
                      }
                    : { ...i, key: n };
              return (
                null != t &&
                  (o.finisher = function (e) {
                    t(e, n);
                  }),
                o
              );
            }
            {
              const s = i.constructor;
              void 0 !== e && Object.defineProperty(i, n, e(n)),
                null == t || t(s, n);
            }
          }
        )({
          descriptor: (i) => {
            const n = {
              get() {
                var e, i;
                return null !==
                  (i =
                    null === (e = this.renderRoot) || void 0 === e
                      ? void 0
                      : e.querySelector(t)) && void 0 !== i
                  ? i
                  : null;
              },
              enumerable: !0,
              configurable: !0,
            };
            if (e) {
              const e = "symbol" == typeof i ? Symbol() : "__" + i;
              n.get = function () {
                var i, n;
                return (
                  void 0 === this[e] &&
                    (this[e] =
                      null !==
                        (n =
                          null === (i = this.renderRoot) || void 0 === i
                            ? void 0
                            : i.querySelector(t)) && void 0 !== n
                        ? n
                        : null),
                  this[e]
                );
              };
            }
            return n;
          },
        });
      })("hui-card-element-editor"),
    ],
    Pt.prototype,
    "_cardEditorEl",
    void 0
  ),
  customElements.define("auto-entities-editor", Pt),
  (window.customCards = window.customCards || []),
  window.customCards.push({
    type: "auto-entities",
    name: "Auto Entities",
    preview: !1,
    description:
      "Entity Filter on Steroids. Auto Entities allows you to fill other cards with entities automatically, based on a number of attributes.",
  }),
  (window.queueMicrotask =
    window.queueMicrotask || ((t) => window.setTimeout(t, 1)));
class Mt extends Y {
  constructor() {
    super(...arguments),
      (this._updateCooldown = { timer: void 0, rerun: !1 }),
      (this._renderer = (t) => {
        this._template = "string" == typeof t ? t.split(/[\s,]+/) : t;
      });
  }
  static getConfigElement() {
    return document.createElement("auto-entities-editor");
  }
  static getStubConfig() {
    return { card: { type: "entities" }, filter: { include: [], exclude: [] } };
  }
  setConfig(t) {
    var e, i;
    if (!t) throw new Error("No configuration.");
    if (!(null === (e = t.card) || void 0 === e ? void 0 : e.type))
      throw new Error("No card type specified.");
    if (!t.filter && !t.entities) throw new Error("No filters specified.");
    (t = JSON.parse(JSON.stringify(t))),
      (this._config = t),
      (null === (i = this._config.filter) || void 0 === i
        ? void 0
        : i.template) &&
        ct(this._config.filter.template) &&
        ht(this._renderer, this._config.filter.template, { config: t }),
      (this._cardBuilt = new Promise((t) => (this._cardBuiltResolve = t))),
      queueMicrotask(() => this.update_all());
  }
  connectedCallback() {
    var t, e;
    super.connectedCallback(),
      (null ===
        (e = null === (t = this._config) || void 0 === t ? void 0 : t.filter) ||
      void 0 === e
        ? void 0
        : e.template) &&
        ct(this._config.filter.template) &&
        ht(this._renderer, this._config.filter.template, {
          config: this._config,
        });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ut(this._renderer);
  }
  async update_all() {
    if ((this.card && (this.card.hass = this.hass), this._updateCooldown.timer))
      return void (this._updateCooldown.rerun = !0);
    (this._updateCooldown.rerun = !1),
      (this._updateCooldown.timer = window.setTimeout(() => {
        (this._updateCooldown.timer = void 0),
          this._updateCooldown.rerun && this.update_all();
      }, 500));
    const t = await this.update_entities();
    this.update_card(t);
  }
  async update_card(t) {
    var e, i, n, s, o, r, a, l, c, d, h, u;
    if (
      this._entities &&
      Ct(t, this._entities) &&
      Ct(this._cardConfig, this._config.card)
    )
      return;
    const v =
      (null === (e = this._cardConfig) || void 0 === e ? void 0 : e.type) !==
      this._config.card.type;
    (this._entities = t),
      (this._cardConfig = JSON.parse(JSON.stringify(this._config.card)));
    const g = Object.assign(
      { [this._config.card_param || "entities"]: t },
      this._config.card
    );
    if (!this.card || v) {
      const t = await window.loadCardHelpers();
      console.oldError = console.oldError || [];
      const e = console.error;
      console.oldError.push(e),
        (console.error = (...t) => {
          var i, n, s, o, r, a;
          (3 === t.length &&
            t[2].message &&
            ((null === (n = (i = t[2].message).startsWith) || void 0 === n
              ? void 0
              : n.call(i, "Entities")) ||
              (null === (o = (s = t[2].message).startsWith) || void 0 === o
                ? void 0
                : o.call(s, "Either entities")) ||
              (null === (a = (r = t[2].message).endsWith) || void 0 === a
                ? void 0
                : a.call(r, "entity")))) ||
            e(...t);
        });
      try {
        if (
          ((this.card = await t.createCardElement(g)),
          "hui-error-card" === this.card.localName)
        ) {
          const t = this.card;
          await customElements.whenDefined("hui-error-card");
          let e = 10;
          for (; !t._config && e; )
            await new Promise((t) => window.setTimeout(t, 100)), e--;
          if (
            (null ===
              (s =
                null ===
                  (n =
                    null === (i = t._config) || void 0 === i
                      ? void 0
                      : i.error) || void 0 === n
                  ? void 0
                  : n.startsWith) || void 0 === s
              ? void 0
              : s.call(n, "Entities")) ||
            (null ===
              (a =
                null ===
                  (r =
                    null === (o = t._config) || void 0 === o
                      ? void 0
                      : o.error) || void 0 === r
                  ? void 0
                  : r.startsWith) || void 0 === a
              ? void 0
              : a.call(r, "Either entities")) ||
            (null ===
              (d =
                null ===
                  (c =
                    null === (l = t._config) || void 0 === l
                      ? void 0
                      : l.error) || void 0 === c
                  ? void 0
                  : c.endsWith) || void 0 === d
              ? void 0
              : d.call(c, "entity"))
          )
            return (
              (this.card = void 0),
              (this._entities = void 0),
              (this._cardConfig = void 0),
              void (
                null === (h = this._cardBuiltResolve) ||
                void 0 === h ||
                h.call(this)
              )
            );
        }
      } finally {
        console.error = console.oldError.pop();
      }
    } else this.card.setConfig(g);
    null === (u = this._cardBuiltResolve) || void 0 === u || u.call(this),
      (this.card.hass = this.hass);
    const p = 0 === t.length && !1 === this._config.show_empty;
    (this.style.display = p ? "none" : null),
      (this.style.margin = p ? "0" : null),
      this.card.requestUpdate &&
        (await this.updateComplete, this.card.requestUpdate());
  }
  async update_entities() {
    var t, e, i, n, s, o;
    const r = (t) =>
      t ? ("string" == typeof t ? { entity: t.trim() } : t) : null;
    let a = [
      ...((null ===
        (e =
          null === (t = this._config) || void 0 === t ? void 0 : t.entities) ||
      void 0 === e
        ? void 0
        : e.map(r)) || []),
    ];
    if (!this.hass) return a;
    if (
      (this._template && (a = a.concat(this._template.map(r))),
      (a = a.filter(Boolean)),
      null === (i = this._config.filter) || void 0 === i ? void 0 : i.include)
    ) {
      const t = Object.keys(this.hass.states).map(r);
      for (const e of this._config.filter.include) {
        if (e.type) {
          a.push(e);
          continue;
        }
        let i = [];
        for (const n of t)
          (await bt(this.hass, e, n.entity)) &&
            i.push(
              JSON.parse(
                JSON.stringify(
                  Object.assign(Object.assign({}, n), e.options)
                ).replace(/this.entity_id/g, n.entity)
              )
            );
        if (e.sort && ((i = i.sort(Et(this.hass, e.sort))), e.sort.count)) {
          const t = null !== (n = e.sort.first) && void 0 !== n ? n : 0;
          i = i.slice(t, t + e.sort.count);
        }
        a = a.concat(i);
      }
    }
    if (null === (s = this._config.filter) || void 0 === s ? void 0 : s.exclude)
      for (const t of this._config.filter.exclude) {
        const e = [];
        for (const i of a)
          (void 0 !== i.entity && (await bt(this.hass, t, i.entity))) ||
            e.push(i);
        a = e;
      }
    if (
      this._config.sort &&
      ((a = a.sort(Et(this.hass, this._config.sort))), this._config.sort.count)
    ) {
      const t = null !== (o = this._config.sort.first) && void 0 !== o ? o : 0;
      a = a.slice(t, t + this._config.sort.count);
    }
    if (this._config.unique) {
      let t = [];
      for (const e of a)
        ("entity" === this._config.unique &&
          e.entity &&
          t.some((t) => t.entity === e.entity)) ||
          t.some((t) => Ct(t, e)) ||
          t.push(e);
      a = t;
    }
    return a;
  }
  async updated(t) {
    (t.has("_template") || (t.has("hass") && this.hass)) &&
      queueMicrotask(() => this.update_all());
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return U`${this.card}`;
  }
  async getCardSize() {
    var t, e;
    let i = 0;
    return (
      await this._cardBuilt,
      this.card && this.card.getCardSize && (i = await this.card.getCardSize()),
      1 === i &&
        (null === (t = this._entities) || void 0 === t ? void 0 : t.length) &&
        (i = this._entities.length),
      0 === i &&
        (null === (e = this._config.filter) || void 0 === e
          ? void 0
          : e.include) &&
        (i = Object.keys(this._config.filter.include).length),
      i || 5
    );
  }
}
t([tt()], Mt.prototype, "_config", void 0),
  t([tt()], Mt.prototype, "hass", void 0),
  t([tt()], Mt.prototype, "card", void 0),
  t([tt()], Mt.prototype, "_template", void 0),
  customElements.get("auto-entities") ||
    (customElements.define("auto-entities", Mt),
    console.groupCollapsed(
      `%cAUTO-ENTITIES ${At} IS INSTALLED`,
      "color: green; font-weight: bold"
    ),
    console.log(
      "Readme:",
      "https://github.com/thomasloven/lovelace-auto-entities"
    ),
    console.groupEnd());
