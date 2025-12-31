import { Form, Button, Modal, Dropdown } from "semantic-ui-react";
import DishSelector from "./DishSelector";
import CateSelector from "./CateSelector";

export default function EditForm({ columns, state, dispatch, row, setRow }) {
  // console.log(state);
  // 篩選可編輯欄位
  columns = columns.filter((col) => col.editable);
  // 組合每一列 group
  const formGroups = (columnsPerRow) => {
    const groups = [];
    for (let i = 0; i < columns.length; i++) {
      if (i % columnsPerRow == 0)
        groups.push(
          <Form.Group widths={columnsPerRow} key={i}>
            {formFields(i, columnsPerRow)}
          </Form.Group>
        );
    }
    return groups;
  };

  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  // 設定下拉選項的值
  const handleDishChange = (e, { value }) => {
    setRow({ ...row, dish: value });
  };

  const handleCateChange = (e, { value }) => {
    setRow({ ...row, cate: value });
  };

  // 新增下拉選項 onAddItem
  const handleAddition = (e, { value }) => {
    dispatch({ type: "ADD_OPTION", value });
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      // 依不同欄位顯示不同輸入控制項
      switch (col.dataKey) {
        case "dish":
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <DishSelector
                onAddItem={handleAddition}
                options={state.options}
                value={row.dish}
                onChange={handleDishChange}
              />
            </Form.Field>
          );
          return;

        case "cate":
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <CateSelector
                onAddItem={handleAddition}
                options={state.cates}
                value={row.cate}
                onChange={handleCateChange}
              />
            </Form.Field>
          );
          return;

        default:
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <input
                type={col.type}
                name={col.dataKey}
                value={row[col.dataKey]}
                onChange={handleInputChange}
              />
            </Form.Field>
          );
      }
    });
    return fields;
  };

  return (
    <>
      <Modal
        onClose={() => dispatch({ type: "CLOSE_EDITFORM" })}
        open={state.isEditFormOpen}
        closeIcon
      >
        <Modal.Header>編輯</Modal.Header>
        <Modal.Content>
          <Form>{formGroups(2)}</Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() =>
              dispatch({
                type: state.editedRowIndex == -1 ? "CREATE" : "UPDATE",
                payload: { row },
              })
            }
          >
            儲存
          </Button>
          <Button
            floated="left"
            color="red"
            onClick={() => {
              if (!confirm("確定刪除嗎?")) return;
              dispatch({ type: "DELETE", payload: { id: row.id } });
            }}
          >
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
