import React, { useRef, useEffect, useCallback, useState } from "react";

export const MixcloudPlayer2: React.FC = () => {
  const timer = useRef<any>(null);

  const [shows, setShows] = useState([
    {
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-65-deepness/",
    },
    {
      url: "https://www.mixcloud.com/rymixxx/adventures-in-decent-music-volume-26/",
    },
    {
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-77/",
    },
    {
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-75/",
    },
    {
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-74/",
    },
  ]);
  const [player, setPlayer] = useState();

  const [showIndex, setShowIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
      script.async = true;
      document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      const widget = (window as any).Mixcloud.PlayerWidget(iframeRef.current);

      widget.ready.then(() => {
        console.log("widget ready");
        setPlayer(widget);
        widget.pause();
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    player?.pause();
    timer.current = setTimeout(() => {
      setShowIndex(showIndex + 1);
    }, 200);
  }, [player, showIndex]);

  const togglePlay = useCallback(() => {
    player?.togglePlay();
  }, [player]);

  return (
    <>
      <iframe
        title="mixcloud-widget"
        ref={iframeRef}
        width="100%"
        height="60"
        allow="autoplay"
        src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=true&feed=${encodeURIComponent(
          shows[showIndex]?.url
        )}`}
        frameBorder="0"
      />
      <button onClick={handleNext}>handleNext</button>
      <button onClick={togglePlay}>togglePlay</button>
    </>
  );
};
