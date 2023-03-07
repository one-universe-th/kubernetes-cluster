import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import type GoogleTokenResponse from "@interfaces/GoogleProfile";
import { useNavigate } from "react-router-dom";

export const useGoogleProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<GoogleTokenResponse>();
  const cookies = new Cookies();

  useEffect(() => {
    async function getProfile() {
      const cookie = cookies.get("google_token");
      if (!cookie) return navigate("/");

      const data = await axios
        .get<GoogleTokenResponse>(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${cookie}`
        )
        .then((res) => res.data)
        .catch((err) => {
          navigate("/");
        });

      setProfile(data as GoogleTokenResponse);
      cookies.set("uid", data?.sub, { path: "/" });
    }

    getProfile();
  }, []);

  return { profile };
};
