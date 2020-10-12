import React from 'react'

const Searchbar = ({searchBar, setSearchBar}) => {

    return (
        <input
          onChange={e => setSearchBar(e.target.value)}
          value={searchBar}
          type="text"
          placeholder="Search"
          id="searchbar"
        />
    );
}

export default Searchbar