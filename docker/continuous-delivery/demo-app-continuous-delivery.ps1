<#
PowerShell script that runs the pipeline for demo-app.
The script can be run by selecting the file in Windows Explorer, right clicking to display the
context menu and then selecting "Run with PowerShell".  The problem with this method is that 
the PowerShell window that is opened immediately disappears when the script finishes executing
making it difficult to see what was output to the window.
Alternatively you can open a PowerShell window and type "./demo-app-continuous-delivery.ps1"
#>

<# 
Escaped characters for Add-Content commandlet:
(Note that the escaping character is a back-tick not a single quote.)
`0 -- Null
`a -- Alert
`b -- Backspace
`n -- New line
`r -- Carriage return
`t -- Horizontal tab
`' -- Single quote
`" -- Double quote 
#>

# Delete everything in the "output" directory.
Write-host
Write-host 'Remove-Item c:\output\*.*'
Remove-Item c:\output\*.*

Add-Content c:\output\results.txt "Pass/Fail`tExitCode`tDescription"
Add-Content c:\output\results.txt "---------`t--------`t-----------"

# Clone the repository
Write-host
Write-host 'git clone https://github.com/ccubed101/demo-app'
$process = start-process -FilePath 'git' -ArgumentList 'clone https://github.com/ccubed101/demo-app' -Wait -RedirectStandardOutput 'C:\output\Git Output.txt'  -RedirectStandardError 'C:\output\Git Error.txt' -PassThru
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tClone Git repository.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -1
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tClone Git repository."
}

## Perform a dotnet restore.
#Write-host
#Write-host 'dotnet restore'
#$process = Start-Process -FilePath 'dotnet' -ArgumentList 'restore' -WorkingDirectory 'C:\demo-app' -PassThru -Wait -RedirectStandardOutput 'C:\output\dotnet restore Output.txt' -RedirectStandardError 'C:\output\dotnet restore Errors.txt'
#Write-host 'ExitCode: |' $process.ExitCode '|'
#If ($process.ExitCode -ne 0) {
#	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tdotnet restore.  See output files."
#	Add-Content c:\output\results.txt "Process has completed."
#	Add-Content c:\output\results.txt "Status: FAILED"
#	exit -2
#} else {
#	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tdotnet restore."
#}

# Build client-side of application (Release configuration).
Write-host
Write-host 'dotnet publish -c Release -o C:\dist C:\demo-app\demo-app.sln'
$process = start-process -FilePath 'dotnet' -ArgumentList 'publish -c Release -o C:\dist C:\demo-app\demo-app.sln' -Wait -PassThru  -RedirectStandardOutput 'C:\output\dotnet publish Output.txt' -RedirectStandardError 'C:\output\dotnet publish Error.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tBuild client-side of application (Release configuration).  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -3
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tBuild client-side of application (Release configuration)."
}

## Build server side rendering code (Angular Universal).
#Write-host
#Write-host 'npm run build:ssr'
#$process = Start-Process -FilePath 'npm' -ArgumentList 'run build:ssr' -WorkingDirectory 'C:\demo-app\demo-app\ClientApp' -Wait -RedirectStandardOutput 'C:\output\ssr Output.txt'  -RedirectStandardError 'C:\output\ssr Error.txt' -PassThru
#Write-host 'ExitCode: |' $process.ExitCode '|'
#If ($process.ExitCode -ne 0) {
#	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tBuild server side rendering code (Angular Universal).  See output files."
#	Add-Content c:\output\results.txt "Process has completed."
#	Add-Content c:\output\results.txt "Status: FAILED"
#	exit -4
#} else {
#	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tBuild server side rendering code (Angular Universal)."
#}

