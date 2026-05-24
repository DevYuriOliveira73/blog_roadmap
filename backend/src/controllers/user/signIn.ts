import {User, UserType} from '../../models/user.model.js'
import {Request, Response} from 'express'
import { z, ZodError } from 'zod'
import {compare} from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'
import { env } from '../../config/env.js'


const schema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8)
})


export const signInUser = async (req: Request, res: Response) => {
  try {
    
    const {email, password} = schema.parse(req.body as UserType)

    const user = await User.findOne({email: email})

    if (!user) {
      return res.status(404).json({ message: 'Email or password is invalid' })
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is invalid' })
    }

    const accessToken = jsonwebtoken.sign(
      {
        sub: user._id
      },
      env.jwt_secret as string,
      {
        expiresIn: '2d'
      }
    )

    res.status(200).json({accessToken})

    
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues })
    }

    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}