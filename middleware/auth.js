const jwt = require('jsonwebtoken')

const middleware = {
    authToken: async (req, res, next) => {
        try {
            // bearer toke
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmIwOWMzNjY3NTYzNWFmYzM0NjhiMTEiLCJuYW1lIjoidGVzdDIyIiwicGFzc3dvcmQiOiIkMmIkMTAkQXl1bm5sbDhVMHdpMnYwQ3lZUHFlZUJMbS85bUt2RHcvRHJDNWxqTUFQSEcwV283cEZvQ3kiLCJhZ2UiOjEwLCJjcmVhdGVkQXQiOiIyMDI0LTA4LTA1VDA5OjMyOjM4LjYyNVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA4LTA1VDA5OjMyOjM4LjYyNVoiLCJfX3YiOjAsImlzX3Bhc3MiOnRydWUsImlhdCI6MTcyMjg1MTM3Nn0.5Sg6lze6MxObtCIqATNLhq7pGOtm862hOUzNhbDSnXo
            let token = req.headers.authorization.split(' ')[1]
            let is_check = await jwt.verify(token, "123456")
            if (!is_check) return res.status(401).send('Unauthorized')
            next()
        } catch (error) {
            res.status(500).send(error.message)
        }

    }
}

module.exports = { ...middleware }