/* Your Code Here */

let createEmployeeRecord = function(arr) {
    return{
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map((arr)=>{
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(workHours) {

    let inEvent = this.timeInEvents.find((e) => e.date === workHours)

    let outEvent = this.timeInEvents.find((e) => e.date === workHours)

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(workHours) {
    let rawWage = hoursWorkedOnDate.call(this, workHours) * this.payPerHour
    return parseFloat(rawWage.toString())
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map((e) => e.date)

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArr, firstName) {
    return srcArr.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec)
    { return memo + allWagesFor.call(rec)
    }, 0)
}