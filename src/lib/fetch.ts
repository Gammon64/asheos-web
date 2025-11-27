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
  private headers = new Headers();
  private body?: any;

  constructor() {}

  private async api(path: string, init?: RequestInit) {
    const baseURL = process.env.BACKEND_API_URL;
    const apiPrefix = "/api";
    const url = new URL(apiPrefix.concat(path), baseURL);

    this.headers = new Headers(init?.headers);
    this.body = init?.body;

    // Lida com token e header de autorização
    await this.handleAuthorization();
    // Lida com o Content-Type e body
    this.handleContentType();

    const response = await fetch(url.toString(), {
      ...init,
      headers: this.headers,
      body: this.body,
    });

    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = response.statusText;
    }

    const fetchResponse = { ...response, data: responseData };

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`, fetchResponse);
      throw new FetchError(
        `HTTP error! status: ${response.status}`,
        fetchResponse,
        init?.method || "GET",
        url.toString(),
        this.headers
      );
    }

    return fetchResponse;
  }

  private async handleAuthorization() {
    const token = (await cookies()).get("token")?.value;

    if (token) {
      this.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  private handleContentType() {
    const isFormData = this.body && this.body instanceof FormData;

    if (isFormData) {
      this.headers.delete("Content-Type");
    } else {
      this.headers.set("Content-Type", "application/json");
      this.body = JSON.stringify(this.body);
    }
  }

  async get(path: string, init?: RequestInit) {
    return this.api(path, {
      method: "GET",
      ...init,
    });
  }

  async post(path: string, body?: any, init?: RequestInit) {
    return this.api(path, {
      method: "POST",
      body,
      ...init,
    });
  }

  async patch(path: string, body?: any, init?: RequestInit) {
    return this.api(path, {
      method: "PATCH",
      body,
      ...init,
    });
  }

  async put(path: string, body?: any, init?: RequestInit) {
    return this.api(path, {
      method: "PUT",
      body,
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
