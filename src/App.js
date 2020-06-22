import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stage: 0,
      currentText: "",
      moneyPerWeek: 0,
      hoursPerWeek: 0,
      deliveriesPerHour: 0,
      continuePlanningPressed: false
    }
    this.handleAdvance = this.handleAdvance.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e) {
    this.setState({currentText: e.target.value})
  }

  handleAdvance(e) {
    e.preventDefault() // Keeps the page from refreshing

    switch (this.state.stage) {
      case 0:
      this.setState({moneyPerWeek: Number(this.state.currentText)})
      break
      case 1:
      this.setState({hoursPerWeek: Number(this.state.currentText)})
      break;
      case 2:
      this.setState({deliveriesPerHour: Number(this.state.currentText)})
      break;
    }

    this.setState({currentText: "", stage: this.state.stage + 1})
  }

  render() {
    if (this.state.stage < 3) {
      return(<WelcomeQuestions
        stage={this.state.stage}
        text={this.state.currentText}
        onChange={this.handleChange}
        onAdvance={this.handleAdvance}/>)
    } else {
      let minimumAmount = this.state.moneyPerWeek / this.state.hoursPerWeek / this.state.deliveriesPerHour
      return(<MinimumOrder
        minimumAmount={minimumAmount}/>)
    }

  }

}


// Handles display of question prompts
class WelcomeQuestions extends React.Component {

  render() {

    let labelText

    switch(this.props.stage) {
      case 0:
      labelText = "How much money do you want to make this week?"
      break
      case 1:
      labelText = "How many hours do you want to work this week?"
      break
      case 2:
      labelText = "How many deliveries on average can you complete per hour?"
      break
      default:
      labelText = "An error occured" + this.props.stage
    }

    return(
      <div className="welcome-questions">
        <form onSubmit={this.props.onAdvance}>
          <label>{labelText}</label><br />
          <input onChange={this.props.onChange} value={this.props.text}/>
        </form>
      </div>
    )

  }

}

class MinimumOrder extends React.Component {
  render() {
    return (
      <div className="minimum-order">
        <h1>You need to make</h1>
        <h2>${this.props.minimumAmount.toFixed(2)}</h2>
        <h1>per order to reach your goal.</h1>
      </div>
    )
  }
}

export default App;
