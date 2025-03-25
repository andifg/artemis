import {
  APIResponse,
  AverageMeatPortions,
  AggregatedMeatPortions,
  BodyCreateMeatPortion,
  MeatPortionDateList,
  MeatPortion,
  Timeframe,
  DailyOverviewMap,
} from "./types";
import { API } from "./config";
import { handleApiRequest } from "./utils";

class MeatPortionService {
  public static CreateMeatPortion(
    bodyCreateMeatPortion: BodyCreateMeatPortion,
    userID: string,
  ): Promise<MeatPortion> {
    const url = `${API.baseURL}/api/v1/user/${userID}/meat-portions`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bodyCreateMeatPortion),
    };

    return handleApiRequest<MeatPortion>(url, options);
  }

  public static UpdateMeatPortion(
    bodyUpdateMeatPortion: BodyCreateMeatPortion,
    userID: string,
    meatPortionID: string,
  ): Promise<MeatPortion> {
    const url = `${API.baseURL}/api/v1/user/${userID}/meat-portions/${meatPortionID}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bodyUpdateMeatPortion),
    };

    return handleApiRequest<MeatPortion>(url, options);
  }

  public static GetMeatPortions(
    userID: string,
  ): Promise<APIResponse<MeatPortion[]>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/meat-portions`;

    return handleApiRequest<APIResponse<MeatPortion[]>>(url);
  }

  public static GetDailyOverview(
    userID: string,
  ): Promise<APIResponse<DailyOverviewMap>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/daily-overview`;

    return handleApiRequest<APIResponse<DailyOverviewMap>>(url);
  }

  public static GetMeatPortion(
    userID: string,
    page: number,
    size: number,
  ): Promise<APIResponse<MeatPortionDateList>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/meat-portion?page=${page}&size=${size}`;

    return handleApiRequest<APIResponse<MeatPortionDateList>>(url);
  }

  public static DeleteMeatPortion(
    userID: string,
    meatPortionID: string,
  ): Promise<void> {
    const url = `${API.baseURL}/api/v1/user/${userID}/meat-portion/${meatPortionID}`;

    const options = {
      method: "DELETE",
    };

    return handleApiRequest<void>(url, options);
  }

  public static GetAverageMeatPortions(
    userID: string,
    timeframe: Timeframe,
  ): Promise<APIResponse<AverageMeatPortions>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/average?timeframe=${timeframe}`;

    return handleApiRequest<APIResponse<AverageMeatPortions>>(url);
  }

  public static GetAggregatedMeatPortions(
    userID: string,
    timeframe: Timeframe,
  ): Promise<APIResponse<AggregatedMeatPortions[]>> {
    const url = `${API.baseURL}/api/v1/user/${userID}/aggregate?timeframe=${timeframe}`;

    return handleApiRequest<APIResponse<AggregatedMeatPortions[]>>(url);
  }
}

export { MeatPortionService };
