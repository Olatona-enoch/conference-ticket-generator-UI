// file upload variables
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-Input");
const imageView = document.getElementById("img-view");
const fileError = document.getElementById('fileError');
const uploadBox = document.getElementById("uploadBox");
const imageButtons = document.querySelector(".image-buttons");
const customInputs = document.querySelectorAll(".custom-input");
const submitBtn = document.getElementById("submitBtn");

//change and remove buttons
const removeBtn = document.getElementById("removeBtn");
const ChangeBtn = document.getElementById("changeBtn");



(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    // customInputs.forEach(input => {
                    //     if (!input.checkValidity()) {
                    //         input.classList.add("is-invalid");
                    //         input.classList.remove("is-valid"); // Adds orange border
                    //     } else{
                    //         input.classList.remove("is-invalid");
                    //         input.classList.add("is-valid");
                    //     }
                    // });
                } else {
                    submitBtn.innerHTML=`<div class="spinner-border text-secondary" role="status"> </div>
                    <span class="">Generating Ticket</span>
                    `;             
                    event.preventDefault();
                    setTimeout(generateTicket, 3000)
                   ;// to call the ticket generator function
                }
                form.classList.add('was-validated');
            }, false);
        });
})();

const ticketId = localStorage.getItem("ticketNumber");



document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".custom-input");

    inputs.forEach(input => {
        input.addEventListener("paste", function (event) {
            event.preventDefault(); // Prevent pasting
            alert("Pasting is not allowed. Please type your details.");
        });

        input.addEventListener("copy", function (event) {
            event.preventDefault(); // Prevent copying
        });

        input.addEventListener("cut", function (event) {
            event.preventDefault(); // Prevent cutting
        });
    });
});

// event listener for file input change
fileInput.addEventListener("change", uploadImage);

//function to upload image
function uploadImage() {
    const file = fileInput.files[0] ;
    
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

removeBtn.addEventListener("click",function removeImage() {
    //clear file file input value
    fileInput.value ='';

    imageView.innerHTML = '';  // Clear any previous image preview
    imageView.innerHTML = `<img src="assets/images/icon-upload.svg" alt="Upload Icon" class="rounded bg-secondary bg-opacity-50 border border-1 p-2 " >`; // Show upload icon again
    imageButtons.style.display = "none";

});

ChangeBtn.addEventListener("click",function changeImage() {
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

// function Scrolldown() {
//     window.scroll(0,400); 
// }
function generateTicket() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const githubUsername = document.getElementById("github").value;
    const avatarImage = imageView.querySelector("img").src;
    const ticketpage = document.getElementById("ticketpage");

    let lastTicketId = parseInt(ticketId) ;
    let newTicketId = lastTicketId  + 1;

    localStorage.setItem("ticketNumber", newTicketId);

    ticketpage.innerHTML = `
            <header class="text-center " id="header">
            <img src="assets/images/logo-full.svg" alt=""class="w-100-sm m-5">
        </header>
        <div class="text-white text-center mb-3" id="info">
            <p class="display-1">Congrats,<span>${fullName}!</span> Your ticket is ready.</p>
            <p class="h5 mb-5">  We've emailed your ticket to <span>${email}</span> and will send updates in the run up to the event.</p>
  
        </div>

       <div class="container justify-content-center  m-6  p-sm-3 p-1 ticketbox rounded-4">
          <img src="assets/images/pattern-ticket.svg" alt=""class ="z-1 position-absolute top-50 start-50 translate-middle ticketlayout">
          <div class=" d-flex justify-content-end align-items-stretch text-white">
            <div class="col-10 ps-2">
              <div class="d-flex align-items-start">
                <div class="mt-2">           
                  <img src="assets/images/logo-mark.svg" alt="" class="image-logo">
                </div>
                <div class="text-start ms-sm-3 mb-sm-5">
                  <h1 class="logoText ">Coding Conf</h1>
                  <p class="text-white-50 conferenceAddress">Jan 31, 2025/ Austin, TX</p>
                </div>
              </div>
              <div class="col d-flex align-items-center " >
                <img src="${avatarImage}" alt="" class="ticket-image pe-sm-3 pe-2">
                <p class="ticketOwner">${fullName} <br>
                <span class="small text-white-50"><img src="assets/images/icon-github.svg" alt="">${githubUsername}</span></p>
              </div>
            </div>
            <!-- <div class="pe-2 cutline"></div> -->
            <div class="col-2 upsidedown position-relative  ">
              <p class="position-absolute top-50 start-50 translate-middle text-secondary fs-2" id="ticketID">#${newTicketId}</p>
            </div>
          </div>
        </div>

    `;
    //  window.location='#header'
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // window.scrollTo(0, 0);
    document.Body.onload = window.scrollTo(0, 0);
    // window.onload = Scrolldown;
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