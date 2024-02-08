document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const taskDetailsModal = document.getElementById("taskDetailsModal");
    const closeBtn = document.querySelector(".close");
    const updateBtn = document.getElementById("updateBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const updatedTaskInput = document.getElementById("updatedTask");
    const updatedDueDateInput = document.getElementById("updatedDueDate");
    const progressReport = document.getElementById("progressReport");
    const progressBar = document.getElementById("progressBar");

    let tasks = [];

    loadTasks();

    addBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;

        if (taskText !== "") {
            const task = {
                id: Date.now(),
                text: taskText,
                dueDate: dueDate,
                completed: false
            };
            
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = "";
            dueDateInput.value = "";
        }
    });

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.text + " (Due Date: " + task.dueDate + ")";
            if (task.completed) {
                li.classList.add("completed");
            }
            li.addEventListener("click", function() {
                showTaskDetails(task);
            });
            taskList.appendChild(li);
        });
        updateProgressBar();
    }
    

    const time = document.getElementById("time");
const day = document.getElementById("day");
const midday = document.getElementById("midday");

let clock = setInterval(
	function calcTime() {
		let date_now = new Date();
		let hr = date_now.getHours();
		let min = date_now.getMinutes();
		let sec = date_now.getSeconds();
		let middayValue = "AM";

		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		day.textContent = days[date_now.getDay()];

		middayValue = hr >= 12 ? "PM" : "AM";

		if (hr == 0) {
			hr = 12;
		} else if (hr > 12) {
			hr -= 12;
		}

		hr = hr < 10 ? "0" + hr : hr;
		min = min < 10 ? "0" + min : min;
		sec = sec < 10 ? "0" + sec : sec;

		time.textContent = hr + ":" + min + ":" + sec;
		midday.textContent = middayValue;
	},

	1000
);

    function showTaskDetails(task) {
        taskDetailsModal.style.display = "block";
        updatedTaskInput.value = task.text;
        updatedDueDateInput.value = task.dueDate;

        closeBtn.onclick = function() {
            taskDetailsModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == taskDetailsModal) {
                taskDetailsModal.style.display = "none";
            }
        }

        updateBtn.onclick = function() {
            const updatedTaskText = updatedTaskInput.value.trim();
            const updatedDueDate = updatedDueDateInput.value;
            
            if (updatedTaskText !== "") {
                task.text = updatedTaskText;
                task.dueDate = updatedDueDate;
                saveTasks();
                renderTasks();
                taskDetailsModal.style.display = "none";
            }
        }

        deleteBtn.onclick = function() {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
            taskDetailsModal.style.display = "none";
        }

        calculateProgress(task);
    }

    function calculateProgress(task) {
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 3600 * 24));
        const progressPercentage = Math.max(0, Math.min(Math.floor(((today - dueDate) / (today - new Date(task.id))) * 100), 100));

        progressReport.innerHTML = `Days Left: ${daysLeft}<br>Progress: ${progressPercentage}%`;
    }

    function updateProgressBar() {
        const today = new Date();
        let totalDaysLeft = 0;
        let totalDaysRange = 0;

        tasks.forEach(task => {
            const dueDate = new Date(task.dueDate);
            totalDaysLeft += Math.max(0, Math.ceil((dueDate - today) / (1000 * 3600 * 24)));
            totalDaysRange += Math.ceil((dueDate - new Date(task.id)) / (1000 * 3600 * 24));
        });

        const progressPercentage = Math.max(0, Math.min(Math.floor((1 - (totalDaysLeft / totalDaysRange)) * 100), 100));
        progressBar.style.width = progressPercentage + "%";
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    }
});


