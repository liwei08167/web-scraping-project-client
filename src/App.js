import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import ResultsComp from "./components/ResultsComp";
import WebsiteInput from "./components/WebsiteInput";

const App = () => {
  const [fetchedData, setFetchedData] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorRes, setErrorRes] = useState("");

  return (
    <div
      style={{
        textAlign: "center",
        height: "auto",
      }}
    >
      <WebsiteInput
        setFetchedData={setFetchedData}
        setUrlValue={setUrlValue}
        setLoading={setLoading}
        setErrorRes={setErrorRes}
      />
      {loading && <CircularProgress size={50} />}
      {errorRes && !loading && "Error..."}
      {fetchedData !== "" && !loading && !errorRes && (
        <ResultsComp fetchedData={fetchedData} urlValue={urlValue} />
      )}
    </div>
  );
};

export default App;
