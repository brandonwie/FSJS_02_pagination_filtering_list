// TODO #1 - when the input is empty, roll back to the page a user was in

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Target main page
const pageBody = document.querySelector(".js-page");
// Target Header
const pageHeader = pageBody.firstElementChild;
// Target all student list
const studentListContainer = document.querySelector(".js-list");
// Retrieve & store all children
const studentList = studentListContainer.children;
// Set initial items-per-page to 10
let itemsPerPage = 10;

/******************************************
  SHOW ITEMS PER PAGE
******************************************/

const showPage = (list, page) => {
  // In case of page 1, startIndex = 0, endIndex = 10
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;
  // Loop through all the list items, show selected number of items, depending on the 'itemsPerPage'
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && endIndex > i) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/******************************************
  EXCEED EXPECTATION
******************************************/

// #1 [SEARCH BOX] [COMPONENT]
const searchComp = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "student-search");
  const input = document.createElement("input");
  input.setAttribute("placeholder", "Search for student...");
  // Set a class for CLICK event listener
  input.setAttribute("class", "search-input");
  div.appendChild(input);
  const button = document.createElement("button");
  button.textContent = "Search";
  div.appendChild(button);
  pageHeader.appendChild(div);
};

// #2-a [USER-ERR-MESSAGE] [COMPONENT]
const noMatchingFound = () => {
  const div = document.createElement("div");
  // Set a class to remove later
  div.setAttribute("class", "js-err-message");
  const p = document.createElement("p");
  p.textContent = "Oops! There's no one.";
  div.appendChild(p);
  // Append the message DIV
  studentListContainer.appendChild(div);
};

// #2-b [SEARCH BOX] [EVENT LISTENER - INPUT]
const typeSearch = () => {
  pageHeader.addEventListener("keyup", e => {
    const inputValue = e.target.value.toLowerCase();
    const studentNames = document.querySelectorAll("h3");
    //* Come back to a current page whenever the input is empty
    if (inputValue.length === 0) {
      const currentPage = document.querySelector(".active").textContent;
      showPage(studentList, currentPage);
    }
    //* If it's not empty, start all the search process
    else {
      // FOR LOOP for live search
      for (let i = 0; i < studentNames.length; i++) {
        const nameSpelling = studentNames[i].textContent;
        const matchingLi = studentNames[i].parentNode.parentNode;
        if (nameSpelling.indexOf(inputValue) !== -1) {
          matchingLi.style.display = "";
          // Set classes to remove 'js-no-match' to roll back when there's any match found
          matchingLi.setAttribute("class", "student-item cf");
        } else {
          // Set a class 'js-no-match' for IF statement below
          matchingLi.setAttribute("class", "student-item cf js-no-match");
          matchingLi.style.display = "none";
        }
      }
      // FOR LOOP for seach with Enter key
      if (e.keyCode === 13) {
        for (let i = 0; i < studentNames.length; i++) {
          const nameSpelling = studentNames[i].textContent;
          const matchingLi = studentNames[i].parentNode.parentNode;
          if (nameSpelling.indexOf(inputValue) !== -1) {
            matchingLi.style.display = "";
            // Set classes to remove 'js-no-match' to roll back when there's any match found
            matchingLi.setAttribute("class", "student-item cf");
          } else {
            // Set a class 'js-no-match' for IF statement below
            matchingLi.setAttribute("class", "student-item cf js-no-match");
            matchingLi.style.display = "none";
          }
        }
      }
      //! NEED TEST - BUTTON -> CLEAR INPUT -> ERR DIV FOUND
      /** Handle no results returned **/
      // Target not matching lists
      const noMatch = document.querySelectorAll(".js-no-match");
      // Target "No Match Found" message DIV
      const noMatchMessage = document.querySelectorAll(".js-err-message");
      // If all names have 'noMatch' class, place a user-err-message
      if (noMatch.length === studentNames.length) {
        noMatchingFound();
      }
      // Delete a user-err-message if there's more than 2
      if (noMatchMessage.length >= 1) {
        studentListContainer.removeChild(noMatchMessage[0]);
      }
    }
  });
};

