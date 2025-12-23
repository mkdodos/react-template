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

  return (
    <div>
      <Modal
        onClose={() => dispatch({ type: "CLOSE_DETAILFORM" })}
        // onOpen={() => setOpen(true)}
        open={state.isDetailFormOpen}
        // trigger={<Button>Show Modal</Button>}
      >
        <ModalHeader>
          <Header>{data?.quoteID}</Header>
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
          <Button floated="left" color="black" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            content="儲存"
            labelPosition="right"
            icon="checkmark"
            onClick={() =>
              dispatch({ type: "CREATE_DETAIL", payload: { row } })
            }
            positive
          />
        </ModalActions>
      </Modal>
    </div>
  );
}
