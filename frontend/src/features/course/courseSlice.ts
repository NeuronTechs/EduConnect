import * as courseApi from "../../api/courseApi/courseApi";
import { IComment, ICourse, ILecture } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface CourseState {
  currentLecture: ILecture | null;
  currentCourse: ICourse | null;
  courses: ICourse[] | null;
  comments: IComment[] | null;
  loading: boolean;
  error: string | undefined;
  isError: boolean;
}

const initialState: CourseState = {
  currentCourse: null,
  currentLecture: null,
  courses: null,
  comments: null,
  loading: false,
  error: undefined,
  isError: false,
};

export const getCourseDetails = createAsyncThunk<ICourse, string>(
  "course/getCourseDetails",
  async (params: string) => {
    const res = await courseApi.getCourseDetails(params);
    return res;
  }
);
export const CommentOfLecture = createAsyncThunk<
  IComment[],
  { id: string; paging: number }
>("course/CommentOfLecture", async (params) => {
  const res = await courseApi.CommentOfLecture(params);
  return res;
});
export const LoadMoreComment = createAsyncThunk<
  IComment[],
  { id: string; paging: number }
>("course/LoadMoreComment", async (params) => {
  const res = await courseApi.CommentOfLecture(params);
  return res;
});
export const CommentLecture = createAsyncThunk<IComment, IComment>(
  "course/CommentLecture",
  async (params: IComment) => {
    const res = await courseApi.CommentLecture(params);
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourseDetails.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);

      state.currentCourse = action.payload;
      state.error = undefined;
      state.isError = false;
    });
    builder.addCase(getCourseDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.currentCourse = null;
      state.currentLecture = null;
      state.isError = true;
    });
    builder.addCase(CommentOfLecture.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CommentOfLecture.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = undefined;
      state.isError = false;
    });
    builder.addCase(CommentOfLecture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
    builder.addCase(CommentLecture.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CommentLecture.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isError = false;
      state.comments?.push(action.payload);
    });
    builder.addCase(CommentLecture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
    builder.addCase(LoadMoreComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LoadMoreComment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isError = false;
      state.comments?.push(...action.payload);
    });
    builder.addCase(LoadMoreComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
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
  },
});
export const { resetStoreCourse, selectLecture } = courseSlice.actions;
export default courseSlice.reducer;
