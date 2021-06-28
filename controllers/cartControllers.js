const Cart = require("../models/Cart");

module.exports.get_cart_items = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.add_cart_item = async (req, res) => {
  const userId = req.params.id;
  const { items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // if cart exists for the user

      cart.items.push(items);

      cart = await cart.save();
      return res.status(202).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: items,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
