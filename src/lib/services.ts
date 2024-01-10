import axios, { AxiosError } from "axios";
const baseUrl = import.meta.env.VITE_ENDPOINT;

function axiosErrorHandler(error: unknown): string {
  let message = "";
  if (error instanceof AxiosError) {
    message = error.response?.data.error;
    console.log(message);
  }
  return message;
}

export const getSelectItems = async (keyword: string) => {
  try {
    if (!keyword) throw new Error("Param 'keyword' is required");
    const { data } = await axios.get(baseUrl + "/" + keyword);
    return data;
  } catch (error) {
    const message = axiosErrorHandler(error);
    return [{ value: null, label: message, group: "Error", selectable: false }];
  }
};

export const getReport = async (plan: string) => {
  try {
    const params = new URLSearchParams({ plan });
    const { data } = await axios.get(baseUrl + "?" + params.toString());
    return data;
  } catch (error) {
    axiosErrorHandler(error);
    return [];
  }
};
