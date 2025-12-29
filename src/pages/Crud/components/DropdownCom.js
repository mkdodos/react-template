import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import {v4 as uuidv4} from "uuid"

export default function DropdownCom({ state,onChange,value }) {
  //   const [options, setOptions] = useState([]);
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = () => {
  //     setOptions(
  //       state.data.map((obj) => {
  //         return {
  //           key: obj.workName,
  //           text: obj.workName,
  //           value: obj.workName,
  //         };
  //       })
  //     );
  //   };

  console.log(state);
  let options = state.data.map((obj) => {
    return {
      key: uuidv4(),
      text: obj.workName,
      value: obj.workName,
    };
  });

  const handleAddition = (e, { value }) => {
    options.push({ text: value, key: value,value });
    // this.setState((prevState) => ({
    //   options: [{ text: value, value }, ...prevState.options],
    // }))
  };

  const options2 = [
    {
      key: "Jenny Hess",
      text: "Jenny Hess",
      value: "Jenny Hess",
    },
    {
      key: "Elliot Fu",
      text: "Elliot Fu",
      value: "Elliot Fu",
    },
    {
      key: "Stevie Feliciano",
      text: "Stevie Feliciano",
      value: "Stevie Feliciano",
    },
  ];

  return (
    <Dropdown
      onAddItem={handleAddition}
      allowAdditions
      clearable
      selection
      search
      onChange={onChange}
      value={value}
      options={options}
    />
  );
}
