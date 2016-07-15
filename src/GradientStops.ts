/// <reference path="PuckArray" />

namespace puck {
    /*
     * Represents an array of GradientStop
     * Includes change notification when array is mutated
     */
    export class GradientStops extends PuckArray<IGradientStop> {
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

            return PuckArray.arrayIter<IGradientStop>(tmp);
        }
    }
}