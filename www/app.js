var COLS = 2;
var ROWS = 2;
var cells = [];
window.onload = function () {
    var root = document.getElementById("inputs");
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            var input = document.createElement("input");
            input.type = "text";
            input.size = 2;
            root.appendChild(input);
            var cell = new Cell(input, c, r);
            cells.push(cell);
        }
        root.appendChild(document.createElement("br"));
    }
    document.getElementById("optimizer").onclick = function () { return optimize(); };
};
var Cell = /** @class */ (function () {
    function Cell(input, col, row) {
        this.input = input;
        this.col = col;
        this.row = row;
    }
    return Cell;
}());
function optimize() {
    cells.sort(cellCompare);
}
function cellCompare(a, b) {
    var va = Number(a.input.value);
    var vb = Number(b.input.value);
    if (isNaN(va) && isNaN(vb)) {
        return 0;
    }
    else if (isNaN(va)) {
        return 1;
    }
    else if (isNaN(vb)) {
        return -1;
    }
    return vb - va;
}
//# sourceMappingURL=app.js.map