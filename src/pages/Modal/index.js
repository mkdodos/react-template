import { useState } from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";

export default function index() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <ModalHeader>ModalHeader</ModalHeader>
      <ModalContent >        
        <ModalDescription>
          <Header>標題</Header>
          <p>
            段落文字
          </p>          
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
  );
}
