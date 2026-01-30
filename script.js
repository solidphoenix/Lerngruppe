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
                        📅 ${escapeHtml(entry.day)} | 🕐 ${escapeHtml(entry.time)} Uhr | ⏱️ ${formatDuration(entry.duration)}
                    </div>
                    ${entry.topic ? `<div class="entry-topic">💡 ${escapeHtml(entry.topic)}</div>` : ''}
                </div>
                <div class="entry-actions">
                    <button class="btn-calendar" onclick="addToCalendar(${index})" title="Zum Kalender hinzufügen">📅</button>
                    <button class="btn-delete" onclick="deleteEntry(${index})">Löschen</button>
                </div>
            </div>
        `).join('');
        clearButton.disabled = false;
    }
}

// Format duration for display
function formatDuration(minutes) {
    const mins = parseInt(minutes);
    if (mins < 60) {
        return `${mins} Min`;
    } else {
        const hours = Math.floor(mins / 60);
        const remainingMins = mins % 60;
        if (remainingMins === 0) {
            return `${hours} Std`;
        } else {
            return `${hours} Std ${remainingMins} Min`;
        }
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
    const duration = document.getElementById('duration').value;
    const topic = document.getElementById('topic').value.trim();
    
    // Get existing entries
    const entries = loadEntries();
    
    // Add new entry
    entries.push({
        name: name,
        day: day,
        time: time,
        duration: duration,
        topic: topic
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

// Add to calendar function
function addToCalendar(index) {
    const entries = loadEntries();
    const entry = entries[index];
    
    if (!entry) return;
    
    // Parse date and time
    const [day, month, year] = entry.day.split('.');
    const [hours, minutes] = entry.time.split(':');
    
    // Create full date (assuming 2026 based on the dates used)
    const startDate = new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
    
    // Calculate end time based on duration
    const endDate = new Date(startDate.getTime() + parseInt(entry.duration) * 60000);
    
    // Format dates for ICS file (YYYYMMDDTHHMMSS)
    const formatICSDate = (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
    };
    
    const startStr = formatICSDate(startDate);
    const endStr = formatICSDate(endDate);
    
    // Create ICS file content
    const description = entry.topic ? `Themen: ${entry.topic}` : 'Lerngruppe';
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Lerngruppe//DE',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${startStr}`,
        `DTEND:${endStr}`,
        `SUMMARY:Lerngruppe - ${entry.name}`,
        `DESCRIPTION:${description}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lerngruppe_${entry.day.replace(/\./g, '')}_${entry.name.replace(/\s+/g, '_')}.ics`;
    
    // For mobile devices, try to open the calendar directly
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Try to trigger the download which will prompt to add to calendar on mobile
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        alert('Kalenderdatei wird heruntergeladen. Öffne die Datei, um den Termin zu deinem Kalender hinzuzufügen.');
    } else {
        // Desktop: just download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
}

// Initial display
displayEntries();
