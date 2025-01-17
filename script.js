document.getElementById('coursesCompleted').addEventListener('input', function() {
    const coursesCompleted = parseInt(this.value);
    if (!isNaN(coursesCompleted)) {
        document.getElementById('creditsCompleted').value = coursesCompleted * 3;
    } else {
        document.getElementById('creditsCompleted').value = '';
    }
});

document.getElementById('creditsCompleted').addEventListener('input', function() {
    const creditsCompleted = parseInt(this.value);
    if (!isNaN(creditsCompleted) && creditsCompleted >= 0) {
        document.getElementById('coursesCompleted').value = Math.floor(creditsCompleted / 3);
    } else {
        document.getElementById('coursesCompleted').value = '';
    }
});

document.getElementById('nextButton').addEventListener('click', function() {
    const currentCgpa = parseFloat(document.getElementById('currentCgpa').value);
    if (currentCgpa < 0 || currentCgpa > 4) {
        alert("CGPA must be between 0 and 4.");
        return;
    }

    document.getElementById('currentCourses').style.display = 'block';
    const numCourses = document.getElementById('coursesTaken').value;
    const courseInputs = document.getElementById('courseInputs');
    courseInputs.innerHTML = '';

    for (let i = 0; i < numCourses; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `CGPA for Course ${i + 1}`;
        courseInputs.appendChild(input);
    }
});

document.getElementById('calculateButton').addEventListener('click', function() {
    const currentCgpa = parseFloat(document.getElementById('currentCgpa').value);
    let coursesCompleted = parseInt(document.getElementById('coursesCompleted').value);
    const creditsCompleted = parseInt(document.getElementById('creditsCompleted').value);
    
    // Validate credits
    if (creditsCompleted < 0) {
        alert("Credits cannot be negative.");
        return;
    }

    // Calculate courses completed if credits are provided
    if (creditsCompleted) {
        coursesCompleted = Math.floor(creditsCompleted / 3);
    }

    const numCourses = parseInt(document.getElementById('coursesTaken').value);
    const courseInputs = document.getElementById('courseInputs').getElementsByTagName('input');
    
    let totalCurrentCgpa = 0;
    for (let input of courseInputs) {
        const courseCgpa = parseFloat(input.value);
        if (courseCgpa < 0 || courseCgpa > 4) {
            alert("Each course CGPA must be between 0 and 4.");
            return;
        }
        totalCurrentCgpa += courseCgpa;
    }

    const newCgpa = ((coursesCompleted * currentCgpa) + totalCurrentCgpa) / (coursesCompleted + numCourses);
    document.getElementById('newCgpa').innerText = newCgpa.toFixed(2);
    document.getElementById('result').style.display = 'block';
});

// New functionality for calculateAgainButton
document.getElementById('calculateAgainButton').addEventListener('click', function() {
    document.getElementById('currentCgpa').value = '';
    document.getElementById('coursesCompleted').value = '';
    document.getElementById('creditsCompleted').value = '';
    document.getElementById('courseInputs').innerHTML = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('currentCourses').style.display = 'none';
});

// New functionality to adjust scroll position when input fields are focused
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        setTimeout(() => {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300); // Delay to allow keyboard to open
    });
});
