import { useEffect, useState } from "react";
import { MixcloudPlayer } from "./MixcloudPlayer/MixcloudPlayer.tsx";

function App() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl("https://www.mixcloud.com/rymixxx/adventures-in-decent-music-volume-26/");
  }, []);

  return <MixcloudPlayer url={url} />;
}

export default App;
