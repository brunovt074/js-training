let canvas, ctx, oldTxt;

window.addEventListener('load', (ev)=>{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    drawText();
    document.getElementById('msg').addEventListener('input', drawText);

    // f = new FontFace('Allerta Stencil',
    //  'url(https://fonts.gstatic.com/s/allertastencil/v8/HTx0L209KT-LmIE9N7OR6eiycOe1_Db29XP-vA.woff2)');

    // f.load()
    // .then(function(fnt) {
    //     console.log(`loaded ${fnt.family}`);
    // })
    // .catch(err => {
    //     //error loading the font
    //     console.error('Failed to load the google font');
    // });
});

const drawText = function(){
    //normal, italic, bold
    //px pt cm in rem em
    //any installed or imported font
    let fontFamily = 'Allerta Stencil';
    ctx.font = `normal, 40px, ${fontFamily}, Helvetica, Arial,
    monospace`;
    ctx.fillStyle = 'cornflowerblue';
    ctx.strokeStyle = '#bada55';
    
    //textAlign center, left, right, end, start
    ctx.textAlign = 'start';
    
    //textBaseLine top, hanging, middle, bottom, ideographic, alphabetic
    ctx.textBaseLine = 'alphabetic';
    
    //direction ltr, rtl, inherit
    ctx.direction = 'ltr';

    let txt = document.getElementById('msg').value;
    let metrics = ctx.measureText(oldTxt);
    let w = metrics.width;
    ctx.clearRect(50, 110, w, -50);

    if(txt == '') {
        txt = 'Please give me a message.';
    }

    ctx.strokeText(txt, 50, 100);
    oldTxt = txt;

    ctx.fillStyle = '#999';
    ctx.font = 'italic 20px Arial';
    let m = `Message is ${w}px wide`;
    ctx.clearRect(50, 310, 500, -30);
    ctx.fillText(m, 50, 300);
}