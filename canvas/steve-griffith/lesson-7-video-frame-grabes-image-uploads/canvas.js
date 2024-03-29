const grabScreen = () =>{
    let player = document.getElementById('player')
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    //grab a frame from the video
    ctx.drawImage(player, 0, 0);
    //convert to grayscale image
    //ONLY WORKS IF image is not tainted by CORS
    let imgdata = ctx.getImageData(0,0, canvas.width, canvas.height);
    let len = imgdata.data.length;
    //width * height * 4 = length of the array
    for(let i=0; i<len; i=i+4){
        let red = imgdata.data[i];
        let green = imgdata.data[i+1];
        let blue = imgdata.data[i+2];
        //let lum = .2126 * red + .7152 * green + .0722 * blue;
        let lum = (red + green + blue)/3;
        imgdata.data[i] = lum;
        imgdata.data[i+1] = lum;
        imgdata.data[i+2] = lum;
    }
    //update what is displayed on the canvas.
    ctx.putImageData(imgdata, 0, 0);
    //export as image file to be uploaded or saved
    
    let blob = canvas.toBlob((blob) => {
        //this code runs AFTER the Blob is extracted
        let fd = new FormData();
        fd.append('field-name', blob, 'image-filename.png');    
        let req = new Request('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: fd
        })
        fetch(req)
        .then(response=>response.json())
        .then(data=>{
            console.log('response from server after uploading the image');
        })
        .catch(err=>{
            console.log(err.message);
        });
        
        //load the blob into the image tag
        let img = document.createElement('img');
        let url = URL.createObjectURL(blob);
        img.addEventListener('load', (ev)=>{
            console.log('image from createObjectURL loaded');
            //player.pause();  //stop the video playing if desired
            //let vid = document.createElement('video');
            //vid.poster = url;
            //document.body.appendChild(vid);
            
            //clear memory used to create object url
            //this will make it impossible to download the image with a right click
            window.URL.revokeObjectURL(url);
        })
        img.src = url; //use the canvas binary png blob
        document.getElementById('image').appendChild(img);
    
    }, 'image/png'); //create binary png from canvas contents
    
}

//MEDIA EVENTS
//https://developer.mozilla.org/en-US/docs/Web/Events#Media_events

document.addEventListener('DOMContentLoaded', ()=>{
    let player = document.getElementById('player');
    player.addEventListener('canplay', (ev)=>{
        console.log('canplay', ev.target.videoWidth, ev.target.videoHeight);
        console.log(ev.target.clientWidth, ev.target.clientHeight);
        console.log(ev.target.currentSrc, ev.target.duration, ev.target.currentTime);
        player.addEventListener('click', (ev)=>{
            //click the video to grab a screenshot and display in the canvas
            grabScreen();
        })
    });
    
    player.addEventListener('canplaythrough', (ev)=>{
        //this is our own autoplay
        console.log('Enough loaded to play through whole video');
        player.play();
    });
    
    player.addEventListener('load', (ev)=>{
        //video has loaded entirely
        console.log('video loaded');
    });
    
    player.addEventListener('error', (err)=>{
        console.log('Failed to load video', err.message);
    })
})