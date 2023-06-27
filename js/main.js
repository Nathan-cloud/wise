/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var Ss = u(() => {
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let c = window.getComputedStyle(a, null),
            d = c.getPropertyValue("position"),
            g = c.getPropertyValue("overflow"),
            f = c.getPropertyValue("display");
          (!d || d === "static") && (a.style.position = "relative"),
            g !== "hidden" && (a.style.overflow = "hidden"),
            (!f || f === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let c = window.getComputedStyle(a, null),
            d = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let g in d)
            c.getPropertyValue(g) !== d[g] && (a.style[g] = d[g]);
        },
        o = function (a) {
          let c = a.parentNode;
          n(c),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > c.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let c = 0; c < a.length; c++) {
            if (!a[c].nodeName) continue;
            let d = a[c].nodeName.toLowerCase();
            if (d === "img") {
              if (t) continue;
              a[c].complete
                ? o(a[c])
                : a[c].addEventListener("load", function () {
                    o(this);
                  });
            } else
              d === "video"
                ? a[c].readyState > 0
                  ? o(a[c])
                  : a[c].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[c]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var Rs = u(() => {
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Vi = u(() => {
    window.tram = (function (e) {
      function t(l, T) {
        var S = new _.Bare();
        return S.init(l, T);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (T) {
          return "-" + T.toLowerCase();
        });
      }
      function n(l) {
        var T = parseInt(l.slice(1), 16),
          S = (T >> 16) & 255,
          q = (T >> 8) & 255,
          O = 255 & T;
        return [S, q, O];
      }
      function i(l, T, S) {
        return (
          "#" + ((1 << 24) | (l << 16) | (T << 8) | S).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, T) {
        d("Type warning: Expected: [" + l + "] Got: [" + typeof T + "] " + T);
      }
      function a(l, T, S) {
        d("Units do not match [" + l + "]: " + T + ", " + S);
      }
      function c(l, T, S) {
        if ((T !== void 0 && (S = T), l === void 0)) return S;
        var q = S;
        return (
          Ye.test(l) || !We.test(l)
            ? (q = parseInt(l, 10))
            : We.test(l) && (q = 1e3 * parseFloat(l)),
          0 > q && (q = 0),
          q === q ? q : S
        );
      }
      function d(l) {
        se.debug && window && window.console.warn(l);
      }
      function g(l) {
        for (var T = -1, S = l ? l.length : 0, q = []; ++T < S; ) {
          var O = l[T];
          O && q.push(O);
        }
        return q;
      }
      var f = (function (l, T, S) {
          function q(ue) {
            return typeof ue == "object";
          }
          function O(ue) {
            return typeof ue == "function";
          }
          function P() {}
          function ne(ue, me) {
            function z() {
              var Me = new de();
              return O(Me.init) && Me.init.apply(Me, arguments), Me;
            }
            function de() {}
            me === S && ((me = ue), (ue = Object)), (z.Bare = de);
            var pe,
              Ae = (P[l] = ue[l]),
              st = (de[l] = z[l] = new P());
            return (
              (st.constructor = z),
              (z.mixin = function (Me) {
                return (de[l] = z[l] = ne(z, Me)[l]), z;
              }),
              (z.open = function (Me) {
                if (
                  ((pe = {}),
                  O(Me) ? (pe = Me.call(z, st, Ae, z, ue)) : q(Me) && (pe = Me),
                  q(pe))
                )
                  for (var Ar in pe) T.call(pe, Ar) && (st[Ar] = pe[Ar]);
                return O(st.init) || (st.init = ue), z;
              }),
              z.open(me)
            );
          }
          return ne;
        })("prototype", {}.hasOwnProperty),
        y = {
          ease: [
            "ease",
            function (l, T, S, q) {
              var O = (l /= q) * l,
                P = O * l;
              return (
                T +
                S * (-2.75 * P * O + 11 * O * O + -15.5 * P + 8 * O + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, T, S, q) {
              var O = (l /= q) * l,
                P = O * l;
              return T + S * (-1 * P * O + 3 * O * O + -3 * P + 2 * O);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, T, S, q) {
              var O = (l /= q) * l,
                P = O * l;
              return (
                T +
                S * (0.3 * P * O + -1.6 * O * O + 2.2 * P + -1.8 * O + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, T, S, q) {
              var O = (l /= q) * l,
                P = O * l;
              return T + S * (2 * P * O + -5 * O * O + 2 * P + 2 * O);
            },
          ],
          linear: [
            "linear",
            function (l, T, S, q) {
              return (S * l) / q + T;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, T, S, q) {
              return S * (l /= q) * l + T;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, T, S, q) {
              return -S * (l /= q) * (l - 2) + T;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, T, S, q) {
              return (l /= q / 2) < 1
                ? (S / 2) * l * l + T
                : (-S / 2) * (--l * (l - 2) - 1) + T;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, T, S, q) {
              return S * (l /= q) * l * l + T;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, T, S, q) {
              return S * ((l = l / q - 1) * l * l + 1) + T;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, T, S, q) {
              return (l /= q / 2) < 1
                ? (S / 2) * l * l * l + T
                : (S / 2) * ((l -= 2) * l * l + 2) + T;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, T, S, q) {
              return S * (l /= q) * l * l * l + T;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, T, S, q) {
              return -S * ((l = l / q - 1) * l * l * l - 1) + T;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, T, S, q) {
              return (l /= q / 2) < 1
                ? (S / 2) * l * l * l * l + T
                : (-S / 2) * ((l -= 2) * l * l * l - 2) + T;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, T, S, q) {
              return S * (l /= q) * l * l * l * l + T;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, T, S, q) {
              return S * ((l = l / q - 1) * l * l * l * l + 1) + T;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, T, S, q) {
              return (l /= q / 2) < 1
                ? (S / 2) * l * l * l * l * l + T
                : (S / 2) * ((l -= 2) * l * l * l * l + 2) + T;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, T, S, q) {
              return -S * Math.cos((l / q) * (Math.PI / 2)) + S + T;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, T, S, q) {
              return S * Math.sin((l / q) * (Math.PI / 2)) + T;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, T, S, q) {
              return (-S / 2) * (Math.cos((Math.PI * l) / q) - 1) + T;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, T, S, q) {
              return l === 0 ? T : S * Math.pow(2, 10 * (l / q - 1)) + T;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, T, S, q) {
              return l === q
                ? T + S
                : S * (-Math.pow(2, (-10 * l) / q) + 1) + T;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, T, S, q) {
              return l === 0
                ? T
                : l === q
                ? T + S
                : (l /= q / 2) < 1
                ? (S / 2) * Math.pow(2, 10 * (l - 1)) + T
                : (S / 2) * (-Math.pow(2, -10 * --l) + 2) + T;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, T, S, q) {
              return -S * (Math.sqrt(1 - (l /= q) * l) - 1) + T;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, T, S, q) {
              return S * Math.sqrt(1 - (l = l / q - 1) * l) + T;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, T, S, q) {
              return (l /= q / 2) < 1
                ? (-S / 2) * (Math.sqrt(1 - l * l) - 1) + T
                : (S / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + T;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, T, S, q, O) {
              return (
                O === void 0 && (O = 1.70158),
                S * (l /= q) * l * ((O + 1) * l - O) + T
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, T, S, q, O) {
              return (
                O === void 0 && (O = 1.70158),
                S * ((l = l / q - 1) * l * ((O + 1) * l + O) + 1) + T
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, T, S, q, O) {
              return (
                O === void 0 && (O = 1.70158),
                (l /= q / 2) < 1
                  ? (S / 2) * l * l * (((O *= 1.525) + 1) * l - O) + T
                  : (S / 2) *
                      ((l -= 2) * l * (((O *= 1.525) + 1) * l + O) + 2) +
                    T
              );
            },
          ],
        },
        v = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        E = document,
        b = window,
        C = "bkwld-tram",
        w = /[\-\.0-9]/g,
        x = /[A-Z]/,
        A = "number",
        D = /^(rgb|#)/,
        M = /(em|cm|mm|in|pt|pc|px)$/,
        U = /(em|cm|mm|in|pt|pc|px|%)$/,
        H = /(deg|rad|turn)$/,
        Q = "unitless",
        te = /(all|none) 0s ease 0s/,
        oe = /^(width|height)$/,
        B = " ",
        N = E.createElement("a"),
        h = ["Webkit", "Moz", "O", "ms"],
        F = ["-webkit-", "-moz-", "-o-", "-ms-"],
        L = function (l) {
          if (l in N.style) return { dom: l, css: l };
          var T,
            S,
            q = "",
            O = l.split("-");
          for (T = 0; T < O.length; T++)
            q += O[T].charAt(0).toUpperCase() + O[T].slice(1);
          for (T = 0; T < h.length; T++)
            if (((S = h[T] + q), S in N.style))
              return { dom: S, css: F[T] + l };
        },
        X = (t.support = {
          bind: Function.prototype.bind,
          transform: L("transform"),
          transition: L("transition"),
          backface: L("backface-visibility"),
          timing: L("transition-timing-function"),
        });
      if (X.transition) {
        var Z = X.timing.dom;
        if (((N.style[Z] = y["ease-in-back"][0]), !N.style[Z]))
          for (var ie in v) y[ie][0] = v[ie];
      }
      var V = (t.frame = (function () {
          var l =
            b.requestAnimationFrame ||
            b.webkitRequestAnimationFrame ||
            b.mozRequestAnimationFrame ||
            b.oRequestAnimationFrame ||
            b.msRequestAnimationFrame;
          return l && X.bind
            ? l.bind(b)
            : function (T) {
                b.setTimeout(T, 16);
              };
        })()),
        k = (t.now = (function () {
          var l = b.performance,
            T = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return T && X.bind
            ? T.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        J = f(function (l) {
          function T(ae, ve) {
            var be = g(("" + ae).split(B)),
              Ee = be[0];
            ve = ve || {};
            var Fe = Y[Ee];
            if (!Fe) return d("Unsupported property: " + Ee);
            if (!ve.weak || !this.props[Ee]) {
              var $e = Fe[0],
                ke = this.props[Ee];
              return (
                ke || (ke = this.props[Ee] = new $e.Bare()),
                ke.init(this.$el, be, Fe, ve),
                ke
              );
            }
          }
          function S(ae, ve, be) {
            if (ae) {
              var Ee = typeof ae;
              if (
                (ve ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                Ee == "number" && ve)
              )
                return (
                  (this.timer = new ee({
                    duration: ae,
                    context: this,
                    complete: P,
                  })),
                  void (this.active = !0)
                );
              if (Ee == "string" && ve) {
                switch (ae) {
                  case "hide":
                    z.call(this);
                    break;
                  case "stop":
                    ne.call(this);
                    break;
                  case "redraw":
                    de.call(this);
                    break;
                  default:
                    T.call(this, ae, be && be[1]);
                }
                return P.call(this);
              }
              if (Ee == "function") return void ae.call(this, this);
              if (Ee == "object") {
                var Fe = 0;
                st.call(
                  this,
                  ae,
                  function (Se, Ay) {
                    Se.span > Fe && (Fe = Se.span), Se.stop(), Se.animate(Ay);
                  },
                  function (Se) {
                    "wait" in Se && (Fe = c(Se.wait, 0));
                  }
                ),
                  Ae.call(this),
                  Fe > 0 &&
                    ((this.timer = new ee({ duration: Fe, context: this })),
                    (this.active = !0),
                    ve && (this.timer.complete = P));
                var $e = this,
                  ke = !1,
                  pn = {};
                V(function () {
                  st.call($e, ae, function (Se) {
                    Se.active && ((ke = !0), (pn[Se.name] = Se.nextStyle));
                  }),
                    ke && $e.$el.css(pn);
                });
              }
            }
          }
          function q(ae) {
            (ae = c(ae, 0)),
              this.active
                ? this.queue.push({ options: ae })
                : ((this.timer = new ee({
                    duration: ae,
                    context: this,
                    complete: P,
                  })),
                  (this.active = !0));
          }
          function O(ae) {
            return this.active
              ? (this.queue.push({ options: ae, args: arguments }),
                void (this.timer.complete = P))
              : d(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function P() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ae = this.queue.shift();
              S.call(this, ae.options, !0, ae.args);
            }
          }
          function ne(ae) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ve;
            typeof ae == "string"
              ? ((ve = {}), (ve[ae] = 1))
              : (ve = typeof ae == "object" && ae != null ? ae : this.props),
              st.call(this, ve, Me),
              Ae.call(this);
          }
          function ue(ae) {
            ne.call(this, ae), st.call(this, ae, Ar, Oy);
          }
          function me(ae) {
            typeof ae != "string" && (ae = "block"),
              (this.el.style.display = ae);
          }
          function z() {
            ne.call(this), (this.el.style.display = "none");
          }
          function de() {
            this.el.offsetHeight;
          }
          function pe() {
            ne.call(this),
              e.removeData(this.el, C),
              (this.$el = this.el = null);
          }
          function Ae() {
            var ae,
              ve,
              be = [];
            this.upstream && be.push(this.upstream);
            for (ae in this.props)
              (ve = this.props[ae]), ve.active && be.push(ve.string);
            (be = be.join(",")),
              this.style !== be &&
                ((this.style = be), (this.el.style[X.transition.dom] = be));
          }
          function st(ae, ve, be) {
            var Ee,
              Fe,
              $e,
              ke,
              pn = ve !== Me,
              Se = {};
            for (Ee in ae)
              ($e = ae[Ee]),
                Ee in ge
                  ? (Se.transform || (Se.transform = {}),
                    (Se.transform[Ee] = $e))
                  : (x.test(Ee) && (Ee = r(Ee)),
                    Ee in Y ? (Se[Ee] = $e) : (ke || (ke = {}), (ke[Ee] = $e)));
            for (Ee in Se) {
              if ((($e = Se[Ee]), (Fe = this.props[Ee]), !Fe)) {
                if (!pn) continue;
                Fe = T.call(this, Ee);
              }
              ve.call(this, Fe, $e);
            }
            be && ke && be.call(this, ke);
          }
          function Me(ae) {
            ae.stop();
          }
          function Ar(ae, ve) {
            ae.set(ve);
          }
          function Oy(ae) {
            this.$el.css(ae);
          }
          function Qe(ae, ve) {
            l[ae] = function () {
              return this.children
                ? wy.call(this, ve, arguments)
                : (this.el && ve.apply(this, arguments), this);
            };
          }
          function wy(ae, ve) {
            var be,
              Ee = this.children.length;
            for (be = 0; Ee > be; be++) ae.apply(this.children[be], ve);
            return this;
          }
          (l.init = function (ae) {
            if (
              ((this.$el = e(ae)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              se.keepInherited && !se.fallback)
            ) {
              var ve = K(this.el, "transition");
              ve && !te.test(ve) && (this.upstream = ve);
            }
            X.backface &&
              se.hideBackface &&
              m(this.el, X.backface.css, "hidden");
          }),
            Qe("add", T),
            Qe("start", S),
            Qe("wait", q),
            Qe("then", O),
            Qe("next", P),
            Qe("stop", ne),
            Qe("set", ue),
            Qe("show", me),
            Qe("hide", z),
            Qe("redraw", de),
            Qe("destroy", pe);
        }),
        _ = f(J, function (l) {
          function T(S, q) {
            var O = e.data(S, C) || e.data(S, C, new J.Bare());
            return O.el || O.init(S), q ? O.start(q) : O;
          }
          l.init = function (S, q) {
            var O = e(S);
            if (!O.length) return this;
            if (O.length === 1) return T(O[0], q);
            var P = [];
            return (
              O.each(function (ne, ue) {
                P.push(T(ue, q));
              }),
              (this.children = P),
              this
            );
          };
        }),
        I = f(function (l) {
          function T() {
            var P = this.get();
            this.update("auto");
            var ne = this.get();
            return this.update(P), ne;
          }
          function S(P, ne, ue) {
            return ne !== void 0 && (ue = ne), P in y ? P : ue;
          }
          function q(P) {
            var ne = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(P);
            return (ne ? i(ne[1], ne[2], ne[3]) : P).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var O = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (P, ne, ue, me) {
            (this.$el = P), (this.el = P[0]);
            var z = ne[0];
            ue[2] && (z = ue[2]),
              re[z] && (z = re[z]),
              (this.name = z),
              (this.type = ue[1]),
              (this.duration = c(ne[1], this.duration, O.duration)),
              (this.ease = S(ne[2], this.ease, O.ease)),
              (this.delay = c(ne[3], this.delay, O.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = oe.test(this.name)),
              (this.unit = me.unit || this.unit || se.defaultUnit),
              (this.angle = me.angle || this.angle || se.defaultAngle),
              se.fallback || me.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    B +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? B + y[this.ease][0] : "") +
                    (this.delay ? B + this.delay + "ms" : "")));
          }),
            (l.set = function (P) {
              (P = this.convert(P, this.type)), this.update(P), this.redraw();
            }),
            (l.transition = function (P) {
              (this.active = !0),
                (P = this.convert(P, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  P == "auto" && (P = T.call(this))),
                (this.nextStyle = P);
            }),
            (l.fallback = function (P) {
              var ne =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (P = this.convert(P, this.type)),
                this.auto &&
                  (ne == "auto" && (ne = this.convert(this.get(), this.type)),
                  P == "auto" && (P = T.call(this))),
                (this.tween = new R({
                  from: ne,
                  to: P,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return K(this.el, this.name);
            }),
            (l.update = function (P) {
              m(this.el, this.name, P);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                m(this.el, this.name, this.get()));
              var P = this.tween;
              P && P.context && P.destroy();
            }),
            (l.convert = function (P, ne) {
              if (P == "auto" && this.auto) return P;
              var ue,
                me = typeof P == "number",
                z = typeof P == "string";
              switch (ne) {
                case A:
                  if (me) return P;
                  if (z && P.replace(w, "") === "") return +P;
                  ue = "number(unitless)";
                  break;
                case D:
                  if (z) {
                    if (P === "" && this.original) return this.original;
                    if (ne.test(P))
                      return P.charAt(0) == "#" && P.length == 7 ? P : q(P);
                  }
                  ue = "hex or rgb string";
                  break;
                case M:
                  if (me) return P + this.unit;
                  if (z && ne.test(P)) return P;
                  ue = "number(px) or string(unit)";
                  break;
                case U:
                  if (me) return P + this.unit;
                  if (z && ne.test(P)) return P;
                  ue = "number(px) or string(unit or %)";
                  break;
                case H:
                  if (me) return P + this.angle;
                  if (z && ne.test(P)) return P;
                  ue = "number(deg) or string(angle)";
                  break;
                case Q:
                  if (me || (z && U.test(P))) return P;
                  ue = "number(unitless) or string(unit or %)";
              }
              return s(ue, P), P;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        p = f(I, function (l, T) {
          l.init = function () {
            T.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), D));
          };
        }),
        W = f(I, function (l, T) {
          (l.init = function () {
            T.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (S) {
              this.$el[this.name](S);
            });
        }),
        j = f(I, function (l, T) {
          function S(q, O) {
            var P, ne, ue, me, z;
            for (P in q)
              (me = ge[P]),
                (ue = me[0]),
                (ne = me[1] || P),
                (z = this.convert(q[P], ue)),
                O.call(this, ne, z, ue);
          }
          (l.init = function () {
            T.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                ge.perspective &&
                  se.perspective &&
                  ((this.current.perspective = se.perspective),
                  m(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (q) {
              S.call(this, q, function (O, P) {
                this.current[O] = P;
              }),
                m(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (q) {
              var O = this.values(q);
              this.tween = new he({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var P,
                ne = {};
              for (P in this.current) ne[P] = P in O ? O[P] : this.current[P];
              (this.active = !0), (this.nextStyle = this.style(ne));
            }),
            (l.fallback = function (q) {
              var O = this.values(q);
              this.tween = new he({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              m(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (q) {
              var O,
                P = "";
              for (O in q) P += O + "(" + q[O] + ") ";
              return P;
            }),
            (l.values = function (q) {
              var O,
                P = {};
              return (
                S.call(this, q, function (ne, ue, me) {
                  (P[ne] = ue),
                    this.current[ne] === void 0 &&
                      ((O = 0),
                      ~ne.indexOf("scale") && (O = 1),
                      (this.current[ne] = this.convert(O, me)));
                }),
                P
              );
            });
        }),
        R = f(function (l) {
          function T(z) {
            ue.push(z) === 1 && V(S);
          }
          function S() {
            var z,
              de,
              pe,
              Ae = ue.length;
            if (Ae)
              for (V(S), de = k(), z = Ae; z--; )
                (pe = ue[z]), pe && pe.render(de);
          }
          function q(z) {
            var de,
              pe = e.inArray(z, ue);
            pe >= 0 &&
              ((de = ue.slice(pe + 1)),
              (ue.length = pe),
              de.length && (ue = ue.concat(de)));
          }
          function O(z) {
            return Math.round(z * me) / me;
          }
          function P(z, de, pe) {
            return i(
              z[0] + pe * (de[0] - z[0]),
              z[1] + pe * (de[1] - z[1]),
              z[2] + pe * (de[2] - z[2])
            );
          }
          var ne = { ease: y.ease[1], from: 0, to: 1 };
          (l.init = function (z) {
            (this.duration = z.duration || 0), (this.delay = z.delay || 0);
            var de = z.ease || ne.ease;
            y[de] && (de = y[de][1]),
              typeof de != "function" && (de = ne.ease),
              (this.ease = de),
              (this.update = z.update || o),
              (this.complete = z.complete || o),
              (this.context = z.context || this),
              (this.name = z.name);
            var pe = z.from,
              Ae = z.to;
            pe === void 0 && (pe = ne.from),
              Ae === void 0 && (Ae = ne.to),
              (this.unit = z.unit || ""),
              typeof pe == "number" && typeof Ae == "number"
                ? ((this.begin = pe), (this.change = Ae - pe))
                : this.format(Ae, pe),
              (this.value = this.begin + this.unit),
              (this.start = k()),
              z.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = k()), (this.active = !0), T(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), q(this));
            }),
            (l.render = function (z) {
              var de,
                pe = z - this.start;
              if (this.delay) {
                if (pe <= this.delay) return;
                pe -= this.delay;
              }
              if (pe < this.duration) {
                var Ae = this.ease(pe, 0, 1, this.duration);
                return (
                  (de = this.startRGB
                    ? P(this.startRGB, this.endRGB, Ae)
                    : O(this.begin + Ae * this.change)),
                  (this.value = de + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (de = this.endHex || this.begin + this.change),
                (this.value = de + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (z, de) {
              if (((de += ""), (z += ""), z.charAt(0) == "#"))
                return (
                  (this.startRGB = n(de)),
                  (this.endRGB = n(z)),
                  (this.endHex = z),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var pe = de.replace(w, ""),
                  Ae = z.replace(w, "");
                pe !== Ae && a("tween", de, z), (this.unit = pe);
              }
              (de = parseFloat(de)),
                (z = parseFloat(z)),
                (this.begin = this.value = de),
                (this.change = z - de);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var ue = [],
            me = 1e3;
        }),
        ee = f(R, function (l) {
          (l.init = function (T) {
            (this.duration = T.duration || 0),
              (this.complete = T.complete || o),
              (this.context = T.context),
              this.play();
          }),
            (l.render = function (T) {
              var S = T - this.start;
              S < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        he = f(R, function (l, T) {
          (l.init = function (S) {
            (this.context = S.context),
              (this.update = S.update),
              (this.tweens = []),
              (this.current = S.current);
            var q, O;
            for (q in S.values)
              (O = S.values[q]),
                this.current[q] !== O &&
                  this.tweens.push(
                    new R({
                      name: q,
                      from: this.current[q],
                      to: O,
                      duration: S.duration,
                      delay: S.delay,
                      ease: S.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (S) {
              var q,
                O,
                P = this.tweens.length,
                ne = !1;
              for (q = P; q--; )
                (O = this.tweens[q]),
                  O.context &&
                    (O.render(S), (this.current[O.name] = O.value), (ne = !0));
              return ne
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((T.destroy.call(this), this.tweens)) {
                var S,
                  q = this.tweens.length;
                for (S = q; S--; ) this.tweens[S].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        se = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !X.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!X.transition) return (se.fallback = !0);
        se.agentTests.push("(" + l + ")");
        var T = new RegExp(se.agentTests.join("|"), "i");
        se.fallback = T.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new R(l);
        }),
        (t.delay = function (l, T, S) {
          return new ee({ complete: T, duration: l, context: S });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var m = e.style,
        K = e.css,
        re = { transform: X.transform && X.transform.css },
        Y = {
          color: [p, D],
          background: [p, D, "background-color"],
          "outline-color": [p, D],
          "border-color": [p, D],
          "border-top-color": [p, D],
          "border-right-color": [p, D],
          "border-bottom-color": [p, D],
          "border-left-color": [p, D],
          "border-width": [I, M],
          "border-top-width": [I, M],
          "border-right-width": [I, M],
          "border-bottom-width": [I, M],
          "border-left-width": [I, M],
          "border-spacing": [I, M],
          "letter-spacing": [I, M],
          margin: [I, M],
          "margin-top": [I, M],
          "margin-right": [I, M],
          "margin-bottom": [I, M],
          "margin-left": [I, M],
          padding: [I, M],
          "padding-top": [I, M],
          "padding-right": [I, M],
          "padding-bottom": [I, M],
          "padding-left": [I, M],
          "outline-width": [I, M],
          opacity: [I, A],
          top: [I, U],
          right: [I, U],
          bottom: [I, U],
          left: [I, U],
          "font-size": [I, U],
          "text-indent": [I, U],
          "word-spacing": [I, U],
          width: [I, U],
          "min-width": [I, U],
          "max-width": [I, U],
          height: [I, U],
          "min-height": [I, U],
          "max-height": [I, U],
          "line-height": [I, Q],
          "scroll-top": [W, A, "scrollTop"],
          "scroll-left": [W, A, "scrollLeft"],
        },
        ge = {};
      X.transform &&
        ((Y.transform = [j]),
        (ge = {
          x: [U, "translateX"],
          y: [U, "translateY"],
          rotate: [H],
          rotateX: [H],
          rotateY: [H],
          scale: [A],
          scaleX: [A],
          scaleY: [A],
          skew: [H],
          skewX: [H],
          skewY: [H],
        })),
        X.transform &&
          X.backface &&
          ((ge.z = [U, "translateZ"]),
          (ge.rotateZ = [H]),
          (ge.scaleZ = [A]),
          (ge.perspective = [M]));
      var Ye = /ms/,
        We = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var xs = u((qW, Cs) => {
    var Sy = window.$,
      Ry = Vi() && Sy.tram;
    Cs.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        c = n.toString,
        d = n.hasOwnProperty,
        g = r.forEach,
        f = r.map,
        y = r.reduce,
        v = r.reduceRight,
        E = r.filter,
        b = r.every,
        C = r.some,
        w = r.indexOf,
        x = r.lastIndexOf,
        A = Array.isArray,
        D = Object.keys,
        M = i.bind,
        U =
          (e.each =
          e.forEach =
            function (h, F, L) {
              if (h == null) return h;
              if (g && h.forEach === g) h.forEach(F, L);
              else if (h.length === +h.length) {
                for (var X = 0, Z = h.length; X < Z; X++)
                  if (F.call(L, h[X], X, h) === t) return;
              } else
                for (var ie = e.keys(h), X = 0, Z = ie.length; X < Z; X++)
                  if (F.call(L, h[ie[X]], ie[X], h) === t) return;
              return h;
            });
      (e.map = e.collect =
        function (h, F, L) {
          var X = [];
          return h == null
            ? X
            : f && h.map === f
            ? h.map(F, L)
            : (U(h, function (Z, ie, V) {
                X.push(F.call(L, Z, ie, V));
              }),
              X);
        }),
        (e.find = e.detect =
          function (h, F, L) {
            var X;
            return (
              H(h, function (Z, ie, V) {
                if (F.call(L, Z, ie, V)) return (X = Z), !0;
              }),
              X
            );
          }),
        (e.filter = e.select =
          function (h, F, L) {
            var X = [];
            return h == null
              ? X
              : E && h.filter === E
              ? h.filter(F, L)
              : (U(h, function (Z, ie, V) {
                  F.call(L, Z, ie, V) && X.push(Z);
                }),
                X);
          });
      var H =
        (e.some =
        e.any =
          function (h, F, L) {
            F || (F = e.identity);
            var X = !1;
            return h == null
              ? X
              : C && h.some === C
              ? h.some(F, L)
              : (U(h, function (Z, ie, V) {
                  if (X || (X = F.call(L, Z, ie, V))) return t;
                }),
                !!X);
          });
      (e.contains = e.include =
        function (h, F) {
          return h == null
            ? !1
            : w && h.indexOf === w
            ? h.indexOf(F) != -1
            : H(h, function (L) {
                return L === F;
              });
        }),
        (e.delay = function (h, F) {
          var L = s.call(arguments, 2);
          return setTimeout(function () {
            return h.apply(null, L);
          }, F);
        }),
        (e.defer = function (h) {
          return e.delay.apply(e, [h, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (h) {
          var F, L, X;
          return function () {
            F ||
              ((F = !0),
              (L = arguments),
              (X = this),
              Ry.frame(function () {
                (F = !1), h.apply(X, L);
              }));
          };
        }),
        (e.debounce = function (h, F, L) {
          var X,
            Z,
            ie,
            V,
            k,
            J = function () {
              var _ = e.now() - V;
              _ < F
                ? (X = setTimeout(J, F - _))
                : ((X = null), L || ((k = h.apply(ie, Z)), (ie = Z = null)));
            };
          return function () {
            (ie = this), (Z = arguments), (V = e.now());
            var _ = L && !X;
            return (
              X || (X = setTimeout(J, F)),
              _ && ((k = h.apply(ie, Z)), (ie = Z = null)),
              k
            );
          };
        }),
        (e.defaults = function (h) {
          if (!e.isObject(h)) return h;
          for (var F = 1, L = arguments.length; F < L; F++) {
            var X = arguments[F];
            for (var Z in X) h[Z] === void 0 && (h[Z] = X[Z]);
          }
          return h;
        }),
        (e.keys = function (h) {
          if (!e.isObject(h)) return [];
          if (D) return D(h);
          var F = [];
          for (var L in h) e.has(h, L) && F.push(L);
          return F;
        }),
        (e.has = function (h, F) {
          return d.call(h, F);
        }),
        (e.isObject = function (h) {
          return h === Object(h);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var Q = /(.)^/,
        te = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        oe = /\\|'|\r|\n|\u2028|\u2029/g,
        B = function (h) {
          return "\\" + te[h];
        },
        N = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (h, F, L) {
          !F && L && (F = L), (F = e.defaults({}, F, e.templateSettings));
          var X = RegExp(
              [
                (F.escape || Q).source,
                (F.interpolate || Q).source,
                (F.evaluate || Q).source,
              ].join("|") + "|$",
              "g"
            ),
            Z = 0,
            ie = "__p+='";
          h.replace(X, function (_, I, p, W, j) {
            return (
              (ie += h.slice(Z, j).replace(oe, B)),
              (Z = j + _.length),
              I
                ? (ie +=
                    `'+
((__t=(` +
                    I +
                    `))==null?'':_.escape(__t))+
'`)
                : p
                ? (ie +=
                    `'+
((__t=(` +
                    p +
                    `))==null?'':__t)+
'`)
                : W &&
                  (ie +=
                    `';
` +
                    W +
                    `
__p+='`),
              _
            );
          }),
            (ie += `';
`);
          var V = F.variable;
          if (V) {
            if (!N.test(V))
              throw new Error("variable is not a bare identifier: " + V);
          } else
            (ie =
              `with(obj||{}){
` +
              ie +
              `}
`),
              (V = "obj");
          ie =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ie +
            `return __p;
`;
          var k;
          try {
            k = new Function(F.variable || "obj", "_", ie);
          } catch (_) {
            throw ((_.source = ie), _);
          }
          var J = function (_) {
            return k.call(this, _, e);
          };
          return (
            (J.source =
              "function(" +
              V +
              `){
` +
              ie +
              "}"),
            J
          );
        }),
        e
      );
    })();
  });
  var Ge = u((PW, Gs) => {
    var _e = {},
      Yt = {},
      Qt = [],
      ki = window.Webflow || [],
      bt = window.jQuery,
      Je = bt(window),
      Cy = bt(document),
      ut = bt.isFunction,
      Ze = (_e._ = xs()),
      Ls = (_e.tram = Vi() && bt.tram),
      hn = !1,
      Bi = !1;
    Ls.config.hideBackface = !1;
    Ls.config.keepInherited = !0;
    _e.define = function (e, t, r) {
      Yt[e] && Ps(Yt[e]);
      var n = (Yt[e] = t(bt, Ze, r) || {});
      return qs(n), n;
    };
    _e.require = function (e) {
      return Yt[e];
    };
    function qs(e) {
      _e.env() &&
        (ut(e.design) && Je.on("__wf_design", e.design),
        ut(e.preview) && Je.on("__wf_preview", e.preview)),
        ut(e.destroy) && Je.on("__wf_destroy", e.destroy),
        e.ready && ut(e.ready) && xy(e);
    }
    function xy(e) {
      if (hn) {
        e.ready();
        return;
      }
      Ze.contains(Qt, e.ready) || Qt.push(e.ready);
    }
    function Ps(e) {
      ut(e.design) && Je.off("__wf_design", e.design),
        ut(e.preview) && Je.off("__wf_preview", e.preview),
        ut(e.destroy) && Je.off("__wf_destroy", e.destroy),
        e.ready && ut(e.ready) && Ny(e);
    }
    function Ny(e) {
      Qt = Ze.filter(Qt, function (t) {
        return t !== e.ready;
      });
    }
    _e.push = function (e) {
      if (hn) {
        ut(e) && e();
        return;
      }
      ki.push(e);
    };
    _e.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var vn = navigator.userAgent.toLowerCase(),
      Ds = (_e.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      Ly = (_e.env.chrome =
        /chrome/.test(vn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(vn.match(/chrome\/(\d+)\./)[1], 10)),
      qy = (_e.env.ios = /(ipod|iphone|ipad)/.test(vn));
    _e.env.safari = /safari/.test(vn) && !Ly && !qy;
    var Wi;
    Ds &&
      Cy.on("touchstart mousedown", function (e) {
        Wi = e.target;
      });
    _e.validClick = Ds
      ? function (e) {
          return e === Wi || bt.contains(e, Wi);
        }
      : function () {
          return !0;
        };
    var Ms = "resize.webflow orientationchange.webflow load.webflow",
      Py = "scroll.webflow " + Ms;
    _e.resize = Hi(Je, Ms);
    _e.scroll = Hi(Je, Py);
    _e.redraw = Hi();
    function Hi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ze.throttle(function (i) {
          Ze.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Ze.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ze.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    _e.location = function (e) {
      window.location = e;
    };
    _e.env() && (_e.location = function () {});
    _e.ready = function () {
      (hn = !0), Bi ? Dy() : Ze.each(Qt, Ns), Ze.each(ki, Ns), _e.resize.up();
    };
    function Ns(e) {
      ut(e) && e();
    }
    function Dy() {
      (Bi = !1), Ze.each(Yt, qs);
    }
    var Dt;
    _e.load = function (e) {
      Dt.then(e);
    };
    function Fs() {
      Dt && (Dt.reject(), Je.off("load", Dt.resolve)),
        (Dt = new bt.Deferred()),
        Je.on("load", Dt.resolve);
    }
    _e.destroy = function (e) {
      (e = e || {}),
        (Bi = !0),
        Je.triggerHandler("__wf_destroy"),
        e.domready != null && (hn = e.domready),
        Ze.each(Yt, Ps),
        _e.resize.off(),
        _e.scroll.off(),
        _e.redraw.off(),
        (Qt = []),
        (ki = []),
        Dt.state() === "pending" && Fs();
    };
    bt(_e.ready);
    Fs();
    Gs.exports = window.Webflow = _e;
  });
  var Vs = u((DW, Xs) => {
    var Us = Ge();
    Us.define(
      "brand",
      (Xs.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          c =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          d;
        t.ready = function () {
          var v = n.attr("data-wf-status"),
            E = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(E) && s.hostname !== E && (v = !0),
            v &&
              !a &&
              ((d = d || f()),
              y(),
              setTimeout(y, 500),
              e(r).off(c, g).on(c, g));
        };
        function g() {
          var v =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(d).attr("style", v ? "display: none !important;" : "");
        }
        function f() {
          var v = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            E = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon.f67cd735e3.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "8px", width: "16px" }),
            b = e("<img>")
              .attr(
                "src",
                "https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg"
              )
              .attr("alt", "Made in Webflow");
          return v.append(E, b), v[0];
        }
        function y() {
          var v = i.children(o),
            E = v.length && v.get(0) === d,
            b = Us.env("editor");
          if (E) {
            b && v.remove();
            return;
          }
          v.length && v.remove(), b || i.append(d);
        }
        return t;
      })
    );
  });
  var ks = u((MW, Ws) => {
    var ji = Ge();
    ji.define(
      "edit",
      (Ws.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (ji.env("test") || ji.env("frame")) && !r.fixture && !My())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          c,
          d = r.load || y,
          g = !1;
        try {
          g =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        g
          ? d()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            d()
          : i.on(a, f).triggerHandler(a);
        function f() {
          c || (/\?edit/.test(s.hash) && d());
        }
        function y() {
          (c = !0),
            (window.WebflowEditor = !0),
            i.off(a, f),
            x(function (D) {
              e.ajax({
                url: w("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: v(D),
              });
            });
        }
        function v(D) {
          return function (M) {
            if (!M) {
              console.error("Could not load editor data");
              return;
            }
            (M.thirdPartyCookiesSupported = D),
              E(C(M.bugReporterScriptPath), function () {
                E(C(M.scriptPath), function () {
                  window.WebflowEditor(M);
                });
              });
          };
        }
        function E(D, M) {
          e.ajax({ type: "GET", url: D, dataType: "script", cache: !0 }).then(
            M,
            b
          );
        }
        function b(D, M, U) {
          throw (console.error("Could not load editor script: " + M), U);
        }
        function C(D) {
          return D.indexOf("//") >= 0
            ? D
            : w("https://editor-api.webflow.com" + D);
        }
        function w(D) {
          return D.replace(/([^:])\/\//g, "$1/");
        }
        function x(D) {
          var M = window.document.createElement("iframe");
          (M.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (M.style.display = "none"),
            (M.sandbox = "allow-scripts allow-same-origin");
          var U = function (H) {
            H.data === "WF_third_party_cookies_unsupported"
              ? (A(M, U), D(!1))
              : H.data === "WF_third_party_cookies_supported" &&
                (A(M, U), D(!0));
          };
          (M.onerror = function () {
            A(M, U), D(!1);
          }),
            window.addEventListener("message", U, !1),
            window.document.body.appendChild(M);
        }
        function A(D, M) {
          window.removeEventListener("message", M, !1), D.remove();
        }
        return n;
      })
    );
    function My() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Hs = u((FW, Bs) => {
    var Fy = Ge();
    Fy.define(
      "focus-visible",
      (Bs.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(A) {
            return !!(
              A &&
              A !== document &&
              A.nodeName !== "HTML" &&
              A.nodeName !== "BODY" &&
              "classList" in A &&
              "contains" in A.classList
            );
          }
          function c(A) {
            var D = A.type,
              M = A.tagName;
            return !!(
              (M === "INPUT" && s[D] && !A.readOnly) ||
              (M === "TEXTAREA" && !A.readOnly) ||
              A.isContentEditable
            );
          }
          function d(A) {
            A.getAttribute("data-wf-focus-visible") ||
              A.setAttribute("data-wf-focus-visible", "true");
          }
          function g(A) {
            A.getAttribute("data-wf-focus-visible") &&
              A.removeAttribute("data-wf-focus-visible");
          }
          function f(A) {
            A.metaKey ||
              A.altKey ||
              A.ctrlKey ||
              (a(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function y() {
            n = !1;
          }
          function v(A) {
            a(A.target) && (n || c(A.target)) && d(A.target);
          }
          function E(A) {
            a(A.target) &&
              A.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              g(A.target));
          }
          function b() {
            document.visibilityState === "hidden" && (i && (n = !0), C());
          }
          function C() {
            document.addEventListener("mousemove", x),
              document.addEventListener("mousedown", x),
              document.addEventListener("mouseup", x),
              document.addEventListener("pointermove", x),
              document.addEventListener("pointerdown", x),
              document.addEventListener("pointerup", x),
              document.addEventListener("touchmove", x),
              document.addEventListener("touchstart", x),
              document.addEventListener("touchend", x);
          }
          function w() {
            document.removeEventListener("mousemove", x),
              document.removeEventListener("mousedown", x),
              document.removeEventListener("mouseup", x),
              document.removeEventListener("pointermove", x),
              document.removeEventListener("pointerdown", x),
              document.removeEventListener("pointerup", x),
              document.removeEventListener("touchmove", x),
              document.removeEventListener("touchstart", x),
              document.removeEventListener("touchend", x);
          }
          function x(A) {
            (A.target.nodeName && A.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), w());
          }
          document.addEventListener("keydown", f, !0),
            document.addEventListener("mousedown", y, !0),
            document.addEventListener("pointerdown", y, !0),
            document.addEventListener("touchstart", y, !0),
            document.addEventListener("visibilitychange", b, !0),
            C(),
            r.addEventListener("focus", v, !0),
            r.addEventListener("blur", E, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var zs = u((GW, Ks) => {
    var js = Ge();
    js.define(
      "focus",
      (Ks.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            c = a.tagName;
          return (
            (/^a$/i.test(c) && a.href != null) ||
            (/^(button|textarea)$/i.test(c) && a.disabled !== !0) ||
            (/^input$/i.test(c) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(c) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(c) ||
            (/^video$/i.test(c) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            js.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var $s = u((UW, Qs) => {
    "use strict";
    var Ki = window.jQuery,
      ct = {},
      gn = [],
      Ys = ".w-ix",
      En = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Ki(t).triggerHandler(ct.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Ki(t).triggerHandler(ct.types.OUTRO));
        },
      };
    ct.triggers = {};
    ct.types = { INTRO: "w-ix-intro" + Ys, OUTRO: "w-ix-outro" + Ys };
    ct.init = function () {
      for (var e = gn.length, t = 0; t < e; t++) {
        var r = gn[t];
        r[0](0, r[1]);
      }
      (gn = []), Ki.extend(ct.triggers, En);
    };
    ct.async = function () {
      for (var e in En) {
        var t = En[e];
        En.hasOwnProperty(e) &&
          (ct.triggers[e] = function (r, n) {
            gn.push([t, n]);
          });
      }
    };
    ct.async();
    Qs.exports = ct;
  });
  var Sr = u((XW, eu) => {
    "use strict";
    var zi = $s();
    function Zs(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var Gy = window.jQuery,
      _n = {},
      Js = ".w-ix",
      Uy = {
        reset: function (e, t) {
          zi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          zi.triggers.intro(e, t), Zs(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          zi.triggers.outro(e, t), Zs(t, "COMPONENT_INACTIVE");
        },
      };
    _n.triggers = {};
    _n.types = { INTRO: "w-ix-intro" + Js, OUTRO: "w-ix-outro" + Js };
    Gy.extend(_n.triggers, Uy);
    eu.exports = _n;
  });
  var tu = u((VW, _t) => {
    function Yi(e) {
      return (
        (_t.exports = Yi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (_t.exports.__esModule = !0),
        (_t.exports.default = _t.exports),
        Yi(e)
      );
    }
    (_t.exports = Yi),
      (_t.exports.__esModule = !0),
      (_t.exports.default = _t.exports);
  });
  var $t = u((WW, Rr) => {
    var Xy = tu().default;
    function ru(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (ru = function (i) {
        return i ? r : t;
      })(e);
    }
    function Vy(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (Xy(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = ru(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Rr.exports = Vy),
      (Rr.exports.__esModule = !0),
      (Rr.exports.default = Rr.exports);
  });
  var lt = u((kW, Cr) => {
    function Wy(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Cr.exports = Wy),
      (Cr.exports.__esModule = !0),
      (Cr.exports.default = Cr.exports);
  });
  var Te = u((BW, nu) => {
    var mn = function (e) {
      return e && e.Math == Math && e;
    };
    nu.exports =
      mn(typeof globalThis == "object" && globalThis) ||
      mn(typeof window == "object" && window) ||
      mn(typeof self == "object" && self) ||
      mn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Zt = u((HW, iu) => {
    iu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Mt = u((jW, ou) => {
    var ky = Zt();
    ou.exports = !ky(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var yn = u((KW, au) => {
    var xr = Function.prototype.call;
    au.exports = xr.bind
      ? xr.bind(xr)
      : function () {
          return xr.apply(xr, arguments);
        };
  });
  var lu = u((cu) => {
    "use strict";
    var su = {}.propertyIsEnumerable,
      uu = Object.getOwnPropertyDescriptor,
      By = uu && !su.call({ 1: 2 }, 1);
    cu.f = By
      ? function (t) {
          var r = uu(this, t);
          return !!r && r.enumerable;
        }
      : su;
  });
  var Qi = u((YW, fu) => {
    fu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var et = u((QW, pu) => {
    var du = Function.prototype,
      $i = du.bind,
      Zi = du.call,
      Hy = $i && $i.bind(Zi);
    pu.exports = $i
      ? function (e) {
          return e && Hy(Zi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Zi.apply(e, arguments);
            }
          );
        };
  });
  var gu = u(($W, hu) => {
    var vu = et(),
      jy = vu({}.toString),
      Ky = vu("".slice);
    hu.exports = function (e) {
      return Ky(jy(e), 8, -1);
    };
  });
  var _u = u((ZW, Eu) => {
    var zy = Te(),
      Yy = et(),
      Qy = Zt(),
      $y = gu(),
      Ji = zy.Object,
      Zy = Yy("".split);
    Eu.exports = Qy(function () {
      return !Ji("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return $y(e) == "String" ? Zy(e, "") : Ji(e);
        }
      : Ji;
  });
  var eo = u((JW, mu) => {
    var Jy = Te(),
      eI = Jy.TypeError;
    mu.exports = function (e) {
      if (e == null) throw eI("Can't call method on " + e);
      return e;
    };
  });
  var Nr = u((ek, yu) => {
    var tI = _u(),
      rI = eo();
    yu.exports = function (e) {
      return tI(rI(e));
    };
  });
  var ft = u((tk, Iu) => {
    Iu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Jt = u((rk, Tu) => {
    var nI = ft();
    Tu.exports = function (e) {
      return typeof e == "object" ? e !== null : nI(e);
    };
  });
  var Lr = u((nk, bu) => {
    var to = Te(),
      iI = ft(),
      oI = function (e) {
        return iI(e) ? e : void 0;
      };
    bu.exports = function (e, t) {
      return arguments.length < 2 ? oI(to[e]) : to[e] && to[e][t];
    };
  });
  var wu = u((ik, Ou) => {
    var aI = et();
    Ou.exports = aI({}.isPrototypeOf);
  });
  var Su = u((ok, Au) => {
    var sI = Lr();
    Au.exports = sI("navigator", "userAgent") || "";
  });
  var Pu = u((ak, qu) => {
    var Lu = Te(),
      ro = Su(),
      Ru = Lu.process,
      Cu = Lu.Deno,
      xu = (Ru && Ru.versions) || (Cu && Cu.version),
      Nu = xu && xu.v8,
      tt,
      In;
    Nu &&
      ((tt = Nu.split(".")),
      (In = tt[0] > 0 && tt[0] < 4 ? 1 : +(tt[0] + tt[1])));
    !In &&
      ro &&
      ((tt = ro.match(/Edge\/(\d+)/)),
      (!tt || tt[1] >= 74) &&
        ((tt = ro.match(/Chrome\/(\d+)/)), tt && (In = +tt[1])));
    qu.exports = In;
  });
  var no = u((sk, Mu) => {
    var Du = Pu(),
      uI = Zt();
    Mu.exports =
      !!Object.getOwnPropertySymbols &&
      !uI(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Du && Du < 41)
        );
      });
  });
  var io = u((uk, Fu) => {
    var cI = no();
    Fu.exports = cI && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var oo = u((ck, Gu) => {
    var lI = Te(),
      fI = Lr(),
      dI = ft(),
      pI = wu(),
      vI = io(),
      hI = lI.Object;
    Gu.exports = vI
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = fI("Symbol");
          return dI(t) && pI(t.prototype, hI(e));
        };
  });
  var Xu = u((lk, Uu) => {
    var gI = Te(),
      EI = gI.String;
    Uu.exports = function (e) {
      try {
        return EI(e);
      } catch {
        return "Object";
      }
    };
  });
  var Wu = u((fk, Vu) => {
    var _I = Te(),
      mI = ft(),
      yI = Xu(),
      II = _I.TypeError;
    Vu.exports = function (e) {
      if (mI(e)) return e;
      throw II(yI(e) + " is not a function");
    };
  });
  var Bu = u((dk, ku) => {
    var TI = Wu();
    ku.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : TI(r);
    };
  });
  var ju = u((pk, Hu) => {
    var bI = Te(),
      ao = yn(),
      so = ft(),
      uo = Jt(),
      OI = bI.TypeError;
    Hu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && so((r = e.toString)) && !uo((n = ao(r, e)))) ||
        (so((r = e.valueOf)) && !uo((n = ao(r, e)))) ||
        (t !== "string" && so((r = e.toString)) && !uo((n = ao(r, e))))
      )
        return n;
      throw OI("Can't convert object to primitive value");
    };
  });
  var zu = u((vk, Ku) => {
    Ku.exports = !1;
  });
  var Tn = u((hk, Qu) => {
    var Yu = Te(),
      wI = Object.defineProperty;
    Qu.exports = function (e, t) {
      try {
        wI(Yu, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Yu[e] = t;
      }
      return t;
    };
  });
  var bn = u((gk, Zu) => {
    var AI = Te(),
      SI = Tn(),
      $u = "__core-js_shared__",
      RI = AI[$u] || SI($u, {});
    Zu.exports = RI;
  });
  var co = u((Ek, ec) => {
    var CI = zu(),
      Ju = bn();
    (ec.exports = function (e, t) {
      return Ju[e] || (Ju[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: CI ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var rc = u((_k, tc) => {
    var xI = Te(),
      NI = eo(),
      LI = xI.Object;
    tc.exports = function (e) {
      return LI(NI(e));
    };
  });
  var Ot = u((mk, nc) => {
    var qI = et(),
      PI = rc(),
      DI = qI({}.hasOwnProperty);
    nc.exports =
      Object.hasOwn ||
      function (t, r) {
        return DI(PI(t), r);
      };
  });
  var lo = u((yk, ic) => {
    var MI = et(),
      FI = 0,
      GI = Math.random(),
      UI = MI((1).toString);
    ic.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + UI(++FI + GI, 36);
    };
  });
  var fo = u((Ik, cc) => {
    var XI = Te(),
      VI = co(),
      oc = Ot(),
      WI = lo(),
      ac = no(),
      uc = io(),
      er = VI("wks"),
      Ft = XI.Symbol,
      sc = Ft && Ft.for,
      kI = uc ? Ft : (Ft && Ft.withoutSetter) || WI;
    cc.exports = function (e) {
      if (!oc(er, e) || !(ac || typeof er[e] == "string")) {
        var t = "Symbol." + e;
        ac && oc(Ft, e)
          ? (er[e] = Ft[e])
          : uc && sc
          ? (er[e] = sc(t))
          : (er[e] = kI(t));
      }
      return er[e];
    };
  });
  var pc = u((Tk, dc) => {
    var BI = Te(),
      HI = yn(),
      lc = Jt(),
      fc = oo(),
      jI = Bu(),
      KI = ju(),
      zI = fo(),
      YI = BI.TypeError,
      QI = zI("toPrimitive");
    dc.exports = function (e, t) {
      if (!lc(e) || fc(e)) return e;
      var r = jI(e, QI),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = HI(r, e, t)), !lc(n) || fc(n))
        )
          return n;
        throw YI("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), KI(e, t);
    };
  });
  var po = u((bk, vc) => {
    var $I = pc(),
      ZI = oo();
    vc.exports = function (e) {
      var t = $I(e, "string");
      return ZI(t) ? t : t + "";
    };
  });
  var ho = u((Ok, gc) => {
    var JI = Te(),
      hc = Jt(),
      vo = JI.document,
      eT = hc(vo) && hc(vo.createElement);
    gc.exports = function (e) {
      return eT ? vo.createElement(e) : {};
    };
  });
  var go = u((wk, Ec) => {
    var tT = Mt(),
      rT = Zt(),
      nT = ho();
    Ec.exports =
      !tT &&
      !rT(function () {
        return (
          Object.defineProperty(nT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var Eo = u((mc) => {
    var iT = Mt(),
      oT = yn(),
      aT = lu(),
      sT = Qi(),
      uT = Nr(),
      cT = po(),
      lT = Ot(),
      fT = go(),
      _c = Object.getOwnPropertyDescriptor;
    mc.f = iT
      ? _c
      : function (t, r) {
          if (((t = uT(t)), (r = cT(r)), fT))
            try {
              return _c(t, r);
            } catch {}
          if (lT(t, r)) return sT(!oT(aT.f, t, r), t[r]);
        };
  });
  var qr = u((Sk, Ic) => {
    var yc = Te(),
      dT = Jt(),
      pT = yc.String,
      vT = yc.TypeError;
    Ic.exports = function (e) {
      if (dT(e)) return e;
      throw vT(pT(e) + " is not an object");
    };
  });
  var Pr = u((Oc) => {
    var hT = Te(),
      gT = Mt(),
      ET = go(),
      Tc = qr(),
      _T = po(),
      mT = hT.TypeError,
      bc = Object.defineProperty;
    Oc.f = gT
      ? bc
      : function (t, r, n) {
          if ((Tc(t), (r = _T(r)), Tc(n), ET))
            try {
              return bc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw mT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var On = u((Ck, wc) => {
    var yT = Mt(),
      IT = Pr(),
      TT = Qi();
    wc.exports = yT
      ? function (e, t, r) {
          return IT.f(e, t, TT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var mo = u((xk, Ac) => {
    var bT = et(),
      OT = ft(),
      _o = bn(),
      wT = bT(Function.toString);
    OT(_o.inspectSource) ||
      (_o.inspectSource = function (e) {
        return wT(e);
      });
    Ac.exports = _o.inspectSource;
  });
  var Cc = u((Nk, Rc) => {
    var AT = Te(),
      ST = ft(),
      RT = mo(),
      Sc = AT.WeakMap;
    Rc.exports = ST(Sc) && /native code/.test(RT(Sc));
  });
  var yo = u((Lk, Nc) => {
    var CT = co(),
      xT = lo(),
      xc = CT("keys");
    Nc.exports = function (e) {
      return xc[e] || (xc[e] = xT(e));
    };
  });
  var wn = u((qk, Lc) => {
    Lc.exports = {};
  });
  var Gc = u((Pk, Fc) => {
    var NT = Cc(),
      Mc = Te(),
      Io = et(),
      LT = Jt(),
      qT = On(),
      To = Ot(),
      bo = bn(),
      PT = yo(),
      DT = wn(),
      qc = "Object already initialized",
      wo = Mc.TypeError,
      MT = Mc.WeakMap,
      An,
      Dr,
      Sn,
      FT = function (e) {
        return Sn(e) ? Dr(e) : An(e, {});
      },
      GT = function (e) {
        return function (t) {
          var r;
          if (!LT(t) || (r = Dr(t)).type !== e)
            throw wo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    NT || bo.state
      ? ((wt = bo.state || (bo.state = new MT())),
        (Pc = Io(wt.get)),
        (Oo = Io(wt.has)),
        (Dc = Io(wt.set)),
        (An = function (e, t) {
          if (Oo(wt, e)) throw new wo(qc);
          return (t.facade = e), Dc(wt, e, t), t;
        }),
        (Dr = function (e) {
          return Pc(wt, e) || {};
        }),
        (Sn = function (e) {
          return Oo(wt, e);
        }))
      : ((Gt = PT("state")),
        (DT[Gt] = !0),
        (An = function (e, t) {
          if (To(e, Gt)) throw new wo(qc);
          return (t.facade = e), qT(e, Gt, t), t;
        }),
        (Dr = function (e) {
          return To(e, Gt) ? e[Gt] : {};
        }),
        (Sn = function (e) {
          return To(e, Gt);
        }));
    var wt, Pc, Oo, Dc, Gt;
    Fc.exports = { set: An, get: Dr, has: Sn, enforce: FT, getterFor: GT };
  });
  var Vc = u((Dk, Xc) => {
    var Ao = Mt(),
      UT = Ot(),
      Uc = Function.prototype,
      XT = Ao && Object.getOwnPropertyDescriptor,
      So = UT(Uc, "name"),
      VT = So && function () {}.name === "something",
      WT = So && (!Ao || (Ao && XT(Uc, "name").configurable));
    Xc.exports = { EXISTS: So, PROPER: VT, CONFIGURABLE: WT };
  });
  var jc = u((Mk, Hc) => {
    var kT = Te(),
      Wc = ft(),
      BT = Ot(),
      kc = On(),
      HT = Tn(),
      jT = mo(),
      Bc = Gc(),
      KT = Vc().CONFIGURABLE,
      zT = Bc.get,
      YT = Bc.enforce,
      QT = String(String).split("String");
    (Hc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        c;
      if (
        (Wc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!BT(r, "name") || (KT && r.name !== a)) && kc(r, "name", a),
          (c = YT(r)),
          c.source || (c.source = QT.join(typeof a == "string" ? a : ""))),
        e === kT)
      ) {
        o ? (e[t] = r) : HT(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : kc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Wc(this) && zT(this).source) || jT(this);
    });
  });
  var Ro = u((Fk, Kc) => {
    var $T = Math.ceil,
      ZT = Math.floor;
    Kc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? ZT : $T)(t);
    };
  });
  var Yc = u((Gk, zc) => {
    var JT = Ro(),
      eb = Math.max,
      tb = Math.min;
    zc.exports = function (e, t) {
      var r = JT(e);
      return r < 0 ? eb(r + t, 0) : tb(r, t);
    };
  });
  var $c = u((Uk, Qc) => {
    var rb = Ro(),
      nb = Math.min;
    Qc.exports = function (e) {
      return e > 0 ? nb(rb(e), 9007199254740991) : 0;
    };
  });
  var Jc = u((Xk, Zc) => {
    var ib = $c();
    Zc.exports = function (e) {
      return ib(e.length);
    };
  });
  var Co = u((Vk, tl) => {
    var ob = Nr(),
      ab = Yc(),
      sb = Jc(),
      el = function (e) {
        return function (t, r, n) {
          var i = ob(t),
            o = sb(i),
            s = ab(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    tl.exports = { includes: el(!0), indexOf: el(!1) };
  });
  var No = u((Wk, nl) => {
    var ub = et(),
      xo = Ot(),
      cb = Nr(),
      lb = Co().indexOf,
      fb = wn(),
      rl = ub([].push);
    nl.exports = function (e, t) {
      var r = cb(e),
        n = 0,
        i = [],
        o;
      for (o in r) !xo(fb, o) && xo(r, o) && rl(i, o);
      for (; t.length > n; ) xo(r, (o = t[n++])) && (~lb(i, o) || rl(i, o));
      return i;
    };
  });
  var Rn = u((kk, il) => {
    il.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var al = u((ol) => {
    var db = No(),
      pb = Rn(),
      vb = pb.concat("length", "prototype");
    ol.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return db(t, vb);
      };
  });
  var ul = u((sl) => {
    sl.f = Object.getOwnPropertySymbols;
  });
  var ll = u((jk, cl) => {
    var hb = Lr(),
      gb = et(),
      Eb = al(),
      _b = ul(),
      mb = qr(),
      yb = gb([].concat);
    cl.exports =
      hb("Reflect", "ownKeys") ||
      function (t) {
        var r = Eb.f(mb(t)),
          n = _b.f;
        return n ? yb(r, n(t)) : r;
      };
  });
  var dl = u((Kk, fl) => {
    var Ib = Ot(),
      Tb = ll(),
      bb = Eo(),
      Ob = Pr();
    fl.exports = function (e, t) {
      for (var r = Tb(t), n = Ob.f, i = bb.f, o = 0; o < r.length; o++) {
        var s = r[o];
        Ib(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var vl = u((zk, pl) => {
    var wb = Zt(),
      Ab = ft(),
      Sb = /#|\.prototype\./,
      Mr = function (e, t) {
        var r = Cb[Rb(e)];
        return r == Nb ? !0 : r == xb ? !1 : Ab(t) ? wb(t) : !!t;
      },
      Rb = (Mr.normalize = function (e) {
        return String(e).replace(Sb, ".").toLowerCase();
      }),
      Cb = (Mr.data = {}),
      xb = (Mr.NATIVE = "N"),
      Nb = (Mr.POLYFILL = "P");
    pl.exports = Mr;
  });
  var gl = u((Yk, hl) => {
    var Lo = Te(),
      Lb = Eo().f,
      qb = On(),
      Pb = jc(),
      Db = Tn(),
      Mb = dl(),
      Fb = vl();
    hl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        c,
        d,
        g;
      if (
        (n
          ? (s = Lo)
          : i
          ? (s = Lo[r] || Db(r, {}))
          : (s = (Lo[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((d = t[a]),
            e.noTargetGet ? ((g = Lb(s, a)), (c = g && g.value)) : (c = s[a]),
            (o = Fb(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && c !== void 0)
          ) {
            if (typeof d == typeof c) continue;
            Mb(d, c);
          }
          (e.sham || (c && c.sham)) && qb(d, "sham", !0), Pb(s, a, d, e);
        }
    };
  });
  var _l = u((Qk, El) => {
    var Gb = No(),
      Ub = Rn();
    El.exports =
      Object.keys ||
      function (t) {
        return Gb(t, Ub);
      };
  });
  var yl = u(($k, ml) => {
    var Xb = Mt(),
      Vb = Pr(),
      Wb = qr(),
      kb = Nr(),
      Bb = _l();
    ml.exports = Xb
      ? Object.defineProperties
      : function (t, r) {
          Wb(t);
          for (var n = kb(r), i = Bb(r), o = i.length, s = 0, a; o > s; )
            Vb.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var Tl = u((Zk, Il) => {
    var Hb = Lr();
    Il.exports = Hb("document", "documentElement");
  });
  var xl = u((Jk, Cl) => {
    var jb = qr(),
      Kb = yl(),
      bl = Rn(),
      zb = wn(),
      Yb = Tl(),
      Qb = ho(),
      $b = yo(),
      Ol = ">",
      wl = "<",
      Po = "prototype",
      Do = "script",
      Sl = $b("IE_PROTO"),
      qo = function () {},
      Rl = function (e) {
        return wl + Do + Ol + e + wl + "/" + Do + Ol;
      },
      Al = function (e) {
        e.write(Rl("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      Zb = function () {
        var e = Qb("iframe"),
          t = "java" + Do + ":",
          r;
        return (
          (e.style.display = "none"),
          Yb.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Rl("document.F=Object")),
          r.close(),
          r.F
        );
      },
      Cn,
      xn = function () {
        try {
          Cn = new ActiveXObject("htmlfile");
        } catch {}
        xn =
          typeof document < "u"
            ? document.domain && Cn
              ? Al(Cn)
              : Zb()
            : Al(Cn);
        for (var e = bl.length; e--; ) delete xn[Po][bl[e]];
        return xn();
      };
    zb[Sl] = !0;
    Cl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((qo[Po] = jb(t)), (n = new qo()), (qo[Po] = null), (n[Sl] = t))
            : (n = xn()),
          r === void 0 ? n : Kb(n, r)
        );
      };
  });
  var Ll = u((eB, Nl) => {
    var Jb = fo(),
      eO = xl(),
      tO = Pr(),
      Mo = Jb("unscopables"),
      Fo = Array.prototype;
    Fo[Mo] == null && tO.f(Fo, Mo, { configurable: !0, value: eO(null) });
    Nl.exports = function (e) {
      Fo[Mo][e] = !0;
    };
  });
  var ql = u(() => {
    "use strict";
    var rO = gl(),
      nO = Co().includes,
      iO = Ll();
    rO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return nO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    iO("includes");
  });
  var Dl = u((nB, Pl) => {
    var oO = Te(),
      aO = et();
    Pl.exports = function (e, t) {
      return aO(oO[e].prototype[t]);
    };
  });
  var Fl = u((iB, Ml) => {
    ql();
    var sO = Dl();
    Ml.exports = sO("Array", "includes");
  });
  var Ul = u((oB, Gl) => {
    var uO = Fl();
    Gl.exports = uO;
  });
  var Vl = u((aB, Xl) => {
    var cO = Ul();
    Xl.exports = cO;
  });
  var Go = u((sB, Wl) => {
    var lO =
      typeof global == "object" && global && global.Object === Object && global;
    Wl.exports = lO;
  });
  var rt = u((uB, kl) => {
    var fO = Go(),
      dO = typeof self == "object" && self && self.Object === Object && self,
      pO = fO || dO || Function("return this")();
    kl.exports = pO;
  });
  var tr = u((cB, Bl) => {
    var vO = rt(),
      hO = vO.Symbol;
    Bl.exports = hO;
  });
  var zl = u((lB, Kl) => {
    var Hl = tr(),
      jl = Object.prototype,
      gO = jl.hasOwnProperty,
      EO = jl.toString,
      Fr = Hl ? Hl.toStringTag : void 0;
    function _O(e) {
      var t = gO.call(e, Fr),
        r = e[Fr];
      try {
        e[Fr] = void 0;
        var n = !0;
      } catch {}
      var i = EO.call(e);
      return n && (t ? (e[Fr] = r) : delete e[Fr]), i;
    }
    Kl.exports = _O;
  });
  var Ql = u((fB, Yl) => {
    var mO = Object.prototype,
      yO = mO.toString;
    function IO(e) {
      return yO.call(e);
    }
    Yl.exports = IO;
  });
  var At = u((dB, Jl) => {
    var $l = tr(),
      TO = zl(),
      bO = Ql(),
      OO = "[object Null]",
      wO = "[object Undefined]",
      Zl = $l ? $l.toStringTag : void 0;
    function AO(e) {
      return e == null
        ? e === void 0
          ? wO
          : OO
        : Zl && Zl in Object(e)
        ? TO(e)
        : bO(e);
    }
    Jl.exports = AO;
  });
  var Uo = u((pB, ef) => {
    function SO(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    ef.exports = SO;
  });
  var Xo = u((vB, tf) => {
    var RO = Uo(),
      CO = RO(Object.getPrototypeOf, Object);
    tf.exports = CO;
  });
  var mt = u((hB, rf) => {
    function xO(e) {
      return e != null && typeof e == "object";
    }
    rf.exports = xO;
  });
  var Vo = u((gB, of) => {
    var NO = At(),
      LO = Xo(),
      qO = mt(),
      PO = "[object Object]",
      DO = Function.prototype,
      MO = Object.prototype,
      nf = DO.toString,
      FO = MO.hasOwnProperty,
      GO = nf.call(Object);
    function UO(e) {
      if (!qO(e) || NO(e) != PO) return !1;
      var t = LO(e);
      if (t === null) return !0;
      var r = FO.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && nf.call(r) == GO;
    }
    of.exports = UO;
  });
  var af = u((Wo) => {
    "use strict";
    Object.defineProperty(Wo, "__esModule", { value: !0 });
    Wo.default = XO;
    function XO(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var sf = u((Bo, ko) => {
    "use strict";
    Object.defineProperty(Bo, "__esModule", { value: !0 });
    var VO = af(),
      WO = kO(VO);
    function kO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var rr;
    typeof self < "u"
      ? (rr = self)
      : typeof window < "u"
      ? (rr = window)
      : typeof global < "u"
      ? (rr = global)
      : typeof ko < "u"
      ? (rr = ko)
      : (rr = Function("return this")());
    var BO = (0, WO.default)(rr);
    Bo.default = BO;
  });
  var Ho = u((Gr) => {
    "use strict";
    Gr.__esModule = !0;
    Gr.ActionTypes = void 0;
    Gr.default = ff;
    var HO = Vo(),
      jO = lf(HO),
      KO = sf(),
      uf = lf(KO);
    function lf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var cf = (Gr.ActionTypes = { INIT: "@@redux/INIT" });
    function ff(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(ff)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        c = !1;
      function d() {
        a === s && (a = s.slice());
      }
      function g() {
        return o;
      }
      function f(b) {
        if (typeof b != "function")
          throw new Error("Expected listener to be a function.");
        var C = !0;
        return (
          d(),
          a.push(b),
          function () {
            if (C) {
              (C = !1), d();
              var x = a.indexOf(b);
              a.splice(x, 1);
            }
          }
        );
      }
      function y(b) {
        if (!(0, jO.default)(b))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof b.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0), (o = i(o, b));
        } finally {
          c = !1;
        }
        for (var C = (s = a), w = 0; w < C.length; w++) C[w]();
        return b;
      }
      function v(b) {
        if (typeof b != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = b), y({ type: cf.INIT });
      }
      function E() {
        var b,
          C = f;
        return (
          (b = {
            subscribe: function (x) {
              if (typeof x != "object")
                throw new TypeError("Expected the observer to be an object.");
              function A() {
                x.next && x.next(g());
              }
              A();
              var D = C(A);
              return { unsubscribe: D };
            },
          }),
          (b[uf.default] = function () {
            return this;
          }),
          b
        );
      }
      return (
        y({ type: cf.INIT }),
        (n = { dispatch: y, subscribe: f, getState: g, replaceReducer: v }),
        (n[uf.default] = E),
        n
      );
    }
  });
  var Ko = u((jo) => {
    "use strict";
    jo.__esModule = !0;
    jo.default = zO;
    function zO(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var vf = u((zo) => {
    "use strict";
    zo.__esModule = !0;
    zo.default = JO;
    var df = Ho(),
      YO = Vo(),
      yB = pf(YO),
      QO = Ko(),
      IB = pf(QO);
    function pf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function $O(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function ZO(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: df.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                df.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function JO(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        ZO(r);
      } catch (c) {
        a = c;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          g = arguments[1];
        if (a) throw a;
        if (!1) var f;
        for (var y = !1, v = {}, E = 0; E < o.length; E++) {
          var b = o[E],
            C = r[b],
            w = d[b],
            x = C(w, g);
          if (typeof x > "u") {
            var A = $O(b, g);
            throw new Error(A);
          }
          (v[b] = x), (y = y || x !== w);
        }
        return y ? v : d;
      };
    }
  });
  var gf = u((Yo) => {
    "use strict";
    Yo.__esModule = !0;
    Yo.default = ew;
    function hf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function ew(e, t) {
      if (typeof e == "function") return hf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = hf(s, t));
      }
      return n;
    }
  });
  var $o = u((Qo) => {
    "use strict";
    Qo.__esModule = !0;
    Qo.default = tw;
    function tw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var Ef = u((Zo) => {
    "use strict";
    Zo.__esModule = !0;
    var rw =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Zo.default = aw;
    var nw = $o(),
      iw = ow(nw);
    function ow(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function aw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            c = a.dispatch,
            d = [],
            g = {
              getState: a.getState,
              dispatch: function (y) {
                return c(y);
              },
            };
          return (
            (d = t.map(function (f) {
              return f(g);
            })),
            (c = iw.default.apply(void 0, d)(a.dispatch)),
            rw({}, a, { dispatch: c })
          );
        };
      };
    }
  });
  var Jo = u((Ke) => {
    "use strict";
    Ke.__esModule = !0;
    Ke.compose =
      Ke.applyMiddleware =
      Ke.bindActionCreators =
      Ke.combineReducers =
      Ke.createStore =
        void 0;
    var sw = Ho(),
      uw = nr(sw),
      cw = vf(),
      lw = nr(cw),
      fw = gf(),
      dw = nr(fw),
      pw = Ef(),
      vw = nr(pw),
      hw = $o(),
      gw = nr(hw),
      Ew = Ko(),
      AB = nr(Ew);
    function nr(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ke.createStore = uw.default;
    Ke.combineReducers = lw.default;
    Ke.bindActionCreators = dw.default;
    Ke.applyMiddleware = vw.default;
    Ke.compose = gw.default;
  });
  var _f = u((Ne) => {
    "use strict";
    Object.defineProperty(Ne, "__esModule", { value: !0 });
    Ne.QuickEffectIds =
      Ne.QuickEffectDirectionConsts =
      Ne.EventTypeConsts =
      Ne.EventLimitAffectedElements =
      Ne.EventContinuousMouseAxes =
      Ne.EventBasedOn =
      Ne.EventAppliesTo =
        void 0;
    var _w = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    };
    Ne.EventTypeConsts = _w;
    var mw = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
    Ne.EventAppliesTo = mw;
    var yw = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
    Ne.EventBasedOn = yw;
    var Iw = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
    Ne.EventContinuousMouseAxes = Iw;
    var Tw = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
    };
    Ne.EventLimitAffectedElements = Tw;
    var bw = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
    };
    Ne.QuickEffectIds = bw;
    var Ow = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
    };
    Ne.QuickEffectDirectionConsts = Ow;
  });
  var ea = u((ir) => {
    "use strict";
    Object.defineProperty(ir, "__esModule", { value: !0 });
    ir.ActionTypeConsts = ir.ActionAppliesTo = void 0;
    var ww = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    };
    ir.ActionTypeConsts = ww;
    var Aw = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
    };
    ir.ActionAppliesTo = Aw;
  });
  var mf = u((Nn) => {
    "use strict";
    Object.defineProperty(Nn, "__esModule", { value: !0 });
    Nn.InteractionTypeConsts = void 0;
    var Sw = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
    Nn.InteractionTypeConsts = Sw;
  });
  var yf = u((Ln) => {
    "use strict";
    Object.defineProperty(Ln, "__esModule", { value: !0 });
    Ln.ReducedMotionTypes = void 0;
    var Rw = ea(),
      {
        TRANSFORM_MOVE: Cw,
        TRANSFORM_SCALE: xw,
        TRANSFORM_ROTATE: Nw,
        TRANSFORM_SKEW: Lw,
        STYLE_SIZE: qw,
        STYLE_FILTER: Pw,
        STYLE_FONT_VARIATION: Dw,
      } = Rw.ActionTypeConsts,
      Mw = {
        [Cw]: !0,
        [xw]: !0,
        [Nw]: !0,
        [Lw]: !0,
        [qw]: !0,
        [Pw]: !0,
        [Dw]: !0,
      };
    Ln.ReducedMotionTypes = Mw;
  });
  var If = u((le) => {
    "use strict";
    Object.defineProperty(le, "__esModule", { value: !0 });
    le.IX2_VIEWPORT_WIDTH_CHANGED =
      le.IX2_TEST_FRAME_RENDERED =
      le.IX2_STOP_REQUESTED =
      le.IX2_SESSION_STOPPED =
      le.IX2_SESSION_STARTED =
      le.IX2_SESSION_INITIALIZED =
      le.IX2_RAW_DATA_IMPORTED =
      le.IX2_PREVIEW_REQUESTED =
      le.IX2_PLAYBACK_REQUESTED =
      le.IX2_PARAMETER_CHANGED =
      le.IX2_MEDIA_QUERIES_DEFINED =
      le.IX2_INSTANCE_STARTED =
      le.IX2_INSTANCE_REMOVED =
      le.IX2_INSTANCE_ADDED =
      le.IX2_EVENT_STATE_CHANGED =
      le.IX2_EVENT_LISTENER_ADDED =
      le.IX2_ELEMENT_STATE_CHANGED =
      le.IX2_CLEAR_REQUESTED =
      le.IX2_ANIMATION_FRAME_CHANGED =
      le.IX2_ACTION_LIST_PLAYBACK_CHANGED =
        void 0;
    var Fw = "IX2_RAW_DATA_IMPORTED";
    le.IX2_RAW_DATA_IMPORTED = Fw;
    var Gw = "IX2_SESSION_INITIALIZED";
    le.IX2_SESSION_INITIALIZED = Gw;
    var Uw = "IX2_SESSION_STARTED";
    le.IX2_SESSION_STARTED = Uw;
    var Xw = "IX2_SESSION_STOPPED";
    le.IX2_SESSION_STOPPED = Xw;
    var Vw = "IX2_PREVIEW_REQUESTED";
    le.IX2_PREVIEW_REQUESTED = Vw;
    var Ww = "IX2_PLAYBACK_REQUESTED";
    le.IX2_PLAYBACK_REQUESTED = Ww;
    var kw = "IX2_STOP_REQUESTED";
    le.IX2_STOP_REQUESTED = kw;
    var Bw = "IX2_CLEAR_REQUESTED";
    le.IX2_CLEAR_REQUESTED = Bw;
    var Hw = "IX2_EVENT_LISTENER_ADDED";
    le.IX2_EVENT_LISTENER_ADDED = Hw;
    var jw = "IX2_EVENT_STATE_CHANGED";
    le.IX2_EVENT_STATE_CHANGED = jw;
    var Kw = "IX2_ANIMATION_FRAME_CHANGED";
    le.IX2_ANIMATION_FRAME_CHANGED = Kw;
    var zw = "IX2_PARAMETER_CHANGED";
    le.IX2_PARAMETER_CHANGED = zw;
    var Yw = "IX2_INSTANCE_ADDED";
    le.IX2_INSTANCE_ADDED = Yw;
    var Qw = "IX2_INSTANCE_STARTED";
    le.IX2_INSTANCE_STARTED = Qw;
    var $w = "IX2_INSTANCE_REMOVED";
    le.IX2_INSTANCE_REMOVED = $w;
    var Zw = "IX2_ELEMENT_STATE_CHANGED";
    le.IX2_ELEMENT_STATE_CHANGED = Zw;
    var Jw = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
    le.IX2_ACTION_LIST_PLAYBACK_CHANGED = Jw;
    var eA = "IX2_VIEWPORT_WIDTH_CHANGED";
    le.IX2_VIEWPORT_WIDTH_CHANGED = eA;
    var tA = "IX2_MEDIA_QUERIES_DEFINED";
    le.IX2_MEDIA_QUERIES_DEFINED = tA;
    var rA = "IX2_TEST_FRAME_RENDERED";
    le.IX2_TEST_FRAME_RENDERED = rA;
  });
  var Tf = u((G) => {
    "use strict";
    Object.defineProperty(G, "__esModule", { value: !0 });
    G.W_MOD_JS =
      G.W_MOD_IX =
      G.WILL_CHANGE =
      G.WIDTH =
      G.WF_PAGE =
      G.TRANSLATE_Z =
      G.TRANSLATE_Y =
      G.TRANSLATE_X =
      G.TRANSLATE_3D =
      G.TRANSFORM =
      G.SKEW_Y =
      G.SKEW_X =
      G.SKEW =
      G.SIBLINGS =
      G.SCALE_Z =
      G.SCALE_Y =
      G.SCALE_X =
      G.SCALE_3D =
      G.ROTATE_Z =
      G.ROTATE_Y =
      G.ROTATE_X =
      G.RENDER_TRANSFORM =
      G.RENDER_STYLE =
      G.RENDER_PLUGIN =
      G.RENDER_GENERAL =
      G.PRESERVE_3D =
      G.PLAIN_OBJECT =
      G.PARENT =
      G.OPACITY =
      G.IX2_ID_DELIMITER =
      G.IMMEDIATE_CHILDREN =
      G.HTML_ELEMENT =
      G.HEIGHT =
      G.FONT_VARIATION_SETTINGS =
      G.FLEX =
      G.FILTER =
      G.DISPLAY =
      G.CONFIG_Z_VALUE =
      G.CONFIG_Z_UNIT =
      G.CONFIG_Y_VALUE =
      G.CONFIG_Y_UNIT =
      G.CONFIG_X_VALUE =
      G.CONFIG_X_UNIT =
      G.CONFIG_VALUE =
      G.CONFIG_UNIT =
      G.COMMA_DELIMITER =
      G.COLOR =
      G.COLON_DELIMITER =
      G.CHILDREN =
      G.BOUNDARY_SELECTOR =
      G.BORDER_COLOR =
      G.BAR_DELIMITER =
      G.BACKGROUND_COLOR =
      G.BACKGROUND =
      G.AUTO =
      G.ABSTRACT_NODE =
        void 0;
    var nA = "|";
    G.IX2_ID_DELIMITER = nA;
    var iA = "data-wf-page";
    G.WF_PAGE = iA;
    var oA = "w-mod-js";
    G.W_MOD_JS = oA;
    var aA = "w-mod-ix";
    G.W_MOD_IX = aA;
    var sA = ".w-dyn-item";
    G.BOUNDARY_SELECTOR = sA;
    var uA = "xValue";
    G.CONFIG_X_VALUE = uA;
    var cA = "yValue";
    G.CONFIG_Y_VALUE = cA;
    var lA = "zValue";
    G.CONFIG_Z_VALUE = lA;
    var fA = "value";
    G.CONFIG_VALUE = fA;
    var dA = "xUnit";
    G.CONFIG_X_UNIT = dA;
    var pA = "yUnit";
    G.CONFIG_Y_UNIT = pA;
    var vA = "zUnit";
    G.CONFIG_Z_UNIT = vA;
    var hA = "unit";
    G.CONFIG_UNIT = hA;
    var gA = "transform";
    G.TRANSFORM = gA;
    var EA = "translateX";
    G.TRANSLATE_X = EA;
    var _A = "translateY";
    G.TRANSLATE_Y = _A;
    var mA = "translateZ";
    G.TRANSLATE_Z = mA;
    var yA = "translate3d";
    G.TRANSLATE_3D = yA;
    var IA = "scaleX";
    G.SCALE_X = IA;
    var TA = "scaleY";
    G.SCALE_Y = TA;
    var bA = "scaleZ";
    G.SCALE_Z = bA;
    var OA = "scale3d";
    G.SCALE_3D = OA;
    var wA = "rotateX";
    G.ROTATE_X = wA;
    var AA = "rotateY";
    G.ROTATE_Y = AA;
    var SA = "rotateZ";
    G.ROTATE_Z = SA;
    var RA = "skew";
    G.SKEW = RA;
    var CA = "skewX";
    G.SKEW_X = CA;
    var xA = "skewY";
    G.SKEW_Y = xA;
    var NA = "opacity";
    G.OPACITY = NA;
    var LA = "filter";
    G.FILTER = LA;
    var qA = "font-variation-settings";
    G.FONT_VARIATION_SETTINGS = qA;
    var PA = "width";
    G.WIDTH = PA;
    var DA = "height";
    G.HEIGHT = DA;
    var MA = "backgroundColor";
    G.BACKGROUND_COLOR = MA;
    var FA = "background";
    G.BACKGROUND = FA;
    var GA = "borderColor";
    G.BORDER_COLOR = GA;
    var UA = "color";
    G.COLOR = UA;
    var XA = "display";
    G.DISPLAY = XA;
    var VA = "flex";
    G.FLEX = VA;
    var WA = "willChange";
    G.WILL_CHANGE = WA;
    var kA = "AUTO";
    G.AUTO = kA;
    var BA = ",";
    G.COMMA_DELIMITER = BA;
    var HA = ":";
    G.COLON_DELIMITER = HA;
    var jA = "|";
    G.BAR_DELIMITER = jA;
    var KA = "CHILDREN";
    G.CHILDREN = KA;
    var zA = "IMMEDIATE_CHILDREN";
    G.IMMEDIATE_CHILDREN = zA;
    var YA = "SIBLINGS";
    G.SIBLINGS = YA;
    var QA = "PARENT";
    G.PARENT = QA;
    var $A = "preserve-3d";
    G.PRESERVE_3D = $A;
    var ZA = "HTML_ELEMENT";
    G.HTML_ELEMENT = ZA;
    var JA = "PLAIN_OBJECT";
    G.PLAIN_OBJECT = JA;
    var eS = "ABSTRACT_NODE";
    G.ABSTRACT_NODE = eS;
    var tS = "RENDER_TRANSFORM";
    G.RENDER_TRANSFORM = tS;
    var rS = "RENDER_GENERAL";
    G.RENDER_GENERAL = rS;
    var nS = "RENDER_STYLE";
    G.RENDER_STYLE = nS;
    var iS = "RENDER_PLUGIN";
    G.RENDER_PLUGIN = iS;
  });
  var Be = u((Re) => {
    "use strict";
    var bf = $t().default;
    Object.defineProperty(Re, "__esModule", { value: !0 });
    var qn = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
    Re.IX2EngineConstants = Re.IX2EngineActionTypes = void 0;
    var ta = _f();
    Object.keys(ta).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(qn, e) ||
        (e in Re && Re[e] === ta[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return ta[e];
          },
        });
    });
    var ra = ea();
    Object.keys(ra).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(qn, e) ||
        (e in Re && Re[e] === ra[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return ra[e];
          },
        });
    });
    var na = mf();
    Object.keys(na).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(qn, e) ||
        (e in Re && Re[e] === na[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return na[e];
          },
        });
    });
    var ia = yf();
    Object.keys(ia).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(qn, e) ||
        (e in Re && Re[e] === ia[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return ia[e];
          },
        });
    });
    var oS = bf(If());
    Re.IX2EngineActionTypes = oS;
    var aS = bf(Tf());
    Re.IX2EngineConstants = aS;
  });
  var Of = u((Pn) => {
    "use strict";
    Object.defineProperty(Pn, "__esModule", { value: !0 });
    Pn.ixData = void 0;
    var sS = Be(),
      { IX2_RAW_DATA_IMPORTED: uS } = sS.IX2EngineActionTypes,
      cS = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case uS:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      };
    Pn.ixData = cS;
  });
  var Ur = u((MB, yt) => {
    function oa() {
      return (
        (yt.exports = oa =
          Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
        (yt.exports.__esModule = !0),
        (yt.exports.default = yt.exports),
        oa.apply(this, arguments)
      );
    }
    (yt.exports = oa),
      (yt.exports.__esModule = !0),
      (yt.exports.default = yt.exports);
  });
  var or = u((Oe) => {
    "use strict";
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    var lS =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    Oe.clone = Mn;
    Oe.addLast = Sf;
    Oe.addFirst = Rf;
    Oe.removeLast = Cf;
    Oe.removeFirst = xf;
    Oe.insert = Nf;
    Oe.removeAt = Lf;
    Oe.replaceAt = qf;
    Oe.getIn = Fn;
    Oe.set = Gn;
    Oe.setIn = Un;
    Oe.update = Df;
    Oe.updateIn = Mf;
    Oe.merge = Ff;
    Oe.mergeDeep = Gf;
    Oe.mergeIn = Uf;
    Oe.omit = Xf;
    Oe.addDefaults = Vf;
    var wf = "INVALID_ARGS";
    function Af(e) {
      throw new Error(e);
    }
    function aa(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var fS = {}.hasOwnProperty;
    function Mn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = aa(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function He(e, t, r) {
      var n = r;
      n == null && Af(wf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var c = 0; c < s.length; c++) {
        var d = s[c];
        if (d != null) {
          var g = aa(d);
          if (g.length)
            for (var f = 0; f <= g.length; f++) {
              var y = g[f];
              if (!(e && n[y] !== void 0)) {
                var v = d[y];
                t && Dn(n[y]) && Dn(v) && (v = He(e, t, n[y], v)),
                  !(v === void 0 || v === n[y]) &&
                    (i || ((i = !0), (n = Mn(n))), (n[y] = v));
              }
            }
        }
      }
      return n;
    }
    function Dn(e) {
      var t = typeof e > "u" ? "undefined" : lS(e);
      return e != null && (t === "object" || t === "function");
    }
    function Sf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Rf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Cf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function xf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Nf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Lf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function qf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function Fn(e, t) {
      if ((!Array.isArray(t) && Af(wf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Gn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Mn(i);
      return (o[t] = r), o;
    }
    function Pf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          Dn(e) && Dn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Pf(s, t, r, n + 1);
      }
      return Gn(e, o, i);
    }
    function Un(e, t, r) {
      return t.length ? Pf(e, t, r, 0) : r;
    }
    function Df(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Gn(e, t, i);
    }
    function Mf(e, t, r) {
      var n = Fn(e, t),
        i = r(n);
      return Un(e, t, i);
    }
    function Ff(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? He.call.apply(He, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : He(!1, !1, e, t, r, n, i, o);
    }
    function Gf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? He.call.apply(He, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : He(!1, !0, e, t, r, n, i, o);
    }
    function Uf(e, t, r, n, i, o, s) {
      var a = Fn(e, t);
      a == null && (a = {});
      for (
        var c = void 0,
          d = arguments.length,
          g = Array(d > 7 ? d - 7 : 0),
          f = 7;
        f < d;
        f++
      )
        g[f - 7] = arguments[f];
      return (
        g.length
          ? (c = He.call.apply(He, [null, !1, !1, a, r, n, i, o, s].concat(g)))
          : (c = He(!1, !1, a, r, n, i, o, s)),
        Un(e, t, c)
      );
    }
    function Xf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (fS.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = aa(e), a = 0; a < s.length; a++) {
        var c = s[a];
        r.indexOf(c) >= 0 || (o[c] = e[c]);
      }
      return o;
    }
    function Vf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? He.call.apply(He, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : He(!0, !1, e, t, r, n, i, o);
    }
    var dS = {
      clone: Mn,
      addLast: Sf,
      addFirst: Rf,
      removeLast: Cf,
      removeFirst: xf,
      insert: Nf,
      removeAt: Lf,
      replaceAt: qf,
      getIn: Fn,
      set: Gn,
      setIn: Un,
      update: Df,
      updateIn: Mf,
      merge: Ff,
      mergeDeep: Gf,
      mergeIn: Uf,
      omit: Xf,
      addDefaults: Vf,
    };
    Oe.default = dS;
  });
  var kf = u((Xn) => {
    "use strict";
    var pS = lt().default;
    Object.defineProperty(Xn, "__esModule", { value: !0 });
    Xn.ixRequest = void 0;
    var vS = pS(Ur()),
      hS = Be(),
      gS = or(),
      {
        IX2_PREVIEW_REQUESTED: ES,
        IX2_PLAYBACK_REQUESTED: _S,
        IX2_STOP_REQUESTED: mS,
        IX2_CLEAR_REQUESTED: yS,
      } = hS.IX2EngineActionTypes,
      IS = { preview: {}, playback: {}, stop: {}, clear: {} },
      Wf = Object.create(null, {
        [ES]: { value: "preview" },
        [_S]: { value: "playback" },
        [mS]: { value: "stop" },
        [yS]: { value: "clear" },
      }),
      TS = (e = IS, t) => {
        if (t.type in Wf) {
          let r = [Wf[t.type]];
          return (0, gS.setIn)(e, [r], (0, vS.default)({}, t.payload));
        }
        return e;
      };
    Xn.ixRequest = TS;
  });
  var Hf = u((Vn) => {
    "use strict";
    Object.defineProperty(Vn, "__esModule", { value: !0 });
    Vn.ixSession = void 0;
    var bS = Be(),
      dt = or(),
      {
        IX2_SESSION_INITIALIZED: OS,
        IX2_SESSION_STARTED: wS,
        IX2_TEST_FRAME_RENDERED: AS,
        IX2_SESSION_STOPPED: SS,
        IX2_EVENT_LISTENER_ADDED: RS,
        IX2_EVENT_STATE_CHANGED: CS,
        IX2_ANIMATION_FRAME_CHANGED: xS,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: NS,
        IX2_VIEWPORT_WIDTH_CHANGED: LS,
        IX2_MEDIA_QUERIES_DEFINED: qS,
      } = bS.IX2EngineActionTypes,
      Bf = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      },
      PS = 20,
      DS = (e = Bf, t) => {
        switch (t.type) {
          case OS: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, dt.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case wS:
            return (0, dt.set)(e, "active", !0);
          case AS: {
            let {
              payload: { step: r = PS },
            } = t;
            return (0, dt.set)(e, "tick", e.tick + r);
          }
          case SS:
            return Bf;
          case xS: {
            let {
              payload: { now: r },
            } = t;
            return (0, dt.set)(e, "tick", r);
          }
          case RS: {
            let r = (0, dt.addLast)(e.eventListeners, t.payload);
            return (0, dt.set)(e, "eventListeners", r);
          }
          case CS: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, dt.setIn)(e, ["eventState", r], n);
          }
          case NS: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, dt.setIn)(e, ["playbackState", r], n);
          }
          case LS: {
            let { width: r, mediaQueries: n } = t.payload,
              i = n.length,
              o = null;
            for (let s = 0; s < i; s++) {
              let { key: a, min: c, max: d } = n[s];
              if (r >= c && r <= d) {
                o = a;
                break;
              }
            }
            return (0, dt.merge)(e, { viewportWidth: r, mediaQueryKey: o });
          }
          case qS:
            return (0, dt.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      };
    Vn.ixSession = DS;
  });
  var Kf = u((XB, jf) => {
    function MS() {
      (this.__data__ = []), (this.size = 0);
    }
    jf.exports = MS;
  });
  var Wn = u((VB, zf) => {
    function FS(e, t) {
      return e === t || (e !== e && t !== t);
    }
    zf.exports = FS;
  });
  var Xr = u((WB, Yf) => {
    var GS = Wn();
    function US(e, t) {
      for (var r = e.length; r--; ) if (GS(e[r][0], t)) return r;
      return -1;
    }
    Yf.exports = US;
  });
  var $f = u((kB, Qf) => {
    var XS = Xr(),
      VS = Array.prototype,
      WS = VS.splice;
    function kS(e) {
      var t = this.__data__,
        r = XS(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : WS.call(t, r, 1), --this.size, !0;
    }
    Qf.exports = kS;
  });
  var Jf = u((BB, Zf) => {
    var BS = Xr();
    function HS(e) {
      var t = this.__data__,
        r = BS(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    Zf.exports = HS;
  });
  var td = u((HB, ed) => {
    var jS = Xr();
    function KS(e) {
      return jS(this.__data__, e) > -1;
    }
    ed.exports = KS;
  });
  var nd = u((jB, rd) => {
    var zS = Xr();
    function YS(e, t) {
      var r = this.__data__,
        n = zS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    rd.exports = YS;
  });
  var Vr = u((KB, id) => {
    var QS = Kf(),
      $S = $f(),
      ZS = Jf(),
      JS = td(),
      e0 = nd();
    function ar(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ar.prototype.clear = QS;
    ar.prototype.delete = $S;
    ar.prototype.get = ZS;
    ar.prototype.has = JS;
    ar.prototype.set = e0;
    id.exports = ar;
  });
  var ad = u((zB, od) => {
    var t0 = Vr();
    function r0() {
      (this.__data__ = new t0()), (this.size = 0);
    }
    od.exports = r0;
  });
  var ud = u((YB, sd) => {
    function n0(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    sd.exports = n0;
  });
  var ld = u((QB, cd) => {
    function i0(e) {
      return this.__data__.get(e);
    }
    cd.exports = i0;
  });
  var dd = u(($B, fd) => {
    function o0(e) {
      return this.__data__.has(e);
    }
    fd.exports = o0;
  });
  var pt = u((ZB, pd) => {
    function a0(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    pd.exports = a0;
  });
  var sa = u((JB, vd) => {
    var s0 = At(),
      u0 = pt(),
      c0 = "[object AsyncFunction]",
      l0 = "[object Function]",
      f0 = "[object GeneratorFunction]",
      d0 = "[object Proxy]";
    function p0(e) {
      if (!u0(e)) return !1;
      var t = s0(e);
      return t == l0 || t == f0 || t == c0 || t == d0;
    }
    vd.exports = p0;
  });
  var gd = u((eH, hd) => {
    var v0 = rt(),
      h0 = v0["__core-js_shared__"];
    hd.exports = h0;
  });
  var md = u((tH, _d) => {
    var ua = gd(),
      Ed = (function () {
        var e = /[^.]+$/.exec((ua && ua.keys && ua.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function g0(e) {
      return !!Ed && Ed in e;
    }
    _d.exports = g0;
  });
  var ca = u((rH, yd) => {
    var E0 = Function.prototype,
      _0 = E0.toString;
    function m0(e) {
      if (e != null) {
        try {
          return _0.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    yd.exports = m0;
  });
  var Td = u((nH, Id) => {
    var y0 = sa(),
      I0 = md(),
      T0 = pt(),
      b0 = ca(),
      O0 = /[\\^$.*+?()[\]{}|]/g,
      w0 = /^\[object .+?Constructor\]$/,
      A0 = Function.prototype,
      S0 = Object.prototype,
      R0 = A0.toString,
      C0 = S0.hasOwnProperty,
      x0 = RegExp(
        "^" +
          R0.call(C0)
            .replace(O0, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function N0(e) {
      if (!T0(e) || I0(e)) return !1;
      var t = y0(e) ? x0 : w0;
      return t.test(b0(e));
    }
    Id.exports = N0;
  });
  var Od = u((iH, bd) => {
    function L0(e, t) {
      return e?.[t];
    }
    bd.exports = L0;
  });
  var St = u((oH, wd) => {
    var q0 = Td(),
      P0 = Od();
    function D0(e, t) {
      var r = P0(e, t);
      return q0(r) ? r : void 0;
    }
    wd.exports = D0;
  });
  var kn = u((aH, Ad) => {
    var M0 = St(),
      F0 = rt(),
      G0 = M0(F0, "Map");
    Ad.exports = G0;
  });
  var Wr = u((sH, Sd) => {
    var U0 = St(),
      X0 = U0(Object, "create");
    Sd.exports = X0;
  });
  var xd = u((uH, Cd) => {
    var Rd = Wr();
    function V0() {
      (this.__data__ = Rd ? Rd(null) : {}), (this.size = 0);
    }
    Cd.exports = V0;
  });
  var Ld = u((cH, Nd) => {
    function W0(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Nd.exports = W0;
  });
  var Pd = u((lH, qd) => {
    var k0 = Wr(),
      B0 = "__lodash_hash_undefined__",
      H0 = Object.prototype,
      j0 = H0.hasOwnProperty;
    function K0(e) {
      var t = this.__data__;
      if (k0) {
        var r = t[e];
        return r === B0 ? void 0 : r;
      }
      return j0.call(t, e) ? t[e] : void 0;
    }
    qd.exports = K0;
  });
  var Md = u((fH, Dd) => {
    var z0 = Wr(),
      Y0 = Object.prototype,
      Q0 = Y0.hasOwnProperty;
    function $0(e) {
      var t = this.__data__;
      return z0 ? t[e] !== void 0 : Q0.call(t, e);
    }
    Dd.exports = $0;
  });
  var Gd = u((dH, Fd) => {
    var Z0 = Wr(),
      J0 = "__lodash_hash_undefined__";
    function eR(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = Z0 && t === void 0 ? J0 : t),
        this
      );
    }
    Fd.exports = eR;
  });
  var Xd = u((pH, Ud) => {
    var tR = xd(),
      rR = Ld(),
      nR = Pd(),
      iR = Md(),
      oR = Gd();
    function sr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    sr.prototype.clear = tR;
    sr.prototype.delete = rR;
    sr.prototype.get = nR;
    sr.prototype.has = iR;
    sr.prototype.set = oR;
    Ud.exports = sr;
  });
  var kd = u((vH, Wd) => {
    var Vd = Xd(),
      aR = Vr(),
      sR = kn();
    function uR() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Vd(),
          map: new (sR || aR)(),
          string: new Vd(),
        });
    }
    Wd.exports = uR;
  });
  var Hd = u((hH, Bd) => {
    function cR(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Bd.exports = cR;
  });
  var kr = u((gH, jd) => {
    var lR = Hd();
    function fR(e, t) {
      var r = e.__data__;
      return lR(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    jd.exports = fR;
  });
  var zd = u((EH, Kd) => {
    var dR = kr();
    function pR(e) {
      var t = dR(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Kd.exports = pR;
  });
  var Qd = u((_H, Yd) => {
    var vR = kr();
    function hR(e) {
      return vR(this, e).get(e);
    }
    Yd.exports = hR;
  });
  var Zd = u((mH, $d) => {
    var gR = kr();
    function ER(e) {
      return gR(this, e).has(e);
    }
    $d.exports = ER;
  });
  var ep = u((yH, Jd) => {
    var _R = kr();
    function mR(e, t) {
      var r = _R(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Jd.exports = mR;
  });
  var Bn = u((IH, tp) => {
    var yR = kd(),
      IR = zd(),
      TR = Qd(),
      bR = Zd(),
      OR = ep();
    function ur(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ur.prototype.clear = yR;
    ur.prototype.delete = IR;
    ur.prototype.get = TR;
    ur.prototype.has = bR;
    ur.prototype.set = OR;
    tp.exports = ur;
  });
  var np = u((TH, rp) => {
    var wR = Vr(),
      AR = kn(),
      SR = Bn(),
      RR = 200;
    function CR(e, t) {
      var r = this.__data__;
      if (r instanceof wR) {
        var n = r.__data__;
        if (!AR || n.length < RR - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new SR(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    rp.exports = CR;
  });
  var la = u((bH, ip) => {
    var xR = Vr(),
      NR = ad(),
      LR = ud(),
      qR = ld(),
      PR = dd(),
      DR = np();
    function cr(e) {
      var t = (this.__data__ = new xR(e));
      this.size = t.size;
    }
    cr.prototype.clear = NR;
    cr.prototype.delete = LR;
    cr.prototype.get = qR;
    cr.prototype.has = PR;
    cr.prototype.set = DR;
    ip.exports = cr;
  });
  var ap = u((OH, op) => {
    var MR = "__lodash_hash_undefined__";
    function FR(e) {
      return this.__data__.set(e, MR), this;
    }
    op.exports = FR;
  });
  var up = u((wH, sp) => {
    function GR(e) {
      return this.__data__.has(e);
    }
    sp.exports = GR;
  });
  var lp = u((AH, cp) => {
    var UR = Bn(),
      XR = ap(),
      VR = up();
    function Hn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new UR(); ++t < r; ) this.add(e[t]);
    }
    Hn.prototype.add = Hn.prototype.push = XR;
    Hn.prototype.has = VR;
    cp.exports = Hn;
  });
  var dp = u((SH, fp) => {
    function WR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    fp.exports = WR;
  });
  var vp = u((RH, pp) => {
    function kR(e, t) {
      return e.has(t);
    }
    pp.exports = kR;
  });
  var fa = u((CH, hp) => {
    var BR = lp(),
      HR = dp(),
      jR = vp(),
      KR = 1,
      zR = 2;
    function YR(e, t, r, n, i, o) {
      var s = r & KR,
        a = e.length,
        c = t.length;
      if (a != c && !(s && c > a)) return !1;
      var d = o.get(e),
        g = o.get(t);
      if (d && g) return d == t && g == e;
      var f = -1,
        y = !0,
        v = r & zR ? new BR() : void 0;
      for (o.set(e, t), o.set(t, e); ++f < a; ) {
        var E = e[f],
          b = t[f];
        if (n) var C = s ? n(b, E, f, t, e, o) : n(E, b, f, e, t, o);
        if (C !== void 0) {
          if (C) continue;
          y = !1;
          break;
        }
        if (v) {
          if (
            !HR(t, function (w, x) {
              if (!jR(v, x) && (E === w || i(E, w, r, n, o))) return v.push(x);
            })
          ) {
            y = !1;
            break;
          }
        } else if (!(E === b || i(E, b, r, n, o))) {
          y = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), y;
    }
    hp.exports = YR;
  });
  var Ep = u((xH, gp) => {
    var QR = rt(),
      $R = QR.Uint8Array;
    gp.exports = $R;
  });
  var mp = u((NH, _p) => {
    function ZR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    _p.exports = ZR;
  });
  var Ip = u((LH, yp) => {
    function JR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    yp.exports = JR;
  });
  var Ap = u((qH, wp) => {
    var Tp = tr(),
      bp = Ep(),
      eC = Wn(),
      tC = fa(),
      rC = mp(),
      nC = Ip(),
      iC = 1,
      oC = 2,
      aC = "[object Boolean]",
      sC = "[object Date]",
      uC = "[object Error]",
      cC = "[object Map]",
      lC = "[object Number]",
      fC = "[object RegExp]",
      dC = "[object Set]",
      pC = "[object String]",
      vC = "[object Symbol]",
      hC = "[object ArrayBuffer]",
      gC = "[object DataView]",
      Op = Tp ? Tp.prototype : void 0,
      da = Op ? Op.valueOf : void 0;
    function EC(e, t, r, n, i, o, s) {
      switch (r) {
        case gC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case hC:
          return !(e.byteLength != t.byteLength || !o(new bp(e), new bp(t)));
        case aC:
        case sC:
        case lC:
          return eC(+e, +t);
        case uC:
          return e.name == t.name && e.message == t.message;
        case fC:
        case pC:
          return e == t + "";
        case cC:
          var a = rC;
        case dC:
          var c = n & iC;
          if ((a || (a = nC), e.size != t.size && !c)) return !1;
          var d = s.get(e);
          if (d) return d == t;
          (n |= oC), s.set(e, t);
          var g = tC(a(e), a(t), n, i, o, s);
          return s.delete(e), g;
        case vC:
          if (da) return da.call(e) == da.call(t);
      }
      return !1;
    }
    wp.exports = EC;
  });
  var jn = u((PH, Sp) => {
    function _C(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    Sp.exports = _C;
  });
  var Le = u((DH, Rp) => {
    var mC = Array.isArray;
    Rp.exports = mC;
  });
  var pa = u((MH, Cp) => {
    var yC = jn(),
      IC = Le();
    function TC(e, t, r) {
      var n = t(e);
      return IC(e) ? n : yC(n, r(e));
    }
    Cp.exports = TC;
  });
  var Np = u((FH, xp) => {
    function bC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    xp.exports = bC;
  });
  var va = u((GH, Lp) => {
    function OC() {
      return [];
    }
    Lp.exports = OC;
  });
  var ha = u((UH, Pp) => {
    var wC = Np(),
      AC = va(),
      SC = Object.prototype,
      RC = SC.propertyIsEnumerable,
      qp = Object.getOwnPropertySymbols,
      CC = qp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                wC(qp(e), function (t) {
                  return RC.call(e, t);
                }));
          }
        : AC;
    Pp.exports = CC;
  });
  var Mp = u((XH, Dp) => {
    function xC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Dp.exports = xC;
  });
  var Gp = u((VH, Fp) => {
    var NC = At(),
      LC = mt(),
      qC = "[object Arguments]";
    function PC(e) {
      return LC(e) && NC(e) == qC;
    }
    Fp.exports = PC;
  });
  var Br = u((WH, Vp) => {
    var Up = Gp(),
      DC = mt(),
      Xp = Object.prototype,
      MC = Xp.hasOwnProperty,
      FC = Xp.propertyIsEnumerable,
      GC = Up(
        (function () {
          return arguments;
        })()
      )
        ? Up
        : function (e) {
            return DC(e) && MC.call(e, "callee") && !FC.call(e, "callee");
          };
    Vp.exports = GC;
  });
  var kp = u((kH, Wp) => {
    function UC() {
      return !1;
    }
    Wp.exports = UC;
  });
  var Kn = u((Hr, lr) => {
    var XC = rt(),
      VC = kp(),
      jp = typeof Hr == "object" && Hr && !Hr.nodeType && Hr,
      Bp = jp && typeof lr == "object" && lr && !lr.nodeType && lr,
      WC = Bp && Bp.exports === jp,
      Hp = WC ? XC.Buffer : void 0,
      kC = Hp ? Hp.isBuffer : void 0,
      BC = kC || VC;
    lr.exports = BC;
  });
  var zn = u((BH, Kp) => {
    var HC = 9007199254740991,
      jC = /^(?:0|[1-9]\d*)$/;
    function KC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? HC),
        !!t &&
          (r == "number" || (r != "symbol" && jC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Kp.exports = KC;
  });
  var Yn = u((HH, zp) => {
    var zC = 9007199254740991;
    function YC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= zC;
    }
    zp.exports = YC;
  });
  var Qp = u((jH, Yp) => {
    var QC = At(),
      $C = Yn(),
      ZC = mt(),
      JC = "[object Arguments]",
      ex = "[object Array]",
      tx = "[object Boolean]",
      rx = "[object Date]",
      nx = "[object Error]",
      ix = "[object Function]",
      ox = "[object Map]",
      ax = "[object Number]",
      sx = "[object Object]",
      ux = "[object RegExp]",
      cx = "[object Set]",
      lx = "[object String]",
      fx = "[object WeakMap]",
      dx = "[object ArrayBuffer]",
      px = "[object DataView]",
      vx = "[object Float32Array]",
      hx = "[object Float64Array]",
      gx = "[object Int8Array]",
      Ex = "[object Int16Array]",
      _x = "[object Int32Array]",
      mx = "[object Uint8Array]",
      yx = "[object Uint8ClampedArray]",
      Ix = "[object Uint16Array]",
      Tx = "[object Uint32Array]",
      Ie = {};
    Ie[vx] =
      Ie[hx] =
      Ie[gx] =
      Ie[Ex] =
      Ie[_x] =
      Ie[mx] =
      Ie[yx] =
      Ie[Ix] =
      Ie[Tx] =
        !0;
    Ie[JC] =
      Ie[ex] =
      Ie[dx] =
      Ie[tx] =
      Ie[px] =
      Ie[rx] =
      Ie[nx] =
      Ie[ix] =
      Ie[ox] =
      Ie[ax] =
      Ie[sx] =
      Ie[ux] =
      Ie[cx] =
      Ie[lx] =
      Ie[fx] =
        !1;
    function bx(e) {
      return ZC(e) && $C(e.length) && !!Ie[QC(e)];
    }
    Yp.exports = bx;
  });
  var Zp = u((KH, $p) => {
    function Ox(e) {
      return function (t) {
        return e(t);
      };
    }
    $p.exports = Ox;
  });
  var ev = u((jr, fr) => {
    var wx = Go(),
      Jp = typeof jr == "object" && jr && !jr.nodeType && jr,
      Kr = Jp && typeof fr == "object" && fr && !fr.nodeType && fr,
      Ax = Kr && Kr.exports === Jp,
      ga = Ax && wx.process,
      Sx = (function () {
        try {
          var e = Kr && Kr.require && Kr.require("util").types;
          return e || (ga && ga.binding && ga.binding("util"));
        } catch {}
      })();
    fr.exports = Sx;
  });
  var Qn = u((zH, nv) => {
    var Rx = Qp(),
      Cx = Zp(),
      tv = ev(),
      rv = tv && tv.isTypedArray,
      xx = rv ? Cx(rv) : Rx;
    nv.exports = xx;
  });
  var Ea = u((YH, iv) => {
    var Nx = Mp(),
      Lx = Br(),
      qx = Le(),
      Px = Kn(),
      Dx = zn(),
      Mx = Qn(),
      Fx = Object.prototype,
      Gx = Fx.hasOwnProperty;
    function Ux(e, t) {
      var r = qx(e),
        n = !r && Lx(e),
        i = !r && !n && Px(e),
        o = !r && !n && !i && Mx(e),
        s = r || n || i || o,
        a = s ? Nx(e.length, String) : [],
        c = a.length;
      for (var d in e)
        (t || Gx.call(e, d)) &&
          !(
            s &&
            (d == "length" ||
              (i && (d == "offset" || d == "parent")) ||
              (o &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              Dx(d, c))
          ) &&
          a.push(d);
      return a;
    }
    iv.exports = Ux;
  });
  var $n = u((QH, ov) => {
    var Xx = Object.prototype;
    function Vx(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || Xx;
      return e === r;
    }
    ov.exports = Vx;
  });
  var sv = u(($H, av) => {
    var Wx = Uo(),
      kx = Wx(Object.keys, Object);
    av.exports = kx;
  });
  var Zn = u((ZH, uv) => {
    var Bx = $n(),
      Hx = sv(),
      jx = Object.prototype,
      Kx = jx.hasOwnProperty;
    function zx(e) {
      if (!Bx(e)) return Hx(e);
      var t = [];
      for (var r in Object(e)) Kx.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    uv.exports = zx;
  });
  var Ut = u((JH, cv) => {
    var Yx = sa(),
      Qx = Yn();
    function $x(e) {
      return e != null && Qx(e.length) && !Yx(e);
    }
    cv.exports = $x;
  });
  var zr = u((e5, lv) => {
    var Zx = Ea(),
      Jx = Zn(),
      eN = Ut();
    function tN(e) {
      return eN(e) ? Zx(e) : Jx(e);
    }
    lv.exports = tN;
  });
  var dv = u((t5, fv) => {
    var rN = pa(),
      nN = ha(),
      iN = zr();
    function oN(e) {
      return rN(e, iN, nN);
    }
    fv.exports = oN;
  });
  var hv = u((r5, vv) => {
    var pv = dv(),
      aN = 1,
      sN = Object.prototype,
      uN = sN.hasOwnProperty;
    function cN(e, t, r, n, i, o) {
      var s = r & aN,
        a = pv(e),
        c = a.length,
        d = pv(t),
        g = d.length;
      if (c != g && !s) return !1;
      for (var f = c; f--; ) {
        var y = a[f];
        if (!(s ? y in t : uN.call(t, y))) return !1;
      }
      var v = o.get(e),
        E = o.get(t);
      if (v && E) return v == t && E == e;
      var b = !0;
      o.set(e, t), o.set(t, e);
      for (var C = s; ++f < c; ) {
        y = a[f];
        var w = e[y],
          x = t[y];
        if (n) var A = s ? n(x, w, y, t, e, o) : n(w, x, y, e, t, o);
        if (!(A === void 0 ? w === x || i(w, x, r, n, o) : A)) {
          b = !1;
          break;
        }
        C || (C = y == "constructor");
      }
      if (b && !C) {
        var D = e.constructor,
          M = t.constructor;
        D != M &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof D == "function" &&
            D instanceof D &&
            typeof M == "function" &&
            M instanceof M
          ) &&
          (b = !1);
      }
      return o.delete(e), o.delete(t), b;
    }
    vv.exports = cN;
  });
  var Ev = u((n5, gv) => {
    var lN = St(),
      fN = rt(),
      dN = lN(fN, "DataView");
    gv.exports = dN;
  });
  var mv = u((i5, _v) => {
    var pN = St(),
      vN = rt(),
      hN = pN(vN, "Promise");
    _v.exports = hN;
  });
  var Iv = u((o5, yv) => {
    var gN = St(),
      EN = rt(),
      _N = gN(EN, "Set");
    yv.exports = _N;
  });
  var _a = u((a5, Tv) => {
    var mN = St(),
      yN = rt(),
      IN = mN(yN, "WeakMap");
    Tv.exports = IN;
  });
  var Jn = u((s5, Cv) => {
    var ma = Ev(),
      ya = kn(),
      Ia = mv(),
      Ta = Iv(),
      ba = _a(),
      Rv = At(),
      dr = ca(),
      bv = "[object Map]",
      TN = "[object Object]",
      Ov = "[object Promise]",
      wv = "[object Set]",
      Av = "[object WeakMap]",
      Sv = "[object DataView]",
      bN = dr(ma),
      ON = dr(ya),
      wN = dr(Ia),
      AN = dr(Ta),
      SN = dr(ba),
      Xt = Rv;
    ((ma && Xt(new ma(new ArrayBuffer(1))) != Sv) ||
      (ya && Xt(new ya()) != bv) ||
      (Ia && Xt(Ia.resolve()) != Ov) ||
      (Ta && Xt(new Ta()) != wv) ||
      (ba && Xt(new ba()) != Av)) &&
      (Xt = function (e) {
        var t = Rv(e),
          r = t == TN ? e.constructor : void 0,
          n = r ? dr(r) : "";
        if (n)
          switch (n) {
            case bN:
              return Sv;
            case ON:
              return bv;
            case wN:
              return Ov;
            case AN:
              return wv;
            case SN:
              return Av;
          }
        return t;
      });
    Cv.exports = Xt;
  });
  var Fv = u((u5, Mv) => {
    var Oa = la(),
      RN = fa(),
      CN = Ap(),
      xN = hv(),
      xv = Jn(),
      Nv = Le(),
      Lv = Kn(),
      NN = Qn(),
      LN = 1,
      qv = "[object Arguments]",
      Pv = "[object Array]",
      ei = "[object Object]",
      qN = Object.prototype,
      Dv = qN.hasOwnProperty;
    function PN(e, t, r, n, i, o) {
      var s = Nv(e),
        a = Nv(t),
        c = s ? Pv : xv(e),
        d = a ? Pv : xv(t);
      (c = c == qv ? ei : c), (d = d == qv ? ei : d);
      var g = c == ei,
        f = d == ei,
        y = c == d;
      if (y && Lv(e)) {
        if (!Lv(t)) return !1;
        (s = !0), (g = !1);
      }
      if (y && !g)
        return (
          o || (o = new Oa()),
          s || NN(e) ? RN(e, t, r, n, i, o) : CN(e, t, c, r, n, i, o)
        );
      if (!(r & LN)) {
        var v = g && Dv.call(e, "__wrapped__"),
          E = f && Dv.call(t, "__wrapped__");
        if (v || E) {
          var b = v ? e.value() : e,
            C = E ? t.value() : t;
          return o || (o = new Oa()), i(b, C, r, n, o);
        }
      }
      return y ? (o || (o = new Oa()), xN(e, t, r, n, i, o)) : !1;
    }
    Mv.exports = PN;
  });
  var wa = u((c5, Xv) => {
    var DN = Fv(),
      Gv = mt();
    function Uv(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Gv(e) && !Gv(t))
        ? e !== e && t !== t
        : DN(e, t, r, n, Uv, i);
    }
    Xv.exports = Uv;
  });
  var Wv = u((l5, Vv) => {
    var MN = la(),
      FN = wa(),
      GN = 1,
      UN = 2;
    function XN(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var c = a[0],
          d = e[c],
          g = a[1];
        if (s && a[2]) {
          if (d === void 0 && !(c in e)) return !1;
        } else {
          var f = new MN();
          if (n) var y = n(d, g, c, e, t, f);
          if (!(y === void 0 ? FN(g, d, GN | UN, n, f) : y)) return !1;
        }
      }
      return !0;
    }
    Vv.exports = XN;
  });
  var Aa = u((f5, kv) => {
    var VN = pt();
    function WN(e) {
      return e === e && !VN(e);
    }
    kv.exports = WN;
  });
  var Hv = u((d5, Bv) => {
    var kN = Aa(),
      BN = zr();
    function HN(e) {
      for (var t = BN(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, kN(i)];
      }
      return t;
    }
    Bv.exports = HN;
  });
  var Sa = u((p5, jv) => {
    function jN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    jv.exports = jN;
  });
  var zv = u((v5, Kv) => {
    var KN = Wv(),
      zN = Hv(),
      YN = Sa();
    function QN(e) {
      var t = zN(e);
      return t.length == 1 && t[0][2]
        ? YN(t[0][0], t[0][1])
        : function (r) {
            return r === e || KN(r, e, t);
          };
    }
    Kv.exports = QN;
  });
  var Yr = u((h5, Yv) => {
    var $N = At(),
      ZN = mt(),
      JN = "[object Symbol]";
    function eL(e) {
      return typeof e == "symbol" || (ZN(e) && $N(e) == JN);
    }
    Yv.exports = eL;
  });
  var ti = u((g5, Qv) => {
    var tL = Le(),
      rL = Yr(),
      nL = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      iL = /^\w*$/;
    function oL(e, t) {
      if (tL(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        rL(e)
        ? !0
        : iL.test(e) || !nL.test(e) || (t != null && e in Object(t));
    }
    Qv.exports = oL;
  });
  var Jv = u((E5, Zv) => {
    var $v = Bn(),
      aL = "Expected a function";
    function Ra(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(aL);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (Ra.Cache || $v)()), r;
    }
    Ra.Cache = $v;
    Zv.exports = Ra;
  });
  var th = u((_5, eh) => {
    var sL = Jv(),
      uL = 500;
    function cL(e) {
      var t = sL(e, function (n) {
          return r.size === uL && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    eh.exports = cL;
  });
  var nh = u((m5, rh) => {
    var lL = th(),
      fL =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      dL = /\\(\\)?/g,
      pL = lL(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(fL, function (r, n, i, o) {
            t.push(i ? o.replace(dL, "$1") : n || r);
          }),
          t
        );
      });
    rh.exports = pL;
  });
  var Ca = u((y5, ih) => {
    function vL(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    ih.exports = vL;
  });
  var lh = u((I5, ch) => {
    var oh = tr(),
      hL = Ca(),
      gL = Le(),
      EL = Yr(),
      _L = 1 / 0,
      ah = oh ? oh.prototype : void 0,
      sh = ah ? ah.toString : void 0;
    function uh(e) {
      if (typeof e == "string") return e;
      if (gL(e)) return hL(e, uh) + "";
      if (EL(e)) return sh ? sh.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -_L ? "-0" : t;
    }
    ch.exports = uh;
  });
  var dh = u((T5, fh) => {
    var mL = lh();
    function yL(e) {
      return e == null ? "" : mL(e);
    }
    fh.exports = yL;
  });
  var Qr = u((b5, ph) => {
    var IL = Le(),
      TL = ti(),
      bL = nh(),
      OL = dh();
    function wL(e, t) {
      return IL(e) ? e : TL(e, t) ? [e] : bL(OL(e));
    }
    ph.exports = wL;
  });
  var pr = u((O5, vh) => {
    var AL = Yr(),
      SL = 1 / 0;
    function RL(e) {
      if (typeof e == "string" || AL(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -SL ? "-0" : t;
    }
    vh.exports = RL;
  });
  var ri = u((w5, hh) => {
    var CL = Qr(),
      xL = pr();
    function NL(e, t) {
      t = CL(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[xL(t[r++])];
      return r && r == n ? e : void 0;
    }
    hh.exports = NL;
  });
  var ni = u((A5, gh) => {
    var LL = ri();
    function qL(e, t, r) {
      var n = e == null ? void 0 : LL(e, t);
      return n === void 0 ? r : n;
    }
    gh.exports = qL;
  });
  var _h = u((S5, Eh) => {
    function PL(e, t) {
      return e != null && t in Object(e);
    }
    Eh.exports = PL;
  });
  var yh = u((R5, mh) => {
    var DL = Qr(),
      ML = Br(),
      FL = Le(),
      GL = zn(),
      UL = Yn(),
      XL = pr();
    function VL(e, t, r) {
      t = DL(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = XL(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && UL(i) && GL(s, i) && (FL(e) || ML(e)));
    }
    mh.exports = VL;
  });
  var Th = u((C5, Ih) => {
    var WL = _h(),
      kL = yh();
    function BL(e, t) {
      return e != null && kL(e, t, WL);
    }
    Ih.exports = BL;
  });
  var Oh = u((x5, bh) => {
    var HL = wa(),
      jL = ni(),
      KL = Th(),
      zL = ti(),
      YL = Aa(),
      QL = Sa(),
      $L = pr(),
      ZL = 1,
      JL = 2;
    function eq(e, t) {
      return zL(e) && YL(t)
        ? QL($L(e), t)
        : function (r) {
            var n = jL(r, e);
            return n === void 0 && n === t ? KL(r, e) : HL(t, n, ZL | JL);
          };
    }
    bh.exports = eq;
  });
  var ii = u((N5, wh) => {
    function tq(e) {
      return e;
    }
    wh.exports = tq;
  });
  var xa = u((L5, Ah) => {
    function rq(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Ah.exports = rq;
  });
  var Rh = u((q5, Sh) => {
    var nq = ri();
    function iq(e) {
      return function (t) {
        return nq(t, e);
      };
    }
    Sh.exports = iq;
  });
  var xh = u((P5, Ch) => {
    var oq = xa(),
      aq = Rh(),
      sq = ti(),
      uq = pr();
    function cq(e) {
      return sq(e) ? oq(uq(e)) : aq(e);
    }
    Ch.exports = cq;
  });
  var Rt = u((D5, Nh) => {
    var lq = zv(),
      fq = Oh(),
      dq = ii(),
      pq = Le(),
      vq = xh();
    function hq(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? dq
        : typeof e == "object"
        ? pq(e)
          ? fq(e[0], e[1])
          : lq(e)
        : vq(e);
    }
    Nh.exports = hq;
  });
  var Na = u((M5, Lh) => {
    var gq = Rt(),
      Eq = Ut(),
      _q = zr();
    function mq(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!Eq(t)) {
          var o = gq(r, 3);
          (t = _q(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Lh.exports = mq;
  });
  var La = u((F5, qh) => {
    function yq(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    qh.exports = yq;
  });
  var Dh = u((G5, Ph) => {
    var Iq = /\s/;
    function Tq(e) {
      for (var t = e.length; t-- && Iq.test(e.charAt(t)); );
      return t;
    }
    Ph.exports = Tq;
  });
  var Fh = u((U5, Mh) => {
    var bq = Dh(),
      Oq = /^\s+/;
    function wq(e) {
      return e && e.slice(0, bq(e) + 1).replace(Oq, "");
    }
    Mh.exports = wq;
  });
  var oi = u((X5, Xh) => {
    var Aq = Fh(),
      Gh = pt(),
      Sq = Yr(),
      Uh = 0 / 0,
      Rq = /^[-+]0x[0-9a-f]+$/i,
      Cq = /^0b[01]+$/i,
      xq = /^0o[0-7]+$/i,
      Nq = parseInt;
    function Lq(e) {
      if (typeof e == "number") return e;
      if (Sq(e)) return Uh;
      if (Gh(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Gh(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = Aq(e);
      var r = Cq.test(e);
      return r || xq.test(e) ? Nq(e.slice(2), r ? 2 : 8) : Rq.test(e) ? Uh : +e;
    }
    Xh.exports = Lq;
  });
  var kh = u((V5, Wh) => {
    var qq = oi(),
      Vh = 1 / 0,
      Pq = 17976931348623157e292;
    function Dq(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = qq(e)), e === Vh || e === -Vh)) {
        var t = e < 0 ? -1 : 1;
        return t * Pq;
      }
      return e === e ? e : 0;
    }
    Wh.exports = Dq;
  });
  var qa = u((W5, Bh) => {
    var Mq = kh();
    function Fq(e) {
      var t = Mq(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    Bh.exports = Fq;
  });
  var jh = u((k5, Hh) => {
    var Gq = La(),
      Uq = Rt(),
      Xq = qa(),
      Vq = Math.max;
    function Wq(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : Xq(r);
      return i < 0 && (i = Vq(n + i, 0)), Gq(e, Uq(t, 3), i);
    }
    Hh.exports = Wq;
  });
  var Pa = u((B5, Kh) => {
    var kq = Na(),
      Bq = jh(),
      Hq = kq(Bq);
    Kh.exports = Hq;
  });
  var si = u((Ue) => {
    "use strict";
    var jq = lt().default;
    Object.defineProperty(Ue, "__esModule", { value: !0 });
    Ue.withBrowser =
      Ue.TRANSFORM_STYLE_PREFIXED =
      Ue.TRANSFORM_PREFIXED =
      Ue.IS_BROWSER_ENV =
      Ue.FLEX_PREFIXED =
      Ue.ELEMENT_MATCHES =
        void 0;
    var Kq = jq(Pa()),
      Yh = typeof window < "u";
    Ue.IS_BROWSER_ENV = Yh;
    var ai = (e, t) => (Yh ? e() : t);
    Ue.withBrowser = ai;
    var zq = ai(() =>
      (0, Kq.default)(
        [
          "matches",
          "matchesSelector",
          "mozMatchesSelector",
          "msMatchesSelector",
          "oMatchesSelector",
          "webkitMatchesSelector",
        ],
        (e) => e in Element.prototype
      )
    );
    Ue.ELEMENT_MATCHES = zq;
    var Yq = ai(() => {
      let e = document.createElement("i"),
        t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
        r = "";
      try {
        let { length: n } = t;
        for (let i = 0; i < n; i++) {
          let o = t[i];
          if (((e.style.display = o), e.style.display === o)) return o;
        }
        return r;
      } catch {
        return r;
      }
    }, "flex");
    Ue.FLEX_PREFIXED = Yq;
    var Qh = ai(() => {
      let e = document.createElement("i");
      if (e.style.transform == null) {
        let t = ["Webkit", "Moz", "ms"],
          r = "Transform",
          { length: n } = t;
        for (let i = 0; i < n; i++) {
          let o = t[i] + r;
          if (e.style[o] !== void 0) return o;
        }
      }
      return "transform";
    }, "transform");
    Ue.TRANSFORM_PREFIXED = Qh;
    var zh = Qh.split("transform")[0],
      Qq = zh ? zh + "TransformStyle" : "transformStyle";
    Ue.TRANSFORM_STYLE_PREFIXED = Qq;
  });
  var Da = u((j5, tg) => {
    var $q = 4,
      Zq = 0.001,
      Jq = 1e-7,
      eP = 10,
      $r = 11,
      ui = 1 / ($r - 1),
      tP = typeof Float32Array == "function";
    function $h(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function Zh(e, t) {
      return 3 * t - 6 * e;
    }
    function Jh(e) {
      return 3 * e;
    }
    function ci(e, t, r) {
      return (($h(t, r) * e + Zh(t, r)) * e + Jh(t)) * e;
    }
    function eg(e, t, r) {
      return 3 * $h(t, r) * e * e + 2 * Zh(t, r) * e + Jh(t);
    }
    function rP(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = ci(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > Jq && ++a < eP);
      return s;
    }
    function nP(e, t, r, n) {
      for (var i = 0; i < $q; ++i) {
        var o = eg(t, r, n);
        if (o === 0) return t;
        var s = ci(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    tg.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = tP ? new Float32Array($r) : new Array($r);
      if (t !== r || n !== i)
        for (var s = 0; s < $r; ++s) o[s] = ci(s * ui, t, n);
      function a(c) {
        for (var d = 0, g = 1, f = $r - 1; g !== f && o[g] <= c; ++g) d += ui;
        --g;
        var y = (c - o[g]) / (o[g + 1] - o[g]),
          v = d + y * ui,
          E = eg(v, t, n);
        return E >= Zq ? nP(c, v, t, n) : E === 0 ? v : rP(c, d, d + ui, t, n);
      }
      return function (d) {
        return t === r && n === i
          ? d
          : d === 0
          ? 0
          : d === 1
          ? 1
          : ci(a(d), r, i);
      };
    };
  });
  var Ma = u((ce) => {
    "use strict";
    var iP = lt().default;
    Object.defineProperty(ce, "__esModule", { value: !0 });
    ce.bounce = XP;
    ce.bouncePast = VP;
    ce.easeOut = ce.easeInOut = ce.easeIn = ce.ease = void 0;
    ce.inBack = NP;
    ce.inCirc = SP;
    ce.inCubic = dP;
    ce.inElastic = PP;
    ce.inExpo = OP;
    ce.inOutBack = qP;
    ce.inOutCirc = CP;
    ce.inOutCubic = vP;
    ce.inOutElastic = MP;
    ce.inOutExpo = AP;
    ce.inOutQuad = fP;
    ce.inOutQuart = EP;
    ce.inOutQuint = yP;
    ce.inOutSine = bP;
    ce.inQuad = cP;
    ce.inQuart = hP;
    ce.inQuint = _P;
    ce.inSine = IP;
    ce.outBack = LP;
    ce.outBounce = xP;
    ce.outCirc = RP;
    ce.outCubic = pP;
    ce.outElastic = DP;
    ce.outExpo = wP;
    ce.outQuad = lP;
    ce.outQuart = gP;
    ce.outQuint = mP;
    ce.outSine = TP;
    ce.swingFrom = GP;
    ce.swingFromTo = FP;
    ce.swingTo = UP;
    var li = iP(Da()),
      It = 1.70158,
      oP = (0, li.default)(0.25, 0.1, 0.25, 1);
    ce.ease = oP;
    var aP = (0, li.default)(0.42, 0, 1, 1);
    ce.easeIn = aP;
    var sP = (0, li.default)(0, 0, 0.58, 1);
    ce.easeOut = sP;
    var uP = (0, li.default)(0.42, 0, 0.58, 1);
    ce.easeInOut = uP;
    function cP(e) {
      return Math.pow(e, 2);
    }
    function lP(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function fP(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function dP(e) {
      return Math.pow(e, 3);
    }
    function pP(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function vP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 3)
        : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function hP(e) {
      return Math.pow(e, 4);
    }
    function gP(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function EP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 4)
        : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function _P(e) {
      return Math.pow(e, 5);
    }
    function mP(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function yP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 5)
        : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function IP(e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function TP(e) {
      return Math.sin(e * (Math.PI / 2));
    }
    function bP(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function OP(e) {
      return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function wP(e) {
      return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function AP(e) {
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (e /= 0.5) < 1
        ? 0.5 * Math.pow(2, 10 * (e - 1))
        : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function SP(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function RP(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function CP(e) {
      return (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function xP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function NP(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function LP(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function qP(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function PP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
    }
    function DP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
    }
    function MP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
    }
    function FP(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function GP(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function UP(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function XP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function VP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
        ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
        : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  });
  var Ga = u((Zr) => {
    "use strict";
    var WP = lt().default,
      kP = $t().default;
    Object.defineProperty(Zr, "__esModule", { value: !0 });
    Zr.applyEasing = jP;
    Zr.createBezierEasing = HP;
    Zr.optimizeFloat = Fa;
    var rg = kP(Ma()),
      BP = WP(Da());
    function Fa(e, t = 5, r = 10) {
      let n = Math.pow(r, t),
        i = Number(Math.round(e * n) / n);
      return Math.abs(i) > 1e-4 ? i : 0;
    }
    function HP(e) {
      return (0, BP.default)(...e);
    }
    function jP(e, t, r) {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Fa(r ? (t > 0 ? r(t) : t) : t > 0 && e && rg[e] ? rg[e](t) : t);
    }
  });
  var ag = u((vr) => {
    "use strict";
    Object.defineProperty(vr, "__esModule", { value: !0 });
    vr.createElementState = og;
    vr.ixElements = void 0;
    vr.mergeActionState = Ua;
    var fi = or(),
      ig = Be(),
      {
        HTML_ELEMENT: Y5,
        PLAIN_OBJECT: KP,
        ABSTRACT_NODE: Q5,
        CONFIG_X_VALUE: zP,
        CONFIG_Y_VALUE: YP,
        CONFIG_Z_VALUE: QP,
        CONFIG_VALUE: $P,
        CONFIG_X_UNIT: ZP,
        CONFIG_Y_UNIT: JP,
        CONFIG_Z_UNIT: eD,
        CONFIG_UNIT: tD,
      } = ig.IX2EngineConstants,
      {
        IX2_SESSION_STOPPED: rD,
        IX2_INSTANCE_ADDED: nD,
        IX2_ELEMENT_STATE_CHANGED: iD,
      } = ig.IX2EngineActionTypes,
      ng = {},
      oD = "refState",
      aD = (e = ng, t = {}) => {
        switch (t.type) {
          case rD:
            return ng;
          case nD: {
            let {
                elementId: r,
                element: n,
                origin: i,
                actionItem: o,
                refType: s,
              } = t.payload,
              { actionTypeId: a } = o,
              c = e;
            return (
              (0, fi.getIn)(c, [r, n]) !== n && (c = og(c, n, s, r, o)),
              Ua(c, r, a, i, o)
            );
          }
          case iD: {
            let {
              elementId: r,
              actionTypeId: n,
              current: i,
              actionItem: o,
            } = t.payload;
            return Ua(e, r, n, i, o);
          }
          default:
            return e;
        }
      };
    vr.ixElements = aD;
    function og(e, t, r, n, i) {
      let o =
        r === KP ? (0, fi.getIn)(i, ["config", "target", "objectId"]) : null;
      return (0, fi.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
    }
    function Ua(e, t, r, n, i) {
      let o = uD(i),
        s = [t, oD, r];
      return (0, fi.mergeIn)(e, s, n, o);
    }
    var sD = [
      [zP, ZP],
      [YP, JP],
      [QP, eD],
      [$P, tD],
    ];
    function uD(e) {
      let { config: t } = e;
      return sD.reduce((r, n) => {
        let i = n[0],
          o = n[1],
          s = t[i],
          a = t[o];
        return s != null && a != null && (r[o] = a), r;
      }, {});
    }
  });
  var sg = u((qe) => {
    "use strict";
    Object.defineProperty(qe, "__esModule", { value: !0 });
    qe.renderPlugin =
      qe.getPluginOrigin =
      qe.getPluginDuration =
      qe.getPluginDestination =
      qe.getPluginConfig =
      qe.createPluginInstance =
      qe.clearPlugin =
        void 0;
    var cD = (e) => e.value;
    qe.getPluginConfig = cD;
    var lD = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    qe.getPluginDuration = lD;
    var fD = (e) => e || { value: 0 };
    qe.getPluginOrigin = fD;
    var dD = (e) => ({ value: e.value });
    qe.getPluginDestination = dD;
    var pD = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    qe.createPluginInstance = pD;
    var vD = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    qe.renderPlugin = vD;
    var hD = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    qe.clearPlugin = hD;
  });
  var Xa = u((xe) => {
    "use strict";
    Object.defineProperty(xe, "__esModule", { value: !0 });
    xe.getPluginOrigin =
      xe.getPluginDuration =
      xe.getPluginDestination =
      xe.getPluginConfig =
      xe.createPluginInstance =
      xe.clearPlugin =
        void 0;
    xe.isPluginType = _D;
    xe.renderPlugin = void 0;
    var Vt = sg(),
      ug = Be(),
      gD = si(),
      ED = {
        [ug.ActionTypeConsts.PLUGIN_LOTTIE]: {
          getConfig: Vt.getPluginConfig,
          getOrigin: Vt.getPluginOrigin,
          getDuration: Vt.getPluginDuration,
          getDestination: Vt.getPluginDestination,
          createInstance: Vt.createPluginInstance,
          render: Vt.renderPlugin,
          clear: Vt.clearPlugin,
        },
      };
    function _D(e) {
      return e === ug.ActionTypeConsts.PLUGIN_LOTTIE;
    }
    var Wt = (e) => (t) => {
        if (!gD.IS_BROWSER_ENV) return () => null;
        let r = ED[t];
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
      mD = Wt("getConfig");
    xe.getPluginConfig = mD;
    var yD = Wt("getOrigin");
    xe.getPluginOrigin = yD;
    var ID = Wt("getDuration");
    xe.getPluginDuration = ID;
    var TD = Wt("getDestination");
    xe.getPluginDestination = TD;
    var bD = Wt("createInstance");
    xe.createPluginInstance = bD;
    var OD = Wt("render");
    xe.renderPlugin = OD;
    var wD = Wt("clear");
    xe.clearPlugin = wD;
  });
  var lg = u((ej, cg) => {
    function AD(e, t) {
      return e == null || e !== e ? t : e;
    }
    cg.exports = AD;
  });
  var dg = u((tj, fg) => {
    function SD(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    fg.exports = SD;
  });
  var vg = u((rj, pg) => {
    function RD(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var c = s[e ? a : ++i];
          if (r(o[c], c, o) === !1) break;
        }
        return t;
      };
    }
    pg.exports = RD;
  });
  var gg = u((nj, hg) => {
    var CD = vg(),
      xD = CD();
    hg.exports = xD;
  });
  var Va = u((ij, Eg) => {
    var ND = gg(),
      LD = zr();
    function qD(e, t) {
      return e && ND(e, t, LD);
    }
    Eg.exports = qD;
  });
  var mg = u((oj, _g) => {
    var PD = Ut();
    function DD(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!PD(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    _g.exports = DD;
  });
  var Wa = u((aj, yg) => {
    var MD = Va(),
      FD = mg(),
      GD = FD(MD);
    yg.exports = GD;
  });
  var Tg = u((sj, Ig) => {
    function UD(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    Ig.exports = UD;
  });
  var Og = u((uj, bg) => {
    var XD = dg(),
      VD = Wa(),
      WD = Rt(),
      kD = Tg(),
      BD = Le();
    function HD(e, t, r) {
      var n = BD(e) ? XD : kD,
        i = arguments.length < 3;
      return n(e, WD(t, 4), r, i, VD);
    }
    bg.exports = HD;
  });
  var Ag = u((cj, wg) => {
    var jD = La(),
      KD = Rt(),
      zD = qa(),
      YD = Math.max,
      QD = Math.min;
    function $D(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = zD(r)), (i = r < 0 ? YD(n + i, 0) : QD(i, n - 1))),
        jD(e, KD(t, 3), i, !0)
      );
    }
    wg.exports = $D;
  });
  var Rg = u((lj, Sg) => {
    var ZD = Na(),
      JD = Ag(),
      eM = ZD(JD);
    Sg.exports = eM;
  });
  var xg = u((di) => {
    "use strict";
    Object.defineProperty(di, "__esModule", { value: !0 });
    di.default = void 0;
    var tM = Object.prototype.hasOwnProperty;
    function Cg(e, t) {
      return e === t
        ? e !== 0 || t !== 0 || 1 / e === 1 / t
        : e !== e && t !== t;
    }
    function rM(e, t) {
      if (Cg(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let i = 0; i < r.length; i++)
        if (!tM.call(t, r[i]) || !Cg(e[r[i]], t[r[i]])) return !1;
      return !0;
    }
    var nM = rM;
    di.default = nM;
  });
  var $g = u((ye) => {
    "use strict";
    var hi = lt().default;
    Object.defineProperty(ye, "__esModule", { value: !0 });
    ye.cleanupHTMLElement = e1;
    ye.clearAllStyles = JM;
    ye.getActionListProgress = r1;
    ye.getAffectedElements = za;
    ye.getComputedStyle = RM;
    ye.getDestinationValues = DM;
    ye.getElementId = OM;
    ye.getInstanceId = TM;
    ye.getInstanceOrigin = NM;
    ye.getItemConfigByKey = void 0;
    ye.getMaxDurationItemIndex = Qg;
    ye.getNamespacedParameterId = o1;
    ye.getRenderType = Kg;
    ye.getStyleProp = MM;
    ye.mediaQueriesEqual = s1;
    ye.observeStore = SM;
    ye.reduceListToGroup = n1;
    ye.reifyState = wM;
    ye.renderHTMLElement = FM;
    Object.defineProperty(ye, "shallowEqual", {
      enumerable: !0,
      get: function () {
        return Xg.default;
      },
    });
    ye.shouldAllowMediaQuery = a1;
    ye.shouldNamespaceEventParameter = i1;
    ye.stringifyTarget = u1;
    var Ct = hi(lg()),
      Ba = hi(Og()),
      ka = hi(Rg()),
      Ng = or(),
      kt = Be(),
      Xg = hi(xg()),
      iM = Ga(),
      gt = Xa(),
      Xe = si(),
      {
        BACKGROUND: oM,
        TRANSFORM: aM,
        TRANSLATE_3D: sM,
        SCALE_3D: uM,
        ROTATE_X: cM,
        ROTATE_Y: lM,
        ROTATE_Z: fM,
        SKEW: dM,
        PRESERVE_3D: pM,
        FLEX: vM,
        OPACITY: pi,
        FILTER: Jr,
        FONT_VARIATION_SETTINGS: en,
        WIDTH: vt,
        HEIGHT: ht,
        BACKGROUND_COLOR: Vg,
        BORDER_COLOR: hM,
        COLOR: gM,
        CHILDREN: Lg,
        IMMEDIATE_CHILDREN: EM,
        SIBLINGS: qg,
        PARENT: _M,
        DISPLAY: vi,
        WILL_CHANGE: hr,
        AUTO: xt,
        COMMA_DELIMITER: tn,
        COLON_DELIMITER: mM,
        BAR_DELIMITER: Pg,
        RENDER_TRANSFORM: Wg,
        RENDER_GENERAL: Ha,
        RENDER_STYLE: ja,
        RENDER_PLUGIN: kg,
      } = kt.IX2EngineConstants,
      {
        TRANSFORM_MOVE: gr,
        TRANSFORM_SCALE: Er,
        TRANSFORM_ROTATE: _r,
        TRANSFORM_SKEW: rn,
        STYLE_OPACITY: Bg,
        STYLE_FILTER: nn,
        STYLE_FONT_VARIATION: on,
        STYLE_SIZE: mr,
        STYLE_BACKGROUND_COLOR: yr,
        STYLE_BORDER: Ir,
        STYLE_TEXT_COLOR: Tr,
        GENERAL_DISPLAY: gi,
      } = kt.ActionTypeConsts,
      yM = "OBJECT_VALUE",
      Hg = (e) => e.trim(),
      Ka = Object.freeze({ [yr]: Vg, [Ir]: hM, [Tr]: gM }),
      jg = Object.freeze({
        [Xe.TRANSFORM_PREFIXED]: aM,
        [Vg]: oM,
        [pi]: pi,
        [Jr]: Jr,
        [vt]: vt,
        [ht]: ht,
        [en]: en,
      }),
      Dg = {},
      IM = 1;
    function TM() {
      return "i" + IM++;
    }
    var bM = 1;
    function OM(e, t) {
      for (let r in e) {
        let n = e[r];
        if (n && n.ref === t) return n.id;
      }
      return "e" + bM++;
    }
    function wM({ events: e, actionLists: t, site: r } = {}) {
      let n = (0, Ba.default)(
          e,
          (s, a) => {
            let { eventTypeId: c } = a;
            return s[c] || (s[c] = {}), (s[c][a.id] = a), s;
          },
          {}
        ),
        i = r && r.mediaQueries,
        o = [];
      return (
        i
          ? (o = i.map((s) => s.key))
          : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
        {
          ixData: {
            events: e,
            actionLists: t,
            eventTypeMap: n,
            mediaQueries: i,
            mediaQueryKeys: o,
          },
        }
      );
    }
    var AM = (e, t) => e === t;
    function SM({ store: e, select: t, onChange: r, comparator: n = AM }) {
      let { getState: i, subscribe: o } = e,
        s = o(c),
        a = t(i());
      function c() {
        let d = t(i());
        if (d == null) {
          s();
          return;
        }
        n(d, a) || ((a = d), r(a, e));
      }
      return s;
    }
    function Mg(e) {
      let t = typeof e;
      if (t === "string") return { id: e };
      if (e != null && t === "object") {
        let {
          id: r,
          objectId: n,
          selector: i,
          selectorGuids: o,
          appliesTo: s,
          useEventTarget: a,
        } = e;
        return {
          id: r,
          objectId: n,
          selector: i,
          selectorGuids: o,
          appliesTo: s,
          useEventTarget: a,
        };
      }
      return {};
    }
    function za({
      config: e,
      event: t,
      eventTarget: r,
      elementRoot: n,
      elementApi: i,
    }) {
      var o, s, a;
      if (!i) throw new Error("IX2 missing elementApi");
      let { targets: c } = e;
      if (Array.isArray(c) && c.length > 0)
        return c.reduce(
          (L, X) =>
            L.concat(
              za({
                config: { target: X },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: i,
              })
            ),
          []
        );
      let {
          getValidDocument: d,
          getQuerySelector: g,
          queryDocument: f,
          getChildElements: y,
          getSiblingElements: v,
          matchSelector: E,
          elementContains: b,
          isSiblingNode: C,
        } = i,
        { target: w } = e;
      if (!w) return [];
      let {
        id: x,
        objectId: A,
        selector: D,
        selectorGuids: M,
        appliesTo: U,
        useEventTarget: H,
      } = Mg(w);
      if (A) return [Dg[A] || (Dg[A] = {})];
      if (U === kt.EventAppliesTo.PAGE) {
        let L = d(x);
        return L ? [L] : [];
      }
      let te =
          ((o =
            t == null ||
            (s = t.action) === null ||
            s === void 0 ||
            (a = s.config) === null ||
            a === void 0
              ? void 0
              : a.affectedElements) !== null && o !== void 0
            ? o
            : {})[x || D] || {},
        oe = !!(te.id || te.selector),
        B,
        N,
        h,
        F = t && g(Mg(t.target));
      if (
        (oe
          ? ((B = te.limitAffectedElements), (N = F), (h = g(te)))
          : (N = h = g({ id: x, selector: D, selectorGuids: M })),
        t && H)
      ) {
        let L = r && (h || H === !0) ? [r] : f(F);
        if (h) {
          if (H === _M) return f(h).filter((X) => L.some((Z) => b(X, Z)));
          if (H === Lg) return f(h).filter((X) => L.some((Z) => b(Z, X)));
          if (H === qg) return f(h).filter((X) => L.some((Z) => C(Z, X)));
        }
        return L;
      }
      return N == null || h == null
        ? []
        : Xe.IS_BROWSER_ENV && n
        ? f(h).filter((L) => n.contains(L))
        : B === Lg
        ? f(N, h)
        : B === EM
        ? y(f(N)).filter(E(h))
        : B === qg
        ? v(f(N)).filter(E(h))
        : f(h);
    }
    function RM({ element: e, actionItem: t }) {
      if (!Xe.IS_BROWSER_ENV) return {};
      let { actionTypeId: r } = t;
      switch (r) {
        case mr:
        case yr:
        case Ir:
        case Tr:
        case gi:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    var Fg = /px/,
      CM = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = GM[n.type]), r),
          e || {}
        ),
      xM = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = UM[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        );
    function NM(e, t = {}, r = {}, n, i) {
      let { getStyle: o } = i,
        { actionTypeId: s } = n;
      if ((0, gt.isPluginType)(s)) return (0, gt.getPluginOrigin)(s)(t[s]);
      switch (n.actionTypeId) {
        case gr:
        case Er:
        case _r:
        case rn:
          return t[n.actionTypeId] || Ya[n.actionTypeId];
        case nn:
          return CM(t[n.actionTypeId], n.config.filters);
        case on:
          return xM(t[n.actionTypeId], n.config.fontVariations);
        case Bg:
          return { value: (0, Ct.default)(parseFloat(o(e, pi)), 1) };
        case mr: {
          let a = o(e, vt),
            c = o(e, ht),
            d,
            g;
          return (
            n.config.widthUnit === xt
              ? (d = Fg.test(a) ? parseFloat(a) : parseFloat(r.width))
              : (d = (0, Ct.default)(parseFloat(a), parseFloat(r.width))),
            n.config.heightUnit === xt
              ? (g = Fg.test(c) ? parseFloat(c) : parseFloat(r.height))
              : (g = (0, Ct.default)(parseFloat(c), parseFloat(r.height))),
            { widthValue: d, heightValue: g }
          );
        }
        case yr:
        case Ir:
        case Tr:
          return QM({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: r,
            getStyle: o,
          });
        case gi:
          return { value: (0, Ct.default)(o(e, vi), r.display) };
        case yM:
          return t[n.actionTypeId] || { value: 0 };
        default:
          return;
      }
    }
    var LM = (e, t) => (t && (e[t.type] = t.value || 0), e),
      qM = (e, t) => (t && (e[t.type] = t.value || 0), e),
      PM = (e, t, r) => {
        if ((0, gt.isPluginType)(e)) return (0, gt.getPluginConfig)(e)(r, t);
        switch (e) {
          case nn: {
            let n = (0, ka.default)(r.filters, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          case on: {
            let n = (0, ka.default)(r.fontVariations, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      };
    ye.getItemConfigByKey = PM;
    function DM({ element: e, actionItem: t, elementApi: r }) {
      if ((0, gt.isPluginType)(t.actionTypeId))
        return (0, gt.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
        case gr:
        case Er:
        case _r:
        case rn: {
          let { xValue: n, yValue: i, zValue: o } = t.config;
          return { xValue: n, yValue: i, zValue: o };
        }
        case mr: {
          let { getStyle: n, setStyle: i, getProperty: o } = r,
            { widthUnit: s, heightUnit: a } = t.config,
            { widthValue: c, heightValue: d } = t.config;
          if (!Xe.IS_BROWSER_ENV) return { widthValue: c, heightValue: d };
          if (s === xt) {
            let g = n(e, vt);
            i(e, vt, ""), (c = o(e, "offsetWidth")), i(e, vt, g);
          }
          if (a === xt) {
            let g = n(e, ht);
            i(e, ht, ""), (d = o(e, "offsetHeight")), i(e, ht, g);
          }
          return { widthValue: c, heightValue: d };
        }
        case yr:
        case Ir:
        case Tr: {
          let { rValue: n, gValue: i, bValue: o, aValue: s } = t.config;
          return { rValue: n, gValue: i, bValue: o, aValue: s };
        }
        case nn:
          return t.config.filters.reduce(LM, {});
        case on:
          return t.config.fontVariations.reduce(qM, {});
        default: {
          let { value: n } = t.config;
          return { value: n };
        }
      }
    }
    function Kg(e) {
      if (/^TRANSFORM_/.test(e)) return Wg;
      if (/^STYLE_/.test(e)) return ja;
      if (/^GENERAL_/.test(e)) return Ha;
      if (/^PLUGIN_/.test(e)) return kg;
    }

    function MM(e, t) {
      return e === ja ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function FM(e, t, r, n, i, o, s, a, c) {
      switch (a) {
        case Wg:
          return WM(e, t, r, i, s);
        case ja:
          return $M(e, t, r, i, o, s);
        case Ha:
          return ZM(e, i, s);
        case kg: {
          let { actionTypeId: d } = i;
          if ((0, gt.isPluginType)(d)) return (0, gt.renderPlugin)(d)(c, t, i);
        }
      }
    }
    var Ya = {
        [gr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Er]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [_r]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [rn]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
      GM = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      }),
      UM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
      XM = (e, t) => {
        let r = (0, ka.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      },
      VM = Object.keys(Ya);
    function WM(e, t, r, n, i) {
      let o = VM.map((a) => {
          let c = Ya[a],
            {
              xValue: d = c.xValue,
              yValue: g = c.yValue,
              zValue: f = c.zValue,
              xUnit: y = "",
              yUnit: v = "",
              zUnit: E = "",
            } = t[a] || {};
          switch (a) {
            case gr:
              return `${sM}(${d}${y}, ${g}${v}, ${f}${E})`;
            case Er:
              return `${uM}(${d}${y}, ${g}${v}, ${f}${E})`;
            case _r:
              return `${cM}(${d}${y}) ${lM}(${g}${v}) ${fM}(${f}${E})`;
            case rn:
              return `${dM}(${d}${y}, ${g}${v})`;
            default:
              return "";
          }
        }).join(" "),
        { setStyle: s } = i;
      Bt(e, Xe.TRANSFORM_PREFIXED, i),
        s(e, Xe.TRANSFORM_PREFIXED, o),
        HM(n, r) && s(e, Xe.TRANSFORM_STYLE_PREFIXED, pM);
    }
    function kM(e, t, r, n) {
      let i = (0, Ba.default)(t, (s, a, c) => `${s} ${c}(${a}${XM(c, r)})`, ""),
        { setStyle: o } = n;
      Bt(e, Jr, n), o(e, Jr, i);
    }
    function BM(e, t, r, n) {
      let i = (0, Ba.default)(
          t,
          (s, a, c) => (s.push(`"${c}" ${a}`), s),
          []
        ).join(", "),
        { setStyle: o } = n;
      Bt(e, en, n), o(e, en, i);
    }
    function HM({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
      return (
        (e === gr && n !== void 0) ||
        (e === Er && n !== void 0) ||
        (e === _r && (t !== void 0 || r !== void 0))
      );
    }
    var jM = "\\(([^)]+)\\)",
      KM = /^rgb/,
      zM = RegExp(`rgba?${jM}`);
    function YM(e, t) {
      let r = e.exec(t);
      return r ? r[1] : "";
    }
    function QM({
      element: e,
      actionTypeId: t,
      computedStyle: r,
      getStyle: n,
    }) {
      let i = Ka[t],
        o = n(e, i),
        s = KM.test(o) ? o : r[i],
        a = YM(zM, s).split(tn);
      return {
        rValue: (0, Ct.default)(parseInt(a[0], 10), 255),
        gValue: (0, Ct.default)(parseInt(a[1], 10), 255),
        bValue: (0, Ct.default)(parseInt(a[2], 10), 255),
        aValue: (0, Ct.default)(parseFloat(a[3]), 1),
      };
    }
    function $M(e, t, r, n, i, o) {
      let { setStyle: s } = o;
      switch (n.actionTypeId) {
        case mr: {
          let { widthUnit: a = "", heightUnit: c = "" } = n.config,
            { widthValue: d, heightValue: g } = r;
          d !== void 0 &&
            (a === xt && (a = "px"), Bt(e, vt, o), s(e, vt, d + a)),
            g !== void 0 &&
              (c === xt && (c = "px"), Bt(e, ht, o), s(e, ht, g + c));
          break;
        }
        case nn: {
          kM(e, r, n.config, o);
          break;
        }
        case on: {
          BM(e, r, n.config, o);
          break;
        }
        case yr:
        case Ir:
        case Tr: {
          let a = Ka[n.actionTypeId],
            c = Math.round(r.rValue),
            d = Math.round(r.gValue),
            g = Math.round(r.bValue),
            f = r.aValue;
          Bt(e, a, o),
            s(
              e,
              a,
              f >= 1 ? `rgb(${c},${d},${g})` : `rgba(${c},${d},${g},${f})`
            );
          break;
        }
        default: {
          let { unit: a = "" } = n.config;
          Bt(e, i, o), s(e, i, r.value + a);
          break;
        }
      }
    }
    function ZM(e, t, r) {
      let { setStyle: n } = r;
      switch (t.actionTypeId) {
        case gi: {
          let { value: i } = t.config;
          i === vM && Xe.IS_BROWSER_ENV
            ? n(e, vi, Xe.FLEX_PREFIXED)
            : n(e, vi, i);
          return;
        }
      }
    }
    function Bt(e, t, r) {
      if (!Xe.IS_BROWSER_ENV) return;
      let n = jg[t];
      if (!n) return;
      let { getStyle: i, setStyle: o } = r,
        s = i(e, hr);
      if (!s) {
        o(e, hr, n);
        return;
      }
      let a = s.split(tn).map(Hg);
      a.indexOf(n) === -1 && o(e, hr, a.concat(n).join(tn));
    }
    function zg(e, t, r) {
      if (!Xe.IS_BROWSER_ENV) return;
      let n = jg[t];
      if (!n) return;
      let { getStyle: i, setStyle: o } = r,
        s = i(e, hr);
      !s ||
        s.indexOf(n) === -1 ||
        o(
          e,
          hr,
          s
            .split(tn)
            .map(Hg)
            .filter((a) => a !== n)
            .join(tn)
        );
    }
    function JM({ store: e, elementApi: t }) {
      let { ixData: r } = e.getState(),
        { events: n = {}, actionLists: i = {} } = r;
      Object.keys(n).forEach((o) => {
        let s = n[o],
          { config: a } = s.action,
          { actionListId: c } = a,
          d = i[c];
        d && Gg({ actionList: d, event: s, elementApi: t });
      }),
        Object.keys(i).forEach((o) => {
          Gg({ actionList: i[o], elementApi: t });
        });
    }
    function Gg({ actionList: e = {}, event: t, elementApi: r }) {
      let { actionItemGroups: n, continuousParameterGroups: i } = e;
      n &&
        n.forEach((o) => {
          Ug({ actionGroup: o, event: t, elementApi: r });
        }),
        i &&
          i.forEach((o) => {
            let { continuousActionGroups: s } = o;
            s.forEach((a) => {
              Ug({ actionGroup: a, event: t, elementApi: r });
            });
          });
    }
    function Ug({ actionGroup: e, event: t, elementApi: r }) {
      let { actionItems: n } = e;
      n.forEach(({ actionTypeId: i, config: o }) => {
        let s;
        (0, gt.isPluginType)(i)
          ? (s = (0, gt.clearPlugin)(i))
          : (s = Yg({ effect: t1, actionTypeId: i, elementApi: r })),
          za({ config: o, event: t, elementApi: r }).forEach(s);
      });
    }
    function e1(e, t, r) {
      let { setStyle: n, getStyle: i } = r,
        { actionTypeId: o } = t;
      if (o === mr) {
        let { config: s } = t;
        s.widthUnit === xt && n(e, vt, ""), s.heightUnit === xt && n(e, ht, "");
      }
      i(e, hr) && Yg({ effect: zg, actionTypeId: o, elementApi: r })(e);
    }
    var Yg =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case gr:
          case Er:
          case _r:
          case rn:
            e(n, Xe.TRANSFORM_PREFIXED, r);
            break;
          case nn:
            e(n, Jr, r);
            break;
          case on:
            e(n, en, r);
            break;
          case Bg:
            e(n, pi, r);
            break;
          case mr:
            e(n, vt, r), e(n, ht, r);
            break;
          case yr:
          case Ir:
          case Tr:
            e(n, Ka[t], r);
            break;
          case gi:
            e(n, vi, r);
            break;
        }
      };
    function t1(e, t, r) {
      let { setStyle: n } = r;
      zg(e, t, r),
        n(e, t, ""),
        t === Xe.TRANSFORM_PREFIXED && n(e, Xe.TRANSFORM_STYLE_PREFIXED, "");
    }
    function Qg(e) {
      let t = 0,
        r = 0;
      return (
        e.forEach((n, i) => {
          let { config: o } = n,
            s = o.delay + o.duration;
          s >= t && ((t = s), (r = i));
        }),
        r
      );
    }
    function r1(e, t) {
      let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
        { actionItem: i, verboseTimeElapsed: o = 0 } = t,
        s = 0,
        a = 0;
      return (
        r.forEach((c, d) => {
          if (n && d === 0) return;
          let { actionItems: g } = c,
            f = g[Qg(g)],
            { config: y, actionTypeId: v } = f;
          i.id === f.id && (a = s + o);
          let E = Kg(v) === Ha ? 0 : y.duration;
          s += y.delay + E;
        }),
        s > 0 ? (0, iM.optimizeFloat)(a / s) : 0
      );
    }
    function n1({ actionList: e, actionItemId: t, rawData: r }) {
      let { actionItemGroups: n, continuousParameterGroups: i } = e,
        o = [],
        s = (a) => (
          o.push((0, Ng.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
          a.id === t
        );
      return (
        n && n.some(({ actionItems: a }) => a.some(s)),
        i &&
          i.some((a) => {
            let { continuousActionGroups: c } = a;
            return c.some(({ actionItems: d }) => d.some(s));
          }),
        (0, Ng.setIn)(r, ["actionLists"], {
          [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
        })
      );
    }
    function i1(e, { basedOn: t }) {
      return (
        (e === kt.EventTypeConsts.SCROLLING_IN_VIEW &&
          (t === kt.EventBasedOn.ELEMENT || t == null)) ||
        (e === kt.EventTypeConsts.MOUSE_MOVE && t === kt.EventBasedOn.ELEMENT)
      );
    }
    function o1(e, t) {
      return e + mM + t;
    }
    function a1(e, t) {
      return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function s1(e, t) {
      return (0, Xg.default)(e && e.sort(), t && t.sort());
    }
    function u1(e) {
      if (typeof e == "string") return e;
      let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
      return t + Pg + r + Pg + n;
    }
  });
  var Ht = u((Ve) => {
    "use strict";
    var br = $t().default;
    Object.defineProperty(Ve, "__esModule", { value: !0 });
    Ve.IX2VanillaUtils =
      Ve.IX2VanillaPlugins =
      Ve.IX2ElementsReducer =
      Ve.IX2Easings =
      Ve.IX2EasingUtils =
      Ve.IX2BrowserSupport =
        void 0;
    var c1 = br(si());
    Ve.IX2BrowserSupport = c1;
    var l1 = br(Ma());
    Ve.IX2Easings = l1;
    var f1 = br(Ga());
    Ve.IX2EasingUtils = f1;
    var d1 = br(ag());
    Ve.IX2ElementsReducer = d1;
    var p1 = br(Xa());
    Ve.IX2VanillaPlugins = p1;
    var v1 = br($g());
    Ve.IX2VanillaUtils = v1;
  });
  var tE = u((_i) => {
    "use strict";
    Object.defineProperty(_i, "__esModule", { value: !0 });
    _i.ixInstances = void 0;
    var Zg = Be(),
      Jg = Ht(),
      Or = or(),
      {
        IX2_RAW_DATA_IMPORTED: h1,
        IX2_SESSION_STOPPED: g1,
        IX2_INSTANCE_ADDED: E1,
        IX2_INSTANCE_STARTED: _1,
        IX2_INSTANCE_REMOVED: m1,
        IX2_ANIMATION_FRAME_CHANGED: y1,
      } = Zg.IX2EngineActionTypes,
      {
        optimizeFloat: Ei,
        applyEasing: eE,
        createBezierEasing: I1,
      } = Jg.IX2EasingUtils,
      { RENDER_GENERAL: T1 } = Zg.IX2EngineConstants,
      {
        getItemConfigByKey: Qa,
        getRenderType: b1,
        getStyleProp: O1,
      } = Jg.IX2VanillaUtils,
      w1 = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: i,
            destinationKeys: o,
            smoothing: s,
            restingValue: a,
            actionTypeId: c,
            customEasingFn: d,
            skipMotion: g,
            skipToValue: f,
          } = e,
          { parameters: y } = t.payload,
          v = Math.max(1 - s, 0.01),
          E = y[n];
        E == null && ((v = 1), (E = a));
        let b = Math.max(E, 0) || 0,
          C = Ei(b - r),
          w = g ? f : Ei(r + C * v),
          x = w * 100;
        if (w === r && e.current) return e;
        let A, D, M, U;
        for (let Q = 0, { length: te } = i; Q < te; Q++) {
          let { keyframe: oe, actionItems: B } = i[Q];
          if ((Q === 0 && (A = B[0]), x >= oe)) {
            A = B[0];
            let N = i[Q + 1],
              h = N && x !== oe;
            (D = h ? N.actionItems[0] : null),
              h && ((M = oe / 100), (U = (N.keyframe - oe) / 100));
          }
        }
        let H = {};
        if (A && !D)
          for (let Q = 0, { length: te } = o; Q < te; Q++) {
            let oe = o[Q];
            H[oe] = Qa(c, oe, A.config);
          }
        else if (A && D && M !== void 0 && U !== void 0) {
          let Q = (w - M) / U,
            te = A.config.easing,
            oe = eE(te, Q, d);
          for (let B = 0, { length: N } = o; B < N; B++) {
            let h = o[B],
              F = Qa(c, h, A.config),
              Z = (Qa(c, h, D.config) - F) * oe + F;
            H[h] = Z;
          }
        }
        return (0, Or.merge)(e, { position: w, current: H });
      },
      A1 = (e, t) => {
        let {
            active: r,
            origin: n,
            start: i,
            immediate: o,
            renderType: s,
            verbose: a,
            actionItem: c,
            destination: d,
            destinationKeys: g,
            pluginDuration: f,
            instanceDelay: y,
            customEasingFn: v,
            skipMotion: E,
          } = e,
          b = c.config.easing,
          { duration: C, delay: w } = c.config;
        f != null && (C = f),
          (w = y ?? w),
          s === T1 ? (C = 0) : (o || E) && (C = w = 0);
        let { now: x } = t.payload;
        if (r && n) {
          let A = x - (i + w);
          if (a) {
            let Q = x - i,
              te = C + w,
              oe = Ei(Math.min(Math.max(0, Q / te), 1));
            e = (0, Or.set)(e, "verboseTimeElapsed", te * oe);
          }
          if (A < 0) return e;
          let D = Ei(Math.min(Math.max(0, A / C), 1)),
            M = eE(b, D, v),
            U = {},
            H = null;
          return (
            g.length &&
              (H = g.reduce((Q, te) => {
                let oe = d[te],
                  B = parseFloat(n[te]) || 0,
                  h = (parseFloat(oe) - B) * M + B;
                return (Q[te] = h), Q;
              }, {})),
            (U.current = H),
            (U.position = D),
            D === 1 && ((U.active = !1), (U.complete = !0)),
            (0, Or.merge)(e, U)
          );
        }
        return e;
      },
      S1 = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case h1:
            return t.payload.ixInstances || Object.freeze({});
          case g1:
            return Object.freeze({});
          case E1: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: i,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: c,
                groupIndex: d,
                isCarrier: g,
                origin: f,
                destination: y,
                immediate: v,
                verbose: E,
                continuous: b,
                parameterId: C,
                actionGroups: w,
                smoothing: x,
                restingValue: A,
                pluginInstance: D,
                pluginDuration: M,
                instanceDelay: U,
                skipMotion: H,
                skipToValue: Q,
              } = t.payload,
              { actionTypeId: te } = i,
              oe = b1(te),
              B = O1(oe, te),
              N = Object.keys(y).filter((F) => y[F] != null),
              { easing: h } = i.config;
            return (0, Or.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: f,
              destination: y,
              destinationKeys: N,
              immediate: v,
              verbose: E,
              current: null,
              actionItem: i,
              actionTypeId: te,
              eventId: o,
              eventTarget: s,
              eventStateKey: a,
              actionListId: c,
              groupIndex: d,
              renderType: oe,
              isCarrier: g,
              styleProp: B,
              continuous: b,
              parameterId: C,
              actionGroups: w,
              smoothing: x,
              restingValue: A,
              pluginInstance: D,
              pluginDuration: M,
              instanceDelay: U,
              skipMotion: H,
              skipToValue: Q,
              customEasingFn:
                Array.isArray(h) && h.length === 4 ? I1(h) : void 0,
            });
          }
          case _1: {
            let { instanceId: r, time: n } = t.payload;
            return (0, Or.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case m1: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              i = Object.keys(e),
              { length: o } = i;
            for (let s = 0; s < o; s++) {
              let a = i[s];
              a !== r && (n[a] = e[a]);
            }
            return n;
          }
          case y1: {
            let r = e,
              n = Object.keys(e),
              { length: i } = n;
            for (let o = 0; o < i; o++) {
              let s = n[o],
                a = e[s],
                c = a.continuous ? w1 : A1;
              r = (0, Or.set)(r, s, c(a, t));
            }
            return r;
          }
          default:
            return e;
        }
      };
    _i.ixInstances = S1;
  });
  var rE = u((mi) => {
    "use strict";
    Object.defineProperty(mi, "__esModule", { value: !0 });
    mi.ixParameters = void 0;
    var R1 = Be(),
      {
        IX2_RAW_DATA_IMPORTED: C1,
        IX2_SESSION_STOPPED: x1,
        IX2_PARAMETER_CHANGED: N1,
      } = R1.IX2EngineActionTypes,
      L1 = (e = {}, t) => {
        switch (t.type) {
          case C1:
            return t.payload.ixParameters || {};
          case x1:
            return {};
          case N1: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      };
    mi.ixParameters = L1;
  });
  var nE = u((yi) => {
    "use strict";
    Object.defineProperty(yi, "__esModule", { value: !0 });
    yi.default = void 0;
    var q1 = Jo(),
      P1 = Of(),
      D1 = kf(),
      M1 = Hf(),
      F1 = Ht(),
      G1 = tE(),
      U1 = rE(),
      { ixElements: X1 } = F1.IX2ElementsReducer,
      V1 = (0, q1.combineReducers)({
        ixData: P1.ixData,
        ixRequest: D1.ixRequest,
        ixSession: M1.ixSession,
        ixElements: X1,
        ixInstances: G1.ixInstances,
        ixParameters: U1.ixParameters,
      });
    yi.default = V1;
  });
  var iE = u((Ej, an) => {
    function W1(e, t) {
      if (e == null) return {};
      var r = {},
        n = Object.keys(e),
        i,
        o;
      for (o = 0; o < n.length; o++)
        (i = n[o]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
      return r;
    }
    (an.exports = W1),
      (an.exports.__esModule = !0),
      (an.exports.default = an.exports);
  });
  var aE = u((_j, oE) => {
    var k1 = At(),
      B1 = Le(),
      H1 = mt(),
      j1 = "[object String]";
    function K1(e) {
      return typeof e == "string" || (!B1(e) && H1(e) && k1(e) == j1);
    }
    oE.exports = K1;
  });
  var uE = u((mj, sE) => {
    var z1 = xa(),
      Y1 = z1("length");
    sE.exports = Y1;
  });
  var lE = u((yj, cE) => {
    var Q1 = "\\ud800-\\udfff",
      $1 = "\\u0300-\\u036f",
      Z1 = "\\ufe20-\\ufe2f",
      J1 = "\\u20d0-\\u20ff",
      eF = $1 + Z1 + J1,
      tF = "\\ufe0e\\ufe0f",
      rF = "\\u200d",
      nF = RegExp("[" + rF + Q1 + eF + tF + "]");
    function iF(e) {
      return nF.test(e);
    }
    cE.exports = iF;
  });
  var mE = u((Ij, _E) => {
    var dE = "\\ud800-\\udfff",
      oF = "\\u0300-\\u036f",
      aF = "\\ufe20-\\ufe2f",
      sF = "\\u20d0-\\u20ff",
      uF = oF + aF + sF,
      cF = "\\ufe0e\\ufe0f",
      lF = "[" + dE + "]",
      $a = "[" + uF + "]",
      Za = "\\ud83c[\\udffb-\\udfff]",
      fF = "(?:" + $a + "|" + Za + ")",
      pE = "[^" + dE + "]",
      vE = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      hE = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      dF = "\\u200d",
      gE = fF + "?",
      EE = "[" + cF + "]?",
      pF = "(?:" + dF + "(?:" + [pE, vE, hE].join("|") + ")" + EE + gE + ")*",
      vF = EE + gE + pF,
      hF = "(?:" + [pE + $a + "?", $a, vE, hE, lF].join("|") + ")",
      fE = RegExp(Za + "(?=" + Za + ")|" + hF + vF, "g");
    function gF(e) {
      for (var t = (fE.lastIndex = 0); fE.test(e); ) ++t;
      return t;
    }
    _E.exports = gF;
  });
  var IE = u((Tj, yE) => {
    var EF = uE(),
      _F = lE(),
      mF = mE();
    function yF(e) {
      return _F(e) ? mF(e) : EF(e);
    }
    yE.exports = yF;
  });
  var bE = u((bj, TE) => {
    var IF = Zn(),
      TF = Jn(),
      bF = Ut(),
      OF = aE(),
      wF = IE(),
      AF = "[object Map]",
      SF = "[object Set]";
    function RF(e) {
      if (e == null) return 0;
      if (bF(e)) return OF(e) ? wF(e) : e.length;
      var t = TF(e);
      return t == AF || t == SF ? e.size : IF(e).length;
    }
    TE.exports = RF;
  });
  var wE = u((Oj, OE) => {
    var CF = "Expected a function";
    function xF(e) {
      if (typeof e != "function") throw new TypeError(CF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    OE.exports = xF;
  });
  var Ja = u((wj, AE) => {
    var NF = St(),
      LF = (function () {
        try {
          var e = NF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    AE.exports = LF;
  });
  var es = u((Aj, RE) => {
    var SE = Ja();
    function qF(e, t, r) {
      t == "__proto__" && SE
        ? SE(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    RE.exports = qF;
  });
  var xE = u((Sj, CE) => {
    var PF = es(),
      DF = Wn(),
      MF = Object.prototype,
      FF = MF.hasOwnProperty;
    function GF(e, t, r) {
      var n = e[t];
      (!(FF.call(e, t) && DF(n, r)) || (r === void 0 && !(t in e))) &&
        PF(e, t, r);
    }
    CE.exports = GF;
  });
  var qE = u((Rj, LE) => {
    var UF = xE(),
      XF = Qr(),
      VF = zn(),
      NE = pt(),
      WF = pr();
    function kF(e, t, r, n) {
      if (!NE(e)) return e;
      t = XF(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var c = WF(t[i]),
          d = r;
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return e;
        if (i != s) {
          var g = a[c];
          (d = n ? n(g, c, a) : void 0),
            d === void 0 && (d = NE(g) ? g : VF(t[i + 1]) ? [] : {});
        }
        UF(a, c, d), (a = a[c]);
      }
      return e;
    }
    LE.exports = kF;
  });
  var DE = u((Cj, PE) => {
    var BF = ri(),
      HF = qE(),
      jF = Qr();
    function KF(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = BF(e, s);
        r(a, s) && HF(o, jF(s, e), a);
      }
      return o;
    }
    PE.exports = KF;
  });
  var FE = u((xj, ME) => {
    var zF = jn(),
      YF = Xo(),
      QF = ha(),
      $F = va(),
      ZF = Object.getOwnPropertySymbols,
      JF = ZF
        ? function (e) {
            for (var t = []; e; ) zF(t, QF(e)), (e = YF(e));
            return t;
          }
        : $F;
    ME.exports = JF;
  });
  var UE = u((Nj, GE) => {
    function e2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    GE.exports = e2;
  });
  var VE = u((Lj, XE) => {
    var t2 = pt(),
      r2 = $n(),
      n2 = UE(),
      i2 = Object.prototype,
      o2 = i2.hasOwnProperty;
    function a2(e) {
      if (!t2(e)) return n2(e);
      var t = r2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !o2.call(e, n))) || r.push(n);
      return r;
    }
    XE.exports = a2;
  });
  var kE = u((qj, WE) => {
    var s2 = Ea(),
      u2 = VE(),
      c2 = Ut();
    function l2(e) {
      return c2(e) ? s2(e, !0) : u2(e);
    }
    WE.exports = l2;
  });
  var HE = u((Pj, BE) => {
    var f2 = pa(),
      d2 = FE(),
      p2 = kE();
    function v2(e) {
      return f2(e, p2, d2);
    }
    BE.exports = v2;
  });
  var KE = u((Dj, jE) => {
    var h2 = Ca(),
      g2 = Rt(),
      E2 = DE(),
      _2 = HE();
    function m2(e, t) {
      if (e == null) return {};
      var r = h2(_2(e), function (n) {
        return [n];
      });
      return (
        (t = g2(t)),
        E2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    jE.exports = m2;
  });
  var YE = u((Mj, zE) => {
    var y2 = Rt(),
      I2 = wE(),
      T2 = KE();
    function b2(e, t) {
      return T2(e, I2(y2(t)));
    }
    zE.exports = b2;
  });
  var $E = u((Fj, QE) => {
    var O2 = Zn(),
      w2 = Jn(),
      A2 = Br(),
      S2 = Le(),
      R2 = Ut(),
      C2 = Kn(),
      x2 = $n(),
      N2 = Qn(),
      L2 = "[object Map]",
      q2 = "[object Set]",
      P2 = Object.prototype,
      D2 = P2.hasOwnProperty;
    function M2(e) {
      if (e == null) return !0;
      if (
        R2(e) &&
        (S2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          C2(e) ||
          N2(e) ||
          A2(e))
      )
        return !e.length;
      var t = w2(e);
      if (t == L2 || t == q2) return !e.size;
      if (x2(e)) return !O2(e).length;
      for (var r in e) if (D2.call(e, r)) return !1;
      return !0;
    }
    QE.exports = M2;
  });
  var JE = u((Gj, ZE) => {
    var F2 = es(),
      G2 = Va(),
      U2 = Rt();
    function X2(e, t) {
      var r = {};
      return (
        (t = U2(t, 3)),
        G2(e, function (n, i, o) {
          F2(r, i, t(n, i, o));
        }),
        r
      );
    }
    ZE.exports = X2;
  });
  var t_ = u((Uj, e_) => {
    function V2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    e_.exports = V2;
  });
  var n_ = u((Xj, r_) => {
    var W2 = ii();
    function k2(e) {
      return typeof e == "function" ? e : W2;
    }
    r_.exports = k2;
  });
  var o_ = u((Vj, i_) => {
    var B2 = t_(),
      H2 = Wa(),
      j2 = n_(),
      K2 = Le();
    function z2(e, t) {
      var r = K2(e) ? B2 : H2;
      return r(e, j2(t));
    }
    i_.exports = z2;
  });
  var s_ = u((Wj, a_) => {
    var Y2 = rt(),
      Q2 = function () {
        return Y2.Date.now();
      };
    a_.exports = Q2;
  });
  var l_ = u((kj, c_) => {
    var $2 = pt(),
      ts = s_(),
      u_ = oi(),
      Z2 = "Expected a function",
      J2 = Math.max,
      eG = Math.min;
    function tG(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        c,
        d = 0,
        g = !1,
        f = !1,
        y = !0;
      if (typeof e != "function") throw new TypeError(Z2);
      (t = u_(t) || 0),
        $2(r) &&
          ((g = !!r.leading),
          (f = "maxWait" in r),
          (o = f ? J2(u_(r.maxWait) || 0, t) : o),
          (y = "trailing" in r ? !!r.trailing : y));
      function v(U) {
        var H = n,
          Q = i;
        return (n = i = void 0), (d = U), (s = e.apply(Q, H)), s;
      }
      function E(U) {
        return (d = U), (a = setTimeout(w, t)), g ? v(U) : s;
      }
      function b(U) {
        var H = U - c,
          Q = U - d,
          te = t - H;
        return f ? eG(te, o - Q) : te;
      }
      function C(U) {
        var H = U - c,
          Q = U - d;
        return c === void 0 || H >= t || H < 0 || (f && Q >= o);
      }
      function w() {
        var U = ts();
        if (C(U)) return x(U);
        a = setTimeout(w, b(U));
      }
      function x(U) {
        return (a = void 0), y && n ? v(U) : ((n = i = void 0), s);
      }
      function A() {
        a !== void 0 && clearTimeout(a), (d = 0), (n = c = i = a = void 0);
      }
      function D() {
        return a === void 0 ? s : x(ts());
      }
      function M() {
        var U = ts(),
          H = C(U);
        if (((n = arguments), (i = this), (c = U), H)) {
          if (a === void 0) return E(c);
          if (f) return clearTimeout(a), (a = setTimeout(w, t)), v(c);
        }
        return a === void 0 && (a = setTimeout(w, t)), s;
      }
      return (M.cancel = A), (M.flush = D), M;
    }
    c_.exports = tG;
  });
  var d_ = u((Bj, f_) => {
    var rG = l_(),
      nG = pt(),
      iG = "Expected a function";
    function oG(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(iG);
      return (
        nG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        rG(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    f_.exports = oG;
  });
  var Ii = u((fe) => {
    "use strict";
    var aG = lt().default;
    Object.defineProperty(fe, "__esModule", { value: !0 });
    fe.viewportWidthChanged =
      fe.testFrameRendered =
      fe.stopRequested =
      fe.sessionStopped =
      fe.sessionStarted =
      fe.sessionInitialized =
      fe.rawDataImported =
      fe.previewRequested =
      fe.playbackRequested =
      fe.parameterChanged =
      fe.mediaQueriesDefined =
      fe.instanceStarted =
      fe.instanceRemoved =
      fe.instanceAdded =
      fe.eventStateChanged =
      fe.eventListenerAdded =
      fe.elementStateChanged =
      fe.clearRequested =
      fe.animationFrameChanged =
      fe.actionListPlaybackChanged =
        void 0;
    var p_ = aG(Ur()),
      v_ = Be(),
      sG = Ht(),
      {
        IX2_RAW_DATA_IMPORTED: uG,
        IX2_SESSION_INITIALIZED: cG,
        IX2_SESSION_STARTED: lG,
        IX2_SESSION_STOPPED: fG,
        IX2_PREVIEW_REQUESTED: dG,
        IX2_PLAYBACK_REQUESTED: pG,
        IX2_STOP_REQUESTED: vG,
        IX2_CLEAR_REQUESTED: hG,
        IX2_EVENT_LISTENER_ADDED: gG,
        IX2_TEST_FRAME_RENDERED: EG,
        IX2_EVENT_STATE_CHANGED: _G,
        IX2_ANIMATION_FRAME_CHANGED: mG,
        IX2_PARAMETER_CHANGED: yG,
        IX2_INSTANCE_ADDED: IG,
        IX2_INSTANCE_STARTED: TG,
        IX2_INSTANCE_REMOVED: bG,
        IX2_ELEMENT_STATE_CHANGED: OG,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: wG,
        IX2_VIEWPORT_WIDTH_CHANGED: AG,
        IX2_MEDIA_QUERIES_DEFINED: SG,
      } = v_.IX2EngineActionTypes,
      { reifyState: RG } = sG.IX2VanillaUtils,
      CG = (e) => ({ type: uG, payload: (0, p_.default)({}, RG(e)) });
    fe.rawDataImported = CG;
    var xG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
      type: cG,
      payload: { hasBoundaryNodes: e, reducedMotion: t },
    });
    fe.sessionInitialized = xG;
    var NG = () => ({ type: lG });
    fe.sessionStarted = NG;
    var LG = () => ({ type: fG });
    fe.sessionStopped = LG;
    var qG = ({ rawData: e, defer: t }) => ({
      type: dG,
      payload: { defer: t, rawData: e },
    });
    fe.previewRequested = qG;
    var PG = ({
      actionTypeId: e = v_.ActionTypeConsts.GENERAL_START_ACTION,
      actionListId: t,
      actionItemId: r,
      eventId: n,
      allowEvents: i,
      immediate: o,
      testManual: s,
      verbose: a,
      rawData: c,
    }) => ({
      type: pG,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: r,
        testManual: s,
        eventId: n,
        allowEvents: i,
        immediate: o,
        verbose: a,
        rawData: c,
      },
    });
    fe.playbackRequested = PG;
    var DG = (e) => ({ type: vG, payload: { actionListId: e } });
    fe.stopRequested = DG;
    var MG = () => ({ type: hG });
    fe.clearRequested = MG;
    var FG = (e, t) => ({
      type: gG,
      payload: { target: e, listenerParams: t },
    });
    fe.eventListenerAdded = FG;
    var GG = (e = 1) => ({ type: EG, payload: { step: e } });
    fe.testFrameRendered = GG;
    var UG = (e, t) => ({ type: _G, payload: { stateKey: e, newState: t } });
    fe.eventStateChanged = UG;
    var XG = (e, t) => ({ type: mG, payload: { now: e, parameters: t } });
    fe.animationFrameChanged = XG;
    var VG = (e, t) => ({ type: yG, payload: { key: e, value: t } });
    fe.parameterChanged = VG;
    var WG = (e) => ({ type: IG, payload: (0, p_.default)({}, e) });
    fe.instanceAdded = WG;
    var kG = (e, t) => ({ type: TG, payload: { instanceId: e, time: t } });
    fe.instanceStarted = kG;
    var BG = (e) => ({ type: bG, payload: { instanceId: e } });
    fe.instanceRemoved = BG;
    var HG = (e, t, r, n) => ({
      type: OG,
      payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
    });
    fe.elementStateChanged = HG;
    var jG = ({ actionListId: e, isPlaying: t }) => ({
      type: wG,
      payload: { actionListId: e, isPlaying: t },
    });
    fe.actionListPlaybackChanged = jG;
    var KG = ({ width: e, mediaQueries: t }) => ({
      type: AG,
      payload: { width: e, mediaQueries: t },
    });
    fe.viewportWidthChanged = KG;
    var zG = () => ({ type: SG });
    fe.mediaQueriesDefined = zG;
  });
  var E_ = u((Pe) => {
    "use strict";
    Object.defineProperty(Pe, "__esModule", { value: !0 });
    Pe.elementContains = aU;
    Pe.getChildElements = uU;
    Pe.getClosestElement = void 0;
    Pe.getProperty = tU;
    Pe.getQuerySelector = nU;
    Pe.getRefType = fU;
    Pe.getSiblingElements = cU;
    Pe.getStyle = eU;
    Pe.getValidDocument = iU;
    Pe.isSiblingNode = sU;
    Pe.matchSelector = rU;
    Pe.queryDocument = oU;
    Pe.setStyle = JG;
    var YG = Ht(),
      QG = Be(),
      { ELEMENT_MATCHES: rs } = YG.IX2BrowserSupport,
      {
        IX2_ID_DELIMITER: h_,
        HTML_ELEMENT: $G,
        PLAIN_OBJECT: ZG,
        WF_PAGE: g_,
      } = QG.IX2EngineConstants;
    function JG(e, t, r) {
      e.style[t] = r;
    }
    function eU(e, t) {
      return e.style[t];
    }
    function tU(e, t) {
      return e[t];
    }
    function rU(e) {
      return (t) => t[rs](e);
    }
    function nU({ id: e, selector: t }) {
      if (e) {
        let r = e;
        if (e.indexOf(h_) !== -1) {
          let n = e.split(h_),
            i = n[0];
          if (((r = n[1]), i !== document.documentElement.getAttribute(g_)))
            return null;
        }
        return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
      }
      return t;
    }
    function iU(e) {
      return e == null || e === document.documentElement.getAttribute(g_)
        ? document
        : null;
    }
    function oU(e, t) {
      return Array.prototype.slice.call(
        document.querySelectorAll(t ? e + " " + t : e)
      );
    }
    function aU(e, t) {
      return e.contains(t);
    }
    function sU(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function uU(e) {
      let t = [];
      for (let r = 0, { length: n } = e || []; r < n; r++) {
        let { children: i } = e[r],
          { length: o } = i;
        if (o) for (let s = 0; s < o; s++) t.push(i[s]);
      }
      return t;
    }
    function cU(e = []) {
      let t = [],
        r = [];
      for (let n = 0, { length: i } = e; n < i; n++) {
        let { parentNode: o } = e[n];
        if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
          continue;
        r.push(o);
        let s = o.firstElementChild;
        for (; s != null; )
          e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
      }
      return t;
    }
    var lU = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[rs] && r[rs](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
    Pe.getClosestElement = lU;
    function fU(e) {
      return e != null && typeof e == "object"
        ? e instanceof Element
          ? $G
          : ZG
        : null;
    }
  });
  var ns = u((Kj, m_) => {
    var dU = pt(),
      __ = Object.create,
      pU = (function () {
        function e() {}
        return function (t) {
          if (!dU(t)) return {};
          if (__) return __(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    m_.exports = pU;
  });
  var Ti = u((zj, y_) => {
    function vU() {}
    y_.exports = vU;
  });
  var Oi = u((Yj, I_) => {
    var hU = ns(),
      gU = Ti();
    function bi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    bi.prototype = hU(gU.prototype);
    bi.prototype.constructor = bi;
    I_.exports = bi;
  });
  var w_ = u((Qj, O_) => {
    var T_ = tr(),
      EU = Br(),
      _U = Le(),
      b_ = T_ ? T_.isConcatSpreadable : void 0;
    function mU(e) {
      return _U(e) || EU(e) || !!(b_ && e && e[b_]);
    }
    O_.exports = mU;
  });
  var R_ = u(($j, S_) => {
    var yU = jn(),
      IU = w_();
    function A_(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = IU), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? A_(a, t - 1, r, n, i)
            : yU(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    S_.exports = A_;
  });
  var x_ = u((Zj, C_) => {
    var TU = R_();
    function bU(e) {
      var t = e == null ? 0 : e.length;
      return t ? TU(e, 1) : [];
    }
    C_.exports = bU;
  });
  var L_ = u((Jj, N_) => {
    function OU(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    N_.exports = OU;
  });
  var D_ = u((eK, P_) => {
    var wU = L_(),
      q_ = Math.max;
    function AU(e, t, r) {
      return (
        (t = q_(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = q_(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), wU(e, this, a);
        }
      );
    }
    P_.exports = AU;
  });
  var F_ = u((tK, M_) => {
    function SU(e) {
      return function () {
        return e;
      };
    }
    M_.exports = SU;
  });
  var X_ = u((rK, U_) => {
    var RU = F_(),
      G_ = Ja(),
      CU = ii(),
      xU = G_
        ? function (e, t) {
            return G_(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: RU(t),
              writable: !0,
            });
          }
        : CU;
    U_.exports = xU;
  });
  var W_ = u((nK, V_) => {
    var NU = 800,
      LU = 16,
      qU = Date.now;
    function PU(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = qU(),
          i = LU - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= NU) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    V_.exports = PU;
  });
  var B_ = u((iK, k_) => {
    var DU = X_(),
      MU = W_(),
      FU = MU(DU);
    k_.exports = FU;
  });
  var j_ = u((oK, H_) => {
    var GU = x_(),
      UU = D_(),
      XU = B_();
    function VU(e) {
      return XU(UU(e, void 0, GU), e + "");
    }
    H_.exports = VU;
  });
  var Y_ = u((aK, z_) => {
    var K_ = _a(),
      WU = K_ && new K_();
    z_.exports = WU;
  });
  var $_ = u((sK, Q_) => {
    function kU() {}
    Q_.exports = kU;
  });
  var is = u((uK, J_) => {
    var Z_ = Y_(),
      BU = $_(),
      HU = Z_
        ? function (e) {
            return Z_.get(e);
          }
        : BU;
    J_.exports = HU;
  });
  var tm = u((cK, em) => {
    var jU = {};
    em.exports = jU;
  });
  var os = u((lK, nm) => {
    var rm = tm(),
      KU = Object.prototype,
      zU = KU.hasOwnProperty;
    function YU(e) {
      for (
        var t = e.name + "", r = rm[t], n = zU.call(rm, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    nm.exports = YU;
  });
  var Ai = u((fK, im) => {
    var QU = ns(),
      $U = Ti(),
      ZU = 4294967295;
    function wi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = ZU),
        (this.__views__ = []);
    }
    wi.prototype = QU($U.prototype);
    wi.prototype.constructor = wi;
    im.exports = wi;
  });
  var am = u((dK, om) => {
    function JU(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    om.exports = JU;
  });
  var um = u((pK, sm) => {
    var eX = Ai(),
      tX = Oi(),
      rX = am();
    function nX(e) {
      if (e instanceof eX) return e.clone();
      var t = new tX(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = rX(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    sm.exports = nX;
  });
  var fm = u((vK, lm) => {
    var iX = Ai(),
      cm = Oi(),
      oX = Ti(),
      aX = Le(),
      sX = mt(),
      uX = um(),
      cX = Object.prototype,
      lX = cX.hasOwnProperty;
    function Si(e) {
      if (sX(e) && !aX(e) && !(e instanceof iX)) {
        if (e instanceof cm) return e;
        if (lX.call(e, "__wrapped__")) return uX(e);
      }
      return new cm(e);
    }
    Si.prototype = oX.prototype;
    Si.prototype.constructor = Si;
    lm.exports = Si;
  });
  var pm = u((hK, dm) => {
    var fX = Ai(),
      dX = is(),
      pX = os(),
      vX = fm();
    function hX(e) {
      var t = pX(e),
        r = vX[t];
      if (typeof r != "function" || !(t in fX.prototype)) return !1;
      if (e === r) return !0;
      var n = dX(r);
      return !!n && e === n[0];
    }
    dm.exports = hX;
  });
  var Em = u((gK, gm) => {
    var vm = Oi(),
      gX = j_(),
      EX = is(),
      as = os(),
      _X = Le(),
      hm = pm(),
      mX = "Expected a function",
      yX = 8,
      IX = 32,
      TX = 128,
      bX = 256;
    function OX(e) {
      return gX(function (t) {
        var r = t.length,
          n = r,
          i = vm.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(mX);
          if (i && !s && as(o) == "wrapper") var s = new vm([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = as(o),
            c = a == "wrapper" ? EX(o) : void 0;
          c &&
          hm(c[0]) &&
          c[1] == (TX | yX | IX | bX) &&
          !c[4].length &&
          c[9] == 1
            ? (s = s[as(c[0])].apply(s, c[3]))
            : (s = o.length == 1 && hm(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var d = arguments,
            g = d[0];
          if (s && d.length == 1 && _X(g)) return s.plant(g).value();
          for (var f = 0, y = r ? t[f].apply(this, d) : g; ++f < r; )
            y = t[f].call(this, y);
          return y;
        };
      });
    }
    gm.exports = OX;
  });
  var mm = u((EK, _m) => {
    var wX = Em(),
      AX = wX();
    _m.exports = AX;
  });
  var Im = u((_K, ym) => {
    function SX(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    ym.exports = SX;
  });
  var bm = u((mK, Tm) => {
    var RX = Im(),
      ss = oi();
    function CX(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ss(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ss(t)), (t = t === t ? t : 0)),
        RX(ss(e), t, r)
      );
    }
    Tm.exports = CX;
  });
  var Vm = u((Li) => {
    "use strict";
    var Ni = lt().default;
    Object.defineProperty(Li, "__esModule", { value: !0 });
    Li.default = void 0;
    var ze = Ni(Ur()),
      xX = Ni(mm()),
      NX = Ni(ni()),
      LX = Ni(bm()),
      jt = Be(),
      us = ds(),
      Ri = Ii(),
      qX = Ht(),
      {
        MOUSE_CLICK: PX,
        MOUSE_SECOND_CLICK: DX,
        MOUSE_DOWN: MX,
        MOUSE_UP: FX,
        MOUSE_OVER: GX,
        MOUSE_OUT: UX,
        DROPDOWN_CLOSE: XX,
        DROPDOWN_OPEN: VX,
        SLIDER_ACTIVE: WX,
        SLIDER_INACTIVE: kX,
        TAB_ACTIVE: BX,
        TAB_INACTIVE: HX,
        NAVBAR_CLOSE: jX,
        NAVBAR_OPEN: KX,
        MOUSE_MOVE: zX,
        PAGE_SCROLL_DOWN: Lm,
        SCROLL_INTO_VIEW: qm,
        SCROLL_OUT_OF_VIEW: YX,
        PAGE_SCROLL_UP: QX,
        SCROLLING_IN_VIEW: $X,
        PAGE_FINISH: Pm,
        ECOMMERCE_CART_CLOSE: ZX,
        ECOMMERCE_CART_OPEN: JX,
        PAGE_START: Dm,
        PAGE_SCROLL: eV,
      } = jt.EventTypeConsts,
      cs = "COMPONENT_ACTIVE",
      Mm = "COMPONENT_INACTIVE",
      { COLON_DELIMITER: Om } = jt.IX2EngineConstants,
      { getNamespacedParameterId: wm } = qX.IX2VanillaUtils,
      Fm = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
      un = Fm(({ element: e, nativeEvent: t }) => e === t.target),
      tV = Fm(({ element: e, nativeEvent: t }) => e.contains(t.target)),
      Et = (0, xX.default)([un, tV]),
      Gm = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            i = n[t];
          if (i && !nV[i.eventTypeId]) return i;
        }
        return null;
      },
      rV = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!Gm(e, n);
      },
      je = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
        let { action: o, id: s } = t,
          { actionListId: a, autoStopEventId: c } = o.config,
          d = Gm(e, c);
        return (
          d &&
            (0, us.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: r,
              eventStateKey: c + Om + n.split(Om)[1],
              actionListId: (0, NX.default)(d, "action.config.actionListId"),
            }),
          (0, us.stopActionGroup)({
            store: e,
            eventId: s,
            eventTarget: r,
            eventStateKey: n,
            actionListId: a,
          }),
          (0, us.startActionGroup)({
            store: e,
            eventId: s,
            eventTarget: r,
            eventStateKey: n,
            actionListId: a,
          }),
          i
        );
      },
      nt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
      cn = { handler: nt(Et, je) },
      Um = (0, ze.default)({}, cn, { types: [cs, Mm].join(" ") }),
      ls = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ],
      Am = "mouseover mouseout",
      fs = { types: ls },
      nV = { PAGE_START: Dm, PAGE_FINISH: Pm },
      sn = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, LX.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })(),
      iV = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        ),
      oV = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: i } = t,
          o = e.contains(n);
        if (r === "mouseover" && o) return !0;
        let s = e.contains(i);
        return !!(r === "mouseout" && o && s);
      },
      aV = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: i } = sn(),
          o = r.scrollOffsetValue,
          c = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
        return iV(t.getBoundingClientRect(), {
          left: 0,
          top: c,
          right: n,
          bottom: i - c,
        });
      },
      Xm = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          i = [cs, Mm].indexOf(n) !== -1 ? n === cs : r.isActive,
          o = (0, ze.default)({}, r, { isActive: i });
        return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
      },
      Sm = (e) => (t, r) => {
        let n = { elementHovered: oV(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      },
      sV = (e) => (t, r) => {
        let n = (0, ze.default)({}, r, { elementVisible: aV(t) });
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      },
      Rm =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = sn(),
            {
              event: { config: s, eventTypeId: a },
            } = t,
            { scrollOffsetValue: c, scrollOffsetUnit: d } = s,
            g = d === "PX",
            f = i - o,
            y = Number((n / f).toFixed(2));
          if (r && r.percentTop === y) return r;
          let v = (g ? c : (o * (c || 0)) / 100) / f,
            E,
            b,
            C = 0;
          r &&
            ((E = y > r.percentTop),
            (b = r.scrollingDown !== E),
            (C = b ? y : r.anchorTop));
          let w = a === Lm ? y >= C + v : y <= C - v,
            x = (0, ze.default)({}, r, {
              percentTop: y,
              inBounds: w,
              anchorTop: C,
              scrollingDown: E,
            });
          return (r && w && (b || x.inBounds !== r.inBounds) && e(t, x)) || x;
        },
      uV = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom,
      cV = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      },
      lV = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      },
      Cm =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        },
      Ci = (e = !0) =>
        (0, ze.default)({}, Um, {
          handler: nt(
            e ? Et : un,
            Xm((t, r) => (r.isActive ? cn.handler(t, r) : r))
          ),
        }),
      xi = (e = !0) =>
        (0, ze.default)({}, Um, {
          handler: nt(
            e ? Et : un,
            Xm((t, r) => (r.isActive ? r : cn.handler(t, r)))
          ),
        }),
      xm = (0, ze.default)({}, fs, {
        handler: sV((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: i } = e,
            { ixData: o } = i.getState(),
            { events: s } = o;
          return !s[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === qm) === r
            ? (je(e), (0, ze.default)({}, t, { triggered: !0 }))
            : t;
        }),
      }),
      Nm = 0.05,
      fV = {
        [WX]: Ci(),
        [kX]: xi(),
        [VX]: Ci(),
        [XX]: xi(),
        [KX]: Ci(!1),
        [jX]: xi(!1),
        [BX]: Ci(),
        [HX]: xi(),
        [JX]: { types: "ecommerce-cart-open", handler: nt(Et, je) },
        [ZX]: { types: "ecommerce-cart-close", handler: nt(Et, je) },
        [PX]: {
          types: "click",
          handler: nt(
            Et,
            Cm((e, { clickCount: t }) => {
              rV(e) ? t === 1 && je(e) : je(e);
            })
          ),
        },
        [DX]: {
          types: "click",
          handler: nt(
            Et,
            Cm((e, { clickCount: t }) => {
              t === 2 && je(e);
            })
          ),
        },
        [MX]: (0, ze.default)({}, cn, { types: "mousedown" }),
        [FX]: (0, ze.default)({}, cn, { types: "mouseup" }),
        [GX]: {
          types: Am,
          handler: nt(
            Et,
            Sm((e, t) => {
              t.elementHovered && je(e);
            })
          ),
        },
        [UX]: {
          types: Am,
          handler: nt(
            Et,
            Sm((e, t) => {
              t.elementHovered || je(e);
            })
          ),
        },
        [zX]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: i,
            },
            o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: s,
                selectedAxis: a,
                continuousParameterGroupId: c,
                reverse: d,
                restingState: g = 0,
              } = r,
              {
                clientX: f = o.clientX,
                clientY: y = o.clientY,
                pageX: v = o.pageX,
                pageY: E = o.pageY,
              } = n,
              b = a === "X_AXIS",
              C = n.type === "mouseout",
              w = g / 100,
              x = c,
              A = !1;
            switch (s) {
              case jt.EventBasedOn.VIEWPORT: {
                w = b
                  ? Math.min(f, window.innerWidth) / window.innerWidth
                  : Math.min(y, window.innerHeight) / window.innerHeight;
                break;
              }
              case jt.EventBasedOn.PAGE: {
                let {
                  scrollLeft: D,
                  scrollTop: M,
                  scrollWidth: U,
                  scrollHeight: H,
                } = sn();
                w = b ? Math.min(D + v, U) / U : Math.min(M + E, H) / H;
                break;
              }
              case jt.EventBasedOn.ELEMENT:
              default: {
                x = wm(i, c);
                let D = n.type.indexOf("mouse") === 0;
                if (D && Et({ element: t, nativeEvent: n }) !== !0) break;
                let M = t.getBoundingClientRect(),
                  { left: U, top: H, width: Q, height: te } = M;
                if (!D && !uV({ left: f, top: y }, M)) break;
                (A = !0), (w = b ? (f - U) / Q : (y - H) / te);
                break;
              }
            }
            return (
              C && (w > 1 - Nm || w < Nm) && (w = Math.round(w)),
              (s !== jt.EventBasedOn.ELEMENT || A || A !== o.elementHovered) &&
                ((w = d ? 1 - w : w),
                e.dispatch((0, Ri.parameterChanged)(x, w))),
              { elementHovered: A, clientX: f, clientY: y, pageX: v, pageY: E }
            );
          },
        },
        [eV]: {
          types: ls,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: i, scrollHeight: o, clientHeight: s } = sn(),
              a = i / (o - s);
            (a = n ? 1 - a : a), e.dispatch((0, Ri.parameterChanged)(r, a));
          },
        },
        [$X]: {
          types: ls,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            i = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: o,
                scrollTop: s,
                scrollWidth: a,
                scrollHeight: c,
                clientHeight: d,
              } = sn(),
              {
                basedOn: g,
                selectedAxis: f,
                continuousParameterGroupId: y,
                startsEntering: v,
                startsExiting: E,
                addEndOffset: b,
                addStartOffset: C,
                addOffsetValue: w = 0,
                endOffsetValue: x = 0,
              } = r,
              A = f === "X_AXIS";
            if (g === jt.EventBasedOn.VIEWPORT) {
              let D = A ? o / a : s / c;
              return (
                D !== i.scrollPercent &&
                  t.dispatch((0, Ri.parameterChanged)(y, D)),
                { scrollPercent: D }
              );
            } else {
              let D = wm(n, y),
                M = e.getBoundingClientRect(),
                U = (C ? w : 0) / 100,
                H = (b ? x : 0) / 100;
              (U = v ? U : 1 - U), (H = E ? H : 1 - H);
              let Q = M.top + Math.min(M.height * U, d),
                oe = M.top + M.height * H - Q,
                B = Math.min(d + oe, c),
                h = Math.min(Math.max(0, d - Q), B) / B;
              return (
                h !== i.scrollPercent &&
                  t.dispatch((0, Ri.parameterChanged)(D, h)),
                { scrollPercent: h }
              );
            }
          },
        },
        [qm]: xm,
        [YX]: xm,
        [Lm]: (0, ze.default)({}, fs, {
          handler: Rm((e, t) => {
            t.scrollingDown && je(e);
          }),
        }),
        [QX]: (0, ze.default)({}, fs, {
          handler: Rm((e, t) => {
            t.scrollingDown || je(e);
          }),
        }),
        [Pm]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: nt(un, cV(je)),
        },
        [Dm]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: nt(un, lV(je)),
        },
      };
    Li.default = fV;
  });
  var ds = u((Lt) => {
    "use strict";
    var ot = lt().default,
      dV = $t().default;
    Object.defineProperty(Lt, "__esModule", { value: !0 });
    Lt.observeRequests = VV;
    Lt.startActionGroup = ms;
    Lt.startEngine = Mi;
    Lt.stopActionGroup = _s;
    Lt.stopAllActionGroups = Qm;
    Lt.stopEngine = Fi;
    var pV = ot(Ur()),
      vV = ot(iE()),
      hV = ot(Pa()),
      Nt = ot(ni()),
      gV = ot(bE()),
      EV = ot(YE()),
      _V = ot($E()),
      mV = ot(JE()),
      ln = ot(o_()),
      yV = ot(d_()),
      it = Be(),
      Bm = Ht(),
      we = Ii(),
      Ce = dV(E_()),
      IV = ot(Vm()),
      TV = ["store", "computedStyle"],
      bV = Object.keys(it.QuickEffectIds),
      ps = (e) => bV.includes(e),
      {
        COLON_DELIMITER: vs,
        BOUNDARY_SELECTOR: qi,
        HTML_ELEMENT: Hm,
        RENDER_GENERAL: OV,
        W_MOD_IX: Wm,
      } = it.IX2EngineConstants,
      {
        getAffectedElements: Pi,
        getElementId: wV,
        getDestinationValues: hs,
        observeStore: Kt,
        getInstanceId: AV,
        renderHTMLElement: SV,
        clearAllStyles: jm,
        getMaxDurationItemIndex: RV,
        getComputedStyle: CV,
        getInstanceOrigin: xV,
        reduceListToGroup: NV,
        shouldNamespaceEventParameter: LV,
        getNamespacedParameterId: qV,
        shouldAllowMediaQuery: Di,
        cleanupHTMLElement: PV,
        stringifyTarget: DV,
        mediaQueriesEqual: MV,
        shallowEqual: FV,
      } = Bm.IX2VanillaUtils,
      {
        isPluginType: gs,
        createPluginInstance: Es,
        getPluginDuration: GV,
      } = Bm.IX2VanillaPlugins,
      km = navigator.userAgent,
      UV = km.match(/iPad/i) || km.match(/iPhone/),
      XV = 12;
    function VV(e) {
      Kt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: BV }),
        Kt({
          store: e,
          select: ({ ixRequest: t }) => t.playback,
          onChange: HV,
        }),
        Kt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: jV }),
        Kt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: KV });
    }
    function WV(e) {
      Kt({
        store: e,
        select: ({ ixSession: t }) => t.mediaQueryKey,
        onChange: () => {
          Fi(e),
            jm({ store: e, elementApi: Ce }),
            Mi({ store: e, allowEvents: !0 }),
            Km();
        },
      });
    }
    function kV(e, t) {
      let r = Kt({
        store: e,
        select: ({ ixSession: n }) => n.tick,
        onChange: (n) => {
          t(n), r();
        },
      });
    }
    function BV({ rawData: e, defer: t }, r) {
      let n = () => {
        Mi({ store: r, rawData: e, allowEvents: !0 }), Km();
      };
      t ? setTimeout(n, 0) : n();
    }
    function Km() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function HV(e, t) {
      let {
          actionTypeId: r,
          actionListId: n,
          actionItemId: i,
          eventId: o,
          allowEvents: s,
          immediate: a,
          testManual: c,
          verbose: d = !0,
        } = e,
        { rawData: g } = e;
      if (n && i && g && a) {
        let f = g.actionLists[n];
        f && (g = NV({ actionList: f, actionItemId: i, rawData: g }));
      }
      if (
        (Mi({ store: t, rawData: g, allowEvents: s, testManual: c }),
        (n && r === it.ActionTypeConsts.GENERAL_START_ACTION) || ps(r))
      ) {
        _s({ store: t, actionListId: n }),
          Ym({ store: t, actionListId: n, eventId: o });
        let f = ms({
          store: t,
          eventId: o,
          actionListId: n,
          immediate: a,
          verbose: d,
        });
        d &&
          f &&
          t.dispatch(
            (0, we.actionListPlaybackChanged)({
              actionListId: n,
              isPlaying: !a,
            })
          );
      }
    }
    function jV({ actionListId: e }, t) {
      e ? _s({ store: t, actionListId: e }) : Qm({ store: t }), Fi(t);
    }
    function KV(e, t) {
      Fi(t), jm({ store: t, elementApi: Ce });
    }
    function Mi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
      let { ixSession: i } = e.getState();
      t && e.dispatch((0, we.rawDataImported)(t)),
        i.active ||
          (e.dispatch(
            (0, we.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(qi),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          r &&
            (JV(e),
            zV(),
            e.getState().ixSession.hasDefinedMediaQueries && WV(e)),
          e.dispatch((0, we.sessionStarted)()),
          YV(e, n));
    }
    function zV() {
      let { documentElement: e } = document;
      e.className.indexOf(Wm) === -1 && (e.className += ` ${Wm}`);
    }
    function YV(e, t) {
      let r = (n) => {
        let { ixSession: i, ixParameters: o } = e.getState();
        i.active &&
          (e.dispatch((0, we.animationFrameChanged)(n, o)),
          t ? kV(e, r) : requestAnimationFrame(r));
      };
      r(window.performance.now());
    }
    function Fi(e) {
      let { ixSession: t } = e.getState();
      if (t.active) {
        let { eventListeners: r } = t;
        r.forEach(QV), e.dispatch((0, we.sessionStopped)());
      }
    }
    function QV({ target: e, listenerParams: t }) {
      e.removeEventListener.apply(e, t);
    }
    function $V({
      store: e,
      eventStateKey: t,
      eventTarget: r,
      eventId: n,
      eventConfig: i,
      actionListId: o,
      parameterGroup: s,
      smoothing: a,
      restingValue: c,
    }) {
      let { ixData: d, ixSession: g } = e.getState(),
        { events: f } = d,
        y = f[n],
        { eventTypeId: v } = y,
        E = {},
        b = {},
        C = [],
        { continuousActionGroups: w } = s,
        { id: x } = s;
      LV(v, i) && (x = qV(t, x));
      let A = g.hasBoundaryNodes && r ? Ce.getClosestElement(r, qi) : null;
      w.forEach((D) => {
        let { keyframe: M, actionItems: U } = D;
        U.forEach((H) => {
          let { actionTypeId: Q } = H,
            { target: te } = H.config;
          if (!te) return;
          let oe = te.boundaryMode ? A : null,
            B = DV(te) + vs + Q;
          if (((b[B] = ZV(b[B], M, H)), !E[B])) {
            E[B] = !0;
            let { config: N } = H;
            Pi({
              config: N,
              event: y,
              eventTarget: r,
              elementRoot: oe,
              elementApi: Ce,
            }).forEach((h) => {
              C.push({ element: h, key: B });
            });
          }
        });
      }),
        C.forEach(({ element: D, key: M }) => {
          let U = b[M],
            H = (0, Nt.default)(U, "[0].actionItems[0]", {}),
            { actionTypeId: Q } = H,
            te = gs(Q) ? Es(Q)(D, H) : null,
            oe = hs({ element: D, actionItem: H, elementApi: Ce }, te);
          ys({
            store: e,
            element: D,
            eventId: n,
            actionListId: o,
            actionItem: H,
            destination: oe,
            continuous: !0,
            parameterId: x,
            actionGroups: U,
            smoothing: a,
            restingValue: c,
            pluginInstance: te,
          });
        });
    }
    function ZV(e = [], t, r) {
      let n = [...e],
        i;
      return (
        n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
        i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
        n[i].actionItems.push(r),
        n
      );
    }
    function JV(e) {
      let { ixData: t } = e.getState(),
        { eventTypeMap: r } = t;
      zm(e),
        (0, ln.default)(r, (i, o) => {
          let s = IV.default[o];
          if (!s) {
            console.warn(`IX2 event type not configured: ${o}`);
            return;
          }
          oW({ logic: s, store: e, events: i });
        });
      let { ixSession: n } = e.getState();
      n.eventListeners.length && tW(e);
    }
    var eW = ["resize", "orientationchange"];
    function tW(e) {
      let t = () => {
        zm(e);
      };
      eW.forEach((r) => {
        window.addEventListener(r, t),
          e.dispatch((0, we.eventListenerAdded)(window, [r, t]));
      }),
        t();
    }
    function zm(e) {
      let { ixSession: t, ixData: r } = e.getState(),
        n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let { mediaQueries: i } = r;
        e.dispatch((0, we.viewportWidthChanged)({ width: n, mediaQueries: i }));
      }
    }
    var rW = (e, t) => (0, EV.default)((0, mV.default)(e, t), _V.default),
      nW = (e, t) => {
        (0, ln.default)(e, (r, n) => {
          r.forEach((i, o) => {
            let s = n + vs + o;
            t(i, n, s);
          });
        });
      },
      iW = (e) => {
        let t = { target: e.target, targets: e.targets };
        return Pi({ config: t, elementApi: Ce });
      };
    function oW({ logic: e, store: t, events: r }) {
      aW(r);
      let { types: n, handler: i } = e,
        { ixData: o } = t.getState(),
        { actionLists: s } = o,
        a = rW(r, iW);
      if (!(0, gV.default)(a)) return;
      (0, ln.default)(a, (f, y) => {
        let v = r[y],
          { action: E, id: b, mediaQueries: C = o.mediaQueryKeys } = v,
          { actionListId: w } = E.config;
        MV(C, o.mediaQueryKeys) || t.dispatch((0, we.mediaQueriesDefined)()),
          E.actionTypeId === it.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
            (Array.isArray(v.config) ? v.config : [v.config]).forEach((A) => {
              let { continuousParameterGroupId: D } = A,
                M = (0, Nt.default)(s, `${w}.continuousParameterGroups`, []),
                U = (0, hV.default)(M, ({ id: te }) => te === D),
                H = (A.smoothing || 0) / 100,
                Q = (A.restingState || 0) / 100;
              U &&
                f.forEach((te, oe) => {
                  let B = b + vs + oe;
                  $V({
                    store: t,
                    eventStateKey: B,
                    eventTarget: te,
                    eventId: b,
                    eventConfig: A,
                    actionListId: w,
                    parameterGroup: U,
                    smoothing: H,
                    restingValue: Q,
                  });
                });
            }),
          (E.actionTypeId === it.ActionTypeConsts.GENERAL_START_ACTION ||
            ps(E.actionTypeId)) &&
            Ym({ store: t, actionListId: w, eventId: b });
      });
      let c = (f) => {
          let { ixSession: y } = t.getState();
          nW(a, (v, E, b) => {
            let C = r[E],
              w = y.eventState[b],
              { action: x, mediaQueries: A = o.mediaQueryKeys } = C;
            if (!Di(A, y.mediaQueryKey)) return;
            let D = (M = {}) => {
              let U = i(
                {
                  store: t,
                  element: v,
                  event: C,
                  eventConfig: M,
                  nativeEvent: f,
                  eventStateKey: b,
                },
                w
              );
              FV(U, w) || t.dispatch((0, we.eventStateChanged)(b, U));
            };
            x.actionTypeId === it.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
              ? (Array.isArray(C.config) ? C.config : [C.config]).forEach(D)
              : D();
          });
        },
        d = (0, yV.default)(c, XV),
        g = ({ target: f = document, types: y, throttle: v }) => {
          y.split(" ")
            .filter(Boolean)
            .forEach((E) => {
              let b = v ? d : c;
              f.addEventListener(E, b),
                t.dispatch((0, we.eventListenerAdded)(f, [E, b]));
            });
        };
      Array.isArray(n) ? n.forEach(g) : typeof n == "string" && g(e);
    }
    function aW(e) {
      if (!UV) return;
      let t = {},
        r = "";
      for (let n in e) {
        let { eventTypeId: i, target: o } = e[n],
          s = Ce.getQuerySelector(o);
        t[s] ||
          ((i === it.EventTypeConsts.MOUSE_CLICK ||
            i === it.EventTypeConsts.MOUSE_SECOND_CLICK) &&
            ((t[s] = !0),
            (r += s + "{cursor: pointer;touch-action: manipulation;}")));
      }
      if (r) {
        let n = document.createElement("style");
        (n.textContent = r), document.body.appendChild(n);
      }
    }
    function Ym({ store: e, actionListId: t, eventId: r }) {
      let { ixData: n, ixSession: i } = e.getState(),
        { actionLists: o, events: s } = n,
        a = s[r],
        c = o[t];
      if (c && c.useFirstGroupAsInitialState) {
        let d = (0, Nt.default)(c, "actionItemGroups[0].actionItems", []),
          g = (0, Nt.default)(a, "mediaQueries", n.mediaQueryKeys);
        if (!Di(g, i.mediaQueryKey)) return;
        d.forEach((f) => {
          var y;
          let { config: v, actionTypeId: E } = f,
            b =
              (v == null || (y = v.target) === null || y === void 0
                ? void 0
                : y.useEventTarget) === !0
                ? { target: a.target, targets: a.targets }
                : v,
            C = Pi({ config: b, event: a, elementApi: Ce }),
            w = gs(E);
          C.forEach((x) => {
            let A = w ? Es(E)(x, f) : null;
            ys({
              destination: hs({ element: x, actionItem: f, elementApi: Ce }, A),
              immediate: !0,
              store: e,
              element: x,
              eventId: r,
              actionItem: f,
              actionListId: t,
              pluginInstance: A,
            });
          });
        });
      }
    }
    function Qm({ store: e }) {
      let { ixInstances: t } = e.getState();
      (0, ln.default)(t, (r) => {
        if (!r.continuous) {
          let { actionListId: n, verbose: i } = r;
          Is(r, e),
            i &&
              e.dispatch(
                (0, we.actionListPlaybackChanged)({
                  actionListId: n,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function _s({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: i,
    }) {
      let { ixInstances: o, ixSession: s } = e.getState(),
        a = s.hasBoundaryNodes && r ? Ce.getClosestElement(r, qi) : null;
      (0, ln.default)(o, (c) => {
        let d = (0, Nt.default)(c, "actionItem.config.target.boundaryMode"),
          g = n ? c.eventStateKey === n : !0;
        if (c.actionListId === i && c.eventId === t && g) {
          if (a && d && !Ce.elementContains(a, c.element)) return;
          Is(c, e),
            c.verbose &&
              e.dispatch(
                (0, we.actionListPlaybackChanged)({
                  actionListId: i,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function ms({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: i,
      groupIndex: o = 0,
      immediate: s,
      verbose: a,
    }) {
      var c;
      let { ixData: d, ixSession: g } = e.getState(),
        { events: f } = d,
        y = f[t] || {},
        { mediaQueries: v = d.mediaQueryKeys } = y,
        E = (0, Nt.default)(d, `actionLists.${i}`, {}),
        { actionItemGroups: b, useFirstGroupAsInitialState: C } = E;
      if (!b || !b.length) return !1;
      o >= b.length && (0, Nt.default)(y, "config.loop") && (o = 0),
        o === 0 && C && o++;
      let x =
          (o === 0 || (o === 1 && C)) &&
          ps((c = y.action) === null || c === void 0 ? void 0 : c.actionTypeId)
            ? y.config.delay
            : void 0,
        A = (0, Nt.default)(b, [o, "actionItems"], []);
      if (!A.length || !Di(v, g.mediaQueryKey)) return !1;
      let D = g.hasBoundaryNodes && r ? Ce.getClosestElement(r, qi) : null,
        M = RV(A),
        U = !1;
      return (
        A.forEach((H, Q) => {
          let { config: te, actionTypeId: oe } = H,
            B = gs(oe),
            { target: N } = te;
          if (!N) return;
          let h = N.boundaryMode ? D : null;
          Pi({
            config: te,
            event: y,
            eventTarget: r,
            elementRoot: h,
            elementApi: Ce,
          }).forEach((L, X) => {
            let Z = B ? Es(oe)(L, H) : null,
              ie = B ? GV(oe)(L, H) : null;
            U = !0;
            let V = M === Q && X === 0,
              k = CV({ element: L, actionItem: H }),
              J = hs({ element: L, actionItem: H, elementApi: Ce }, Z);
            ys({
              store: e,
              element: L,
              actionItem: H,
              eventId: t,
              eventTarget: r,
              eventStateKey: n,
              actionListId: i,
              groupIndex: o,
              isCarrier: V,
              computedStyle: k,
              destination: J,
              immediate: s,
              verbose: a,
              pluginInstance: Z,
              pluginDuration: ie,
              instanceDelay: x,
            });
          });
        }),
        U
      );
    }
    function ys(e) {
      var t;
      let { store: r, computedStyle: n } = e,
        i = (0, vV.default)(e, TV),
        {
          element: o,
          actionItem: s,
          immediate: a,
          pluginInstance: c,
          continuous: d,
          restingValue: g,
          eventId: f,
        } = i,
        y = !d,
        v = AV(),
        { ixElements: E, ixSession: b, ixData: C } = r.getState(),
        w = wV(E, o),
        { refState: x } = E[w] || {},
        A = Ce.getRefType(o),
        D = b.reducedMotion && it.ReducedMotionTypes[s.actionTypeId],
        M;
      if (D && d)
        switch (
          (t = C.events[f]) === null || t === void 0 ? void 0 : t.eventTypeId
        ) {
          case it.EventTypeConsts.MOUSE_MOVE:
          case it.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
            M = g;
            break;
          default:
            M = 0.5;
            break;
        }
      let U = xV(o, x, n, s, Ce, c);
      if (
        (r.dispatch(
          (0, we.instanceAdded)(
            (0, pV.default)(
              {
                instanceId: v,
                elementId: w,
                origin: U,
                refType: A,
                skipMotion: D,
                skipToValue: M,
              },
              i
            )
          )
        ),
        $m(document.body, "ix2-animation-started", v),
        a)
      ) {
        sW(r, v);
        return;
      }
      Kt({ store: r, select: ({ ixInstances: H }) => H[v], onChange: Zm }),
        y && r.dispatch((0, we.instanceStarted)(v, b.tick));
    }
    function Is(e, t) {
      $m(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState(),
      });
      let { elementId: r, actionItem: n } = e,
        { ixElements: i } = t.getState(),
        { ref: o, refType: s } = i[r] || {};
      s === Hm && PV(o, n, Ce), t.dispatch((0, we.instanceRemoved)(e.id));
    }
    function $m(e, t, r) {
      let n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function sW(e, t) {
      let { ixParameters: r } = e.getState();
      e.dispatch((0, we.instanceStarted)(t, 0)),
        e.dispatch((0, we.animationFrameChanged)(performance.now(), r));
      let { ixInstances: n } = e.getState();
      Zm(n[t], e);
    }
    function Zm(e, t) {
      let {
          active: r,
          continuous: n,
          complete: i,
          elementId: o,
          actionItem: s,
          actionTypeId: a,
          renderType: c,
          current: d,
          groupIndex: g,
          eventId: f,
          eventTarget: y,
          eventStateKey: v,
          actionListId: E,
          isCarrier: b,
          styleProp: C,
          verbose: w,
          pluginInstance: x,
        } = e,
        { ixData: A, ixSession: D } = t.getState(),
        { events: M } = A,
        U = M[f] || {},
        { mediaQueries: H = A.mediaQueryKeys } = U;
      if (Di(H, D.mediaQueryKey) && (n || r || i)) {
        if (d || (c === OV && i)) {
          t.dispatch((0, we.elementStateChanged)(o, a, d, s));
          let { ixElements: Q } = t.getState(),
            { ref: te, refType: oe, refState: B } = Q[o] || {},
            N = B && B[a];
          switch (oe) {
            case Hm: {
              SV(te, B, N, f, s, C, Ce, c, x);
              break;
            }
          }
        }
        if (i) {
          if (b) {
            let Q = ms({
              store: t,
              eventId: f,
              eventTarget: y,
              eventStateKey: v,
              actionListId: E,
              groupIndex: g + 1,
              verbose: w,
            });
            w &&
              !Q &&
              t.dispatch(
                (0, we.actionListPlaybackChanged)({
                  actionListId: E,
                  isPlaying: !1,
                })
              );
          }
          Is(e, t);
        }
      }
    }
  });
  var ey = u((Tt) => {
    "use strict";
    var uW = $t().default,
      cW = lt().default;
    Object.defineProperty(Tt, "__esModule", { value: !0 });
    Tt.actions = void 0;
    Tt.destroy = Jm;
    Tt.init = vW;
    Tt.setEnv = pW;
    Tt.store = void 0;
    Vl();
    var lW = Jo(),
      fW = cW(nE()),
      Ts = ds(),
      dW = uW(Ii());
    Tt.actions = dW;
    var Gi = (0, lW.createStore)(fW.default);
    Tt.store = Gi;
    function pW(e) {
      e() && (0, Ts.observeRequests)(Gi);
    }
    function vW(e) {
      Jm(), (0, Ts.startEngine)({ store: Gi, rawData: e, allowEvents: !0 });
    }
    function Jm() {
      (0, Ts.stopEngine)(Gi);
    }
  });
  var iy = u((bK, ny) => {
    var ty = Ge(),
      ry = ey();
    ry.setEnv(ty.env);
    ty.define(
      "ix2",
      (ny.exports = function () {
        return ry;
      })
    );
  });
  var ay = u((OK, oy) => {
    var wr = Ge();
    wr.define(
      "links",
      (oy.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = wr.env(),
          s = window.location,
          a = document.createElement("a"),
          c = "w--current",
          d = /index\.(html|php)$/,
          g = /\/$/,
          f,
          y;
        r.ready = r.design = r.preview = v;
        function v() {
          (i = o && wr.env("design")),
            (y = wr.env("slug") || s.pathname || ""),
            wr.scroll.off(b),
            (f = []);
          for (var w = document.links, x = 0; x < w.length; ++x) E(w[x]);
          f.length && (wr.scroll.on(b), b());
        }
        function E(w) {
          var x =
            (i && w.getAttribute("href-disabled")) || w.getAttribute("href");
          if (((a.href = x), !(x.indexOf(":") >= 0))) {
            var A = e(w);
            if (
              a.hash.length > 1 &&
              a.host + a.pathname === s.host + s.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
              var D = e(a.hash);
              D.length && f.push({ link: A, sec: D, active: !1 });
              return;
            }
            if (!(x === "#" || x === "")) {
              var M = a.href === s.href || x === y || (d.test(x) && g.test(y));
              C(A, c, M);
            }
          }
        }
        function b() {
          var w = n.scrollTop(),
            x = n.height();
          t.each(f, function (A) {
            var D = A.link,
              M = A.sec,
              U = M.offset().top,
              H = M.outerHeight(),
              Q = x * 0.5,
              te = M.is(":visible") && U + H - Q >= w && U + Q <= w + x;
            A.active !== te && ((A.active = te), C(D, c, te));
          });
        }
        function C(w, x, A) {
          var D = w.hasClass(x);
          (A && D) || (!A && !D) || (A ? w.addClass(x) : w.removeClass(x));
        }
        return r;
      })
    );
  });
  var uy = u((wK, sy) => {
    var Ui = Ge();
    Ui.define(
      "scroll",
      (sy.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = E() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (N) {
              window.setTimeout(N, 15);
            },
          c = Ui.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            c +
            " > .header, " +
            c +
            " > .w-nav:not([data-no-scroll])",
          g = 'a[href="#"]',
          f = 'a[href*="#"]:not(.w-tab-link):not(' + g + ")",
          y = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          v = document.createElement("style");
        v.appendChild(document.createTextNode(y));
        function E() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var b = /^#[a-zA-Z0-9][\w:.-]*$/;
        function C(N) {
          return b.test(N.hash) && N.host + N.pathname === r.host + r.pathname;
        }
        let w =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function x() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            w.matches
          );
        }
        function A(N, h) {
          var F;
          switch (h) {
            case "add":
              (F = N.attr("tabindex")),
                F
                  ? N.attr("data-wf-tabindex-swap", F)
                  : N.attr("tabindex", "-1");
              break;
            case "remove":
              (F = N.attr("data-wf-tabindex-swap")),
                F
                  ? (N.attr("tabindex", F),
                    N.removeAttr("data-wf-tabindex-swap"))
                  : N.removeAttr("tabindex");
              break;
          }
          N.toggleClass("wf-force-outline-none", h === "add");
        }
        function D(N) {
          var h = N.currentTarget;
          if (
            !(
              Ui.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(h.className))
            )
          ) {
            var F = C(h) ? h.hash : "";
            if (F !== "") {
              var L = e(F);
              L.length &&
                (N && (N.preventDefault(), N.stopPropagation()),
                M(F, N),
                window.setTimeout(
                  function () {
                    U(L, function () {
                      A(L, "add"),
                        L.get(0).focus({ preventScroll: !0 }),
                        A(L, "remove");
                    });
                  },
                  N ? 0 : 300
                ));
            }
          }
        }
        function M(N) {
          if (
            r.hash !== N &&
            n &&
            n.pushState &&
            !(Ui.env.chrome && r.protocol === "file:")
          ) {
            var h = n.state && n.state.hash;
            h !== N && n.pushState({ hash: N }, "", N);
          }
        }
        function U(N, h) {
          var F = i.scrollTop(),
            L = H(N);
          if (F !== L) {
            var X = Q(N, F, L),
              Z = Date.now(),
              ie = function () {
                var V = Date.now() - Z;
                window.scroll(0, te(F, L, V, X)),
                  V <= X ? a(ie) : typeof h == "function" && h();
              };
            a(ie);
          }
        }
        function H(N) {
          var h = e(d),
            F = h.css("position") === "fixed" ? h.outerHeight() : 0,
            L = N.offset().top - F;
          if (N.data("scroll") === "mid") {
            var X = i.height() - F,
              Z = N.outerHeight();
            Z < X && (L -= Math.round((X - Z) / 2));
          }
          return L;
        }
        function Q(N, h, F) {
          if (x()) return 0;
          var L = 1;
          return (
            s.add(N).each(function (X, Z) {
              var ie = parseFloat(Z.getAttribute("data-scroll-time"));
              !isNaN(ie) && ie >= 0 && (L = ie);
            }),
            (472.143 * Math.log(Math.abs(h - F) + 125) - 2e3) * L
          );
        }
        function te(N, h, F, L) {
          return F > L ? h : N + (h - N) * oe(F / L);
        }
        function oe(N) {
          return N < 0.5
            ? 4 * N * N * N
            : (N - 1) * (2 * N - 2) * (2 * N - 2) + 1;
        }
        function B() {
          var { WF_CLICK_EMPTY: N, WF_CLICK_SCROLL: h } = t;
          o.on(h, f, D),
            o.on(N, g, function (F) {
              F.preventDefault();
            }),
            document.head.insertBefore(v, document.head.firstChild);
        }
        return { ready: B };
      })
    );
  });
  var ly = u((AK, cy) => {
    var hW = Ge();
    hW.define(
      "touch",
      (cy.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            c = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            g;
          o.addEventListener("touchstart", f, !1),
            o.addEventListener("touchmove", y, !1),
            o.addEventListener("touchend", v, !1),
            o.addEventListener("touchcancel", E, !1),
            o.addEventListener("mousedown", f, !1),
            o.addEventListener("mousemove", y, !1),
            o.addEventListener("mouseup", v, !1),
            o.addEventListener("mouseout", E, !1);
          function f(C) {
            var w = C.touches;
            (w && w.length > 1) ||
              ((s = !0),
              w ? ((a = !0), (d = w[0].clientX)) : (d = C.clientX),
              (g = d));
          }
          function y(C) {
            if (s) {
              if (a && C.type === "mousemove") {
                C.preventDefault(), C.stopPropagation();
                return;
              }
              var w = C.touches,
                x = w ? w[0].clientX : C.clientX,
                A = x - g;
              (g = x),
                Math.abs(A) > c &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", C, { direction: A > 0 ? "right" : "left" }), E());
            }
          }
          function v(C) {
            if (s && ((s = !1), a && C.type === "mouseup")) {
              C.preventDefault(), C.stopPropagation(), (a = !1);
              return;
            }
          }
          function E() {
            s = !1;
          }
          function b() {
            o.removeEventListener("touchstart", f, !1),
              o.removeEventListener("touchmove", y, !1),
              o.removeEventListener("touchend", v, !1),
              o.removeEventListener("touchcancel", E, !1),
              o.removeEventListener("mousedown", f, !1),
              o.removeEventListener("mousemove", y, !1),
              o.removeEventListener("mouseup", v, !1),
              o.removeEventListener("mouseout", E, !1),
              (o = null);
          }
          this.destroy = b;
        }
        function i(o, s, a) {
          var c = e.Event(o, { originalEvent: s });
          e(s.target).trigger(c, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var py = u((SK, dy) => {
    var zt = Ge(),
      gW = Sr(),
      at = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      fy = !0,
      EW = /^#[a-zA-Z0-9\-_]+$/;
    zt.define(
      "dropdown",
      (dy.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          i = zt.env(),
          o = !1,
          s,
          a = zt.env.touch,
          c = ".w-dropdown",
          d = "w--open",
          g = gW.triggers,
          f = 900,
          y = "focusout" + c,
          v = "keydown" + c,
          E = "mouseenter" + c,
          b = "mousemove" + c,
          C = "mouseleave" + c,
          w = (a ? "click" : "mouseup") + c,
          x = "w-close" + c,
          A = "setting" + c,
          D = e(document),
          M;
        (n.ready = U),
          (n.design = function () {
            o && h(), (o = !1), U();
          }),
          (n.preview = function () {
            (o = !0), U();
          });
        function U() {
          (s = i && zt.env("design")), (M = D.find(c)), M.each(H);
        }
        function H(p, W) {
          var j = e(W),
            R = e.data(W, c);
          R ||
            (R = e.data(W, c, {
              open: !1,
              el: j,
              config: {},
              selectedIdx: -1,
            })),
            (R.toggle = R.el.children(".w-dropdown-toggle")),
            (R.list = R.el.children(".w-dropdown-list")),
            (R.links = R.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (R.complete = X(R)),
            (R.mouseLeave = ie(R)),
            (R.mouseUpOutside = L(R)),
            (R.mouseMoveOutside = V(R)),
            Q(R);
          var ee = R.toggle.attr("id"),
            he = R.list.attr("id");
          ee || (ee = "w-dropdown-toggle-" + p),
            he || (he = "w-dropdown-list-" + p),
            R.toggle.attr("id", ee),
            R.toggle.attr("aria-controls", he),
            R.toggle.attr("aria-haspopup", "menu"),
            R.toggle.attr("aria-expanded", "false"),
            R.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            R.toggle.prop("tagName") !== "BUTTON" &&
              (R.toggle.attr("role", "button"),
              R.toggle.attr("tabindex") || R.toggle.attr("tabindex", "0")),
            R.list.attr("id", he),
            R.list.attr("aria-labelledby", ee),
            R.links.each(function (m, K) {
              K.hasAttribute("tabindex") || K.setAttribute("tabindex", "0"),
                EW.test(K.hash) && K.addEventListener("click", N.bind(null, R));
            }),
            R.el.off(c),
            R.toggle.off(c),
            R.nav && R.nav.off(c);
          var se = oe(R, fy);
          s && R.el.on(A, te(R)),
            s ||
              (i && ((R.hovering = !1), N(R)),
              R.config.hover && R.toggle.on(E, Z(R)),
              R.el.on(x, se),
              R.el.on(v, k(R)),
              R.el.on(y, I(R)),
              R.toggle.on(w, se),
              R.toggle.on(v, _(R)),
              (R.nav = R.el.closest(".w-nav")),
              R.nav.on(x, se));
        }
        function Q(p) {
          var W = Number(p.el.css("z-index"));
          (p.manageZ = W === f || W === f + 1),
            (p.config = {
              hover: p.el.attr("data-hover") === "true" && !a,
              delay: p.el.attr("data-delay"),
            });
        }
        function te(p) {
          return function (W, j) {
            (j = j || {}),
              Q(p),
              j.open === !0 && B(p, !0),
              j.open === !1 && N(p, { immediate: !0 });
          };
        }
        function oe(p, W) {
          return r(function (j) {
            if (p.open || (j && j.type === "w-close"))
              return N(p, { forceClose: W });
            B(p);
          });
        }
        function B(p) {
          if (!p.open) {
            F(p),
              (p.open = !0),
              p.list.addClass(d),
              p.toggle.addClass(d),
              p.toggle.attr("aria-expanded", "true"),
              g.intro(0, p.el[0]),
              zt.redraw.up(),
              p.manageZ && p.el.css("z-index", f + 1);
            var W = zt.env("editor");
            s || D.on(w, p.mouseUpOutside),
              p.hovering && !W && p.el.on(C, p.mouseLeave),
              p.hovering && W && D.on(b, p.mouseMoveOutside),
              window.clearTimeout(p.delayId);
          }
        }
        function N(p, { immediate: W, forceClose: j } = {}) {
          if (p.open && !(p.config.hover && p.hovering && !j)) {
            p.toggle.attr("aria-expanded", "false"), (p.open = !1);
            var R = p.config;
            if (
              (g.outro(0, p.el[0]),
              D.off(w, p.mouseUpOutside),
              D.off(b, p.mouseMoveOutside),
              p.el.off(C, p.mouseLeave),
              window.clearTimeout(p.delayId),
              !R.delay || W)
            )
              return p.complete();
            p.delayId = window.setTimeout(p.complete, R.delay);
          }
        }
        function h() {
          D.find(c).each(function (p, W) {
            e(W).triggerHandler(x);
          });
        }
        function F(p) {
          var W = p.el[0];
          M.each(function (j, R) {
            var ee = e(R);
            ee.is(W) || ee.has(W).length || ee.triggerHandler(x);
          });
        }
        function L(p) {
          return (
            p.mouseUpOutside && D.off(w, p.mouseUpOutside),
            r(function (W) {
              if (p.open) {
                var j = e(W.target);
                if (!j.closest(".w-dropdown-toggle").length) {
                  var R = e.inArray(p.el[0], j.parents(c)) === -1,
                    ee = zt.env("editor");
                  if (R) {
                    if (ee) {
                      var he =
                          j.parents().length === 1 &&
                          j.parents("svg").length === 1,
                        se = j.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (he || se) return;
                    }
                    N(p);
                  }
                }
              }
            })
          );
        }
        function X(p) {
          return function () {
            p.list.removeClass(d),
              p.toggle.removeClass(d),
              p.manageZ && p.el.css("z-index", "");
          };
        }
        function Z(p) {
          return function () {
            (p.hovering = !0), B(p);
          };
        }
        function ie(p) {
          return function () {
            (p.hovering = !1), p.links.is(":focus") || N(p);
          };
        }
        function V(p) {
          return r(function (W) {
            if (p.open) {
              var j = e(W.target),
                R = e.inArray(p.el[0], j.parents(c)) === -1;
              if (R) {
                var ee = j.parents(".w-editor-bem-EditorHoverControls").length,
                  he = j.parents(".w-editor-bem-RTToolbar").length,
                  se = e(".w-editor-bem-EditorOverlay"),
                  m =
                    se.find(".w-editor-edit-outline").length ||
                    se.find(".w-editor-bem-RTToolbar").length;
                if (ee || he || m) return;
                (p.hovering = !1), N(p);
              }
            }
          });
        }
        function k(p) {
          return function (W) {
            if (!(s || !p.open))
              switch (
                ((p.selectedIdx = p.links.index(document.activeElement)),
                W.keyCode)
              ) {
                case at.HOME:
                  return p.open
                    ? ((p.selectedIdx = 0), J(p), W.preventDefault())
                    : void 0;
                case at.END:
                  return p.open
                    ? ((p.selectedIdx = p.links.length - 1),
                      J(p),
                      W.preventDefault())
                    : void 0;
                case at.ESCAPE:
                  return N(p), p.toggle.focus(), W.stopPropagation();
                case at.ARROW_RIGHT:
                case at.ARROW_DOWN:
                  return (
                    (p.selectedIdx = Math.min(
                      p.links.length - 1,
                      p.selectedIdx + 1
                    )),
                    J(p),
                    W.preventDefault()
                  );
                case at.ARROW_LEFT:
                case at.ARROW_UP:
                  return (
                    (p.selectedIdx = Math.max(-1, p.selectedIdx - 1)),
                    J(p),
                    W.preventDefault()
                  );
              }
          };
        }
        function J(p) {
          p.links[p.selectedIdx] && p.links[p.selectedIdx].focus();
        }
        function _(p) {
          var W = oe(p, fy);
          return function (j) {
            if (!s) {
              if (!p.open)
                switch (j.keyCode) {
                  case at.ARROW_UP:
                  case at.ARROW_DOWN:
                    return j.stopPropagation();
                }
              switch (j.keyCode) {
                case at.SPACE:
                case at.ENTER:
                  return W(), j.stopPropagation(), j.preventDefault();
              }
            }
          };
        }
        function I(p) {
          return r(function (W) {
            var { relatedTarget: j, target: R } = W,
              ee = p.el[0],
              he = ee.contains(j) || ee.contains(R);
            return he || N(p), W.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var vy = u((bs) => {
    "use strict";
    Object.defineProperty(bs, "__esModule", { value: !0 });
    bs.default = _W;
    function _W(e, t, r, n, i, o, s, a, c, d, g, f, y) {
      return function (v) {
        e(v);
        var E = v.form,
          b = {
            name: E.attr("data-name") || E.attr("name") || "Untitled Form",
            pageId: E.attr("data-wf-page-id") || "",
            elementId: E.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              E.html()
            ),
            trackingCookies: n(),
          };
        let C = E.attr("data-wf-flow");
        C && (b.wfFlow = C), i(v);
        var w = o(E, b.fields);
        if (w) return s(w);
        if (((b.fileUploads = a(E)), c(v), !d)) {
          g(v);
          return;
        }
        f.ajax({
          url: y,
          type: "POST",
          data: b,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (x) {
            x && x.code === 200 && (v.success = !0), g(v);
          })
          .fail(function () {
            g(v);
          });
      };
    }
  });
  var gy = u((CK, hy) => {
    var Xi = Ge();
    Xi.define(
      "forms",
      (hy.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          c,
          d = /e(-)?mail/i,
          g = /^\S+@\S+$/,
          f = window.alert,
          y = Xi.env(),
          v,
          E,
          b,
          C = /list-manage[1-9]?.com/i,
          w = t.debounce(function () {
            f(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              x(), !y && !v && D();
            };
        function x() {
          (c = e("html").attr("data-wf-site")),
            (E = "https://webflow.com/api/v1/form/" + c),
            s &&
              E.indexOf("https://webflow.com") >= 0 &&
              (E = E.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (b = `${E}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(A);
        }
        function A(V, k) {
          var J = e(k),
            _ = e.data(k, a);
          _ || (_ = e.data(k, a, { form: J })), M(_);
          var I = J.closest("div.w-form");
          (_.done = I.find("> .w-form-done")),
            (_.fail = I.find("> .w-form-fail")),
            (_.fileUploads = I.find(".w-file-upload")),
            _.fileUploads.each(function (j) {
              X(j, _);
            });
          var p =
            _.form.attr("aria-label") || _.form.attr("data-name") || "Form";
          _.done.attr("aria-label") || _.form.attr("aria-label", p),
            _.done.attr("tabindex", "-1"),
            _.done.attr("role", "region"),
            _.done.attr("aria-label") ||
              _.done.attr("aria-label", p + " success"),
            _.fail.attr("tabindex", "-1"),
            _.fail.attr("role", "region"),
            _.fail.attr("aria-label") ||
              _.fail.attr("aria-label", p + " failure");
          var W = (_.action = J.attr("action"));
          if (
            ((_.handler = null),
            (_.redirect = J.attr("data-redirect")),
            C.test(W))
          ) {
            _.handler = h;
            return;
          }
          if (!W) {
            if (c) {
              _.handler = (() => {
                let j = vy().default;
                return j(M, o, Xi, oe, L, H, f, Q, U, c, F, e, E);
              })();
              return;
            }
            w();
          }
        }
        function D() {
          (v = !0),
            n.on("submit", a + " form", function (j) {
              var R = e.data(this, a);
              R.handler && ((R.evt = j), R.handler(R));
            });
          let V = ".w-checkbox-input",
            k = ".w-radio-input",
            J = "w--redirected-checked",
            _ = "w--redirected-focus",
            I = "w--redirected-focus-visible",
            p = ":focus-visible, [data-wf-focus-visible]",
            W = [
              ["checkbox", V],
              ["radio", k],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + V + ")",
            (j) => {
              e(j.target).siblings(V).toggleClass(J);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (j) => {
              e(`input[name="${j.target.name}"]:not(${V})`).map((ee, he) =>
                e(he).siblings(k).removeClass(J)
              );
              let R = e(j.target);
              R.hasClass("w-radio-input") || R.siblings(k).addClass(J);
            }),
            W.forEach(([j, R]) => {
              n.on(
                "focus",
                a + ` form input[type="${j}"]:not(` + R + ")",
                (ee) => {
                  e(ee.target).siblings(R).addClass(_),
                    e(ee.target).filter(p).siblings(R).addClass(I);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${j}"]:not(` + R + ")",
                  (ee) => {
                    e(ee.target).siblings(R).removeClass(`${_} ${I}`);
                  }
                );
            });
        }
        function M(V) {
          var k = (V.btn = V.form.find(':input[type="submit"]'));
          (V.wait = V.btn.attr("data-wait") || null),
            (V.success = !1),
            k.prop("disabled", !1),
            V.label && k.val(V.label);
        }
        function U(V) {
          var k = V.btn,
            J = V.wait;
          k.prop("disabled", !0), J && ((V.label = k.val()), k.val(J));
        }
        function H(V, k) {
          var J = null;
          return (
            (k = k || {}),
            V.find(':input:not([type="submit"]):not([type="file"])').each(
              function (_, I) {
                var p = e(I),
                  W = p.attr("type"),
                  j =
                    p.attr("data-name") || p.attr("name") || "Field " + (_ + 1),
                  R = p.val();
                if (W === "checkbox") R = p.is(":checked");
                else if (W === "radio") {
                  if (k[j] === null || typeof k[j] == "string") return;
                  R =
                    V.find(
                      'input[name="' + p.attr("name") + '"]:checked'
                    ).val() || null;
                }
                typeof R == "string" && (R = e.trim(R)),
                  (k[j] = R),
                  (J = J || B(p, W, j, R));
              }
            ),
            J
          );
        }
        function Q(V) {
          var k = {};
          return (
            V.find(':input[type="file"]').each(function (J, _) {
              var I = e(_),
                p = I.attr("data-name") || I.attr("name") || "File " + (J + 1),
                W = I.attr("data-value");
              typeof W == "string" && (W = e.trim(W)), (k[p] = W);
            }),
            k
          );
        }
        let te = { _mkto_trk: "marketo" };
        function oe() {
          return document.cookie.split("; ").reduce(function (k, J) {
            let _ = J.split("="),
              I = _[0];
            if (I in te) {
              let p = te[I],
                W = _.slice(1).join("=");
              k[p] = W;
            }
            return k;
          }, {});
        }
        function B(V, k, J, _) {
          var I = null;
          return (
            k === "password"
              ? (I = "Passwords cannot be submitted.")
              : V.attr("required")
              ? _
                ? d.test(V.attr("type")) &&
                  (g.test(_) ||
                    (I = "Please enter a valid email address for: " + J))
                : (I = "Please fill out the required field: " + J)
              : J === "g-recaptcha-response" &&
                !_ &&
                (I = "Please confirm you\u2019re not a robot."),
            I
          );
        }
        function N(V) {
          L(V), F(V);
        }
        function h(V) {
          M(V);
          var k = V.form,
            J = {};
          if (/^https/.test(o.href) && !/^https/.test(V.action)) {
            k.attr("method", "post");
            return;
          }
          L(V);
          var _ = H(k, J);
          if (_) return f(_);
          U(V);
          var I;
          t.each(J, function (R, ee) {
            d.test(ee) && (J.EMAIL = R),
              /^((full[ _-]?)?name)$/i.test(ee) && (I = R),
              /^(first[ _-]?name)$/i.test(ee) && (J.FNAME = R),
              /^(last[ _-]?name)$/i.test(ee) && (J.LNAME = R);
          }),
            I &&
              !J.FNAME &&
              ((I = I.split(" ")),
              (J.FNAME = I[0]),
              (J.LNAME = J.LNAME || I[1]));
          var p = V.action.replace("/post?", "/post-json?") + "&c=?",
            W = p.indexOf("u=") + 2;
          W = p.substring(W, p.indexOf("&", W));
          var j = p.indexOf("id=") + 3;
          (j = p.substring(j, p.indexOf("&", j))),
            (J["b_" + W + "_" + j] = ""),
            e
              .ajax({ url: p, data: J, dataType: "jsonp" })
              .done(function (R) {
                (V.success = R.result === "success" || /already/.test(R.msg)),
                  V.success || console.info("MailChimp error: " + R.msg),
                  F(V);
              })
              .fail(function () {
                F(V);
              });
        }
        function F(V) {
          var k = V.form,
            J = V.redirect,
            _ = V.success;
          if (_ && J) {
            Xi.location(J);
            return;
          }
          V.done.toggle(_),
            V.fail.toggle(!_),
            _ ? V.done.focus() : V.fail.focus(),
            k.toggle(!_),
            M(V);
        }
        function L(V) {
          V.evt && V.evt.preventDefault(), (V.evt = null);
        }
        function X(V, k) {
          if (!k.fileUploads || !k.fileUploads[V]) return;
          var J,
            _ = e(k.fileUploads[V]),
            I = _.find("> .w-file-upload-default"),
            p = _.find("> .w-file-upload-uploading"),
            W = _.find("> .w-file-upload-success"),
            j = _.find("> .w-file-upload-error"),
            R = I.find(".w-file-upload-input"),
            ee = I.find(".w-file-upload-label"),
            he = ee.children(),
            se = j.find(".w-file-upload-error-msg"),
            m = W.find(".w-file-upload-file"),
            K = W.find(".w-file-remove-link"),
            re = m.find(".w-file-upload-file-name"),
            Y = se.attr("data-w-size-error"),
            ge = se.attr("data-w-type-error"),
            Ye = se.attr("data-w-generic-error");
          if (
            (y ||
              ee.on("click keydown", function (O) {
                (O.type === "keydown" && O.which !== 13 && O.which !== 32) ||
                  (O.preventDefault(), R.click());
              }),
            ee.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            K.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            y)
          )
            R.on("click", function (O) {
              O.preventDefault();
            }),
              ee.on("click", function (O) {
                O.preventDefault();
              }),
              he.on("click", function (O) {
                O.preventDefault();
              });
          else {
            K.on("click keydown", function (O) {
              if (O.type === "keydown") {
                if (O.which !== 13 && O.which !== 32) return;
                O.preventDefault();
              }
              R.removeAttr("data-value"),
                R.val(""),
                re.html(""),
                I.toggle(!0),
                W.toggle(!1),
                ee.focus();
            }),
              R.on("change", function (O) {
                (J = O.target && O.target.files && O.target.files[0]),
                  J &&
                    (I.toggle(!1),
                    j.toggle(!1),
                    p.toggle(!0),
                    p.focus(),
                    re.text(J.name),
                    q() || U(k),
                    (k.fileUploads[V].uploading = !0),
                    Z(J, T));
              });
            var We = ee.outerHeight();
            R.height(We), R.width(1);
          }
          function l(O) {
            var P = O.responseJSON && O.responseJSON.msg,
              ne = Ye;
            typeof P == "string" && P.indexOf("InvalidFileTypeError") === 0
              ? (ne = ge)
              : typeof P == "string" &&
                P.indexOf("MaxFileSizeError") === 0 &&
                (ne = Y),
              se.text(ne),
              R.removeAttr("data-value"),
              R.val(""),
              p.toggle(!1),
              I.toggle(!0),
              j.toggle(!0),
              j.focus(),
              (k.fileUploads[V].uploading = !1),
              q() || M(k);
          }
          function T(O, P) {
            if (O) return l(O);
            var ne = P.fileName,
              ue = P.postData,
              me = P.fileId,
              z = P.s3Url;
            R.attr("data-value", me), ie(z, ue, J, ne, S);
          }
          function S(O) {
            if (O) return l(O);
            p.toggle(!1),
              W.css("display", "inline-block"),
              W.focus(),
              (k.fileUploads[V].uploading = !1),
              q() || M(k);
          }
          function q() {
            var O = (k.fileUploads && k.fileUploads.toArray()) || [];
            return O.some(function (P) {
              return P.uploading;
            });
          }
        }
        function Z(V, k) {
          var J = new URLSearchParams({ name: V.name, size: V.size });
          e.ajax({ type: "GET", url: `${b}?${J}`, crossDomain: !0 })
            .done(function (_) {
              k(null, _);
            })
            .fail(function (_) {
              k(_);
            });
        }
        function ie(V, k, J, _, I) {
          var p = new FormData();
          for (var W in k) p.append(W, k[W]);
          p.append("file", J, _),
            e
              .ajax({
                type: "POST",
                url: V,
                data: p,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                I(null);
              })
              .fail(function (j) {
                I(j);
              });
        }
        return r;
      })
    );
  });
  var my = u((xK, _y) => {
    var Os = Ge(),
      Ey = "w-condition-invisible",
      mW = "." + Ey;
    function yW(e) {
      return e.filter(function (t) {
        return !dn(t);
      });
    }
    function dn(e) {
      return !!(e.$el && e.$el.closest(mW).length);
    }
    function ws(e, t) {
      for (var r = e; r >= 0; r--) if (!dn(t[r])) return r;
      return -1;
    }
    function As(e, t) {
      for (var r = e; r <= t.length - 1; r++) if (!dn(t[r])) return r;
      return -1;
    }
    function IW(e, t) {
      return ws(e - 1, t) === -1;
    }
    function TW(e, t) {
      return As(e + 1, t) === -1;
    }
    function fn(e, t) {
      e.attr("aria-label") || e.attr("aria-label", t);
    }
    function bW(e, t, r, n) {
      var i = r.tram,
        o = Array.isArray,
        s = "w-lightbox",
        a = s + "-",
        c = /(^|\s+)/g,
        d = [],
        g,
        f,
        y,
        v = [];
      function E(_, I) {
        return (
          (d = o(_) ? _ : [_]),
          f || E.build(),
          yW(d).length > 1 &&
            ((f.items = f.empty),
            d.forEach(function (p, W) {
              var j = k("thumbnail"),
                R = k("item")
                  .prop("tabIndex", 0)
                  .attr("aria-controls", "w-lightbox-view")
                  .attr("role", "tab")
                  .append(j);
              fn(R, `show item ${W + 1} of ${d.length}`),
                dn(p) && R.addClass(Ey),
                (f.items = f.items.add(R)),
                oe(p.thumbnailUrl || p.url, function (ee) {
                  ee.prop("width") > ee.prop("height")
                    ? X(ee, "wide")
                    : X(ee, "tall"),
                    j.append(X(ee, "thumbnail-image"));
                });
            }),
            f.strip.empty().append(f.items),
            X(f.content, "group")),
          i(Z(f.lightbox, "hide").trigger("focus"))
            .add("opacity .3s")
            .start({ opacity: 1 }),
          X(f.html, "noscroll"),
          E.show(I || 0)
        );
      }
      (E.build = function () {
        return (
          E.destroy(),
          (f = { html: r(t.documentElement), empty: r() }),
          (f.arrowLeft = k("control left inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.arrowRight = k("control right inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.close = k("control close").attr("role", "button")),
          fn(f.arrowLeft, "previous image"),
          fn(f.arrowRight, "next image"),
          fn(f.close, "close lightbox"),
          (f.spinner = k("spinner")
            .attr("role", "progressbar")
            .attr("aria-live", "polite")
            .attr("aria-hidden", !1)
            .attr("aria-busy", !0)
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image")),
          (f.strip = k("strip").attr("role", "tablist")),
          (y = new h(f.spinner, F("hide"))),
          (f.content = k("content").append(
            f.spinner,
            f.arrowLeft,
            f.arrowRight,
            f.close
          )),
          (f.container = k("container").append(f.content, f.strip)),
          (f.lightbox = k("backdrop hide").append(f.container)),
          f.strip.on("click", L("item"), A),
          f.content
            .on("swipe", D)
            .on("click", L("left"), C)
            .on("click", L("right"), w)
            .on("click", L("close"), x)
            .on("click", L("image, caption"), w),
          f.container.on("click", L("view"), x).on("dragstart", L("img"), U),
          f.lightbox.on("keydown", H).on("focusin", M),
          r(n).append(f.lightbox),
          E
        );
      }),
        (E.destroy = function () {
          f && (Z(f.html, "noscroll"), f.lightbox.remove(), (f = void 0));
        }),
        (E.show = function (_) {
          if (_ !== g) {
            var I = d[_];
            if (!I) return E.hide();
            if (dn(I)) {
              if (_ < g) {
                var p = ws(_ - 1, d);
                _ = p > -1 ? p : _;
              } else {
                var W = As(_ + 1, d);
                _ = W > -1 ? W : _;
              }
              I = d[_];
            }
            var j = g;
            (g = _),
              f.spinner
                .attr("aria-hidden", !1)
                .attr("aria-busy", !0)
                .attr("aria-valuenow", 0)
                .attr("aria-valuetext", "Loading image"),
              y.show();
            var R = (I.html && J(I.width, I.height)) || I.url;
            return (
              oe(R, function (ee) {
                if (_ !== g) return;
                var he = k("figure", "figure").append(X(ee, "image")),
                  se = k("frame").append(he),
                  m = k("view")
                    .prop("tabIndex", 0)
                    .attr("id", "w-lightbox-view")
                    .append(se),
                  K,
                  re;
                I.html &&
                  ((K = r(I.html)),
                  (re = K.is("iframe")),
                  re && K.on("load", Y),
                  he.append(X(K, "embed"))),
                  I.caption &&
                    he.append(k("caption", "figcaption").text(I.caption)),
                  f.spinner.before(m),
                  re || Y();
                function Y() {
                  if (
                    (f.spinner
                      .attr("aria-hidden", !0)
                      .attr("aria-busy", !1)
                      .attr("aria-valuenow", 100)
                      .attr("aria-valuetext", "Loaded image"),
                    y.hide(),
                    _ !== g)
                  ) {
                    m.remove();
                    return;
                  }
                  let ge = IW(_, d);
                  ie(f.arrowLeft, "inactive", ge),
                    V(f.arrowLeft, ge),
                    ge && f.arrowLeft.is(":focus") && f.arrowRight.focus();
                  let Ye = TW(_, d);
                  if (
                    (ie(f.arrowRight, "inactive", Ye),
                    V(f.arrowRight, Ye),
                    Ye && f.arrowRight.is(":focus") && f.arrowLeft.focus(),
                    f.view
                      ? (i(f.view)
                          .add("opacity .3s")
                          .start({ opacity: 0 })
                          .then(B(f.view)),
                        i(m)
                          .add("opacity .3s")
                          .add("transform .3s")
                          .set({ x: _ > j ? "80px" : "-80px" })
                          .start({ opacity: 1, x: 0 }))
                      : m.css("opacity", 1),
                    (f.view = m),
                    f.view.prop("tabIndex", 0),
                    f.items)
                  ) {
                    Z(f.items, "active"), f.items.removeAttr("aria-selected");
                    var We = f.items.eq(_);
                    X(We, "active"), We.attr("aria-selected", !0), N(We);
                  }
                }
              }),
              f.close.prop("tabIndex", 0),
              r(":focus").addClass("active-lightbox"),
              v.length === 0 &&
                (r("body")
                  .children()
                  .each(function () {
                    r(this).hasClass("w-lightbox-backdrop") ||
                      r(this).is("script") ||
                      (v.push({
                        node: r(this),
                        hidden: r(this).attr("aria-hidden"),
                        tabIndex: r(this).attr("tabIndex"),
                      }),
                      r(this).attr("aria-hidden", !0).attr("tabIndex", -1));
                  }),
                f.close.focus()),
              E
            );
          }
        }),
        (E.hide = function () {
          return (
            i(f.lightbox).add("opacity .3s").start({ opacity: 0 }).then(te), E
          );
        }),
        (E.prev = function () {
          var _ = ws(g - 1, d);
          _ > -1 && E.show(_);
        }),
        (E.next = function () {
          var _ = As(g + 1, d);
          _ > -1 && E.show(_);
        });
      function b(_) {
        return function (I) {
          this === I.target && (I.stopPropagation(), I.preventDefault(), _());
        };
      }
      var C = b(E.prev),
        w = b(E.next),
        x = b(E.hide),
        A = function (_) {
          var I = r(this).index();
          _.preventDefault(), E.show(I);
        },
        D = function (_, I) {
          _.preventDefault(),
            I.direction === "left"
              ? E.next()
              : I.direction === "right" && E.prev();
        },
        M = function () {
          this.focus();
        };
      function U(_) {
        _.preventDefault();
      }
      function H(_) {
        var I = _.keyCode;
        I === 27 || Q(I, "close")
          ? E.hide()
          : I === 37 || Q(I, "left")
          ? E.prev()
          : I === 39 || Q(I, "right")
          ? E.next()
          : Q(I, "item") && r(":focus").click();
      }
      function Q(_, I) {
        if (_ !== 13 && _ !== 32) return !1;
        var p = r(":focus").attr("class"),
          W = F(I).trim();
        return p.includes(W);
      }
      function te() {
        f &&
          (f.strip.scrollLeft(0).empty(),
          Z(f.html, "noscroll"),
          X(f.lightbox, "hide"),
          f.view && f.view.remove(),
          Z(f.content, "group"),
          X(f.arrowLeft, "inactive"),
          X(f.arrowRight, "inactive"),
          (g = f.view = void 0),
          v.forEach(function (_) {
            var I = _.node;
            I &&
              (_.hidden
                ? I.attr("aria-hidden", _.hidden)
                : I.removeAttr("aria-hidden"),
              _.tabIndex
                ? I.attr("tabIndex", _.tabIndex)
                : I.removeAttr("tabIndex"));
          }),
          (v = []),
          r(".active-lightbox").removeClass("active-lightbox").focus());
      }
      function oe(_, I) {
        var p = k("img", "img");
        return (
          p.one("load", function () {
            I(p);
          }),
          p.attr("src", _),
          p
        );
      }
      function B(_) {
        return function () {
          _.remove();
        };
      }
      function N(_) {
        var I = _.get(0),
          p = f.strip.get(0),
          W = I.offsetLeft,
          j = I.clientWidth,
          R = p.scrollLeft,
          ee = p.clientWidth,
          he = p.scrollWidth - ee,
          se;
        W < R
          ? (se = Math.max(0, W + j - ee))
          : W + j > ee + R && (se = Math.min(W, he)),
          se != null &&
            i(f.strip).add("scroll-left 500ms").start({ "scroll-left": se });
      }
      function h(_, I, p) {
        (this.$element = _),
          (this.className = I),
          (this.delay = p || 200),
          this.hide();
      }
      (h.prototype.show = function () {
        var _ = this;
        _.timeoutId ||
          (_.timeoutId = setTimeout(function () {
            _.$element.removeClass(_.className), delete _.timeoutId;
          }, _.delay));
      }),
        (h.prototype.hide = function () {
          var _ = this;
          if (_.timeoutId) {
            clearTimeout(_.timeoutId), delete _.timeoutId;
            return;
          }
          _.$element.addClass(_.className);
        });
      function F(_, I) {
        return _.replace(c, (I ? " ." : " ") + a);
      }
      function L(_) {
        return F(_, !0);
      }
      function X(_, I) {
        return _.addClass(F(I));
      }
      function Z(_, I) {
        return _.removeClass(F(I));
      }
      function ie(_, I, p) {
        return _.toggleClass(F(I), p);
      }
      function V(_, I) {
        return _.attr("aria-hidden", I).attr("tabIndex", I ? -1 : 0);
      }
      function k(_, I) {
        return X(r(t.createElement(I || "div")), _);
      }
      function J(_, I) {
        var p =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          _ +
          '" height="' +
          I +
          '"/>';
        return "data:image/svg+xml;charset=utf-8," + encodeURI(p);
      }
      return (
        (function () {
          var _ = e.navigator.userAgent,
            I = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
            p = _.match(I),
            W = _.indexOf("Android ") > -1 && _.indexOf("Chrome") === -1;
          if (!W && (!p || p[2] > 7)) return;
          var j = t.createElement("style");
          t.head.appendChild(j), e.addEventListener("resize", R, !0);
          function R() {
            var ee = e.innerHeight,
              he = e.innerWidth,
              se =
                ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                ee +
                "px}.w-lightbox-view {width:" +
                he +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.86 * ee +
                "px}.w-lightbox-image {max-width:" +
                he +
                "px;max-height:" +
                ee +
                "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                0.86 * ee +
                "px}.w-lightbox-strip {padding: 0 " +
                0.01 * ee +
                "px}.w-lightbox-item {width:" +
                0.1 * ee +
                "px;padding:" +
                0.02 * ee +
                "px " +
                0.01 * ee +
                "px}.w-lightbox-thumbnail {height:" +
                0.1 * ee +
                "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                0.96 * ee +
                "px}.w-lightbox-content {margin-top:" +
                0.02 * ee +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.84 * ee +
                "px}.w-lightbox-image {max-width:" +
                0.96 * he +
                "px;max-height:" +
                0.96 * ee +
                "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                0.823 * he +
                "px;max-height:" +
                0.84 * ee +
                "px}}";
            j.textContent = se;
          }
          R();
        })(),
        E
      );
    }
    Os.define(
      "lightbox",
      (_y.exports = function (e) {
        var t = {},
          r = Os.env(),
          n = bW(window, document, e, r ? "#lightbox-mountpoint" : "body"),
          i = e(document),
          o,
          s,
          a = ".w-lightbox",
          c;
        t.ready = t.design = t.preview = d;
        function d() {
          (s = r && Os.env("design")),
            n.destroy(),
            (c = {}),
            (o = i.find(a)),
            o.webflowLightBox(),
            o.each(function () {
              fn(e(this), "open lightbox"),
                e(this).attr("aria-haspopup", "dialog");
            });
        }
        jQuery.fn.extend({
          webflowLightBox: function () {
            var v = this;
            e.each(v, function (E, b) {
              var C = e.data(b, a);
              C ||
                (C = e.data(b, a, {
                  el: e(b),
                  mode: "images",
                  images: [],
                  embed: "",
                })),
                C.el.off(a),
                g(C),
                s
                  ? C.el.on("setting" + a, g.bind(null, C))
                  : C.el.on("click" + a, f(C)).on("click" + a, function (w) {
                      w.preventDefault();
                    });
            });
          },
        });
        function g(v) {
          var E = v.el.children(".w-json").html(),
            b,
            C;
          if (!E) {
            v.items = [];
            return;
          }
          try {
            E = JSON.parse(E);
          } catch (w) {
            console.error("Malformed lightbox JSON configuration.", w);
          }
          y(E),
            E.items.forEach(function (w) {
              w.$el = v.el;
            }),
            (b = E.group),
            b
              ? ((C = c[b]),
                C || (C = c[b] = []),
                (v.items = C),
                E.items.length &&
                  ((v.index = C.length), C.push.apply(C, E.items)))
              : ((v.items = E.items), (v.index = 0));
        }
        function f(v) {
          return function () {
            v.items.length && n(v.items, v.index || 0);
          };
        }
        function y(v) {
          v.images &&
            (v.images.forEach(function (E) {
              E.type = "image";
            }),
            (v.items = v.images)),
            v.embed && ((v.embed.type = "video"), (v.items = [v.embed])),
            v.groupId && (v.group = v.groupId);
        }
        return t;
      })
    );
  });
  var Iy = u((NK, yy) => {
    var qt = Ge(),
      OW = Sr(),
      De = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    qt.define(
      "navbar",
      (yy.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          c,
          d,
          g,
          f = qt.env(),
          y = '<div class="w-nav-overlay" data-wf-ignore />',
          v = ".w-nav",
          E = "w--open",
          b = "w--nav-dropdown-open",
          C = "w--nav-dropdown-toggle-open",
          w = "w--nav-dropdown-list-open",
          x = "w--nav-link-open",
          A = OW.triggers,
          D = e();
        (r.ready = r.design = r.preview = M),
          (r.destroy = function () {
            (D = e()), U(), c && c.length && c.each(oe);
          });
        function M() {
          (d = f && qt.env("design")),
            (g = qt.env("editor")),
            (a = e(document.body)),
            (c = o.find(v)),
            c.length && (c.each(te), U(), H());
        }
        function U() {
          qt.resize.off(Q);
        }
        function H() {
          qt.resize.on(Q);
        }
        function Q() {
          c.each(I);
        }
        function te(m, K) {
          var re = e(K),
            Y = e.data(K, v);
          Y ||
            (Y = e.data(K, v, {
              open: !1,
              el: re,
              config: {},
              selectedIdx: -1,
            })),
            (Y.menu = re.find(".w-nav-menu")),
            (Y.links = Y.menu.find(".w-nav-link")),
            (Y.dropdowns = Y.menu.find(".w-dropdown")),
            (Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle")),
            (Y.dropdownList = Y.menu.find(".w-dropdown-list")),
            (Y.button = re.find(".w-nav-button")),
            (Y.container = re.find(".w-container")),
            (Y.overlayContainerId = "w-nav-overlay-" + m),
            (Y.outside = J(Y));
          var ge = re.find(".w-nav-brand");
          ge &&
            ge.attr("href") === "/" &&
            ge.attr("aria-label") == null &&
            ge.attr("aria-label", "home"),
            Y.button.attr("style", "-webkit-user-select: text;"),
            Y.button.attr("aria-label") == null &&
              Y.button.attr("aria-label", "menu"),
            Y.button.attr("role", "button"),
            Y.button.attr("tabindex", "0"),
            Y.button.attr("aria-controls", Y.overlayContainerId),
            Y.button.attr("aria-haspopup", "menu"),
            Y.button.attr("aria-expanded", "false"),
            Y.el.off(v),
            Y.button.off(v),
            Y.menu.off(v),
            h(Y),
            d
              ? (B(Y), Y.el.on("setting" + v, F(Y)))
              : (N(Y),
                Y.button.on("click" + v, V(Y)),
                Y.menu.on("click" + v, "a", k(Y)),
                Y.button.on("keydown" + v, L(Y)),
                Y.el.on("keydown" + v, X(Y))),
            I(m, K);
        }
        function oe(m, K) {
          var re = e.data(K, v);
          re && (B(re), e.removeData(K, v));
        }
        function B(m) {
          m.overlay && (se(m, !0), m.overlay.remove(), (m.overlay = null));
        }
        function N(m) {
          m.overlay ||
            ((m.overlay = e(y).appendTo(m.el)),
            m.overlay.attr("id", m.overlayContainerId),
            (m.parent = m.menu.parent()),
            se(m, !0));
        }
        function h(m) {
          var K = {},
            re = m.config || {},
            Y = (K.animation = m.el.attr("data-animation") || "default");
          (K.animOver = /^over/.test(Y)),
            (K.animDirect = /left$/.test(Y) ? -1 : 1),
            re.animation !== Y && m.open && t.defer(ie, m),
            (K.easing = m.el.attr("data-easing") || "ease"),
            (K.easing2 = m.el.attr("data-easing2") || "ease");
          var ge = m.el.attr("data-duration");
          (K.duration = ge != null ? Number(ge) : 400),
            (K.docHeight = m.el.attr("data-doc-height")),
            (m.config = K);
        }
        function F(m) {
          return function (K, re) {
            re = re || {};
            var Y = i.width();
            h(m),
              re.open === !0 && ee(m, !0),
              re.open === !1 && se(m, !0),
              m.open &&
                t.defer(function () {
                  Y !== i.width() && ie(m);
                });
          };
        }
        function L(m) {
          return function (K) {
            switch (K.keyCode) {
              case De.SPACE:
              case De.ENTER:
                return V(m)(), K.preventDefault(), K.stopPropagation();
              case De.ESCAPE:
                return se(m), K.preventDefault(), K.stopPropagation();
              case De.ARROW_RIGHT:
              case De.ARROW_DOWN:
              case De.HOME:
              case De.END:
                return m.open
                  ? (K.keyCode === De.END
                      ? (m.selectedIdx = m.links.length - 1)
                      : (m.selectedIdx = 0),
                    Z(m),
                    K.preventDefault(),
                    K.stopPropagation())
                  : (K.preventDefault(), K.stopPropagation());
            }
          };
        }
        function X(m) {
          return function (K) {
            if (m.open)
              switch (
                ((m.selectedIdx = m.links.index(document.activeElement)),
                K.keyCode)
              ) {
                case De.HOME:
                case De.END:
                  return (
                    K.keyCode === De.END
                      ? (m.selectedIdx = m.links.length - 1)
                      : (m.selectedIdx = 0),
                    Z(m),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
                case De.ESCAPE:
                  return (
                    se(m),
                    m.button.focus(),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
                case De.ARROW_LEFT:
                case De.ARROW_UP:
                  return (
                    (m.selectedIdx = Math.max(-1, m.selectedIdx - 1)),
                    Z(m),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
                case De.ARROW_RIGHT:
                case De.ARROW_DOWN:
                  return (
                    (m.selectedIdx = Math.min(
                      m.links.length - 1,
                      m.selectedIdx + 1
                    )),
                    Z(m),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
              }
          };
        }
        function Z(m) {
          if (m.links[m.selectedIdx]) {
            var K = m.links[m.selectedIdx];
            K.focus(), k(K);
          }
        }
        function ie(m) {
          m.open && (se(m, !0), ee(m, !0));
        }
        function V(m) {
          return s(function () {
            m.open ? se(m) : ee(m);
          });
        }
        function k(m) {
          return function (K) {
            var re = e(this),
              Y = re.attr("href");
            if (!qt.validClick(K.currentTarget)) {
              K.preventDefault();
              return;
            }
            Y && Y.indexOf("#") === 0 && m.open && se(m);
          };
        }
        function J(m) {
          return (
            m.outside && o.off("click" + v, m.outside),
            function (K) {
              var re = e(K.target);
              (g && re.closest(".w-editor-bem-EditorOverlay").length) ||
                _(m, re);
            }
          );
        }
        var _ = s(function (m, K) {
          if (m.open) {
            var re = K.closest(".w-nav-menu");
            m.menu.is(re) || se(m);
          }
        });
        function I(m, K) {
          var re = e.data(K, v),
            Y = (re.collapsed = re.button.css("display") !== "none");
          if ((re.open && !Y && !d && se(re, !0), re.container.length)) {
            var ge = W(re);
            re.links.each(ge), re.dropdowns.each(ge);
          }
          re.open && he(re);
        }
        var p = "max-width";
        function W(m) {
          var K = m.container.css(p);
          return (
            K === "none" && (K = ""),
            function (re, Y) {
              (Y = e(Y)), Y.css(p, ""), Y.css(p) === "none" && Y.css(p, K);
            }
          );
        }
        function j(m, K) {
          K.setAttribute("data-nav-menu-open", "");
        }
        function R(m, K) {
          K.removeAttribute("data-nav-menu-open");
        }
        function ee(m, K) {
          if (m.open) return;
          (m.open = !0),
            m.menu.each(j),
            m.links.addClass(x),
            m.dropdowns.addClass(b),
            m.dropdownToggle.addClass(C),
            m.dropdownList.addClass(w),
            m.button.addClass(E);
          var re = m.config,
            Y = re.animation;
          (Y === "none" || !n.support.transform || re.duration <= 0) &&
            (K = !0);
          var ge = he(m),
            Ye = m.menu.outerHeight(!0),
            We = m.menu.outerWidth(!0),
            l = m.el.height(),
            T = m.el[0];
          if (
            (I(0, T),
            A.intro(0, T),
            qt.redraw.up(),
            d || o.on("click" + v, m.outside),
            K)
          ) {
            O();
            return;
          }
          var S = "transform " + re.duration + "ms " + re.easing;
          if (
            (m.overlay &&
              ((D = m.menu.prev()), m.overlay.show().append(m.menu)),
            re.animOver)
          ) {
            n(m.menu)
              .add(S)
              .set({ x: re.animDirect * We, height: ge })
              .start({ x: 0 })
              .then(O),
              m.overlay && m.overlay.width(We);
            return;
          }
          var q = l + Ye;
          n(m.menu).add(S).set({ y: -q }).start({ y: 0 }).then(O);
          function O() {
            m.button.attr("aria-expanded", "true");
          }
        }
        function he(m) {
          var K = m.config,
            re = K.docHeight ? o.height() : a.height();
          return (
            K.animOver
              ? m.menu.height(re)
              : m.el.css("position") !== "fixed" &&
                (re -= m.el.outerHeight(!0)),
            m.overlay && m.overlay.height(re),
            re
          );
        }
        function se(m, K) {
          if (!m.open) return;
          (m.open = !1), m.button.removeClass(E);
          var re = m.config;
          if (
            ((re.animation === "none" ||
              !n.support.transform ||
              re.duration <= 0) &&
              (K = !0),
            A.outro(0, m.el[0]),
            o.off("click" + v, m.outside),
            K)
          ) {
            n(m.menu).stop(), T();
            return;
          }
          var Y = "transform " + re.duration + "ms " + re.easing2,
            ge = m.menu.outerHeight(!0),
            Ye = m.menu.outerWidth(!0),
            We = m.el.height();
          if (re.animOver) {
            n(m.menu)
              .add(Y)
              .start({ x: Ye * re.animDirect })
              .then(T);
            return;
          }
          var l = We + ge;
          n(m.menu).add(Y).start({ y: -l }).then(T);
          function T() {
            m.menu.height(""),
              n(m.menu).set({ x: 0, y: 0 }),
              m.menu.each(R),
              m.links.removeClass(x),
              m.dropdowns.removeClass(b),
              m.dropdownToggle.removeClass(C),
              m.dropdownList.removeClass(w),
              m.overlay &&
                m.overlay.children().length &&
                (D.length ? m.menu.insertAfter(D) : m.menu.prependTo(m.parent),
                m.overlay.attr("style", "").hide()),
              m.el.triggerHandler("w-close"),
              m.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var by = u((LK, Ty) => {
    var Pt = Ge(),
      wW = Sr();
    Pt.define(
      "tabs",
      (Ty.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          s = Pt.env,
          a = s.safari,
          c = s(),
          d = "data-w-tab",
          g = "data-w-pane",
          f = ".w-tabs",
          y = "w--current",
          v = "w--tab-active",
          E = wW.triggers,
          b = !1;
        (t.ready = t.design = t.preview = C),
          (t.redraw = function () {
            (b = !0), C(), (b = !1);
          }),
          (t.destroy = function () {
            (i = n.find(f)), i.length && (i.each(A), w());
          });
        function C() {
          (o = c && Pt.env("design")),
            (i = n.find(f)),
            i.length &&
              (i.each(D), Pt.env("preview") && !b && i.each(A), w(), x());
        }
        function w() {
          Pt.redraw.off(t.redraw);
        }
        function x() {
          Pt.redraw.on(t.redraw);
        }
        function A(B, N) {
          var h = e.data(N, f);
          h &&
            (h.links && h.links.each(E.reset),
            h.panes && h.panes.each(E.reset));
        }
        function D(B, N) {
          var h = f.substr(1) + "-" + B,
            F = e(N),
            L = e.data(N, f);
          if (
            (L || (L = e.data(N, f, { el: F, config: {} })),
            (L.current = null),
            (L.tabIdentifier = h + "-" + d),
            (L.paneIdentifier = h + "-" + g),
            (L.menu = F.children(".w-tab-menu")),
            (L.links = L.menu.children(".w-tab-link")),
            (L.content = F.children(".w-tab-content")),
            (L.panes = L.content.children(".w-tab-pane")),
            L.el.off(f),
            L.links.off(f),
            L.menu.attr("role", "tablist"),
            L.links.attr("tabindex", "-1"),
            M(L),
            !o)
          ) {
            L.links.on("click" + f, H(L)), L.links.on("keydown" + f, Q(L));
            var X = L.links.filter("." + y),
              Z = X.attr(d);
            Z && te(L, { tab: Z, immediate: !0 });
          }
        }
        function M(B) {
          var N = {};
          N.easing = B.el.attr("data-easing") || "ease";
          var h = parseInt(B.el.attr("data-duration-in"), 10);
          h = N.intro = h === h ? h : 0;
          var F = parseInt(B.el.attr("data-duration-out"), 10);
          (F = N.outro = F === F ? F : 0),
            (N.immediate = !h && !F),
            (B.config = N);
        }
        function U(B) {
          var N = B.current;
          return Array.prototype.findIndex.call(
            B.links,
            (h) => h.getAttribute(d) === N,
            null
          );
        }
        function H(B) {
          return function (N) {
            N.preventDefault();
            var h = N.currentTarget.getAttribute(d);
            h && te(B, { tab: h });
          };
        }
        function Q(B) {
          return function (N) {
            var h = U(B),
              F = N.key,
              L = {
                ArrowLeft: h - 1,
                ArrowUp: h - 1,
                ArrowRight: h + 1,
                ArrowDown: h + 1,
                End: B.links.length - 1,
                Home: 0,
              };
            if (F in L) {
              N.preventDefault();
              var X = L[F];
              X === -1 && (X = B.links.length - 1),
                X === B.links.length && (X = 0);
              var Z = B.links[X],
                ie = Z.getAttribute(d);
              ie && te(B, { tab: ie });
            }
          };
        }
        function te(B, N) {
          N = N || {};
          var h = B.config,
            F = h.easing,
            L = N.tab;
          if (L !== B.current) {
            B.current = L;
            var X;
            B.links.each(function (I, p) {
              var W = e(p);
              if (N.immediate || h.immediate) {
                var j = B.panes[I];
                p.id || (p.id = B.tabIdentifier + "-" + I),
                  j.id || (j.id = B.paneIdentifier + "-" + I),
                  (p.href = "#" + j.id),
                  p.setAttribute("role", "tab"),
                  p.setAttribute("aria-controls", j.id),
                  p.setAttribute("aria-selected", "false"),
                  j.setAttribute("role", "tabpanel"),
                  j.setAttribute("aria-labelledby", p.id);
              }
              p.getAttribute(d) === L
                ? ((X = p),
                  W.addClass(y)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(E.intro))
                : W.hasClass(y) &&
                  W.removeClass(y)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(E.outro);
            });
            var Z = [],
              ie = [];
            B.panes.each(function (I, p) {
              var W = e(p);
              p.getAttribute(d) === L ? Z.push(p) : W.hasClass(v) && ie.push(p);
            });
            var V = e(Z),
              k = e(ie);
            if (N.immediate || h.immediate) {
              V.addClass(v).each(E.intro),
                k.removeClass(v),
                b || Pt.redraw.up();
              return;
            } else {
              var J = window.scrollX,
                _ = window.scrollY;
              X.focus(), window.scrollTo(J, _);
            }
            k.length && h.outro
              ? (k.each(E.outro),
                r(k)
                  .add("opacity " + h.outro + "ms " + F, { fallback: a })
                  .start({ opacity: 0 })
                  .then(() => oe(h, k, V)))
              : oe(h, k, V);
          }
        }
        function oe(B, N, h) {
          if (
            (N.removeClass(v).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            h.addClass(v).each(E.intro),
            Pt.redraw.up(),
            !B.intro)
          )
            return r(h).set({ opacity: 1 });
          r(h)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + B.intro + "ms " + B.easing, { fallback: a })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  Ss();
  Rs();
  Vs();
  ks();
  Hs();
  zs();
  Sr();
  iy();
  ay();
  uy();
  ly();
  py();
  gy();
  my();
  Iy();
  by();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-177",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|794ad7bf-4c3d-7902-16f9-bc1a56cea2aa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|794ad7bf-4c3d-7902-16f9-bc1a56cea2aa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205152245,
    },
    "e-2": {
      id: "e-2",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|794ad7bf-4c3d-7902-16f9-bc1a56cea2aa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|794ad7bf-4c3d-7902-16f9-bc1a56cea2aa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205152250,
    },
    "e-3": {
      id: "e-3",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-4",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205359039,
    },
    "e-4": {
      id: "e-4",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-174",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205359045,
    },
    "e-5": {
      id: "e-5",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-176",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef292",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef292",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205368284,
    },
    "e-6": {
      id: "e-6",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef292",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef292",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205368291,
    },
    "e-7": {
      id: "e-7",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205382726,
    },
    "e-8": {
      id: "e-8",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-173",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589205382733,
    },
    "e-9": {
      id: "e-9",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|a48f8af6-7921-1c7c-9034-46588ff5f4c6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|a48f8af6-7921-1c7c-9034-46588ff5f4c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207257021,
    },
    "e-10": {
      id: "e-10",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-172",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|a48f8af6-7921-1c7c-9034-46588ff5f4c6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|a48f8af6-7921-1c7c-9034-46588ff5f4c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207257027,
    },
    "e-11": {
      id: "e-11",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-171",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|e6f73f23-22d1-3c35-8da5-cd62cbef127d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|e6f73f23-22d1-3c35-8da5-cd62cbef127d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207345269,
    },
    "e-12": {
      id: "e-12",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-177",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|e6f73f23-22d1-3c35-8da5-cd62cbef127d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|e6f73f23-22d1-3c35-8da5-cd62cbef127d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207345269,
    },
    "e-13": {
      id: "e-13",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-180",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|1c3b8162-5c6c-cb0b-8701-6b68630c36e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|1c3b8162-5c6c-cb0b-8701-6b68630c36e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207345914,
    },
    "e-14": {
      id: "e-14",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-175",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|1c3b8162-5c6c-cb0b-8701-6b68630c36e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|1c3b8162-5c6c-cb0b-8701-6b68630c36e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207345914,
    },
    "e-15": {
      id: "e-15",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|d7a5af19-94d2-8525-3a28-b0fd34148d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|d7a5af19-94d2-8525-3a28-b0fd34148d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207366971,
    },
    "e-16": {
      id: "e-16",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-15",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|d7a5af19-94d2-8525-3a28-b0fd34148d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|d7a5af19-94d2-8525-3a28-b0fd34148d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589207366971,
    },
    "e-17": {
      id: "e-17",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6feb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6feb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-18": {
      id: "e-18",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6feb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6feb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-19": {
      id: "e-19",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-20",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-20": {
      id: "e-20",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-19",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-21": {
      id: "e-21",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-22": {
      id: "e-22",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-21",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ff7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-23": {
      id: "e-23",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ffd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ffd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-24": {
      id: "e-24",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-23",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ffd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5a7dca4f-0666-006d-d050-38c6ddbc6ffd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470729352,
    },
    "e-25": {
      id: "e-25",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b76",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b76",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-26": {
      id: "e-26",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b76",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b76",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-27": {
      id: "e-27",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-28": {
      id: "e-28",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-27",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-29": {
      id: "e-29",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b82",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b82",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-30": {
      id: "e-30",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b82",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b82",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-31": {
      id: "e-31",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b88",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b88",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-32": {
      id: "e-32",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b88",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|56baeb8f-5eca-4120-ae3a-b70381443b88",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1589470739133,
    },
    "e-37": {
      id: "e-37",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-38",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef292",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef292",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1590052805916,
    },
    "e-38": {
      id: "e-38",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-37",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef292",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef292",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1590052805916,
    },
    "e-39": {
      id: "e-39",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-40",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|a987a727-600b-d7c8-3071-9c32ddfe66cf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|a987a727-600b-d7c8-3071-9c32ddfe66cf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1590053683834,
    },
    "e-40": {
      id: "e-40",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-39",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|a987a727-600b-d7c8-3071-9c32ddfe66cf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|a987a727-600b-d7c8-3071-9c32ddfe66cf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1590053683834,
    },
    "e-41": {
      id: "e-41",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|fab7cb17-28a3-01b8-010b-2f80e55c88a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|fab7cb17-28a3-01b8-010b-2f80e55c88a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1590053703888,
    },
    "e-42": {
      id: "e-42",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-41",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|fab7cb17-28a3-01b8-010b-2f80e55c88a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|fab7cb17-28a3-01b8-010b-2f80e55c88a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1590053703888,
    },
    "e-53": {
      id: "e-53",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-54" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|4f9c0a60-9ee4-7090-0be4-ed4886f2504d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|4f9c0a60-9ee4-7090-0be4-ed4886f2504d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590484109364,
    },
    "e-55": {
      id: "e-55",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-56" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590484140412,
    },
    "e-57": {
      id: "e-57",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-58" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef295",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef295",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590484165822,
    },
    "e-59": {
      id: "e-59",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-60" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9c1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9c1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 450,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590484185220,
    },
    "e-61": {
      id: "e-61",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-62" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|d35ed096-ab05-ebed-af82-54026aa9a1c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|d35ed096-ab05-ebed-af82-54026aa9a1c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 50,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590484214044,
    },
    "e-63": {
      id: "e-63",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-64" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|3296469b-3128-2ea2-716d-d3ae334e85e4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590484632164,
    },
    "e-65": {
      id: "e-65",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-66" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590484658354,
    },
    "e-67": {
      id: "e-67",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-68" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9c2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|97eb81e6-6b11-7636-1e59-bbbf4e05e9c2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590484680274,
    },
    "e-71": {
      id: "e-71",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-72" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590571746670,
    },
    "e-73": {
      id: "e-73",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-74" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1590571762846,
    },
    "e-81": {
      id: "e-81",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-82" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590574605241,
    },
    "e-83": {
      id: "e-83",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-84" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b47847110f|a987a727-600b-d7c8-3071-9c32ddfe66d0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|a987a727-600b-d7c8-3071-9c32ddfe66d0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590574627939,
    },
    "e-85": {
      id: "e-85",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-86" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c380b47847110f|fab7cb17-28a3-01b8-010b-2f80e55c88a8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|fab7cb17-28a3-01b8-010b-2f80e55c88a8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590574643439,
    },
    "e-93": {
      id: "e-93",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-94" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590575555286,
    },
    "e-95": {
      id: "e-95",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-96" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1590575555286,
    },
    "e-97": {
      id: "e-97",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-98" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590575555286,
    },
    "e-113": {
      id: "e-113",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-114" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1590594254058,
    },
    "e-115": {
      id: "e-115",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-116" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|bc4587b8-9bad-314f-7392-df6c7b921cb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|bc4587b8-9bad-314f-7392-df6c7b921cb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590594328568,
    },
    "e-117": {
      id: "e-117",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-118" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|6bb3502d-11a7-7305-cc26-615d8fce3ac4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|6bb3502d-11a7-7305-cc26-615d8fce3ac4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590594607011,
    },
    "e-119": {
      id: "e-119",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-120" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|af27476a-debf-c42d-673c-5cc1c469d21d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|af27476a-debf-c42d-673c-5cc1c469d21d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590594638872,
    },
    "e-121": {
      id: "e-121",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-122" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|2bcd5eca-3223-c7e1-a03d-d5793000e1d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|2bcd5eca-3223-c7e1-a03d-d5793000e1d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590594651634,
    },
    "e-123": {
      id: "e-123",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-124" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3808113471110|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808113471110|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590673754405,
    },
    "e-125": {
      id: "e-125",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-126" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3808113471110|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808113471110|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1590673754405,
    },
    "e-131": {
      id: "e-131",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-132" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3808113471110|97076ce2-b564-72fd-5dea-bb7697929515",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808113471110|97076ce2-b564-72fd-5dea-bb7697929515",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590676997187,
    },
    "e-133": {
      id: "e-133",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-134" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c3808113471110|844c8045-9dde-5abb-8fa5-927042016036",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808113471110|844c8045-9dde-5abb-8fa5-927042016036",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590677021542,
    },
    "e-135": {
      id: "e-135",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-136" },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6423fb8f92c3808113471110|0b56dffc-648c-f30b-c130-2a2fb445b3f0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808113471110|0b56dffc-648c-f30b-c130-2a2fb445b3f0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1590677043218,
    },
    "e-137": {
      id: "e-137",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-138" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380209d471114|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380209d471114|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1590743711581,
    },
    "e-139": {
      id: "e-139",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-140" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380209d471114|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380209d471114|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1590743711581,
    },
    "e-145": {
      id: "e-145",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-146" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380966a471112|00a1a457-2d1f-fa86-e664-747df233a5d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380966a471112|00a1a457-2d1f-fa86-e664-747df233a5d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1591006145270,
    },
    "e-147": {
      id: "e-147",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-148" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380966a471112|00a1a457-2d1f-fa86-e664-747df233a5dd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380966a471112|00a1a457-2d1f-fa86-e664-747df233a5dd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1591006145270,
    },
    "e-151": {
      id: "e-151",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-152" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3807b5c471111|d53fb2e9-d776-da0d-8620-23b4ecf3de31",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3807b5c471111|d53fb2e9-d776-da0d-8620-23b4ecf3de31",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1591085802647,
    },
    "e-153": {
      id: "e-153",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-154" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3807b5c471111|d53fb2e9-d776-da0d-8620-23b4ecf3de38",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3807b5c471111|d53fb2e9-d776-da0d-8620-23b4ecf3de38",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1591085802647,
    },
    "e-157": {
      id: "e-157",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-158" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba7362",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba7362",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1591630037701,
    },
    "e-159": {
      id: "e-159",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-160" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba7366",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba7366",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1591630037701,
    },
    "e-161": {
      id: "e-161",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-162" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba736a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba736a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 450,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1591630037701,
    },
    "e-163": {
      id: "e-163",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-164" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba736d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|54adabf2-cbb8-69b7-1079-c5629eba736d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 700,
        direction: null,
        effectIn: true,
      },
      createdOn: 1591630037701,
    },
    "e-167": {
      id: "e-167",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-168",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|337f525a-79a0-edda-9bde-b1b29fb47704",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|337f525a-79a0-edda-9bde-b1b29fb47704",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680281204830,
    },
    "e-168": {
      id: "e-168",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-167",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|337f525a-79a0-edda-9bde-b1b29fb47704",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|337f525a-79a0-edda-9bde-b1b29fb47704",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680281204832,
    },
    "e-169": {
      id: "e-169",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-170" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9962d9cc-619f-1e92-7f2b-747f23a87122",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9962d9cc-619f-1e92-7f2b-747f23a87122",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1680300294268,
    },
    "e-171": {
      id: "e-171",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|e0095dda-132d-d79a-079e-782cf0f7a456",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|e0095dda-132d-d79a-079e-782cf0f7a456",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 1,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1662390245911,
    },
    "e-172": {
      id: "e-172",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|5b27a792-d95e-b4d4-5cba-c7f138bec2ee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|5b27a792-d95e-b4d4-5cba-c7f138bec2ee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680536767092,
    },
    "e-173": {
      id: "e-173",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-174",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6423fb8f92c380b7b447110e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680612976197,
    },
    "e-174": {
      id: "e-174",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-173",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6423fb8f92c380b7b447110e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680612976198,
    },
    "e-175": {
      id: "e-175",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-176",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680693138984,
    },
    "e-176": {
      id: "e-176",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-175",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680693138986,
    },
    "e-177": {
      id: "e-177",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-178",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1650242269412,
    },
    "e-178": {
      id: "e-178",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-177",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1650242269412,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-180",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1650242269412,
    },
    "e-180": {
      id: "e-180",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-179",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9962d9cc-619f-1e92-7f2b-747f23a8712f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1650242269412,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|9ab59575-c0ef-d0eb-9bd1-882e58bbdbe2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|9ab59575-c0ef-d0eb-9bd1-882e58bbdbe2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680716786824,
    },
    "e-182": {
      id: "e-182",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|4c341b8b-2ef7-5a8c-1192-6185da71e66f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|4c341b8b-2ef7-5a8c-1192-6185da71e66f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680719847932,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-19", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b7b447110e|81b93628-ea38-0898-c4d5-6a9b91b4bbe0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b7b447110e|81b93628-ea38-0898-c4d5-6a9b91b4bbe0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-19-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680783745537,
    },
    "e-184": {
      id: "e-184",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-185" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64306bc922a2db1cee3fa321|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1680894921670,
    },
    "e-186": {
      id: "e-186",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-187" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64306bc922a2db1cee3fa321|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1680894921670,
    },
    "e-188": {
      id: "e-188",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-189" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64306bc922a2db1cee3fa321|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1680894921670,
    },
    "e-192": {
      id: "e-192",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-193" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64306bc922a2db1cee3fa321|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1680894921670,
    },
    "e-194": {
      id: "e-194",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-195",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680897658382,
    },
    "e-195": {
      id: "e-195",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-194",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680897658384,
    },
    "e-196": {
      id: "e-196",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380b47847110f|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380b47847110f|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680897694495,
    },
    "e-197": {
      id: "e-197",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64306bc922a2db1cee3fa321|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680897766757,
    },
    "e-198": {
      id: "e-198",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-199",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "64306bc922a2db1cee3fa321",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680897786184,
    },
    "e-199": {
      id: "e-199",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-198",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "64306bc922a2db1cee3fa321",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680897786213,
    },
    "e-200": {
      id: "e-200",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380ef53471113|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680897850145,
    },
    "e-201": {
      id: "e-201",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-202",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6423fb8f92c380ef53471113",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680897865497,
    },
    "e-202": {
      id: "e-202",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-201",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6423fb8f92c380ef53471113",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380ef53471113",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680897865527,
    },
    "e-204": {
      id: "e-204",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380209d471114|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380209d471114|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680898088443,
    },
    "e-205": {
      id: "e-205",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c380966a471112|00a1a457-2d1f-fa86-e664-747df233a5d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c380966a471112|00a1a457-2d1f-fa86-e664-747df233a5d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680898265440,
    },
    "e-206": {
      id: "e-206",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3807b5c471111|d53fb2e9-d776-da0d-8620-23b4ecf3de2e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3807b5c471111|d53fb2e9-d776-da0d-8620-23b4ecf3de2e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1680898299799,
    },
    "e-207": {
      id: "e-207",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-208" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3808986471115|0b279315-78ec-e60b-d941-c73b08da38f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808986471115|0b279315-78ec-e60b-d941-c73b08da38f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1680898977493,
    },
    "e-209": {
      id: "e-209",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64306bc922a2db1cee3fa321|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64306bc922a2db1cee3fa321|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681119555704,
    },
    "e-210": {
      id: "e-210",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-211" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433db636792df4ad0c1350f|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681120099836,
    },
    "e-212": {
      id: "e-212",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-213" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433db636792df4ad0c1350f|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681120099836,
    },
    "e-214": {
      id: "e-214",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-215" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433db636792df4ad0c1350f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120099836,
    },
    "e-216": {
      id: "e-216",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-217" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433db636792df4ad0c1350f|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120099836,
    },
    "e-218": {
      id: "e-218",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433db636792df4ad0c1350f|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120099836,
    },
    "e-219": {
      id: "e-219",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-220",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433db636792df4ad0c1350f",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120099836,
    },
    "e-220": {
      id: "e-220",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-219",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433db636792df4ad0c1350f",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120099836,
    },
    "e-221": {
      id: "e-221",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433db636792df4ad0c1350f|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433db636792df4ad0c1350f|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120099836,
    },
    "e-222": {
      id: "e-222",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-223" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681120175874,
    },
    "e-224": {
      id: "e-224",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-225" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681120175874,
    },
    "e-226": {
      id: "e-226",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-227" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120175874,
    },
    "e-228": {
      id: "e-228",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-229" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120175874,
    },
    "e-230": {
      id: "e-230",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120175874,
    },
    "e-231": {
      id: "e-231",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-232",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120175874,
    },
    "e-232": {
      id: "e-232",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-231",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120175874,
    },
    "e-233": {
      id: "e-233",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbaf4dcd20710fc33e9f|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbaf4dcd20710fc33e9f|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120175874,
    },
    "e-234": {
      id: "e-234",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-235" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbf8d57930cf4b4757c2|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681120248643,
    },
    "e-236": {
      id: "e-236",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-237" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbf8d57930cf4b4757c2|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681120248643,
    },
    "e-238": {
      id: "e-238",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-239" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbf8d57930cf4b4757c2|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120248643,
    },
    "e-240": {
      id: "e-240",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-241" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbf8d57930cf4b4757c2|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120248643,
    },
    "e-242": {
      id: "e-242",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbf8d57930cf4b4757c2|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120248643,
    },
    "e-243": {
      id: "e-243",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-244",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dbf8d57930cf4b4757c2",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120248643,
    },
    "e-244": {
      id: "e-244",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-243",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dbf8d57930cf4b4757c2",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120248643,
    },
    "e-245": {
      id: "e-245",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dbf8d57930cf4b4757c2|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dbf8d57930cf4b4757c2|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120248643,
    },
    "e-246": {
      id: "e-246",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-247" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dc39562f38e11e1cc86d|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681120313968,
    },
    "e-248": {
      id: "e-248",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-249" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dc39562f38e11e1cc86d|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681120313968,
    },
    "e-250": {
      id: "e-250",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-251" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dc39562f38e11e1cc86d|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120313968,
    },
    "e-252": {
      id: "e-252",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-253" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dc39562f38e11e1cc86d|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120313968,
    },
    "e-254": {
      id: "e-254",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dc39562f38e11e1cc86d|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120313968,
    },
    "e-255": {
      id: "e-255",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-256",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dc39562f38e11e1cc86d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120313968,
    },
    "e-256": {
      id: "e-256",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-255",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dc39562f38e11e1cc86d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120313968,
    },
    "e-257": {
      id: "e-257",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dc39562f38e11e1cc86d|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dc39562f38e11e1cc86d|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120313968,
    },
    "e-258": {
      id: "e-258",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-259" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dd33bc4ac1c1985affb3|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681120563384,
    },
    "e-260": {
      id: "e-260",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-261" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dd33bc4ac1c1985affb3|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681120563384,
    },
    "e-262": {
      id: "e-262",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-263" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dd33bc4ac1c1985affb3|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120563384,
    },
    "e-264": {
      id: "e-264",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-265" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dd33bc4ac1c1985affb3|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681120563384,
    },
    "e-266": {
      id: "e-266",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dd33bc4ac1c1985affb3|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120563384,
    },
    "e-267": {
      id: "e-267",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-268",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dd33bc4ac1c1985affb3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120563384,
    },
    "e-268": {
      id: "e-268",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-267",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dd33bc4ac1c1985affb3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681120563384,
    },
    "e-269": {
      id: "e-269",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dd33bc4ac1c1985affb3|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dd33bc4ac1c1985affb3|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681120563384,
    },
    "e-270": {
      id: "e-270",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-271" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dfb13dc6716383a9e70b|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681121201486,
    },
    "e-272": {
      id: "e-272",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-273" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dfb13dc6716383a9e70b|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681121201486,
    },
    "e-274": {
      id: "e-274",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-275" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dfb13dc6716383a9e70b|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681121201486,
    },
    "e-276": {
      id: "e-276",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-277" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dfb13dc6716383a9e70b|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681121201486,
    },
    "e-278": {
      id: "e-278",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dfb13dc6716383a9e70b|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681121201486,
    },
    "e-279": {
      id: "e-279",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-280",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dfb13dc6716383a9e70b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681121201486,
    },
    "e-280": {
      id: "e-280",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-279",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433dfb13dc6716383a9e70b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681121201486,
    },
    "e-281": {
      id: "e-281",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433dfb13dc6716383a9e70b|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433dfb13dc6716383a9e70b|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681121201486,
    },
    "e-282": {
      id: "e-282",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-283" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433e029443cd23e38b38462|bf8531e1-198a-24de-4582-6d1ae146a6f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462|bf8531e1-198a-24de-4582-6d1ae146a6f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1681121321901,
    },
    "e-284": {
      id: "e-284",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-285" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433e029443cd23e38b38462|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462|d3349579-0b18-6f19-95a4-d1bb8ad22c13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1681121321901,
    },
    "e-286": {
      id: "e-286",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SHRINK_EFFECT",
        instant: false,
        config: { actionListId: "shrinkIn", autoStopEventId: "e-287" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433e029443cd23e38b38462|04297b0d-1249-7c77-a3e2-8c234f4ef293",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462|04297b0d-1249-7c77-a3e2-8c234f4ef293",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681121321901,
    },
    "e-288": {
      id: "e-288",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-289" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433e029443cd23e38b38462|04297b0d-1249-7c77-a3e2-8c234f4ef296",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462|04297b0d-1249-7c77-a3e2-8c234f4ef296",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1681121321901,
    },
    "e-290": {
      id: "e-290",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433e029443cd23e38b38462|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462|6fca50ab-de2f-362b-39cc-d7d7b0ef92d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681121321901,
    },
    "e-291": {
      id: "e-291",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-292",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433e029443cd23e38b38462",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681121321901,
    },
    "e-292": {
      id: "e-292",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-291",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6433e029443cd23e38b38462",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1681121321901,
    },
    "e-293": {
      id: "e-293",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-18", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6433e029443cd23e38b38462|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6433e029443cd23e38b38462|6bb3502d-11a7-7305-cc26-615d8fce3ac0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-18-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681121321901,
    },
    "e-294": {
      id: "e-294",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6423fb8f92c3808113471110|4fdb7d98-c577-efa9-1720-b057e323bceb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6423fb8f92c3808113471110|4fdb7d98-c577-efa9-1720-b057e323bceb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681155902514,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Card Home",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-link",
                  selectorGuids: ["962128ce-8d4c-3f7b-519a-b9ff35e48e58"],
                },
                globalSwatchId: "a3d6e545",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1589205156304,
    },
    "a-2": {
      id: "a-2",
      title: "Card Home 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-link",
                  selectorGuids: ["962128ce-8d4c-3f7b-519a-b9ff35e48e58"],
                },
                globalSwatchId: "a58416c5",
                rValue: 36,
                bValue: 32,
                gValue: 32,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1589205156304,
    },
    "a-3": {
      id: "a-3",
      title: "Project CARD",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-for-project-card",
                  selectorGuids: ["53fe4ac8-95bc-534b-2c9a-bc96af5cdbf1"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-3-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-for-project-card",
                  selectorGuids: ["53fe4ac8-95bc-534b-2c9a-bc96af5cdbf1"],
                },
                globalSwatchId: "a58416c5",
                rValue: 36,
                bValue: 32,
                gValue: 32,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1589207259962,
    },
    "a-4": {
      id: "a-4",
      title: "Project CARD 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-for-project-card",
                  selectorGuids: ["53fe4ac8-95bc-534b-2c9a-bc96af5cdbf1"],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-4-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-for-project-card",
                  selectorGuids: ["53fe4ac8-95bc-534b-2c9a-bc96af5cdbf1"],
                },
                globalSwatchId: "a3d6e545",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1589207259962,
    },
    "a-8": {
      id: "a-8",
      title: "Video Button Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n-7",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.three",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "74e04d33-0674-3220-25b7-eee5608c6a66",
                  ],
                },
                xValue: 0.8,
                yValue: 0.8,
                locked: true,
              },
            },
            {
              id: "a-8-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.three",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "74e04d33-0674-3220-25b7-eee5608c6a66",
                  ],
                },
                value: 0.8,
                unit: "",
              },
            },
            {
              id: "a-8-n-9",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 600,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.two",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "f1a24223-24ae-6a4a-8017-9394d32b9bca",
                  ],
                },
                xValue: 0.8,
                yValue: 0.8,
                locked: true,
              },
            },
            {
              id: "a-8-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.two",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "f1a24223-24ae-6a4a-8017-9394d32b9bca",
                  ],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-8-n-11",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 650,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.one",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "91d1ae35-a828-d384-0f03-b9217bb720d8",
                  ],
                },
                xValue: 0.8,
                yValue: 0.8,
                locked: true,
              },
            },
            {
              id: "a-8-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 650,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.one",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "91d1ae35-a828-d384-0f03-b9217bb720d8",
                  ],
                },
                value: 0.1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1680281208460,
    },
    "a-9": {
      id: "a-9",
      title: "Video Button  Animation Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.three",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "74e04d33-0674-3220-25b7-eee5608c6a66",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-9-n-8",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.three",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "74e04d33-0674-3220-25b7-eee5608c6a66",
                  ],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-9-n-9",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.two",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "f1a24223-24ae-6a4a-8017-9394d32b9bca",
                  ],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-9-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.two",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "f1a24223-24ae-6a4a-8017-9394d32b9bca",
                  ],
                },
                value: 0.5,
                unit: "",
              },
            },
            {
              id: "a-9-n-11",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 450,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.one",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "91d1ae35-a828-d384-0f03-b9217bb720d8",
                  ],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-9-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutElastic",
                duration: 450,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cercl-figure.one",
                  selectorGuids: [
                    "6961d236-7ef0-a130-8cb1-e3b6aca12b52",
                    "91d1ae35-a828-d384-0f03-b9217bb720d8",
                  ],
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1680281208460,
    },
    "a-10": {
      id: "a-10",
      title: "Step Animation",
      continuousParameterGroups: [
        {
          id: "a-10-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-10-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-two",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2f",
                      ],
                    },
                    value: 0.9,
                    unit: "",
                  },
                },
                {
                  id: "a-10-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-thre",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2a",
                      ],
                    },
                    value: 0.9,
                    unit: "",
                  },
                },
                {
                  id: "a-10-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-fore",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2d",
                      ],
                    },
                    value: 0.9,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 27,
              actionItems: [
                {
                  id: "a-10-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-two",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2f",
                      ],
                    },
                    value: 0.9,
                    unit: "",
                  },
                },

                {
                  id: "a-10-n-25",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-two",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2f",
                      ],
                    },
                    xValue: 0.99,
                    yValue: 0.99,
                    locked: true,
                  },
                },

              ],
            },
            {
              keyframe: 31,
              actionItems: [
                {
                  id: "a-10-n-10",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-two",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2f",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },

                
                {
                  id: "a-10-n-28",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-two",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2f",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 40,
              actionItems: [
                {
                  id: "a-10-n-12",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-thre",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2a",
                      ],
                    },
                    value: 0.9,
                    unit: "",
                  },
                },


                {
                  id: "a-10-n-37",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.one",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "ed1753ba-9213-d2fe-c86e-6875266966e5",
                      ],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
                {
                  id: "a-10-n-38",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.two",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "861834be-2c94-c4e3-da5c-5185abfb44c7",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 45,
              actionItems: [
                {
                  id: "a-10-n-14",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-thre",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2a",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },

                {
                  id: "a-10-n-26",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-thre",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2a",
                      ],
                    },
                    xValue: 0.98,
                    yValue: 0.98,
                    locked: true,
                  },
                },
                {
                  id: "a-10-n-33",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-thre",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2a",
                      ],
                    },
                    yValue: 26,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 54,
              actionItems: [
                {
                  id: "a-10-n-16",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-fore",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2d",
                      ],
                    },
                    value: 0.9,
                    unit: "",
                  },
                },

                {
                  id: "a-10-n-29",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-thre",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2a",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-10-n-27",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-fore",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2d",
                      ],
                    },
                    xValue: 0.97,
                    yValue: 0.97,
                    locked: true,
                  },
                },
                {
                  id: "a-10-n-35",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-fore",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2d",
                      ],
                    },
                    yValue: 39,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-39",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.two",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "861834be-2c94-c4e3-da5c-5185abfb44c7",
                      ],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
                {
                  id: "a-10-n-40",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.three",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "daa9f227-2dc7-356a-00fa-e7fbdabee8b8",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 59,
              actionItems: [
                {
                  id: "a-10-n-18",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-fore",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2d",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },

                {
                  id: "a-10-n-30",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".big-darck-card.step-fore",
                      selectorGuids: [
                        "b44b3570-cf20-c985-af80-c9117c525d26",
                        "b44b3570-cf20-c985-af80-c9117c525d2d",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 73,
              actionItems: [
                {
                  id: "a-10-n-41",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.three",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "daa9f227-2dc7-356a-00fa-e7fbdabee8b8",
                      ],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 78,
              actionItems: [
                {
                  id: "a-10-n-42",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.fore",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "5b963376-8e1b-25bd-81cd-c390557da1db",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-10-n-43",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-for-card-step.fore",
                      selectorGuids: [
                        "74e72a47-7118-4ca8-b77a-1be112b1a0ac",
                        "5b963376-8e1b-25bd-81cd-c390557da1db",
                      ],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1662390251647,
    },
    "a-11": {
      id: "a-11",
      title: "Navbar Color",
      continuousParameterGroups: [
        {
          id: "a-11-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 54,
              actionItems: [
                {
                  id: "a-11-n-3",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "SIBLINGS",
                      selector: ".navbar",
                      selectorGuids: ["a93281ff-fb3c-b36d-4534-77c4cf04d14a"],
                    },
                    globalSwatchId: "",
                    rValue: 36,
                    bValue: 32,
                    gValue: 32,
                    aValue: 0,
                  },
                },
              ],
            },
            {
              keyframe: 55,
              actionItems: [
                {
                  id: "a-11-n-4",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "SIBLINGS",
                      selector: ".navbar",
                      selectorGuids: ["a93281ff-fb3c-b36d-4534-77c4cf04d14a"],
                    },
                    globalSwatchId: "",
                    rValue: 36,
                    bValue: 32,
                    gValue: 32,
                    aValue: 0.85,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1680536796053,
    },
    "a-13": {
      id: "a-13",
      title: "Move Navbar Down",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 250,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["a93281ff-fb3c-b36d-4534-77c4cf04d14a"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1680613049808,
    },
    "a-12": {
      id: "a-12",
      title: "Move Navbar Up",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 250,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["a93281ff-fb3c-b36d-4534-77c4cf04d14a"],
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1680613049808,
    },
    "a-14": {
      id: "a-14",
      title: "Navbar Dropdown (tablet) -> OPEN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1626242958157,
    },
    "a-15": {
      id: "a-15",
      title: "Navbar Dropdown (tablet) -> CLOSE",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1626242958157,
    },
    "a-16": {
      id: "a-16",
      title: "Navbar -> OPEN 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                yValue: -2,
                xUnit: "PX",
                yUnit: "rem",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-icon",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fd"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-16-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-16-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "rem",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1626161550593,
    },
    "a-17": {
      id: "a-17",
      title: "Navbar-> CLOSE 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-icon",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fd"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-17-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["1d78d7cb-a066-6cb7-1308-e3b392e577fe"],
                },
                yValue: -2,
                xUnit: "PX",
                yUnit: "rem",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1626161607847,
    },
    "a-18": {
      id: "a-18",
      title: "Parallax Image",
      continuousParameterGroups: [
        {
          id: "a-18-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-18-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".parallax-image",
                      selectorGuids: ["8b60bc4c-534f-7d01-ed4e-0e3941a5dddb"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-18-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".parallax-image",
                      selectorGuids: ["8b60bc4c-534f-7d01-ed4e-0e3941a5dddb"],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1680716791546,
    },
    "a-19": {
      id: "a-19",
      title: "Parallax Image Invert Size",
      continuousParameterGroups: [
        {
          id: "a-19-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-19-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".parallax-image",
                      selectorGuids: ["8b60bc4c-534f-7d01-ed4e-0e3941a5dddb"],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-19-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".parallax-image",
                      selectorGuids: ["8b60bc4c-534f-7d01-ed4e-0e3941a5dddb"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1680716791546,
    },
    shrinkIn: {
      id: "shrinkIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1.25,
                yValue: 1.25,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1,
                yValue: 1,
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInRight: {
      id: "slideInRight",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    slideInLeft: {
      id: "slideInLeft",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: -100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    growIn: {
      id: "growIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0.7500000000000001,
                yValue: 0.7500000000000001,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1,
                yValue: 1,
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInTop: {
      id: "slideInTop",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: -100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
