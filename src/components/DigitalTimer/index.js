import './index.css'
import {Component} from 'react'

const initialState = {
  initialTime: 25,
  digitalTime: 25,
  isStart: false,
  initialSecondsValue: 0,
  sixtySec: 59,
}

class DigitalTimer extends Component {
  state = initialState

  startTime = () => {
    const {isStart} = this.state
    this.setState(preValue => ({isStart: !preValue.isStart}))

    if (isStart === false) {
      this.setTimeId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.setTimeId)
    }
  }

  tick = () => {
    const {sixtySec, initialSecondsValue, digitalTime} = this.state
    this.setState({initialSecondsValue: sixtySec})
    this.setState(prevState => ({sixtySec: prevState.sixtySec - 1}))

    if (initialSecondsValue === 0) {
      this.setState(prevState => ({digitalTime: prevState.digitalTime - 1}))
    }
    if (initialSecondsValue === 1) {
      this.setState({sixtySec: 59})
    }
    if (initialSecondsValue === 0 && digitalTime === 0) {
      this.setState({initialSecondsValue: 0})
      this.setState({digitalTime: 0})
      clearInterval(this.setTimeId)
    }
  }

  toReset = () => {
    clearInterval(this.setTimeId)
    this.setState(initialState)
  }

  decrementTime = () => {
    const {isStart} = this.state
    if (isStart === false) {
      this.setState(prevState => ({initialTime: prevState.initialTime - 1}))
      this.setState(lastValue => ({digitalTime: lastValue.digitalTime - 1}))
    }
  }

  incrementTime = () => {
    const {isStart} = this.state
    if (isStart === false) {
      this.setState(prevState => ({initialTime: prevState.initialTime + 1}))
      this.setState(lastValue => ({digitalTime: lastValue.digitalTime + 1}))
    }
  }

  playTime = () => {
    const {isStart} = this.state

    const startPauseBtnText = isStart ? 'Pause' : 'Start'

    const startOrPauseUrl = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isStart ? 'pause icon' : 'play icon'

    return (
      <div className="play-reset-card">
        <div className="play-card">
          <button
            type="button"
            className="start-button-style"
            onClick={this.startTime}
          >
            <img
              src={startOrPauseUrl}
              alt={startOrPauseAltText}
              className="playButtonStyle"
            />
          </button>
          <p className="start-style">{startPauseBtnText}</p>
        </div>
        <div className="play-card">
          <button
            type="button"
            className="start-button-style"
            onClick={this.toReset}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="playButtonStyle"
            />
          </button>
          <p className="start-style">Reset</p>
        </div>
      </div>
    )
  }

  digitalTimerDisplay = () => {
    const {digitalTime, initialSecondsValue, isStart} = this.state
    const minutesTime = digitalTime > 9 ? digitalTime : `0${digitalTime}`
    const secTime =
      initialSecondsValue > 9 ? initialSecondsValue : `0${initialSecondsValue}`

    const paraText = isStart ? 'Running' : 'Paused'
    return (
      <div className="timerDisplayCard">
        <div className="timer-elapse-pic">
          <h1 className="time-heading">
            {minutesTime}:{secTime}
          </h1>
          <p className="para-heading">{paraText}</p>
        </div>
      </div>
    )
  }

  render() {
    const {initialTime} = this.state

    return (
      <div className="main-card">
        <h1 className="heading-style">Digital Timer</h1>
        {this.digitalTimerDisplay()}
        {this.playTime()}

        <p className="set-time-card">Set Timer Limit</p>
        <div className="time-limit-card">
          <button
            type="button"
            className="minus-style"
            onClick={this.decrementTime}
          >
            -
          </button>
          <p className="speed-number-style">{initialTime}</p>
          <button
            type="button"
            className="minus-style"
            onClick={this.incrementTime}
          >
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
