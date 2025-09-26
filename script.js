document.addEventListener('DOMContentLoaded', () => {
    const protocolsData = [
        { acronym: 'FTP', name: 'File Transfer Protocol', port: '20-21' },
        { acronym: 'SSH', name: 'Secure Shell', port: '22' },
        { acronym: 'Telnet', name: 'Telnet', port: '23' },
        { acronym: 'SMTP', name: 'Simple Mail Transfer Protocol', port: '25' },
        { acronym: 'DNS', name: 'Domain Name System', port: '53' },
        { acronym: 'DHCP', name: 'Dynamic Host Configuration Protocol', port: '67/68' },
        { acronym: 'HTTP', name: 'Hypertext Transfer Protocol', port: '80' },
        { acronym: 'POP3', name: 'Post Office Protocol 3', port: '110' },
        { acronym: 'IMAP', name: 'Internet Mail Access Protocol', port: '143' },
        { acronym: 'NetBIOS', name: 'Network Basic Input/Output System', port: '137-139' },
        { acronym: 'LDAP', name: 'Lightweight Directory Access Protocol', port: '389' },
        { acronym: 'HTTPS', name: 'Hypertext Transfer Protocol Secure', port: '443' },
        { acronym: 'SMB', name: 'Server Message Block', port: '445' },
        { acronym: 'CIFS', name: 'Common Internet File System', port: '445' },
        { acronym: 'RDP', name: 'Remote Desktop Protocol', port: '3389' }
    ];

    let currentProtocolIndex = 0;
    const shuffledProtocols = [...protocolsData].sort(() => Math.random() - 0.5);
    
    let totalScore = 0;
    let startTime;
    const MAX_POINTS_PER_QUESTION = 1000;
    const SKIP_PENALTY = 200;

    const acronymDisplay = document.getElementById('protocol-acronym');
    const inputField = document.getElementById('protocol-input');
    const portNumbersContainer = document.getElementById('port-numbers-container');
    const dropZone = document.getElementById('drop-zone');
    const feedbackMessage = document.getElementById('feedback-message');
    const nextButton = document.getElementById('next-button');
    const skipButton = document.getElementById('skip-button');
    const scoreDisplay = document.getElementById('score-display');

    // NEW: Only load the sounds you provided.
    const skipSound = new Audio('windows_xp_error.mp3');
    const endGameSound = new Audio('windows_xp_logon.mp3');
    // Background music: using the MP3 you provided. Make sure this file is in the same folder as this script.
    // Path: c:\Users\kstafford\Desktop\HTML\portproto\XPtourmusic.mp3
    const bgMusic = new Audio('XPtourmusic.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.25; // start a bit low so it isn't too loud

    // Try to autoplay the background music. Many browsers block autoplay with sound,
    // so if play() is rejected we'll show a small "Play Music" button the user can click.
    function tryStartBackgroundMusic() {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked — create a small unobtrusive button so the user can enable music
                createMusicPlayButton();
            });
        }
    }

    function createMusicPlayButton() {
        if (document.getElementById('music-play-button')) return;
        const btn = document.createElement('button');
        btn.id = 'music-play-button';
        btn.textContent = 'Play Music';
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            zIndex: 10000,
            padding: '8px 12px',
            background: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        });
        btn.addEventListener('click', () => {
            bgMusic.play().then(() => {
                btn.remove();
            }).catch(() => {
                // If it still fails, leave the button so the user can try again
            });
        });
        document.body.appendChild(btn);
    }

    // Gracefully stop the background music when the game ends (fade out)
    function stopBackgroundMusic() {
        try {
            const fadeStep = 0.05;
            const fadeInterval = setInterval(() => {
                if (bgMusic.volume - fadeStep > 0) {
                    bgMusic.volume = Math.max(0, bgMusic.volume - fadeStep);
                } else {
                    bgMusic.pause();
                    bgMusic.currentTime = 0;
                    bgMusic.volume = 0.25; // reset for next play
                    clearInterval(fadeInterval);
                }
            }, 100);
        } catch (e) {
            // If anything goes wrong, ensure the music is stopped
            try { bgMusic.pause(); bgMusic.currentTime = 0; } catch (err) {}
        }
    }

    function updateScoreDisplay() {
        scoreDisplay.textContent = `Score: ${totalScore}`;
    }

    function loadQuestion() {
        if (currentProtocolIndex >= shuffledProtocols.length) {
            endGame();
            return;
        }

        const currentProtocol = shuffledProtocols[currentProtocolIndex];
        acronymDisplay.textContent = currentProtocol.acronym;
        inputField.value = '';
        inputField.disabled = false;
        dropZone.innerHTML = '<p>Drag the correct port here</p>';
        dropZone.style.backgroundColor = 'transparent';
        nextButton.style.display = 'none';
        skipButton.style.display = 'block';
        feedbackMessage.style.opacity = 0;
        
        inputField.focus();
        
        startTime = Date.now();
        updateScoreDisplay();

        generatePortNumbers(currentProtocol.port);
    }

    function generatePortNumbers(correctPort) {
        portNumbersContainer.innerHTML = '';
        const allPorts = protocolsData.map(p => p.port);
        const uniquePorts = [...new Set(allPorts)];

        const randomPorts = [];
        
        while (randomPorts.length < 5) {
            const randomIndex = Math.floor(Math.random() * uniquePorts.length);
            const port = uniquePorts[randomIndex];
            if (!randomPorts.includes(port)) {
                randomPorts.push(port);
            }
        }
        if (!randomPorts.includes(correctPort)) {
            randomPorts[Math.floor(Math.random() * randomPorts.length)] = correctPort;
        }
        
        const shuffledPorts = randomPorts.sort(() => Math.random() - 0.5);

        shuffledPorts.forEach(port => {
            const portDiv = document.createElement('div');
            portDiv.className = 'port-number';
            portDiv.textContent = port;
            portDiv.draggable = true;
            portDiv.dataset.port = port;
            portDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.port);
            });
            portNumbersContainer.appendChild(portDiv);
        });
    }

    function checkAnswer() {
        const currentProtocol = shuffledProtocols[currentProtocolIndex];
        const typedAnswer = inputField.value.trim().toLowerCase();
        
        let correctAnswers = [];
        if (currentProtocol.acronym === 'NetBIOS') {
            correctAnswers = ['network basic input/output system', 'network basic input output system'];
        } else if (currentProtocol.acronym === 'SMB') {
            correctAnswers = ['server message block'];
        } else if (currentProtocol.acronym === 'CIFS') {
            correctAnswers = ['common internet file system'];
        } else if (currentProtocol.acronym === 'IMAP') {
            correctAnswers = ['internet mail access protocol', 'internet message access protocol'];
        } else {
            correctAnswers.push(currentProtocol.name.toLowerCase());
        }

        const isCorrect = correctAnswers.some(correctAnswer => typedAnswer.includes(correctAnswer));

        if (isCorrect) {
            inputField.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color');
            return true;
        } else {
            inputField.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--danger-color');
            return false;
        }
    }
    
    inputField.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = 'transparent';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = 'transparent';
        const droppedPort = e.dataTransfer.getData('text/plain');
        const correctPort = shuffledProtocols[currentProtocolIndex].port;

        if (checkAnswer() && droppedPort === correctPort) {
            // Correct answer, but no specific sound
            const timeElapsed = (Date.now() - startTime) / 1000;
            const pointsEarned = Math.max(0, MAX_POINTS_PER_QUESTION - (timeElapsed * 50));
            totalScore += Math.floor(pointsEarned);

            const portDiv = document.querySelector(`.port-number[data-port="${droppedPort}"]`);
            dropZone.innerHTML = '';
            dropZone.appendChild(portDiv);
            portDiv.style.cursor = 'default';
            portDiv.draggable = false;
            
            feedbackMessage.textContent = `Correct! +${Math.floor(pointsEarned)} points!`;
            feedbackMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--success-color');
            feedbackMessage.style.opacity = 1;
            
            updateScoreDisplay();

            inputField.disabled = true;
            nextButton.style.display = 'block';
            skipButton.style.display = 'none';
        } else {
            // Incorrect answer, no specific sound
            feedbackMessage.textContent = 'Incorrect. Try again!';
            feedbackMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--danger-color');
            feedbackMessage.style.opacity = 1;
        }
    });

    nextButton.addEventListener('click', () => {
        currentProtocolIndex++;
        loadQuestion();
    });

    skipButton.addEventListener('click', () => {
        skipSound.play();
        
        totalScore = Math.max(0, totalScore - SKIP_PENALTY);
        updateScoreDisplay();

        const skippedProtocol = shuffledProtocols.splice(currentProtocolIndex, 1)[0];
        shuffledProtocols.push(skippedProtocol);
        
        loadQuestion();

        feedbackMessage.textContent = `Skipped! -${SKIP_PENALTY} points.`;
        feedbackMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--danger-color');
        feedbackMessage.style.opacity = 1;
    });

    function endGame() {
        endGameSound.play();
        // Stop/fade the background music when the game ends
        stopBackgroundMusic();
        acronymDisplay.textContent = 'Game Over!';
        inputField.style.display = 'none';
        portNumbersContainer.style.display = 'none';
        dropZone.style.display = 'none';
        nextButton.style.display = 'none';
        skipButton.style.display = 'none';
        feedbackMessage.textContent = `You have completed the challenge with a final score of ${totalScore}! Hit the refresh button to start over`;
        feedbackMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        feedbackMessage.style.opacity = 1;
    }

    // Try to start background music (may be blocked by browser autoplay policies)
    tryStartBackgroundMusic();

    loadQuestion();
});
