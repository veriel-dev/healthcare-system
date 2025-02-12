import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';
import { ApiError } from '../../middleware/error.middleware';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(new ApiError(500, 'Error retrieving users', error as Error | ApiError));
  }
};
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    next(new ApiError(400, 'Error creating user', error as Error | ApiError));
  }
};
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      throw new ApiError(404, 'User not found');
    }

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new ApiError(404, 'User not found');
    }
    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
