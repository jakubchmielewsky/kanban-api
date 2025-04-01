import jwt from "jsonwebtoken";

export function signToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN as string),
  });
}
