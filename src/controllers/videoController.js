import Video from "../models/Video";
import User from "../models/User";

//callback function execute last
//promise: the newest version of callback function
//use async-await to wait until recieve database
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  //express automatically find in /views
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  //use ES6 grammer. same as const id = req.params.id
  const { id } = req.params;
  //mongoose: populate fills User info in owner(videoSchema ref)
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  //only owner of video can access this page
  //Js also compare type of data, so be careful type
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); //exists return boolean
  const videoModified = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(videoModified.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

//use async-await to wait db saving time
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  //recieve req.file.path and change the name of variation
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    //push: add things in array
    //In User Shema, there's 'videos' array
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  //delete video array in User
  //Splice() just return array,not save
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  //recieve keyword
  const { keyword } = req.query;
  //start state, video array is empty
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        //use Regular Expression to search(*refer mongodb query operator)
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
