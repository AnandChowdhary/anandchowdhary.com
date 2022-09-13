import { useState, useEffect } from "preact/hooks";

export default function TimeAgo() {
  const [liveAge, setLiveAge] = useState(
    (Date.now() - new Date("1997-12-29").getTime()) / 31536000000
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveAge((Date.now() - new Date("1997-12-29").getTime()) / 31536000000);
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <span>
      <strong className="font-medium">{Math.floor(liveAge)}</strong>
      {"."}
      {liveAge.toFixed(8).split(".")[1]}
    </span>
  );
}
