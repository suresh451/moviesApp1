import './index.css'

const FailureView = props => {
  const {onTryAgain} = props
  const onClickTryAgain = () => {
    onTryAgain()
  }

  return (
    <div className="failure-div">
      <img
        src="https://res.cloudinary.com/dgnk8frme/image/upload/v1696939554/svubqtjpcyqyyphms1ud.png"
        className="failure-img"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={onClickTryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
