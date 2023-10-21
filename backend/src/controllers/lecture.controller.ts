import { Request, Response } from "express";
import lectureService from "../services/lecture.service";

const create = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const data = await lectureService.create(body);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await lectureService.updateById(id, req.body);
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
    const data = await lectureService.deleteById(id);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getBySessionId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await lectureService.getBySessionId(id);
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
  try {
    const data = await lectureService.getByLectureId(id);
    res.status(data.status).json({ data });
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
  updateById,
  deleteById,
  getBySessionId,
  getByLectureId,
};
