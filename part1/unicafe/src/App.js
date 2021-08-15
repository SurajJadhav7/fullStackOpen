import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
      <p>all: {props.all}</p>
      <p>average: {props.average}</p>
      <p>positive: {props.positive} %</p>
    </div>
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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
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