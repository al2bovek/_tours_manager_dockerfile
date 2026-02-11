import { sql } from "../dbConnection.js";

export const getAllUsersM = async () => {
    const usersList =  await sql`
    select * from users
    order by users.id DESC
    `;
    return usersList;
}

 export const createUserM = async (user) => {
    const users =  await sql`
    insert into users ${sql(user, "username", "email", "password")}
    returning *
    `
    return users[0];
 }

 export const getUserByEmailM = async (email) => {
    const users = await sql`
    select * from users 
    where email = ${email}
    `
    return users[0];

 }