import { Gender } from './gender'
import { Nation } from './nation'

export interface Prediction {
  name: string
  age: number | null
  gender: Gender
  nations: Nation[]
}
