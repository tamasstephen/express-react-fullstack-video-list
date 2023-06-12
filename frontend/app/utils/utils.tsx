export const userUtils = {
  getNameInitials: (name: string) => {
    return name
      .split(" ")
      .map((name: string) => name[0])
      .join("")
      .substring(0, 2);
  },
};
