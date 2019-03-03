import React from "react";

const styles = {
  display: "flex",
  justifyContent: "flex-end"
};
const Navigation = props => {
  return (
    <nav style={styles}>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => props.onRouteChange("signin")}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
