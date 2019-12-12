
// News Ticker plugin ~ URL: http://jonmifsud.com/open-source/jquery/jquery-webticker
(function(e) {
    function n(e, t) {
        var s = e.data("settings");
        if (typeof t === "undefined") t = false;
        if (t) {
            i(e)
        }
        var o = r(e);
        e.animate(o.css, o.time, "linear", function() {
            e.css(s.direction, "0");
            n(e, true)
        })
    }

    function r(e) {
        var t = e.data("settings");
        var n = e.children().first();
        var r = Math.abs(-e.css(t.direction).replace("px", "").replace("auto", "0") - n.outerWidth(true));
        var t = e.data("settings");
        var i = r * 1e3 / t.speed;
        var s = {};
        s[t.direction] = e.css(t.direction).replace("px", "").replace("auto", "0") - r;
        return {
            css: s,
            time: i
        }
    }

    function i(e) {
        var t = e.data("settings");
        e.css("transition-duration", "0s").css(t.direction, "0");
        var n = e.children().first();
        if (n.hasClass("webticker-init")) n.remove();
        else e.children().last().after(n)
    }

    function s(e, t) {
        if (typeof t === "undefined") t = false;
        if (t) {
            i(e)
        }
        var n = r(e);
        var s = n.time / 1e3;
        s += "s";
        e.css(n.css).css("transition-duration", s)
    }

    function o(t, n, r) {
        var i;
        e.get(t, function(t) {
            var s = e(t);
            s.find("item").each(function() {
                var t = e(this),
                    n = {
                        title: t.find("title").text(),
                        link: t.find("link").text()
                    };
                listItem = "<li><a href='" + n.link + "'>" + n.title + "</a></li>";
                i += listItem
            });
            r.webTicker("update", i, n)
        })
    }

    function u(t) {
        var n = t.data("settings");
        t.width("auto");
        var r = 0;
        t.children("li").each(function() {
            r += e(this).outerWidth(true)
        });
        if (r < t.parent().width() || t.children().length == 1) {
            if (n.duplicate) {
                itemWidth = Math.max.apply(Math, t.children().map(function() {
                    return e(this).width()
                }).get());
                while (r - itemWidth < t.parent().width() || t.children().length == 1) {
                    var i = t.children().clone();
                    t.append(i);
                    r = 0;
                    t.children("li").each(function() {
                        r += e(this).outerWidth(true)
                    });
                    itemWidth = Math.max.apply(Math, t.children().map(function() {
                        return e(this).width()
                    }).get())
                }
            } else {
                var s = t.parent().width() - r;
                s += t.find("li:first").width();
                var o = t.find("li:first").height();
                t.append('<li class="ticker-spacer" style="width:' + s + "px;height:" + o + 'px;"></li>')
            }
        }
        if (n.startEmpty) {
            var o = t.find("li:first").height();
            t.prepend('<li class="webticker-init" style="width:' + t.parent().width() + "px;height:" + o + 'px;"></li>')
        }
        r = 0;
        t.children("li").each(function() {
            r += e(this).outerWidth(true)
        });
        t.width(r + 200);
        widthCompare = 0;
        t.children("li").each(function() {
            widthCompare += e(this).outerWidth(true)
        });
        while (widthCompare >= t.width()) {
            t.width(t.width() + 200);
            widthCompare = 0;
            t.children("li").each(function() {
                widthCompare += e(this).outerWidth(true)
            })
        }
    }
    var t = function() {
        var e = document.createElement("p").style,
            t = ["ms", "O", "Moz", "Webkit"];
        if (e["transition"] == "") return true;
        while (t.length)
            if (t.pop() + "Transition" in e) return true;
        return false
    }();
    var a = {
        init: function(r) {
            r = jQuery.extend({
                speed: 50,
                direction: "left",
                moving: true,
                startEmpty: true,
                duplicate: false,
                rssurl: false,
                hoverpause: true,
                rssfrequency: 0,
                updatetype: "reset"
            }, r);
            return this.each(function() {
                jQuery(this).data("settings", r);
                var i = jQuery(this);
                i.addClass("newsticker");
                var a = i.wrap("<div class='mask'></div>");
                a.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>");
                var f = i.parent().wrap("<div class='tickercontainer'></div>");
                u(i);
                if (r.rssurl) {
                    o(r.rssurl, r.type, i);
                    if (r.rssfrequency > 0) {
                        window.setInterval(function() {
                            o(r.rssurl, r.type, i)
                        }, r.rssfrequency * 1e3 * 60)
                    }
                }
                if (t) {
                    i.css("transition-duration", "0s").css(r.direction, "0");
                    s(i, false);
                    i.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function(t) {
                        if (!i.is(t.target)) {
                            return false
                        }
                        s(e(this), true)
                    })
                } else {
                    n(e(this))
                }
                if (r.hoverpause) {
                    i.hover(function() {
                        if (t) {
                            var n = e(this).css(r.direction);
                            e(this).css("transition-duration", "0s").css(r.direction, n)
                        } else jQuery(this).stop()
                    }, function() {
                        if (jQuery(this).data("settings").moving) {
                            if (t) {
                                s(e(this), false)
                            } else {
                                n(i)
                            }
                        }
                    })
                }
            })
        },
        stop: function() {
            var n = e(this).data("settings");
            if (n.moving) {
                n.moving = false;
                return this.each(function() {
                    if (t) {
                        var r = e(this).css(n.direction);
                        e(this).css("transition-duration", "0s").css(n.direction, r)
                    } else e(this).stop()
                })
            }
        },
        cont: function() {
            var r = e(this).data("settings");
            if (!r.moving) {
                r.moving = true;
                return this.each(function() {
                    if (t) {
                        s(e(this), false)
                    } else {
                        n(e(this))
                    }
                })
            }
        },
        update: function(t, n, r, i) {
            n = n || "reset";
            if (typeof r === "undefined") r = true;
            if (typeof i === "undefined") i = false;
            if (typeof t === "string") {
                t = e(t)
            }
            var s = e(this);
            s.webTicker("stop");
            var o = e(this).data("settings");
            if (n == "reset") {
                s.html(t);
                s.css(o.direction, "0");
                u(s)
            } else if (n == "swap") {
                s.children("li").addClass("old");
                for (var a = 0; a < t.length; a++) {
                    id = e(t[a]).data("update");
                    match = s.find('[data-update="' + id + '"]');
                    if (match.length < 1) {
                        if (r) {
                            if (s.find(".ticker-spacer:first-child").length == 0 && s.find(".ticker-spacer").length > 0) {
                                s.children("li.ticker-spacer").before(t[a])
                            } else {
                                s.append(t[a])
                            }
                        }
                    } else s.find('[data-update="' + id + '"]').replaceWith(t[a]);
                }
                s.children("li.webticker-init, li.ticker-spacer").removeClass("old");
                if (i) s.children("li").remove(".old");
                stripWidth = 0;
                s.children("li").each(function() {
                    stripWidth += e(this).outerWidth(true)
                });
                s.width(stripWidth + 200)
            }
            s.webTicker("cont")
        }
    };
    e.fn.webTicker = function(t) {
        if (a[t]) {
            return a[t].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof t === "object" || !t) {
            return a.init.apply(this, arguments)
        } else {
            e.error("Method " + t + " does not exist on jQuery.webTicker")
        }
    }
})(jQuery);

