import * as Yup from "yup";

export const signInSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Enter a valid email address.")
        .required("Email is required."),

    password: Yup.string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters long.")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
        .matches(/[0-9]/, "Password must contain at least one number."),
});
