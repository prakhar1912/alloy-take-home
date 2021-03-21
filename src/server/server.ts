import express from "express";
import path from "path";
import * as dotenv from "dotenv";
import db from "./db";
import { Account, Email, User } from "../model";
import cronJob from "./cronJob";
import * as slackBot from "./slackBot";

dotenv.config();

const app = express();

cronJob.start();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../public")));
app.set("views", path.join(__dirname, "../templates"));


app.post("/signup", async function(req, res) {
  try {
    const { email, password } = req.body;
    const account = new Account({ email, password });
    await account.save();
    res.status(200).send("Account created");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.post("/login", async function(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Account.findOne({ email }).exec();
    if (user) {
      if (user.passwordMatches(password)) {
        return res.status(200).send(user);
      }
      return res.status(400).send("Password does not match");
    }
    res.status(400).send("User not found");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.get("/auth/redirect", async function (req, res) {
  if (!req.query.code) {
    return;
  }
  try {
    var data = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code
    };
    const response = await slackBot.getAccessToken(data);
    console.log("Response:::::", response);
    const user = {
      userId: response.authed_user.id,
      accessToken: response.access_token,
    };
    const newUser = new User(user);
    await newUser.save();
    res.sendFile(path.resolve(__dirname + "../../../public/success.html"));
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.get("/slack", function (req, res) {
  res.render("slack.ejs", { clientId: process.env.CLIENT_ID });
});

app.post("/event", async function (req, res) {
  try {
    const email = req.body.form_response.answers[0].text;
    const newEmail = new Email({ email: email });
    await newEmail.save();
    await slackBot.sendScrappData();
    res.status(200).send("done");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

db.dbConnect()
  .then(() => {
    try {
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`App is listening on port ${port}!`);
      });
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => console.log(err));
