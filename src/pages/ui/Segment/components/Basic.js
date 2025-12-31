import {
  Segment,
  SegmentGroup,
  Button,
  Label,
  Divider,
  Icon,
} from "semantic-ui-react";

export default function Basic() {
  return (
    <>
      <SegmentGroup horizontal>
        <Segment>花生</Segment>
        <Segment>蛋花</Segment>
      </SegmentGroup>
      <SegmentGroup horizontal>
        <Segment>咖啡</Segment>
        <Segment>土司</Segment>
      </SegmentGroup>
    </>
  );
}
