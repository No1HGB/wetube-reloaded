import "dotenv/config"; //protect STRINGS using envs
import "./db";
import "./client/js/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}`)
);
