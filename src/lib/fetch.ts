import { cookies } from "next/headers";

class FetchError extends Error {
  response: Response & { data?: any };
  config: {
    method: string;
    url: string;
    headers: Headers;
  };

  constructor(
    message: string,
    response: Response & { data?: any },
    method: string,
    url: string,
    headers: Headers
  ) {
    super(message);
    this.name = "FetchError";
    this.response = response;
    this.config = {
      method,
      url,
      headers,
    };

    // Preserva a cadeia de protótipos para instanceof
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}

class FetchImpl {
  constructor() {}

  private async api(path: string, init?: RequestInit) {
    const baseURL = process.env.BACKEND_API_URL;
    const apiPrefix = "/api";
    const url = new URL(apiPrefix.concat(path), baseURL);

    const token = (await cookies()).get("token")?.value;

    const headers = new Headers(init?.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url.toString(), {
      ...init,
      headers,
    });

    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = response.statusText;
    }

    const fetchResponse = { ...response, data: responseData };

    if (!response.ok) {
      throw new FetchError(
        `HTTP error! status: ${response.status}`,
        fetchResponse,
        init?.method || "GET",
        url.toString(),
        headers
      );
    }

    return fetchResponse;
  }

  async get(path: string, init?: RequestInit) {
    return this.api(path, {
      method: "GET",
      ...init,
    });
  }

  async post(path: string, body: unknown, init?: RequestInit) {
    return this.api(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      body: JSON.stringify(body),
      ...init,
    });
  }

  async patch(path: string, body?: unknown, init?: RequestInit) {
    return this.api(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      body: JSON.stringify(body),
      ...init,
    });
  }

  async put(path: string, body: unknown, init?: RequestInit) {
    return this.api(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      body: JSON.stringify(body),
      ...init,
    });
  }

  async delete(path: string, init?: RequestInit) {
    return this.api(path, {
      method: "DELETE",
      ...init,
    });
  }
}

const http = new FetchImpl();

export { FetchError, http };
