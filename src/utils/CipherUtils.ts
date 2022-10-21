import crypto from "crypto";
import zion from "@config/zion.config.json";
const algo = zion.cipher.alg;
const key = zion.cipher.key;
const iv = zion.cipher.iv;

export const encrypted = (plainText: string | undefined) => {
  if (plainText == "" || plainText == undefined) {
    return "";
  }
  let cipher = crypto.createCipheriv(algo, key, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};
export const decrypted = (encrypted: string) => {
  let decipher = crypto.createDecipheriv(algo, key, iv);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};
