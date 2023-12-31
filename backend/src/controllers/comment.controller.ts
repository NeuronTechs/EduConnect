import { Request, Response } from "express";
import CommentService from "../services/comment.service";

const create = async (req: Request, res: Response) => {
  const { body, files } = req;
  try {
    // console.log(req);

    const data = await CommentService.create(body, files);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await CommentService.getById(id);
    res.status(comment.status).json(comment);
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
    const data = await CommentService.update(id, body);
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
    const data = await CommentService.remove(id);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getByLectureId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page } = req.query;
  const pageSize = 5;
  try {
    const comments = await CommentService.getByLectureId(
      id,
      Number(page),
      Number(pageSize)
    );
    res.status(comments.status).json({ data: comments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const getReplyByCommentId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page } = req.query;
  const pageSize = 3;
  try {
    const comments = await CommentService.getReplyByCommentId(
      id,
      Number(page),
      Number(pageSize)
    );
    res.status(comments.status).json({ data: comments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  create,
  getById,
  update,
  deleteById,
  getByLectureId,
  getReplyByCommentId,
};
