import React from "react";

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  React.useEffect(() => {
    function handleChangeWindowSize() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    handleChangeWindowSize();

    window.addEventListener("resize", handleChangeWindowSize);

    return () => window.removeEventListener("resize", handleChangeWindowSize);
  }, [media]);

  return match;
};

export default useMedia;
