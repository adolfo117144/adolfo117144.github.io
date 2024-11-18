document.addEventListener('DOMContentLoaded', function () {
    let courseCounter = 0;

    // Function to replace the page with the result content (Declare this first)
    function replacePageWithResults(formData, imageTag) {
        let resultHTML = `<h2>Introduction</h2>`;

        // Image and caption
        if (imageTag) {
            resultHTML += `
                <figure style="text-align: center;">
                    ${imageTag}
                    <figcaption style="margin-top: 10px; font-style: italic;">${formData.imageCaption}</figcaption>
                </figure>
            `;
        }

        // Background and other details
        resultHTML += `
            <p><strong>Personal Background:</strong> ${formData.personalBackground}</p>
            <p><strong>Professional Background:</strong> ${formData.professionalBackground}</p>
            <p><strong>Academic Background:</strong> ${formData.academicBackground}</p>
            <p><strong>Background in this Subject:</strong> ${formData.backgroundInWebDev}</p>
            <p><strong>Primary Computer Platform:</strong> ${formData.primaryComputer}</p>
        `;

        // Courses section
        if (formData.courses.length > 0) {
            resultHTML += `<h3 id="byo">Courses I'm Taking & Why:</h3>`;
            formData.courses.forEach((course) => {
                resultHTML += `<p><strong>${course.name}:</strong> ${course.description}</p>`;
            });
        }

        // Funny/Interesting Item and Additional Share
        if (formData.funnyThing) {
            resultHTML += `<p><strong>Funny/Interesting Item to Remember me by:</strong> ${formData.funnyThing}</p>`;
        }

        if (formData.anythingElse) {
            resultHTML += `<p><strong>I'd also like to Share:</strong> ${formData.anythingElse}</p>`;
        }

        // "Back to Form" button
        resultHTML += `<button id="backToForm" style="display: block; margin: 20px auto;">Back to Form</button>`;

        // Replace the page content with the result
        document.body.innerHTML = resultHTML;

        // Add event listener for the "Back to Form" button
        document.getElementById('backToForm').addEventListener('click', function () {
            window.location.reload(); // Reload the page to return to the form
        });
    }

    // Function to gather form data and display it in the results page
    function displayFormData() {
        const formData = {
            name: document.getElementById('name').value,
            mascot: document.getElementById('mascot').value,
            imageCaption: document.getElementById('imagecaption').value,
            academicBackground: document.getElementById('academicbackground').value,
            backgroundInWebDev: document.getElementById('backgroundinWebDev').value,
            primaryComputer: document.getElementById('primarycomputer').value,
            funnyThing: document.getElementById('funnything').value,
            anythingElse: document.getElementById('anythingelse').value,
            courses: []
        };

        // Gather course information
        document.querySelectorAll('.courseDiv').forEach((courseDiv) => {
            const courseName = courseDiv.querySelector('input[type="text"].courseName').value;
            const courseDescription = courseDiv.querySelector('textarea.courseDescription').value;
            formData.courses.push({ name: courseName, description: courseDescription });
        });

        // Handle the uploaded image
        const imageFile = document.getElementById('file').files[0];
        let imageTag = '';
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageTag = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 500px; display: block; margin: 20px auto;">`;
                replacePageWithResults(formData, imageTag); // Replace the page after loading the image
            };
            reader.readAsDataURL(imageFile);
        } else {
            replacePageWithResults(formData, imageTag); // No image, just proceed to replace the page
        }
    }

    // Function to validate form inputs
    function validateForm() {
        const requiredFields = ['name', 'mascot', 'file', 'imagecaption', 'academicbackground', 'backgroundinWebDev', 'primarycomputer'];

        for (let field of requiredFields) {
            const fieldValue = document.getElementById(field).value.trim();
            if (fieldValue === '') {
                return false;
            }
        }

        // Check if the agreement checkbox is checked
        if (!document.getElementById('agreement').checked) {
            return false;
        }

        return true;
    }

    // Handle form submission
    document.getElementById('introForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Call the validation function to check if all fields are properly filled
        if (!validateForm()) {
            alert('Please fill out all required fields and agree to the terms.');
            return; // Stop the function if validation fails
        }

        // If validation passes, display the form data
        displayFormData();
    });

    // Add course button functionality
    document.getElementById('addCourse').addEventListener('click', function (event) {
        event.preventDefault();
        courseCounter++;

        const courseList = document.getElementById('courseList');
        const newCourseDiv = document.createElement('div');
        newCourseDiv.className = 'courseDiv';
        newCourseDiv.id = `course${courseCounter}`;

        const courseInput = document.createElement('input');
        courseInput.type = 'text';
        courseInput.className = 'courseName';
        courseInput.placeholder = `Course ${courseCounter}`;
        courseInput.required = true;

        const courseDescription = document.createElement('textarea');
        courseDescription.className = 'courseDescription';
        courseDescription.placeholder = `Course ${courseCounter} Description`;
        courseDescription.required = true;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            courseList.removeChild(newCourseDiv);
        };

        newCourseDiv.appendChild(courseInput);
        newCourseDiv.appendChild(courseDescription);
        newCourseDiv.appendChild(deleteButton);
        courseList.appendChild(newCourseDiv);
    });
});
