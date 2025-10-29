
function showAlert(message) {
  const alert = document.getElementById('alertBox');
  if (alert) {
    alert.textContent = message;
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), 3000);
  }
}


function togglePasswordVisibility(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = '●';
  } else {
    input.type = 'password';
    icon.textContent = '○';
  }
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'index.html';
  }
}


function showLoginForm(userType) {
  const choice = document.querySelector('.auth-container > .auth-box');
  const studentForm = document.getElementById('student-login-form');
  const teacherForm = document.getElementById('teacher-login-form');

  if (choice) choice.style.display = 'none';
  
  if (userType === 'student' && studentForm) {
    studentForm.style.display = 'block';
  } else if (userType === 'teacher' && teacherForm) {
    teacherForm.style.display = 'block';
  }
}

function showLoginChoice() {
  const choice = document.querySelector('.auth-container > .auth-box');
  const studentForm = document.getElementById('student-login-form');
  const teacherForm = document.getElementById('teacher-login-form');

  if (choice) choice.style.display = 'block';
  if (studentForm) studentForm.style.display = 'none';
  if (teacherForm) teacherForm.style.display = 'none';
}


function handleStudentLogin(e) {
  e.preventDefault();
  const username = document.getElementById('student-username').value;
  showAlert(`Welcome back, ${username}!`);
  setTimeout(() => {
    window.location.href = 'student-dashboard.html';
  }, 1000);
}

function handleTeacherLogin(e) {
  e.preventDefault();
  const username = document.getElementById('teacher-username').value;
  showAlert(`Welcome back, Professor ${username}!`);
  setTimeout(() => {
    window.location.href = 'teacher-dashboard.html';
  }, 1000);
}


function handleStudentRegister(e) {
  e.preventDefault();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  
  if (password !== confirm) {
    showAlert('Passwords do not match!');
    return;
  }
  
  const username = document.getElementById('reg-username').value;
  showAlert(`Registration successful! Welcome, ${username}!`);
  setTimeout(() => {
    window.location.href = 'student-dashboard.html';
  }, 1000);
}


function setupDashboardNavigation() {
  const navButtons = document.querySelectorAll('.sidebar-nav button[data-section]');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      
     
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
     
      const sections = document.querySelectorAll('.dashboard-section');
      sections.forEach(section => section.classList.remove('active'));
      
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

function setupTaskCheckboxes() {
  document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.id.startsWith('task')) {
      const listItem = e.target.parentElement;
      const label = e.target.nextElementSibling;
      
      if (e.target.checked) {
        listItem.style.opacity = '0.6';
        label.style.textDecoration = 'line-through';
        showAlert('Task marked as complete!');
      } else {
        listItem.style.opacity = '1';
        label.style.textDecoration = 'none';
      }
    }
  });
}


let chartsInitialized = false;

function initializeCharts() {
  if (chartsInitialized) return;
  chartsInitialized = true;

  
  const perfCtx = document.getElementById('performanceChart');
  if (perfCtx) {
    new Chart(perfCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Performance',
          data: [75, 78, 82, 85],
          borderColor: '#0052D4',
          backgroundColor: 'rgba(0, 82, 212, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { 
            beginAtZero: true,
            max: 100,
            ticks: { color: '#000' }
          },
          x: { ticks: { color: '#000' } }
        }
      }
    });
  }

 
  const attCtx = document.getElementById('attendanceChart');
  if (attCtx) {
    new Chart(attCtx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [{
          data: [80, 10, 10],
          backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#000', padding: 15 }
          }
        }
      }
    });
  }

  
  const teacherCtx = document.getElementById('teacherChart');
  if (teacherCtx) {
    new Chart(teacherCtx, {
      type: 'bar',
      data: {
        labels: ['Class A', 'Class B', 'Class C'],
        datasets: [{
          label: 'Average Marks',
          data: [75, 82, 68],
          backgroundColor: ['#6FB1FC', '#4CAF50', '#FFC107'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { 
            beginAtZero: true,
            max: 100,
            ticks: { color: '#000' }
          },
          x: { ticks: { color: '#000' } }
        }
      }
    });
  }


  const perfBarCtx = document.getElementById('performanceBarChart');
  if (perfBarCtx) {
    new Chart(perfBarCtx, {
      type: 'bar',
      data: {
        labels: ['Excellent', 'Good', 'Average', 'Below Average'],
        datasets: [{
          label: 'Number of Students',
          data: [25, 40, 20, 15],
          backgroundColor: ['#4CAF50', '#6FB1FC', '#FFC107', '#F44336'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { 
            beginAtZero: true,
            ticks: { color: '#000' }
          },
          x: { ticks: { color: '#000' } }
        }
      }
    });
  }
}



function setupKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
   
    if (e.key === 'Escape') {
      if (window.location.pathname !== '/index.html' && 
          window.location.pathname !== '/') {
        if (confirm('Are you sure you want to go back to home?')) {
          window.location.href = 'index.html';
        }
      }
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {

  if (document.querySelector('.dashboard-page')) {
    setupDashboardNavigation();
    setTimeout(initializeCharts, 500);
  }
  
 
  setupTaskCheckboxes();
  

  setupKeyboardNavigation();
});