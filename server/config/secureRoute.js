import jwt from 'jsonwebtoken'
import { secret } from './environment.js'
import user from '../models/user.js'

// If user exists we can proceed to controller
export const secureRoute = async (req, res, next) => {
  try {
    // Check the header is on the request
    if (!req.headers.authorization) throw new Error()
    // Remove the uneeded Bearer part from token
    const token = req.headers.authorization.replace('Bearer ', '')
    // Verify the token
    const payload = jwt.verify(token, secret)
    // Use token to query the user model by using the sub section of the decoded token
    const userToVerify = await user.findById(payload.sub)
    if (!userToVerify) throw new Error('User not found')
    console.log(userToVerify)
    req.currentUser = userToVerify
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}
