const container = document.createElement("div");
const main = document.querySelector(".main");
const slider = document.getElementById("item");
let sliderValue = document.getElementById("slidervalue");
const color = document.getElementById("colorpicker");
const gridColorPicker = document.getElementById("gridColorPicker");
const resetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("download");

let currentColor = "#000000";
let gridColor = "#ddd";
let drawing = false;

main.appendChild(container);
container.classList.add("container");

function createGrids() {
    container.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${slider.value}, 1fr)`;
    
    container.innerHTML = '';
    for (let i = 0; i < slider.value * slider.value; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.backgroundColor = "white";
        cell.style.border = `1px solid ${gridColor}`;
        container.appendChild(cell);
    }
}

function handleDrawing(e) {
    if (!drawing) return;
    if (e.target.classList.contains('cell')) {
        e.target.style.backgroundColor = currentColor;
    }
}

container.addEventListener("mousemove", handleDrawing);
container.addEventListener("mousedown", (e) => {
    drawing = true;
    handleDrawing(e);
});
container.addEventListener("mouseup", () => drawing = false);
container.addEventListener("mouseleave", () => drawing = false);

color.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

gridColorPicker.addEventListener("input", (e) => {
    gridColor = e.target.value;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.borderColor = gridColor;
    });
});

slider.addEventListener("input", createGrids);

resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.backgroundColor = "white";
    });
});

downloadBtn.addEventListener("click", () => {
    html2canvas(container).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "etch-a-sketch-artwork.png";
        link.click();
    }).catch(error => {
        console.error("Error generating canvas:", error);
    });
});

createGrids();
