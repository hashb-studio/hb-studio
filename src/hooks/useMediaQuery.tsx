import { useEffect, useState } from "react";

type BreakpointCheckTypes =
  | "min-width"
  | "max-width"
  | "min-height"
  | "max-height";

/**
 * Returns a boolean indicating if the current browser size matches a media query.
 * @param breakpoint - Numeric value in pixels (e.g. 768)
 * @param breakpointCheckType - Type of media query (default: 'min-width')
 * @param orientation - Optional orientation (portrait or landscape)
 */
export const useMediaQuery = (
  breakpoint: number,
  breakpointCheckType: BreakpointCheckTypes = "min-width",
  orientation?: "landscape" | "portrait",
): boolean => {
  const [matches, setMatches] = useState(false);

  const orientationMediaRule = orientation
    ? ` and (orientation: ${orientation})`
    : "";

  useEffect(() => {
    const mediaQuery = `only screen${orientationMediaRule} and (${breakpointCheckType}: ${breakpoint}px)`;

    const handleResize = () => {
      setMatches(window.matchMedia(mediaQuery).matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, breakpointCheckType, orientationMediaRule]);

  return matches;
};

export const useAboveTablet = () => useMediaQuery(BREAKPOINTS.tablet); // min-width: 768px
export const useAboveLaptop = () => useMediaQuery(BREAKPOINTS.laptop);
export const useAboveDesktop = () => useMediaQuery(BREAKPOINTS.desktop);

export const useBelowTablet = () => useMediaQuery(767, "max-width");
export const useBelowLaptop = () => useMediaQuery(1023, "max-width");
export const useBelowDesktop = () => useMediaQuery(1279, "max-width");

export const BREAKPOINTS = {
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};
