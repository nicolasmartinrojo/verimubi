// export default eventHandler(async (event) => {
//   const body = await readBody(event);
//   return {
//     message: "movie created",
//     movie: body,
//   };
// });

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/sqlite";
import Database from "better-sqlite3";
import z from "zod";
import { usersTable } from "~~/server/database/schema";

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
});

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  // 2.revisar si el usuario ya existe

  const { db_file_name } = useRuntimeConfig();
  const sqlitePath = db_file_name?.startsWith("file:")
    ? db_file_name.replace("file:", "")
    : db_file_name;
  const sqlite = new Database(sqlitePath || "local.db");
  const db = drizzle(sqlite);
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid mail or password",
    });
  }
  const isPasswordValid = await verifyPassword(existingUser.password, password);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid mail or password",
    });
  }

  await setUserSession(event, {
    user: {
      email: email,
    },
  });
  return { message: "login successful" };
  //   const [newUser] = await db
  //     .insert(usersTable)
  //     .values({ email, password: hashedPassword })
  //     .returning();
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
  //

  //     const { email, password } = await readValidatedBody(event, bodySchema.parse);

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
  //   //   return { email, password };
  //   //   const body = await readBody(event);
  //   //   return {
  //   //     message: "movie created",
  //   //     movie: body,
  //   //   };
});
