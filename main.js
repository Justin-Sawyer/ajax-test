/*let xhr = new XMLHttpRequest();
let data;

xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
xhr.send();

/*function setData(jsonData) {
    data = jsonData;
    //console.log(data);
}

xhr.onreadystatechange = function() {
    //console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
        //console.log(typeof(this.responseText));
        //console.log(typeof(JSON.parse(this.responseText)));
        //console.log(JSON.parse(this.responseText));

        //data = this.responseText;
        //console.log(data);

        //setData(JSON.parse(this.responseText));
        data = JSON.parse(this.responseText);
    }
};

//console.log(data);

setTimeout(function() {
    console.log(data);
}, 500); */

/*function getData(cb) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(data = JSON.parse(this.responseText));
        }
    };
}

getData(function(data) {
    console.log(data)
})

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);*/

/*const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
};

function getTableHeaders(obj) {
    let tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return "<tr>" + tableHeaders + "</tr>";
};

function writeToDocument(type) {
    let tableRows = [];
    let el = document.getElementById("newDataDiv");
    el.innerHTML = "";

    getData(type, function(data) {
         
        data = data.results
        let tableHeader = getTableHeaders(data[0]);
 
        data.forEach(function(item) {
            let dataRow = [];

            Object.keys(item).forEach(function(key) {
                let rowData = item[key].toString();
                let truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`)
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML += `<table>${tableHeader}${tableRows}</table>`;
    });
};  */     

/*function writeToDocument(type) {
    let tableRows = [];
    let el = document.getElementById("newDataDiv");
    el.innerHTML = "";

    getData(type, function(data) {
         
        data = data.results
        let tableHeader = getTableHeaders(data[0]);
 
        data.forEach(function(item) {
            let dataRow = [];

            Object.keys(item).forEach(function(key) {
                let rowData = item[key].toString();
                let truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`)
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML += `<table>${tableHeader}${tableRows}</table>`;
    });
};*/

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("newDataDiv");

    getData(url, function(data) {
        var pagination = "";

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}