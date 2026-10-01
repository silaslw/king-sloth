
function getRow() {

    const n = Array.from(Array(10).keys());

    const s = "row";

    n.forEach(function(entry) {
        console.log(s+entry);
    });
}
getRow();