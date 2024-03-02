import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

const secret = "secret123";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//auth is name of database
await mongoose.connect(
  "mongodb://localhost:27017/auth",
  options,
  (error, connection) => {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
    } else {
      console.log("Connected to MongoDB !");
    }
  }
);

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", //origin means from where the req is coming from.
  })
);

app.get("/", (req, res) => {
  res.end({ msg: "OK" });
});

app.get("/user", (req, res) => {
  // denotes if there is no token present
  if (!req.cookies.token) {
    return res.json({});
  }

  const payload = jwt.verify(req.cookies.token, secret);
  User.findById(payload.id).then((userInfo) => {
    res.json({ id: userInfo._id, email: userInfo.email });
    //we only require id and email , (in userInfo -> we are getting _id, email, hashed password);
  });
});

app.post("/register", (req, res) => {
  const { email, password } = req.body; //we require body parser this extraction
  //now encrypt the password before storing into db
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ password: hashedPassword, email });
  user.save().then((userInfo) => {
    // console.log(userInfo);
    // res.send('');

    //When registration successfully done , we will login the user , by sending a token inside a cookie
    //so use jsonwebtoken
    jwt.sign(
      { id: userInfo._id, email: userInfo.email },
      secret,
      (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res
            .cookie("token", token)
            .send({ id: userInfo._id, email: userInfo.email });
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body; //we require body parser this extraction
  //now encrypt the password before storing into db
  User.findOne({ email }).then((userInfo) => {
    const passOk = bcrypt.compareSync(password, userInfo.password);
    if (passOk) {
      jwt.sign({ id: userInfo._id, email }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res
            .cookie("token", token)
            .send({ id: userInfo._id, email: userInfo.email });
        }
      });
    } else {
      res.sendStatus(401);
    }
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").send();
});

app.listen(4000, () => {
  console.log("The Server is running on the PORT 4000");
});
