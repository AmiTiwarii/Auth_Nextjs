import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId} : any) => {
    try {
        // create a hashed token 
        const hashedToken = await bcryptjs.hash(userId.toString(),10);

       if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
       }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
       }


       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user : process.env.USER,
          pass : process.env.PASSWORD
        }
      });

      const mailOptions = {
        form: 'TiwariBhai@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email": "Reset your password", 
        html: `<p> CLick <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
        or copy and paste the link in the browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
      }

      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}