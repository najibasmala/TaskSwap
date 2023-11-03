/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "../styles/main.scss";
import { useObjectArray } from "../context";

interface element {
  id: string;
  text: string;
  status: boolean;
}

interface listOne {
  items: element[];
}
function Box(props: listOne) {
  const [checked, setChecked] = useState<any>([]);
  const { allChecked, addObject, setAllChecked } = useObjectArray();
  //handle checkbox and add task to checked list

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    param1: number
  ) => {
    //const isChecked = event.target.checked;
    console.log("Param1:", param1);
    setChecked(!checked[param1]);
    addObject({ id: param1, checked: true });
  };

  return (
    <>
      {" "}
      <div className="box">
        {props.items.map((item: any, i: any) => {
          return (
            <div className="item" key={i}>
              <div key={i}>
                <label htmlFor={i}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                    checked={
                      (allChecked.length > 0 &&
                        allChecked.find((i) => i.id == item.id)?.checked) ||
                      false
                    }
                    id={i}
                  />
                  <span>{item.text}</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Box;
