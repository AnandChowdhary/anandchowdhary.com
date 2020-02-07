/*! medium-zoom 1.0.2 | MIT License | https://github.com/francoischalifour/medium-zoom */
!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.mediumZoom = t());
})(this, function() {
  "use strict";
  var H =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var o = arguments[t];
          for (var n in o)
            Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
        }
        return e;
      },
    o = function(e) {
      return "IMG" === e.tagName;
    },
    C = function(e) {
      return e && 1 === e.nodeType;
    },
    O = function(e) {
      return ".svg" === (e.currentSrc || e.src).substr(-4).toLowerCase();
    },
    l = function(e) {
      try {
        return Array.isArray(e)
          ? e.filter(o)
          : ((t = e),
            NodeList.prototype.isPrototypeOf(t)
              ? [].slice.call(e).filter(o)
              : C(e)
              ? [e].filter(o)
              : "string" == typeof e
              ? [].slice.call(document.querySelectorAll(e)).filter(o)
              : []);
      } catch (e) {
        throw new TypeError(
          "The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom"
        );
      }
      var t;
    },
    x = function(e, t) {
      var o = H({ bubbles: !1, cancelable: !1, detail: void 0 }, t);
      if ("function" == typeof window.CustomEvent) return new CustomEvent(e, o);
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, o.bubbles, o.cancelable, o.detail), n;
    },
    c =
      window.Promise ||
      function(e) {
        function t() {}
        e(t, t);
      };
  return (
    (function(e, t) {
      void 0 === t && (t = {});
      var o = t.insertAt;
      if (e && "undefined" != typeof document) {
        var n = document.head || document.getElementsByTagName("head")[0],
          i = document.createElement("style");
        (i.type = "text/css"),
          "top" === o && n.firstChild
            ? n.insertBefore(i, n.firstChild)
            : n.appendChild(i),
          i.styleSheet
            ? (i.styleSheet.cssText = e)
            : i.appendChild(document.createTextNode(e));
      }
    })(
      ".medium-zoom-overlay{bottom:0;left:0;opacity:0;position:fixed;right:0;top:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{cursor:pointer;cursor:zoom-out;position:relative;will-change:transform}"
    ),
    function t(e) {
      var o =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        n = function() {
          for (var e = arguments.length, t = Array(e), o = 0; o < e; o++)
            t[o] = arguments[o];
          var i = t.reduce(function(e, t) {
            return [].concat(e, l(t));
          }, []);
          return (
            i
              .filter(function(e) {
                return -1 === v.indexOf(e);
              })
              .forEach(function(e) {
                v.push(e), e.classList.add("medium-zoom-image");
              }),
            d.forEach(function(e) {
              var t = e.type,
                o = e.listener,
                n = e.options;
              i.forEach(function(e) {
                e.addEventListener(t, o, n);
              });
            }),
            L
          );
        },
        i = function() {
          var p = (0 < arguments.length && void 0 !== arguments[0]
              ? arguments[0]
              : {}
            ).target,
            g = function() {
              var e = {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0
                },
                t = void 0,
                o = void 0;
              if (b.container)
                if (b.container instanceof Object)
                  (t =
                    (e = H({}, e, b.container)).width -
                    e.left -
                    e.right -
                    2 * b.margin),
                    (o = e.height - e.top - e.bottom - 2 * b.margin);
                else {
                  var n = (C(b.container)
                      ? b.container
                      : document.querySelector(b.container)
                    ).getBoundingClientRect(),
                    i = n.width,
                    r = n.height,
                    d = n.left,
                    a = n.top;
                  e = H({}, e, { width: i, height: r, left: d, top: a });
                }
              (t = t || e.width - 2 * b.margin),
                (o = o || e.height - 2 * b.margin);
              var m = E.zoomedHd || E.original,
                l = O(m) ? t : m.naturalWidth || t,
                c = O(m) ? o : m.naturalHeight || o,
                u = m.getBoundingClientRect(),
                s = u.top,
                f = u.left,
                p = u.width,
                g = u.height,
                h = Math.min(l, t) / p,
                v = Math.min(c, o) / g,
                z = Math.min(h, v),
                y =
                  "scale(" +
                  z +
                  ") translate3d(" +
                  ((t - p) / 2 - f + b.margin + e.left) / z +
                  "px, " +
                  ((o - g) / 2 - s + b.margin + e.top) / z +
                  "px, 0)";
              (E.zoomed.style.transform = y),
                E.zoomedHd && (E.zoomedHd.style.transform = y);
            };
          return new c(function(t) {
            if (p && -1 === v.indexOf(p)) t(L);
            else if (E.zoomed) t(L);
            else {
              if (p) E.original = p;
              else {
                if (!(0 < v.length)) return void t(L);
                var e = v;
                E.original = e[0];
              }
              var o, n, i, r, d, a, m, l, c;
              if (
                (E.original.dispatchEvent(
                  x("medium-zoom:open", { detail: { zoom: L } })
                ),
                (y =
                  window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0),
                (z = !0),
                (E.zoomed =
                  ((o = E.original),
                  (n = o.getBoundingClientRect()),
                  (i = n.top),
                  (r = n.left),
                  (d = n.width),
                  (a = n.height),
                  (m = o.cloneNode()),
                  (l =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0),
                  (c =
                    window.pageXOffset ||
                    document.documentElement.scrollLeft ||
                    document.body.scrollLeft ||
                    0),
                  m.removeAttribute("id"),
                  (m.style.position = "absolute"),
                  (m.style.top = i + l + "px"),
                  (m.style.left = r + c + "px"),
                  (m.style.width = d + "px"),
                  (m.style.height = a + "px"),
                  (m.style.transform = ""),
                  m)),
                document.body.appendChild(w),
                b.template)
              ) {
                var u = C(b.template)
                  ? b.template
                  : document.querySelector(b.template);
                (E.template = document.createElement("div")),
                  E.template.appendChild(u.content.cloneNode(!0)),
                  document.body.appendChild(E.template);
              }
              if (
                (document.body.appendChild(E.zoomed),
                window.requestAnimationFrame(function() {
                  document.body.classList.add("medium-zoom--opened");
                }),
                E.original.classList.add("medium-zoom-image--hidden"),
                E.zoomed.classList.add("medium-zoom-image--opened"),
                E.zoomed.addEventListener("click", h),
                E.zoomed.addEventListener("transitionend", function e() {
                  (z = !1),
                    E.zoomed.removeEventListener("transitionend", e),
                    E.original.dispatchEvent(
                      x("medium-zoom:opened", { detail: { zoom: L } })
                    ),
                    t(L);
                }),
                E.original.getAttribute("data-zoom-src"))
              ) {
                (E.zoomedHd = E.zoomed.cloneNode()),
                  E.zoomedHd.removeAttribute("srcset"),
                  E.zoomedHd.removeAttribute("sizes"),
                  (E.zoomedHd.src = E.zoomed.getAttribute("data-zoom-src")),
                  (E.zoomedHd.onerror = function() {
                    clearInterval(s),
                      console.warn(
                        "Unable to reach the zoom image target " +
                          E.zoomedHd.src
                      ),
                      (E.zoomedHd = null),
                      g();
                  });
                var s = setInterval(function() {
                  E.zoomedHd.complete &&
                    (clearInterval(s),
                    E.zoomedHd.classList.add("medium-zoom-image--opened"),
                    E.zoomedHd.addEventListener("click", h),
                    document.body.appendChild(E.zoomedHd),
                    g());
                }, 10);
              } else if (E.original.hasAttribute("srcset")) {
                (E.zoomedHd = E.zoomed.cloneNode()),
                  E.zoomedHd.removeAttribute("sizes");
                var f = E.zoomedHd.addEventListener("load", function() {
                  E.zoomedHd.removeEventListener("load", f),
                    E.zoomedHd.classList.add("medium-zoom-image--opened"),
                    E.zoomedHd.addEventListener("click", h),
                    document.body.appendChild(E.zoomedHd),
                    g();
                });
              } else g();
            }
          });
        },
        h = function() {
          return new c(function(t) {
            !z && E.original
              ? ((z = !0),
                document.body.classList.remove("medium-zoom--opened"),
                (E.zoomed.style.transform = ""),
                E.zoomedHd && (E.zoomedHd.style.transform = ""),
                E.template &&
                  ((E.template.style.transition = "opacity 150ms"),
                  (E.template.style.opacity = 0)),
                E.original.dispatchEvent(
                  x("medium-zoom:close", { detail: { zoom: L } })
                ),
                E.zoomed.addEventListener("transitionend", function e() {
                  E.original.classList.remove("medium-zoom-image--hidden"),
                    document.body.removeChild(E.zoomed),
                    E.zoomedHd && document.body.removeChild(E.zoomedHd),
                    document.body.removeChild(w),
                    E.zoomed.classList.remove("medium-zoom-image--opened"),
                    E.template && document.body.removeChild(E.template),
                    (z = !1),
                    E.zoomed.removeEventListener("transitionend", e),
                    E.original.dispatchEvent(
                      x("medium-zoom:closed", { detail: { zoom: L } })
                    ),
                    (E.original = null),
                    (E.zoomed = null),
                    (E.zoomedHd = null),
                    (E.template = null),
                    t(L);
                }))
              : t(L);
          });
        },
        r = function() {
          var e = (0 < arguments.length && void 0 !== arguments[0]
            ? arguments[0]
            : {}
          ).target;
          return E.original ? h() : i({ target: e });
        },
        v = [],
        d = [],
        z = !1,
        y = 0,
        b = o,
        E = { original: null, zoomed: null, zoomedHd: null, template: null };
      "[object Object]" === Object.prototype.toString.call(e)
        ? (b = e)
        : (e || "string" == typeof e) && n(e),
        (b = H(
          {
            margin: 0,
            background: "#fff",
            scrollOffset: 40,
            container: null,
            template: null
          },
          b
        ));
      var a,
        m,
        w =
          ((a = b.background),
          (m = document.createElement("div")).classList.add(
            "medium-zoom-overlay"
          ),
          (m.style.background = a),
          m);
      document.addEventListener("click", function(e) {
        var t = e.target;
        t !== w ? -1 !== v.indexOf(t) && r({ target: t }) : h();
      }),
        document.addEventListener("keyup", function(e) {
          27 === (e.keyCode || e.which) && h();
        }),
        document.addEventListener("scroll", function() {
          if (!z && E.original) {
            var e =
              window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
            Math.abs(y - e) > b.scrollOffset && setTimeout(h, 150);
          }
        }),
        window.addEventListener("resize", h);
      var L = {
        open: i,
        close: h,
        toggle: r,
        update: function() {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e;
          if (
            (e.background && (w.style.background = e.background),
            e.container &&
              e.container instanceof Object &&
              (t.container = H({}, b.container, e.container)),
            e.template)
          ) {
            var o = C(e.template)
              ? e.template
              : document.querySelector(e.template);
            t.template = o;
          }
          return (
            (b = H({}, b, t)),
            v.forEach(function(e) {
              e.dispatchEvent(x("medium-zoom:update", { detail: { zoom: L } }));
            }),
            L
          );
        },
        clone: function() {
          var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          return t(H({}, b, e));
        },
        attach: n,
        detach: function() {
          for (var e = arguments.length, t = Array(e), o = 0; o < e; o++)
            t[o] = arguments[o];
          E.zoomed && h();
          var n =
            0 < t.length
              ? t.reduce(function(e, t) {
                  return [].concat(e, l(t));
                }, [])
              : v;
          return (
            n.forEach(function(e) {
              e.classList.remove("medium-zoom-image"),
                e.dispatchEvent(
                  x("medium-zoom:detach", { detail: { zoom: L } })
                );
            }),
            (v = v.filter(function(e) {
              return -1 === n.indexOf(e);
            })),
            L
          );
        },
        on: function(t, o) {
          var n =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          return (
            v.forEach(function(e) {
              e.addEventListener("medium-zoom:" + t, o, n);
            }),
            d.push({ type: "medium-zoom:" + t, listener: o, options: n }),
            L
          );
        },
        off: function(t, o) {
          var n =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          return (
            v.forEach(function(e) {
              e.removeEventListener("medium-zoom:" + t, o, n);
            }),
            (d = d.filter(function(e) {
              return !(
                e.type === "medium-zoom:" + t &&
                e.listener.toString() === o.toString()
              );
            })),
            L
          );
        },
        getOptions: function() {
          return b;
        },
        getImages: function() {
          return v;
        },
        getZoomedImage: function() {
          return E.original;
        }
      };
      return L;
    }
  );
});
!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).timeago = {}));
})(this, function(e) {
  "use strict";
  var r = ["second", "minute", "hour", "day", "week", "month", "year"];
  var a = ["秒", "分钟", "小时", "天", "周", "个月", "年"];
  function t(e, t) {
    n[e] = t;
  }
  function i(e) {
    return n[e] || n.en_US;
  }
  var n = {},
    f = [60, 60, 24, 7, 365 / 7 / 12, 12];
  function o(e) {
    return e instanceof Date
      ? e
      : !isNaN(e) || /^\d+$/.test(e)
      ? new Date(parseInt(e))
      : ((e = (e || "")
          .trim()
          .replace(/\.\d+/, "")
          .replace(/-/, "/")
          .replace(/-/, "/")
          .replace(/(\d)T(\d)/, "$1 $2")
          .replace(/Z/, " UTC")
          .replace(/([+-]\d\d):?(\d\d)/, " $1$2")),
        new Date(e));
  }
  function d(e, t) {
    for (
      var n = e < 0 ? 1 : 0, r = (e = Math.abs(e)), a = 0;
      e >= f[a] && a < f.length;
      a++
    )
      e /= f[a];
    return (
      (0 === (a *= 2) ? 9 : 1) < (e = Math.floor(e)) && (a += 1),
      t(e, a, r)[n].replace("%s", e.toString())
    );
  }
  function l(e, t) {
    return ((t ? o(t) : new Date()) - o(e)) / 1e3;
  }
  var s = "timeago-id";
  function h(e) {
    return parseInt(e.getAttribute(s));
  }
  var p = {},
    v = function(e) {
      clearTimeout(e), delete p[e];
    };
  function m(e, t, n, r) {
    v(h(e));
    var a = r.relativeDate,
      i = r.minInterval,
      o = l(t, a);
    e.innerText = d(o, n);
    var u,
      c = setTimeout(
        function() {
          m(e, t, n, r);
        },
        Math.min(
          1e3 *
            Math.max(
              (function(e) {
                for (
                  var t = 1, n = 0, r = Math.abs(e);
                  e >= f[n] && n < f.length;
                  n++
                )
                  (e /= f[n]), (t *= f[n]);
                return (r = (r %= t) ? t - r : t), Math.ceil(r);
              })(o),
              i || 1
            ),
          2147483647
        )
      );
    (p[c] = 0), (u = c), e.setAttribute(s, u);
  }
  t("en_US", function(e, t) {
    if (0 === t) return ["just now", "right now"];
    var n = r[Math.floor(t / 2)];
    return 1 < e && (n += "s"), [e + " " + n + " ago", "in " + e + " " + n];
  }),
    t("zh_CN", function(e, t) {
      if (0 === t) return ["刚刚", "片刻后"];
      var n = a[~~(t / 2)];
      return [e + " " + n + "前", e + " " + n + "后"];
    }),
    (e.cancel = function(e) {
      e ? v(h(e)) : Object.keys(p).forEach(v);
    }),
    (e.format = function(e, t, n) {
      return d(l(e, n && n.relativeDate), i(t));
    }),
    (e.register = t),
    (e.render = function(e, t, n) {
      var r = e.length ? e : [e];
      return (
        r.forEach(function(e) {
          m(e, e.getAttribute("datetime"), i(t), n || {});
        }),
        r
      );
    }),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
