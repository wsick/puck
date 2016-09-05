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
            DirtyFlags[DirtyFlags["font"] = 16] = "font";
            DirtyFlags[DirtyFlags["padding"] = 32] = "padding";
            DirtyFlags[DirtyFlags["extents"] = 64] = "extents";
            DirtyFlags[DirtyFlags["newbounds"] = 128] = "newbounds";
            DirtyFlags[DirtyFlags["invalidate"] = 256] = "invalidate";
            DirtyFlags[DirtyFlags["down"] = 15] = "down";
            DirtyFlags[DirtyFlags["up"] = 496] = "up";
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
                hit: puck.element.hit.Processor.instance,
            };
            this.stencil = puck.stencil.empty;
        };
        Element.prototype.opacity = function (value) {
            if (arguments.length < 1)
                return this.state.opacity;
            if (this.state.opacity !== value) {
                this.state.opacity = value;
                this.composite.taint(DirtyFlags.opacity);
            }
            return this;
        };
        Element.prototype.visible = function (value) {
            if (arguments.length < 1)
                return this.state.visible;
            if (this.state.visible !== value) {
                this.state.visible = value;
                this.composite.taint(DirtyFlags.visible);
            }
            return this;
        };
        Element.prototype.transformOriginX = function (value) {
            if (arguments.length < 1)
                return this.state.transformOrigin.x;
            if (this.state.transformOrigin.x !== value) {
                this.state.transformOrigin.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Element.prototype.transformOriginY = function (value) {
            if (arguments.length < 1)
                return this.state.transformOrigin.y;
            if (this.state.transformOrigin.y !== value) {
                this.state.transformOrigin.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
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
                hit: puck.container.hit.Processor.instance,
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
        Container.prototype.opacity = function (value) {
            if (arguments.length < 1)
                return this.state.opacity;
            if (this.state.opacity !== value) {
                this.state.opacity = value;
                this.composite.taint(DirtyFlags.opacity);
            }
            return this;
        };
        Container.prototype.visible = function (value) {
            if (arguments.length < 1)
                return this.state.visible;
            if (this.state.visible !== value) {
                this.state.visible = value;
                this.composite.taint(DirtyFlags.visible);
            }
            return this;
        };
        Container.prototype.transformOriginX = function (value) {
            if (arguments.length < 1)
                return this.state.transformOrigin.x;
            if (this.state.transformOrigin.x !== value) {
                this.state.transformOrigin.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Container.prototype.transformOriginY = function (value) {
            if (arguments.length < 1)
                return this.state.transformOrigin.y;
            if (this.state.transformOrigin.y !== value) {
                this.state.transformOrigin.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Container.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Container.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
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
                hit: puck.visual.hit.Processor.instance,
            };
            this.stencil = puck.stencil.visual;
        };
        Visual.prototype.fill = function (value) {
            var _this = this;
            if (arguments.length < 1)
                return this.state.fill;
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
            return this;
        };
        Visual.prototype.stroke = function (value) {
            var _this = this;
            if (arguments.length < 1)
                return this.state.stroke;
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
            return this;
        };
        Visual.prototype.strokeThickness = function (value) {
            if (arguments.length < 1)
                return this.state.strokeThickness;
            if (value !== this.state.strokeThickness) {
                this.state.strokeThickness = value;
                this.composite.taint(DirtyFlags.padding);
            }
            return this;
        };
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
        Ellipse.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Ellipse.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Ellipse.prototype.width = function (value) {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
            return this;
        };
        Ellipse.prototype.height = function (value) {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
            return this;
        };
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
        FillRule[FillRule["evenodd"] = 0] = "evenodd";
        FillRule[FillRule["nonzero"] = 1] = "nonzero";
    })(puck.FillRule || (puck.FillRule = {}));
    var FillRule = puck.FillRule;
    (function (PenLineJoin) {
        PenLineJoin[PenLineJoin["miter"] = 0] = "miter";
        PenLineJoin[PenLineJoin["bevel"] = 1] = "bevel";
        PenLineJoin[PenLineJoin["round"] = 2] = "round";
    })(puck.PenLineJoin || (puck.PenLineJoin = {}));
    var PenLineJoin = puck.PenLineJoin;
    (function (PenLineCap) {
        PenLineCap[PenLineCap["flat"] = 0] = "flat";
        PenLineCap[PenLineCap["square"] = 1] = "square";
        PenLineCap[PenLineCap["round"] = 2] = "round";
        PenLineCap[PenLineCap["triangle"] = 3] = "triangle";
    })(puck.PenLineCap || (puck.PenLineCap = {}));
    var PenLineCap = puck.PenLineCap;
})(puck || (puck = {}));
var puck;
(function (puck) {
    puck.FontStyle = {
        normal: "normal",
        italic: "italic",
        oblique: "oblique"
    };
    puck.FontStretch = {
        ultraCondensed: "ultra-condensed",
        extraCondensed: "extra-condensed",
        condensed: "condensed",
        semiCondensed: "semi-condensed",
        normal: "normal",
        semiExpanded: "semi-expanded",
        expanded: "expanded",
        extraExpanded: "extra-expanded",
        ultraExpanded: "ultra-expanded"
    };
    (function (FontWeight) {
        FontWeight[FontWeight["thin"] = 100] = "thin";
        FontWeight[FontWeight["extraLight"] = 200] = "extraLight";
        FontWeight[FontWeight["light"] = 300] = "light";
        FontWeight[FontWeight["normal"] = 400] = "normal";
        FontWeight[FontWeight["medium"] = 500] = "medium";
        FontWeight[FontWeight["semiBold"] = 600] = "semiBold";
        FontWeight[FontWeight["bold"] = 700] = "bold";
        FontWeight[FontWeight["extraBold"] = 800] = "extraBold";
        FontWeight[FontWeight["black"] = 900] = "black";
        FontWeight[FontWeight["extraBlack"] = 950] = "extraBlack";
    })(puck.FontWeight || (puck.FontWeight = {}));
    var FontWeight = puck.FontWeight;
    puck.defaultFont = {
        family: "\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif",
        size: 14,
        stretch: puck.FontStretch.normal,
        style: puck.FontStyle.normal,
        weight: FontWeight.normal,
        toString: function () {
            return puck.font.toString(puck.defaultFont);
        },
    };
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
        GradientBrush.prototype.spreadMethod = function (value) {
            if (arguments.length < 1)
                return this.$spreadMethod;
            if (this.$spreadMethod !== value) {
                this.$spreadMethod = value;
                this.$changer.on();
            }
            return this;
        };
        GradientBrush.prototype.mappingMode = function (value) {
            if (arguments.length < 1)
                return this.$mappingMode;
            if (this.$mappingMode !== value) {
                this.$mappingMode = value;
                this.$changer.on();
            }
            return this;
        };
        GradientBrush.prototype.stops = function () {
            return this.$stops;
        };
        GradientBrush.prototype.watch = function (onChanged) {
            return this.$changer.watch(onChanged);
        };
        GradientBrush.prototype.setup = function (ctx, region) {
            if (this.$cachedBrush && la.rect.equal(this.$cachedBounds, region))
                return;
            la.rect.copyTo(region, this.$cachedBounds);
            this.$cachedBrush = this.createBrush(ctx, region);
        };
        GradientBrush.prototype.toHtml5Object = function () {
            return this.$cachedBrush;
        };
        GradientBrush.prototype.createBrush = function (ctx, region) {
            switch (this.$spreadMethod) {
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
            if (this.$mappingMode === puck.BrushMappingMode.relativeToBounds) {
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
        PuckArray.prototype.clear = function () {
            this.$backing.length = 0;
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.add = function (item) {
            this.$backing.push(item);
            Object.freeze(item);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.addMany = function (items) {
            var backing = this.$backing;
            for (var i = 0; i < items.length; i++) {
                Object.freeze(items[i]);
            }
            backing.push.apply(backing, items);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.insert = function (index, item) {
            this.$backing.splice(index, 0, item);
            Object.freeze(item);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.insertMany = function (index, items) {
            for (var i = 0; i < items.length; i++) {
                Object.freeze(items[i]);
            }
            var backing = this.$backing;
            for (var i = items.length - 1; i >= 0; i--) {
                backing.splice(index, 0, items[i]);
            }
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.edit = function (oldItem, newItem) {
            return this.editAt(this.$backing.indexOf(oldItem), newItem);
        };
        PuckArray.prototype.editAt = function (index, newItem) {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing[index] = newItem;
            Object.freeze(newItem);
            this.$changer.on();
            return this;
        };
        PuckArray.prototype.remove = function (item) {
            return this.removeAt(this.$backing.indexOf(item));
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
        function Image(state, composite) {
            _super.call(this, state, composite);
        }
        Image.prototype.init = function (state, composite) {
            var _this = this;
            this.state = (state || new puck.image.ImageState()).reset();
            this.composite = (composite || new puck.image.ImageComposite()).reset();
            this.processor = {
                down: puck.image.down.Processor.instance,
                up: puck.image.up.Processor.instance,
                render: puck.element.render.Processor.instance,
                hit: puck.image.hit.Processor.instance,
            };
            this.stencil = imageStencil;
            this.state.source.watch(function () { return _this.onSourceChanged(); }, function (e) { return _this.onSourceErrored(e); }, function () { return _this.onSourceLoaded(); });
        };
        Image.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Image.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Image.prototype.width = function (value) {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        };
        Image.prototype.height = function (value) {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        };
        Image.prototype.stretch = function (value) {
            if (arguments.length < 1)
                return this.state.stretch;
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
            return this;
        };
        Image.prototype.sourceUri = function (value) {
            if (arguments.length < 1)
                return this.state.source.uri;
            this.state.source.uri = value;
            return this;
        };
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
            var naturalSize = this.state.natural;
            naturalSize.width = width;
            naturalSize.height = height;
            this.composite.taint(DirtyFlags.stretch | DirtyFlags.extents).invalidate();
        };
        return Image;
    })(puck.Element);
    puck.Image = Image;
    var imageStencil = {
        draft: function (bag) {
        },
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
        function Layer() {
            _super.apply(this, arguments);
        }
        Layer.prototype.width = function () {
            return this.$ctx.raw.canvas.width;
        };
        Layer.prototype.height = function () {
            return this.$ctx.raw.canvas.height;
        };
        Layer.prototype.init = function (state, composite) {
            var _this = this;
            _super.prototype.init.call(this, state, composite);
            this.frameDebug = new puck.FrameDebug();
            this.$ctx = new puck.render.RenderContext();
            this.$timer = new puck.Timer(function (now) { return _this.onTick(now); });
        };
        Layer.prototype.attach = function (ctx) {
            this.$ctx.init(ctx);
            return this;
        };
        Layer.prototype.activate = function () {
            this.$timer.enable();
            return this;
        };
        Layer.prototype.deactivate = function () {
            this.$timer.disable();
            return this;
        };
        Layer.prototype.process = function () {
            this.frameDebug.beginProcess();
            puck.engine.process(this);
            this.frameDebug.endProcess();
            return this;
        };
        Layer.prototype.render = function () {
            var ctx = this.$ctx, paint = this.composite.paint, raw = ctx.raw;
            this.frameDebug.beginRender();
            raw.fillStyle = "#ffffff";
            raw.fillRect(paint.x, paint.y, paint.width, paint.height);
            puck.engine.render(this, ctx, paint);
            this.frameDebug.endRender();
            return this;
        };
        Layer.prototype.onTick = function (now) {
            this.process()
                .render();
        };
        return Layer;
    })(puck.Container);
    puck.Layer = Layer;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var fallbackColor = puck.Color.fromHex("#FF000000");
    var LinearGradientBrush = (function (_super) {
        __extends(LinearGradientBrush, _super);
        function LinearGradientBrush() {
            _super.apply(this, arguments);
            this.$start = { x: 0, y: 0 };
            this.$end = { x: 0, y: 1 };
        }
        LinearGradientBrush.prototype.start = function (value) {
            if (arguments.length < 1)
                return this.$start;
            if (this.$start !== value) {
                this.$start = value;
                Object.freeze(value);
                this.$changer.on();
            }
            return this;
        };
        LinearGradientBrush.prototype.end = function (value) {
            if (arguments.length < 1)
                return this.$end;
            if (this.$end !== value) {
                this.$end = value;
                Object.freeze(value);
                this.$changer.on();
            }
            return this;
        };
        LinearGradientBrush.prototype.createPad = function (ctx, region) {
            var mstart = this.mapPoint(region, this.$start);
            var mend = this.mapPoint(region, this.$end);
            var grd = ctx.createLinearGradient(mstart.x, mstart.y, mend.x, mend.y);
            for (var it = this.stops().iter(), result = it.next(); !result.done; result = it.next()) {
                addColorStop(grd, result.value);
            }
            return grd;
        };
        LinearGradientBrush.prototype.createReflect = function (ctx, region) {
            var mstart = this.mapPoint(region, this.$start);
            var mend = this.mapPoint(region, this.$end);
            return this.createInterpolated(ctx, puck.linearGradient.createRepeatInterpolator(mstart, mend, region));
        };
        LinearGradientBrush.prototype.createRepeat = function (ctx, region) {
            var mstart = this.mapPoint(region, this.$start);
            var mend = this.mapPoint(region, this.$end);
            return this.createInterpolated(ctx, puck.linearGradient.createReflectInterpolator(mstart, mend, region));
        };
        LinearGradientBrush.prototype.createInterpolated = function (ctx, interpolator) {
            var grd = ctx.createLinearGradient(interpolator.x0, interpolator.y0, interpolator.x1, interpolator.y1);
            var allStops = this.stops().paddedIter();
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
        var color = (stop.color || fallbackColor).toString();
        grd.addColorStop(offset, color);
    }
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Path = (function (_super) {
        __extends(Path, _super);
        function Path(state, composite) {
            _super.call(this, state, composite);
        }
        Path.prototype.init = function (state, composite) {
            this.state = (state || new puck.path.PathState()).reset();
            this.composite = (composite || new puck.path.PathComposite()).reset();
            this.processor = {
                down: puck.path.down.Processor.instance,
                up: puck.path.up.Processor.instance,
                render: puck.path.render.Processor.instance,
                hit: puck.path.hit.Processor.instance,
            };
            this.stencil = puck.stencil.path;
        };
        Path.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Path.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Path.prototype.width = function (value) {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        };
        Path.prototype.height = function (value) {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        };
        Path.prototype.stretch = function (value) {
            if (arguments.length < 1)
                return this.state.stretch;
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
            return this;
        };
        Path.prototype.path = function (value) {
            if (arguments.length < 1)
                return this.state.path;
            if (this.state.path !== value) {
                this.state.path = value;
                this.composite.bounder.setPath(value);
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        Path.prototype.fillRule = function (value) {
            if (arguments.length < 1)
                return this.state.fillRule;
            if (this.state.fillRule !== value) {
                this.state.fillRule = value;
                this.composite.invalidate();
            }
            return this;
        };
        Path.prototype.strokeLineCap = function (value) {
            if (arguments.length < 1)
                return this.state.strokeLineCap;
            if (this.state.strokeLineCap !== value) {
                this.state.strokeLineCap = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        Path.prototype.strokeLineJoin = function (value) {
            if (arguments.length < 1)
                return this.state.strokeLineJoin;
            if (this.state.strokeLineJoin !== value) {
                this.state.strokeLineJoin = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        Path.prototype.strokeMiterLimit = function (value) {
            if (arguments.length < 1)
                return this.state.strokeMiterLimit;
            if (this.state.strokeMiterLimit !== value) {
                this.state.strokeMiterLimit = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        return Path;
    })(puck.Visual);
    puck.Path = Path;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var Points = (function (_super) {
        __extends(Points, _super);
        function Points() {
            _super.apply(this, arguments);
        }
        return Points;
    })(puck.PuckArray);
    puck.Points = Points;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Polyline = (function (_super) {
        __extends(Polyline, _super);
        function Polyline(state, composite) {
            _super.call(this, state, composite);
        }
        Polyline.prototype.init = function (state, composite) {
            var _this = this;
            this.state = (state || new puck.polyline.PolylineState()).reset();
            this.composite = (composite || new puck.path.PathComposite()).reset();
            this.processor = {
                down: puck.polyline.down.Processor.instance,
                up: puck.path.up.Processor.instance,
                render: puck.path.render.Processor.instance,
                hit: puck.path.hit.Processor.instance,
            };
            this.stencil = puck.stencil.path;
            this.state.points.watch(function () {
                if (_this.state.path)
                    _this.state.path.reset();
            });
        };
        Polyline.prototype.points = function () {
            return this.state.points;
        };
        Polyline.prototype.closed = function (value) {
            if (arguments.length < 1)
                return this.state.closed;
            if (this.state.closed !== value) {
                this.state.closed = value;
                this.composite.invalidate();
            }
            return this;
        };
        Polyline.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Polyline.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Polyline.prototype.width = function (value) {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        };
        Polyline.prototype.height = function (value) {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.stretch | DirtyFlags.transform);
            }
            return this;
        };
        Polyline.prototype.stretch = function (value) {
            if (arguments.length < 1)
                return this.state.stretch;
            if (this.state.stretch !== value) {
                this.state.stretch = value;
                this.composite.taint(DirtyFlags.stretch);
            }
            return this;
        };
        Polyline.prototype.path = function (value) {
            if (arguments.length < 1)
                return this.state.path;
            if (this.state.path !== value) {
                this.state.path = value;
                this.composite.bounder.setPath(value);
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        Polyline.prototype.fillRule = function (value) {
            if (arguments.length < 1)
                return this.state.fillRule;
            if (this.state.fillRule !== value) {
                this.state.fillRule = value;
                this.composite.invalidate();
            }
            return this;
        };
        Polyline.prototype.strokeLineCap = function (value) {
            if (arguments.length < 1)
                return this.state.strokeLineCap;
            if (this.state.strokeLineCap !== value) {
                this.state.strokeLineCap = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        Polyline.prototype.strokeLineJoin = function (value) {
            if (arguments.length < 1)
                return this.state.strokeLineJoin;
            if (this.state.strokeLineJoin !== value) {
                this.state.strokeLineJoin = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        Polyline.prototype.strokeMiterLimit = function (value) {
            if (arguments.length < 1)
                return this.state.strokeMiterLimit;
            if (this.state.strokeMiterLimit !== value) {
                this.state.strokeMiterLimit = value;
                this.composite
                    .taint(DirtyFlags.padding)
                    .invalidate();
            }
            return this;
        };
        return Polyline;
    })(puck.Visual);
    puck.Polyline = Polyline;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var tmpCanvas = document.createElement('canvas');
    var tmpCtx = tmpCanvas.getContext('2d');
    var epsilon = 1E-10;
    var fallbackColor = puck.Color.fromHex("#FF000000");
    var RadialGradientBrush = (function (_super) {
        __extends(RadialGradientBrush, _super);
        function RadialGradientBrush() {
            _super.apply(this, arguments);
            this.$center = { x: 0.5, y: 0.5 };
            this.$origin = { x: 0.5, y: 0.5 };
            this.$radius = { x: 0.5, y: 0.5 };
        }
        RadialGradientBrush.prototype.center = function (value) {
            if (arguments.length < 1)
                return this.$center;
            if (this.$center !== value) {
                this.$center = value;
                Object.freeze(value);
                this.$changer.on();
            }
            return this;
        };
        RadialGradientBrush.prototype.origin = function (value) {
            if (arguments.length < 1)
                return this.$origin;
            if (this.$origin !== value) {
                this.$origin = value;
                Object.freeze(value);
                this.$changer.on();
            }
            return this;
        };
        RadialGradientBrush.prototype.radiusX = function (value) {
            if (arguments.length < 1)
                return this.$radius.x;
            if (this.$radius.x !== value) {
                this.$radius.x = value;
                this.$changer.on();
            }
            return this;
        };
        RadialGradientBrush.prototype.radiusY = function (value) {
            if (arguments.length < 1)
                return this.$radius.y;
            if (this.$radius.y !== value) {
                this.$radius.y = value;
                this.$changer.on();
            }
            return this;
        };
        RadialGradientBrush.prototype.createPad = function (ctx, region) {
            var data = this.getPointData(region);
            var grd = (!data.balanced ? tmpCtx : ctx).createRadialGradient(data.x0, data.y0, 0, data.x1, data.y1, data.r1);
            for (var it = this.stops().iter(), result = it.next(); !result.done; result = it.next()) {
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
            var allStops = this.stops().paddedIter();
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
            var mcenter = this.mapPoint(bounds, this.$center);
            var morigin = this.mapPoint(bounds, this.$origin);
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
        var color = (stop.color || fallbackColor).toString();
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
        Rectangle.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Rectangle.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Rectangle.prototype.width = function (value) {
            if (arguments.length < 1)
                return this.state.size.width;
            if (this.state.size.width !== value) {
                this.state.size.width = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
            return this;
        };
        Rectangle.prototype.height = function (value) {
            if (arguments.length < 1)
                return this.state.size.height;
            if (this.state.size.height !== value) {
                this.state.size.height = value;
                this.composite.taint(DirtyFlags.transform | DirtyFlags.extents);
            }
            return this;
        };
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
            this.color(new puck.Color(color));
        }
        SolidColorBrush.prototype.color = function (value) {
            if (arguments.length < 1)
                return this.$color;
            if (!puck.Color.equals(this.$color, value)) {
                this.$changer.on();
            }
            this.$color = value;
            return this;
        };
        SolidColorBrush.prototype.watch = function (onChanged) {
            return this.$changer.watch(onChanged);
        };
        SolidColorBrush.prototype.setup = function (ctx, region) {
        };
        SolidColorBrush.prototype.toHtml5Object = function () {
            return this.color().toString();
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
    var DirtyFlags = puck.element.DirtyFlags;
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(state, composite) {
            _super.call(this, state, composite);
            this.$fillwatch = null;
            this.$strokewatch = null;
        }
        Text.prototype.init = function (state, composite) {
            this.state = (state || new puck.text.TextState()).reset();
            this.composite = (composite || new puck.element.ElementComposite()).reset();
            this.processor = {
                down: puck.element.down.Processor.instance,
                up: puck.text.up.Processor.instance,
                render: puck.text.render.Processor.instance,
                hit: puck.text.hit.Processor.instance,
            };
            this.stencil = puck.stencil.empty;
        };
        Text.prototype.fill = function (value) {
            var _this = this;
            if (arguments.length < 1)
                return this.state.fill;
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
            return this;
        };
        Text.prototype.stroke = function (value) {
            var _this = this;
            if (arguments.length < 1)
                return this.state.stroke;
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
            return this;
        };
        Text.prototype.strokeThickness = function (value) {
            if (arguments.length < 1)
                return this.state.strokeThickness;
            if (value !== this.state.strokeThickness) {
                this.state.strokeThickness = value;
                this.composite.taint(DirtyFlags.padding);
            }
            return this;
        };
        Text.prototype.x = function (value) {
            if (arguments.length < 1)
                return this.state.offset.x;
            if (this.state.offset.x !== value) {
                this.state.offset.x = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Text.prototype.y = function (value) {
            if (arguments.length < 1)
                return this.state.offset.y;
            if (this.state.offset.y !== value) {
                this.state.offset.y = value;
                this.composite.taint(DirtyFlags.transform);
            }
            return this;
        };
        Text.prototype.text = function (value) {
            if (arguments.length < 1)
                return this.state.text;
            this.state.text = value;
            this.composite.taint(DirtyFlags.font);
            return this;
        };
        Text.prototype.fontFamily = function (value) {
            if (arguments.length < 1)
                return this.state.font.family;
            if (this.state.font.family !== value) {
                this.state.font.family = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        };
        Text.prototype.fontSize = function (value) {
            if (arguments.length < 1)
                return this.state.font.size;
            if (this.state.font.size !== value) {
                this.state.font.size = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        };
        Text.prototype.fontStretch = function (value) {
            if (arguments.length < 1)
                return this.state.font.stretch;
            if (this.state.font.stretch !== value) {
                this.state.font.stretch = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        };
        Text.prototype.fontStyle = function (value) {
            if (arguments.length < 1)
                return this.state.font.style;
            if (this.state.font.style !== value) {
                this.state.font.style = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        };
        Text.prototype.fontWeight = function (value) {
            if (arguments.length < 1)
                return this.state.font.weight;
            if (this.state.font.weight !== value) {
                this.state.font.weight = value;
                this.composite.taint(DirtyFlags.font);
            }
            return this;
        };
        return Text;
    })(puck.Element);
    puck.Text = Text;
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
            ElementState.prototype.mapTransformOrigin = function (comp) {
                var to = this.transformOrigin, size = this.size;
                return {
                    x: to.x * size.width,
                    y: to.y * size.height
                };
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
        function hit(el, ctx, pos, hitlist) {
            var processor = el.processor.hit;
            processor.process(el, ctx, pos, hitlist);
        }
        engine.hit = hit;
    })(engine = puck.engine || (puck.engine = {}));
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
            function RenderContext() {
                this.$$transforms = [];
                this.currentTransform = mat3.identity();
                Object.defineProperties(this, {
                    "currentTransform": { value: mat3.identity(), writable: false },
                    "hasFillRule": { value: RenderContext.hasFillRule, writable: false },
                    "size": { value: new render.RenderContextSize(), writable: false },
                });
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
            RenderContext.prototype.init = function (ctx) {
                Object.defineProperties(this, {
                    "raw": { value: ctx, writable: false }
                });
                this.size.init(ctx);
                return this;
            };
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
                    var fr = fillRule === puck.FillRule.evenodd ? "evenodd" : "nonzero";
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
            RenderContext.prototype.isPointInStrokeEx = function (x, y, thickness) {
                var raw = this.raw;
                raw.lineWidth = thickness;
                return raw.isPointInStroke(x, y);
            };
            RenderContext.prototype.setStrokeExtras = function (lineCap, lineJoin, miterLimit) {
                var raw = this.raw;
                raw.lineCap = caps[lineCap || 0] || caps[0];
                raw.lineJoin = joins[lineJoin || 0] || joins[0];
                raw.miterLimit = miterLimit;
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
    var fit;
    (function (fit) {
        var extents;
        (function (extents_1) {
            var rect = la.rect;
            function calc(extents, stretch, natural, size) {
                if (rect.isEmpty(natural))
                    size.width = size.height = 0;
                var fitter = fits[stretch];
                fitter && fitter(extents, natural, size);
            }
            extents_1.calc = calc;
            var fits = {};
            fits[puck.Stretch.none] = function (final, natural, size) {
                la.rect.copyTo(natural, final);
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
        })(extents = fit.extents || (fit.extents = {}));
    })(fit = puck.fit || (puck.fit = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var fit;
    (function (fit) {
        var transform;
        (function (transform_1) {
            var mat3 = la.mat3;
            function calc(transform, stretch, natural, size) {
                var fitter = fits[stretch];
                fitter && fitter(transform, natural, size);
            }
            transform_1.calc = calc;
            var fits = {};
            fits[puck.Stretch.none] = function (mat, natural, size) {
                mat3.identity(mat);
            };
            fits[puck.Stretch.fill] = function (mat, natural, size) {
                mat3.createTranslate(-natural.x, -natural.y, mat);
                mat3.scale(mat, size.width / natural.width, size.height / natural.height);
            };
            fits[puck.Stretch.uniform] = function (mat, natural, size) {
                mat3.createTranslate(-natural.x, -natural.y, mat);
                var smin = Math.min(size.width / natural.width, size.height / natural.height);
                mat3.scale(mat, smin, smin);
            };
            fits[puck.Stretch.uniformToFill] = function (mat, natural, size) {
                mat3.createTranslate(-natural.x, -natural.y, mat);
                var smax = Math.max(size.width / natural.width, size.height / natural.height);
                mat3.scale(mat, smax, smax);
            };
        })(transform = fit.transform || (fit.transform = {}));
    })(fit = puck.fit || (puck.fit = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var font;
    (function (font_1) {
        function toString(font) {
            var s = "";
            s += font.style.toString() + " ";
            s += "normal ";
            s += font.weight.toString() + " ";
            s += font.size + "px ";
            s += font.family.toString();
            return s;
        }
        font_1.toString = toString;
    })(font = puck.font || (puck.font = {}));
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
                this.natural = la.rect.init(0, 0, 0, 0);
            }
            ImageState.prototype.reset = function () {
                _super.prototype.reset.call(this);
                this.source.reset();
                this.stretch = puck.Stretch.none;
                la.rect.init(0, 0, 0, 0, this.natural);
                return this;
            };
            ImageState.prototype.getEffectiveStretch = function () {
                var size = this.size, natural = this.natural;
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
    var path;
    (function (path_1) {
        var FillBounds = curve.bounds.fill.FillBounds;
        var StrokeBounds = curve.bounds.stroke.StrokeBounds;
        var Bounder = (function () {
            function Bounder() {
                this.$path = null;
                this.$filled = null;
                this.$stroked = null;
                this.$pars = {
                    strokeThickness: 0,
                    strokeDashArray: null,
                    strokeDashCap: curve.PenLineCap.Flat,
                    strokeDashOffset: 0,
                    strokeEndLineCap: curve.PenLineCap.Flat,
                    strokeLineJoin: curve.PenLineJoin.Miter,
                    strokeMiterLimit: 10,
                    strokeStartLineCap: curve.PenLineCap.Flat,
                };
            }
            Bounder.prototype.getPath = function () {
                return this.$path;
            };
            Bounder.prototype.setPath = function (path) {
                if (this.$path === path)
                    return;
                this.$path = path;
                if (!path) {
                    this.$filled = null;
                    this.$stroked = null;
                }
                else {
                    this.$filled = new FillBounds(path);
                    this.$stroked = new StrokeBounds(path);
                    this.$stroked.pars = this.$pars;
                }
            };
            Bounder.prototype.reset = function () {
                if (this.$filled)
                    this.$filled.reset();
                if (this.$stroked)
                    this.$stroked.reset();
            };
            Bounder.prototype.getFillRect = function (dest) {
                var box = this.$filled;
                if (!box) {
                    la.rect.init(0, 0, 0, 0, dest);
                }
                else {
                    dest.x = box.l;
                    dest.y = box.t;
                    dest.width = box.r - box.l;
                    dest.height = box.b - box.t;
                }
                return this;
            };
            Bounder.prototype.getStrokeRect = function (dest) {
                var box = this.$stroked;
                if (!box) {
                    la.rect.init(0, 0, 0, 0, dest);
                }
                else {
                    dest.x = box.l;
                    dest.y = box.t;
                    dest.width = box.r - box.l;
                    dest.height = box.b - box.t;
                }
                return this;
            };
            Bounder.prototype.calc = function (state) {
                var stroked = this.$stroked, filled = this.$filled;
                if (stroked) {
                    if (!!state.stroke && state.strokeThickness > 0) {
                        this.setStroke(state);
                        stroked.ensure();
                    }
                    else {
                        stroked.reset();
                    }
                }
                if (filled) {
                    filled.ensure();
                }
                return this;
            };
            Bounder.prototype.setStroke = function (state) {
                var pars = this.$pars;
                pars.strokeThickness = state.strokeThickness;
                pars.strokeStartLineCap = state.strokeLineCap;
                pars.strokeLineJoin = state.strokeLineJoin;
                pars.strokeMiterLimit = state.strokeMiterLimit;
            };
            return Bounder;
        })();
        path_1.Bounder = Bounder;
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var path;
    (function (path) {
        var PathComposite = (function (_super) {
            __extends(PathComposite, _super);
            function PathComposite() {
                _super.apply(this, arguments);
                this.stretchTransform = la.mat3.identity();
                this.natural = la.rect.init(0, 0, 0, 0);
                this.bounder = new path.Bounder();
            }
            PathComposite.prototype.reset = function () {
                _super.prototype.reset.call(this);
                la.mat3.identity(this.stretchTransform);
                la.rect.init(0, 0, 0, 0, this.natural);
                this.bounder.reset();
                return this;
            };
            return PathComposite;
        })(puck.element.ElementComposite);
        path.PathComposite = PathComposite;
    })(path = puck.path || (puck.path = {}));
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
    var path;
    (function (path) {
        var PathState = (function (_super) {
            __extends(PathState, _super);
            function PathState() {
                _super.apply(this, arguments);
                this.path = null;
                this.stretch = puck.Stretch.none;
                this.fillRule = puck.FillRule.evenodd;
                this.strokeLineCap = puck.PenLineCap.flat;
                this.strokeLineJoin = puck.PenLineJoin.miter;
                this.strokeMiterLimit = 10;
            }
            PathState.prototype.reset = function () {
                _super.prototype.reset.call(this);
                this.path = null;
                this.stretch = puck.Stretch.none;
                this.fillRule = puck.FillRule.evenodd;
                this.strokeLineCap = puck.PenLineCap.flat;
                this.strokeLineJoin = puck.PenLineJoin.miter;
                this.strokeMiterLimit = 10;
                return this;
            };
            PathState.prototype.getEffectiveStretch = function (comp) {
                var size = this.size, natural = comp.natural;
                if (size.width <= 0 || size.height <= 0) {
                    return puck.Stretch.none;
                }
                if (natural.width <= 0 || natural.height <= 0) {
                    return puck.Stretch.none;
                }
                return this.stretch;
            };
            PathState.prototype.mapTransformOrigin = function (comp) {
                var to = this.transformOrigin;
                var final = la.rect.init(0, 0, 0, 0);
                puck.fit.extents.calc(final, this.getEffectiveStretch(comp), comp.natural, this.size);
                return {
                    x: final.x + (to.x * final.width),
                    y: final.y + (to.y * final.height),
                };
            };
            return PathState;
        })(puck.visual.VisualState);
        path.PathState = PathState;
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var polyline;
    (function (polyline) {
        var PolylineState = (function (_super) {
            __extends(PolylineState, _super);
            function PolylineState() {
                _super.apply(this, arguments);
                this.points = new puck.Points();
                this.closed = false;
            }
            PolylineState.prototype.reset = function () {
                _super.prototype.reset.call(this);
                this.points.clear();
                this.closed = false;
                return this;
            };
            return PolylineState;
        })(puck.path.PathState);
        polyline.PolylineState = PolylineState;
    })(polyline = puck.polyline || (puck.polyline = {}));
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
    var stencil;
    (function (stencil) {
        stencil.path = {
            draft: function (bag) {
                var comp = bag.composite;
                comp.bounder
                    .getFillRect(bag.fillRect)
                    .getStrokeRect(bag.strokeRect);
            },
            draw: function (ctx, bag) {
                var fr = bag.fillRect;
                if (fr.width <= 0 || fr.height <= 0) {
                    return;
                }
                var raw = ctx.raw, state = bag.state;
                raw.beginPath();
                state.path.draw(raw);
            },
        };
    })(stencil = puck.stencil || (puck.stencil = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var text;
    (function (text) {
        var ElementState = puck.element.ElementState;
        var TextState = (function (_super) {
            __extends(TextState, _super);
            function TextState() {
                _super.apply(this, arguments);
            }
            TextState.prototype.reset = function () {
                _super.prototype.reset.call(this);
                this.fill = null;
                this.stroke = null;
                this.strokeThickness = 0;
                var f;
                f = {
                    family: puck.defaultFont.family,
                    size: puck.defaultFont.size,
                    stretch: puck.defaultFont.stretch,
                    style: puck.defaultFont.style,
                    weight: puck.defaultFont.weight,
                    toString: function () {
                        return puck.font.toString(f);
                    },
                };
                this.font = f;
                this.text = "";
                return this;
            };
            return TextState;
        })(ElementState);
        text.TextState = TextState;
    })(text = puck.text || (puck.text = {}));
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
        var hit;
        (function (hit) {
            var mat3 = la.mat3;
            var vec2 = la.vec2;
            var rect = la.rect;
            var Processor = (function () {
                function Processor() {
                }
                Processor.prototype.process = function (el, ctx, pos, hitlist) {
                    if (!this.prehit(el, ctx, pos))
                        return;
                    ctx.save();
                    ctx.preapply(el.composite.transform);
                    var inside = false;
                    if (this.hit(el, ctx, pos, hitlist)) {
                        inside = true;
                        hitlist.unshift(el);
                    }
                    ctx.restore();
                    return inside;
                };
                Processor.prototype.prehit = function (el, ctx, pos) {
                    var comp = el.composite;
                    if (!comp.visible || (comp.opacity * 255) < 0.5)
                        return false;
                    var localpos = mat3.transformVec2(ctx.currentTransform, pos, vec2.create(0, 0));
                    return rect.containsVec2(comp.extents, localpos);
                };
                Processor.prototype.hit = function (el, ctx, pos, hitlist) {
                    return false;
                };
                Processor.prototype.draw = function (el, ctx) {
                    var sbag = {
                        state: el.state,
                        composite: el.composite,
                        fillRect: null,
                        strokeRect: null,
                    };
                    el.stencil.draw(ctx, sbag);
                };
                Processor.instance = new Processor();
                return Processor;
            })();
            hit.Processor = Processor;
        })(hit = element.hit || (element.hit = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var hit;
        (function (hit) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.hit = function (el, ctx, pos, hitlist) {
                    for (var walker = el.walk(true), cur = walker.next(); !!cur; cur = walker.next()) {
                        if (puck.engine.hit(el, ctx, pos, hitlist))
                            return true;
                    }
                    return false;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.hit.Processor);
            hit.Processor = Processor;
        })(hit = container.hit || (container.hit = {}));
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
                    var xo = state.mapTransformOrigin(comp);
                    mat3.createTranslate(-xo.x, -xo.y, comp.transform);
                    mat3.apply(comp.transform, state.transform);
                    mat3.translate(comp.transform, xo.x, xo.y);
                    mat3.translate(comp.transform, state.offset.x, state.offset.y);
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
    var font;
    (function (font_2) {
        var height;
        (function (height_1) {
            var heights = [];
            height_1.cache = {
                hits: 0,
                misses: 0
            };
            function get(font) {
                var serial = font.toString();
                var height = heights[serial];
                if (height == null) {
                    heights[serial] = height = height_1.measure(serial);
                    height_1.cache.misses++;
                }
                else {
                    height_1.cache.hits++;
                }
                return height;
            }
            height_1.get = get;
        })(height = font_2.height || (font_2.height = {}));
    })(font = puck.font || (puck.font = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var font;
    (function (font_3) {
        var height;
        (function (height) {
            var dummy;
            function measure(font) {
                var serial = font.toString();
                if (!dummy) {
                    dummy = document.createElement("div");
                    dummy.appendChild(document.createTextNode("Hg"));
                    document.body.appendChild(dummy);
                }
                dummy.style.display = "";
                dummy.style.font = serial;
                var result = dummy.offsetHeight;
                dummy.style.display = "none";
                return result;
            }
            height.measure = measure;
        })(height = font_3.height || (font_3.height = {}));
    })(font = puck.font || (puck.font = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var font;
    (function (font_4) {
        var width;
        (function (width) {
            var dummy;
            function measure(font, text) {
                if (!dummy) {
                    dummy = document.createElement("canvas");
                }
                var ctx = dummy.getContext("2d");
                ctx.font = font.toString();
                return ctx.measureText(text).width;
            }
            width.measure = measure;
        })(width = font_4.width || (font_4.width = {}));
    })(font = puck.font || (puck.font = {}));
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
            (function (stretch) {
                var DirtyFlags = puck.element.DirtyFlags;
                var mat3 = la.mat3;
                var oldStretchTransform = mat3.identity();
                function process(bag) {
                    var state = bag.state, comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.stretch))
                        return false;
                    mat3.copyTo(comp.stretchTransform, oldStretchTransform);
                    puck.fit.transform.calc(comp.stretchTransform, state.getEffectiveStretch(), state.natural, state.size);
                    if (mat3.equal(comp.stretchTransform, oldStretchTransform))
                        return false;
                    comp.taint(DirtyFlags.extents);
                    return true;
                }
                stretch.process = process;
            })(stretch = down.stretch || (down.stretch = {}));
        })(down = image.down || (image.down = {}));
    })(image = puck.image || (puck.image = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var image;
    (function (image) {
        var hit;
        (function (hit) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.hit = function (el, ctx, pos, hitlist) {
                    return true;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.hit.Processor);
            hit.Processor = Processor;
        })(hit = image.hit || (image.hit = {}));
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
                    puck.fit.extents.calc(comp.extents, state.getEffectiveStretch(), state.natural, state.size);
                    rect.transform(comp.extents, comp.transform, comp.extents);
                    if (rect.equal(comp.extents, oldExtents))
                        return false;
                    rect.union(comp.paint, oldExtents);
                    comp.taint(DirtyFlags.newbounds);
                    return true;
                }
                extents.process = process;
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
var puck;
(function (puck) {
    var path;
    (function (path) {
        var down;
        (function (down) {
            var natural;
            (function (natural) {
                var DirtyFlags = puck.element.DirtyFlags;
                var oldNatural = la.rect.init(0, 0, 0, 0);
                var activeFill = la.rect.init(0, 0, 0, 0);
                var activeStroke = la.rect.init(0, 0, 0, 0);
                function process(bag) {
                    var state = bag.state, comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.padding))
                        return false;
                    comp.bounder.reset();
                    la.rect.copyTo(comp.natural, oldNatural);
                    comp.bounder.calc(state)
                        .getFillRect(activeFill)
                        .getStrokeRect(activeStroke);
                    la.rect.union(activeFill, activeStroke, comp.natural);
                    if (!la.rect.equal(comp.natural, oldNatural))
                        return false;
                    comp.taint(DirtyFlags.stretch);
                    return true;
                }
                natural.process = process;
            })(natural = down.natural || (down.natural = {}));
        })(down = path.down || (path.down = {}));
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var path;
    (function (path) {
        var down;
        (function (down) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    down.natural.process(bag);
                    down.stretch.process(bag);
                    return _super.prototype.process.call(this, bag);
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.down.Processor);
            down.Processor = Processor;
        })(down = path.down || (path.down = {}));
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var path;
    (function (path) {
        var down;
        (function (down) {
            var stretch;
            (function (stretch) {
                var DirtyFlags = puck.element.DirtyFlags;
                var mat3 = la.mat3;
                var oldStretchTransform = mat3.identity();
                function process(bag) {
                    var state = bag.state, comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.stretch))
                        return false;
                    mat3.copyTo(comp.stretchTransform, oldStretchTransform);
                    puck.fit.transform.calc(comp.stretchTransform, state.getEffectiveStretch(comp), comp.natural, state.size);
                    if (mat3.equal(comp.stretchTransform, oldStretchTransform))
                        return false;
                    comp.taint(DirtyFlags.extents);
                    return true;
                }
                stretch.process = process;
            })(stretch = down.stretch || (down.stretch = {}));
        })(down = path.down || (path.down = {}));
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var visual;
    (function (visual) {
        var hit;
        (function (hit) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.prehit = function (el, ctx, pos) {
                    if (!_super.prototype.prehit.call(this, el, ctx, pos))
                        return false;
                    var state = el.state;
                    return !!state.fill || (!!state.stroke && state.strokeThickness > 0);
                };
                Processor.prototype.hit = function (el, ctx, pos, hitlist) {
                    ctx.save();
                    this.transformLocal(el, ctx);
                    this.draw(el, ctx);
                    var state = el.state, px = pos[0], py = pos[1], inside = false;
                    if (!!state.fill && ctx.raw.isPointInPath(px, py)) {
                        inside = true;
                    }
                    else if (!!state.stroke && ctx.isPointInStrokeEx(px, py, state.strokeThickness)) {
                        inside = true;
                    }
                    ctx.restore();
                    return inside;
                };
                Processor.prototype.transformLocal = function (el, ctx) {
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.hit.Processor);
            hit.Processor = Processor;
        })(hit = visual.hit || (visual.hit = {}));
    })(visual = puck.visual || (puck.visual = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var path;
    (function (path_2) {
        var hit;
        (function (hit) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.hit = function (el, ctx, pos, hitlist) {
                    ctx.save();
                    this.transformLocal(el, ctx);
                    this.draw(el, ctx);
                    var state = el.state, px = pos[0], py = pos[1], inside = false;
                    if (!!state.fill && ctx.raw.isPointInPath(px, py)) {
                        inside = true;
                    }
                    else if (!!state.stroke) {
                        ctx.setStrokeExtras(state.strokeLineCap, state.strokeLineJoin, state.strokeMiterLimit);
                        if (ctx.isPointInStrokeEx(px, py, state.strokeThickness)) {
                            inside = true;
                        }
                    }
                    ctx.restore();
                    return inside;
                };
                Processor.prototype.transformLocal = function (path, ctx) {
                    ctx.preapply(path.composite.stretchTransform);
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.visual.hit.Processor);
            hit.Processor = Processor;
        })(hit = path_2.hit || (path_2.hit = {}));
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
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
                    this.transformLocal(ctx, sbag);
                    bag.stencil.draw(ctx, sbag);
                    this.fill(ctx, state, sbag);
                    this.stroke(ctx, state, sbag);
                    ctx.restore();
                };
                Processor.prototype.transformLocal = function (ctx, bag) {
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
var puck;
(function (puck) {
    var path;
    (function (path) {
        var render;
        (function (render) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.transformLocal = function (ctx, bag) {
                    var comp = bag.composite;
                    ctx.preapply(comp.stretchTransform);
                };
                Processor.prototype.fill = function (ctx, state, sbag) {
                    if (!state.fill)
                        return;
                    ctx.fillEx(sbag.fillRect, state.fill, state.fillRule);
                };
                Processor.prototype.stroke = function (ctx, state, sbag) {
                    if (!state.stroke || state.strokeThickness <= 0)
                        return;
                    ctx.setStrokeExtras(state.strokeLineCap, state.strokeLineJoin, state.strokeMiterLimit);
                    ctx.strokeEx(sbag.strokeRect, state.stroke, state.strokeThickness);
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.visual.render.Processor);
            render.Processor = Processor;
        })(render = path.render || (path.render = {}));
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var path;
    (function (path) {
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
                    puck.fit.extents.calc(comp.extents, state.getEffectiveStretch(comp), comp.natural, state.size);
                    rect.transform(comp.extents, comp.transform, comp.extents);
                    if (rect.equal(comp.extents, oldExtents))
                        return false;
                    rect.union(comp.paint, oldExtents);
                    comp.taint(DirtyFlags.newbounds);
                    return true;
                }
                extents.process = process;
            })(extents = up.extents || (up.extents = {}));
        })(up = path.up || (path.up = {}));
    })(path = puck.path || (puck.path = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var path;
    (function (path) {
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
        })(up = path.up || (path.up = {}));
    })(path = puck.path || (puck.path = {}));
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
    var polyline;
    (function (polyline) {
        var down;
        (function (down) {
            var points;
            (function (points) {
                var DirtyFlags = puck.element.DirtyFlags;
                function process(bag) {
                    var state = bag.state, comp = bag.composite, path = state.path;
                    if (!path) {
                        comp.bounder.setPath(path = state.path = new curve.Path());
                    }
                    else if (!path.isEmpty) {
                        return false;
                    }
                    for (var first = true, it = state.points.iter(), result = it.next(); !result.done; result = it.next()) {
                        var cur = result.value;
                        if (first) {
                            first = false;
                            path.moveTo(cur.x, cur.y);
                        }
                        else {
                            path.lineTo(cur.x, cur.y);
                        }
                    }
                    if (state.closed)
                        path.closePath();
                    comp.taint(DirtyFlags.padding);
                    return true;
                }
                points.process = process;
            })(points = down.points || (down.points = {}));
        })(down = polyline.down || (polyline.down = {}));
    })(polyline = puck.polyline || (puck.polyline = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var polyline;
    (function (polyline) {
        var down;
        (function (down) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    down.points.process(bag);
                    return _super.prototype.process.call(this, bag);
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.path.down.Processor);
            down.Processor = Processor;
        })(down = polyline.down || (polyline.down = {}));
    })(polyline = puck.polyline || (puck.polyline = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var text;
    (function (text) {
        var hit;
        (function (hit) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.prehit = function (el, ctx, pos) {
                    if (!_super.prototype.prehit.call(this, el, ctx, pos))
                        return false;
                    var state = el.state;
                    return !!state.fill || (!!state.stroke && state.strokeThickness > 0);
                };
                Processor.prototype.hit = function (el, ctx, pos, hitlist) {
                    return true;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.hit.Processor);
            hit.Processor = Processor;
        })(hit = text.hit || (text.hit = {}));
    })(text = puck.text || (puck.text = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var text;
    (function (text) {
        var render;
        (function (render) {
            var isFirefox = /firefox/i.test(navigator.userAgent);
            var paintRegion = la.rect.init(0, 0, 0, 0);
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.render = function (bag) {
                    var state = bag.state, noStroke = !state.stroke || state.strokeThickness <= 0;
                    if (!state.fill && noStroke)
                        return false;
                    var ctx = bag.ctx, raw = ctx.raw, comp = bag.composite;
                    ctx.save();
                    raw.beginPath();
                    raw.font = state.font.toString();
                    raw.textAlign = "left";
                    paintRegion.width = comp.extents.width;
                    paintRegion.height = comp.extents.height;
                    if (state.fill)
                        this.fill(raw, state, paintRegion);
                    if (!noStroke)
                        this.stroke(raw, state, paintRegion);
                    ctx.restore();
                };
                Processor.prototype.fill = function (ctx, state, region) {
                    state.fill.setup(ctx, region);
                    ctx.fillStyle = state.fill.toHtml5Object();
                    if (isFirefox) {
                        ctx.textBaseline = "bottom";
                        ctx.fillText(state.text, 0, state.size.height);
                    }
                    else {
                        ctx.textBaseline = "top";
                        ctx.fillText(state.text, 0, 0);
                    }
                };
                Processor.prototype.stroke = function (ctx, state, region) {
                    state.stroke.setup(ctx, region);
                    ctx.strokeStyle = state.stroke.toHtml5Object();
                    ctx.lineWidth = state.strokeThickness;
                    if (isFirefox) {
                        ctx.textBaseline = "bottom";
                        ctx.strokeText(state.text, 0, state.size.height);
                    }
                    else {
                        ctx.textBaseline = "top";
                        ctx.strokeText(state.text, 0, 0);
                    }
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.render.Processor);
            render.Processor = Processor;
        })(render = text.render || (text.render = {}));
    })(text = puck.text || (puck.text = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var text;
    (function (text) {
        var up;
        (function (up) {
            var font;
            (function (font) {
                var DirtyFlags = puck.element.DirtyFlags;
                function process(bag) {
                    var state = bag.state, comp = bag.composite;
                    if (!comp.hasDirt(DirtyFlags.font))
                        return false;
                    var size = state.size, oldWidth = size.width, oldHeight = size.height;
                    size.width = puck.font.width.measure(state.font, state.text);
                    size.height = puck.font.height.get(state.font);
                    if (oldWidth !== size.width || oldHeight !== size.height) {
                        comp.taint(DirtyFlags.extents);
                        return true;
                    }
                    return false;
                }
                font.process = process;
            })(font = up.font || (up.font = {}));
        })(up = text.up || (text.up = {}));
    })(text = puck.text || (puck.text = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var text;
    (function (text) {
        var up;
        (function (up) {
            var DirtyFlags = puck.element.DirtyFlags;
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    var dirt = DirtyFlags.none;
                    up.font.process(bag);
                    dirt |= _super.prototype.process.call(this, bag);
                    return dirt;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.up.Processor);
            up.Processor = Processor;
        })(up = text.up || (text.up = {}));
    })(text = puck.text || (puck.text = {}));
})(puck || (puck = {}));

//# sourceMappingURL=puck.js.map
