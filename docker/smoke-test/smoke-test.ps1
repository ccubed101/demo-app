param([String]$configFileSpec="karma.conf.js")

ECHO "**** Executing smoke-test.ps1 ****"

# Get rid of the "smoke-test" image if it exists.  Doing so will guarantee that the image will be re-built.
# As part of that process the latest code from GitHub will be downloaded and compiled.
ECHO 'start-process -FilePath "docker" -ArgumentList "rmi smoke-test" -Wait'
start-process -FilePath "docker" -ArgumentList "rmi smoke-test" -Wait

# docker-compose up: Build the "smoke-test" image and then run it.
ECHO 'start-process -FilePath "docker-compose" -ArgumentList "-f smoke-test.yml up -d" -Wait'
start-process -FilePath "docker-compose" -ArgumentList "-f smoke-test.yml up -d" -Wait

# Take a screenshot of the running web application.
# NOTE: How do you deal with paths that have spaces that are part of -ArgumentList?
#       Use the Powershell escape character, "`".  Surround the path that contains
#       a space with `"<path with spaces>`".  (See statement below for example.)
ECHO 'start-process -FilePath "C:\Program Files (x86)\Google\Chrome\Application\chrome" -ArgumentList "--headless --disable-gpu --window-size=1200,1000 --screenshot=`"D:\Code Projects\demo-app\docker\smoke-test\output.png`" http://localhost:86" -Wait'
start-process -FilePath "C:\Program Files (x86)\Google\Chrome\Application\chrome" -ArgumentList "--headless --disable-gpu --window-size=1200,1000 --screenshot=`"D:\Code Projects\demo-app\docker\smoke-test\output.png`" http://localhost:86" -Wait

#docker-compose down
ECHO 'start-process -FilePath "docker-compose" -ArgumentList "-f smoke-test.yml down" -Wait'
start-process -FilePath "docker-compose" -ArgumentList "-f smoke-test.yml down" -Wait

# Get rid of the "smoke-test" image.  Doing so will guarantee that the image will be re-built.
# As part of that process the latest code from GitHub will be downloaded and compiled.
ECHO 'start-process -FilePath "docker" -ArgumentList "rmi smoke-test" -Wait'
start-process -FilePath "docker" -ArgumentList "rmi smoke-test" -Wait

# If the outputt image is different from the reference image then display the output image.
if ((Get-Item 'output.png').length -ne (Get-Item 'reference.png').length) {
	# Display the file.  (start-process will automatically chose the application to display the file.)
	start-process output.png
}

ECHO "**** Done ****"

