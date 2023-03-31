const Movie = require("../models/movies");
const Joi = require("joi");
const {StatusCodes} = require("http-status-codes")

// Adding Joi schema for validation purposes
const schema = Joi.object({
  title: Joi.string().min(3).required(),
  phone: Joi.number().min(9).required(),
  isGold: Joi.boolean().required(),
});

function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find().sort("title");

    if (!movie) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No movie found!" });
    }

    res.status(StatusCodes.OK).json({ movie });
  } catch (err) {
    next(err);
  }
}


const createMovie = async (req, res, next) => {
    try {
        const { title, numberInStock, dailyRentalRate } = req.body 
        console.log({ title, numberInStock, dailyRentalRate })

        if (!title || !numberInStock || !dailyRentalRate) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "All fields are mandatory"})
        }

        const newMovie = await Movie.create({title, numberInStock, dailyRentalRate})
        res.status(StatusCodes.CREATED).json({ message: "Movie created successfully", newMovie })

    } catch (error) {
        next(error)
      }
}


const deleteMovie = async (req, res) => {
  try {
      const { id } = req.params

      if (!id) {
          return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
      }

      const deletedMovie = await movieSchemas.deleteOne({ _id : id })

      if (!deletedMovie) {
          res.status(StatusCodes.NOT_FOUND).json({message: "This Movie doesn't exist or might have already been deleted"})
      }

      res.status(StatusCodes.OK).json({message:  "Operation successful"})

  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
}


module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};