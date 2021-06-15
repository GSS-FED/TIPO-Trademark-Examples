export const empty = {
  id: "",
  title: "",
};

export const isEmpty = (cat) => {
  return cat === empty || (cat.id === empty.id && cat.title === empty.title);
};
