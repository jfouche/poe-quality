const COLS = 8;
const ROWS = 15;
const cells: Array<Cell> = [];
let highlight: Array<Cell> = [];

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
    readonly col: number;
    readonly row: number;
    private readonly input: HTMLInputElement;
    private val: number;

    constructor(input: HTMLInputElement, col: number, row: number) {
        this.input = input;
        this.col = col;
        this.row = row;
    }

    init() {
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

    empty() {
        this.input.value = "";
    }
}

function optimize() {
    document.getElementById("result").innerHTML = "";
    cells.forEach((c) => c.init());
    cells.sort((a, b) => b.value - a.value);

    const res = find(40, cells);
    highlight = res === undefined ? [] : res;
    if (highlight.length === 0) {
        document.getElementById("result").innerHTML = "No solutions";
    } else {
        document.getElementById("result").innerHTML = "found :)";
        for (let c of highlight) {
            c.highlight();
        }
    }
}

/**
 * recursive function to find a way to obtain @value from @arr
 * @param value 
 * @param arr 
 */
function find(value: number, arr: Cell[]): Cell[] {
    // Search for exact value
    for (let c of arr) {
        if (c.value === value) {
            return [c];
        }
    }

    // search for multiple values
    for (let i = 0; i < arr.length - 1; i++) {
        let c = arr[i];
        if (c.value === 0) {
            // no more value to check
            break;
        }
        let newValue = value - c.value;
        if (newValue > 0) {
            let found = find(newValue, arr.slice(i + 1));
            if (found !== undefined) {
                return [c].concat(found);
            }
        }
    }

    // not found
    return undefined;
}

function remove() {
    for (let c of highlight) {
        c.empty();
    }
}