// Timeago jQuery plugin ~ URL: http://timeago.yarp.com
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function(e) {
    function r() {
        var n = i(this);
        var r = t.settings;
        if (!isNaN(n.datetime)) {
            if (r.cutoff == 0 || Math.abs(o(n.datetime)) < r.cutoff) {
                e(this).text(s(n.datetime))
            }
        }
        return this
    }

    function i(n) {
        n = e(n);
        if (!n.data("timeago")) {
            n.data("timeago", {
                datetime: t.datetime(n)
            });
            var r = e.trim(n.text());
            if (t.settings.localeTitle) {
                n.attr("title", n.data("timeago").datetime.toLocaleString())
            } else if (r.length > 0 && !(t.isTime(n) && n.attr("title"))) {
                n.attr("title", r)
            }
        }
        return n.data("timeago")
    }

    function s(e) {
        return t.inWords(o(e))
    }

    function o(e) {
        return (new Date).getTime() - e.getTime()
    }
    e.timeago = function(t) {
        if (t instanceof Date) {
            return s(t)
        } else if (typeof t === "string") {
            return s(e.timeago.parse(t))
        } else if (typeof t === "number") {
            return s(new Date(t))
        } else {
            return s(e.timeago.datetime(t))
        }
    };
    var t = e.timeago;
    e.extend(e.timeago, {
        settings: {
            refreshMillis: 6e4,
            allowPast: true,
            allowFuture: false,
            localeTitle: false,
            cutoff: 0,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "auparavant",
                suffixFromNow: "Maintenant",
                inPast: "Dans un instant",
                seconds: "Quelques secondes",
                minute: "1 minute",
                minutes: "%d mins",
                hour: "1 hr",
                hours: "%d hrs",
                day: "1 jour",
                days: "%d jours",
                month: "1 mois",
                months: "%d mois",
                year: "année",
                years: "%d ans",
                wordSeparator: " ",
                numbers: []
            }
        },
        inWords: function(t) {
            function l(r, i) {
                var s = e.isFunction(r) ? r(i, t) : r;
                var o = n.numbers && n.numbers[i] || i;
                return s.replace(/%d/i, o)
            }
            if (!this.settings.allowPast && !this.settings.allowFuture) {
                throw "timeago allowPast and allowFuture settings can not both be set to false."
            }
            var n = this.settings.strings;
            var r = n.prefixAgo;
            var i = n.suffixAgo;
            if (this.settings.allowFuture) {
                if (t < 0) {
                    r = n.prefixFromNow;
                    i = n.suffixFromNow
                }
            }
            if (!this.settings.allowPast && t >= 0) {
                return this.settings.strings.inPast
            }
            var s = Math.abs(t) / 1e3;
            var o = s / 60;
            var u = o / 60;
            var a = u / 24;
            var f = a / 365;
            var c = s < 45 && l(n.seconds, Math.round(s)) || s < 90 && l(n.minute, 1) || o < 45 && l(n.minutes, Math.round(o)) || o < 90 && l(n.hour, 1) || u < 24 && l(n.hours, Math.round(u)) || u < 42 && l(n.day, 1) || a < 30 && l(n.days, Math.round(a)) || a < 45 && l(n.month, 1) || a < 365 && l(n.months, Math.round(a / 30)) || f < 1.5 && l(n.year, 1) || l(n.years, Math.round(f));
            var h = n.wordSeparator || "";
            if (n.wordSeparator === undefined) {
                h = " "
            }
            return e.trim([r, c, i].join(h))
        },
        parse: function(t) {
            var n = e.trim(t);
            n = n.replace(/\.\d+/, "");
            n = n.replace(/-/, "/").replace(/-/, "/");
            n = n.replace(/T/, " ").replace(/Z/, " UTC");
            n = n.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            n = n.replace(/([\+\-]\d\d)$/, " $100");
            return new Date(n)
        },
        datetime: function(n) {
            var r = t.isTime(n) ? e(n).attr("datetime") : e(n).attr("title");
            return t.parse(r)
        },
        isTime: function(t) {
            return e(t).get(0).tagName.toLowerCase() === "time"
        }
    });
    var n = {
        init: function() {
            var n = e.proxy(r, this);
            n();
            var i = t.settings;
            if (i.refreshMillis > 0) {
                this._timeagoInterval = setInterval(n, i.refreshMillis)
            }
        },
        update: function(n) {
            var i = t.parse(n);
            e(this).data("timeago", {
                datetime: i
            });
            if (t.settings.localeTitle) e(this).attr("title", i.toLocaleString());
            r.apply(this)
        },
        updateFromDOM: function() {
            e(this).data("timeago", {
                datetime: t.parse(t.isTime(this) ? e(this).attr("datetime") : e(this).attr("title"))
            });
            r.apply(this)
        },
        dispose: function() {
            if (this._timeagoInterval) {
                window.clearInterval(this._timeagoInterval);
                this._timeagoInterval = null
            }
        }
    };
    e.fn.timeago = function(e, t) {
        var r = e ? n[e] : n.init;
        if (!r) {
            throw new Error("Unknown function name '" + e + "' for timeago")
        }
        this.each(function() {
            r.call(this, t)
        });
        return this
    };
    document.createElement("abbr");
    document.createElement("time")
});

