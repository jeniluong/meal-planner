import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function NutritionChart({ nutrition }) {
  if (!nutrition) return null

  const data = {
    labels: ['Fat', 'Carbs', 'Protein'],
    datasets: [
      {
        label: 'Nutrition Breakdown (g)',
        data: [
          nutrition.fat || 0,
          nutrition.carbs || 0,
          nutrition.protein || 0
        ],
        backgroundColor: ['#f87171', '#60a5fa', '#34d399'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div style={{ width: '300px', marginTop: '10px' }}>
      <Pie data={data} />
    </div>
  )
}

export default NutritionChart