import React from "react";
import faker from "faker";
import { Factory } from "rosie";
import MyTable from "./MyTable";

const personFactory = Factory.define("person")
  .attr("name", faker.name.findName)
  .attr("age", () => Math.floor(Math.random() * 100));

const dataFactory = Factory.define("data")
  .sequence("id")
  .extend(personFactory)
  .attr("friend", () => personFactory.build());

const data = dataFactory.buildList(50);
const columns = [
  {
    Header: "Name",
    accessor: "name", // String-based value accessors!
  },
  {
    Header: "Age",
    accessor: "age",
    Cell: (props) => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    id: "friendName", // Required because our accessor is not a string
    Header: "Friend Name",
    accessor: (d) => d.friend.name, // Custom value accessors!
  },
  {
    Header: (props) => <span>{props.value}</span>, // Custom header components!
    accessor: "friend.age",
  },
];

const App = () => {
  return (
    <div className="App">
      <MyTable data={data} columns={columns} keyField="id" />
    </div>
  );
};

export default App;
