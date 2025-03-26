import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    matchesList: {recentMatches: []},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()

      const updatedData = {
        teamBannerUrl: data?.team_banner_url || '',
        latestMatchDetails: {
          umpires: data?.latest_match_details?.umpires || '',
          result: data?.latest_match_details?.result || '',
          manOfTheMatch: data?.latest_match_details?.man_of_the_match || '',
          date: data?.latest_match_details?.date || '',
          venue: data?.latest_match_details?.venue || '',
          competingTeam: data?.latest_match_details?.competing_team || '',
          competingTeamLogo:
            data?.latest_match_details?.competing_team_logo || '',
          firstInnings: data?.latest_match_details?.first_innings || '',
          secondInnings: data?.latest_match_details?.second_innings || '',
          matchStatus: data?.latest_match_details?.match_status || '',
        },
        recentMatches:
          data?.recent_matches?.map(matchItem => ({
            umpires: matchItem?.umpires || '',
            result: matchItem?.result || '',
            manOfTheMatch: matchItem?.man_of_the_match || '',
            id: matchItem?.id || '',
            date: matchItem?.date || '',
            venue: matchItem?.venue || '',
            competingTeamLogo: matchItem?.competing_team_logo || '',
            competingTeam: matchItem?.competing_team || '',
            firstInnings: matchItem?.first_innings || '',
            secondInnings: matchItem?.second_innings || '',
            matchStatus: matchItem?.match_status || '',
          })) || [],
      }

      this.setState({matchesList: updatedData, isLoading: false})
    } catch (error) {
      console.error('Error fetching team match details:', error)
      this.setState({isLoading: false})
    }
  }

  goBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {isLoading, matchesList} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches = []} = matchesList

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      )
    }

    // Match statistics
    const wonMatches = recentMatches.filter(
      matchItem => matchItem.matchStatus === 'Won',
    ).length
    const lostMatches = recentMatches.filter(
      matchItem => matchItem.matchStatus === 'Lost',
    ).length
    const drawnMatches = recentMatches.filter(
      matchItem => matchItem.matchStatus === 'Drawn',
    ).length

    // Pie Chart Data
    const chartData = [
      {name: 'Won', value: wonMatches, color: '#4CAF50'},
      {name: 'Lost', value: lostMatches, color: '#F44336'},
      {name: 'Drawn', value: drawnMatches, color: '#FFC107'},
    ]

    return (
      <div className="team-matches-container">
        {/* Back Button */}
        <button
          type="button"
          onClick={this.goBack}
          className="back-button"
          data-testid="backButton"
        >
          Back
        </button>

        {/* Team Banner */}
        <div className="team-banner">
          <img src={teamBannerUrl} alt="team banner" />
        </div>

        {/* Latest Match Details */}
        <LatestMatch latestMatchDetails={latestMatchDetails} />

        {/* Recent Matches */}
        <ul className="match-card-container">
          {recentMatches.map(matchItem => (
            <MatchCard matchCardDetails={matchItem} key={matchItem.id} />
          ))}
        </ul>

        {/* Pie Chart */}
        <div className="pie-chart-container" data-testid="pieChart">
          <h2>Match Statistics</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    )
  }
}

export default withRouter(TeamMatches)
