import { useNavigate } from 'react-router'
import style from './HomePage.module.css'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className={style.homePage}>
      <button onClick={() => navigate('/ejercicio1')}>
        <h2>Ejercicio 1</h2>
        <span>El del nombre</span>
      </button>
      <button onClick={() => navigate('/ejercicio2')}>
        <h2>Ejercicio 2</h2>
        <span>El del covid</span>
      </button>
      <h1>Prueba técnica Rubén Castro Sanz</h1>
    </div>
  )
}
