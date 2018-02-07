function buildMap() {
  var a = [],
    b = [];
  for (var c in Config.emoji_data) {
    for (var d = 0; d < Config.emoji_data[c][0].length; d++) 
      a.push(Config.escape_rx(":" + Config.emoji_data[c][3][0]) + ":"),
      b.push(Config.emoji_data[c][0][0]),
      Config.map[Config.emoji_data[c][3][0]] = Config.emoji_data[c][0][0],
      Config.mapcolon[":" + Config.emoji_data[c][3][0] + ":"] = Config.emoji_data[c][0][0],
      Config.reversemap[Config.emoji_data[c][0][0]] = Config.emoji_data[c][3][0];
    Config.rx_colons = new RegExp("(" + a.join("|") + ")", "g"),
    Config.rx_codes = new RegExp("(" + b.join("|") + ")", "g")
  }
}
function cancelEvent(a) {
  return a = a || window.event,
  a && (a = a.originalEvent || a, a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault()),
  !1
}
function getGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
    var b = 16 * Math.random() | 0,
      c = "x" == a
        ? b
        : 3 & b | 8;
    return c.toString(16)
  })
}
!function(a) {
  return "function" == typeof define && define.amd
    ? define(["jquery"], function(b) {
      return a(b, window, document)
    })
    : "object" == typeof exports
      ? module.exports = a(require("jquery"), window, document)
      : a(jQuery, window, document)
}(function(a, b, c) {
  "use strict";
  var d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H;
  z = {
    paneClass: "nano-pane",
    sliderClass: "nano-slider",
    contentClass: "nano-content",
    enabledClass: "has-scrollbar",
    flashedClass: "flashed",
    activeClass: "active",
    iOSNativeScrolling: !1,
    preventPageScrolling: !1,
    disableResize: !1,
    alwaysVisible: !1,
    flashDelay: 1500,
    sliderMinHeight: 20,
    sliderMaxHeight: null,
    documentContext: null,
    windowContext: null
  },
  u = "scrollbar",
  t = "scroll",
  l = "mousedown",
  m = "mouseenter",
  n = "mousemove",
  p = "mousewheel",
  o = "mouseup",
  s = "resize",
  h = "drag",
  i = "enter",
  w = "up",
  r = "panedown",
  f = "DOMMouseScroll",
  g = "down",
  x = "wheel",
  j = "keydown",
  k = "keyup",
  v = "touchmove",
  d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject,
  e = null,
  D = b.requestAnimationFrame,
  y = b.cancelAnimationFrame,
  F = c.createElement("div").style,
  H = function() {
    var a,
      b,
      c,
      d,
      e,
      f;
    for (d = [
      "t", "webkitT", "MozT", "msT", "OT"
    ], a = e = 0, f = d.length; f > e; a = ++e) 
      if (c = d[a], b = d[a] + "ransform", b in F) 
        return d[a].substr(0, d[a].length - 1);
  return !1
  }(),
  G = function(a) {
    return H === !1
      ? !1
      : "" === H
        ? a
        : H + a.charAt(0).toUpperCase() + a.substr(1)
  },
  E = G("transform"),
  B = E !== !1,
  A = function() {
    var a,
      b,
      d;
    return a = c.createElement("div"),
    b = a.style,
    b.position = "absolute",
    b.width = "100px",
    b.height = "100px",
    b.overflow = t,
    b.top = "-9999px",
    c.body.appendChild(a),
    d = a.offsetWidth - a.clientWidth,
    c.body.removeChild(a),
    d
  },
  C = function() {
    var a,
      c,
      d;
    return c = b.navigator.userAgent,
    (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c))
      ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a &&+ d > 23)
      : !1
  },
  q = function() {
    function j(d, f) {
      this.el = d,
      this.options = f,
      e || (e = A()),
      this.$el = a(this.el),
      this.doc = a(this.options.documentContext || c),
      this.win = a(this.options.windowContext || b),
      this.body = this.doc.find("body"),
      this.$content = this.$el.children("." + this.options.contentClass),
      this.$content.attr("tabindex", this.options.tabIndex || 0),
      this.content = this.$content[0],
      this.previousPosition = 0,
      this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling
        ? this.nativeScrolling()
        : this.generate(),
      this.createEvents(),
      this.addEvents(),
      this.reset()
    }
    return j.prototype.preventScrolling = function(a, b) {
      if (this.isActive) 
        if (a.type === f) 
          (b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault();
        else if (a.type === p) {
          if (!a.originalEvent || !a.originalEvent.wheelDelta) 
            return;
          
          (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
        }
      },
    j.prototype.nativeScrolling = function() {
      this.$content.css({WebkitOverflowScrolling: "touch"}),
      this.iOSNativeScrolling = !0,
      this.isActive = !0
    },
    j.prototype.updateScrollValues = function() {
      var a,
        b;
      a = this.content,
      this.maxScrollTop = a.scrollHeight - a.clientHeight,
      this.prevScrollTop = this.contentScrollTop || 0,
      this.contentScrollTop = a.scrollTop,
      b = this.contentScrollTop > this.previousPosition
        ? "down"
        : this.contentScrollTop < this.previousPosition
          ? "up"
          : "same",
      this.previousPosition = this.contentScrollTop,
      "same" !== b && this.$el.trigger("update", {
        position: this.contentScrollTop,
        maximum: this.maxScrollTop,
        direction: b
      }),
      this.iOSNativeScrolling || (
        this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop
        ? 0
        : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
    },
    j.prototype.setOnScrollStyles = function() {
      var a;
      B
        ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)")
        : a = {
          top: this.sliderTop
        },
      D
        ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function(b) {
          return function() {
            return b.scrollRAF = null,
            b.slider.css(a)
          }
        }(this)))
        : this.slider.css(a)
    },
    j.prototype.createEvents = function() {
      this.events = {
        down: function(a) {
          return function(b) {
            return a.isBeingDragged = !0,
            a.offsetY = b.pageY - a.slider.offset().top,
            a.slider.is(b.target) || (a.offsetY = 0),
            a.pane.addClass(a.options.activeClass),
            a.doc.bind(n, a.events[h]).bind(o, a.events[w]),
            a.body.bind(m, a.events[i]),
            !1
          }
        }(this),
        drag: function(a) {
          return function(b) {
            return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight),
            a.scroll(),
            a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop
              ? a.$el.trigger("scrollend")
              : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"),
            !1
          }
        }(this),
        up: function(a) {
          return function(b) {
            return a.isBeingDragged = !1,
            a.pane.removeClass(a.options.activeClass),
            a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]),
            a.body.unbind(m, a.events[i]),
            !1
          }
        }(this),
        resize: function(a) {
          return function(b) {
            a.reset()
          }
        }(this),
        panedown: function(a) {
          return function(b) {
            return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight,
            a.scroll(),
            a.events.down(b),
            !1
          }
        }(this),
        scroll: function(a) {
          return function(b) {
            a.updateScrollValues(),
            a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (
              a.contentScrollTop >= a.maxScrollTop
              ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend"))
              : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
          }
        }(this),
        wheel: function(a) {
          return function(b) {
            var c;
            return null != b
              ? (c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1)
              : void 0
          }
        }(this),
        enter: function(a) {
          return function(b) {
            var c;
            return a.isBeingDragged && 1 !== (b.buttons || b.which)
              ? (c = a.events)[w].apply(c, arguments)
              : void 0
          }
        }(this)
      }
    },
    j.prototype.addEvents = function() {
      var a;
      this.removeEvents(),
      a = this.events,
      this.options.disableResize || this.win.bind(s, a[s]),
      this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])),
      this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
    },
    j.prototype.removeEvents = function() {
      var a;
      a = this.events,
      this.win.unbind(s, a[s]),
      this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()),
      this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
    },
    j.prototype.generate = function() {
      var a,
        c,
        d,
        f,
        g,
        h,
        i;
      return f = this.options,
      h = f.paneClass,
      i = f.sliderClass,
      a = f.contentClass,
      (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'),
      this.pane = this.$el.children("." + h),
      this.slider = this.pane.find("." + i),
      0 === e && C()
        ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
          right: -14,
          paddingRight: + d + 14
        })
        : e && (c = {
          right: -e
        }, this.$el.addClass(f.enabledClass)),
      null != c && this.$content.css(c),
      this
    },
    j.prototype.restore = function() {
      this.stopped = !1,
      this.iOSNativeScrolling || this.pane.show(),
      this.addEvents()
    },
    j.prototype.reset = function() {
      var a,
        b,
        c,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n;
      return this.iOSNativeScrolling
        ? void(this.contentHeight = this.content.scrollHeight)
        : (
          this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({height: this.$content.height()}), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(
            a.scrollHeight > l
            ? l
            : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * i), n < this.options.sliderMinHeight
          ? n = this.options.sliderMinHeight
          : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight),
        g === t && f.overflowX !== t && (n += e),
        this.maxSliderTop = j - n,
        this.contentHeight = b,
        this.paneHeight = i,
        this.paneOuterHeight = j,
        this.sliderHeight = n,
        this.paneTop = k,
        this.slider.height(n),
        this.events.scroll(),
        this.pane.show(),
        this.isActive = !0,
        a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t
          ? (this.pane.hide(), this.isActive = !1)
          : this.el.clientHeight === a.scrollHeight && g === t
            ? this.slider.hide()
            : this.slider.show(),
        this.pane.css({
          opacity: this.options.alwaysVisible
            ? 1
            : "",
          visibility: this.options.alwaysVisible
            ? "visible"
            : ""
        }),
        c = this.$content.css("position"),
        ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({right: "", marginRight: m})),
        this)
    },
    j.prototype.scroll = function() {
      return this.isActive
        ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this)
        : void 0
    },
    j.prototype.scrollBottom = function(a) {
      return this.isActive
        ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this)
        : void 0
    },
    j.prototype.scrollTop = function(a) {
      return this.isActive
        ? (this.$content.scrollTop(+ a).trigger(p), this.stop().restore(), this)
        : void 0
    },
    j.prototype.scrollTo = function(a) {
      return this.isActive
        ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this)
        : void 0
    },
    j.prototype.stop = function() {
      return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null),
      this.stopped = !0,
      this.removeEvents(),
      this.iOSNativeScrolling || this.pane.hide(),
      this
    },
    j.prototype.destroy = function() {
      return this.stopped || this.stop(),
      !this.iOSNativeScrolling && this.pane.length && this.pane.remove(),
      d && this.$content.height(""),
      this.$content.removeAttr("tabindex"),
      this.$el.hasClass(this.options.enabledClass) && (this.$el.removeClass(this.options.enabledClass), this.$content.css({right: ""})),
      this
    },
    j.prototype.flash = function() {
      return !this.iOSNativeScrolling && this.isActive
        ? (this.reset(), this.pane.addClass(this.options.flashedClass), setTimeout(function(a) {
          return function() {
            a.pane.removeClass(a.options.flashedClass)
          }
        }(this), this.options.flashDelay), this)
        : void 0
    },
    j
  }(),
  a.fn.nanoScroller = function(b) {
    return this.each(function() {
      var c,
        d;
      if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
        if (a.extend(d.options, b), null != b.scrollBottom) 
          return d.scrollBottom(b.scrollBottom);
        if (null != b.scrollTop) 
          return d.scrollTop(b.scrollTop);
        if (b.scrollTo) 
          return d.scrollTo(b.scrollTo);
        if ("bottom" === b.scroll) 
          return d.scrollBottom(0);
        if ("top" === b.scroll) 
          return d.scrollTop(0);
        if (b.scroll && b.scroll instanceof a) 
          return d.scrollTo(b.scroll);
        if (b.stop) 
          return d.stop();
        if (b.destroy) 
          return d.destroy();
        if (b.flash) 
          return d.flash()
      }
      return d.reset()
    })
  },
  a.fn.nanoScroller.Constructor = q
}),
!function(a, b) {
  "function" == typeof define && define.amd
    ? define(b)
    : "object" == typeof exports
      ? module.exports = b(require, exports, module)
      : a.Tether = b()
}(this, function(a, b, c) {
  "use strict";
  function d(a, b) {
    if (!(a instanceof b)) 
      throw new TypeError("Cannot call a class as a function")
  }
  function e(a) {
    var b = getComputedStyle(a),
      c = b.position;
    if ("fixed" === c) 
      return a;
    for (var d = a; d = d.parentNode;) {
      var e = void 0;
      try {
        e = getComputedStyle(d)
      } catch (f) {}
      if ("undefined" == typeof e || null === e) 
        return d;
      var g = e.overflow,
        h = e.overflowX,
        i = e.overflowY;
      if (/(auto|scroll)/.test(g + i + h) && ("absolute" !== c || ["relative", "absolute", "fixed"].indexOf(e.position) >= 0)) 
        return d
    }
    return document.body
  }
  function f(a) {
    var b = void 0;
    a === document
      ? (b = document, a = document.documentElement)
      : b = a.ownerDocument;
    var c = b.documentElement,
      d = {},
      e = a.getBoundingClientRect();
    for (var f in e) 
      d[f] = e[f];
    var g = y(b);
    return d.top -= g.top,
    d.left -= g.left,
    "undefined" == typeof d.width && (d.width = document.body.scrollWidth - d.left - d.right),
    "undefined" == typeof d.height && (d.height = document.body.scrollHeight - d.top - d.bottom),
    d.top = d.top - c.clientTop,
    d.left = d.left - c.clientLeft,
    d.right = b.body.clientWidth - d.width - d.left,
    d.bottom = b.body.clientHeight - d.height - d.top,
    d
  }
  function g(a) {
    return a.offsetParent || document.documentElement
  }
  function h() {
    var a = document.createElement("div");
    a.style.width = "100%",
    a.style.height = "200px";
    var b = document.createElement("div");
    i(b.style, {
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden"
    }),
    b.appendChild(a),
    document.body.appendChild(b);
    var c = a.offsetWidth;
    b.style.overflow = "scroll";
    var d = a.offsetWidth;
    c === d && (d = b.clientWidth),
    document.body.removeChild(b);
    var e = c - d;
    return {width: e, height: e}
  }
  function i() {
    var a = arguments.length <= 0 || void 0 === arguments[0]
        ? {}
        : arguments[0],
      b = [];
    return Array.prototype.push.apply(b, arguments),
    b.slice(1).forEach(function(b) {
      if (b) 
        for (var c in b) 
          ({}).hasOwnProperty.call(b, c) && (a[c] = b[c])
    }),
    a
  }
  function j(a, b) {
    if ("undefined" != typeof a.classList) 
      b.split(" ").forEach(function(b) {
        b.trim() && a.classList.remove(b)
      });
    else {
      var c = new RegExp("(^| )" + b.split(" ").join("|") + "( |$)", "gi"),
        d = m(a).replace(c, " ");
      n(a, d)
    }
  }
  function k(a, b) {
    if ("undefined" != typeof a.classList) 
      b.split(" ").forEach(function(b) {
        b.trim() && a.classList.add(b)
      });
    else {
      j(a, b);
      var c = m(a) + (" " + b);
      n(a, c)
    }
  }
  function l(a, b) {
    if ("undefined" != typeof a.classList) 
      return a.classList.contains(b);
    var c = m(a);
    return new RegExp("(^| )" + b + "( |$)", "gi").test(c)
  }
  function m(a) {
    return a.className instanceof SVGAnimatedString
      ? a.className.baseVal
      : a.className
  }
  function n(a, b) {
    a.setAttribute("class", b)
  }
  function o(a, b, c) {
    c.forEach(function(c) {
      -1 === b.indexOf(c) && l(a, c) && j(a, c)
    }),
    b.forEach(function(b) {
      l(a, b) || k(a, b)
    })
  }
  function d(a, b) {
    if (!(a instanceof b)) 
      throw new TypeError("Cannot call a class as a function")
  }
  function p(a, b) {
    var c = arguments.length <= 2 || void 0 === arguments[2]
      ? 1
      : arguments[2];
    return a + c >= b && b >= a - c
  }
  function q() {
    return "undefined" != typeof performance && "undefined" != typeof performance.now
      ? performance.now()
      : + new Date
  }
  function r() {
    for (var a = {
      top: 0,
      left: 0
    }, b = arguments.length, c = Array(b), d = 0; b > d; d++) 
      c[d] = arguments[d];
    return c.forEach(function(b) {
      var c = b.top,
        d = b.left;
      "string" == typeof c && (c = parseFloat(c, 10)),
      "string" == typeof d && (d = parseFloat(d, 10)),
      a.top += c,
      a.left += d
    }),
    a
  }
  function s(a, b) {
    return "string" == typeof a.left && -1 !== a.left.indexOf("%") && (a.left = parseFloat(a.left, 10) / 100 * b.width),
    "string" == typeof a.top && -1 !== a.top.indexOf("%") && (a.top = parseFloat(a.top, 10) / 100 * b.height),
    a
  }
  function t(a, b) {
    return "scrollParent" === b
      ? b = a.scrollParent
      : "window" === b && (b = [
        pageXOffset, pageYOffset, innerWidth + pageXOffset,
        innerHeight + pageYOffset
      ]),
    b === document && (b = b.documentElement),
    "undefined" != typeof b.nodeType && !function() {
      var a = f(b),
        c = a,
        d = getComputedStyle(b);
      b = [
        c.left, c.top, a.width + c.left,
        a.height + c.top
      ],
      R.forEach(function(a, c) {
        a = a[0].toUpperCase() + a.substr(1),
        "Top" === a || "Left" === a
          ? b[c] += parseFloat(d["border" + a + "Width"])
          : b[c] -= parseFloat(d["border" + a + "Width"])
      })
    }(),
    b
  }
  var u = function() {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d.enumerable = d.enumerable || !1,
          d.configurable = !0,
          "value" in d && (d.writable = !0),
          Object.defineProperty(a, d.key, d)
        }
      }
      return function(b, c, d) {
        return c && a(b.prototype, c),
        d && a(b, d),
        b
      }
    }(),
    v = void 0;
  "undefined" == typeof v && (v = {
    modules: []
  });
  var w = function() {
      var a = 0;
      return function() {
        return++ a
      }
    }(),
    x = {},
    y = function(a) {
      var b = a._tetherZeroElement;
      "undefined" == typeof b && (b = a.createElement("div"), b.setAttribute("data-tether-id", w()), i(b.style, {
        top: 0,
        left: 0,
        position: "absolute"
      }), a.body.appendChild(b), a._tetherZeroElement = b);
      var c = b.getAttribute("data-tether-id");
      if ("undefined" == typeof x[c]) {
        x[c] = {};
        var d = b.getBoundingClientRect();
        for (var e in d) 
          x[c][e] = d[e];
        A(function() {
          delete x[c]
        })
      }
      return x[c]
    },
    z = [],
    A = function(a) {
      z.push(a)
    },
    B = function() {
      for (var a = void 0; a = z.pop();) 
        a()
    },
    C = function() {
      function a() {
        d(this, a)
      }
      return u(a, [
        {
          key: "on",
          value: function(a, b, c) {
            var d = arguments.length <= 3 || void 0 === arguments[3]
              ? !1
              : arguments[3];
            "undefined" == typeof this.bindings && (this.bindings = {}),
            "undefined" == typeof this.bindings[a] && (this.bindings[a] = []),
            this.bindings[a].push({handler: b, ctx: c, once: d})
          }
        }, {
          key: "once",
          value: function(a, b, c) {
            this.on(a, b, c, !0)
          }
        }, {
          key: "off",
          value: function(a, b) {
            if ("undefined" == typeof this.bindings || "undefined" == typeof this.bindings[a]) 
              if ("undefined" == typeof b) 
                delete this.bindings[a];
              else 
                for (var c = 0; c < this.bindings[a].length;) 
                  this.bindings[a][c].handler === b
                    ? this.bindings[a].splice(c, 1)
                    : ++c
            }
        }, {
          key: "trigger",
          value: function(a) {
            if ("undefined" != typeof this.bindings && this.bindings[a]) 
              for (var b = 0; b < this.bindings[a].length;) {
                var c = this.bindings[a][b],
                  d = c.handler,
                  e = c.ctx,
                  f = c.once,
                  g = e;
                "undefined" == typeof g && (g = this);
                for (var h = arguments.length, i = Array(
                  h > 1
                  ? h - 1
                  : 0), j = 1; h > j; j++) 
                  i[j - 1] = arguments[j];
                d.apply(g, i),
                f
                  ? this.bindings[a].splice(b, 1)
                  : ++b
              }
            }
        }
      ]),
      a
    }();
  v.Utils = {
    getScrollParent: e,
    getBounds: f,
    getOffsetParent: g,
    extend: i,
    addClass: k,
    removeClass: j,
    hasClass: l,
    updateClasses: o,
    defer: A,
    flush: B,
    uniqueId: w,
    Evented: C,
    getScrollBarSize: h
  };
  var D = function() {
      function a(a, b) {
        var c = [],
          d = !0,
          e = !1,
          f = void 0;
        try {
          for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0) ;
          }
        catch (i) {
          e = !0,
          f = i
        } finally {
          try {
            !d && h["return"] && h["return"]()
          } finally {
            if (e) 
              throw f
          }
        }
        return c
      }
      return function(b, c) {
        if (Array.isArray(b)) 
          return b;
        if (Symbol.iterator in Object(b)) 
          return a(b, c);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }(),
    u = function() {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d.enumerable = d.enumerable || !1,
          d.configurable = !0,
          "value" in d && (d.writable = !0),
          Object.defineProperty(a, d.key, d)
        }
      }
      return function(b, c, d) {
        return c && a(b.prototype, c),
        d && a(b, d),
        b
      }
    }();
  if ("undefined" == typeof v) 
    throw new Error("You must include the utils.js file before tether.js");
  var E = v.Utils,
    e = E.getScrollParent,
    f = E.getBounds,
    g = E.getOffsetParent,
    i = E.extend,
    k = E.addClass,
    j = E.removeClass,
    o = E.updateClasses,
    A = E.defer,
    B = E.flush,
    h = E.getScrollBarSize,
    F = function() {
      for (var a = document.createElement("div"), b = [
        "transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"
      ], c = 0; c < b.length; ++c) {
        var d = b[c];
        if (void 0 !== a.style[d]) 
          return d
      }
    }(),
    G = [],
    H = function() {
      G.forEach(function(a) {
        a.position(!1)
      }),
      B()
    };
  !function() {
    var a = null,
      b = null,
      c = null,
      d = function e() {
        return "undefined" != typeof b && b > 16
          ? (b = Math.min(b - 16, 250), void(c = setTimeout(e, 250)))
          : void("undefined" != typeof a && q() - a < 10 || ("undefined" != typeof c && (clearTimeout(c), c = null), a = q(), H(), b = q() - a))
      };
    ["resize", "scroll", "touchmove"].forEach(function(a) {
      window.addEventListener(a, d)
    })
  }();
  var I = {
      center: "center",
      left: "right",
      right: "left"
    },
    J = {
      middle: "middle",
      top: "bottom",
      bottom: "top"
    },
    K = {
      top: 0,
      left: 0,
      middle: "50%",
      center: "50%",
      bottom: "100%",
      right: "100%"
    },
    L = function(a, b) {
      var c = a.left,
        d = a.top;
      return "auto" === c && (c = I[b.left]),
      "auto" === d && (d = J[b.top]), {
        left: c,
        top: d
      }
    },
    M = function(a) {
      var b = a.left,
        c = a.top;
      return "undefined" != typeof K[a.left] && (b = K[a.left]),
      "undefined" != typeof K[a.top] && (c = K[a.top]), {
        left: b,
        top: c
      }
    },
    N = function(a) {
      var b = a.split(" "),
        c = D(b, 2),
        d = c[0],
        e = c[1];
      return {top: d, left: e}
    },
    O = N,
    P = function() {
      function a(b) {
        var c = this;
        d(this, a),
        this.position = this.position.bind(this),
        G.push(this),
        this.history = [],
        this.setOptions(b, !1),
        v.modules.forEach(function(a) {
          "undefined" != typeof a.initialize && a.initialize.call(c)
        }),
        this.position()
      }
      return u(a, [
        {
          key: "getClass",
          value: function() {
            var a = arguments.length <= 0 || void 0 === arguments[0]
                ? ""
                : arguments[0],
              b = this.options.classes;
            return "undefined" != typeof b && b[a]
              ? this.options.classes[a]
              : this.options.classPrefix
                ? this.options.classPrefix + "-" + a
                : a
          }
        }, {
          key: "setOptions",
          value: function(a) {
            var b = this,
              c = arguments.length <= 1 || void 0 === arguments[1]
                ? !0
                : arguments[1],
              d = {
                offset: "0 0",
                targetOffset: "0 0",
                targetAttachment: "auto auto",
                classPrefix: "tether"
              };
            this.options = i(d, a);
            var f = this.options,
              g = f.element,
              h = f.target,
              j = f.targetModifier;
            if (
              this.element = g, this.target = h, this.targetModifier = j, "viewport" === this.target
              ? (this.target = document.body, this.targetModifier = "visible")
              : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"),
            ["element", "target"].forEach(function(a) {
              if ("undefined" == typeof b[a]) 
                throw new Error("Tether Error: Both element and target must be defined");
              
              "undefined" != typeof b[a].jquery
                ? b[a] = b[a][0]
                : "string" == typeof b[a] && (b[a] = document.querySelector(b[a]))
            }),
            k(this.element, this.getClass("element")),
            this.options.addTargetClasses !== !1 && k(this.target, this.getClass("target")),
            !this.options.attachment) 
              throw new Error("Tether Error: You must provide an attachment");
            this.targetAttachment = O(this.options.targetAttachment),
            this.attachment = O(this.options.attachment),
            this.offset = N(this.options.offset),
            this.targetOffset = N(this.options.targetOffset),
            "undefined" != typeof this.scrollParent && this.disable(),
            this.scrollParent = "scroll-handle" === this.targetModifier
              ? this.target
              : e(this.target),
            this.options.enabled !== !1 && this.enable(c)
          }
        }, {
          key: "getTargetBounds",
          value: function() {
            if ("undefined" == typeof this.targetModifier) 
              return f(this.target);
            if ("visible" === this.targetModifier) {
              if (this.target === document.body) 
                return {top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth};
              var a = f(this.target),
                b = {
                  height: a.height,
                  width: a.width,
                  top: a.top,
                  left: a.left
                };
              return b.height = Math.min(b.height, a.height - (pageYOffset - a.top)),
              b.height = Math.min(b.height, a.height - (a.top + a.height - (pageYOffset + innerHeight))),
              b.height = Math.min(innerHeight, b.height),
              b.height -= 2,
              b.width = Math.min(b.width, a.width - (pageXOffset - a.left)),
              b.width = Math.min(b.width, a.width - (a.left + a.width - (pageXOffset + innerWidth))),
              b.width = Math.min(innerWidth, b.width),
              b.width -= 2,
              b.top < pageYOffset && (b.top = pageYOffset),
              b.left < pageXOffset && (b.left = pageXOffset),
              b
            }
            if ("scroll-handle" === this.targetModifier) {
              var a = void 0,
                c = this.target;
              c === document.body
                ? (c = document.documentElement, a = {
                  left: pageXOffset,
                  top: pageYOffset,
                  height: innerHeight,
                  width: innerWidth
                })
                : a = f(c);
              var d = getComputedStyle(c),
                e = c.scrollWidth > c.clientWidth || [d.overflow, d.overflowX].indexOf("scroll") >= 0 || this.target !== document.body,
                g = 0;
              e && (g = 15);
              var h = a.height - parseFloat(d.borderTopWidth) - parseFloat(d.borderBottomWidth) - g,
                b = {
                  width: 15,
                  height: .975 *h * (h / c.scrollHeight),
                  left: a.left + a.width - parseFloat(d.borderLeftWidth) - 15
                },
                i = 0;
              408 > h && this.target === document.body && (i = -11e-5 * Math.pow(h, 2) - .00727 * h + 22.58),
              this.target !== document.body && (b.height = Math.max(b.height, 24));
              var j = this.target.scrollTop / (c.scrollHeight - h);
              return b.top = j * (h - b.height - i) + a.top + parseFloat(d.borderTopWidth),
              this.target === document.body && (b.height = Math.max(b.height, 24)),
              b
            }
          }
        }, {
          key: "clearCache",
          value: function() {
            this._cache = {}
          }
        }, {
          key: "cache",
          value: function(a, b) {
            return "undefined" == typeof this._cache && (this._cache = {}),
            "undefined" == typeof this._cache[a] && (this._cache[a] = b.call(this)),
            this._cache[a]
          }
        }, {
          key: "enable",
          value: function() {
            var a = arguments.length <= 0 || void 0 === arguments[0]
              ? !0
              : arguments[0];
            this.options.addTargetClasses !== !1 && k(this.target, this.getClass("enabled")),
            k(this.element, this.getClass("enabled")),
            this.enabled = !0,
            this.scrollParent !== document && this.scrollParent.addEventListener("scroll", this.position),
            a && this.position()
          }
        }, {
          key: "disable",
          value: function() {
            j(this.target, this.getClass("enabled")),
            j(this.element, this.getClass("enabled")),
            this.enabled = !1,
            "undefined" != typeof this.scrollParent && this.scrollParent.removeEventListener("scroll", this.position)
          }
        }, {
          key: "destroy",
          value: function() {
            var a = this;
            this.disable(),
            G.forEach(function(b, c) {
              return b === a
                ? void G.splice(c, 1)
                : void 0
            })
          }
        }, {
          key: "updateAttachClasses",
          value: function(a, b) {
            var c = this;
            a = a || this.attachment,
            b = b || this.targetAttachment;
            var d = [
              "left",
              "top",
              "bottom",
              "right",
              "middle",
              "center"
            ];
            "undefined" != typeof this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length),
            "undefined" == typeof this._addAttachClasses && (this._addAttachClasses = []);
            var e = this._addAttachClasses;
            a.top && e.push(this.getClass("element-attached") + "-" + a.top),
            a.left && e.push(this.getClass("element-attached") + "-" + a.left),
            b.top && e.push(this.getClass("target-attached") + "-" + b.top),
            b.left && e.push(this.getClass("target-attached") + "-" + b.left);
            var f = [];
            d.forEach(function(a) {
              f.push(c.getClass("element-attached") + "-" + a),
              f.push(c.getClass("target-attached") + "-" + a)
            }),
            A(function() {
              "undefined" != typeof c._addAttachClasses && (o(c.element, c._addAttachClasses, f), c.options.addTargetClasses !== !1 && o(c.target, c._addAttachClasses, f), delete c._addAttachClasses)
            })
          }
        }, {
          key: "position",
          value: function() {
            var a = this,
              b = arguments.length <= 0 || void 0 === arguments[0]
                ? !0
                : arguments[0];
            if (this.enabled) {
              this.clearCache();
              var c = L(this.targetAttachment, this.attachment);
              this.updateAttachClasses(this.attachment, c);
              var d = this.cache("element-bounds", function() {
                  return f(a.element)
                }),
                e = d.width,
                i = d.height;
              if (0 === e && 0 === i && "undefined" != typeof this.lastSize) {
                var j = this.lastSize;
                e = j.width,
                i = j.height
              } else 
                this.lastSize = {
                  width: e,
                  height: i
                };
              var k = this.cache("target-bounds", function() {
                  return a.getTargetBounds()
                }),
                l = k,
                m = s(M(this.attachment), {
                  width: e,
                  height: i
                }),
                n = s(M(c), l),
                o = s(this.offset, {
                  width: e,
                  height: i
                }),
                p = s(this.targetOffset, l);
              m = r(m, o),
              n = r(n, p);
              for (var q = k.left + n.left - m.left, t = k.top + n.top - m.top, u = 0; u < v.modules.length; ++u) {
                var w = v.modules[u],
                  x = w.position.call(this, {
                    left: q,
                    top: t,
                    targetAttachment: c,
                    targetPos: k,
                    elementPos: d,
                    offset: m,
                    targetOffset: n,
                    manualOffset: o,
                    manualTargetOffset: p,
                    scrollbarSize: z,
                    attachment: this.attachment
                  });
                if (x === !1) 
                  return !1;
                
                "undefined" != typeof x && "object" == typeof x && (t = x.top, q = x.left)
              }
              var y = {
                  page: {
                    top: t,
                    left: q
                  },
                  viewport: {
                    top: t - pageYOffset,
                    bottom: pageYOffset - t - i + innerHeight,
                    left: q - pageXOffset,
                    right: pageXOffset - q - e + innerWidth
                  }
                },
                z = void 0;
              return document.body.scrollWidth > window.innerWidth && (z = this.cache("scrollbar-size", h), y.viewport.bottom -= z.height),
              document.body.scrollHeight > window.innerHeight && (z = this.cache("scrollbar-size", h), y.viewport.right -= z.width),
              (-1 === ["", "static"].indexOf(document.body.style.position) || -1 === ["", "static"].indexOf(document.body.parentElement.style.position)) && (y.page.bottom = document.body.scrollHeight - t - i, y.page.right = document.body.scrollWidth - q - e),
              "undefined" != typeof this.options.optimizations && this.options.optimizations.moveElement !== !1 && "undefined" == typeof this.targetModifier && !function() {
                var b = a.cache("target-offsetparent", function() {
                    return g(a.target)
                  }),
                  c = a.cache("target-offsetparent-bounds", function() {
                    return f(b)
                  }),
                  d = getComputedStyle(b),
                  e = c,
                  h = {};
                if (["Top", "Left", "Bottom", "Right"].forEach(function(a) {
                  h[a.toLowerCase()] = parseFloat(d["border" + a + "Width"])
                }), c.right = document.body.scrollWidth - c.left - e.width + h.right, c.bottom = document.body.scrollHeight - c.top - e.height + h.bottom, y.page.top >= c.top + h.top && y.page.bottom >= c.bottom && y.page.left >= c.left + h.left && y.page.right >= c.right) {
                  var i = b.scrollTop,
                    j = b.scrollLeft;
                  y.offset = {
                    top: y.page.top - c.top + i - h.top,
                    left: y.page.left - c.left + j - h.left
                  }
                }
              }(),
              this.move(y),
              this.history.unshift(y),
              this.history.length > 3 && this.history.pop(),
              b && B(),
              !0
            }
          }
        }, {
          key: "move",
          value: function(a) {
            var b = this;
            if ("undefined" != typeof this.element.parentNode) {
              var c = {};
              for (var d in a) {
                c[d] = {};
                for (var e in a[d]) {
                  for (var f = !1, h = 0; h < this.history.length; ++h) {
                    var j = this.history[h];
                    if ("undefined" != typeof j[d] && !p(j[d][e], a[d][e])) {
                      f = !0;
                      break
                    }
                  }
                  f || (c[d][e] = !0)
                }
              }
              var k = {
                  top: "",
                  left: "",
                  right: "",
                  bottom: ""
                },
                l = function(a, c) {
                  console.log(a);
                  var d = "undefined" != typeof b.options.optimizations,
                    e = d
                      ? b.options.optimizations.gpu
                      : null;
                  if (e !== !1) {
                    var f = void 0,
                      g = void 0;
                    a.top
                      ? (k.top = 0, f = c.top)
                      : (k.bottom = 0, f = -c.bottom),
                    a.left
                      ? (k.left = 0, g = c.left)
                      : (k.right = 0, g = -c.right),
                    k[F] = "translateX(" + Math.round(g) + "px) translateY(" + Math.round(f) + "px)",
                    "msTransform" !== F && (k[F] += " translateZ(0)")
                  } else 
                    a.top
                      ? k.top = c.top + "px"
                      : k.bottom = c.bottom + "px",
                    a.left
                      ? k.left = c.left + "px"
                      : k.right = c.right + "px"
                  },
                m = !1;
              if (
                (c.page.top || c.page.bottom) && (c.page.left || c.page.right)
                ? (k.position = "absolute", l(c.page, a.page))
                : (c.viewport.top || c.viewport.bottom) && (c.viewport.left || c.viewport.right)
                  ? (k.position = "fixed", l(c.viewport, a.viewport))
                  : "undefined" != typeof c.offset && c.offset.top && c.offset.left
                    ? !function() {
                      k.position = "absolute";
                      var d = b.cache("target-offsetparent", function() {
                        return g(b.target)
                      });
                      g(b.element) !== d && A(function() {
                        b.element.parentNode.removeChild(b.element),
                        d.appendChild(b.element)
                      }),
                      l(c.offset, a.offset),
                      m = !0
                    }()
                    : (k.position = "absolute", l({
                      top: !0,
                      left: !0
                    }, a.page)),
              !m) {
                for (var n = !0, o = this.element.parentNode; o && "BODY" !== o.tagName;) {
                  if ("static" !== getComputedStyle(o).position) {
                    n = !1;
                    break
                  }
                  o = o.parentNode
                }
                n || (this.element.parentNode.removeChild(this.element), document.body.appendChild(this.element))
              }
              var q = {},
                r = !1;
              for (var e in k) {
                var s = k[e],
                  t = this.element.style[e];
                "" !== t && "" !== s && ["top", "left", "bottom", "right"].indexOf(e) >= 0 && (t = parseFloat(t), s = parseFloat(s)),
                t !== s && (r = !0, q[e] = s)
              }
              r && A(function() {
                i(b.element.style, q)
              })
            }
          }
        }
      ]),
      a
    }();
  P.modules = [],
  v.position = H;
  var Q = i(P, v),
    D = function() {
      function a(a, b) {
        var c = [],
          d = !0,
          e = !1,
          f = void 0;
        try {
          for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0) ;
          }
        catch (i) {
          e = !0,
          f = i
        } finally {
          try {
            !d && h["return"] && h["return"]()
          } finally {
            if (e) 
              throw f
          }
        }
        return c
      }
      return function(b, c) {
        if (Array.isArray(b)) 
          return b;
        if (Symbol.iterator in Object(b)) 
          return a(b, c);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }(),
    E = v.Utils,
    f = E.getBounds,
    i = E.extend,
    o = E.updateClasses,
    A = E.defer,
    R = ["left", "top", "right", "bottom"];
  v.modules.push({
    position: function(a) {
      var b = this,
        c = a.top,
        d = a.left,
        e = a.targetAttachment;
      if (!this.options.constraints) 
        return !0;
      var g = this.cache("element-bounds", function() {
          return f(b.element)
        }),
        h = g.height,
        j = g.width;
      if (0 === j && 0 === h && "undefined" != typeof this.lastSize) {
        var k = this.lastSize;
        j = k.width,
        h = k.height
      }
      var l = this.cache("target-bounds", function() {
          return b.getTargetBounds()
        }),
        m = l.height,
        n = l.width,
        p = [this.getClass("pinned"), this.getClass("out-of-bounds")];
      this.options.constraints.forEach(function(a) {
        var b = a.outOfBoundsClass,
          c = a.pinnedClass;
        b && p.push(b),
        c && p.push(c)
      }),
      p.forEach(function(a) {
        ["left", "top", "right", "bottom"].forEach(function(b) {
          p.push(a + "-" + b)
        })
      });
      var q = [],
        r = i({}, e),
        s = i({}, this.attachment);
      return this.options.constraints.forEach(function(a) {
        var f = a.to,
          g = a.attachment,
          i = a.pin;
        "undefined" == typeof g && (g = "");
        var k = void 0,
          l = void 0;
        if (g.indexOf(" ") >= 0) {
          var o = g.split(" "),
            p = D(o, 2);
          l = p[0],
          k = p[1]
        } else 
          k = l = g;
        var u = t(b, f);
        ("target" === l || "both" === l) && (c < u[1] && "top" === r.top && (c += m, r.top = "bottom"), c + h > u[3] && "bottom" === r.top && (c -= m, r.top = "top")),
        "together" === l && (c < u[1] && "top" === r.top && (
          "bottom" === s.top
          ? (c += m, r.top = "bottom", c += h, s.top = "top")
          : "top" === s.top && (c += m, r.top = "bottom", c -= h, s.top = "bottom")), c + h > u[3] && "bottom" === r.top && (
          "top" === s.top
          ? (c -= m, r.top = "top", c -= h, s.top = "bottom")
          : "bottom" === s.top && (c -= m, r.top = "top", c += h, s.top = "top")), "middle" === r.top && (
          c + h > u[3] && "top" === s.top
          ? (c -= h, s.top = "bottom")
          : c < u[1] && "bottom" === s.top && (c += h, s.top = "top"))),
        ("target" === k || "both" === k) && (d < u[0] && "left" === r.left && (d += n, r.left = "right"), d + j > u[2] && "right" === r.left && (d -= n, r.left = "left")),
        "together" === k && (
          d < u[0] && "left" === r.left
          ? "right" === s.left
            ? (d += n, r.left = "right", d += j, s.left = "left")
            : "left" === s.left && (d += n, r.left = "right", d -= j, s.left = "right")
          : d + j > u[2] && "right" === r.left
            ? "left" === s.left
              ? (d -= n, r.left = "left", d -= j, s.left = "right")
              : "right" === s.left && (d -= n, r.left = "left", d += j, s.left = "left")
            : "center" === r.left && (
              d + j > u[2] && "left" === s.left
              ? (d -= j, s.left = "right")
              : d < u[0] && "right" === s.left && (d += j, s.left = "left"))),
        ("element" === l || "both" === l) && (c < u[1] && "bottom" === s.top && (c += h, s.top = "top"), c + h > u[3] && "top" === s.top && (c -= h, s.top = "bottom")),
        ("element" === k || "both" === k) && (d < u[0] && "right" === s.left && (d += j, s.left = "left"), d + j > u[2] && "left" === s.left && (d -= j, s.left = "right")),
        "string" == typeof i
          ? i = i.split(",").map(function(a) {
            return a.trim()
          })
          : i === !0 && (i = ["top", "left", "right", "bottom"]),
        i = i || [];
        var v = [],
          w = [];
        c < u[1] && (
          i.indexOf("top") >= 0
          ? (c = u[1], v.push("top"))
          : w.push("top")),
        c + h > u[3] && (
          i.indexOf("bottom") >= 0
          ? (c = u[3] - h, v.push("bottom"))
          : w.push("bottom")),
        d < u[0] && (
          i.indexOf("left") >= 0
          ? (d = u[0], v.push("left"))
          : w.push("left")),
        d + j > u[2] && (
          i.indexOf("right") >= 0
          ? (d = u[2] - j, v.push("right"))
          : w.push("right")),
        v.length && !function() {
          var a = void 0;
          a = "undefined" != typeof b.options.pinnedClass
            ? b.options.pinnedClass
            : b.getClass("pinned"),
          q.push(a),
          v.forEach(function(b) {
            q.push(a + "-" + b)
          })
        }(),
        w.length && !function() {
          var a = void 0;
          a = "undefined" != typeof b.options.outOfBoundsClass
            ? b.options.outOfBoundsClass
            : b.getClass("out-of-bounds"),
          q.push(a),
          w.forEach(function(b) {
            q.push(a + "-" + b)
          })
        }(),
        (v.indexOf("left") >= 0 || v.indexOf("right") >= 0) && (s.left = r.left = !1),
        (v.indexOf("top") >= 0 || v.indexOf("bottom") >= 0) && (s.top = r.top = !1),
        (r.top !== e.top || r.left !== e.left || s.top !== b.attachment.top || s.left !== b.attachment.left) && b.updateAttachClasses(s, r)
      }),
      A(function() {
        b.options.addTargetClasses !== !1 && o(b.target, q, p),
        o(b.element, q, p)
      }), {
        top: c,
        left: d
      }
    }
  });
  var E = v.Utils,
    f = E.getBounds,
    o = E.updateClasses,
    A = E.defer;
  v.modules.push({
    position: function(a) {
      var b = this,
        c = a.top,
        d = a.left,
        e = this.cache("element-bounds", function() {
          return f(b.element)
        }),
        g = e.height,
        h = e.width,
        i = this.getTargetBounds(),
        j = c + g,
        k = d + h,
        l = [];
      c <= i.bottom && j >= i.top && ["left", "right"].forEach(function(a) {
        var b = i[a];
        (b === d || b === k) && l.push(a)
      }),
      d <= i.right && k >= i.left && ["top", "bottom"].forEach(function(a) {
        var b = i[a];
        (b === c || b === j) && l.push(a)
      });
      var m = [],
        n = [],
        p = ["left", "top", "right", "bottom"];
      return m.push(this.getClass("abutted")),
      p.forEach(function(a) {
        m.push(b.getClass("abutted") + "-" + a)
      }),
      l.length && n.push(this.getClass("abutted")),
      l.forEach(function(a) {
        n.push(b.getClass("abutted") + "-" + a)
      }),
      A(function() {
        b.options.addTargetClasses !== !1 && o(b.target, n, m),
        o(b.element, n, m)
      }),
      !0
    }
  });
  var D = function() {
    function a(a, b) {
      var c = [],
        d = !0,
        e = !1,
        f = void 0;
      try {
        for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0) ;
        }
      catch (i) {
        e = !0,
        f = i
      } finally {
        try {
          !d && h["return"] && h["return"]()
        } finally {
          if (e) 
            throw f
        }
      }
      return c
    }
    return function(b, c) {
      if (Array.isArray(b)) 
        return b;
      if (Symbol.iterator in Object(b)) 
        return a(b, c);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
  }();
  return v.modules.push({
    position: function(a) {
      var b = a.top,
        c = a.left;
      if (this.options.shift) {
        var d = this.options.shift;
        "function" == typeof this.options.shift && (d = this.options.shift.call(this, {
          top: b,
          left: c
        }));
        var e = void 0,
          f = void 0;
        if ("string" == typeof d) {
          d = d.split(" "),
          d[1] = d[1] || d[0];
          var g = D(d, 2);
          e = g[0],
          f = g[1],
          e = parseFloat(e, 10),
          f = parseFloat(f, 10)
        } else 
          e = d.top,
          f = d.left;
        return b += e,
        c += f, {
          top: b,
          left: c
        }
      }
    }
  }),
  Q
});
var Config = {};
Config.Emoji = {
  "00a9": [
    "\xa9", ["copyright"]
  ],
  "00ae": [
    "\xae", ["registered"]
  ],
  "203c": [
    "\u203c", ["bangbang"]
  ],
  2049: [
    "\u2049", ["interrobang"]
  ],
  2122: [
    "\u2122", ["tm"]
  ],
  2139: [
    "\u2139", ["information_source"]
  ],
  2194: [
    "\u2194", ["left_right_arrow"]
  ],
  2195: [
    "\u2195", ["arrow_up_down"]
  ],
  2196: [
    "\u2196", ["arrow_upper_left"]
  ],
  2197: [
    "\u2197", ["arrow_upper_right"]
  ],
  2198: [
    "\u2198", ["arrow_lower_right"]
  ],
  2199: [
    "\u2199", ["arrow_lower_left"]
  ],
  "21a9": [
    "\u21a9", ["leftwards_arrow_with_hook"]
  ],
  "21aa": [
    "\u21aa", ["arrow_right_hook"]
  ],
  "231a": [
    "\u231a", ["watch"]
  ],
  "231b": [
    "\u231b", ["hourglass"]
  ],
  "23e9": [
    "\u23e9", ["fast_forward"]
  ],
  "23ea": [
    "\u23ea", ["rewind"]
  ],
  "23eb": [
    "\u23eb", ["arrow_double_up"]
  ],
  "23ec": [
    "\u23ec", ["arrow_double_down"]
  ],
  "23f0": [
    "\u23f0", ["alarm_clock"]
  ],
  "23f3": [
    "\u23f3", ["hourglass_flowing_sand"]
  ],
  "24c2": [
    "\u24c2", ["m"]
  ],
  "25aa": [
    "\u25aa", ["black_small_square"]
  ],
  "25ab": [
    "\u25ab", ["white_small_square"]
  ],
  "25b6": [
    "\u25b6", ["arrow_forward"]
  ],
  "25c0": [
    "\u25c0", ["arrow_backward"]
  ],
  "25fb": [
    "\u25fb", ["white_medium_square"]
  ],
  "25fc": [
    "\u25fc", ["black_medium_square"]
  ],
  "25fd": [
    "\u25fd", ["white_medium_small_square"]
  ],
  "25fe": [
    "\u25fe", ["black_medium_small_square"]
  ],
  2600: [
    "\u2600", ["sunny"]
  ],
  2601: [
    "\u2601", ["cloud"]
  ],
  "260e": [
    "\u260e",
    [
      "phone", "telephone"
    ]
  ],
  2611: [
    "\u2611", ["ballot_box_with_check"]
  ],
  2614: [
    "\u2614", ["umbrella"]
  ],
  2615: [
    "\u2615", ["coffee"]
  ],
  "261d": [
    "\u261d", ["point_up"]
  ],
  "263a": [
    "\u263a", ["relaxed"]
  ],
  2648: [
    "\u2648", ["aries"]
  ],
  2649: [
    "\u2649", ["taurus"]
  ],
  "264a": [
    "\u264a", ["gemini"]
  ],
  "264b": [
    "\u264b", ["cancer"]
  ],
  "264c": [
    "\u264c", ["leo"]
  ],
  "264d": [
    "\u264d", ["virgo"]
  ],
  "264e": [
    "\u264e", ["libra"]
  ],
  "264f": [
    "\u264f", ["scorpius"]
  ],
  2650: [
    "\u2650", ["sagittarius"]
  ],
  2651: [
    "\u2651", ["capricorn"]
  ],
  2652: [
    "\u2652", ["aquarius"]
  ],
  2653: [
    "\u2653", ["pisces"]
  ],
  2660: [
    "\u2660", ["spades"]
  ],
  2663: [
    "\u2663", ["clubs"]
  ],
  2665: [
    "\u2665", ["hearts"]
  ],
  2666: [
    "\u2666", ["diamonds"]
  ],
  2668: [
    "\u2668", ["hotsprings"]
  ],
  "267b": [
    "\u267b", ["recycle"]
  ],
  "267f": [
    "\u267f", ["wheelchair"]
  ],
  2693: [
    "\u2693", ["anchor"]
  ],
  "26a0": [
    "\u26a0", ["warning"]
  ],
  "26a1": [
    "\u26a1", ["zap"]
  ],
  "26aa": [
    "\u26aa", ["white_circle"]
  ],
  "26ab": [
    "\u26ab", ["black_circle"]
  ],
  "26bd": [
    "\u26bd", ["soccer"]
  ],
  "26be": [
    "\u26be", ["baseball"]
  ],
  "26c4": [
    "\u26c4", ["snowman"]
  ],
  "26c5": [
    "\u26c5", ["partly_sunny"]
  ],
  "26ce": [
    "\u26ce", ["ophiuchus"]
  ],
  "26d4": [
    "\u26d4", ["no_entry"]
  ],
  "26ea": [
    "\u26ea", ["church"]
  ],
  "26f2": [
    "\u26f2", ["fountain"]
  ],
  "26f3": [
    "\u26f3", ["golf"]
  ],
  "26f5": [
    "\u26f5",
    [
      "boat", "sailboat"
    ]
  ],
  "26fa": [
    "\u26fa", ["tent"]
  ],
  "26fd": [
    "\u26fd", ["fuelpump"]
  ],
  2702: [
    "\u2702", ["scissors"]
  ],
  2705: [
    "\u2705", ["white_check_mark"]
  ],
  2708: [
    "\u2708", ["airplane"]
  ],
  2709: [
    "\u2709",
    [
      "email", "envelope"
    ]
  ],
  "270a": [
    "\u270a", ["fist"]
  ],
  "270b": [
    "\u270b",
    [
      "hand", "raised_hand"
    ]
  ],
  "270c": [
    "\u270c", ["v"]
  ],
  "270f": [
    "\u270f", ["pencil2"]
  ],
  2712: [
    "\u2712", ["black_nib"]
  ],
  2714: [
    "\u2714", ["heavy_check_mark"]
  ],
  2716: [
    "\u2716", ["heavy_multiplication_x"]
  ],
  2728: [
    "\u2728", ["sparkles"]
  ],
  2733: [
    "\u2733", ["eight_spoked_asterisk"]
  ],
  2734: [
    "\u2734", ["eight_pointed_black_star"]
  ],
  2744: [
    "\u2744", ["snowflake"]
  ],
  2747: [
    "\u2747", ["sparkle"]
  ],
  "274c": [
    "\u274c", ["x"]
  ],
  "274e": [
    "\u274e", ["negative_squared_cross_mark"]
  ],
  2753: [
    "\u2753", ["question"]
  ],
  2754: [
    "\u2754", ["grey_question"]
  ],
  2755: [
    "\u2755", ["grey_exclamation"]
  ],
  2757: [
    "\u2757",
    [
      "exclamation", "heavy_exclamation_mark"
    ]
  ],
  2764: [
    "\u2764", ["heart"], "<3"
  ],
  2795: [
    "\u2795", ["heavy_plus_sign"]
  ],
  2796: [
    "\u2796", ["heavy_minus_sign"]
  ],
  2797: [
    "\u2797", ["heavy_division_sign"]
  ],
  "27a1": [
    "\u27a1", ["arrow_right"]
  ],
  "27b0": [
    "\u27b0", ["curly_loop"]
  ],
  "27bf": [
    "\u27bf", ["loop"]
  ],
  2934: [
    "\u2934", ["arrow_heading_up"]
  ],
  2935: [
    "\u2935", ["arrow_heading_down"]
  ],
  "2b05": [
    "\u2b05", ["arrow_left"]
  ],
  "2b06": [
    "\u2b06", ["arrow_up"]
  ],
  "2b07": [
    "\u2b07", ["arrow_down"]
  ],
  "2b1b": [
    "\u2b1b", ["black_large_square"]
  ],
  "2b1c": [
    "\u2b1c", ["white_large_square"]
  ],
  "2b50": [
    "\u2b50", ["star"]
  ],
  "2b55": [
    "\u2b55", ["o"]
  ],
  3030: [
    "\u3030", ["wavy_dash"]
  ],
  "303d": [
    "\u303d", ["part_alternation_mark"]
  ],
  3297: [
    "\u3297", ["congratulations"]
  ],
  3299: [
    "\u3299", ["secret"]
  ],
  "1f004": [
    "\ud83c\udc04", ["mahjong"]
  ],
  "1f0cf": [
    "\ud83c\udccf", ["black_joker"]
  ],
  "1f170": [
    "\ud83c\udd70", ["a"]
  ],
  "1f171": [
    "\ud83c\udd71", ["b"]
  ],
  "1f17e": [
    "\ud83c\udd7e", ["o2"]
  ],
  "1f17f": [
    "\ud83c\udd7f", ["parking"]
  ],
  "1f18e": [
    "\ud83c\udd8e", ["ab"]
  ],
  "1f191": [
    "\ud83c\udd91", ["cl"]
  ],
  "1f192": [
    "\ud83c\udd92", ["cool"]
  ],
  "1f193": [
    "\ud83c\udd93", ["free"]
  ],
  "1f194": [
    "\ud83c\udd94", ["id"]
  ],
  "1f195": [
    "\ud83c\udd95", ["new"]
  ],
  "1f196": [
    "\ud83c\udd96", ["ng"]
  ],
  "1f197": [
    "\ud83c\udd97", ["ok"]
  ],
  "1f198": [
    "\ud83c\udd98", ["sos"]
  ],
  "1f199": [
    "\ud83c\udd99", ["up"]
  ],
  "1f19a": [
    "\ud83c\udd9a", ["vs"]
  ],
  "1f201": [
    "\ud83c\ude01", ["koko"]
  ],
  "1f202": [
    "\ud83c\ude02", ["sa"]
  ],
  "1f21a": [
    "\ud83c\ude1a", ["u7121"]
  ],
  "1f22f": [
    "\ud83c\ude2f", ["u6307"]
  ],
  "1f232": [
    "\ud83c\ude32", ["u7981"]
  ],
  "1f233": [
    "\ud83c\ude33", ["u7a7a"]
  ],
  "1f234": [
    "\ud83c\ude34", ["u5408"]
  ],
  "1f235": [
    "\ud83c\ude35", ["u6e80"]
  ],
  "1f236": [
    "\ud83c\ude36", ["u6709"]
  ],
  "1f237": [
    "\ud83c\ude37", ["u6708"]
  ],
  "1f238": [
    "\ud83c\ude38", ["u7533"]
  ],
  "1f239": [
    "\ud83c\ude39", ["u5272"]
  ],
  "1f23a": [
    "\ud83c\ude3a", ["u55b6"]
  ],
  "1f250": [
    "\ud83c\ude50", ["ideograph_advantage"]
  ],
  "1f251": [
    "\ud83c\ude51", ["accept"]
  ],
  "1f300": [
    "\ud83c\udf00", ["cyclone"]
  ],
  "1f301": [
    "\ud83c\udf01", ["foggy"]
  ],
  "1f302": [
    "\ud83c\udf02", ["closed_umbrella"]
  ],
  "1f303": [
    "\ud83c\udf03", ["night_with_stars"]
  ],
  "1f304": [
    "\ud83c\udf04", ["sunrise_over_mountains"]
  ],
  "1f305": [
    "\ud83c\udf05", ["sunrise"]
  ],
  "1f306": [
    "\ud83c\udf06", ["city_sunset"]
  ],
  "1f307": [
    "\ud83c\udf07", ["city_sunrise"]
  ],
  "1f308": [
    "\ud83c\udf08", ["rainbow"]
  ],
  "1f309": [
    "\ud83c\udf09", ["bridge_at_night"]
  ],
  "1f30a": [
    "\ud83c\udf0a", ["ocean"]
  ],
  "1f30b": [
    "\ud83c\udf0b", ["volcano"]
  ],
  "1f30c": [
    "\ud83c\udf0c", ["milky_way"]
  ],
  "1f30d": [
    "\ud83c\udf0d", ["earth_africa"]
  ],
  "1f30e": [
    "\ud83c\udf0e", ["earth_americas"]
  ],
  "1f30f": [
    "\ud83c\udf0f", ["earth_asia"]
  ],
  "1f310": [
    "\ud83c\udf10", ["globe_with_meridians"]
  ],
  "1f311": [
    "\ud83c\udf11", ["new_moon"]
  ],
  "1f312": [
    "\ud83c\udf12", ["waxing_crescent_moon"]
  ],
  "1f313": [
    "\ud83c\udf13", ["first_quarter_moon"]
  ],
  "1f314": [
    "\ud83c\udf14",
    [
      "moon", "waxing_gibbous_moon"
    ]
  ],
  "1f315": [
    "\ud83c\udf15", ["full_moon"]
  ],
  "1f316": [
    "\ud83c\udf16", ["waning_gibbous_moon"]
  ],
  "1f317": [
    "\ud83c\udf17", ["last_quarter_moon"]
  ],
  "1f318": [
    "\ud83c\udf18", ["waning_crescent_moon"]
  ],
  "1f319": [
    "\ud83c\udf19", ["crescent_moon"]
  ],
  "1f320": [
    "\ud83c\udf20", ["stars"]
  ],
  "1f31a": [
    "\ud83c\udf1a", ["new_moon_with_face"]
  ],
  "1f31b": [
    "\ud83c\udf1b", ["first_quarter_moon_with_face"]
  ],
  "1f31c": [
    "\ud83c\udf1c", ["last_quarter_moon_with_face"]
  ],
  "1f31d": [
    "\ud83c\udf1d", ["full_moon_with_face"]
  ],
  "1f31e": [
    "\ud83c\udf1e", ["sun_with_face"]
  ],
  "1f31f": [
    "\ud83c\udf1f", ["star2"]
  ],
  "1f330": [
    "\ud83c\udf30", ["chestnut"]
  ],
  "1f331": [
    "\ud83c\udf31", ["seedling"]
  ],
  "1f332": [
    "\ud83c\udf32", ["evergreen_tree"]
  ],
  "1f333": [
    "\ud83c\udf33", ["deciduous_tree"]
  ],
  "1f334": [
    "\ud83c\udf34", ["palm_tree"]
  ],
  "1f335": [
    "\ud83c\udf35", ["cactus"]
  ],
  "1f337": [
    "\ud83c\udf37", ["tulip"]
  ],
  "1f338": [
    "\ud83c\udf38", ["cherry_blossom"]
  ],
  "1f339": [
    "\ud83c\udf39", ["rose"]
  ],
  "1f33a": [
    "\ud83c\udf3a", ["hibiscus"]
  ],
  "1f33b": [
    "\ud83c\udf3b", ["sunflower"]
  ],
  "1f33c": [
    "\ud83c\udf3c", ["blossom"]
  ],
  "1f33d": [
    "\ud83c\udf3d", ["corn"]
  ],
  "1f33e": [
    "\ud83c\udf3e", ["ear_of_rice"]
  ],
  "1f33f": [
    "\ud83c\udf3f", ["herb"]
  ],
  "1f340": [
    "\ud83c\udf40", ["four_leaf_clover"]
  ],
  "1f341": [
    "\ud83c\udf41", ["maple_leaf"]
  ],
  "1f342": [
    "\ud83c\udf42", ["fallen_leaf"]
  ],
  "1f343": [
    "\ud83c\udf43", ["leaves"]
  ],
  "1f344": [
    "\ud83c\udf44", ["mushroom"]
  ],
  "1f345": [
    "\ud83c\udf45", ["tomato"]
  ],
  "1f346": [
    "\ud83c\udf46", ["eggplant"]
  ],
  "1f347": [
    "\ud83c\udf47", ["grapes"]
  ],
  "1f348": [
    "\ud83c\udf48", ["melon"]
  ],
  "1f349": [
    "\ud83c\udf49", ["watermelon"]
  ],
  "1f34a": [
    "\ud83c\udf4a", ["tangerine"]
  ],
  "1f34b": [
    "\ud83c\udf4b", ["lemon"]
  ],
  "1f34c": [
    "\ud83c\udf4c", ["banana"]
  ],
  "1f34d": [
    "\ud83c\udf4d", ["pineapple"]
  ],
  "1f34e": [
    "\ud83c\udf4e", ["apple"]
  ],
  "1f34f": [
    "\ud83c\udf4f", ["green_apple"]
  ],
  "1f350": [
    "\ud83c\udf50", ["pear"]
  ],
  "1f351": [
    "\ud83c\udf51", ["peach"]
  ],
  "1f352": [
    "\ud83c\udf52", ["cherries"]
  ],
  "1f353": [
    "\ud83c\udf53", ["strawberry"]
  ],
  "1f354": [
    "\ud83c\udf54", ["hamburger"]
  ],
  "1f355": [
    "\ud83c\udf55", ["pizza"]
  ],
  "1f356": [
    "\ud83c\udf56", ["meat_on_bone"]
  ],
  "1f357": [
    "\ud83c\udf57", ["poultry_leg"]
  ],
  "1f358": [
    "\ud83c\udf58", ["rice_cracker"]
  ],
  "1f359": [
    "\ud83c\udf59", ["rice_ball"]
  ],
  "1f35a": [
    "\ud83c\udf5a", ["rice"]
  ],
  "1f35b": [
    "\ud83c\udf5b", ["curry"]
  ],
  "1f35c": [
    "\ud83c\udf5c", ["ramen"]
  ],
  "1f35d": [
    "\ud83c\udf5d", ["spaghetti"]
  ],
  "1f35e": [
    "\ud83c\udf5e", ["bread"]
  ],
  "1f35f": [
    "\ud83c\udf5f", ["fries"]
  ],
  "1f360": [
    "\ud83c\udf60", ["sweet_potato"]
  ],
  "1f361": [
    "\ud83c\udf61", ["dango"]
  ],
  "1f362": [
    "\ud83c\udf62", ["oden"]
  ],
  "1f363": [
    "\ud83c\udf63", ["sushi"]
  ],
  "1f364": [
    "\ud83c\udf64", ["fried_shrimp"]
  ],
  "1f365": [
    "\ud83c\udf65", ["fish_cake"]
  ],
  "1f366": [
    "\ud83c\udf66", ["icecream"]
  ],
  "1f367": [
    "\ud83c\udf67", ["shaved_ice"]
  ],
  "1f368": [
    "\ud83c\udf68", ["ice_cream"]
  ],
  "1f369": [
    "\ud83c\udf69", ["doughnut"]
  ],
  "1f36a": [
    "\ud83c\udf6a", ["cookie"]
  ],
  "1f36b": [
    "\ud83c\udf6b", ["chocolate_bar"]
  ],
  "1f36c": [
    "\ud83c\udf6c", ["candy"]
  ],
  "1f36d": [
    "\ud83c\udf6d", ["lollipop"]
  ],
  "1f36e": [
    "\ud83c\udf6e", ["custard"]
  ],
  "1f36f": [
    "\ud83c\udf6f", ["honey_pot"]
  ],
  "1f370": [
    "\ud83c\udf70", ["cake"]
  ],
  "1f371": [
    "\ud83c\udf71", ["bento"]
  ],
  "1f372": [
    "\ud83c\udf72", ["stew"]
  ],
  "1f373": [
    "\ud83c\udf73", ["egg"]
  ],
  "1f374": [
    "\ud83c\udf74", ["fork_and_knife"]
  ],
  "1f375": [
    "\ud83c\udf75", ["tea"]
  ],
  "1f376": [
    "\ud83c\udf76", ["sake"]
  ],
  "1f377": [
    "\ud83c\udf77", ["wine_glass"]
  ],
  "1f378": [
    "\ud83c\udf78", ["cocktail"]
  ],
  "1f379": [
    "\ud83c\udf79", ["tropical_drink"]
  ],
  "1f37a": [
    "\ud83c\udf7a", ["beer"]
  ],
  "1f37b": [
    "\ud83c\udf7b", ["beers"]
  ],
  "1f37c": [
    "\ud83c\udf7c", ["baby_bottle"]
  ],
  "1f380": [
    "\ud83c\udf80", ["ribbon"]
  ],
  "1f381": [
    "\ud83c\udf81", ["gift"]
  ],
  "1f382": [
    "\ud83c\udf82", ["birthday"]
  ],
  "1f383": [
    "\ud83c\udf83", ["jack_o_lantern"]
  ],
  "1f384": [
    "\ud83c\udf84", ["christmas_tree"]
  ],
  "1f385": [
    "\ud83c\udf85", ["santa"]
  ],
  "1f386": [
    "\ud83c\udf86", ["fireworks"]
  ],
  "1f387": [
    "\ud83c\udf87", ["sparkler"]
  ],
  "1f388": [
    "\ud83c\udf88", ["balloon"]
  ],
  "1f389": [
    "\ud83c\udf89", ["tada"]
  ],
  "1f38a": [
    "\ud83c\udf8a", ["confetti_ball"]
  ],
  "1f38b": [
    "\ud83c\udf8b", ["tanabata_tree"]
  ],
  "1f38c": [
    "\ud83c\udf8c", ["crossed_flags"]
  ],
  "1f38d": [
    "\ud83c\udf8d", ["bamboo"]
  ],
  "1f38e": [
    "\ud83c\udf8e", ["dolls"]
  ],
  "1f38f": [
    "\ud83c\udf8f", ["flags"]
  ],
  "1f390": [
    "\ud83c\udf90", ["wind_chime"]
  ],
  "1f391": [
    "\ud83c\udf91", ["rice_scene"]
  ],
  "1f392": [
    "\ud83c\udf92", ["school_satchel"]
  ],
  "1f393": [
    "\ud83c\udf93", ["mortar_board"]
  ],
  "1f3a0": [
    "\ud83c\udfa0", ["carousel_horse"]
  ],
  "1f3a1": [
    "\ud83c\udfa1", ["ferris_wheel"]
  ],
  "1f3a2": [
    "\ud83c\udfa2", ["roller_coaster"]
  ],
  "1f3a3": [
    "\ud83c\udfa3", ["fishing_pole_and_fish"]
  ],
  "1f3a4": [
    "\ud83c\udfa4", ["microphone"]
  ],
  "1f3a5": [
    "\ud83c\udfa5", ["movie_camera"]
  ],
  "1f3a6": [
    "\ud83c\udfa6", ["cinema"]
  ],
  "1f3a7": [
    "\ud83c\udfa7", ["headphones"]
  ],
  "1f3a8": [
    "\ud83c\udfa8", ["art"]
  ],
  "1f3a9": [
    "\ud83c\udfa9", ["tophat"]
  ],
  "1f3aa": [
    "\ud83c\udfaa", ["circus_tent"]
  ],
  "1f3ab": [
    "\ud83c\udfab", ["ticket"]
  ],
  "1f3ac": [
    "\ud83c\udfac", ["clapper"]
  ],
  "1f3ad": [
    "\ud83c\udfad", ["performing_arts"]
  ],
  "1f3ae": [
    "\ud83c\udfae", ["video_game"]
  ],
  "1f3af": [
    "\ud83c\udfaf", ["dart"]
  ],
  "1f3b0": [
    "\ud83c\udfb0", ["slot_machine"]
  ],
  "1f3b1": [
    "\ud83c\udfb1", ["8ball"]
  ],
  "1f3b2": [
    "\ud83c\udfb2", ["game_die"]
  ],
  "1f3b3": [
    "\ud83c\udfb3", ["bowling"]
  ],
  "1f3b4": [
    "\ud83c\udfb4", ["flower_playing_cards"]
  ],
  "1f3b5": [
    "\ud83c\udfb5", ["musical_note"]
  ],
  "1f3b6": [
    "\ud83c\udfb6", ["notes"]
  ],
  "1f3b7": [
    "\ud83c\udfb7", ["saxophone"]
  ],
  "1f3b8": [
    "\ud83c\udfb8", ["guitar"]
  ],
  "1f3b9": [
    "\ud83c\udfb9", ["musical_keyboard"]
  ],
  "1f3ba": [
    "\ud83c\udfba", ["trumpet"]
  ],
  "1f3bb": [
    "\ud83c\udfbb", ["violin"]
  ],
  "1f3bc": [
    "\ud83c\udfbc", ["musical_score"]
  ],
  "1f3bd": [
    "\ud83c\udfbd", ["running_shirt_with_sash"]
  ],
  "1f3be": [
    "\ud83c\udfbe", ["tennis"]
  ],
  "1f3bf": [
    "\ud83c\udfbf", ["ski"]
  ],
  "1f3c0": [
    "\ud83c\udfc0", ["basketball"]
  ],
  "1f3c1": [
    "\ud83c\udfc1", ["checkered_flag"]
  ],
  "1f3c2": [
    "\ud83c\udfc2", ["snowboarder"]
  ],
  "1f3c3": [
    "\ud83c\udfc3",
    [
      "runner", "running"
    ]
  ],
  "1f3c4": [
    "\ud83c\udfc4", ["surfer"]
  ],
  "1f3c6": [
    "\ud83c\udfc6", ["trophy"]
  ],
  "1f3c7": [
    "\ud83c\udfc7", ["horse_racing"]
  ],
  "1f3c8": [
    "\ud83c\udfc8", ["football"]
  ],
  "1f3c9": [
    "\ud83c\udfc9", ["rugby_football"]
  ],
  "1f3ca": [
    "\ud83c\udfca", ["swimmer"]
  ],
  "1f3e0": [
    "\ud83c\udfe0", ["house"]
  ],
  "1f3e1": [
    "\ud83c\udfe1", ["house_with_garden"]
  ],
  "1f3e2": [
    "\ud83c\udfe2", ["office"]
  ],
  "1f3e3": [
    "\ud83c\udfe3", ["post_office"]
  ],
  "1f3e4": [
    "\ud83c\udfe4", ["european_post_office"]
  ],
  "1f3e5": [
    "\ud83c\udfe5", ["hospital"]
  ],
  "1f3e6": [
    "\ud83c\udfe6", ["bank"]
  ],
  "1f3e7": [
    "\ud83c\udfe7", ["atm"]
  ],
  "1f3e8": [
    "\ud83c\udfe8", ["hotel"]
  ],
  "1f3e9": [
    "\ud83c\udfe9", ["love_hotel"]
  ],
  "1f3ea": [
    "\ud83c\udfea", ["convenience_store"]
  ],
  "1f3eb": [
    "\ud83c\udfeb", ["school"]
  ],
  "1f3ec": [
    "\ud83c\udfec", ["department_store"]
  ],
  "1f3ed": [
    "\ud83c\udfed", ["factory"]
  ],
  "1f3ee": [
    "\ud83c\udfee",
    [
      "izakaya_lantern", "lantern"
    ]
  ],
  "1f3ef": [
    "\ud83c\udfef", ["japanese_castle"]
  ],
  "1f3f0": [
    "\ud83c\udff0", ["european_castle"]
  ],
  "1f400": [
    "\ud83d\udc00", ["rat"]
  ],
  "1f401": [
    "\ud83d\udc01", ["mouse2"]
  ],
  "1f402": [
    "\ud83d\udc02", ["ox"]
  ],
  "1f403": [
    "\ud83d\udc03", ["water_buffalo"]
  ],
  "1f404": [
    "\ud83d\udc04", ["cow2"]
  ],
  "1f405": [
    "\ud83d\udc05", ["tiger2"]
  ],
  "1f406": [
    "\ud83d\udc06", ["leopard"]
  ],
  "1f407": [
    "\ud83d\udc07", ["rabbit2"]
  ],
  "1f408": [
    "\ud83d\udc08", ["cat2"]
  ],
  "1f409": [
    "\ud83d\udc09", ["dragon"]
  ],
  "1f40a": [
    "\ud83d\udc0a", ["crocodile"]
  ],
  "1f40b": [
    "\ud83d\udc0b", ["whale2"]
  ],
  "1f40c": [
    "\ud83d\udc0c", ["snail"]
  ],
  "1f40d": [
    "\ud83d\udc0d", ["snake"]
  ],
  "1f40e": [
    "\ud83d\udc0e", ["racehorse"]
  ],
  "1f40f": [
    "\ud83d\udc0f", ["ram"]
  ],
  "1f410": [
    "\ud83d\udc10", ["goat"]
  ],
  "1f411": [
    "\ud83d\udc11", ["sheep"]
  ],
  "1f412": [
    "\ud83d\udc12", ["monkey"]
  ],
  "1f413": [
    "\ud83d\udc13", ["rooster"]
  ],
  "1f414": [
    "\ud83d\udc14", ["chicken"]
  ],
  "1f415": [
    "\ud83d\udc15", ["dog2"]
  ],
  "1f416": [
    "\ud83d\udc16", ["pig2"]
  ],
  "1f417": [
    "\ud83d\udc17", ["boar"]
  ],
  "1f418": [
    "\ud83d\udc18", ["elephant"]
  ],
  "1f419": [
    "\ud83d\udc19", ["octopus"]
  ],
  "1f41a": [
    "\ud83d\udc1a", ["shell"]
  ],
  "1f41b": [
    "\ud83d\udc1b", ["bug"]
  ],
  "1f41c": [
    "\ud83d\udc1c", ["ant"]
  ],
  "1f41d": [
    "\ud83d\udc1d",
    [
      "bee", "honeybee"
    ]
  ],
  "1f41e": [
    "\ud83d\udc1e", ["beetle"]
  ],
  "1f41f": [
    "\ud83d\udc1f", ["fish"]
  ],
  "1f420": [
    "\ud83d\udc20", ["tropical_fish"]
  ],
  "1f421": [
    "\ud83d\udc21", ["blowfish"]
  ],
  "1f422": [
    "\ud83d\udc22", ["turtle"]
  ],
  "1f423": [
    "\ud83d\udc23", ["hatching_chick"]
  ],
  "1f424": [
    "\ud83d\udc24", ["baby_chick"]
  ],
  "1f425": [
    "\ud83d\udc25", ["hatched_chick"]
  ],
  "1f426": [
    "\ud83d\udc26", ["bird"]
  ],
  "1f427": [
    "\ud83d\udc27", ["penguin"]
  ],
  "1f428": [
    "\ud83d\udc28", ["koala"]
  ],
  "1f429": [
    "\ud83d\udc29", ["poodle"]
  ],
  "1f42a": [
    "\ud83d\udc2a", ["dromedary_camel"]
  ],
  "1f42b": [
    "\ud83d\udc2b", ["camel"]
  ],
  "1f42c": [
    "\ud83d\udc2c",
    [
      "dolphin", "flipper"
    ]
  ],
  "1f42d": [
    "\ud83d\udc2d", ["mouse"]
  ],
  "1f42e": [
    "\ud83d\udc2e", ["cow"]
  ],
  "1f42f": [
    "\ud83d\udc2f", ["tiger"]
  ],
  "1f430": [
    "\ud83d\udc30", ["rabbit"]
  ],
  "1f431": [
    "\ud83d\udc31", ["cat"]
  ],
  "1f432": [
    "\ud83d\udc32", ["dragon_face"]
  ],
  "1f433": [
    "\ud83d\udc33", ["whale"]
  ],
  "1f434": [
    "\ud83d\udc34", ["horse"]
  ],
  "1f435": [
    "\ud83d\udc35", ["monkey_face"]
  ],
  "1f436": [
    "\ud83d\udc36", ["dog"]
  ],
  "1f437": [
    "\ud83d\udc37", ["pig"]
  ],
  "1f438": [
    "\ud83d\udc38", ["frog"]
  ],
  "1f439": [
    "\ud83d\udc39", ["hamster"]
  ],
  "1f43a": [
    "\ud83d\udc3a", ["wolf"]
  ],
  "1f43b": [
    "\ud83d\udc3b", ["bear"]
  ],
  "1f43c": [
    "\ud83d\udc3c", ["panda_face"]
  ],
  "1f43d": [
    "\ud83d\udc3d", ["pig_nose"]
  ],
  "1f43e": [
    "\ud83d\udc3e",
    [
      "feet", "paw_prints"
    ]
  ],
  "1f440": [
    "\ud83d\udc40", ["eyes"]
  ],
  "1f442": [
    "\ud83d\udc42", ["ear"]
  ],
  "1f443": [
    "\ud83d\udc43", ["nose"]
  ],
  "1f444": [
    "\ud83d\udc44", ["lips"]
  ],
  "1f445": [
    "\ud83d\udc45", ["tongue"]
  ],
  "1f446": [
    "\ud83d\udc46", ["point_up_2"]
  ],
  "1f447": [
    "\ud83d\udc47", ["point_down"]
  ],
  "1f448": [
    "\ud83d\udc48", ["point_left"]
  ],
  "1f449": [
    "\ud83d\udc49", ["point_right"]
  ],
  "1f44a": [
    "\ud83d\udc4a",
    [
      "facepunch", "punch"
    ]
  ],
  "1f44b": [
    "\ud83d\udc4b", ["wave"]
  ],
  "1f44c": [
    "\ud83d\udc4c", ["ok_hand"]
  ],
  "1f44d": [
    "\ud83d\udc4d",
    [
      "+1", "thumbsup"
    ]
  ],
  "1f44e": [
    "\ud83d\udc4e",
    [
      "-1", "thumbsdown"
    ]
  ],
  "1f44f": [
    "\ud83d\udc4f", ["clap"]
  ],
  "1f450": [
    "\ud83d\udc50", ["open_hands"]
  ],
  "1f451": [
    "\ud83d\udc51", ["crown"]
  ],
  "1f452": [
    "\ud83d\udc52", ["womans_hat"]
  ],
  "1f453": [
    "\ud83d\udc53", ["eyeglasses"]
  ],
  "1f454": [
    "\ud83d\udc54", ["necktie"]
  ],
  "1f455": [
    "\ud83d\udc55",
    [
      "shirt", "tshirt"
    ]
  ],
  "1f456": [
    "\ud83d\udc56", ["jeans"]
  ],
  "1f457": [
    "\ud83d\udc57", ["dress"]
  ],
  "1f458": [
    "\ud83d\udc58", ["kimono"]
  ],
  "1f459": [
    "\ud83d\udc59", ["bikini"]
  ],
  "1f45a": [
    "\ud83d\udc5a", ["womans_clothes"]
  ],
  "1f45b": [
    "\ud83d\udc5b", ["purse"]
  ],
  "1f45c": [
    "\ud83d\udc5c", ["handbag"]
  ],
  "1f45d": [
    "\ud83d\udc5d", ["pouch"]
  ],
  "1f45e": [
    "\ud83d\udc5e",
    [
      "mans_shoe", "shoe"
    ]
  ],
  "1f45f": [
    "\ud83d\udc5f", ["athletic_shoe"]
  ],
  "1f460": [
    "\ud83d\udc60", ["high_heel"]
  ],
  "1f461": [
    "\ud83d\udc61", ["sandal"]
  ],
  "1f462": [
    "\ud83d\udc62", ["boot"]
  ],
  "1f463": [
    "\ud83d\udc63", ["footprints"]
  ],
  "1f464": [
    "\ud83d\udc64", ["bust_in_silhouette"]
  ],
  "1f465": [
    "\ud83d\udc65", ["busts_in_silhouette"]
  ],
  "1f466": [
    "\ud83d\udc66", ["boy"]
  ],
  "1f467": [
    "\ud83d\udc67", ["girl"]
  ],
  "1f468": [
    "\ud83d\udc68", ["man"]
  ],
  "1f469": [
    "\ud83d\udc69", ["woman"]
  ],
  "1f46a": [
    "\ud83d\udc6a", ["family"]
  ],
  "1f46b": [
    "\ud83d\udc6b", ["couple"]
  ],
  "1f46c": [
    "\ud83d\udc6c", ["two_men_holding_hands"]
  ],
  "1f46d": [
    "\ud83d\udc6d", ["two_women_holding_hands"]
  ],
  "1f46e": [
    "\ud83d\udc6e", ["cop"]
  ],
  "1f46f": [
    "\ud83d\udc6f", ["dancers"]
  ],
  "1f470": [
    "\ud83d\udc70", ["bride_with_veil"]
  ],
  "1f471": [
    "\ud83d\udc71", ["person_with_blond_hair"]
  ],
  "1f472": [
    "\ud83d\udc72", ["man_with_gua_pi_mao"]
  ],
  "1f473": [
    "\ud83d\udc73", ["man_with_turban"]
  ],
  "1f474": [
    "\ud83d\udc74", ["older_man"]
  ],
  "1f475": [
    "\ud83d\udc75", ["older_woman"]
  ],
  "1f476": [
    "\ud83d\udc76", ["baby"]
  ],
  "1f477": [
    "\ud83d\udc77", ["construction_worker"]
  ],
  "1f478": [
    "\ud83d\udc78", ["princess"]
  ],
  "1f479": [
    "\ud83d\udc79", ["japanese_ogre"]
  ],
  "1f47a": [
    "\ud83d\udc7a", ["japanese_goblin"]
  ],
  "1f47b": [
    "\ud83d\udc7b", ["ghost"]
  ],
  "1f47c": [
    "\ud83d\udc7c", ["angel"]
  ],
  "1f47d": [
    "\ud83d\udc7d", ["alien"]
  ],
  "1f47e": [
    "\ud83d\udc7e", ["space_invader"]
  ],
  "1f47f": [
    "\ud83d\udc7f", ["imp"]
  ],
  "1f480": [
    "\ud83d\udc80", ["skull"]
  ],
  "1f481": [
    "\ud83d\udc81", ["information_desk_person"]
  ],
  "1f482": [
    "\ud83d\udc82", ["guardsman"]
  ],
  "1f483": [
    "\ud83d\udc83", ["dancer"]
  ],
  "1f484": [
    "\ud83d\udc84", ["lipstick"]
  ],
  "1f485": [
    "\ud83d\udc85", ["nail_care"]
  ],
  "1f486": [
    "\ud83d\udc86", ["massage"]
  ],
  "1f487": [
    "\ud83d\udc87", ["haircut"]
  ],
  "1f488": [
    "\ud83d\udc88", ["barber"]
  ],
  "1f489": [
    "\ud83d\udc89", ["syringe"]
  ],
  "1f48a": [
    "\ud83d\udc8a", ["pill"]
  ],
  "1f48b": [
    "\ud83d\udc8b", ["kiss"]
  ],
  "1f48c": [
    "\ud83d\udc8c", ["love_letter"]
  ],
  "1f48d": [
    "\ud83d\udc8d", ["ring"]
  ],
  "1f48e": [
    "\ud83d\udc8e", ["gem"]
  ],
  "1f48f": [
    "\ud83d\udc8f", ["couplekiss"]
  ],
  "1f490": [
    "\ud83d\udc90", ["bouquet"]
  ],
  "1f491": [
    "\ud83d\udc91", ["couple_with_heart"]
  ],
  "1f492": [
    "\ud83d\udc92", ["wedding"]
  ],
  "1f493": [
    "\ud83d\udc93", ["heartbeat"]
  ],
  "1f494": [
    "\ud83d\udc94", ["broken_heart"], "</3"
  ],
  "1f495": [
    "\ud83d\udc95", ["two_hearts"]
  ],
  "1f496": [
    "\ud83d\udc96", ["sparkling_heart"]
  ],
  "1f497": [
    "\ud83d\udc97", ["heartpulse"]
  ],
  "1f498": [
    "\ud83d\udc98", ["cupid"]
  ],
  "1f499": [
    "\ud83d\udc99", ["blue_heart"], "<3"
  ],
  "1f49a": [
    "\ud83d\udc9a", ["green_heart"], "<3"
  ],
  "1f49b": [
    "\ud83d\udc9b", ["yellow_heart"], "<3"
  ],
  "1f49c": [
    "\ud83d\udc9c", ["purple_heart"], "<3"
  ],
  "1f49d": [
    "\ud83d\udc9d", ["gift_heart"]
  ],
  "1f49e": [
    "\ud83d\udc9e", ["revolving_hearts"]
  ],
  "1f49f": [
    "\ud83d\udc9f", ["heart_decoration"]
  ],
  "1f4a0": [
    "\ud83d\udca0", ["diamond_shape_with_a_dot_inside"]
  ],
  "1f4a1": [
    "\ud83d\udca1", ["bulb"]
  ],
  "1f4a2": [
    "\ud83d\udca2", ["anger"]
  ],
  "1f4a3": [
    "\ud83d\udca3", ["bomb"]
  ],
  "1f4a4": [
    "\ud83d\udca4", ["zzz"]
  ],
  "1f4a5": [
    "\ud83d\udca5",
    [
      "boom", "collision"
    ]
  ],
  "1f4a6": [
    "\ud83d\udca6", ["sweat_drops"]
  ],
  "1f4a7": [
    "\ud83d\udca7", ["droplet"]
  ],
  "1f4a8": [
    "\ud83d\udca8", ["dash"]
  ],
  "1f4a9": [
    "\ud83d\udca9",
    [
      "hankey", "poop", "shit"
    ]
  ],
  "1f4aa": [
    "\ud83d\udcaa", ["muscle"]
  ],
  "1f4ab": [
    "\ud83d\udcab", ["dizzy"]
  ],
  "1f4ac": [
    "\ud83d\udcac", ["speech_balloon"]
  ],
  "1f4ad": [
    "\ud83d\udcad", ["thought_balloon"]
  ],
  "1f4ae": [
    "\ud83d\udcae", ["white_flower"]
  ],
  "1f4af": [
    "\ud83d\udcaf", ["100"]
  ],
  "1f4b0": [
    "\ud83d\udcb0", ["moneybag"]
  ],
  "1f4b1": [
    "\ud83d\udcb1", ["currency_exchange"]
  ],
  "1f4b2": [
    "\ud83d\udcb2", ["heavy_dollar_sign"]
  ],
  "1f4b3": [
    "\ud83d\udcb3", ["credit_card"]
  ],
  "1f4b4": [
    "\ud83d\udcb4", ["yen"]
  ],
  "1f4b5": [
    "\ud83d\udcb5", ["dollar"]
  ],
  "1f4b6": [
    "\ud83d\udcb6", ["euro"]
  ],
  "1f4b7": [
    "\ud83d\udcb7", ["pound"]
  ],
  "1f4b8": [
    "\ud83d\udcb8", ["money_with_wings"]
  ],
  "1f4b9": [
    "\ud83d\udcb9", ["chart"]
  ],
  "1f4ba": [
    "\ud83d\udcba", ["seat"]
  ],
  "1f4bb": [
    "\ud83d\udcbb", ["computer"]
  ],
  "1f4bc": [
    "\ud83d\udcbc", ["briefcase"]
  ],
  "1f4bd": [
    "\ud83d\udcbd", ["minidisc"]
  ],
  "1f4be": [
    "\ud83d\udcbe", ["floppy_disk"]
  ],
  "1f4bf": [
    "\ud83d\udcbf", ["cd"]
  ],
  "1f4c0": [
    "\ud83d\udcc0", ["dvd"]
  ],
  "1f4c1": [
    "\ud83d\udcc1", ["file_folder"]
  ],
  "1f4c2": [
    "\ud83d\udcc2", ["open_file_folder"]
  ],
  "1f4c3": [
    "\ud83d\udcc3", ["page_with_curl"]
  ],
  "1f4c4": [
    "\ud83d\udcc4", ["page_facing_up"]
  ],
  "1f4c5": [
    "\ud83d\udcc5", ["date"]
  ],
  "1f4c6": [
    "\ud83d\udcc6", ["calendar"]
  ],
  "1f4c7": [
    "\ud83d\udcc7", ["card_index"]
  ],
  "1f4c8": [
    "\ud83d\udcc8", ["chart_with_upwards_trend"]
  ],
  "1f4c9": [
    "\ud83d\udcc9", ["chart_with_downwards_trend"]
  ],
  "1f4ca": [
    "\ud83d\udcca", ["bar_chart"]
  ],
  "1f4cb": [
    "\ud83d\udccb", ["clipboard"]
  ],
  "1f4cc": [
    "\ud83d\udccc", ["pushpin"]
  ],
  "1f4cd": [
    "\ud83d\udccd", ["round_pushpin"]
  ],
  "1f4ce": [
    "\ud83d\udcce", ["paperclip"]
  ],
  "1f4cf": [
    "\ud83d\udccf", ["straight_ruler"]
  ],
  "1f4d0": [
    "\ud83d\udcd0", ["triangular_ruler"]
  ],
  "1f4d1": [
    "\ud83d\udcd1", ["bookmark_tabs"]
  ],
  "1f4d2": [
    "\ud83d\udcd2", ["ledger"]
  ],
  "1f4d3": [
    "\ud83d\udcd3", ["notebook"]
  ],
  "1f4d4": [
    "\ud83d\udcd4", ["notebook_with_decorative_cover"]
  ],
  "1f4d5": [
    "\ud83d\udcd5", ["closed_book"]
  ],
  "1f4d6": [
    "\ud83d\udcd6",
    [
      "book", "open_book"
    ]
  ],
  "1f4d7": [
    "\ud83d\udcd7", ["green_book"]
  ],
  "1f4d8": [
    "\ud83d\udcd8", ["blue_book"]
  ],
  "1f4d9": [
    "\ud83d\udcd9", ["orange_book"]
  ],
  "1f4da": [
    "\ud83d\udcda", ["books"]
  ],
  "1f4db": [
    "\ud83d\udcdb", ["name_badge"]
  ],
  "1f4dc": [
    "\ud83d\udcdc", ["scroll"]
  ],
  "1f4dd": [
    "\ud83d\udcdd",
    [
      "memo", "pencil"
    ]
  ],
  "1f4de": [
    "\ud83d\udcde", ["telephone_receiver"]
  ],
  "1f4df": [
    "\ud83d\udcdf", ["pager"]
  ],
  "1f4e0": [
    "\ud83d\udce0", ["fax"]
  ],
  "1f4e1": [
    "\ud83d\udce1", ["satellite"]
  ],
  "1f4e2": [
    "\ud83d\udce2", ["loudspeaker"]
  ],
  "1f4e3": [
    "\ud83d\udce3", ["mega"]
  ],
  "1f4e4": [
    "\ud83d\udce4", ["outbox_tray"]
  ],
  "1f4e5": [
    "\ud83d\udce5", ["inbox_tray"]
  ],
  "1f4e6": [
    "\ud83d\udce6", ["package"]
  ],
  "1f4e7": [
    "\ud83d\udce7", ["e-mail"]
  ],
  "1f4e8": [
    "\ud83d\udce8", ["incoming_envelope"]
  ],
  "1f4e9": [
    "\ud83d\udce9", ["envelope_with_arrow"]
  ],
  "1f4ea": [
    "\ud83d\udcea", ["mailbox_closed"]
  ],
  "1f4eb": [
    "\ud83d\udceb", ["mailbox"]
  ],
  "1f4ec": [
    "\ud83d\udcec", ["mailbox_with_mail"]
  ],
  "1f4ed": [
    "\ud83d\udced", ["mailbox_with_no_mail"]
  ],
  "1f4ee": [
    "\ud83d\udcee", ["postbox"]
  ],
  "1f4ef": [
    "\ud83d\udcef", ["postal_horn"]
  ],
  "1f4f0": [
    "\ud83d\udcf0", ["newspaper"]
  ],
  "1f4f1": [
    "\ud83d\udcf1", ["iphone"]
  ],
  "1f4f2": [
    "\ud83d\udcf2", ["calling"]
  ],
  "1f4f3": [
    "\ud83d\udcf3", ["vibration_mode"]
  ],
  "1f4f4": [
    "\ud83d\udcf4", ["mobile_phone_off"]
  ],
  "1f4f5": [
    "\ud83d\udcf5", ["no_mobile_phones"]
  ],
  "1f4f6": [
    "\ud83d\udcf6", ["signal_strength"]
  ],
  "1f4f7": [
    "\ud83d\udcf7", ["camera"]
  ],
  "1f4f9": [
    "\ud83d\udcf9", ["video_camera"]
  ],
  "1f4fa": [
    "\ud83d\udcfa", ["tv"]
  ],
  "1f4fb": [
    "\ud83d\udcfb", ["radio"]
  ],
  "1f4fc": [
    "\ud83d\udcfc", ["vhs"]
  ],
  "1f500": [
    "\ud83d\udd00", ["twisted_rightwards_arrows"]
  ],
  "1f501": [
    "\ud83d\udd01", ["repeat"]
  ],
  "1f502": [
    "\ud83d\udd02", ["repeat_one"]
  ],
  "1f503": [
    "\ud83d\udd03", ["arrows_clockwise"]
  ],
  "1f504": [
    "\ud83d\udd04", ["arrows_counterclockwise"]
  ],
  "1f505": [
    "\ud83d\udd05", ["low_brightness"]
  ],
  "1f506": [
    "\ud83d\udd06", ["high_brightness"]
  ],
  "1f507": [
    "\ud83d\udd07", ["mute"]
  ],
  "1f508": [
    "\ud83d\udd09", ["speaker"]
  ],
  "1f509": [
    "\ud83d\udd09", ["sound"]
  ],
  "1f50a": [
    "\ud83d\udd0a", ["loud_sound"]
  ],
  "1f50b": [
    "\ud83d\udd0b", ["battery"]
  ],
  "1f50c": [
    "\ud83d\udd0c", ["electric_plug"]
  ],
  "1f50d": [
    "\ud83d\udd0d", ["mag"]
  ],
  "1f50e": [
    "\ud83d\udd0e", ["mag_right"]
  ],
  "1f50f": [
    "\ud83d\udd0f", ["lock_with_ink_pen"]
  ],
  "1f510": [
    "\ud83d\udd10", ["closed_lock_with_key"]
  ],
  "1f511": [
    "\ud83d\udd11", ["key"]
  ],
  "1f512": [
    "\ud83d\udd12", ["lock"]
  ],
  "1f513": [
    "\ud83d\udd13", ["unlock"]
  ],
  "1f514": [
    "\ud83d\udd14", ["bell"]
  ],
  "1f515": [
    "\ud83d\udd15", ["no_bell"]
  ],
  "1f516": [
    "\ud83d\udd16", ["bookmark"]
  ],
  "1f517": [
    "\ud83d\udd17", ["link"]
  ],
  "1f518": [
    "\ud83d\udd18", ["radio_button"]
  ],
  "1f519": [
    "\ud83d\udd19", ["back"]
  ],
  "1f51a": [
    "\ud83d\udd1a", ["end"]
  ],
  "1f51b": [
    "\ud83d\udd1b", ["on"]
  ],
  "1f51c": [
    "\ud83d\udd1c", ["soon"]
  ],
  "1f51d": [
    "\ud83d\udd1d", ["top"]
  ],
  "1f51e": [
    "\ud83d\udd1e", ["underage"]
  ],
  "1f51f": [
    "\ud83d\udd1f", ["keycap_ten"]
  ],
  "1f520": [
    "\ud83d\udd20", ["capital_abcd"]
  ],
  "1f521": [
    "\ud83d\udd21", ["abcd"]
  ],
  "1f522": [
    "\ud83d\udd22", ["1234"]
  ],
  "1f523": [
    "\ud83d\udd23", ["symbols"]
  ],
  "1f524": [
    "\ud83d\udd24", ["abc"]
  ],
  "1f525": [
    "\ud83d\udd25", ["fire"]
  ],
  "1f526": [
    "\ud83d\udd26", ["flashlight"]
  ],
  "1f527": [
    "\ud83d\udd27", ["wrench"]
  ],
  "1f528": [
    "\ud83d\udd28", ["hammer"]
  ],
  "1f529": [
    "\ud83d\udd29", ["nut_and_bolt"]
  ],
  "1f52a": [
    "\ud83d\udd2a", ["hocho"]
  ],
  "1f52b": [
    "\ud83d\udd2b", ["gun"]
  ],
  "1f52c": [
    "\ud83d\udd2c", ["microscope"]
  ],
  "1f52d": [
    "\ud83d\udd2d", ["telescope"]
  ],
  "1f52e": [
    "\ud83d\udd2e", ["crystal_ball"]
  ],
  "1f52f": [
    "\ud83d\udd2f", ["six_pointed_star"]
  ],
  "1f530": [
    "\ud83d\udd30", ["beginner"]
  ],
  "1f531": [
    "\ud83d\udd31", ["trident"]
  ],
  "1f532": [
    "\ud83d\udd32", ["black_square_button"]
  ],
  "1f533": [
    "\ud83d\udd33", ["white_square_button"]
  ],
  "1f534": [
    "\ud83d\udd34", ["red_circle"]
  ],
  "1f535": [
    "\ud83d\udd35", ["large_blue_circle"]
  ],
  "1f536": [
    "\ud83d\udd36", ["large_orange_diamond"]
  ],
  "1f537": [
    "\ud83d\udd37", ["large_blue_diamond"]
  ],
  "1f538": [
    "\ud83d\udd38", ["small_orange_diamond"]
  ],
  "1f539": [
    "\ud83d\udd39", ["small_blue_diamond"]
  ],
  "1f53a": [
    "\ud83d\udd3a", ["small_red_triangle"]
  ],
  "1f53b": [
    "\ud83d\udd3b", ["small_red_triangle_down"]
  ],
  "1f53c": [
    "\ud83d\udd3c", ["arrow_up_small"]
  ],
  "1f53d": [
    "\ud83d\udd3d", ["arrow_down_small"]
  ],
  "1f550": [
    "\ud83d\udd50", ["clock1"]
  ],
  "1f551": [
    "\ud83d\udd51", ["clock2"]
  ],
  "1f552": [
    "\ud83d\udd52", ["clock3"]
  ],
  "1f553": [
    "\ud83d\udd53", ["clock4"]
  ],
  "1f554": [
    "\ud83d\udd54", ["clock5"]
  ],
  "1f555": [
    "\ud83d\udd55", ["clock6"]
  ],
  "1f556": [
    "\ud83d\udd56", ["clock7"]
  ],
  "1f557": [
    "\ud83d\udd57", ["clock8"]
  ],
  "1f558": [
    "\ud83d\udd58", ["clock9"]
  ],
  "1f559": [
    "\ud83d\udd59", ["clock10"]
  ],
  "1f55a": [
    "\ud83d\udd5a", ["clock11"]
  ],
  "1f55b": [
    "\ud83d\udd5b", ["clock12"]
  ],
  "1f55c": [
    "\ud83d\udd5c", ["clock130"]
  ],
  "1f55d": [
    "\ud83d\udd5d", ["clock230"]
  ],
  "1f55e": [
    "\ud83d\udd5e", ["clock330"]
  ],
  "1f55f": [
    "\ud83d\udd5f", ["clock430"]
  ],
  "1f560": [
    "\ud83d\udd60", ["clock530"]
  ],
  "1f561": [
    "\ud83d\udd61", ["clock630"]
  ],
  "1f562": [
    "\ud83d\udd62", ["clock730"]
  ],
  "1f563": [
    "\ud83d\udd63", ["clock830"]
  ],
  "1f564": [
    "\ud83d\udd64", ["clock930"]
  ],
  "1f565": [
    "\ud83d\udd65", ["clock1030"]
  ],
  "1f566": [
    "\ud83d\udd66", ["clock1130"]
  ],
  "1f567": [
    "\ud83d\udd67", ["clock1230"]
  ],
  "1f5fb": [
    "\ud83d\uddfb", ["mount_fuji"]
  ],
  "1f5fc": [
    "\ud83d\uddfc", ["tokyo_tower"]
  ],
  "1f5fd": [
    "\ud83d\uddfd", ["statue_of_liberty"]
  ],
  "1f5fe": [
    "\ud83d\uddfe", ["japan"]
  ],
  "1f5ff": [
    "\ud83d\uddff", ["moyai"]
  ],
  "1f600": [
    "\ud83d\ude00", ["grinning"]
  ],
  "1f601": [
    "\ud83d\ude01", ["grin"]
  ],
  "1f602": [
    "\ud83d\ude02", ["joy"]
  ],
  "1f603": [
    "\ud83d\ude03", ["smiley"], ":)"
  ],
  "1f604": [
    "\ud83d\ude04", ["smile"], ":)"
  ],
  "1f605": [
    "\ud83d\ude05", ["sweat_smile"]
  ],
  "1f606": [
    "\ud83d\ude06", ["satisfied"]
  ],
  "1f607": [
    "\ud83d\ude07", ["innocent"]
  ],
  "1f608": [
    "\ud83d\ude08", ["smiling_imp"]
  ],
  "1f609": [
    "\ud83d\ude09", ["wink"], ";)"
  ],
  "1f60a": [
    "\ud83d\ude0a", ["blush"]
  ],
  "1f60b": [
    "\ud83d\ude0b", ["yum"]
  ],
  "1f60c": [
    "\ud83d\ude0c", ["relieved"]
  ],
  "1f60d": [
    "\ud83d\ude0d", ["heart_eyes"]
  ],
  "1f60e": [
    "\ud83d\ude0e", ["sunglasses"]
  ],
  "1f60f": [
    "\ud83d\ude0f", ["smirk"]
  ],
  "1f610": [
    "\ud83d\ude10", ["neutral_face"]
  ],
  "1f611": [
    "\ud83d\ude11", ["expressionless"]
  ],
  "1f612": [
    "\ud83d\ude12", ["unamused"]
  ],
  "1f613": [
    "\ud83d\ude13", ["sweat"]
  ],
  "1f614": [
    "\ud83d\ude14", ["pensive"]
  ],
  "1f615": [
    "\ud83d\ude15", ["confused"]
  ],
  "1f616": [
    "\ud83d\ude16", ["confounded"]
  ],
  "1f617": [
    "\ud83d\ude17", ["kissing"]
  ],
  "1f618": [
    "\ud83d\ude18", ["kissing_heart"]
  ],
  "1f619": [
    "\ud83d\ude19", ["kissing_smiling_eyes"]
  ],
  "1f61a": [
    "\ud83d\ude1a", ["kissing_closed_eyes"]
  ],
  "1f61b": [
    "\ud83d\ude1b", ["stuck_out_tongue"]
  ],
  "1f61c": [
    "\ud83d\ude1c", ["stuck_out_tongue_winking_eye"], ";p"
  ],
  "1f61d": [
    "\ud83d\ude1d", ["stuck_out_tongue_closed_eyes"]
  ],
  "1f61e": [
    "\ud83d\ude1e", ["disappointed"], ":("
  ],
  "1f61f": [
    "\ud83d\ude1f", ["worried"]
  ],
  "1f620": [
    "\ud83d\ude20", ["angry"]
  ],
  "1f621": [
    "\ud83d\ude21", ["rage"]
  ],
  "1f622": [
    "\ud83d\ude22", ["cry"], ":'("
  ],
  "1f623": [
    "\ud83d\ude23", ["persevere"]
  ],
  "1f624": [
    "\ud83d\ude24", ["triumph"]
  ],
  "1f625": [
    "\ud83d\ude25", ["disappointed_relieved"]
  ],
  "1f626": [
    "\ud83d\ude26", ["frowning"]
  ],
  "1f627": [
    "\ud83d\ude27", ["anguished"]
  ],
  "1f628": [
    "\ud83d\ude28", ["fearful"]
  ],
  "1f629": [
    "\ud83d\ude29", ["weary"]
  ],
  "1f62a": [
    "\ud83d\ude2a", ["sleepy"]
  ],
  "1f62b": [
    "\ud83d\ude2b", ["tired_face"]
  ],
  "1f62c": [
    "\ud83d\ude2c", ["grimacing"]
  ],
  "1f62d": [
    "\ud83d\ude2d", ["sob"], ":'("
  ],
  "1f62e": [
    "\ud83d\ude2e", ["open_mouth"]
  ],
  "1f62f": [
    "\ud83d\ude2f", ["hushed"]
  ],
  "1f630": [
    "\ud83d\ude30", ["cold_sweat"]
  ],
  "1f631": [
    "\ud83d\ude31", ["scream"]
  ],
  "1f632": [
    "\ud83d\ude32", ["astonished"]
  ],
  "1f633": [
    "\ud83d\ude33", ["flushed"]
  ],
  "1f634": [
    "\ud83d\ude34", ["sleeping"]
  ],
  "1f635": [
    "\ud83d\ude35", ["dizzy_face"]
  ],
  "1f636": [
    "\ud83d\ude36", ["no_mouth"]
  ],
  "1f637": [
    "\ud83d\ude37", ["mask"]
  ],
  "1f638": [
    "\ud83d\ude38", ["smile_cat"]
  ],
  "1f639": [
    "\ud83d\ude39", ["joy_cat"]
  ],
  "1f63a": [
    "\ud83d\ude3a", ["smiley_cat"]
  ],
  "1f63b": [
    "\ud83d\ude3b", ["heart_eyes_cat"]
  ],
  "1f63c": [
    "\ud83d\ude3c", ["smirk_cat"]
  ],
  "1f63d": [
    "\ud83d\ude3d", ["kissing_cat"]
  ],
  "1f63e": [
    "\ud83d\ude3e", ["pouting_cat"]
  ],
  "1f63f": [
    "\ud83d\ude3f", ["crying_cat_face"]
  ],
  "1f640": [
    "\ud83d\ude40", ["scream_cat"]
  ],
  "1f645": [
    "\ud83d\ude45", ["no_good"]
  ],
  "1f646": [
    "\ud83d\ude46", ["ok_woman"]
  ],
  "1f647": [
    "\ud83d\ude47", ["bow"]
  ],
  "1f648": [
    "\ud83d\ude48", ["see_no_evil"]
  ],
  "1f649": [
    "\ud83d\ude49", ["hear_no_evil"]
  ],
  "1f64a": [
    "\ud83d\ude4a", ["speak_no_evil"]
  ],
  "1f64b": [
    "\ud83d\ude4b", ["raising_hand"]
  ],
  "1f64c": [
    "\ud83d\ude4c", ["raised_hands"]
  ],
  "1f64d": [
    "\ud83d\ude4d", ["person_frowning"]
  ],
  "1f64e": [
    "\ud83d\ude4e", ["person_with_pouting_face"]
  ],
  "1f64f": [
    "\ud83d\ude4f", ["pray"]
  ],
  "1f680": [
    "\ud83d\ude80", ["rocket"]
  ],
  "1f681": [
    "\ud83d\ude81", ["helicopter"]
  ],
  "1f682": [
    "\ud83d\ude82", ["steam_locomotive"]
  ],
  "1f683": [
    "\ud83d\ude83", ["railway_car"]
  ],
  "1f68b": [
    "\ud83d\ude8b", ["train"]
  ],
  "1f684": [
    "\ud83d\ude84", ["bullettrain_side"]
  ],
  "1f685": [
    "\ud83d\ude85", ["bullettrain_front"]
  ],
  "1f686": [
    "\ud83d\ude86", ["train2"]
  ],
  "1f687": [
    "\ud83d\ude87", ["metro"]
  ],
  "1f688": [
    "\ud83d\ude88", ["light_rail"]
  ],
  "1f689": [
    "\ud83d\ude89", ["station"]
  ],
  "1f68a": [
    "\ud83d\ude8a", ["tram"]
  ],
  "1f68c": [
    "\ud83d\ude8c", ["bus"]
  ],
  "1f68d": [
    "\ud83d\ude8d", ["oncoming_bus"]
  ],
  "1f68e": [
    "\ud83d\ude8e", ["trolleybus"]
  ],
  "1f68f": [
    "\ud83d\ude8f", ["busstop"]
  ],
  "1f690": [
    "\ud83d\ude90", ["minibus"]
  ],
  "1f691": [
    "\ud83d\ude91", ["ambulance"]
  ],
  "1f692": [
    "\ud83d\ude92", ["fire_engine"]
  ],
  "1f693": [
    "\ud83d\ude93", ["police_car"]
  ],
  "1f694": [
    "\ud83d\ude94", ["oncoming_police_car"]
  ],
  "1f695": [
    "\ud83d\ude95", ["taxi"]
  ],
  "1f696": [
    "\ud83d\ude96", ["oncoming_taxi"]
  ],
  "1f697": [
    "\ud83d\ude97",
    [
      "car", "red_car"
    ]
  ],
  "1f698": [
    "\ud83d\ude98", ["oncoming_automobile"]
  ],
  "1f699": [
    "\ud83d\ude99", ["blue_car"]
  ],
  "1f69a": [
    "\ud83d\ude9a", ["truck"]
  ],
  "1f69b": [
    "\ud83d\ude9b", ["articulated_lorry"]
  ],
  "1f69c": [
    "\ud83d\ude9c", ["tractor"]
  ],
  "1f69d": [
    "\ud83d\ude9d", ["monorail"]
  ],
  "1f69e": [
    "\ud83d\ude9e", ["mountain_railway"]
  ],
  "1f69f": [
    "\ud83d\ude9f", ["suspension_railway"]
  ],
  "1f6a0": [
    "\ud83d\udea0", ["mountain_cableway"]
  ],
  "1f6a1": [
    "\ud83d\udea1", ["aerial_tramway"]
  ],
  "1f6a2": [
    "\ud83d\udea2", ["ship"]
  ],
  "1f6a3": [
    "\ud83d\udea3", ["rowboat"]
  ],
  "1f6a4": [
    "\ud83d\udea4", ["speedboat"]
  ],
  "1f6a5": [
    "\ud83d\udea5", ["traffic_light"]
  ],
  "1f6a6": [
    "\ud83d\udea6", ["vertical_traffic_light"]
  ],
  "1f6a7": [
    "\ud83d\udea7", ["construction"]
  ],
  "1f6a8": [
    "\ud83d\udea8", ["rotating_light"]
  ],
  "1f6a9": [
    "\ud83d\udea9", ["triangular_flag_on_post"]
  ],
  "1f6aa": [
    "\ud83d\udeaa", ["door"]
  ],
  "1f6ab": [
    "\ud83d\udeab", ["no_entry_sign"]
  ],
  "1f6ac": [
    "\ud83d\udeac", ["smoking"]
  ],
  "1f6ad": [
    "\ud83d\udead", ["no_smoking"]
  ],
  "1f6ae": [
    "\ud83d\udeae", ["put_litter_in_its_place"]
  ],
  "1f6af": [
    "\ud83d\udeaf", ["do_not_litter"]
  ],
  "1f6b0": [
    "\ud83d\udeb0", ["potable_water"]
  ],
  "1f6b1": [
    "\ud83d\udeb1", ["non-potable_water"]
  ],
  "1f6b2": [
    "\ud83d\udeb2", ["bike"]
  ],
  "1f6b3": [
    "\ud83d\udeb3", ["no_bicycles"]
  ],
  "1f6b4": [
    "\ud83d\udeb4", ["bicyclist"]
  ],
  "1f6b5": [
    "\ud83d\udeb5", ["mountain_bicyclist"]
  ],
  "1f6b6": [
    "\ud83d\udeb6", ["walking"]
  ],
  "1f6b7": [
    "\ud83d\udeb7", ["no_pedestrians"]
  ],
  "1f6b8": [
    "\ud83d\udeb8", ["children_crossing"]
  ],
  "1f6b9": [
    "\ud83d\udeb9", ["mens"]
  ],
  "1f6ba": [
    "\ud83d\udeba", ["womens"]
  ],
  "1f6bb": [
    "\ud83d\udebb", ["restroom"]
  ],
  "1f6bc": [
    "\ud83d\udebc", ["baby_symbol"]
  ],
  "1f6bd": [
    "\ud83d\udebd", ["toilet"]
  ],
  "1f6be": [
    "\ud83d\udebe", ["wc"]
  ],
  "1f6bf": [
    "\ud83d\udebf", ["shower"]
  ],
  "1f6c0": [
    "\ud83d\udec0", ["bath"]
  ],
  "1f6c1": [
    "\ud83d\udec1", ["bathtub"]
  ],
  "1f6c2": [
    "\ud83d\udec2", ["passport_control"]
  ],
  "1f6c3": [
    "\ud83d\udec3", ["customs"]
  ],
  "1f6c4": [
    "\ud83d\udec4", ["baggage_claim"]
  ],
  "1f6c5": [
    "\ud83d\udec5", ["left_luggage"]
  ],
  "0023": [
    "#\u20e3", ["hash"]
  ],
  "0030": [
    "0\u20e3", ["zero"]
  ],
  "0031": [
    "1\u20e3", ["one"]
  ],
  "0032": [
    "2\u20e3", ["two"]
  ],
  "0033": [
    "3\u20e3", ["three"]
  ],
  "0034": [
    "4\u20e3", ["four"]
  ],
  "0035": [
    "5\u20e3", ["five"]
  ],
  "0036": [
    "6\u20e3", ["six"]
  ],
  "0037": [
    "7\u20e3", ["seven"]
  ],
  "0038": [
    "8\u20e3", ["eight"]
  ],
  "0039": [
    "9\u20e3", ["nine"]
  ],
  "1f1e8-1f1f3": [
    "\ud83c\udde8\ud83c\uddf3", ["cn"]
  ],
  "1f1e9-1f1ea": [
    "\ud83c\udde9\ud83c\uddea", ["de"]
  ],
  "1f1ea-1f1f8": [
    "\ud83c\uddea\ud83c\uddf8", ["es"]
  ],
  "1f1eb-1f1f7": [
    "\ud83c\uddeb\ud83c\uddf7", ["fr"]
  ],
  "1f1ec-1f1e7": [
    "\ud83c\uddec\ud83c\udde7",
    [
      "gb", "uk"
    ]
  ],
  "1f1ee-1f1f9": [
    "\ud83c\uddee\ud83c\uddf9", ["it"]
  ],
  "1f1ef-1f1f5": [
    "\ud83c\uddef\ud83c\uddf5", ["jp"]
  ],
  "1f1f0-1f1f7": [
    "\ud83c\uddf0\ud83c\uddf7", ["kr"]
  ],
  "1f1f7-1f1fa": [
    "\ud83c\uddf7\ud83c\uddfa", ["ru"]
  ],
  "1f1fa-1f1f8": ["\ud83c\uddfa\ud83c\uddf8", ["us"]]
},
Config.EmojiCategories = [
  [
    "1f604",
    "1f603",
    "1f600",
    "1f60a",
    "263a",
    "1f609",
    "1f60d",
    "1f618",
    "1f61a",
    "1f617",
    "1f619",
    "1f61c",
    "1f61d",
    "1f61b",
    "1f633",
    "1f601",
    "1f614",
    "1f60c",
    "1f612",
    "1f61e",
    "1f623",
    "1f622",
    "1f602",
    "1f62d",
    "1f62a",
    "1f625",
    "1f630",
    "1f605",
    "1f613",
    "1f629",
    "1f62b",
    "1f628",
    "1f631",
    "1f620",
    "1f621",
    "1f624",
    "1f616",
    "1f606",
    "1f60b",
    "1f637",
    "1f60e",
    "1f634",
    "1f635",
    "1f632",
    "1f61f",
    "1f626",
    "1f627",
    "1f608",
    "1f47f",
    "1f62e",
    "1f62c",
    "1f610",
    "1f615",
    "1f62f",
    "1f636",
    "1f607",
    "1f60f",
    "1f611",
    "1f472",
    "1f473",
    "1f46e",
    "1f477",
    "1f482",
    "1f476",
    "1f466",
    "1f467",
    "1f468",
    "1f469",
    "1f474",
    "1f475",
    "1f471",
    "1f47c",
    "1f478",
    "1f63a",
    "1f638",
    "1f63b",
    "1f63d",
    "1f63c",
    "1f640",
    "1f63f",
    "1f639",
    "1f63e",
    "1f479",
    "1f47a",
    "1f648",
    "1f649",
    "1f64a",
    "1f480",
    "1f47d",
    "1f4a9",
    "1f525",
    "2728",
    "1f31f",
    "1f4ab",
    "1f4a5",
    "1f4a2",
    "1f4a6",
    "1f4a7",
    "1f4a4",
    "1f4a8",
    "1f442",
    "1f440",
    "1f443",
    "1f445",
    "1f444",
    "1f44d",
    "1f44e",
    "1f44c",
    "1f44a",
    "270a",
    "270c",
    "1f44b",
    "270b",
    "1f450",
    "1f446",
    "1f447",
    "1f449",
    "1f448",
    "1f64c",
    "1f64f",
    "261d",
    "1f44f",
    "1f4aa",
    "1f6b6",
    "1f3c3",
    "1f483",
    "1f46b",
    "1f46a",
    "1f46c",
    "1f46d",
    "1f48f",
    "1f491",
    "1f46f",
    "1f646",
    "1f645",
    "1f481",
    "1f64b",
    "1f486",
    "1f487",
    "1f485",
    "1f470",
    "1f64e",
    "1f64d",
    "1f647",
    "1f3a9",
    "1f451",
    "1f452",
    "1f45f",
    "1f45e",
    "1f461",
    "1f460",
    "1f462",
    "1f455",
    "1f454",
    "1f45a",
    "1f457",
    "1f3bd",
    "1f456",
    "1f458",
    "1f459",
    "1f4bc",
    "1f45c",
    "1f45d",
    "1f45b",
    "1f453",
    "1f380",
    "1f302",
    "1f484",
    "1f49b",
    "1f499",
    "1f49c",
    "1f49a",
    "2764",
    "1f494",
    "1f497",
    "1f493",
    "1f495",
    "1f496",
    "1f49e",
    "1f498",
    "1f48c",
    "1f48b",
    "1f48d",
    "1f48e",
    "1f464",
    "1f465",
    "1f4ac",
    "1f463",
    "1f4ad"
  ],
  [
    "1f436",
    "1f43a",
    "1f431",
    "1f42d",
    "1f439",
    "1f430",
    "1f438",
    "1f42f",
    "1f428",
    "1f43b",
    "1f437",
    "1f43d",
    "1f42e",
    "1f417",
    "1f435",
    "1f412",
    "1f434",
    "1f411",
    "1f418",
    "1f43c",
    "1f427",
    "1f426",
    "1f424",
    "1f425",
    "1f423",
    "1f414",
    "1f40d",
    "1f422",
    "1f41b",
    "1f41d",
    "1f41c",
    "1f41e",
    "1f40c",
    "1f419",
    "1f41a",
    "1f420",
    "1f41f",
    "1f42c",
    "1f433",
    "1f40b",
    "1f404",
    "1f40f",
    "1f400",
    "1f403",
    "1f405",
    "1f407",
    "1f409",
    "1f40e",
    "1f410",
    "1f413",
    "1f415",
    "1f416",
    "1f401",
    "1f402",
    "1f432",
    "1f421",
    "1f40a",
    "1f42b",
    "1f42a",
    "1f406",
    "1f408",
    "1f429",
    "1f43e",
    "1f490",
    "1f338",
    "1f337",
    "1f340",
    "1f339",
    "1f33b",
    "1f33a",
    "1f341",
    "1f343",
    "1f342",
    "1f33f",
    "1f33e",
    "1f344",
    "1f335",
    "1f334",
    "1f332",
    "1f333",
    "1f330",
    "1f331",
    "1f33c",
    "1f310",
    "1f31e",
    "1f31d",
    "1f31a",
    "1f311",
    "1f312",
    "1f313",
    "1f314",
    "1f315",
    "1f316",
    "1f317",
    "1f318",
    "1f31c",
    "1f31b",
    "1f319",
    "1f30d",
    "1f30e",
    "1f30f",
    "1f30b",
    "1f30c",
    "1f320",
    "2b50",
    "2600",
    "26c5",
    "2601",
    "26a1",
    "2614",
    "2744",
    "26c4",
    "1f300",
    "1f301",
    "1f308",
    "1f30a"
  ],
  [
    "1f38d",
    "1f49d",
    "1f38e",
    "1f392",
    "1f393",
    "1f38f",
    "1f386",
    "1f387",
    "1f390",
    "1f391",
    "1f383",
    "1f47b",
    "1f385",
    "1f384",
    "1f381",
    "1f38b",
    "1f389",
    "1f38a",
    "1f388",
    "1f38c",
    "1f52e",
    "1f3a5",
    "1f4f7",
    "1f4f9",
    "1f4fc",
    "1f4bf",
    "1f4c0",
    "1f4bd",
    "1f4be",
    "1f4bb",
    "1f4f1",
    "260e",
    "1f4de",
    "1f4df",
    "1f4e0",
    "1f4e1",
    "1f4fa",
    "1f4fb",
    "1f50a",
    "1f509",
    "1f508",
    "1f507",
    "1f514",
    "1f515",
    "1f4e3",
    "1f4e2",
    "23f3",
    "231b",
    "23f0",
    "231a",
    "1f513",
    "1f512",
    "1f50f",
    "1f510",
    "1f511",
    "1f50e",
    "1f4a1",
    "1f526",
    "1f506",
    "1f505",
    "1f50c",
    "1f50b",
    "1f50d",
    "1f6c0",
    "1f6c1",
    "1f6bf",
    "1f6bd",
    "1f527",
    "1f529",
    "1f528",
    "1f6aa",
    "1f6ac",
    "1f4a3",
    "1f52b",
    "1f52a",
    "1f48a",
    "1f489",
    "1f4b0",
    "1f4b4",
    "1f4b5",
    "1f4b7",
    "1f4b6",
    "1f4b3",
    "1f4b8",
    "1f4f2",
    "1f4e7",
    "1f4e5",
    "1f4e4",
    "2709",
    "1f4e9",
    "1f4e8",
    "1f4ef",
    "1f4eb",
    "1f4ea",
    "1f4ec",
    "1f4ed",
    "1f4ee",
    "1f4e6",
    "1f4dd",
    "1f4c4",
    "1f4c3",
    "1f4d1",
    "1f4ca",
    "1f4c8",
    "1f4c9",
    "1f4dc",
    "1f4cb",
    "1f4c5",
    "1f4c6",
    "1f4c7",
    "1f4c1",
    "1f4c2",
    "2702",
    "1f4cc",
    "1f4ce",
    "2712",
    "270f",
    "1f4cf",
    "1f4d0",
    "1f4d5",
    "1f4d7",
    "1f4d8",
    "1f4d9",
    "1f4d3",
    "1f4d4",
    "1f4d2",
    "1f4da",
    "1f4d6",
    "1f516",
    "1f4db",
    "1f52c",
    "1f52d",
    "1f4f0",
    "1f3a8",
    "1f3ac",
    "1f3a4",
    "1f3a7",
    "1f3bc",
    "1f3b5",
    "1f3b6",
    "1f3b9",
    "1f3bb",
    "1f3ba",
    "1f3b7",
    "1f3b8",
    "1f47e",
    "1f3ae",
    "1f0cf",
    "1f3b4",
    "1f004",
    "1f3b2",
    "1f3af",
    "1f3c8",
    "1f3c0",
    "26bd",
    "26be",
    "1f3be",
    "1f3b1",
    "1f3c9",
    "1f3b3",
    "26f3",
    "1f6b5",
    "1f6b4",
    "1f3c1",
    "1f3c7",
    "1f3c6",
    "1f3bf",
    "1f3c2",
    "1f3ca",
    "1f3c4",
    "1f3a3",
    "2615",
    "1f375",
    "1f376",
    "1f37c",
    "1f37a",
    "1f37b",
    "1f378",
    "1f379",
    "1f377",
    "1f374",
    "1f355",
    "1f354",
    "1f35f",
    "1f357",
    "1f356",
    "1f35d",
    "1f35b",
    "1f364",
    "1f371",
    "1f363",
    "1f365",
    "1f359",
    "1f358",
    "1f35a",
    "1f35c",
    "1f372",
    "1f362",
    "1f361",
    "1f373",
    "1f35e",
    "1f369",
    "1f36e",
    "1f366",
    "1f368",
    "1f367",
    "1f382",
    "1f370",
    "1f36a",
    "1f36b",
    "1f36c",
    "1f36d",
    "1f36f",
    "1f34e",
    "1f34f",
    "1f34a",
    "1f34b",
    "1f352",
    "1f347",
    "1f349",
    "1f353",
    "1f351",
    "1f348",
    "1f34c",
    "1f350",
    "1f34d",
    "1f360",
    "1f346",
    "1f345",
    "1f33d"
  ],
  [
    "1f3e0",
    "1f3e1",
    "1f3eb",
    "1f3e2",
    "1f3e3",
    "1f3e5",
    "1f3e6",
    "1f3ea",
    "1f3e9",
    "1f3e8",
    "1f492",
    "26ea",
    "1f3ec",
    "1f3e4",
    "1f307",
    "1f306",
    "1f3ef",
    "1f3f0",
    "26fa",
    "1f3ed",
    "1f5fc",
    "1f5fe",
    "1f5fb",
    "1f304",
    "1f305",
    "1f303",
    "1f5fd",
    "1f309",
    "1f3a0",
    "1f3a1",
    "26f2",
    "1f3a2",
    "1f6a2",
    "26f5",
    "1f6a4",
    "1f6a3",
    "2693",
    "1f680",
    "2708",
    "1f4ba",
    "1f681",
    "1f682",
    "1f68a",
    "1f689",
    "1f69e",
    "1f686",
    "1f684",
    "1f685",
    "1f688",
    "1f687",
    "1f69d",
    "1f683",
    "1f68b",
    "1f68e",
    "1f68c",
    "1f68d",
    "1f699",
    "1f698",
    "1f697",
    "1f695",
    "1f696",
    "1f69b",
    "1f69a",
    "1f6a8",
    "1f693",
    "1f694",
    "1f692",
    "1f691",
    "1f690",
    "1f6b2",
    "1f6a1",
    "1f69f",
    "1f6a0",
    "1f69c",
    "1f488",
    "1f68f",
    "1f3ab",
    "1f6a6",
    "1f6a5",
    "26a0",
    "1f6a7",
    "1f530",
    "26fd",
    "1f3ee",
    "1f3b0",
    "2668",
    "1f5ff",
    "1f3aa",
    "1f3ad",
    "1f4cd",
    "1f6a9",
    "1f1ef-1f1f5",
    "1f1f0-1f1f7",
    "1f1e9-1f1ea",
    "1f1e8-1f1f3",
    "1f1fa-1f1f8",
    "1f1eb-1f1f7",
    "1f1ea-1f1f8",
    "1f1ee-1f1f9",
    "1f1f7-1f1fa",
    "1f1ec-1f1e7"
  ],
  [
    "0031",
    "0032",
    "0033",
    "0034",
    "0035",
    "0036",
    "0037",
    "0038",
    "0039",
    "0030",
    "1f51f",
    "1f522",
    "0023",
    "1f523",
    "2b06",
    "2b07",
    "2b05",
    "27a1",
    "1f520",
    "1f521",
    "1f524",
    "2197",
    "2196",
    "2198",
    "2199",
    "2194",
    "2195",
    "1f504",
    "25c0",
    "25b6",
    "1f53c",
    "1f53d",
    "21a9",
    "21aa",
    "2139",
    "23ea",
    "23e9",
    "23eb",
    "23ec",
    "2935",
    "2934",
    "1f197",
    "1f500",
    "1f501",
    "1f502",
    "1f195",
    "1f199",
    "1f192",
    "1f193",
    "1f196",
    "1f4f6",
    "1f3a6",
    "1f201",
    "1f22f",
    "1f233",
    "1f235",
    "1f234",
    "1f232",
    "1f250",
    "1f239",
    "1f23a",
    "1f236",
    "1f21a",
    "1f6bb",
    "1f6b9",
    "1f6ba",
    "1f6bc",
    "1f6be",
    "1f6b0",
    "1f6ae",
    "1f17f",
    "267f",
    "1f6ad",
    "1f237",
    "1f238",
    "1f202",
    "24c2",
    "1f6c2",
    "1f6c4",
    "1f6c5",
    "1f6c3",
    "1f251",
    "3299",
    "3297",
    "1f191",
    "1f198",
    "1f194",
    "1f6ab",
    "1f51e",
    "1f4f5",
    "1f6af",
    "1f6b1",
    "1f6b3",
    "1f6b7",
    "1f6b8",
    "26d4",
    "2733",
    "2747",
    "274e",
    "2705",
    "2734",
    "1f49f",
    "1f19a",
    "1f4f3",
    "1f4f4",
    "1f170",
    "1f171",
    "1f18e",
    "1f17e",
    "1f4a0",
    "27bf",
    "267b",
    "2648",
    "2649",
    "264a",
    "264b",
    "264c",
    "264d",
    "264e",
    "264f",
    "2650",
    "2651",
    "2652",
    "2653",
    "26ce",
    "1f52f",
    "1f3e7",
    "1f4b9",
    "1f4b2",
    "1f4b1",
    "00a9",
    "00ae",
    "2122",
    "274c",
    "203c",
    "2049",
    "2757",
    "2753",
    "2755",
    "2754",
    "2b55",
    "1f51d",
    "1f51a",
    "1f519",
    "1f51b",
    "1f51c",
    "1f503",
    "1f55b",
    "1f567",
    "1f550",
    "1f55c",
    "1f551",
    "1f55d",
    "1f552",
    "1f55e",
    "1f553",
    "1f55f",
    "1f554",
    "1f560",
    "1f555",
    "1f556",
    "1f557",
    "1f558",
    "1f559",
    "1f55a",
    "1f561",
    "1f562",
    "1f563",
    "1f564",
    "1f565",
    "1f566",
    "2716",
    "2795",
    "2796",
    "2797",
    "2660",
    "2665",
    "2663",
    "2666",
    "1f4ae",
    "1f4af",
    "2714",
    "2611",
    "1f518",
    "1f517",
    "27b0",
    "3030",
    "303d",
    "1f531",
    "25fc",
    "25fb",
    "25fe",
    "25fd",
    "25aa",
    "25ab",
    "1f53a",
    "1f532",
    "1f533",
    "26ab",
    "26aa",
    "1f534",
    "1f535",
    "1f53b",
    "2b1c",
    "2b1b",
    "1f536",
    "1f537",
    "1f538",
    "1f539"
  ]
],
Config.EmojiCategorySpritesheetDimens = [
  [
    7, 27
  ],
  [
    4, 29
  ],
  [
    7, 33
  ],
  [
    3, 34
  ],
  [
    7, 34
  ]
],
Config.emoji_data = {
  "00a9": [
    ["\xa9"],
    "\ue24e",
    "\udbba\udf29",
    ["copyright"],
    0,
    0
  ],
  "00ae": [
    ["\xae"],
    "\ue24f",
    "\udbba\udf2d",
    ["registered"],
    0,
    1
  ],
  "203c": [
    [
      "\u203c\ufe0f", "\u203c"
    ],
    "",
    "\udbba\udf06",
    ["bangbang"],
    0,
    2
  ],
  2049: [
    [
      "\u2049\ufe0f", "\u2049"
    ],
    "",
    "\udbba\udf05",
    ["interrobang"],
    0,
    3
  ],
  2122: [
    ["\u2122"],
    "\ue537",
    "\udbba\udf2a",
    ["tm"],
    0,
    4
  ],
  2139: [
    [
      "\u2139\ufe0f", "\u2139"
    ],
    "",
    "\udbba\udf47",
    ["information_source"],
    0,
    5
  ],
  2194: [
    [
      "\u2194\ufe0f", "\u2194"
    ],
    "",
    "\udbba\udef6",
    ["left_right_arrow"],
    0,
    6
  ],
  2195: [
    [
      "\u2195\ufe0f", "\u2195"
    ],
    "",
    "\udbba\udef7",
    ["arrow_up_down"],
    0,
    7
  ],
  2196: [
    [
      "\u2196\ufe0f", "\u2196"
    ],
    "\ue237",
    "\udbba\udef2",
    ["arrow_upper_left"],
    0,
    8
  ],
  2197: [
    [
      "\u2197\ufe0f", "\u2197"
    ],
    "\ue236",
    "\udbba\udef0",
    ["arrow_upper_right"],
    0,
    9
  ],
  2198: [
    [
      "\u2198\ufe0f", "\u2198"
    ],
    "\ue238",
    "\udbba\udef1",
    ["arrow_lower_right"],
    0,
    10
  ],
  2199: [
    [
      "\u2199\ufe0f", "\u2199"
    ],
    "\ue239",
    "\udbba\udef3",
    ["arrow_lower_left"],
    0,
    11
  ],
  "21a9": [
    [
      "\u21a9\ufe0f", "\u21a9"
    ],
    "",
    "\udbba\udf83",
    ["leftwards_arrow_with_hook"],
    0,
    12
  ],
  "21aa": [
    [
      "\u21aa\ufe0f", "\u21aa"
    ],
    "",
    "\udbba\udf88",
    ["arrow_right_hook"],
    0,
    13
  ],
  "231a": [
    [
      "\u231a\ufe0f", "\u231a"
    ],
    "",
    "\udbb8\udc1d",
    ["watch"],
    0,
    14
  ],
  "231b": [
    [
      "\u231b\ufe0f", "\u231b"
    ],
    "",
    "\udbb8\udc1c",
    ["hourglass"],
    0,
    15
  ],
  "23e9": [
    ["\u23e9"],
    "\ue23c",
    "\udbba\udefe",
    ["fast_forward"],
    0,
    16
  ],
  "23ea": [
    ["\u23ea"],
    "\ue23d",
    "\udbba\udeff",
    ["rewind"],
    0,
    17
  ],
  "23eb": [
    ["\u23eb"],
    "",
    "\udbba\udf03",
    ["arrow_double_up"],
    0,
    18
  ],
  "23ec": [
    ["\u23ec"],
    "",
    "\udbba\udf02",
    ["arrow_double_down"],
    0,
    19
  ],
  "23f0": [
    ["\u23f0"],
    "\ue02d",
    "\udbb8\udc2a",
    ["alarm_clock"],
    0,
    20
  ],
  "23f3": [
    ["\u23f3"],
    "",
    "\udbb8\udc1b",
    ["hourglass_flowing_sand"],
    0,
    21
  ],
  "24c2": [
    [
      "\u24c2\ufe0f", "\u24c2"
    ],
    "\ue434",
    "\udbb9\udfe1",
    ["m"],
    0,
    22
  ],
  "25aa": [
    [
      "\u25aa\ufe0f", "\u25aa"
    ],
    "\ue21a",
    "\udbba\udf6e",
    ["black_small_square"],
    0,
    23
  ],
  "25ab": [
    [
      "\u25ab\ufe0f", "\u25ab"
    ],
    "\ue21b",
    "\udbba\udf6d",
    ["white_small_square"],
    0,
    24
  ],
  "25b6": [
    [
      "\u25b6\ufe0f", "\u25b6"
    ],
    "\ue23a",
    "\udbba\udefc",
    ["arrow_forward"],
    0,
    25
  ],
  "25c0": [
    [
      "\u25c0\ufe0f", "\u25c0"
    ],
    "\ue23b",
    "\udbba\udefd",
    ["arrow_backward"],
    0,
    26
  ],
  "25fb": [
    [
      "\u25fb\ufe0f", "\u25fb"
    ],
    "\ue21b",
    "\udbba\udf71",
    ["white_medium_square"],
    0,
    27
  ],
  "25fc": [
    [
      "\u25fc\ufe0f", "\u25fc"
    ],
    "\ue21a",
    "\udbba\udf72",
    ["black_medium_square"],
    0,
    28
  ],
  "25fd": [
    [
      "\u25fd\ufe0f", "\u25fd"
    ],
    "\ue21b",
    "\udbba\udf6f",
    ["white_medium_small_square"],
    0,
    29
  ],
  "25fe": [
    [
      "\u25fe\ufe0f", "\u25fe"
    ],
    "\ue21a",
    "\udbba\udf70",
    ["black_medium_small_square"],
    1,
    0
  ],
  2600: [
    [
      "\u2600\ufe0f", "\u2600"
    ],
    "\ue04a",
    "\udbb8\udc00",
    ["sunny"],
    1,
    1
  ],
  2601: [
    [
      "\u2601\ufe0f", "\u2601"
    ],
    "\ue049",
    "\udbb8\udc01",
    ["cloud"],
    1,
    2
  ],
  "260e": [
    [
      "\u260e\ufe0f", "\u260e"
    ],
    "\ue009",
    "\udbb9\udd23",
    [
      "phone", "telephone"
    ],
    1,
    3
  ],
  2611: [
    [
      "\u2611\ufe0f", "\u2611"
    ],
    "",
    "\udbba\udf8b",
    ["ballot_box_with_check"],
    1,
    4
  ],
  2614: [
    [
      "\u2614\ufe0f", "\u2614"
    ],
    "\ue04b",
    "\udbb8\udc02",
    ["umbrella"],
    1,
    5
  ],
  2615: [
    [
      "\u2615\ufe0f", "\u2615"
    ],
    "\ue045",
    "\udbba\udd81",
    ["coffee"],
    1,
    6
  ],
  "261d": [
    [
      "\u261d\ufe0f", "\u261d"
    ],
    "\ue00f",
    "\udbba\udf98",
    ["point_up"],
    1,
    7
  ],
  "263a": [
    [
      "\u263a\ufe0f", "\u263a"
    ],
    "\ue414",
    "\udbb8\udf36",
    ["relaxed"],
    1,
    8
  ],
  2648: [
    [
      "\u2648\ufe0f", "\u2648"
    ],
    "\ue23f",
    "\udbb8\udc2b",
    ["aries"],
    1,
    9
  ],
  2649: [
    [
      "\u2649\ufe0f", "\u2649"
    ],
    "\ue240",
    "\udbb8\udc2c",
    ["taurus"],
    1,
    10
  ],
  "264a": [
    [
      "\u264a\ufe0f", "\u264a"
    ],
    "\ue241",
    "\udbb8\udc2d",
    ["gemini"],
    1,
    11
  ],
  "264b": [
    [
      "\u264b\ufe0f", "\u264b"
    ],
    "\ue242",
    "\udbb8\udc2e",
    ["cancer"],
    1,
    12
  ],
  "264c": [
    [
      "\u264c\ufe0f", "\u264c"
    ],
    "\ue243",
    "\udbb8\udc2f",
    ["leo"],
    1,
    13
  ],
  "264d": [
    [
      "\u264d\ufe0f", "\u264d"
    ],
    "\ue244",
    "\udbb8\udc30",
    ["virgo"],
    1,
    14
  ],
  "264e": [
    [
      "\u264e\ufe0f", "\u264e"
    ],
    "\ue245",
    "\udbb8\udc31",
    ["libra"],
    1,
    15
  ],
  "264f": [
    [
      "\u264f\ufe0f", "\u264f"
    ],
    "\ue246",
    "\udbb8\udc32",
    ["scorpius"],
    1,
    16
  ],
  2650: [
    [
      "\u2650\ufe0f", "\u2650"
    ],
    "\ue247",
    "\udbb8\udc33",
    ["sagittarius"],
    1,
    17
  ],
  2651: [
    [
      "\u2651\ufe0f", "\u2651"
    ],
    "\ue248",
    "\udbb8\udc34",
    ["capricorn"],
    1,
    18
  ],
  2652: [
    [
      "\u2652\ufe0f", "\u2652"
    ],
    "\ue249",
    "\udbb8\udc35",
    ["aquarius"],
    1,
    19
  ],
  2653: [
    [
      "\u2653\ufe0f", "\u2653"
    ],
    "\ue24a",
    "\udbb8\udc36",
    ["pisces"],
    1,
    20
  ],
  2660: [
    [
      "\u2660\ufe0f", "\u2660"
    ],
    "\ue20e",
    "\udbba\udf1b",
    ["spades"],
    1,
    21
  ],
  2663: [
    [
      "\u2663\ufe0f", "\u2663"
    ],
    "\ue20f",
    "\udbba\udf1d",
    ["clubs"],
    1,
    22
  ],
  2665: [
    [
      "\u2665\ufe0f", "\u2665"
    ],
    "\ue20c",
    "\udbba\udf1a",
    ["hearts"],
    1,
    23
  ],
  2666: [
    [
      "\u2666\ufe0f", "\u2666"
    ],
    "\ue20d",
    "\udbba\udf1c",
    ["diamonds"],
    1,
    24
  ],
  2668: [
    [
      "\u2668\ufe0f", "\u2668"
    ],
    "\ue123",
    "\udbb9\udffa",
    ["hotsprings"],
    1,
    25
  ],
  "267b": [
    [
      "\u267b\ufe0f", "\u267b"
    ],
    "",
    "\udbba\udf2c",
    ["recycle"],
    1,
    26
  ],
  "267f": [
    [
      "\u267f\ufe0f", "\u267f"
    ],
    "\ue20a",
    "\udbba\udf20",
    ["wheelchair"],
    1,
    27
  ],
  2693: [
    [
      "\u2693\ufe0f", "\u2693"
    ],
    "\ue202",
    "\udbb9\udcc1",
    ["anchor"],
    1,
    28
  ],
  "26a0": [
    [
      "\u26a0\ufe0f", "\u26a0"
    ],
    "\ue252",
    "\udbba\udf23",
    ["warning"],
    1,
    29
  ],
  "26a1": [
    [
      "\u26a1\ufe0f", "\u26a1"
    ],
    "\ue13d",
    "\udbb8\udc04",
    ["zap"],
    2,
    0
  ],
  "26aa": [
    [
      "\u26aa\ufe0f", "\u26aa"
    ],
    "\ue219",
    "\udbba\udf65",
    ["white_circle"],
    2,
    1
  ],
  "26ab": [
    [
      "\u26ab\ufe0f", "\u26ab"
    ],
    "\ue219",
    "\udbba\udf66",
    ["black_circle"],
    2,
    2
  ],
  "26bd": [
    [
      "\u26bd\ufe0f", "\u26bd"
    ],
    "\ue018",
    "\udbb9\udfd4",
    ["soccer"],
    2,
    3
  ],
  "26be": [
    [
      "\u26be\ufe0f", "\u26be"
    ],
    "\ue016",
    "\udbb9\udfd1",
    ["baseball"],
    2,
    4
  ],
  "26c4": [
    [
      "\u26c4\ufe0f", "\u26c4"
    ],
    "\ue048",
    "\udbb8\udc03",
    ["snowman"],
    2,
    5
  ],
  "26c5": [
    [
      "\u26c5\ufe0f", "\u26c5"
    ],
    "\ue04a\ue049",
    "\udbb8\udc0f",
    ["partly_sunny"],
    2,
    6
  ],
  "26ce": [
    ["\u26ce"],
    "\ue24b",
    "\udbb8\udc37",
    ["ophiuchus"],
    2,
    7
  ],
  "26d4": [
    [
      "\u26d4\ufe0f", "\u26d4"
    ],
    "\ue137",
    "\udbba\udf26",
    ["no_entry"],
    2,
    8
  ],
  "26ea": [
    [
      "\u26ea\ufe0f", "\u26ea"
    ],
    "\ue037",
    "\udbb9\udcbb",
    ["church"],
    2,
    9
  ],
  "26f2": [
    [
      "\u26f2\ufe0f", "\u26f2"
    ],
    "\ue121",
    "\udbb9\udcbc",
    ["fountain"],
    2,
    10
  ],
  "26f3": [
    [
      "\u26f3\ufe0f", "\u26f3"
    ],
    "\ue014",
    "\udbb9\udfd2",
    ["golf"],
    2,
    11
  ],
  "26f5": [
    [
      "\u26f5\ufe0f", "\u26f5"
    ],
    "\ue01c",
    "\udbb9\udfea",
    [
      "boat", "sailboat"
    ],
    2,
    12
  ],
  "26fa": [
    [
      "\u26fa\ufe0f", "\u26fa"
    ],
    "\ue122",
    "\udbb9\udffb",
    ["tent"],
    2,
    13
  ],
  "26fd": [
    [
      "\u26fd\ufe0f", "\u26fd"
    ],
    "\ue03a",
    "\udbb9\udff5",
    ["fuelpump"],
    2,
    14
  ],
  2702: [
    [
      "\u2702\ufe0f", "\u2702"
    ],
    "\ue313",
    "\udbb9\udd3e",
    ["scissors"],
    2,
    15
  ],
  2705: [
    ["\u2705"],
    "",
    "\udbba\udf4a",
    ["white_check_mark"],
    2,
    16
  ],
  2708: [
    [
      "\u2708\ufe0f", "\u2708"
    ],
    "\ue01d",
    "\udbb9\udfe9",
    ["airplane"],
    2,
    17
  ],
  2709: [
    [
      "\u2709\ufe0f", "\u2709"
    ],
    "\ue103",
    "\udbb9\udd29",
    [
      "email", "envelope"
    ],
    2,
    18
  ],
  "270a": [
    ["\u270a"],
    "\ue010",
    "\udbba\udf93",
    ["fist"],
    2,
    19
  ],
  "270b": [
    ["\u270b"],
    "\ue012",
    "\udbba\udf95",
    [
      "hand", "raised_hand"
    ],
    2,
    20
  ],
  "270c": [
    [
      "\u270c\ufe0f", "\u270c"
    ],
    "\ue011",
    "\udbba\udf94",
    ["v"],
    2,
    21
  ],
  "270f": [
    [
      "\u270f\ufe0f", "\u270f"
    ],
    "\ue301",
    "\udbb9\udd39",
    ["pencil2"],
    2,
    22
  ],
  2712: [
    [
      "\u2712\ufe0f", "\u2712"
    ],
    "",
    "\udbb9\udd36",
    ["black_nib"],
    2,
    23
  ],
  2714: [
    [
      "\u2714\ufe0f", "\u2714"
    ],
    "",
    "\udbba\udf49",
    ["heavy_check_mark"],
    2,
    24
  ],
  2716: [
    [
      "\u2716\ufe0f", "\u2716"
    ],
    "\ue333",
    "\udbba\udf53",
    ["heavy_multiplication_x"],
    2,
    25
  ],
  2728: [
    ["\u2728"],
    "\ue32e",
    "\udbba\udf60",
    ["sparkles"],
    2,
    26
  ],
  2733: [
    [
      "\u2733\ufe0f", "\u2733"
    ],
    "\ue206",
    "\udbba\udf62",
    ["eight_spoked_asterisk"],
    2,
    27
  ],
  2734: [
    [
      "\u2734\ufe0f", "\u2734"
    ],
    "\ue205",
    "\udbba\udf61",
    ["eight_pointed_black_star"],
    2,
    28
  ],
  2744: [
    [
      "\u2744\ufe0f", "\u2744"
    ],
    "",
    "\udbb8\udc0e",
    ["snowflake"],
    2,
    29
  ],
  2747: [
    [
      "\u2747\ufe0f", "\u2747"
    ],
    "\ue32e",
    "\udbba\udf77",
    ["sparkle"],
    3,
    0
  ],
  "274c": [
    ["\u274c"],
    "\ue333",
    "\udbba\udf45",
    ["x"],
    3,
    1
  ],
  "274e": [
    ["\u274e"],
    "\ue333",
    "\udbba\udf46",
    ["negative_squared_cross_mark"],
    3,
    2
  ],
  2753: [
    ["\u2753"],
    "\ue020",
    "\udbba\udf09",
    ["question"],
    3,
    3
  ],
  2754: [
    ["\u2754"],
    "\ue336",
    "\udbba\udf0a",
    ["grey_question"],
    3,
    4
  ],
  2755: [
    ["\u2755"],
    "\ue337",
    "\udbba\udf0b",
    ["grey_exclamation"],
    3,
    5
  ],
  2757: [
    [
      "\u2757\ufe0f", "\u2757"
    ],
    "\ue021",
    "\udbba\udf04",
    [
      "exclamation", "heavy_exclamation_mark"
    ],
    3,
    6
  ],
  2764: [
    [
      "\u2764\ufe0f", "\u2764"
    ],
    "\ue022",
    "\udbba\udf0c",
    ["heart"],
    3,
    7,
    "<3"
  ],
  2795: [
    ["\u2795"],
    "",
    "\udbba\udf51",
    ["heavy_plus_sign"],
    3,
    8
  ],
  2796: [
    ["\u2796"],
    "",
    "\udbba\udf52",
    ["heavy_minus_sign"],
    3,
    9
  ],
  2797: [
    ["\u2797"],
    "",
    "\udbba\udf54",
    ["heavy_division_sign"],
    3,
    10
  ],
  "27a1": [
    [
      "\u27a1\ufe0f", "\u27a1"
    ],
    "\ue234",
    "\udbba\udefa",
    ["arrow_right"],
    3,
    11
  ],
  "27b0": [
    ["\u27b0"],
    "",
    "\udbba\udf08",
    ["curly_loop"],
    3,
    12
  ],
  "27bf": [
    ["\u27bf"],
    "\ue211",
    "\udbba\udc2b",
    ["loop"],
    3,
    13
  ],
  2934: [
    [
      "\u2934\ufe0f", "\u2934"
    ],
    "\ue236",
    "\udbba\udef4",
    ["arrow_heading_up"],
    3,
    14
  ],
  2935: [
    [
      "\u2935\ufe0f", "\u2935"
    ],
    "\ue238",
    "\udbba\udef5",
    ["arrow_heading_down"],
    3,
    15
  ],
  "2b05": [
    [
      "\u2b05\ufe0f", "\u2b05"
    ],
    "\ue235",
    "\udbba\udefb",
    ["arrow_left"],
    3,
    16
  ],
  "2b06": [
    [
      "\u2b06\ufe0f", "\u2b06"
    ],
    "\ue232",
    "\udbba\udef8",
    ["arrow_up"],
    3,
    17
  ],
  "2b07": [
    [
      "\u2b07\ufe0f", "\u2b07"
    ],
    "\ue233",
    "\udbba\udef9",
    ["arrow_down"],
    3,
    18
  ],
  "2b1b": [
    [
      "\u2b1b\ufe0f", "\u2b1b"
    ],
    "\ue21a",
    "\udbba\udf6c",
    ["black_large_square"],
    3,
    19
  ],
  "2b1c": [
    [
      "\u2b1c\ufe0f", "\u2b1c"
    ],
    "\ue21b",
    "\udbba\udf6b",
    ["white_large_square"],
    3,
    20
  ],
  "2b50": [
    [
      "\u2b50\ufe0f", "\u2b50"
    ],
    "\ue32f",
    "\udbba\udf68",
    ["star"],
    3,
    21
  ],
  "2b55": [
    [
      "\u2b55\ufe0f", "\u2b55"
    ],
    "\ue332",
    "\udbba\udf44",
    ["o"],
    3,
    22
  ],
  3030: [
    ["\u3030"],
    "",
    "\udbba\udf07",
    ["wavy_dash"],
    3,
    23
  ],
  "303d": [
    [
      "\u303d\ufe0f", "\u303d"
    ],
    "\ue12c",
    "\udbba\udc1b",
    ["part_alternation_mark"],
    3,
    24
  ],
  3297: [
    [
      "\u3297\ufe0f", "\u3297"
    ],
    "\ue30d",
    "\udbba\udf43",
    ["congratulations"],
    3,
    25
  ],
  3299: [
    [
      "\u3299\ufe0f", "\u3299"
    ],
    "\ue315",
    "\udbba\udf2b",
    ["secret"],
    3,
    26
  ],
  "1f004": [
    [
      "\ud83c\udc04\ufe0f", "\ud83c\udc04"
    ],
    "\ue12d",
    "\udbba\udc0b",
    ["mahjong"],
    3,
    27
  ],
  "1f0cf": [
    ["\ud83c\udccf"],
    "",
    "\udbba\udc12",
    ["black_joker"],
    3,
    28
  ],
  "1f170": [
    ["\ud83c\udd70"],
    "\ue532",
    "\udbb9\udd0b",
    ["a"],
    3,
    29
  ],
  "1f171": [
    ["\ud83c\udd71"],
    "\ue533",
    "\udbb9\udd0c",
    ["b"],
    4,
    0
  ],
  "1f17e": [
    ["\ud83c\udd7e"],
    "\ue535",
    "\udbb9\udd0e",
    ["o2"],
    4,
    1
  ],
  "1f17f": [
    [
      "\ud83c\udd7f\ufe0f", "\ud83c\udd7f"
    ],
    "\ue14f",
    "\udbb9\udff6",
    ["parking"],
    4,
    2
  ],
  "1f18e": [
    ["\ud83c\udd8e"],
    "\ue534",
    "\udbb9\udd0d",
    ["ab"],
    4,
    3
  ],
  "1f191": [
    ["\ud83c\udd91"],
    "",
    "\udbba\udf84",
    ["cl"],
    4,
    4
  ],
  "1f192": [
    ["\ud83c\udd92"],
    "\ue214",
    "\udbba\udf38",
    ["cool"],
    4,
    5
  ],
  "1f193": [
    ["\ud83c\udd93"],
    "",
    "\udbba\udf21",
    ["free"],
    4,
    6
  ],
  "1f194": [
    ["\ud83c\udd94"],
    "\ue229",
    "\udbba\udf81",
    ["id"],
    4,
    7
  ],
  "1f195": [
    ["\ud83c\udd95"],
    "\ue212",
    "\udbba\udf36",
    ["new"],
    4,
    8
  ],
  "1f196": [
    ["\ud83c\udd96"],
    "",
    "\udbba\udf28",
    ["ng"],
    4,
    9
  ],
  "1f197": [
    ["\ud83c\udd97"],
    "\ue24d",
    "\udbba\udf27",
    ["ok"],
    4,
    10
  ],
  "1f198": [
    ["\ud83c\udd98"],
    "",
    "\udbba\udf4f",
    ["sos"],
    4,
    11
  ],
  "1f199": [
    ["\ud83c\udd99"],
    "\ue213",
    "\udbba\udf37",
    ["up"],
    4,
    12
  ],
  "1f19a": [
    ["\ud83c\udd9a"],
    "\ue12e",
    "\udbba\udf32",
    ["vs"],
    4,
    13
  ],
  "1f201": [
    ["\ud83c\ude01"],
    "\ue203",
    "\udbba\udf24",
    ["koko"],
    4,
    14
  ],
  "1f202": [
    ["\ud83c\ude02"],
    "\ue228",
    "\udbba\udf3f",
    ["sa"],
    4,
    15
  ],
  "1f21a": [
    [
      "\ud83c\ude1a\ufe0f", "\ud83c\ude1a"
    ],
    "\ue216",
    "\udbba\udf3a",
    ["u7121"],
    4,
    16
  ],
  "1f22f": [
    [
      "\ud83c\ude2f\ufe0f", "\ud83c\ude2f"
    ],
    "\ue22c",
    "\udbba\udf40",
    ["u6307"],
    4,
    17
  ],
  "1f232": [
    ["\ud83c\ude32"],
    "",
    "\udbba\udf2e",
    ["u7981"],
    4,
    18
  ],
  "1f233": [
    ["\ud83c\ude33"],
    "\ue22b",
    "\udbba\udf2f",
    ["u7a7a"],
    4,
    19
  ],
  "1f234": [
    ["\ud83c\ude34"],
    "",
    "\udbba\udf30",
    ["u5408"],
    4,
    20
  ],
  "1f235": [
    ["\ud83c\ude35"],
    "\ue22a",
    "\udbba\udf31",
    ["u6e80"],
    4,
    21
  ],
  "1f236": [
    ["\ud83c\ude36"],
    "\ue215",
    "\udbba\udf39",
    ["u6709"],
    4,
    22
  ],
  "1f237": [
    ["\ud83c\ude37"],
    "\ue217",
    "\udbba\udf3b",
    ["u6708"],
    4,
    23
  ],
  "1f238": [
    ["\ud83c\ude38"],
    "\ue218",
    "\udbba\udf3c",
    ["u7533"],
    4,
    24
  ],
  "1f239": [
    ["\ud83c\ude39"],
    "\ue227",
    "\udbba\udf3e",
    ["u5272"],
    4,
    25
  ],
  "1f23a": [
    ["\ud83c\ude3a"],
    "\ue22d",
    "\udbba\udf41",
    ["u55b6"],
    4,
    26
  ],
  "1f250": [
    ["\ud83c\ude50"],
    "\ue226",
    "\udbba\udf3d",
    ["ideograph_advantage"],
    4,
    27
  ],
  "1f251": [
    ["\ud83c\ude51"],
    "",
    "\udbba\udf50",
    ["accept"],
    4,
    28
  ],
  "1f300": [
    ["\ud83c\udf00"],
    "\ue443",
    "\udbb8\udc05",
    ["cyclone"],
    4,
    29
  ],
  "1f301": [
    ["\ud83c\udf01"],
    "",
    "\udbb8\udc06",
    ["foggy"],
    5,
    0
  ],
  "1f302": [
    ["\ud83c\udf02"],
    "\ue43c",
    "\udbb8\udc07",
    ["closed_umbrella"],
    5,
    1
  ],
  "1f303": [
    ["\ud83c\udf03"],
    "\ue44b",
    "\udbb8\udc08",
    ["night_with_stars"],
    5,
    2
  ],
  "1f304": [
    ["\ud83c\udf04"],
    "\ue04d",
    "\udbb8\udc09",
    ["sunrise_over_mountains"],
    5,
    3
  ],
  "1f305": [
    ["\ud83c\udf05"],
    "\ue449",
    "\udbb8\udc0a",
    ["sunrise"],
    5,
    4
  ],
  "1f306": [
    ["\ud83c\udf06"],
    "\ue146",
    "\udbb8\udc0b",
    ["city_sunset"],
    5,
    5
  ],
  "1f307": [
    ["\ud83c\udf07"],
    "\ue44a",
    "\udbb8\udc0c",
    ["city_sunrise"],
    5,
    6
  ],
  "1f308": [
    ["\ud83c\udf08"],
    "\ue44c",
    "\udbb8\udc0d",
    ["rainbow"],
    5,
    7
  ],
  "1f309": [
    ["\ud83c\udf09"],
    "\ue44b",
    "\udbb8\udc10",
    ["bridge_at_night"],
    5,
    8
  ],
  "1f30a": [
    ["\ud83c\udf0a"],
    "\ue43e",
    "\udbb8\udc38",
    ["ocean"],
    5,
    9
  ],
  "1f30b": [
    ["\ud83c\udf0b"],
    "",
    "\udbb8\udc3a",
    ["volcano"],
    5,
    10
  ],
  "1f30c": [
    ["\ud83c\udf0c"],
    "\ue44b",
    "\udbb8\udc3b",
    ["milky_way"],
    5,
    11
  ],
  "1f30d": [
    ["\ud83c\udf0d"],
    "",
    "",
    ["earth_africa"],
    5,
    12
  ],
  "1f30e": [
    ["\ud83c\udf0e"],
    "",
    "",
    ["earth_americas"],
    5,
    13
  ],
  "1f30f": [
    ["\ud83c\udf0f"],
    "",
    "\udbb8\udc39",
    ["earth_asia"],
    5,
    14
  ],
  "1f310": [
    ["\ud83c\udf10"],
    "",
    "",
    ["globe_with_meridians"],
    5,
    15
  ],
  "1f311": [
    ["\ud83c\udf11"],
    "",
    "\udbb8\udc11",
    ["new_moon"],
    5,
    16
  ],
  "1f312": [
    ["\ud83c\udf12"],
    "",
    "",
    ["waxing_crescent_moon"],
    5,
    17
  ],
  "1f313": [
    ["\ud83c\udf13"],
    "\ue04c",
    "\udbb8\udc13",
    ["first_quarter_moon"],
    5,
    18
  ],
  "1f314": [
    ["\ud83c\udf14"],
    "\ue04c",
    "\udbb8\udc12",
    [
      "moon", "waxing_gibbous_moon"
    ],
    5,
    19
  ],
  "1f315": [
    ["\ud83c\udf15"],
    "",
    "\udbb8\udc15",
    ["full_moon"],
    5,
    20
  ],
  "1f316": [
    ["\ud83c\udf16"],
    "",
    "",
    ["waning_gibbous_moon"],
    5,
    21
  ],
  "1f317": [
    ["\ud83c\udf17"],
    "",
    "",
    ["last_quarter_moon"],
    5,
    22
  ],
  "1f318": [
    ["\ud83c\udf18"],
    "",
    "",
    ["waning_crescent_moon"],
    5,
    23
  ],
  "1f319": [
    ["\ud83c\udf19"],
    "\ue04c",
    "\udbb8\udc14",
    ["crescent_moon"],
    5,
    24
  ],
  "1f31a": [
    ["\ud83c\udf1a"],
    "",
    "",
    ["new_moon_with_face"],
    5,
    25
  ],
  "1f31b": [
    ["\ud83c\udf1b"],
    "\ue04c",
    "\udbb8\udc16",
    ["first_quarter_moon_with_face"],
    5,
    26
  ],
  "1f31c": [
    ["\ud83c\udf1c"],
    "",
    "",
    ["last_quarter_moon_with_face"],
    5,
    27
  ],
  "1f31d": [
    ["\ud83c\udf1d"],
    "",
    "",
    ["full_moon_with_face"],
    5,
    28
  ],
  "1f31e": [
    ["\ud83c\udf1e"],
    "",
    "",
    ["sun_with_face"],
    5,
    29
  ],
  "1f31f": [
    ["\ud83c\udf1f"],
    "\ue335",
    "\udbba\udf69",
    ["star2"],
    6,
    0
  ],
  "1f320": [
    ["\ud83c\udf20"],
    "",
    "\udbba\udf6a",
    ["stars"],
    6,
    1
  ],
  "1f330": [
    ["\ud83c\udf30"],
    "",
    "\udbb8\udc4c",
    ["chestnut"],
    6,
    2
  ],
  "1f331": [
    ["\ud83c\udf31"],
    "\ue110",
    "\udbb8\udc3e",
    ["seedling"],
    6,
    3
  ],
  "1f332": [
    ["\ud83c\udf32"],
    "",
    "",
    ["evergreen_tree"],
    6,
    4
  ],
  "1f333": [
    ["\ud83c\udf33"],
    "",
    "",
    ["deciduous_tree"],
    6,
    5
  ],
  "1f334": [
    ["\ud83c\udf34"],
    "\ue307",
    "\udbb8\udc47",
    ["palm_tree"],
    6,
    6
  ],
  "1f335": [
    ["\ud83c\udf35"],
    "\ue308",
    "\udbb8\udc48",
    ["cactus"],
    6,
    7
  ],
  "1f337": [
    ["\ud83c\udf37"],
    "\ue304",
    "\udbb8\udc3d",
    ["tulip"],
    6,
    8
  ],
  "1f338": [
    ["\ud83c\udf38"],
    "\ue030",
    "\udbb8\udc40",
    ["cherry_blossom"],
    6,
    9
  ],
  "1f339": [
    ["\ud83c\udf39"],
    "\ue032",
    "\udbb8\udc41",
    ["rose"],
    6,
    10
  ],
  "1f33a": [
    ["\ud83c\udf3a"],
    "\ue303",
    "\udbb8\udc45",
    ["hibiscus"],
    6,
    11
  ],
  "1f33b": [
    ["\ud83c\udf3b"],
    "\ue305",
    "\udbb8\udc46",
    ["sunflower"],
    6,
    12
  ],
  "1f33c": [
    ["\ud83c\udf3c"],
    "\ue305",
    "\udbb8\udc4d",
    ["blossom"],
    6,
    13
  ],
  "1f33d": [
    ["\ud83c\udf3d"],
    "",
    "\udbb8\udc4a",
    ["corn"],
    6,
    14
  ],
  "1f33e": [
    ["\ud83c\udf3e"],
    "\ue444",
    "\udbb8\udc49",
    ["ear_of_rice"],
    6,
    15
  ],
  "1f33f": [
    ["\ud83c\udf3f"],
    "\ue110",
    "\udbb8\udc4e",
    ["herb"],
    6,
    16
  ],
  "1f340": [
    ["\ud83c\udf40"],
    "\ue110",
    "\udbb8\udc3c",
    ["four_leaf_clover"],
    6,
    17
  ],
  "1f341": [
    ["\ud83c\udf41"],
    "\ue118",
    "\udbb8\udc3f",
    ["maple_leaf"],
    6,
    18
  ],
  "1f342": [
    ["\ud83c\udf42"],
    "\ue119",
    "\udbb8\udc42",
    ["fallen_leaf"],
    6,
    19
  ],
  "1f343": [
    ["\ud83c\udf43"],
    "\ue447",
    "\udbb8\udc43",
    ["leaves"],
    6,
    20
  ],
  "1f344": [
    ["\ud83c\udf44"],
    "",
    "\udbb8\udc4b",
    ["mushroom"],
    6,
    21
  ],
  "1f345": [
    ["\ud83c\udf45"],
    "\ue349",
    "\udbb8\udc55",
    ["tomato"],
    6,
    22
  ],
  "1f346": [
    ["\ud83c\udf46"],
    "\ue34a",
    "\udbb8\udc56",
    ["eggplant"],
    6,
    23
  ],
  "1f347": [
    ["\ud83c\udf47"],
    "",
    "\udbb8\udc59",
    ["grapes"],
    6,
    24
  ],
  "1f348": [
    ["\ud83c\udf48"],
    "",
    "\udbb8\udc57",
    ["melon"],
    6,
    25
  ],
  "1f349": [
    ["\ud83c\udf49"],
    "\ue348",
    "\udbb8\udc54",
    ["watermelon"],
    6,
    26
  ],
  "1f34a": [
    ["\ud83c\udf4a"],
    "\ue346",
    "\udbb8\udc52",
    ["tangerine"],
    6,
    27
  ],
  "1f34b": [
    ["\ud83c\udf4b"],
    "",
    "",
    ["lemon"],
    6,
    28
  ],
  "1f34c": [
    ["\ud83c\udf4c"],
    "",
    "\udbb8\udc50",
    ["banana"],
    6,
    29
  ],
  "1f34d": [
    ["\ud83c\udf4d"],
    "",
    "\udbb8\udc58",
    ["pineapple"],
    7,
    0
  ],
  "1f34e": [
    ["\ud83c\udf4e"],
    "\ue345",
    "\udbb8\udc51",
    ["apple"],
    7,
    1
  ],
  "1f34f": [
    ["\ud83c\udf4f"],
    "\ue345",
    "\udbb8\udc5b",
    ["green_apple"],
    7,
    2
  ],
  "1f350": [
    ["\ud83c\udf50"],
    "",
    "",
    ["pear"],
    7,
    3
  ],
  "1f351": [
    ["\ud83c\udf51"],
    "",
    "\udbb8\udc5a",
    ["peach"],
    7,
    4
  ],
  "1f352": [
    ["\ud83c\udf52"],
    "",
    "\udbb8\udc4f",
    ["cherries"],
    7,
    5
  ],
  "1f353": [
    ["\ud83c\udf53"],
    "\ue347",
    "\udbb8\udc53",
    ["strawberry"],
    7,
    6
  ],
  "1f354": [
    ["\ud83c\udf54"],
    "\ue120",
    "\udbba\udd60",
    ["hamburger"],
    7,
    7
  ],
  "1f355": [
    ["\ud83c\udf55"],
    "",
    "\udbba\udd75",
    ["pizza"],
    7,
    8
  ],
  "1f356": [
    ["\ud83c\udf56"],
    "",
    "\udbba\udd72",
    ["meat_on_bone"],
    7,
    9
  ],
  "1f357": [
    ["\ud83c\udf57"],
    "",
    "\udbba\udd76",
    ["poultry_leg"],
    7,
    10
  ],
  "1f358": [
    ["\ud83c\udf58"],
    "\ue33d",
    "\udbba\udd69",
    ["rice_cracker"],
    7,
    11
  ],
  "1f359": [
    ["\ud83c\udf59"],
    "\ue342",
    "\udbba\udd61",
    ["rice_ball"],
    7,
    12
  ],
  "1f35a": [
    ["\ud83c\udf5a"],
    "\ue33e",
    "\udbba\udd6a",
    ["rice"],
    7,
    13
  ],
  "1f35b": [
    ["\ud83c\udf5b"],
    "\ue341",
    "\udbba\udd6c",
    ["curry"],
    7,
    14
  ],
  "1f35c": [
    ["\ud83c\udf5c"],
    "\ue340",
    "\udbba\udd63",
    ["ramen"],
    7,
    15
  ],
  "1f35d": [
    ["\ud83c\udf5d"],
    "\ue33f",
    "\udbba\udd6b",
    ["spaghetti"],
    7,
    16
  ],
  "1f35e": [
    ["\ud83c\udf5e"],
    "\ue339",
    "\udbba\udd64",
    ["bread"],
    7,
    17
  ],
  "1f35f": [
    ["\ud83c\udf5f"],
    "\ue33b",
    "\udbba\udd67",
    ["fries"],
    7,
    18
  ],
  "1f360": [
    ["\ud83c\udf60"],
    "",
    "\udbba\udd74",
    ["sweet_potato"],
    7,
    19
  ],
  "1f361": [
    ["\ud83c\udf61"],
    "\ue33c",
    "\udbba\udd68",
    ["dango"],
    7,
    20
  ],
  "1f362": [
    ["\ud83c\udf62"],
    "\ue343",
    "\udbba\udd6d",
    ["oden"],
    7,
    21
  ],
  "1f363": [
    ["\ud83c\udf63"],
    "\ue344",
    "\udbba\udd6e",
    ["sushi"],
    7,
    22
  ],
  "1f364": [
    ["\ud83c\udf64"],
    "",
    "\udbba\udd7f",
    ["fried_shrimp"],
    7,
    23
  ],
  "1f365": [
    ["\ud83c\udf65"],
    "",
    "\udbba\udd73",
    ["fish_cake"],
    7,
    24
  ],
  "1f366": [
    ["\ud83c\udf66"],
    "\ue33a",
    "\udbba\udd66",
    ["icecream"],
    7,
    25
  ],
  "1f367": [
    ["\ud83c\udf67"],
    "\ue43f",
    "\udbba\udd71",
    ["shaved_ice"],
    7,
    26
  ],
  "1f368": [
    ["\ud83c\udf68"],
    "",
    "\udbba\udd77",
    ["ice_cream"],
    7,
    27
  ],
  "1f369": [
    ["\ud83c\udf69"],
    "",
    "\udbba\udd78",
    ["doughnut"],
    7,
    28
  ],
  "1f36a": [
    ["\ud83c\udf6a"],
    "",
    "\udbba\udd79",
    ["cookie"],
    7,
    29
  ],
  "1f36b": [
    ["\ud83c\udf6b"],
    "",
    "\udbba\udd7a",
    ["chocolate_bar"],
    8,
    0
  ],
  "1f36c": [
    ["\ud83c\udf6c"],
    "",
    "\udbba\udd7b",
    ["candy"],
    8,
    1
  ],
  "1f36d": [
    ["\ud83c\udf6d"],
    "",
    "\udbba\udd7c",
    ["lollipop"],
    8,
    2
  ],
  "1f36e": [
    ["\ud83c\udf6e"],
    "",
    "\udbba\udd7d",
    ["custard"],
    8,
    3
  ],
  "1f36f": [
    ["\ud83c\udf6f"],
    "",
    "\udbba\udd7e",
    ["honey_pot"],
    8,
    4
  ],
  "1f370": [
    ["\ud83c\udf70"],
    "\ue046",
    "\udbba\udd62",
    ["cake"],
    8,
    5
  ],
  "1f371": [
    ["\ud83c\udf71"],
    "\ue34c",
    "\udbba\udd6f",
    ["bento"],
    8,
    6
  ],
  "1f372": [
    ["\ud83c\udf72"],
    "\ue34d",
    "\udbba\udd70",
    ["stew"],
    8,
    7
  ],
  "1f373": [
    ["\ud83c\udf73"],
    "\ue147",
    "\udbba\udd65",
    ["egg"],
    8,
    8
  ],
  "1f374": [
    ["\ud83c\udf74"],
    "\ue043",
    "\udbba\udd80",
    ["fork_and_knife"],
    8,
    9
  ],
  "1f375": [
    ["\ud83c\udf75"],
    "\ue338",
    "\udbba\udd84",
    ["tea"],
    8,
    10
  ],
  "1f376": [
    ["\ud83c\udf76"],
    "\ue30b",
    "\udbba\udd85",
    ["sake"],
    8,
    11
  ],
  "1f377": [
    ["\ud83c\udf77"],
    "\ue044",
    "\udbba\udd86",
    ["wine_glass"],
    8,
    12
  ],
  "1f378": [
    ["\ud83c\udf78"],
    "\ue044",
    "\udbba\udd82",
    ["cocktail"],
    8,
    13
  ],
  "1f379": [
    ["\ud83c\udf79"],
    "\ue044",
    "\udbba\udd88",
    ["tropical_drink"],
    8,
    14
  ],
  "1f37a": [
    ["\ud83c\udf7a"],
    "\ue047",
    "\udbba\udd83",
    ["beer"],
    8,
    15
  ],
  "1f37b": [
    ["\ud83c\udf7b"],
    "\ue30c",
    "\udbba\udd87",
    ["beers"],
    8,
    16
  ],
  "1f37c": [
    ["\ud83c\udf7c"],
    "",
    "",
    ["baby_bottle"],
    8,
    17
  ],
  "1f380": [
    ["\ud83c\udf80"],
    "\ue314",
    "\udbb9\udd0f",
    ["ribbon"],
    8,
    18
  ],
  "1f381": [
    ["\ud83c\udf81"],
    "\ue112",
    "\udbb9\udd10",
    ["gift"],
    8,
    19
  ],
  "1f382": [
    ["\ud83c\udf82"],
    "\ue34b",
    "\udbb9\udd11",
    ["birthday"],
    8,
    20
  ],
  "1f383": [
    ["\ud83c\udf83"],
    "\ue445",
    "\udbb9\udd1f",
    ["jack_o_lantern"],
    8,
    21
  ],
  "1f384": [
    ["\ud83c\udf84"],
    "\ue033",
    "\udbb9\udd12",
    ["christmas_tree"],
    8,
    22
  ],
  "1f385": [
    ["\ud83c\udf85"],
    "\ue448",
    "\udbb9\udd13",
    ["santa"],
    8,
    23
  ],
  "1f386": [
    ["\ud83c\udf86"],
    "\ue117",
    "\udbb9\udd15",
    ["fireworks"],
    8,
    24
  ],
  "1f387": [
    ["\ud83c\udf87"],
    "\ue440",
    "\udbb9\udd1d",
    ["sparkler"],
    8,
    25
  ],
  "1f388": [
    ["\ud83c\udf88"],
    "\ue310",
    "\udbb9\udd16",
    ["balloon"],
    8,
    26
  ],
  "1f389": [
    ["\ud83c\udf89"],
    "\ue312",
    "\udbb9\udd17",
    ["tada"],
    8,
    27
  ],
  "1f38a": [
    ["\ud83c\udf8a"],
    "",
    "\udbb9\udd20",
    ["confetti_ball"],
    8,
    28
  ],
  "1f38b": [
    ["\ud83c\udf8b"],
    "",
    "\udbb9\udd21",
    ["tanabata_tree"],
    8,
    29
  ],
  "1f38c": [
    ["\ud83c\udf8c"],
    "\ue143",
    "\udbb9\udd14",
    ["crossed_flags"],
    9,
    0
  ],
  "1f38d": [
    ["\ud83c\udf8d"],
    "\ue436",
    "\udbb9\udd18",
    ["bamboo"],
    9,
    1
  ],
  "1f38e": [
    ["\ud83c\udf8e"],
    "\ue438",
    "\udbb9\udd19",
    ["dolls"],
    9,
    2
  ],
  "1f38f": [
    ["\ud83c\udf8f"],
    "\ue43b",
    "\udbb9\udd1c",
    ["flags"],
    9,
    3
  ],
  "1f390": [
    ["\ud83c\udf90"],
    "\ue442",
    "\udbb9\udd1e",
    ["wind_chime"],
    9,
    4
  ],
  "1f391": [
    ["\ud83c\udf91"],
    "\ue446",
    "\udbb8\udc17",
    ["rice_scene"],
    9,
    5
  ],
  "1f392": [
    ["\ud83c\udf92"],
    "\ue43a",
    "\udbb9\udd1b",
    ["school_satchel"],
    9,
    6
  ],
  "1f393": [
    ["\ud83c\udf93"],
    "\ue439",
    "\udbb9\udd1a",
    ["mortar_board"],
    9,
    7
  ],
  "1f3a0": [
    ["\ud83c\udfa0"],
    "",
    "\udbb9\udffc",
    ["carousel_horse"],
    9,
    8
  ],
  "1f3a1": [
    ["\ud83c\udfa1"],
    "\ue124",
    "\udbb9\udffd",
    ["ferris_wheel"],
    9,
    9
  ],
  "1f3a2": [
    ["\ud83c\udfa2"],
    "\ue433",
    "\udbb9\udffe",
    ["roller_coaster"],
    9,
    10
  ],
  "1f3a3": [
    ["\ud83c\udfa3"],
    "\ue019",
    "\udbb9\udfff",
    ["fishing_pole_and_fish"],
    9,
    11
  ],
  "1f3a4": [
    ["\ud83c\udfa4"],
    "\ue03c",
    "\udbba\udc00",
    ["microphone"],
    9,
    12
  ],
  "1f3a5": [
    ["\ud83c\udfa5"],
    "\ue03d",
    "\udbba\udc01",
    ["movie_camera"],
    9,
    13
  ],
  "1f3a6": [
    ["\ud83c\udfa6"],
    "\ue507",
    "\udbba\udc02",
    ["cinema"],
    9,
    14
  ],
  "1f3a7": [
    ["\ud83c\udfa7"],
    "\ue30a",
    "\udbba\udc03",
    ["headphones"],
    9,
    15
  ],
  "1f3a8": [
    ["\ud83c\udfa8"],
    "\ue502",
    "\udbba\udc04",
    ["art"],
    9,
    16
  ],
  "1f3a9": [
    ["\ud83c\udfa9"],
    "\ue503",
    "\udbba\udc05",
    ["tophat"],
    9,
    17
  ],
  "1f3aa": [
    ["\ud83c\udfaa"],
    "",
    "\udbba\udc06",
    ["circus_tent"],
    9,
    18
  ],
  "1f3ab": [
    ["\ud83c\udfab"],
    "\ue125",
    "\udbba\udc07",
    ["ticket"],
    9,
    19
  ],
  "1f3ac": [
    ["\ud83c\udfac"],
    "\ue324",
    "\udbba\udc08",
    ["clapper"],
    9,
    20
  ],
  "1f3ad": [
    ["\ud83c\udfad"],
    "\ue503",
    "\udbba\udc09",
    ["performing_arts"],
    9,
    21
  ],
  "1f3ae": [
    ["\ud83c\udfae"],
    "",
    "\udbba\udc0a",
    ["video_game"],
    9,
    22
  ],
  "1f3af": [
    ["\ud83c\udfaf"],
    "\ue130",
    "\udbba\udc0c",
    ["dart"],
    9,
    23
  ],
  "1f3b0": [
    ["\ud83c\udfb0"],
    "\ue133",
    "\udbba\udc0d",
    ["slot_machine"],
    9,
    24
  ],
  "1f3b1": [
    ["\ud83c\udfb1"],
    "\ue42c",
    "\udbba\udc0e",
    ["8ball"],
    9,
    25
  ],
  "1f3b2": [
    ["\ud83c\udfb2"],
    "",
    "\udbba\udc0f",
    ["game_die"],
    9,
    26
  ],
  "1f3b3": [
    ["\ud83c\udfb3"],
    "",
    "\udbba\udc10",
    ["bowling"],
    9,
    27
  ],
  "1f3b4": [
    ["\ud83c\udfb4"],
    "",
    "\udbba\udc11",
    ["flower_playing_cards"],
    9,
    28
  ],
  "1f3b5": [
    ["\ud83c\udfb5"],
    "\ue03e",
    "\udbba\udc13",
    ["musical_note"],
    9,
    29
  ],
  "1f3b6": [
    ["\ud83c\udfb6"],
    "\ue326",
    "\udbba\udc14",
    ["notes"],
    10,
    0
  ],
  "1f3b7": [
    ["\ud83c\udfb7"],
    "\ue040",
    "\udbba\udc15",
    ["saxophone"],
    10,
    1
  ],
  "1f3b8": [
    ["\ud83c\udfb8"],
    "\ue041",
    "\udbba\udc16",
    ["guitar"],
    10,
    2
  ],
  "1f3b9": [
    ["\ud83c\udfb9"],
    "",
    "\udbba\udc17",
    ["musical_keyboard"],
    10,
    3
  ],
  "1f3ba": [
    ["\ud83c\udfba"],
    "\ue042",
    "\udbba\udc18",
    ["trumpet"],
    10,
    4
  ],
  "1f3bb": [
    ["\ud83c\udfbb"],
    "",
    "\udbba\udc19",
    ["violin"],
    10,
    5
  ],
  "1f3bc": [
    ["\ud83c\udfbc"],
    "\ue326",
    "\udbba\udc1a",
    ["musical_score"],
    10,
    6
  ],
  "1f3bd": [
    ["\ud83c\udfbd"],
    "",
    "\udbb9\udfd0",
    ["running_shirt_with_sash"],
    10,
    7
  ],
  "1f3be": [
    ["\ud83c\udfbe"],
    "\ue015",
    "\udbb9\udfd3",
    ["tennis"],
    10,
    8
  ],
  "1f3bf": [
    ["\ud83c\udfbf"],
    "\ue013",
    "\udbb9\udfd5",
    ["ski"],
    10,
    9
  ],
  "1f3c0": [
    ["\ud83c\udfc0"],
    "\ue42a",
    "\udbb9\udfd6",
    ["basketball"],
    10,
    10
  ],
  "1f3c1": [
    ["\ud83c\udfc1"],
    "\ue132",
    "\udbb9\udfd7",
    ["checkered_flag"],
    10,
    11
  ],
  "1f3c2": [
    ["\ud83c\udfc2"],
    "",
    "\udbb9\udfd8",
    ["snowboarder"],
    10,
    12
  ],
  "1f3c3": [
    ["\ud83c\udfc3"],
    "\ue115",
    "\udbb9\udfd9",
    [
      "runner", "running"
    ],
    10,
    13
  ],
  "1f3c4": [
    ["\ud83c\udfc4"],
    "\ue017",
    "\udbb9\udfda",
    ["surfer"],
    10,
    14
  ],
  "1f3c6": [
    ["\ud83c\udfc6"],
    "\ue131",
    "\udbb9\udfdb",
    ["trophy"],
    10,
    15
  ],
  "1f3c7": [
    ["\ud83c\udfc7"],
    "",
    "",
    ["horse_racing"],
    10,
    16
  ],
  "1f3c8": [
    ["\ud83c\udfc8"],
    "\ue42b",
    "\udbb9\udfdd",
    ["football"],
    10,
    17
  ],
  "1f3c9": [
    ["\ud83c\udfc9"],
    "",
    "",
    ["rugby_football"],
    10,
    18
  ],
  "1f3ca": [
    ["\ud83c\udfca"],
    "\ue42d",
    "\udbb9\udfde",
    ["swimmer"],
    10,
    19
  ],
  "1f3e0": [
    ["\ud83c\udfe0"],
    "\ue036",
    "\udbb9\udcb0",
    ["house"],
    10,
    20
  ],
  "1f3e1": [
    ["\ud83c\udfe1"],
    "\ue036",
    "\udbb9\udcb1",
    ["house_with_garden"],
    10,
    21
  ],
  "1f3e2": [
    ["\ud83c\udfe2"],
    "\ue038",
    "\udbb9\udcb2",
    ["office"],
    10,
    22
  ],
  "1f3e3": [
    ["\ud83c\udfe3"],
    "\ue153",
    "\udbb9\udcb3",
    ["post_office"],
    10,
    23
  ],
  "1f3e4": [
    ["\ud83c\udfe4"],
    "",
    "",
    ["european_post_office"],
    10,
    24
  ],
  "1f3e5": [
    ["\ud83c\udfe5"],
    "\ue155",
    "\udbb9\udcb4",
    ["hospital"],
    10,
    25
  ],
  "1f3e6": [
    ["\ud83c\udfe6"],
    "\ue14d",
    "\udbb9\udcb5",
    ["bank"],
    10,
    26
  ],
  "1f3e7": [
    ["\ud83c\udfe7"],
    "\ue154",
    "\udbb9\udcb6",
    ["atm"],
    10,
    27
  ],
  "1f3e8": [
    ["\ud83c\udfe8"],
    "\ue158",
    "\udbb9\udcb7",
    ["hotel"],
    10,
    28
  ],
  "1f3e9": [
    ["\ud83c\udfe9"],
    "\ue501",
    "\udbb9\udcb8",
    ["love_hotel"],
    10,
    29
  ],
  "1f3ea": [
    ["\ud83c\udfea"],
    "\ue156",
    "\udbb9\udcb9",
    ["convenience_store"],
    11,
    0
  ],
  "1f3eb": [
    ["\ud83c\udfeb"],
    "\ue157",
    "\udbb9\udcba",
    ["school"],
    11,
    1
  ],
  "1f3ec": [
    ["\ud83c\udfec"],
    "\ue504",
    "\udbb9\udcbd",
    ["department_store"],
    11,
    2
  ],
  "1f3ed": [
    ["\ud83c\udfed"],
    "\ue508",
    "\udbb9\udcc0",
    ["factory"],
    11,
    3
  ],
  "1f3ee": [
    ["\ud83c\udfee"],
    "\ue30b",
    "\udbb9\udcc2",
    [
      "izakaya_lantern", "lantern"
    ],
    11,
    4
  ],
  "1f3ef": [
    ["\ud83c\udfef"],
    "\ue505",
    "\udbb9\udcbe",
    ["japanese_castle"],
    11,
    5
  ],
  "1f3f0": [
    ["\ud83c\udff0"],
    "\ue506",
    "\udbb9\udcbf",
    ["european_castle"],
    11,
    6
  ],
  "1f400": [
    ["\ud83d\udc00"],
    "",
    "",
    ["rat"],
    11,
    7
  ],
  "1f401": [
    ["\ud83d\udc01"],
    "",
    "",
    ["mouse2"],
    11,
    8
  ],
  "1f402": [
    ["\ud83d\udc02"],
    "",
    "",
    ["ox"],
    11,
    9
  ],
  "1f403": [
    ["\ud83d\udc03"],
    "",
    "",
    ["water_buffalo"],
    11,
    10
  ],
  "1f404": [
    ["\ud83d\udc04"],
    "",
    "",
    ["cow2"],
    11,
    11
  ],
  "1f405": [
    ["\ud83d\udc05"],
    "",
    "",
    ["tiger2"],
    11,
    12
  ],
  "1f406": [
    ["\ud83d\udc06"],
    "",
    "",
    ["leopard"],
    11,
    13
  ],
  "1f407": [
    ["\ud83d\udc07"],
    "",
    "",
    ["rabbit2"],
    11,
    14
  ],
  "1f408": [
    ["\ud83d\udc08"],
    "",
    "",
    ["cat2"],
    11,
    15
  ],
  "1f409": [
    ["\ud83d\udc09"],
    "",
    "",
    ["dragon"],
    11,
    16
  ],
  "1f40a": [
    ["\ud83d\udc0a"],
    "",
    "",
    ["crocodile"],
    11,
    17
  ],
  "1f40b": [
    ["\ud83d\udc0b"],
    "",
    "",
    ["whale2"],
    11,
    18
  ],
  "1f40c": [
    ["\ud83d\udc0c"],
    "",
    "\udbb8\uddb9",
    ["snail"],
    11,
    19
  ],
  "1f40d": [
    ["\ud83d\udc0d"],
    "\ue52d",
    "\udbb8\uddd3",
    ["snake"],
    11,
    20
  ],
  "1f40e": [
    ["\ud83d\udc0e"],
    "\ue134",
    "\udbb9\udfdc",
    ["racehorse"],
    11,
    21
  ],
  "1f40f": [
    ["\ud83d\udc0f"],
    "",
    "",
    ["ram"],
    11,
    22
  ],
  "1f410": [
    ["\ud83d\udc10"],
    "",
    "",
    ["goat"],
    11,
    23
  ],
  "1f411": [
    ["\ud83d\udc11"],
    "\ue529",
    "\udbb8\uddcf",
    ["sheep"],
    11,
    24
  ],
  "1f412": [
    ["\ud83d\udc12"],
    "\ue528",
    "\udbb8\uddce",
    ["monkey"],
    11,
    25
  ],
  "1f413": [
    ["\ud83d\udc13"],
    "",
    "",
    ["rooster"],
    11,
    26
  ],
  "1f414": [
    ["\ud83d\udc14"],
    "\ue52e",
    "\udbb8\uddd4",
    ["chicken"],
    11,
    27
  ],
  "1f415": [
    ["\ud83d\udc15"],
    "",
    "",
    ["dog2"],
    11,
    28
  ],
  "1f416": [
    ["\ud83d\udc16"],
    "",
    "",
    ["pig2"],
    11,
    29
  ],
  "1f417": [
    ["\ud83d\udc17"],
    "\ue52f",
    "\udbb8\uddd5",
    ["boar"],
    12,
    0
  ],
  "1f418": [
    ["\ud83d\udc18"],
    "\ue526",
    "\udbb8\uddcc",
    ["elephant"],
    12,
    1
  ],
  "1f419": [
    ["\ud83d\udc19"],
    "\ue10a",
    "\udbb8\uddc5",
    ["octopus"],
    12,
    2
  ],
  "1f41a": [
    ["\ud83d\udc1a"],
    "\ue441",
    "\udbb8\uddc6",
    ["shell"],
    12,
    3
  ],
  "1f41b": [
    ["\ud83d\udc1b"],
    "\ue525",
    "\udbb8\uddcb",
    ["bug"],
    12,
    4
  ],
  "1f41c": [
    ["\ud83d\udc1c"],
    "",
    "\udbb8\uddda",
    ["ant"],
    12,
    5
  ],
  "1f41d": [
    ["\ud83d\udc1d"],
    "",
    "\udbb8\udde1",
    [
      "bee", "honeybee"
    ],
    12,
    6
  ],
  "1f41e": [
    ["\ud83d\udc1e"],
    "",
    "\udbb8\udde2",
    ["beetle"],
    12,
    7
  ],
  "1f41f": [
    ["\ud83d\udc1f"],
    "\ue019",
    "\udbb8\uddbd",
    ["fish"],
    12,
    8
  ],
  "1f420": [
    ["\ud83d\udc20"],
    "\ue522",
    "\udbb8\uddc9",
    ["tropical_fish"],
    12,
    9
  ],
  "1f421": [
    ["\ud83d\udc21"],
    "\ue019",
    "\udbb8\uddd9",
    ["blowfish"],
    12,
    10
  ],
  "1f422": [
    ["\ud83d\udc22"],
    "",
    "\udbb8\udddc",
    ["turtle"],
    12,
    11
  ],
  "1f423": [
    ["\ud83d\udc23"],
    "\ue523",
    "\udbb8\udddd",
    ["hatching_chick"],
    12,
    12
  ],
  "1f424": [
    ["\ud83d\udc24"],
    "\ue523",
    "\udbb8\uddba",
    ["baby_chick"],
    12,
    13
  ],
  "1f425": [
    ["\ud83d\udc25"],
    "\ue523",
    "\udbb8\uddbb",
    ["hatched_chick"],
    12,
    14
  ],
  "1f426": [
    ["\ud83d\udc26"],
    "\ue521",
    "\udbb8\uddc8",
    ["bird"],
    12,
    15
  ],
  "1f427": [
    ["\ud83d\udc27"],
    "\ue055",
    "\udbb8\uddbc",
    ["penguin"],
    12,
    16
  ],
  "1f428": [
    ["\ud83d\udc28"],
    "\ue527",
    "\udbb8\uddcd",
    ["koala"],
    12,
    17
  ],
  "1f429": [
    ["\ud83d\udc29"],
    "\ue052",
    "\udbb8\uddd8",
    ["poodle"],
    12,
    18
  ],
  "1f42a": [
    ["\ud83d\udc2a"],
    "",
    "",
    ["dromedary_camel"],
    12,
    19
  ],
  "1f42b": [
    ["\ud83d\udc2b"],
    "\ue530",
    "\udbb8\uddd6",
    ["camel"],
    12,
    20
  ],
  "1f42c": [
    ["\ud83d\udc2c"],
    "\ue520",
    "\udbb8\uddc7",
    [
      "dolphin", "flipper"
    ],
    12,
    21
  ],
  "1f42d": [
    ["\ud83d\udc2d"],
    "\ue053",
    "\udbb8\uddc2",
    ["mouse"],
    12,
    22
  ],
  "1f42e": [
    ["\ud83d\udc2e"],
    "\ue52b",
    "\udbb8\uddd1",
    ["cow"],
    12,
    23
  ],
  "1f42f": [
    ["\ud83d\udc2f"],
    "\ue050",
    "\udbb8\uddc0",
    ["tiger"],
    12,
    24
  ],
  "1f430": [
    ["\ud83d\udc30"],
    "\ue52c",
    "\udbb8\uddd2",
    ["rabbit"],
    12,
    25
  ],
  "1f431": [
    ["\ud83d\udc31"],
    "\ue04f",
    "\udbb8\uddb8",
    ["cat"],
    12,
    26
  ],
  "1f432": [
    ["\ud83d\udc32"],
    "",
    "\udbb8\uddde",
    ["dragon_face"],
    12,
    27
  ],
  "1f433": [
    ["\ud83d\udc33"],
    "\ue054",
    "\udbb8\uddc3",
    ["whale"],
    12,
    28
  ],
  "1f434": [
    ["\ud83d\udc34"],
    "\ue01a",
    "\udbb8\uddbe",
    ["horse"],
    12,
    29
  ],
  "1f435": [
    ["\ud83d\udc35"],
    "\ue109",
    "\udbb8\uddc4",
    ["monkey_face"],
    13,
    0
  ],
  "1f436": [
    ["\ud83d\udc36"],
    "\ue052",
    "\udbb8\uddb7",
    ["dog"],
    13,
    1
  ],
  "1f437": [
    ["\ud83d\udc37"],
    "\ue10b",
    "\udbb8\uddbf",
    ["pig"],
    13,
    2
  ],
  "1f438": [
    ["\ud83d\udc38"],
    "\ue531",
    "\udbb8\uddd7",
    ["frog"],
    13,
    3
  ],
  "1f439": [
    ["\ud83d\udc39"],
    "\ue524",
    "\udbb8\uddca",
    ["hamster"],
    13,
    4
  ],
  "1f43a": [
    ["\ud83d\udc3a"],
    "\ue52a",
    "\udbb8\uddd0",
    ["wolf"],
    13,
    5
  ],
  "1f43b": [
    ["\ud83d\udc3b"],
    "\ue051",
    "\udbb8\uddc1",
    ["bear"],
    13,
    6
  ],
  "1f43c": [
    ["\ud83d\udc3c"],
    "",
    "\udbb8\udddf",
    ["panda_face"],
    13,
    7
  ],
  "1f43d": [
    ["\ud83d\udc3d"],
    "\ue10b",
    "\udbb8\udde0",
    ["pig_nose"],
    13,
    8
  ],
  "1f43e": [
    ["\ud83d\udc3e"],
    "\ue536",
    "\udbb8\udddb",
    [
      "feet", "paw_prints"
    ],
    13,
    9
  ],
  "1f440": [
    ["\ud83d\udc40"],
    "\ue419",
    "\udbb8\udd90",
    ["eyes"],
    13,
    10
  ],
  "1f442": [
    ["\ud83d\udc42"],
    "\ue41b",
    "\udbb8\udd91",
    ["ear"],
    13,
    11
  ],
  "1f443": [
    ["\ud83d\udc43"],
    "\ue41a",
    "\udbb8\udd92",
    ["nose"],
    13,
    12
  ],
  "1f444": [
    ["\ud83d\udc44"],
    "\ue41c",
    "\udbb8\udd93",
    ["lips"],
    13,
    13
  ],
  "1f445": [
    ["\ud83d\udc45"],
    "\ue409",
    "\udbb8\udd94",
    ["tongue"],
    13,
    14
  ],
  "1f446": [
    ["\ud83d\udc46"],
    "\ue22e",
    "\udbba\udf99",
    ["point_up_2"],
    13,
    15
  ],
  "1f447": [
    ["\ud83d\udc47"],
    "\ue22f",
    "\udbba\udf9a",
    ["point_down"],
    13,
    16
  ],
  "1f448": [
    ["\ud83d\udc48"],
    "\ue230",
    "\udbba\udf9b",
    ["point_left"],
    13,
    17
  ],
  "1f449": [
    ["\ud83d\udc49"],
    "\ue231",
    "\udbba\udf9c",
    ["point_right"],
    13,
    18
  ],
  "1f44a": [
    ["\ud83d\udc4a"],
    "\ue00d",
    "\udbba\udf96",
    [
      "facepunch", "punch"
    ],
    13,
    19
  ],
  "1f44b": [
    ["\ud83d\udc4b"],
    "\ue41e",
    "\udbba\udf9d",
    ["wave"],
    13,
    20
  ],
  "1f44c": [
    ["\ud83d\udc4c"],
    "\ue420",
    "\udbba\udf9f",
    ["ok_hand"],
    13,
    21
  ],
  "1f44d": [
    ["\ud83d\udc4d"],
    "\ue00e",
    "\udbba\udf97",
    [
      "+1", "thumbsup"
    ],
    13,
    22
  ],
  "1f44e": [
    ["\ud83d\udc4e"],
    "\ue421",
    "\udbba\udfa0",
    [
      "-1", "thumbsdown"
    ],
    13,
    23
  ],
  "1f44f": [
    ["\ud83d\udc4f"],
    "\ue41f",
    "\udbba\udf9e",
    ["clap"],
    13,
    24
  ],
  "1f450": [
    ["\ud83d\udc50"],
    "\ue422",
    "\udbba\udfa1",
    ["open_hands"],
    13,
    25
  ],
  "1f451": [
    ["\ud83d\udc51"],
    "\ue10e",
    "\udbb9\udcd1",
    ["crown"],
    13,
    26
  ],
  "1f452": [
    ["\ud83d\udc52"],
    "\ue318",
    "\udbb9\udcd4",
    ["womans_hat"],
    13,
    27
  ],
  "1f453": [
    ["\ud83d\udc53"],
    "",
    "\udbb9\udcce",
    ["eyeglasses"],
    13,
    28
  ],
  "1f454": [
    ["\ud83d\udc54"],
    "\ue302",
    "\udbb9\udcd3",
    ["necktie"],
    13,
    29
  ],
  "1f455": [
    ["\ud83d\udc55"],
    "\ue006",
    "\udbb9\udccf",
    [
      "shirt", "tshirt"
    ],
    14,
    0
  ],
  "1f456": [
    ["\ud83d\udc56"],
    "",
    "\udbb9\udcd0",
    ["jeans"],
    14,
    1
  ],
  "1f457": [
    ["\ud83d\udc57"],
    "\ue319",
    "\udbb9\udcd5",
    ["dress"],
    14,
    2
  ],
  "1f458": [
    ["\ud83d\udc58"],
    "\ue321",
    "\udbb9\udcd9",
    ["kimono"],
    14,
    3
  ],
  "1f459": [
    ["\ud83d\udc59"],
    "\ue322",
    "\udbb9\udcda",
    ["bikini"],
    14,
    4
  ],
  "1f45a": [
    ["\ud83d\udc5a"],
    "\ue006",
    "\udbb9\udcdb",
    ["womans_clothes"],
    14,
    5
  ],
  "1f45b": [
    ["\ud83d\udc5b"],
    "",
    "\udbb9\udcdc",
    ["purse"],
    14,
    6
  ],
  "1f45c": [
    ["\ud83d\udc5c"],
    "\ue323",
    "\udbb9\udcf0",
    ["handbag"],
    14,
    7
  ],
  "1f45d": [
    ["\ud83d\udc5d"],
    "",
    "\udbb9\udcf1",
    ["pouch"],
    14,
    8
  ],
  "1f45e": [
    ["\ud83d\udc5e"],
    "\ue007",
    "\udbb9\udccc",
    [
      "mans_shoe", "shoe"
    ],
    14,
    9
  ],
  "1f45f": [
    ["\ud83d\udc5f"],
    "\ue007",
    "\udbb9\udccd",
    ["athletic_shoe"],
    14,
    10
  ],
  "1f460": [
    ["\ud83d\udc60"],
    "\ue13e",
    "\udbb9\udcd6",
    ["high_heel"],
    14,
    11
  ],
  "1f461": [
    ["\ud83d\udc61"],
    "\ue31a",
    "\udbb9\udcd7",
    ["sandal"],
    14,
    12
  ],
  "1f462": [
    ["\ud83d\udc62"],
    "\ue31b",
    "\udbb9\udcd8",
    ["boot"],
    14,
    13
  ],
  "1f463": [
    ["\ud83d\udc63"],
    "\ue536",
    "\udbb9\udd53",
    ["footprints"],
    14,
    14
  ],
  "1f464": [
    ["\ud83d\udc64"],
    "",
    "\udbb8\udd9a",
    ["bust_in_silhouette"],
    14,
    15
  ],
  "1f465": [
    ["\ud83d\udc65"],
    "",
    "",
    ["busts_in_silhouette"],
    14,
    16
  ],
  "1f466": [
    ["\ud83d\udc66"],
    "\ue001",
    "\udbb8\udd9b",
    ["boy"],
    14,
    17
  ],
  "1f467": [
    ["\ud83d\udc67"],
    "\ue002",
    "\udbb8\udd9c",
    ["girl"],
    14,
    18
  ],
  "1f468": [
    ["\ud83d\udc68"],
    "\ue004",
    "\udbb8\udd9d",
    ["man"],
    14,
    19
  ],
  "1f469": [
    ["\ud83d\udc69"],
    "\ue005",
    "\udbb8\udd9e",
    ["woman"],
    14,
    20
  ],
  "1f46a": [
    ["\ud83d\udc6a"],
    "",
    "\udbb8\udd9f",
    ["family"],
    14,
    21
  ],
  "1f46b": [
    ["\ud83d\udc6b"],
    "\ue428",
    "\udbb8\udda0",
    ["couple"],
    14,
    22
  ],
  "1f46c": [
    ["\ud83d\udc6c"],
    "",
    "",
    ["two_men_holding_hands"],
    14,
    23
  ],
  "1f46d": [
    ["\ud83d\udc6d"],
    "",
    "",
    ["two_women_holding_hands"],
    14,
    24
  ],
  "1f46e": [
    ["\ud83d\udc6e"],
    "\ue152",
    "\udbb8\udda1",
    ["cop"],
    14,
    25
  ],
  "1f46f": [
    ["\ud83d\udc6f"],
    "\ue429",
    "\udbb8\udda2",
    ["dancers"],
    14,
    26
  ],
  "1f470": [
    ["\ud83d\udc70"],
    "",
    "\udbb8\udda3",
    ["bride_with_veil"],
    14,
    27
  ],
  "1f471": [
    ["\ud83d\udc71"],
    "\ue515",
    "\udbb8\udda4",
    ["person_with_blond_hair"],
    14,
    28
  ],
  "1f472": [
    ["\ud83d\udc72"],
    "\ue516",
    "\udbb8\udda5",
    ["man_with_gua_pi_mao"],
    14,
    29
  ],
  "1f473": [
    ["\ud83d\udc73"],
    "\ue517",
    "\udbb8\udda6",
    ["man_with_turban"],
    15,
    0
  ],
  "1f474": [
    ["\ud83d\udc74"],
    "\ue518",
    "\udbb8\udda7",
    ["older_man"],
    15,
    1
  ],
  "1f475": [
    ["\ud83d\udc75"],
    "\ue519",
    "\udbb8\udda8",
    ["older_woman"],
    15,
    2
  ],
  "1f476": [
    ["\ud83d\udc76"],
    "\ue51a",
    "\udbb8\udda9",
    ["baby"],
    15,
    3
  ],
  "1f477": [
    ["\ud83d\udc77"],
    "\ue51b",
    "\udbb8\uddaa",
    ["construction_worker"],
    15,
    4
  ],
  "1f478": [
    ["\ud83d\udc78"],
    "\ue51c",
    "\udbb8\uddab",
    ["princess"],
    15,
    5
  ],
  "1f479": [
    ["\ud83d\udc79"],
    "",
    "\udbb8\uddac",
    ["japanese_ogre"],
    15,
    6
  ],
  "1f47a": [
    ["\ud83d\udc7a"],
    "",
    "\udbb8\uddad",
    ["japanese_goblin"],
    15,
    7
  ],
  "1f47b": [
    ["\ud83d\udc7b"],
    "\ue11b",
    "\udbb8\uddae",
    ["ghost"],
    15,
    8
  ],
  "1f47c": [
    ["\ud83d\udc7c"],
    "\ue04e",
    "\udbb8\uddaf",
    ["angel"],
    15,
    9
  ],
  "1f47d": [
    ["\ud83d\udc7d"],
    "\ue10c",
    "\udbb8\uddb0",
    ["alien"],
    15,
    10
  ],
  "1f47e": [
    ["\ud83d\udc7e"],
    "\ue12b",
    "\udbb8\uddb1",
    ["space_invader"],
    15,
    11
  ],
  "1f47f": [
    ["\ud83d\udc7f"],
    "\ue11a",
    "\udbb8\uddb2",
    ["imp"],
    15,
    12
  ],
  "1f480": [
    ["\ud83d\udc80"],
    "\ue11c",
    "\udbb8\uddb3",
    ["skull"],
    15,
    13
  ],
  "1f481": [
    ["\ud83d\udc81"],
    "\ue253",
    "\udbb8\uddb4",
    ["information_desk_person"],
    15,
    14
  ],
  "1f482": [
    ["\ud83d\udc82"],
    "\ue51e",
    "\udbb8\uddb5",
    ["guardsman"],
    15,
    15
  ],
  "1f483": [
    ["\ud83d\udc83"],
    "\ue51f",
    "\udbb8\uddb6",
    ["dancer"],
    15,
    16
  ],
  "1f484": [
    ["\ud83d\udc84"],
    "\ue31c",
    "\udbb8\udd95",
    ["lipstick"],
    15,
    17
  ],
  "1f485": [
    ["\ud83d\udc85"],
    "\ue31d",
    "\udbb8\udd96",
    ["nail_care"],
    15,
    18
  ],
  "1f486": [
    ["\ud83d\udc86"],
    "\ue31e",
    "\udbb8\udd97",
    ["massage"],
    15,
    19
  ],
  "1f487": [
    ["\ud83d\udc87"],
    "\ue31f",
    "\udbb8\udd98",
    ["haircut"],
    15,
    20
  ],
  "1f488": [
    ["\ud83d\udc88"],
    "\ue320",
    "\udbb8\udd99",
    ["barber"],
    15,
    21
  ],
  "1f489": [
    ["\ud83d\udc89"],
    "\ue13b",
    "\udbb9\udd09",
    ["syringe"],
    15,
    22
  ],
  "1f48a": [
    ["\ud83d\udc8a"],
    "\ue30f",
    "\udbb9\udd0a",
    ["pill"],
    15,
    23
  ],
  "1f48b": [
    ["\ud83d\udc8b"],
    "\ue003",
    "\udbba\udc23",
    ["kiss"],
    15,
    24
  ],
  "1f48c": [
    ["\ud83d\udc8c"],
    "\ue103\ue328",
    "\udbba\udc24",
    ["love_letter"],
    15,
    25
  ],
  "1f48d": [
    ["\ud83d\udc8d"],
    "\ue034",
    "\udbba\udc25",
    ["ring"],
    15,
    26
  ],
  "1f48e": [
    ["\ud83d\udc8e"],
    "\ue035",
    "\udbba\udc26",
    ["gem"],
    15,
    27
  ],
  "1f48f": [
    ["\ud83d\udc8f"],
    "\ue111",
    "\udbba\udc27",
    ["couplekiss"],
    15,
    28
  ],
  "1f490": [
    ["\ud83d\udc90"],
    "\ue306",
    "\udbba\udc28",
    ["bouquet"],
    15,
    29
  ],
  "1f491": [
    ["\ud83d\udc91"],
    "\ue425",
    "\udbba\udc29",
    ["couple_with_heart"],
    16,
    0
  ],
  "1f492": [
    ["\ud83d\udc92"],
    "\ue43d",
    "\udbba\udc2a",
    ["wedding"],
    16,
    1
  ],
  "1f493": [
    ["\ud83d\udc93"],
    "\ue327",
    "\udbba\udf0d",
    ["heartbeat"],
    16,
    2
  ],
  "1f494": [
    ["\ud83d\udc94"],
    "\ue023",
    "\udbba\udf0e",
    ["broken_heart"],
    16,
    3,
    "</3"
  ],
  "1f495": [
    ["\ud83d\udc95"],
    "\ue327",
    "\udbba\udf0f",
    ["two_hearts"],
    16,
    4
  ],
  "1f496": [
    ["\ud83d\udc96"],
    "\ue327",
    "\udbba\udf10",
    ["sparkling_heart"],
    16,
    5
  ],
  "1f497": [
    ["\ud83d\udc97"],
    "\ue328",
    "\udbba\udf11",
    ["heartpulse"],
    16,
    6
  ],
  "1f498": [
    ["\ud83d\udc98"],
    "\ue329",
    "\udbba\udf12",
    ["cupid"],
    16,
    7
  ],
  "1f499": [
    ["\ud83d\udc99"],
    "\ue32a",
    "\udbba\udf13",
    ["blue_heart"],
    16,
    8,
    "<3"
  ],
  "1f49a": [
    ["\ud83d\udc9a"],
    "\ue32b",
    "\udbba\udf14",
    ["green_heart"],
    16,
    9,
    "<3"
  ],
  "1f49b": [
    ["\ud83d\udc9b"],
    "\ue32c",
    "\udbba\udf15",
    ["yellow_heart"],
    16,
    10,
    "<3"
  ],
  "1f49c": [
    ["\ud83d\udc9c"],
    "\ue32d",
    "\udbba\udf16",
    ["purple_heart"],
    16,
    11,
    "<3"
  ],
  "1f49d": [
    ["\ud83d\udc9d"],
    "\ue437",
    "\udbba\udf17",
    ["gift_heart"],
    16,
    12
  ],
  "1f49e": [
    ["\ud83d\udc9e"],
    "\ue327",
    "\udbba\udf18",
    ["revolving_hearts"],
    16,
    13
  ],
  "1f49f": [
    ["\ud83d\udc9f"],
    "\ue204",
    "\udbba\udf19",
    ["heart_decoration"],
    16,
    14
  ],
  "1f4a0": [
    ["\ud83d\udca0"],
    "",
    "\udbba\udf55",
    ["diamond_shape_with_a_dot_inside"],
    16,
    15
  ],
  "1f4a1": [
    ["\ud83d\udca1"],
    "\ue10f",
    "\udbba\udf56",
    ["bulb"],
    16,
    16
  ],
  "1f4a2": [
    ["\ud83d\udca2"],
    "\ue334",
    "\udbba\udf57",
    ["anger"],
    16,
    17
  ],
  "1f4a3": [
    ["\ud83d\udca3"],
    "\ue311",
    "\udbba\udf58",
    ["bomb"],
    16,
    18
  ],
  "1f4a4": [
    ["\ud83d\udca4"],
    "\ue13c",
    "\udbba\udf59",
    ["zzz"],
    16,
    19
  ],
  "1f4a5": [
    ["\ud83d\udca5"],
    "",
    "\udbba\udf5a",
    [
      "boom", "collision"
    ],
    16,
    20
  ],
  "1f4a6": [
    ["\ud83d\udca6"],
    "\ue331",
    "\udbba\udf5b",
    ["sweat_drops"],
    16,
    21
  ],
  "1f4a7": [
    ["\ud83d\udca7"],
    "\ue331",
    "\udbba\udf5c",
    ["droplet"],
    16,
    22
  ],
  "1f4a8": [
    ["\ud83d\udca8"],
    "\ue330",
    "\udbba\udf5d",
    ["dash"],
    16,
    23
  ],
  "1f4a9": [
    ["\ud83d\udca9"],
    "\ue05a",
    "\udbb9\udcf4",
    [
      "hankey", "poop", "shit"
    ],
    16,
    24
  ],
  "1f4aa": [
    ["\ud83d\udcaa"],
    "\ue14c",
    "\udbba\udf5e",
    ["muscle"],
    16,
    25
  ],
  "1f4ab": [
    ["\ud83d\udcab"],
    "\ue407",
    "\udbba\udf5f",
    ["dizzy"],
    16,
    26
  ],
  "1f4ac": [
    ["\ud83d\udcac"],
    "",
    "\udbb9\udd32",
    ["speech_balloon"],
    16,
    27
  ],
  "1f4ad": [
    ["\ud83d\udcad"],
    "",
    "",
    ["thought_balloon"],
    16,
    28
  ],
  "1f4ae": [
    ["\ud83d\udcae"],
    "",
    "\udbba\udf7a",
    ["white_flower"],
    16,
    29
  ],
  "1f4af": [
    ["\ud83d\udcaf"],
    "",
    "\udbba\udf7b",
    ["100"],
    17,
    0
  ],
  "1f4b0": [
    ["\ud83d\udcb0"],
    "\ue12f",
    "\udbb9\udcdd",
    ["moneybag"],
    17,
    1
  ],
  "1f4b1": [
    ["\ud83d\udcb1"],
    "\ue149",
    "\udbb9\udcde",
    ["currency_exchange"],
    17,
    2
  ],
  "1f4b2": [
    ["\ud83d\udcb2"],
    "\ue12f",
    "\udbb9\udce0",
    ["heavy_dollar_sign"],
    17,
    3
  ],
  "1f4b3": [
    ["\ud83d\udcb3"],
    "",
    "\udbb9\udce1",
    ["credit_card"],
    17,
    4
  ],
  "1f4b4": [
    ["\ud83d\udcb4"],
    "",
    "\udbb9\udce2",
    ["yen"],
    17,
    5
  ],
  "1f4b5": [
    ["\ud83d\udcb5"],
    "\ue12f",
    "\udbb9\udce3",
    ["dollar"],
    17,
    6
  ],
  "1f4b6": [
    ["\ud83d\udcb6"],
    "",
    "",
    ["euro"],
    17,
    7
  ],
  "1f4b7": [
    ["\ud83d\udcb7"],
    "",
    "",
    ["pound"],
    17,
    8
  ],
  "1f4b8": [
    ["\ud83d\udcb8"],
    "",
    "\udbb9\udce4",
    ["money_with_wings"],
    17,
    9
  ],
  "1f4b9": [
    ["\ud83d\udcb9"],
    "\ue14a",
    "\udbb9\udcdf",
    ["chart"],
    17,
    10
  ],
  "1f4ba": [
    ["\ud83d\udcba"],
    "\ue11f",
    "\udbb9\udd37",
    ["seat"],
    17,
    11
  ],
  "1f4bb": [
    ["\ud83d\udcbb"],
    "\ue00c",
    "\udbb9\udd38",
    ["computer"],
    17,
    12
  ],
  "1f4bc": [
    ["\ud83d\udcbc"],
    "\ue11e",
    "\udbb9\udd3b",
    ["briefcase"],
    17,
    13
  ],
  "1f4bd": [
    ["\ud83d\udcbd"],
    "\ue316",
    "\udbb9\udd3c",
    ["minidisc"],
    17,
    14
  ],
  "1f4be": [
    ["\ud83d\udcbe"],
    "\ue316",
    "\udbb9\udd3d",
    ["floppy_disk"],
    17,
    15
  ],
  "1f4bf": [
    ["\ud83d\udcbf"],
    "\ue126",
    "\udbba\udc1d",
    ["cd"],
    17,
    16
  ],
  "1f4c0": [
    ["\ud83d\udcc0"],
    "\ue127",
    "\udbba\udc1e",
    ["dvd"],
    17,
    17
  ],
  "1f4c1": [
    ["\ud83d\udcc1"],
    "",
    "\udbb9\udd43",
    ["file_folder"],
    17,
    18
  ],
  "1f4c2": [
    ["\ud83d\udcc2"],
    "",
    "\udbb9\udd44",
    ["open_file_folder"],
    17,
    19
  ],
  "1f4c3": [
    ["\ud83d\udcc3"],
    "\ue301",
    "\udbb9\udd40",
    ["page_with_curl"],
    17,
    20
  ],
  "1f4c4": [
    ["\ud83d\udcc4"],
    "\ue301",
    "\udbb9\udd41",
    ["page_facing_up"],
    17,
    21
  ],
  "1f4c5": [
    ["\ud83d\udcc5"],
    "",
    "\udbb9\udd42",
    ["date"],
    17,
    22
  ],
  "1f4c6": [
    ["\ud83d\udcc6"],
    "",
    "\udbb9\udd49",
    ["calendar"],
    17,
    23
  ],
  "1f4c7": [
    ["\ud83d\udcc7"],
    "\ue148",
    "\udbb9\udd4d",
    ["card_index"],
    17,
    24
  ],
  "1f4c8": [
    ["\ud83d\udcc8"],
    "\ue14a",
    "\udbb9\udd4b",
    ["chart_with_upwards_trend"],
    17,
    25
  ],
  "1f4c9": [
    ["\ud83d\udcc9"],
    "",
    "\udbb9\udd4c",
    ["chart_with_downwards_trend"],
    17,
    26
  ],
  "1f4ca": [
    ["\ud83d\udcca"],
    "\ue14a",
    "\udbb9\udd4a",
    ["bar_chart"],
    17,
    27
  ],
  "1f4cb": [
    ["\ud83d\udccb"],
    "\ue301",
    "\udbb9\udd48",
    ["clipboard"],
    17,
    28
  ],
  "1f4cc": [
    ["\ud83d\udccc"],
    "",
    "\udbb9\udd4e",
    ["pushpin"],
    17,
    29
  ],
  "1f4cd": [
    ["\ud83d\udccd"],
    "",
    "\udbb9\udd3f",
    ["round_pushpin"],
    18,
    0
  ],
  "1f4ce": [
    ["\ud83d\udcce"],
    "",
    "\udbb9\udd3a",
    ["paperclip"],
    18,
    1
  ],
  "1f4cf": [
    ["\ud83d\udccf"],
    "",
    "\udbb9\udd50",
    ["straight_ruler"],
    18,
    2
  ],
  "1f4d0": [
    ["\ud83d\udcd0"],
    "",
    "\udbb9\udd51",
    ["triangular_ruler"],
    18,
    3
  ],
  "1f4d1": [
    ["\ud83d\udcd1"],
    "\ue301",
    "\udbb9\udd52",
    ["bookmark_tabs"],
    18,
    4
  ],
  "1f4d2": [
    ["\ud83d\udcd2"],
    "\ue148",
    "\udbb9\udd4f",
    ["ledger"],
    18,
    5
  ],
  "1f4d3": [
    ["\ud83d\udcd3"],
    "\ue148",
    "\udbb9\udd45",
    ["notebook"],
    18,
    6
  ],
  "1f4d4": [
    ["\ud83d\udcd4"],
    "\ue148",
    "\udbb9\udd47",
    ["notebook_with_decorative_cover"],
    18,
    7
  ],
  "1f4d5": [
    ["\ud83d\udcd5"],
    "\ue148",
    "\udbb9\udd02",
    ["closed_book"],
    18,
    8
  ],
  "1f4d6": [
    ["\ud83d\udcd6"],
    "\ue148",
    "\udbb9\udd46",
    [
      "book", "open_book"
    ],
    18,
    9
  ],
  "1f4d7": [
    ["\ud83d\udcd7"],
    "\ue148",
    "\udbb9\udcff",
    ["green_book"],
    18,
    10
  ],
  "1f4d8": [
    ["\ud83d\udcd8"],
    "\ue148",
    "\udbb9\udd00",
    ["blue_book"],
    18,
    11
  ],
  "1f4d9": [
    ["\ud83d\udcd9"],
    "\ue148",
    "\udbb9\udd01",
    ["orange_book"],
    18,
    12
  ],
  "1f4da": [
    ["\ud83d\udcda"],
    "\ue148",
    "\udbb9\udd03",
    ["books"],
    18,
    13
  ],
  "1f4db": [
    ["\ud83d\udcdb"],
    "",
    "\udbb9\udd04",
    ["name_badge"],
    18,
    14
  ],
  "1f4dc": [
    ["\ud83d\udcdc"],
    "",
    "\udbb9\udcfd",
    ["scroll"],
    18,
    15
  ],
  "1f4dd": [
    ["\ud83d\udcdd"],
    "\ue301",
    "\udbb9\udd27",
    [
      "memo", "pencil"
    ],
    18,
    16
  ],
  "1f4de": [
    ["\ud83d\udcde"],
    "\ue009",
    "\udbb9\udd24",
    ["telephone_receiver"],
    18,
    17
  ],
  "1f4df": [
    ["\ud83d\udcdf"],
    "",
    "\udbb9\udd22",
    ["pager"],
    18,
    18
  ],
  "1f4e0": [
    ["\ud83d\udce0"],
    "\ue00b",
    "\udbb9\udd28",
    ["fax"],
    18,
    19
  ],
  "1f4e1": [
    ["\ud83d\udce1"],
    "\ue14b",
    "\udbb9\udd31",
    ["satellite"],
    18,
    20
  ],
  "1f4e2": [
    ["\ud83d\udce2"],
    "\ue142",
    "\udbb9\udd2f",
    ["loudspeaker"],
    18,
    21
  ],
  "1f4e3": [
    ["\ud83d\udce3"],
    "\ue317",
    "\udbb9\udd30",
    ["mega"],
    18,
    22
  ],
  "1f4e4": [
    ["\ud83d\udce4"],
    "",
    "\udbb9\udd33",
    ["outbox_tray"],
    18,
    23
  ],
  "1f4e5": [
    ["\ud83d\udce5"],
    "",
    "\udbb9\udd34",
    ["inbox_tray"],
    18,
    24
  ],
  "1f4e6": [
    ["\ud83d\udce6"],
    "\ue112",
    "\udbb9\udd35",
    ["package"],
    18,
    25
  ],
  "1f4e7": [
    ["\ud83d\udce7"],
    "\ue103",
    "\udbba\udf92",
    ["e-mail"],
    18,
    26
  ],
  "1f4e8": [
    ["\ud83d\udce8"],
    "\ue103",
    "\udbb9\udd2a",
    ["incoming_envelope"],
    18,
    27
  ],
  "1f4e9": [
    ["\ud83d\udce9"],
    "\ue103",
    "\udbb9\udd2b",
    ["envelope_with_arrow"],
    18,
    28
  ],
  "1f4ea": [
    ["\ud83d\udcea"],
    "\ue101",
    "\udbb9\udd2c",
    ["mailbox_closed"],
    18,
    29
  ],
  "1f4eb": [
    ["\ud83d\udceb"],
    "\ue101",
    "\udbb9\udd2d",
    ["mailbox"],
    19,
    0
  ],
  "1f4ec": [
    ["\ud83d\udcec"],
    "",
    "",
    ["mailbox_with_mail"],
    19,
    1
  ],
  "1f4ed": [
    ["\ud83d\udced"],
    "",
    "",
    ["mailbox_with_no_mail"],
    19,
    2
  ],
  "1f4ee": [
    ["\ud83d\udcee"],
    "\ue102",
    "\udbb9\udd2e",
    ["postbox"],
    19,
    3
  ],
  "1f4ef": [
    ["\ud83d\udcef"],
    "",
    "",
    ["postal_horn"],
    19,
    4
  ],
  "1f4f0": [
    ["\ud83d\udcf0"],
    "",
    "\udbba\udc22",
    ["newspaper"],
    19,
    5
  ],
  "1f4f1": [
    ["\ud83d\udcf1"],
    "\ue00a",
    "\udbb9\udd25",
    ["iphone"],
    19,
    6
  ],
  "1f4f2": [
    ["\ud83d\udcf2"],
    "\ue104",
    "\udbb9\udd26",
    ["calling"],
    19,
    7
  ],
  "1f4f3": [
    ["\ud83d\udcf3"],
    "\ue250",
    "\udbba\udc39",
    ["vibration_mode"],
    19,
    8
  ],
  "1f4f4": [
    ["\ud83d\udcf4"],
    "\ue251",
    "\udbba\udc3a",
    ["mobile_phone_off"],
    19,
    9
  ],
  "1f4f5": [
    ["\ud83d\udcf5"],
    "",
    "",
    ["no_mobile_phones"],
    19,
    10
  ],
  "1f4f6": [
    ["\ud83d\udcf6"],
    "\ue20b",
    "\udbba\udc38",
    ["signal_strength"],
    19,
    11
  ],
  "1f4f7": [
    ["\ud83d\udcf7"],
    "\ue008",
    "\udbb9\udcef",
    ["camera"],
    19,
    12
  ],
  "1f4f9": [
    ["\ud83d\udcf9"],
    "\ue03d",
    "\udbb9\udcf9",
    ["video_camera"],
    19,
    13
  ],
  "1f4fa": [
    ["\ud83d\udcfa"],
    "\ue12a",
    "\udbba\udc1c",
    ["tv"],
    19,
    14
  ],
  "1f4fb": [
    ["\ud83d\udcfb"],
    "\ue128",
    "\udbba\udc1f",
    ["radio"],
    19,
    15
  ],
  "1f4fc": [
    ["\ud83d\udcfc"],
    "\ue129",
    "\udbba\udc20",
    ["vhs"],
    19,
    16
  ],
  "1f500": [
    ["\ud83d\udd00"],
    "",
    "",
    ["twisted_rightwards_arrows"],
    19,
    17
  ],
  "1f501": [
    ["\ud83d\udd01"],
    "",
    "",
    ["repeat"],
    19,
    18
  ],
  "1f502": [
    ["\ud83d\udd02"],
    "",
    "",
    ["repeat_one"],
    19,
    19
  ],
  "1f503": [
    ["\ud83d\udd03"],
    "",
    "\udbba\udf91",
    ["arrows_clockwise"],
    19,
    20
  ],
  "1f504": [
    ["\ud83d\udd04"],
    "",
    "",
    ["arrows_counterclockwise"],
    19,
    21
  ],
  "1f505": [
    ["\ud83d\udd05"],
    "",
    "",
    ["low_brightness"],
    19,
    22
  ],
  "1f506": [
    ["\ud83d\udd06"],
    "",
    "",
    ["high_brightness"],
    19,
    23
  ],
  "1f507": [
    ["\ud83d\udd07"],
    "",
    "",
    ["mute"],
    19,
    24
  ],
  "1f508": [
    ["\ud83d\udd08"],
    "",
    "",
    ["speaker"],
    19,
    25
  ],
  "1f509": [
    ["\ud83d\udd09"],
    "",
    "",
    ["sound"],
    19,
    26
  ],
  "1f50a": [
    ["\ud83d\udd0a"],
    "\ue141",
    "\udbba\udc21",
    ["loud_sound"],
    19,
    27
  ],
  "1f50b": [
    ["\ud83d\udd0b"],
    "",
    "\udbb9\udcfc",
    ["battery"],
    19,
    28
  ],
  "1f50c": [
    ["\ud83d\udd0c"],
    "",
    "\udbb9\udcfe",
    ["electric_plug"],
    19,
    29
  ],
  "1f50d": [
    ["\ud83d\udd0d"],
    "\ue114",
    "\udbba\udf85",
    ["mag"],
    20,
    0
  ],
  "1f50e": [
    ["\ud83d\udd0e"],
    "\ue114",
    "\udbba\udf8d",
    ["mag_right"],
    20,
    1
  ],
  "1f50f": [
    ["\ud83d\udd0f"],
    "\ue144",
    "\udbba\udf90",
    ["lock_with_ink_pen"],
    20,
    2
  ],
  "1f510": [
    ["\ud83d\udd10"],
    "\ue144",
    "\udbba\udf8a",
    ["closed_lock_with_key"],
    20,
    3
  ],
  "1f511": [
    ["\ud83d\udd11"],
    "\ue03f",
    "\udbba\udf82",
    ["key"],
    20,
    4
  ],
  "1f512": [
    ["\ud83d\udd12"],
    "\ue144",
    "\udbba\udf86",
    ["lock"],
    20,
    5
  ],
  "1f513": [
    ["\ud83d\udd13"],
    "\ue145",
    "\udbba\udf87",
    ["unlock"],
    20,
    6
  ],
  "1f514": [
    ["\ud83d\udd14"],
    "\ue325",
    "\udbb9\udcf2",
    ["bell"],
    20,
    7
  ],
  "1f515": [
    ["\ud83d\udd15"],
    "",
    "",
    ["no_bell"],
    20,
    8
  ],
  "1f516": [
    ["\ud83d\udd16"],
    "",
    "\udbba\udf8f",
    ["bookmark"],
    20,
    9
  ],
  "1f517": [
    ["\ud83d\udd17"],
    "",
    "\udbba\udf4b",
    ["link"],
    20,
    10
  ],
  "1f518": [
    ["\ud83d\udd18"],
    "",
    "\udbba\udf8c",
    ["radio_button"],
    20,
    11
  ],
  "1f519": [
    ["\ud83d\udd19"],
    "\ue235",
    "\udbba\udf8e",
    ["back"],
    20,
    12
  ],
  "1f51a": [
    ["\ud83d\udd1a"],
    "",
    "\udbb8\udc1a",
    ["end"],
    20,
    13
  ],
  "1f51b": [
    ["\ud83d\udd1b"],
    "",
    "\udbb8\udc19",
    ["on"],
    20,
    14
  ],
  "1f51c": [
    ["\ud83d\udd1c"],
    "",
    "\udbb8\udc18",
    ["soon"],
    20,
    15
  ],
  "1f51d": [
    ["\ud83d\udd1d"],
    "\ue24c",
    "\udbba\udf42",
    ["top"],
    20,
    16
  ],
  "1f51e": [
    ["\ud83d\udd1e"],
    "\ue207",
    "\udbba\udf25",
    ["underage"],
    20,
    17
  ],
  "1f51f": [
    ["\ud83d\udd1f"],
    "",
    "\udbba\udc3b",
    ["keycap_ten"],
    20,
    18
  ],
  "1f520": [
    ["\ud83d\udd20"],
    "",
    "\udbba\udf7c",
    ["capital_abcd"],
    20,
    19
  ],
  "1f521": [
    ["\ud83d\udd21"],
    "",
    "\udbba\udf7d",
    ["abcd"],
    20,
    20
  ],
  "1f522": [
    ["\ud83d\udd22"],
    "",
    "\udbba\udf7e",
    ["1234"],
    20,
    21
  ],
  "1f523": [
    ["\ud83d\udd23"],
    "",
    "\udbba\udf7f",
    ["symbols"],
    20,
    22
  ],
  "1f524": [
    ["\ud83d\udd24"],
    "",
    "\udbba\udf80",
    ["abc"],
    20,
    23
  ],
  "1f525": [
    ["\ud83d\udd25"],
    "\ue11d",
    "\udbb9\udcf6",
    ["fire"],
    20,
    24
  ],
  "1f526": [
    ["\ud83d\udd26"],
    "",
    "\udbb9\udcfb",
    ["flashlight"],
    20,
    25
  ],
  "1f527": [
    ["\ud83d\udd27"],
    "",
    "\udbb9\udcc9",
    ["wrench"],
    20,
    26
  ],
  "1f528": [
    ["\ud83d\udd28"],
    "\ue116",
    "\udbb9\udcca",
    ["hammer"],
    20,
    27
  ],
  "1f529": [
    ["\ud83d\udd29"],
    "",
    "\udbb9\udccb",
    ["nut_and_bolt"],
    20,
    28
  ],
  "1f52a": [
    ["\ud83d\udd2a"],
    "",
    "\udbb9\udcfa",
    [
      "hocho", "knife"
    ],
    20,
    29
  ],
  "1f52b": [
    ["\ud83d\udd2b"],
    "\ue113",
    "\udbb9\udcf5",
    ["gun"],
    21,
    0
  ],
  "1f52c": [
    ["\ud83d\udd2c"],
    "",
    "",
    ["microscope"],
    21,
    1
  ],
  "1f52d": [
    ["\ud83d\udd2d"],
    "",
    "",
    ["telescope"],
    21,
    2
  ],
  "1f52e": [
    ["\ud83d\udd2e"],
    "\ue23e",
    "\udbb9\udcf7",
    ["crystal_ball"],
    21,
    3
  ],
  "1f52f": [
    ["\ud83d\udd2f"],
    "\ue23e",
    "\udbb9\udcf8",
    ["six_pointed_star"],
    21,
    4
  ],
  "1f530": [
    ["\ud83d\udd30"],
    "\ue209",
    "\udbb8\udc44",
    ["beginner"],
    21,
    5
  ],
  "1f531": [
    ["\ud83d\udd31"],
    "\ue031",
    "\udbb9\udcd2",
    ["trident"],
    21,
    6
  ],
  "1f532": [
    ["\ud83d\udd32"],
    "\ue21a",
    "\udbba\udf64",
    ["black_square_button"],
    21,
    7
  ],
  "1f533": [
    ["\ud83d\udd33"],
    "\ue21b",
    "\udbba\udf67",
    ["white_square_button"],
    21,
    8
  ],
  "1f534": [
    ["\ud83d\udd34"],
    "\ue219",
    "\udbba\udf63",
    ["red_circle"],
    21,
    9
  ],
  "1f535": [
    ["\ud83d\udd35"],
    "\ue21a",
    "\udbba\udf64",
    ["large_blue_circle"],
    21,
    10
  ],
  "1f536": [
    ["\ud83d\udd36"],
    "\ue21b",
    "\udbba\udf73",
    ["large_orange_diamond"],
    21,
    11
  ],
  "1f537": [
    ["\ud83d\udd37"],
    "\ue21b",
    "\udbba\udf74",
    ["large_blue_diamond"],
    21,
    12
  ],
  "1f538": [
    ["\ud83d\udd38"],
    "\ue21b",
    "\udbba\udf75",
    ["small_orange_diamond"],
    21,
    13
  ],
  "1f539": [
    ["\ud83d\udd39"],
    "\ue21b",
    "\udbba\udf76",
    ["small_blue_diamond"],
    21,
    14
  ],
  "1f53a": [
    ["\ud83d\udd3a"],
    "",
    "\udbba\udf78",
    ["small_red_triangle"],
    21,
    15
  ],
  "1f53b": [
    ["\ud83d\udd3b"],
    "",
    "\udbba\udf79",
    ["small_red_triangle_down"],
    21,
    16
  ],
  "1f53c": [
    ["\ud83d\udd3c"],
    "",
    "\udbba\udf01",
    ["arrow_up_small"],
    21,
    17
  ],
  "1f53d": [
    ["\ud83d\udd3d"],
    "",
    "\udbba\udf00",
    ["arrow_down_small"],
    21,
    18
  ],
  "1f550": [
    ["\ud83d\udd50"],
    "\ue024",
    "\udbb8\udc1e",
    ["clock1"],
    21,
    19
  ],
  "1f551": [
    ["\ud83d\udd51"],
    "\ue025",
    "\udbb8\udc1f",
    ["clock2"],
    21,
    20
  ],
  "1f552": [
    ["\ud83d\udd52"],
    "\ue026",
    "\udbb8\udc20",
    ["clock3"],
    21,
    21
  ],
  "1f553": [
    ["\ud83d\udd53"],
    "\ue027",
    "\udbb8\udc21",
    ["clock4"],
    21,
    22
  ],
  "1f554": [
    ["\ud83d\udd54"],
    "\ue028",
    "\udbb8\udc22",
    ["clock5"],
    21,
    23
  ],
  "1f555": [
    ["\ud83d\udd55"],
    "\ue029",
    "\udbb8\udc23",
    ["clock6"],
    21,
    24
  ],
  "1f556": [
    ["\ud83d\udd56"],
    "\ue02a",
    "\udbb8\udc24",
    ["clock7"],
    21,
    25
  ],
  "1f557": [
    ["\ud83d\udd57"],
    "\ue02b",
    "\udbb8\udc25",
    ["clock8"],
    21,
    26
  ],
  "1f558": [
    ["\ud83d\udd58"],
    "\ue02c",
    "\udbb8\udc26",
    ["clock9"],
    21,
    27
  ],
  "1f559": [
    ["\ud83d\udd59"],
    "\ue02d",
    "\udbb8\udc27",
    ["clock10"],
    21,
    28
  ],
  "1f55a": [
    ["\ud83d\udd5a"],
    "\ue02e",
    "\udbb8\udc28",
    ["clock11"],
    21,
    29
  ],
  "1f55b": [
    ["\ud83d\udd5b"],
    "\ue02f",
    "\udbb8\udc29",
    ["clock12"],
    22,
    0
  ],
  "1f55c": [
    ["\ud83d\udd5c"],
    "",
    "",
    ["clock130"],
    22,
    1
  ],
  "1f55d": [
    ["\ud83d\udd5d"],
    "",
    "",
    ["clock230"],
    22,
    2
  ],
  "1f55e": [
    ["\ud83d\udd5e"],
    "",
    "",
    ["clock330"],
    22,
    3
  ],
  "1f55f": [
    ["\ud83d\udd5f"],
    "",
    "",
    ["clock430"],
    22,
    4
  ],
  "1f560": [
    ["\ud83d\udd60"],
    "",
    "",
    ["clock530"],
    22,
    5
  ],
  "1f561": [
    ["\ud83d\udd61"],
    "",
    "",
    ["clock630"],
    22,
    6
  ],
  "1f562": [
    ["\ud83d\udd62"],
    "",
    "",
    ["clock730"],
    22,
    7
  ],
  "1f563": [
    ["\ud83d\udd63"],
    "",
    "",
    ["clock830"],
    22,
    8
  ],
  "1f564": [
    ["\ud83d\udd64"],
    "",
    "",
    ["clock930"],
    22,
    9
  ],
  "1f565": [
    ["\ud83d\udd65"],
    "",
    "",
    ["clock1030"],
    22,
    10
  ],
  "1f566": [
    ["\ud83d\udd66"],
    "",
    "",
    ["clock1130"],
    22,
    11
  ],
  "1f567": [
    ["\ud83d\udd67"],
    "",
    "",
    ["clock1230"],
    22,
    12
  ],
  "1f5fb": [
    ["\ud83d\uddfb"],
    "\ue03b",
    "\udbb9\udcc3",
    ["mount_fuji"],
    22,
    13
  ],
  "1f5fc": [
    ["\ud83d\uddfc"],
    "\ue509",
    "\udbb9\udcc4",
    ["tokyo_tower"],
    22,
    14
  ],
  "1f5fd": [
    ["\ud83d\uddfd"],
    "\ue51d",
    "\udbb9\udcc6",
    ["statue_of_liberty"],
    22,
    15
  ],
  "1f5fe": [
    ["\ud83d\uddfe"],
    "",
    "\udbb9\udcc7",
    ["japan"],
    22,
    16
  ],
  "1f5ff": [
    ["\ud83d\uddff"],
    "",
    "\udbb9\udcc8",
    ["moyai"],
    22,
    17
  ],
  "1f600": [
    ["\ud83d\ude00"],
    "",
    "",
    ["grinning"],
    22,
    18,
    ":D"
  ],
  "1f601": [
    ["\ud83d\ude01"],
    "\ue404",
    "\udbb8\udf33",
    ["grin"],
    22,
    19
  ],
  "1f602": [
    ["\ud83d\ude02"],
    "\ue412",
    "\udbb8\udf34",
    ["joy"],
    22,
    20
  ],
  "1f603": [
    ["\ud83d\ude03"],
    "\ue057",
    "\udbb8\udf30",
    ["smiley"],
    22,
    21,
    ":)"
  ],
  "1f604": [
    ["\ud83d\ude04"],
    "\ue415",
    "\udbb8\udf38",
    ["smile"],
    22,
    22,
    ":)"
  ],
  "1f605": [
    ["\ud83d\ude05"],
    "\ue415\ue331",
    "\udbb8\udf31",
    ["sweat_smile"],
    22,
    23
  ],
  "1f606": [
    ["\ud83d\ude06"],
    "\ue40a",
    "\udbb8\udf32",
    ["satisfied"],
    22,
    24
  ],
  "1f607": [
    ["\ud83d\ude07"],
    "",
    "",
    ["innocent"],
    22,
    25
  ],
  "1f608": [
    ["\ud83d\ude08"],
    "",
    "",
    ["smiling_imp"],
    22,
    26
  ],
  "1f609": [
    ["\ud83d\ude09"],
    "\ue405",
    "\udbb8\udf47",
    ["wink"],
    22,
    27,
    ";)"
  ],
  "1f60a": [
    ["\ud83d\ude0a"],
    "\ue056",
    "\udbb8\udf35",
    ["blush"],
    22,
    28
  ],
  "1f60b": [
    ["\ud83d\ude0b"],
    "\ue056",
    "\udbb8\udf2b",
    ["yum"],
    22,
    29
  ],
  "1f60c": [
    ["\ud83d\ude0c"],
    "\ue40a",
    "\udbb8\udf3e",
    ["relieved"],
    23,
    0
  ],
  "1f60d": [
    ["\ud83d\ude0d"],
    "\ue106",
    "\udbb8\udf27",
    ["heart_eyes"],
    23,
    1
  ],
  "1f60e": [
    ["\ud83d\ude0e"],
    "",
    "",
    ["sunglasses"],
    23,
    2
  ],
  "1f60f": [
    ["\ud83d\ude0f"],
    "\ue402",
    "\udbb8\udf43",
    ["smirk"],
    23,
    3
  ],
  "1f610": [
    ["\ud83d\ude10"],
    "",
    "",
    ["neutral_face"],
    23,
    4
  ],
  "1f611": [
    ["\ud83d\ude11"],
    "",
    "",
    ["expressionless"],
    23,
    5
  ],
  "1f612": [
    ["\ud83d\ude12"],
    "\ue40e",
    "\udbb8\udf26",
    ["unamused"],
    23,
    6
  ],
  "1f613": [
    ["\ud83d\ude13"],
    "\ue108",
    "\udbb8\udf44",
    ["sweat"],
    23,
    7
  ],
  "1f614": [
    ["\ud83d\ude14"],
    "\ue403",
    "\udbb8\udf40",
    ["pensive"],
    23,
    8
  ],
  "1f615": [
    ["\ud83d\ude15"],
    "",
    "",
    ["confused"],
    23,
    9
  ],
  "1f616": [
    ["\ud83d\ude16"],
    "\ue407",
    "\udbb8\udf3f",
    ["confounded"],
    23,
    10
  ],
  "1f617": [
    ["\ud83d\ude17"],
    "",
    "",
    ["kissing"],
    23,
    11
  ],
  "1f618": [
    ["\ud83d\ude18"],
    "\ue418",
    "\udbb8\udf2c",
    ["kissing_heart"],
    23,
    12
  ],
  "1f619": [
    ["\ud83d\ude19"],
    "",
    "",
    ["kissing_smiling_eyes"],
    23,
    13
  ],
  "1f61a": [
    ["\ud83d\ude1a"],
    "\ue417",
    "\udbb8\udf2d",
    ["kissing_closed_eyes"],
    23,
    14
  ],
  "1f61b": [
    ["\ud83d\ude1b"],
    "",
    "",
    ["stuck_out_tongue"],
    23,
    15,
    ":p"
  ],
  "1f61c": [
    ["\ud83d\ude1c"],
    "\ue105",
    "\udbb8\udf29",
    ["stuck_out_tongue_winking_eye"],
    23,
    16,
    ";p"
  ],
  "1f61d": [
    ["\ud83d\ude1d"],
    "\ue409",
    "\udbb8\udf2a",
    ["stuck_out_tongue_closed_eyes"],
    23,
    17
  ],
  "1f61e": [
    ["\ud83d\ude1e"],
    "\ue058",
    "\udbb8\udf23",
    ["disappointed"],
    23,
    18,
    ":("
  ],
  "1f61f": [
    ["\ud83d\ude1f"],
    "",
    "",
    ["worried"],
    23,
    19
  ],
  "1f620": [
    ["\ud83d\ude20"],
    "\ue059",
    "\udbb8\udf20",
    ["angry"],
    23,
    20
  ],
  "1f621": [
    ["\ud83d\ude21"],
    "\ue416",
    "\udbb8\udf3d",
    ["rage"],
    23,
    21
  ],
  "1f622": [
    ["\ud83d\ude22"],
    "\ue413",
    "\udbb8\udf39",
    ["cry"],
    23,
    22,
    ":'("
  ],
  "1f623": [
    ["\ud83d\ude23"],
    "\ue406",
    "\udbb8\udf3c",
    ["persevere"],
    23,
    23
  ],
  "1f624": [
    ["\ud83d\ude24"],
    "\ue404",
    "\udbb8\udf28",
    ["triumph"],
    23,
    24
  ],
  "1f625": [
    ["\ud83d\ude25"],
    "\ue401",
    "\udbb8\udf45",
    ["disappointed_relieved"],
    23,
    25
  ],
  "1f626": [
    ["\ud83d\ude26"],
    "",
    "",
    ["frowning"],
    23,
    26
  ],
  "1f627": [
    ["\ud83d\ude27"],
    "",
    "",
    ["anguished"],
    23,
    27
  ],
  "1f628": [
    ["\ud83d\ude28"],
    "\ue40b",
    "\udbb8\udf3b",
    ["fearful"],
    23,
    28
  ],
  "1f629": [
    ["\ud83d\ude29"],
    "\ue403",
    "\udbb8\udf21",
    ["weary"],
    23,
    29
  ],
  "1f62a": [
    ["\ud83d\ude2a"],
    "\ue408",
    "\udbb8\udf42",
    ["sleepy"],
    24,
    0
  ],
  "1f62b": [
    ["\ud83d\ude2b"],
    "\ue406",
    "\udbb8\udf46",
    ["tired_face"],
    24,
    1
  ],
  "1f62c": [
    ["\ud83d\ude2c"],
    "",
    "",
    ["grimacing"],
    24,
    2
  ],
  "1f62d": [
    ["\ud83d\ude2d"],
    "\ue411",
    "\udbb8\udf3a",
    ["sob"],
    24,
    3,
    ":'("
  ],
  "1f62e": [
    ["\ud83d\ude2e"],
    "",
    "",
    ["open_mouth"],
    24,
    4
  ],
  "1f62f": [
    ["\ud83d\ude2f"],
    "",
    "",
    ["hushed"],
    24,
    5
  ],
  "1f630": [
    ["\ud83d\ude30"],
    "\ue40f",
    "\udbb8\udf25",
    ["cold_sweat"],
    24,
    6
  ],
  "1f631": [
    ["\ud83d\ude31"],
    "\ue107",
    "\udbb8\udf41",
    ["scream"],
    24,
    7
  ],
  "1f632": [
    ["\ud83d\ude32"],
    "\ue410",
    "\udbb8\udf22",
    ["astonished"],
    24,
    8
  ],
  "1f633": [
    ["\ud83d\ude33"],
    "\ue40d",
    "\udbb8\udf2f",
    ["flushed"],
    24,
    9
  ],
  "1f634": [
    ["\ud83d\ude34"],
    "",
    "",
    ["sleeping"],
    24,
    10
  ],
  "1f635": [
    ["\ud83d\ude35"],
    "\ue406",
    "\udbb8\udf24",
    ["dizzy_face"],
    24,
    11
  ],
  "1f636": [
    ["\ud83d\ude36"],
    "",
    "",
    ["no_mouth"],
    24,
    12
  ],
  "1f637": [
    ["\ud83d\ude37"],
    "\ue40c",
    "\udbb8\udf2e",
    ["mask"],
    24,
    13
  ],
  "1f638": [
    ["\ud83d\ude38"],
    "\ue404",
    "\udbb8\udf49",
    ["smile_cat"],
    24,
    14
  ],
  "1f639": [
    ["\ud83d\ude39"],
    "\ue412",
    "\udbb8\udf4a",
    ["joy_cat"],
    24,
    15
  ],
  "1f63a": [
    ["\ud83d\ude3a"],
    "\ue057",
    "\udbb8\udf48",
    ["smiley_cat"],
    24,
    16
  ],
  "1f63b": [
    ["\ud83d\ude3b"],
    "\ue106",
    "\udbb8\udf4c",
    ["heart_eyes_cat"],
    24,
    17
  ],
  "1f63c": [
    ["\ud83d\ude3c"],
    "\ue404",
    "\udbb8\udf4f",
    ["smirk_cat"],
    24,
    18
  ],
  "1f63d": [
    ["\ud83d\ude3d"],
    "\ue418",
    "\udbb8\udf4b",
    ["kissing_cat"],
    24,
    19
  ],
  "1f63e": [
    ["\ud83d\ude3e"],
    "\ue416",
    "\udbb8\udf4e",
    ["pouting_cat"],
    24,
    20
  ],
  "1f63f": [
    ["\ud83d\ude3f"],
    "\ue413",
    "\udbb8\udf4d",
    ["crying_cat_face"],
    24,
    21
  ],
  "1f640": [
    ["\ud83d\ude40"],
    "\ue403",
    "\udbb8\udf50",
    ["scream_cat"],
    24,
    22
  ],
  "1f645": [
    ["\ud83d\ude45"],
    "\ue423",
    "\udbb8\udf51",
    ["no_good"],
    24,
    23
  ],
  "1f646": [
    ["\ud83d\ude46"],
    "\ue424",
    "\udbb8\udf52",
    ["ok_woman"],
    24,
    24
  ],
  "1f647": [
    ["\ud83d\ude47"],
    "\ue426",
    "\udbb8\udf53",
    ["bow"],
    24,
    25
  ],
  "1f648": [
    ["\ud83d\ude48"],
    "",
    "\udbb8\udf54",
    ["see_no_evil"],
    24,
    26
  ],
  "1f649": [
    ["\ud83d\ude49"],
    "",
    "\udbb8\udf56",
    ["hear_no_evil"],
    24,
    27
  ],
  "1f64a": [
    ["\ud83d\ude4a"],
    "",
    "\udbb8\udf55",
    ["speak_no_evil"],
    24,
    28
  ],
  "1f64b": [
    ["\ud83d\ude4b"],
    "\ue012",
    "\udbb8\udf57",
    ["raising_hand"],
    24,
    29
  ],
  "1f64c": [
    ["\ud83d\ude4c"],
    "\ue427",
    "\udbb8\udf58",
    ["raised_hands"],
    25,
    0
  ],
  "1f64d": [
    ["\ud83d\ude4d"],
    "\ue403",
    "\udbb8\udf59",
    ["person_frowning"],
    25,
    1
  ],
  "1f64e": [
    ["\ud83d\ude4e"],
    "\ue416",
    "\udbb8\udf5a",
    ["person_with_pouting_face"],
    25,
    2
  ],
  "1f64f": [
    ["\ud83d\ude4f"],
    "\ue41d",
    "\udbb8\udf5b",
    ["pray"],
    25,
    3
  ],
  "1f680": [
    ["\ud83d\ude80"],
    "\ue10d",
    "\udbb9\udfed",
    ["rocket"],
    25,
    4
  ],
  "1f681": [
    ["\ud83d\ude81"],
    "",
    "",
    ["helicopter"],
    25,
    5
  ],
  "1f682": [
    ["\ud83d\ude82"],
    "",
    "",
    ["steam_locomotive"],
    25,
    6
  ],
  "1f683": [
    ["\ud83d\ude83"],
    "\ue01e",
    "\udbb9\udfdf",
    ["railway_car"],
    25,
    7
  ],
  "1f684": [
    ["\ud83d\ude84"],
    "\ue435",
    "\udbb9\udfe2",
    ["bullettrain_side"],
    25,
    8
  ],
  "1f685": [
    ["\ud83d\ude85"],
    "\ue01f",
    "\udbb9\udfe3",
    ["bullettrain_front"],
    25,
    9
  ],
  "1f686": [
    ["\ud83d\ude86"],
    "",
    "",
    ["train2"],
    25,
    10
  ],
  "1f687": [
    ["\ud83d\ude87"],
    "\ue434",
    "\udbb9\udfe0",
    ["metro"],
    25,
    11
  ],
  "1f688": [
    ["\ud83d\ude88"],
    "",
    "",
    ["light_rail"],
    25,
    12
  ],
  "1f689": [
    ["\ud83d\ude89"],
    "\ue039",
    "\udbb9\udfec",
    ["station"],
    25,
    13
  ],
  "1f68a": [
    ["\ud83d\ude8a"],
    "",
    "",
    ["tram"],
    25,
    14
  ],
  "1f68b": [
    ["\ud83d\ude8b"],
    "",
    "",
    ["train"],
    25,
    15
  ],
  "1f68c": [
    ["\ud83d\ude8c"],
    "\ue159",
    "\udbb9\udfe6",
    ["bus"],
    25,
    16
  ],
  "1f68d": [
    ["\ud83d\ude8d"],
    "",
    "",
    ["oncoming_bus"],
    25,
    17
  ],
  "1f68e": [
    ["\ud83d\ude8e"],
    "",
    "",
    ["trolleybus"],
    25,
    18
  ],
  "1f68f": [
    ["\ud83d\ude8f"],
    "\ue150",
    "\udbb9\udfe7",
    ["busstop"],
    25,
    19
  ],
  "1f690": [
    ["\ud83d\ude90"],
    "",
    "",
    ["minibus"],
    25,
    20
  ],
  "1f691": [
    ["\ud83d\ude91"],
    "\ue431",
    "\udbb9\udff3",
    ["ambulance"],
    25,
    21
  ],
  "1f692": [
    ["\ud83d\ude92"],
    "\ue430",
    "\udbb9\udff2",
    ["fire_engine"],
    25,
    22
  ],
  "1f693": [
    ["\ud83d\ude93"],
    "\ue432",
    "\udbb9\udff4",
    ["police_car"],
    25,
    23
  ],
  "1f694": [
    ["\ud83d\ude94"],
    "",
    "",
    ["oncoming_police_car"],
    25,
    24
  ],
  "1f695": [
    ["\ud83d\ude95"],
    "\ue15a",
    "\udbb9\udfef",
    ["taxi"],
    25,
    25
  ],
  "1f696": [
    ["\ud83d\ude96"],
    "",
    "",
    ["oncoming_taxi"],
    25,
    26
  ],
  "1f697": [
    ["\ud83d\ude97"],
    "\ue01b",
    "\udbb9\udfe4",
    [
      "car", "red_car"
    ],
    25,
    27
  ],
  "1f698": [
    ["\ud83d\ude98"],
    "",
    "",
    ["oncoming_automobile"],
    25,
    28
  ],
  "1f699": [
    ["\ud83d\ude99"],
    "\ue42e",
    "\udbb9\udfe5",
    ["blue_car"],
    25,
    29
  ],
  "1f69a": [
    ["\ud83d\ude9a"],
    "\ue42f",
    "\udbb9\udff1",
    ["truck"],
    26,
    0
  ],
  "1f69b": [
    ["\ud83d\ude9b"],
    "",
    "",
    ["articulated_lorry"],
    26,
    1
  ],
  "1f69c": [
    ["\ud83d\ude9c"],
    "",
    "",
    ["tractor"],
    26,
    2
  ],
  "1f69d": [
    ["\ud83d\ude9d"],
    "",
    "",
    ["monorail"],
    26,
    3
  ],
  "1f69e": [
    ["\ud83d\ude9e"],
    "",
    "",
    ["mountain_railway"],
    26,
    4
  ],
  "1f69f": [
    ["\ud83d\ude9f"],
    "",
    "",
    ["suspension_railway"],
    26,
    5
  ],
  "1f6a0": [
    ["\ud83d\udea0"],
    "",
    "",
    ["mountain_cableway"],
    26,
    6
  ],
  "1f6a1": [
    ["\ud83d\udea1"],
    "",
    "",
    ["aerial_tramway"],
    26,
    7
  ],
  "1f6a2": [
    ["\ud83d\udea2"],
    "\ue202",
    "\udbb9\udfe8",
    ["ship"],
    26,
    8
  ],
  "1f6a3": [
    ["\ud83d\udea3"],
    "",
    "",
    ["rowboat"],
    26,
    9
  ],
  "1f6a4": [
    ["\ud83d\udea4"],
    "\ue135",
    "\udbb9\udfee",
    ["speedboat"],
    26,
    10
  ],
  "1f6a5": [
    ["\ud83d\udea5"],
    "\ue14e",
    "\udbb9\udff7",
    ["traffic_light"],
    26,
    11
  ],
  "1f6a6": [
    ["\ud83d\udea6"],
    "",
    "",
    ["vertical_traffic_light"],
    26,
    12
  ],
  "1f6a7": [
    ["\ud83d\udea7"],
    "\ue137",
    "\udbb9\udff8",
    ["construction"],
    26,
    13
  ],
  "1f6a8": [
    ["\ud83d\udea8"],
    "\ue432",
    "\udbb9\udff9",
    ["rotating_light"],
    26,
    14
  ],
  "1f6a9": [
    ["\ud83d\udea9"],
    "",
    "\udbba\udf22",
    ["triangular_flag_on_post"],
    26,
    15
  ],
  "1f6aa": [
    ["\ud83d\udeaa"],
    "",
    "\udbb9\udcf3",
    ["door"],
    26,
    16
  ],
  "1f6ab": [
    ["\ud83d\udeab"],
    "",
    "\udbba\udf48",
    ["no_entry_sign"],
    26,
    17
  ],
  "1f6ac": [
    ["\ud83d\udeac"],
    "\ue30e",
    "\udbba\udf1e",
    ["smoking"],
    26,
    18
  ],
  "1f6ad": [
    ["\ud83d\udead"],
    "\ue208",
    "\udbba\udf1f",
    ["no_smoking"],
    26,
    19
  ],
  "1f6ae": [
    ["\ud83d\udeae"],
    "",
    "",
    ["put_litter_in_its_place"],
    26,
    20
  ],
  "1f6af": [
    ["\ud83d\udeaf"],
    "",
    "",
    ["do_not_litter"],
    26,
    21
  ],
  "1f6b0": [
    ["\ud83d\udeb0"],
    "",
    "",
    ["potable_water"],
    26,
    22
  ],
  "1f6b1": [
    ["\ud83d\udeb1"],
    "",
    "",
    ["non-potable_water"],
    26,
    23
  ],
  "1f6b2": [
    ["\ud83d\udeb2"],
    "\ue136",
    "\udbb9\udfeb",
    ["bike"],
    26,
    24
  ],
  "1f6b3": [
    ["\ud83d\udeb3"],
    "",
    "",
    ["no_bicycles"],
    26,
    25
  ],
  "1f6b4": [
    ["\ud83d\udeb4"],
    "",
    "",
    ["bicyclist"],
    26,
    26
  ],
  "1f6b5": [
    ["\ud83d\udeb5"],
    "",
    "",
    ["mountain_bicyclist"],
    26,
    27
  ],
  "1f6b6": [
    ["\ud83d\udeb6"],
    "\ue201",
    "\udbb9\udff0",
    ["walking"],
    26,
    28
  ],
  "1f6b7": [
    ["\ud83d\udeb7"],
    "",
    "",
    ["no_pedestrians"],
    26,
    29
  ],
  "1f6b8": [
    ["\ud83d\udeb8"],
    "",
    "",
    ["children_crossing"],
    27,
    0
  ],
  "1f6b9": [
    ["\ud83d\udeb9"],
    "\ue138",
    "\udbba\udf33",
    ["mens"],
    27,
    1
  ],
  "1f6ba": [
    ["\ud83d\udeba"],
    "\ue139",
    "\udbba\udf34",
    ["womens"],
    27,
    2
  ],
  "1f6bb": [
    ["\ud83d\udebb"],
    "\ue151",
    "\udbb9\udd06",
    ["restroom"],
    27,
    3
  ],
  "1f6bc": [
    ["\ud83d\udebc"],
    "\ue13a",
    "\udbba\udf35",
    ["baby_symbol"],
    27,
    4
  ],
  "1f6bd": [
    ["\ud83d\udebd"],
    "\ue140",
    "\udbb9\udd07",
    ["toilet"],
    27,
    5
  ],
  "1f6be": [
    ["\ud83d\udebe"],
    "\ue309",
    "\udbb9\udd08",
    ["wc"],
    27,
    6
  ],
  "1f6bf": [
    ["\ud83d\udebf"],
    "",
    "",
    ["shower"],
    27,
    7
  ],
  "1f6c0": [
    ["\ud83d\udec0"],
    "\ue13f",
    "\udbb9\udd05",
    ["bath"],
    27,
    8
  ],
  "1f6c1": [
    ["\ud83d\udec1"],
    "",
    "",
    ["bathtub"],
    27,
    9
  ],
  "1f6c2": [
    ["\ud83d\udec2"],
    "",
    "",
    ["passport_control"],
    27,
    10
  ],
  "1f6c3": [
    ["\ud83d\udec3"],
    "",
    "",
    ["customs"],
    27,
    11
  ],
  "1f6c4": [
    ["\ud83d\udec4"],
    "",
    "",
    ["baggage_claim"],
    27,
    12
  ],
  "1f6c5": [
    ["\ud83d\udec5"],
    "",
    "",
    ["left_luggage"],
    27,
    13
  ],
  "0023-20e3": [
    [
      "#\ufe0f\u20e3", "#\u20e3"
    ],
    "\ue210",
    "\udbba\udc2c",
    ["hash"],
    27,
    14
  ],
  "0030-20e3": [
    [
      "0\ufe0f\u20e3", "0\u20e3"
    ],
    "\ue225",
    "\udbba\udc37",
    ["zero"],
    27,
    15
  ],
  "0031-20e3": [
    [
      "1\ufe0f\u20e3", "1\u20e3"
    ],
    "\ue21c",
    "\udbba\udc2e",
    ["one"],
    27,
    16
  ],
  "0032-20e3": [
    [
      "2\ufe0f\u20e3", "2\u20e3"
    ],
    "\ue21d",
    "\udbba\udc2f",
    ["two"],
    27,
    17
  ],
  "0033-20e3": [
    [
      "3\ufe0f\u20e3", "3\u20e3"
    ],
    "\ue21e",
    "\udbba\udc30",
    ["three"],
    27,
    18
  ],
  "0034-20e3": [
    [
      "4\ufe0f\u20e3", "4\u20e3"
    ],
    "\ue21f",
    "\udbba\udc31",
    ["four"],
    27,
    19
  ],
  "0035-20e3": [
    [
      "5\ufe0f\u20e3", "5\u20e3"
    ],
    "\ue220",
    "\udbba\udc32",
    ["five"],
    27,
    20
  ],
  "0036-20e3": [
    [
      "6\ufe0f\u20e3", "6\u20e3"
    ],
    "\ue221",
    "\udbba\udc33",
    ["six"],
    27,
    21
  ],
  "0037-20e3": [
    [
      "7\ufe0f\u20e3", "7\u20e3"
    ],
    "\ue222",
    "\udbba\udc34",
    ["seven"],
    27,
    22
  ],
  "0038-20e3": [
    [
      "8\ufe0f\u20e3", "8\u20e3"
    ],
    "\ue223",
    "\udbba\udc35",
    ["eight"],
    27,
    23
  ],
  "0039-20e3": [
    [
      "9\ufe0f\u20e3", "9\u20e3"
    ],
    "\ue224",
    "\udbba\udc36",
    ["nine"],
    27,
    24
  ],
  "1f1e8-1f1f3": [
    ["\ud83c\udde8\ud83c\uddf3"],
    "\ue513",
    "\udbb9\udced",
    ["cn"],
    27,
    25
  ],
  "1f1e9-1f1ea": [
    ["\ud83c\udde9\ud83c\uddea"],
    "\ue50e",
    "\udbb9\udce8",
    ["de"],
    27,
    26
  ],
  "1f1ea-1f1f8": [
    ["\ud83c\uddea\ud83c\uddf8"],
    "\ue511",
    "\udbb9\udceb",
    ["es"],
    27,
    27
  ],
  "1f1eb-1f1f7": [
    ["\ud83c\uddeb\ud83c\uddf7"],
    "\ue50d",
    "\udbb9\udce7",
    ["fr"],
    27,
    28
  ],
  "1f1ec-1f1e7": [
    ["\ud83c\uddec\ud83c\udde7"],
    "\ue510",
    "\udbb9\udcea",
    [
      "gb", "uk"
    ],
    27,
    29
  ],
  "1f1ee-1f1f9": [
    ["\ud83c\uddee\ud83c\uddf9"],
    "\ue50f",
    "\udbb9\udce9",
    ["it"],
    28,
    0
  ],
  "1f1ef-1f1f5": [
    ["\ud83c\uddef\ud83c\uddf5"],
    "\ue50b",
    "\udbb9\udce5",
    ["jp"],
    28,
    1
  ],
  "1f1f0-1f1f7": [
    ["\ud83c\uddf0\ud83c\uddf7"],
    "\ue514",
    "\udbb9\udcee",
    ["kr"],
    28,
    2
  ],
  "1f1f7-1f1fa": [
    ["\ud83c\uddf7\ud83c\uddfa"],
    "\ue512",
    "\udbb9\udcec",
    ["ru"],
    28,
    3
  ],
  "1f1fa-1f1f8": [
    ["\ud83c\uddfa\ud83c\uddf8"],
    "\ue50c",
    "\udbb9\udce6",
    ["us"],
    28,
    4
  ]
},
Config.smileys = {
  "<3": "heart",
  "</3": "broken_heart",
  ":)": "blush",
  "(:": "blush",
  ":-)": "blush",
  "C:": "smile",
  "c:": "smile",
  ":D": "smile",
  ":-D": "smile",
  ";)": "wink",
  ";-)": "wink",
  "):": "disappointed",
  ":(": "disappointed",
  ":-(": "disappointed",
  ":'(": "cry",
  "=)": "smiley",
  "=-)": "smiley",
  ":*": "kiss",
  ":-*": "kiss",
  ":>": "laughing",
  ":->": "laughing",
  "8)": "sunglasses",
  ":\\\\": "confused",
  ":-\\\\": "confused",
  ":/": "confused",
  ":-/": "confused",
  ":|": "neutral_face",
  ":-|": "neutral_face",
  ":o": "open_mouth",
  ":-o": "open_mouth",
  ">:(": "angry",
  ">:-(": "angry",
  ":p": "stuck_out_tongue",
  ":-p": "stuck_out_tongue",
  ":P": "stuck_out_tongue",
  ":-P": "stuck_out_tongue",
  ":b": "stuck_out_tongue",
  ":-b": "stuck_out_tongue",
  ";p": "stuck_out_tongue_winking_eye",
  ";-p": "stuck_out_tongue_winking_eye",
  ";b": "stuck_out_tongue_winking_eye",
  ";-b": "stuck_out_tongue_winking_eye",
  ";P": "stuck_out_tongue_winking_eye",
  ";-P": "stuck_out_tongue_winking_eye",
  ":o)": "monkey_face",
  "D:": "anguished"
},
Config.inits = {},
Config.map = {},
Config.mapcolon = {};
var a = [];
Config.reversemap = {},
Config.init_emoticons = function() {
  if (!Config.inits.emoticons) {
    Config.init_colons(),
    Config.inits.emoticons = 1;
    var a = [];
    Config.map.emoticons = {};
    for (var b in Config.emoticons_data) {
      var c = b.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
      Config.map.colons[emoji.emoticons_data[b]] && (Config.map.emoticons[c] = Config.map.colons[Config.emoticons_data[b]], a.push(Config.escape_rx(c)))
    }
    Config.rx_emoticons = new RegExp("(^|\\s)(" + a.join("|") + ")(?=$|[\\s|\\?\\.,!])", "g")
  }
},
Config.init_colons = function() {
  if (!Config.inits.colons) {
    Config.inits.colons = 1,
    Config.rx_colons = new RegExp(":[^\\s:]+:", "g"),
    Config.map.colons = {};
    for (var a in Config.data) 
      for (var b = 0; b < Config.data[a][3].length; b++) 
        Config.map.colons[emoji.data[a][3][b]] = a
  }
},
Config.init_unified = function() {
  Config.inits.unified || (Config.inits.unified = 1, buildMap())
},
Config.escape_rx = function(a) {
  return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
},
function(a) {
  function b(a) {
    h = a
  }
  function c() {
    i = !0
  }
  function d() {
    return i
      ? (i = !1, "")
      : h
  }
  function e() {
    var a,
      b,
      c,
      e = Array.prototype.slice.call(arguments),
      f = e.pop(),
      g = [],
      h = 1 == e.length,
      i = !0,
      m = d();
    for (b = 0; b < e.length; b++) 
      if (c = e[b] = m + e[b], "xt_" != c.substr(0, 3) && void 0 !== j[c]) 
        g.push(j[c]);
      else if (l) {
        try {
          a = localStorage.getItem(c)
        } catch (n) {
          l = !1
        }
        try {
          a = void 0 === a || null === a
            ? !1
            : JSON.parse(a)
        } catch (n) {
          a = !1
        }
        g.push(j[c] = a)
      }
    else 
      k
        ? i = !1
        : g.push(j[c] = !1);
    return i
      ? f(
        h
        ? g[0]
        : g)
      : void chrome.storage.local.get(e, function(a) {
        var d;
        for (g = [], b = 0; b < e.length; b++) 
          c = e[b],
          d = a[c],
          d = void 0 === d || null === d
            ? !1
            : JSON.parse(d),
          g.push(j[c] = d);
        f(
          h
          ? g[0]
          : g)
      })
  }
  function f(a, b) {
    var c,
      e,
      f = {},
      g = d();
    for (c in a) 
      if (a.hasOwnProperty(c)) 
        if (e = a[c], c = g + c, j[c] = e, e = JSON.stringify(e), l) 
          try {
            localStorage.setItem(c, e)
          } catch (h) {
            l = !1
          }
        else 
      f[c] = e;
    return l || !k
      ? void(b && b())
      : void chrome.storage.local.set(f, b)
  }
  function g() {
    var a,
      b,
      c,
      e = Array.prototype.slice.call(arguments),
      f = d();
    for ("function" == typeof e[e.length - 1] && (c = e.pop()), a = 0; a < e.length; a++) 
      if (b = e[a] = f + e[a], delete j[b], l) 
        try {
          localStorage.removeItem(b)
        } catch (g) {
          l = !1
        }
      k
      ? chrome.storage.local.remove(e, c)
      : c && c()
  }
  var h = "",
    i = !1,
    j = {},
    k = !!(a.chrome && chrome.storage && chrome.storage.local),
    l = !k && !!a.localStorage;
  a.ConfigStorage = {
    prefix: b,
    noPrefix: c,
    get: e,
    set: f,
    remove: g
  }
}(this),
function(a, b, c) {
  var d = 1,
    e = 3,
    f = [
      "p", "div", "pre", "form"
    ],
    g = 27,
    h = 9;
  a.emojiarea = {
    assetsPath: "",
    iconSize: 25,
    icons: {}
  };
  var i = ":joy:,:kissing_heart:,:heart:,:heart_eyes:,:blush:,:grin:,:+1:,:relaxed:,:pensive:,:smile:,:sob:,:kiss:,:unamused:,:flushed:,:stuck_out_tongue_winking_eye:,:see_no_evil:,:wink:,:smiley:,:cry:,:stuck_out_tongue_closed_eyes:,:scream:,:rage:,:smirk:,:disappointed:,:sweat_smile:,:kissing_closed_eyes:,:speak_no_evil:,:relieved:,:grinning:,:yum:,:laughing:,:ok_hand:,:neutral_face:,:confused:".split(",");
  a.fn.emojiarea = function(b) {
    return b = a.extend({}, b),
    this.each(function() {
      var d = a(this);
      if ("contentEditable" in c.body && b.wysiwyg !== !1) {
        var e = getGuid();
        new m(d, e, a.extend({}, b))
      } else {
        var e = getGuid();
        new l(d, e, b)
      }
      d.attr({"data-emojiable": "converted", "data-id": e, "data-type": "original-input"})
    })
  };
  var j = {};
  j.restoreSelection = function() {
    return b.getSelection
      ? function(a) {
        var c = b.getSelection();
        c.removeAllRanges();
        for (var d = 0, e = a.length; e > d; ++d) 
          c.addRange(a[d])
      }
      : c.selection && c.selection.createRange
        ? function(a) {
          a && a.select()
        }
        : void 0
  }(),
  j.saveSelection = function() {
    return b.getSelection
      ? function() {
        var a = b.getSelection(),
          c = [];
        if (a.rangeCount) 
          for (var d = 0, e = a.rangeCount; e > d; ++d) 
            c.push(a.getRangeAt(d));
      return c
      }
      : c.selection && c.selection.createRange
        ? function() {
          var a = c.selection;
          return "none" !== a.type.toLowerCase()
            ? a.createRange()
            : null
        }
        : void 0
  }(),
  j.replaceSelection = function() {
    return b.getSelection
      ? function(a) {
        var d,
          e = b.getSelection(),
          f = "string" == typeof a
            ? c.createTextNode(a)
            : a;
        e.getRangeAt && e.rangeCount && (d = e.getRangeAt(0), d.deleteContents(), d.insertNode(f), d.setStart(f, 0), b.setTimeout(function() {
          d = c.createRange(),
          d.setStartAfter(f),
          d.collapse(!0),
          e.removeAllRanges(),
          e.addRange(d)
        }, 0))
      }
      : c.selection && c.selection.createRange
        ? function(a) {
          var b = c.selection.createRange();
          "string" == typeof a
            ? b.text = a
            : b.pasteHTML(a.outerHTML)
        }
        : void 0
  }(),
  j.insertAtCursor = function(a, b) {
    a = " " + a;
    var d,
      e,
      f,
      g = b.value;
    "undefined" != typeof b.selectionStart && "undefined" != typeof b.selectionEnd
      ? (e = b.selectionStart, d = b.selectionEnd, b.value = g.substring(0, e) + a + g.substring(b.selectionEnd), b.selectionStart = b.selectionEnd = e + a.length)
      : "undefined" != typeof c.selection && "undefined" != typeof c.selection.createRange && (b.focus(), f = c.selection.createRange(), f.text = a, f.select())
  },
  j.extend = function(a, b) {
    if ("undefined" != typeof a && a || (a = {}), "object" == typeof b) 
      for (var c in b) 
        b.hasOwnProperty(c) && (a[c] = b[c]);
  return a
  },
  j.escapeRegex = function(a) {
    return (a + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
  },
  j.htmlEntities = function(a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
  },
  j.emojiInserted = function(a, b) {
    ConfigStorage.get("emojis_recent", function(b) {
      b = b || i || [];
      var c = b.indexOf(a);
      return c
        ? (-1 != c && b.splice(c, 1), b.unshift(a), b.length > 42 && (b = b.slice(42)), void ConfigStorage.set({emojis_recent: b}))
        : !1
    })
  };
  var k = function() {};
  k.prototype.setup = function() {
    var a = this;
    this.$editor.on("focus", function() {
      a.hasFocus = !0
    }),
    this.$editor.on("blur", function() {
      a.hasFocus = !1
    }),
    a.emojiMenu = new n(a),
    this.setupButton()
  },
  k.prototype.setupButton = function() {
    var b = this,
      c = a("[data-id=" + this.id + "][data-type=picker]");
    c.on("click", function(a) {
      b.emojiMenu.show(b)
    }),
    this.$button = c,
    this.$dontHideOnClick = "emoji-picker"
  },
  k.createIcon = function(b, c) {
    var d = b[0],
      e = "<%= asset_path('emoji_picker/emoji_spritesheet_0.png') %>",
      f = "<%= asset_path('emoji_picker/emoji_spritesheet_1.png') %>",
      g = "<%= asset_path('emoji_picker/emoji_spritesheet_2.png') %>",
      h = "<%= asset_path('emoji_picker/emoji_spritesheet_3.png') %>",
      i = "<%= asset_path('emoji_picker/emoji_spritesheet_4.png') %>",
      k = b[1],
      l = b[2],
      m = b[3],
      n = "<%= asset_path('emoji_picker/emoji_spritesheet_!.png') %>",
      o = "<%= asset_path('emoji_picker/blank.gif') %>",
      p = c && Config.Mobile
        ? 26
        : a.emojiarea.iconSize,
      q = -(p * l),
      r = -(p * k),
      s = Config.EmojiCategorySpritesheetDimens[d][1] * p,
      t = Config.EmojiCategorySpritesheetDimens[d][0] * p,
      u = "display:inline-block;",
      w = (n.replace("!", d), new RegExp("emoji_spritesheet_" + d)),
      x = [
        e, f, g, h, i
      ],
      y = null,
      z = "";
    return $.each(x, function(a, b) {
      return y = b.match(w),
      null != y
        ? z = y.input
        : void 0
    }),
    u += "width:" + p + "px;",
    u += "height:" + p + "px;",
    u += "background:url('" + z + "') " + q + "px " + r + "px no-repeat;",
    u += "background-size:" + s + "px " + t + "px;",
    '<img src="' + o + '" class="img" style="' + u + '" alt="' + j.htmlEntities(m) + '">'
  },
  a.emojiarea.createIcon = k.createIcon;
  var l = function(a, b, c) {
    this.options = c,
    this.$textarea = a,
    this.$editor = a,
    this.id = b,
    this.setup()
  };
  l.prototype.insert = function(b) {
    a.emojiarea.icons.hasOwnProperty(b) && (j.insertAtCursor(b, this.$textarea[0]), j.emojiInserted(b, this.menu), this.$textarea.trigger("change"))
  },
  l.prototype.val = function() {
    return "\n" == this.$textarea
      ? ""
      : this.$textarea.val()
  },
  j.extend(l.prototype, k.prototype);
  var m = function(b, d, e) {
    var f = this;
    this.options = e || {},
    "unicode" === a(b).attr("data-emoji-input")
      ? this.options.inputMethod = "unicode"
      : this.options.inputMethod = "image",
    this.id = d,
    this.$textarea = b,
    this.emojiPopup = e.emojiPopup,
    this.$editor = a("<div>").addClass("emoji-wysiwyg-editor").addClass(a(b)[0].className),
    this.$editor.data("self", this),
    b.attr("maxlength") && this.$editor.attr("maxlength", b.attr("maxlength"));
    var g = this.emojiPopup.unicodeToImage(b.val());
    this.$editor.html(g),
    this.$editor.attr({"data-id": d, "data-type": "input", placeholder: b.attr("placeholder"), contenteditable: "true"});
    var h = "blur change";
    this.options.norealTime || (h += " keyup"),
    this.$editor.on(h, function(a) {
      return f.onChange.apply(f, [a])
    }),
    this.$editor.on("mousedown focus", function() {
      c.execCommand("enableObjectResizing", !1, !1)
    }),
    this.$editor.on("blur", function() {
      c.execCommand("enableObjectResizing", !0, !0)
    });
    var i = this.$editor;
    this.$editor.on("change keydown keyup resize scroll", function(a) {
      8 != a.which && i.text().length + i.find("img").length >= i.attr("maxlength") && a.preventDefault(),
      f.updateBodyPadding(i)
    }),
    b.hide().after(this.$editor),
    this.$textarea.after("<i class='emoji-picker-icon emoji-picker " + this.options.popupButtonClasses + "' data-id='" + d + "' data-type='picker'></i>"),
    this.setup(),
    a(c.body).on("mousedown", function() {
      f.hasFocus && (f.selection = j.saveSelection())
    })
  };
  m.prototype.updateBodyPadding = function(b) {
    var c = a("[data-id=" + this.id + "][data-type=picker]");
    a(b).hasScrollbar()
      ? (c.hasClass("parent-has-scroll") || c.addClass("parent-has-scroll"), a(b).hasClass("parent-has-scroll") || a(b).addClass("parent-has-scroll"))
      : (c.hasClass("parent-has-scroll") && c.removeClass("parent-has-scroll"), a(b).hasClass("parent-has-scroll") && a(b).removeClass("parent-has-scroll"))
  },
  m.prototype.onChange = function(a) {
    this.$textarea.val(this.val()).trigger("change")
  },
  m.prototype.insert = function(b) {
    var c = "";
    if ("unicode" == this.options.inputMethod) 
      c = this.emojiPopup.colonToUnicode(b);
    else {
      var d = a(k.createIcon(a.emojiarea.icons[b]));
      d[0].attachEvent && d[0].attachEvent("onresizestart", function(a) {
        a.returnValue = !1
      }, !1),
      c = d[0]
    }
    this.$editor.trigger("focus"),
    this.selection && j.restoreSelection(this.selection);
    try {
      j.replaceSelection(c)
    } catch (e) {}
    j.emojiInserted(b, this.menu),
    this.onChange()
  },
  m.prototype.val = function() {
    for (var a = [], b = [], c = this.emojiPopup, g = function() {
      a.push(b.join("")),
      b = []
    }, h = function(a) {
      if (a.nodeType === e) 
        b.push(a.nodeValue);
      else if (a.nodeType === d) {
        var c = a.tagName.toLowerCase(),
          i = -1 !== f.indexOf(c);
        if (i && b.length && g(), "img" === c) {
          var j = a.getAttribute("alt") || "";
          return void(j && b.push(j))
        }
        "br" === c && g();
        for (var k = a.childNodes, l = 0; l < k.length; l++) 
          h(k[l]);
        i && b.length && g()
      }
    }, i = this.$editor[0].childNodes, j = 0; j < i.length; j++) 
      h(i[j]);
    b.length && g();
    var k = a.join("\n");
    return c.colonToUnicode(k)
  },
  j.extend(m.prototype, k.prototype),
  jQuery.fn.hasScrollbar = function() {
    var a = this.get(0).scrollHeight;
    return this.outerHeight() < a
      ? !0
      : !1
  };
  var n = function(d) {
    var e = this;
    e.id = d.id;
    var f = a(c.body),
      i = a(b);
    this.visible = !1,
    this.emojiarea = d,
    n.menuZIndex = 5e3,
    this.$menu = a("<div>"),
    this.$menu.addClass("emoji-menu"),
    this.$menu.attr("data-id", e.id),
    this.$menu.attr("data-type", "menu"),
    this.$menu.hide(),
    this.$itemsTailWrap = a('<div class="emoji-items-wrap1"></div>').appendTo(this.$menu),
    this.$categoryTabs = a('<table class="emoji-menu-tabs"><tr><td><a class="emoji-menu-tab icon-recent" ></a></td><td><a class="emoji-menu-tab icon-smile" ></a></td><td><a class="emoji-menu-tab icon-flower"></a></td><td><a class="emoji-menu-tab icon-bell"></a></td><td><a class="emoji-menu-tab icon-car"></a></td><td><a class="emoji-menu-tab icon-grid"></a></td></tr></table>').appendTo(this.$itemsTailWrap),
    this.$itemsWrap = a('<div class="emoji-items-wrap nano mobile_scrollable_wrap"></div>').appendTo(this.$itemsTailWrap),
    this.$items = a('<div class="emoji-items nano-content">').appendTo(this.$itemsWrap),
    f.append(this.$menu),
    Config.Mobile || this.$itemsWrap.nanoScroller({
      preventPageScrolling: !0,
      tabIndex: -1
    }),
    f.on("keydown", function(a) {
      (a.keyCode === g || a.keyCode === h) && e.hide()
    }),
    f.on("message_send", function(a) {
      e.hide()
    }),
    f.on("mouseup", function(c) {
      c = c.originalEvent || c;
      var d = c.originalTarget || c.target || b;
      if (!a(d).hasClass(e.emojiarea.$dontHideOnClick)) {
        for (; d && d != b;) 
          if (d = d.parentNode, d == e.$menu[0] || e.emojiarea && d == e.emojiarea.$button[0]) 
            return;
      e.hide()
      }
    }),
    i.on("resize", function() {
      e.visible && e.reposition()
    }),
    this.$menu.on("mouseup", "a", function(a) {
      return a.stopPropagation(),
      !1
    }),
    this.$menu.on("click", "a", function(c) {
      if (e.emojiarea.updateBodyPadding(e.emojiarea.$editor), a(this).hasClass("emoji-menu-tab")) 
        return e.getTabIndex(this) !== e.currentCategory && e.selectCategory(e.getTabIndex(this)),
        !1;
      var d = a(".label", a(this)).text();
      return b.setTimeout(function() {
        e.onItemSelected(d),
        (c.ctrlKey || c.metaKey) && e.hide()
      }, 0),
      c.stopPropagation(),
      !1
    }),
    this.selectCategory(0)
  };
  n.prototype.getTabIndex = function(a) {
    return this.$categoryTabs.find(".emoji-menu-tab").index(a)
  },
  n.prototype.selectCategory = function(a) {
    this.$categoryTabs.find(".emoji-menu-tab").each(function(b) {
      b === a
        ? this.className += "-selected"
        : this.className = this.className.replace("-selected", "")
    }),
    this.currentCategory = a,
    this.load(a),
    Config.Mobile || this.$itemsWrap.nanoScroller({scroll: "top"})
  },
  n.prototype.onItemSelected = function(a) {
    this.emojiarea.$editor.text().length + this.emojiarea.$editor.find("img").length >= this.emojiarea.$editor.attr("maxlength") || this.emojiarea.insert(a)
  },
  n.prototype.load = function(b) {
    var c = [],
      d = a.emojiarea.icons,
      e = a.emojiarea.assetsPath,
      f = this;
    e.length && "/" !== e.charAt(e.length - 1) && (e += "/");
    var g = function() {
      f.$items.html(c.join("")),
      Config.Mobile || setTimeout(function() {
        f.$itemsWrap.nanoScroller()
      }, 100)
    };
    if (b > 0) {
      for (var h in d) 
        d.hasOwnProperty(h) && d[h][0] === b - 1 && c.push('<a href="javascript:void(0)" title="' + j.htmlEntities(h) + '">' + k.createIcon(d[h], !0) + '<span class="label">' + j.htmlEntities(h) + "</span></a>");
      g()
    } else 
      ConfigStorage.get("emojis_recent", function(a) {
        a = a || i || [];
        var b,
          e;
        for (e = 0; e < a.length; e++) 
          b = a[e],
          d[b] && c.push('<a href="javascript:void(0)" title="' + j.htmlEntities(b) + '">' + k.createIcon(d[b], !0) + '<span class="label">' + j.htmlEntities(b) + "</span></a>");
        g()
      })
  },
  n.prototype.reposition = function() {
    this.tether || (this.tether = new Tether({
      element: '[data-id="' + this.id + '"][data-type="menu"]',
      target: '[data-id="' + this.id + '"][data-type="picker"]',
      attachment: "left center",
      targetAttachment: "bottom left",
      offset: "0 12px",
      constraints: [
        {
          to: "html",
          pin: !0
        }
      ]
    }))
  },
  n.prototype.hide = function(a) {
    this.visible = !1,
    this.$menu.hide("fast")
  },
  n.prototype.show = function(b) {
    return this.visible
      ? this.hide()
      : (this.reposition(), a(this.$menu).css("z-index", = n.menuZIndex + 1), this.$menu.show("fast"), this.currentCategory || this.load(0), void(this.visible = !0))
  }
}(jQuery, window, document),
function() {
  this.EmojiPicker = function() {
    function a(a) {
      var b,
        c;
      null == a && (a = {}),
      $.emojiarea.iconSize = null != (b = a.iconSize)
        ? b
        : 25,
      $.emojiarea.assetsPath = null != (c = a.assetsPath)
        ? c
        : "",
      this.generateEmojiIconSets(a),
      a.emojiable_selector || (a.emojiable_selector = "[data-emojiable=true]"),
      this.options = a
    }
    return a.prototype.discover = function() {
      var a;
      return (a = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
        ? void 0
        : $(this.options.emojiable_selector).emojiarea($.extend({
          emojiPopup: this,
          norealTime: !0
        }, this.options))
    },
    a.prototype.generateEmojiIconSets = function(a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k;
      for (f = {}, i = {}, e = void 0, g = void 0, d = void 0, h = void 0, c = void 0, j = void 0, b = void 0, k = void 0, g = 0; g < Config.EmojiCategories.length;) {
        for (k = Config.EmojiCategorySpritesheetDimens[g][1], e = 0; e < Config.EmojiCategories[g].length;) 
          c = Config.Emoji[Config.EmojiCategories[g][e]],
          h = c[1][0],
          j = Math.floor(e / k),
          b = e % k,
          f[":" + h + ":"] = [
            g, j, b, ":" + h + ":"
          ],
          i[h] = c[0],
          e++;
        g++
      }
      return $.emojiarea.icons = f,
      $.emojiarea.reverseIcons = i
    },
    a.prototype.colonToUnicode = function(a) {
      return a
        ? (Config.rx_colons || Config.init_unified(), a.replace(Config.rx_colons, function(a) {
          var b;
          return b = Config.mapcolon[a],
          b
            ? b
            : ""
        }))
        : ""
    },
    a.prototype.unicodeToImage = function(a) {
      return a
        ? (Config.rx_codes || Config.init_unified(), a.replace(Config.rx_codes, function(a) {
          var b,
            c;
          return c = Config.reversemap[a],
          c
            ? (c = ":" + c + ":", b = $.emojiarea.createIcon($.emojiarea.icons[c]))
            : ""
        }))
        : ""
    },
    a.prototype.colonToImage = function(a) {
      return a
        ? (Config.rx_colons || Config.init_unified(), a.replace(Config.rx_colons, function(a) {
          var b;
          return a
            ? b = $.emojiarea.createIcon($.emojiarea.icons[a])
            : ""
        }))
        : ""
    },
    a
  }()
}.call(this);