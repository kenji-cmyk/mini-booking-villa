import { encodeBasicAuth } from "@/api/auth";
import type { ApiEnvelope, ApiError, BasicAuthCredentials } from "@/api/types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions<TBody = unknown> = {
  auth?: { type: "bearer"; token: string } | { type: "basic"; credentials: BasicAuthCredentials };
  body?: TBody;
  headers?: HeadersInit;
  method?: HttpMethod;
  retries?: number;
  timeoutMs?: number;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const defaultTimeoutMs = 12000;

function buildAuthHeader(auth: RequestOptions["auth"]): string | undefined {
  if (!auth) {
    return undefined;
  }

  if (auth.type === "bearer") {
    return `Bearer ${auth.token}`;
  }

  return encodeBasicAuth(auth.credentials);
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const payload = (await response.json()) as ApiEnvelope<T> | T;
  const normalized = "success" in Object(payload) ? (payload as ApiEnvelope<T>) : { success: response.ok, data: payload as T };

  if (!response.ok || !normalized.success) {
    throw {
      message: normalized.error ?? normalized.message ?? "Request failed. Please try again.",
      status: response.status
    } satisfies ApiError;
  }

  return normalized.data as T;
}

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const method = options.method ?? "GET";
  const retries = method === "GET" ? options.retries ?? 1 : 0;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), options.timeoutMs ?? defaultTimeoutMs);

    try {
      const response = await fetch(`${apiBaseUrl}${path}`, {
        method,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...(buildAuthHeader(options.auth) ? { Authorization: buildAuthHeader(options.auth) } : {}),
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      window.clearTimeout(timeoutId);
      return await parseResponse<TResponse>(response);
    } catch (error) {
      window.clearTimeout(timeoutId);
      lastError = error;
      if (attempt === retries) {
        break;
      }
    }
  }

  if (lastError && typeof lastError === "object" && "message" in lastError) {
    throw lastError;
  }

  throw { message: "Network request timed out. Please try again.", status: 0 } satisfies ApiError;
}
