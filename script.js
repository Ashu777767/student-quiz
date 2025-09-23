// Quiz questions and answers
const quizData = [
    // Analytical / Problem-Solving Skills
    {
        question: "During a challenging puzzle or brain teaser, what do you usually do?",
        options: [
            "I enjoy figuring it out step by step and find solutions logically.",
            "I try but often get frustrated and give up.",
            "I avoid it and prefer simpler tasks."
        ],
        correctAnswer: 0,
        category: "Analytical"
    },
    {
        question: "When faced with a problem at school, like a tricky math question, how do you approach it?",
        options: [
            "I break it into smaller parts and solve each step logically.",
            "I guess or use trial and error.",
            "I wait for the teacher or someone else to solve it for me."
        ],
        correctAnswer: 0,
        category: "Analytical"
    },
    {
        question: "You are given a coding challenge or science experiment. How do you feel?",
        options: [
            "Excited to try different approaches and learn from trial and error.",
            "Hesitant, not sure where to start.",
            "Avoid it completely."
        ],
        correctAnswer: 0,
        category: "Analytical"
    },

    // Creative / Artistic Skills
    {
        question: "When given a project, how do you approach it?",
        options: [
            "I think of unique ways to present it creatively.",
            "I follow instructions strictly without adding my touch.",
            "I do it quickly without much thought."
        ],
        correctAnswer: 0,
        category: "Creative"
    },
    {
        question: "You are asked to design a poster, sketch, or art project. How do you respond?",
        options: [
            "I enjoy creating something visually appealing and unique.",
            "I do it but struggle to make it creative.",
            "I avoid it because I’m not confident."
        ],
        correctAnswer: 0,
        category: "Creative"
    },
    {
        question: "In a class discussion or presentation, how do you express your ideas?",
        options: [
            "I use illustrations, examples, or stories to make it engaging.",
            "I speak plainly and stick to facts.",
            "I rarely participate."
        ],
        correctAnswer: 0,
        category: "Creative"
    },

    // Memory / Detail-Oriented Skills
    {
        question: "When studying for exams, how do you remember complex information?",
        options: [
            "I use mnemonics, diagrams, or mind maps to remember easily.",
            "I reread the notes multiple times.",
            "I struggle to remember and often forget things."
        ],
        correctAnswer: 0,
        category: "Memory"
    },
    {
        question: "When working on a model or project that requires precision, how do you handle it?",
        options: [
            "I carefully plan and pay attention to every detail.",
            "I do it quickly and correct mistakes later.",
            "I make a rough version without focusing on details."
        ],
        correctAnswer: 0,
        category: "Memory"
    },
    {
        question: "When learning something new, how quickly can you recall important facts?",
        options: [
            "I remember most details after practice.",
            "I remember some things but often forget small details.",
            "I struggle to remember."
        ],
        correctAnswer: 0,
        category: "Memory"
    },

    // Communication / Leadership Skills
    {
        question: "When working in a group project, how do you contribute?",
        options: [
            "I lead the group, organize tasks, and ensure everyone participates.",
            "I do my part but rarely take initiative.",
            "I mostly follow what others say."
        ],
        correctAnswer: 0,
        category: "Leadership"
    },
    {
        question: "You have to give a presentation in front of the class. How do you feel?",
        options: [
            "Confident, I enjoy sharing my ideas clearly.",
            "Nervous but try my best.",
            "I avoid it if possible."
        ],
        correctAnswer: 0,
        category: "Leadership"
    },
    {
        question: "When trying to explain a difficult topic to a friend, how do you do it?",
        options: [
            "I find examples and break it down so they understand easily.",
            "I repeat the same explanation without clarity.",
            "I struggle and often give up."
        ],
        correctAnswer: 0,
        category: "Leadership"
    },

    // Social / Empathy / Helping Skills
    {
        question: "When a friend is upset or struggling, how do you respond?",
        options: [
            "I listen carefully and try to help them find a solution.",
            "I feel concerned but don’t know what to do.",
            "I ignore it and focus on myself."
        ],
        correctAnswer: 0,
        category: "Empathy"
    },
    {
        question: "During group activities, how do you interact with others?",
        options: [
            "I try to include everyone and ensure everyone is comfortable.",
            "I interact with some but mostly keep to myself.",
            "I participate minimally."
        ],
        correctAnswer: 0,
        category: "Empathy"
    },
    {
        question: "You see someone being treated unfairly. What would you do?",
        options: [
            "I speak up or help them if I can.",
            "I feel bad but don’t intervene.",
            "I stay out of it."
        ],
        correctAnswer: 0,
        category: "Empathy"
    }


];

