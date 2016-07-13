namespace demo {
    declare var FPSMeter;

    export class LoadTest {
        private $canvas: HTMLCanvasElement = null;
        private $meter: any;
        private $hasTicked = false;
        private $firstmeter: any;
        root: puck.Layer;

        constructor() {
            this.$meter = new FPSMeter({
                'left': 'auto',
                'right': '5px',
                'top': '5px'
            });

            this.$firstmeter = new FPSMeter({
                'left': 'auto',
                'right': '5px',
                'top': '50px',
                'show': 'ms'
            });
        }

        setCanvas(canvas: HTMLCanvasElement): this {
            this.$canvas = canvas;
            return this;
        }

        build(count: number): this {
            var root = this.root = new puck.Layer(this.$canvas.getContext('2d'));

            root.frameDebug.onBegin(() => this.onBeginFrame());
            root.frameDebug.onEnd(() => this.onEndFrame());

            var constraint = la.rect.init(0, 0, root.width, root.height);
            for (var i = 0; i < count; i++) {
                root.elements.push(random.element(constraint));
            }

            return this;
        }

        start() {
            this.root.activate();
        }

        protected onBeginFrame() {
            this.$meter.tickStart();
            this.$firstmeter.tickStart();
            if (!this.$hasTicked) {
                console.profile("first frame");
            }
        }

        protected onEndFrame() {
            if (!this.$hasTicked) {
                console.profileEnd();
                this.$hasTicked = true;
                this.$firstmeter.tick();
                window.setTimeout(() => this.$firstmeter.pause(), 1);
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