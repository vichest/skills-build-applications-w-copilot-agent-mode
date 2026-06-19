// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to octofit_db');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);
  console.log('Cleared existing data');

  // Seed users
  const users = await User.insertMany([
    { username: 'john_doe', email: 'john@mergington.edu', password: 'hashed_pass1' },
    { username: 'jane_smith', email: 'jane@mergington.edu', password: 'hashed_pass2' },
    { username: 'paul_octo', email: 'paul@mergington.edu', password: 'hashed_pass3' },
    { username: 'alice_run', email: 'alice@mergington.edu', password: 'hashed_pass4' },
    { username: 'bob_lift', email: 'bob@mergington.edu', password: 'hashed_pass5' }
  ]);
  console.log(`Seeded ${users.length} users`);

  // Seed teams
  const teams = await Team.insertMany([
    { name: 'Team Alpha', members: [users[0]._id, users[1]._id] },
    { name: 'Team Beta', members: [users[2]._id, users[3]._id] },
    { name: 'Team Gamma', members: [users[4]._id] }
  ]);
  console.log(`Seeded ${teams.length} teams`);

  // Seed activities
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: 'running', duration: 30 },
    { user: users[1]._id, type: 'walking', duration: 45 },
    { user: users[2]._id, type: 'strength training', duration: 60 },
    { user: users[3]._id, type: 'running', duration: 20 },
    { user: users[4]._id, type: 'cycling', duration: 50 }
  ]);
  console.log(`Seeded ${activities.length} activities`);

  // Seed workouts
  const workouts = await Workout.insertMany([
    { name: 'Morning Run', description: 'A light 30-minute jog to start the day', duration: 30, difficulty: 'easy' },
    { name: 'HIIT Blast', description: 'High intensity interval training for 20 minutes', duration: 20, difficulty: 'hard' },
    { name: 'Strength Circuit', description: 'Full-body strength training circuit', duration: 45, difficulty: 'medium' },
    { name: 'Yoga Flow', description: 'Relaxing yoga session for flexibility', duration: 60, difficulty: 'easy' },
    { name: 'Cycling Endurance', description: 'Long distance cycling for endurance', duration: 90, difficulty: 'medium' }
  ]);
  console.log(`Seeded ${workouts.length} workouts`);

  // Seed leaderboard
  const leaderboard = await Leaderboard.insertMany([
    { user: users[0]._id, score: 520, rank: 1 },
    { user: users[3]._id, score: 480, rank: 2 },
    { user: users[2]._id, score: 430, rank: 3 },
    { user: users[1]._id, score: 390, rank: 4 },
    { user: users[4]._id, score: 310, rank: 5 }
  ]);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);

  await mongoose.disconnect();
  console.log('Seed complete. Disconnected from octofit_db');
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
