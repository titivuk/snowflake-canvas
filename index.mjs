import { Point } from "./point.mjs";
import { draw, Rectangle, rotate, Triangle } from "./rotate-2d.mjs";
import { Snowflake } from "./snowflake.mjs";

const WIDTH = 800;
const HEIGHT = 600;
const center = new Point(Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2));

let sides = 3;
let depth = 3;

/**
 * @type{keyof typeof shapes}
 */
let curShape = "snowflake";
const shapes = {
  triangle: new Triangle(
    new Point(center.x, center.y + 50),
    new Point(center.x - 30, center.y),
    new Point(center.x + 40, center.y - 20)
  ),
  rectangle: new Rectangle(new Point(center.x - 50, center.y + 50), 100, 100),
  snowflake: new Snowflake(center, 2, 1, 1),
};

/**
 * @param {string} shape
 * @returns {boolean}
 */
function isRotatable(shape) {
  return shape === "triangle" || shape === "rectangle";
}

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas-id");
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("2d context not found");
}

ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

// ugly params
shapes.snowflake.draw(
  ctx,
  shapes.snowflake.pivot,
  shapes.snowflake.depth,
  shapes.snowflake.scale
);

/**
 * @type {HTMLInputElement}
 */
const sidesInput = document.getElementsByName("sides")[0];
if (!sidesInput) {
  throw new Error("No sides input found");
}

sidesInput.addEventListener("input", (ev) => {
  if (curShape !== "snowflake") {
    return;
  }

  const inputSides = +ev.target.value;
  if (!Number.isInteger(inputSides) || inputSides < 1) {
    return;
  }

  shapes.snowflake.sides = inputSides;

  clearCanvas(ctx);
  shapes.snowflake.draw(
    ctx,
    shapes.snowflake.pivot,
    shapes.snowflake.depth,
    shapes.snowflake.scale
  );
});

/**
 * @type {HTMLInputElement}
 */
const depthInput = document.getElementsByName("depth")[0];
if (!depthInput) {
  throw new Error("No depth input found");
}

depthInput.addEventListener("input", (ev) => {
  if (curShape !== "snowflake") {
    return;
  }

  const inputDepth = +ev.target.value;
  if (!Number.isInteger(depth) || inputDepth < 1) {
    return;
  }

  shapes.snowflake.depth = inputDepth;

  clearCanvas(ctx);
  shapes.snowflake.draw(
    ctx,
    shapes.snowflake.pivot,
    shapes.snowflake.depth,
    shapes.snowflake.scale
  );
});

canvas.addEventListener("wheel", (ev) => {
  const shape = shapes[curShape];
  if (!shape) {
    return;
  }

  let angle = Math.PI / 8;
  if (ev.deltaY < 0) {
    angle = -angle;
  }

  clearCanvas(ctx);

  if (curShape === "snowflake") {
    shapes.snowflake.rotationAngle += angle;
    shapes.snowflake.draw(
      ctx,
      shapes.snowflake.pivot,
      shapes.snowflake.depth,
      shapes.snowflake.scale
    );
  } else {
    rotate(shape, center, angle);
    draw(ctx, shape);
  }
});

const snowflakeBtn = document.getElementById("render-snowflake");
if (!snowflakeBtn) {
  throw new Error("missing snowflake button");
}

snowflakeBtn.addEventListener("click", () => {
  initSnowflake();
});

const rectangleBtn = document.getElementById("render-rectangle");
if (!rectangleBtn) {
  throw new Error("missing rectangle button");
}

rectangleBtn.addEventListener("click", () => {
  initRectangle();
});

const triangleBtn = document.getElementById("render-triangle");
if (!triangleBtn) {
  throw new Error("missing triangle button");
}

triangleBtn.addEventListener("click", () => {
  initTriangle();
});

export function initSnowflake() {
  curShape = "snowflake";
  clearCanvas(ctx);

  shapes.snowflake.draw(
    ctx,
    shapes.snowflake.pivot,
    shapes.snowflake.depth,
    shapes.snowflake.scale
  );
}

export function initRectangle() {
  curShape = "rectangle";
  clearCanvas(ctx);
  draw(ctx, shapes.rectangle);
}

export function initTriangle() {
  curShape = "triangle";
  clearCanvas(ctx);
  draw(ctx, shapes.triangle);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
