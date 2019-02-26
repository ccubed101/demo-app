ECHO OFF
ECHO.
ECHO ---------- demo-app-unit-tests.cmd ----------

ECHO set pathToClientApp=C:\ClientApp

REM Create a directory inside the container that will serve as the root of the client side Angular app.
ECHO.
ECHO 'mkdir C:\ClientApp'
mkdir C:\ClientApp

REM Make the newly created directory the current directory.
ECHO.
ECHO 'cd C:\ClientApp'
cd C:\ClientApp

REM Copy the entire directory structure and contents for the client side Angular app from the volume to the directory in the container.
ECHO.
ECHO xcopy /S /Q C:\project\demo-app\ClientApp .
xcopy /S /Q C:\project\demo-app\ClientApp .
	
REM Run unit test using Karma and the "headless" Chromium browser.  
REM Use the specified Karma configuration file.  It specifies the use of "headless" Chrome 
REM and only does a single run instead of staying active until shutdown manually.
ECHO.
ECHO "npm test --karma-config karma.ChromeHeadless.conf.js > C:\project\docker\unit-tests\unit-tests-output.txt"
npm test -- --karma-config karma.ChromeHeadless.conf.js > C:\project\docker\unit-tests\unit-tests-output.txt

ECHO.
ECHO ---------- demo-app-tests.cmd ----------
ECHO.