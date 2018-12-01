const initState = {}

const ideaReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_IDEA_SUCCESS':
      console.log('create idea success');
      return state;
    case 'CREATE_IDEA_ERROR':
      console.log('create idea error');
      return state;
    case 'CREATE_ITEM_SUCCESS':
      console.log('create item success');
      return state;
    case 'CREATE_ITEM_ERROR':
      console.log('create item error');
      return state;
    default:
      return state;
  }
};
export default ideaReducer;