export interface Nation {
  countryId: string
  probability: number
}

export interface NationDTO {
  country_id: string
  probability: number
}

export interface NationsResponseDTO {
  count: number
  name: string
  country: NationDTO[]
}