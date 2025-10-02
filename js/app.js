import stateStore from './modules/StateStore.js';
import audioController from './modules/AudioController.js';
import uiRenderer from './modules/UIRenderer.js';
import search from './modules/Search.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupPlayerControls();
        this.setupPlaylistModal();
        this.setupStateSubscription();
        
        search.init();
        
        uiRenderer.renderHome();
        uiRenderer.renderPlaylists();
        uiRenderer.updatePlayerUI();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const searchBarContainer = document.getElementById('searchBarContainer');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const view = link.getAttribute('data-view');
                stateStore.setView(view);
                
                if (view === 'search') {
                    searchBarContainer.style.display = 'flex';
                    uiRenderer.renderSearch(stateStore.getState().searchQuery);
                } else {
                    searchBarContainer.style.display = 'none';
                    if (view === 'home') {
                        uiRenderer.renderHome();
                    } else if (view === 'library') {
                        uiRenderer.renderLibrary();
                    }
                }
            });
        });
    }

    setupPlayerControls() {
        const playBtn = document.getElementById('playBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const repeatBtn = document.getElementById('repeatBtn');
        const likeBtn = document.getElementById('likeBtn');
        const volumeControl = document.getElementById('volumeControl');
        const progressBar = document.getElementById('progressBar');
        
        playBtn?.addEventListener('click', () => {
            audioController.toggle();
        });
        
        nextBtn?.addEventListener('click', () => {
            audioController.next();
        });
        
        prevBtn?.addEventListener('click', () => {
            audioController.previous();
        });
        
        shuffleBtn?.addEventListener('click', () => {
            stateStore.toggleShuffle();
            const { shuffle } = stateStore.getState();
            shuffleBtn.classList.toggle('active', shuffle);
        });
        
        repeatBtn?.addEventListener('click', () => {
            stateStore.cycleRepeat();
            const { repeat } = stateStore.getState();
            repeatBtn.classList.toggle('active', repeat !== 'off');
            
            const svg = repeat === 'one' 
                ? '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-6-5h2v4h-2z"/></svg>'
                : '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>';
            repeatBtn.innerHTML = svg;
        });
        
        likeBtn?.addEventListener('click', () => {
            const { currentTrack } = stateStore.getState();
            if (currentTrack) {
                stateStore.toggleLike(currentTrack.id);
                uiRenderer.updateLikeButton();
            }
        });
        
        volumeControl?.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audioController.setVolume(volume);
        });
        
        progressBar?.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const duration = audioController.getDuration();
            if (duration) {
                audioController.seek(percent * duration);
            }
        });
    }

    setupPlaylistModal() {
        const createPlaylistBtn = document.getElementById('createPlaylistBtn');
        const modal = document.getElementById('createPlaylistModal');
        const closeModal = document.getElementById('closeModal');
        const savePlaylistBtn = document.getElementById('savePlaylistBtn');
        const playlistInput = document.getElementById('playlistNameInput');
        
        createPlaylistBtn?.addEventListener('click', () => {
            modal.classList.add('active');
            playlistInput.value = '';
            playlistInput.focus();
        });
        
        closeModal?.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        savePlaylistBtn?.addEventListener('click', () => {
            const name = playlistInput.value.trim();
            if (name) {
                stateStore.addPlaylist(name);
                uiRenderer.renderPlaylists();
                modal.classList.remove('active');
            }
        });
        
        playlistInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                savePlaylistBtn.click();
            }
        });
    }

    setupStateSubscription() {
        stateStore.subscribe((state) => {
            uiRenderer.updatePlayerUI();
            uiRenderer.updateLikeButton();
        });
    }
}

new App();
