namespace puck.internal {
    export interface IWatcher {
        change();
        unwatch();
    }

    export class WatchChanger {
        private $watchers: IWatcher[] = [];

        watch(onChanged: () => void): IWatcher {
            var watchers = this.$watchers;
            var watcher = <IWatcher>{
                change: onChanged,
                unwatch: () => {
                    var ind = watchers.indexOf(watcher);
                    if (ind > -1)
                        watchers.splice(ind, 1);
                }
            };
            watchers.push(watcher);
            return watcher;
        }

        on() {
            for (var watchers = this.$watchers, i = 0; i < watchers.length; i++) {
                watchers[i].change();
            }
        }
    }
}