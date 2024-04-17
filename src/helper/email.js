import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


//  Configuration of nodemailer = create nodemailer transporter 
const transporter = nodemailer.createTransport(
    {
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.SMTP_KEY
        }
    }
)


//  create sendEmail  function

export  const sendEmail = async (to,subject,  msg) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: "Email From FragranceHub",
        text: "Thank you for your patronage ",
        html: `<body>
            <h2>${subject} </h2>
            <p> ${msg}</p>
            <b> Fragrancehub mgt</b>
        </body>`
    }
    
    try {
        await transporter.sendMail(mailOptions)
        console.log(`email sent to ${to}`);
    } catch (err) {
        console.log("Error Sending Email", err.message)
    }

}


//sendEmail using the transporter 