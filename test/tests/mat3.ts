namespace puck.mat3.tests {
    QUnit.module("mat3");

    function toArray(f32arr: Float32Array): number[] {
        return Array.prototype.slice.call(f32arr, 0);
    }

    QUnit.test("identity", (assert) => {
        assert.deepEqual(toArray(identity()), [1, 0, 0, 1, 0, 0]);

        var exist = mat3.create();
        identity(exist);
        assert.deepEqual(toArray(exist), [1, 0, 0, 1, 0, 0]);
    });
}