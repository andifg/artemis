import { UnauthorizedError } from "./types";

const handleApiRequest = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    throw new UnauthorizedError();
  }

  if (response.status !== 200) {
    throw new Error(
      `Failed to get meat portions with error: ${response.statusText}`,
    );
  }

  return response.json();
};

export { handleApiRequest };
