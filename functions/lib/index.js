"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const admin = require("firebase-admin");
admin.initializeApp();
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "syuku@kwayuku.com",
        pass: "HackByte(2018)"
    },
});
exports.sendOrder = functions.database.ref('/orders').onWrite(async (snapshot, context) => {
    return new Promise(async (resolve, reject) => {
        console.log("snapshot", snapshot);
        console.log("context", context);
        const mailOptions = {
            from: 'husltersld@husltersld.co.za',
            to: 'syuku@kwayuku.com',
            subject: "New Order",
            text: "Please attend to the new order made"
        };
        try {
            await mailTransport.sendMail(mailOptions);
            console.log("Email sent");
        }
        catch (error) {
            console.error("Error", error);
        }
    });
});
//# sourceMappingURL=index.js.map