const COLS = 3;
const ROWS = 2;
const cells = [];
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
}
class Cell {
    constructor(input, col, row) {
        this.input = input;
        this.col = col;
        this.row = row;
    }
    fill() {
        const val = Number(this.input.value);
        this.val = isNaN(val) ? 0 : val;
    }
    get value() {
        return this.val;
    }
}
function optimize() {
    cells.forEach((c) => c.fill());
    cells.sort((a, b) => b.value - a.value);
    const backup = cells.slice();
    console.table(backup);
    const res = find(40, cells);
    console.table(res);
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
//# sourceMappingURL=app.js.map