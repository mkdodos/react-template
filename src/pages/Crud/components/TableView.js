import { Table, Button,Icon } from "semantic-ui-react";

import { API_HOST } from "../../../global/constants";

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
            <Table.HeaderCell>圖</Table.HeaderCell>
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>
                  );
                })}
                <Table.Cell>
                  {/* 讀取放在網站以外的資料夾檔案(配合PHP) */}
                  <a
                    href={`${API_HOST}/template/readImage.php?id=${row["id"]}`}
                    target="_blank"
                  >
                    <Icon name="image" size="large" />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
