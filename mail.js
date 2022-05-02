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
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:16px; font-family:trebuchet ms,helvetica,sans-serif; color:#B9762F; background-color:#FFFFFF;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
  <center>
  <table><tr><td width="700">
<![endif]-->
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:700px;" align="center">
                                    <tr>
                                      <td role="modules-container" style="padding:0px 0px 0px 0px; color:#B9762F; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
  <tr>
    <td role="module-content">
      <p></p>
    </td>
  </tr>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1b9b7db8-c2f5-4943-bbe4-7cc9bfef45ad" data-mc-module-version="2019-10-22">

</table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 60px 12px 60px;" bgcolor="#B9762F" data-distribution="1">
  <tbody>
    <tr role="module-content">
      <td height="100%" valign="top"><table width="200" style="width:200px; border-spacing:0; border-collapse:collapse; margin:0px 190px 0px 190px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
    <tbody>
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="069ade7e-6b71-4c21-8a34-a4bf8393e70d">
  <tbody>
    <tr>
      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
      </td>
    </tr>
  </tbody>
</table></td>
      </tr>
    </tbody>
  </table></td>
    </tr>
  </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 15px 0px;" bgcolor="#B9762F" data-distribution="1">
  <tbody>
    <tr role="module-content">
      <td height="100%" valign="top"><table width="260" style="width:260px; border-spacing:0; border-collapse:collapse; margin:0px 220px 0px 220px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
    <tbody>
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="15af8a9f-5f04-4626-8ad0-42f3daf8cad1.1" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:0px 0px 0px 0px; line-height:36px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #fae2a4; font-size: 20px;font-weight:900;margin: 20px">Hinge Consulting Firm</span></div><div></div></div></td>
    </tr>
  </tbody>
</table></td>
      </tr>
    </tbody>
  </table></td>
    </tr>
  </tbody>
</table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1907ce09-be93-4607-a9e3-b697ca9e82f8">
</table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 10px 70px 10px;" bgcolor="#FAE2A4" data-distribution="1">
  <tbody>
    <tr role="module-content">
      <td height="100%" valign="top"><table width="460" style="width:460px; border-spacing:0; border-collapse:collapse; margin:0px 110px 0px 110px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
    <tbody>
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0a015936-50f3-44d1-be17-b08b49b1e339.2" data-mc-module-version="2019-10-22">
  
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0a015936-50f3-44d1-be17-b08b49b1e339" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:0px 0px 0px 0px; line-height:25px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #000000; font-size: 25px"><strong>${name} Applied for Job</strong>
      Download CV below
      </span></div><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0a015936-50f3-44d1-be17-b08b49b1e339.3" data-mc-module-version="2019-10-22">
</table>
<table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="225a8e2b-940c-417b-b512-b29980d8babf">
    <tbody>
      <tr>
        <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
          <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
            <tbody>
              <tr>
              <td align="center" bgcolor="#FAE2A4" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
              </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table></td>
      </tr>
    </tbody>
  </table></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7be36129-3e47-487e-9713-24fa804388ad">
  
</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#000000; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">Ade-akanfe Philip</p><p style="font-size:12px; line-height:20px;"></div><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="e008f292-388f-481e-af50-167360fb0da3">
    <tbody>
      <tr>
        <td align="center" bgcolor="" class="outer-td" style="padding:20px 0px 20px 0px;">
          <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
            <tbody>
              <tr>
              <td align="center" bgcolor="#F5F8FD" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                <a href="#" style="background-color:#F5F8FD; border:1px solid #F5F8FD; border-color:#F5F8FD; border-radius:25px; border-width:1px; color:#A8B9D5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ Hinge consulting Firm</a>
              </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table></td>
                                    </tr>
                                  </table>
                                  <!--[if mso]>
                                </td>
                              </tr>
                            </table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
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
      subject: `${name} sent us a feedback`,
      text: "Feedback for Hinge Consultancy",
      html: `
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:16px; font-family:trebuchet ms,helvetica,sans-serif; color:#B9762F; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="700">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:700px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#B9762F; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1b9b7db8-c2f5-4943-bbe4-7cc9bfef45ad" data-mc-module-version="2019-10-22">

  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 60px 12px 60px;" bgcolor="#B9762F" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="200" style="width:200px; border-spacing:0; border-collapse:collapse; margin:0px 190px 0px 190px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="069ade7e-6b71-4c21-8a34-a4bf8393e70d">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 15px 0px;" bgcolor="#B9762F" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="260" style="width:260px; border-spacing:0; border-collapse:collapse; margin:0px 220px 0px 220px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="15af8a9f-5f04-4626-8ad0-42f3daf8cad1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px; line-height:36px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #fae2a4; font-size: 20px;font-weight:900;margin: 20px">Hinge Consulting Firm</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1907ce09-be93-4607-a9e3-b697ca9e82f8">
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 10px 70px 10px;" bgcolor="#FAE2A4" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="460" style="width:460px; border-spacing:0; border-collapse:collapse; margin:0px 110px 0px 110px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0a015936-50f3-44d1-be17-b08b49b1e339.2" data-mc-module-version="2019-10-22">
    
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0a015936-50f3-44d1-be17-b08b49b1e339" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px; line-height:25px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #000000; font-size: 25px"><strong>${data}</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0a015936-50f3-44d1-be17-b08b49b1e339.3" data-mc-module-version="2019-10-22">
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="225a8e2b-940c-417b-b512-b29980d8babf">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#FAE2A4" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7be36129-3e47-487e-9713-24fa804388ad">
    
  </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#000000; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">Ade-akanfe Philip</p><p style="font-size:12px; line-height:20px;"></div><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="e008f292-388f-481e-af50-167360fb0da3">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:20px 0px 20px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#F5F8FD" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                  <a href="https://hinge.com/" style="background-color:#F5F8FD; border:1px solid #F5F8FD; border-color:#F5F8FD; border-radius:25px; border-width:1px; color:#A8B9D5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ Hinge consulting Firm</a>
                </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
      `,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
feedback("Adeakanfe", "aadeakanfe@gmail.com", "Ademola is my name")
  .then((res) => {
    console.log("done");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = { SendResetEmail, feedback };
