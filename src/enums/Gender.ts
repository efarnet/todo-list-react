export const Gender = {
  MEN: "MEN",
  WOMEN: "WOMEN",
};

export type Gender = typeof Gender[keyof typeof Gender];
