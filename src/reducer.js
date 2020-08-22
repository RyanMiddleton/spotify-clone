export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //token: "BQAd0whTs5BpQYP7515m42BOfM_5yVfe0GZ1GRSZjZJjwlxNujFnHq1N9Q2cDH00sWexdtPN4hIYzj05_s-AhUfsR2mnOc7NCFxewpXVTgVQ_4JrBSy-ZE6hB7IgBeTg3mhSfxPP3LZwhqVQD6ubXoy0XL-_1w",
};

const reducer = (state, action) => {
console.log(action);

  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      }
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      }
    default:
      return state;
  }
}

export default reducer;