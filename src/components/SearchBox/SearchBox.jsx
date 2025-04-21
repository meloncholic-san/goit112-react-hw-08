import css from './SearchBox.module.css';

import { changeFilter, selectTextFilter } from '../../redux/filters/filtersSlice'
import { useDispatch, useSelector } from "react-redux";


export default function SearchBox() {
  const dispatch = useDispatch();
  const inputValue = useSelector(selectTextFilter);

  function handleFilter(event) {
    dispatch(changeFilter(event.target.value));
  }

  return (
    <div className={css.searchBox}>
      <label htmlFor="searchInput">Find contact by name or number:</label>
      <input
        id="searchInput"
        onChange={handleFilter}
        type="text"
        value={inputValue}
        className={css.input}
      />
    </div>
  );
}
