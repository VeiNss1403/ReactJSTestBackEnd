const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
var inlineBase64 = require("nodemailer-plugin-inline-base64");

const sendEmailCreateOrder = async (email, orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  transporter.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));

  let listItem = "";
  const attachImage = [];
  let total = 0;
  orderItems.forEach((order) => {
    listItem += `
    <div>
      <div>
        Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> với giá là: <b>${order.price} VND</b>
        và đang được giảm giá: <b>${order.discount} %</b>
      </div>
    </div>`;
    total +=
      order.amount * order.price -
      (order.amount * order.price * order.discount) / 100;
    attachImage.push({ path: order.image });
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng tại Vivita", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div><b>Bạn đã đặt hàng thành công tại Vivita</b></div> 
    ${listItem}
    <div><b>Tổng giá trị đơn hàng: ${total} VND </b></div>`,
    attachments: attachImage,
  });
};

module.exports = {
  sendEmailCreateOrder,
};
