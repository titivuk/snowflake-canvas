import { Point } from "./point.mjs";

export class Snowflake {
  /**
   * @type {Point}
   */
  pivot;
  /**
   * @type {number}
   */
  sides;
  /**
   * @type {number}
   */
  depth;
  /**
   * @type {number}
   */
  scale;
  /**
   * @type {number}
   */
  r = 100;
  /**
   * @type{Point[]}
   */
  #points = [];

  /**
   * @param {Point} pivot
   * @param {number} sides
   * @param {number} depth
   * @param {number} scale
   */
  constructor(pivot, sides = 3, depth = 3, scale = 1) {
    this.pivot = pivot;
    this.sides = sides;
    this.depth = depth;
    this.scale = scale;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Point} pivot
   * @param {number} depth
   * @param {number} scale
   */
  draw(ctx, pivot, depth, scale) {
    if (!ctx) {
      throw new Error("2d context not found");
    }

    if (depth < 1) {
      return;
    }

    let angle = 0;

    for (let i = 0; i < this.sides; i++) {
      const p1 = new Point(
        pivot.x + this.r * scale * Math.cos(angle),
        pivot.y + this.r * scale * Math.sin(angle)
      );
      const p2 = new Point(2 * pivot.x - p1.x, 2 * pivot.y - p1.y);

      // remember points
      this.#points.push(p1, p2);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      angle += Math.PI / this.sides;

      this.draw(ctx, p1, depth - 1, scale * 0.5);
      this.draw(ctx, p2, depth - 1, scale * 0.5);
    }
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

// /**
//  * @param {CanvasRenderingContext2D} ctx
//  * @param {Point} center
//  * @param {number} sides
//  * @param {number} depth
//  * @param {number} scale
//  */
// export function drawSnowflake(ctx, center, sides, depth, scale) {
//   if (!ctx) {
//     throw new Error("2d context not found");
//   }

//   if (depth < 1) {
//     return;
//   }

//   const r = 100;

//   let angle = 0;
//   for (let i = 0; i < sides; i++) {
//     const p1 = new Point(
//       center.x + r * scale * Math.cos(angle),
//       center.y + r * scale * Math.sin(angle)
//     );
//     const p2 = new Point(2 * center.x - p1.x, 2 * center.y - p1.y);

//     ctx.beginPath();
//     ctx.moveTo(p1.x, p1.y);
//     ctx.lineTo(p2.x, p2.y);
//     ctx.stroke();

//     angle += Math.PI / sides;

//     drawSnowflake(ctx, p1, sides, depth - 1, scale * 0.5);
//     drawSnowflake(ctx, p2, sides, depth - 1, scale * 0.5);
//   }
// }
