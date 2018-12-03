"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! lazysizes - v4.0.2 */
!function (a, b) {
  var c = b(a, a.document);
  a.lazySizes = c, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = c);
}(window, function (a, b) {
  "use strict";

  if (b.getElementsByClassName) {
    var c,
        d,
        e = b.documentElement,
        f = a.Date,
        g = a.HTMLPictureElement,
        h = "addEventListener",
        i = "getAttribute",
        j = a[h],
        k = a.setTimeout,
        l = a.requestAnimationFrame || k,
        m = a.requestIdleCallback,
        n = /^picture$/i,
        o = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        q = Array.prototype.forEach,
        r = function r(a, b) {
      return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b];
    },
        s = function s(a, b) {
      r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
    },
        t = function t(a, b) {
      var c;
      (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
    },
        u = function u(a, b, c) {
      var d = c ? h : "removeEventListener";
      c && u(a, b), o.forEach(function (c) {
        a[d](c, b);
      });
    },
        v = function v(a, d, e, f, g) {
      var h = b.createEvent("CustomEvent");
      return e || (e = {}), e.instance = c, h.initCustomEvent(d, !f, !g, e), a.dispatchEvent(h), h;
    },
        w = function w(b, c) {
      var e;
      !g && (e = a.picturefill || d.pf) ? e({
        reevaluate: !0,
        elements: [b]
      }) : c && c.src && (b.src = c.src);
    },
        x = function x(a, b) {
      return (getComputedStyle(a, null) || {})[b];
    },
        y = function y(a, b, c) {
      for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;) {
        c = b.offsetWidth, b = b.parentNode;
      }

      return c;
    },
        z = function () {
      var a,
          c,
          d = [],
          e = [],
          f = d,
          g = function g() {
        var b = f;

        for (f = d.length ? e : d, a = !0, c = !1; b.length;) {
          b.shift()();
        }

        a = !1;
      },
          h = function h(d, e) {
        a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)));
      };

      return h._lsFlush = g, h;
    }(),
        A = function A(a, b) {
      return b ? function () {
        z(a);
      } : function () {
        var b = this,
            c = arguments;
        z(function () {
          a.apply(b, c);
        });
      };
    },
        B = function B(a) {
      var b,
          c = 0,
          e = d.throttleDelay,
          g = d.ricTimeout,
          h = function h() {
        b = !1, c = f.now(), a();
      },
          i = m && g > 49 ? function () {
        m(h, {
          timeout: g
        }), g !== d.ricTimeout && (g = d.ricTimeout);
      } : A(function () {
        k(h);
      }, !0);

      return function (a) {
        var d;
        (a = a === !0) && (g = 33), b || (b = !0, d = e - (f.now() - c), 0 > d && (d = 0), a || 9 > d ? i() : k(i, d));
      };
    },
        C = function C(a) {
      var b,
          c,
          d = 99,
          e = function e() {
        b = null, a();
      },
          g = function g() {
        var a = f.now() - c;
        d > a ? k(g, d - a) : (m || e)(e);
      };

      return function () {
        c = f.now(), b || (b = k(g, d));
      };
    };

    !function () {
      var b,
          c = {
        lazyClass: "lazyload",
        loadedClass: "lazyloaded",
        loadingClass: "lazyloading",
        preloadClass: "lazypreload",
        errorClass: "lazyerror",
        autosizesClass: "lazyautosizes",
        srcAttr: "data-src",
        srcsetAttr: "data-srcset",
        sizesAttr: "data-sizes",
        minSize: 40,
        customMedia: {},
        init: !0,
        expFactor: 1.5,
        hFac: .8,
        loadMode: 2,
        loadHidden: !0,
        ricTimeout: 0,
        throttleDelay: 125
      };
      d = a.lazySizesConfig || a.lazysizesConfig || {};

      for (b in c) {
        b in d || (d[b] = c[b]);
      }

      a.lazySizesConfig = d, k(function () {
        d.init && F();
      });
    }();

    var D = function () {
      var g,
          l,
          m,
          o,
          p,
          y,
          D,
          F,
          G,
          H,
          I,
          J,
          K,
          L,
          M = /^img$/i,
          N = /^iframe$/i,
          O = "onscroll" in a && !/glebot/.test(navigator.userAgent),
          P = 0,
          Q = 0,
          R = 0,
          S = -1,
          T = function T(a) {
        R--, a && a.target && u(a.target, T), (!a || 0 > R || !a.target) && (R = 0);
      },
          U = function U(a, c) {
        var d,
            f = a,
            g = "hidden" == x(b.body, "visibility") || "hidden" != x(a, "visibility");

        for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;) {
          g = (x(f, "opacity") || 1) > 0, g && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1);
        }

        return g;
      },
          V = function V() {
        var a,
            f,
            h,
            j,
            k,
            m,
            n,
            p,
            q,
            r = c.elements;

        if ((o = d.loadMode) && 8 > R && (a = r.length)) {
          f = 0, S++, null == K && ("expand" in d || (d.expand = e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370), J = d.expand, K = J * d.expFactor), K > Q && 1 > R && S > 2 && o > 2 && !b.hidden ? (Q = K, S = 0) : Q = o > 1 && S > 1 && 6 > R ? J : P;

          for (; a > f; f++) {
            if (r[f] && !r[f]._lazyRace) if (O) {
              if ((p = r[f][i]("data-expand")) && (m = 1 * p) || (m = Q), q !== m && (y = innerWidth + m * L, D = innerHeight + m, n = -1 * m, q = m), h = r[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * L && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || "hidden" != x(r[f], "visibility")) && (l && 3 > R && !p && (3 > o || 4 > S) || U(r[f], m))) {
                if (ba(r[f]), k = !0, R > 9) break;
              } else !k && l && !j && 4 > R && 4 > S && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != r[f][i](d.sizesAttr))) && (j = g[0] || r[f]);
            } else ba(r[f]);
          }

          j && !k && ba(j);
        }
      },
          W = B(V),
          X = function X(a) {
        s(a.target, d.loadedClass), t(a.target, d.loadingClass), u(a.target, Z), v(a.target, "lazyloaded");
      },
          Y = A(X),
          Z = function Z(a) {
        Y({
          target: a.target
        });
      },
          $ = function $(a, b) {
        try {
          a.contentWindow.location.replace(b);
        } catch (c) {
          a.src = b;
        }
      },
          _ = function _(a) {
        var b,
            c = a[i](d.srcsetAttr);
        (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c);
      },
          aa = A(function (a, b, c, e, f) {
        var g, h, j, l, o, p;
        (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = {
          target: a
        }, p && (u(a, T, !0), clearTimeout(m), m = k(T, 2500), s(a, d.loadingClass), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (N.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
          src: g
        })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function () {
          (!p || a.complete && a.naturalWidth > 1) && (p ? T(o) : R--, X(o));
        }, !0);
      }),
          ba = function ba(a) {
        var b,
            c = M.test(a.nodeName),
            e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
            f = "auto" == e;
        (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, R++, aa(a, b, f, e, c));
      },
          ca = function ca() {
        if (!l) {
          if (f.now() - p < 999) return void k(ca, 999);
          var a = C(function () {
            d.loadMode = 3, W();
          });
          l = !0, d.loadMode = 3, W(), j("scroll", function () {
            3 == d.loadMode && (d.loadMode = 2), a();
          }, !0);
        }
      };

      return {
        _: function _() {
          p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), L = d.hFac, j("scroll", W, !0), j("resize", W, !0), a.MutationObserver ? new MutationObserver(W).observe(e, {
            childList: !0,
            subtree: !0,
            attributes: !0
          }) : (e[h]("DOMNodeInserted", W, !0), e[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (a) {
            b[h](a, W, !0);
          }), /d$|^c/.test(b.readyState) ? ca() : (j("load", ca), b[h]("DOMContentLoaded", W), k(ca, 2e4)), c.elements.length ? (V(), z._lsFlush()) : W();
        },
        checkElems: W,
        unveil: ba
      };
    }(),
        E = function () {
      var a,
          c = A(function (a, b, c, d) {
        var e, f, g;
        if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; g > f; f++) {
          e[f].setAttribute("sizes", d);
        }
        c.detail.dataAttr || w(a, c.detail);
      }),
          e = function e(a, b, d) {
        var e,
            f = a.parentNode;
        f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
          width: d,
          dataAttr: !!b
        }), e.defaultPrevented || (d = e.detail.width, d && d !== a._lazysizesWidth && c(a, f, e, d)));
      },
          f = function f() {
        var b,
            c = a.length;
        if (c) for (b = 0; c > b; b++) {
          e(a[b]);
        }
      },
          g = C(f);

      return {
        _: function _() {
          a = b.getElementsByClassName(d.autosizesClass), j("resize", g);
        },
        checkElems: g,
        updateElem: e
      };
    }(),
        F = function F() {
      F.i || (F.i = !0, E._(), D._());
    };

    return c = {
      cfg: d,
      autoSizer: E,
      loader: D,
      init: F,
      uP: w,
      aC: s,
      rC: t,
      hC: r,
      fire: v,
      gW: y,
      rAF: z
    };
  }
});
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define("Barba", [], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Barba = e() : t.Barba = e();
}(void 0, function () {
  return function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
    }

    var n = {};
    return e.m = t, e.c = n, e.p = "http://localhost:8080/dist", e(0);
  }([function (t, e, n) {
    "function" != typeof Promise && (window.Promise = n(1));
    var r = {
      version: "1.0.0",
      BaseTransition: n(4),
      BaseView: n(6),
      BaseCache: n(8),
      Dispatcher: n(7),
      HistoryManager: n(9),
      Pjax: n(10),
      Prefetch: n(13),
      Utils: n(5)
    };
    t.exports = r;
  }, function (t, e, n) {
    (function (e) {
      !function (n) {
        function r() {}

        function i(t, e) {
          return function () {
            t.apply(e, arguments);
          };
        }

        function o(t) {
          if ("object" != _typeof(this)) throw new TypeError("Promises must be constructed via new");
          if ("function" != typeof t) throw new TypeError("not a function");
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], h(t, this);
        }

        function s(t, e) {
          for (; 3 === t._state;) {
            t = t._value;
          }

          return 0 === t._state ? void t._deferreds.push(e) : (t._handled = !0, void l(function () {
            var n = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null === n) return void (1 === t._state ? a : c)(e.promise, t._value);
            var r;

            try {
              r = n(t._value);
            } catch (t) {
              return void c(e.promise, t);
            }

            a(e.promise, r);
          }));
        }

        function a(t, e) {
          try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");

            if (e && ("object" == _typeof(e) || "function" == typeof e)) {
              var n = e.then;
              if (e instanceof o) return t._state = 3, t._value = e, void u(t);
              if ("function" == typeof n) return void h(i(n, e), t);
            }

            t._state = 1, t._value = e, u(t);
          } catch (e) {
            c(t, e);
          }
        }

        function c(t, e) {
          t._state = 2, t._value = e, u(t);
        }

        function u(t) {
          2 === t._state && 0 === t._deferreds.length && l(function () {
            t._handled || p(t._value);
          });

          for (var e = 0, n = t._deferreds.length; e < n; e++) {
            s(t, t._deferreds[e]);
          }

          t._deferreds = null;
        }

        function f(t, e, n) {
          this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n;
        }

        function h(t, e) {
          var n = !1;

          try {
            t(function (t) {
              n || (n = !0, a(e, t));
            }, function (t) {
              n || (n = !0, c(e, t));
            });
          } catch (t) {
            if (n) return;
            n = !0, c(e, t);
          }
        }

        var d = setTimeout,
            l = "function" == typeof e && e || function (t) {
          d(t, 0);
        },
            p = function p(t) {
          "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t);
        };

        o.prototype.catch = function (t) {
          return this.then(null, t);
        }, o.prototype.then = function (t, e) {
          var n = new this.constructor(r);
          return s(this, new f(t, e, n)), n;
        }, o.all = function (t) {
          var e = Array.prototype.slice.call(t);
          return new o(function (t, n) {
            function r(o, s) {
              try {
                if (s && ("object" == _typeof(s) || "function" == typeof s)) {
                  var a = s.then;
                  if ("function" == typeof a) return void a.call(s, function (t) {
                    r(o, t);
                  }, n);
                }

                e[o] = s, 0 === --i && t(e);
              } catch (t) {
                n(t);
              }
            }

            if (0 === e.length) return t([]);

            for (var i = e.length, o = 0; o < e.length; o++) {
              r(o, e[o]);
            }
          });
        }, o.resolve = function (t) {
          return t && "object" == _typeof(t) && t.constructor === o ? t : new o(function (e) {
            e(t);
          });
        }, o.reject = function (t) {
          return new o(function (e, n) {
            n(t);
          });
        }, o.race = function (t) {
          return new o(function (e, n) {
            for (var r = 0, i = t.length; r < i; r++) {
              t[r].then(e, n);
            }
          });
        }, o._setImmediateFn = function (t) {
          l = t;
        }, o._setUnhandledRejectionFn = function (t) {
          p = t;
        }, "undefined" != typeof t && t.exports ? t.exports = o : n.Promise || (n.Promise = o);
      }(this);
    }).call(e, n(2).setImmediate);
  }, function (t, e, n) {
    (function (t, r) {
      function i(t, e) {
        this._id = t, this._clearFn = e;
      }

      var o = n(3).nextTick,
          s = Function.prototype.apply,
          a = Array.prototype.slice,
          c = {},
          u = 0;
      e.setTimeout = function () {
        return new i(s.call(setTimeout, window, arguments), clearTimeout);
      }, e.setInterval = function () {
        return new i(s.call(setInterval, window, arguments), clearInterval);
      }, e.clearTimeout = e.clearInterval = function (t) {
        t.close();
      }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
        this._clearFn.call(window, this._id);
      }, e.enroll = function (t, e) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
      }, e.unenroll = function (t) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
      }, e._unrefActive = e.active = function (t) {
        clearTimeout(t._idleTimeoutId);
        var e = t._idleTimeout;
        e >= 0 && (t._idleTimeoutId = setTimeout(function () {
          t._onTimeout && t._onTimeout();
        }, e));
      }, e.setImmediate = "function" == typeof t ? t : function (t) {
        var n = u++,
            r = !(arguments.length < 2) && a.call(arguments, 1);
        return c[n] = !0, o(function () {
          c[n] && (r ? t.apply(null, r) : t.call(null), e.clearImmediate(n));
        }), n;
      }, e.clearImmediate = "function" == typeof r ? r : function (t) {
        delete c[t];
      };
    }).call(e, n(2).setImmediate, n(2).clearImmediate);
  }, function (t, e) {
    function n() {
      h && u && (h = !1, u.length ? f = u.concat(f) : d = -1, f.length && r());
    }

    function r() {
      if (!h) {
        var t = s(n);
        h = !0;

        for (var e = f.length; e;) {
          for (u = f, f = []; ++d < e;) {
            u && u[d].run();
          }

          d = -1, e = f.length;
        }

        u = null, h = !1, a(t);
      }
    }

    function i(t, e) {
      this.fun = t, this.array = e;
    }

    function o() {}

    var s,
        a,
        c = t.exports = {};
    !function () {
      try {
        s = setTimeout;
      } catch (t) {
        s = function s() {
          throw new Error("setTimeout is not defined");
        };
      }

      try {
        a = clearTimeout;
      } catch (t) {
        a = function a() {
          throw new Error("clearTimeout is not defined");
        };
      }
    }();
    var u,
        f = [],
        h = !1,
        d = -1;
    c.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
        e[n - 1] = arguments[n];
      }
      f.push(new i(t, e)), 1 !== f.length || h || s(r, 0);
    }, i.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = o, c.addListener = o, c.once = o, c.off = o, c.removeListener = o, c.removeAllListeners = o, c.emit = o, c.binding = function (t) {
      throw new Error("process.binding is not supported");
    }, c.cwd = function () {
      return "/";
    }, c.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    }, c.umask = function () {
      return 0;
    };
  }, function (t, e, n) {
    var r = n(5),
        i = {
      oldContainer: void 0,
      newContainer: void 0,
      newContainerLoading: void 0,
      extend: function extend(t) {
        return r.extend(this, t);
      },
      init: function init(t, e) {
        var n = this;
        return this.oldContainer = t, this._newContainerPromise = e, this.deferred = r.deferred(), this.newContainerReady = r.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function (t) {
          n.newContainer = t, n.newContainerReady.resolve();
        }), this.deferred.promise;
      },
      done: function done() {
        this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve();
      },
      start: function start() {}
    };
    t.exports = i;
  }, function (t, e) {
    var n = {
      getCurrentUrl: function getCurrentUrl() {
        return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
      },
      cleanLink: function cleanLink(t) {
        return t.replace(/#.*/, "");
      },
      xhrTimeout: 5e3,
      xhr: function xhr(t) {
        var e = this.deferred(),
            n = new XMLHttpRequest();
        return n.onreadystatechange = function () {
          if (4 === n.readyState) return 200 === n.status ? e.resolve(n.responseText) : e.reject(new Error("xhr: HTTP code is not 200"));
        }, n.ontimeout = function () {
          return e.reject(new Error("xhr: Timeout exceeded"));
        }, n.open("GET", t), n.timeout = this.xhrTimeout, n.setRequestHeader("x-barba", "yes"), n.send(), e.promise;
      },
      extend: function extend(t, e) {
        var n = Object.create(t);

        for (var r in e) {
          e.hasOwnProperty(r) && (n[r] = e[r]);
        }

        return n;
      },
      deferred: function deferred() {
        return new function () {
          this.resolve = null, this.reject = null, this.promise = new Promise(function (t, e) {
            this.resolve = t, this.reject = e;
          }.bind(this));
        }();
      },
      getPort: function getPort(t) {
        var e = "undefined" != typeof t ? t : window.location.port,
            n = window.location.protocol;
        return "" != e ? parseInt(e) : "http:" === n ? 80 : "https:" === n ? 443 : void 0;
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(7),
        i = n(5),
        o = {
      namespace: null,
      extend: function extend(t) {
        return i.extend(this, t);
      },
      init: function init() {
        var t = this;
        r.on("initStateChange", function (e, n) {
          n && n.namespace === t.namespace && t.onLeave();
        }), r.on("newPageReady", function (e, n, r) {
          t.container = r, e.namespace === t.namespace && t.onEnter();
        }), r.on("transitionCompleted", function (e, n) {
          e.namespace === t.namespace && t.onEnterCompleted(), n && n.namespace === t.namespace && t.onLeaveCompleted();
        });
      },
      onEnter: function onEnter() {},
      onEnterCompleted: function onEnterCompleted() {},
      onLeave: function onLeave() {},
      onLeaveCompleted: function onLeaveCompleted() {}
    };
    t.exports = o;
  }, function (t, e) {
    var n = {
      events: {},
      on: function on(t, e) {
        this.events[t] = this.events[t] || [], this.events[t].push(e);
      },
      off: function off(t, e) {
        t in this.events != !1 && this.events[t].splice(this.events[t].indexOf(e), 1);
      },
      trigger: function trigger(t) {
        if (t in this.events != !1) for (var e = 0; e < this.events[t].length; e++) {
          this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(5),
        i = {
      data: {},
      extend: function extend(t) {
        return r.extend(this, t);
      },
      set: function set(t, e) {
        this.data[t] = e;
      },
      get: function get(t) {
        return this.data[t];
      },
      reset: function reset() {
        this.data = {};
      }
    };
    t.exports = i;
  }, function (t, e) {
    var n = {
      history: [],
      add: function add(t, e) {
        e || (e = void 0), this.history.push({
          url: t,
          namespace: e
        });
      },
      currentStatus: function currentStatus() {
        return this.history[this.history.length - 1];
      },
      prevStatus: function prevStatus() {
        var t = this.history;
        return t.length < 2 ? null : t[t.length - 2];
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(5),
        i = n(7),
        o = n(11),
        s = n(8),
        a = n(9),
        c = n(12),
        u = {
      Dom: c,
      History: a,
      Cache: s,
      cacheEnabled: !0,
      transitionProgress: !1,
      ignoreClassLink: "no-barba",
      start: function start() {
        this.init();
      },
      init: function init() {
        var t = this.Dom.getContainer(),
            e = this.Dom.getWrapper();
        e.setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(t)), i.trigger("initStateChange", this.History.currentStatus()), i.trigger("newPageReady", this.History.currentStatus(), {}, t, this.Dom.currentHTML), i.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents();
      },
      bindEvents: function bindEvents() {
        document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this));
      },
      getCurrentUrl: function getCurrentUrl() {
        return r.cleanLink(r.getCurrentUrl());
      },
      goTo: function goTo(t) {
        window.history.pushState(null, null, t), this.onStateChange();
      },
      forceGoTo: function forceGoTo(t) {
        window.location = t;
      },
      load: function load(t) {
        var e,
            n = r.deferred(),
            i = this;
        return e = this.Cache.get(t), e || (e = r.xhr(t), this.Cache.set(t, e)), e.then(function (t) {
          var e = i.Dom.parseResponse(t);
          i.Dom.putContainer(e), i.cacheEnabled || i.Cache.reset(), n.resolve(e);
        }, function () {
          i.forceGoTo(t), n.reject();
        }), n.promise;
      },
      getHref: function getHref(t) {
        if (t) return t.getAttribute && "string" == typeof t.getAttribute("xlink:href") ? t.getAttribute("xlink:href") : "string" == typeof t.href ? t.href : void 0;
      },
      onLinkClick: function onLinkClick(t) {
        for (var e = t.target; e && !this.getHref(e);) {
          e = e.parentNode;
        }

        if (this.preventCheck(t, e)) {
          t.stopPropagation(), t.preventDefault(), i.trigger("linkClicked", e, t);
          var n = this.getHref(e);
          this.goTo(n);
        }
      },
      preventCheck: function preventCheck(t, e) {
        if (!window.history.pushState) return !1;
        var n = this.getHref(e);
        return !(!e || !n) && !(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && (!e.target || "_blank" !== e.target) && window.location.protocol === e.protocol && window.location.hostname === e.hostname && r.getPort() === r.getPort(e.port) && !(n.indexOf("#") > -1) && (!e.getAttribute || "string" != typeof e.getAttribute("download")) && r.cleanLink(n) != r.cleanLink(location.href) && !e.classList.contains(this.ignoreClassLink);
      },
      getTransition: function getTransition() {
        return o;
      },
      onStateChange: function onStateChange() {
        var t = this.getCurrentUrl();
        if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
        this.History.add(t);
        var e = this.load(t),
            n = Object.create(this.getTransition());
        this.transitionProgress = !0, i.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
        var r = n.init(this.Dom.getContainer(), e);
        e.then(this.onNewContainerLoaded.bind(this)), r.then(this.onTransitionEnd.bind(this));
      },
      onNewContainerLoaded: function onNewContainerLoaded(t) {
        var e = this.History.currentStatus();
        e.namespace = this.Dom.getNamespace(t), i.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), t, this.Dom.currentHTML);
      },
      onTransitionEnd: function onTransitionEnd() {
        this.transitionProgress = !1, i.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus());
      }
    };
    t.exports = u;
  }, function (t, e, n) {
    var r = n(4),
        i = r.extend({
      start: function start() {
        this.newContainerLoading.then(this.finish.bind(this));
      },
      finish: function finish() {
        document.body.scrollTop = 0, this.done();
      }
    });
    t.exports = i;
  }, function (t, e) {
    var n = {
      dataNamespace: "namespace",
      wrapperId: "barba-wrapper",
      containerClass: "barba-container",
      currentHTML: document.documentElement.innerHTML,
      parseResponse: function parseResponse(t) {
        this.currentHTML = t;
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = e.querySelector("title");
        return n && (document.title = n.textContent), this.getContainer(e);
      },
      getWrapper: function getWrapper() {
        var t = document.getElementById(this.wrapperId);
        if (!t) throw new Error("Barba.js: wrapper not found!");
        return t;
      },
      getContainer: function getContainer(t) {
        if (t || (t = document.body), !t) throw new Error("Barba.js: DOM not ready!");
        var e = this.parseContainer(t);
        if (e && e.jquery && (e = e[0]), !e) throw new Error("Barba.js: no container found");
        return e;
      },
      getNamespace: function getNamespace(t) {
        return t && t.dataset ? t.dataset[this.dataNamespace] : t ? t.getAttribute("data-" + this.dataNamespace) : null;
      },
      putContainer: function putContainer(t) {
        t.style.visibility = "hidden";
        var e = this.getWrapper();
        e.appendChild(t);
      },
      parseContainer: function parseContainer(t) {
        return t.querySelector("." + this.containerClass);
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(5),
        i = n(10),
        o = {
      ignoreClassLink: "no-barba-prefetch",
      init: function init() {
        return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)));
      },
      onLinkEnter: function onLinkEnter(t) {
        for (var e = t.target; e && !i.getHref(e);) {
          e = e.parentNode;
        }

        if (e && !e.classList.contains(this.ignoreClassLink)) {
          var n = i.getHref(e);

          if (i.preventCheck(t, e) && !i.Cache.get(n)) {
            var o = r.xhr(n);
            i.Cache.set(n, o);
          }
        }
      }
    };
    t.exports = o;
  }]);
});
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.mediumZoom = t();
}(void 0, function () {
  "use strict";

  var e = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];

      for (var n in o) {
        Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
      }
    }

    return e;
  },
      t = ["IMG"],
      o = [27, 81],
      n = function n(e) {
    return t.indexOf(e.tagName) > -1;
  },
      i = function i(e) {
    return e.naturalWidth !== e.width;
  },
      r = function r(e) {
    return e && 1 === e.nodeType;
  },
      d = function d(_d) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        l = a.margin,
        m = void 0 === l ? 0 : l,
        c = a.background,
        s = void 0 === c ? "#fff" : c,
        u = a.scrollOffset,
        f = void 0 === u ? 48 : u,
        p = a.metaClick,
        v = function v(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      if ("function" == typeof window.CustomEvent) return new CustomEvent(e, t);
      var o = document.createEvent("CustomEvent");
      return o.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), o;
    },
        g = function g() {
      if (x.original) {
        if (x.original.dispatchEvent(v("show")), T = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, A = !0, x.zoomed = function (e) {
          var t = e.getBoundingClientRect(),
              o = t.top,
              n = t.left,
              i = t.width,
              r = t.height,
              d = e.cloneNode(),
              a = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
              l = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
          return d.removeAttribute("id"), d.style.position = "absolute", d.style.top = o + a + "px", d.style.left = n + l + "px", d.style.width = i + "px", d.style.height = r + "px", d.style.transform = "", d;
        }(x.original), document.body.appendChild(O), H.template) {
          var e = r(H.template) ? H.template : document.querySelector(H.template);
          x.template = document.createElement("div"), x.template.appendChild(e.content.cloneNode(!0)), document.body.appendChild(x.template);
        }

        if (document.body.appendChild(x.zoomed), requestAnimationFrame(function () {
          document.body.classList.add("medium-zoom--open");
        }), x.original.style.visibility = "hidden", x.zoomed.classList.add("medium-zoom-image--open"), x.zoomed.addEventListener("click", h), x.zoomed.addEventListener("transitionend", b), x.original.getAttribute("data-zoom-target")) {
          x.zoomedHd = x.zoomed.cloneNode(), x.zoomedHd.src = x.zoomed.getAttribute("data-zoom-target"), x.zoomedHd.onerror = function () {
            clearInterval(t), console.error("Unable to reach the zoom image target " + x.zoomedHd.src), x.zoomedHd = null, C();
          };
          var t = setInterval(function () {
            x.zoomedHd.naturalWidth && (clearInterval(t), x.zoomedHd.classList.add("medium-zoom-image--open"), x.zoomedHd.addEventListener("click", h), document.body.appendChild(x.zoomedHd), C());
          }, 10);
        } else C();
      }
    },
        h = function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          o = function o() {
        !A && x.original && (x.original.dispatchEvent(v("hide")), A = !0, document.body.classList.remove("medium-zoom--open"), x.zoomed.style.transform = "", x.zoomedHd && (x.zoomedHd.style.transform = "", x.zoomedHd.removeEventListener("click", e)), x.template && (x.template.style.transition = "opacity 150ms", x.template.style.opacity = 0), x.zoomed.removeEventListener("click", e), x.zoomed.addEventListener("transitionend", E));
      };

      t > 0 ? setTimeout(o, t) : o();
    },
        y = function y(e) {
      e && e.target ? (x.original = e.target, g()) : x.original ? h() : (x.original = k[0], g());
    },
        z = function z(e) {
      if ((e.metaKey || e.ctrlKey) && H.metaClick) return window.open(e.target.getAttribute("data-original") || e.target.parentNode.href || e.target.src, "_blank");
      e.preventDefault(), y(e);
    },
        b = function e() {
      A = !1, x.zoomed.removeEventListener("transitionend", e), x.original.dispatchEvent(v("shown"));
    },
        E = function e() {
      x.original && (x.original.style.visibility = "", document.body.removeChild(x.zoomed), x.zoomedHd && document.body.removeChild(x.zoomedHd), document.body.removeChild(O), x.zoomed.classList.remove("medium-zoom-image--open"), x.template && document.body.removeChild(x.template), A = !1, x.zoomed.removeEventListener("transitionend", e), x.original.dispatchEvent(v("hidden")), x.original = null, x.zoomed = null, x.zoomedHd = null, x.template = null);
    },
        w = function w() {
      if (!A && x.original) {
        var e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        Math.abs(T - e) > H.scrollOffset && h(150);
      }
    },
        L = function L(e) {
      o.indexOf(e.keyCode || e.which) > -1 && h();
    },
        C = function C() {
      if (x.original) {
        var t = {
          width: window.innerWidth,
          height: window.innerHeight,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
            o = void 0,
            n = void 0;
        if (H.container) if (H.container instanceof Object) e(t, H.container), o = t.width - t.left - t.right - 2 * H.margin, n = t.height - t.top - t.bottom - 2 * H.margin;else {
          var i = (r(H.container) ? H.container : document.querySelector(H.container)).getBoundingClientRect(),
              d = i.width,
              a = i.height,
              l = i.left,
              m = i.top;
          e(t, {
            width: d,
            height: a,
            left: l,
            top: m
          });
        }
        o = o || t.width - 2 * H.margin, n = n || t.height - 2 * H.margin;
        var c = x.zoomedHd || x.original,
            s = c.naturalWidth,
            u = void 0 === s ? o : s,
            f = c.naturalHeight,
            p = void 0 === f ? n : f,
            v = c.getBoundingClientRect(),
            g = v.top,
            h = v.left,
            y = v.width,
            z = v.height,
            b = Math.min(u, o) / y,
            E = Math.min(p, n) / z,
            w = Math.min(b, E) || 1,
            L = "scale(" + w + ") translate3d(" + ((o - y) / 2 - h + H.margin + t.left) / w + "px, " + ((n - z) / 2 - g + H.margin + t.top) / w + "px, 0)";
        x.zoomed.style.transform = L, x.zoomedHd && (x.zoomedHd.style.transform = L);
      }
    },
        H = {
      margin: m,
      background: s,
      scrollOffset: f,
      metaClick: void 0 === p || p,
      container: a.container,
      template: a.template
    };

    _d instanceof Object && e(H, _d);

    var k = function (e) {
      try {
        return Array.isArray(e) ? e.filter(n) : function (e) {
          return NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e);
        }(e) ? Array.apply(null, e).filter(n) : r(e) ? [e].filter(n) : "string" == typeof e ? Array.apply(null, document.querySelectorAll(e)).filter(n) : Array.apply(null, document.querySelectorAll(t.map(function (e) {
          return e.toLowerCase();
        }).join(","))).filter(i);
      } catch (e) {
        throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList, an HTMLCollection or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
      }
    }(_d),
        O = function (e) {
      var t = document.createElement("div");
      return t.classList.add("medium-zoom-overlay"), t.style.backgroundColor = e, t;
    }(H.background),
        x = {
      original: null,
      zoomed: null,
      zoomedHd: null,
      template: null
    },
        T = 0,
        A = !1;

    return k.forEach(function (e) {
      e.classList.add("medium-zoom-image"), e.addEventListener("click", z);
    }), O.addEventListener("click", h), document.addEventListener("scroll", w), document.addEventListener("keyup", L), window.addEventListener("resize", h), {
      show: y,
      hide: h,
      toggle: y,
      update: function update() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return t.background && (O.style.backgroundColor = t.background), t.container && t.container instanceof Object && (t.container = e({}, H.container, t.container)), e(H, t);
      },
      addEventListeners: function addEventListeners(e, t) {
        k.forEach(function (o) {
          o.addEventListener(e, t);
        });
      },
      detach: function detach() {
        x.zoomed && h();
        var e = v("detach");
        k.forEach(function (t) {
          t.classList.remove("medium-zoom-image"), t.removeEventListener("click", z), t.dispatchEvent(e);
        }), k.splice(0, k.length), O.removeEventListener("click", h), document.removeEventListener("scroll", w), document.removeEventListener("keyup", L), window.removeEventListener("resize", h);
      },
      images: k,
      options: H
    };
  },
      a = Object.freeze({
    default: d
  });

  return function (e, t) {
    void 0 === t && (t = {});
    var o = t.insertAt;

    if (e && "undefined" != typeof document) {
      var n = document.head || document.getElementsByTagName("head")[0],
          i = document.createElement("style");
      i.type = "text/css", "top" === o && n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e));
    }
  }(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--open .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s}.medium-zoom-image--open{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"), a && d || a;
});

