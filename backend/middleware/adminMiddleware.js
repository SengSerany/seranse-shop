const adminHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403);
      throw new Error('You are not authorized to access this page.');
    }
  } else {
    res.redirect('/api/v1/auth/login/?auth=false');
  }
};

module.exports = {
  adminHandler,
};
