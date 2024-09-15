import { drawSnowflake } from "./snowflake.mjs";

const WIDTH = 800;
const HEIGHT = 600;
const CENTER_X = Math.floor(WIDTH / 2);
const CENTER_Y = Math.floor(HEIGHT / 2);

let sides = 3;
let depth = 3;

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas-id');
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error('2d context not found');
}

ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

drawSnowflake(ctx, CENTER_X, CENTER_Y, 3, 3, 1);

/**
 * @type {HTMLInputElement}
 */
const sidesInput = document.getElementsByName('sides')[0];
if (!sidesInput) {
    throw new Error('No sides input found');
}

sidesInput.addEventListener('input', (ev) => {
    const inputSides = +ev.target.value;
    if (!Number.isInteger(inputSides) || inputSides < 1) {
        return
    }

    sides = inputSides;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnowflake(ctx, CENTER_X, CENTER_Y, sides, depth, 1);
})

/**
 * @type {HTMLInputElement}
 */
const depthInput = document.getElementsByName('depth')[0];
if (!depthInput) {
    throw new Error('No depth input found');
}

depthInput.addEventListener('input', (ev) => {
    const inputDepth = +ev.target.value;
    if (!Number.isInteger(depth) || inputDepth < 1) {
        return
    }

    depth = inputDepth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnowflake(ctx, CENTER_X, CENTER_Y, sides, depth, 1);
})