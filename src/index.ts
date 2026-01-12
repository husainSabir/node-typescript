// Load environment variables FIRST, before any other imports
import './config/env';

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import { config } from './config/env';
import authRoutes from './routes/auth';
import { authenticate, AuthRequest } from './middleware/auth';
import { User } from './models/User';

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Auth routes (register, login)
app.use('/api/auth', authRoutes);
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to TypeScript Backend API',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (_req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Protected routes (require authentication)
// Get current user profile
app.get('/api/users/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
      data: {
        id: user!._id,
        name: user!.name,
        email: user!.email,
        createdAt: user!.createdAt,
        updatedAt: user!.updatedAt
      }
    });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: config.nodeEnv === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all users
app.get('/api/users', authenticate, async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: users.length,
      data: users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }))
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: config.nodeEnv === 'development' ? error.message : 'Internal server error'
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

