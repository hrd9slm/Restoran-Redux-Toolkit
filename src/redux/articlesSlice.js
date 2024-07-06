import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  articles: [],
  categories: [],
  status: "idle",
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await axios.get("http://localhost:5000/articles");
    return response.data;
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id) => {
    await axios.delete(`http://localhost:5000/articles/${id}`);
    return id;
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ id, updatedArticle, imageFile }) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      const img = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );
      updatedArticle.image = img.data.secure_url;
    }

    const response = await axios.put(
      `http://localhost:5000/articles/${id}`,
      updatedArticle
    );
    return response.data;
  }
);

export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async (newArticle) => {
    const perset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const formData = new FormData();

    formData.append("file", newArticle.image);
    formData.append("upload_preset", perset);
    const img = await axios.post(
      `https://api.cloudinary.com/v1_1/${name}/upload`,
      formData
    );
    newArticle.image = img.data.secure_url;

    const response = await axios.post(
      "http://localhost:5000/articles",
      newArticle
    );
    return response.data;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== action.payload
        );
        toast.success("Article supprimé avec succès!");
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          (article) => article.id === action.payload.id
        );
        state.articles[index] = action.payload;
        toast.success("Article mis à jour avec succès!");
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
        toast.success("Article ajouté avec succès!");
      });
  },
});

export default articlesSlice.reducer;
