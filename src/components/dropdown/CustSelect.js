import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import { API_HOST } from "../../global/constants";

export default function CustSelect({ onChange, value }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `${API_HOST}/customer/read.php`;

    axios.get(url).then(function (res) {
      const temp = res.data.map((obj) => {
        return {
          key: obj.id,
          text: obj.custName,
          // value: obj.custName,
          value: obj.id,
        };
      });

      setOptions(temp);
    });
  };

  return (
    <Dropdown      
      clearable
      selection
      search
      placeholder="選擇客戶"
      options={options}
      onChange={onChange}
      value={value}
      // fluid
      // inline
    />
  );
}
