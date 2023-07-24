import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import teacherModel from "../Model/authTeacher";

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await teacherModel.create({
      userName,
      password: hash,
      email,
    });
    return res.status(201).json({
      message: "teacher created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Haven't create teacher",
      data: error.message,
    });
  }
};

export const signInTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const sign = await teacherModel.findOne({ email });
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
        message: "teacher not signed in",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Haven't sign in teacher",
      data: error.message,
    });
  }
};

export const viewAllTeacher =async(req:Request, res:Response):Promise<Response>=>{
    try {
        const user =await teacherModel.find()
        return res.status(200).json({
            message:"can see all teachers", 
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Haven't seen all teachers",
            data: error.message,
          });
    }
}

export const viewOneTeacher = async(req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} =req.params
        const user =await teacherModel.findById(id)
        return res.status(200).json({
            message:"can see one teacher" ,
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Haven't seen one teacher",
            data: error.message,
          });
    }
}

export const updateOneTeacher = async(req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} =req.params
        const {email, userName}=req.body
        const user =await teacherModel.findByIdAndUpdate(id,{email, userName},{new:true});

        return res.status(201).json({
            message:"updated successfully" ,
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "cannot update teacher",
            data: error.message,
          });
    }
}


export const deleteOneTeacher  = async(req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} =req.params
        const user =await teacherModel.findByIdAndDelete(id)

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