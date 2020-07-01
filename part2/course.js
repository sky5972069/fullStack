import React, { useState , useEffect } from 'react'
import './index.css'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Filter = ({filt, changeFunc}) => {
  return (
    <div>name: <input value={filt} onChange={changeFunc}/></div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addName}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
    <div>number: <input value={props.newNum} onChange={props.handleNumChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons,delFunc}) => {
  return(
    <table>
      <tbody>
        {persons.map(person=>(<tr key={person.name}>
          <td>
            {person.name} {person.number}
            <button onClick={()=>delFunc(person.id)}>delete</button>
          </td></tr>))}
      </tbody>
    </table>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}, {name: 'Ada Lovelace', number:'39-44-5323523'}
  ]) 
  const [ newName, setNewName ] = useState('Martin Fowler')
  const [ newNum, setNum ] = useState('11111111111')
  const [ filt, setFilt ] =useState('Arto Hellas')
  const [ success, setSuccess ] = useState(null)
  const [ error, setError ] = useState(null)
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
    })
  },[])
  const successMessage = (sucStr) => {
    setSuccess(sucStr)
    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }

  const addName = (e) => {
    e.preventDefault()
    let index=-1
    for (let i=0; i<persons.length; i++){
      if (persons[i].name === newName){
        index = i
        break
      }
    }
    console.log(index)
    if (index !== -1) {
      let confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmed){
        let newId = persons[index].id
        let newPerson = { name: newName, number:newNum}
        personService.update(newId, newPerson)
        .then((response)=>setPersons(persons.map(person=>person.id===newId ? response : person)))
        .then(()=>successMessage(`Updated ${newName}`))
        .catch(error => {
          setError(
            `Information of '${newName}' was already removed from server`
          )
          setTimeout(() => {
            setError(null)
          }, 3000)
          setPersons(persons.filter(n => n.id !== newId))
        })
      }
    } else {
      personService.create({ name: newName, number:newNum})
      .then((response)=>setPersons(persons.concat(response)))
      .then(()=>successMessage(`Added ${newName}`))
      .catch(error =>{
        setError(error.response.data)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
    }
    
  }

  const delFunc = (id) => {
    let newPersons = [...persons]
    let index = 0
    for (let i = 0; i < newPersons.length; i++) { 
        if (newPersons[i].id === id){
          index = i
          break
        }
    }
    newPersons.splice(index,1)
    console.log(newPersons)
    personService.del(id)
      .then(()=>setPersons(newPersons))
      .catch(error => {
        setError(
          `Information of '${newName}' was already removed from server`
        )
        setTimeout(() => {
          setError(null)
        }, 3000)
        setPersons(persons.filter(n => n.id !== id))
      })
  }


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNum(e.target.value)
  }
  const handleFilterChange = (e) => {
    setFilt(e.target.value)
  }
  const nameToShow = persons.filter(person=>person.name.toUpperCase().indexOf(filt.toUpperCase())!==-1)
  console.log(nameToShow)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} />
      <ErrorNotification message={error} />
      <Filter filt={filt} changeFunc={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNum={newNum} 
      handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={nameToShow} delFunc={delFunc} />
    </div>
  )
}

export default App