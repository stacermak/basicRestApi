import { prisma } from "../db.js";
import bcrypt from "bcryptjs";

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
