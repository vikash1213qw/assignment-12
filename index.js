document.addEventListener("DOMContentLoaded", function () {
    const fruits = ["🍎", "🍌", "🍒", "🍊"]; // Add more fruits if desired
    const GRID_SIZE = 4;
    const LEVEL_TIME = 30; // Time limit for each level in seconds

    const gridContainer = document.getElementById("grid-container");
    const timerElement = document.getElementById("timer");
    const levelNumberElement = document.getElementById("level-number");

    let level = 1;
    let timer;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createGrid() {
        shuffle(fruits);
        gridContainer.innerHTML = "";
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.fruit = fruits[i % (GRID_SIZE * GRID_SIZE / 2)];
            card.innerHTML = "&nbsp;";
            card.addEventListener("click", handleCardClick);
            gridContainer.appendChild(card);
        }
    }

    function handleCardClick() {
        if (!timer) return;
        const selectedCards = document.querySelectorAll(".selected");
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
                firstCard.removeEventListener("click", handleCardClick);
                secondCard.removeEventListener("click", handleCardClick);
                firstCard.classList.remove("selected");
                secondCard.classList.remove("selected");
                if (document.querySelectorAll(".card").length === 0) {
                    level++;
                    levelNumberElement.textContent = level;
                    startTimer();
                    createGrid();
                }
            } else {
                setTimeout(() => {
                    selectedCards.forEach(card => card.classList.remove("selected"));
                }, 1000);
            }
        }
        this.classList.add("selected");
    }

    function startTimer() {
        clearInterval(timer);
        let timeLeft = LEVEL_TIME;
        timer = setInterval(() => {
            timerElement.textContent = `Time left: ${timeLeft}`;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
                timer = null;
                level--;
                levelNumberElement.textContent = level;
                createGrid();
                startTimer();
            }
        }, 1000);
    }

    createGrid();
    startTimer();
});
