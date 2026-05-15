const Product = require('../models/productModel');

exports.index = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.render('products/index', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi server');
  }
};

exports.show = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
    res.render('products/show', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi server');
  }
};

const upload = require('../middleware/upload');

exports.getCreate = async (req, res) => {
  try {
    const categories = await Product.getAllCategories();
    res.render('products/create', { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi server');
  }
};

exports.postCreate = async (req, res) => {
  try {
    const { category_id, title, description, price, condition_type } = req.body;

    if (price <= 0 || price > 999999999999) {
      req.flash('error', 'Giá không hợp lệ, tối đa 999,999,999,999đ');
      return res.redirect('/products/create');
    }

    const image_url = req.file ? '/images/products/' + req.file.filename : null;
    await Product.create({
      user_id: req.session.user.id,
      category_id, title, description, price, condition_type, image_url,
    });

    req.flash('success', 'Đăng bán thành công!');
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Đăng bán thất bại, thử lại');
    res.redirect('/products/create');
  }
};