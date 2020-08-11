var can = $('.canvas')[0];
var ctx = can.getContext('2d');


ctx.fillStyle = '#f40';
ctx.fillRect(0, 10, 100, 100);

ctx.lineWidth = 5;
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.moveTo(100, 100);
ctx.lineTo(350, 350);
ctx.stroke();

ctx.moveTo(450, 300)

ctx.arc(400, 300, 50, 0*Math.PI, 2 * Math.PI);
ctx.stroke();

ctx.lineWidth = 1;
ctx.font = '60px 楷体';
ctx.strokeText('前端开发', 10, 200);

ctx.fillText('前端开发', 10, 280);