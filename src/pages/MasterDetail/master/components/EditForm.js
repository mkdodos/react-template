import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Modal,
} from "semantic-ui-react";

export default function EditForm({ open, setOpen, data,state,dispatch }) {
  console.log(open);
  return (
    <div>
      <Modal
        onClose={() => dispatch({type:"CLOSE_EDITFORM"})}
        // onOpen={() => setOpen(true)}
        open={state.isEditFormOpen}
        // trigger={<Button>Show Modal</Button>}
      >
        <ModalHeader>
          <Header>{data?.quoteID}</Header>
        </ModalHeader>
        <ModalContent>
          <ModalDescription>
             <Header>{data?.custName}</Header>
              <Header>{data?.contactor}</Header>
            <p>段落文字</p>
          </ModalDescription>
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
    </div>
  );
}
