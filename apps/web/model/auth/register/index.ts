import * as Yup from "yup";

export const registerSchema = Yup.object({
    full_name: Yup.string()
        .trim()
        .required("Full name is required.")
        .min(2, "Full name must be at least 2 characters long.")
        .max(100, "Full name must be at most 100 characters long."),

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

    privacy_policy: Yup.boolean()
        .oneOf([true], "You must accept the privacy policy.")
        .optional(),
});
