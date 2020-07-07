import React from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

const SearchBar = ({ filter, sortAscending, applyFilter, toggleSort }) => {
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button onClick={toggleSort}>
          {sortAscending ? "\u2B68" : "\u2197"}
        </Button>
      </InputGroupAddon>
      <Input
        placeholder="Search countries..."
        value={filter}
        onChange={(evt) => applyFilter(evt.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
