// Get the DOM elements that will be used
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");
const fileList = document.getElementById("file");
const imageDiv = document.getElementById("imageUpload");
const goDiv = document.getElementById("goButton");
const moodScale = document.getElementById("moodScale");
const customDiv = document.getElementById("custom");
const canvas = document.getElementById("canvas");

// starting settings
let title = "How are you today?";
let bgC = "#000000";
let titleC = "#eeeeee";
let numC = "#0022ff";


let images = [];
let numRows = 0;
let numCols = 0;


function handleFiles(e) {
	fileElem = e.target.files;
	fileList.innerHTML = "";

	const list = document.createElement("ul");
	fileList.appendChild(list);
	for (let i = 0; i < fileElem.length; i++) {
		const li = document.createElement("li");
		list.appendChild(li);
		img = document.createElement("img");
		img.src = URL.createObjectURL(e.target.files[i]);
		img.height = 200;
		images[i] = new Image();
		images[i].src = img.src;
		images[i].onload = function () {
			URL.revokeObjectURL(fileElem[i].src);
		}
		li.appendChild(img);
	}
	imageUpload.style.display = "none";
	goDiv.style.display = "block";
	moodScale.style.display = "none";
}


function draw() {
	document.getElementById("file").style.display = "none";
	moodScale.style.display = "block";

	let ctx = canvas.getContext('2d');
	let width = canvas.clientWidth;
	let height = canvas.clientHeight;

	ctx.fillStyle = bgC;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = "30px serif";
	ctx.textAlign = 'center';
	ctx.fillStyle = titleC;
	ctx.fillText(title, canvas.width / 2, 60);

	switch (images.length) {
		case 0:
			console.log('no images uploaded');
			break;
		case 2:
			numRows = 1;
			numCols = 2;
			break;
		case 4:
			numRows = 2;
			numCols = 2;
			break;
		case 6:
			numRows = 2;
			numCols = 3;
			break;
		case 8:
			numRows = 2;
			numCols = 4;
			break;
		case 9:
			numRows = 3;
			numCols = 3;
			break;

		default:
			ctx.font = "22px serif";
			ctx.fillText("This has not yet been implemented.", canvas.width / 2 - 100, 160);
	}
	ctx.font = "2em serif";
	ctx.fillStyle = numC;
	let gap = 20;
	let count = 0;
	let picWidth = (canvas.width - 80) / numCols;
	let picHeight = picWidth / 3 * 4;
	let wOffset = picWidth - (30);
	let hOffset = picHeight - (picHeight - 40);
	let titleOffset = 100;
	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			ctx.drawImage(images[count], gap + col * (picWidth + gap), titleOffset + row * (picHeight + gap), picWidth, picHeight);
			ctx.fillText(count + 1, gap + col * (gap + picWidth) + wOffset, row * (gap + picHeight) + hOffset + titleOffset);
			count++;
		}
	}
	imageUpload.style.display = "none";
	goDiv.style.display = "none";
	moodScale.style.display = "block";
	customDiv.style.display = "block";
	document.getElementById("footer").style.display = "block";

}

// customization popups
function showInput() {
	title = prompt("New Title?");
	draw();
}

function backgroundColor(value) {
	bgC = value;
	draw();
}

function titleColor(value) {
	titleC = value;
	draw();
}

function numColors(value) {
	numC = value;
	draw();
}


// Setup download button event listener
document.querySelector('#download').addEventListener('click', () => {
	let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	let element = document.createElement('a');
	let filename = 'scale.png';
	element.setAttribute('href', image);
	element.setAttribute('download', filename);
	console.log("here");
	element.click();
})
