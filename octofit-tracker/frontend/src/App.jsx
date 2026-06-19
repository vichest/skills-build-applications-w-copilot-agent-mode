import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit" height="30" className="me-2" />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="text-center py-5">
              <img src="/octofitapp-small.png" alt="OctoFit" className="mb-4" style={{ width: '120px' }} />
              <h1>Welcome to OctoFit Tracker</h1>
              <p className="lead text-muted">Track your fitness, compete with friends, and stay motivated!</p>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
