import { ICourseDetail } from "@/types/type";
import React from "react";
import ImageWithError from "../ImageWithError";
import { Link } from "react-router-dom";
interface IProps {
  isOpen: boolean;
  dataSearch: {
    keyword: string[];
    course: ICourseDetail[];
  };
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchHeaderResult = (props: IProps): React.ReactElement => {
  return (
    <>
      {props.isOpen && (
        <div className="absolute top-[110%] bg-white rounded-md h-[500px] w-full p-2 z-99999 shadow-xl py-4 overflow-hidden">
          <div className="h-full w-full py-4 overflow-auto">
            {/* <div className="w-full">
              <h5 className="text-sm font-bold">Từ khóa liên quan</h5>
            </div>
            {props.dataSearch.keyword?.length === 0 && (
              <div className="w-full h-[50px] rounded-sm flex items-center justify-center px-4 text-gray-500 space-x-3 hover:bg-gray-100">
                <p className="text-sm font-norma overflow-hidden text-ellipsis">
                  Không có kết quả
                </p>
              </div>
            )} */}
            {/* <div className="w-full space-y-2 mt-2 mb-2">
              {props.dataSearch.keyword?.map((item, index) => (
                <div
                  key={index}
                  className="w-ful h-[30px] rounded-sm flex items-center justify-start  px-4 text-gray-500 space-x-3 hover:bg-gray-100"
                >
                  <MagnifyingGlass size={20} />
                  <p className="text-sm font-norma overflow-hidden text-ellipsis">
                    {item}
                  </p>
                </div>
              ))}
            </div> */}
            <div className="w-full h-full space-y-2 ">
              <div>
                <h5 className="text-base font-bold">Khoá Học Gợi ý </h5>
              </div>
              {props.dataSearch.course?.length === 0 && (
                <div className="w-full h-[50px] rounded-sm flex items-center justify-center  px-4 py-2 text-gray-500 space-x-3 hover:bg-gray-100">
                  <p className="text-sm font-norma overflow-hidden text-ellipsis">
                    Không có kết quả
                  </p>
                </div>
              )}
              {props.dataSearch.course?.map((data) => {
                return (
                  <Link
                    key={data.course_id}
                    to={`/course/${data.course_id}`}
                    onClick={() => props.setIsFocus(false)}
                  >
                    <div className="rounded-md bg-white hover:bg-gray-200 min-h-[50px] flex items-center justify-start px-2 py-2 space-x-3">
                      <div className=" h-[40px] w-[60px] rounded-md overflow-hidden">
                        <ImageWithError
                          src={data.image ? data.image.toString() : ""}
                          alt=""
                          className=" w-full h-full"
                        />
                      </div>
                      <div className=" flex flex-col justify-start items-start w-ful ">
                        <h5 className="text-sm font-bold overflow-hidden text-ellipsis">
                          {data.title}
                        </h5>
                        <p className="text-sm  font-normal text-gray-500 overflow-hidden text-ellipsis">
                          {data.user?.full_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchHeaderResult;
