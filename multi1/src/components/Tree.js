import React, { useEffect } from "react";
import "../index.css";
import { useState } from "react";

const fetchDropdown = () => {
  //simulez fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["inactive", "active", "running", "paused"]);
    }, 500);
  });
};

const Tree = React.memo(({ nodeData, handleUpdate, parentNode }) => {
  let [status, setStatus] = useState(nodeData.status);
  //let [children, setChildren] = useState(nodeData.chil);
  const [options, setOptions] = useState([]);

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "paused":
        return "status-paused";
      case "inactive":
        return "status-inactive";
      default:
        return "";
    }
  };

  useEffect(() => {
    setStatus(nodeData.status);
    //setChildren(nodeData.chil);
  }, [nodeData.status]);

  useEffect(() => {
    fetchDropdown().then((fetchedOptions) => {
      setOptions(fetchedOptions);
    });
  }, []);

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
        <div className={getStatusClass(nodeData.status)}>{nodeData.status}</div>{" "}
        {options.length > 0 ? (
          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div>Loading options..</div>
        )}
        {/* <input
          type="text"
          value={status}
          onInput={(event) => {
            handleStatusChange(event.target.value);
          }}
        /> */}
        {/* <button onClick={() => handleStatusChange("running")}>Play</button> */}
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
          <div className="tree-container">
            <Tree
              key={chil.id}
              nodeData={chil}
              handleUpdate={handleUpdate}
              parentNode={nodeData}
            />
          </div>
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
