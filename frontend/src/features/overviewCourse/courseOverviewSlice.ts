import * as courseApi from "../../api/courseApi/courseApi";
import { IReview, ICourseOverview } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface CourseOverviewState {
  courseCurrent: ICourseOverview | null;
  reviews: IReview[] | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: CourseOverviewState = {
  courseCurrent: null,
  reviews: null,
  loading: false,
  error: undefined,
};

export const getCourseOverview = createAsyncThunk<ICourseOverview, string>(
  "course/getCourseOverview",
  async (params: string) => {
    const res = await courseApi.getCourseOverview(params);
    return res;
  }
);

export const courseOverviewSlice = createSlice({
  name: "overviewCourse",
  initialState,
  reducers: {
    resetStoreCourseOverview: (state) => {
      state.courseCurrent = null;
      state.reviews = null;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseOverview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourseOverview.fulfilled, (state, action) => {
      // let data = action.payload?.sessions;
      action.payload?.sessions?.sort(
        (a, b) =>
          (action.payload.list_session?.indexOf(a?.session_id) || 0) -
          (action.payload.list_session?.indexOf(b?.session_id) || 0)
      );
      action.payload?.sessions.forEach((session) =>
        session.lectures.sort(
          (a, b) =>
            (session?.list_lecture?.indexOf(a?.lecture_id) || 0) -
            (session?.list_lecture?.indexOf(b?.lecture_id) || 0)
        )
      );
      state.loading = false;
      state.courseCurrent = action.payload;
      state.error = undefined;
    });
    builder.addCase(getCourseOverview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { resetStoreCourseOverview } = courseOverviewSlice.actions;
export default courseOverviewSlice.reducer;
