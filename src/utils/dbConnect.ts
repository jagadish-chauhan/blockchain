import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb+srv://dev:dev@cluster0.ah9sfus.mongodb.net/moralis";

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    console.log('MondoDB Connected');
    return cached.conn
  }

  if (!cached?.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      console.log('MondoDB Initialize');
      mongoose.SchemaTypes.ObjectId.get(v => v.toString());
      // mongoose.SchemaTypes.ObjectId.set(v => v.toString());
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect