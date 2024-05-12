import React, { useRef, useEffect, useCallback, useState } from "react";

type MixcloudPlayerProps = {
  autoPlay?: boolean;
  children?: React.ReactNode;
  listIndex?: number;
  showsData?: ShowsDataType;
  url?: string;
};

type ShowsDataType = {
  label?: string;
  shows?: ShowItemType[];
};

type ShowItemType = {
  url: string;
  key: string;
};

export const MixcloudPlayer: React.FC<MixcloudPlayerProps> = (props) => {
  const { autoPlay = true, url, showsData, listIndex = 0, children } = props;

  const timer = useRef<any>(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [shows, setShows] = useState([
    {
      key: "/rymixxx/my-pair-of-shoes-volume-65-deepness/",
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-65-deepness/",
    },
    {
      key: "/rymixxx/adventures-in-decent-music-volume-26/",
      url: "https://www.mixcloud.com/rymixxx/adventures-in-decent-music-volume-26/",
    },
    {
      key: "/rymixxx/my-pair-of-shoes-volume-77/",
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-77/",
    },
    {
      key: "/rymixxx/my-pair-of-shoes-volume-75/",
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-75/",
    },
    {
      key: "/rymixxx/my-pair-of-shoes-volume-74/",
      url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-74/",
    },
  ]);
  const [player, setPlayer] = useState();

  const [showIndex, setShowIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (iframeRef.current && scriptLoaded) {
      const widget = (window as any).Mixcloud.PlayerWidget(iframeRef.current);

      widget.ready.then(() => {
        console.log("widget ready");
        setPlayer(widget);
        widget.pause();
      });
    }
  }, [scriptLoaded]);

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
        src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=${autoPlay}&feed=${encodeURIComponent(
          shows[showIndex]?.url
        )}`}
        frameBorder="0"
      />
      <button onClick={handleNext}>handleNext</button>
      <button onClick={togglePlay}>togglePlay</button>
    </>
  );
};
