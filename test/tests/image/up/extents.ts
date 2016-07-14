namespace puck.image.up.extents.tests {
    import DirtyFlags = puck.element.DirtyFlags;
    import rect = la.rect;

    QUnit.module("image.up.extents");

    QUnit.test("none", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.naturalSize;

        state.stretch = Stretch.none;
        rect.init(0, 0, 0, 0, comp.extents);
        comp.taint(DirtyFlags.extents);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        extents.process(bag);

        deepEqual(comp.extents, rect.init(0, 0, 100, 100));
    });

    QUnit.test("fill", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.naturalSize;

        state.stretch = Stretch.fill;
        rect.init(0, 0, 0, 0, comp.extents);
        comp.taint(DirtyFlags.extents);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        extents.process(bag);

        deepEqual(comp.extents, rect.init(0, 0, 200, 400));
    });

    QUnit.test("uniform", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.naturalSize;

        state.stretch = Stretch.uniform;
        rect.init(0, 0, 0, 0, comp.extents);
        comp.taint(DirtyFlags.extents);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        extents.process(bag);

        deepEqual(comp.extents, rect.init(0, 0, 200, 200));
    });

    QUnit.test("uniformToFill", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.naturalSize;

        state.stretch = Stretch.uniformToFill;
        rect.init(0, 0, 0, 0, comp.extents);
        comp.taint(DirtyFlags.extents);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        extents.process(bag);

        deepEqual(comp.extents, rect.init(0, 0, 400, 400));
    });
}