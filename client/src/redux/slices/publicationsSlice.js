import { createSlice } from "@reduxjs/toolkit";
import { getPublications,postPublication,commentPublication, likePublication, deleteLike } from "../actions/publicationsAcction";


const initialState = {
    publications:[],
    loading: false,
    error: null,
    comError:null,
    postError:null,
    likeErr:null,
}

export const publicationsSlice = createSlice({
    name: 'applications', 
    initialState,
    reducers: {
        // Aquí puedes agregar tus propias acciones si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPublications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPublications.fulfilled, (state, action) => {
                state.loading = false;
                state.publications = action.payload;
            })
            .addCase(getPublications.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.error = action.error;
            })
            .addCase(postPublication.pending, (state) => {
                state.loading = true;
                state.postError = null;
            })
            .addCase(postPublication.fulfilled, (state, action) => {
                state.loading = false;
                state.publications.unshift(action.payload)
            })
            .addCase(postPublication.rejected, (state, action) => {
                state.loading = false;
                state.postError = action.error;
            })
            .addCase(commentPublication.pending, (state) => {
                state.loading = true;
                state.comError = null;
            })
            .addCase(commentPublication.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                const { publicationId, ...comment} = action.payload;
                const publication = state.publications.find((pub) => pub._id === publicationId);
                console.log(publication);
                if (publication) {
                    publication.comments.push(comment);
                }
    
            })
            .addCase(commentPublication.rejected, (state, action) => {
                state.loading = false;
                state.comError = action.error;
            })
            .addCase(likePublication.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                const { publicationId, userId } = action.payload;
                const publication = state.publications.find((pub) => pub._id === publicationId);
                if (publication) {
                    // Asegúrate de que el userId no está ya en los likes (esto puede ser redundante si ya lo verificas en el backend)
                    if (!publication.likes.includes(userId)) {
                        publication.likes.push(userId);
                    }
                }
            })
            .addCase(likePublication.rejected, (state, action) => {
                state.loading = false;
                state.likeErr = action.error;
            })
            .addCase(deleteLike.fulfilled, (state, action) => {
                state.loading = false;
                const { publicationId, userId } = action.payload; // Cambié esto para que la desestructuración sea correcta
                const publication = state.publications.find((pub) => pub._id === publicationId);
                if (publication) {
                    // Actualiza el array de likes dentro de la publicación encontrada
                    publication.likes = publication.likes.filter(id => id !== userId);
                }
            })
            .addCase(deleteLike.rejected, (state, action) => {
                state.loading = false;
                state.likeErr = action.error;
            });
    },
});

export default publicationsSlice.reducer;
