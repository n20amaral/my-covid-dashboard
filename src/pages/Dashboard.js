import React, { Component } from "react";
import Sidebar from "../components/sidebar";
import CovidMap from "../components/CovidMap";
import Graph from "../components/Graph";
import service from "../services/covidService";
import views from "../utils/views";
import { Container, Row, Col, Spinner } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      historical: {
        cases: {},
        recovered: {},
        deaths: {},
      },
      activeView: 0,
    };

    this.changeView = this.changeView.bind(this);
  }

  async componentDidMount() {
    const countries = await service.allCountries();
    const historical = await service.allHistory();
    this.setState({ countries, historical });
  }

  mapData() {
    return this.state.countries.map((c) => ({
      lat: c.countryInfo.lat,
      long: c.countryInfo.long,
      name: c.country,
      number: c[views[this.state.activeView].field],
    }));
  }

  graphData() {
    const { field, title, colorHex } = views[this.state.activeView];
    const data = Object.entries(this.state.historical[field]).map((e) => ({
      date: e[0],
      number: e[1],
    }));

    return {
      data,
      lines: [{ dataKey: "number", name: title, stroke: colorHex }],
      xAxisKey: "date",
    };
  }

  changeView(activeView) {
    this.setState({ activeView });
  }

  render() {
    return (
      <Container fluid className="vh-100">
        {this.state.countries.length ? (
          <Row>
            <Col xs="4" lg="3">
              <Sidebar
                data={this.state.countries}
                activeView={this.state.activeView}
                changeView={this.changeView}
              />
            </Col>
            <Col xs="8" lg="9">
              <Row className="h-50">
                <CovidMap
                  data={this.mapData()}
                  color={views[this.state.activeView].colorHex}
                />
              </Row>
              <Row className="h-50 overflow-hidden px-3">
                <Graph {...this.graphData()} />
              </Row>
            </Col>
          </Row>
        ) : (
          <Row className="h-100 d-flex align-items-center justify-content-center">
            <Spinner type="grow" />
          </Row>
        )}
      </Container>
    );
  }
}

export default Dashboard;
