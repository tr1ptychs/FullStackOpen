import { useState } from 'react'

const StatisticsLine = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.stat}{props.suffix}</td>
        </tr>
    )
}

const Statistics = (props) => {
    let all = props.good + props.neutral + props.bad
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticsLine name='Good' stat={props.good} />
                    <StatisticsLine name='Neutral' stat={props.neutral} />
                    <StatisticsLine name='Bad' stat={props.bad} />
                    <StatisticsLine name='All' stat={all} />
                    <StatisticsLine name='Average' stat={(props.good + (-1 * props.bad)) / (all)} />
                    <StatisticsLine name='Positive' stat={(props.good / (all)) * 100} suffix=' %' />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <button onClick={() => setGood(good + 1)}>
                Good
            </button>
            <button onClick={() => setNeutral(neutral + 1)}>
                Neutral
            </button>
            <button onClick={() => setBad(bad + 1)}>
                Bad
            </button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
