import mongoose from "mongoose";

const FilmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fimDuration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
    },
    plot: {
      type: String,
    },
    type: {
      type: String,
      enum: ["movie", "series", "episode"],
      default: "movie",
    },
  },
  {
    // getTimestampsConfig()
    timestamps: true,
  }
);

export default FilmSchema;
