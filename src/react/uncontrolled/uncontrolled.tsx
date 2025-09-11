import { useState, useRef, FormEvent } from "react";

export default function () {
  const ref = useRef<HTMLInputElement>(null);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(ref.current?.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input ref={ref} />
      <button type="submit">Go</button>
    </form>
  );
}