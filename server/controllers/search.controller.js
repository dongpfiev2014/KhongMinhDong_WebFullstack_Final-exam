import FilmModel from "../models/films/film.model.js";

export const searchFilms = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) throw new Error("Keyword is required!");
    const regex = new RegExp(keyword, "i");
    const films = await FilmModel.find({
      $or: [
        {
          title: { $regex: regex },
        },
        {
          plot: { $regex: regex },
        },
      ],
    });
    res.status(200).send({
      message: "All films have searched successfully",
      total: films.length,
      data: films,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
