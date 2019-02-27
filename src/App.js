import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "ff64e24671b94881b99af7069d724f00"
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 500
      }
    },
    color: {
      value: "#ff0000"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: false,
        speed: 60,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 300,
      color: "#ffffff",
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageLink: "",
      box: {}
    };
  }
  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  onInputChange = event => {
    this.setState({
      input: event.target.value
    });
  };
  onSubmit = () => {
    this.setState({
      imageLink: this.state.input
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition image={this.state.imageLink} box={this.state.box} />
      </div>
    );
  }
}

export default App;
