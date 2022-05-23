type Browser = "edge" | "chrome" | "firefox" | "safari" | "other";

export const getBrowserName = (): Browser => {
  const agent = window.navigator.userAgent.toLowerCase();
  switch (true) {
    case agent.indexOf("edge") > -1:
      return "edge";
    case agent.indexOf("chrome") > -1:
      return "chrome";
    case agent.indexOf("firefox") > -1:
      return "firefox";
    case agent.indexOf("safari") > -1 || agent.indexOf("applewebkit") > -1:
      return "safari";
    default:
      return "other";
  }
};
