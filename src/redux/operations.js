import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6486bf5abeba6297278f1a18.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } 
  catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (name, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", { name });
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${id}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );