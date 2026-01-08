import { FormField, Form, FormGroup } from "semantic-ui-react";

import DishSelector from "./DishSelector";
import CateSelector from "./CateSelector";
import Print from "./Print";

export default function SearchBar({ state, dispatch,columns }) {
  const handleChange = (e, { value }) => {
    dispatch({ type: "LOAD", params: { dish: value } });
  };

  const handleCateChange = (e, { value }) => {
    dispatch({ type: "LOAD", params: { cate: value } });
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <FormField inline>
            <label>菜名</label>
            <DishSelector onChange={handleChange} options={state.options} />
          </FormField>
          <FormField inline>
            <Print data={state.data} columns={columns} />
          </FormField>
          {/* <FormField inline>
            <label>類別</label>
            <CateSelector onChange={handleCateChange} options={state.cates} />
          </FormField> */}
        </FormGroup>
      </Form>
    </div>
  );
}
