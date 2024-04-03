import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
    });
  } catch (error) {
    console.log(error)
    if (error.code === "P2002") {
      res.status(500).json({ message: "Username already registered!" });
    } else {
      return res
        .status(500)
        .json({
          message: "Failed to register. Try again later!"
        });
    }
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
    const {name, password} = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          name: name,
        }
      })
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        {userId: user.id, name: user.name},
        JWT_SECRET,
        {expiresIn: '24h'}
      )
  
      return res.json({token})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Something went wrong!'})
    }
  
  }