function initMe() {
  alert("Hello!");
  var internal = location.host.replace("www.", "");
  internal = new RegExp(internal, "i");
  var a = document.getElementsByTagName("a");

  for (var i = 0; i < a.length; i++) {
    var href = a[i].host;

    if (!internal.test(href)) {
      a[i].setAttribute("target", "_blank");
      a[i].setAttribute("aria-label", a[i].innerText + " (external link)");
      a[i].setAttribute("rel", "noopener noreferrer");
    }
  }

  var elements = document.querySelectorAll("nav[role='navigation'] ul li a");

  if (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }

    var done = false;

    for (var i = elements.length - 1; i >= 0; i--) {
      if (location.href.includes(elements[i].getAttribute("href"))) {
        elements[i].classList.add("active");
        done = true;
        break;
      } else {
        if (location.href.includes("/work/")) {
          elements[1].classList.add("active");
          done = true;
          break;
        }
      }
    }

    if (!done) {
      elements[0].classList.add("active");
    }
  }

  var postImages = document.querySelectorAll("article p img");

  if (postImages && !document.querySelector(".listicle")) {
    for (var i = 0; i < postImages.length; i++) {
      var imageUrl = postImages[i].getAttribute("src");
      var altText = postImages[i].getAttribute("alt");
      var newElement = document.createElement("div");
      newElement.classList.add("image");
      newElement.innerHTML = postImages[i].parentNode.innerHTML;
      postImages[i].parentNode.parentNode.replaceChild(newElement, postImages[i].parentNode);
    }
  }

  var links = document.querySelectorAll("ul.filter a");

  if (links.length > 0) {
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove("selected");
    }

    var done = false;

    for (var i = links.length - 1; i >= 0; i--) {
      if (location.href.includes(links[i].getAttribute("href"))) {
        links[i].classList.add("selected");
        done = true;
        break;
      }
    }

    if (!done) {
      links[0].classList.add("selected");
    }
  }

  mediumZoom(document.querySelectorAll(".two-images img, .three-images img, .image img")); // var items = document.querySelectorAll(".elements article");
  // var buttons = document.querySelectorAll("[data-filter]");
  // for (var i = 0; i < buttons.length; i++) {
  // 	buttons[i].addEventListener("click", function() {
  // 		var current = document.querySelectorAll(selector);
  // 		console.log(selector, current);
  // 		for (var i = 0; i < current.length; i++) {
  // 			current[i].classList.remove("invisible");
  // 		}
  // 	});
  // }
}

