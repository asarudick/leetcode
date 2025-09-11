import { useState } from "react";

export default function () {
  const [value, setValue] = useState("");
  return (
    <>
      <input type="button" value="Uppercase" onClick={e => setValue(text => text.toUpperCase())} />
      <input type="button" value="Clear" onClick={e => setValue("")} />
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </>
  );
}