// #3 [SEARCH BOX] [EVENT LISTENER - CLICK]
const clickSearch = () => {
  pageHeader.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "a") {
      const input = document.querySelector(".search-input");
      const inputValue = input.value.toLowerCase();
      const studentNames = document.querySelectorAll("h3");
      for (let i = 0; i < studentNames.length; i++) {
        const nameLetters = studentNames[i].textContent.toLowerCase();
        const matchingLi = studentNames[i].parentNode.parentNode;
        if (nameLetters.indexOf(inputValue) !== -1) {
          matchingLi.style.display = "";
        } else {
          matchingLi.style.display = "none";
        }
      }
      /** Handle no results returned **/
      // Target not matching lists
      const noMatch = document.querySelectorAll(".js-no-match");
      // Target "No Match Found" message DIV
      const noMatchMessage = document.querySelectorAll(".js-err-message");
      // If all names have 'noMatch' class, place a user-err-message
      if (noMatch.length === studentNames.length) {
        noMatchingFound();
      }
      // Delete a user-err-message if there's more than 2
      if (noMatchMessage.length >= 1) {
        studentListContainer.removeChild(noMatchMessage[0]);
      }
    }
  });
};

/******************************************
    ANCHOR SETTING for PAGINATION
  ******************************************/

// [FUNCTION - PAGE CHANGE]
const clickPages = () => {
  // Retrieve all LI in .pagination DIV
  const pageDiv = document.querySelector(".pagination");
  const pageUl = pageDiv.firstElementChild;
  const pageLi = pageUl.children;
  // [EVENT LISTENER]
  pageDiv.addEventListener("click", e => {
    // Loop through LI and remove class attr.
    for (let i = 0; i < pageLi.length; i++) {
      // Target A inside LI
      const pageA = pageLi[i].firstElementChild;
      // Remove classes
      pageA.removeAttribute("class");
    }
    // If the event target is A, set a class 'active'
    if (e.target.tagName.toLowerCase() === "a") {
      // Set the class to 'active'
      e.target.setAttribute("class", "active");
      // Load a page that matches the anchor text content
      showPage(studentList, e.target.textContent);
    }
    // [FIXED ERR]'Not Found' message still shows when the last page is clicked (when there's less than 10 items on the page)
    const errFix = document.querySelector(".js-err-message");
    if (errFix !== null) {
      studentListContainer.removeChild(errFix);
    }
  });
};

/******************************************
  APPEND PAGINATION COMPONENTS
******************************************/

const appendPageLinks = list => {
  // Create a DIV, give a class name 'pagination'
  const div = document.createElement("div");
  div.setAttribute("class", "pagination");
  // Create an UL, append to a DIV
  const ul = document.createElement("ul");
  div.appendChild(ul);
  // Calculate a total number of pages, depending on 'itemsPerpage'
  const totalItems = list.length;
  const totalPages = totalItems / itemsPerPage;
  // Create LI and A elements, depending on 'totalPages'
  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    const anchor = document.createElement("a");
    // Set href attribute to all 'a' element
    anchor.setAttribute("href", "#");
    anchor.textContent = `${[i + 1]}`;
    // Set the first A class name as ACTIVE
    if (i === 0) {
      anchor.setAttribute("class", "active");
    }
    li.appendChild(anchor);
  }
  // Append the result to the student list
  pageBody.appendChild(div);
  // Load a event handler function to change pages
  clickPages();
  clickSearch();
  typeSearch();
};

/******************************************
  PROCESS AFTER THE WINDOW IS LOADED
******************************************/

// Append a search component
searchComp();
// Show page 1 initially
showPage(studentList, 1);
// Retrieve a page that is clicked
appendPageLinks(studentList);
