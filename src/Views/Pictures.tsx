import { useVeltClient, VeltCommentTool } from "@veltdev/react";
import logo from "../logo.svg";
import { useEffect } from "react";

export const Pictures = () => {
  const { client } = useVeltClient();

  useEffect(() => {
    if (client) {
      client.setDocumentId("fcb");
    }
  }, [client]);

  return (
    <div id="fcb">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <VeltCommentTool />
      </header>
    </div>
  );
};
