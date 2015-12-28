var puck;
(function (puck) {
    var mat3;
    (function (mat3) {
        var FLOAT_EPSILON = 0.000001;
        function create(src) {
            var dest = new Float32Array(6);
            if (src) {
                dest[0] = src[0];
                dest[1] = src[1];
                dest[2] = src[2];
                dest[3] = src[3];
                dest[4] = src[4];
                dest[5] = src[5];
            }
            else {
                dest[0] = dest[1] = dest[2] = dest[3] = dest[4] = dest[5] = 0;
            }
            return dest;
        }
        mat3.create = create;
        function copyTo(src, dest) {
            dest[0] = src[0];
            dest[1] = src[1];
            dest[2] = src[2];
            dest[3] = src[3];
            dest[4] = src[4];
            dest[5] = src[5];
            return dest;
        }
        mat3.copyTo = copyTo;
        function init(dest, m11, m12, m21, m22, x0, y0) {
            dest[0] = m11;
            dest[1] = m12;
            dest[2] = m21;
            dest[3] = m22;
            dest[4] = x0;
            dest[5] = y0;
            return dest;
        }
        mat3.init = init;
        function identity(dest) {
            if (!dest)
                dest = create();
            dest[0] = 1;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 1;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        }
        mat3.identity = identity;
        function equal(a, b) {
            return a === b || (Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
                Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
                Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
                Math.abs(a[3] - b[3]) < FLOAT_EPSILON &&
                Math.abs(a[4] - b[4]) < FLOAT_EPSILON &&
                Math.abs(a[5] - b[5]) < FLOAT_EPSILON);
        }
        mat3.equal = equal;
        function multiply(a, b, dest) {
            if (!dest)
                dest = a;
            var a11 = a[0], a12 = a[1], a21 = a[2], a22 = a[3], ax0 = a[4], ay0 = a[5], b11 = b[0], b12 = b[1], b21 = b[2], b22 = b[3], bx0 = b[4], by0 = b[5];
            dest[0] = a11 * b11 + a12 * b21;
            dest[1] = a11 * b12 + a12 * b22;
            dest[2] = a21 * b11 + a22 * b21;
            dest[3] = a21 * b12 + a22 * b22;
            dest[4] = ax0 * b11 + ay0 * b21 + bx0;
            dest[5] = ax0 * b12 + ay0 * b22 + by0;
            return dest;
        }
        mat3.multiply = multiply;
        function inverse(mat, dest) {
            if (Math.abs(mat[1]) < FLOAT_EPSILON && Math.abs(mat[2]) < FLOAT_EPSILON)
                return simple_inverse(mat, dest);
            else
                return complex_inverse(mat, dest);
        }
        mat3.inverse = inverse;
        function transformVec2(mat, vec, dest) {
            if (!dest)
                dest = vec;
            var x = vec[0], y = vec[1];
            dest[0] = (mat[0] * x) + (mat[2] * y) + mat[4];
            dest[1] = (mat[1] * x) + (mat[3] * y) + mat[5];
            return dest;
        }
        mat3.transformVec2 = transformVec2;
        function createTranslate(x, y, dest) {
            if (!dest)
                dest = create();
            dest[0] = 1;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 1;
            dest[4] = x;
            dest[5] = y;
            return dest;
        }
        mat3.createTranslate = createTranslate;
        function translate(mat, x, y) {
            mat[4] += x;
            mat[5] += y;
            return mat;
        }
        mat3.translate = translate;
        function createScale(sx, sy, dest) {
            if (!dest)
                dest = create();
            dest[0] = sx;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = sy;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        }
        mat3.createScale = createScale;
        function scale(mat, sx, sy) {
            mat[0] *= sx;
            mat[2] *= sx;
            mat[4] *= sx;
            mat[1] *= sy;
            mat[3] *= sy;
            mat[5] *= sy;
            return mat;
        }
        mat3.scale = scale;
        function createRotate(angleRad, dest) {
            if (!dest)
                dest = create();
            var c = Math.cos(angleRad);
            var s = Math.sin(angleRad);
            dest[0] = c;
            dest[1] = s;
            dest[2] = -s;
            dest[3] = c;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        }
        mat3.createRotate = createRotate;
        function createSkew(angleRadX, angleRadY, dest) {
            if (!dest)
                dest = create();
            dest[0] = 1;
            dest[1] = Math.tan(angleRadY);
            dest[2] = Math.tan(angleRadX);
            dest[3] = 1;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        }
        mat3.createSkew = createSkew;
        function preapply(dest, mat) {
            return multiply(mat, dest, dest);
        }
        mat3.preapply = preapply;
        function apply(dest, mat) {
            return multiply(dest, mat, dest);
        }
        mat3.apply = apply;
        function simple_inverse(mat, dest) {
            var m11 = mat[0];
            if (Math.abs(m11) < FLOAT_EPSILON)
                return null;
            var m22 = mat[3];
            if (Math.abs(m22) < FLOAT_EPSILON)
                return null;
            if (!dest) {
                dest = mat;
            }
            else {
                dest[1] = mat[1];
                dest[2] = mat[2];
            }
            var x0 = -mat[4];
            var y0 = -mat[5];
            if (Math.abs(m11 - 1) > FLOAT_EPSILON) {
                m11 = 1 / m11;
                x0 *= m11;
            }
            if (Math.abs(m22 - 1) > FLOAT_EPSILON) {
                m22 = 1 / m22;
                y0 *= m22;
            }
            dest[0] = m11;
            dest[3] = m22;
            dest[4] = x0;
            dest[5] = y0;
            return dest;
        }
        function complex_inverse(mat, dest) {
            if (!dest)
                dest = mat;
            var m11 = mat[0], m12 = mat[1], m21 = mat[2], m22 = mat[3];
            var det = m11 * m22 - m12 * m21;
            if (det === 0 || !isFinite(det))
                return null;
            var id = 1 / det;
            var x0 = mat[4], y0 = mat[5];
            dest[0] = m22 * id;
            dest[1] = -m12 * id;
            dest[2] = -m21 * id;
            dest[3] = m11 * id;
            dest[4] = (m21 * y0 - m22 * x0) * id;
            dest[5] = (m12 * x0 - m11 * y0) * id;
            return dest;
        }
    })(mat3 = puck.mat3 || (puck.mat3 = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var vec2;
    (function (vec2) {
        var EPSILON = 1e-10;
        function create(x, y) {
            var dest = new Float32Array(2);
            dest[0] = x;
            dest[1] = y;
            return dest;
        }
        vec2.create = create;
        function init(x, y, dest) {
            if (!dest)
                dest = new Float32Array(2);
            dest[0] = x;
            dest[1] = y;
            return dest;
        }
        vec2.init = init;
        function clone(src, dest) {
            return init(src[0], src[1], dest);
        }
        vec2.clone = clone;
        function reverse(src, dest) {
            if (!dest)
                dest = src;
            dest[0] = -src[0];
            dest[1] = -src[1];
            return dest;
        }
        vec2.reverse = reverse;
        function orthogonal(src, dest) {
            if (!dest)
                dest = src;
            var x = src[0], y = src[1];
            dest[0] = -y;
            dest[1] = x;
            return dest;
        }
        vec2.orthogonal = orthogonal;
        function normalize(src, dest) {
            if (!dest)
                dest = src;
            var x = src[0], y = src[1];
            var len = Math.sqrt(x * x + y * y);
            dest[0] = x / len;
            dest[1] = y / len;
            return dest;
        }
        vec2.normalize = normalize;
        function rotate(src, theta, dest) {
            if (!dest)
                dest = src;
            var c = Math.cos(theta);
            var s = Math.sin(theta);
            var x = src[0];
            var y = src[1];
            dest[0] = x * c - y * s;
            dest[1] = x * s + y * c;
            return dest;
        }
        vec2.rotate = rotate;
        function angleBetween(u, v) {
            var ux = u[0], uy = u[1], vx = v[0], vy = v[1];
            var num = ux * vx + uy * vy;
            var den = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
            return Math.acos(num / den);
        }
        vec2.angleBetween = angleBetween;
        function isClockwiseTo(v1, v2) {
            var theta = angleBetween(v1, v2);
            var nv1 = normalize(clone(v1));
            var nv2 = normalize(clone(v2));
            rotate(nv1, theta);
            var nx = Math.abs(nv1[0] - nv2[0]);
            var ny = Math.abs(nv1[1] - nv2[1]);
            return nx < EPSILON
                && ny < EPSILON;
        }
        vec2.isClockwiseTo = isClockwiseTo;
        function intersection(s1, d1, s2, d2) {
            var x1 = s1[0];
            var y1 = s1[1];
            var x2 = x1 + d1[0];
            var y2 = y1 + d1[1];
            var x3 = s2[0];
            var y3 = s2[1];
            var x4 = x3 + d2[0];
            var y4 = y3 + d2[1];
            var det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (det === 0)
                return null;
            var xn = ((x1 * y2 - y1 * x2) * (x3 - x4)) - ((x1 - x2) * (x3 * y4 - y3 * x4));
            var yn = ((x1 * y2 - y1 * x2) * (y3 - y4)) - ((y1 - y2) * (x3 * y4 - y3 * x4));
            return vec2.create(xn / det, yn / det);
        }
        vec2.intersection = intersection;
    })(vec2 = puck.vec2 || (puck.vec2 = {}));
})(puck || (puck = {}));

//# sourceMappingURL=puck.js.map
