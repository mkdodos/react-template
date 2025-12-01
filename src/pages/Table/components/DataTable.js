import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Label,
  Rating,
  Header,
  HeaderContent,
  HeaderSubheader,
  Button,
  Icon,
} from "semantic-ui-react";

export default function DataTable() {
  const data = [
    {
      name: "馬克",
    },
    {
      name: "宜君",
    },
    {
      name: "愷軒",
    },
    {
      name: "欣妤",
    },
  ];
  return (
    <>
      <Table>
        <TableHeader>
          <TableHeaderCell>姓名</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data.map((obj) => (
            <TableRow>
              <TableCell>{obj.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
