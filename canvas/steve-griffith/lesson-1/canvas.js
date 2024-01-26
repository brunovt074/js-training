let canvas, ctx;

document.addEventListener('DOMContentLoaded', ()=> {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //webgl, webgl2
    canvas.width = 600;
    canvas.height = 400;

    //drawRect();
    drawEllipse();
    drawRect();
});

const drawRect = function(){
    ctx.rect(300, 100, 100, 50); //x, y, width, height

    //define the fill
    ctx.strokeStyle = `red`;
    ctx.lineWidth = 10;

    //define the stroke
    ctx.fillStyle = `skyblue`;

    //fill and stroke
    //ctx.fill();
    // ctx.stroke();
    // ctx.fill();

    //draw a rect fill or stroke x,y,w,h
        ctx.fillRect(200,300,100,50);
        ctx.strokeRect(100,100,100,50);

    //delete a rect
        //ctx.clearRect(x,y,width,height)
        ctx.clearRect(150,50,100,500)
}

const drawEllipse = function(){
    ctx.beginPath();
    //ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, 
    //endAngle, anticlock);
    ctx.ellipse(200, 200, 100, 50, 0, 0, (Math.PI*2), false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    //ctx.ellipse(x, y, radius, startAngle, endAngle, anticlock);
    ctx.arc(400, 200, 50, 0, (Math.PI*1.5), false);
    ctx.fill();
    ctx.stroke();



}