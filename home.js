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
    window.location.href = 'player.html';  // Navigate to the player page
}

function navigateToPlayer() {
    window.location.href = 'player.html'; // Ensure this path is correct
}

// Example usage
document.getElementById('some-button').addEventListener('click', navigateToPlayer);
