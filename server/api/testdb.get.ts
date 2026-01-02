import "dotenv/config";
import { drizzle } from "drizzle-orm/sqlite";
import Database from "better-sqlite3";
import { usersTable } from "../database/schema";

// async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     name: "John",
//     age: 30,
//     email: "john@example.com",
//   };
//   await db.insert(usersTable).values(user);
//   console.log("New user created!");

//   console.log("Getting all users from the database: ", users);
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */
//   await db
//     .update(usersTable)
//     .set({
//       age: 31,
//     })
//     .where(eq(usersTable.email, user.email));
//   console.log("User info updated!");
//   await db.delete(usersTable).where(eq(usersTable.email, user.email));
//   console.log("User deleted!");
// }
// main();

export default eventHandler(async (event) => {
  const { db_file_name } = useRuntimeConfig();
  const sqlitePath = db_file_name?.startsWith("file:")
    ? db_file_name.replace("file:", "")
    : db_file_name;
  const sqlite = new Database(sqlitePath || "local.db");
  const db = drizzle(sqlite);
  const users = await db.select().from(usersTable);
  return users;
});
