import { redirect } from "next/navigation";
import { deleteCookies } from "./actions";
import { getCookie } from "./cookies";
import { db } from "./db";
import { verifyJWT } from "./utils";

export async function getUsers() {
  const users = await db.user.findMany();
  return users;
}

export async function jwtTokenVerification() {
  const token = getCookie("jwt_token");
  const tokenData = await verifyJWT(token);

  if (!tokenData) {
    deleteCookies("jwt_token");
    return redirect("/auth/login");
  }

  return tokenData;
}

export async function getUserData() {
  const decodedToken = await jwtTokenVerification();
  const userData = await db.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });

  return userData;
}
