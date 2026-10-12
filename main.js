const canvas = document.querySelector("canvas#pixel-canvas");

// canvas.width = 100;
// canvas.height = 100;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";

ctx.fillRect(25, 25, 50, 50);

console.log(canvas, ctx);