namespace puck.text {
    export interface IText extends visual.IVisual {
        state: ITextState;
    }
    export interface ITextProcessor {
        down: element.down.Processor;
        up: text.up.Processor;
        render: visual.render.Processor;
        hit: visual.hit.Processor;
    }
}