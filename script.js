const container = document.createElement("div");
const main = document.querySelector(".main");
const slider = document.getElementById("item");
let sliderValue = document.getElementById("slidervalue");
const color = document.getElementById("colorpicker");
const gridColorPicker = document.getElementById("gridColorPicker");
const resetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("download");

main.appendChild(container);
container.classList.add("container");

let drawing = false;

container.addEventListener("mousedown", () => (drawing = true));
container.addEventListener("mouseup", () => (drawing = false));
container.addEventListener("mouseleave", () => (drawing = false));

slider.addEventListener("input", createGrids);
resetBtn.addEventListener("click", resetCanvas);
downloadBtn.addEventListener("click", downloadArt);
gridColorPicker.addEventListener("input", updateGridColor);

function createGrids() {
	container.innerHTML = "";
	let gridSide = slider.value;
	let gridArea = gridSide * gridSide;
	container.style.gridTemplateColumns = `repeat(${gridSide}, 2fr)`;
	container.style.gridTemplateRows = `repeat(${gridSide}, 2fr)`;

	for (let i = 0; i < gridArea; i++) {
		let div = document.createElement("div");
		div.classList.add("cell");
		div.style.backgroundColor = "white";
		div.style.boxSizing = "border-box";
		div.style.borderColor = gridColorPicker.value;
		div.addEventListener("mousemove", (e) => {
			if (drawing) e.target.style.backgroundColor = color.value;
		});
		div.addEventListener("mousedown", (e) => {
			e.target.style.backgroundColor = color.value;
		});
		container.appendChild(div);
	}
}

function resetCanvas(e) {
	e.preventDefault();
	document.querySelectorAll(".cell").forEach((cell) => {
		cell.style.backgroundColor = "white";
	});
}

function updateGridColor() {
	document.querySelectorAll(".cell").forEach((cell) => {
		cell.style.borderColor = gridColorPicker.value;
	});
}

function downloadArt() {
	e.preventDefault(); 
	html2canvas(container).then((canvas) => {
		const link = document.createElement("a");
		link.href = canvas.toDataURL("image/png");
		link.download = "etch_a_sketch_artwork.png";
		link.click();
	});
}

createGrids();
