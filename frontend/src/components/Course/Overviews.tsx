import { getCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";
import { AppDispatch } from "@/redux/store";
import { SliceState } from "@/types/type";
import { convertTimeToTemplate } from "@/utils/const";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Overviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );
  const currentLecture = useSelector(
    (state: SliceState) => state.courseSlice.currentLecture
  );

  useEffect(() => {
    if (id) dispatch(getCourseOverview(id));
  }, [id]);

  return (
    <div>
      <div className="p-5 border-b-2 border-gray-300">
        <h2 className="m-2">Nội dung khóa học</h2>
        <p className="p-2">{currentCourse?.description}</p>
        <p className="p-[5px_10px]">
          <span className="font-semibold">
            {currentCourse?.sessions.length}
          </span>{" "}
          chương •{" "}
          <span className="font-semibold">{currentCourse?.totalLecture}</span>{" "}
          bài học • Thời lượng{" "}
          <span className="font-semibold">
            {convertTimeToTemplate(currentCourse?.totalTime as number)}
          </span>
        </p>
      </div>
      <div className="p-5 border-b-2 border-gray-300">
        <h2 className="m-2">Mô tả Bài giảng </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: currentLecture?.description || "",
          }}
          className="p-5"
        />
      </div>
    </div>
  );
};

export default Overviews;
