exports.requireLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'Vui lòng đăng nhập để tiếp tục');
    return res.redirect('/auth/login');
  }
  next();
};