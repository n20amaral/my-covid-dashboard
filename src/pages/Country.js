import React, { Component } from "react";
import Graph from "../components/Graph";
import service from "../services/covidService";
import views from "../utils/views";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardText,
} from "reactstrap";
class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      country: {},
    };
  }

  async componentDidMount() {
    const countryName = this.props.match.params.id;
    const data = await service.countryHistory(countryName);
    const country = await service.country(countryName);
    this.setState({ data, country });
  }

  graphData() {
    const { timeline } = this.state.data;

    const data =
      timeline &&
      Object.keys(timeline[views[0].field]).map((key) => ({
        date: key,
        ...views.reduce((acc, cur) => {
          acc[cur.field] = timeline[cur.field][key];
          return acc;
        }, {}),
      }));

    return {
      data,
      lines: [
        ...views.map(({ field, title, colorHex }) => ({
          dataKey: field,
          name: title,
          stroke: colorHex,
        })),
      ],
      xAxisKey: "date",
    };
  }

  render() {
    const { country } = this.state;
    const { country: countryName, countryInfo } = country;
    return (
      <Container fluid className="vh-100">
        {countryInfo ? (
          <>
            <Row className="h-25 w-75 mx-auto">
              <Col className="my-auto">
                <Card className="text-center">
                  <CardBody>
                    <CardTitle>
                      <h2>{countryName}</h2>
                    </CardTitle>
                    <img
                      className="img-fluid"
                      src={countryInfo.flag}
                      alt={countryName}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col className="my-auto">
                <Card>
                  <CardHeader>
                    <h3>LIVE - {new Date().toLocaleDateString()}</h3>
                  </CardHeader>
                  <CardBody>
                    {views.map(({ color, title }) => (
                      <CardText key={title} className={`text-${color}`}>
                        {title} Today: {country[`today${title}`]}
                      </CardText>
                    ))}
                  </CardBody>
                </Card>
              </Col>
              <Col className="my-auto">
                <Card>
                  <CardHeader>
                    <h3>PER MILLION</h3>
                  </CardHeader>
                  <CardBody>
                    {views.map(({ color, title, field }) => (
                      <CardText key={title} className={`text-${color}`}>
                        {title} Per Million: {country[`${field}PerOneMillion`]}
                      </CardText>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="h-50 w-75 mx-auto my-5">
              <Col>
                <Graph {...this.graphData()} />
              </Col>
            </Row>
            <Row className="w-75 mx-auto mt-5 pt-5">
              <Button onClick={() => this.props.history.goBack()}>
                Go Back
              </Button>
            </Row>
          </>
        ) : (
            <Row className="vh-100 d-flex align-items-center justify-content-center">
                <Spinner type="grow"/>
            </Row>
        )}
      </Container>
    );
  }
}

export default Country;
