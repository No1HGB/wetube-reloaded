//say model of db to mongoose
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String },
  description: { type: String, required: true, trim: true, minlength: 1 },
  createdAt: { type: Date, default: Date.now }, //do not Date,now(), because don't want execute immediately
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  //connect video and user using ref(reference)
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
//static: make a own Mongoose function
//It works as a Mongoose Middleware
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
