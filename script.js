const container = document.createElement("div");
const main = document.querySelector(".main");
const heading = document.getElementsByTagName("h1");
const applyBtn = document.querySelector(".btn");
const slider = document.getElementById("item");
let sliderValue = document.getElementById("slidervalue");
const color = document.getElementById("colorpicker");
const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function (e) {
	e.preventDefault();
	const cells = document.querySelectorAll(".cell");
	cells.forEach((c) => {
		c.style.backgroundColor = "white";
	});
});

main.appendChild(container);

container.classList.add("container");

slider.addEventListener("input", createGrids);

function createGrids(e) {
	container.innerHTML = "";
	let gridSide = slider.value;
	val = slider.value;
	let gridArea = gridSide * gridSide;
	container.setAttribute(
		"style",
		`grid-template-columns: repeat(${val}, 2fr); grid-template-rows: repeat(${val}, 2fr);`
	);
	for (let i = 0; i < gridArea; i++) {
		let div = document.createElement("div");
		container.appendChild(div);
		div.classList.add("cell");
		div.style.boxSizing = "border-box";
		div.style.backgroundColor = "white";
		div.addEventListener("mousemove", function (e) {
			e.target.style.backgroundColor = color.value;
		});
	}
}

createGrids();
