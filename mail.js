require("dotenv").config();
// const { fstat } = require("fs");
const nodeMailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const path = require("path");
const fs = require("fs");
const transport = nodeMailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);
// to: "hop@hingeconsulting.com.ng",

const SendResetEmail = async (
  email,
  name,
  fileName,
  filePath,
  docType,
  desc
) => {
  try {
    await transport.sendMail({
      to: "ademolapamilerin192@gmail.com",
      from: "adeakanfea@gmail.com",
      subject: `${name} Details`,
      text: "Request for job offer",
      inReplyTo: email,
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div style="width:'100%'; display:'flex'; justify-content:'center'; align-item:'center';background-color:'blue'">
            <h2 style="width:"100%"; text-align:'center';font-size:'2rem'; color:'white'">${
              name.split(" ")[0]
            } Details
            </h2>
            <h3 style=" width:'100%'; text-align:'center'; font-size:'2rem'; color:'white' ">Name: ${name}</h3>
            <h3 style=" width:'100%'; text-align:'center'; font-size:'2rem'; color:'white'; text-decoration:'underline'">About: ${
              name.split(" ")[0]
            } 's Details
            </h3>
            <h4 style="width:'100%'; text-align:'center'; font-size:'1.2rem'; color:'white'; text-decoration:'underline'">${desc}</h4>
            <h4 style="width:'100%'; text-align:'center'; font-size:'2rem', color:'white'">CV below</h3>
          </div>
        </body>
      </html>
        `,
      attachments: [
        {
          filename: fileName,
          path: path.join(filePath),
          contentType: docType,
        },
      ],
    });
  } catch (error) {
    fs.unlinkSync(path.join(filePath));
    if (error.message === "getaddrinfo ENOTFOUND api.sendgrid.com") {
      throw new Error("Please try again later Request can't be completed");
    }
    const errorVal = error.message;
    throw new Error(errorVal);
  }
};
const feedback = async (name, email, data) => {
  try {
    await transport.sendMail({
      to: "ademolapamilerin192@gmail.com",
      from: "adeakanfea@gmail.com",
      inReplyTo: email,
      subject: "Someone send us a feedback",
      text: "Feedback for Hinge Consultancy",
      html: `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
              <div style="width:'100%'; display:'flex'; justify-content:'center'; align-item:'center';background-color:'blue'">
                <h2 style="width:"100%"; text-align:'center';font-size:'2rem'; color:'white'">Feedback from ${
                  name.split(" ")[0]
                } Details
                </h2>
                <h3 style=" width:'100%'; text-align:'center'; font-size:'2rem'; color:'white' ">Name: ${name}</h3>
                <h2>Email Address: ${email}</h2>
                <h4 style="width:'100%'; text-align:'center'; font-size:'1.2rem'; color:'white'; text-decoration:'underline'">${data}</h4>
              </div>
            </body>
          </html>
      `,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { SendResetEmail, feedback };
