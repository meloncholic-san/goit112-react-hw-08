import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { selectTextFilter } from './filtersSlice'
export const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.loading;

export const selectIsError = (state) => state.contacts.error;


export const selectVisibleContacts = createSelector(
    [selectContacts, selectTextFilter],
    (contacts, textFilter) => {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }
  );


const slice = createSlice ({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchContacts.pending, state => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchContacts.rejected, state => {
            state.loading = false;
            state.error = true;
        })
        .addCase(deleteContact.pending, state => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(item => item.id !== action.payload);
        })
        .addCase(deleteContact.rejected, state => {
            state.loading = false;
            state.error = true;
        })
        .addCase(addContact.pending, state => {
            state.loading = true;
            state.error = false;
        })
        .addCase(addContact.fulfilled, (state, action) => {
            state.loading = false;
            state.items.push(action.payload);
        })
        .addCase(addContact.rejected, state => {
            state.loading = false;
            state.error = true;
        })
    }
})


export default slice.reducer;