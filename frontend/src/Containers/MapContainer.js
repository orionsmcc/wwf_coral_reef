import React, { Component } from 'react';
import {
  Circle,
  CircleMarker,
  Map,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'

import { getBenthicData } from '../actions/services/benthic'
import BenthicMap from '../Components/BenthicMap/BenthicMap'
import Sidebar from '../Components/Sidebar/Sidebar'
import DataTable from '../Components/DataTable/DataTable'
import './MapContainer.css'

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        benthicData: null,
				isLoaded: false,
				coverType: 'PercentCoral',
				filterYear: 2016
    };
    this.handleCoverTypeChange = this.handleCoverTypeChange.bind(this)
    this.handleFilterYearChange = this.handleFilterYearChange.bind(this)
  }

  handleCoverTypeChange(e) {
    this.setState({
      coverType: e.target.value
    })
  }

  handleFilterYearChange(filterYear) {
    this.setState({
      filterYear
    })
  }
 
  componentDidMount() {
    getBenthicData()
    .then(benthicData => {
        console.log("benthic data, ", benthicData.data)
        this.setState({
            benthicData: benthicData.data.data,
            isLoaded: true
        })
    })
  }

  render() {
    return (
      this.state.isLoaded ? 
      <div>
        <div className="map-container">
          <Sidebar coverType={this.state.coverType} filterYear={this.state.filterYear} handleCoverTypeChange={this.handleCoverTypeChange} handleFilterYearChange={this.handleFilterYearChange}/>
          <BenthicMap benthicData={this.state.benthicData} coverType={this.state.coverType} filterYear={this.state.filterYear} />
        </div>
        <div className="data-container">
          <DataTable benthicData={this.state.benthicData} coverType={this.state.coverType}/>
        </div>
      </div>
      :
      null
    );
  }
}

export default MapContainer