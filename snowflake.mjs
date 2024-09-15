/**
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} sides
 * @param {number} depth
 * @param {number} scale
 */
export function drawSnowflake(ctx, centerX, centerY, sides, depth, scale) {
    if (depth < 1) {
        return;
    }

    if (!ctx) {
        throw new Error('2d context not found')
    }

    const r = 100;

    let angle = 0;
    let x1, x2, y1, y2 = 0;
    for (let i = 0; i < sides; i++) {
        x1 = centerX + (r * scale) * Math.cos(angle);
        y1 = centerY + (r * scale) * Math.sin(angle);
        x2 = 2 * centerX - x1;
        y2 = 2 * centerY - y1;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        angle += Math.PI / sides;

        drawSnowflake(ctx, x1, y1, sides, depth - 1, scale * 0.5);
        drawSnowflake(ctx, x2, y2, sides, depth - 1, scale * 0.5);
    }
}