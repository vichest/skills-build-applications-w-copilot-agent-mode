import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/teams`)
      .then(res => res.json())
      .then(data => { setTeams(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) return <div className="text-center"><div className="spinner-border" /></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      <div className="row">
        {teams.map(team => (
          <div key={team._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text text-muted">
                  {team.members?.length || 0} member(s)
                </p>
                <ul className="list-unstyled">
                  {team.members?.map(member => (
                    <li key={member._id}>
                      <span className="badge bg-secondary me-1">👤</span>
                      {member.username}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
