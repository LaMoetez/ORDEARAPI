// Require the necessary modules
const jwt_decode = require("jwt-decode");
const twilio = require('twilio');
const RandomString = require("randomstring");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const nodemailer = require("nodemailer");

const User = require('../models/user.model');

// --------------- Email send -------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  },
});

// ----------- Multer image ----------------------------
const MIME_TYPES = { //définir les types des images a accepter
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/user/'); //on va stocker les files dans uploads/user
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage }).single("image");

// ----------- Twilio SMS ---------------------
// Create a Twilio client object
const accountSid = `${process.env.ACCOUNT_SID}`
const authToken = `${process.env.AUTH_TOKEN}`;
const client = twilio(accountSid, authToken);

const userController = {

  addUser: async (req, res) => {
    try {
      const tokenViewProfile = req.cookies.tokenLogin;
      let decodeTokenLogin = jwt_decode(tokenViewProfile);
      let idUser = decodeTokenLogin.id;
      let role = decodeTokenLogin.role;

      if (idUser) {
        if (role == "superAdmin" || role == "resFranchise" ||role =="resRestaurant") {
          const { userName, email, phone, address, role } = req.body;

          if (!userName || !email || !phone || !address) {
            return res
              .status(400)
              .json({ message: "Not all fields have been entered" });
          }
          User.findOne({ email }).then((user) => {
            if (user) { return res.status(400).json({ error: "Email is already taken" }); }
          });

          const pwdRandom = RandomString.generate({ length: 8, charset: "string", });

          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(pwdRandom, salt);

          const options = {
            from: "ettouils505@gmail.com",
            to: email,
            subject: "Account credientials",
            html: `
               <div style = "max-width: 700px;
                     margin: 0 auto;
                     background-color: #fff;
                     box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                     border-radius: 5px;
                     border: 5px solid #ddd;padding: 50px 20px; font-size: 110%;"
               >
               <h2 style="font-size: 18px; margin-bottom: 20px; text-align: center; text-align: center; color: #044494"> Welcome to Ordear</h1>
               <p style="margin-top: 0; margin-bottom: 15;">This is your work account credentials to signIn in Ordear application</p>
               <a> Your email : ${email}</a>
               <br>
               <a> Your password : ${pwdRandom}</a>
               <p>Equipe Ordear</p>
               </div>
                
                `,
          };
          transporter.sendMail(options, function (err, info) {
            if (err) {
              return res.status(400).json({ error: "Error activating account" + err });
            } else { return res.status(200).json({ message: "An email has been sent" }); }
          });

          // Créer un nouvel utilisateur
          const newUser = new User({
            userName,
            email,
            password: passwordHash,
            image: '',
            phone,
            address,
            role,
            activate: 1,
            firstLogin : 0,
          });

          // Enregistrer l'utilisateur dans la base de données
          const savedUser = await newUser.save();
          return res.status(500).json({ savedUser });
        }
      }
      res.status(400)
         .json({message : "you are not authorized to add a new account"})
    }
    catch (error) {
      return res.status(500).json({ message: "Register failed" + "" + error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const tokenViewProfile = req.cookies.tokenLogin;
      let decodeTokenLogin = jwt_decode(tokenViewProfile);
      let idUser = decodeTokenLogin.id;

      User.find({ "_id": idUser })
        .then((docs) => {
          res.send(docs)
        })
        .catch((err) => {
          res
            .status(400)
            .json({ message: "Invalid" + "" + err });
        });

    } catch (err) {
      return res.status(500).json({ message: "Something wrong" + "" + err.message });
    }

  },

  updateUser: async (req, res) => {
    try {
      const tokenProfile = req.cookies.tokenLogin;
      let decodeTokenLogin = jwt_decode(tokenProfile);
      let idUser = decodeTokenLogin.id;

      User.updateOne(
        { "_id": idUser },
        { $set: { "firstName": req.body.firstName, "lastName": req.body.lastName, "address": req.body.address, "birthday": req.body.birthday, "phone": req.body.phone, 'activate': req.body.activate } }

      ).then(() => {
        res.json({ message: "updated" });
      })
        .catch(() => {
          res.json({ message: "not updated" });
        });

    } catch (err) {
      return res.status(500).json({ message: "Something wrong" + "" + err.message });
    }

  },

  updatePassword: async (req, res) => {
    try {
      const tokenProfile = req.cookies.tokenLogin;
      let decodeTokenLogin = jwt_decode(tokenProfile);
      let idUser = decodeTokenLogin.id;

      const confirmPwd = req.body.confirmPassword;
      const newPass = req.body.password;

      if (!newPass || !confirmPwd) {
        return res
          .status(400)
          .json({ message: "Password field is empty" });
      }
      if (newPass != confirmPwd) {
        return res.status(400).json({ error: "Mismatch password" });
      }

      let salt = bcrypt.genSaltSync(10);
      User.updateOne(
        { "_id": idUser }, // Filter par id
        { $set: { "password": bcrypt.hashSync(newPass, salt) }, }
      )
        .then((obj) => {
          return res
            .status(200)
            .json({ message: 'Password updated' });
        })
        .catch((err) => {
          res.json({ message: "Password has not been updated" } + "" + err)
        })
    } catch (err) {
      return res.status(500).json({ message: "Password has not been updated" + err.message });
    }
  },

  sendSMS: async (req, res) => {

    const tokenLogin = req.cookies.tokenLogin;
    let decodeTokenLogin = jwt_decode(tokenLogin);
    let idUser = decodeTokenLogin.id;

    const phoneNumber = req.body.phoneNumber;

    const activationCode = RandomString.generate({
      length: 4,
      charset: "numeric",
    });
    if (idUser) {

      function sendSMS(to, message) {

        client.messages
          .create({
            body: message,
            from: '+14344045641',
            to: phoneNumber,
          })

        // Exemple d'utilisation de la fonction d'envoi de SMS
      }
      sendSMS('+14344045641', 'This is your code verification : ' + activationCode);

    }
    const tokenSend = jwt.sign(
      { idUser, phoneNumber, activationCode },
      `${process.env.JWT_ACC_ACTIVATE}`,
      { expiresIn: "3m" }
    );

    res.cookie("tokenSend", tokenSend, { expiresIn: "3m" });
    res.json(tokenSend);

  },

  updatePhone: async (req, res) => {

    //------------ tokenSend ---------------------------------------------
    const tokenSend = req.cookies.tokenSend;
    const decodedToken = jwt.verify(tokenSend, process.env.JWT_ACC_ACTIVATE)
    let code = decodedToken.activationCode;
    let phoneNumber = decodedToken.phoneNumber;
    let idUser = decodedToken.idUser;

    const codeActivation = req.body.code;
    console.log(code);
    if (codeActivation == code) {
      User.updateOne(
        { "_id": idUser },
        { $set: { "phone": phoneNumber } } // Update
      )
        .then(() => {
          return res
            .status(200)
            .json({ message: 'Phone number updated' });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ message: 'Error' + ' ' + err });
        })
    } else {
      res
        .status(500)
        .json({ message: "Phone number not updated" })
    }

  },

  resend: async (req, res) => {
    const tokenSend = req.cookies.tokenSend;
    const decodedToken = jwt.verify(tokenSend, process.env.JWT_ACC_ACTIVATE)
    let phoneNb = decodedToken.phoneNumber;
    let id = decodedToken.idUser;

    console.log(phoneNb);

    const activationCodeResend = RandomString.generate({
      length: 4,
      charset: "numeric",
    });

    function sendSMS(to, message) {

      client.messages
        .create({
          body: message,
          from: '+14344045641',
          to: phoneNb,
        })

      // Exemple d'utilisation de la fonction d'envoi de SMS
    }
    sendSMS('+14344045641', 'This is your code verification : ' + activationCodeResend);

    const tokenResent = jwt.sign(
      { id, phoneNb, activationCodeResend },
      `${process.env.JWT_ACC_ACTIVATE}`,
      { expiresIn: "3m" }
    );

    res.cookie("tokenResent", tokenResent, { expiresIn: "3m" });
    res.json(tokenResent);

  },

  updateImage: async (req, res) => {
    try {
      const tokenLogin = req.cookies.tokenLogin;
      let decodeTokenLogin = jwt_decode(tokenLogin);
      let idUser = decodeTokenLogin.id;
      const img = req?.file?.originalname;

      if (idUser) {
        User.updateOne(
          { "_id": idUser },
          { $set: { "image": img } } //avoir la valeur du file uploaded  
        ).then(() => {
          res.json({ message: "Image updated" });
        })
          .catch(() => {
            res.json({ message: "Image not updated" });
          });
      }
    } catch (err) {
      return res.status(500).json({ message: "Something wrong " + err.message });
    }

  }

};

module.exports = userController;