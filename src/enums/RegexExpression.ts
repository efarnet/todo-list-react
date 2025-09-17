export const RegexExpression = {
  EMAIL: /^\S+@\S+\.\S+$/,
};

export type RegexExpression = typeof RegexExpression[keyof typeof RegexExpression];
