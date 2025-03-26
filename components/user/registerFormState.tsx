export type RegisterFormState = | {
  errors?: {
    displayname?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;