// RSVP Form Submission
function submitRSVP() {
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;
    const attendance = document.getElementById('attendance').value;
    const guestCount = document.getElementById('guestCount').value;
    const specialRequests = document.getElementById('specialRequests').value;

    // Validation
    if (!name || !email || !phone || !attendance) {
        alert('Please fill in all required fields (Name, Email, Phone, and Attendance)');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return;
    }

    // Create RSVP object
    const rsvpData = {
        name: name,
        email: email,
        phone: phone,
        attendance: attendance,
        guestCount: guestCount || 1,
        specialRequests: specialRequests,
        timestamp: new Date().toISOString()
    };

    // Store in localStorage (in a real application, this would be sent to a server)
    let rsvpList = JSON.parse(localStorage.getItem('weddingRSVPs')) || [];
    rsvpList.push(rsvpData);
    localStorage.setItem('weddingRSVPs', JSON.stringify(rsvpList));

    // Show success message
    const attendanceText = attendance === 'yes' ? 'accepted' : 'declined';
    alert(`Thank you, ${name}! Your RSVP has been ${attendanceText}.\n\nWe've received your response and will send you a confirmation email shortly.`);

    // Clear form
    document.getElementById('guestName').value = '';
    document.getElementById('guestEmail').value = '';
    document.getElementById('guestPhone').value = '';
    document.getElementById('attendance').value = '';
    document.getElementById('guestCount').value = '';
    document.getElementById('specialRequests').value = '';

    // Log to console (for demonstration)
    console.log('RSVP Submitted:', rsvpData);
    console.log('All RSVPs:', rsvpList);
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add enter key support for RSVP form
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    submitRSVP();
                }
            }
        });
    });

    // Add floating animation to decorative elements
    const decorativeElements = document.querySelectorAll('.decorative-line');
    decorativeElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });

    // Console message for developers
    console.log('%c💒 Wedding Invitation Card', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cBuilt with love ❤️', 'font-size: 14px; color: #764ba2;');
});

// Add floating animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Function to download RSVP list (for wedding organizers)
function downloadRSVPList() {
    const rsvpList = JSON.parse(localStorage.getItem('weddingRSVPs')) || [];
    
    if (rsvpList.length === 0) {
        alert('No RSVPs to download yet.');
        return;
    }

    const csvContent = convertToCSV(rsvpList);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-rsvp-list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function convertToCSV(data) {
    const headers = ['Name', 'Email', 'Phone', 'Attendance', 'Guest Count', 'Special Requests', 'Timestamp'];
    const rows = data.map(item => [
        item.name,
        item.email,
        item.phone,
        item.attendance,
        item.guestCount,
        item.specialRequests || 'None',
        new Date(item.timestamp).toLocaleString()
    ]);

    const csvRows = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ];

    return csvRows.join('\n');
}

// To download RSVPs, open browser console and type: downloadRSVPList()
console.log('💡 Tip: To download all RSVPs, type "downloadRSVPList()" in the console');