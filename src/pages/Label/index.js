import { Label, LabelGroup } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

export default function index({ data }) {
  return (
    <LabelGroup >
      {data.map((obj) => (
        <Label key={uuidv4()}>{obj.name}</Label>
      ))}
    </LabelGroup>
    //    <div><Label>{data[0].name}</Label></div>
  );
}
