import { Table, Button, Icon } from "semantic-ui-react";

export default function DetailView({ quoteID, state, columns,handleAdd,handleEdit }) {
  const { dataDetail, loading } = state;
    // 篩選可顯示欄位
  columns = columns.filter((col) => col.viewable);
  return (
    <div>
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

            <Table.HeaderCell icon>
              <Button color="teal" icon onClick={handleAdd} loading={loading}>
                <Icon name="plus" />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dataDetail.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>
                  );
                })}

                <Table.Cell>
                  <Button icon onClick={() => showDetail(row.quoteID)}>
                    <Icon name="pencil" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
