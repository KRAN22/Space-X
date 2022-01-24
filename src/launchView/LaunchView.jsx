import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const zoomOutProperties = {
  duration: 1000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};

class LaunchView extends React.Component {
  state = {
    launch: {
      links: {
        flickr_images: [],
      },
    },
  };
  componentDidMount = () => {
    const flightNo = this.props.router.params.flight_number;
    this.getLaunch(flightNo);
  };
  getLaunch = (flightNo) => {
    axios
      .get("https://api.spacexdata.com/v3/launches/" + flightNo)
      .then((response) => {
        this.setState({
          launch: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  LaunchAttribute = (title, key) => {
    const value = this.state.launch[key];
    return (
      <div className="attribute">
        <h1>{title} </h1>
        <h1>{value}</h1>
      </div>
    );
  };

  render() {
    const hasImages = this.state.launch.links.flickr_images.length > 0;
    console.log(this.state.launch.links.flickr_images);
    return (
      <div className="launchView">
        {this.LaunchAttribute("MissionName", "mission_name")}
        {this.LaunchAttribute("Flight Number", "flight_number")}
        {this.LaunchAttribute("LaunchDate", "launch_date_local")}
        {hasImages && (
          <Zoom {...zoomOutProperties}>
            {this.state.launch.links.flickr_images.map((each, index) => (
              <img
                key={index}
                style={{ width: "100%" }}
                src={each}
                alt="flickerImages"
              />
            ))}
          </Zoom>
        )}

        <p>{this.state.launch.details}</p>
      </div>
    );
  }
}
const WrappedLaunchView = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = useParams();

  return <LaunchView {...props} router={{ location, navigate, params }} />;
};

export default WrappedLaunchView;
