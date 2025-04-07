import {
  APIResponse,
  AverageServings,
  AggregatedServings,
  BodyCreateServing,
  ServingDateList,
  Serving,
  Timeframe,
  DailyOverviewMap,
} from "./types";
import { API } from "./config";
import { handleApiRequest } from "./utils";

class ServingService {
  public static CreateServing(
    bodyCreateServing: BodyCreateServing,
    userID: string,
  ): Promise<Serving> {
    const url = `${API.baseURL}/api/v1/user/${userID}/servings`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bodyCreateServing),
    };

    return handleApiRequest<Serving>(url, options);
  }

  public static UpdateServing(
    bodyUpdateServing: BodyCreateServing,
    userID: string,
    meatPortionID: string,
  ): Promise<Serving> {
    const url = `${API.baseURL}/api/v1/user/${userID}/servings/${meatPortionID}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bodyUpdateServing),
    };

    return handleApiRequest<Serving>(url, options);
  }

  public static GetDailyOverview(
    userID: string,
  ): Promise<APIResponse<DailyOverviewMap>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/daily-overview`;

    return handleApiRequest<APIResponse<DailyOverviewMap>>(url);
  }

  public static GetServings(
    userID: string,
    page: number,
    size: number,
  ): Promise<APIResponse<ServingDateList>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/servings?page=${page}&size=${size}`;

    return handleApiRequest<APIResponse<ServingDateList>>(url);
  }

  public static DeleteServing(
    userID: string,
    meatPortionID: string,
  ): Promise<void> {
    const url = `${API.baseURL}/api/v1/user/${userID}/servings/${meatPortionID}`;

    const options = {
      method: "DELETE",
    };

    return handleApiRequest<void>(url, options);
  }

  public static GetAverageServings(
    userID: string,
    timeframe: Timeframe,
  ): Promise<APIResponse<AverageServings>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/servings/average?timeframe=${timeframe}`;

    return handleApiRequest<APIResponse<AverageServings>>(url);
  }

  public static GetAggregatedServings(
    userID: string,
    timeframe: Timeframe,
  ): Promise<APIResponse<AggregatedServings[]>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/servings/aggregate?timeframe=${timeframe}`;

    return handleApiRequest<APIResponse<AggregatedServings[]>>(url);
  }
}

export { ServingService };
