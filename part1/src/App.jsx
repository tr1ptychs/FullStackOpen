const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    const line = props.line
    return (
        <div>
            <p>{line.part} {line.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    const parts = props.parts
    return (
        <div>
            <Part line={parts[0]} />
            <Part line={parts[1]} />
            <Part line={parts[2]} />
        </div>
    )
}

const Total = (props) => {
    const parts = props.parts
    return (
        <div>
            <p>Number of exercises {parts[0].exercises + 
                                    parts[1].exercises + 
                                    parts[2].exercises}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a componenet'
    const exercises3 = 14
    const parts = [
        {part: part1, exercises: exercises1},
        {part: part2, exercises: exercises2}, 
        {part: part3, exercises: exercises3} 
    ]

    return (
        <div>
            <Header course = {course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}



export default App
