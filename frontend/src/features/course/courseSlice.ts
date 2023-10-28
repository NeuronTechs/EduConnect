import { getCourseByStudentId } from "@/api/courseApi/courseApi";
import { ICourse } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface CourseState {
  currentCourse: ICourse | null;
  loading: boolean;
  error: string | undefined;
  isError: boolean;
}

const initialState: CourseState = {
  currentCourse: null,
  loading: false,
  error: undefined,
  isError: false,
};

export const getCourseDetails = createAsyncThunk<ICourse, string>(
  "course/getCourseDetails",
  async (params: string) => {
    const res = await getCourseByStudentId(params);
    const data = await res.json();
    return data;
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetStoreCourse: (state) => {
      state.currentCourse = null;
      state.loading = false;
      state.error = undefined;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourseDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentCourse = action.payload;
    });
    builder.addCase(getCourseDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
  },
});

export default courseSlice.reducer;
