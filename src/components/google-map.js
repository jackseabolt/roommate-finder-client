import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBwm2UUsvnLbL_1gCtrqQeFCIZhMimijQA",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.long }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class DisplayMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }


  // componentDidMount() {
  //   this.delayedShowMarker()
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000)
  // }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  render() {
    return (
      <MyMapComponent
      lat={this.props.lat}
      long={this.props.long}
        // isMarkerShown={this.state.isMarkerShown}
        // onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

const mapStateToProps = state => (
  console.log("this is latlong", state.auth.currentUser.long), 
  {long: state.auth.currentUser.long,
  lat: state.auth.currentUser.lat}
);

export default connect(mapStateToProps)(DisplayMap);