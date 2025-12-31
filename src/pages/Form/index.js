import React from "react";
import { TabPane, Tab } from "semantic-ui-react";
import Basic from "./components/Basic";
import Definition from "./components/Definition"
import Inline from "./components/Inline"
export default function index() {
  const panes = [
    { menuItem: "Basic", render: () => <TabPane><Basic/></TabPane> },
    { menuItem: "Definition", render: () => <TabPane><Definition/></TabPane> },
    { menuItem: "Inline", render: () => <TabPane><Inline/></TabPane> },
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
