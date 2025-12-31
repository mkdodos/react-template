import React from "react";
import { TabPane, Tab } from "semantic-ui-react";
import DayView from "./DayView";
import TableView from "./TableView";

export default function ViewTab({ state, columns, handleAdd, handleEdit }) {
  const panes = [
    {
      menuItem: "DayView",
      render: () => (
        <TabPane>
          <DayView
            data={state.data}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "TableView",
      render: () => (
        <TabPane>
          <TableView
            state={state}
            columns={columns}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
          />
        </TabPane>
      ),
    },
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
