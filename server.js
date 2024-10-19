const express = require("express");
const nodemailer = require("nodemailer")
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json())

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/contact.html")
})

app.post("/", (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:
        {
            user: "your-email-here",
            pass: "your-app-password-here"
        },
        secure: true,
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions =
    {
        from: req.body.email,
        to: "your-email-here",
        subject: `New Message from ${req.body.name} (${req.body.email})`,
        text:  `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log("Email sent: " + info.response)
            res.status(200).send("Success!");
        }
    })
})

app.listen(3000, () => {
    console.log("Server is running on http://127.0.0.1:3000");
});