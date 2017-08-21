import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TopBar from '../topbar/topbar';
import BottomBar from '../bottombar/bottombar';
import GoogleMapReact from 'google-map-react';
import config from '../config/config';
import Chance from 'chance';

const chance = new Chance();

const style = {
  display: 'inline-block',
  width: '100%',
  height: '500px'
};

export default class JavaScriptMap extends React.Component {
  constructor(props) {
    super();
    this.state = {
      points: []
    };
  }

  getPoints() {
    let points = [];
    for (let i = 0; i < 500; i++) {
      points.push({
        latitude: chance.latitude({ min: -19.99, max: -19.77 }),
        longitude: chance.longitude({ min: -44.10, max: -43.85 }),
        weight: chance.integer({ min: 1, max: 50 })
      })
    }
    this.setState({ points });
  }

  render() {
    return (
      <div>
        <TopBar title={'JavaScript'} />
        <div style={style}>
          <RaisedButton label='Get points' onClick={this.getPoints.bind(this)} />
          <GoogleMapReact bootstrapURLKeys={{
            key: config.GOOGLE_API_KEY,
            libraries: 'visualization'
          }}
            center={this.props.center} zoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              const heatmap = new maps.visualization.HeatmapLayer({
                data: this.state.points
              });
              heatmap.setMap(map);
            }}>

          </GoogleMapReact>
        </div>
        <BottomBar />
      </div >
    );
  }
}