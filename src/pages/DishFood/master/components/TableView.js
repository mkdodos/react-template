import {
  Table,
  Button,
  Icon,
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Menu,
  MenuItem,
  Header,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";

export default function TableView({
  data,
  columns,
  handleAdd,
  handleEdit,
  handleAddDetail,
}) {
  // console.log(data);
  // return;
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

            <Table.HeaderCell width={1}>
              <Button color="teal" icon onClick={handleAdd}>
                <Icon name="plus" />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, rowIndex) => {
            return (
              <Table.Row key={uuidv4()}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>
                  );
                })}

                <Table.Cell width={1}>
                  <Button icon onClick={() => handleEdit(row, rowIndex)}>
                    <Icon name="pencil" />
                  </Button>
                  <Button icon onClick={() => handleAddDetail(row.id)}>
                    <Icon name="plus" />
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
