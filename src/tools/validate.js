
export const validateContact = (form) => {

    const errors = {};

        if (!form.name.trim()) {
        errors.name = "Please enter your name.";
    }

  
    else if (form.name.trim().length <= 3) {
        errors.name = "Enter a valid name.";
    }

   
    else if (/[^A-Za-z\s]/.test(form.name)) {
        errors.name = "No special characters allowed.";
    }



    if (!form.contact.trim()) {
        errors.contact = "Please enter a number.";
    }

  
    else if (form.contact.trim().length < 9) {
        errors.contact = "Invalid number.";
    }

    else if (/[^0-9+]/.test(form.contact)) {
        errors.contact = "Only numbers are allowed.";
    }

    return errors;
};
