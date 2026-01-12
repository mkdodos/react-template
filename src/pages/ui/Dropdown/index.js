import { Dropdown } from "semantic-ui-react";

export default function index() {
  const options = [
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
      clearable
      selection
      search
      // placeholder="選擇客戶"
      options={options}
      // fluid
    />
  );
}
