import { Router } from "express";
import {
  addFilm,
  deleteFilm,
  getAllFilms,
  getSortedFilms,
  updateFilm,
} from "../controllers/film.controller.js";

const filmRouter = Router();

filmRouter.get("/", getAllFilms);
filmRouter.post("/", addFilm);
filmRouter.put("/:id", updateFilm);
filmRouter.delete("/:id", deleteFilm);
filmRouter.get("/sort", getSortedFilms);

export default filmRouter;
