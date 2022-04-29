function toggle(id) {
    var x = document.getElementById(id);
    var y = document.getElementById("button-" + id)
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.transform = "rotate(90deg)";
    } else {
        x.style.display = "none";
        y.style.transform = "none";
    }

}