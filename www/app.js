const COLS = 3;
const ROWS = 2;
const cells = [];
let highlight = [];
window.onload = init;
function init() {
    const root = document.getElementById("inputs");
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const input = document.createElement("input");
            input.type = "text";
            input.size = 2;
            root.appendChild(input);
            const cell = new Cell(input, c, r);
            cells.push(cell);
        }
        root.appendChild(document.createElement("br"));
    }
    document.getElementById("optimizer").onclick = optimize;
    document.getElementById("remover").onclick = remove;
}
class Cell {
    constructor(input, col, row) {
        this.input = input;
        this.col = col;
        this.row = row;
    }
    reset() {
        const val = Number(this.input.value);
        this.val = isNaN(val) ? 0 : val;
        this.input.classList.remove("hl");
    }
    get value() {
        return this.val;
    }
    highlight() {
        this.input.classList.add("hl");
    }
    clear() {
        this.input.value = "";
    }
}
function optimize() {
    document.getElementById("result").innerHTML = "";
    cells.forEach((c) => c.reset());
    cells.sort((a, b) => b.value - a.value);
    const res = find(40, cells);
    if (res === undefined) {
        highlight = [];
        document.getElementById("result").innerHTML = "No solutions";
    }
    else {
        document.getElementById("result").innerHTML = "found :)";
        for (let c of res) {
            c.highlight();
        }
        highlight = res;
    }
}
function find(value, arr) {
    // Search for exact value
    for (let c of arr) {
        if (c.value === value) {
            return [c];
        }
    }
    // search for multiple values
    for (let i = 0; i < arr.length - 1; i++) {
        let c = arr[i];
        let newValue = value - c.value;
        let found = find(newValue, arr.slice(i + 1));
        if (found !== undefined) {
            return [c].concat(found);
        }
    }
    // not found
    return undefined;
}
function remove() {
    for (let c of highlight) {
        c.clear();
    }
}
//# sourceMappingURL=app.js.map