import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({buttonName, clickFunc}) => (
    <button onClick={clickFunc}>
      {buttonName}
    </button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

// a proper place to define a component
const Statistics = (props) => {
  const {good, neutral, bad} = props
  const sum = good+neutral+bad
  if (sum === 0){
    return (<p>No feedback given</p>)
  }
  return(
    <table>
      <tbody>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={sum} />
        <Statistic text="average" value ={(good-bad)/sum} />
        <Statistic text="positive" value ={good*100/sum+'%'} />
        </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button buttonName='good' clickFunc={()=>setGood(good+1)} />
      <Button buttonName='neutral' clickFunc={()=>setNeutral(neutral+1)} />
      <Button buttonName='bad' clickFunc={()=>setBad(bad+1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)