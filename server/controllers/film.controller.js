import FilmModel from "../models/films/film.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dq4kbmkrf",
  api_key: "268696593414899",
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

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

export const uploadFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    if (!file || !id) throw new Error("Id or file not found");
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const fileName = file.originalname.split(".")[0];

    const result = await cloudinary.uploader.upload(
      dataUrl,
      {
        public_id: fileName,
        resource_type: "auto",
        folder: "images",
      },
      (err, result) => {
        if (err) {
          throw new Error("Error uploading");
        }
        if (result) {
        }
      }
    );
    const updatedPosterFilm = await FilmModel.findByIdAndUpdate(
      id,
      {
        poster: result.secure_url,
      },
      { new: true }
    );
    if (!updatedPosterFilm) {
      return res.status(404).send({
        message: "Film not found",
        success: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "Uploaded successfully",
      dataUrl: result.secure_url,
      data: updatedPosterFilm,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};
