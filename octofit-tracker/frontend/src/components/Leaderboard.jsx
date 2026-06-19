import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard`)
      .then(res => res.json())
      .then(data => { setEntries(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) return <div className="text-center"><div className="spinner-border" /></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id}>
                <td>{medals[index] || entry.rank}</td>
                <td>{entry.user?.username || 'Unknown'}</td>
                <td><strong>{entry.score}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
