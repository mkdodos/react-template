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
}) {
  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const save = (index) => {
    console.log(state.editedRowIndex);
    if (state.editedRowIndex == -1) {
      dispatch({ type: "CREATE_DETAIL", payload: { row } });
    } else {
      dispatch({ type: "UPDATE_DETAIL", payload: { row, index } });
    }
  };

  const destroy = () => {
    dispatch({ type: "DESTROY_DETAIL", payload: { row } });
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
          <Header>編輯</Header>
        </ModalHeader>
        <ModalContent>
          <Table definition>
            <TableBody>
              <TableRow>
                <TableCell>品名</TableCell>
                <TableCell colSpan="3">
                  <Input
                    type="text"
                    name="workName"
                    value={row.workName}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>尺寸</TableCell>
                <TableCell width={4}>
                  <Input
                    label="Φ"
                    type="text"
                    name="size1"
                    value={row.size1}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>

                <TableCell width={4}>
                  <Input
                    type="text"
                    name="size2"
                    value={row.size2}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
                <TableCell width={4}>
                  <Input
                    type="text"
                    name="size3"
                    value={row.size3}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={4}>數量</TableCell>
                <TableCell colSpan="3">
                  <Input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={4}>單價</TableCell>
                <TableCell colSpan="3">
                  <Input
                    type="number"
                    name="price"
                    value={row.price}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width={4}>成交價</TableCell>
                <TableCell colSpan="3">
                  <Input
                    type="number"
                    name="donePrice"
                    value={row.donePrice}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={4}>加工說明</TableCell>
                <TableCell colSpan="3">
                  <Input
                    type="text"
                    name="workNote"
                    value={row.workNote}
                    onChange={handleInputChange}
                    fluid
                  />
                </TableCell>
              </TableRow>
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
