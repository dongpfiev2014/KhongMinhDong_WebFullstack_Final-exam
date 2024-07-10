import FilmModel from "../models/films/film.model.js";

export const getAllFilms = async (req, res) => {
  try {
    const allFilms = await FilmModel.find();
    if (allFilms.length > 0) {
      res.status(200).send({
        message: "All films have found successfully",
        total: allFilms.length,
        users: allFilms,
      });
    } else
      return res.status(404).send({
        message: "No films found",
        success: false,
        data: null,
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const addFilm = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res.status(400).send({
        message: "No data provided",
        success: false,
      });
    const newFilm = new FilmModel(data);
    const savedFilm = await newFilm.save();
    res.status(201).send({
      message: "New film has been created successfully",
      success: true,
      data: savedFilm,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const updateFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!data || !id) throw new Error("Data or id not found");
    const updatedFilm = await FilmModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedFilm)
      return res.status(404).send({
        message: "Film not found",
        success: false,
        data: null,
      });
    res.status(200).send({
      message: "Film has been updated successfully",
      success: true,
      data: updatedFilm,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Id not found");
    const deletedFilm = await FilmModel.findByIdAndDelete(req.params.id);
    if (!deletedFilm)
      return res.status(404).send({
        message: "Film not found",
        success: false,
        data: null,
      });
    res.status(200).send({
      message: "Film has been deleted successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const getSortedFilms = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    if (!sortBy || !order) throw new Error("Invalid sort");
    //order = "asc" means ascending
    //order = "desc" means descending
    const sortOrder = order === "asc" ? 1 : -1;
    const sortedFilms = await FilmModel.find().sort({ [sortBy]: sortOrder });
    if (sortedFilms.length > 0) {
      res.status(200).send({
        message: "Films have been sorted successfully",
        total: sortedFilms.length,
        data: sortedFilms,
      });
    } else
      return res.status(404).send({
        message: "No films found",
        success: false,
        data: null,
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
