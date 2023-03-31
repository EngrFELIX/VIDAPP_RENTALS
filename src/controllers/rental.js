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

module.exports = {
  getRental,
  createRental,
};