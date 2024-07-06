import { isAxiosError } from "axios";
import ElectionParty from "../models/election-party";
import axios from "./axiosInstance";

export const findAll = async () => {
  try {
    const response = await axios.get("election-party");

    return response.data.electionParties;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const create = async (electionParty: ElectionParty) => {
  try {
    const response = await axios.post("election-party", electionParty);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const update = async (electionParty: ElectionParty) => {
  try {
    const response = await axios.put("election-party", electionParty);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const suspend = async (id: number) => {
  try {
    const response = await axios.delete("election-party/" + id);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const recover = async (id: number) => {
  try {
    const response = await axios.patch("election-party/" + id);

    return response.data.message;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};
