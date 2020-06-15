

// bootstrap validations
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

// toggle login register form
const LoginForm = document.querySelector(".LoginForm");
const RegisterForm = document.querySelector(".RegisterForm");
document.querySelector(".login").addEventListener("click", displayForm);
document.querySelector(".register").addEventListener("click", displayForm);

// form visibility toggle function
function displayForm() {
    RegisterForm.classList.toggle("myNone"), LoginForm.classList.toggle("myNone");
}




class User {
    constructor(uname, password, course) {
        this.uname = uname;
        this.password = password;
        this.course = course;
    }

}



// login User

document.querySelector(
    ".LoginForm",
    addEventListener("submit", (e) => {

        e.preventDefault(e);
        if (LoginForm.classList.contains("myNone")) { return false; }
        const uname = document.querySelector('#user').value;
        const password = document.querySelector('#pw').value;
        const storedUname = JSON.parse(localStorage.getItem("User:" + " " + uname));
        if (storedUname == null || storedUname.password != password) {
            showAlert('Wrong Username or password', 'danger', '.LoginForm', '.h2l');
        } else {
            localStorage.setItem("signedInUser", uname);
            window.location.href = "pick-course.html";
        }
    })

);

// register new user


document.querySelector(
    ".RegisterForm",
    addEventListener("submit", (e) => {
        e.preventDefault(e);
        if (RegisterForm.classList.contains("myNone")) {
            return false;
        }

        const uname = document.querySelector('#Username').value;
        const password = document.querySelector('#pwd').value;
        const storedUname = JSON.parse(localStorage.getItem("User:" + " " + uname));
        // const storedUname = localStorage.getItem("User:" + " " + uname);
        if (storedUname == null) {
            const user = new User(uname, password, course = []);
            localStorage.setItem("User:" + " " + uname, JSON.stringify(user));
            // localStorage.setItem("Password:" + " " + uname, password);
            showAlert(`${uname} registered successfuly`, 'success', '.LoginForm', '.h2l');

            displayForm(e);
            document.querySelector('#user').value = uname;
            document.querySelector('#pw').value = password;

        }
        else {
            showAlert(`User name: ${uname}, already exists`, 'danger', '.RegisterForm', '.h2r');
        }

    })

);

//   Alertfunc Register form

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

// Check to see if the page loaded with a storage cleared or user cleared and alert

document.addEventListener('DOMContentLoaded', () => {

    const alertUser = window.location.search.split('?')[1]
    if (alertUser == null) {
        return false;
    }
    if (alertUser == 'empty') {
        showAlert(`LocalStorage Cleared`, 'success', '.LoginForm', '.h2l')
        return false;
    }
    showAlert(`User: ${alertUser} deleted`, 'success', '.LoginForm', '.h2l')
    return false;
})


// forgot function
document.querySelector('.forgot').addEventListener(
    "click", () =>
        showAlert(`press f12 and check your local storage`, 'success', '.LoginForm', '.h2l'))