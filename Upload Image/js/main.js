const imgElement = document.querySelector("#imageSrc");
const fileInput = document.querySelector("#fileInput");
const placeholderMessage = document.querySelector("#placeholderMessage");

const canvas = document.querySelector("#imageOutput");
const defaultCanvasWidth = canvas.width;
const defaultCanvasHeight = canvas.height;

var Module = {
  onRuntimeInitialized() {
    document.getElementById("status").innerHTML = "OpenCV.js is ready.";
  },
};

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    hideElement(placeholderMessage);
    showElement(imgElement);

    imgElement.src = URL.createObjectURL(file);
  } else {
    hideElement(imgElement);
    showElement(placeholderMessage);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    // Reset the canvas to its default size
    canvas.width = defaultCanvasWidth;
    canvas.height = defaultCanvasHeight;
  }
});

imgElement.addEventListener("load", (event) => {
  const mat = cv.imread(imgElement);
  cv.imshow("imageOutput", mat);
  mat.delete();
});

function showElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}
