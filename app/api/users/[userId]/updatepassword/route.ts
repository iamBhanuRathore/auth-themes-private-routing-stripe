import { getCurrentUser } from "@/lib/sesssion";
import { z } from "zod";
import User from "@/models/user";
import bcrypt from "bcrypt";
// import { userPasswordSchema } from "@/lib/validations/user";
// import { getCurrentUser } from "@/lib/sesssion";
// const routeContextSchema = z.object({
//   params: z.object({
//     userId: z.string(),
//   }),
// });

// export async function PATCH(
//   req: Request,
//   context: z.infer<typeof routeContextSchema>
// ) {
//   try {
//     // Validate the route context.
//     const { params } = routeContextSchema.parse(context);
//     const user = await getCurrentUser();

//     // Ensure user is authentication and has access to this user.
//     if (!user || params.userId !== user.id) {
//       return new Response("Not Authorized to Access this Resource", {
//         status: 403,
//       });
//     }

//     // Get the request body and validate it.
//     const body = await req.json();
//     const payload = userPasswordSchema.parse(body);
//     const updatedUser = await User.findByIdAndUpdate(user.id, {
//       password: payload.password,
//     });
//     if (!updatedUser) {
//       return new Response("NOT FOUND: Unable To find the User", {
//         status: 404,
//       });
//     }

//     return new Response("Successfully Updated the Profile !!", { status: 200 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 });
//     }

//     return new Response("Internal Srever Error", { status: 500 });
//   }
// }

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const user = await getCurrentUser();
    const body = await req.json();
    // Ensure user is authentication and has access to this user.
    if (!user || params.userId !== user.id) {
      return new Response("Not Authorized to Access this Resource", {
        status: 403,
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(user.id, {
      hashedPassword: hashedPassword,
    });
    if (!updatedUser) {
      return new Response("NOT FOUND: Unable To find the User", {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({
        message: "Hello I am Bhanu",
        params,
        user,
        body,
        updatedUser,
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response("Internal Srever Error", { status: 500 });
  }
}
