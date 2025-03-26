// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = matchCardDetails

  return (
    <li>
      <div className="match-card">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="competing-team-logo"
        />
        <p className="competing-team">{competingTeam}</p>
        <p>{result}</p>
        <p className="match-result">{matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard
