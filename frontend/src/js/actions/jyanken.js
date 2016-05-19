import fetch from 'isomorphic-fetch'

export const RECEIVE_SCORES  = 'RECEIVE_SCORES'
export const RECEIVE_STATUS  = 'RECEIVE_STATUS'
export const REQUEST_JYANKEN = 'REQUEST_JYANKEN'
export const SELECT_TAB      = 'SELECT_TAB'

export const receiveScores = (scores) => ({
  type: RECEIVE_SCORES, scores
})
export const receiveStatus = (status) => ({
  type: RECEIVE_STATUS, status
})
export const requestJyanken = (te) => ({
  type: REQUEST_JYANKEN, te
})
export const selectTab = (tabIndex) => ({
  type: SELECT_TAB, tabIndex
})

export const fetchScores = () => (
  (dispatch) => fetch('/jyankens.json')
    .then((response) => response.json())
    .then((json) => dispatch(receiveScores(json)))
    .catch((response) => console.log(response))
)

export const fetchStatus = () => (
  (dispatch) => fetch('/jyankens/status.json')
    .then((response) => response.json())
    .then((json) => dispatch(receiveStatus(json)))
    .catch((response) => console.log(response))
)

export const postJyanken = (te) => (
  (dispatch) => {
    dispatch(requestJyanken(te))
    const data = JSON.stringify({jyanken: {human: te}})
    return fetch('/jyankens.json',
      {method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: data})
    .then((response) => response.json())
    .then(() => {
      dispatch(fetchScores())
      dispatch(fetchStatus())
    })
    .catch((response) => console.log(response))
  }
)