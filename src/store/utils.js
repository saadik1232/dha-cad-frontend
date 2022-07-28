export const updateObj = (oldObj, updatedObj) => {
  return {
    ...oldObj,
    ...updatedObj
  };
};

export const page = () => {
  return window.location.href.split("/").splice(3);
};
