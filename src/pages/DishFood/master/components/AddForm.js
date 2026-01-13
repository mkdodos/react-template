import { useState } from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Modal,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Input,
  Form,
  ButtonOr,
  ButtonGroup,
} from "semantic-ui-react";

export default function AddForm({ row, setRow, setOpen, state, dispatch }) {
  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const save = () => {
    console.log(state.editedRowIndex);
    if (state.editedRowIndex == -1) {
      dispatch({ type: "CREATE_MASTER", payload: { row } });
    } else {
      dispatch({ type: "UPDATE_MASTER", payload: { row } });
    }
  };

  const sectionSelector = (section) => {
    // const positive
    return (
      <ButtonGroup>
        {section == "午餐" ? (
          <Button positive onClick={() => setRow({ ...row, section: "午餐" })}>
            午餐
          </Button>
        ) : (
          <Button onClick={() => setRow({ ...row, section: "午餐" })}>
            午餐
          </Button>
        )}
        <ButtonOr />
        {section == "晚餐" ? (
          <Button positive onClick={() => setRow({ ...row, section: "晚餐" })}>
            晚餐
          </Button>
        ) : (
          <Button onClick={() => setRow({ ...row, section: "晚餐" })}>
            晚餐
          </Button>
        )}
      </ButtonGroup>
    );
  };

  return (
    <>
      <Modal
        onClose={() => dispatch({ type: "CLOSE_MASTERADDFORM" })}
        open={state.isMasterAddFormOpen}
        closeIcon
      >
        <ModalHeader>
          新增
          {/* <Header>新增123</Header> */}
          {/* <Header>新增{state.masterID}</Header> */}
          {/* {JSON.stringify(state)} */}
        </ModalHeader>
        <ModalContent>
          <Form>
            <Table unstackable definition>
              <TableBody>
                <TableRow>
                  <TableCell width={3}>日期</TableCell>
                  <TableCell>
                    <Input
                      onChange={handleInputChange}
                      value={row?.date}
                      type="date"
                      name="date"
                      fluid
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={3}>時段</TableCell>
                  <TableCell>
                    {sectionSelector(row.section)}
                    {/* <Input
                      onChange={handleInputChange}
                      value={row?.section}
                      type="text"
                      name="section"
                      fluid
                    /> */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Form>
        </ModalContent>
        <ModalActions>
          {row.id && (
            <Button
              floated="left"
              color="red"
              onClick={() =>
                dispatch({ type: "DELETE_MASTER", payload: { id: row.id } })
              }
            >
              刪除
            </Button>
          )}

          <Button content="儲存" onClick={save} primary />
        </ModalActions>
      </Modal>
    </>
  );
}
