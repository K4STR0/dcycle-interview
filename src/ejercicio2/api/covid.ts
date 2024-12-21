import { axiosInstance } from '../../axiosInstance'
import { CovidMetrics, CovidStatus, Outcomes } from '../types/covid'
import { CovidResponseDTO } from '../types/covidDTO'

export const obtainCovidHistData = async (): Promise<CovidStatus[]> => {
  const response = await axiosInstance.get<CovidResponseDTO>(
    '/covid/historical'
  )

  return transformCovidData(response.data).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  )
}

const transformCovidData = (datum: CovidResponseDTO): CovidStatus[] => {
  return datum.data.map((datum) => {
    const casesTotal = datum.cases.total
    const casesCalculated = casesTotal.calculated
    const cases: CovidMetrics = {
      total: casesTotal.value,
      populationPercent: casesCalculated.population_percent,
      changeFromPriorDay: casesCalculated.change_from_prior_day,
      sevenDayChangePercent: casesCalculated.seven_day_change_percent,
    }

    const testingTotal = datum.testing.total
    const testingCalculated = testingTotal.calculated
    const testing: CovidMetrics = {
      total: testingTotal.value,
      populationPercent: testingCalculated.population_percent,
      changeFromPriorDay: testingCalculated.change_from_prior_day,
      sevenDayChangePercent: testingCalculated.seven_day_change_percent,
    }

    const hospitalizedTotal = datum.outcomes.hospitalized.currently
    const hospitalizedCalculated = hospitalizedTotal.calculated
    const hospitalizedCurrently: CovidMetrics = {
      total: hospitalizedTotal.value,
      populationPercent: hospitalizedCalculated.population_percent,
      changeFromPriorDay: hospitalizedCalculated.change_from_prior_day,
      sevenDayChangePercent: hospitalizedCalculated.seven_day_change_percent,
    }

    const icuTotal = datum.outcomes.hospitalized.in_icu.currently
    const icuCalculated = icuTotal.calculated
    const hospitalizedInICU: CovidMetrics = {
      total: icuTotal.value,
      populationPercent: icuCalculated.population_percent,
      changeFromPriorDay: icuCalculated.change_from_prior_day,
      sevenDayChangePercent: icuCalculated.seven_day_change_percent,
    }

    const ventilatorTotal = datum.outcomes.hospitalized.on_ventilator.currently
    const ventilatorCalculated = ventilatorTotal.calculated
    const hospitalizedOnVentilator: CovidMetrics = {
      total: ventilatorTotal.value,
      populationPercent: ventilatorCalculated.population_percent,
      changeFromPriorDay: ventilatorCalculated.change_from_prior_day,
      sevenDayChangePercent: ventilatorCalculated.seven_day_change_percent,
    }

    const deathsTotal = datum.outcomes.death.total
    const deathsCalculated = deathsTotal.calculated
    const deaths: CovidMetrics = {
      total: deathsTotal.value,
      populationPercent: deathsCalculated.population_percent,
      changeFromPriorDay: deathsCalculated.change_from_prior_day,
      sevenDayChangePercent: deathsCalculated.seven_day_change_percent,
    }

    const outcomes: Outcomes = {
      hospitalized: {
        currently: hospitalizedCurrently,
        inICU: hospitalizedInICU,
        onVentilator: hospitalizedOnVentilator,
      },
      death: deaths,
    }

    return {
      date: new Date(datum.date),
      states: datum.states,
      cases: cases,
      testing: testing,
      outcomes: outcomes,
    }
  })
}
