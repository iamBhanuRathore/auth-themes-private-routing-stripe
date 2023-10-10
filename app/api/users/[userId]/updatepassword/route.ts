import { z } from "zod";

import { userPasswordSchema } from "@/lib/validations/user";
import { getCurrentUser } from "@/lib/sesssion";
import User from "@/models/user";
const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

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

export async function PATCH(req: Request) {
  const data = await req.json();
  console.log(data);
  return new Response("Hello I am Banu", data);
}
