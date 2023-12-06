import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = "8000";

// nodemailer Code

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // True for 465 POrt Other are false
  auth: {
    user: "shindeajay346@gmail.com", // generated ethernal username
    pass: "pojnbjlmyfilghvo", // generated ethernal password
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", (req, res) => {
  //   consol.loe.log(res);
  //   console.log(req.body);
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  var mailOption = {
    from: "shindeajay346@gmail.com",
    to: "shindeajay9665@gmail.com",
    subject: "Mail From Portfolio",

    html: `<h6>Name :-${name}</h6><h6>Email :-${email}</h6><h6>Message :-${message}</h6>`,
  };

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Send Success");
    }
  });
});

// Static Files

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Server Running On PORT " + PORT);
});
