import React, { useState } from "react";
import ResultsComp from "./components/ResultsComp";
import WebsiteInput from "./components/WebsiteInput";

const App = () => {
  const [fetchedData, setFetchedData] = useState("");
  const [urlValue, setUrlValue] = useState("");
  return (
    <div
      style={{
        textAlign: "center",
        height: "auto",
        // textTransform: "capitalize",
      }}
    >
      <WebsiteInput setFetchedData={setFetchedData} setUrlValue={setUrlValue} />
      <ResultsComp fetchedData={fetchedData} urlValue={urlValue} />
    </div>
  );
};

export default App;
