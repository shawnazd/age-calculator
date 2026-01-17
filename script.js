document.addEventListener('DOMContentLoaded', () => {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    
    const ageText = document.getElementById('current-age-text');
    const birthdayText = document.getElementById('next-birthday-text');
    const nextDateLabel = document.getElementById('next-date-label');

    // Populate Days (1-31)
    for (let i = 1; i <= 31; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        daySelect.appendChild(opt);
    }

    // Populate Years (Current Year down to 1900)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        yearSelect.appendChild(opt);
    }

    calculateBtn.addEventListener('click', () => {
        const d = parseInt(daySelect.value);
        const m = parseInt(monthSelect.value);
        const y = parseInt(yearSelect.value);

        const today = new Date();
        const birthDate = new Date(y, m, d);

        // 1. AGE CALCULATION
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        // 2. NEXT BIRTHDAY CALCULATION
        let nextBday = new Date(today.getFullYear(), m, d);
        if (nextBday < today) {
            nextBday.setFullYear(today.getFullYear() + 1);
        }

        // Exact countdown
        let diff = nextBday - today;
        let totalDaysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
        
        let monthsRemaining = Math.floor(totalDaysLeft / 30.44);
        let daysRemaining = Math.floor(totalDaysLeft % 30.44);

        // Update UI
        resultContainer.classList.remove('hidden');
        ageText.innerText = `${ageYears}y ${ageMonths}m ${ageDays}d`;
        
        if (totalDaysLeft === 365 || totalDaysLeft === 0) {
            birthdayText.innerText = "🎉 It's Today!";
            nextDateLabel.innerText = "Enjoy your day!";
        } else {
            birthdayText.innerText = `${monthsRemaining} Months, ${daysRemaining} Days`;
            nextDateLabel.innerText = `Scheduled for: ${nextBday.toLocaleDateString()}`;
        }
    });
});