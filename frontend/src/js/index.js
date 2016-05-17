import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'

class JyankeGamePage extends Component {
  constructor(props) {
    super(props)
    this.state = {scores: []}
  }
  componentDidMount() {
    this.getScores()
  }
  getScores() {
    fetch('/jyankens.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({scores: json})
    })
    .catch((response) => console.log(response))
  }
  render() {
    return (
      <div>
        <Header title="じゃんけん ポン！" />
        <ScoreList scores={this.state.scores} />
      </div>
    )
  }
}

const Header = (props) => (<h1>{props.title}</h1>)
Header.propTypes = {
  title: PropTypes.string
}

class ScoreList extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>時間</td><td>人間</td><td>コンピュータ</td><td>結果</td>
          </tr>
        </thead>
        {this.props.scores.map((score) => <ScoreListItem  key={score.id} score={score} />)}
       </table>
    )
  }
}
ScoreList.propTypes = {
  scores: PropTypes.array
}

class ScoreListItem extends Component {
  render() {
    const teString = (te) => ["グー","チョキ", "パー"][te]
    const judgmentString = (judgment) => ["引き分け","勝ち", "負け"][judgment]
    const extractHHMM = (t) => t.substr(14, 5)
    return (
      <tbody>
        <tr>
          <td>{extractHHMM(this.props.score.created_at)}</td>
          <td>{teString(this.props.score.human)}</td>
          <td>{teString(this.props.score.computer)}</td>
          <td>{judgmentString(this.props.score.judgment)}</td>
        </tr>
      </tbody>
    )
  }
}
ScoreListItem.propTypes = {
  score: PropTypes.object
}

ReactDOM.render(
  <JyankeGamePage />,
  document.getElementById('example')
)
