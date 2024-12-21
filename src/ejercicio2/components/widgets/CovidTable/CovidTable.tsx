import { Measure } from '../../../config/covidDataConfig'
import { CovidStatus } from '../../../types/covid'
import style from './CovidTable.module.css'

interface Props {
  data: CovidStatus[]
}

const measures = {
  [Measure.TOTAL]: 'Total',
  [Measure.POPULATION_PERCENT]: 'Population Percent',
  [Measure.CHANGE_FROM_PRIOR_DAY]: 'Change From Prior Day',
  [Measure.SEVEN_DAY_CHANGE_PERCENT]: 'Seven Day Change Percent',
}

export const CovidTable = ({ data }: Props) => {
  return (
    <table className={style.covidTable}>
      <thead>
        <tr>
          <td>Date</td>
          <td>Measure</td>
          <td>Cases</td>
          <td>Testing</td>
          <td>Deaths</td>
          <td>
            <tr>Hospitalized</tr>
            <tr className={style.hospitalizedLabels}>
              <td>All</td>
              <td>In ICU</td>
              <td>On Ventilator</td>
            </tr>
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) =>
          (Object.keys(measures) as Measure[]).map((measure, key) => {
            const symbol = [
              Measure.POPULATION_PERCENT,
              Measure.SEVEN_DAY_CHANGE_PERCENT,
            ].includes(measure)
              ? '%'
              : ''
            return (
              <tr key={key} className={idx % 2 == 0 ? style.light : style.dark}>
                <td
                  className={`${style.dateAndMeasures} ${
                    measure != Measure.TOTAL && style.emptyCell
                  }`}
                >
                  {measure == Measure.TOTAL
                    ? `${item.date.getDate()}/${
                        item.date.getMonth() + 1
                      }/${item.date.getFullYear()}`
                    : ''}
                </td>
                <td className={style.measureLabel}>{measures[measure]}</td>
                <td>{(item.cases[measure]?.toLocaleString() ?? 0) + symbol}</td>
                <td>
                  {(item.testing[measure]?.toLocaleString() ?? 0) + symbol}
                </td>
                <td>
                  {(item.outcomes.death[measure]?.toLocaleString() ?? 0) +
                    symbol}
                </td>
                <td className={style.hospitalized}>
                  <span>
                    {(item.outcomes.hospitalized.currently[
                      measure
                    ]?.toLocaleString() ?? 0) + symbol}
                  </span>
                  <span>
                    {(item.outcomes.hospitalized.inICU[
                      measure
                    ]?.toLocaleString() ?? 0) + symbol}
                  </span>
                  <span>
                    {(item.outcomes.hospitalized.onVentilator[
                      measure
                    ]?.toLocaleString() ?? 0) + symbol}
                  </span>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}
