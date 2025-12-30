import { Table, Button, Icon } from "semantic-ui-react";

import { API_HOST } from "../../../global/constants";
import { v4 as uuidv4 } from "uuid";

export default function TableView({ state, columns, handleAdd, handleEdit }) {
  const { data, loading } = state;

  // 篩選可顯示欄位
  columns = columns.filter((col) => col.viewable);

  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.title}</Table.HeaderCell>
              );
            })}
           
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row,rowIndex) => {
            return (
              <Table.Row key={uuidv4()}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={uuidv4()}>{row[col.dataKey]}</Table.Cell>
                  );
                })}
               
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, rowIndex)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
