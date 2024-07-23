import loading from "../assets/loading.svg";

function LoadingIcon({ color }) {
  return (
    <div id="loading-icon_container">
      <p>Loading...</p>
      <img src={loading} />
    </div>
  )
}

export default LoadingIcon;