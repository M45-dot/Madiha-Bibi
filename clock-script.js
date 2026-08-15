// ===========================
// TIME ZONE MANAGEMENT
// ===========================

const defaultTimeZones = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' }
];

let activeTimeZones = [...defaultTimeZones];

// All available time zones
const allTimeZones = [
    // Americas
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Chicago', timezone: 'America/Chicago' },
    { name: 'Denver', timezone: 'America/Denver' },
    { name: 'Anchorage', timezone: 'America/Anchorage' },
    { name: 'Honolulu', timezone: 'Pacific/Honolulu' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
    
    // Europe
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Rome', timezone: 'Europe/Rome' },
    { name: 'Madrid', timezone: 'Europe/Madrid' },
    { name: 'Amsterdam', timezone: 'Europe/Amsterdam' },
    { name: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul' },
    
    // Africa
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Lagos', timezone: 'Africa/Lagos' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
    { name: 'Nairobi', timezone: 'Africa/Nairobi' },
    
    // Asia
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Seoul', timezone: 'Asia/Seoul' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'Karachi', timezone: 'Asia/Karachi' },
    { name: 'Jakarta', timezone: 'Asia/Jakarta' },
    { name: 'Manila', timezone: 'Asia/Manila' },
    { name: 'Tehran', timezone: 'Asia/Tehran' },
    { name: 'Baghdad', timezone: 'Asia/Baghdad' },
    { name: 'Jerusalem', timezone: 'Asia/Jerusalem' },
    
    // Oceania
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne' },
    { name: 'Brisbane', timezone: 'Australia/Brisbane' },
    { name: 'Perth', timezone: 'Australia/Perth' },
    { name: 'Auckland', timezone: 'Pacific/Auckland' },
    { name: 'Fiji', timezone: 'Pacific/Fiji' }
];

// ===========================
// DOM ELEMENTS
// ===========================

const timezoneGrid = document.getElementById('timezone-grid');
const addTimezoneBtn = document.getElementById('add-timezone-btn');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('timezone-modal');
const closeBtn = document.querySelector('.close');
const timezoneSelect = document.getElementById('timezone-select');
const addConfirmBtn = document.getElementById('add-confirm-btn');

// ===========================
// INITIALIZATION
// ===========================

function initializeApp() {
    populateTimezoneSelect();
    renderTimeZones();
    updateClocks();
    setInterval(updateClocks, 1000);
}

// ===========================
// POPULATE SELECT OPTIONS
// ===========================

function populateTimezoneSelect() {
    timezoneSelect.innerHTML = '<option value="">Select a time zone...</option>';
    allTimeZones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.timezone;
        option.textContent = `${tz.name} (${tz.timezone})`;
        timezoneSelect.appendChild(option);
    });
}

// ===========================
// RENDER TIME ZONES
// ===========================

function renderTimeZones() {
    timezoneGrid.innerHTML = '';
    
    if (activeTimeZones.length === 0) {
        timezoneGrid.innerHTML = `
            <div class="empty-state">
                <h3>No time zones added</h3>
                <p>Click "+ Add Time Zone" to get started</p>
            </div>
        `;
        return;
    }

    activeTimeZones.forEach((tz, index) => {
        const card = document.createElement('div');
        card.className = 'timezone-card new';
        card.innerHTML = `
            <div class="timezone-name">
                <span>${tz.name}</span>
                <button class="remove-btn" data-index="${index}" title="Remove">×</button>
            </div>
            <div class="timezone-label">Local Time</div>
            <div class="digital-time" data-index="${index}">--:--:--</div>
            <div class="timezone-info" data-info="${index}"></div>
            <div class="timezone-offset" data-offset="${index}"></div>
            <div class="timezone-date" data-date="${index}"></div>
        `;
        timezoneGrid.appendChild(card);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeTimeZone(index);
        });
    });
}

// ===========================
// UPDATE CLOCKS
// ===========================

function updateClocks() {
    activeTimeZones.forEach((tz, index) => {
        const timeElement = document.querySelector(`[data-index="${index}"]`);
        const infoElement = document.querySelector(`[data-info="${index}"]`);
        const offsetElement = document.querySelector(`[data-offset="${index}"]`);
        const dateElement = document.querySelector(`[data-date="${index}"]`);

        if (!timeElement) return;

        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const formattedTime = formatter.format(now);
        timeElement.textContent = formattedTime;

        // Get time zone offset
        const dateInTz = new Date(now.toLocaleString('en-US', { timeZone: tz.timezone }));
        const offset = getTimeZoneOffset(tz.timezone, now);
        if (offsetElement) {
            offsetElement.textContent = `UTC ${offset}`;
        }

        // Get day of week and date
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (dateElement) {
            dateElement.textContent = dateFormatter.format(now);
        }

        // Get additional info
        const dayFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            weekday: 'short'
        });
        if (infoElement) {
            infoElement.textContent = dayFormatter.format(now);
        }
    });
}

// ===========================
// GET TIME ZONE OFFSET
// ===========================

function getTimeZoneOffset(timezone, date) {
    // Get the UTC time
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    // Get the timezone date
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    
    // Calculate the difference in milliseconds and convert to hours
    const diffMs = utcDate - tzDate;
    const diffHours = -diffMs / (1000 * 60 * 60);
    
    const sign = diffHours >= 0 ? '+' : '';
    const hours = Math.floor(Math.abs(diffHours));
    const minutes = Math.round((Math.abs(diffHours) % 1) * 60);
    
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// ===========================
// ADD TIME ZONE
// ===========================

function addTimeZone() {
    const selectedValue = timezoneSelect.value;
    if (!selectedValue) {
        alert('Please select a time zone');
        return;
    }

    const timezone = allTimeZones.find(tz => tz.timezone === selectedValue);
    if (timezone && !activeTimeZones.find(tz => tz.timezone === timezone.timezone)) {
        activeTimeZones.push(timezone);
        renderTimeZones();
        updateClocks();
        timezoneSelect.value = '';
        modal.style.display = 'none';
    } else if (activeTimeZones.find(tz => tz.timezone === timezone.timezone)) {
        alert('This time zone is already added');
    }
}

// ===========================
// REMOVE TIME ZONE
// ===========================

function removeTimeZone(index) {
    activeTimeZones.splice(index, 1);
    renderTimeZones();
    updateClocks();
}

// ===========================
// RESET TO DEFAULT
// ===========================

function resetToDefault() {
    activeTimeZones = [...defaultTimeZones];
    renderTimeZones();
    updateClocks();
}

// ===========================
// MODAL CONTROLS
// ===========================

addTimezoneBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    timezoneSelect.focus();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

addConfirmBtn.addEventListener('click', addTimeZone);

timezoneSelect.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTimeZone();
    }
});

resetBtn.addEventListener('click', resetToDefault);

// ===========================
// INITIALIZE ON LOAD
// ===========================

window.addEventListener('load', initializeApp);

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Close modal on Escape
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});