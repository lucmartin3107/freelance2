import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string()
        .required("password is required")
        .min(6, "Password us to short - should be 6 chars minimum")
        .matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "password must match"
        ),
        email: string()
        .email("must be a valid email bro")
        .required("Email is required"),
    }),
});