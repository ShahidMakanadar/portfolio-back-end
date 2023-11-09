require('dotenv').config()
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express(); 
app.use(express.json());
app.use(cors({
    origin: 'https://shahid-makandar.vercel.app/'
}));
     
// users API's  
app.get('/',(req,res)=>{
    res.send({result:"portfolio"})
})

//CONTACT FORM EMAIL API WITH NODEMAILER
app.post('/sendEmail', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body

        // connect with the smtp Transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            }
        }); 
        const EmailmessageUser = `\n*Name : ${name} \n*Email-Id : ${email} \n*Message : ${message} `;
        // send mail with defined transport object
        let detailes = {
            from: process.env.USER_EMAIL,// sender address
            to: process.env.EMAIL_TO , // list of receivers
            subject: `${subject}`, // Subject line
            text: EmailmessageUser, // plain text body
        };
        transporter.sendMail(detailes, async (err) => {
            if (err) {
                console.log("errore is occure on sending message", err)
                res.status(200).send({message:"fail"})
            }
            else {
                console.log("successfulli message send")
                res.status(200).send(result)
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

app.listen(process.env.PORT || 1000);