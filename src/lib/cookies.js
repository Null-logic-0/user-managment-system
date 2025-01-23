import { cookies } from "next/headers";

export async function setCookie(email, value, options = {}) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    ...options,
  };

  const cookieStore = await cookies();
  cookieStore.set(email, value, cookieOptions);
}

// export function getCookie(email) {
//   const cookie = cookies().get(email);
//   return cookie?.value || null;
// }

export function getCookie(cookieName) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);
  return cookie?.value || null;
}
