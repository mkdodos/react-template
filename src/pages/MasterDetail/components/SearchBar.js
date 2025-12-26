import { useRef, useState } from "react";
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
  Input,
} from "semantic-ui-react";

import CustSelect from "../../../components/dropdown/CustSelect";

export default function SearchBar({ state, dispatch }) {
  // <Dropdown> 沒有提供 ref 屬性, 改用 state
  const [custID, setCustID] = useState("");
  // 選取客戶
  const handleCustChange = (e, { value }) => {
    setCustID(value);
  };

  const workNameRef = useRef();
  const workNoteRef = useRef();
  const size1Ref = useRef();
  const size2Ref = useRef();
  const size3Ref = useRef();
  const quoteIdRef = useRef();
  const caseNoRef = useRef();

  // 查詢
  const handleQuery = () => {
    const workName = workNameRef.current.inputRef.current.value;
    const workNote = workNoteRef.current.inputRef.current.value;
    // <input/> 和 UI 的 Input 取得值寫法不同
    // const size1 = size1Ref.current.value;
    // <Input/>
    const size1 = size1Ref.current.inputRef.current.value;
    const size2 = size2Ref.current.inputRef.current.value;
    const size3 = size3Ref.current.inputRef.current.value;
    const quoteID = quoteIdRef.current.inputRef.current.value;
    const caseNo = caseNoRef.current.inputRef.current.value;

    dispatch({
      type: "LOAD",
      payload: {
        workName,
        workNote,
        size1,
        size2,
        size3,
        custID,
        quoteID,
        caseNo,
      },
    });
  };

  return (
    <>
      {/* {JSON.stringify(state.params)} */}
      <Table basic="very" className="basic" unstackable striped>
        <TableBody>
          <TableRow>
            <TableCell>客戶</TableCell>
            <TableCell>
              <CustSelect
                // value={state.search?.custID}
                onChange={handleCustChange}
              />
            </TableCell>
            <TableCell>案號</TableCell>
            <TableCell>
              <Input type="text" ref={caseNoRef} />
            </TableCell>
            <TableCell>品名</TableCell>
            <TableCell>
              <Input type="text" name="workName" ref={workNameRef} />
            </TableCell>
            <TableCell>加工說明</TableCell>
            <TableCell>
              <Input type="text" ref={workNoteRef} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>尺寸1</TableCell>
            <TableCell>
              <Input type="number" name="size1" ref={size1Ref} />
            </TableCell>

            <TableCell>尺寸2</TableCell>
            <TableCell>
              <Input type="number" ref={size2Ref} />
            </TableCell>
            <TableCell>尺寸3</TableCell>
            <TableCell>
              <Input type="number" ref={size3Ref} />
            </TableCell>
            <TableCell>報價單號</TableCell>
            <TableCell>
              <Input type="text" name="quoteID" ref={quoteIdRef} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan="8">
              <Button
                icon
                color="pink"
                floated="right"
                onClick={handleQuery}              >
                <Icon name="search" /> 查詢
              </Button>
            </TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
