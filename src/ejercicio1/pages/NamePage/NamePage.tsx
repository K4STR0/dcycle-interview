import { useEffect, useRef, useState } from 'react'
import style from './NamePage.module.css'
import { Prediction } from '../../types/prediction'
import { obtainAgeFromName } from '../../api/age'
import { obtainGenderFromName } from '../../api/gender'
import { obtainNationFromName } from '../../api/nation'
import { ResultItem } from '../../components/ResultItem/ResultItem'
import { countries } from '../../constants/countries'
import { toast } from 'react-toastify'

export const NamePage = () => {
  const [predictions, setPredictions] = useState<Prediction | null>()
  const [name, setName] = useState('')
  // Timer reference for automatic search
  const typingTimerRef = useRef<number | null>(null)
  // Check if the result is stale (If the name has changed)
  const isResultStale = name !== predictions?.name

  useEffect(() => {
    // Cleanup the timer when the component is unmounted
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current)
      }
    }
  }, [])

  const obtainPredictions = async (name: string) => {
    //Cleanup the timer to avoid multiple searches
    typingTimerRef.current && clearTimeout(typingTimerRef.current)
    // Obtain the all the predictions at once
    Promise.all([
      obtainAgeFromName(name),
      obtainGenderFromName(name),
      obtainNationFromName(name),
    ])
      .then(([age, gender, nations]) => {
        setPredictions({ name, age, gender, nations })
      })
      .catch((error) => {
        toast.error('An error occurred while obtaining the predictions')
        console.error(error)
      })
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)

    if (newName.length === 0) {
      // If the input is empty, clear the predictions (and keep the last result)
      typingTimerRef.current && clearTimeout(typingTimerRef.current)
      return
    }

    // Cleanup the previous timer to avoid multiple searches
    typingTimerRef.current && clearTimeout(typingTimerRef.current)

    // Set a new timer
    typingTimerRef.current = setTimeout(async () => {
      await obtainPredictions(newName)
    }, 1000)
  }

  const getFlagEmoji = (countryCode: string) => {
    // Convert the country code to unicode to get the flag
    // For example: 🇺 + 🇸 = 🇺🇸
    return [...countryCode.toUpperCase()]
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join('')
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.pageContent}>
        <h1>
          <span>name</span>predictor
        </h1>
        <form
          className={style.nameForm}
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault()
            await obtainPredictions(name)
          }}
        >
          <input
            placeholder="Type your name..."
            value={name}
            onChange={onChangeName}
          />
          <button type="submit">Predict</button>
        </form>
        {!predictions ? (
          <p className={style.instructions}>
            Predict your age, gender and nationality based on your name!
          </p>
        ) : (
          <div className={style.predictionsSection}>
            <h2>
              Results for <span>{predictions?.name}</span>
            </h2>
            <hr />
            <div
              className={style.predictions}
              style={{ opacity: isResultStale ? 0.5 : 1 }}
            >
              <ResultItem
                title="AGE"
                value={
                  predictions.age
                    ? `${predictions.age.toString()} years`
                    : 'Unknown'
                }
              />
              <ResultItem
                title="GENDER"
                value={
                  predictions.gender.gender
                    ? `${predictions.gender.gender.toUpperCase()} (${
                        predictions.gender.probability * 100
                      }%)`
                    : 'Unknown'
                }
              />
              <div className={style.nationsSection}>
                <table>
                  {predictions.nations.map((nation) => (
                    <tr key={nation.countryId}>
                      <td className={style.countryFlag}>
                        {getFlagEmoji(nation.countryId)}
                      </td>
                      <td className={style.countryName}>
                        {countries[nation.countryId] || nation.countryId}
                      </td>
                      <td className={style.countryProbability}>
                        {(nation.probability * 100).toFixed(3)}%
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
