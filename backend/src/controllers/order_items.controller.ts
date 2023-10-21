import { Request, Response } from "express";
import orderItemService from "../services/order_items.service";

const create = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const data = await orderItemService.create(body);
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
    const data = await orderItemService.updateById(id, req.body);
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
    const data = await orderItemService.deleteById(id);
    res.status(data.status).json({ data });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getOrderItemByOrderId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderItem = await orderItemService.getByOrderItemId(id);
    res.status(orderItem.status).json(orderItem);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getOrderItemByCourseId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderItem = await orderItemService.getByCourseId(id);
    res.status(orderItem.status).json(orderItem);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
const getOrderItemByStudentId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderItem = await orderItemService.getByStudentId(id);
    res.status(orderItem.status).json(orderItem);
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
  getOrderItemByOrderId,
  getOrderItemByCourseId,
  getOrderItemByStudentId,
};
