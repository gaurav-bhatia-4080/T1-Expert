import { atomFamily, selectorFamily } from "recoil";
import axios from 'axios';
const encryptEmailToUrl = (email) => {
  // Encode email address to Base64
  const encodedEmail = btoa(email);
  // URL-encode special characters in the encoded email
  const urlEncodedEmail = encodeURIComponent(encodedEmail);
  return urlEncodedEmail;
};

export const getCurrPatientBasicInfo = atomFamily({
  key: "getCurrPatientBasicInfo",
  default: selectorFamily({
    key: "getCurrPatientBasicInfoSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getCurrPatientBasicInfo/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});


export const getPatientInsulin = atomFamily({
  key: "getPatientInsulin",
  default: selectorFamily({
    key: "getPatientInsulinSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPatientInsulin/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});
export const getPatientBG = atomFamily({
  key: "getPatientBG",
  default: selectorFamily({
    key: "getPatientBGSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPatientBG/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});


export const getFoodEntries = atomFamily({
  key: "getFoodEntries",
  default: selectorFamily({
    key: "getFoodEntriesSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPatientFoodEntries/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ", id);
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});


export const getPredictions = atomFamily({
  key: "getPredictions",
  default: selectorFamily({
    key: "getPredictionsSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPatientPredictions/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ", id);
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});



export const getPredictionExtraDetails = atomFamily({
  key: "getPredictionExtraDetails",
  default: selectorFamily({
    key: "getPredictionExtraDetailsSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPatientPredExtraDetails/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ", id);
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});

export const getPredictionTrainedParams = atomFamily({
  key: "getPredictionTrainedParams",
  default: selectorFamily({
    key: "getPredictionTrainedParamsSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPredictionTrainedParams/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});

export const getPredictionEntriesWithStatus = atomFamily({
  key: "getPredictionEntriesWithStatus",
  default: selectorFamily({
    key: "getPredictionEntriesWithStatusSelector",
    get:
      (id) =>
        async ({ get }) => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPredictionWithStatus/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});

export const icrRefetchTrigger = atomFamily({
  key: 'icrRefetchTrigger',
  default: 0,
});
export const getPatientsICRLists = atomFamily({
  key: "getPatientsICRLists",
  default: selectorFamily({
    key: "getPatientsICRListsSelector",
    get:
      (id) =>
        async ({ get }) => {
          get(icrRefetchTrigger(id));
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL
              }/getPatientsICRLists/${encryptEmailToUrl(id)}`,
              {
                withCredentials: true,
              }
            );
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ", id);
            return response.data;
          } catch (error) {
            console.error("Error fetching pending patients:", error);
            throw error; // Handle API errors gracefully
          }
        },
  }),
});
