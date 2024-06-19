import { useState } from "react";
import * as Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

import "./Blocks/dom";
import "./Blocks/cyf";
import "./Blocks/customBlock";
import useBlockly from "./Blockly/useBlockly";
import { toolbox } from "./Data/toolbox";

import "./styles.css";

Blockly.setLocale(locale);

export default function App() {
  
  const { BlocklyComponent, generate, exportToJSON, importFromJSON } =
    useBlockly({
      // initialBlock: {
      // kind: "controls_switch_case",
      // extraState: {
      //   casesCount: 1,
      //   hasDefault: false,
      // },
      // x: 100,
      // y: 100,
      // },
      toolbox: toolbox,
    });
  const [generated, setGenerated] = useState("");

  function handleGenerate() {
    setGenerated(generate());
  }
   function handleExportJSON() {
     exportToJSON();
   }
   function handleImportJSON(event) {
     const file = event.target.files[0];
     const reader = new FileReader();
     reader.onload = function (event) {
       const json = JSON.parse(event.target.result);
       importFromJSON(json);
     };
     reader.readAsText(file);
   }
  return (
    <div className="page">
      <h1 className="title">Blockly tester</h1>

      <div className="blockly-wrapper">
        <BlocklyComponent />
      </div>

      <div className="output">
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleExportJSON}>Export JSON</button>
        <input type="file" accept=".json" onChange={handleImportJSON} />
        <textarea
          id="code"
          style={{ height: "100%", width: "400px" }}
          value={generated}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}
