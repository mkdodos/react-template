import React from "react";
import { TabPane, Tab } from "semantic-ui-react";
import Basic from "./components/Basic";
import Definition from "./components/Definition"
export default function index() {
  const panes = [
    { menuItem: "Basic", render: () => <TabPane><Basic/></TabPane> },
    { menuItem: "Definition", render: () => <TabPane><Definition/></TabPane> },
    { menuItem: "Tab 3", render: () => <TabPane>Tab 3 Content</TabPane> },
  ];

  return (
    <div>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: false }}
        panes={panes}
      />
    </div>
  );
}
