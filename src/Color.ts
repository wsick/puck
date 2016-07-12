namespace puck {
    var NoAlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    var AlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;

    export class Color {
        r: number = 0;
        g: number = 0;
        b: number = 0;
        a: number = 1.0;

        constructor(color?: Color|string) {
            if (color instanceof Color) {
                this.r = color.r;
                this.g = color.g;
                this.b = color.b;
                this.a = color.a;
            } else if (typeof color === "string") {
                parse(this, color);
            }
        }

        add(color2: Color) {
            var c = new Color();
            c.r = this.r + color2.r;
            c.g = this.g + color2.g;
            c.b = this.b + color2.b;
            c.a = this.a + color2.a;
            return c;
        }

        subtract(color2: Color) {
            var c = new Color();
            c.r = this.r - color2.r;
            c.g = this.g - color2.g;
            c.b = this.b - color2.b;
            c.a = this.a - color2.a;
            return c;
        }

        multiply(factor: number) {
            var c = new Color();
            c.r = this.r * factor;
            c.g = this.g * factor;
            c.b = this.b * factor;
            c.a = this.a * factor;
            return c;
        }

        toString() {
            var r = Math.round(this.r) || 0;
            var g = Math.round(this.g) || 0;
            var b = Math.round(this.b) || 0;
            var a = this.a || 0;
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        toHexString(): string {
            var ah = (this.a * 255).toString(16),
                rh = this.r.toString(16),
                gh = this.g.toString(16),
                bh = this.b.toString(16);
            return `#${ah}${rh}${gh}${bh}`;
        }

        toHexStringNoAlpha(): string {
            var rh = this.r.toString(16),
                gh = this.g.toString(16),
                bh = this.b.toString(16);
            return `#${rh}${gh}${bh}`;
        }

        static equals(color1: Color, color2: Color): boolean {
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
        }

        static lerp(start: Color, end: Color, p: number): Color {
            var c = new Color();
            c.r = start.r + (end.r - start.r) * p;
            c.g = start.g + (end.g - start.g) * p;
            c.b = start.b + (end.b - start.b) * p;
            c.a = start.a + (end.a - start.a) * p;
            return c;
        }

        static fromRgba(r: number, g: number, b: number, a: number): Color {
            var c = new Color();
            c.r = r;
            c.g = g;
            c.b = b;
            c.a = a;
            return c;
        }

        static fromHex(hex: string): Color {
            var c = new Color();
            parseHex(c, hex);
            return c;
        }
    }

    export var KnownColors = {
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

    function parse(c: Color, s: string) {
        if (s[0] === "#") {
            parseHex(c, s);
        } else {
            var known = KnownColors[s];
            c.r = known.r;
            c.g = known.g;
            c.b = known.b;
            c.a = known.a;
        }
    }

    function parseHex(c: Color, hex: string) {
        var match;
        if ((match = AlphaRegex.exec(hex)) != null) {
            c.a = parseInt(match[1], 16) / 255.0;
            c.r = parseInt(match[2], 16);
            c.g = parseInt(match[3], 16);
            c.b = parseInt(match[4], 16);
        } else if ((match = NoAlphaRegex.exec(hex)) != null) {
            c.a = 1.0;
            c.r = parseInt(match[1], 16);
            c.g = parseInt(match[2], 16);
            c.b = parseInt(match[3], 16);
        }
    }
}