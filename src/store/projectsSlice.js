import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    setProjects(state, { payload }) {
      state = payload;
      return state;
    },
    addProject(state, { payload }) {
      state.push(payload);
      return state;
    },
  },
});

export default projectsSlice.reducer;
export const { setProjects, addProject } = projectsSlice.actions;
// {
//     projectId: undefined,
//     projectName: undefined,
//     projectOwner: undefined,
//     workers: [{ id: undefined, name: undefined, email: undefined }],
//     categories: [
//       {
//         categoryId: undefined,
//         categoryName: undefined,
//         tasks: [
//           {
//             taskId: undefined,
//             taskTitle: "Design problem",
//             taskDescription: "Design problem description ...",
//             taskWorkers: [
//               { id: undefined, name: undefined, email: undefined },
//             ],
//             isDone: undefined,
//             badgeColor: undefined hex,
//           },
//         ],
//       },
//     ],
//   },