(function () {
  initMe();
  var FadeTransition = Barba.BaseTransition.extend({
    start: function start() {
      Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
    },
    fadeOut: function fadeOut() {
      document.body.classList.add("fade-out");
      return new Promise(function (resolve) {
        window.scrollTo(0, 0);
        resolve();
      });
    },
    fadeIn: function fadeIn() {
      document.body.classList.remove("fade-out");
      this.newContainer.classList.toggle("fade-in");
      this.done();
    }
  });

  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };

  Barba.Pjax.start();
  Barba.Dispatcher.on("newPageReady", function (currentStatus, oldStatus, container) {
    initMe();
  });
  document.querySelector(".more-button").addEventListener("focus", function () {
    document.querySelector("#masthead").classList.add("hover");
  });
  var allLinks = document.querySelectorAll("a, button");

  for (var i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener("blur", function () {
      setTimeout(function () {
        var show = false;
        var links = document.querySelectorAll(".list a");

        for (var i = 0; i < links.length; i++) {
          if (document.activeElement === links[i]) show = true;
        }

        if (document.activeElement === document.querySelector(".more-button")) show = true;

        if (show) {
          document.querySelector("#masthead").classList.add("hover");
        } else {
          document.querySelector("#masthead").classList.remove("hover");
        }
      }, 100);
    });
  }
})();