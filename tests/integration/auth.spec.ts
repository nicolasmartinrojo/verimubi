import { setup } from "@nuxt/test-utils";
import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";

let nuxt: any;
let cookie: string | undefined;

beforeAll(async () => {
  // Stub server-side $fetch used in /api/movies to avoid external HTTP calls
  const original$fetch =
    (globalThis as any).$fetch || (globalThis as any).fetch;
  vi.stubGlobal("$fetch", async (url: string, opts?: any) => {
    if (typeof url === "string" && url.includes("omdbapi.com")) {
      return {
        Search: [
          {
            Title: "The Matrix",
            Year: "1999",
            Poster: "N/A",
            imdbID: "tt0133093",
          },
        ],
      };
    }
    return original$fetch(url, opts);
  });

  nuxt = await setup({
    rootDir: process.cwd(),
    server: true,
  });
});

afterAll(async () => {
  if (nuxt) await nuxt.teardown();
});

describe("Auth API", () => {
  it("login returns success with known credentials", async () => {
    const resp = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nicolas.martin.rojo@gmail.com",
        password: "123123",
      }),
    });
    expect(resp.status).toBe(200);
    const data = await resp.json();
    expect(data).toHaveProperty("message");
    const setCookie = resp.headers.get("set-cookie");
    if (setCookie) cookie = setCookie.split(";")[0];
  });

  it("login fails with wrong credentials", async () => {
    const resp = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nicolas.martin.rojo@gmail.com",
        password: "wrong",
      }),
    });
    // API returns 400 for invalid credentials in this app
    expect(resp.status).toBe(400);
    const body = await resp.json();
    expect(body).toHaveProperty("statusMessage");
  });

  it("root route requires authentication (redirects to login)", async () => {
    const resp = await fetch("http://localhost:3000/", { redirect: "manual" });
    if (resp.status >= 500) {
      const text = await resp.text();
      // print server error for debugging
      // eslint-disable-next-line no-console
      console.error("ROOT ERROR BODY:", text);
    }
    // Expect a redirect to /auth/login
    expect([302, 307, 301]).toContain(resp.status);
    const loc = resp.headers.get("location") || "";
    expect(loc).toContain("/auth/login");
  });

  it("movie search returns results when authenticated", async () => {
    // Ensure we have cookie from successful login
    expect(cookie).toBeTruthy();
    const resp = await fetch("http://localhost:3000/api/movies?search=matrix", {
      headers: { cookie: cookie as string },
    });
    expect(resp.status).toBe(200);
    const data = await resp.json();
    expect(data).toHaveProperty("Search");
    expect(Array.isArray(data.Search)).toBe(true);
    expect(data.Search[0].Title).toBe("The Matrix");
  });
});
