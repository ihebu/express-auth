const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const util = require("util");

createTemplate = async (fileName) => {
  const readFile = util.promisify(fs.readFile);
  const file = path.join(__dirname, "../", "templates", fileName);
  const result = await readFile(file, "utf8");
  const template = Handlebars.compile(result);
  return template;
};

createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  return transporter;
};

sendMail = async (obj) => {
  const transporter = createTransporter();
  const template = await createTemplate(obj.template);
  const info = await transporter.sendMail({
    from: process.env.APP_NAME,
    to: obj.receiver,
    subject: obj.subject,
    html: template(obj.data),
  });
  return info.messageId;
};

module.exports = sendMail;
