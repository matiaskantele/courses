const fs = require('fs');
const path = require('path');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 2;

exports.getIndex = (req, res, next) => {
  const { page = 1 } = req.query;
  let totalItems = 0;

  Product.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        currentPage: parseInt(page),
        hasNextPage: ITEMS_PER_PAGE * parseInt(page) < totalItems,
        hasPreviousPage: parseInt(page) > 1,
        nextPage: parseInt(page) + 1,
        previousPage: parseInt(page) - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  const { page = 1 } = req.query;
  let totalItems = 0;

  Product.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        currentPage: parseInt(page),
        hasNextPage: ITEMS_PER_PAGE * parseInt(page) < totalItems,
        hasPreviousPage: parseInt(page) > 1,
        nextPage: parseInt(page) + 1,
        previousPage: parseInt(page) - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => req.user.addToCart(product))
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  let products;
  let total = 0;
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      products = user.cart.items;
      total = 0;
      products.forEach(p => {
        total += p.quantity * p.productId.price;
      });
      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map(p => ({
          name: p.productId.title,
          description: p.productId.description,
          amount: p.productId.price * 100,
          currency: 'eur',
          quantity: p.quantity,
        })),
        success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/checkout/cancel`,
      });
    })
    .then(session => {
      res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
        products,
        total,
        sessionId: session.id,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckoutSuccess = (req, res, next) => {
  // Note: Route accessible to user and the payment step can be bypassed.
  // Webhook implementation will help prevent this:
  // https://stripe.com/docs/payments/handling-payment-events#build-your-own-webhook
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => ({
        quantity: i.quantity,
        product: { ...i.productId._doc },
      }));
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products,
      });
      return order.save();
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => ({
        quantity: i.quantity,
        product: { ...i.productId._doc },
      }));
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products,
      });
      return order.save();
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return next(new Error('No order found.'));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('Unauthorized.'));
      }
      const invoiceName = `invoice-${orderId}.pdf`;
      const invoicePath = path.join(
        'data',
        'invoices',
        `invoice-${orderId}.pdf`
      );

      const pdf = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);
      pdf.pipe(fs.createWriteStream(invoicePath));
      pdf.pipe(res);

      pdf.fontSize(26).text('Invoice');
      pdf.fontSize(16).text('--------------------------');
      let totalPrice = 0;
      order.products.forEach(prod => {
        totalPrice += prod.quantity * prod.product.price;
        pdf.text(
          `${prod.product.title} - ${prod.quantity} x ${prod.product.price}€`
        );
      });
      pdf.text('--------------------------');
      pdf
        .fontSize(20)
        .text('Total Price: ', { continued: true })
        .text(`${totalPrice}€`, { underline: true });

      pdf.end();
      // Stream chunks instead of preloading to memory.
      // fs.readFile(
      //   invoicePath,
      //   (err, data) => {
      //     if (err) {
      //       return next(err);
      //     }
      //     res.setHeader('Content-Type', 'application/pdf');
      //     res.setHeader(
      //       'Content-Disposition',
      //       `inline; filename="${invoiceName}"`
      //     );
      //     res.send(data);
      //   }
      // );

      // const file = fs.createReadStream(invoicePath);
      // file.pipe(res);
    })
    .catch(err => next(err));
};
