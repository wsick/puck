namespace demo {
    declare var FPSMeter;

    export class LoadTest {
        private $canvas: HTMLCanvasElement = null;
        private $meter: any;
        private $hasNew = false;
        private $addmeter: any;
        root: puck.Layer;

        init(canvas: HTMLCanvasElement): this {
            this.$meter = new FPSMeter({
                'left': 'auto',
                'right': '5px',
                'top': '5px',
                'heat': 1,
                'graph': 1,
            });

            this.$addmeter = new FPSMeter({
                'left': 'auto',
                'right': '5px',
                'top': '50px',
                'show': 'ms',
                'heat': 1,
                'graph': 1,
            });

            this.$canvas = canvas;
            var root = this.root = new puck.Layer(canvas.getContext('2d'));
            root.frameDebug
                .onBegin(() => this.onBeginFrame())
                .onEnd(() => this.onEndFrame());
            return this;
        }

        addElements(count: number): this {
            console.profile("add elements");

            var root = this.root;
            var constraint = la.rect.init(0, 0, root.width, root.height);
            for (var i = 0; i < count; i++) {
                root.elements.push(random.element(constraint));
            }
            console.profileEnd();

            this.$hasNew = true;
            this.$addmeter.resume();
            return this;
        }

        start() {
            this.root.activate();
        }

        protected onBeginFrame() {
            this.$meter.tickStart();
            if (this.$hasNew) {
                this.$addmeter.tickStart();
                console.profile("new process");
            }
        }

        protected onEndFrame() {
            if (this.$hasNew) {
                console.profileEnd();
                this.$hasNew = false;
                this.$addmeter.tick();
                window.setTimeout(() => this.$addmeter.pause(), 1);
            }
            this.$meter.tick();
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
            var el = new puck.Ellipse();
            el.fill = brush();
            el.stroke = brush();
            //el.strokeThickness = strokeThickness();
            el.strokeThickness = 0;
            la.rect.copyTo(rect(constraint), el);
            return el;
        }

        function rectangle(constraint: la.IRect): puck.Rectangle {
            var el = new puck.Rectangle();
            el.fill = brush();
            el.stroke = brush();
            //el.strokeThickness = strokeThickness();
            el.strokeThickness = 0;
            la.rect.copyTo(rect(constraint), el);
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