## Move server side rendering artifacts to appropriate locations.
#Write-host
#Write-host 'Move-Item C:\demo-app\demo-app\ClientApp\node_modules C:\dist\ClientApp\'
#Add-Content c:\output\results.txt "Pass`t`t0`t`tMove-Item C:\demo-app\demo-app\ClientApp\node_modules C:\dist\ClientApp\"
#Move-Item -Path 'C:\demo-app\demo-app\ClientApp\node_modules' -Destination 'C:\dist\ClientApp\'
#Write-host 'Move-Item C:\demo-app\demo-app\ClientApp\dist-server C:\dist\ClientApp\'
#Add-Content c:\output\results.txt "Pass`t`t0`t`tMove-Item C:\demo-app\demo-app\ClientApp\dist-server C:\dist\ClientApp\"
#Move-Item -Path 'C:\demo-app\demo-app\ClientApp\dist-server' -Destination 'C:\dist\ClientApp\'

# Execute the app with built-in Kestrel server.  Do not wait for app to exit.
Write-host
Write-host 'dotnet demo-app.dll'
Add-Content c:\output\results.txt "`t`t`t`tExecute the app with built-in Kestrel server.  Do not wait for app to exit."
$AppProcess = Start-Process -FilePath 'dotnet' -ArgumentList 'demo-app.dll' -WorkingDirectory 'C:\dist' -PassThru

# Take screen shot using Puppeteer and Headless Chrome.
Write-host
Write-host 'node ScreenShot.js'
$process = Start-Process -FilePath 'node' -ArgumentList 'ScreenShot.js' -WorkingDirectory 'C:\' -Wait -RedirectStandardOutput 'C:\output\Screen Shot Output.txt'  -RedirectStandardError 'C:\output\Screen Shot  Error.txt' -PassThru
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tTake screen shot using Puppeteer and Headless Chrome.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -5
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tTake screen shot using Puppeteer and Headless Chrome."
}

# We no longer need the running app. 
Write-host
Write-host 'stop dotnet demo-app.dll'
Add-Content c:\output\results.txt "`t`t`t`tKilled app being executed with built-in Kestrel server."
Stop-Process -InputObject $AppProcess

# Compare screen shot with reference image.
Write-host
Write-host 'Compare screen shot with reference image.'
if ((Get-Childitem -file C:\reference.png).length -eq (Get-Childitem -file C:\output\output.png).length) {
	Add-Content c:\output\results.txt "Pass`t`t`t`tOutput screen shot matches reference screen shot."
	Write-host "Succeeded"
} else {
	Add-Content c:\output\results.txt "Fail`t`t`t`tOutput screen shot does not match reference screen shot.  Compare output.png with reference.png."
	Write-host "Failed"
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -6
}

# Install the angular CLI (because we need 'ng' to run unit tests).
Write-host
Write-host 'npm install @angular/cli'
$process = Start-Process -FilePath 'npm' -ArgumentList 'install @angular/cli' -WorkingDirectory 'C:\demo-app\demo-app\ClientApp' -PassThru -Wait -RedirectStandardOutput 'C:\output\Angular CLI Output.txt' -RedirectStandardError 'C:\output\Angular CLI Errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tAngular CLI install.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -7
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tAngular CLI install."
}

# Run unit test using Karma and the "headless" Chromium browser.  
# Use the specified Karma configuration file.  It specifies the use of "headless" Chrome 
# and only does a single run instead of staying active until shutdown manually.
Write-host
Write-host 'npm test -- --karma-config karma.ChromeHeadless.conf.js'
$UnitTestOutputFileSpec = 'C:\output\Unit Tests Output.txt'
$process = Start-Process -FilePath 'npm' -ArgumentList 'test -- --karma-config karma.ChromeHeadless.conf.js' -WorkingDirectory 'C:\demo-app\demo-app\ClientApp' -PassThru -Wait -RedirectStandardOutput $UnitTestOutputFileSpec -RedirectStandardError 'C:\output\Unit Tests Errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tUnit tests.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -8
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tUnit tests."
}

