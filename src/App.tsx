import React, { useEffect } from 'react';

// The explorer has one shell. Keep historical Academy modules out of its bundle.
export default function App() {
  useEffect(() => { window.location.replace('/studio/' + window.location.hash); }, []);
  return <main><p>Opening your exploratory workspace…</p><a href="/studio/">Open Assured Explorer</a></main>;
}
