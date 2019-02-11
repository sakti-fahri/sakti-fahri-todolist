const textNotesDOM = document.getElementById('myUL');
const todolistDOM = document.getElementById('container-bottom');

let nextId = 1;
let nextBigId = 1;

const MyNotes = {
  notes: [],
  bigNotes: [],

  // DISPLAY ALL
  displayAll: () => {
    MyNotes.display();
    MyNotes.displayBottom();
  },

  // DISPLAY TOP SECTION
  display: (data = MyNotes.notes) => {
    textNotesDOM.innerHTML = '';

    data.forEach(item => {
      const liDOM = document.createElement('li');
      liDOM.setAttribute('class', 'myLi');

      liDOM.innerHTML = `<span ${item.completed ? 'class="completed"' : ''}
            onclick="MyNotes.toggleCompleted(${item.id})">${item.text}</span>
            <span class="edit" onclick="MyNotes.editTask(${item.id})">✎</span>
            <span class="close" onclick="MyNotes.removeTask(${
              item.id
            })">✖</span>`;

      textNotesDOM.appendChild(liDOM);
    });
  },

  // DISPLAY BOTTOM SECTION
  displayBottom: (elementBottom = MyNotes.bigNotes) => {
    const todolistDOM = document.getElementById('container-bottom');
    todolistDOM.innerHTML = '';

    elementBottom.forEach(item => {
      const div = document.createElement('div');
      div.setAttribute('class', `todolist-item`);
      div.setAttribute('onclick', `MyNotes.display()`);
      div.innerHTML = `
      <span class="remove-todolist" onclick="MyNotes.removeTodolist(${
        item.id
      })">✖</span>
        <h3> ${item.title} </h3>
      `;
      const ul = document.createElement('ul');
      item.todoList.forEach(menuItem => {
        ul.innerHTML += `
          <li class='liTodolistItem'>${menuItem.text}</li>
        `;
      });

      div.append(ul);
      todolistDOM.append(div);
    });
  },

  // ADD TODO SECTION
  addTodo: () => {
    event.preventDefault();

    const newNotes = {
      id: nextId,
      text: document.getElementById('myInput').value,
      completed: false
    };

    let textForm = document.getElementById('myInput').value;

    if (textForm !== '') {
      MyNotes.notes.push(newNotes);
      MyNotes.display();
      document.getElementById('myInput').value = '';
      nextId++;
    }
  },

  // ADD TODOS LIST
  addBigNotes: () => {
    event.preventDefault();

    const newBigNotes = {
      id: nextBigId,
      title: document.getElementById('todoTitle').value,
      todoList: MyNotes.notes
    };

    let titleForm = document.getElementById('todoTitle').value;

    if (titleForm !== '') {
      MyNotes.bigNotes.push(newBigNotes);
      document.getElementById('todoTitle').value = '';
      document.getElementById('myInput').value = '';
      const resetNotes = [];
      MyNotes.notes = resetNotes;

      MyNotes.display();
      nextId = 1;
      nextBigId++;
    }
    MyNotes.displayAll();
  },

  // EDIT TASK ON TOP SECTION
  editTask: id => {
    const notesEdit = prompt('Edit your task...');

    if (notesEdit !== null) {
      const modifiedNotes = MyNotes.notes.map(note => {
        if (note.id === id) {
          note.text = notesEdit;
        }
        return note;
      });
      MyNotes.notes = modifiedNotes;
      MyNotes.display();
    }
  },

  //REMOVE TASK ON TOP SECTION
  removeTask: id => {
    const deleteNote = MyNotes.notes.filter(note => {
      return note.id !== id;
    });
    MyNotes.notes = deleteNote;
    MyNotes.display();
  },

  //REMOVE TODOLIST ON BOTTOM SECTION
  removeTodolist: id => {
    const deleteTodo = MyNotes.bigNotes.filter(todo => {
      return todo.id != id;
    });
    MyNotes.bigNotes = deleteTodo;
    MyNotes.displayAll();
  },

  //THIS PART HAS NOT BEEN USED
  searchTask: () => {
    event.preventDefault();
    const keyword = document.getElementById('search-text').value;

    const foundTasks = MyNotes.notes.filter(item => {
      return item.text.toLowerCase().includes(keyword.toLowerCase());
    });

    MyNotes.display(foundTasks);
  }
};

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');

list.addEventListener(
  'click',
  function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },
  false
);

//CALL DISPLAY ALL FUNCTION
MyNotes.displayAll();
