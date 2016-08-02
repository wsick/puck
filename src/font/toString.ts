namespace puck.font {
    export function toString(font: IFont): string {
        //Format: font-style font-variant font-weight font-size/line-height font-family
        //Font Styles: normal, italic, oblique
        //Font Variants: normal, small-caps
        //Font Weights: normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900
        var s = "";
        s += font.style.toString() + " ";
        s += "normal ";
        s += (<number>font.weight).toString() + " ";
        s += font.size + "px ";
        s += font.family.toString();
        return s;
    }
}