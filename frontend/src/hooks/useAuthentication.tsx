import { getCookie } from "typescript-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

type User = {
  username: string;
  email: string;
  id: string;
};

interface ExtendedJwtPayload extends JwtPayload {
  preferred_username: string;
  email: string;
}

interface useAuthenticationReturn {
  initiateLogin: () => void;
  logout: () => void;
  checkIfUserCookiesExist: () => void;
  getUser: () => User;
}

function useAuthentication(): useAuthenticationReturn {
  let user: User;

  const id_token = getCookie("id_token");
  console.log("id_token", id_token);

  const initiateLogin = () => {
    console.log("Redirecting to auth provider");

    if (window.location.origin == "http://localhost:5173") {
      window.location.href =  "http://keycloak:8080/realms/artemis/protocol/openid-connect/auth?response_type=code&client_id=artemis&redirect_uri=http://localhost:8000/api/v1/login&state=1234&scope=openid";
      return;
    }

    window.location.href = `https://test-keycloak-meat-meater-dev.apps.ocp4.gummy-bears.de/realms/artemis/protocol/openid-connect/auth?response_type=code&client_id=artemis&redirect_uri=${window.location.origin}/api/v1/login&state=1234&scope=openid`;
  };

  const logout = () => {
    console.log("logout");

    if (window.location.pathname != "/") {
      console.log(window.location.pathname);
      console.log("redirecting to /");

      window.location.href = "/";
    }
  };

  const checkIfUserCookiesExist = () => {
    if (id_token) {
      console.log("Found existing tokens, redirecting to dashboard");
      window.location.href = "/dashboard";
    } else {
      console.log("Not logged in");
    }
  };

  if (id_token) {
    const decodedToken = jwtDecode<ExtendedJwtPayload>(id_token);
    user = {
      username: decodedToken.preferred_username || "",
      email: decodedToken.email,
      id: decodedToken.sub || "",
    };

    // console.log("user", user);
  } else {
    // console.log("no id_token");
    logout();
  }

  const getUser = (): User => {
    return user;
  };

  return { initiateLogin, checkIfUserCookiesExist, logout, getUser };
}

export { useAuthentication };
