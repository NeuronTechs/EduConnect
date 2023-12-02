import { Request, Response } from "express";
import CourseService from "../services/course.service";
import { transporter } from "../services/user.service";

const create = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const data = await CourseService.create(body);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const courses = await CourseService.getAll(page, 5);
    res.status(courses.status).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await CourseService.getById(id);
    res.status(course.status).json(course);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const data = await CourseService.updateById(id, body);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await CourseService.deleteById(id);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getCourseByTeacherId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await CourseService.getCourseByTeacherId(id);
    res.status(courses.status).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCourseByStudentId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courses = await CourseService.getCourseByStudentId(id);
    res.status(courses.status).json({ data: courses });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseDetails = async (req: Request, res: Response) => {
  const { id, user_id } = req.params;

  try {
    const courses = await CourseService.getCourseDetails(id, user_id);
    res.status(courses.status).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getOverviewCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await CourseService.getOverviewCourse(id);
    res.status(course.status).json(course);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTransactionInCourse = async (req: Request, res: Response) => {
  const {
    student_id,
    course_id,
    amount,
    status,
    transaction_id,
    full_name,
    email,
    course_name,
  } = req.body;
  try {
    const transaction = await CourseService.addTransactionInCourse(
      student_id,
      course_id,
      amount,
      status,
      transaction_id
    );
    const addToCourse = await CourseService.addToCourse(
      student_id,
      course_id,
      amount
    );
    if (transaction.status && addToCourse.status) {
      transporter.sendMail(
        {
          to: email,
          subject: "Thanh toán khóa học thành công",
          html: `<div style="display: flex; align-content: center; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center;">
                  <h1>Xin chào</h1>
                  <img src="https://res.cloudinary.com/dglrz7kt1/image/upload/v1700928887/files/unnamed_putjzw.png" alt="Xin chào" />
                  <h2>Thanh toán khóa học thành công</h2>
                  <p>Bắt đầu khóa học ngay hôm nay và xem việc học có thể đưa bạn đến đâu:</p>
                  <a href="${process.env.BASE_URL}/myCourse"><button style="border:1px solid blue; border-radius:5px; padding:5px; width:100px; text-align:center; font-size:20px;">Bắt đầu</button></a>
                  <p>Hóa đơn thanh toán của bạn</p>
                  <table style="width:80%; border:1px solid black">
                  <tr>
                    <th style="border:1px solid black" >Khóa học</th>
                    <th style="border:1px solid black">Giá</th>
                  </tr>
                  <tr>
                    <td style="border:1px solid black">${course_name}</td>
                    <td style="border:1px solid black">${amount} VND</td>
                  </tr>
                  </table>
                  <div style="margin-top: 10px; font-weight: bold; font-size: 20px">Tổng tiền: 12000 VND</div>
                  <h3>Người thanh toán: ${full_name}</h3>
                  </div>`,
        },
        (emailErr) => {
          if (emailErr) {
            res.status(400).json({
              status: 400,
              message: emailErr,
            });
          }
          res.status(200).json({
            status: 200,
            data: {},
            message: transaction?.message,
          });
        }
      );
    } else
      res.status(404).json({
        status: 404,
        data: {},
        message: transaction?.message,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const complaintCourse = async (req: Request, res: Response) => {
  const { body, files } = req;
  try {
    const { content, course_id, student_id, title, session_id, lecture_id } =
      body;
    const data = await CourseService.complaintCourse(
      { content, course_id, student_id, title, session_id, lecture_id },
      files
    );
    if (data?.status === 200) {
      res.status(200).json({
        status: 200,
        data: data?.data,
        message: data?.message,
      });
    }
  } catch (error) {
    if (error) {
      res.status(400).json({
        status: 400,
        error: error,
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getComplaintCourse = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageSize = 5;
    const data = await CourseService.getComplaintCourse(Number(page), pageSize);
    res.status(200).json(data);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getComplaintDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await CourseService.getComplaintDetail(id as string);
    res.status(200).json(data);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const resolveComplaintCourse = async (req: Request, res: Response) => {
  try {
    const { course_id, complaint_id, option } = req.body;
    const data = await CourseService.resolveComplaintCourse(
      complaint_id,
      course_id,
      option
    );
    if (data.status) res.status(200).json(data);
    else res.status(400).json(data);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  deleteById,
  getCourseByTeacherId,
  getCourseByStudentId,
  getCourseDetails,
  getOverviewCourse,

  addTransactionInCourse,
  complaintCourse,
  getComplaintCourse,
  getComplaintDetail,
  resolveComplaintCourse,
};
