let canvas,canvas2, ctx, ctx2;
        
        document.addEventListener('DOMContentLoaded', (ev)=>{
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d'); 
            canvas.width = 1096;
            canvas.height = 1024;

            canvas2 = document.getElementById('canvas-above');
            ctx2 = canvas2.getContext('2d'); 
            canvas2.width = 1096;
            canvas2.height = 1024;
            
            let imgObj = new Image();

            let imgObj2 = new Image();

            imgObj.onload = function() {
                let w = canvas.width;
                let nw = imgObj.naturalWidth;   //1350
                let nh = imgObj.naturalHeight;  //900
                let aspect = nw / nh;
                let h = w / aspect;
                console.log('height', h)
                canvas.height = h;
                //ctx.drawImage(imgObj, 0, 0);
                ctx.drawImage(imgObj, 0, 0, w, h);
                //ctx.drawImage(imgObj, 0, 650, 200,(200/aspect), 0, 0, w, h);
                //ctx.drawImage(imgObj, dx, dy);
                //ctx.drawImage(imgObj, dx, dy, dw, dh);
                //ctx.drawImage(imgObj, sx, sy, sw, sh, dx, dy, dw, dh);
            };

            imgObj2.onload = function() {
                let w = canvas2.width;
                let nw = imgObj2.naturalWidth;   //1350
                let nh = imgObj2.naturalHeight;  //900
                let aspect = nw / nh;
                let h = w / aspect;
                console.log('height', h)
                canvas2.height = h;
                //ctx.drawImage(imgObj, 0, 0);
                ctx2.drawImage(imgObj2, 0, 0, w, h);
                //ctx.drawImage(imgObj, 0, 650, 200,(200/aspect), 0, 0, w, h);
                //ctx.drawImage(imgObj, dx, dy);
                //ctx.drawImage(imgObj, dx, dy, dw, dh);
                //ctx.drawImage(imgObj, sx, sy, sw, sh, dx, dy, dw, dh);
            };
            
            imgObj.src = './imgs/combination.png';
            
            imgObj2.src = './imgs/combination-above-2.png';
            
            //canvas.addEventListener('click', greyscale);
            //canvas.addEventListener('click', colorChannel);
        });
        
        const greyscale = function(ev){
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let arr = imgData.data;
            for(let i=0; i<arr.length; i=i+4){
                let ttl = arr[i] + arr[i+1] + arr[i+2];
                let avg = parseInt(ttl/3);
                arr[i] = avg;   //red
                arr[i+1] = avg; //green
                arr[i+2] = avg; //blue
            }
            imgData.data = arr;
            ctx.putImageData(imgData, 0, 0);
        }
        
        const colorChannel = function(ev){
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let arr = imgData.data;
            for(let i=0; i<arr.length; i=i+4){
                arr[i] = 0;     //R
                //arr[i+1] = 0;   //G
                arr[i+2] = 0;   //B
            }
            imgData.data = arr;
            ctx.putImageData(imgData, 0, 0);
            
            let img = canvas.toDataURL('image/jpeg', 1.0);
            console.log(img);
            document.querySelector('img').src = img;
        }