// export default eventHandler(async (event) => {
//   const body = await readBody(event);
//   return {
//     message: "movie created",
//     movie: body,
//   };
// });

import z from "zod";

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
});

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  if (email == "nicolas.martin.rojo@gmail.com" && password === "123123") {
    await setUserSession(event, {
      user: {
        email,
        username: "Nico",
      },
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    statusMessage: "Invalid mail or password",
  });
  //   return { email, password };
  //   const body = await readBody(event);
  //   return {
  //     message: "movie created",
  //     movie: body,
  //   };
});
