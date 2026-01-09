# TypeScript Backend Template

A modern Node.js backend template built with TypeScript and Express.

## Features

- ✅ TypeScript for type safety
- ✅ Express.js for building REST APIs
- ✅ MongoDB integration with Mongoose
- ✅ Environment variables support with dotenv
- ✅ Hot reload with nodemon
- ✅ Strict TypeScript configuration
- ✅ Clean project structure

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Example for local MongoDB: `mongodb://localhost:27017/your-database-name`
   - Example for MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

### Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Building

Build the project for production:
```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist/` directory.

### Production

Run the production build:
```bash
npm start
```

## Project Structure

```
.
├── src/
│   ├── index.ts          # Main entry point
│   ├── config/           # Configuration files
│   │   └── database.ts   # MongoDB connection
│   ├── models/           # Mongoose models
│   │   └── index.ts
│   └── types/            # TypeScript type definitions
│       └── index.ts
├── dist/                 # Compiled JavaScript (generated)
├── .env.example          # Example environment variables
├── .gitignore
├── nodemon.json          # Nodemon configuration
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Run production build
- `npm run watch` - Watch for changes and rebuild
- `npm run clean` - Remove dist directory

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint (includes database status)

## MongoDB Setup

### Local MongoDB

1. Install MongoDB locally or use Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

2. Set `MONGODB_URI` in your `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Set `MONGODB_URI` in your `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

### Creating Models

Create Mongoose models in `src/models/`. Example:

```typescript
// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
```

## Adding New Features

1. Create new route files in `src/routes/`
2. Add middleware in `src/middleware/`
3. Add services in `src/services/`
4. Add types in `src/types/`

## License

MIT

"# node-typescript" 
