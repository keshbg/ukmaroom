import User from '../models/user.js'

export const getAllusers = async (_req, res) => {
  const users = await User.find()
  return res.status(200).json(users)
}

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error()
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'not found' })
  }
}

export const editUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndUpdate(id, req.body)
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'not found' })
  }
}