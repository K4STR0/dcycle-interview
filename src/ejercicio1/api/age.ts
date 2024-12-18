import { AgeResponseDTO } from '../types/age'
import { axiosInstance } from '../../axiosInstance'

export const obtainAgeFromName = async (
  name: string
): Promise<number | null> => {
  const response = await axiosInstance.get<AgeResponseDTO>(`/agify/${name}`)
  return response.data.age
}
