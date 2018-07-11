const COLS = 2;
const ROWS = 2;
const cells: Cell[] = [];

window.onload = () => {
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

    document.getElementById("optimizer").onclick = () => optimize();
}

class Cell {
    readonly input: HTMLInputElement;
    readonly col: number;
    readonly row: number;

    constructor(input: HTMLInputElement, col: number, row: number) {
        this.input = input;
        this.col = col;
        this.row = row;
    }
}

function optimize() {
    cells.sort(cellCompare);


}

function cellCompare(a: Cell, b: Cell): number {
    const va = Number(a.input.value);
    const vb = Number(b.input.value);
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
