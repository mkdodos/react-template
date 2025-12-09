import React from "react";
import BasicTable from "./components/BasicTable";
import DataTable from "./components/DataTable";
import TableForm from "./components/TableForm"
import { TabPane, Tab } from "semantic-ui-react";

export default function index() {
  const panes = [
     { menuItem: "Form", render: () => <TabPane><TableForm/></TabPane> },
    {
      menuItem: "Basic",
      render: () => (
        <TabPane>
          <BasicTable />
        </TabPane>
      ),
    },
    {
      menuItem: "Data",
      render: () => (
        <TabPane>
          <DataTable />
        </TabPane>
      ),
    },
    
   
  ];
  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: false }} panes={panes} />

    // <div><DataTable/></div>
  );
}
