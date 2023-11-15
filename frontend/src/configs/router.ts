export const configRouter = {
  home: "/",
  login: "/login",
  signUp: "/signUp",
  registerInformation: "/register-information",
  course: "/course/:id",
  coursesCart: "/courses-cart",
  checkout: "/checkout",
  categoryFilter: "/category-filter",
  search: "/search",
  teacherCategory: "/teacher-category/:id",
  chat: "/chat",
  dashboardTeacher: "/teacher/dashboard",
  payout: "/teacher/payout",
  // teacher
  liststudent: "/teacher/liststudent",
  courseMyTeacher: "/teacher/course",
  createCourse: "/teacher/course/create",
  manageCourse: "/teacher/manage/course/:id",
  // student
  myCourse: "/myCourse",
  learning: "/course/learn/:id",
  profile: "/profile",
  dashboardAdmin: "/admin/dashboard",
  reportSale: "/admin/reportsale",
  reportMember: "/admin/reportmember",
  adminListStudent: "/admin/list-student",
  myCourseDetails: "/myCourse/:id",
  managerComplaintCourse: "/admin/complaint",
  complaintCourseDetail: "/admin/complaint/:id",
};
