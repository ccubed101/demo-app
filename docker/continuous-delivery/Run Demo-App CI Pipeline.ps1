# Kick off continuous delivery pipeline.
Start-Process -FilePath 'docker-compose' -ArgumentList '--compatibility up -d'

# Start a timer.  There was a situation where a specific process never ended.  In particular
# the ScreenShot.js script never ended for some, as yet, unknown reason.  To deal with this
# problem a timer is initiated here so that after some sufficiently long amount of time the 
# entire process is ended regardless of the reason.
$Timer = [Diagnostics.Stopwatch]::StartNew()
$Timeout = 1800		# 30 minutes; the entire process should be complete after this amount of time.

# Wait 10 minutes before starting to check whether the process has completed.
Start-Sleep -Seconds 600
do
{
	# Check if the process has completed on this interval.
    Start-Sleep -Seconds 15
	
    Write-Output 'Checking if continuous delivery process is finished...'
	
	# To get a valid '$process' object make sure to use both the -PassThru and -Wait options.
    $process = Start-Process -FilePath 'grep\grep' -ArgumentList '"Process has completed" output\results.txt' -PassThru -Wait -NoNewWindow
	Write-Output $process.ExitCode
    If ($process.ExitCode -eq 0)
    {
		Start-Process -FilePath 'docker-compose' -ArgumentList '--compatibility down'
        $done = $True
    }
	# If an amount of time has passed that exceeds that maximum amount of time it should 
	# take for everything to complete then stop the entire process based on the assumption
	# that some individual process simpley never ended.
	If ($Timer.Elapsed.TotalSeconds -gt $Timeout)
	{
		$Timer.Stop()
		Start-Process -FilePath 'docker-compose' -ArgumentList '--compatibility down'
		Add-Content c:\output\results.txt "Max timeout reached."
		Add-Content c:\output\results.txt "It is likely that a process, for whatever reason, did not complete or was not terminated."
		Add-Content c:\output\results.txt "One possible reason is not enough memory.  Try increasing memory by modifying -m flag is docker-compose file."
		Add-Content c:\output\results.txt "Status: FAILED"
        $done = $True
	}
}
while (-not $done)