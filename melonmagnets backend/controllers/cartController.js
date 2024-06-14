// controllers/cartController.js
const CartItem = require('../models/cartItem');

// Get all cart items for a specific session
exports.getCartItems = async (req, res) => {
  const { id } = req.query; // Assuming session ID is passed as a query parameter
  console.log(id);
  try {
    const cartItems = await CartItem.find({ _id: { $in: id } }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a new item to the cart
exports.addToCart = async (req, res) => {
  const { productId, quantity, price, image} = req.body;
  console.log( productId, quantity, price, image);
  try {
    const cartItem = new CartItem({

      productId,
      quantity,
      price,
      image: req.files.map((x) => x.filename),
    });

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update quantity of a cart item
exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { qty } = req.query;
  console.log(id,qty);
  try {
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: id },
      {$set:{ quantity:qty }},
    );
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await CartItem.deleteOne({ _id: id });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
