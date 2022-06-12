# Update file and upgrade machine
sudo apt-get update -y
sudo apt upgrade -y

# Install snap
sudo apt install snapd -y

# Install MakeMKV and ffmpeg
sudo snap install makemkv
sudo apt install ffmpeg -y

# Install flask
sudo apt-get install python3-flask

# Install pip3
sudo apt-get install python3-pip

# Install dependencies
python3 -m pip install -r requirements.txt

# Set up flask server
export FLASK_APP=hello.py
export FLASK_ENV=production

# Start flask server
flask run --port 80
