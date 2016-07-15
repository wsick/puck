namespace puck {
    export class PuckArray<T> {
        protected $backing: T[] = [];
        protected $changer = new puck.internal.WatchChanger();

        get length() {
            return this.$backing.length;
        }

        add(stop: T): this {
            this.$backing.push(stop);
            Object.freeze(stop);
            this.$changer.on();
            return this;
        }

        addMany(stops: T[]): this {
            var backing = this.$backing;
            for (var i = 0; i < stops.length; i++) {
                Object.freeze(stops[i]);
            }
            backing.push.apply(backing, stops);
            this.$changer.on();
            return this;
        }

        insert(index: number, stop: T): this {
            this.$backing.splice(index, 0, stop);
            Object.freeze(stop);
            this.$changer.on();
            return this;
        }

        insertMany(index: number, stops: T[]): this {
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

        edit(oldStop: T, newStop: T): this {
            return this.editAt(this.$backing.indexOf(oldStop), newStop);
        }

        editAt(index: number, newStop: T): this {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing[index] = newStop;
            Object.freeze(newStop);
            this.$changer.on();
            return this;
        }

        remove(stop: T) {
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

        iter(): Iterator<T> {
            return PuckArray.arrayIter<T>(this.$backing);
        }

        static arrayIter<T>(arr: T[]): Iterator<T> {
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
}