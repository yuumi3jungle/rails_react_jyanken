import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'

import 'photon/dist/css/photon.css'

class JyankeGamePage extends Component {
  constructor(props) {
    super(props)
    this.state = {scores: [], status: {}, tabIndex: 0}
  }
  componentDidMount() {
    this.getScores()
  }
  getScores() {
    fetch('http://localhost:3000/jyankens.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({scores: json})
      this.getStatus()
    })
    .catch((response) => console.log(response))
  }
  getStatus() {
    fetch('http://localhost:3000/jyankens/status.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({status: json})
    })
    .catch((response) => console.log(response))
  }
  fight(te) {
    const data = JSON.stringify({jyanken: {human: te}})
    fetch('http://localhost:3000/jyankens.json',
      {method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: data})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.getScores()
    })
    .catch((response) => console.log(response))
  }
  tabChange(ix) {
    this.setState({tabIndex: ix}, this.getResult)
  }
  render() {
    return (
      <div>
        <header className="toolbar toolbar-header">
          <JyankenBox action={this.fight.bind(this)} />
        </header>
        <ResultTab titles='対戦結果,対戦成績' index={this.state.tabIndex} actionTab={this.tabChange.bind(this)}>
          <ScoreList scores={this.state.scores} />
          <StatusBox status={this.state.status} />
        </ResultTab>
      </div>
    )
  }
}


class ResultTab extends Component {
  tabChange(ix, event) {
    event.preventDefault()
    this.props.actionTab(ix)
  }
  render() {
    const titles = this.props.titles.split(',')
    const isActive = (ix) => this.props.index == ix ? "active" : ""
    return (
      <div>
        <div className="tab-group">
          {titles.map((title, ix) => (
          <div onClick={this.tabChange.bind(this, ix)} className={`tab-item ${isActive(ix)}`}>
            {title}
          </div>
          ))}
        </div>
        {this.props.children[this.props.index]}
      </div>
    )
  }
}
ResultTab.propTypes = {
  children: PropTypes.array,
  titles: PropTypes.string,
  index: PropTypes.number,
  actionTab: PropTypes.func
}

class JyankenBox extends Component {
  onTeButton(te, event) {
    event.preventDefault()
    this.props.action(te)
  }
  render() {
    const buttonClass = "btn btn-default"
    return (
      <div className="toolbar-actions">
        <button onClick={this.onTeButton.bind(this, 0)} className={buttonClass}>グー</button>
        <button onClick={this.onTeButton.bind(this, 1)} className={buttonClass}>チョキ</button>
        <button onClick={this.onTeButton.bind(this, 2)} className={buttonClass}>パー</button>
      </div>
    )
  }
}
JyankenBox.propTypes = {
  action: PropTypes.func
}

class ScoreList extends Component {
  render() {
    return (
      <table className="table-striped">
        <thead>
          <tr>
            <th>時間</th><th>人間</th><th>コンピュータ</th><th>結果</th>
          </tr>
        </thead>
        <tbody>
          {this.props.scores.map((score) => <ScoreListItem  key={score.id} score={score} />)}
        </tbody>
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
    // const rowColor = (judgment) => [null,"jyanken-win", "jyanken-lose"][judgment]
    const extractHHMM = (t) => t.substr(14, 5)
    return (
      <tr>
        <td>{extractHHMM(this.props.score.created_at)}</td>
        <td>{teString(this.props.score.human)}</td>
        <td>{teString(this.props.score.computer)}</td>
        <td>{judgmentString(this.props.score.judgment)}</td>
      </tr>
    )
  }
}
ScoreListItem.propTypes = {
  score: PropTypes.object
}

const StatusBox = (props) => (
  <table className="table-striped">
    <tbody>
      <tr>
        <th>勝ち</th><th>{props.status['win']}</th>
      </tr>
      <tr>
        <th>負け</th><th>{props.status['lose']}</th>
      </tr>
      <tr>
        <th>引き分け</th><th>{props.status['draw']}</th>
      </tr>
    </tbody>
  </table>)

StatusBox.propTypes = {
  status: PropTypes.object
}


ReactDOM.render(
  <JyankeGamePage />,
  document.getElementById('example')
)
