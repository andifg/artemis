import { UnauthorizedError } from "@/client/types";
import { useAuthentication } from "./useAuthentication";

interface ClientCallConfig<T, K extends unknown[]> {
  function: (...args: K) => Promise<T>;
  rethrowError?: boolean | undefined;
  args: K;
}

function useClient() {
  const { logout } = useAuthentication();

  async function callClientServiceMethod<T, K extends unknown[]>(
    clientCallConfig: ClientCallConfig<T, K>,
  ): Promise<T> {
    try {
      return await clientCallConfig.function(...clientCallConfig.args);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log("Error during fetch of coffee");
        console.log(e);

        if (e instanceof UnauthorizedError) {
          console.log("Unauthorized error");
          logout();
        }
      }

      if (clientCallConfig.rethrowError) {
        throw e;
      }
    }

    return undefined as T;
  }

  return [callClientServiceMethod];
}

export { useClient };
