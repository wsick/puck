namespace puck.image.down.stretch.tests {
    import DirtyFlags = puck.element.DirtyFlags;
    import rect = la.rect;

    QUnit.module("image.down.stretch");

    QUnit.test("none", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.natural;

        state.stretch = Stretch.none;
        comp.untaint(DirtyFlags.down | DirtyFlags.up);
        comp.taint(DirtyFlags.stretch);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        ok(!stretch.process(bag));

        la.mat3.createScale(2, 2, comp.stretchTransform);

        ok(stretch.process(bag));
        deepEqual(comp.stretchTransform, la.mat3.identity());
        ok(comp.hasDirt(DirtyFlags.extents));
    });

    QUnit.test("fill", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.natural;

        state.stretch = Stretch.fill;
        comp.untaint(DirtyFlags.down | DirtyFlags.up);
        comp.taint(DirtyFlags.stretch);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        ok(stretch.process(bag));
        deepEqual(comp.stretchTransform, la.mat3.createScale(2, 4));
        ok(comp.hasDirt(DirtyFlags.extents));
    });

    QUnit.test("uniform", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.natural;

        state.stretch = Stretch.uniform;
        comp.untaint(DirtyFlags.down | DirtyFlags.up);
        comp.taint(DirtyFlags.stretch);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        ok(stretch.process(bag));
        deepEqual(comp.stretchTransform, la.mat3.createScale(2, 2));
        ok(comp.hasDirt(DirtyFlags.extents));
    });

    QUnit.test("uniformToFill", () => {
        var bag = mock.bag(),
            state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite,
            size = state.size,
            natural = state.natural;

        state.stretch = Stretch.uniformToFill;
        comp.untaint(DirtyFlags.down | DirtyFlags.up);
        comp.taint(DirtyFlags.stretch);
        size.width = 200;
        size.height = 400;
        natural.width = 100;
        natural.height = 100;

        ok(stretch.process(bag));
        deepEqual(comp.stretchTransform, la.mat3.createScale(4, 4));
        ok(comp.hasDirt(DirtyFlags.extents));
    });
}