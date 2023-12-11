import courseManageApi from "@/api/courseManageApi";
import { ICourseDetail, ILessonInfo, ISectionInfo } from "@/types/type";
import React from "react";
import { toast } from "react-toastify";
import * as teacherApi from "@/api/teacherApi/teacherApi";

interface ICurriculum {
  lessons: ILessonInfo[];
  sections: ISectionInfo[];
}

const dataCurriculum: ICurriculum = {
  lessons: [],
  sections: [],
};

export interface ICreateCourseContext {
  isLoading?: boolean;
  dataDescription: ICourseDetail | undefined;
  dataSection: ISectionInfo[];
  selectLesson: ILessonInfo | undefined;
  handleSetDataDescription: (data: ICourseDetail) => void;
  setDataSection: React.Dispatch<React.SetStateAction<ISectionInfo[]>>;
  handleAddNewSection: () => void;
  handleDeleteSection: (id: string) => void; // add handleDeleteSection property
  handleEditTitleSection: (id: string, title: string) => void; // add handleEditSection property
  handleEditSection: (id: string, section: ISectionInfo) => void; // add handleEditSection property
  handleAddNewLesson: (id: string, type: string) => void; // add handleAddNewLesson property
  handleDeleteLesson: (idSection: string, idLesson: string) => void; // add handleDeleteLesson property
  handlerSelectLesson: (lesson: ILessonInfo) => void;
  handleEditLesson: (lesson: ILessonInfo) => void; // add handleEditLesson property
}

export const CreateCourseContext = React.createContext<ICreateCourseContext>({
  isLoading: false,
  dataDescription: undefined,
  dataSection: [],
  selectLesson: undefined,
  handleSetDataDescription: () => {},
  setDataSection: () => {},
  handleAddNewSection: () => {},
  handleDeleteSection: () => {},
  handleEditTitleSection: () => {},
  handleEditSection: () => {},
  handleAddNewLesson: () => {},
  handleDeleteLesson: () => {},
  handlerSelectLesson: () => {},
  handleEditLesson: () => {},
} as ICreateCourseContext);

// add handleAddNewLesson property

