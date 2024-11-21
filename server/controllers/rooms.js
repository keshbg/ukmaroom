import Room from '../models/rooms.js'

//Get all rooms

export const getAllRooms = async (req, res) => {
  const rooms = await Room.find()
  return res.status(200).json(rooms)
}

//get a single room

export const getSingleRoom = async (req, res) => {
  try {
    const { id } = req.params
    const singleRoom = await Room.findById(id)
    if (!singleRoom) throw new Error()
    return res.status(200).json(singleRoom)
  } catch (err) {
    return res.status(400).json({ message: ' room not found' })
  }
}

// Add a room

export const addSingleRoom = async (req, res) => {
  try {
    const user = req.currentUser
    const newRoom = await Room.create({
      ...req.body,
      owner: req.currentUser._id,
    })
    await req.currentUser.rooms.push(newRoom)
    await req.currentUser.save({ validateModifiedOnly: true })
    return res
      .status(202)
      .json({ message: ` ${newRoom.roomTitle} is added on the list!!` })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

// edit a room

export const editRoom = async (req, res) => {
  try {
    const { id } = req.params
    const editedRoom = await Room.findById(id)
    if (!editedRoom) throw new Error('no room found')
    if (!editedRoom.owner.equals(req.currentUser._id))
      throw new Error('unauthorized to edit')
    Object.assign(editedRoom, req.body)
    await editedRoom.save({ validateModifiedOnly: true })
    return res.status(200).json(editedRoom)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

// delete a room

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params
    const roomToDel = await Room.findById(id)
    if (!roomToDel) throw new Error('no room found')
    if (!roomToDel.owner.equals(req.currentUser._id))
      throw new Error('unauthorized to delete')
    await roomToDel.remove()
    return res.sendstatus(204)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

// find rooms via search

export const searchRooms = async (req, res) => {
  const { key } = req.params
  try {
    const results = await Room.find({
      $or: [
        { addressCity: { $regex: key } },
        // {addressCity : { $regex: req.params.key }} can add multiple here
      ],
    })
    if (!results) throw new Error('cant find any rooms in that location')
    return res.status(200).json(results)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
