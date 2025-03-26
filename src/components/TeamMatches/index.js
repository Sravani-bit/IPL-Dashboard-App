// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {matchesList: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(matches => ({
        umpires: matches.umpires,
        result: matches.result,
        manOfTheMatch: matches.man_of_the_match,
        id: matches.id,
        date: matches.date,
        venue: matches.venue,
        competingTeamLogo: matches.competing_team_logo,
        competingTeam: matches.competing_team,
        firstInnings: matches.first_innings,
        secondInnings: matches.second_innings,
        matchStatus: matches.match_status,
      })),
    }

    this.setState({matchesList: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, matchesList} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchesList

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div className="team-banner">
              <img src={teamBannerUrl} alt="team banner" />
            </div>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="match-card-container">
              {recentMatches.map(eachItem => (
                <MatchCard matchCardDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
