const bcrypt = require('bcryptjs');
const User   = require('../models/userModel');

exports.getRegister = (req, res) => {
  res.render('auth/register');
};

exports.postRegister = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const existing = await User.findByEmail(email);
    if (existing) {
      req.flash('error', 'Email đã được sử dụng');
      return res.redirect('/auth/register');
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create(name, email, hashed, phone);
    req.flash('success', 'Đăng ký thành công, hãy đăng nhập');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Lỗi server, thử lại sau');
    res.redirect('/auth/register');
  }
};

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      req.flash('error', 'Email không tồn tại');
      return res.redirect('/auth/login');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash('error', 'Sai mật khẩu');
      return res.redirect('/auth/login');
    }
    req.session.user = { id: user.id, name: user.name, role: user.role };
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Lỗi server, thử lại sau');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};