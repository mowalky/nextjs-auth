import { hash } from "bcryptjs";

export async function hashPassword(password) {
  const salt = await hash(password, 12);
  return salt;
}