// Tabslet jQuery plugin -  http://vdw.staytuned.gr
(function($, window, undefined) {
    $.fn.tabslet = function(options) {
        var defaults = {
            mouseevent: "click",
            attribute: "href",
            animation: false,
            autorotate: false,
            pauseonhover: true,
            delay: 2000,
            active: 1,
            controls: {
                prev: ".prev",
                next: ".next"
            }
        };
        var options = $.extend(defaults, options);
        return this.each(function() {
            var $this = $(this);
            options.mouseevent = $this.data("mouseevent") || options.mouseevent;
            options.attribute = $this.data("attribute") || options.attribute;
            options.animation = $this.data("animation") || options.animation;
            options.autorotate = $this.data("autorotate") || options.autorotate;
            options.pauseonhover = $this.data("pauseonhover") || options.pauseonhover;
            options.delay = $this.data("delay") || options.delay;
            options.active = $this.data("active") || options.active;
            $this.find("> div").hide();
            $this.find("> div").eq(options.active - 1).show();
            $this.find("> ul li").eq(options.active - 1).addClass("active");
            var fn = eval(function() {
                $(this).trigger("_before");
                $this.find("> ul li").removeClass("active");
                $(this).addClass("active");
                $this.find("> div").hide();
                var currentTab = $(this).find("a").attr(options.attribute);
                if (options.animation) {
                    $this.find(currentTab).animate({
                        opacity: "show"
                    }, "slow", function() {
                        $(this).trigger("_after")
                    })
                } else {
                    $this.find(currentTab).show();
                    $(this).trigger("_after")
                }
                return false
            });
            var init = eval("$this.find('> ul li')." + options.mouseevent + "(fn)");
            init;
            var elements = $this.find("> ul li"),
                i = options.active - 1;

            function forward() {
                i = ++i % elements.length;
                options.mouseevent == "hover" ? elements.eq(i).trigger("mouseover") : elements.eq(i).click();
                var t = setTimeout(forward, options.delay);
                $this.mouseover(function() {
                    if (options.pauseonhover) {
                        clearTimeout(t)
                    }
                })
            }
            if (options.autorotate) {
                setTimeout(forward, 0);
                if (options.pauseonhover) {
                    $this.on("mouseleave", function() {
                        setTimeout(forward, 1000)
                    })
                }
            }

            function move(direction) {
                if (direction == "forward") {
                    i = ++i % elements.length
                }
                if (direction == "backward") {
                    i = --i % elements.length
                }
                elements.eq(i).click()
            }
            $this.find(options.controls.next).click(function() {
                move("forward")
            });
            $this.find(options.controls.prev).click(function() {
                move("backward")
            });
            $this.on("destroy", function() {
                $(this).removeData()
            })
        })
    };
    $(document).ready(function() {
        $('[data-toggle="tabslet"]').tabslet()
    })
})(jQuery);

