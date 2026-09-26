function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteButton);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
      }
