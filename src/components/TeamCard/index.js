// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamsDetails} = props
  const {id, name, teamImageUrl} = teamsDetails

  return (
    <Link to={`/team-matches/${id}`}>
      <li className="match-card-container">
        <img src={teamImageUrl} alt={`${name}`} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
