import { Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../models/User';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;

    // Validate input
    if (!email || !name) {
      res.status(400).json({ message: 'Email and name are required' });
      return;
    }
    console.log('Creating user with email:', email);
     // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already registered');

    console.log('Creating new user:', { email, name });

    // Create new user document
    const newUser: IUser = new User({ 
      email, 
      name 
    });

    // Save to database
    const savedUser = await newUser.save();

    // Return response without MongoDB internals
    res.status(201).json({
      user_id: savedUser.user_id,
      email: savedUser.email,
      name: savedUser.name
    });
    
  } catch (error: any) {
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
      return;
    }

    // Generic error handling
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};