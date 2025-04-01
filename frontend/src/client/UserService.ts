import { API } from "./config";
import { handleApiRequest } from "./utils";

import { User, BodyUpdateUser, APIResponse } from "./types";

class UserService {
  public static GetUser(userID: string): Promise<APIResponse<User>> {
    const url = `${API.baseURL}/api/v1/user/${userID}`;

    return handleApiRequest<APIResponse<User>>(url);
  }
  public static UpdateUser(
    bodyUpdateUser: BodyUpdateUser,
    userID: string,
  ): Promise<APIResponse<User>> {
    const url = `${API.baseURL}/api/v1/user/${userID}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bodyUpdateUser),
    };

    return handleApiRequest<APIResponse<User>>(url, options);
  }
}

export { UserService };
