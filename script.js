// Storage key for localStorage
const STORAGE_KEY = 'lerngruppe_entries';

// Load entries from localStorage
function loadEntries() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error('Failed to parse stored entries:', e);
        return [];
    }
}

// Save entries to localStorage
function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Display all entries
function displayEntries() {
    const entries = loadEntries();
    const entriesList = document.getElementById('entriesList');
    const clearButton = document.getElementById('clearAll');
    
    if (entries.length === 0) {
        entriesList.innerHTML = '<p class="no-entries">Noch keine Einträge vorhanden.</p>';
        clearButton.disabled = true;
    } else {
        entriesList.innerHTML = entries.map((entry, index) => `
            <div class="entry-card">
                <div class="entry-info">
                    <div class="entry-name">${escapeHtml(entry.name)}</div>
                    <div class="entry-details">
                        📅 ${escapeHtml(entry.day)} | 🕐 ${escapeHtml(entry.time)} Uhr
                    </div>
                </div>
                <button class="btn-delete" onclick="deleteEntry(${index})">Löschen</button>
            </div>
        `).join('');
        clearButton.disabled = false;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Delete a single entry
function deleteEntry(index) {
    const entries = loadEntries();
    entries.splice(index, 1);
    saveEntries(entries);
    displayEntries();
}

// Clear all entries
function clearAllEntries() {
    if (confirm('Möchtest du wirklich alle Einträge löschen?')) {
        localStorage.removeItem(STORAGE_KEY);
        displayEntries();
    }
}

// Handle form submission
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    
    // Get existing entries
    const entries = loadEntries();
    
    // Add new entry
    entries.push({
        name: name,
        day: day,
        time: time
    });
    
    // Save to localStorage
    saveEntries(entries);
    
    // Reset form
    this.reset();
    
    // Update display
    displayEntries();
    
    // Show success feedback
    const submitButton = document.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = '✓ Erfolgreich hinzugefügt!';
    submitButton.style.background = '#28a745';
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 2000);
});

// Handle clear all button
document.getElementById('clearAll').addEventListener('click', clearAllEntries);

// Initial display
displayEntries();
