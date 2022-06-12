// Define communication to the server
function startJob(name, imdbTag){
    socket.emit("start_job", {
        "name": name,
        "imdb": imdbTag
    })
    setStatus("Job running...")
    enable(stopJobButton)
    disable(startJobButton)
    disable(ejectDiscButton)
    disable(lookForDiscsButton)
}
function stopJob(){
    socket.emit("stop_job")
}
function lookForDisc(){
    socket.emit("look_for_disc")
}
function ejectDisc(){
    socket.emit("eject_disc")
}

// Collect elements from DOM
const form = document.getElementById("form")
const discName = document.getElementById("disc_name")
const imdbTag = document.getElementById("imdb_tag")
const startJobButton = document.getElementById("start_job")
const lookForDiscsButton = document.getElementById("look_for_discs")
const stopJobButton = document.getElementById("stop_job")
const ejectDiscButton = document.getElementById("eject_disc")
const statusText = document.getElementById("status")

// Define interactions with dom
form.onsubmit = function(e){
  e.preventDefault();
  e.stopPropagation();
  startJob(discName.value, imdbTag.value)
}

lookForDiscsButton.onclick = lookForDisc
stopJobButton.onclick = stopJob
ejectDiscButton.onclick = ejectDisc

function disable(button){
    button.setAttribute("disabled", "")
}

function enable(button){
    button.removeAttribute("disabled")
}
function setStatus(status){
    statusText.textContent=status
}

// Define responses from the server
function onJobRunning(){
    console.log("Job is running")
    setStatus("Job is running")
    disable(startJobButton)
    disable(lookForDiscsButton)
    enable(stopJobButton)
    disable(ejectDiscButton)
}
function onJobNotRunning(){
    console.log("Job is not running")
    setStatus("Job is not running")
    enable(startJobButton)
    enable(lookForDiscsButton)
    disable(stopJobButton)
    enable(ejectDiscButton)
}
function lookingForDisc(){
    console.log("Looking for discs")
    setStatus("Looking for discs")
    disable(startJobButton)
    disable(lookForDiscsButton)
    disable(stopJobButton)
    disable(ejectDiscButton)
}
function discFound(){
    console.log("Disc found")
    setStatus("Disc found!")
    enable(startJobButton)
    enable(lookForDiscsButton)
    disable(stopJobButton)
    enable(ejectDiscButton)
}
function discNotFound(){
    console.log("Disc not found")
    setStatus("Disc not found.")
    disable(startJobButton)
    enable(lookForDiscsButton)
    disable(stopJobButton)
    disable(ejectDiscButton)
}

// Connect functions to socket
socket.on("job_running", onJobRunning)
socket.on("job_not_running", onJobNotRunning)
socket.on("looking_for_disc", lookingForDisc)
socket.on("disc_found", discFound)
socket.on("disc_not_found", discNotFound)
