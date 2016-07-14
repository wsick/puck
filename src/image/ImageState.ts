namespace puck.image {
    export interface IImageState extends element.IElementState {
        source: IImageSource;
    }

    export class ImageState extends element.ElementState implements IImageState {
        source: IImageSource = new ImageSource();

        reset() {
            super.reset();
            this.source.reset();
        }
    }
}