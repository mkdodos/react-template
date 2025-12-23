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
  showMasterForm,
}) {
   console.log(state)
  //  return
  const { dataDetail, loading, isDetailViewOpen,dataMasterRow } = state;
  // 篩選可顯示欄位
  // columns = columns.filter((col) => col.viewable);
  // return
  const editMaster = (quoteID) => {
    console.log(quoteID);
    showMasterForm();
  };

  // console.log(dataDetail[0])
  return (
    <Modal
      size="large"
      onClose={() => dispatch({ type: "CLOSE_DETAILVIEW" })}
      open={isDetailViewOpen}
    >
      <ModalHeader>
        <Master state={state}  data={dataMasterRow} dispatch={dispatch} />
      </ModalHeader>
      <ModalContent>
        <Detail data={dataDetail} dispatch={dispatch} state={state}  />
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
