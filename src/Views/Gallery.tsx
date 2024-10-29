import {
  useIdentify,
  VeltCommentTool,
  VeltPresence,
  VeltSidebarButton,
} from "@veltdev/react";
import getUser from "../services/user/user";
import { useRef } from "react";
import { Pictures } from "./Pictures";

export const Gallery = () => {
  const currentUser = useRef(getUser());

  useIdentify(currentUser.current);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 32px",
        }}
      >
        <h4>Profile - {currentUser?.current.name}</h4>
        <VeltPresence />
      </div>
      <Pictures />

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px 32px",
        }}
      >
        <VeltCommentTool />
        <VeltSidebarButton />
      </div>
    </div>
  );
};
