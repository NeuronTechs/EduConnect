import * as httpRequest from "../utils/httpRequest";

const search = async (value: string, limit?: number) => {
  try {
    const data = await httpRequest.get("search", {
      params: {
        keyword: value,
        limit: limit ? limit : 10,
      },
    });
    return data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const suggestionSearch = async (value: string) => {
  try {
    const data = await httpRequest.get("search/suggestion", {
      params: {
        keyword: value,
        limit: 10,
      },
    });
    return data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { search, suggestionSearch };
