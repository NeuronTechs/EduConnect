import * as httpRequest from "../utils/httpRequest";

const search = async (value: string): Promise<object> => {
  const data = await httpRequest.post("search", value);
  return data;
};

export { search };
