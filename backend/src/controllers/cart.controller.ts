import { Request, Response } from "express";
import cartService from "../services/cart.service";

const addToCart = async (req: Request, res: Response) => {
  try {
    const { student_id, course_id } = req.body;
    let result: any;
    result = await cartService.addToCart(student_id, course_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const removeToCart = async (req: Request, res: Response) => {
  try {
    const { cart_id } = req.body;
    let result: any;
    result = await cartService.removeToCart(cart_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

const getAllCart = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.body;
    let result: any;
    result = await cartService.getAllCart(student_id);
    if (result?.status) {
      res.status(200).json({
        status: 200,
        data: result?.data,
        message: result?.message,
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: {},
      message: error,
    });
  }
};

export default {
  addToCart,
  removeToCart,
  getAllCart,
};