let currentQuestion = 0;
let userAnswers = [];
let score = 0;
let categoryScores = {};

function startQuiz() {
    // Save user info from the form
    const userName = document.getElementById('inputName').value || "Anonymous";
    const userPhone = document.getElementById('inputPhone').value || "-";
    const userEmail = document.getElementById('inputEmail').value || "-";

    // Store in global variables for later use in the results
    window.currentUser = { userName, userPhone, userEmail };

    // Hide intro, show quiz
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');

    // Show first question
    showQuestion();

    // Replace feather icons
    feather.replace();
}


function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = quizData[currentQuestion];

    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('progress').style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

    if (currentQuestion === 0) {
        document.getElementById('prev-btn').classList.add('hidden');
    } else {
        document.getElementById('prev-btn').classList.remove('hidden');
    }

    let optionsHtml = '';
    question.options.forEach((option, index) => {
        optionsHtml += `
            <div onclick="selectOption(${index})" class="option cursor-pointer bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg p-4 mb-3 transition duration-200 ${userAnswers[currentQuestion] === index ? 'bg-indigo-100 border-indigo-300' : ''}">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 ${userAnswers[currentQuestion] === index ? 'bg-indigo-500 border-indigo-500' : ''}">
                        ${userAnswers[currentQuestion] === index ? '<i data-feather="check" class="text-white w-3 h-3"></i>' : ''}
                    </div>
                    <span>${option}</span>
                </div>
            </div>
        `;
    });

    questionContainer.innerHTML = `<h3 class="text-xl font-semibold text-gray-800 mb-6">${question.question}</h3>
                                   <div class="options-container">${optionsHtml}</div>`;
    feather.replace();
}

function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    showQuestion();
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        calculateResults();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function calculateResults() {
    score = 0;
    categoryScores = {};

    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) score++;

        if (!categoryScores[question.category]) categoryScores[question.category] = { correct: 0, total: 0 };
        categoryScores[question.category].total++;
        if (userAnswers[index] === question.correctAnswer) categoryScores[question.category].correct++;
    });

    showResults();
}

