import Pagination from "@/components/Admin/ListSTudent/Pagination ";
import SearchBar from "@/components/Admin/ListStudent/SearchBar";
import Table from "@/components/Admin/ListStudent/Table";
import { dataStudent } from "@/types/constans";
import React from "react";

const StudentList = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-xl mb-14">
        Danh Sách Học Sinh / Sinh Viên trong hệ thống
      </h1>
      <SearchBar></SearchBar>
      <Table listStudent={dataStudent} />
      <Pagination />
    </div>
  );
};

export default StudentList;
