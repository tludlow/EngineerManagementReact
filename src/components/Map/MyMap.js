import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="map-marker"><i className="fa fa-map-marker" aria-hidden="true"></i></div>;

export default class MyMap extends Component {
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 10
    };
  
    render() {
        return (
            <section className="jobmap">
            <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyDx_luguF8iFS6iRutqGLM0PfMqhyDP11k"}}
              defaultCenter={{lat: this.props.lat, lng: this.props.long}}
              defaultZoom={this.props.zoom}
            >
              <AnyReactComponent
                lat={this.props.lat}
                lng={this.props.long}
                text={'Marker'}
              />
            </GoogleMapReact>
            </section>
          );
    }
  }