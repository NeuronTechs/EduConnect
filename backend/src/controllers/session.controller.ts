import sessionService from "../services/session.service";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const data = await sessionService.create(body);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getSessionByCourseId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const session = await sessionService.getSessionByCourseId(id);
    res.status(session.status).json(session);
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
    const data = await sessionService.updateById(id, req.body);
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
    const data = await sessionService.deleteById(id);
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
  getSessionByCourseId,
  updateById,
  deleteById,
};