// Plugin: SelectNav.js ~ url: https://github.com/lukaszfiszer/selectnav.js
window.selectnav = function() {
    "use strict";
    var e = function(e, t) {
        function c(e) {
            var t;
            if (!e) e = window.event;
            if (e.target) t = e.target;
            else if (e.srcElement) t = e.srcElement;
            if (t.nodeType === 3) t = t.parentNode;
            if (t.value) window.location.href = t.value
        }

        function h(e) {
            var t = e.nodeName.toLowerCase();
            return t === "ul" || t === "ol"
        }

        function p(e) {
            for (var t = 1; document.getElementById("selectnav" + t); t++);
            return e ? "selectnav" + t : "selectnav" + (t - 1)
        }

        function d(e) {
            a++;
            var t = e.children.length,
                n = "",
                l = "",
                c = a - 1;
            if (!t) {
                return
            }
            if (c) {
                while (c--) {
                    l += o
                }
                l += " "
            }
            for (var v = 0; v < t; v++) {
                var m = e.children[v].children[0];
                if (typeof m !== "undefined") {
                    var g = m.innerText || m.textContent;
                    var y = "";
                    if (r) {
                        y = m.className.search(r) !== -1 || m.parentNode.className.search(r) !== -1 ? f : ""
                    }
                    if (i && !y) {
                        y = m.href === document.URL ? f : ""
                    }
                    n += '<option value="' + m.href + '" ' + y + ">" + l + g + "</option>";
                    if (s) {
                        var b = e.children[v].children[1];
                        if (b && h(b)) {
                            n += d(b)
                        }
                    }
                }
            }
            if (a === 1 && u) {
                n = '<option value="">' + u + "</option>" + n
            }
            if (a === 1) {
                n = '<select class="selectnav" id="' + p(true) + '">' + n + "</select>"
            }
            a--;
            return n
        }
        e = document.getElementById(e);
        if (!e) {
            return
        }
        if (!h(e)) {
            return
        }
        if (!("insertAdjacentHTML" in window.document.documentElement)) {
            return
        }
        document.documentElement.className += " js";
        var n = t || {},
            r = n.activeclass || "active",
            i = typeof n.autoselect === "boolean" ? n.autoselect : true,
            s = typeof n.nested === "boolean" ? n.nested : true,
            o = n.indent || "?",
            u = n.label || "Menu",
            a = 0,
            f = " selected ";
        e.insertAdjacentHTML("afterend", d(e));
        var l = document.getElementById(p());
        if (l.addEventListener) {
            l.addEventListener("change", c)
        }
        if (l.attachEvent) {
            l.attachEvent("onchange", c)
        }
        return l
    };
    return function(t, n) {
        e(t, n)
    }
}();
$(document).ready(function() {
    selectnav('menu-main-nav');
    selectnav('nav1');
});

// Simple Tab JQuery Plugin by Taufik Nurrohman - https://plus.google.com/108949996304093815163/about
(function(a) {
    a.fn.simpleTab = function(b) {
        b = jQuery.extend({
            active: 1,
            fx: null,
            showSpeed: 400,
            hideSpeed: 400,
            showEasing: null,
            hideEasing: null,
            show: function() {},
            hide: function() {},
            change: function() {}
        }, b);
        return this.each(function() {
            var e = a(this),
                c = e.children("[data-tab]"),
                d = b.active - 1;
            e.addClass("simpleTab").prepend('<ul class="tab-wrapper"></ul>');
            c.addClass("tab-content").each(function() {
                a(this).hide();
                e.find(".tab-wrapper").append('<li><a href="#">' + a(this).data("tab") + "</a></li>")
            }).eq(d).show();
            e.find(".tab-wrapper a").on("click", function() {
                var f = a(this).parent().index();
                a(this).closest(".tab-wrapper").find(".activeTab").removeClass("activeTab");
                a(this).addClass("activeTab");
                if (b.fx == "slide") {
                    if (c.eq(f).is(":hidden")) {
                        c.slideUp(b.hideSpeed, b.hideEasing, function() {
                            b.hide.call(e)
                        }).eq(f).slideDown(b.showSpeed, b.showEasing, function() {
                            b.show.call(e)
                        })
                    }
                } else {
                    if (b.fx == "fade") {
                        if (c.eq(f).is(":hidden")) {
                            c.hide().eq(f).fadeIn(b.showSpeed, b.showEasing, function() {
                                b.show.call(e)
                            })
                        }
                    } else {
                        if (b.fx == "fancyslide") {
                            if (c.eq(f).is(":hidden")) {
                                c.slideUp(b.hideSpeed, b.hideEasing, function() {
                                    b.hide.call(e)
                                }).eq(f).delay(b.hideSpeed).slideDown(b.showSpeed, b.showEasing, function() {
                                    b.show.call(e)
                                })
                            }
                        } else {
                            if (c.eq(f).is(":hidden")) {
                                c.hide().eq(f).show()
                            }
                        }
                    }
                }
                b.change.call(e);
                return false
            }).eq(d).addClass("activeTab")
        })
    }
})(jQuery);

// JQuery hover event with timeout by Taufik Nurrohman - https://plus.google.com/108949996304093815163/about
(function(c) {
    c.fn.hoverTimeout = function(d, e, f, g) {
        return this.each(function() {
            var a = null,
                b = c(this);
            b.hover(function() {
                clearTimeout(a);
                a = setTimeout(function() {
                    e.call(b)
                }, d)
            }, function() {
                clearTimeout(a);
                a = setTimeout(function() {
                    g.call(b)
                }, f)
            })
        })
    }
})(jQuery);

// jquery replacetext plugin https://github.com/cowboy/jquery-replacetext
(function(e) {
    e.fn.replaceText = function(t, n, r) {
        return this.each(function() {
            var i = this.firstChild,
                s, o, u = [];
            if (i) {
                do {
                    if (i.nodeType === 3) {
                        s = i.nodeValue;
                        o = s.replace(t, n);
                        if (o !== s) {
                            if (!r && /</.test(o)) {
                                e(i).before(o);
                                u.push(i)
                            } else {
                                i.nodeValue = o
                            }
                        }
                    }
                } while (i = i.nextSibling)
            }
            u.length && e(u).remove()
        })
    }
})(jQuery);

