//local object is basically exist and empty object

import multer from "multer";

// pug can use res.locals automatically. #7.10
export const localsMiddleware = (req, res, next) => {
  //browser relocates to server whether user loggedIn
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {}; //or
  next();
};

//only loggedIn can access
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Log in First");
    return res.redirect("/login");
  }
};

//only not loggedIn can access
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

//read multer docs
export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 10000000,
  },
});
