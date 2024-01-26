const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;    
});

const mouse = {
    x: undefined,
    y: undefined,

}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
});

canvas.addEventListener('mousemove', function(){
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
})

function drawCircle() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    ctx.fill();
}

drawCircle();