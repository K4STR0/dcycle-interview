import { Gender, GenderResponseDTO } from '../types/gender'
import { axiosInstance } from '../../axiosInstance'

export const obtainGenderFromName = async (name: string): Promise<Gender> => {
  const response = await axiosInstance.get<GenderResponseDTO>(
    `genderize/${name}`
  )
  const data = response.data
  return { gender: data.gender, probability: data.probability }
}
