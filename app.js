const canvas = document.querySelector("#canvas");
const mode = document.querySelector(".mode");
const range = document.querySelector(".range");
const colors = document.querySelectorAll(".color");
const colorCustomized = document.querySelector(".color-picker");
const ctx = canvas.getContext("2d");

canvas.height = 550;
canvas.width = 700;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 550);
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.lineCap = "round";

let painting = false;
let filling = false;

function startPainting() {
  if (!filling) {
    painting = true;
  }
}

function stopPainting() {
  painting = false;
}

function mouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleMode() {
  if (!filling) {
    filling = true;
    mode.innerText = "Paint";
  } else {
    filling = false;
    mode.innerText = "Fill";
  }
}

function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, 700, 550);
  }
}

function handleRange(event) {
  ctx.lineWidth = event.target.value;
}

function handleColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function handleColorCustomized(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);

mode.addEventListener("click", handleMode);
canvas.addEventListener("click", fillCanvas);

range.addEventListener("input", handleRange);

colors.forEach(color => {
  color.addEventListener("click", handleColor);
});

colorCustomized.addEventListener("input", handleColorCustomized);