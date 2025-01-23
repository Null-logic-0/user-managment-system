"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createJWT } from "./utils";
import { setCookie } from "./cookies";
import { cookies } from "next/headers";
import { jwtTokenVerification } from "./data-services";

export async function createUser(prevState, formData) {
  const salt = bcrypt.genSaltSync(5);
  const hashedPassword = await bcrypt.hash(formData.get("password"), salt);

  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  };

  let errors = {};

  if (!data.email) {
    errors.email = "Email is required.";
  }
  if (!data.email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.fullName) {
    errors.fullName = "Please provide a full name.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  }

  if (data.password !== data.repeatPassword) {
    errors.repeatPassword = "Passwords didn't match.";
  }

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    errors.email = "Email is already taken";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await db.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      lastLogin: new Date(),
      loginStatus: false,
      blocked: false,
    },
  });

  revalidatePath("/auth/login", "page");
  redirect("/auth/login");
}

export async function deleteUser(userId) {
  await jwtTokenVerification();
  await db.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath("/", "layout");
}

export async function blockUser(userId) {
  await jwtTokenVerification();
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return { success: false, message: `User with ID ${userId} not found.` };
    }

    await db.user.update({
      where: { id: userId },
      data: { blocked: true },
    });

    revalidatePath("/");
    console.log(`User with ID ${userId} has been blocked.`);
    return {
      success: true,
      message: `User with ID ${userId} has been blocked.`,
    };
  } catch (error) {
    console.error("Error blocking user:", error.message || error);
    return { success: false, message: "Failed to block user." };
  }
}

export async function unBlockUser(userId) {
  await jwtTokenVerification();
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return { success: false, message: `User with ID ${userId} not found.` };
    }

    await db.user.update({
      where: { id: userId },
      data: { blocked: false },
    });

    revalidatePath("/");
    console.log(`User with ID ${userId} has been unblocked.`);
    return {
      success: true,
      message: `User with ID ${userId} has been unblocked.`,
    };
  } catch (error) {
    console.error("Error unblocking user:", error.message || error);
    return { success: false, message: "Failed to unblock user." };
  }
}

export async function login(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user || user.blocked) {
    return redirect(
      `/auth/login?errorMessage=${
        !user
          ? "Invalid credentials. Please try again."
          : "Your account has been blocked. Please contact support."
      }`
    );
  }

  const isValidPassword = await bcrypt.compare(data.password, user?.password);

  if (!isValidPassword) {
    return redirect(
      `/auth/login?errorMessage=Invalid credentials. Please try again.`
    );
  }

  const token = await createJWT(user);
  setCookie("jwt_token", token, { maxAge: 2 * 60 * 60 });
  redirect("/");
}

export async function deleteCookies(name) {
  cookies().delete(name);
}

export async function logout() {
  deleteCookies("jwt_token");
  redirect("/auth/login");
}
