const board = document.querySelector("#canvas");
let totalScore = 0;
var primaryColor;
var secondaryColor;

// -------- game start --------

document.addEventListener("DOMContentLoaded", function(ev) {
	newGame();
});

// -------- board functions --------

function newGame() {
	primaryColor = generateRandomColors(0, 100);
	secondaryColor = generateRandomColors(150, 256);
	console.log("Primary Color:", primaryColor);
	console.log("Secondary Color:", secondaryColor);
	clearScore();
	createBoard();
}

function createBoard() {
	board.innerHTML = "";
	setBoard();
	setSecondaryColor();
	setPrimaryColors();
}

function setBoard() {
	for (let i = 0; i < 500; i++) {
		let box = document.createElement("div");
		box.className = "box primary";
		box.style.backgroundColor = `${primaryColor}`;
		box.style.color = `${primaryColor}`;
		box.innerText = i + 1;
		box.setAttribute("id", i + 1);
		board.appendChild(box);
	}
}

// -------- color functions --------

function generateRandomColors(min, max) {
	let newColor =
		"rgb(" +
		(Math.floor(Math.random() * (max - min)) + min) +
		"," +
		(Math.floor(Math.random() * (max - min)) + min) +
		"," +
		(Math.floor(Math.random() * (max - min)) + min) +
		")";
	return newColor;
}

function setPrimaryColors() {
	const prims = board.querySelectorAll(".primary");
	prims.forEach(prim => {
		prim.addEventListener("click", function(ev) {
			alert("You lose! Try again.");
			ev.stopPropagation();
			newGame();
		});
	});
}

function setSecondaryColor() {
	let id = Math.floor(Math.random() * 500) + 1;
	const solution = document.getElementById(id);
	solution.className = "box secondary";
	solution.style.backgroundColor = `${secondaryColor}`;
	solution.style.color = `${secondaryColor}`;
	solution.addEventListener("click", function(ev) {
		ev.stopPropagation();
		updateScore();
		updateColors();
		createBoard();
	});
}

function updateColors() {
	let i = convertColors(primaryColor);
	let j = convertColors(secondaryColor);

	i = [parseInt(i[0]), parseInt(i[1]), parseInt(i[2])];
	j = [parseInt(j[0]), parseInt(j[1]), parseInt(j[2])];

	let avg = [
		Math.abs(j[0] - i[0]) / 2,
		Math.abs(j[1] - i[1]) / 2,
		Math.abs(j[2] - i[2]) / 2
	];

	console.log("avg: ", avg);

	let step = 10;

	let inc = new Array(3);
	inc[0] = avg[0] < 1 ? 0 : Math.ceil(avg[0] / step);
	inc[1] = avg[1] < 1 ? 0 : Math.ceil(avg[1] / step);
	inc[2] = avg[2] < 1 ? 0 : Math.ceil(avg[2] / step);

	console.log("inc: ", inc);

	i = [i[0] + inc[0], i[1] + inc[1], i[2] + inc[2]];
	j = [
		Math.abs(j[0] - inc[0]),
		Math.abs(j[1] - inc[1]),
		Math.abs(j[2] - inc[2])
	];

	primaryColor = "rgb(" + i + ")";
	secondaryColor = "rgb(" + j + ")";

	console.log("Primary Color:", primaryColor);
	console.log("Secondary Color:", secondaryColor);
}

function convertColors(color) {
	return color
		.split("")
		.slice(4, -1)
		.join("")
		.replace(/ /g, "")
		.split(",");
}

// -------- score functions --------

function updateScore() {
	totalScore++;
	document.getElementById("score").innerText = `total score: ${totalScore}`;
}

function clearScore() {
	totalScore = 0;
	document.getElementById("score").innerText = `total score: 0`;
}
