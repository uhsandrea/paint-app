const canvas = document.querySelector("#canvas");
const undo = document.querySelector(".undo");
const erase = document.querySelector(".erase");
const paint = document.querySelector(".paint");
const fill = document.querySelector(".fill");
const range = document.querySelector(".range");
const colors = document.querySelectorAll(".color");
const colorCustomized = document.querySelector(".color-picker");
const clear = document.querySelector(".clear");
const save = document.querySelector(".save");

const ctx = canvas.getContext("2d");

canvas.height = 550;
canvas.width = 700;
// Default conditions
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 550);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 5;
ctx.lineCap = "round";

let painting = false;
let filling = false;
let erasing = false;

// For eraser function
// Want to keep background color (filing). Eraser erases drawing only.
let saveFillColor = "white";
let saveStrokeColor = "black";

// For undo function
let paintHistory = [];
let index = -1;

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
    ctx.strokeStyle = saveStrokeColor;

  } else {
    if (erasing) {
      ctx.strokeStyle = saveFillColor;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// Whenever mouseup in canvas, save paint historu for undo function
function mouseUp() {
  paintHistory.push(ctx.getImageData(0, 0, 700, 550));
  index += 1;
  console.log(paintHistory);
  console.log(index);
  stopPainting();
}

function handleUndo() {
  if (index <= 0) {
    clearCanvas();
  } else {
    index -= 1;
    paintHistory.pop();
    ctx.putImageData(paintHistory[index], 0, 0);
  }
}

function changeBtnColor(color1, color2, color3) {
  erase.style.color = color1;
  paint.style.color = color2;
  fill.style.color = color3;
}

function clickErase() {
  erasing = true;
  filling = false;
  changeBtnColor("black", "white", "white");
}

function clickPaint() {
  filling = false;
  erasing = false;
  changeBtnColor("white", "black", "white");
}

function clickFill() {
  filling = true;
  erasing = false;
  changeBtnColor("white", "white", "black");
}

function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, 700, 550);
    saveFillColor = ctx.fillStyle; // After filling canvas background, save this color for eraser
  }
}

function handleRange(event) {
  ctx.lineWidth = event.target.value;
}

function handleColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
  saveStrokeColor = ctx.strokeStyle;
}

function handleColorCustomized(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  saveStrokeColor = ctx.strokeStyle;
}

// Clear and change to default
function clearCanvas() {
  erasing = false;
  filling = false;
  changeBtnColor("white", "white", "white");
  ctx.clearRect(0, 0, 700, 550);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 700, 550);
  ctx.fillStyle = "black";
  saveFillColor = "white"
  saveStrokeColor = "black";
  ctx.lineWidth = 5;

  // Clear paint history
  paintHistory = [];
  index = -1;
}

function saveCanvas() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Paint🎨";
  link.click();
}

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mouseleave", stopPainting);

undo.addEventListener("click", handleUndo);

erase.addEventListener("click", clickErase);
paint.addEventListener("click", clickPaint);
fill.addEventListener("click", clickFill);
canvas.addEventListener("click", fillCanvas);

range.addEventListener("input", handleRange);
colors.forEach(color => {
  color.addEventListener("click", handleColor);
});
colorCustomized.addEventListener("input", handleColorCustomized);

clear.addEventListener("click", clearCanvas);
save.addEventListener("click", saveCanvas);