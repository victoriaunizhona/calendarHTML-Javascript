let today = new Date();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let selectYear = today.getFullYear();
let selectMonth = today.getMonth();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(thisMonth, thisYear);


function next() {
    thisYear = (thisMonth === 11) ? thisYear + 1 : thisYear;
    thisMonth = (thisMonth + 1) % 12;
    showCalendar(thisMonth, thisYear);
}

function previous() {
    thisYear = (thisMonth === 0) ? thisYear - 1 : thisYear;
    thisMonth = (thisMonth === 0) ? 11 : thisMonth - 1;

    showCalendar(thisMonth, thisYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let lastDayOfLastMonth = month == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDay();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells

    let date = 1;
    dayLoop:
    for (let i = 0; i < 6; i++) {
        let dow = new Date(year, month, i).getDay();
        // creates a table row
        let row = document.createElement("tr");
        // Days to add for beginning
        var k = lastDayOfLastMonth - firstDayOfMonth + 1;
        // Days to add at the end
        let n = 1;
        //creating individual cells, filing them up with data.

        for (var j = 0; j < 7; j++) {


            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(k);
                cell.classList.add("not-current");
                cell.appendChild(cellText);
                row.appendChild(cell);
                k++;
            } else if (date > daysInMonth) {

                if (lastDateOfMonth == 6) {
                    tbl.appendChild(row);
                    break dayLoop;
                }

                let cell = document.createElement("td");
                let cellText = document.createTextNode(n);
                cell.classList.add("not-current");
                cell.appendChild(cellText);
                row.appendChild(cell);
                n++;

                if (j === 6) {
                    tbl.appendChild(row);
                    break dayLoop;

                }


            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }



        }



        tbl.appendChild(row); // appending each row into calendar body.
    }

}



// Selection the day
window.onload = function () {

    document.getElementById('calendar').onclick = function (e) {

        let list = document.getElementsByTagName("td");
        let i;
        for (i = 0; i < list.length; i++) {
            list[i].classList.remove("clicked-date");
        }

        let target = e.target;
        if (target.tagName.toLowerCase() == "td") {
            target.classList.add("clicked-date");
        }
    };
};

