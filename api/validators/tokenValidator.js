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
      if(user.data.type === 'Admin' || user.data.type === 'SuperAdmin') {
         next()
      } else {
         res.sendStatus(401)    
      }
   })
}



module.exports = {
   authenticateTokenUserRoute, 
   authenticateTokenAdminRoute
}