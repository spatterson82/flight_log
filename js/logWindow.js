function openNav() {
    console.log("clicked open");
    document.getElementById("logWindow").style.width = "100%";
}

function closeNav() {
    console.log("clicked close");
    document.getElementById("logWindow").style.width = "0";
}

// TODO Add functions for buttons to submit

function clearForm() {
    console.log("cleared form");
    $('#form input[type=text], input[type=date], input[type=number], input[type=time]').val("");
}
