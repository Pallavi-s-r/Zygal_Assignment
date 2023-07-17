import React, { useRef } from 'react';

const CanvasPixelData = () => {
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;



    context.font = "16px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.textBaseline = "middle";


    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;


    var character = "PS";
    context.fillText(character, centerX, centerY);


    let pixelData = '';
    for (let i = 0; i < imageData.length; i += 4) {
      const red = imageData[i];
      const green = imageData[i + 1];
      const blue = imageData[i + 2];
      const hex = rgbToHex(red, green, blue);
      pixelData += `0x${hex}, `;
    }

    const downloadLink = document.createElement('a');
    const fileContent = 'Output:\n' + pixelData;
    const file = new Blob([fileContent], { type: 'text/plain' });

    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = 'pixel_data.txt';
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
  };

  const rgbToHex = (r, g, b) => {
    return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  };

  return (
    <div>
      <canvas ref={canvasRef} width="16" height="34"></canvas>
      <br />
      <a onClick={handleDownload} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        Download Pixel Data
      </a>
    </div>
  );
};

export default CanvasPixelData;
