export const createIdea = (idea) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('ideas').add({
      ...idea,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_IDEA_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_IDEA_ERROR' }, err);
    });
  }
};
export const editIdea = (idea) => {
  return (dispatch, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('ideas').doc(idea.id).set({
      ...idea
    }).then(() => {
      dispatch({ type: 'EDIT_IDEA_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'EDIT_IDEA_ERROR' }, err);
    });
  }
};
export const createItem = (item, ideaId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('itemtrees').doc(ideaId)
             .collection('items').add({
      ...item,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_ITEM_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_ITEM_ERROR' }, err);
    });
  }
};