# Use grep to examine the output of the unit tests to determine success or failure.
Write-host
Write-host 'grep "FAILED" "C:\output\Unit Tests Output.txt"'
$process = Start-Process -FilePath 'C:\grep\grep.exe' -ArgumentList "`"FAILED`" `"$UnitTestOutputFileSpec`"" -WorkingDirectory "C:\grep" -PassThru -Wait -RedirectStandardOutput 'C:\output\Unit Tests grep FAILED output.txt' -RedirectStandardError 'C:\output\grep errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 1) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tSearch of unit test results yielded 1 or more lines containing 'FAILED'.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -9
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tSearch of unit test results yielded 0 lines containing 'FAILED'."
}
Write-host
Write-host 'grep "SUCCESS" "C:\output\Unit Tests Output.txt"'
$process = Start-Process -FilePath 'C:\grep\grep.exe' -ArgumentList "`"SUCCESS`" `"$UnitTestOutputFileSpec`"" -WorkingDirectory "C:\grep" -PassThru -Wait -RedirectStandardOutput 'C:\output\Unit Tests grep SUCCESS output.txt' -RedirectStandardError 'C:\output\grep errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tSearch of unit test results yielded 0 lines containing 'SUCCESS'.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -10
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tSearch of unit test results yielded 1 or more lines containing 'SUCCESS'."
}

# Install protractor.
Write-host
Write-host 'npm install protractor'
$process = Start-Process -FilePath 'npm' -ArgumentList 'install protractor' -WorkingDirectory 'C:\demo-app\demo-app\ClientApp' -PassThru -Wait -RedirectStandardOutput 'C:\output\Install Protractor Output.txt' -RedirectStandardError 'C:\output\Install Protractor Errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tInstall Protractor.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -11
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tInstall Protractor."
}

# Perform e2e (integration) tests with headless chrome.
Write-host
Write-host 'npm run e2e -- --protractor-config=protractor.headless-chrome.conf.js'
$e2eTestOutputFileSpec  = 'C:\output\e2e Tests Output.txt'
$process = Start-Process -FilePath 'npm' -ArgumentList 'run e2e -- --protractor-config=protractor.headless-chrome.conf.js' -WorkingDirectory 'C:\demo-app\demo-app\ClientApp' -PassThru -Wait -RedirectStandardOutput 'C:\output\e2e Tests Output.txt' -RedirectStandardError 'C:\output\e2e Tests Errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`te2e tests.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -12
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`te2e tests."
}

# Use grep to examine the output of the e2e tests to determine success or failure.
Write-host
Write-host 'grep "FAIL" "C:\output\e2e Tests Output.txt"'
$process = Start-Process -FilePath 'C:\grep\grep.exe' -ArgumentList "`"FAIL`" `"$e2eTestOutputFileSpec`"" -WorkingDirectory "C:\grep" -PassThru -Wait -RedirectStandardOutput 'C:\output\e2e grep FAIL output.txt' -RedirectStandardError 'C:\output\e2e grep FAIL errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 1) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tSearch of e2e test results yielded 1 or more lines containing 'FAIL'.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -13
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tSearch of e2e test results yielded 0 lines containing 'FAIL'."
}
Write-host
Write-host 'grep "SUCCESS" "C:\output\e2e Tests Output.txt"'
$process = Start-Process -FilePath 'C:\grep\grep.exe' -ArgumentList "`"SUCCESS`" `"$e2eTestOutputFileSpec`"" -WorkingDirectory "C:\grep" -PassThru -Wait -RedirectStandardOutput 'C:\output\e2e grep SUCCESS output.txt' -RedirectStandardError 'C:\output\e2e grep SUCCESS errors.txt'
Write-host 'ExitCode: |' $process.ExitCode '|'
If ($process.ExitCode -ne 0) {
	Add-Content c:\output\results.txt "Fail`t`t$($process.ExitCode)`t`tSearch of e2e test results yielded 0 lines containing 'SUCCESS'.  See output files."
	Add-Content c:\output\results.txt "Process has completed."
	Add-Content c:\output\results.txt "Status: FAILED"
	exit -14
} else {
	Add-Content c:\output\results.txt "Pass`t`t$($process.ExitCode)`t`tSearch of e2e test results yielded 1 or more lines containing 'SUCCESS'."

}

Add-Content c:\output\results.txt "Process has completed."
Add-Content c:\output\results.txt "Status: SUCCEEDED"

exit 0