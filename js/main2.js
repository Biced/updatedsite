(function () {
    "use strict";
    window.addEventListener(
        "load",
        function () {

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName("needs-validation");
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener(
                    "submit",
                    function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add("was-validated");
                    },
                    false
                );
            });
        },
        false
    );
})();

// greet logedin user and get his courses from local storage
const uname = localStorage.getItem("signedInUser");
window.addEventListener('DOMContentLoaded', () => {
    if (uname == null) {
        showAlert('login error please login or register', 'danger', '.CourseForm', 'h2');
    } else {
        showAlert(`Logged in successfuly as ${uname}`, 'success', '.CourseForm', 'h2');
    }
})

//get logedin user and his courses from local storage
let LoggedinUser = JSON.parse(localStorage.getItem("User:" + " " + uname));

class Course {
    constructor(courseId, name, lecturer, hours) {
        this.courseId = courseId;
        this.name = name;
        this.lecturer = lecturer;
        this.hours = hours;
    }
}


class UI {
    static displayCourses() {
        const courses = Storage.getCourses();
        courses.forEach((course) => UI.addCourseToList(course));

    }

    static addCourseToList(course) {

        const list = document.querySelector("tbody");
        const row = document.createElement("tr");
        row.setAttribute("id", `${course.courseId}`);

        row.innerHTML = `<td>${course.courseId}</td>
          <td>${course.name}</td>
          <td>${course.lecturer}</td>
         <td>${course.hours}</td>
         <td><a href="#" class="btn btn-info  getEdit">Edit</a></td>
         <td><a href="#" class="btn btn-danger  delete">Delete</a></td>`;

        list.appendChild(row);
    }
    static editCourse(el) {
        // set edit corse inputs
        const courseEditd = document.querySelector(".editTr");
        // test to see if shown
        if (courseEditd.classList.contains("myNone")) {
            toggle(courseEditd);
        }
        const courseId = document.querySelector("#courseIdTr");
        const name = document.querySelector("#nameTr");
        const lecturer = document.querySelector("#lecturerTr");
        const hours = document.querySelector("#hoursTr");
        if (el.classList.contains('getEdit')) {
            courseId.value = el.parentElement.parentElement.firstElementChild.textContent;
            name.value = el.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
            lecturer.value = el.parentElement.previousElementSibling.previousElementSibling.textContent;
            hours.value = el.parentElement.previousElementSibling.textContent;
        }
        if (el.classList.contains('saveTr')) {
            const courseNew = new Course(courseId.value, name.value, lecturer.value, hours.value);
            const id = courseId.value;
            const CourseSave = document.getElementById(id);
            CourseSave.firstElementChild.nextElementSibling.textContent = name.value;
            CourseSave.firstElementChild.nextElementSibling.nextElementSibling.textContent = lecturer.value;
            CourseSave.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = hours.value;
            Storage.removerCourse(courseId.value, courseNew);
            return false;
        }
    }
    // delte from UI
    static deleteCourse(el) {

        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();

        }
    }

};
// toggle function
function toggle(el) {
    el.classList.toggle("myNone")
};
// Show alert function
function showAlert(message, className, formID, h2Id) {
    let div = document.createElement('div');
    div.className = `txt-center alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    let form = document.querySelector(formID);
    let h2 = document.querySelector(h2Id);
    form.insertBefore(div, h2);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

//Storage Class: stores a course in localstorage
class Storage {
    static getCourses() {

        let courses = LoggedinUser.course;
        return courses;
    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem("User:" + " " + uname, JSON.stringify(LoggedinUser));
    }


    // checks if course was passed if not deletes the course if yes replaces the course with the one passed
    static removerCourse(courseId, courseNew) {
        const courses = Storage.getCourses();
        if (courseNew == null) {
            courses.forEach((course, index) => {
                if (course.courseId === courseId) {
                    courses.splice(index, 1);
                    return false;
                }


            });
        }
        if (courseNew != null) {
            courses.forEach((course, index) => {
                if (course.courseId === courseId) {
                    courses.splice(index, 1, courseNew);
                    return false;
                }


            });
        }

        localStorage.setItem("User:" + " " + uname, JSON.stringify(LoggedinUser));
    }
}
//event: Display Courses

document.addEventListener("DOMContentLoaded", UI.displayCourses);

// add course form functions


document.querySelector(
    ".CourseForm",
    addEventListener("submit", (e) => {
        e.preventDefault(e);
        const courseId = document.querySelector("#courseId").value;
        const name = document.querySelector("#name").value;
        const lecturer = document.querySelector("#lecturer").value;
        const hours = document.querySelector("#hours").value;
        // Instatiate course
        const course = new Course(courseId, name, lecturer, hours);

        // loop over rows to check if course id is taken
        const rowTest = document.querySelectorAll("tr");
        for (i = 0; i < rowTest.length; i++) {
            if (rowTest[i].id == courseId) {
                showAlert('Course with this number already exists', 'danger', '.CourseForm', 'h2');
                return false;
            }
        };

        // Add course to UI and storage
        UI.addCourseToList(course);
        Storage.addCourse(course);

        showAlert('Course Added', 'success', '.CourseForm', 'h2');
    })
);

// event: Remove a course

document.querySelector('tbody').addEventListener('click', (e) => {
    e.preventDefault(e);
    if (e.target.classList.contains('delete')) {
        UI.deleteCourse(e.target);
        Storage.removerCourse(e.target.parentElement.parentElement.firstElementChild.textContent);
        showAlert('Course Deleted', 'success', '.table-responsive', '.h2t');
        return false;
    }
    if (e.target.classList.contains('getEdit')) {
        UI.editCourse(e.target);

        return false;
    }
    if (e.target.classList.contains('saveTr')) {
        UI.editCourse(e.target);
        toggle((e.target.parentElement.parentElement));

        showAlert('Changes Saved', 'success', '.table-responsive', '.h2t');
        return false;

    }
    if (e.target.classList.contains('deleteTr')) {
        toggle((e.target.parentElement.parentElement));
        return false;
    }

});


// Clear storage and go back to login page
// passing empty


document.querySelector(".ClearStorage").addEventListener("click",
    () => {
        localStorage.clear();
        window.location.href = "login-register.html?empty";
    });

// Clear current User and go back to login page
// passing uname


document.querySelector(".ClearUser").addEventListener("click", () => {
    localStorage.removeItem('signedInUser');
    localStorage.removeItem("User:" + " " + uname);

    window.location.href = `login-register.html?${uname}`;
});