// Main Scripts
$(document).ready(function() {
    $(".comments-tabs").simpleTab({
        active: 1,
        fx: "fade",
        showSpeed: 400,
        hideSpeed: 400
    });
    $('.tab-blogger').append($('#comments'));
    $(".comments-tabs.simpleTab .tab-wrapper").wrap("<div class='comments-tabs-header'/>");
    $('.comments-tabs-header').prepend('<h3>' + comments_text + '</h3>')
});
$("#LinkList94").each(function() {
    var k = "<ul id='menu-main-nav'><li><ul class='sub-menu'>";
    $("#LinkList94 li").each(function() {
        var a = $(this).text(),
            o = a.substr(0, 1),
            p = a.substr(1);
        "_" == o ? (o = $(this).find("a").attr("href"), k += '<li><a href="' + o + '">' + p + "</a></li>") : (o = $(this).find("a").attr("href"), k += '</ul></li><li><a href="' + o + '">' + a + "</a><ul class='sub-menu'>")
    });
    k += "</ul></li></ul>";
    $(this).html(k);
    $("#LinkList94 ul").each(function() {
        var k = $(this);
        if (k.html().replace(/\s|&nbsp;/g, "").length == 0) k.remove()
    });
    $("#LinkList94 li").each(function() {
        var k = $(this);
        if (k.html().replace(/\s|&nbsp;/g, "").length == 0) k.remove()
    })
});
$(document).ready(function() {
    $("#menu").show();
    $("ul.sub-menu").parent("li").addClass("has-children");
    $("#menu ul li").each(function() {
        $(this).hoverTimeout(0, function() {
            $(this).children("ul").slideDown()
        }, 0, function() {
            $(this).children("ul").hide()
        })
    });
    var search = $('.search');
    search.click(function(e) {
        e.preventDefault();
        if (search.is('.active') && $(e.target).is(search)) {
            search.removeClass('active')
        } else {
            search.addClass('active');
            search.find('input').focus()
        }
    });
    $('body').click(function(e) {
        if (search.is('.active') && !$(e.target).is('.search, .search form, .search input')) {
            search.removeClass('active')
        }
    });
    $("abbr.timeago").timeago();
    $(".index .post-outer,.archive .post-outer").each(function() {
        $(this).find(".block-image .thumb a").attr("style", function(a, b) {
            return b.replace("/default.jpg", "/mqdefault.jpg")
        }).attr("style", function(a, b) {
            return b.replace("s72-c", "s1600")
        })
    });
    $(".index .post-outer,.archive .post-outer").each(function() {
        $(this).find(".block-image .thumb a").attr("style", function(a, b) {
            return b.replace("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", "" + no_image + "")
        })
    });
    $('.PopularPosts ul li img').each(function() {
        $(this).attr('src', function(i, src) {
            return src.replace('/default.jpg', '/mqdefault.jpg')
        }).attr('src', function(i, src) {
            return src.replace('s72-c', 's1600')
        })
    });
    $(".PopularPosts .item-thumbnail a").prepend('<span class="img-overlay"/>');
    $(".sect-left .widget h2").wrap("<div class='title-wrap'/>");
    $(".back-top").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = $(this.hash);
            a = a.length ? a : $("[name=" + this.hash.slice(1) + "]");
            if (a.length) {
                $("html,body").animate({
                    scrollTop: a.offset().top
                }, 1e3);
                return false
            }
        }
    });
    $(".social-counter").each(function() {
        var a = $(this);
        var b = $(this).find(".item-social");
        if (0 === b.length) a.remove();
        $(this).find(".widget").removeClass("LinkList");
        $(".social-counter .item-social.facebook").find(".item-text").text("Likes");
        $(".social-counter .item-social.rss,.social-counter .item-social.youtube").find(".item-text").text("Subscribes");
        var c = "count=";
        var d = ";";
        $(".social-counter *").replaceText(c, '<span class="item-count">');
        $(".social-counter *").replaceText(d, "</span>");
        $(".item-social").each(function() {
            var a = $(this).find(".hide-count");
            var b = $(this).find(".item-count");
            $(a).before($(b));
            $(a).remove()
        })
    })
});

$(document).ready(function(a) {
    var b = a("a.newer-link");
    var c = a("a.older-link");
    a.get(b.attr("href"), function(c) {
        b.html("<strong>" + pagenav_next + "</strong><span>" + a(c).find(".post h1.post-title").text() + "</span>")
    }, "html");
    a.get(c.attr("href"), function(b) {
        c.html("<strong>" + pagenav_prev + "</strong><span>" + a(b).find(".post h1.post-title").text() + "</span>")
    }, "html")
});
$(document).ready(function() {
    var t = $(".item #post-ads-footer");
    $(".item .post *").replaceText('<div class="ad-post-footer"/>');
    $(".ad-post-footer").append(t);
    var n = $(".post-body #post-ads-footer").width();
    $(".post-body .ad-post-footer").width(n)
});
$(document).ready(function() {
    $('a').each(function() {
        var a = $(this).attr('href'),
            e = $(this);
        if (a !== undefined) {
            if (a.indexOf('/search/label') != -1) {
                if (a.indexOf('max-results') != -1) {
                    var t = getParameterByName('max-results', a),
                        n = a.replace('max-results=' + t, 'max-results=' + postperpage);
                    e.attr('href', n)
                } else {
                    if (a.indexOf('?') == -1) {
                        e.attr('href', a + "?&max-results=" + postperpage)
                    } else {
                        e.attr('href', a + "&max-results=" + postperpage)
                    }
                }
            }
        }
    })
});
window.onload = function() {
        var e = document.getElementById("mycontent");
        if (e == null) {
            window.location.href = "https://parieurmalin.blogspot.com/"
        }
        e.setAttribute("href", "https://parieurmalin.blogspot.com/");
        e.setAttribute("title", "Blogger Templates");
        e.innerHTML = "Majlis Templates "
    }
    // Main Post Scripts
