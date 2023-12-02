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

  // const fromData = new FormData();
  // fromData.append("full_name", data.full_name);
  // fromData.append("email", data.email);
  // fromData.append("phone", data.phone.toString());
  // fromData.append("gender", data.gender);
  // fromData.append("birthday", data.birthday.toString());
  // fromData.append("address", data.address);
  // fromData.append("avatar", data.avatar);
  // fromData.append("role", data.role);
  // fromData.append("educational_level", data.educational_level);
  // fromData.append("major", data.major);
  // fromData.append("course", data.course);
  // fromData.append("school", data.school);
  // fromData.append("address_school", data.address_school);
  try {
    const result = await httpRequest.post("/user/updateinformation", {
      ...data,
      avatar:
        "https://gravatar.com/avatar/0fafdda675b8bbc8d67cf4c51183ce45?s=400&d=robohash&r=x",
    });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
