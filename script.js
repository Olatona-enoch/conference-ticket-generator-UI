(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault()
                    generateTicket();// to call the ticket generator function
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
            imageView.innerHTML = `<img src="assets/images/icon-upload.svg" alt="Upload Icon" class="rounded bg-secondary bg-opacity-50 border border-1 p-2" >`; // Show upload icon again
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

function generateTicket() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const githubUsername = document.getElementById("github").value;
    const avatarImage = imageView.querySelector("img").src;
    const ticketpage = document.getElementById("ticketpage");


    ticketpage.innerHTML = `
            <header class="text-center m-5">
            <img src="assets/images/logo-full.svg" alt=""class="w-100-sm">
        </header>
        <div class="text-white text-center mb-3" id="info">
            <p class="display-1">Congrats,<span>${fullName}!</span> Your ticket is ready.</p>
            <p class="h5 mb-5">  We've emailed your ticket to <span>${email}</span> and will send updates in the run up to the event.</p>
  
        </div>

        <div class="container justify-content-center  m-6 p-3 ticketbox rounded-4">
            <div class=" d-flex justify-content-end text-white">
              <div class="col-10 ps-2">
                <div class="d-flex align-items-start">
                  <div class="mt-2">           
                    <img src="assets/images/logo-mark.svg" alt="" class="image-logo">
                  </div>
                  <div class="text-start ms-3 ">
                    <h1>Coding Conf</h1>
                    <p class="text-white-50">Jan 31, 2025/ Austin, TX</p>
                  </div>
                </div>
                <div class="col d-flex align-items-center" >
                  <img src=${avatarImage} alt="" class="ticket-image border border-1">
                  <p class= "ps-3">${fullName}<br>
                  <span class="small text-white-50"><img src="assets/images/icon-github.svg" alt="">${githubUsername}</span></p>
                </div>
              </div>
              <div class="pe-2 cutline"></div>
              <div class="col-2 upsidedown position-relative  ">
                <p class="display-6 position-absolute top-50 start-50 translate-middle">#04045</p>
              </div>
            </div>

    `
    // window.location.href = "ticket.html";
}
// .ticketbox{
//     background-color:rgba(255, 255, 255, 0.148) ;
//     justify-self: center;
//     max-width: 600px;
//     overflow-x: hidden;
//     border-width: 56px;
//     border-radius: 20px;
//     border: 2px solid #d55a5a; 
// }