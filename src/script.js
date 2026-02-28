document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('categorySearch');

    const schedule = [
        { time: '10:00 AM - 11:00 AM', talkIndex: 0 },
        { time: '11:00 AM - 11:10 AM', type: 'break', title: 'Transition' },
        { time: '11:10 AM - 12:10 PM', talkIndex: 1 },
        { time: '12:10 PM - 12:20 PM', type: 'break', title: 'Transition' },
        { time: '12:20 PM - 1:20 PM', talkIndex: 2 },
        { time: '1:20 PM - 2:20 PM', type: 'break', title: 'Lunch Break' },
        { time: '2:20 PM - 3:20 PM', talkIndex: 3 },
        { time: '3:20 PM - 3:30 PM', type: 'break', title: 'Transition' },
        { time: '3:30 PM - 4:30 PM', talkIndex: 4 },
        { time: '4:30 PM - 4:40 PM', type: 'break', title: 'Transition' },
        { time: '4:40 PM - 5:40 PM', talkIndex: 5 }
    ];

    function renderSchedule(filter = '') {
        scheduleContainer.innerHTML = '';
        const filterLower = filter.toLowerCase();

        schedule.forEach(item => {
            if (item.type === 'break') {
                if (!filter) { // Only show breaks when not filtering
                    const breakEl = document.createElement('div');
                    breakEl.className = 'schedule-item break';
                    breakEl.textContent = `${item.time} - ${item.title}`;
                    scheduleContainer.appendChild(breakEl);
                }
                return;
            }

            const talk = talksData[item.talkIndex];
            const hasCategory = talk.categories.some(cat => cat.toLowerCase().includes(filterLower));

            if (filter && !hasCategory) {
                return;
            }

            const talkEl = document.createElement('div');
            talkEl.className = 'schedule-item';

            const categoriesHtml = talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('');

            talkEl.innerHTML = `
                <div class="time">${item.time}</div>
                <h2>${talk.title}</h2>
                <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                <p>${talk.description}</p>
                <div class="categories">${categoriesHtml}</div>
            `;
            scheduleContainer.appendChild(talkEl);
        });
    }

    searchInput.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    // Initial render
    renderSchedule();
});
