import mongoose from 'mongoose';

export const gotMongoConnection = () =>
    mongoose.connect(process.env.MONGODB_URI);
