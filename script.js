const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Array to store employee data
let employeesArray = [];

// Collect employee data
const collectEmployees = function() {
  // Prompt user for employee details
  const firstName = prompt("Enter employee's first name:");
  const lastName = prompt("Enter employee's last name:");
  const salary = parseFloat(prompt("Enter employee's salary:"));

  // Create an employee object
  const employee = {
    firstName: firstName,
    lastName: lastName,
    salary: salary
  };

  // Add employee to the array
  employeesArray.push(employee);

  // Prompt user to continue adding employees or cancel
  const continueAdding = confirm("Do you want to add another employee?");
  
  if (continueAdding) {
    collectEmployees(); // Recursively call collectEmployees if user wants to continue
  } else {
    // Sort employees by last name
    employeesArray.sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Display employee data
    displayEmployees(employeesArray);

    // Calculate and display average salary
    displayAverageSalary(employeesArray);

    // Log computed and aggregated data
    console.log('==============================');
    console.table(employeesArray);
    getRandomEmployee(employeesArray);
  }
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // Calculate total salary
  const totalSalary = employeesArray.reduce((acc, employee) => acc + employee.salary, 0);

  // Calculate average salary
  const averageSalary = totalSalary / employeesArray.length;

  // Display average salary
  console.log('Average Salary:', averageSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }));
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];

  // Display random employee
  console.log('Random Employee:', randomEmployee.firstName, randomEmployee.lastName);
}

/*
/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
