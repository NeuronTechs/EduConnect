import express from "express";
import userRoutes from "./user.route";
import cartRoutes from "./cart.route";
const router = express.Router();
router.use("/user", userRoutes);
router.use("/cart", cartRoutes);
export default router;
