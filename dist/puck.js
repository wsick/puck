var puck;
(function (puck) {
    puck.version = '0.1.0';
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        (function (DirtyFlags) {
            DirtyFlags[DirtyFlags["none"] = 0] = "none";
            DirtyFlags[DirtyFlags["opacity"] = 1] = "opacity";
            DirtyFlags[DirtyFlags["visible"] = 2] = "visible";
            DirtyFlags[DirtyFlags["transform"] = 4] = "transform";
            DirtyFlags[DirtyFlags["down"] = 7] = "down";
        })(element.DirtyFlags || (element.DirtyFlags = {}));
        var DirtyFlags = element.DirtyFlags;
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var DirtyFlags = puck.element.DirtyFlags;
    var Element = (function () {
        function Element(state, composite) {
            this.init(state, composite);
            Object.freeze(this);
        }
        Object.defineProperty(Element.prototype, "opacity", {
            get: function () { return this.state.opacity; },
            set: function (value) {
                if (this.state.opacity !== value) {
                    this.state.opacity = value;
                    this.composite.taint(DirtyFlags.opacity);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "visible", {
            get: function () { return this.state.visible; },
            set: function (value) {
                if (this.state.visible !== value) {
                    this.state.visible = value;
                    this.composite.taint(DirtyFlags.visible);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "x", {
            get: function () { return this.state.offset.x; },
            set: function (value) {
                if (this.state.offset.x !== value) {
                    this.state.offset.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "y", {
            get: function () { return this.state.offset.y; },
            set: function (value) {
                if (this.state.offset.y !== value) {
                    this.state.offset.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "width", {
            get: function () { return this.state.size.width; },
            set: function (value) {
                if (this.state.size.width !== value) {
                    this.state.size.width = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "height", {
            get: function () { return this.state.size.height; },
            set: function (value) {
                if (this.state.size.height !== value) {
                    this.state.size.height = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "transformOriginX", {
            get: function () { return this.state.transformOrigin.x; },
            set: function (value) {
                if (this.state.transformOrigin.x !== value) {
                    this.state.transformOrigin.x = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "transformOriginY", {
            get: function () { return this.state.transformOrigin.y; },
            set: function (value) {
                if (this.state.transformOrigin.y !== value) {
                    this.state.transformOrigin.y = value;
                    this.composite.taint(DirtyFlags.transform);
                }
            },
            enumerable: true,
            configurable: true
        });
        Element.prototype.resetTransform = function () {
            la.mat3.identity(this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        Element.prototype.setTransform = function (mat) {
            la.mat3.copyTo(mat, this.state.transform);
            this.composite.taint(DirtyFlags.transform);
            return this;
        };
        Element.prototype.applyTransform = function (mat) {
            la.mat3.apply(this.state.transform, mat);
            return this;
        };
        Element.prototype.init = function (state, composite) {
            this.state = state || new puck.container.ContainerState();
            this.composite = composite || new puck.container.ContainerComposite();
            this.processor = {
                down: puck.container.down.Processor.instance
            };
        };
        return Element;
    })();
    puck.Element = Element;
})(puck || (puck = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var puck;
(function (puck) {
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(state, composite) {
            _super.call(this, state, composite);
        }
        Container.prototype.init = function (state, composite) {
            this.elements = [];
            this.state = state || new puck.container.ContainerState();
            this.composite = composite || new puck.container.ContainerComposite();
            this.processor = {
                down: puck.container.down.Processor.instance
            };
        };
        Container.prototype.walk = function () {
            var i = -1;
            var els = this.elements;
            var walker = {
                next: function () {
                    i++;
                    return els[i];
                }
            };
            return walker;
        };
        return Container;
    })(puck.Element);
    puck.Container = Container;
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var ElementComposite = (function () {
            function ElementComposite() {
                this.$$dirt = element.DirtyFlags.none;
                this.opacity = 1.0;
                this.visible = true;
                this.transform = la.mat3.identity();
            }
            ElementComposite.prototype.hasDirt = function (match) {
                return (this.$$dirt & match) > 0;
            };
            ElementComposite.prototype.taint = function (newDirt) {
                this.$$dirt |= newDirt;
            };
            ElementComposite.prototype.untaint = function (oldDirt) {
                this.$$dirt &= ~oldDirt;
            };
            ElementComposite.prototype.reset = function () {
                this.opacity = 1.0;
                this.visible = true;
                la.mat3.identity(this.transform);
            };
            return ElementComposite;
        })();
        element.ElementComposite = ElementComposite;
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var ContainerComposite = (function (_super) {
            __extends(ContainerComposite, _super);
            function ContainerComposite() {
                _super.apply(this, arguments);
            }
            return ContainerComposite;
        })(puck.element.ElementComposite);
        container.ContainerComposite = ContainerComposite;
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var ElementState = (function () {
            function ElementState() {
                this.opacity = 1.0;
                this.visible = true;
                this.offset = { x: 0, y: 0 };
                this.size = { width: 0, height: 0 };
                this.transform = la.mat3.identity();
                this.transformOrigin = { x: 0.5, y: 0.5 };
            }
            ElementState.prototype.reset = function () {
                this.opacity = 1.0;
                this.visible = true;
                this.offset.x = 0;
                this.offset.y = 0;
                this.size.width = 0;
                this.size.height = 0;
                la.mat3.identity(this.transform);
                this.transformOrigin.x = 0.5;
                this.transformOrigin.y = 0.5;
            };
            return ElementState;
        })();
        element.ElementState = ElementState;
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var ContainerState = (function (_super) {
            __extends(ContainerState, _super);
            function ContainerState() {
                _super.apply(this, arguments);
            }
            return ContainerState;
        })(puck.element.ElementState);
        container.ContainerState = ContainerState;
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var engine;
    (function (engine) {
        function process(el, parent) {
            doDown(el, parent);
            for (var walker = puck.walk.getWalker(el), cur = walker.next(); !!cur; cur = walker.next()) {
                process(cur, el);
            }
            doUp(el, parent);
        }
        engine.process = process;
        function doDown(el, parent) {
            var processor = el.processor.down;
            var bag = {
                walker: puck.walk.getWalker(el),
                state: el.state,
                composite: el.composite,
                pcomposite: parent.composite
            };
            if (processor.isTainted(bag))
                processor.process(bag);
        }
        function doUp(el, parent) {
        }
    })(engine = puck.engine || (puck.engine = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var walk;
    (function (walk) {
        var EMPTY_WALKER = {
            next: function () {
                return undefined;
            }
        };
        function getWalker(el) {
            if (typeof el.walk === "function")
                return el.walk();
            return EMPTY_WALKER;
        }
        walk.getWalker = getWalker;
    })(walk = puck.walk || (puck.walk = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var Processor = (function () {
                function Processor() {
                }
                Processor.prototype.isTainted = function (bag) {
                    return bag.composite.hasDirt(element.DirtyFlags.down);
                };
                Processor.prototype.process = function (bag) {
                    var dirt = element.DirtyFlags.none;
                    if (down.opacity.process(bag))
                        dirt |= element.DirtyFlags.opacity;
                    if (down.visible.process(bag))
                        dirt |= element.DirtyFlags.visible;
                    if (down.transform.process(bag))
                        dirt |= element.DirtyFlags.transform;
                    this.clear(bag);
                    return dirt;
                };
                Processor.prototype.clear = function (bag) {
                    bag.composite.untaint(element.DirtyFlags.opacity | element.DirtyFlags.visible | element.DirtyFlags.transform);
                    return this;
                };
                Processor.instance = new Processor();
                return Processor;
            })();
            down.Processor = Processor;
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var container;
    (function (container) {
        var down;
        (function (down) {
            var Processor = (function (_super) {
                __extends(Processor, _super);
                function Processor() {
                    _super.apply(this, arguments);
                }
                Processor.prototype.process = function (bag) {
                    var dirt = _super.prototype.process.call(this, bag);
                    for (var cur = bag.walker.next(); !!cur; cur = bag.walker.next()) {
                        cur.composite.taint(dirt);
                    }
                    return dirt;
                };
                Processor.instance = new Processor();
                return Processor;
            })(puck.element.down.Processor);
            down.Processor = Processor;
        })(down = container.down || (container.down = {}));
    })(container = puck.container || (puck.container = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var opacity;
            (function (opacity) {
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.opacity))
                        return false;
                    var newOpacity = bag.pcomposite.opacity * bag.state.opacity;
                    var changed = comp.opacity === newOpacity;
                    comp.opacity = newOpacity;
                    return changed;
                }
                opacity.process = process;
            })(opacity = down.opacity || (down.opacity = {}));
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var transform;
            (function (transform) {
                var mat3 = la.mat3;
                var oldTransform = mat3.identity();
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.transform))
                        return false;
                    mat3.copyTo(comp.transform, oldTransform);
                    var state = bag.state;
                    var xo = {
                        x: state.transformOrigin.x * state.size.width,
                        y: state.transformOrigin.y * state.size.height
                    };
                    mat3.createTranslate(-xo.x, -xo.y, comp.transform);
                    mat3.apply(comp.transform, state.transform);
                    mat3.translate(comp.transform, xo.x, xo.y);
                    if (!mat3.equal(comp.transform, oldTransform)) {
                    }
                    return true;
                }
                transform.process = process;
            })(transform = down.transform || (down.transform = {}));
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));
var puck;
(function (puck) {
    var element;
    (function (element) {
        var down;
        (function (down) {
            var visible;
            (function (visible) {
                function process(bag) {
                    var comp = bag.composite;
                    if (!comp.hasDirt(element.DirtyFlags.visible))
                        return false;
                    var newVisible = bag.pcomposite.visible && (bag.state.visible === true);
                    var changed = comp.visible !== newVisible;
                    if (changed) {
                    }
                    comp.visible = newVisible;
                    return changed;
                }
                visible.process = process;
            })(visible = down.visible || (down.visible = {}));
        })(down = element.down || (element.down = {}));
    })(element = puck.element || (puck.element = {}));
})(puck || (puck = {}));

//# sourceMappingURL=puck.js.map
