import React from "react";
import BasicTable from "./components/BasicTable";
import DataTable from "./components/DataTable";
import { TabPane, Tab } from "semantic-ui-react";

export default function index() {
  const panes = [
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
    
    { menuItem: "Tab 3", render: () => <TabPane>Tab 3 Content</TabPane> },
  ];
  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: false }} panes={panes} />

    // <div><DataTable/></div>
  );
}
