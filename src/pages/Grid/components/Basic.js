import { Grid, GridColumn, Image } from "semantic-ui-react";

export default function Basic() {
  return (
    <Grid>
      <GridColumn width={4}>A</GridColumn>
      <GridColumn width={9}>B</GridColumn>
      <GridColumn width={3}>C</GridColumn>
    </Grid>
  );
}
