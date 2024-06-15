const Order = require('../models/order')
const BulkOrders = require('../models/bulkOrder')
const Address = require('../models/address')

const getOrders = async (req, res) => {
  try {
    console.log('poi');
    const data = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ data })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getBulkOrders = async (req, res) => {
  try {
    const data = await BulkOrders.find().sort({ createdAt: -1 });
    res.status(200).json({ data })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req?.params
    const data = await Order.findOne({ _id: id })
      .populate('address')
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          model: 'Product'
        }
      });
    res.status(200).json({ data })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const createOrder = async (req, res) => {
  const { email, mobile, amount, products, firstname, lastname, country, address_line_1, address_line_2, city, state, zip } = req?.body
  try {
    const address = await Address.create({
      firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile,
    })

    const data = await Order.create({ email, mobile, amount, address: address._id, products })
    return res.status(201).json({ data, message: 'Order placed successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const createBulkOrder = async (req, res) => {
  const { email, mobile, name, product, quantity, message } = req?.body
  try {
    const data = await BulkOrders.create({ email, mobile, name, product, quantity, message })
    return res.status(201).json({ data, message: 'Order placed successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const updateOrder = async (req, res) => {
  const { _id, status } = req?.body
  try {
    const data = await Order.updateOne({ _id },
      { $set: { status } })
    res.status(201).json({ data, message: 'Order updated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

module.exports = {
  getOrders,
  getBulkOrders,
  getOrderById,
  createOrder,
  createBulkOrder,
  updateOrder,
}