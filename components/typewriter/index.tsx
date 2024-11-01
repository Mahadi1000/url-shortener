"use client";

import Typewriter from "typewriter-effect";

const TypeWriter = () => {
  return (
    <div>
      <Typewriter
        options={{
          strings: [
            "Url-Shortener",
            "Shorten Long Urls",
            "Share Links",
            "Track Clicks",
            "Save Usefull Links",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TypeWriter;
