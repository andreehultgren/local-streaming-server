# Local Streaming Server with Automatic Library Updates
Host your own streaming server in the Local Area Network. Add new movies by adding a DVD drive and go to the website.

This script is designed to work with Raspberry Pi OS. I cannot guarantee it will work on other linux distributions - but you can give it a shot.

There are two components to this solution. One is a [https://www.plex.tv/](Plex server). The other is a flask server that handles all events with the adding of movies to the server repository.

## Socket listens on server

|    Name       | Event name      | Description                           | Content                 |
| :------------ | :-------------  | :------------------------------------ | :---------------------- | 
| Start job     |  start_job      | Start the job of adding CD to library | Movie name and imdb tag |
| Stop job      |  stop_job       | Stop the job of adding CD to library  |                         |
| Look for disc |  look_for_disc  | Check if drive has a disc inside      |                         |
| Eject disc    |  eject_disc     | Eject the disc from the drive         |                         |


## Socket listens on client

|    Name           | Event name          | Description                                | Content                 |
| :---------------- | :-----------------  | :---------------------------------------   | :---------------------- | 
| Job Running       |  job_running        | A job is currently running on the server   |                         |
| Job Not Running   |  job_not_running    | A job is no longer running on the server   |                         |
| Looking for disc  |  looking_for_disc   | The server is currently looking for a disc |                         |
| Disc found        |  disc_found         | The server found a disc                    |                         |
| Disc not found    |  disc_not_found     | The server didn't find a disc              |                         |
