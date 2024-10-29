import "./App.css";
import { Gallery } from "./Views/Gallery";
import { VeltComments, VeltCommentsSidebar, VeltProvider } from "@veltdev/react";


function App() {
  return (
    <div className="App">
      <VeltProvider apiKey="fh9i0P17s87fvZNBcjql">
        <Gallery />
        <VeltComments />
        <VeltCommentsSidebar />
      </VeltProvider>
    </div>
  );
}

export default App;
