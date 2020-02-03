const { validationResult } = require('express-validator');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: {
      title: '',
      imageUrl: '',
      price: '',
      description: '',
    },
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      product: {
        title,
        price,
        description,
      },
      hasError: true,
      errorMessage: 'Image formats supported: jpg/jpeg/png',
      validationErrors: {
        title: '',
        imageUrl: '',
        price: '',
        description: '',
      },
    });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      product: {
        title,
        price,
        description,
      },
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: {
        title: errors.array().find(e => e.param === 'title') ? 'invalid' : '',
        imageUrl: errors.array().find(e => e.param === 'imageUrl')
          ? 'invalid'
          : '',
        price: errors.array().find(e => e.param === 'price') ? 'invalid' : '',
        description: errors.array().find(e => e.param === 'description')
          ? 'invalid'
          : '',
      },
    });
  }
  const product = new Product({
    title,
    imageUrl: image.path,
    price,
    description,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      console.log('Product Created!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
        hasError: false,
        errorMessage: null,
        validationErrors: {
          title: '',
          imageUrl: '',
          price: '',
          description: '',
        },
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const image = req.file;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDescription,
        _id: prodId,
      },
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: {
        title: errors.array().find(e => e.param === 'title') ? 'invalid' : '',
        imageUrl: errors.array().find(e => e.param === 'imageUrl')
          ? 'invalid'
          : '',
        price: errors.array().find(e => e.param === 'price') ? 'invalid' : '',
        description: errors.array().find(e => e.param === 'description')
          ? 'invalid'
          : '',
      },
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      if (image) {
        product.imageUrl = image.path;
      }
      return product.save().then(() => {
        console.log('Product Updated!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      res.render('admin/product-list', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      console.log('Product Deleted!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
