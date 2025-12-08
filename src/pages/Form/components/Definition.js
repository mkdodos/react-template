import {
  FormField,
  Button,
  Checkbox,
  Form,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Input,
} from "semantic-ui-react";
export default function Basic() {
  return (
    <Table definition>
      <TableBody>
        <TableRow>
          <TableCell width={4} >品名</TableCell>
          <TableCell colSpan="3">
            <Input type="text" name="workName" fluid />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={4}>加工說明</TableCell>
          <TableCell colSpan="3">
            <Input type="text" name="workNote" fluid />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell width={4}>尺寸</TableCell>
          <TableCell width={5}>
            <Input label="Φ" name="size1" fluid placeholder="外徑" />
          </TableCell>
          <TableCell>
            <Input name="size2" fluid placeholder="長度" />
          </TableCell>
          <TableCell>
            <Input name="size3" fluid placeholder="總長" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
