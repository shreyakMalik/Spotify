import stateStore from './StateStore.js';
import uiRenderer from './UIRenderer.js';

class Search {
    constructor() {
        this.debounceTimer = null;
        this.debounceDelay = 300;
    }

    init() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    handleSearch(query) {
        clearTimeout(this.debounceTimer);
        
        this.debounceTimer = setTimeout(() => {
            stateStore.setSearchQuery(query);
            uiRenderer.renderSearch(query);
        }, this.debounceDelay);
    }
}

export default new Search();
