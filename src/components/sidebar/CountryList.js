import React from "react";
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

const CountryList = ({ data, activeView }) => {
    const active = activeView.field;
    return (
        <ListGroup>
        {data.length > 0 &&
            data.map((c) => (
                <ListGroupItem key={c.country} >      
                    <Link className="text-secondary text-decoration-none" to={`/country/${c.country}`} >
                        <img width="32" src={c.countryInfo.flag} alt={c.country} className="mx-2" />
                        <span className="h6">{c.country}</span>
                        <Badge color={activeView.color} className="float-right">{c[active]}</Badge>
                    </Link>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CountryList;
