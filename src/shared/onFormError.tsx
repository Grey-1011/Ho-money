import { AxiosError } from "axios";
import { showDialog } from "vant";

export const onFormError = (error: AxiosError<ResourceError>, fn:(errors: ResourceError) => void) => {
  if (error.response?.status === 422) {
    fn(error.response.data);
  }
  throw error;
};

