const jwt = require('jsonwebtoken')

function authenticateTokenUserRoute(req, res, next) {
   // Obtén el token del header de la petición
   const authHeader = req.headers['authorization']
   // console.log(authHeader)
   const token = authHeader && authHeader.split(' ')[1]
   // console.log(token)
   // Verifica que el token sea válido
   if (token == null) return res.sendStatus(401)
   jwt.verify(token, "secretKey", (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      // console.log('llegue a next')
      console.log(user)
      if(user.data.type === 'User') {
         next()
      }
   })
}

function authenticateTokenAdminRoute(req, res, next) {
   // console.log('entre')
   // Obtén el token del header de la petición
   const authHeader = req.headers['authorization']
   // console.log(authHeader)
   const token = authHeader && authHeader.split(' ')[1]
   console.log(token)
   // Verifica que el token sea válido
   if (token == null) return res.sendStatus(401)
   jwt.verify(token, "secretKey", (err, user) => {
      // console.log('entre a jwt')
      if (err) return res.sendStatus(403)
      req.user = user
      // console.log('llegue a next')
      // console.log(user.data.type)
      if(user.data.type === 'Admin' || user.data.type === 'SuperAdmin') {
         next()
      } else {
         res.sendStatus(401)    
      }
   })
}

const validateAdminToken = (token) => {
   // console.log(token)
   let decoded = token && token.split(' ')[1]
   // console.log('decoded', decoded)
   if(token == null) throw('Usuario no desconocido')
   jwt.verify(decoded, 'secretKey', (err, user) => {
      // console.log(user)
      if(user.data.type === 'Admin' || user.data.type === 'SuperAdmin') {
         console.log(user.data.type)
         const data = user.data.type
         return data
      } else {
         return "User"
      }
   })
}



module.exports = {
   authenticateTokenUserRoute, 
   authenticateTokenAdminRoute,
   validateAdminToken
}