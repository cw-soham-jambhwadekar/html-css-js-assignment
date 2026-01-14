// imports of reusable functions
import { validateEmailField, validateReqField } from "./utils.js";

// grouping of fields that share same validation logic
const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
}

// fields that have unique validation logic
const form = document.getElementById("contactForm");
const successToast = document.getElementById("successToast");
const checkbox = document.querySelector(".checkbox");
const radioField = document.querySelector(".radio-field")

// attachment of event listners on elements of fields for dynamic validation
Object.keys(fields).forEach(ele => {
    fields[ele].addEventListener("blur", () => {
        if(ele === "email"){
            validateEmailField(fields[ele]);
        }else{
            validateReqField(fields[ele]);
        }
    })
})

// form validation after submit
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

    // removal of invalid tag
    document.querySelectorAll(".invalid").forEach(el => {
        el.classList.remove("invalid");
    });

    // logic of success toast message
    successToast.classList.add("show");
    successToast.classList.remove("hidden");

    setTimeout(() => {
        successToast.classList.remove("show");
        successToast.classList.add("hidden");
    }, 2000);
});