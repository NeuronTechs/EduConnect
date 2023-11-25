import { useSelector } from "react-redux";
import assets from "../../assets";
import { SliceState } from "@/types/type";
import { useEffect, useState } from "react";
import * as authApi from "../../api/authApi/authApi";
import { Spinner } from "@material-tailwind/react";

interface Progress {
  course_id: string;
  title: string;
  isComplete: string;
}

const ProfileInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Progress[]>([]);
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  useEffect(() => {
    const getProcessLearn = async () => {
      try {
        setLoading(true);
        const data = await authApi.getProcessCourseByStudentId(
          currentUser?.user_id as string
        );
        if (data?.status === 200) {
          setLoading(false);
          setData([...data?.data]);
        }
      } catch (error: any) {
        setLoading(false);
        alert(error?.message);
      }
    };
    getProcessLearn();
  }, []);

  return (
    <div className="w-full  xl:w-[35%]  h-[90vh]  bg-white shadow-2xl p-10 m-5 mt-5 rounded-xl ">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-full flex items-center justify-center mb-4">
          <img src={assets.images.task} alt="" className="h-[60px]" />
          <div className="absolute left-3">
            <div className="rounded-full bg-gray-200 p-2 xl:hidden flex transition-all delay-200"></div>
          </div>
        </div>
        <h1 className="text-sm">
          <strong>{currentUser?.full_name}</strong>
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-around mt-5 font-semibold">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-gray-400 w-10 h-10 flex justify-center items-center text-base text-blue-600 font-extrabold cursor-default">
              {data.filter((data) => data?.isComplete === "progress").length}
            </div>
            <div className="text-xs">Khóa học đang học</div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-gray-400 w-10 h-10 flex justify-center items-center text-base text-green-600 font-extrabold cursor-default">
              {data.filter((data) => data?.isComplete === "complete").length}
            </div>
            <div className="text-xs">Khóa học đã hoàn thành</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
