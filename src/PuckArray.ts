namespace puck {
    export class PuckArray<T> {
        protected $backing: T[] = [];
        protected $changer = new puck.internal.WatchChanger();

        get length() {
            return this.$backing.length;
        }

        clear(): this {
            this.$backing.length = 0;
            this.$changer.on();
            return this;
        }

        add(item: T): this {
            this.$backing.push(item);
            Object.freeze(item);
            this.$changer.on();
            return this;
        }

        addMany(items: T[]): this {
            var backing = this.$backing;
            for (var i = 0; i < items.length; i++) {
                Object.freeze(items[i]);
            }
            backing.push.apply(backing, items);
            this.$changer.on();
            return this;
        }

        insert(index: number, item: T): this {
            this.$backing.splice(index, 0, item);
            Object.freeze(item);
            this.$changer.on();
            return this;
        }

        insertMany(index: number, items: T[]): this {
            for (var i = 0; i < items.length; i++) {
                Object.freeze(items[i]);
            }
            var backing = this.$backing;
            for (var i = items.length - 1; i >= 0; i--) {
                backing.splice(index, 0, items[i]);
            }
            this.$changer.on();
            return this;
        }

        edit(oldItem: T, newItem: T): this {
            return this.editAt(this.$backing.indexOf(oldItem), newItem);
        }

        editAt(index: number, newItem: T): this {
            var backing = this.$backing;
            if (index < 0 && index >= backing.length)
                return this;
            backing[index] = newItem;
            Object.freeze(newItem);
            this.$changer.on();
            return this;
        }

        remove(item: T) {
            return this.removeAt(this.$backing.indexOf(item));
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