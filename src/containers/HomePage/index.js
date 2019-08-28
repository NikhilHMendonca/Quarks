import React, { Component, Fragment } from 'react';
import moment from 'moment';

class Home extends Component {
  state = {
    time: moment().format('h:mm:ss a'), // setting default current time
    showDate: true,
  }

  componentDidMount() {
    // set timer
    this.showTimer = setInterval(() => this.timer(), 1000);
  }

  componentWillUnmount() {
    //  remove timer
    clearInterval(this.showTimer);
  }

  timer = () => {
    this.setState({ time: moment().format('h:mm:ss a') });
  }

  handleShowDate = () => {
    this.setState(({ showDate }) => ({ showDate: !showDate }));
  }

  render () {
    const { time, showDate } = this.state;
    const date = moment().format('DD-MM-YYYY');
    return (
      <div className="clock-wrapper">
        <div className="time">{time}</div>
        <div>
          {showDate && <div className="date">{date}</div>}
          <button onClick={this.handleShowDate}>{showDate ? 'Hide Date' : 'Show Date'}</button>
        </div>
      </div>
    )
  }
}

export default Home;
