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

        iter(): Iterator<GradientStop> {
            return arrayIter(this.$backing);
        }

        paddedIter(): Iterator<IGradientStop> {
            var min: IGradientStop = null;
            var max: IGradientStop = null;

            var tmp: IGradientStop[] = this.$backing.slice(0);
            for (var i = 0; i < tmp.length; i++) {
                let cur = tmp[i];
                tmp.push(cur);
                if (!min || cur.offset < min.offset)
                    min = cur;
                if (!max || cur.offset > max.offset)
                    max = cur;
            }

            if (!!min)
                tmp.unshift({offset: 0, color: min.color});
            if (!!max)
                tmp.push({offset: 1, color: max.color});

            return arrayIter(tmp);
        }
    }

    function arrayIter<T>(arr: T[]): Iterator<T> {
        var i = -1;
        return {
            next(): IteratorResult<T> {
                i++;
                if (i >= arr.length)
                    return {done: true};
                return {done: false, value: arr[i]};
            }
        }
    }
}