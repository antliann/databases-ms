import initialState from '../DATABASES.json';

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
