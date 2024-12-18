import style from './ResultItem.module.css'

interface Props {
  title?: string
  value?: string
  className?: string
  children?: React.ReactNode | React.ReactNode[]
}

export const ResultItem = ({ title, value, className, children }: Props) => {
  return (
    <div className={`${style.resultItem} ${className || ''}`}>
      <span className={style.predictionTitle}>{title}</span>
      {children ? (
        children
      ) : (
        <span className={style.predictionValue}>{value}</span>
      )}
    </div>
  )
}
