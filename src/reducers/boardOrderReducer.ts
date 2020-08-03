export default (state = [], action: any) => {
  switch (action.type) {
    case "":
      return action.payload;

    default:
      return state;
  }
};
