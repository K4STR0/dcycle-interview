import { Nation, NationsResponseDTO } from '../types/nation'
import { axiosInstance } from '../../axiosInstance'

export const obtainNationFromName = async (name: string): Promise<Nation[]> => {
  const response = await axiosInstance.get<NationsResponseDTO>(
    `nationalize/${name}`
  )
  const data = response.data
  return data.country.map((nation) => ({
    countryId: nation.country_id,
    probability: nation.probability,
  }))
}
