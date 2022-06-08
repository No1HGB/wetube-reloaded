import express from "express";
import {
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
  logoutSession,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();
//login
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/kakao/start", publicOnlyMiddleware, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnlyMiddleware, finishKakaoLogin);

//logout
userRouter.get("/kakao/logout", protectorMiddleware, logoutSession);
userRouter.get("/logout", protectorMiddleware, logout);

//all:use protectorMiddleware any http method(get,post..)
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  //use multerMiddleware(see doc of multer)
  //multerMiddleware enable to use req.file
  .post(avatarUpload.single("avatar"), postEdit);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id", see);

export default userRouter;
