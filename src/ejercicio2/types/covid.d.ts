export interface CovidStatus {
  date: Date
  states: number
  cases: CovidMetrics
  testing: CovidMetrics
  outcomes: Outcomes
}

export interface CovidMetrics {
  total: number | null
  populationPercent: number | null
  changeFromPriorDay: number | null
  sevenDayChangePercent: number | null
}

export interface Outcomes {
  hospitalized: Hospitalized
  death: CovidMetrics
}

export interface Hospitalized {
  currently: CovidMetrics
  inICU: CovidMetrics
  onVentilator: CovidMetrics
}
