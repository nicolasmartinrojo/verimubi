import z, { hash } from "zod";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { usersTable } from "~~/server/database/schema";
import { eq } from "drizzle-orm";
// import { usersTable } from "../database/schema";

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
});

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  // 2.revisar si el usuario ya existe

  const { db_file_name } = useRuntimeConfig();
  const db = drizzle(db_file_name);
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();

  if (existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "email already exists",
    });
  }
  const hashedPassword = await hashPassword(password);

  const [newUser] = await db
    .insert(usersTable)
    .values({ email, password: hashedPassword })
    .returning();
  //   return newUser;

  //   const newUser2: typeof usersTable.$inferInsert = {
  //     email: email,
  //     password: hashedPassword,
  //   };

  //   await db.insert(usersTable).values(newUser2);

  await setUserSession(event, {
    email: email,
  });
  //   if (email == "nicolas.martin.rojo@gmail.com" && password === "123123") {
  //     await setUserSession(event, {
  //       user: {
  //         email,
  //         username: "Nico",
  //       },
  //     });
  //     return {};
  //   }
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: "Invalid mail or password",
  //   });
  //   return { email, password };
  //   const body = await readBody(event);
  //   return {
  //     message: "movie created",
  //     movie: body,
  //   };
});
