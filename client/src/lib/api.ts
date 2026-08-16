import { logger } from "@packages/logger/browser";

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

async function request<T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(path, process.env.NEXT_PUBLIC_API_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const start = performance.now();

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      method,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    const durationMs = Math.round(performance.now() - start);

    logger.http(`${method} ${path}`, {
      method,
      path,
      status: res.status,
      durationMs,
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    const durationMs = Math.round(performance.now() - start);

    logger.http(`${method} ${path} failed`, {
      method,
      path,
      durationMs,
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
            }
          : error,
    });

    throw error;
  }
}

export const api = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>("GET", path, options);
  },

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("POST", path, {
      ...options,
      ...(body !== undefined && {
        body: JSON.stringify(body),
      }),
    });
  },

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PUT", path, {
      ...options,
      ...(body !== undefined && {
        body: JSON.stringify(body),
      }),
    });
  },

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PATCH", path, {
      ...options,
      ...(body !== undefined && {
        body: JSON.stringify(body),
      }),
    });
  },

  delete<T>(path: string, options?: RequestOptions) {
    return request<T>("DELETE", path, options);
  },
};
