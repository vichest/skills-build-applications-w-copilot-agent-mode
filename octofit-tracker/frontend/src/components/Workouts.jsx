import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const difficultyColor = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger'
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/workouts`)
      .then(res => res.json())
      .then(data => { setWorkouts(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) return <div className="text-center"><div className="spinner-border" /></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text text-muted">{workout.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">⏱ {workout.duration} min</span>
                  <span className={`badge bg-${difficultyColor[workout.difficulty] || 'secondary'} text-capitalize`}>
                    {workout.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
