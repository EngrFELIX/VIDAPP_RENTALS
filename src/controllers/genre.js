const genreSchema = require("../models/genres")
const {StatusCodes} = require("http-status-codes")
const movieSchema = require("../models/movies")


const getAllGenres = async(req, res) => {
  try{
   const genres = await genreSchema.find({})
   res.status(StatusCodes.OK).json({genres})
  }catch(error){
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
  }
}

//route to get a single genre
const getSingleGenre = async(req, res) =>{
try{
  
  const genre = await genreSchema.findById(req.params.id)

  if (!genre){
    return res.status(StatusCodes.NOT_FOUND).json({message: 'genre not found'})
  }

  return res.status(StatusCodes.OK).json({genre})

}catch(error){
  return res.status(StatusCodes.BAD_REQUEST).json({message: 'invalid request'})

}
}

const createGenre = async (req, res) => {
try{
  const movie = await movieSchema.findById(req.params.id)

  if (!movie) return res.status(StatusCodes.NOT_FOUND).json({message: "movie not found"})

const {name} = req.body

if (!name) return res.status(StatusCodes.BAD_REQUEST).json({message: "Name is required"})

const createGenre = await genreSchema.create(name)
movie.genre.addToSet(createGenre)
await movie.save()
res.status(StatusCodes.CREATED).json({message: "movie created successfully"})

}catch(error){
res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Server error"})
}
}

const updateGenre = async(req, res) => {
  try {
    const genre = await genreSchema.findById(req.params.id)
    if (!genre) return res.status(StatusCodes.NOT_FOUND).json({message:"Genre not found"})

    const {name} = req.body
    await genreSchema.updateOne({_id: genre.id, name}) 
    res.status(StatusCodes.OK).json({message:"Updated genre successfully"})
  }catch(error){
    res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid operation"})
  }
}

const deleteGenre = async (req, res) => {
  try{
    const genre = await genreSchema.findById(req.params.id)
    if (!genre) return res.status(StatusCodes.NOT_FOUND).json({message:"Genre not found"})

    await genreSchema.deleteById(genre.id)
    res.status(StatusCodes.OK).json({message:"Deleted genre successfully"})
    
  }catch(error){
    res.status(StatusCodes.BAD_REQUEST).json({message: err.message})
  }
}

module.exports = {
  getAllGenres, 
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteGenre,
}