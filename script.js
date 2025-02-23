(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
})();

// file upload variables
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-Input");
const imageView = document.getElementById("img-view");
const fileError = document.getElementById('fileError');
const uploadBox = document.getElementById("uploadBox");
const imageButtons = document.querySelector(".image-buttons");

// event listener for file input change
fileInput.addEventListener("change", uploadImage);

//function to upload image
function uploadImage() {
    const file = fileInput.files[0];
    
    // file there is a file
    if (file) {
        const fileType = file.type.split('/')[1];  // Extract file type (jpg, png)
        const fileSize = file.size / 1024 / 1024; // Convert to MB

        // Check if file is a JPG/PNG and its size is <= 500KB
        if ((fileType !== 'jpeg' && fileType !== 'png') || fileSize > 1) {
            // Show error for invalid file
            uploadBox.classList.add('is-invalid');
            fileError.style.display = 'block';
            imageView.innerHTML = '';  // Clear any previous image preview
            imageView.innerHTML = `<img src="assets/images/icon-upload.svg" alt="Upload Icon" class="rounded bg-secondary bg-opacity-50 border border-1 p-2 w-25" >`; // Show upload icon again
        } else {
            // Reset error state for valid file
            uploadBox.classList.remove('is-invalid');
            fileError.style.display = 'none';

            // Display the uploaded image
            const imgLink = URL.createObjectURL(file);
            // imageView.style.backgroundImage = `url(${imgLink})`;
            imageView.innerHTML = '';  // Clear the placeholder image

            // Create an image element to display the uploaded image
            const imgElement = document.createElement('img');
            imgElement.src = imgLink;
            imgElement.alt = 'Avatar Preview';
            imgElement.classList.add('newimage','rounded-2', 'bg-secondary', 'bg-opacity-50', 'border', 'border-1','p-1');
            imageView.appendChild(imgElement);  // Append image to the view

            //display the remove and change buttons
            imageButtons.style.display = "flex";
        }
    }
}
const removeBtn = document.getElementById("removeBtn");
const ChangeBtn = document.getElementById("changeBtn");

removeBtn.addEventListener("click",function removeImage() {
    //clear file file input value
    fileInput.value ='';

    imageView.innerHTML = '';  // Clear any previous image preview
    imageView.innerHTML = `<img src="assets/images/icon-upload.svg" alt="Upload Icon" class="rounded bg-secondary bg-opacity-50 border border-1 p-2 " >`; // Show upload icon again
    imageButtons.style.display = "none";

});

changeBtn.addEventListener("click",function changeImage() {
    fileInput.click();

});

uploadBox.addEventListener('dragover', function(e) {
    e.preventDefault();
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragging');
    fileInput.files = e.dataTransfer.files;
    uploadImage();
});
// Optional: If you want the upload box to be clickable to trigger the file input
// dropArea.addEventListener('click', () => fileInput.click());
