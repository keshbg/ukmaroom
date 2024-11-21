import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
// import {
//   getAllusers,
//   getUserProfile,
//   editUserProfile,
// } from '../controllers/users.js'
import {
  addSingleRoom,
  getAllRooms,
  getSingleRoom,
  editRoom,
  deleteRoom,
  searchRooms,
} from '../controllers/rooms.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/addaroom').post(secureRoute, addSingleRoom)
router.route('/getallrooms').get(getAllRooms)
router
  .route('/getsingleroom/:id')
  .get(getSingleRoom)
  .put(secureRoute, editRoom)
  .delete(secureRoute, deleteRoom)

router.route('/search/:key').get(searchRooms)

export default router
