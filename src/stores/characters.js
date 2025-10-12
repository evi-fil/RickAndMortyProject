import { defineStore } from 'pinia';

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    fullCharacters: [],
    pagination: null,
    page: 1,
    searchActive: false,
    lastSearchTerm: '',
    currentCharacterIndex: 0,
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
      let allCharacters = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await fetch('https://rickandmortyapi.com/api/character?page=' + page);
        if (!response.ok) break;

        const data = await response.json();
        allCharacters = allCharacters.concat(data.results);
        totalPages = data.info.pages;
        page++;
      } while (page <= totalPages);

      this.fullCharacters = allCharacters;
    },

    // Fetch characters by name (search)
    async fetchCharactersByName(name, page = 1) {

      const trimmed = name.trim();

      if(!trimmed){
        this.clearSearch();
        return;
      }

      this.page = page;
      this.lastSearchTerm = name;
      this.searchActive = true;

        const response = await fetch(
          'https://rickandmortyapi.com/api/character/?name=' + encodeURIComponent(name) + '&page=' + page);

        if (!response.ok) {
          if (response.status === 404) {
            this.errorMessage = "Character not found";
          }
          this.characters = [];
          this.pagination = null;
          this.searchActive = false;
          this.lastSearchTerm = '';
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

    async nextPage() {
      if(this.pagination?.next) {
        const nextPage = this.page + 1;
        if(this.searchActive) {
          await this.fetchCharactersByName(this.lastSearchTerm, nextPage);
        } else {
          await this.fetchCharacters(nextPage);
        }
      }
    },

    async prevPage() {
      if(this.pagination?.prev && this.page > 1) {
        const prevPage = this.page - 1;
        if(this.searchActive) {
          await this.fetchCharactersByName(this.lastSearchTerm, prevPage);
        } else {
          await this.fetchCharacters(prevPage);
        }
      }
    },
  },
});
