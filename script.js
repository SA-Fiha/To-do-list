const inputBox = document.getElementById("inputbox");
const listContainer = document.getElementById("list-container");
const placeholderImg = document.getElementById("placeholder-img");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "\u00D7";
        li.appendChild(span);
        saveData();
        togglePlaceholderImage();
    }
    inputBox.value = '';
}

function togglePlaceholderImage() {
    if (listContainer.children.length === 0) {
        placeholderImg.style.display = 'block';
    } else {
        placeholderImg.style.display = 'none';
    }
}

inputBox.addEventListener("input", togglePlaceholderImage);

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        togglePlaceholderImage();
    }
});

listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        let currentTask = e.target;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentTask.textContent.replace("\u00D7", "").trim();
        currentTask.textContent = '';
        currentTask.appendChild(input);
        input.focus();

        input.addEventListener("blur", function() {
            if (input.value.trim() === '') {
                currentTask.remove();
                saveData();
                togglePlaceholderImage();
            } else {
                currentTask.textContent = input.value;
                let span = document.createElement("span");
                span.textContent = "\u00D7";
                currentTask.appendChild(span);
                saveData();
            }
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                if (input.value.trim() === '') {
                    currentTask.remove();
                } else {
                    currentTask.textContent = input.value;
                    let span = document.createElement("span");
                    span.textContent = "\u00D7";
                    currentTask.appendChild(span);
                }
                saveData();
                togglePlaceholderImage();
            }
        });
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        listContainer.innerHTML = storedData;
    }
    togglePlaceholderImage();
}

showTask();
function clearAllTasks() {
    const list = document.getElementById("list-container");
    list.innerHTML = "";
    saveData(); 
    togglePlaceholderImage();
}
