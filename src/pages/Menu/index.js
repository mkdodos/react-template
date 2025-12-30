import React from "react";
import { Menu, Grid, GridColumn } from "semantic-ui-react";
import Vertical from "./components/Vertical";
import Basic from "./components/Basic";
import DdMenu from "./components/DdMenu";

export default function index() {
  return (
    <div>
      <Grid>
        <GridColumn width={4}>
          <Vertical />
        </GridColumn>
        <GridColumn width={9}>
          <Basic />
        </GridColumn>
       
      </Grid>

      {/* <Basic /> */}
    </div>
  );
}
