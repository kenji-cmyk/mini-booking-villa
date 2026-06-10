import { encodeBasicAuth } from "@/api/auth";

describe("encodeBasicAuth", () => {
  it("formats HTTP Basic credentials", () => {
    expect(encodeBasicAuth({ username: "guest@vstay.local", password: "guest123" })).toBe(
      "Basic Z3Vlc3RAdnN0YXkubG9jYWw6Z3Vlc3QxMjM="
    );
  });
});
