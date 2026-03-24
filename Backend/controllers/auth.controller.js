import genToken from "../config/token.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";


export const signup = async (req,res)=>{
    try{
        let {name,email,password} = req.body;
        let existUser = await prisma.user.findUnique({
            where:{
                email
            }        });

        if(existUser){
            return res.status(400).json({
                message:"User already exists with this email"
            })
        }
        let hashedPassword = await bcrypt.hash(password,10);
        let user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
               
            },
          
        });
        let token = await genToken(user.id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:7*24*60*60*1000

        })
        return res.status(201).json(user)  

    }catch(error){
        res.status(500).json({
            message:`Signup failed ${error}`
        })
    }

}

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await prisma.user.findUnique({
      where: { email },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            image1: true,
            image2: true,
            image3: true,
            description: true,
            rent: true,
            category: true,
            city: true,
            landmark: true
          }
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist with this email"
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    let token = await genToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      listing: user.listing   // ✅ listings also sent
    });

  } catch (error) {
    res.status(500).json({
      message: `Login failed ${error}`
    });
  }
};

export const logout = async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            message:"Logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `Logout failed ${error}`
        });

    }
}