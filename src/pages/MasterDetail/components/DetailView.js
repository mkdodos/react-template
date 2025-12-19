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

// import RowView from "../master/components/RowView";

import Master from "../master";

import Detail from "../detail";

export default function DetailView({
  quoteID,
  state,
  columns,
  handleAdd,
  handleEdit,
  dispatch,
  showMasterForm
}) {
  const { dataDetail, loading, open } = state;
  // 篩選可顯示欄位
  columns = columns.filter((col) => col.viewable);
  const editMaster = (quoteID)=>{
    console.log(quoteID)
    showMasterForm()
  }

  // console.log(dataDetail[0])
  return (
    <Modal
      size="large"
      onClose={() => dispatch({ type: "CLOSE_DETAIL" })}
      open={open}
    >
      <ModalHeader>
        <Master state={state} data={dataDetail[0]} dispatch={dispatch}/>       
      </ModalHeader>
      <ModalContent>
        <Detail data={dataDetail}/>
        {/* <Table celled unstackable>
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

                  <Table.Cell width={1}>
                    <Button icon onClick={() => showDetail(row.quoteID)}>
                      <Icon name="pencil" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table> */}
      </ModalContent>
      <ModalActions>
        <Button floated="left" color="black" onClick={() => setOpen(false)}>
          取消
        </Button>
        <Button
          content="儲存"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  );
}
