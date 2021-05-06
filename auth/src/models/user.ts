import mongoose from 'mongoose'

// Describes required props for new User
interface UserAttrs {
  email: string
  password: string
}

// Describes props that a User model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<any, UserModel>('User', userSchema)

export { User }