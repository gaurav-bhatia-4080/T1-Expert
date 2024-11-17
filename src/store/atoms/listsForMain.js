import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { currentUser } from "./userState";
import axios from "axios";
const encryptEmailToUrl = (email) => {
  // Encode email address to Base64
  const encodedEmail = btoa(email);
  // URL-encode special characters in the encoded email
  const urlEncodedEmail = encodeURIComponent(encodedEmail);
  return urlEncodedEmail;
};

export const pendingPatients = atom({
  key: "pendingPatients", // Unique key for the atom family
  default: selector({
    key: "fetchPendingPatients",
    get: async ({ get }) => {
      // Retrieve the currentUser value
      const user = get(currentUser);

      // Check if currentUser exists and has a valid email
      if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
        throw new Error(
          "User email is not available or user is not logged in."
        );
      }

      const email = user.emails[0].value;

      try {
        // API request to get pending patients
        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/getPendingPatients/${encryptEmailToUrl(email)}`,
          { withCredentials: true }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching pending patients:", error);
        throw error; // Handle API errors gracefully
      }
    },
  }),
});

// export const pendingPatients = selector({
//   key: "pendingPatients",
//   get: async ({ get }) => {
//     // Retrieve the currentUser value
//     const user = get(currentUser);

//     // Check if currentUser exists and has a valid email
//     if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
//       throw new Error("User email is not available or user is not logged in.");
//     }

//     const email = user.emails[0].value;

//     try {
//       // API request to get pending patients
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_API_URL
//         }/getPendingPatients/${encryptEmailToUrl(email)}`,
//         { withCredentials: true }
//       );
//       return response.data; // Return the fetched data
//     } catch (error) {
//       console.error("Error fetching pending patients:", error);
//       throw error; // Handle API errors gracefully
//     }
//   },
// });
// export const fetchPendingFood = ;
export const pendingFood = atom({
  key: "pendingFood", // Unique key for the atom family
  default: selector({
    key: "fetchPendingFood",
    get: async ({ get }) => {
      // Retrieve the currentUser value
      const user = get(currentUser);

      // Check if currentUser exists and has a valid email
      if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
        throw new Error(
          "User email is not available or user is not logged in."
        );
      }

      const email = user.emails[0].value;

      try {
        // API request to get pending patients
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getPendingFoods/${encryptEmailToUrl(
            email
          )}`,
          { withCredentials: true }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching", error);
        throw error; // Handle API errors gracefully
      }
    },
  }),
});

export const pendingExercise = atom({
  key: "pendingExercise", // Unique key for the atom family
  default: selector({
    key: "fetchPendingExercise",
    get: async ({ get }) => {
      // Retrieve the currentUser value
      const user = get(currentUser);

      // Check if currentUser exists and has a valid email
      if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
        throw new Error(
          "User email is not available or user is not logged in."
        );
      }

      const email = user.emails[0].value;

      try {
        // API request to get pending patients
        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/getPendingExercises/${encryptEmailToUrl(user.emails[0].value)}`,
          { withCredentials: true }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching the details", error);
        throw error; // Handle API errors gracefully
      }
    },
  }),
});

// export const pendingExercise = selector({
//   key: "pendingExercise",
//   get: async ({ get }) => {
//     // Retrieve the currentUser value
//     const user = get(currentUser);

//     // Check if currentUser exists and has a valid email
//     if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
//       throw new Error("User email is not available or user is not logged in.");
//     }

//     const email = user.emails[0].value;

//     try {
//       // API request to get pending patients
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_API_URL
//         }/getPendingExercises/${encryptEmailToUrl(user.emails[0].value)}`,
//         { withCredentials: true }
//       );
//       return response.data; // Return the fetched data
//     } catch (error) {
//       console.error("Error fetching the details", error);
//       throw error; // Handle API errors gracefully
//     }
//   },
// });
export const getdoctors = atom({
  key: "getdoctors",
  default: selector({
    key: "getdocselector",
    get: async () => {
      try {
        // API request to get pending patients
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getDoctors`,
          { withCredentials: true }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching the details...", error);
        throw error; // Handle API errors gracefully
      }
    },
  }),
});
// export const getdoctors = selector({
//   key: "getdoctors",
//   get: async ({ get }) => {
//     // Retrieve the currentUser value
//     const user = get(currentUser);

//     // Check if currentUser exists and has a valid email
//     if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
//       throw new Error("User email is not available or user is not logged in.");
//     }

//     const email = user.emails[0].value;

//     try {
//       // API request to get pending patients
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/getDoctors`,
//         { withCredentials: true }
//       );
//       return response.data; // Return the fetched data
//     } catch (error) {
//       console.error("Error fetching the details...", error);
//       throw error; // Handle API errors gracefully
//     }
//   },
// });

export const getfooddb = atom({
  key: "getfooddbAtom",
  default: selector({
    key: "getfdbs",
    get: async ({ get }) => {
      try {
        // API request to get pending patients
        // const foodbatom = get(getfooddbAtom);
        const pd = get(pendingFood);

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getFoodDatabase`,
          { withCredentials: true }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching", error);
        throw error; // Handle API errors gracefully
      }
    },
  }),
});
//////////////////////
// export const getfooddb = selector({
//   key: "getfooddb",
//   get: async ({ get }) => {
//     const user = get(currentUser);
//     if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
//       throw new Error("User email is not available or user is not logged in.");
//     }
//     const foodbatom = get(getfooddbAtom);
//     const pd = get(pendingFood);
//     // Check if currentUser exists and has a valid email

//     // const email = user.emails[0].value;

//     try {
//       // API request to get pending patients
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/getFoodDatabase`,
//         { withCredentials: true }
//       );
//       return response.data; // Return the fetched data
//     } catch (error) {
//       console.error("Error fetching", error);
//       throw error; // Handle API errors gracefully
//     }
//   },
// });

export const mypatientsAtom = atom({
  key: "mypatientsAtom",
  default: selector({
    key: "mypatientsget",
    get: async ({ get }) => {
      // Retrieve the currentUser value
      const user = get(currentUser);

      // Check if currentUser exists and has a valid email
      if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
        throw new Error(
          "User email is not available or user is not logged in."
        );
      }

      const email = user.emails[0].value;

      try {
        // API request to get pending patients
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getPatients/${encryptEmailToUrl(
            user.emails[0].value
          )}`,
          { withCredentials: true }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching", error);
        throw error; // Handle API errors gracefully
      }
    },
  }),
});

export const mypatients = selector({
  key: "mypatients",
  get: async ({ get }) => {
    // Retrieve the currentUser value
    const user = get(currentUser);
    const myp = get(mypatientsAtom);
    const pending = get(pendingPatients);
    // Check if currentUser exists and has a valid email
    if (!user || !user.emails || !user.emails[0] || !user.emails[0].value) {
      throw new Error("User email is not available or user is not logged in.");
    }

    const email = user.emails[0].value;

    try {
      // API request to get pending patients
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getPatients/${encryptEmailToUrl(
          user.emails[0].value
        )}`,
        { withCredentials: true }
      );
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching", error);
      throw error; // Handle API errors gracefully
    }
  },
});

// export const pendingPatients = atomFamily({
//   key: "pendingPatients",
//   default: selectorFamily({
//     key: "pendingPatientsSelector",
//     get:
//       (currentUser) =>
//       async ({ get }) => {
//         console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
//         console.log(currentUser.emails[0].value);
//         const list = await axios.get(
//           `${
//             process.env.REACT_APP_API_URL
//           }/getPendingPatients/${encryptEmailToUrl(
//             currentUser.emails[0].value
//           )}`,
//           { withCredentials: true }
//         );
//         return list.data;
//       },
//   }),
// });

export const pendingExerciseListLengthSelector = selector({
  key: "pendingExerciseListLengthSelector",
  get: ({ get }) => {
    const list = get(pendingExercise);
    return list.length;
  },
});

export const pendingFoodListLengthSelector = selector({
  key: "pendingFoodListLengthSelector",
  get: ({ get }) => {
    const list = get(pendingFood);
    return list.length;
  },
});
export const pendingPatientsListLengthSelector = selector({
  key: "pendingPatientsListLengthSelector",
  get: ({ get }) => {
    const list = get(pendingPatients);
    return list.length;
  },
});

// export const selectedOption=selector({
//   key:"selectedOption",
//   get: ({get})=> {
//     const user=get(currentUser);
//     return user.email == "samwilson14111@gmail.com" ||
//       user.email == "docrajivsingla@gmail.com"
//       ? "doctor"
//       : "patients"
//   }

// })
// export const selectedOption = selector({
//   key: 'selectedOption',
//   get: ({ get }) => {
//     const user = get(currentUser);
//     const initialOption = get(selectedOptionState);

//     // Derive initial value from the user atom based on email
//     if (initialOption === 'patients') {
//       return user.email === "samwilson14111@gmail.com" ||
//              user.email === "docrajivsingla@gmail.com"
//         ? "doctor"
//         : "patients";
//     }

//     return initialOption; // Return the current selected option
//   },
//   set: ({ set }, newValue) => {
//     // Allow the user to set a new value manually
//     set(selectedOptionState, newValue);
//   },
// });

// Atom to hold the selected option, initialized based on the current user
export const selectedOption = atom({
  key: "selectedOptionState",
  default: "mypatients", // Default value for patients if no user email matches
});
