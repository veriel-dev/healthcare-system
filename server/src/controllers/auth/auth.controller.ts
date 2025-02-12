import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user/user.model';
import { config } from '../../config/config';
import { ApiError } from '../../middleware/error.middleware';
import { isCustomUser, isGoogleUser } from '../../utils/type-guard-users';
import { comparePasswords, hashPassword } from '../../utils/hashPassword';
import { generateToken } from '../../utils/jwt';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new ApiError(400, 'Email already registered');

    const hashedPassword = await hashPassword(password);

    const user = new User({
      ...req.body,
      status: 'active',
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpirationInterval,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, 'Invalid credentials');

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }
    if (user.status !== 'active') {
      throw new ApiError(401, 'Account is not active');
    }
    await User.findOneAndUpdate(
      { _id: user._id },
      { lastLogin: new Date() },
      { new: true, timestamps: true },
    );
    const token = generateToken({
      id: user._id,
      role: user.role,
    });
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    /* Revisar este any Type Guards puede ser una buena idea*/
    if (!isGoogleUser(req.user!!)) {
      throw new ApiError(401, 'Invalid user object format.');
    }
    const googleUser = req.user;
    let user = await User.findOne({ email: googleUser.email });
    if (!user) throw new ApiError(401, 'Invalid credentials');
    if (user.status !== 'active') {
      throw new ApiError(401, 'Account is not active');
    }
    await User.findOneAndUpdate(
      { _id: user._id },
      { lastLogin: new Date() },
      { new: true, timestamps: true },
    );
    /* const token = jwt.sign(
      {
        googleId: googleUser.id,
        id: user._id,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpirationInterval }
    );*/
    const token = generateToken({
      googleId: googleUser.googleId,
      id: user._id,
      role: user.role,
    });
    const redirectUrl = `${config.baserUrlFrontedLocal}/auth-success.html?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'Internal Server Error');
  }
};
export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isCustomUser(req.user!!)) {
      throw new ApiError(401, 'Invalid user object format.');
    }
    const user = await User.findById(req.user?.id).select('-password');
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

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!isCustomUser(req.user!!)) {
      throw new ApiError(401, 'Invalid user object format.');
    }
    const user = await User.findById(req.user?.id);

    if (!user) throw new ApiError(404, 'User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new ApiError(401, 'Current password is incorrect');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
