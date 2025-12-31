import {
  FormField,
  Button,
  Checkbox,
  Form,
  FormGroup,
} from "semantic-ui-react";
export default function Basic() {
  return (
    <Form>
      <FormGroup>
        <FormField inline>
          <label>First Name</label>
          <input placeholder="First Name" />
        </FormField>
        <FormField inline>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </FormField>
      </FormGroup>      
    </Form>
  );
}
