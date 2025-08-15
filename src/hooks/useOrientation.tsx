import { useEffect, useState } from "react";

export enum Orientation {
  Portrait = "portrait",
  Landscape = "landscape",
}

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.Landscape,
  );

  useEffect(() => {
    const portraitQuery = window.matchMedia("(orientation: portrait)");

    const handleOrientationChange = () => {
      setOrientation(
        portraitQuery.matches ? Orientation.Portrait : Orientation.Landscape,
      );
    };

    handleOrientationChange();

    portraitQuery.addEventListener("change", handleOrientationChange);

    return () => {
      portraitQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  return orientation;
};
