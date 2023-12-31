import * as courseApi from "../../api/courseApi/courseApi";
import { IComment, ICourse, ILecture, IStudentProgress } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as lectureApi from "../../api/lectureApi/lectureApi";
export interface CourseState {
  currentLecture: ILecture | null;
  currentCourse: ICourse | null;
  courses: ICourse[] | null;
  comments: IComment[] | null;
  // replyComments: IComment[];
  loading: boolean;
  error: string | undefined;
  isError: boolean;
}

const initialState: CourseState = {
  currentCourse: null,
  currentLecture: null,
  courses: null,
  comments: null,
  // replyComments: [],
  loading: false,
  error: undefined,
  isError: false,
};

export const getCourseDetails = createAsyncThunk<
  ICourse,
  { id: string; user_id: string; role: string }
>(
  "course/getCourseDetails",
  async (params: { id: string; user_id: string; role: string }) => {
    const res = await courseApi.getCourseDetails(params);
    return res;
  }
);

export const getCourseByStudentId = createAsyncThunk<ICourse[], string>(
  "course/getCourseByStudentId",
  async (params: string) => {
    const res = await courseApi.getCourseByStudentId(params);
    return res;
  }
);
export const createStudentProgress = createAsyncThunk<
  IStudentProgress,
  IStudentProgress
>("course/createStudentProgress", async (params: IStudentProgress) => {
  const res = await lectureApi.createStudentProgress(params);
  return res;
});
export const updateStudentProgress = createAsyncThunk<
  IStudentProgress,
  IStudentProgress
>("course/updateStudentProgress", async (params: IStudentProgress) => {
  const res = await lectureApi.updateStudentProgress(params);
  return res;
});
export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetStoreCourse: (state) => {
      state.currentLecture = null;
      state.currentCourse = null;
      state.loading = false;
      state.error = undefined;
      state.isError = false;
    },
    selectLecture: (state, action) => {
      state.currentLecture = action.payload;
      state.loading = false;
    },
    selectQuiz: (state, action) => {
      if (state.currentCourse) {
        state.currentCourse.sessions?.forEach((session) => {
          session.lectures?.forEach((lecture) => {
            if (lecture.lecture_id === action.payload)
              state.currentLecture = lecture;
          });
        });
      }
    },
    clearState: (state) => {
      state.currentLecture = null;
      state.currentCourse = null;
      state.courses = null;
      state.comments = null;
      state.loading = false;
      state.error = undefined;
      state.isError = false;
    },
    handleStudentProgress: (state, action) => {
      let count = 0;
      if (state.currentCourse) {
        state.currentCourse.sessions?.forEach((session) => {
          session.lectures?.forEach((lecture) => {
            if (
              lecture.has_watched &&
              lecture.has_watched !== "No" &&
              parseInt(lecture.has_watched) !== 0
            ) {
              count++;
            } else if (
              lecture.lecture_id === action.payload.lecture_id &&
              !lecture.has_watched
            ) {
              count++;
            }
            if (lecture.lecture_id === action.payload.lecture_id) {
              lecture.has_watched = action.payload.has_watched;
            }
          });
        });
        state.currentCourse.completed_lectures = count;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseDetails.pending, (state) => {
      state.currentLecture = null;
      state.loading = true;
    });
    builder.addCase(getCourseDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentCourse = action.payload;
      if (state.currentLecture === null)
        state.currentLecture =
          action.payload?.sessions?.[0]?.lectures?.[0] ?? null;
      state.isError = false;
    });
    builder.addCase(getCourseDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.currentCourse = null;
      state.currentLecture = null;
      state.isError = true;
    });
    builder.addCase(getCourseByStudentId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourseByStudentId.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isError = false;
      console.log(action.payload);

      state.courses = action.payload;
    });
    builder.addCase(getCourseByStudentId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
    builder.addCase(createStudentProgress.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isError = false;
      console.log(action.payload);
    });
    builder.addCase(createStudentProgress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
    builder.addCase(updateStudentProgress.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isError = false;
      console.log(action.payload);
    });
    builder.addCase(updateStudentProgress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
  },
});
export const {
  resetStoreCourse,
  selectLecture,
  handleStudentProgress,
  selectQuiz,
  clearState,
} = courseSlice.actions;
export default courseSlice.reducer;
