// DOM Elements
const displayImages = document.querySelectorAll('.displayImgs .display-image img');
const displaylist = document.querySelectorAll('.displayImgs .list-images div');

const previewImages = document.querySelectorAll('.preview .display-image img');
const previewlist = document.querySelectorAll('.preview .list-images div');
// const page = document.querySelector('.page');

// Preview 
const preview = document.querySelector(".preview");
const closeButton = document.querySelector(".close-button");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let currentImageIndex = 0;

// Image Change 
const changeImage = (index, screenImages, listImages) => {

     const safeIndex = ((index % displayImages.length) + displayImages.length) % displayImages.length;

     screenImages.forEach(img => img.classList.remove("active"));
     listImages.forEach(img => img.classList.remove("active"));

     screenImages[safeIndex].classList.add("active");
     listImages[safeIndex].classList.add("active");
     currentImageIndex = safeIndex;
};

// Display List
displaylist.forEach((listImg, index) => {
     listImg.addEventListener("click", () => {
          changeImage(index, displayImages, displaylist);
     });
});

// Preview List
previewlist.forEach((listImg, index) => {
     listImg.addEventListener("click", () => {
          changeImage(index, previewImages, previewlist);
     });
});

// Dispaly Image - Click  (open preview)
displayImages.forEach((img, index) => {
     img.addEventListener("click", () => {
          preview.classList.add("active");
          page.classList.add('nonActive');
          changeImage(index, previewImages, previewlist);
     });
});

// Previous Button - Click
prevButton.addEventListener("click", () => {
     changeImage(currentImageIndex - 1, previewImages, previewlist);
});

// Next Button - Click
nextButton.addEventListener("click", () => {
     changeImage(currentImageIndex + 1, previewImages, previewlist);
});

// Close Button - Click
closeButton.addEventListener("click", () => {
     preview.classList.remove("active");
     page.classList.remove('nonActive');
});