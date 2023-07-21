import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../Model/authModel";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await authModel.create({
      userName,
      password: hash,
      email,
    });
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Haven't create user",
      data: error.message,
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const sign = await authModel.findOne({ email });
    const hash = await bcrypt.compare(password, sign?.password!);
    if (sign) {
      if (hash) {
        return res.status(201).json({
          message: `welcome back ${sign.userName}`,
          data: sign._id,
        });
      } else {
        return res.status(404).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(404).json({
        message: "user not signed in",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Haven't sign in user",
      data: error.message,
    });
  }
};

export const viewALl =async(req:Request, res:Response):Promise<Response>=>{
    try {
        const user =await authModel.find()
        return res.status(200).json({
            message:"can see all users", 
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Haven't seen all user",
            data: error.message,
          });
    }
}

export const viewOne= async(req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} =req.params
        const user =await authModel.findById(id)
        return res.status(200).json({
            message:"can see one user" ,
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Haven't seen one user",
            data: error.message,
          });
    }
}

export const updateOne= async(req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} =req.params
        const {email, userName}=req.body
        const user =await authModel.findByIdAndUpdate(id,{email, userName},{new:true});

        return res.status(201).json({
            message:"updated successfully" ,
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "cannot update user",
            data: error.message,
          });
    }
}


export const deleteOne= async(req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} =req.params
        const user =await authModel.findByIdAndDelete(id)

        return res.status(200).json({
            message:"deleted user successfully" ,
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "cannot delete user",
            data: error.message,
          });
    }
}