export const PathSplitter = (path) => {
  const split = path.split(/([/])/);
  const temp = [];

  for (let i = 0; i < split.length; i++) {
    if (split[i] != "") {
      temp.push(split[i]);
    }
  }
  return temp;
};
