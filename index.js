   document.addEventListener("DOMContentLoaded", function () {
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");

          
            ctx.font = "16px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

          
            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;
            var centerX = canvasWidth / 2;
            var centerY = canvasHeight / 2;

       
            var character = "PS";
            ctx.fillText(character, centerX, centerY);

          
            var downloadLink = document.getElementById("downloadLink");
            downloadLink.addEventListener("click", function () {
                
                var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

               
                var pixelData = "";
                for (var i = 0; i < imageData.length; i += 4) {
                    var red = imageData[i];
                    var green = imageData[i + 1];
                    var blue = imageData[i + 2];
                    var hex = rgbToHex(red, green, blue);
                    pixelData += hex + ", ";
                }

                downloadLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(pixelData);
            });

          function rgbToHex(red, green, blue) {
                return "0x" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);
            }
        });
 