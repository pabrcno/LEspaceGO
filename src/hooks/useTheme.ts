import * as legos from "../components/legos";

export enum ETheme {
  TOOLS = "tools",
  FRUITS = "fruits",
  DEFAULT = "default",
  LEGOS = "legos",
}

//TODO: Add context in order to share over screens
export const useTheme = () => {
  const theme = {
    name: ETheme.LEGOS,
    innerGradientColor: "#101010",
    outerGradientColor: "#000",
    // values of legos but twice to have more legos
    meshes: Object.values(legos).flatMap((lego) => [lego]),
    title: "",
    shadowColor: "#101010",
  };

  return {
    theme,
  };
};
