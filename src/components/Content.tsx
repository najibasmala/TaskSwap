import { useState, useEffect } from "react";
import Button from "./Button";
import Box from "./Box";
import { useObjectArray } from "../context";
import "../styles/main.scss";

//this component contains the tow boxes and buttons,

function Content() {
  //list of tasks
  //priority 1 > priority 2
  const [listone, setListone] = useState<any>([
    { id: 1, text: "task 1", priority: 1 },
    { id: 2, text: "task 2", priority: 2 },
    { id: 3, text: "task 3", priority: 3 },
    { id: 4, text: "task 4", priority: 4 },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listtwo, setListTow] = useState<any>([
    { id: 5, text: "task 5", priority: 5 },
    { id: 6, text: "task 6", priority: 6 },
    { id: 7, text: "task 7", priority: 7 },
    { id: 8, text: "task 8", priority: 8 },
  ]);
  const [checked, setChecked] = useState<any>([]);
  //get checked values from context
  const { allChecked, setAllChecked } = useObjectArray();

  //search states
  const [searchone, setSearchOne] = useState<string>("");
  const [searchtwo, setSearchTwo] = useState<string>("");

  // search functionality:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = (list: Array<any>, searchinput: string) => {
    const searchListOneResults = [...list].filter((item) =>
      item.text.toLowerCase().includes(searchinput.toLowerCase())
    );
    return searchListOneResults;
  };

  //move checked tasks to the right side with click button
  const moveObjectsToRight = (objectIds: number[]) => {
    //get list of checked taks
    const objectsToMove = listone.filter((obj) => objectIds.includes(obj.id));

    if (objectsToMove.length > 0) {
      // Remove the objects from the sourceArray
      const updatedSourceArray = listone.filter(
        (obj) => !objectIds.includes(obj.id)
      );
      //update list one
      setListone(updatedSourceArray);
      const combinedData = [...listtwo, ...objectsToMove];
      // Add the objects to the destinationArray and sort them with priority

      setListTow(combinedData.sort((a, b) => a.priority - b.priority));
      const filteredDataRight = allChecked.filter((secondItem) =>
        listone.some((initialItem) => initialItem.id == secondItem.id)
      );
      const upd = allChecked.filter((item1) => {
        // Check if there is no item in array2 with the same id as item1
        return !filteredDataRight.some((item2) => item1.id === item2.id);
      });

      setAllChecked(upd);
    }
  };
  //move taks to left with click button

  const moveObjectsToLeft = (objectIds: number[]) => {
    const objectsToMove = listtwo.filter((obj) => objectIds.includes(obj.id));
    if (objectsToMove.length > 0) {
      // Remove the objects from the sourceArray
      const updatedSourceArray = listtwo.filter(
        (obj) => !objectIds.includes(obj.id)
      );
      setListTow(updatedSourceArray);
      const combinedData = [...listone, ...objectsToMove];
      // Add the objects to the destinationArray and sort them with priority
      setListone(combinedData.sort((a, b) => a.priority - b.priority));
      const filteredDataLeft = allChecked.filter((secondItem) =>
        listtwo.some((initialItem) => initialItem.id === secondItem.id)
      );
      const upd = allChecked.filter((item1) => {
        // Check if there is no item in array2 with the same id as item1
        return !filteredDataLeft.some((item2) => item1.id === item2.id);
      });

      setAllChecked(upd);
    }
  };
  useEffect(() => {
    // Use map to extract the IDs from the array of objects
    const ids = allChecked.map((obj) => obj.id);
    setChecked(ids);
  }, [allChecked]);

  return (
    <>
      <div className="container">
        <div className="searchs">
          <div className="search">
            {" "}
            <label>Search task from list 1</label>
            <input
              type="text"
              placeholder="Search task"
              value={searchone}
              onChange={(e) => setSearchOne(e.target.value)}
            />
          </div>
          <div className="search">
            <label>Search task from list 2</label>
            <input
              type="text"
              placeholder="Search task "
              value={searchtwo}
              onChange={(e) => setSearchTwo(e.target.value)}
            />
          </div>
        </div>
        <div className="boxes">
          <Box items={search(listone, searchone)} />
          <div className="buttons">
            <Button
              rotate={false}
              handleClick={() => moveObjectsToRight(checked)}
            />
            <Button
              rotate={true}
              handleClick={() => moveObjectsToLeft(checked)}
            />
          </div>
          <Box items={search(listtwo, searchtwo)} />
        </div>
      </div>
    </>
  );
}

export default Content;
