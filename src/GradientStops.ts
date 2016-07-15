namespace puck {
    /*
     * Represents an array of GradientStop
     * Includes change notification when array is mutated
     */
    export class GradientStops {
        private $backing: IGradientStop[] = [];
        private $changer = new puck.internal.WatchChanger();

        get length() {
            return this.$backing.length;
        }

        add(stop: IGradientStop): this {
            this.$backing.push(stop);
            Object.freeze(stop);
            this.$changer.on();
            return this;
        }

        addMany(stops: IGradientStop[]): this {
            var backing = this.$backing;
            for (var i = 0; i < stops.length; i++) {
                Object.freeze(stops[i]);
            }
            backing.push.apply(backing, stops);
            this.$changer.on();
            return this;
        }

        insert(index: number, stop: IGradientStop): this {
            this.$backing.splice(index, 0, stop);
            Object.freeze(stop);
            this.$changer.on();
            return this;
        }

        insertMany(index: number, stops: IGradientStop[]): this {
            for (var i = 0; i < stops.length; i++) {
                Object.freeze(stops[i]);
            }
            var backing = this.$backing;
            for (var i = stops.length - 1; i >= 0; i--) {
                backing.splice(index, 0, stops[i]);
            }
            this.$changer.on();
            return this;
        }

        edit(oldStop: IGradientStop, newStop: IGradientStop): this {
            return this.editAt(this.$backing.indexOf(oldStop), newStop);
        }

        editAt(index: number, newStop: IGradientStop): this {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing[index] = newStop;
            Object.freeze(newStop);
            this.$changer.on();
            return this;
        }

        remove(stop: IGradientStop) {
            return this.removeAt(this.$backing.indexOf(stop));
        }

        removeAt(index: number) {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing.splice(index, 1);
            this.$changer.on();
            return this;
        }

        watch(onChanged: () => void): puck.internal.IWatcher {
            return this.$changer.watch(onChanged);
        }
    }
}