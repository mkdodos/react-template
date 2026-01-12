import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Header,
  Button,
  Modal,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Input,
} from "semantic-ui-react";



export default function EditForm({
  row,
  setRow,
  setOpen,
  data,
  state,
  dispatch,
  columns
}) {


  // 篩選可編輯欄位
  columns = columns.filter((col) => col.editable);
  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const save = (index) => {
    // console.log(state.editedRowIndex);
    if (state.editedDetailRowIndex == -1) {
      dispatch({ type: "CREATE_DETAIL", payload: { row } });
    } else {
      dispatch({ type: "UPDATE_DETAIL", payload: { row, index } });
    }
  };

  const destroy = () => {
    if (!confirm("確定刪除嗎?")) return;
    dispatch({ type: "DELETE_DETAIL", payload: { id:row.id } });
  };

  return (
    <div>
      <Modal
        onClose={() => dispatch({ type: "CLOSE_DETAILFORM" })}
        // onOpen={() => setOpen(true)}
        open={state.isDetailFormOpen}
        // trigger={<Button>Show Modal</Button>}
      >
        <ModalHeader>
          <Header>編輯{state.masterID}</Header>
        </ModalHeader>
        <ModalContent>
          <Table definition unstackable>
            <TableBody>
              {columns.map((col, index) => {
                return (
                  // key 使用 uuidv4 會無法正常輸入
                  // <TableRow key={uuidv4()}>
                  <TableRow key={index}>
                    <TableCell width={3}>{col.title}</TableCell>
                    <TableCell>
                      <Input
                        type={col.type}
                        name={col.dataKey}
                        value={row[col.dataKey]}
                        onChange={handleInputChange}
                        fluid
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ModalContent>
        <ModalActions>
          <Button floated="left" color="red" onClick={destroy}>
            刪除
          </Button>
          <Button content="儲存" onClick={save} positive />
        </ModalActions>
      </Modal>
    </div>
  );
}
