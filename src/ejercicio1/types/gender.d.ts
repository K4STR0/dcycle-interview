export interface Gender {
  gender: string | null
  probability: number
}

export interface GenderResponseDTO {
  count: number
  name: string
  gender: string | null
  probability: number
}
