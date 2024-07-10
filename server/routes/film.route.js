import { Router } from "express";
import {
  addFilm,
  deleteFilm,
  getAllFilms,
  getSortedFilms,
  updateFilm,
} from "../controllers/film.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const filmRouter = Router();

filmRouter.get("/", getAllFilms);
filmRouter.post("/", addFilm);
filmRouter.put("/:id", updateFilm);
filmRouter.delete("/:id", deleteFilm);
filmRouter.get("/sort", getSortedFilms);
filmRouter.post("/upload/:id", upload.single("file"), updateFilm);

export default filmRouter;
