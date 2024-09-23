function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteHistoryItem(index);

        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    });
}


function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query) {
        saveToHistory(query);
        searchInput.value = '';
        loadSearchHistory(); 
    }
}


function saveToHistory(query) {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.push(query);
    localStorage.setItem('searchHistory', JSON.stringify(history));
}


function deleteHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(history));
    loadSearchHistory(); 
}

function clearHistory() {
    localStorage.removeItem('searchHistory');
    loadSearchHistory(); 
}

function toggleHistory() {
    const historyContainer = document.querySelector('.history-container');
    historyContainer.style.display = historyContainer.style.display === 'flex' ? 'none' : 'flex';

    if (historyContainer.style.display === 'flex') {
        setTimeout(() => {
            historyContainer.style.display = 'none';
        }, 10000);
    }
}

document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('clear-history').addEventListener('click', clearHistory);
document.getElementById('toggle-history').addEventListener('click', toggleHistory);

loadSearchHistory();
