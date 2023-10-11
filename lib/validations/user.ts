import * as z from "zod";

export const userNameSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be maximum Of 3 Characters")
    .max(32, "Name must be minimum than 32 Charactersz"),
});
export const userPasswordSchema = z
  .object({
    password: z
      .string()
      .min(3, "Name must be maximum Of 3 Characters")
      .max(32, "Name must be minimum than 32 Charactersz"),
    confirmPassword: z
      .string()
      .min(3, "Name must be maximum Of 3 Characters")
      .max(32, "Name must be minimum than 32 Charactersz"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password you entered is not Matched",
        path: ["matchPassword"],
      });
    }
  });
