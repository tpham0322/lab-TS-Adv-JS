export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "NetworkError";

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export function handleError(error: unknown): void {
  if (error instanceof ApiError) {
    console.error(
      `API Error (${error.statusCode}): ${error.message}`
    );
  } else if (error instanceof NetworkError) {
    console.error(`Network Error: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error("An unknown error occurred.");
  }
}