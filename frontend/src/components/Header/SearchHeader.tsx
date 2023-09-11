import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchHeader = () => {
  return (
    <div className="flex space-x-3 items-center">
      <MagnifyingGlass size={21} className="text-gray-700" />{" "}
      <input
        type="text"
        className="border-none outline-none text-gray-700 w-[200px]"
        placeholder="Nhập Từ Khoá Tìm Kiếm"
      />
    </div>
  );
};

export default SearchHeader;
