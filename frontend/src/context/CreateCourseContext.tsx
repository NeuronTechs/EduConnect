import { ICourseDetail, ILessonInfo, ISectionInfo } from "@/types/type";
import React from "react";

interface ICurriculum {
  lessons: ILessonInfo[];
  sections: ISectionInfo[];
}

const dataCurriculum: ICurriculum = {
  lessons: [],
  sections: [
    {
      id: "1",
      title: "Section 1",
      lessons: [
        {
          id: "1",
          title: "lesson 1",
          type: "document",
          idSection: "1",
        },
        {
          id: "2",
          title: "lesson 2",
          type: "quiz",
          idSection: "1",
        },
        {
          id: "3",
          title: "lesson 3",
          type: "video",
          idSection: "1",
        },
        {
          id: "4",
          title: "lesson 4",
          type: "document",
          idSection: "1",
        },
      ],
    },
    {
      id: "2",
      title: "Section 2",
      lessons: [
        {
          id: "5",
          title: "lesson 1",
          type: "quiz",
          idSection: "2",
        },
        {
          id: "6",
          title: "lesson 2",
          type: "video",
          idSection: "2",
        },
        {
          id: "7",
          title: "lesson 3",
          type: "document",
          idSection: "2",
        },
        {
          id: "8",
          title: "lesson 4",
          type: "quiz",
          idSection: "2",
        },
      ],
    },
    {
      id: "3",
      title: "Section 3",
      lessons: [
        {
          id: "9",
          title: "lesson 1",
          type: "document",
          idSection: "3",
        },
        {
          id: "10",
          title: "lesson 2",
          type: "video",
          idSection: "3",
        },
        {
          id: "11",
          title: "lesson 3",
          type: "document",
          idSection: "3",
        },
        {
          id: "12",
          title: "lesson 4",
          type: "quiz",
          idSection: "3",
        },
      ],
    },
  ],
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
      { id: (cur.length + 1).toString(), title: "Section 4", lessons: [] },
    ]);
  };

  const handleDeleteSection = (id: string) => {
    setDataSection((cur) => cur.filter((section) => section.id !== id));
  };

  const handleEditTitleSection = (id: string, title: string) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.id === id ? { ...section, title: title } : section
      )
    );
  };
  const handleEditSection = (id: string, section: ISectionInfo) => {
    setDataSection((cur) =>
      cur.map((item) => (item.id === id ? section : item))
    );
  };

  const handleAddNewLesson = (id: string, type: string) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.id === id
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: (section.lessons.length + 1).toString(),
                  title: "lesson " + (section.lessons.length + 1).toString(),
                  type: type,
                  idSection: id,
                },
              ],
            }
          : section
      )
    );
  };

  const handleDeleteLesson = (idSection: string, idLesson: string) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.id === idSection
          ? {
              ...section,
              lessons: section.lessons.filter(
                (lesson) => lesson.id !== idLesson
              ),
            }
          : section
      )
    );
  };
  const handleEditLesson = (idSection: string, lesson: ILessonInfo) => {
    setDataSection((cur) =>
      cur.map((section) =>
        section.id === idSection
          ? {
              ...section,
              lessons: section.lessons.map((item) =>
                item.id === lesson.id ? lesson : item
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
