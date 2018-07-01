import firebase from "config/firebase";

export default store => next => async action => {
  next(action);
  if (action.meta && action.meta.firebase) {
    const {
      game: { key, ...props }
    } = store.getState();
    console.log("update", key);
    await firebase
      .database()
      .ref(`games/${key}`)
      .update({ ...props });
  }
};
