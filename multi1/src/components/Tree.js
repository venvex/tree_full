import React, { useEffect } from "react";
import "../index.css";
import { useState } from "react";

const Tree = React.memo(({ nodeData, handleUpdate, parentNode }) => {
  let [status, setStatus] = useState(nodeData.status);
  //let [children, setChildren] = useState(nodeData.chil);

  useEffect(() => {
    setStatus(nodeData.status);
    //setChildren(nodeData.chil);
  }, [nodeData.status]);

  const handleStatusChange = (newStatus) => {
    //doar daca exista status nou
    if (newStatus !== status) {
      setStatus(newStatus); //
    }
  };

  useEffect(() => {
    //handleStatusChange(nodeData.status)
    handleUpdate({ id: nodeData.id, status, chil: nodeData.chil });
  }, [status, nodeData.chil, nodeData.id, handleUpdate]);

  // const internalHandleUpdate = (childData) => {
  //   const updatedChildren = nodeData.chil.map((child) =>
  //     child.id === childData.id ? childData : child
  //   );
  //   setChildren(updatedChildren);
  // };

  const handleAddChild = () => {
    const newChild = {
      id: Date.now(), // de facut altfel
      status: "active",
      chil: [],
    };

    const updatedNode = {
      //nodul nou adaugt in lista
      ...nodeData,
      chil: [...nodeData.chil, newChild],
    };

    console.log("copil nou creat", updatedNode);
    handleUpdate(updatedNode); // propag
  };

  const handleDelete = () => {
    if (parentNode && parentNode.chil) {
      // pot sterge daca nu are copii
      if (nodeData.chil && nodeData.chil.length === 0) {
        // elimin nodul dupa id
        const updatedChildren = parentNode.chil.filter(
          (child) => child.id !== nodeData.id
        );

        // creez parinte nou cu lista de copii actuala
        const updatedParent = {
          ...parentNode,
          chil: updatedChildren,
        };

        // trigger la re-render
        handleUpdate(updatedParent);
      }
    }
  };

  return (
    <div className="node">
      <div className="cerc">
        {nodeData.id}
        <input
          type="text"
          value={status}
          onInput={(event) => {
            handleStatusChange(event.target.value);
          }}
        />
        <button onClick={() => handleStatusChange("running")}>Play</button>

        {nodeData.chil &&
          nodeData.chil.length === 0 && ( //afisez delete daca nu are copii
            <button onClick={handleDelete}>-</button>
          )}
        <div>{nodeData.status}</div>
      </div>
      {/* {nodeData.chil && nodeData.chil.length > 0 && (  */}{" "}
      {/*afisez div gol pentru button de add, de vazut*/}
      <div className="children">
        {nodeData.chil.map((chil) => (
          <Tree
            key={chil.id}
            nodeData={chil}
            handleUpdate={handleUpdate}
            parentNode={nodeData}
          /> //pasez si nodul parinte ca sa sterg copil
        ))}
        <div className="addChildButton">
          <button onClick={handleAddChild}>+</button>{" "}
          {/*apelez functia dupa randare*/}
        </div>
      </div>
    </div>
  );
});

export default Tree;
