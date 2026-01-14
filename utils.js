export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// addition of invalid css class to the invalid input
export function markInvalid(element) {
    element.classList.add("invalid");
    element.setAttribute("aria-invalid", "true");
}

// removal of invalid class
export function clearInvalid(element) {
    element.classList.remove("invalid");
    element.removeAttribute("aria-invalid");
}

export function validateReqField(element) {
    if (element.value.trim() === "") {
        markInvalid(element);
        return false;
    }

    clearInvalid(element);
    return true;
}

// separate logic for email validation
export function validateEmailField(element) {
    if (!emailPattern.test(element.value.trim())) {
        markInvalid(element);
        return false;
    } 

    clearInvalid(element);
    return true;
}