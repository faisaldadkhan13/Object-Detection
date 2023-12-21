document.getElementById('imageInput').addEventListener('change', handleImage);

function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                detectObjects(img);
            };
        };
        reader.readAsDataURL(file);
    }
}

function detectObjects(img) {
    // Use OpenCV.js functions for object detection
    // For simplicity, this example uses face detection
    // (Make sure to include OpenCV.js in your repository)
    let face_cascade = new cv.CascadeClassifier();
    face_cascade.load('haarcascade_frontalface_default.xml');

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    let imgData = ctx.getImageData(0, 0, img.width, img.height);
    let src = cv.matFromImageData(imgData);
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    let faces = new cv.RectVector();
    let size = new cv.Size(0, 0);
    face_cascade.detectMultiScale(gray, faces, 1.1, 3, 0, size, size);

    for (let i = 0; i < faces.size(); i++) {
        let face = faces.get(i);
        let point1 = new cv.Point(face.x, face.y);
        let point2 = new cv.Point(face.x + face.width, face.y + face.height);
        cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cv.imshow(canvas, src);

    gray.delete();
    src.delete();
    faces.delete();
}
