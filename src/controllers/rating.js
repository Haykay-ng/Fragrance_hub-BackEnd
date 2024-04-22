import Rating from '../models/rating.js';
import Product from '../models/product.js';

// Function to create a new rating
export const createRating = async (req, res) => {
    try {
      const { product, rating, review } = req.body;
      const user = req.user._id

    
  
      // Find the product by ID
      const foundProduct = await Product.findById(product);
      if (!foundProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (!rating) {
        return res.status(404).json({ message: 'rating is required' });
      }
  
      if (!review) {
        return res.status(404).json({ message: 'review is required' });
      }
  
      // Create the rating
      const newRating = new Rating({ user, product, rating, review });
      const savedRating = await newRating.save();
      res.status(201).json(savedRating);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Function to get all ratings
export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a single rating by ID
export const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a rating by ID
export const updateRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const updatedRating = await Rating.findByIdAndUpdate(
      req.params.id,
      { rating, review },
      { new: true }
    );
    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a rating by ID
export const deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};