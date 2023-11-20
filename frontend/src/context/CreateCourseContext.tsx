import { ICourseDetail, ILessonInfo, ISectionInfo } from "@/types/type";
import React from "react";

interface ICurriculum {
  lessons: ILessonInfo[];
  sections: ISectionInfo[];
}

const dataCurriculum: ICurriculum = {
  lessons: [],
  sections: [],
};

export interface ICreateCourseContext {
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
  handleEditLesson: (idSection: string, lesson: ILessonInfo) => void; // add handleEditLesson property
}

export const CreateCourseContext = React.createContext<ICreateCourseContext>({
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
  const [selectLesson, setSelectLesson] = React.useState<
    ILessonInfo | undefined
  >();
  // description
  const handleSetDataDescription = (data: ICourseDetail) => {
    setDataDescription(data);
  };

  // curriculums
  const handleAddNewSection = () => {
    setDataSection((cur) => [
      ...cur,
      {
        section_id: (cur.length + 1).toString(),
        name: "Section",
        course_id: dataDescription?.course_id ? dataDescription.course_id : "",
        lessons: [],
      },
    ]);
  };
  const handleEditTitleSection = (id: string, title: string) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.section_id === id ? { ...section, title: title } : section
      )
    );
  };
  const handleEditSection = (id: string, section: ISectionInfo) => {
    setDataSection((cur) =>
      cur.map((item) => (item.section_id === id ? section : item))
    );
  };

  const handleDeleteSection = (sectionId: string) => {
    setDataSection((cur) =>
      cur.filter((section) => section.section_id !== sectionId)
    );
  };

  const handleAddNewLesson = (id: string, type: string) => {
    setDataSection((cur) => {
      return cur.map((section) =>
        section.section_id === id
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  lesson_id: (section.lessons.length + 1).toString(),
                  name: "lesson " + (section.lessons.length + 1).toString(),
                  type: type,
                  section_id: id,
                },
              ],
            }
          : section
      );
    });
  };

  const handleDeleteLesson = (idSection: string, idLesson: string) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.section_id === idSection
          ? {
              ...section,
              lessons: section.lessons.filter(
                (lesson) => lesson.lesson_id !== idLesson
              ),
            }
          : section
      )
    );
  };
  const handleEditLesson = (idSection: string, lesson: ILessonInfo) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.section_id === idSection
          ? {
              ...section,
              lessons: section.lessons.map((item) =>
                item.lesson_id === lesson.lesson_id ? lesson : item
              ),
            }
          : section
      )
    );
  };
  const handlerSelectLesson = (lesson: ILessonInfo) => {
    setSelectLesson(lesson);
  };
  return (
    <CreateCourseContext.Provider
      value={{
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
