# Wetube Reloaded

/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

nodemon.json => client 실행 시 서버 실행시키지 않도록

# Tips

Social login(github) #7.16
https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
Go to github.com/settings/apps => OAuth Apps

About File
Never save file in DB! Just save path of file in DB!
Be careful PATH of files. Inspect "right click => 'new tab' or 'inspect' " on the file ,to check the path.

When hide something in FrontEnd, you should also protect in BackEnd!
