import * as courseApi from "../../api/courseApi/courseApi";
import { IComment, ICourse, ILecture } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface CourseState {
  currentLecture: ILecture | null;
  currentCourse: ICourse | null;
  comments: IComment[] | null;
  loading: boolean;
  error: string | undefined;
  isError: boolean;
}

const initialState: CourseState = {
  currentCourse: null,
  currentLecture: null,
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
      state.currentCourse = action.payload;
      state.error = undefined;
      state.isError = false;
    });
    builder.addCase(getCourseDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
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
  },
});
export const { resetStoreCourse, selectLecture } = courseSlice.actions;
export default courseSlice.reducer;
