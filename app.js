// Load the existing items from localStorage when the page is loaded
window.addEventListener('load', () => {
    loadItems();
  });
  
  // Add a new item to the list when the "Add" button is clicked
  const addBtn = document.getElementById('addBtn');
  addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
  
    if (todoText) {
      addItem(todoText);
      todoInput.value = '';
      saveItems();
    }
  });
  
  // Delete an item from the list when the "Delete" button is clicked
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('deleteBtn')) {
      const listItem = event.target.parentElement;
      const itemId = listItem.getAttribute('data-id');
      deleteItem(itemId);
      saveItems();
    }
  });
  
  // Add a new item to the list
  function addItem(todoText) {
    const todoList = document.getElementById('todoList');
    const itemId = new Date().getTime();
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', itemId);
    listItem.innerHTML = `
      <span>${todoText}</span>
      <button class="deleteBtn">Delete</button>
    `;
    todoList.appendChild(listItem);
  }
  
  // Delete an item from the list
  function deleteItem(itemId) {
    const todoList = document.getElementById('todoList');
    const listItem = document.querySelector(`li[data-id="${itemId}"]`);
    todoList.removeChild(listItem);
  }
  
  // Load the existing items from localStorage
  function loadItems() {
    const todoList = document.getElementById('todoList');
    const items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.forEach(item => {
      addItem(item.text);
    });
  }
  
  // Save the items to localStorage
  function saveItems() {
    const todoList = document.getElementById('todoList');
    const items = Array.from(todoList.children).map(item => {
      return {
        text: item.querySelector('span').textContent,
        id: item.getAttribute('data-id')
      };
    });
    localStorage.setItem('todoItems', JSON.stringify(items));
  }
  