// Get the current song index from localStorage
const currentSongIndex = localStorage.getItem('currentSongIndex');

// Fetch the list of songs from the server again to get the selected song's details
fetch('/songs')
    .then(response => response.json())
    .then(songs => {
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

        // Populate the song list dynamically in player.html
        const songList = document.getElementById('song-list');
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.title;  // Display song title
            li.setAttribute('data-index', index);
            li.setAttribute('onclick', `openPlayer(${index})`); // Click to open player
            songList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching song:', error));

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function updatePlayer(song) {
    document.getElementById('album-cover').src = song.albumCoverUrl; // Ensure this line sets the correct URL
    document.getElementById('track-name').textContent = song.title;
    document.getElementById('artist-name').textContent = song.artist;
}

// Example song object
const exampleSong = {
    albumCoverUrl: 'pictures/Maki - Namumula (Lyrics).jpg', // Ensure this path is correct
    title: 'Example Song',
    artist: 'Example Artist'
};

// Call updatePlayer with example song for testing
updatePlayer(exampleSong);
