document.getElementById('imageInput').addEventListener('change', handleImage);

async function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = async function (e) {
            img.src = e.target.result;
            img.onload = async function () {
                await detectObjects(img);
            };
        };

        reader.readAsDataURL(file);
    }
}

async function detectObjects(img) {
    const model = await cocoSsd.load();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const predictions = await model.detect(canvas);

    predictions.forEach((prediction) => {
        ctx.beginPath();
        ctx.rect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.stroke();
        ctx.fillText(`${prediction.class} (${Math.round(prediction.score * 100)}%)`, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
    });
}
