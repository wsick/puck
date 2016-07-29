namespace puck {
    export var FontStyle = {
        normal: "normal",
        italic: "italic",
        oblique: "oblique"
    };

    export var FontStretch = {
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

    export enum FontWeight {
        thin = 100,
        extraLight = 200,
        light = 300,
        normal = 400,
        medium = 500,
        semiBold = 600,
        bold = 700,
        extraBold = 800,
        black = 900,
        extraBlack = 950,
    }

    export interface IFont {
        family: string;
        size: number;
        stretch: string;
        style: string;
        weight: FontWeight;
        toString(): string;
    }

    export var defaultFont: IFont = {
        family: "",
        size: 14,
        stretch: FontStretch.normal,
        style: FontStyle.normal,
        weight: FontWeight.normal,
        toString(): string {
            return font.toString(defaultFont);
        },
    };
}