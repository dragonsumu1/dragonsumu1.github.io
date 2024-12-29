// Fetch the list of songs from the server
fetch('/songs')
    .then(response => response.json())
    .then(songs => {
        const songList = document.getElementById('song-list');
        
        // Populate the song list dynamically
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.title;  // Display song title
            li.setAttribute('data-index', index);
            li.setAttribute('onclick', `openPlayer(${index})`); // Click to open player
            songList.appendChild(li);
        });

        // Get the current song index from localStorage
        const currentSongIndex = localStorage.getItem('currentSongIndex');
        if (currentSongIndex !== null) {
            const song = songs[currentSongIndex];

            // Now, we have the song details (title, artist, file path, picture)
            const audio = new Audio(song.file);  // Correct file path with '/music/' prefix
            const playButton = document.getElementById('play-btn');
            const trackNameElement = document.getElementById('track-name');
            const artistNameElement = document.getElementById('artist-name');
            const albumCoverElement = document.getElementById('album-cover');
            const totalTimeElement = document.getElementById('total-time');
            const playerContainer = document.getElementById('player-container');
            const minimizeBar = document.getElementById('minimize-bar');
            const maximizeBar = document.getElementById('maximize-bar');

            // Update song details in the player
            trackNameElement.textContent = song.title;
            artistNameElement.textContent = song.artist;
            albumCoverElement.src = song.picture;
            albumCoverElement.alt = `${song.title} Album Cover`;
            audio.onloadedmetadata = function() {
                totalTimeElement.textContent = formatTime(audio.duration);
            };

            // Function to start the song playing
            function togglePlay() {
                if (audio.paused) {
                    audio.play();
                    playButton.textContent = 'Pause';
                } else {
                    audio.pause();
                    playButton.textContent = 'Play';
                }
            }

            // Function to minimize the player
            function minimizePlayer() {
                playerContainer.classList.add('minimized');  // Add the minimized state
                maximizeBar.style.display = 'block'; // Show maximize bar when minimized
                minimizeBar.style.display = 'none'; // Hide minimize bar when minimized
                document.querySelector('.search-container').style.display = 'block'; // Show search container
                document.querySelector('.music-list').style.display = 'block'; // Show music list
            }

            // Function to maximize the player
            function maximizePlayer() {
                playerContainer.classList.remove('minimized');  // Remove the minimized state
                maximizeBar.style.display = 'none'; // Hide maximize bar when expanded
                minimizeBar.style.display = 'block'; // Show minimize bar when expanded
                document.querySelector('.search-container').style.display = 'none'; // Hide search container
                document.querySelector('.music-list').style.display = 'none'; // Hide music list
            }

            // Listen for the minimize button click
            minimizeBar.addEventListener('click', minimizePlayer);  
            maximizeBar.addEventListener('click', maximizePlayer);  

            playButton.addEventListener('click', togglePlay);
        }
    })
    .catch(error => console.error('Error fetching songs:', error));

// Function to search songs dynamically
function searchSongs() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const songListItems = document.querySelectorAll('#song-list li');
    
    songListItems.forEach(item => {
        const songTitle = item.textContent.toLowerCase();
        if (songTitle.includes(searchQuery)) {
            item.style.display = 'block';  // Show item if it matches search
        } else {
            item.style.display = 'none';  // Hide item if it doesn't match search
        }
    });
}

// Function to open the player page with the selected song
function openPlayer(index) {
    localStorage.setItem('currentSongIndex', index);  // Store the current song index
    window.location.href = 'index.html';  // Navigate to the player page
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
