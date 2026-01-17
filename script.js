document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const nextDateLabel = document.getElementById('next-date-label');

    calculateBtn.addEventListener('click', () => {
        const birthDateValue = dateInput.value;

        if (!birthDateValue) {
            alert("Please select a valid date.");
            return;
        }

        const today = new Date();
        const birthDate = new Date(birthDateValue);
        
        // 1. Determine the "Next Birthday"
        // Set year to current year
        let nextBirthday = new Date(
            today.getFullYear(), 
            birthDate.getMonth(), 
            birthDate.getDate()
        );

        // 2. If birthday already happened this year, set to next year
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        // 3. Calculate Time Difference
        const diffInMs = nextBirthday - today;
        
        // Calculate months and days remaining
        // We use a simplified calculation for months/days
        let months = nextBirthday.getMonth() - today.getMonth();
        let days = nextBirthday.getDate() - today.getDate();

        // Adjust if days are negative
        if (days < 0) {
            months--;
            // Get last day of previous month
            const lastMonth = new Date(nextBirthday.getFullYear(), nextBirthday.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Adjust if months are negative (happens when next birthday is next year)
        if (months < 0) {
            months += 12;
        }

        // 4. Update UI
        displayResult(months, days, nextBirthday);
    });

    function displayResult(months, days, nextDate) {
        // Show the container
        resultContainer.classList.remove('hidden');

        // Format the text
        let monthString = months === 1 ? "month" : "months";
        let dayString = days === 1 ? "day" : "days";
        
        // Case for "Happy Birthday" (Today)
        if (months === 0 && days === 0) {
            resultText.innerText = "🎉 Happy Birthday! It's today!";
            nextDateLabel.innerText = "";
        } else {
            resultText.innerText = `${months} ${monthString} and ${days} ${dayString}`;
            nextDateLabel.innerText = `Coming up on ${nextDate.toDateString()}`;
        }
    }
});