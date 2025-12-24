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

export default function AddForm({ row,setRow, setOpen, state, dispatch }) {
  
  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };
  const handleCustChange = (e, { value }) => {    
    setRow({ ...row, custID: value, custName: e.target.innerText });
  };
  const save = () => {
    dispatch({ type: "CREATE_MASTER", payload: { row } });
  };
  return (
    <div>
      <Modal
        // onClose={() => dispatch({ type: "CLOSE_MASTERADDFORM" })}
        open={state.isMasterAddFormOpen}       
      >
        <ModalHeader>
          <Header>新增報價</Header>
        </ModalHeader>
        <ModalContent>
          <Table definition>
            <TableBody>
              <TableRow>
                <TableCell width={4}>客戶</TableCell>
                <TableCell colSpan="3">
                  <CustSelect onChange={handleCustChange} value={row?.custID} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={4}>聯絡人</TableCell>
                <TableCell colSpan="3">
                  <Input
                    onChange={handleInputChange}
                    value={row?.contactor}
                    type="text"
                    name="contactor"
                    fluid
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={4}>案號</TableCell>
                <TableCell colSpan="3">
                  <Input
                    onChange={handleInputChange}
                    value={row?.caseNo}
                    type="text"
                    name="caseNo"
                    fluid
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ModalContent>
        <ModalActions>
          <Button
            floated="left"
            color="black"
            onClick={() => dispatch({ type: "CLOSE_MASTERADDFORM" })}
          >
            取消
          </Button>
          <Button
            content="儲存"          
            onClick={save}
            positive
          />
        </ModalActions>
      </Modal>
    </div>
  );
}
