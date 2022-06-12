from flask import Flask, render_template, redirect
from flask_socketio import SocketIO, emit
from time import sleep

app = Flask(__name__, static_url_path="/static")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(
    app, 
    cors_allowed_origins="*"
)

looking_for_disc = False
disc_loaded = False
job_running = False

@app.route('/')
def index():
    global job_running, disc_loaded, looking_for_disc
    return render_template(
        'index.html', 
        job_running=job_running,
        looking_for_disc = looking_for_disc,
        disc_loaded = disc_loaded,
    )

@app.route('/logs')
def logs():
    return render_template('logs.html')

@socketio.on("start_job")
def start_job(payload):
    global job_running
    job_running = True
    disc_name = payload["name"]
    imdb_tag = payload["imdb"]
    print("Starting job for disc name", disc_name, "and tag", imdb_tag)
    emit("job_running")
    sleep(10)
    print("Job finished")
    job_running = False
    emit("job_not_running")

@socketio.on("stop_job")
def stop_job():
    global job_running
    job_running = False
    print("Stopping job")
    emit("job_not_running")

@socketio.on("look_for_disc")
def look_for_disc():
    global looking_for_disc
    global disc_loaded
    
    looking_for_disc = True
    emit("looking_for_disc")

    print("Looking for disc")
    found = True
    
    looking_for_disc = False
    disc_loaded = found
    
    if found:
        print("Found disc")
        emit("disc_found")
    else:
        print("No disc found")
        emit("disc_not_found")

@socketio.on("eject_disc")
def eject_disc():
    global disc_loaded 
    disc_loaded = False
    print("Ejecting disc")
    emit("disc_not_found")


socketio.run(app, host="0.0.0.0")