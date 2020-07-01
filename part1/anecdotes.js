import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomInt = () => Math.floor(Math.random()*6)
const Button = ({buttonName, clickFunc}) => (
  <button onClick={clickFunc}>
    {buttonName}
  </button>
)
const Display = ({text}) => (
  <p>{text}</p>
)

const Votes = ({voteNum}) => {
  if (voteNum < 2){
    return (<p>{'has '+voteNum+' vote'}</p>)
  }else{
    return (<p>{'has '+voteNum+' votes'}</p>)
  }
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  const [maxIndex, setMaxIndex] = useState(0)
  
  const addVote = () => {
    let copy = [...votes]
    copy[selected]+=1
    if (copy[selected] > maxCount){
      maxCount = copy[selected]
      setMaxIndex(selected)
    }
    setVotes(copy)
  }



  return (
    <div>
      <Display text={anecdotes[selected]} />
      <Votes voteNum={votes[selected]} />
      <Button buttonName='vote' clickFunc={()=>addVote()} />
      <Button buttonName='next anecdotes' clickFunc={()=>setSelected(randomInt())} />
      <Display text={anecdotes[maxIndex]} />
      <Votes voteNum={votes[maxIndex]} />
    </div>
  )
}
let maxCount = 0
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)