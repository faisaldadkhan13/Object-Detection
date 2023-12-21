import cv2

def detect_faces(image_path, output_path):
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
    cv2.imwrite(output_path, img)

if __name__ == "__main__":
    input_image_path = 'input.jpg'
    output_image_path = 'output.jpg'
    detect_faces(input_image_path, output_image_path)
