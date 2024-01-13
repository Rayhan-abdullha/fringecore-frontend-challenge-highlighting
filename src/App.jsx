import React, { useState } from "react";

const wordSuggestion = ["tomato", "tom cruise", "total", "technology"];

function App() {
  const [state, setState] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [warning, setWarning] = useState(false);

  function search(query) {
    const searchTerms = query.toLowerCase().split(" ");
    const results = searchTerms.map((term) =>
      wordSuggestion.filter((word) => word.toLowerCase().startsWith(term))
    );

    const flattenedResults = results.flat();

    if (flattenedResults.length > 0) {
      setSuggestion(flattenedResults);
    } else {
      setSuggestion([]);
    }
  }

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    if (state.length < 65) {
      setState(inputVal);

      // Split the input into words
      const words = inputVal.toLowerCase().split(" ");
      const lastWord = words[words.length - 1];

      // Check if the last word starts with "t"
      if (lastWord.startsWith("t")) {
        search(lastWord);
      } else {
        setSuggestion([]);
      }

      setSelectedSuggestion(null);
      setWarning(false);
    } else {
      setWarning(true);
      setState(inputVal);
    }
  };

  const handleSuggestionClick = (selectedItem, index) => {
    let str = "";
    for (let i = state.length - 1; i > 0; i--) {
      if (state[i] === " " || state[i] === ",") {
        for (let j = 0; j < i; j++) {
          const element = state[j];
          str += element;
        }
        setState(str + " " + selectedItem);
        setSuggestion([]);
        setSelectedSuggestion(index);
        break;
      }
    }
  };

  const highlightTomato = () => {
    const words = state.split(" ");
    return words.map((word, index) => {
      if (word.toLowerCase() === "tomato") {
        return (
          <span key={index} style={{ color: "red" }}>
            {" "}
            {word}{" "}
          </span>
        );
      } else {
        return <span key={index}> {word}</span>;
      }
    });
  };

  return (
    <div className="flex h-[100vh] flex-col justify-center items-center">
      <h2 className="text-[30px] mb-3 font-bold">Syntax Highlighting</h2>
      <div className="search-input relative">
        <input
          onChange={handleInputChange}
          className="shadow-md py-2 px-4 w-[300px] border-[2px] border-gray-500"
          type="text"
          value={state}
        />
        {state.length <= 32 && (
          <div className="highlighted-text mt-2 absolute top-[2px] left-[18px]">
            {highlightTomato()}
          </div>
        )}
      </div>

      <div
        className="suggestion shadow-xl p-2"
        id="suggestion-list"
        role="listbox"
      >
        <ul className="">
          {suggestion.map((item, index) => (
            <li
              key={item}
              role="option"
              className={`cursor-pointer ${
                index === selectedSuggestion ? "selected" : ""
              }`}
              onClick={() => handleSuggestionClick(item, index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      {warning && (
        <div className="warning text-red-500">Input size is to Long!</div>
      )}
    </div>
  );
}
export default App;
