import { View, viewColors } from '../../../config/covidDataConfig'
import style from './CustomTooltip.module.css'

import {
  NameType,
  ValueType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent'

interface CustomTooltipProps {
  active: boolean | undefined
  payload: Payload<ValueType, NameType>[] | undefined
  label: string
  percentage: boolean
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  percentage,
}: CustomTooltipProps) => {
  if (active && payload) {
    return (
      <div className={style.tooltipContainer}>
        <p className={style.label}>{label}</p>
        <hr />
        {payload.map((item) => (
          <p
            key={item.name}
            className={style.item}
            style={{ color: viewColors[item.name as View].stroke }}
          >
            {item.name}: {item.value?.toLocaleString()}
            {percentage && '%'}
          </p>
        ))}
      </div>
    )
  }

  return null
}
