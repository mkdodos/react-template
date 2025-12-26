import { Table, Button, Icon } from "semantic-ui-react";
import { API_HOST } from "../../../global/constants";

export default function TableView({ state,dispatch ,columns, handleAdd  }) {
  const { data, loading } = state;
  // 篩選可顯示欄位
  columns = columns.filter((col) => col.viewable);

  const showDetail = (quoteID) => {
    // console.log(quoteID);
    dispatch({ type: "SHOW_DETAIL", quoteID });
  };

  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          {columns.map((col, index) => {
            return (
              <Table.HeaderCell width={col.width} key={index}>
                {col.title}
              </Table.HeaderCell>
            );
          })}
          <Table.HeaderCell>圖</Table.HeaderCell>
          <Table.HeaderCell>
            <Button primary icon onClick={handleAdd} loading={loading}>
              <Icon name="plus" />
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row, index) => {
          return (
            <Table.Row key={row.id}>
              {columns.map((col, index) => {
                return <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>;
              })}
              <Table.Cell>
                {/* 讀取放在網站以外的資料夾檔案(配合PHP) */}
                <a
                  href={`${API_HOST}/template/readImage.php?quoteID=${row["quoteID"]}`}
                  target="_blank"
                >
                  <Icon name="image" size="large" />
                </a>
              </Table.Cell>
              <Table.Cell>
                <Button icon onClick={() => showDetail(row.quoteID)}>
                  <Icon name="list" />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
