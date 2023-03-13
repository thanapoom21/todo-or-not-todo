import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// We're currently using `mongoose`: "^6.9.2".
// [MONGOOSE] DeprecationWarning: 
// Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. 
// Use `mongoose.set('strictQuery', false);` if you want to prepare for this change.
// Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', false)

export default dbConnect;
