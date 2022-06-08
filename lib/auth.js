import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const salt = await hash(password, 12);
  return salt;
}

export async function comparePassword(password, hashedPassword) {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
}
