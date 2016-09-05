namespace demo {
    declare var FPSMeter;

    export class LoadTest {
        private $canvas: HTMLCanvasElement = null;
        private $meter: any;
        private $hasNew = false;
        private $procbegin = 0;
        private $rendbegin = 0;
        root: puck.Layer;

        init(canvas: HTMLCanvasElement): this {
            this.$meter = new FPSMeter({
                'left': 'auto',
                'right': '5px',
                'top': '5px',
                'heat': 1,
                'graph': 1,
            });

            this.$canvas = canvas;
            var root = this.root = new puck.Layer()
                .attach(canvas.getContext('2d'));
            root.frameDebug
                .onBeginProcess(() => this.onBeginProcess())
                .onEndProcess(() => this.onEndProcess())
                .onBeginRender(() => this.onBeginRender())
                .onEndRender(() => this.onEndRender());
            return this;
        }

        addElements(count: number): this {
            console.profile("add elements");

            var root = this.root;
            var constraint = la.rect.init(0, 0, root.width(), root.height());
            for (var i = 0; i < count; i++) {
                root.elements.push(random.element(constraint));
            }
            console.profileEnd();

            this.$hasNew = true;
            return this;
        }

        start() {
            this.root.activate();
        }

        protected onBeginProcess() {
            this.$meter.tickStart();
            if (this.$hasNew) {
                this.$procbegin = performance.now();
            }
        }

        protected onEndProcess() {
            if (this.$hasNew) {
                console.log("proc", performance.now() - this.$procbegin);
            }
            this.$meter.tick();
        }

        protected onBeginRender() {
            if (this.$hasNew) {
                this.$rendbegin = performance.now();
            }
        }

        protected onEndRender() {
            if (this.$hasNew) {
                this.$hasNew = false;
                console.log("rend", performance.now() - this.$rendbegin);
            }
        }
    }

    namespace random {
        export function element(constraint: la.IRect): puck.Element {
            switch (Math.floor(Math.random() * 2)) {
                case 0:
                    return ellipse(constraint);
                case 1:
                    return rectangle(constraint);
            }
        }

        function ellipse(constraint: la.IRect): puck.Ellipse {
            var el = new puck.Ellipse()
                .fill(brush())
                .stroke(brush())
                .strokeThickness(0)
                .x(constraint.x)
                .y(constraint.y)
                .width(constraint.width)
                .height(constraint.height);
            //.strokeThickness(strokeThickness())
            return el;
        }

        function rectangle(constraint: la.IRect): puck.Rectangle {
            var el = new puck.Rectangle()
                .fill(brush())
                .stroke(brush())
                .strokeThickness(0)
                .x(constraint.x)
                .y(constraint.y)
                .width(constraint.width)
                .height(constraint.height);
            //.strokeThickness(strokeThickness())
            return el;
        }

        function brush(): puck.IBrush {
            var keys = Object.keys(puck.KnownColors);
            var colorName = keys[Math.floor(Math.random() * keys.length)];
            return new puck.SolidColorBrush(puck.KnownColors[colorName]);
        }

        function strokeThickness(): number {
            return Math.floor(Math.random() * 10);
        }

        function rect(constraint: la.IRect): la.IRect {
            var nx = constraint.x + (Math.random() * constraint.width);
            var ny = constraint.y + (Math.random() * constraint.height);
            var nw = Math.max(20, Math.random() * (constraint.width + constraint.x - nx));
            var nh = Math.max(20, Math.random() * (constraint.height + constraint.y - ny));
            return la.rect.init(nx, ny, nw, nh);
        }
    }
}