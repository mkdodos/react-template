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

export default function RowView({ row,handleEdit }) {
    console.log(row)
  return (
    <div>
      <Menu>
        <MenuItem>
          <Header>{row?.quoteID}</Header>
        </MenuItem>
        <MenuItem>
          <Header>{row?.custName}</Header>
        </MenuItem>
        {row?.contactor && (
          <MenuItem>
            <Header>{row?.contactor}</Header>
          </MenuItem>
        )}

        {row?.caseNo && (
          <MenuItem>
            <Header>{`案號 : ${row?.caseNo}`}</Header>
          </MenuItem>
        )}
        <MenuItem position="right">
          <Button icon onClick={() => handleEdit(row)}>
            <Icon name="pencil" />
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
