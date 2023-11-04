import db from "../config/connectDB";
import { convertTimestampToDateTime, generateID } from "../constant/utils";

const getReviews = (course_id: String): Promise<any> => {
  try {
    const queryCheckExistCourse =
      "SELECT * FROM `review` join `user` on `author_id` = `username` where `course_id` = ? limit 3 ";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryCheckExistCourse,
        [course_id],
        (error, reviews, fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          resolve({
            status: true,
            data: reviews,
            message: "Get top 3 review success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const addNewReview = (
  content: String,
  author_id: String,
  course_id: String,
  rating: Number,
  title: String
): Promise<any> => {
  try {
    const queryCheckExistCourse =
      "INSERT INTO `review` (`review_id`, `content`,`author_id`,`course_id`,`rating`,`createdAt`,`title`) VALUES (?,?,?,?,?,?,?)";
    const review_id = "review_" + generateID();
    const nowString = convertTimestampToDateTime();
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryCheckExistCourse,
        [review_id, content, author_id, course_id, rating, nowString, title],
        (error, reviews, fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          resolve({
            status: true,
            data: {
              review_id,
              content,
              author_id,
              course_id,
              rating,
            },
            message: "Add review success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const getAllReviews = (course_id: String): Promise<any> => {
  try {
    const queryCheckExistCourse =
      "SELECT * FROM `review` join `user` on `author_id` = `username` where `course_id` = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryCheckExistCourse,
        [course_id],
        (error, reviews, fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          }
          resolve({
            status: true,
            data: reviews,
            message: "Get All reviews success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const getstatisticStar = (course_id: String): Promise<any> => {
  try {
    const queryCheckExistCourse =
      "SELECT * FROM `review` where `course_id` = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryCheckExistCourse,
        [course_id],
        (error, reviews, fields) => {
          if (error) {
            reject({
              status: false,
              data: {},
              message: error,
            });
            return;
          } else {
            let statistic = {
              totalStar: 0,
              total1Start: 0,
              total2Start: 0,
              total3Start: 0,
              total4Start: 0,
              total5Start: 0,
            };
            if (Array.isArray(reviews)) {
              for (const currentValue of reviews) {
                if ("rating" in currentValue) {
                  statistic.totalStar += currentValue?.rating;
                  if (currentValue?.rating === 1) {
                    statistic.total1Start += currentValue?.rating;
                  } else if (currentValue?.rating === 2) {
                    statistic.total2Start += currentValue?.rating;
                  } else if (currentValue?.rating === 3) {
                    statistic.total3Start += currentValue?.rating;
                  } else if (currentValue?.rating === 4) {
                    statistic.total4Start += currentValue?.rating;
                  } else {
                    statistic.total5Start += currentValue?.rating;
                  }
                }
              }
              statistic.total1Start = Math.round(
                (statistic.total1Start / statistic.totalStar) * 100
              );
              statistic.total2Start = Math.round(
                (statistic.total2Start / statistic.totalStar) * 100
              );
              statistic.total3Start = Math.round(
                (statistic.total3Start / statistic.totalStar) * 100
              );
              statistic.total4Start = Math.round(
                (statistic.total4Start / statistic.totalStar) * 100
              );
              statistic.total5Start = Math.round(
                (statistic.total5Start / statistic.totalStar) * 100
              );
              statistic.totalStar /= 5;
            }
            resolve({
              status: true,
              data: statistic,
              message: "",
            });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getReviews,
  addNewReview,
  getAllReviews,
  getstatisticStar,
};
