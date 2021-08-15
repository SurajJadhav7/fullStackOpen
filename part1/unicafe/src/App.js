import React, { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({stat, value}) => <tr><td>{stat}</td><td>{value}</td></tr>;

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <StatisticLine stat="good" value={props.good} />
      <StatisticLine stat="neutral" value={props.neutral} />
      <StatisticLine stat="bad" value={props.bad} />
      <StatisticLine stat="all" value={props.all} />
      <StatisticLine stat="average" value={props.average} />
      <StatisticLine stat="positive" value={props.positive + " %"} />
    </table>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(((average*all)+1)/(all+1))
    setPositive((good + 1)*100/(all + 1))
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((average*all)/(all+1))
    setPositive(good*100/(all + 1))
  };
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(((average*all)-1)/(all+1))
    setPositive((good/(all + 1))*100)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App