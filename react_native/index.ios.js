/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  TabBarIOS,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons'

class ReactNative extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreDataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      statusDataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      tabIndex: 0
    }
  }
  componentDidMount() {
    this.getScores();
  }
  getScores() {
    fetch('http://localhost:3000/jyankens.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({scoreDataSource: this.state.scoreDataSource.cloneWithRows(responseData)})
        this.getStatus()
        })
      .done()
  }
  getStatus() {
    const statusRows = (responseData) => ([
      {title: '勝ち', value: responseData['win'], style: "judge_0"},
      {title: '負け', value: responseData['lose'], style: "judge_1"},
      {title: '引き分け', value: responseData['draw'], style: "judge_2"}])

    fetch('http://localhost:3000/jyankens/status.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({statusDataSource: this.state.statusDataSource.cloneWithRows(statusRows(responseData))})
        })
      .done()
  }
  fight(te) {
    const data = JSON.stringify({jyanken: {human: te}})
    fetch('http://localhost:3000/jyankens.json',
      {method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: data})
    .then((response) => response.json())
    .then((json) => {
      this.getScores()
    })
    .done()
  }
  tabChange(ix) {
    this.setState({tabIndex: ix})
  }
  render() {
    return (
      <ResultTab titles='対戦結果,対戦成績' icons='ios-list,ios-speedometer' index={this.state.tabIndex} actionTab={this.tabChange.bind(this)}>
        <View style={styles.container}>
          <Header />
          <JyankenBox action={this.fight.bind(this)} />
          <ListView dataSource={this.state.scoreDataSource} style={styles.listView}
            renderRow={this.renderScoreRow} renderHeader={this.renderScoreHeader} />
        </View>
        <View style={styles.container}>
          <Header />
          <JyankenBox action={this.fight.bind(this)} />
          <ListView dataSource={this.state.statusDataSource} style={styles.listView}
            renderRow={this.renderStatusRow} renderHeader={this.renderStatusHeader}/>
        </View>
      </ResultTab>
    )
  }
  renderScoreHeader() {
    return (
      <View style={styles.listScoreHeader}>
        <Text style={styles.te}>あなた</Text>
        <Text style={styles.te}>コンピュタ</Text>
        <Text style={styles.judge}>勝敗</Text>
      </View>
    )
  }

  renderScoreRow(score) {
    const teString = (te) => ["グー","チョキ", "パー"][te]
    const judgmentString = (judge) => ["引き分け","勝ち", "負け"][judge]
    return (
      <View style={styles.listContainer}>
        <Text style={styles.te}>{teString(score.human)}</Text>
        <Text style={styles.te}>{teString(score.computer)}</Text>
        <Text style={[styles.judge, styles[`judge_${score.judgment}`]]}>
          {judgmentString(score.judgment)}
        </Text>
      </View>
    )
  }

  renderStatusHeader() {
    return (
      <View style={styles.listStatusHeader}></View>
    )
  }

  renderStatusRow(status) {
    return (
      <View style={styles.listContainer}>
        <Text style={[styles.te, styles[status.style]]}>{status.title}</Text>
        <Text style={styles.judge}>{status.value}</Text>
      </View>
    )
  }
}

const ResultTab = (props) => {
  const titles = props.titles.split(',')
  const icons  = props.icons.split(',')
  const isActive = (ix) => props.index == ix
  return (
    <TabBarIOS>
    {props.children.map((child, ix) => (
      <Icon.TabBarItem
        key={ix} title={titles[ix]} selected={isActive(ix)}
        iconName={`${icons[ix]}-outline`} selectedIconName={icons[ix]}
        onPress={props.actionTab.bind(this, ix)}>
      {child}
     </Icon.TabBarItem>
     ))}
    </TabBarIOS>
  )
}

const Header = (props) => (
  <Text style={styles.header}>
    じゃんけん ポン！
  </Text>
)

const JyankenBox = (props) => (
  <View style={styles.buttons}>
    <JyankenButton title="グー"  onClick={props.action.bind(this, 0)}/>
    <JyankenButton title="チョキ" onClick={props.action.bind(this, 1)}/>
    <JyankenButton title="パー"  onClick={props.action.bind(this, 2)}/>
  </View>
)

const JyankenButton = (props) => (
  <Button
    containerStyle={styles.buttonContainer}
    style={styles.button}
    onPress={props.onClick}>
    {props.title}
  </Button>
)


const styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 16,
    paddingTop: 16
  },
  listView: {
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 81,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  listScoreHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 41,
    backgroundColor: '#f7f7f7'
  },
  listStatusHeader: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 2,
  },
  te: {
    flex: 1,
    textAlign: 'center',
    padding: 10
  },
  judge: {
    flex: 2,
    fontSize: 18,
    textAlign: 'center',
  },
  judge_0: {color: "#333"},
  judge_1: {color: "#2979FF"},
  judge_2: {color: "#FF1744"},

  buttons: {
    flexDirection: 'row',
    padding: 10
  },
  buttonContainer: {
    padding: 5,
    margin: 10,
    height: 30,
    width: 100
  },
  button: {
  }
});

AppRegistry.registerComponent('ReactNative', () => ReactNative);
