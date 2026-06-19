import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  createdAt: Date;
}

const WorkoutSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
