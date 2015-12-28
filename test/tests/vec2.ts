namespace puck.vec2.tests {
    QUnit.module("vec2");

    function toArray(f32arr: Float32Array): number[] {
        return Array.prototype.slice.call(f32arr, 0);
    }

    QUnit.test("create", (assert) => {
        var vec = create(1, 2);
        assert.ok(vec instanceof Float32Array);
        assert.deepEqual(toArray(vec), [1, 2]);
    });

    QUnit.test("identity", (assert) => {
        var vec = create(0, 0);
        var exist = init(2, 3, vec);
        assert.deepEqual(toArray(exist), [2, 3]);
    });
}