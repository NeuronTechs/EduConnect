import db from "../config/connectDB";

const checkExistCourse = (
  student_id: String,
  course_id: String
): Promise<any> => {
  try {
    const queryCheckExistCourse =
      "SELECT * FROM `cart` where `student_id` = ? and `course_id` = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryCheckExistCourse,
        [student_id, course_id],
        (error, cart, fields) => {
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
            data: cart,
            message: "Course Exist In Cart",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const addToCart = async (
  student_id: String,
  course_id: String
): Promise<any> => {
  try {
    const result: any = await checkExistCourse(student_id, course_id);
    if (result?.data?.length > 0) {
      return {
        status: false,
        data: {},
        message: "Course existed in my cart",
      };
    } else {
      const queryAddToCart =
        "INSERT INTO `cart` (`cart_id`, `student_id`,`course_id`) VALUES (?,?,?)";
      const cart_id: String = `cart_${course_id}`;
      return new Promise((resolve, reject) => {
        db.connectionDB.query(
          queryAddToCart,
          [cart_id, student_id, course_id],
          (error, cart, fields) => {
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
                cart_id,
                student_id,
                course_id,
              },
              message: "Add cart success",
            });
          }
        );
      });
    }
  } catch (error) {
    throw error;
  }
};

const removeToCart = async (cart_id: String): Promise<any> => {
  try {
    const queryRemoveToCart = "DELETE FROM `cart` WHERE `cart_id` = ?";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryRemoveToCart,
        [cart_id],
        (error, cart, fields) => {
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
            data: {},
            message: "Remove cart success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

const getAllCart = async (student_id: String): Promise<any> => {
  try {
    const queryGetAllCart =
      "select q.cart_id, q.course_id, q.teacher_id, q.title, q.price, q.username, q.image, q.discount, full_name from (select p.cart_id, p.course_id, p.teacher_id, p.title, p.price, teacher.username, p.image, p.discount from educonnectdb.teacher inner join  (select cart.cart_id, cart.course_id, course.title, course.price, course.teacher_id as teacher_id, course.discount , course.image from educonnectdb.cart inner join educonnectdb.course on cart.course_id = course.course_id where student_id = ?) as p on teacher.teacher_id = p.teacher_id) as q inner join educonnectdb.user on q.username = user.username";
    return new Promise((resolve, reject) => {
      db.connectionDB.query(
        queryGetAllCart,
        [student_id],
        (error, carts, fields) => {
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
            data: carts,
            message: "Get all cart success",
          });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export default {
  addToCart,
  removeToCart,
  getAllCart,
};
