const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
}

const form = document.getElementById("contactForm");
const successToast = document.getElementById("successToast");
const checkbox = document.querySelector(".checkbox");
const radioField = document.querySelector(".radio-field")

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function markInvalid(element) {
    element.classList.add("invalid");
    element.setAttribute("aria-invalid", "true");
}

function clearInvalid(element) {
    element.classList.remove("invalid");
    element.removeAttribute("aria-invalid");
}

function validateReqField(element) {
    if (element.value.trim() === "") {
        markInvalid(element);
        return false;
    }

    clearInvalid(element);
    return true;
}

function validateEmailField(element) {
    if (!emailPattern.test(element.value.trim())) {
        markInvalid(element);
        return false;
    } 

    clearInvalid(element);
    return true;
}

fields.firstName.addEventListener("blur", () => {
    validateReqField(fields.firstName);
});

fields.lastName.addEventListener("blur", () => {
   validateReqField(fields.lastName);
});

fields.email.addEventListener("blur", () => {
    validateEmailField(fields.email)
});

fields.message.addEventListener("blur", () => {
   validateReqField(fields.message);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isFirstNameValid = validateReqField(fields.firstName);
    const isLastNameValid = validateReqField(fields.lastName);
    const isEmailValid = validateEmailField(fields.email);
    const isMessageValid = validateReqField(fields.message);

    if(!(isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid)) return;

    const queryType = document.querySelector('input[name="queryType"]:checked');
    const consent = document.getElementById("consent").checked;

    if (!queryType) {
        radioField.classList.add("invalid");
        return;
    } else {
        radioField.classList.remove("invalid");
    }

    if (!consent) {
        checkbox.classList.add("invalid");
        return;
    } else {
        checkbox.classList.remove("invalid");
    }

    form.reset();

    document.querySelectorAll(".invalid").forEach(el => {
        el.classList.remove("invalid");
    });

    successToast.classList.add("show");
    successToast.classList.remove("hidden");

    setTimeout(() => {
        successToast.classList.remove("show");
        successToast.classList.add("hidden");
    }, 2000);
});