$(".ticker .HTML .widget-content").each(function() {
    var b = $(this).find("span").attr("data-no"),
        v = $(this).find("span").attr("data-label"),
        box = $(this).find("span").attr("data-type");
    if (box.match('recent')) {
        $.ajax({
            url: "/feeds/posts/default?alt=json-in-script&max-results=" + b,
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li><div class="tk-thumb"><a class="tk-img" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><a href="/search/label/' + s + '" class="post-tag icon ' + s + '">' + s + '</a><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3></li>'
                }
                h += '</ul>';
                $(".ticker .widget-content").each(function() {
                    $(this).html(h);
                    $(this).prev('h2').prepend('<i class="fa fa-star"></i>');
                    $(this).find('ul').webTicker()
                })
            }
        })
    } else if (box.match('label')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li><div class="tk-thumb"><a class="tk-img" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><a href="/search/label/' + s + '" class="post-tag icon ' + s + '">' + s + '</a><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3></li>'
                }
                h += '</ul>';
                $(".ticker .HTML .widget-content").each(function() {
                    $(this).html(h);
                    $(this).prev('h2').prepend('<i class="fa fa-star"></i>');
                    $(this).find('ul').webTicker()
                })
            }
        })
    }
});
$('.featured .HTML .widget-content').each(function() {
    var v = $(this).find("span").attr("data-label"),
        box = $(this).find("span").attr("data-type");
    if (box.match('recent')) {
        $.ajax({
            url: "/feeds/posts/default?alt=json-in-script&max-results=4",
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var d = e.feed.entry[i].published.$t,
                        t = d.substring(0, 4),
                        w = d.substring(5, 7),
                        f = d.substring(8, 10),
                        r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li><div class="featured-inner"><a href="/search/label/' + s + '" class="post-tag icon ' + s + '">' + s + '</a><a class="rcp-thumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="featured-overlay"/></a><div class="post-panel"><h3 class="rcp-title"><a href="' + u + '">' + g + '</a></h3><div class="featured-meta"><span class="featured-author idel">' + y + '</span><span class="featured-date">' + r + '</span></div></div></div></li>'
                }
                h += '</ul>';
                $(".featured .HTML .widget-content").each(function() {
                    $(this).html(h);
                    $(this).find('.rcp-thumb').each(function() {
                        $(this).attr('style', function(i, src) {
                            return src.replace('/default.jpg', '/mqdefault.jpg')
                        }).attr('style', function(i, src) {
                            return src.replace('s72-c', 's1600')
                        })
                    })
                })
            }
        })
    } else if (box.match('label')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=4",
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var d = e.feed.entry[i].published.$t,
                        t = d.substring(0, 4),
                        w = d.substring(5, 7),
                        f = d.substring(8, 10),
                        r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li><div class="featured-inner"><a href="/search/label/' + s + '" class="post-tag icon ' + s + '">' + s + '</a><a class="rcp-thumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="featured-overlay"/></a><div class="post-panel"><h3 class="rcp-title"><a href="' + u + '">' + g + '</a></h3><div class="featured-meta"><span class="featured-author idel">' + y + '</span><span class="featured-date">' + r + '</span></div></div></div></li>'
                }
                h += '</ul>';
                $(".featured .HTML .widget-content").each(function() {
                    $(this).html(h);
                    $(this).find('.rcp-thumb').each(function() {
                        $(this).attr('style', function(i, src) {
                            return src.replace('/default.jpg', '/mqdefault.jpg')
                        }).attr('style', function(i, src) {
                            return src.replace('s72-c', 's1600')
                        })
                    })
                })
            }
        })
    }
});
$('.ready-widget .HTML .widget-content span.recentcomments').each(function() {
    var b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/comments/default?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<ul class="cmm-widget">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                if (i == e.feed.entry.length) break;
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == 'alternate') {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                if ("content" in e.feed.entry[i]) {
                    var c = e.feed.entry[i].content.$t
                } else if ("summary" in b_rc) {
                    var c = e.feed.entry[i].summary.$t
                } else var c = "";
                var re = /<\S[^>]*>/g;
                c = c.replace(re, "");
                if (c.length > 70) {
                    c = '' + c.substring(0, 50) + '...'
                }
                var y = e.feed.entry[i].author[0].name.$t;
                var yk = e.feed.entry[i].author[0].gd$image.src;
                if (yk.match('http://img1.blogblog.com/img/blank.gif')) {
                    var k = 'http://img1.blogblog.com/img/anon36.png'
                } else {
                    if (yk.match('http://img2.blogblog.com/img/b16-rounded.gif')) {
                        var k = 'http://img1.blogblog.com/img/anon36.png'
                    } else {
                        var k = yk
                    }
                };
                h += '<li><div class="cmm-avatar"><img class="cmm-img" src="' + k + '"/></div><a href="' + u + '">' + y + '</a><span>"' + c + '"</span></li>'
            }
            h += '</ul><div class="clear"/>';
            $('.ready-widget .HTML .widget-content span.recentcomments').each(function() {
                var text = $(this).attr("data-no");
                if (text == b) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$('.ready-widget .HTML .widget-content span.recentposts').each(function() {
    var b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/posts/default?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<ul class="custom-widget">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var y = e.feed.entry[i].author[0].name.$t;
                var d = e.feed.entry[i].published.$t,
                    t = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                var c = e.feed.entry[i].content.$t;
                var $c = $('<div>').html(c);
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                    var k = q
                } else {
                    var k = no_image
                }
                h += '<li><a class="rcthumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a><div class="post-panel"><h3 class="rcp-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div></li>'
            }
            h += '</ul>';
            $('.ready-widget .HTML .widget-content span.recentposts').each(function() {
                var text = $(this).attr("data-no");
                if (text == b) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$('.ready-widget .HTML .widget-content span.labelpost').each(function() {
    var v = $(this).attr("data-label"),
        b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<ul class="custom-widget">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var y = e.feed.entry[i].author[0].name.$t;
                var d = e.feed.entry[i].published.$t,
                    t = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                var c = e.feed.entry[i].content.$t;
                var $c = $('<div>').html(c);
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                    var k = q
                } else {
                    var k = no_image
                }
                h += '<li><a class="rcthumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a><div class="post-panel"><h3 class="rcp-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div></li>'
            }
            h += '</ul>';
            $(".ready-widget .HTML .widget-content span.labelpost").each(function() {
                var text = $(this).attr("data-label");
                if (text == v) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$(".recent-boxes .HTML .widget-content").each(function() {
    var v = $(this).find("span").attr("data-label"),
        b = $(this).find("span").attr("data-no"),
        n = $(this).prev("h2").text(),
        sora = $(this).parent().attr("id"),
        box = $(this).find("span").attr("data-type");
    if (box.match('feat')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=5",
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var d = e.feed.entry[i].published.$t,
                        t = d.substring(0, 4),
                        w = d.substring(5, 7),
                        f = d.substring(8, 10),
                        r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    if (i == 0) {
                        h += '<div class="bx-first"><div class="bx-item"><div class="box-thumbnail"><a class="bf-thumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a><div class="first-tag"><a class="icon ' + s + '" href="/search/label/' + s + '">' + s + '</a></div></div><div class="bf-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div></div></div>'
                    } else {
                        h += '<li><div class="box-thumbnail"><a class="box-image" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><div class="recent-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div><div class="clear"/></li>'
                    }
                }
                h += '</ul>';
                $(".recent-boxes .HTML .widget-content").each(function() {
                    var text = $(this).parent().attr("id");
                    if (text == sora) {
                        $(this).html(h);
                        $(this).parent().addClass('feat');
                        $(this).parent().addClass('boxes');
                        $(this).prev("h2").html('<a href="/search/label/' + v + '">' + n + '</a>');
                        $(this).prev("h2").wrap('<div class="box-title"></div>');
                        $(this).prev(".box-title").append('<a class="more-link" href="/search/label/' + v + '">' + more_text + '</a>');
                        $(this).find('.box-image,.bf-thumb').each(function() {
                            $(this).attr('style', function(i, src) {
                                return src.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function(i, src) {
                                return src.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
    if (box.match('columnleft')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var d = e.feed.entry[i].published.$t,
                        t = d.substring(0, 4),
                        w = d.substring(5, 7),
                        f = d.substring(8, 10),
                        r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    if (i == 0) {
                        h += '<div class="bx-first"><div class="box-thumbnail"><a class="bf-thumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a><div class="first-tag"><a class="icon ' + s + '" href="/search/label/' + s + '">' + s + '</a></div></div><div class="bf-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div></div>'
                    } else {
                        h += '<li><div class="box-thumbnail"><a class="box-image" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><div class="recent-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div><div class="clear"/></li>'
                    }
                }
                h += '</ul>';
                $(".recent-boxes .HTML .widget-content").each(function() {
                    var text = $(this).parent().attr("id");
                    if (text == sora) {
                        $(this).html(h);
                        $(this).parent().addClass('column');
                        $(this).parent().addClass('columnleft');
                        $(this).parent().addClass('boxes');
                        $(this).prev("h2").html('<a href="/search/label/' + v + '">' + n + '</a>');
                        $(this).prev("h2").wrap('<div class="box-title"></div>');
                        $(this).prev(".box-title").append('<a class="more-link" href="/search/label/' + v + '">' + more_text + '</a>');
                        $(this).find('.box-image,.bf-thumb').each(function() {
                            $(this).attr('style', function(i, src) {
                                return src.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function(i, src) {
                                return src.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
    if (box.match('columnright')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var d = e.feed.entry[i].published.$t,
                        t = d.substring(0, 4),
                        w = d.substring(5, 7),
                        f = d.substring(8, 10),
                        r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    if (i == 0) {
                        h += '<div class="bx-first"><div class="box-thumbnail"><a class="bf-thumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a><div class="first-tag"><a class="icon ' + s + '" href="/search/label/' + s + '">' + s + '</a></div></div><div class="bf-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div></div>'
                    } else {
                        h += '<li><div class="box-thumbnail"><a class="box-image" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><div class="recent-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div><div class="clear"/></li>'
                    }
                }
                h += '</ul>';
                $(".recent-boxes .HTML .widget-content").each(function() {
                    var text = $(this).parent().attr("id");
                    if (text == sora) {
                        $(this).html(h);
                        $(this).parent().addClass('column');
                        $(this).parent().addClass('columnright');
                        $(this).parent().addClass('boxes');
                        $(this).prev("h2").html('<a href="/search/label/' + v + '">' + n + '</a>');
                        $(this).prev("h2").wrap('<div class="box-title"></div>');
                        $(this).prev(".box-title").append('<a class="more-link" href="/search/label/' + v + '">' + more_text + '</a>');
                        $(this).find('.box-image,.bf-thumb').each(function() {
                            $(this).attr('style', function(i, src) {
                                return src.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function(i, src) {
                                return src.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
    if (box.match('gallery')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=6",
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li><a class="box-image" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="gallery-overlay"/></a><div class="category-gallery"><a class="icon ' + s + '" href="/search/label/' + s + '"></a></div><div class="recent-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span></div><div class="clear"/></li>'
                }
                h += '</ul>';
                $(".recent-boxes .HTML .widget-content").each(function() {
                    var text = $(this).parent().attr("id");
                    if (text == sora) {
                        $(this).html(h);
                        $(this).parent().addClass('gallery');
                        $(this).prev("h2").html('<a href="/search/label/' + v + '">' + n + '</a>');
                        $(this).prev("h2").wrap('<div class="box-title"></div>');
                        $(this).prev(".box-title").append('<a class="more-link" href="/search/label/' + v + '">' + more_text + '</a>');
                        $(this).find('.box-image').each(function() {
                            $(this).attr('style', function(i, src) {
                                return src.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function(i, src) {
                                return src.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
    if (box.match('videos')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=3",
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<ul>';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li><div class="videos-item"><a class="box-image" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="videos-overlay"/></a><div class="recent-content"><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span></div><div class="clear"/></div></li>'
                }
                h += '</ul>';
                $(".recent-boxes .HTML .widget-content").each(function() {
                    var text = $(this).parent().attr("id");
                    if (text == sora) {
                        $(this).html(h);
                        $(this).parent().addClass('videos');
                        $(this).prev("h2").html('<a href="/search/label/' + v + '">' + n + '</a>');
                        $(this).prev("h2").wrap('<div class="box-title"></div>');
                        $(this).prev(".box-title").append('<a class="more-link" href="/search/label/' + v + '">' + more_text + '</a>');
                        $(this).find('.box-image').each(function() {
                            $(this).attr('style', function(i, src) {
                                return src.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function(i, src) {
                                return src.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
    if (box.match('carousel')) {
        $.ajax({
            url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
            type: 'get',
            dataType: "jsonp",
            success: function(e) {
                var u = "";
                var h = '<div class="main-carousel">';
                for (var i = 0; i < e.feed.entry.length; i++) {
                    for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                        if (e.feed.entry[i].link[j].rel == "alternate") {
                            u = e.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var g = e.feed.entry[i].title.$t;
                    var s = e.feed.entry[i].category[0].term;
                    var y = e.feed.entry[i].author[0].name.$t;
                    var d = e.feed.entry[i].published.$t,
                        t = d.substring(0, 4),
                        w = d.substring(5, 7),
                        f = d.substring(8, 10),
                        r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                    var c = e.feed.entry[i].content.$t;
                    var $c = $('<div>').html(c);
                    if (c.indexOf("//www.youtube.com/embed/") > -1) {
                        var p = e.feed.entry[i].media$thumbnail.url;
                        var k = p
                    } else if (c.indexOf("<img") > -1) {
                        var q = $c.find('img:first').attr('src');
                        var k = q
                    } else {
                        var k = no_image
                    }
                    h += '<li class="carousel-item"><a class="box-image" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="carousel-overlay"/></a><div class="carousel-content"><div class="carousel-tag"><a class="icon ' + s + '" href="/search/label/' + s + '">' + s + '</a></div><h3 class="recent-title"><a href="' + u + '">' + g + '</a></h3><span class="recent-author">' + y + '</span><span class="recent-date">' + r + '</span></div><div class="clear"/></li>'
                }
                h += '</div>';
                $(".recent-boxes .HTML .widget-content").each(function() {
                    var text = $(this).parent().attr("id");
                    if (text == sora) {
                        $(this).html(h);
                        $(this).parent().addClass('carousel');
                        $(this).prev("h2").html('<a href="/search/label/' + v + '">' + n + '</a>');
                        $(this).prev("h2").wrap('<div class="box-title"></div>');
                        $(this).prev(".box-title").append('<a class="more-link" href="/search/label/' + v + '">' + more_text + '</a>');
                        $(".main-carousel").owlCarousel({
                            items: 2,
                            smartSpeed: 550,
                            nav: true,
                            navText: ["", ""],
                            loop: true,
                            autoplay: true,
                            autoplaySpeed: 800,
                            dots: false,
                            responsive: {
                                0: {
                                    items: 1,
                                    nav: true
                                },
                                601: {
                                    items: 2,
                                    nav: true
                                }
                            }
                        });
                        $(this).find('.box-image').each(function() {
                            $(this).attr('style', function(i, src) {
                                return src.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function(i, src) {
                                return src.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
});
$("#related-posts").each(function() {
    var v = $(this).text();
    $.ajax({
        url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + related_number,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<div class="related-wrap">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var y = e.feed.entry[i].author[0].name.$t;
                var c = e.feed.entry[i].content.$t;
                var $c = $('<div>').html(c);
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                    var k = q
                } else {
                    var k = no_image
                }
                h += '<li><div class="related-thumb"><a class="related-img" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="related-overlay"/></a></div><div class="related-content"><div class="related-tag"><a class="icon ' + s + '" href="/search/label/' + s + '">' + s + '</a></div><h3 class="related-title"><a href="' + u + '">' + g + '</a></h3></div></li>'
            }
            h += '</div><div class="clear"/>';
            $("#related-posts").html(h);
            $(this).find('.related-img').each(function() {
                $(this).attr('style', function(i, src) {
                    return src.replace('/default.jpg', '/mqdefault.jpg')
                }).attr('style', function(i, src) {
                    return src.replace('s72-c', 's1600')
                })
            })
        }
    })
});
