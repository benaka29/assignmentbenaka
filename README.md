// Debounce Implementation in react


import React, { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500); // delay of 500ms

    return () => {
      clearTimeout(handler); 
    };
  }, [search]);

  useEffect(() => {
    if (debouncedValue) {
      console.log("API call for:", debouncedValue);
      // Call your API or perform action here
    }
  }, [debouncedValue]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Debounce Example</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>Search Value: {search}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export default App;
