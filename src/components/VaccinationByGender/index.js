import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  console.log(vaccinationByGender)

  return (
    <div className="vaccination-by-gender-container">
      <h2 className="vaccination-by-gender-heading">Vaccination By Gender</h2>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByGender}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          horizontalAlign="middle"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
