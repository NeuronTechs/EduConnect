import express from "express";
const router = express.Router();
import searchController from "../controllers/search.controller";

router.route("").get(searchController.search);
router.route("/suggestion").get(searchController.suggestionSearch);
export default router;
