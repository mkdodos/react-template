import React from "react";
import { TabPane, Tab } from "semantic-ui-react";
import DayView from "./DayView";
import TableView from "./TableView";
import PhoneView from "./PhoneView";

export default function ViewTab({
  state,
  dispatch,
  columns,
  handleAdd,
  handleEdit,
}) {
  const panes = [
    {
      menuItem: "PhoneView",
      render: () => (
        <TabPane>
          <PhoneView
            data={state.data}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
          />
        </TabPane>
      ),
    },
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
            dispatch={dispatch}
            columns={columns}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
          />
        </TabPane>
      ),
    },
  ];

  return (
    <div>
      <Tab
        menu={{ fluid: true, vertical: false, tabular: false }}
        panes={panes}
      />
    </div>
  );
}
