/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Target main page
const pageBody = document.querySelector(".js-page");
// Target Header
const pageHeader = pageBody.firstElementChild;
// Target all student list
const listContainer = document.querySelector(".js-list");
// Retrieve & store all children
const studentList = listContainer.children;
// Set initial items-per-page to 10
let itemsPerPage = 10;

/******************************************
  SHOW ITEMS PER PAGE
******************************************/

const showPage = (list, page) => {
  // In case of page 1, startIndex = 0, endIndex = 10
  const indexStart = page * itemsPerPage - itemsPerPage;
  const indexEnd = page * itemsPerPage;
  // Loop through all the list items, show selected number of items, depending on the 'itemsPerPage'
  for (let i = 0; i < list.length; i++) {
    if (i >= indexStart && indexEnd > i) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/******************************************
  ADD PAGINATION LINKS
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
  // Add click event-listener for A
  pageChange(list);
};

/******************************************
    Click Event-listener to each A element
  ******************************************/

// [FUNCTION - PAGE CHANGE]
const pageChange = list => {
  // Retrieve all LI in .pagination DIV
  const pageDiv = document.querySelector(".pagination");
  const pageUl = pageDiv.firstElementChild;
  const pageLi = pageUl.children;
  // [EVENT LISTENER]
  pageDiv.addEventListener("click", e => {
    // remove 'active' class
    for (let i = 0; i < pageLi.length; i++) {
      const pageA = pageLi[i].firstElementChild;
      pageA.removeAttribute("class");
    }
    // If the event target is A, set a class 'active'
    if (e.target.tagName.toLowerCase() === "a") {
      // Set the class to 'active'
      e.target.setAttribute("class", "active");
      // Load a page that matches the anchor text content
      showPage(list, e.target.textContent);
    }
  });
};

/******************************************
  CREATE SEARCH COMPONENT
******************************************/

const searchComp = () => {
  const createDiv = document.createElement("div");
  createDiv.setAttribute("class", "student-search");
  const createInput = document.createElement("input");
  createInput.setAttribute("placeholder", "Search for students...");
  const createBtn = document.createElement("button");
  createBtn.textContent = "Search";
  createDiv.appendChild(createInput);
  createDiv.appendChild(createBtn);
  // Append to header
  pageHeader.appendChild(createDiv);
  // Add search function
  searchFunc();
};

/******************************************
  Remove Pagination
******************************************/

removePag = () => {
  const pagination = document.querySelector(".pagination");
  const noMatch = document.querySelector(".noMatch");
  if (pagination) {
    pageBody.removeChild(pagination);
  }
  if (noMatch) {
    pageBody.removeChild(noMatch);
  }
};

/******************************************
  Add functionality to the search comp
******************************************/

// Segregate student list for searchFunc()
const isMatch = input => {
  for (let i = 0; i < studentList.length; i++) {
    const studentName = studentList[i].querySelector("h3").textContent;
    studentList[i].setAttribute("isMatch", false);
    if (
      input.value.length !== 0 &&
      studentName.toLowerCase().indexOf(input.value.toLowerCase()) !== -1
    ) {
      studentList[i].setAttribute("isMatch", true);
    }
  }
  // save matching items in "matchList"
  const matchList = listContainer.querySelectorAll("li[isMatch=true]");
  return matchList;
};

// Main search function - Added to Search Component
const searchFunc = () => {
  const selectBtn = document.querySelector("button");
  const selectInput = document.querySelector("input");
  // Search Response behavior
  const searchRes = () => {
    for (let i = 0; i < studentList.length; i++) {
      studentList[i].style.display = "none";
    }
    const matchRes = isMatch(selectInput);
    if (matchRes.length !== 0) {
      removePag();
      showPage(matchRes, 1);
      appendPageLinks(matchRes);
    } else {
      if (selectInput.value.length !== 0) {
        removePag();
        const noResult = document.createElement("h3");
        noResult.setAttribute("class", "noMatch");
        noResult.textContent = "No Match Found";
        pageBody.appendChild(noResult);
      } else {
        removePag();
        showPage(studentList, 1);
        appendPageLinks(studentList);
      }
    }
  };

  selectBtn.addEventListener("click", () => {
    searchRes();
  });
  selectInput.addEventListener("keyup", () => {
    searchRes();
  });
};

/******************************************
  PROCESS AFTER THE WINDOW IS LOADED
******************************************/

// Show page 1 initially
showPage(studentList, 1);
// Retrieve a page that is clicked
appendPageLinks(studentList);
// Add search component
searchComp();
