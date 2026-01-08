import { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

import Print from "./Print";

export default function DataTable() {
  // 目前排序欄位
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState("ascending");
  const [data, setData] = useState([
    {
      name: "馬克",
      score: 1,
    },
    {
      name: "宜君",
      score: 30,
    },
    {
      name: "愷軒",
      score: 4,
    },
    {
      name: "欣妤",
      score: 2,
    },
  ]);

  const sortData = (actionColumn) => {
    // 同一欄位反向排序
    if (column == actionColumn) {
      setData(data.slice().reverse());
      // 改變箭頭圖示
      setDirection(direction == "descending" ? "ascending" : "descending");
    } else {
      // 不同欄位順向排序
      setData(
        data
          .slice()
          .sort((a, b) => (a[actionColumn] > b[actionColumn] ? 1 : -1))
      );
      setDirection("ascending");
      setColumn(actionColumn);
    }
  };

  return (
    <>
      <Print data={data}/>
      <Table sortable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              width={2}
              onClick={() => sortData("name")}
              sorted={column == "name" ? direction : null}
            >
              姓名
            </TableHeaderCell>
            <TableHeaderCell
              width={2}
              onClick={() => sortData("score")}
              sorted={column == "score" ? direction : null}
            >
              分數
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((obj) => (
            <TableRow key={uuidv4()}>
              <TableCell>{obj.name}</TableCell>
              <TableCell>{obj.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
