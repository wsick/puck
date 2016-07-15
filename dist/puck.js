var puck;
(function (puck) {
    puck.version = '0.1.0';
})(puck || (puck = {}));
var puck;
(function (puck) {
    (function (BrushMappingMode) {
        BrushMappingMode[BrushMappingMode["relativeToBounds"] = 0] = "relativeToBounds";
        BrushMappingMode[BrushMappingMode["absolute"] = 1] = "absolute";
    })(puck.BrushMappingMode || (puck.BrushMappingMode = {}));
    var BrushMappingMode = puck.BrushMappingMode;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var NoAlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    var AlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    var Color = (function () {
        function Color(color) {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 1.0;
            if (color instanceof Color) {
                this.r = color.r;
                this.g = color.g;
                this.b = color.b;
                this.a = color.a;
            }
            else if (typeof color === "string") {
                parse(this, color);
            }
        }
        Color.prototype.add = function (color2) {
            var c = new Color();
            c.r = this.r + color2.r;
            c.g = this.g + color2.g;
            c.b = this.b + color2.b;
            c.a = this.a + color2.a;
            return c;
        };
        Color.prototype.subtract = function (color2) {
            var c = new Color();
            c.r = this.r - color2.r;
            c.g = this.g - color2.g;
            c.b = this.b - color2.b;
            c.a = this.a - color2.a;
            return c;
        };
        Color.prototype.multiply = function (factor) {
            var c = new Color();
            c.r = this.r * factor;
            c.g = this.g * factor;
            c.b = this.b * factor;
            c.a = this.a * factor;
            return c;
        };
        Color.prototype.toString = function () {
            var r = Math.round(this.r) || 0;
            var g = Math.round(this.g) || 0;
            var b = Math.round(this.b) || 0;
            var a = this.a || 0;
            return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        };
        Color.prototype.toHexString = function () {
            var ah = (this.a * 255).toString(16), rh = this.r.toString(16), gh = this.g.toString(16), bh = this.b.toString(16);
            return "#" + ah + rh + gh + bh;
        };
        Color.prototype.toHexStringNoAlpha = function () {
            var rh = this.r.toString(16), gh = this.g.toString(16), bh = this.b.toString(16);
            return "#" + rh + gh + bh;
        };
        Color.equals = function (color1, color2) {
            if (!color1) {
                return !color2;
            }
            if (!color2) {
                return false;
            }
            return color1.r === color2.r
                && color1.g === color2.g
                && color1.b === color2.b
                && color1.a === color2.a;
        };
        Color.lerp = function (start, end, p) {
            var c = new Color();
            c.r = start.r + (end.r - start.r) * p;
            c.g = start.g + (end.g - start.g) * p;
            c.b = start.b + (end.b - start.b) * p;
            c.a = start.a + (end.a - start.a) * p;
            return c;
        };
        Color.fromRgba = function (r, g, b, a) {
            var c = new Color();
            c.r = r;
            c.g = g;
            c.b = b;
            c.a = a;
            return c;
        };
        Color.fromHex = function (hex) {
            var c = new Color();
            parseHex(c, hex);
            return c;
        };
        return Color;
    })();
    puck.Color = Color;
    puck.KnownColors = {
        AliceBlue: Color.fromHex("#FFF0F8FF"),
        AntiqueWhite: Color.fromHex("#FFFAEBD7"),
        Aqua: Color.fromHex("#FF00FFFF"),
        Aquamarine: Color.fromHex("#FF7FFFD4"),
        Azure: Color.fromHex("#FFF0FFFF"),
        Beige: Color.fromHex("#FFF5F5DC"),
        Bisque: Color.fromHex("#FFFFE4C4"),
        Black: Color.fromHex("#FF000000"),
        BlanchedAlmond: Color.fromHex("#FFFFEBCD"),
        Blue: Color.fromHex("#FF0000FF"),
        BlueViolet: Color.fromHex("#FF8A2BE2"),
        Brown: Color.fromHex("#FFA52A2A"),
        BurlyWood: Color.fromHex("#FFDEB887"),
        CadetBlue: Color.fromHex("#FF5F9EA0"),
        Chartreuse: Color.fromHex("#FF7FFF00"),
        Chocolate: Color.fromHex("#FFD2691E"),
        Coral: Color.fromHex("#FFFF7F50"),
        CornflowerBlue: Color.fromHex("#FF6495ED"),
        Cornsilk: Color.fromHex("#FFFFF8DC"),
        Crimson: Color.fromHex("#FFDC143C"),
        Cyan: Color.fromHex("#FF00FFFF"),
        DarkBlue: Color.fromHex("#FF00008B"),
        DarkCyan: Color.fromHex("#FF008B8B"),
        DarkGoldenrod: Color.fromHex("#FFB8860B"),
        DarkGray: Color.fromHex("#FFA9A9A9"),
        DarkGreen: Color.fromHex("#FF006400"),
        DarkKhaki: Color.fromHex("#FFBDB76B"),
        DarkMagenta: Color.fromHex("#FF8B008B"),
        DarkOliveGreen: Color.fromHex("#FF556B2F"),
        DarkOrange: Color.fromHex("#FFFF8C00"),
        DarkOrchid: Color.fromHex("#FF9932CC"),
        DarkRed: Color.fromHex("#FF8B0000"),
        DarkSalmon: Color.fromHex("#FFE9967A"),
        DarkSeaGreen: Color.fromHex("#FF8FBC8F"),
        DarkSlateBlue: Color.fromHex("#FF483D8B"),
        DarkSlateGray: Color.fromHex("#FF2F4F4F"),
        DarkTurquoise: Color.fromHex("#FF00CED1"),
        DarkViolet: Color.fromHex("#FF9400D3"),
        DeepPink: Color.fromHex("#FFFF1493"),
        DeepSkyBlue: Color.fromHex("#FF00BFFF"),
        DimGray: Color.fromHex("#FF696969"),
        DodgerBlue: Color.fromHex("#FF1E90FF"),
        Firebrick: Color.fromHex("#FFB22222"),
        FloralWhite: Color.fromHex("#FFFFFAF0"),
        ForestGreen: Color.fromHex("#FF228B22"),
        Fuchsia: Color.fromHex("#FFFF00FF"),
        Gainsboro: Color.fromHex("#FFDCDCDC"),
        GhostWhite: Color.fromHex("#FFF8F8FF"),
        Gold: Color.fromHex("#FFFFD700"),
        Goldenrod: Color.fromHex("#FFDAA520"),
        Gray: Color.fromHex("#FF808080"),
        Green: Color.fromHex("#FF008000"),
        GreenYellow: Color.fromHex("#FFADFF2F"),
        Honeydew: Color.fromHex("#FFF0FFF0"),
        HotPink: Color.fromHex("#FFFF69B4"),
        IndianRed: Color.fromHex("#FFCD5C5C"),
        Indigo: Color.fromHex("#FF4B0082"),
        Ivory: Color.fromHex("#FFFFFFF0"),
        Khaki: Color.fromHex("#FFF0E68C"),
        Lavender: Color.fromHex("#FFE6E6FA"),
        LavenderBlush: Color.fromHex("#FFFFF0F5"),
        LawnGreen: Color.fromHex("#FF7CFC00"),
        LemonChiffon: Color.fromHex("#FFFFFACD"),
        LightBlue: Color.fromHex("#FFADD8E6"),
        LightCoral: Color.fromHex("#FFF08080"),
        LightCyan: Color.fromHex("#FFE0FFFF"),
        LightGoldenrodYellow: Color.fromHex("#FFFAFAD2"),
        LightGray: Color.fromHex("#FFD3D3D3"),
        LightGreen: Color.fromHex("#FF90EE90"),
        LightPink: Color.fromHex("#FFFFB6C1"),
        LightSalmon: Color.fromHex("#FFFFA07A"),
        LightSeaGreen: Color.fromHex("#FF20B2AA"),
        LightSkyBlue: Color.fromHex("#FF87CEFA"),
        LightSlateGray: Color.fromHex("#FF778899"),
        LightSteelBlue: Color.fromHex("#FFB0C4DE"),
        LightYellow: Color.fromHex("#FFFFFFE0"),
        Lime: Color.fromHex("#FF00FF00"),
        LimeGreen: Color.fromHex("#FF32CD32"),
        Linen: Color.fromHex("#FFFAF0E6"),
        Magenta: Color.fromHex("#FFFF00FF"),
        Maroon: Color.fromHex("#FF800000"),
        MediumAquamarine: Color.fromHex("#FF66CDAA"),
        MediumBlue: Color.fromHex("#FF0000CD"),
        MediumOrchid: Color.fromHex("#FFBA55D3"),
        MediumPurple: Color.fromHex("#FF9370DB"),
        MediumSeaGreen: Color.fromHex("#FF3CB371"),
        MediumSlateBlue: Color.fromHex("#FF7B68EE"),
        MediumSpringGreen: Color.fromHex("#FF00FA9A"),
        MediumTurquoise: Color.fromHex("#FF48D1CC"),
        MediumVioletRed: Color.fromHex("#FFC71585"),
        MidnightBlue: Color.fromHex("#FF191970"),
        MintCream: Color.fromHex("#FFF5FFFA"),
        MistyRose: Color.fromHex("#FFFFE4E1"),
        Moccasin: Color.fromHex("#FFFFE4B5"),
        NavajoWhite: Color.fromHex("#FFFFDEAD"),
        Navy: Color.fromHex("#FF000080"),
        OldLace: Color.fromHex("#FFFDF5E6"),
        Olive: Color.fromHex("#FF808000"),
        OliveDrab: Color.fromHex("#FF6B8E23"),
        Orange: Color.fromHex("#FFFFA500"),
        OrangeRed: Color.fromHex("#FFFF4500"),
        Orchid: Color.fromHex("#FFDA70D6"),
        PaleGoldenrod: Color.fromHex("#FFEEE8AA"),
        PaleGreen: Color.fromHex("#FF98FB98"),
        PaleTurquoise: Color.fromHex("#FFAFEEEE"),
        PaleVioletRed: Color.fromHex("#FFDB7093"),
        PapayaWhip: Color.fromHex("#FFFFEFD5"),
        PeachPuff: Color.fromHex("#FFFFDAB9"),
        Peru: Color.fromHex("#FFCD853F"),
        Pink: Color.fromHex("#FFFFC0CB"),
        Plum: Color.fromHex("#FFDDA0DD"),
        PowderBlue: Color.fromHex("#FFB0E0E6"),
        Purple: Color.fromHex("#FF800080"),
        Red: Color.fromHex("#FFFF0000"),
        RosyBrown: Color.fromHex("#FFBC8F8F"),
        RoyalBlue: Color.fromHex("#FF4169E1"),
        SaddleBrown: Color.fromHex("#FF8B4513"),
        Salmon: Color.fromHex("#FFFA8072"),
        SandyBrown: Color.fromHex("#FFF4A460"),
        SeaGreen: Color.fromHex("#FF2E8B57"),
        SeaShell: Color.fromHex("#FFFFF5EE"),
        Sienna: Color.fromHex("#FFA0522D"),
        Silver: Color.fromHex("#FFC0C0C0"),
        SkyBlue: Color.fromHex("#FF87CEEB"),
        SlateBlue: Color.fromHex("#FF6A5ACD"),
        SlateGray: Color.fromHex("#FF708090"),
        Snow: Color.fromHex("#FFFFFAFA"),
        SpringGreen: Color.fromHex("#FF00FF7F"),
        SteelBlue: Color.fromHex("#FF4682B4"),
        Tan: Color.fromHex("#FFD2B48C"),
        Teal: Color.fromHex("#FF008080"),
        Thistle: Color.fromHex("#FFD8BFD8"),
        Tomato: Color.fromHex("#FFFF6347"),
        Transparent: Color.fromHex("#00FFFFFF"),
        Turquoise: Color.fromHex("#FF40E0D0"),
        Violet: Color.fromHex("#FFEE82EE"),
        Wheat: Color.fromHex("#FFF5DEB3"),
        White: Color.fromHex("#FFFFFFFF"),
        WhiteSmoke: Color.fromHex("#FFF5F5F5"),
        Yellow: Color.fromHex("#FFFFFF00"),
        YellowGreen: Color.fromHex("#FF9ACD32")
    };
    function parse(c, s) {
        if (s[0] === "#") {
            parseHex(c, s);
        }
        else {
            var known = puck.KnownColors[s];
            c.r = known.r;
            c.g = known.g;
            c.b = known.b;
            c.a = known.a;
        }
    }
    function parseHex(c, hex) {
        var match;
        if ((match = AlphaRegex.exec(hex)) != null) {
            c.a = parseInt(match[1], 16) / 255.0;
            c.r = parseInt(match[2], 16);
            c.g = parseInt(match[3], 16);
            c.b = parseInt(match[4], 16);
        }
        else if ((match = NoAlphaRegex.exec(hex)) != null) {
            c.a = 1.0;
            c.r = parseInt(match[1], 16);
            c.g = parseInt(match[2], 16);
            c.b = parseInt(match[3], 16);
        }
    }
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        (function (DirtyFlags) {
            DirtyFlags[DirtyFlags["none"] = 0] = "none";
            DirtyFlags[DirtyFlags["opacity"] = 1] = "opacity";
            DirtyFlags[DirtyFlags["visible"] = 2] = "visible";
            DirtyFlags[DirtyFlags["stretch"] = 4] = "stretch";
            DirtyFlags[DirtyFlags["transform"] = 8] = "transform";
            DirtyFlags[DirtyFlags["padding"] = 16] = "padding";
            DirtyFlags[DirtyFlags["extents"] = 32] = "extents";
            DirtyFlags[DirtyFlags["newbounds"] = 64] = "newbounds";
            DirtyFlags[DirtyFlags["invalidate"] = 128] = "invalidate";
            DirtyFlags[DirtyFlags["down"] = 15] = "down";
            DirtyFlags[DirtyFlags["up"] = 112] = "up";
        })(element.DirtyFlags || (element.DirtyFlags = {}));
        var DirtyFlags = element.DirtyFlags;
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Element = (function () {
        function Element(state, composite) {
            this.init(state, composite);
            Object.freeze(this);
        }
        Element.prototype.init = function (state, composite) {
            this.state = (state || new puck.element.ElementState()).reset();
            this.composite = (composite || new puck.element.ElementComposite()).reset();
            this.processor = {
                down: puck.element.down.Processor.instance,
                up: puck.element.up.Processor.instance,
                render: puck.element.render.Processor.instance,
            };
            this.stencil = puck.stencil.empty;
        };
        Object.defineProperty(Element.prototype, "opacity", {
            get: function () { return this.state.opacity; },
            set: function (value) {
                if (this.state.opacity !== value) {
                    this.state.opacity = value;
                    this.composite.taint(DirtyFlags.opacity);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "visible", {
            get: function () { return this.state.visible; },
            set: function (value) {
                if (this.state.visible !== value) {
                    this.state.visible = value;
                    this.composite.taint(DirtyFlags.visible);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "transformOriginX", {
            get: function () { return this.state.transformOrigin.x; },
            set: function (value) {
                if (this.state.transformOrigin.x !== value) {
                    this.state.transformOrigin.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "transformOriginY", {
            get: function () { return this.state.transformOrigin.y; },
            set: function (value) {
                if (this.state.transformOrigin.y !== value) {
                    this.state.transformOrigin.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Element.prototype.resetTransform = function () {
            la.mat3.identity(this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        Element.prototype.setTransform = function (mat) {
            la.mat3.copyTo(mat, this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        Element.prototype.applyTransform = function (mat) {
            la.mat3.apply(this.state.transform, mat);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        return Element;
    })();
    puck.Element = Element;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Container = (function () {
        function Container(state, composite) {
            this.init(state, composite);
            Object.freeze(this);
        }
        Container.prototype.init = function (state, composite) {
            this.elements = [];
            this.state = (state || new puck.container.ContainerState()).reset();
            this.composite = (composite || new puck.container.ContainerComposite()).reset();
            this.processor = {
                down: puck.container.down.Processor.instance,
                up: puck.container.up.Processor.instance,
                render: puck.container.render.Processor.instance,
            };
        };
        Container.prototype.walk = function (reverse) {
            var els = this.elements;
            var i = -1;
            if (!reverse) {
                return {
                    next: function () {
                        i++;
                        return els[i];
                    }
                };
            }
            i = els.length;
            return {
                next: function () {
                    i--;
                    return els[i];
                }
            };
        };
        Object.defineProperty(Container.prototype, "opacity", {
            get: function () { return this.state.opacity; },
            set: function (value) {
                if (this.state.opacity !== value) {
                    this.state.opacity = value;
                    this.composite.taint(DirtyFlags.opacity);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "visible", {
            get: function () { return this.state.visible; },
            set: function (value) {
                if (this.state.visible !== value) {
                    this.state.visible = value;
                    this.composite.taint(DirtyFlags.visible);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "x", {
            get: function () { return this.state.offset.x; },
            set: function (value) {
                if (this.state.offset.x !== value) {
                    this.state.offset.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "y", {
            get: function () { return this.state.offset.y; },
            set: function (value) {
                if (this.state.offset.y !== value) {
                    this.state.offset.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "transformOriginX", {
            get: function () { return this.state.transformOrigin.x; },
            set: function (value) {
                if (this.state.transformOrigin.x !== value) {
                    this.state.transformOrigin.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "transformOriginY", {
            get: function () { return this.state.transformOrigin.y; },
            set: function (value) {
                if (this.state.transformOrigin.y !== value) {
                    this.state.transformOrigin.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.resetTransform = function () {
            la.mat3.identity(this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        Container.prototype.setTransform = function (mat) {
            la.mat3.copyTo(mat, this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        Container.prototype.applyTransform = function (mat) {
            la.mat3.apply(this.state.transform, mat);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        return Container;
    })();
    puck.Container = Container;
})(puck || (puck = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Visual = (function (_super) {
        __extends(Visual, _super);
        function Visual(state, composite) {
            _super.call(this, state, composite);
            this.$fillwatch = null;
            this.$strokewatch = null;
        }
        Visual.prototype.init = function (state, composite) {
            this.state = (state || new puck.visual.VisualState()).reset();
            this.composite = (composite || new puck.visual.VisualComposite()).reset();
            this.processor = {
                down: puck.element.down.Processor.instance,
                up: puck.element.up.Processor.instance,
                render: puck.visual.render.Processor.instance,
            };
            this.stencil = puck.stencil.visual;
        };
        Object.defineProperty(Visual.prototype, "fill", {
            get: function () { return this.state.fill; },
            set: function (value) {
                var _this = this;
                if (this.$fillwatch) {
                    this.$fillwatch.unwatch();
                    this.$fillwatch = null;
                }
                if ((!value) === (!this.state.fill)) {
                    this.composite.taint(DirtyFlags.extents).invalidate();
                }
                if (value !== this.state.fill) {
                    this.state.fill = value;
                    this.composite.invalidate();
                }
                if (value) {
                    this.$fillwatch = value.watch(function () { return _this.composite.invalidate(); });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Visual.prototype, "stroke", {
            get: function () { return this.state.stroke; },
            set: function (value) {
                var _this = this;
                if (this.$strokewatch) {
                    this.$strokewatch.unwatch();
                    this.$strokewatch = null;
                }
                if ((!value) === (!this.state.stroke)) {
                    this.composite.taint(DirtyFlags.padding).invalidate();
                }
                if (value !== this.state.stroke) {
                    this.state.stroke = value;
                    this.composite.invalidate();
                }
                if (value) {
                    this.$strokewatch = value.watch(function () { return _this.composite.invalidate(); });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Visual.prototype, "strokeThickness", {
            get: function () { return this.state.strokeThickness; },
            set: function (value) {
                if (value !== this.state.strokeThickness) {
                    this.state.strokeThickness = value;
                    this.composite.taint(DirtyFlags.padding);
                }
            },
            enumerable: true,
            configurable: true
        });
        return Visual;
    })(puck.Element);
    puck.Visual = Visual;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var stencil;
    (function (stencil) {
        stencil.visual = {
            draft: function (bag) {
                var state = bag.state, size = state.size;
                la.rect.init(0, 0, size.width, size.height, bag.fillRect);
                la.rect.init(0, 0, size.width, size.height, bag.strokeRect);
                if (state.stroke && state.strokeThickness > 0) {
                    var ht = state.strokeThickness / 2;
                    la.rect.shrink(bag.fillRect, la.padding.init(ht, ht, ht, ht));
                }
            },
            draw: function (ctx, bag) {
                ctx.raw.beginPath();
                ctx.raw.closePath();
            },
        };
    })(stencil = puck.stencil || (puck.stencil = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var PI2 = Math.PI * 2;
    var Ellipse = (function (_super) {
        __extends(Ellipse, _super);
        function Ellipse() {
            _super.apply(this, arguments);
        }
        Ellipse.prototype.init = function (state, composite) {
            _super.prototype.init.call(this, state, composite);
            this.stencil = ellipseStencil;
        };
        Object.defineProperty(Ellipse.prototype, "x", {
            get: function () { return this.state.offset.x; },
            set: function (value) {
                if (this.state.offset.x !== value) {
                    this.state.offset.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "y", {
            get: function () { return this.state.offset.y; },
            set: function (value) {
                if (this.state.offset.y !== value) {
                    this.state.offset.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "width", {
            get: function () { return this.state.size.width; },
            set: function (value) {
                if (this.state.size.width !== value) {
                    this.state.size.width = value;
                    this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "height", {
            get: function () { return this.state.size.height; },
            set: function (value) {
                if (this.state.size.height !== value) {
                    this.state.size.height = value;
                    this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
                }
            },
            enumerable: true,
            configurable: true
        });
        return Ellipse;
    })(puck.Visual);
    puck.Ellipse = Ellipse;
    var ellipseStencil = {
        draft: puck.stencil.visual.draft,
        draw: function (ctx, bag) {
            var fr = bag.fillRect;
            if (fr.width <= 0 || fr.height <= 0) {
                return;
            }
            var rx = fr.width / 2, ry = fr.height / 2;
            var raw = ctx.raw;
            raw.beginPath();
            raw.ellipse(fr.x + rx, fr.y + ry, rx, ry, 0, 0, PI2, false);
            raw.closePath();
        }
    };
})(puck || (puck = {}));
var puck;
(function (puck) {
    (function (FillRule) {
        FillRule[FillRule["EvenOdd"] = 0] = "EvenOdd";
        FillRule[FillRule["NonZero"] = 1] = "NonZero";
    })(puck.FillRule || (puck.FillRule = {}));
    var FillRule = puck.FillRule;
    (function (PenLineJoin) {
        PenLineJoin[PenLineJoin["Miter"] = 0] = "Miter";
        PenLineJoin[PenLineJoin["Bevel"] = 1] = "Bevel";
        PenLineJoin[PenLineJoin["Round"] = 2] = "Round";
    })(puck.PenLineJoin || (puck.PenLineJoin = {}));
    var PenLineJoin = puck.PenLineJoin;
    (function (PenLineCap) {
        PenLineCap[PenLineCap["Flat"] = 0] = "Flat";
        PenLineCap[PenLineCap["Square"] = 1] = "Square";
        PenLineCap[PenLineCap["Round"] = 2] = "Round";
        PenLineCap[PenLineCap["Triangle"] = 3] = "Triangle";
    })(puck.PenLineCap || (puck.PenLineCap = {}));
    var PenLineCap = puck.PenLineCap;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var FrameDebug = (function () {
        function FrameDebug() {
            this.$onBeginProcess = null;
            this.$onEndProcess = null;
            this.$onBeginRender = null;
            this.$onEndRender = null;
        }
        FrameDebug.prototype.onBeginProcess = function (cb) {
            this.$onBeginProcess = cb;
            return this;
        };
        FrameDebug.prototype.onEndProcess = function (cb) {
            this.$onEndProcess = cb;
            return this;
        };
        FrameDebug.prototype.onBeginRender = function (cb) {
            this.$onBeginRender = cb;
            return this;
        };
        FrameDebug.prototype.onEndRender = function (cb) {
            this.$onEndRender = cb;
            return this;
        };
        FrameDebug.prototype.beginProcess = function () {
            this.$onBeginProcess && this.$onBeginProcess();
        };
        FrameDebug.prototype.endProcess = function () {
            this.$onEndProcess && this.$onEndProcess();
        };
        FrameDebug.prototype.beginRender = function () {
            this.$onBeginRender && this.$onBeginRender();
        };
        FrameDebug.prototype.endRender = function () {
            this.$onEndRender && this.$onEndRender();
        };
        return FrameDebug;
    })();
    puck.FrameDebug = FrameDebug;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var GradientBrush = (function () {
        function GradientBrush() {
            var _this = this;
            this.$cachedBrush = null;
            this.$cachedBounds = la.rect.init(0, 0, 0, 0);
            this.$changer = new puck.internal.WatchChanger();
            this.$stops = new puck.GradientStops();
            this.$spreadMethod = puck.GradientSpreadMethod.pad;
            this.$mappingMode = puck.BrushMappingMode.relativeToBounds;
            this.$stops.watch(function () { return _this.$changer.on(); });
        }
        Object.defineProperty(GradientBrush.prototype, "spreadMethod", {
            get: function () {
                return this.$spreadMethod;
            },
            set: function (value) {
                if (this.$spreadMethod !== value) {
                    this.$spreadMethod = value;
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GradientBrush.prototype, "mappingMode", {
            get: function () {
                return this.$mappingMode;
            },
            set: function (value) {
                if (this.$mappingMode !== value) {
                    this.$mappingMode = value;
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GradientBrush.prototype, "stops", {
            get: function () {
                return this.$stops;
            },
            enumerable: true,
            configurable: true
        });
        GradientBrush.prototype.watch = function (onChanged) {
            return this.$changer.watch(onChanged);
        };
        GradientBrush.prototype.setup = function (ctx, region) {
            if (this.$cachedBrush && la.rect.equal(this.$cachedBounds, region))
                return;
            la.rect.copyTo(region, this.$cachedBounds);
            this.createBrush(ctx, region);
        };
        GradientBrush.prototype.toHtml5Object = function () {
            return this.$cachedBrush;
        };
        GradientBrush.prototype.createBrush = function (ctx, region) {
            switch (this.spreadMethod) {
                case puck.GradientSpreadMethod.pad:
                    return this.createPad(ctx, region);
                default:
                case puck.GradientSpreadMethod.reflect:
                    return this.createReflect(ctx, region);
                case puck.GradientSpreadMethod.repeat:
                    return this.createRepeat(ctx, region);
            }
        };
        GradientBrush.prototype.mapPoint = function (region, point) {
            var mapped = { x: point.x, y: point.y };
            if (this.mappingMode === puck.BrushMappingMode.relativeToBounds) {
                mapped.x *= region.width;
                mapped.y *= region.height;
            }
            mapped.x += region.x;
            mapped.y += region.y;
            return mapped;
        };
        return GradientBrush;
    })();
    puck.GradientBrush = GradientBrush;
})(puck || (puck = {}));
var puck;
(function (puck) {
    (function (GradientSpreadMethod) {
        GradientSpreadMethod[GradientSpreadMethod["pad"] = 0] = "pad";
        GradientSpreadMethod[GradientSpreadMethod["reflect"] = 1] = "reflect";
        GradientSpreadMethod[GradientSpreadMethod["repeat"] = 2] = "repeat";
    })(puck.GradientSpreadMethod || (puck.GradientSpreadMethod = {}));
    var GradientSpreadMethod = puck.GradientSpreadMethod;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var GradientStop = (function () {
        function GradientStop(color, offset) {
            this.color = color;
            this.offset = offset;
            Object.freeze(this);
        }
        return GradientStop;
    })();
    puck.GradientStop = GradientStop;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var PuckArray = (function () {
        function PuckArray() {
            this.$backing = [];
            this.$changer = new puck.internal.WatchChanger();
        }
        Object.defineProperty(PuckArray.prototype, "length", {
            get: function () {
                return this.$backing.length;
            },
            enumerable: true,
            configurable: true
        });
        PuckArray.prototype.add = function (stop) {
            this.$backing.push(stop);
            Object.freeze(stop);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.addMany = function (stops) {
            var backing = this.$backing;
            for (var i = 0; i < stops.length; i++) {
                Object.freeze(stops[i]);
            }
            backing.push.apply(backing, stops);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.insert = function (index, stop) {
            this.$backing.splice(index, 0, stop);
            Object.freeze(stop);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.insertMany = function (index, stops) {
            for (var i = 0; i < stops.length; i++) {
                Object.freeze(stops[i]);
            }
            var backing = this.$backing;
            for (var i = stops.length - 1; i >= 0; i--) {
                backing.splice(index, 0, stops[i]);
            }
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.edit = function (oldStop, newStop) {
            return this.editAt(this.$backing.indexOf(oldStop), newStop);
        };
        PuckArray.prototype.editAt = function (index, newStop) {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing[index] = newStop;
            Object.freeze(newStop);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.remove = function (stop) {
            return this.removeAt(this.$backing.indexOf(stop));
        };
        PuckArray.prototype.removeAt = function (index) {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing.splice(index, 1);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.watch = function (onChanged) {
            return this.$changer.watch(onChanged);
        };
        PuckArray.prototype.iter = function () {
            return PuckArray.arrayIter(this.$backing);
        };
        PuckArray.arrayIter = function (arr) {
            var i = -1;
            return {
                next: function () {
                    i++;
                    if (i >= arr.length)
                        return { done: true };
                    return { done: false, value: arr[i] };
                }
            };
        };
        return PuckArray;
    })();
    puck.PuckArray = PuckArray;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var GradientStops = (function (_super) {
        __extends(GradientStops, _super);
        function GradientStops() {
            _super.apply(this, arguments);
        }
        GradientStops.prototype.paddedIter = function () {
            var min = null;
            var max = null;
            var tmp = this.$backing.slice(0);
            for (var i = 0; i < tmp.length; i++) {
                var cur = tmp[i];
                tmp.push(cur);
                if (!min || cur.offset < min.offset)
                    min = cur;
                if (!max || cur.offset > max.offset)
                    max = cur;
            }
            if (!!min)
                tmp.unshift({ offset: 0, color: min.color });
            if (!!max)
                tmp.push({ offset: 1, color: max.color });
            return puck.PuckArray.arrayIter(tmp);
        };
        return GradientStops;
    })(puck.PuckArray);
    puck.GradientStops = GradientStops;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image() {
            _super.apply(this, arguments);
        }
        Image.prototype.init = function (state, composite) {
            var _this = this;
            this.state = (state || new puck.image.ImageState()).reset();
            this.composite = (composite || new puck.image.ImageComposite()).reset();
            this.processor = {
                down: puck.image.down.Processor.instance,
                up: puck.image.up.Processor.instance,
                render: puck.element.render.Processor.instance,
            };
            this.stencil = imageStencil;
            this.state.source.watch(function () { return _this.onSourceChanged(); }, function (e) { return _this.onSourceErrored(e); }, function () { return _this.onSourceLoaded(); });
        };
        Object.defineProperty(Image.prototype, "sourceUri", {
            get: function () { return this.state.source.uri; },
            set: function (value) { this.state.source.uri = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "stretch", {
            get: function () { return this.state.stretch; },
            set: function (value) {
                if (this.state.stretch !== value) {
                    this.state.stretch = value;
                    this.composite.taint(DirtyFlags.stretch);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "x", {
            get: function () { return this.state.offset.x; },
            set: function (value) {
                if (this.state.offset.x !== value) {
                    this.state.offset.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "y", {
            get: function () { return this.state.offset.y; },
            set: function (value) {
                if (this.state.offset.y !== value) {
                    this.state.offset.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "width", {
            get: function () { return this.state.size.width; },
            set: function (value) {
                if (this.state.size.width !== value) {
                    this.state.size.width = value;
                    this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "height", {
            get: function () { return this.state.size.height; },
            set: function (value) {
                if (this.state.size.height !== value) {
                    this.state.size.height = value;
                    this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Image.prototype.onSourceChanged = function () {
            this.setNaturalSize(0, 0);
        };
        Image.prototype.onSourceErrored = function (err) {
            console.error("error loading image", err);
        };
        Image.prototype.onSourceLoaded = function () {
            var source = this.state.source;
            this.setNaturalSize(source.naturalWidth, source.naturalHeight);
        };
        Image.prototype.setNaturalSize = function (width, height) {
            var naturalSize = this.state.naturalSize;
            naturalSize.width = width;
            naturalSize.height = height;
            this.composite.taint(DirtyFlags.stretch | DirtyFlags.extents).invalidate();
        };
        return Image;
    })(puck.Element);
    puck.Image = Image;
    var imageStencil = {
        draft: function (bag) { },
        draw: function (ctx, bag) {
            var state = bag.state, comp = bag.composite;
            ctx.preapply(comp.stretchTransform);
            state.source.draw(ctx.raw);
        },
    };
})(puck || (puck = {}));
var puck;
(function (puck) {
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer(ctx) {
            this.$ctx = new puck.render.RenderContext(ctx);
            _super.call(this);
        }
        Object.defineProperty(Layer.prototype, "width", {
            get: function () { return this.$ctx.raw.canvas.width; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "height", {
            get: function () { return this.$ctx.raw.canvas.height; },
            enumerable: true,
            configurable: true
        });
        Layer.prototype.init = function (state, composite) {
            var _this = this;
            _super.prototype.init.call(this, state, composite);
            this.frameDebug = new puck.FrameDebug();
            this.$timer = new puck.Timer(function (now) { return _this.onTick(now); });
            this.$collector = new puck.Element();
        };
        Layer.prototype.activate = function () {
            this.$timer.enable();
            return this;
        };
        Layer.prototype.deactivate = function () {
            this.$timer.disable();
            return this;
        };
        Layer.prototype.onTick = function (now) {
            var debug = this.frameDebug;
            debug.beginProcess();
            puck.engine.process(this);
            debug.endProcess();
            var ctx = this.$ctx, paint = this.composite.paint, raw = ctx.raw;
            debug.beginRender();
            raw.fillStyle = "#ffffff";
            raw.fillRect(paint.x, paint.y, paint.width, paint.height);
            puck.engine.render(this, ctx, paint);
            debug.endRender();
        };
        return Layer;
    })(puck.Container);
    puck.Layer = Layer;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var LinearGradientBrush = (function (_super) {
        __extends(LinearGradientBrush, _super);
        function LinearGradientBrush() {
            _super.apply(this, arguments);
            this.$start = { x: 0, y: 0 };
            this.$end = { x: 0, y: 0 };
        }
        Object.defineProperty(LinearGradientBrush.prototype, "start", {
            get: function () {
                return this.$start;
            },
            set: function (value) {
                if (this.$start !== value) {
                    this.$start = value;
                    Object.freeze(value);
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearGradientBrush.prototype, "end", {
            get: function () {
                return this.$end;
            },
            set: function (value) {
                if (this.$end !== value) {
                    this.$end = value;
                    Object.freeze(value);
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        LinearGradientBrush.prototype.createPad = function (ctx, region) {
            var mstart = this.mapPoint(region, this.start);
            var mend = this.mapPoint(region, this.end);
            var grd = ctx.createLinearGradient(mstart.x, mstart.y, mend.x, mend.y);
            for (var it = this.stops.iter(), result = it.next(); !result.done; result = it.next()) {
                addColorStop(grd, result.value);
            }
            return undefined;
        };
        LinearGradientBrush.prototype.createReflect = function (ctx, region) {
            var mstart = this.mapPoint(region, this.start);
            var mend = this.mapPoint(region, this.end);
            return this.createInterpolated(ctx, puck.linearGradient.createRepeatInterpolator(mstart, mend, region));
        };
        LinearGradientBrush.prototype.createRepeat = function (ctx, region) {
            var mstart = this.mapPoint(region, this.start);
            var mend = this.mapPoint(region, this.end);
            return this.createInterpolated(ctx, puck.linearGradient.createReflectInterpolator(mstart, mend, region));
        };
        LinearGradientBrush.prototype.createInterpolated = function (ctx, interpolator) {
            var grd = ctx.createLinearGradient(interpolator.x0, interpolator.y0, interpolator.x1, interpolator.y1);
            var allStops = this.stops.paddedIter();
            for (; interpolator.step();) {
                for (var result = allStops.next(); !result.done; result = allStops.next()) {
                    var cur = result.value;
                    var inter = {
                        color: cur.color,
                        offset: interpolator.interpolate(cur.offset)
                    };
                    if (inter.offset >= 0 && inter.offset <= 1)
                        addColorStop(grd, inter);
                }
            }
            return grd;
        };
        return LinearGradientBrush;
    })(puck.GradientBrush);
    puck.LinearGradientBrush = LinearGradientBrush;
    function addColorStop(grd, stop) {
        var offset = Math.min(1.0, Math.max(0.0, stop.offset));
        var color = stop.color.toString();
        grd.addColorStop(offset, color);
    }
})(puck || (puck = {}));
var puck;
(function (puck) {
    var tmpCanvas = document.createElement('canvas');
    var tmpCtx = tmpCanvas.getContext('2d');
    var epsilon = 1E-10;
    var RadialGradientBrush = (function (_super) {
        __extends(RadialGradientBrush, _super);
        function RadialGradientBrush() {
            _super.apply(this, arguments);
            this.$center = { x: 0.5, y: 0.5 };
            this.$origin = { x: 0.5, y: 0.5 };
            this.$radius = { x: 0.5, y: 0.5 };
        }
        Object.defineProperty(RadialGradientBrush.prototype, "center", {
            get: function () {
                return this.$center;
            },
            set: function (value) {
                if (this.$center !== value) {
                    this.$center = value;
                    Object.freeze(value);
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadialGradientBrush.prototype, "origin", {
            get: function () {
                return this.$origin;
            },
            set: function (value) {
                if (this.$origin !== value) {
                    this.$origin = value;
                    Object.freeze(value);
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadialGradientBrush.prototype, "radiusX", {
            get: function () {
                return this.$radius.x;
            },
            set: function (value) {
                if (this.$radius.x !== value) {
                    this.$radius.x = value;
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadialGradientBrush.prototype, "radiusY", {
            get: function () {
                return this.$radius.y;
            },
            set: function (value) {
                if (this.$radius.y !== value) {
                    this.$radius.y = value;
                    this.$changer.on();
                }
            },
            enumerable: true,
            configurable: true
        });
        RadialGradientBrush.prototype.createPad = function (ctx, region) {
            var data = this.getPointData(region);
            var grd = (!data.balanced ? tmpCtx : ctx).createRadialGradient(data.x0, data.y0, 0, data.x1, data.y1, data.r1);
            for (var it = this.stops.iter(), result = it.next(); !result.done; result = it.next()) {
                addColorStop(grd, result.value);
            }
            return this.fit(ctx, grd, data, region);
        };
        RadialGradientBrush.prototype.createReflect = function (ctx, region) {
            var data = this.getPointData(region);
            return this.createInterpolated(data, region, false);
        };
        RadialGradientBrush.prototype.createRepeat = function (ctx, region) {
            var data = this.getPointData(region);
            return this.createInterpolated(data, region, true);
        };
        RadialGradientBrush.prototype.createInterpolated = function (data, bounds, reflect) {
            tmpCanvas.width = bounds.width;
            tmpCanvas.height = bounds.height;
            tmpCtx.save();
            if (!data.balanced)
                tmpCtx.scale(data.sx, data.sy);
            tmpCtx.globalCompositeOperation = "destination-over";
            var inverted = false;
            var allStops = this.stops.paddedIter();
            for (var extender = puck.radialGradient.createExtender(data, bounds); extender.step(); inverted = !inverted) {
                var grd = extender.createGradient(tmpCtx);
                for (var result = allStops.next(); !result.done; result = allStops.next()) {
                    var cur = result.value;
                    var inter = {
                        color: cur.color,
                        offset: (reflect && inverted) ? 1 - cur.offset : cur.offset,
                    };
                    addColorStop(grd, inter);
                }
                tmpCtx.fillStyle = grd;
                tmpCtx.beginPath();
                tmpCtx.arc(extender.x1, extender.y1, extender.r1, 0, 2 * Math.PI, false);
                tmpCtx.closePath();
                tmpCtx.fill();
            }
            var pattern = tmpCtx.createPattern(tmpCanvas, "no-repeat");
            tmpCtx.restore();
            return pattern;
        };
        RadialGradientBrush.prototype.getPointData = function (bounds) {
            var mcenter = this.mapPoint(bounds, this.center);
            var morigin = this.mapPoint(bounds, this.origin);
            var mradius = this.mapPoint(bounds, this.$radius);
            var rad = Math.max(mradius.x, mradius.y);
            var side = Math.max(bounds.width, bounds.height), sx = bounds.width / side, sy = bounds.height / side;
            return {
                x0: morigin.x / sx,
                y0: morigin.y / sy,
                x1: mcenter.x / sx,
                y1: mcenter.y / sy,
                r1: rad,
                side: side,
                sx: bounds.width / side,
                sy: bounds.height / side,
                balanced: Math.abs(mradius.x - mradius.y) < epsilon
            };
        };
        RadialGradientBrush.prototype.fit = function (ctx, fill, data, bounds) {
            if (data.balanced)
                return fill;
            tmpCanvas.width = bounds.width;
            tmpCanvas.height = bounds.height;
            tmpCtx.save();
            tmpCtx.scale(data.sx, data.sy);
            tmpCtx.fillStyle = fill;
            tmpCtx.fillRect(0, 0, data.side, data.side);
            var pattern = ctx.createPattern(tmpCanvas, "no-repeat");
            tmpCtx.restore();
            return pattern;
        };
        return RadialGradientBrush;
    })(puck.GradientBrush);
    puck.RadialGradientBrush = RadialGradientBrush;
    function addColorStop(grd, stop) {
        var offset = Math.min(1.0, Math.max(0.0, stop.offset));
        var color = stop.color.toString();
        grd.addColorStop(offset, color);
    }
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle() {
            _super.apply(this, arguments);
        }
        Rectangle.prototype.init = function (state, composite) {
            _super.prototype.init.call(this, state, composite);
            this.stencil = rectangleStencil;
        };
        Object.defineProperty(Rectangle.prototype, "x", {
            get: function () { return this.state.offset.x; },
            set: function (value) {
                if (this.state.offset.x !== value) {
                    this.state.offset.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "y", {
            get: function () { return this.state.offset.y; },
            set: function (value) {
                if (this.state.offset.y !== value) {
                    this.state.offset.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "width", {
            get: function () { return this.state.size.width; },
            set: function (value) {
                if (this.state.size.width !== value) {
                    this.state.size.width = value;
                    this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "height", {
            get: function () { return this.state.size.height; },
            set: function (value) {
                if (this.state.size.height !== value) {
                    this.state.size.height = value;
                    this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
                }
            },
            enumerable: true,
            configurable: true
        });
        return Rectangle;
    })(puck.Visual);
    puck.Rectangle = Rectangle;
    var rectangleStencil = {
        draft: puck.stencil.visual.draft,
        draw: function (ctx, bag) {
            var fr = bag.fillRect;
            if (fr.width <= 0 || fr.height <= 0) {
                return;
            }
            var raw = ctx.raw;
            raw.beginPath();
            raw.rect(fr.x, fr.y, fr.width, fr.height);
            raw.closePath();
        }
    };
})(puck || (puck = {}));
var puck;
(function (puck) {
    var SolidColorBrush = (function () {
        function SolidColorBrush(color) {
            this.$color = null;
            this.$changer = new puck.internal.WatchChanger();
            this.color = new puck.Color(color);
        }
        Object.defineProperty(SolidColorBrush.prototype, "color", {
            get: function () { return this.$color; },
            set: function (value) {
                if (!puck.Color.equals(this.$color, value)) {
                    this.$changer.on();
                }
                this.$color = value;
            },
            enumerable: true,
            configurable: true
        });
        SolidColorBrush.prototype.watch = function (onChanged) {
            return this.$changer.watch(onChanged);
        };
        SolidColorBrush.prototype.setup = function (ctx, region) {
        };
        SolidColorBrush.prototype.toHtml5Object = function () {
            return this.color.toString();
        };
        return SolidColorBrush;
    })();
    puck.SolidColorBrush = SolidColorBrush;
})(puck || (puck = {}));
var puck;
(function (puck) {
    (function (Stretch) {
        Stretch[Stretch["none"] = 0] = "none";
        Stretch[Stretch["fill"] = 1] = "fill";
        Stretch[Stretch["uniform"] = 2] = "uniform";
        Stretch[Stretch["uniformToFill"] = 3] = "uniformToFill";
    })(puck.Stretch || (puck.Stretch = {}));
    var Stretch = puck.Stretch;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var Timer = (function () {
        function Timer(callback) {
            this.callback = callback;
            this.enabled = false;
            this.active = 0;
        }
        Timer.prototype.enable = function () {
            var _this = this;
            this.enabled = true;
            this.active = animate.request(function (now) { return _this.onFrame(now); });
        };
        Timer.prototype.disable = function () {
            this.enabled = false;
            if (this.active) {
                animate.cancel(this.active);
                this.active = 0;
            }
        };
        Timer.prototype.onFrame = function (now) {
            var _this = this;
            this.callback && this.callback(now);
            this.active = animate.request(function (now) { return _this.onFrame(now); });
        };
        return Timer;
    })();
    puck.Timer = Timer;
    var animate;
    (function (animate) {
        var req = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || (function (callback) { return window.setTimeout(callback, 1000 / 200); });
        var can = window.cancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.mozCancelAnimationFrame
            || window.oCancelAnimationFrame
            || window.msCancelAnimationFrame
            || (function (handle) { return window.clearTimeout(handle); });
        function request(callback) {
            return req(callback);
        }
        animate.request = request;
        function cancel(handle) {
            return can(handle);
        }
        animate.cancel = cancel;
    })(animate || (animate = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var ElementComposite = (function () {
            function ElementComposite() {
                this.$$dirt = element.DirtyFlags.none;
                this.transform = la.mat3.identity();
                this.padding = la.padding.init(0, 0, 0, 0);
                this.extents = la.rect.init(0, 0, 0, 0);
                this.paint = la.rect.init(0, 0, 0, 0);
            }
            ElementComposite.prototype.hasDirt = function (match) {
                return (this.$$dirt & match) > 0;
            };
            ElementComposite.prototype.taint = function (newDirt) {
                this.$$dirt |= newDirt;
                return this;
            };
            ElementComposite.prototype.untaint = function (oldDirt) {
                this.$$dirt &= ~oldDirt;
                return this;
            };
            ElementComposite.prototype.reset = function () {
                this.opacity = 1.0;
                this.visible = true;
                la.mat3.identity(this.transform);
                la.padding.init(0, 0, 0, 0, this.padding);
                la.rect.init(0, 0, 0, 0, this.extents);
                la.rect.init(0, 0, 0, 0, this.paint);
                this.$$dirt = element.DirtyFlags.none;
                return this;
            };
            ElementComposite.prototype.invalidate = function () {
                this.taint(element.DirtyFlags.invalidate);
                la.rect.union(this.paint, this.extents);
                return this;
            };
            return ElementComposite;
        })();
        element.ElementComposite = ElementComposite;
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var ContainerComposite = (function (_super) {
            __extends(ContainerComposite, _super);
            function ContainerComposite() {
                _super.apply(this, arguments);
            }
            return ContainerComposite;
        })(puck.element.ElementComposite);
        container.ContainerComposite = ContainerComposite;
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var ElementState = (function () {
            function ElementState() {
                this.opacity = 1.0;
                this.visible = true;
                this.offset = { x: 0, y: 0 };
                this.size = { width: 0, height: 0 };
                this.transform = la.mat3.identity();
                this.transformOrigin = { x: 0.5, y: 0.5 };
            }
            ElementState.prototype.reset = function () {
                this.opacity = 1.0;
                this.visible = true;
                this.offset.x = 0;
                this.offset.y = 0;
                this.size.width = 0;
                this.size.height = 0;
                la.mat3.identity(this.transform);
                this.transformOrigin.x = 0.5;
                this.transformOrigin.y = 0.5;
                return this;
            };
            return ElementState;
        })();
        element.ElementState = ElementState;
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var ContainerState = (function (_super) {
            __extends(ContainerState, _super);
            function ContainerState() {
                _super.apply(this, arguments);
            }
            return ContainerState;
        })(puck.element.ElementState);
        container.ContainerState = ContainerState;
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var engine;
    (function (engine) {
        function process(el, parent) {
            doDown(el, parent);
            var ccomposites = [];
            for (var walker = puck.walk.getWalker(el), cur = walker.next(); !!cur; cur = walker.next()) {
                process(cur, el);
                ccomposites.push(cur.composite);
            }
            doUp(el, parent, ccomposites);
        }
        engine.process = process;
        var EMPTY_DOWN_COMPOSITE = {
            opacity: 1.0,
            visible: true,
            transform: la.mat3.identity(),
            extents: la.rect.init(0, 0, 0, 0),
            hasDirt: function (match) {
                return false;
            },
            taint: function (newDirt) {
            },
            untaint: function (oldDirt) {
            },
            reset: function () {
            }
        };
        function doDown(el, parent) {
            var processor = el.processor.down;
            var bag = {
                walker: puck.walk.getWalker(el),
                state: el.state,
                composite: el.composite,
                pcomposite: parent ? parent.composite : EMPTY_DOWN_COMPOSITE
            };
            if (processor.isTainted(bag)) {
                processor.process(bag);
                processor.clear(bag);
            }
        }
        function doUp(el, parent, ccomposites) {
            var processor = el.processor.up;
            var bag = {
                state: el.state,
                composite: el.composite,
                ccomposites: ccomposites
            };
            if (processor.isTainted(bag)) {
                var dirt = processor.process(bag);
                if (parent)
                    parent.composite.taint(dirt);
                processor.clear(bag);
            }
        }
    })(engine = puck.engine || (puck.engine = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var render;
    (function (render) {
        var mat3 = la.mat3;
        var caps = [
            "butt",
            "square",
            "round",
            "butt"
        ];
        var joins = [
            "miter",
            "bevel",
            "round"
        ];
        var RenderContext = (function () {
            function RenderContext(ctx) {
                this.$$transforms = [];
                this.currentTransform = mat3.identity();
                Object.defineProperties(this, {
                    "raw": { value: ctx, writable: false },
                    "currentTransform": { value: mat3.identity(), writable: false },
                    "hasFillRule": { value: RenderContext.hasFillRule, writable: false },
                    "size": { value: new render.RenderContextSize(), writable: false },
                });
                this.size.init(ctx);
            }
            Object.defineProperty(RenderContext, "hasFillRule", {
                get: function () {
                    if (navigator.appName === "Microsoft Internet Explorer") {
                        var version = getIEVersion();
                        return version < 0 || version > 10;
                    }
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            RenderContext.prototype.applyDpiRatio = function () {
                var ratio = this.size.dpiRatio;
                this.scale(ratio, ratio);
            };
            RenderContext.prototype.save = function () {
                this.$$transforms.push(mat3.create(this.currentTransform));
                this.raw.save();
            };
            RenderContext.prototype.restore = function () {
                var old = this.$$transforms.pop();
                if (old)
                    mat3.copyTo(old, this.currentTransform);
                this.raw.restore();
            };
            RenderContext.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
                mat3.init(this.currentTransform, m11, m12, m21, m22, dx, dy);
                this.raw.setTransform(m11, m12, m21, m22, dx, dy);
            };
            RenderContext.prototype.resetTransform = function () {
                mat3.identity(this.currentTransform);
                var raw = this.raw;
                if (raw.resetTransform)
                    raw.resetTransform();
            };
            RenderContext.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
                var ct = this.currentTransform;
                mat3.multiply(ct, mat3.create([m11, m12, m21, m22, dx, dy]), ct);
                this.raw.transform(m11, m12, m21, m22, dx, dy);
            };
            RenderContext.prototype.scale = function (x, y) {
                mat3.scale(this.currentTransform, x, y);
                this.raw.scale(x, y);
            };
            RenderContext.prototype.rotate = function (angle) {
                var ct = this.currentTransform;
                var r = mat3.createRotate(angle);
                mat3.multiply(ct, r, ct);
                this.raw.rotate(angle);
            };
            RenderContext.prototype.translate = function (x, y) {
                mat3.translate(this.currentTransform, x, y);
                this.raw.translate(x, y);
            };
            RenderContext.prototype.apply = function (mat) {
                var ct = mat3.apply(this.currentTransform, mat);
                this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
            };
            RenderContext.prototype.preapply = function (mat) {
                var ct = mat3.preapply(this.currentTransform, mat);
                this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
            };
            RenderContext.prototype.clipRect = function (rect) {
                var raw = this.raw;
                raw.beginPath();
                raw.rect(rect.x, rect.y, rect.width, rect.height);
                raw.clip();
            };
            RenderContext.prototype.fillEx = function (region, brush, fillRule) {
                var raw = this.raw;
                brush.setup(raw, region);
                raw.fillStyle = brush.toHtml5Object();
                if (fillRule == null) {
                    raw.fillRule = raw.msFillRule = "nonzero";
                    raw.fill();
                }
                else {
                    var fr = fillRule === puck.FillRule.EvenOdd ? "evenodd" : "nonzero";
                    raw.fillRule = raw.msFillRule = fr;
                    raw.fill(fr);
                }
            };
            RenderContext.prototype.strokeEx = function (region, brush, thickness) {
                var raw = this.raw;
                brush.setup(raw, region);
                raw.strokeStyle = brush.toHtml5Object();
                raw.lineWidth = thickness;
                raw.stroke();
            };
            RenderContext.prototype.isPointInStrokeEx = function (pars, x, y) {
                var raw = this.raw;
                raw.lineWidth = pars.strokeThickness;
                raw.lineCap = caps[pars.strokeStartLineCap || pars.strokeEndLineCap || 0] || caps[0];
                raw.lineJoin = joins[pars.strokeLineJoin || 0] || joins[0];
                raw.miterLimit = pars.strokeMiterLimit;
                return raw.isPointInStroke(x, y);
            };
            return RenderContext;
        })();
        render.RenderContext = RenderContext;
        function getIEVersion() {
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(navigator.userAgent) != null)
                return parseFloat(RegExp.$1);
            return -1;
        }
    })(render = puck.render || (puck.render = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var engine;
    (function (engine) {
        function render(el, ctx, region) {
            var processor = el.processor.render;
            var bag = {
                walker: puck.walk.getWalker(el, true),
                state: el.state,
                composite: el.composite,
                stencil: el.stencil,
                ctx: ctx,
                inregion: region,
                curregion: la.rect.init(0, 0, 0, 0),
            };
            processor.process(bag);
            processor.clear(bag);
        }
        engine.render = render;
    })(engine = puck.engine || (puck.engine = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var ImageComposite = (function (_super) {
            __extends(ImageComposite, _super);
            function ImageComposite() {
                _super.apply(this, arguments);
                this.stretchTransform = la.mat3.identity();
            }
            ImageComposite.prototype.reset = function () {
                _super.prototype.reset.call(this);
                la.mat3.identity(this.stretchTransform);
                return this;
            };
            return ImageComposite;
        })(puck.element.ElementComposite);
        image.ImageComposite = ImageComposite;
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var ImageSource = (function () {
            function ImageSource() {
                var _this = this;
                this.$el = document.createElement("img");
                this.$watchers = [];
                this.$el.onerror = function (e) { return _this.onErrored(e); };
                this.$el.onload = function (e) { return _this.onLoaded(); };
            }
            ImageSource.prototype.reset = function () {
                this.uri = "";
            };
            Object.defineProperty(ImageSource.prototype, "uri", {
                get: function () { return this.$el.src; },
                set: function (value) {
                    if (this.$el.src !== value) {
                        this.$el.src = value;
                        this.onChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageSource.prototype, "naturalWidth", {
                get: function () {
                    return this.$el.naturalWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageSource.prototype, "naturalHeight", {
                get: function () {
                    return this.$el.naturalHeight;
                },
                enumerable: true,
                configurable: true
            });
            ImageSource.prototype.draw = function (ctx) {
                ctx.drawImage(this.$el, 0, 0);
            };
            ImageSource.prototype.watch = function (onChanged, onErrored, onLoaded) {
                var _this = this;
                var watcher = {
                    change: onChanged,
                    error: onErrored,
                    load: onLoaded,
                    unwatch: function () {
                        var ind = _this.$watchers.indexOf(watcher);
                        if (ind > -1)
                            _this.$watchers.splice(ind, 1);
                    }
                };
                this.$watchers.push(watcher);
                return watcher;
            };
            ImageSource.prototype.onChanged = function () {
                for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                    watchers[i].change();
                }
            };
            ImageSource.prototype.onErrored = function (e) {
                for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                    watchers[i].error(e.error);
                }
            };
            ImageSource.prototype.onLoaded = function () {
                for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                    watchers[i].load();
                }
            };
            return ImageSource;
        })();
        image.ImageSource = ImageSource;
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var ImageState = (function (_super) {
            __extends(ImageState, _super);
            function ImageState() {
                _super.apply(this, arguments);
                this.source = new image.ImageSource();
                this.stretch = puck.Stretch.none;
                this.naturalSize = { width: 0, height: 0 };
            }
            ImageState.prototype.reset = function () {
                _super.prototype.reset.call(this);
                this.source.reset();
                this.stretch = puck.Stretch.none;
                this.naturalSize.width = this.naturalSize.height = 0;
                return this;
            };
            ImageState.prototype.getEffectiveStretch = function () {
                var size = this.size, natural = this.naturalSize;
                if (size.width <= 0 || size.height <= 0) {
                    return puck.Stretch.none;
                }
                if (natural.width <= 0 || natural.height <= 0) {
                    return puck.Stretch.none;
                }
                return this.stretch;
            };
            return ImageState;
        })(puck.element.ElementState);
        image.ImageState = ImageState;
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var internal;
    (function (internal) {
        var WatchChanger = (function () {
            function WatchChanger() {
                this.$watchers = [];
            }
            WatchChanger.prototype.watch = function (onChanged) {
                var watchers = this.$watchers;
                var watcher = {
                    change: onChanged,
                    unwatch: function () {
                        var ind = watchers.indexOf(watcher);
                        if (ind > -1)
                            watchers.splice(ind, 1);
                    }
                };
                watchers.push(watcher);
                return watcher;
            };
            WatchChanger.prototype.on = function () {
                for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                    watchers[i].change();
                }
            };
            return WatchChanger;
        })();
        internal.WatchChanger = WatchChanger;
    })(internal = puck.internal || (puck.internal = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var linearGradient;
    (function (linearGradient) {
        function createRepeatInterpolator(start, end, bounds) {
            var first = { x: start.x, y: start.y };
            var last = { x: end.x, y: end.y };
            var dir = { x: end.x - start.x, y: end.y - start.y };
            linearGradient.calcMetrics(dir, first, last, bounds);
            var numSteps = (last.x - first.x) / dir.x;
            var stepSize = 1.0 / numSteps;
            var cur = -stepSize;
            return {
                x0: first.x,
                y0: first.y,
                x1: last.x,
                y1: last.y,
                step: function () {
                    cur += stepSize;
                    return cur < 1;
                },
                interpolate: function (offset) {
                    return cur + (offset / numSteps);
                }
            };
        }
        linearGradient.createRepeatInterpolator = createRepeatInterpolator;
        function createReflectInterpolator(start, end, bounds) {
            var first = { x: start.x, y: start.y };
            var last = { x: end.x, y: end.y };
            var dir = { x: end.x - start.x, y: end.y - start.y };
            linearGradient.calcMetrics(dir, first, last, bounds);
            var numSteps = (last.x - first.x) / dir.x;
            var stepSize = 1.0 / numSteps;
            var cur = -stepSize;
            var inverted = Math.round((start.x - first.x) / dir.x) % 2 === 0;
            return {
                x0: first.x,
                y0: first.y,
                x1: last.x,
                y1: last.y,
                step: function () {
                    inverted = !inverted;
                    cur += stepSize;
                    return cur < 1;
                },
                interpolate: function (offset) {
                    var norm = offset / numSteps;
                    return !inverted ? cur + norm : cur + (stepSize - norm);
                }
            };
        }
        linearGradient.createReflectInterpolator = createReflectInterpolator;
    })(linearGradient = puck.linearGradient || (puck.linearGradient = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var linearGradient;
    (function (linearGradient) {
        function calcMetrics(dir, first, last, bounds) {
            if (dir.y === 0) {
                if (dir.x < 0)
                    W(dir, first, last, bounds);
                else if (dir.x !== 0)
                    E(dir, first, last, bounds);
            }
            else if (dir.x === 0) {
                if (dir.y < 0)
                    N(dir, first, last, bounds);
                else if (dir.y !== 0)
                    S(dir, first, last, bounds);
            }
            else if (dir.x < 0 && dir.y < 0) {
                NW(dir, first, last, bounds);
            }
            else if (dir.x < 0 && dir.y > 0) {
                SW(dir, first, last, bounds);
            }
            else if (dir.x > 0 && dir.y < 0) {
                NE(dir, first, last, bounds);
            }
            else if (dir.x > 0 && dir.y > 0) {
                SE(dir, first, last, bounds);
            }
        }
        linearGradient.calcMetrics = calcMetrics;
        function E(dir, first, last, bounds) {
            var maxX = bounds.x + bounds.width;
            while (first.x >= bounds.x)
                first.x -= dir.x;
            while (last.x <= maxX)
                last.x += dir.x;
        }
        function W(dir, first, last, bounds) {
            var maxX = bounds.x + bounds.width;
            while (first.x <= maxX)
                first.x -= dir.x;
            while (last.x >= bounds.x)
                last.x += dir.x;
        }
        function S(dir, first, last, bounds) {
            var maxY = bounds.y + bounds.height;
            while (first.y >= bounds.y)
                first.y -= dir.y;
            while (last.y <= maxY)
                last.y += dir.y;
        }
        function N(dir, first, last, bounds) {
            var maxY = bounds.y + bounds.height;
            while (first.y <= maxY)
                first.y -= dir.y;
            while (last.y >= bounds.y)
                last.y += dir.y;
        }
        function NW(dir, first, last, bounds) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x <= maxX && first.y <= maxY) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x >= bounds.x && last.y >= bounds.y) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
        function SW(dir, first, last, bounds) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x <= maxX && first.y >= bounds.y) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x >= bounds.x && last.y <= maxY) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
        function NE(dir, first, last, bounds) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x >= bounds.x && first.y <= maxY) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x <= maxX && last.y >= bounds.y) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
        function SE(dir, first, last, bounds) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x >= bounds.x && first.y >= bounds.y) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x <= maxX && last.y <= maxY) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
    })(linearGradient = puck.linearGradient || (puck.linearGradient = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var radialGradient;
    (function (radialGradient) {
        function createExtender(data, bounds) {
            var started = false;
            var dx = data.x1 - data.x0;
            var dy = data.y1 - data.y0;
            var rstep = data.r1;
            var reached = false;
            var ext = {
                x0: data.x0,
                y0: data.y0,
                r0: 0,
                x1: data.x1,
                y1: data.y1,
                r1: data.r1,
                step: function () {
                    if (!started) {
                        started = true;
                        return true;
                    }
                    ext.x0 = ext.x1;
                    ext.y0 = ext.y1;
                    ext.r0 += rstep;
                    ext.r1 += rstep;
                    ext.x1 += dx;
                    ext.y1 += dy;
                    if (reached)
                        return false;
                    reached = exceedBounds(ext.x1, ext.y1, ext.r1, bounds);
                    return true;
                },
                createGradient: function (ctx) {
                    return ctx.createRadialGradient(ext.x0, ext.y0, ext.r0, ext.x1, ext.y1, ext.r1);
                }
            };
            return ext;
        }
        radialGradient.createExtender = createExtender;
        function exceedBounds(cx, cy, radius, bounds) {
            var ne = len(cx, cy, bounds.x, bounds.y);
            var nw = len(cx, cy, bounds.x + bounds.width, bounds.y);
            var sw = len(cx, cy, bounds.x + bounds.width, bounds.y + bounds.height);
            var se = len(cx, cy, bounds.x, bounds.y + bounds.height);
            return Math.max(ne, nw, sw, se) < radius;
        }
        function len(x1, y1, x2, y2) {
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.sqrt((dx * dx) + (dy * dy));
        }
    })(radialGradient = puck.radialGradient || (puck.radialGradient = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var render;
    (function (render) {
        function getNaturalCanvasSize(canvas) {
            var zoomFactor = render.zoom.calc();
            return {
                width: canvas.offsetWidth * zoomFactor,
                height: canvas.offsetHeight * zoomFactor
            };
        }
        render.getNaturalCanvasSize = getNaturalCanvasSize;
    })(render = puck.render || (puck.render = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var render;
    (function (render) {
        var epsilon = 1e-10;
        var RenderContextSize = (function () {
            function RenderContextSize() {
                this.$$ctx = null;
                this.$$desiredWidth = 0;
                this.$$desiredHeight = 0;
                this.$$changed = null;
                this.$$lastDpiRatio = 1;
            }
            Object.defineProperty(RenderContextSize.prototype, "desiredWidth", {
                get: function () {
                    return this.$$desiredWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderContextSize.prototype, "desiredHeight", {
                get: function () {
                    return this.$$desiredHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderContextSize.prototype, "paintWidth", {
                get: function () {
                    return this.$$desiredWidth * this.dpiRatio;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderContextSize.prototype, "paintHeight", {
                get: function () {
                    return this.$$desiredHeight * this.dpiRatio;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderContextSize.prototype, "dpiRatio", {
                get: function () {
                    return (window.devicePixelRatio || 1) / this.$$ctx.backingStorePixelRatio;
                },
                enumerable: true,
                configurable: true
            });
            RenderContextSize.prototype.init = function (ctx) {
                this.$$ctx = ctx;
                var desired = render.getNaturalCanvasSize(ctx.canvas);
                this.$$desiredWidth = desired.width;
                this.$$desiredHeight = desired.height;
                this.$adjustCanvas();
            };
            RenderContextSize.prototype.queueResize = function (width, height) {
                if (this.$$changed) {
                    this.$$changed.width = width;
                    this.$$changed.height = height;
                }
                else {
                    this.$$changed = {
                        width: width,
                        height: height
                    };
                }
                return this;
            };
            RenderContextSize.prototype.commitResize = function () {
                if (this.$$changed) {
                    if (Math.abs(this.$$changed.width - this.$$desiredWidth) < epsilon && Math.abs(this.$$changed.height - this.$$desiredHeight) < epsilon)
                        return;
                    this.$$desiredWidth = this.$$changed.width;
                    this.$$desiredHeight = this.$$changed.height;
                    this.$$changed = null;
                    this.$adjustCanvas();
                }
                return this;
            };
            RenderContextSize.prototype.updateDpiRatio = function () {
                if (this.$$lastDpiRatio === this.dpiRatio)
                    return false;
                this.$adjustCanvas();
                return true;
            };
            RenderContextSize.prototype.$adjustCanvas = function () {
                var canvas = this.$$ctx.canvas;
                var dpiRatio = this.dpiRatio;
                if (Math.abs(dpiRatio - 1) < epsilon) {
                    canvas.width = this.desiredWidth;
                    canvas.height = this.desiredHeight;
                }
                else {
                    canvas.width = this.paintWidth;
                    canvas.height = this.paintHeight;
                    canvas.style.width = this.desiredWidth.toString() + "px";
                    canvas.style.height = this.desiredHeight.toString() + "px";
                }
                this.$$lastDpiRatio = dpiRatio;
            };
            return RenderContextSize;
        })();
        render.RenderContextSize = RenderContextSize;
    })(render = puck.render || (puck.render = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var render;
    (function (render) {
        var zoom;
        (function (zoom_1) {
            zoom_1.calc = (function () {
                if (document.frames)
                    return ie();
                return chrome();
            })();
            function ie() {
                return function () {
                    var screen = document.frames.screen;
                    var zoom = screen.deviceXDPI / screen.systemXDPI;
                    return Math.round(zoom * 100) / 100;
                };
            }
            function chrome() {
                var svg;
                function memoizeSvg() {
                    if (!!svg || !document.body)
                        return;
                    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                    svg.setAttribute('version', '1.1');
                    document.body.appendChild(svg);
                    (function (style) {
                        style.opacity = "0.0";
                        style.position = "absolute";
                        style.left = "-300px";
                    })(svg.style);
                }
                return function () {
                    memoizeSvg();
                    return !svg ? 1 : svg.currentScale;
                };
            }
        })(zoom = render.zoom || (render.zoom = {}));
    })(render = puck.render || (puck.render = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var stencil;
    (function (stencil) {
        stencil.empty = {
            draft: function (bag) {
            },
            draw: function (ctx, bag) {
            },
        };
    })(stencil = puck.stencil || (puck.stencil = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var visual;
    (function (visual) {
        var ElementComposite = puck.element.ElementComposite;
        var VisualComposite = (function (_super) {
            __extends(VisualComposite, _super);
            function VisualComposite() {
                _super.apply(this, arguments);
            }
            return VisualComposite;
        })(ElementComposite);
        visual.VisualComposite = VisualComposite;
    })(visual = puck.visual || (puck.visual = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var visual;
    (function (visual) {
        var ElementState = puck.element.ElementState;
        var VisualState = (function (_super) {
            __extends(VisualState, _super);
            function VisualState() {
                _super.apply(this, arguments);
            }
            VisualState.prototype.reset = function () {
                _super.prototype.reset.call(this);
                this.fill = null;
                this.stroke = null;
                this.strokeThickness = 0;
                return this;
            };
            return VisualState;
        })(ElementState);
        visual.VisualState = VisualState;
    })(visual = puck.visual || (puck.visual = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var walk;
    (function (walk) {
        var EMPTY_WALKER = {
            next: function () {
                return undefined;
            }
        };
        function getWalker(el, reverse) {
            if (typeof el.walk === "function")
                return el.walk(reverse);
            return EMPTY_WALKER;
        }
        walk.getWalker = getWalker;
    })(walk = puck.walk || (puck.walk = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var Processor = (function () {
                function Processor() {
                }
                Processor.prototype.isTainted = function (bag) {
                    return bag.composite.hasDirt(element.DirtyFlags.down);
                };
                Processor.prototype.process = function (bag) {
                    var dirt = element.DirtyFlags.none;
                    if (down.opacity.process(bag))
                        dirt |= element.DirtyFlags.opacity;
                    if (down.visible.process(bag))
                        dirt |= element.DirtyFlags.visible;
                    if (down.transform.process(bag))
                        dirt |= element.DirtyFlags.transform;
                    return dirt;
                };
                Processor.prototype.clear = function (bag) {
                    bag.composite.untaint(element.DirtyFlags.down);
                    return this;
                };
                Processor.instance = new Processor();
                return Processor;
            })();
            down.Processor = Processor;
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var down;
        (function (down) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    var dirt = _super.prototype.process.call(this, bag);
                    for (var cur = bag.walker.next(); !!cur; cur = bag.walker.next()) {
                        cur.composite.taint(dirt);
                    }
                    return dirt;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.down.Processor);
            down.Processor = Processor;
        })(down = container.down || (container.down = {}));
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var render;
        (function (render) {
            (function (SkipResult) {
                SkipResult[SkipResult["none"] = 0] = "none";
                SkipResult[SkipResult["render"] = 2] = "render";
                SkipResult[SkipResult["post"] = 4] = "post";
                SkipResult[SkipResult["all"] = 6] = "all";
            })(render.SkipResult || (render.SkipResult = {}));
            var SkipResult = render.SkipResult;
            var Processor = (function () {
                function Processor() {
                }
                Processor.prototype.process = function (bag) {
                    var result = this.prerender(bag);
                    if ((result & SkipResult.render) === 0) {
                        this.render(bag);
                    }
                    if ((result & SkipResult.post) === 0) {
                        this.postrender(bag);
                    }
                };
                Processor.prototype.clear = function (bag) {
                    bag.composite.untaint(element.DirtyFlags.invalidate);
                    la.rect.init(0, 0, 0, 0, bag.composite.paint);
                    return this;
                };
                Processor.prototype.prerender = function (bag) {
                    if (!render.validate.process(bag))
                        return SkipResult.all;
                    if (!render.should.process(bag))
                        return SkipResult.all;
                    render.prepare.process(bag);
                    render.narrow.process(bag);
                    return SkipResult.none;
                };
                Processor.prototype.render = function (bag) {
                    var sbag = this.createStencilBag(bag);
                    bag.stencil.draft(sbag);
                    bag.stencil.draw(bag.ctx, sbag);
                };
                Processor.prototype.postrender = function (bag) {
                    bag.ctx.restore();
                };
                Processor.prototype.createStencilBag = function (bag) {
                    return {
                        state: bag.state,
                        composite: bag.composite,
                        fillRect: la.rect.init(0, 0, 0, 0),
                        strokeRect: la.rect.init(0, 0, 0, 0),
                    };
                };
                Processor.instance = new Processor();
                return Processor;
            })();
            render.Processor = Processor;
        })(render = element.render || (element.render = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var render;
        (function (render) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.render = function (bag) {
                    for (var cur = bag.walker.next(); !!cur; cur = bag.walker.next()) {
                        puck.engine.render(cur, bag.ctx, bag.curregion);
                    }
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.render.Processor);
            render.Processor = Processor;
        })(render = container.render || (container.render = {}));
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var up;
        (function (up) {
            var extents;
            (function (extents) {
                var rect = la.rect;
                var DirtyFlags = puck.element.DirtyFlags;
                var oldExtents = rect.init(0, 0, 0, 0);
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.extents))
                        return false;
                    rect.copyTo(comp.extents, oldExtents);
                    rect.init(0, 0, 0, 0, comp.extents);
                    for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
                        rect.union(comp.extents, ccomps[i].extents);
                    }
                    rect.transform(comp.extents, comp.transform, comp.extents);
                    if (rect.equal(comp.extents, oldExtents))
                        return false;
                    rect.union(comp.paint, oldExtents);
                    comp.taint(DirtyFlags.newbounds);
                    return true;
                }
                extents.process = process;
            })(extents = up.extents || (up.extents = {}));
        })(up = container.up || (container.up = {}));
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var up;
        (function (up) {
            var invalidate;
            (function (invalidate) {
                var DirtyFlags = puck.element.DirtyFlags;
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.invalidate))
                        return false;
                    var childPaint = la.rect.init(0, 0, 0, 0);
                    for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
                        la.rect.union(childPaint, ccomps[i].paint);
                    }
                    la.rect.transform(childPaint, comp.transform, childPaint);
                    la.rect.union(comp.paint, childPaint);
                    return true;
                }
                invalidate.process = process;
            })(invalidate = up.invalidate || (up.invalidate = {}));
        })(up = container.up || (container.up = {}));
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var up;
        (function (up) {
            var Processor = (function () {
                function Processor() {
                }
                Processor.prototype.isTainted = function (bag) {
                    return bag.composite.hasDirt(element.DirtyFlags.up);
                };
                Processor.prototype.process = function (bag) {
                    var dirt = element.DirtyFlags.none;
                    if (up.extents.process(bag))
                        dirt |= element.DirtyFlags.extents;
                    up.newbounds.process(bag);
                    return dirt;
                };
                Processor.prototype.clear = function (bag) {
                    bag.composite.untaint(element.DirtyFlags.up);
                    return this;
                };
                Processor.instance = new Processor();
                return Processor;
            })();
            up.Processor = Processor;
        })(up = element.up || (element.up = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var up;
        (function (up) {
            var newbounds;
            (function (newbounds) {
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.newbounds) || !comp.visible || (comp.opacity * 255) < 0.5)
                        return false;
                    comp.invalidate();
                    return true;
                }
                newbounds.process = process;
            })(newbounds = up.newbounds || (up.newbounds = {}));
        })(up = element.up || (element.up = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var up;
        (function (up) {
            var DirtyFlags = puck.element.DirtyFlags;
            var newbounds = puck.element.up.newbounds;
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    var dirt = DirtyFlags.none;
                    if (up.extents.process(bag))
                        dirt |= DirtyFlags.extents;
                    newbounds.process(bag);
                    if (up.invalidate.process(bag))
                        dirt |= DirtyFlags.invalidate;
                    return dirt;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.up.Processor);
            up.Processor = Processor;
        })(up = container.up || (container.up = {}));
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var opacity;
            (function (opacity) {
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.opacity))
                        return false;
                    var newOpacity = bag.pcomposite.opacity * bag.state.opacity;
                    if (comp.opacity === newOpacity)
                        return false;
                    comp.taint(element.DirtyFlags.newbounds);
                    comp.opacity = newOpacity;
                    return true;
                }
                opacity.process = process;
            })(opacity = down.opacity || (down.opacity = {}));
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var transform;
            (function (transform) {
                var mat3 = la.mat3;
                var oldTransform = mat3.identity();
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.transform))
                        return false;
                    mat3.copyTo(comp.transform, oldTransform);
                    var state = bag.state;
                    mat3.createTranslate(state.offset.x, state.offset.y, comp.transform);
                    var xo = {
                        x: state.transformOrigin.x * state.size.width,
                        y: state.transformOrigin.y * state.size.height
                    };
                    mat3.translate(comp.transform, -xo.x, -xo.y);
                    mat3.apply(comp.transform, state.transform);
                    mat3.translate(comp.transform, xo.x, xo.y);
                    if (!mat3.equal(comp.transform, oldTransform)) {
                        comp.taint(element.DirtyFlags.extents);
                    }
                    return true;
                }
                transform.process = process;
            })(transform = down.transform || (down.transform = {}));
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var visible;
            (function (visible) {
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.visible))
                        return false;
                    var newVisible = bag.pcomposite.visible && (bag.state.visible === true);
                    if (comp.visible === newVisible)
                        return false;
                    comp.taint(element.DirtyFlags.newbounds);
                    comp.visible = newVisible;
                    return true;
                }
                visible.process = process;
            })(visible = down.visible || (down.visible = {}));
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var render;
        (function (render) {
            var narrow;
            (function (narrow) {
                function process(bag) {
                }
                narrow.process = process;
            })(narrow = render.narrow || (render.narrow = {}));
        })(render = element.render || (element.render = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var render;
        (function (render) {
            var prepare;
            (function (prepare) {
                function process(bag) {
                    bag.ctx.save();
                    bag.ctx.preapply(bag.composite.transform);
                }
                prepare.process = process;
            })(prepare = render.prepare || (render.prepare = {}));
        })(render = element.render || (element.render = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var render;
        (function (render) {
            var should;
            (function (should) {
                var rect = la.rect;
                function process(bag) {
                    var r = rect.transform(bag.composite.extents, bag.ctx.currentTransform, bag.curregion);
                    rect.roundOut(r);
                    rect.intersection(r, bag.inregion);
                    return r.width > 0 && r.height > 0;
                }
                should.process = process;
            })(should = render.should || (render.should = {}));
        })(render = element.render || (element.render = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var render;
        (function (render) {
            var validate;
            (function (validate) {
                function process(bag) {
                    var comp = bag.composite;
                    return !!comp.visible && (comp.opacity * 255) >= 0.5;
                }
                validate.process = process;
            })(validate = render.validate || (render.validate = {}));
        })(render = element.render || (element.render = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var up;
        (function (up) {
            var extents;
            (function (extents) {
                var rect = la.rect;
                var oldExtents = rect.init(0, 0, 0, 0);
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.extents))
                        return false;
                    var state = bag.state;
                    rect.copyTo(comp.extents, oldExtents);
                    rect.init(0, 0, state.size.width, state.size.height, comp.extents);
                    rect.grow(comp.extents, comp.padding);
                    rect.transform(comp.extents, comp.transform, comp.extents);
                    if (rect.equal(comp.extents, oldExtents))
                        return false;
                    rect.union(comp.paint, oldExtents);
                    comp.taint(element.DirtyFlags.newbounds);
                    return true;
                }
                extents.process = process;
            })(extents = up.extents || (up.extents = {}));
        })(up = element.up || (element.up = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var down;
        (function (down) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    down.stretch.process(bag);
                    return _super.prototype.process.call(this, bag);
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.down.Processor);
            down.Processor = Processor;
        })(down = image.down || (image.down = {}));
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var down;
        (function (down) {
            var stretch;
            (function (stretch_1) {
                var DirtyFlags = puck.element.DirtyFlags;
                var mat3 = la.mat3;
                var oldStretchTransform = mat3.identity();
                function process(bag) {
                    var state = bag.state, comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.stretch))
                        return false;
                    mat3.copyTo(comp.stretchTransform, oldStretchTransform);
                    var fitter = fits[state.getEffectiveStretch()];
                    fitter && fitter(comp.stretchTransform, state.naturalSize, state.size);
                    if (mat3.equal(comp.stretchTransform, oldStretchTransform))
                        return false;
                    comp.taint(DirtyFlags.extents);
                    return true;
                }
                stretch_1.process = process;
                var fits = {};
                fits[puck.Stretch.none] = function (mat, natural, size) {
                    mat3.identity(mat);
                };
                fits[puck.Stretch.fill] = function (mat, natural, size) {
                    mat3.createScale(size.width / natural.width, size.height / natural.height, mat);
                };
                fits[puck.Stretch.uniform] = function (mat, natural, size) {
                    var smin = Math.min(size.width / natural.width, size.height / natural.height);
                    mat3.createScale(smin, smin, mat);
                };
                fits[puck.Stretch.uniformToFill] = function (mat, natural, size) {
                    var smax = Math.max(size.width / natural.width, size.height / natural.height);
                    mat3.createScale(smax, smax, mat);
                };
            })(stretch = down.stretch || (down.stretch = {}));
        })(down = image.down || (image.down = {}));
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var up;
        (function (up) {
            var extents;
            (function (extents) {
                var DirtyFlags = puck.element.DirtyFlags;
                var rect = la.rect;
                var oldExtents = rect.init(0, 0, 0, 0);
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.extents))
                        return false;
                    var state = bag.state;
                    rect.copyTo(comp.extents, oldExtents);
                    rect.init(0, 0, 0, 0, comp.extents);
                    var fitter = fits[state.getEffectiveStretch()];
                    fitter && fitter(comp.extents, state.naturalSize, state.size);
                    rect.transform(comp.extents, comp.transform, comp.extents);
                    if (rect.equal(comp.extents, oldExtents))
                        return false;
                    rect.union(comp.paint, oldExtents);
                    comp.taint(DirtyFlags.newbounds);
                    return true;
                }
                extents.process = process;
                var fits = {};
                fits[puck.Stretch.none] = function (final, natural, size) {
                    final.width = natural.width;
                    final.height = natural.height;
                };
                fits[puck.Stretch.fill] = function (final, natural, size) {
                    final.width = size.width;
                    final.height = size.height;
                };
                fits[puck.Stretch.uniform] = function (final, natural, size) {
                    var sx = size.width / natural.width, sy = size.height / natural.height;
                    final.width = size.width;
                    final.height = size.height;
                    if (sx < sy) {
                        final.height = natural.height * sx;
                    }
                    else {
                        final.width = natural.width * sy;
                    }
                };
                fits[puck.Stretch.uniformToFill] = function (final, natural, size) {
                    var sx = size.width / natural.width, sy = size.height / natural.height;
                    final.width = size.width;
                    final.height = size.height;
                    if (sx > sy) {
                        final.height = natural.height * sx;
                    }
                    else {
                        final.width = natural.width * sy;
                    }
                };
            })(extents = up.extents || (up.extents = {}));
        })(up = image.up || (image.up = {}));
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var up;
        (function (up) {
            var DirtyFlags = puck.element.DirtyFlags;
            var newbounds = puck.element.up.newbounds;
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    var dirt = DirtyFlags.none;
                    if (up.extents.process(bag))
                        dirt |= DirtyFlags.extents;
                    newbounds.process(bag);
                    return dirt;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.up.Processor);
            up.Processor = Processor;
        })(up = image.up || (image.up = {}));
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
if (!CanvasRenderingContext2D.prototype.hasOwnProperty("backingStorePixelRatio")) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, "backingStorePixelRatio", {
        get: function () {
            var ctx = this;
            return ctx.webkitBackingStorePixelRatio
                || ctx.mozBackingStorePixelRatio
                || ctx.msBackingStorePixelRatio
                || ctx.oBackingStorePixelRatio
                || 1;
        }
    });
}
if (!CanvasRenderingContext2D.prototype.ellipse) {
    CanvasRenderingContext2D.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
        this.save();
        this.translate(x, y);
        this.rotate(rotation);
        this.scale(radiusX, radiusY);
        this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
        this.restore();
    };
}
if (!CanvasRenderingContext2D.prototype.isPointInStroke) {
    CanvasRenderingContext2D.prototype.isPointInStroke = function (x, y) {
        return false;
    };
}
var puck;
(function (puck) {
    var visual;
    (function (visual) {
        var render;
        (function (render) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.render = function (bag) {
                    var state = bag.state;
                    if (!state.fill && !state.stroke)
                        return false;
                    var ctx = bag.ctx;
                    ctx.save();
                    var sbag = this.createStencilBag(bag);
                    bag.stencil.draft(sbag);
                    bag.stencil.draw(ctx, sbag);
                    this.fill(ctx, state, sbag);
                    this.stroke(ctx, state, sbag);
                    ctx.restore();
                };
                Processor.prototype.fill = function (ctx, state, sbag) {
                    if (!state.fill)
                        return;
                    ctx.fillEx(sbag.fillRect, state.fill);
                };
                Processor.prototype.stroke = function (ctx, state, sbag) {
                    if (!state.stroke || state.strokeThickness <= 0)
                        return;
                    ctx.strokeEx(sbag.strokeRect, state.stroke, state.strokeThickness);
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.render.Processor);
            render.Processor = Processor;
        })(render = visual.render || (visual.render = {}));
    })(visual = puck.visual || (puck.visual = {}));
})(puck || (puck = {}));

//# sourceMappingURL=puck.js.map
