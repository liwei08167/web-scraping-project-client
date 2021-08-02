import React, { useState, useEffect } from "react";
import WebsiteInput from "./components/WebsiteInput";

const App = () => {
  const [fetchedData, setFetchedData] = useState("");

  return (
    <div
      style={{
        textAlign: "center",
        height: "auto",
      }}
    >
      <WebsiteInput setFetchedData={setFetchedData} />
    </div>
  );
};

export default App;
