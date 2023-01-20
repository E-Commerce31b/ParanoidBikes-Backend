const express = require('express');
const {userModel, adminModel} = require('../models/index')
const router = express();
const jwt = require('jsonwebtoken')
const {   
    authenticateTokenUserRoute, 
    authenticateTokenAdminRoute
 } = require('../validators/tokenValidator')
// const { getUsersValidator } = require('../validators/bikeValidator')
// 
const bcrypt = require("bcryptjs")

router.get('/', authenticateTokenAdminRoute, async(req, res) => {
    const {first_name, last_name} = req.query
    try {
      const AllUsers = await userModel.find({})
      const users = AllUsers.filter(e => e.softDelete !== true)
      if(last_name || first_name) {
          let found = []
          last_name ? 
          found = users.filter(u => u?.last_name?.toLowerCase().includes(last_name?.toLowerCase())) :
          found = users.filter(u => u?.first_name?.toLowerCase().includes(first_name?.toLowerCase()))
          console.log(found)
          res.status(200).send(found)
      } else {
          res.status(200).send(AllUsers)
      }

    } catch (err) {
        console.log('error en get usuario')
        console.log(err)
        console.log('error en get usuario')
        res.status(404).send("not found D:")
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
      const data = await userModel.findById(id).populate('history')
      if(data.softDelete === true) {
          res.status(404).send('user not found D:')
      } else {
          res.status(200).send(data)
      }
        
    } catch (err) {
        console.log('error en get user id')
        console.log(err)
        console.log('error en get user id')
        res.status(404).send("not found D:")
    }

})

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const { ...body } = req.body
        body.password = hashedPassword

        const data = await userModel.findByIdAndUpdate(id, body)
        res.status(200).send(data)
    } catch (err) {
        console.log('error en put users')
        console.log(err)
        console.log('error en put users')
        res.status(400).send("cant't modify")
    }
})

router.post("/", async (req, res) => {
  // console.log('entre a post')
  try {
    const {
      first_name,
      password,
      last_name,
      history,
      type,
      purchased,
      email,
      country,
      city,
      state,
      address,
      birthday,
      DNI,
    } = req.body;

    // console.log(email, password)
    const createdUser = await userModel.create({
      first_name,
      password,
      last_name,
      history,
      type,
      purchased,
      email,
      country,
      city,
      state,
      address,
      birthday,
      DNI,
    });
    res.status(200).send("Usuario Creado");
  } catch (err) {
    console.log("error en post user");
    console.log(err);
    console.log("error en post user");
    res.status(404).send("can't post D:");
  }
});

router.post("/firebase-login", async (req, res) => {
  // console.log('firebase-login' + req.body);
  const { email } = req.body;
  console.log(email);
  try {
    const idToken = req.body.token;
    // console.log(idToken);
    const decodedToken = jwt_decode(idToken);
    // console.log(decodedToken);
    const uid = decodedToken.uid;
    const user = await adminModel.findOne({ email: email });
    if (!user) {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.status(401).send("El usuario no existe");
      } else {
        // generar un token de acceso personalizado
        const accessToken = jwt.sign(
          {
            data: {
              type: "User",
              id: user._id,
            },
          },
          "secretKey",
          {
            expiresIn: "10y",
          }
        );
        res.status(200).send({ accessToken: accessToken });
      }
    } else {
      // generar un token de acceso personalizado
      const accessToken = jwt.sign(
        {
          data: {
            type: "Admin",
            id: user._id,
          },
        },
        "secretKey",
        {
          expiresIn: "10y",
        }
      );
      res.status(200).send({ accessToken: accessToken });
    }
  } catch (error) {
    // manejar errores en la verificación del token
    res.status(401).send(error);
  }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    adminModel.findOne({ email: email }, (err, user) => {
      if (err) {
        res.status(500).send("Error al autenticar al usuario");
      }
      if (!user) {
        userModel.findOne({ email: email }, (err, user) => {
            if (err) {
              res.status(500).send("Error al autenticar al usuario");
            }
            if (!user) {
              res.status(500).send("El usuario no existe");
            } else {
              user.isCorrectPassword(password, (err, result) => {
                if (err) {
                  res.status(500).send("Error al autenticar");
                } else if (result) {
                  const accessToken = jwt.sign({
                      // Assigning data value
                      data: {
                        type: 'User',
                        id: user._id
                      }
                  }, 'secretKey', {
                      expiresIn: '10y'
                  });
                  res.status(200).send({accessToken: accessToken});
                } else {
                  res.status(500).send("Usuario o contranseña incorrecta");
                }
              });
            }
          });
      } else {
        user.isCorrectPassword(password, (err, result) => {
          if (err) {
            res.status(500).send("Error al autenticar");
          } else if (result) {
            // console.log(user)
            if(user.superAdmin) {
                const accessToken = jwt.sign({
                    // Assigning data value
                    data: {
                      type: 'SuperAdmin',
                      id: user._id
                    }
                }, 'secretKey', {
                    expiresIn: '10y'
                });
                res.status(200).send({accessToken: accessToken});
            } 
            if(user.admin && !user.superAdmin){
                const accessToken = jwt.sign({
                    // Assigning data value
                    data: {
                      type: 'Admin',
                      id: user._id
                    }
                }, 'secretKey', {
                    expiresIn: '10y'
                });
                res.status(200).send({accessToken: accessToken});
            }
          } else {
            res.status(500).send("Usuario o contranseña incorrecta");
          }
        });
      }
    });
  });

  

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const data = await userModel.findByIdAndDelete(id).populate('history').exec()
        res.status(200).send(data)
    } catch (err) {
        console.log('error en delete users')
        console.log(err)
        console.log('error en delete users')
        res.status(400).send("Can't delete")
    }
})

module.exports = router
