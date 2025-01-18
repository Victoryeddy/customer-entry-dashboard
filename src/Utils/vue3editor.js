export const formatVue3Editor = (html) => {
  return html?.replace(/<[^>]*>/g, "") || "";
};
