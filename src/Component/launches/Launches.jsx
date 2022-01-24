import React from "react";
import Launch from "../Launch/Launch";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Launches extends React.Component {
  state = {
    launches: [],
  };
  componentDidMount = () => {
    this.getLaunches();
  };
  getLaunches = () => {
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        this.setState({ launches: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  LaunchList = () => {
    const launchListComponents = this.state.launches.map((launch, index) => {
      const images =
        launch.links.flickr_images.length === 0
          ? "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          : launch.links.flickr_images;
      return (
        <Link key={"lunch_" + index} to={"/launch/" + launch.flight_number}>
          <Launch
            banner={images}
            title={launch.mission_name}
            launchDate={launch.launch_date_local}
            description={launch.details}
          />
        </Link>
      );
    });
    return launchListComponents;
  };

  render() {
    return <div className="launches">{this.LaunchList()}</div>;
  }
}

export default Launches;
