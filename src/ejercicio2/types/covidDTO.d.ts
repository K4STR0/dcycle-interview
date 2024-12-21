export interface CovidResponseDTO {
  links: Links
  meta: Meta
  data: StatusResponseDTO[]
}

interface StatusResponseDTO {
  date: string
  states: number
  cases: Cases
  testing: Cases
  outcomes: Outcomes
}

interface Cases {
  total: Measures
}

interface Measures {
  value: number | null
  calculated: Calculated
}

interface Calculated {
  population_percent: number | null
  change_from_prior_day: number | null
  seven_day_change_percent: number | null
  seven_day_average?: number | null
}

interface Outcomes {
  hospitalized: Hospitalized
  death: Cases
}

interface Hospitalized {
  currently: Measures
  in_icu: Currently
  on_ventilator: Currently
}

export interface Currently {
  currently: Measures
}

export interface Links {
  self: string
}

export interface Meta {
  build_time: string
  license: string
  version: string
  field_definitions: FieldDefinition[]
}

export interface FieldDefinition {
  name: string
  field?: string
  deprecated: boolean
  prior_names: string[]
}
