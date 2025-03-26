export const checkValidateData = (email, password) => {
    const trimmedEmail = email?.trim(); 
    const trimmedPassword = password?.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isEmailValid = trimmedEmail && emailRegex.test(trimmedEmail);
    const isPasswordValid = trimmedPassword && passwordRegex.test(trimmedPassword);

    const errors = {};
    
    if (!isEmailValid) errors.email = "Email ID is not valid";
    if (!isPasswordValid) errors.password = "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.";

    return Object.keys(errors).length > 0 ? errors : null;
};
