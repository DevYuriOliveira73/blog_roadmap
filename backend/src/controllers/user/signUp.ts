import {User, UserType} from '../../models/user.model.js'
import {Request, Response} from 'express'
import { z, ZodError } from 'zod'
import {hash} from 'bcryptjs';


const schema = z.object({
  name: z.string().min(4),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8)
})


export const signUpUser = async (req: Request, res: Response) => {
  try {
    const SALT_ROUNDS = 10
    const {email, name, password} = schema.parse(req.body as UserType)

    const existingEmail = await User.findOne({email: email})

    if (existingEmail) {
      return res.status(400).json({message: "Email already exists"})
    }

    const hashedPassword = await hash(password, SALT_ROUNDS)

    console.log({email, name, password : hashedPassword})

    const user = await User.create({email, name, password : hashedPassword})

    return res.status(201).json({name : user.name})


  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues })
    }

    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}