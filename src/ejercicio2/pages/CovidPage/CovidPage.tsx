import { useEffect, useState } from 'react'
import style from './CovidPage.module.css'
import { obtainCovidHistData } from '../../api/covid'
import { CovidStatus } from '../../types/covid'
import { LineChart } from '../../components/widgets/LineChart/LineChart'
import { toast } from 'react-toastify'
import { CovidTable } from '../../components/widgets/CovidTable/CovidTable'

export const CovidPage = () => {
  const [covidData, setCovidData] = useState<CovidStatus[]>([])

  useEffect(() => {
    obtainCovidHistData()
      .then((data) => setCovidData(data))
      .catch((error) => {
        toast.error(
          'An error occurred while obtaining the covid historical data'
        )
        console.error(error)
      })
  }, [])

  if (covidData.length === 0) {
    return <div className={style.pageContainer}>Loading...</div>
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.widget}>
        <LineChart data={covidData} />
      </div>
      <div className={style.widget}>
        <CovidTable data={covidData} />
      </div>
    </div>
  )
}
