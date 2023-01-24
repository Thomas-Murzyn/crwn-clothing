import { SpinnerOverlay, SpinnerContainer } from "./spinner.style";

import React from "react";

function Spinner() {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
}

export default Spinner;
