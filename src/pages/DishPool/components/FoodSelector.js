import { useEffect, useState } from "react";
import { Button, Divider, Input } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import DateSelector from "./DateSelector";

export default function FoodSelector({ data, dispatch }) {
  const [assigned, setAssigned] = useState([]);
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
      {/* <Input type="date" value={new Date().toISOString().substring(0, 10)} /> */}
      <Input
        type="date"
        value={dishDate}
        onChange={(e, obj) => setDishDate(obj.value)}
      />
      {/* <DateSelector dishDate={dishDate} setDishDate={setDishDate} /> */}
      <Button color="pink" onClick={handleTrans}>
        新增至 Dishes
      </Button>
    </div>
  );
}
