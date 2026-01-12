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
} from "semantic-ui-react";

import CustSelect from "../../../../components/dropdown/CustSelect";

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
  return (
    <div>
      <Modal
        onClose={() => dispatch({ type: "CLOSE_MASTERADDFORM" })}
        open={state.isMasterAddFormOpen}
      >
        <ModalHeader>
          <Header>新增</Header>
          {/* <Header>新增{state.masterID}</Header> */}
          {/* {JSON.stringify(state)} */}
        </ModalHeader>
        <ModalContent>
          <Table definition>
            <TableBody>
              <TableRow>
                <TableCell width={4}>日期</TableCell>

                <TableCell>
                  <Input
                    onChange={handleInputChange}
                    value={row?.date}
                    type="date"
                    name="date"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={4}>時段</TableCell>
                <TableCell>
                  <Input
                    onChange={handleInputChange}
                    value={row?.section}
                    type="text"
                    name="section"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ModalContent>
        <ModalActions>
          <Button
            floated="left"
            color="red"
            onClick={() =>
              dispatch({ type: "DELETE_MASTER", payload: { id: row.id } })
            }
          >
            刪除
          </Button>
          <Button content="儲存" onClick={save} positive />
        </ModalActions>
      </Modal>
    </div>
  );
}
