import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Tree from "./components/Tree";
import { data } from "./components/data";

//functie de download json, pt debug ca sa vad mai usor daca nu actualizeaza date/nu randeaza
const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

function App() {
  const [updatedData, setUpdatedData] = useState(data);

  const handleTreeUpdate = (updatedNode) => {
    console.log("primit din radacina:", updatedNode);

    const updatedTree = JSON.parse(JSON.stringify(updatedData)); // copy la date
    const changesMade = mapNewData(updatedTree, updatedNode); //returnat din mapnewdata

    if (changesMade) {
      console.log("updated tree:", updatedTree);
      setUpdatedData(updatedTree); // actualizez state pt render
    }
  };

  // let mapNewData = (original, updates) => {
  //   let current_org = original;
  //   let current_upd = updates;

  //   let stop = false;

  //   {
  //     if (current_upd.status) {
  //       current_org.status = current_upd.status;
  //     }
  //     if (current_upd.chil) {
  //       for (let c_i in current_upd.chil) {
  //         let child_upd = current_upd.chil[c_i];
  //         for (let o_i in current_org.chil) {
  //           if (current_org.chil[o_i].id === child_upd.id) {
  //             mapNewData(current_org.chil[o_i], child_upd);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  const mapNewData = (original, updates) => {
    let changed = false;

    if (original.id === updates.id) {
      // daca status e diferit, modific
      if (original.status !== updates.status) {
        original.status = updates.status;
        changed = true;
      }

      // daca listele de copii difera, actualizez
      if (JSON.stringify(original.chil) !== JSON.stringify(updates.chil)) {
        original.chil = updates.chil;
        changed = true;
      }
    } else if (original.chil && Array.isArray(original.chil)) {
      for (let child of original.chil) {
        //caut nodul modificat
        if (mapNewData(child, updates)) {
          //recurisv pt fiecare nod
          changed = true;
        }
      }
    }

    return changed; //propag in handleTreeUpdate
  };

  return (
    <div>
      <h1>App Home</h1>
      <Router basename="/home">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <div className="nodes">
          <Tree
            nodeData={updatedData}
            handleUpdate={(updateData) => {
              console.log("updatat de la radacina", updateData);
              handleTreeUpdate(updateData);
            }}
          />
        </div>
        <button onClick={() => downloadJSON(updatedData, "updatedTree.json")}>
          download tree json
        </button>
      </Router>
    </div>
  );
}

export default App;
