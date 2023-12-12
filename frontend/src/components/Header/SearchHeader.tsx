import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebounce ";
import { searchService } from "@/api";
import { useNavigate } from "react-router-dom";
import SearchHeaderResult from "./SearchHeaderResult";
import { ICourseDetail } from "@/types/type";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface Inputs {
  dataInput: string;
}
interface iSearchHeader {
  course: ICourseDetail[];
  keyword: string[];
}
const SearchHeader = (): React.ReactElement => {
  const [dataSearch, setDataSearch] = React.useState<iSearchHeader>();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const refDiv = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(refDiv, () => {
    setIsFocus(false);
  });
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const debouncedValue = useDebounce<string>(watch("dataInput"), 500);
  // const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (debouncedValue !== undefined) {
      const callApi = async () => {
        try {
          const data = await searchService.suggestionSearch(debouncedValue);
          setDataSearch((prev) => ({
            ...prev,
            keyword: [],
            course: data.courses,
          }));
        } catch (error) {
          Promise.reject(error);
        }
      };
      callApi();
    } else {
      setDataSearch({
        keyword: [],
        course: [],
      });
    }
  }, [debouncedValue]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data) return;
    // inputRef.current?.blur();
    navigate(`/search?query=${encodeURIComponent(data.dataInput)}`);
    // inputRef.current.blur();
    setIsFocus(false);
  };
  return (
    <div className="relative" ref={refDiv}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-[300px]"
        >
          Search
        </label>
        <div className="relative w-[300px]">
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999"
            onClick={handleSubmit(onSubmit)}
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            // ref={inputRef}
            {...register("dataInput")}
            onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            type="text"
            className="block w-full  pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập từ khoá tim kiếm"
          />
          {/* <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> */}
        </div>
      </form>
      <SearchHeaderResult
        dataSearch={{
          keyword: dataSearch?.keyword ? dataSearch?.keyword : [],
          course: dataSearch?.course ? dataSearch?.course : [],
        }}
        setIsFocus={setIsFocus}
        isOpen={isFocus && dataSearch?.course?.length !== 0}
      />
    </div>
  );
};

export default SearchHeader;
