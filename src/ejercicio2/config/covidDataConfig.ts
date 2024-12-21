export enum View {
  CASES = 'cases',
  TESTING = 'testing',
  DEATHS = 'deaths',
  HOSPITALIZED = 'hospitalized',
  ICU = 'icu',
  VENTILATOR = 'ventilator',
}

export enum Measure {
  TOTAL = 'total',
  POPULATION_PERCENT = 'populationPercent',
  CHANGE_FROM_PRIOR_DAY = 'changeFromPriorDay',
  SEVEN_DAY_CHANGE_PERCENT = 'sevenDayChangePercent',
}

export const viewColors = {
  [View.CASES]: {
    stroke: 'var(--color-primary)',
    fill: 'var(--color-primary)',
  },
  [View.TESTING]: {
    stroke: 'var(--color-secondary)',
    fill: 'var(--color-secondary)',
  },
  [View.DEATHS]: {
    stroke: 'var(--color-tertiary)',
    fill: 'var(--color-tertiary)',
  },
  [View.HOSPITALIZED]: {
    stroke: 'gray',
    fill: 'white',
  },
  [View.ICU]: {
    stroke: '#4d816c',
    fill: '#4d816c',
  },
  [View.VENTILATOR]: {
    stroke: '#825d8d',
    fill: '#825d8d',
  },
}