function showResults() {
    // Hide quiz, show results section
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');

    const categories = Object.keys(categoryScores);
    const correctAnswers = categories.map(cat => categoryScores[cat].correct);
    const totalQuestions = categories.map(cat => categoryScores[cat].total);

    // ===== User Info & Report =====
    document.getElementById('userName').textContent = window.currentUser.userName;
    document.getElementById('userPhone').textContent = window.currentUser.userPhone;
    document.getElementById('userEmail').textContent = window.currentUser.userEmail;
    document.getElementById('quizDate').textContent = new Date().toLocaleDateString();
    document.getElementById('totalScore').textContent = `${score} / ${quizData.length}`;

    // ===== Generate Summary Badges =====
    const strengths = [];
    const weaknesses = [];

    categories.forEach(cat => {
        const pct = (categoryScores[cat].correct / categoryScores[cat].total) * 100;
        if (pct >= 80) strengths.push(cat);
        else if (pct < 50) weaknesses.push(cat);
    });

    let summaryHTML = `You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.<br>`;

    if (strengths.length > 0) {
        summaryHTML += `Strong in: `;
        strengths.forEach(str => {
            summaryHTML += `<span class="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full mr-2 mb-1">${str}</span>`;
        });
        summaryHTML += '<br>';
    }

    if (weaknesses.length > 0) {
        summaryHTML += `Needs Improvement: `;
        weaknesses.forEach(wk => {
            summaryHTML += `<span class="inline-block bg-red-200 text-red-800 px-2 py-1 rounded-full mr-2 mb-1">${wk}</span>`;
        });
        summaryHTML += '<br>';
    }

    document.getElementById('reportSummary').innerHTML = summaryHTML;

    // ===== Score Summary Bar Chart =====
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                { 
                    label: 'Correct Answers', 
                    data: correctAnswers, 
                    backgroundColor: '#30070aff', 
                    borderRadius: 4 
                },
                { 
                    label: 'Total Questions', 
                    data: totalQuestions, 
                    backgroundColor: '#ceb216ff', // light gray for full bar
                    borderRadius: 4 
                }
            ]
        },
        options: {
            responsive: true,
            scales: { 
                y: { beginAtZero: true, max: Math.max(...totalQuestions)+1, ticks: { stepSize: 1 } } 
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { 
                    callbacks: { 
                        label: function(context){ return `${context.dataset.label}: ${context.raw}`; } 
                    } 
                }
            }
        }
    });

    // ===== Overall Correctness Circular Chart =====
    const totalCorrect = categories.reduce((sum, cat) => sum + categoryScores[cat].correct, 0);
    const totalQuestionsAll = categories.reduce((sum, cat) => sum + categoryScores[cat].total, 0);
    const overallPercent = Math.round((totalCorrect / totalQuestionsAll) * 100);

    const perfCtx = document.getElementById('performanceChart').getContext('2d');

    let currentPercent = 0;
    let animationId;
    function animateCenterText(target) {
        cancelAnimationFrame(animationId);
        function step() {
            if (currentPercent < target) {
                currentPercent++;
                performanceChart.update();
                animationId = requestAnimationFrame(step);
            }
        }
        step();
    }

    let gradient = perfCtx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(1, '#3B82F6');

    const performanceChart = new Chart(perfCtx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [overallPercent, 100 - overallPercent],
                backgroundColor: [gradient, '#E5E7EB'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '75%',
            plugins: {
                legend: { display: true, position: 'bottom' }
            }
        },
        plugins: [{
            id: 'centerText',
            afterDraw: (chart) => {
                const {ctx, chartArea: {left, right, top, bottom}} = chart;
                ctx.save();
                const centerX = (left + right) / 2;
                const centerY = (top + bottom) / 2;
                const fontSize = Math.min(right - left, bottom - top) / 5;
                ctx.font = `${fontSize}px sans-serif`;
                ctx.fillStyle = "#111827"; 
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(currentPercent + "%", centerX, centerY);
                ctx.restore();
            }
        }]
    });

    animateCenterText(overallPercent);

    // ===== Strengths & Weaknesses List =====
    const strengthsList = document.getElementById('strengths');
    const weaknessesList = document.getElementById('weaknesses');
    strengthsList.innerHTML = '';
    weaknessesList.innerHTML = '';

    categories.forEach(cat => {
        const percentage = (categoryScores[cat].correct / categoryScores[cat].total) * 100;
        if (percentage >= 75) strengthsList.innerHTML += `<li>${cat}</li>`;
        else if (percentage < 50) weaknessesList.innerHTML += `<li>${cat}</li>`;
    });

    if (strengthsList.innerHTML === '') strengthsList.innerHTML = '<li>No particular strengths identified</li>';
    if (weaknessesList.innerHTML === '') weaknessesList.innerHTML = '<li>No major weaknesses identified</li>';

    feather.replace();
}


function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    categoryScores = {};

    document.getElementById('results').classList.add('hidden');
    document.getElementById('intro').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
});
async function downloadReport() {
    const { jsPDF } = window.jspdf;

    // Get the buttons to hide
    const downloadBtn = document.querySelector("#results button[onclick='downloadReport()']");
    const restartBtn = document.querySelector("#results button[onclick='restartQuiz()']");

    // Hide buttons temporarily
    if (downloadBtn) downloadBtn.style.display = "none";
    if (restartBtn) restartBtn.style.display = "none";

    // Capture the entire #results section
    const element = document.getElementById("results");
    
    // Use html2canvas with scale for better resolution
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create jsPDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;  // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // Add first page
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2;

    // Add new pages if content exceeds 1 page
    while (heightLeft > 0) {
        pdf.addPage();
        position = -heightLeft + margin;
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
    }

    // Use dynamic user name from report for filename
    const userName = document.getElementById('userName').textContent || "User";
    pdf.save(`Quiz_Report_${userName}.pdf`);

    // Show the buttons again
    if (downloadBtn) downloadBtn.style.display = "inline-flex";
    if (restartBtn) restartBtn.style.display = "inline-flex";
}
