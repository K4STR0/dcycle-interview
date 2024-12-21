import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CovidStatus } from '../../../types/covid'
import style from './LineChart.module.css'
import { useEffect, useState } from 'react'
import { CustomTooltip } from '../CustomTooltip/CustomTooltip'
import { Measure, View, viewColors } from '../../../config/covidDataConfig'
import { FaChartArea, FaChartLine, FaList, FaListAlt } from 'react-icons/fa'
import { ReorderList } from '../../list/ReorderList/ReorderList'

interface Props {
  data: CovidStatus[]
}

interface ChartData {
  date: string
  cases: number
  testing: number
  deaths: number
  hospitalized: number
  icu: number
  ventilator: number
}

export const LineChart = ({ data }: Props) => {
  const [processedData, setProcessedData] = useState<ChartData[]>([])
  const [selectedViews, setSelectedViews] = useState<View[]>([View.CASES])
  const [selectedMeasure, setSelectedMeasure] = useState<Measure>(Measure.TOTAL)
  const [areaSelected, setAreaSelected] = useState(true)
  const [showReorder, setShowReorder] = useState(false)

  const toggleView = (view: View) => {
    if (selectedViews.includes(view)) {
      setSelectedViews(
        selectedViews.filter((selectedView) => selectedView !== view)
      )
    } else {
      setSelectedViews([...selectedViews, view])
    }
  }

  // Adapt the data to the format required by rechart (and selected measure)
  useEffect(() => {
    setProcessedData(
      data.map((item) => {
        return {
          date: `${item.date.getDate()}/${
            item.date.getMonth() + 1
          }/${item.date.getFullYear()}`,
          cases: item.cases[selectedMeasure] ?? 0,
          testing: item.testing[selectedMeasure] ?? 0,
          deaths: item.outcomes.death[selectedMeasure] ?? 0,
          hospitalized:
            item.outcomes.hospitalized.currently[selectedMeasure] ?? 0,
          icu: item.outcomes.hospitalized.inICU[selectedMeasure] ?? 0,
          ventilator:
            item.outcomes.hospitalized.onVentilator[selectedMeasure] ?? 0,
        }
      })
    )
  }, [data, selectedMeasure])

  return (
    <div className={style.chartContainer}>
      <ButtonsSection
        selectedMeasure={selectedMeasure}
        setSelectedMeasure={setSelectedMeasure}
        toggleView={toggleView}
        selectedViews={selectedViews}
      />
      <div className={style.responsiveChart}>
        <div className={style.sideButtons}>
          <button onClick={() => setAreaSelected(!areaSelected)}>
            {areaSelected ? <FaChartArea /> : <FaChartLine />}
          </button>
          <button onClick={() => setShowReorder(!showReorder)}>
            {showReorder ? <FaListAlt /> : <FaList />}
          </button>
        </div>
        {showReorder && (
          <div className={style.reorderList}>
            <ReorderList items={selectedViews} setItems={setSelectedViews} />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{ top: 10, right: 0, left: 25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="1" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  percentage={[
                    Measure.POPULATION_PERCENT,
                    Measure.SEVEN_DAY_CHANGE_PERCENT,
                  ].includes(selectedMeasure)}
                />
              )}
            />
            {selectedViews.map((selectedView) => (
              <Area
                key={selectedView}
                dataKey={selectedView}
                stroke={viewColors[selectedView].stroke}
                fill={
                  areaSelected ? viewColors[selectedView].fill : 'transparent'
                }
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface ButtonsProps {
  toggleView: (view: View) => void
  selectedViews: View[]
  setSelectedMeasure: (measure: Measure) => void
  selectedMeasure: Measure
}

const ButtonsSection = ({
  toggleView,
  selectedViews,
  setSelectedMeasure,
  selectedMeasure,
}: ButtonsProps) => {
  return (
    <>
      <div className={style.buttonsSection}>
        <button
          className={`${style.casesButton} ${
            selectedViews.includes(View.CASES) && style.active
          }`}
          onClick={() => toggleView(View.CASES)}
        >
          Cases
        </button>
        <button
          className={`${style.testingButton} ${
            selectedViews.includes(View.TESTING) && style.active
          }`}
          onClick={() => toggleView(View.TESTING)}
        >
          Testing
        </button>
        <button
          className={`${style.deathsButton} ${
            selectedViews.includes(View.DEATHS) && style.active
          }`}
          onClick={() => toggleView(View.DEATHS)}
        >
          Deaths
        </button>
        <select
          value={selectedMeasure}
          onChange={(e) => setSelectedMeasure(e.target.value as Measure)}
        >
          <option value="total">Total</option>
          <option value="populationPercent">Population Percent</option>
          <option value="changeFromPriorDay">Change from Prior Day</option>
          <option value="sevenDayChangePercent">
            Seven Day Change Percent
          </option>
        </select>
      </div>
      <div className={`${style.buttonsSection} ${style.hospitalized}`}>
        <span>Hospitalized</span>
        <button
          className={`${style.hospitalizedButton} ${
            selectedViews.includes(View.HOSPITALIZED) && style.active
          }`}
          onClick={() => toggleView(View.HOSPITALIZED)}
        >
          All
        </button>
        <button
          className={`${style.icuButton} ${
            selectedViews.includes(View.ICU) && style.active
          }`}
          onClick={() => toggleView(View.ICU)}
        >
          In ICU
        </button>
        <button
          className={`${style.ventilatorButton} ${
            selectedViews.includes(View.VENTILATOR) && style.active
          }`}
          onClick={() => toggleView(View.VENTILATOR)}
        >
          On Ventilator
        </button>
      </div>
    </>
  )
}
