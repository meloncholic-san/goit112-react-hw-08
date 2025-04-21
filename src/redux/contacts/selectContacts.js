import { createSelector } from '@reduxjs/toolkit';
import { selectTextFilter } from '../filters/filtersSlice'

export const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.loading;

export const selectIsError = (state) => state.contacts.error;



export const selectVisibleContacts = createSelector(
    [selectContacts, selectTextFilter],
    (contacts, textFilter) => {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(textFilter.toLowerCase()) ||
        contact.number.includes(textFilter)
      );
    }
  );