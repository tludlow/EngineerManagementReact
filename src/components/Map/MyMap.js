import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const MarkerComponent = ({ text }) => <div className="map-marker"><i className="fa fa-map-marker" aria-hidden="true"></i></div>;

export default class MyMap extends Component {

    //Default props the component should take before we update them.
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 10
    };
  
    //Render the google maps map to the user with the zoom, lat and lng defined.
    render() {
        return (
            <section className="jobmap">
            <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyDx_luguF8iFS6iRutqGLM0PfMqhyDP11k"}}
              defaultCenter={{lat: this.props.lat, lng: this.props.long}}
              defaultZoom={this.props.zoom}
            >
              <MarkerComponent
                lat={this.props.lat}
                lng={this.props.long}
                text={'Marker'}
              />
            </GoogleMapReact>
            </section>
          );
    }
  }