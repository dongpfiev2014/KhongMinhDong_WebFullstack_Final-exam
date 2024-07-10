import { Router } from "express";
import { searchFilms } from "../controllers/search.controller.js";

const searchRouter = Router();

searchRouter.get("/", searchFilms);

export default searchRouter;
