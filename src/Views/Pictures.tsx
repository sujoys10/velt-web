import { useSetDocument } from "@veltdev/react";

export const Pictures = () => {
  useSetDocument("spotify_barca");

  return (
    <div id="pictures">
      <div className="App-header">
        <p>Welcome to camp nou</p>
        <img
          src="https://www.fcbarcelona.com/photo-resources/2020/02/24/3f1215ed-07e8-47ef-b2c7-8a519f65b9cd/mini_UP3_20200105_FCB_VIS_View_1a_Empty.jpg?width=1200&height=750"
          className="hero_image"
          alt="fcb ground"
        />
      </div>
    </div>
  );
};
