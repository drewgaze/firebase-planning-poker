import firebase from "config/firebase";

export default store => next => async action => {
  next(action);
  if (action.meta && action.meta.firebase) {
    const {
      game: { key, ...props }
    } = store.getState();
    await firebase
      .database()
      .ref(`games/${key}`)
      .set({ ...props });
  }
};

export const firebaseAction = action => ({
  ...action,
  meta: { firebase: true }
});
