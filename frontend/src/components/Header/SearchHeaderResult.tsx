import { ICourse } from "@/types/type";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";
interface IProps {
  isOpen: boolean;
  dataSearch: {
    keyword: string[];
    course: ICourse[];
  };
}
const SearchHeaderResult = (props: IProps): React.ReactElement => {
  return (
    <>
      {props.isOpen && (
        <div className="absolute top-[110%] bg-white rounded-md max-h-[400px] min-h-[300px] w-full p-2 z-10 shadow-xl overflow-auto">
          <div className="flex- flex-col items-start justify-center gap-2">
            <div className="w-full">
              <h5 className="text-sm font-bold">Từ khóa liên quan</h5>
            </div>
            <div className="w-full space-y-2 mt-2 mb-2">
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
            </div>
            <div className="w-full space-y-2 ">
              <div>
                <h5 className="text-sm font-bold">Khoá Học Gợi ý </h5>
              </div>
              {props.dataSearch.course.map((data) => {
                return (
                  <div className="rounded-sm bg-white hover:bg-gray-100 min-h-[50px] flex items-center justify-start px-4 space-x-3">
                    <div className=" h-[40px] w-[40px]">
                      <img
                        src={data.thumbnail}
                        alt=""
                        className=" w-full h-full"
                      />
                    </div>
                    <div className=" flex flex-col justify-start items-start w-ful pb-3">
                      <h5 className="text-sm font-bold overflow-hidden text-ellipsis">
                        {data.title}
                      </h5>
                      <p className="text-sm  font-normal text-gray-500 overflow-hidden text-ellipsis">
                        {data.teacher}
                      </p>
                    </div>
                  </div>
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
