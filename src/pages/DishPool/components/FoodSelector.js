import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  FormField,
  FormGroup,
  Input,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import DateSelector from "./DateSelector";

export default function FoodSelector({ data, dispatch }) {
  // 已選取
  const [assigned, setAssigned] = useState([]);
  // 待選取
  const [unassigned, setUnassigned] = useState([]);

  const [dishDate, setDishDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const handleClick = (obj) => {
    setAssigned([...assigned, obj]);
    setUnassigned(unassigned.filter((row) => row.id !== obj.id));
  };

  const handleUnClick = (obj) => {
    setUnassigned([...unassigned, obj]);
    setAssigned(assigned.filter((row) => row.id !== obj.id));
  };

  // 新增 Dishes , 刪除 DishPool
  const handleTrans = () => {
    //
    setAssigned([]);
    dispatch({ type: "TRANS", payload: { assigned, dishDate } });
  };

  useEffect(() => {
    setUnassigned(data);
  }, [data]);

  return (
    <div>
      {unassigned.map((obj) => {
        return (
          <Button basic onClick={() => handleClick(obj)} key={uuidv4()}>
            {obj.name}
          </Button>
        );
      })}
      <Divider />
      {assigned.map((obj) => {
        return (
          <Button onClick={() => handleUnClick(obj)} key={uuidv4()}>
            {obj.name}
          </Button>
        );
      })}
      <Divider />
      {/* <Input type="date" value={new Date().toISOString().substring(0, 10)} /> */}
      <Form>
        <FormGroup>
          <FormField>
            <Input
              type="date"
              value={dishDate}
              onChange={(e, obj) => setDishDate(obj.value)}
            />
          </FormField>
          <FormField>
            <Button color="pink" onClick={handleTrans}>
              新增至 Dishes
            </Button>
          </FormField>
        </FormGroup>
      </Form>

      {/* <Divider /> */}
      {/* <DateSelector dishDate={dishDate} setDishDate={setDishDate} /> */}
    </div>
  );
}
