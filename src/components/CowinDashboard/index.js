import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const resultStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccination: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
    resultStatus: resultStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({resultStatus: resultStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()

    const last7DaysVaccination = data.last_7_days_vaccination
    const vaccinationByGender = data.vaccination_by_gender
    const vaccinationByAge = data.vaccination_by_age

    if (response.ok === true) {
      this.setState({
        last7DaysVaccination,
        vaccinationByGender,
        vaccinationByAge,
        resultStatus: resultStatusConstants.success,
      })
    } else {
      this.setState({resultStatus: resultStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = this.state

    return (
      <>
        <VaccinationByCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img-styles"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
    </div>
  )

  getResult = () => {
    const {resultStatus} = this.state
    let result
    switch (resultStatus) {
      case resultStatusConstants.loading:
        result = this.renderLoaderView()
        break
      case resultStatusConstants.success:
        result = this.renderSuccessView()
        break
      case resultStatusConstants.failure:
        result = this.renderFailureView()
        break
      default:
        result = null
        break
    }
    return result
  }

  render() {
    return (
      <div className="app-container">
        <div className="website-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-styles"
          />
          <h3 className="logo-heading">Co-WIN</h3>
        </div>
        <h1 className="main-heading">CoWin Vaccination in India</h1>
        {this.getResult()}
      </div>
    )
  }
}

export default CowinDashboard
