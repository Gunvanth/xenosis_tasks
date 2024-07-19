document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const logoutButton = document.getElementById('logout');

    // Mock storage for user data
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let activities = JSON.parse(localStorage.getItem('activities')) || [];

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = signupForm.username.value;
            const email = signupForm.email.value;
            const password = signupForm.password.value;

            // Simple validation
            if (username && email && password.length >= 6) {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Account created successfully!');
                window.location.href = 'index.html';
            } else {
                alert('Please fill in all fields and ensure password is at least 6 characters long.');
            }
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = signinForm.email.value;
            const password = signinForm.password.value;

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                let activity = { user: user.username, action: 'Logged in', timestamp: new Date().toLocaleString() };
                activities.push(activity);
                localStorage.setItem('activities', JSON.stringify(activities));
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            let activity = { user: loggedInUser.username, action: 'Logged out', timestamp: new Date().toLocaleString() };
            activities.push(activity);
            localStorage.setItem('activities', JSON.stringify(activities));
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });

        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            document.getElementById('username-display').textContent = loggedInUser.username;
            document.getElementById('user-username').textContent = loggedInUser.username;
            document.getElementById('user-email').textContent = loggedInUser.email;

            const userActivities = activities.filter(activity => activity.user === loggedInUser.username);
            document.getElementById('login-count').textContent = userActivities.filter(activity => activity.action === 'Logged in').length;
        } else {
            window.location.href = 'index.html';
        }
    }
});