const CreateCourseProvider = (props: { children: React.ReactNode }) => {
  const [dataDescription, setDataDescription] = React.useState<ICourseDetail>();
  const [dataSection, setDataSection] = React.useState<ISectionInfo[]>(
    dataCurriculum.sections
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectLesson, setSelectLesson] = React.useState<
    ILessonInfo | undefined
  >();
  // description
  const handleSetDataDescription = (data: ICourseDetail) => {
    setDataDescription(data);
  };
  // update section in course sort
  const updateSectionCourse = async (data: ISectionInfo[]) => {
    try {
      const res = await teacherApi.updateSectionCourse(
        dataDescription?.teacher_id ? dataDescription.teacher_id : "",
        dataDescription?.course_id ? dataDescription.course_id : "",
        data.map((item) => item.session_id)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // curriculums
  const handleAddNewSection = async () => {
    const newSection = {
      name: "Section",
      course_id: dataDescription?.course_id ? dataDescription.course_id : "",
      // lessons: [],
    };
    try {
      setIsLoading(true);
      const res = await courseManageApi.createSectionCourse(
        dataDescription?.course_id ? dataDescription.course_id : "",
        newSection
      );

      setDataSection((cur) => [...cur, res as ISectionInfo]);
      // update sort section in course
      updateSectionCourse([...dataSection, res as ISectionInfo]);
      setIsLoading(false);
      toast.success("Thêm phần mới thành công");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Thêm phần mới thất bại");
    }
  };

  const handleEditTitleSection = async (id: string, title: string) => {
    const newSection = dataSection.filter(
      (section) => section.session_id === id
    );
    try {
      const res = await courseManageApi.updateSectionCourse(id, {
        ...newSection[0],
        session_id: id,
        name: title,
      });
      if (res) {
        setDataSection((cur) =>
          cur.map((section) =>
            section.session_id === id ? { ...section, name: title } : section
          )
        );
        toast.success("Cập nhật phần thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSection = async (id: string, section: ISectionInfo) => {
    try {
      await courseManageApi.updateSectionCourse(id, section);
      setDataSection((cur) =>
        cur.map((item) => (item.session_id === id ? section : item))
      );
    } catch (error) {
      toast.error("Cập nhật phần mới thất bại");
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      const res = await courseManageApi.deleteSectionCourse(sectionId);
      if (res) {
        setDataSection((cur) =>
          cur.filter((section) => section.session_id !== sectionId)
        );
        updateSectionCourse(
          dataSection.filter((item) => item.session_id !== sectionId)
        );
        toast.success("Xóa phần thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa phần thất bại");
    }
  };

  const handleAddNewLesson = async (id: string, type: string) => {
    try {
      const data: ILessonInfo = {
        name: "lesson",
        type: type,
        session_id: id,
        lecture_id: "",
        description: "",
        source: "",
        duration: 0,
      };
      setIsLoading(true);
      const res = await courseManageApi.createLessonSectionCourse(data);
      if (res) {
        setDataSection((cur) => {
          return cur.map((section) =>
            section.session_id === id
              ? {
                  ...section,
                  lessons: section.lessons ? [...section.lessons, res] : [res],
                }
              : section
          );
        });
        // update lesson in section sort
        const sectionTmp = dataSection.find(
          (item) => item.session_id === id
        ) as ISectionInfo;
        await courseManageApi.updateSectionCourse(id, {
          ...sectionTmp,
          lessons: sectionTmp.lessons ? [...sectionTmp.lessons, res] : [res],
        });
      }

      setIsLoading(false);
      toast.success("Thêm bài học mới thành công");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Thêm bài học mới thất bại");
    }
  };

  const handleDeleteLesson = async (idSection: string, idLesson: string) => {
    try {
      setIsLoading(true);
      const res = await courseManageApi.deleteLessonSectionCourse(idLesson);
      if (res) {
        setDataSection((cur) =>
          cur.map((section) =>
            section.session_id === idSection
              ? {
                  ...section,
                  lessons: section.lessons.filter(
                    (lesson) => lesson.lecture_id !== idLesson
                  ),
                }
              : section
          )
        );
        // delete lesson in section sort
        const sectionTmp = dataSection.find(
          (item) => item.session_id === idSection
        ) as ISectionInfo;
        await courseManageApi.updateSectionCourse(idSection, {
          ...sectionTmp,
          lessons: sectionTmp.lessons.filter(
            (lesson) => lesson.lecture_id !== idLesson
          ),
        });
      }
      setIsLoading(false);
      toast.success("Xóa bài học thành công");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Xóa bài học thất bại");
    }
  };
  const handleEditLesson = async (lesson: ILessonInfo) => {
    try {
      setIsLoading(true);
      const res = await courseManageApi.updateLessonSectionCourse(lesson);
      if (res) {
        setIsLoading(false);
        setDataSection((cur) =>
          cur.map((section) =>
            section.session_id === lesson.session_id
              ? {
                  ...section,
                  lessons: section.lessons.map((item) =>
                    item.lecture_id === lesson.lecture_id ? res : item
                  ),
                }
              : section
          )
        );
      }
      setIsLoading(false);
      toast.success("Cập nhật bài học thành công");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Cập nhật bài học thất bại");
    }
  };
  const handlerSelectLesson = (lesson: ILessonInfo) => {
    setSelectLesson(lesson);
  };
  return (
    <CreateCourseContext.Provider
      value={{
        isLoading,
        dataDescription,
        dataSection,
        selectLesson,
        handleSetDataDescription,
        setDataSection,
        handleAddNewSection,
        handleDeleteSection,
        handleEditTitleSection,
        handleEditSection,
        handleAddNewLesson,
        handleDeleteLesson,
        handlerSelectLesson,
        handleEditLesson,
      }}
    >
      {props.children}
    </CreateCourseContext.Provider>
  );
};

export default CreateCourseProvider;
