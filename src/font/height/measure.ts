namespace puck.font.height {
    var dummy: HTMLElement;

    export function measure(font: IFont|string): number {
        var serial = font.toString();
        if (!dummy) {
            dummy = document.createElement("div");
            dummy.appendChild(document.createTextNode("Hg"));
            document.body.appendChild(dummy);
        }
        dummy.style.display = "";
        dummy.style.font = serial;
        var result = dummy.offsetHeight;
        dummy.style.display = "none";
        return result;
    }
}