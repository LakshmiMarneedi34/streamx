/* eslint-disable no-unused-vars */
// export const checkValidateData = (email, password) => {
//     console.log("#### validations",email,password)
//     const trimmedEmail = email?.trim(); 
//     const trimmedPassword = password?.trim();

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     const isEmailValid = trimmedEmail && emailRegex.test(trimmedEmail);
//     const isPasswordValid = trimmedPassword && passwordRegex.test(trimmedPassword);

//     const errors = {};
    
//     if (!isEmailValid) errors.email = "Email ID is not valid";
//     if (!isPasswordValid) errors.password = "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.";

//     return Object.keys(errors).length > 0 ? errors : null;
// };

export const checkValidateData = (name,value)=>{
    const trimmedValue = value?.trim();
    const errors = {};

    if(name === "name" && (!trimmedValue || trimmedValue?.length <3)){
        errors.name = "Name must have at least 3 characters";
    }

    if(name === "email"){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!trimmedValue || !emailRegex.test(trimmedValue)){
            errors.email = "Email ID is not valid";
        }
    }

    if(name === "password"){
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
        if(!trimmedValue || !passwordRegex.test(trimmedValue)){
           errors.password = "Password must have at least 4 characters, including one uppercase, one lowercase, one number, and one special character.";
            
    }
}
return errors;
}

export const checkAllFields = ({ name, email, password }) => {
    console.log("#### values", name, email, password);
    let errors = {};

    if (name !== undefined) {
        errors = { ...errors, ...checkValidateData("name", name) };
    }
    if (email !== undefined) {
        errors = { ...errors, ...checkValidateData("email", email) };
    }
    if (password !== undefined) {
        errors = { ...errors, ...checkValidateData("password", password) };
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
