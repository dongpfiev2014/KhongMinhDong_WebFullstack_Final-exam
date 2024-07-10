import mongoose from "mongoose";
import Collections from "../../database/collection.js";
import FilmSchema from "./film.schema.js";

const FilmModel = mongoose.model(Collections.FILMS, FilmSchema);

export default FilmModel;
