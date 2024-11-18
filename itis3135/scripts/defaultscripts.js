window.onload = function() { 
    document.getElementById("date").innerHTML = "Date: " + new Date().toLocaleString();
};

document.getElementById("formUserFunction").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const mood = document.getElementById("mood").value;
    let number = parseFloat(document.getElementById("polygon").value);

    number = Math.abs(Math.round(number));

    let polygonName = getPolygonName(number);

    document.getElementById("greetingMessage").innerHTML = `The Martinez inc. Company welcomes you, ${name}! We're glad you are doing ${mood}!`;

    if (number > 10 || number === 0) {
        document.getElementById("polygonMessage").innerHTML = "Enter a valid value.";
    }
    else {
        document.getElementById("polygonMessage").innerHTML = `A polygon with ${number} sides is called a ${polygonName}.`;
    }
});

function getPolygonName(sides) {
    const polygonNames = {
        1: "Monogon",
        2: "Digon",
        3: "Trigon",
        4: "Tetragon",
        5: "Pentagon",
        6: "Hexagon", 
        7: "Heptagon",
        8: "Octagon",
        9: "Nonagon",
        10: "Decagon"
    };

     return polygonNames[sides];
}

function randomGymMotivation() {
    const motivations = [
        "No pain, no gain!",
        "Push yourself harder!",
        "One more rep!",
        "You got this, champ!",
        "Stay focused, stay strong!"
    ];

    let randomIndex = Math.floor(Math.random() * motivations.length);
    alert(motivations[randomIndex]);
}

function trackCaloriesBurned() {
    let exerciseType = prompt("What exercise did you do? (running, cycling, weight lifting)").toLowerCase();
    let duration = parseInt(prompt("How many minutes did you exercise?"));

    let caloriesPerMinute = 0;

    if (exerciseType === "running") {
        caloriesPerMinute = 10;
    } else if (exerciseType === "cycling") {
        caloriesPerMinute = 8;
    } else if (exerciseType === "weight lifting") {
        caloriesPerMinute = 6;
    } else {
        caloriesPerMinute = 5; // default for unknown activities
    }

    let caloriesBurned = duration * caloriesPerMinute;
    alert(`You burned approximately ${caloriesBurned} calories while ${exerciseType}.`);
}

function recommendProteinShake() {
    let goal = prompt("What's your workout goal? (muscle gain, weight loss, endurance)").toLowerCase();
    let shake = "";

    if (goal === "muscle gain") {
        shake = "Super Bulk Shake: 2 scoops of protein, peanut butter, oats, and almond milk.";
    } else if (goal === "weight loss") {
        shake = "Lean Green Machine: 1 scoop of protein, spinach, kale, chia seeds, and coconut water.";
    } else if (goal === "endurance") {
        shake = "Endurance Beast Mix: 1 scoop of protein, banana, oats, and black coffee.";
    } else {
        shake = "Hmm, that's an interesting goal! Try a basic protein shake: protein powder and water!";
    }

    alert(`We recommend: ${shake}`);
}

function calculateWorkoutIntensity() {
    let exercises = parseInt(prompt("How many exercises did you complete?"));
    let time = parseInt(prompt("How many minutes did your workout last?"));

    let intensity = exercises / time;

    let message = "";
    if (intensity < 0.2) {
        message = "Easy Peasy";
    } else if (intensity >= 0.2 && intensity < 0.5) {
        message = "Moderate";
    } else if (intensity >= 0.5 && intensity < 0.8) {
        message = "Sweating Buckets";
    } else {
        message = "Beast Mode Activated!";
    }

    alert(`Your workout intensity is: ${message}`);
}



