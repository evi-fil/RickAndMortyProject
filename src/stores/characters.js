import { defineStore } from 'pinia';

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],        // current page or filtered characters
    fullCharacters: [],    // all characters (prefetched)
    pagination: null,
    page: 1,
    searchActive: false,
    lastSearchTerm: '',
  }),

  actions: {
    // Fetch a single page
    async fetchCharacters(page = 1) {
      this.page = page;
      const response = await fetch('https://rickandmortyapi.com/api/character?page=' + page);
      if (!response.ok) {
        this.characters = [];
        this.pagination = null;
        return;
      }
      const data = await response.json();
      this.characters = data.results;
      this.pagination = data.info;
    },

    // Fetch all characters at once
    async fetchAllCharacters() {
      let allChars = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await fetch('https://rickandmortyapi.com/api/character?page=' + page);
        if (!response.ok) break;

        const data = await response.json();
        allChars = allChars.concat(data.results);
        totalPages = data.info.pages;
        page++;
      } while (page <= totalPages);

      this.fullCharacters = allChars;
    },

    // Fetch characters by name (search)
    async fetchCharactersByName(name, page = 1) {
      this.page = page;
      this.lastSearchTerm = name;
      this.searchActive = true;

      const response = await fetch(
        'https://rickandmortyapi.com/api/character/?name=' +
          encodeURIComponent(name) +
          '&page=' +
          page
      );
      if (!response.ok) {
        this.characters = [];
        this.pagination = null;
        return;
      }
      const data = await response.json();
      this.characters = data.results || [];
      this.pagination = data.info;
    },

    clearSearch() {
      this.searchActive = false;
      this.lastSearchTerm = '';
      this.fetchCharacters(1);
    },
  },
});
