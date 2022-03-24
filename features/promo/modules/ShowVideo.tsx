import React, { useEffect, useState } from "react";

import { Play } from "../../../components";
import { useAuth } from "../../../lib/auth.hook";
import { useUserContext } from "../../../context/userContext";

const ShowVideo = () => {
  const { token } = useAuth();
  const { setUserState, userState } = useUserContext();
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const videoURL = "https://www.youtube.com/embed/nGIj4YyV_WQ";

  useEffect(() => {
    if (showVideo) {
      const body = {
        profile: { show_offer_video: false },
      };
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(body),
      };
      const PlayOff = async () => {
        const res = await fetch(
          `${process.env.API_URL}/api/v1/rest-auth/user/`,
          requestOptions
        );
        if (res.status === 200) return null;
      };
      setTimeout(() => PlayOff(), 3000);
    }
  }, [showVideo]);

  return (
    <>
      {userState && (
        <Play
          // openState={user?.profile?.show_offer_video}
          openState={false}
          videoURL={videoURL}
          header={"Промо предложение"}
        />
      )}
    </>
  );
};

export default ShowVideo;
