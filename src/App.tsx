import { PersonScore } from "./hooks/PersonScore";
import { Checklist } from "./reusableComponents/Checklist/Checklist";
import "./index.css";
import { IdValue } from "./reusableComponents/Checklist/types";
import { useState } from "react";

function App() {
  const [checkedId, setCheckedId] = useState<IdValue | null>(null);

  function handleCheckedIdsChange(newCheckedIds: IdValue[]) {
    const newCheckedIdArr = newCheckedIds.filter((id) => id !== checkedId);
    if (newCheckedIdArr.length === 1) {
      setCheckedId(newCheckedIdArr[0]);
    } else {
      setCheckedId(null);
    }
  }

  return (
    <>
      <PersonScore />
      <Checklist
        data={[
          { id: "1", name: "Lucy", role: "Manager" },
          { id: "2", name: "Ron", role: "Developer" },
        ]}
        id="id"
        primary="name"
        secondary="role"
        style={{
          width: "300px",
          maxHeight: "380px",
          overflowY: "auto",
        }}
        checkedIds={checkedId === null ? [] : [checkedId]}
        onCheckedIdsChange={handleCheckedIdsChange}
        // renderItem={(
        //   //render props
        //   item
        // ) => (
        //   <li
        //     key={item.id}
        //     className="bg-white p-4
        //   border-b-2"
        //   >
        //     <div className="text-xl text-slate-800 pb-1">{item.name}</div>
        //     <div className="text-slate-500">{item.role}</div>
        //   </li>
        // )}
      />
    </>
  );
}
export default App;
