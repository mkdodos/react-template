import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

export default function DishSelector({ onAddItem, onChange, value, options }) {
  return (
    <Dropdown
      onAddItem={onAddItem}
      allowAdditions
      clearable
      selection
      search
      onChange={onChange}
      value={value}
      options={options}
      placeholder="菜名"
    />
  );
}
