const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "<h1>hihihihihi</h1>",
        "categoryId": "2"
    },
    projectDetail: {

    }
};    // api updateproject

// eslint-disable-next-line import/no-anonymous-default-export
export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'EDIT_PROJECT': {
        state.projectEdit = action.projectEditModel;
        return {...state}
    }

    case 'PUT_PROJECT_DETAIL': {
      state.projectDetail = action.projectDetail;
      return {...state}
    }

    default:
      return state;
  }
};
