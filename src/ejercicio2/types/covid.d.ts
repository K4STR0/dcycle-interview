interface CovidStatus {
  date:     Date
  states:   number
  cases:    CovidMetrics
  testing:  CovidMetrics
  outcomes: Outcomes
}

interface CovidMetrics {
  total:                  number | null
  populationPercent:      number | null
  changeFromPriorDay:     number | null
  sevenDayChangePercent:  number | null
}

interface Outcomes {
  hospitalized: Hospitalized
  death:        number
}

interface Hospitalized {
  currently:    number | null
  inICU:        number | null
  onVentilator: number | null
}