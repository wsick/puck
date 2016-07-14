namespace puck.container.mock {
    export function state(): puck.container.IContainerState {
        return new ContainerState();
    }

    export function composite(): puck.container.IContainerComposite {
        return new ContainerComposite();
    }
}