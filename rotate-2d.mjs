import { Point } from "./point.mjs";

export class Rectangle {
  /**
   * @type {Point}
   */
  p1;
  /**
   * @type {Point}
   */
  p2;
  /**
   * @type {Point}
   */
  p3;
  /**
   * @type {Point}
   */
  p4;
  /**
   * @type {number}
   */
  w;
  /**
   * @type {number}
   */
  h;

  /**
   * @type{Point[]}
   */
  #points;

  /**
   * @param {Point} p1
   * @param {number} w
   * @param {number} h
   */
  constructor(p1, w, h) {
    this.w = w;
    this.h = h;

    this.p1 = p1;
    this.p2 = new Point(this.p1.x + this.w, this.p1.y);
    this.p3 = new Point(this.p1.x + this.w, this.p1.y - this.h);
    this.p4 = new Point(this.p1.x, this.p1.y - this.h);
    this.#points = [this.p1, this.p2, this.p3, this.p4];
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.#points.length) {
          return {
            value: this.#points[index++],
            done: false,
          };
        }

        return {
          done: true,
        };
      },
    };
  }
}

export class Triangle {
  /**
   * @type {Point}
   */
  p1;
  /**
   * @type {Point}
   */
  p2;
  /**
   * @type {Point}
   */
  p3;
  /**
   * @type{Point[]}
   */
  #points;

  /**
   * @param {Point} p1
   * @param {Point} p2
   * @param {Point} p3
   */
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.#points = [this.p1, this.p2, this.p3];
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.#points.length) {
          return {
            value: this.#points[index++],
            done: false,
          };
        }

        return {
          done: true,
        };
      },
    };
  }
}

/**
 * @param {Point} p
 * @param {Point} pivot
 * @param {number} angle - radian
 * @return {Point}
 */
function rotatePoint(p, pivot, angle) {
  // relative to pivot
  const relX = p.x - pivot.x;
  const relY = p.y - pivot.y;

  const x = pivot.x + (relX * Math.cos(angle) - relY * Math.sin(angle));
  const y = pivot.y + (relX * Math.sin(angle) + relY * Math.cos(angle));

  return new Point(x, y);
}

/**
 * @description mutates the input
 * @param {Iterable<Point>} iterable
 */
export function rotate(iterable, pivot, angle) {
  for (const p of iterable) {
    const pp = rotatePoint(p, pivot, angle);
    p.x = pp.x;
    p.y = pp.y;
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Iterable<Point>} iterable
 */
export function draw(ctx, iterable) {
  const it = iterable[Symbol.iterator]();
  const n = it.next();

  if (n.done) {
    return;
  }

  const start = n.value;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  for (const p of { [Symbol.iterator]: () => it }) {
    ctx.lineTo(p.x, p.y);
  }
  ctx.lineTo(start.x, start.y);
  ctx.stroke();
}
