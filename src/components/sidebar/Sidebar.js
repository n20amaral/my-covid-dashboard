import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ViewTabs from "./ViewTabs";
import CountryList from "./CountryList";
import views from "../../utils/views";

const sortBy = (field, ascending) => {
  return ascending
    ? (a, b) => a[field] - b[field]
    : (a, b) => b[field] - a[field];
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      filter: "",
      sortAscending: false,
    };

    this.applyFilter = this.applyFilter.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.data !== prevProps.data || this.props.activeView !== prevProps.activeView) {
      this.setState(({sortAscending}) => ({
        data: this.props.data.sort(sortBy(views[this.props.activeView].field, sortAscending)),
      }));
    }
  }

  applyFilter(filter) {
    this.setState({ filter });
  }

  filterData() {
    const { data, filter } = this.state;

    if (!filter) {
      return data;
    }

    return data.filter((c) =>
      c.country.toLowerCase().includes(filter.toLowerCase())
    );
  }

  toggleSort() {
    this.setState(({ data, sortAscending }) => ({
      data: data.sort(sortBy(views[this.props.activeView].field, !sortAscending)),
      sortAscending: !sortAscending,
    }));
  }

  render() {
    const { data } = this.state;
    const activeView = views[this.props.activeView];

    return (
      <div className="vh-100 d-flex flex-column">
        <div className="mt-3">
          <ViewTabs
            {...{views, activeView }}
            changeView={this.props.changeView}
          />
          <h2 className="text-center py-5 mb-0 border-left border-right">
            {data.length &&
              data.reduce((acc, c) => acc + c[activeView.field], 0)}
          </h2>
          <SearchBar
            filter={this.state.filter}
            sortAscending={this.state.sortAscending}
            applyFilter={this.applyFilter}
            toggleSort={this.toggleSort}
          />
        </div>
        <div className="overflow-auto">
            <CountryList {...{ data: this.filterData(), activeView }} />
        </div>
      </div>
    );
  }
}

export default Sidebar;
