export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const textPattern = /^[a-zA-Z]$/;

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
    const errorEle = element.nextElementSibling;
    if (element.value.trim() === "") {
        markInvalid(element);
        return false;
    } else if(element.name !== "message" && !textPattern.test(element.value.trim())) {
        markInvalid(element);
        if(errorEle && errorEle.classList.contains("error")){
            errorEle.textContent = `Not a valid ${element.name}`
        }
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