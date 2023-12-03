import { AxiosRequestHeaders } from "axios";
import * as httpRequest from "../../utils/httpRequest";
enum enumGender {
  female = "female",
  male = "male",
  other = "other",
}

interface dataInformationUser {
  username: string;
  fullName: string;
  email: string;
  phone: number;
  gender: enumGender;
  birthday: Date;
  address: string;
  avatar: FileList | string;
  role: string;
  educational_level: string;
  major: string;
  course: string;
  school: string;
  address_school: string;
}
export const addInformationUser = async (data: dataInformationUser) => {
  console.log(data);

  const fromData = new FormData();
  fromData.append("fullName", data.fullName);
  fromData.append("email", data.email);
  fromData.append("phone", data.phone.toString());
  fromData.append("gender", data.gender);
  fromData.append("birthday", data.birthday.toString());
  fromData.append("address", data.address);
  fromData.append(
    "avatar",
    data.avatar instanceof FileList ? data.avatar[0] : data.avatar
  );
  fromData.append("role", data.role);
  fromData.append("educational_level", data.educational_level);
  fromData.append("major", data.major);
  fromData.append("course", data.course);
  fromData.append("school", data.school);
  fromData.append("address_school", data.address_school);
  fromData.append("username", data.username);

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };
  try {
    const result = await httpRequest.post(
      "/user/updateinformation",
      fromData,
      headers as AxiosRequestHeaders
    );
    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
