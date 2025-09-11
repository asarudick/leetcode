import { useState, useMemo } from "react";

function Filter ({ users, filter }: { users: string[], filter: string }) {
  const results = useMemo(() => users.filter(s => s.toLowerCase().includes(filter.toLowerCase())), [users, filter]);
  return (
    results.map(r =>
      <li>
        {r}
      </li>
    )
  );
} 

export default function () {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <Filter users={["John", "Asa", "Wendy", "James", "Natalie", "Emily", "Archie"]} filter={value} />
    </>
  )
}