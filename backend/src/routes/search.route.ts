import express from "express";
const router = express.Router();
import searchController from "../controllers/search.controller";

router.route("").get(searchController.search);

export default router;
