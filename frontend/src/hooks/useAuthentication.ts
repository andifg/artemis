import { getCookie, removeCookie } from "typescript-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useCentralState } from "@/hooks/useCentralState";

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
  const { setServings } = useCentralState();
  const portions = useCentralState((state) => state.servings);

  const { setDailyOverview } = useCentralState();
  const dailyOverviewMap = useCentralState((state) => state.dailyOverview);

  let user: User;

  const id_token = getCookie("id_token");
  // console.log("id_token", id_token);

  const initiateLogin = () => {
    console.log("Redirecting to auth provider");

    window.location.href = `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/artemis/protocol/openid-connect/auth?response_type=code&client_id=artemis&redirect_uri=${import.meta.env.VITE_KEYCLOAK_REDIRECT_URL}/api/v1/login&state=1234&scope=openid`;
  };

  const logout = () => {
    console.log("logout");

    if (Object.keys(portions).length > 0) {
      setServings({});
    }

    if (Object.keys(dailyOverviewMap).length > 0) {
      setDailyOverview([]);
    }

    removeCookie("id_token");

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
    console.log("logggggooouuttt");
    logout();
  }

  const getUser = (): User => {
    return user;
  };

  return { initiateLogin, checkIfUserCookiesExist, logout, getUser };
}

export { useAuthentication };
