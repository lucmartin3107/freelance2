import { object, string, TypeOf, number, array } from "zod";
export const createUserSchema = object({
  body: object({
    firstname: string({
      required_error: "Name is required",
    }),
    lastname: string({
      required_error: "Name is required",
    }),
    age: number({
      required_error: "Name is required",
    }),
    major: number({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    country: string({
      required_error: "Name is required",
    }),
    city: string({
      required_error: "Name is required",
    }),
    postcode: number({
      required_error: "Name is required",
    }),
    additionnalInfo: string({
      required_error: "Name is required",
    }),
    diploma: array(string()),
    yearOfGraduation: number({
      required_error: "Name is required",
    }),
    school: string({
      required_error: "Name is required",
    }),
    countryschool: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});
const userSchema = {
  body: object({
    firstname: string({
      required_error: "Name is required",
    }),
    lastname: string({
      required_error: "Name is required",
    }),
    age: number({
      required_error: "Name is required",
    }),
    major: number({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    country: string({
      required_error: "Name is required",
    }),
    city: string({
      required_error: "Name is required",
    }),
    postcode: number({
      required_error: "Name is required",
    }),
    additionnalInfo: string({
      required_error: "Name is required",
    }),
    diploma: array(string()),
    yearOfGraduation: number({
      required_error: "Name is required",
    }),
    school: string({
      required_error: "Name is required",
    }),
    countryschool: string({
      required_error: "Name is required",
    })
  
  }),
};

 
const params = {
  params: object({
    userId: string({
      required_error: "usertId is required",
    }),
  }),
};

export const getUserSchema = object({
  ...userSchema,
});

export const updateUserSchema = object({
 
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});


export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;