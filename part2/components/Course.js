import React from 'react'

const Header = ({head}) => (
  <>
    <h2>{head}</h2>
  </>
)

const Part = (props) => (
  <>
    <p>
      {props.part} {props.n}
    </p>
  </>
)

const Content = ({course}) => (
  <div>
    {course.parts.map(part => (<Part key={part.id} part={part.name} n={part.exercises}/>))}
    <Total course={course}/>
  </div>
)

const Total = ({course}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
  return (
      <h3>
        total of {course.parts.reduce(reducer,0)} exercises
      </h3>
  )
  
}

const Course = ({course}) => {
  return(
    <div>
      <Header head={course.name} />
      <Content course={course} />
    </div>
  )
}
export default Course