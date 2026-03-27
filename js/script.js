const availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

let bookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || {};

function updateTimeOptions() {
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="">Select Time</option>';
    if (!service || !date) return;
    const key = `${date}-${service}`;
    const booked = bookedSlots[key] || [];
    availableTimes.forEach(time => {
        if (!booked.includes(time)) {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('service')) {
        document.getElementById('service').addEventListener('change', updateTimeOptions);
        document.getElementById('date').addEventListener('change', updateTimeOptions);
        document.getElementById('booking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            if (!service || !date || !time) {
                alert('Please fill all fields.');
                return;
            }
            const key = `${date}-${service}`;
            if (!bookedSlots[key]) bookedSlots[key] = [];
            if (bookedSlots[key].includes(time)) {
                alert('This time slot is already booked!');
                return;
            }
            bookedSlots[key].push(time);
            localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
            document.getElementById('confirmation').style.display = 'block';
            this.reset();
            updateTimeOptions();
            setTimeout(() => {
                document.getElementById('confirmation').style.display = 'none';
            }, 5000);
        });
    }

    if (document.getElementById('membership-form')) {
        const urlParams = new URLSearchParams(window.location.search);
        const plan = urlParams.get('plan');
        if (plan) document.getElementById('plan').value = plan;
        document.getElementById('membership-form').addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('confirmation').style.display = 'block';
            this.reset();
            setTimeout(() => {
                document.getElementById('confirmation').style.display = 'none';
            }, 5000);
        });
    }
});