// Your code here

function createEmployeeRecord(x){
  return {
    firstName: x[0],
    familyName: x[1],
    title: x[2],
    payPerHour: x[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employee){
  return employee.map(x => createEmployeeRecord(x))
}

function createTimeInEvent(employee, timeStamp){
  let [date, hour] = timeStamp.split(` `)
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}

function createTimeOutEvent(employee, timeStamp){
  let [date, hour] = timeStamp.split(` `)
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })
  return employee
}

function hoursWorkedOnDate (employee, date){
  let timeIn = employee.timeInEvents.find(x => x.date == date)
  let timeOut = employee.timeOutEvents.find(x => x.date == date)
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, date){
  return hoursWorkedOnDate(employee, date)*employee.payPerHour
}

function allWagesFor(employee){
  let datesWorked = employee.timeInEvents.map(x => x.date)
  let wagesEarned = datesWorked.map(x => wagesEarnedOnDate(employee, x))
  return wagesEarned.reduce((previousValue, currentValue) => previousValue + currentValue);
}

function findEmployeeByFirstName(employees, firstName){
  return employees.find(x => x.firstName == firstName)
}

function calculatePayroll(employees){
  let employeesWages = employees.map(x => allWagesFor(x))
  return employeesWages.reduce((previousValue, currentValue) => previousValue + currentValue);
}
