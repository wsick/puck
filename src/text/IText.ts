namespace puck.text {
    export interface IText extends element.IElement {
        state: ITextState;
    }
    export interface ITextProcessor {
        down: element.down.Processor;
        up: text.up.Processor;
        render: text.render.Processor;
        hit: text.hit.Processor;
    }
}