import jwt from "jsonwebtoken";

export function signToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN as string),
  });
}

export function verifyToken(token: string, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}
