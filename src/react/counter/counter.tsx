import { useState } from "react";

export default function () {
  const [count, setCount] = useState(0);

  return (
    <div onClick={() => setCount(c => c + 1)}>
      {count}
    </div>
  );
}