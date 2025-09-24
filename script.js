/* Windows XP Luna-inspired color palette */
:root {
    --primary-color: #4A81E4; /* Luna's signature blue */
    --primary-hover-color: #3B72D0;
    --success-color: #8FD853; /* A vibrant green for success */
    --success-hover-color: #79C240;
    --danger-color: #F84949; /* A softer red for danger */
    --danger-hover-color: #DC3838;
    --background-color: #f0f8ff; /* A slightly off-white blue */
    --card-bg-color: #E6F3FF; /* A very light blue for the main card */
    --border-color: #C1D9F3; /* A light blue border */
}

/* Base Styles with Luna theme background */
body {
    font-family: 'Segoe UI', 'Arial', sans-serif; /* A font similar to Windows */
    background-color: var(--background-color);
    margin: 0;
    padding: 0;
    color: #333;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-image: url('windows_xp_16.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5); /* Soft text shadow for a 3D effect */
}

/* Header Styles */
header {
    background-color: var(--primary-color);
    color: white;
    padding: 2rem 1rem;
    text-align: center;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid var(--border-color);
}

header h1 {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

header p {
    font-size: 1.1rem;
    margin: 0.5rem 0 0;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

/* Main Game Container */
main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem;
}

#game-container {
    background-color: var(--card-bg-color);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
    max-width: 650px;
    width: 100%;
    border: 2px solid var(--border-color);
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
}

/* Protocol Display and Input */
#protocol-display h2 {
    font-size: 3rem;
    color: var(--primary-color);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    margin: 0;
}

#protocol-input {
    width: 85%;
    padding: 0.85rem;
    font-size: 1.1rem;
    margin-top: 1.5rem;
    border: 2px solid #9AB0CF;
    border-radius: 6px;
    background: #F9FDFE;
    text-align: center;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s;
}

#protocol-input:focus {
    outline: none;
    border-color: #729FDB;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 5px rgba(114, 159, 219, 0.5);
}

/* Drop Zone Styles */
#drop-zone-container {
    margin-top: 2.5rem;
}

#drop-zone {
    border: 2px dashed var(--border-color);
    padding: 2.5rem;
    border-radius: 10px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    background: linear-gradient(to bottom, #F0F7FF, #E6F3FF);
}

#drop-zone p {
    margin: 0;
    color: #777;
    font-style: italic;
}

/* Port Numbers */
#port-numbers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
    margin-top: 2.5rem;
    min-height: 100px;
}

.port-number {
    background: linear-gradient(to bottom, #8BAFE6, #6D90DB);
    color: white;
    padding: 1.25rem 1.75rem;
    border-radius: 8px;
    cursor: grab;
    transition: transform 0.2s, background 0.3s;
    font-size: 1.5rem;
    font-weight: bold;
    border: 1px solid #5C7BBE;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.port-number:active {
    cursor: grabbing;
    background: linear-gradient(to bottom, #6D90DB, #8BAFE6);
    transform: translateY(2px);
}

/* Button Styles */
#button-container {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 3rem;
}

#next-button, #skip-button {
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, box-shadow 0.2s;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}

#next-button {
    background: linear-gradient(to bottom, var(--success-color), var(--success-hover-color));
}

#skip-button {
    background: linear-gradient(to bottom, #FFD35F, #FFC107);
    color: #555;
    text-shadow: none;
}

#next-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, var(--success-hover-color), var(--success-color));
}

#skip-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #FFC107, #FFD35F);
}

#feedback-message {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.5s;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8);
}
