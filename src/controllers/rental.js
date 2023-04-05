const Rental = require("../models/rentals");
const Movie = require("../models/movies");
const rentalValidate = require("../middlewares/rentalMiddleware");
const customerModel = require("../models/customers");

const createRental = async (req, res) => {
  const { customer, movie } = req.params;
  const { error, value } = rentalValidate(req.body);

  if (error) throw new Error(error.details[0].message);

  try {
    const findCustomer = await customerModel.findById(customer);
    if (findCustomer) value.customer = customer;

    const findMovie = await Movie.findById(movie);
    if (findMovie) value.movie = movie;

    await Rental.create(value);

    res.send("Rent successful");
  } catch (error) {
    throw new Error(error);
  }

  return;
};

const getRental = async (req, res) => {
  try {
    const rent = await Rental.find()
      .populate("customer")
      .populate({
        path: "movie",
        populate: { path: "genre" },
      });
    res.send(rent);
    return;
  } catch (error) {
    throw new Error(error);
  }
};

// Get one rented movie
const getSingleRentedMovie = async (req, res, next) => {
  try {
    const rentedMovie = await Rental.findById(req.params.id);

    if (!rentedMovie) {
      return res.status(404).json({ message: "No movie rented!" });
    }

    res.status(200).json({ rentedMovie });
  } catch (err) {
    next(err);
  }
};

// Delete a rental
const deleteRental = async (req, res, next) => {
  try {
    const deletedRental = await Rental.findByIdAndRemove(req.params.id);

    if (!deletedRental) {
      return res.status(404).json({ message: "Rental details not found!" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRental,
  createRental,
  getSingleRentedMovie,
  deleteRental,

};