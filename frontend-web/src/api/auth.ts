import type { BasicAuthCredentials } from "@/api/types";

export const demoGuestCredentials: BasicAuthCredentials = {
  username: "guest@vstay.local",
  password: "guest123"
};

export function encodeBasicAuth({ username, password }: BasicAuthCredentials): string {
  return `Basic ${window.btoa(`${username}:${password}`)}`;
}
