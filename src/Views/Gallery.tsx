import { useIdentify, useSetDocument, useVeltClient } from "@veltdev/react";
import getUser from "../services/user/user";
import { useEffect } from "react";
import { Pictures } from "./Pictures";

export const Gallery = () => {
  const currentUser = getUser();
  const { client } = useVeltClient();

  // useIdentify(currentUser);
  // useSetDocument("barca-gallery");

  useEffect(() => {
    const initVelt = async () => {
      if (client && currentUser) {
        await client.identify(currentUser);
      }
    };
    initVelt().catch((err) => {
      console.log({ err });
    });
  }, []);

  return <Pictures />;
};
