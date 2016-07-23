namespace puck.render {
    import mat3 = la.mat3;

    var caps: string[] = [
        "butt", //flat
        "square", //square
        "round", //round
        "butt" //triangle
    ];
    var joins: string[] = [
        "miter",
        "bevel",
        "round"
    ];
    export class RenderContext {
        private $$transforms = [];
        currentTransform = mat3.identity();
        hasFillRule: boolean;
        raw: CanvasRenderingContext2D;
        size: RenderContextSize;

        constructor() {
            Object.defineProperties(this, {
                "currentTransform": {value: mat3.identity(), writable: false},
                "hasFillRule": {value: RenderContext.hasFillRule, writable: false},
                "size": {value: new RenderContextSize(), writable: false},
            });
        }

        static get hasFillRule(): boolean {
            if (navigator.appName === "Microsoft Internet Explorer") {
                var version = getIEVersion();
                return version < 0 || version > 10;
            }
            return true;
        }

        init(ctx: CanvasRenderingContext2D): this {
            Object.defineProperties(this, {
                "raw": {value: ctx, writable: false}
            });
            this.size.init(ctx);
            return this;
        }

        applyDpiRatio() {
            var ratio = this.size.dpiRatio;
            this.scale(ratio, ratio);
        }

        save() {
            this.$$transforms.push(mat3.create(this.currentTransform));
            this.raw.save();
        }

        restore() {
            var old = this.$$transforms.pop();
            if (old)
                mat3.copyTo(old, this.currentTransform);
            this.raw.restore();
        }

        setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
            mat3.init(this.currentTransform, m11, m12, m21, m22, dx, dy);
            this.raw.setTransform(m11, m12, m21, m22, dx, dy);
        }

        resetTransform() {
            mat3.identity(this.currentTransform);
            var raw = <any>this.raw;
            if (raw.resetTransform)
                raw.resetTransform();
        }

        transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
            var ct = this.currentTransform;
            mat3.multiply(ct, mat3.create([m11, m12, m21, m22, dx, dy]), ct);
            this.raw.transform(m11, m12, m21, m22, dx, dy);
        }

        scale(x: number, y: number) {
            mat3.scale(this.currentTransform, x, y);
            this.raw.scale(x, y);
        }

        rotate(angle: number) {
            var ct = this.currentTransform;
            var r = mat3.createRotate(angle);
            mat3.multiply(ct, r, ct); //ct = ct * r
            this.raw.rotate(angle);
        }

        translate(x: number, y: number) {
            mat3.translate(this.currentTransform, x, y);
            this.raw.translate(x, y);
        }

        apply(mat: Float32Array) {
            var ct = mat3.apply(this.currentTransform, mat);
            this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
        }

        preapply(mat: Float32Array) {
            var ct = mat3.preapply(this.currentTransform, mat);
            this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
        }

        clipRect(rect: la.IRect) {
            var raw = this.raw;
            raw.beginPath();
            raw.rect(rect.x, rect.y, rect.width, rect.height);
            raw.clip();
        }

        fillEx(region: la.IRect, brush: IBrush, fillRule?: FillRule) {
            var raw = this.raw;
            brush.setup(raw, region);
            raw.fillStyle = brush.toHtml5Object();
            if (fillRule == null) {
                (<any>raw).fillRule = raw.msFillRule = "nonzero";
                raw.fill();
            } else {
                var fr = fillRule === FillRule.evenodd ? "evenodd" : "nonzero";
                (<any>raw).fillRule = raw.msFillRule = fr;
                raw.fill(fr);
            }
        }

        strokeEx(region: la.IRect, brush: IBrush, thickness: number) {
            var raw = this.raw;
            brush.setup(raw, region);
            raw.strokeStyle = brush.toHtml5Object();
            raw.lineWidth = thickness;
            raw.stroke();
        }

        isPointInStrokeEx(x: number, y: number, thickness: number): boolean {
            var raw = this.raw;
            raw.lineWidth = thickness;
            return raw.isPointInStroke(x, y);
        }

        setStrokeExtras(lineCap: PenLineCap, lineJoin: PenLineJoin, miterLimit: number) {
            var raw = this.raw;
            raw.lineCap = caps[lineCap || 0] || caps[0];
            raw.lineJoin = joins[lineJoin || 0] || joins[0];
            raw.miterLimit = miterLimit;
        }
    }

    function getIEVersion(): number {
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(navigator.userAgent) != null)
            return parseFloat(RegExp.$1);
        return -1;
    }
}