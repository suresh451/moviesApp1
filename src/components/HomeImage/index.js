import './index.css'

const HomeImage = props => {
  const {imageDetails} = props
  const {backdropPath, title, overview} = imageDetails

  return (
    <>
      <div
        className="home-image"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <div className="home-image-div">
          <h1>{title}</h1>
          <p>{overview}</p>
          <button type="button">Play</button>
        </div>
      </div>
    </>
  )
}

export default HomeImage
