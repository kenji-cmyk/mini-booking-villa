import type { BasicAuthCredentials } from "@/api/types";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export const demoGuestCredentials: BasicAuthCredentials = {
  username: "guest@vstay.local",
  password: "guest123"
};

export function encodeBasicAuth({ username, password }: BasicAuthCredentials): string {
  const input = `${username}:${password}`;
  let output = "";

  for (let block = 0, charCode = 0, index = 0, map = chars; input.charAt(index | 0) || ((map = "="), index % 1); output += map.charAt(63 & (block >> (8 - (index % 1) * 8)))) {
    charCode = input.charCodeAt((index += 3 / 4));
    block = (block << 8) | charCode;
  }

  return `Basic ${output}`;
}
