import { getCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";
import { AppDispatch } from "@/redux/store";
import { SliceState } from "@/types/type";
import { convertTimeToTemplate } from "@/utils/const";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CheckCircle, MinusCircle } from "@phosphor-icons/react";

const Overviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
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
      <div>
        <div className="p-[10px]">
          <h3 className="font-semibold">Bạn sẽ học được gì?</h3>
          <ul className="flex flex-col lg:flex-row flex-wrap p-[5px_10px]">
            <li className="flex items-baseline justify-start basis-1/2">
              <CheckCircle size={16} className="mr-3" />
              {currentCourse?.study?.study1}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <CheckCircle size={16} className="mr-3" />
              {currentCourse?.study?.study2}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <CheckCircle size={16} className="mr-3" />
              {currentCourse?.study?.study3}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <CheckCircle size={16} className="mr-3" />
              {currentCourse?.study?.study4}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <CheckCircle size={16} className="mr-3" />
              {currentCourse?.study?.study5}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <CheckCircle size={16} className="mr-3" />
              {currentCourse?.study?.study6}
            </li>
          </ul>
        </div>
        {/* Yêu cầu */}
        <div className="p-[10px] gap-2">
          <h3 className="font-semibold">Yêu cầu</h3>
          <ul className="p-[5px_10px] flex flex-col lg:flex-row flex-wrap">
            <li className="flex items-baseline justify-start basis-1/2">
              <MinusCircle weight="fill" size={16} className="mr-3" />
              {currentCourse?.requirement?.require1}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <MinusCircle weight="fill" size={16} className="mr-3" />
              {currentCourse?.requirement?.require2}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <MinusCircle weight="fill" size={16} className="mr-3" />
              {currentCourse?.requirement?.require3}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <MinusCircle weight="fill" size={16} className="mr-3" />
              {currentCourse?.requirement?.require4}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <MinusCircle weight="fill" size={16} className="mr-3" />
              {currentCourse?.requirement?.require5}
            </li>
            <li className="flex items-baseline justify-start basis-1/2">
              <MinusCircle weight="fill" size={16} className="mr-3" />
              {currentCourse?.requirement?.require6}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overviews;
