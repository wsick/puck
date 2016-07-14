namespace puck.image.mock {
    export function state(): puck.image.IImageState {
        return new ImageState();
    }

    export function composite(): puck.image.IImageComposite {
        return new ImageComposite();
    }
}