Write-Host "**** Executing demo-app-unit-tests.ps1 ****"
Write-Host

$outputFile="unit-tests-output.txt"

# Delete the $outputFile file if it exists in order to avoid having to deal with whether or not the file should be overwritten.
if (Test-Path $outputFile -PathType Leaf) {
	Write-Host "Deleting " $outputFile'.'
	Write-Host
	remove-item $outputFile
}

$imageName="demo-app-unit-tests"
$imageVersion="1.0.0"

# Checking to see if requried image is current in list of docker images
$pinfo = New-Object System.Diagnostics.ProcessStartInfo
$pinfo.FileName = "docker"
$pinfo.RedirectStandardOutput = $true
$pinfo.UseShellExecute = $false
$pinfo.Arguments = "images demo-app-unit-tests:1.0.0"
$p = New-Object System.Diagnostics.Process
$p.StartInfo = $pinfo
$p.Start() | Out-Null
$p.WaitForExit()
$stdout = $p.StandardOutput.ReadToEnd()
if (-not ($stdout -Match $imageName) -and ($stdout -match $imageVersion)) {
	# If required image is not in list of docker images then it has to be built.
	Write-Host $imageName':'$imageVersion' not found.  It must be built.'
	Write-Host
	start-process -FilePath "docker" -ArgumentList "build --force-rm -t demo-app-unit-tests:1.0.0 ." -Wait
}

Write-Host "Run the " $imageName':'$imageVersion " image."
Write-Host 'start-process -FilePath "docker" -ArgumentList "run --rm -m=5g -v $PWD\..\..\:c:\project --name demo-app-unit-tests demo-app-unit-tests:1.0.0" -Wait'
Write-Host
$argumentList='run --rm -m=5g -v "' + $PWD + '\..\..\:c:\project" --name ' + $imageName + ' ' + $imageName + ':' + $imageVersion
start-process -FilePath "docker" -ArgumentList $argumentList -NoNewWindow -Wait

# If any unit test fails...then display the output of the unit tests.
if (Select-String -Path $outputFile -Pattern 'FAIL' -CaseSensitive -SimpleMatch) {
	start-process -FilePath "notepad++" -ArgumentList $outputFile
}

Write-Host "**** Done ****"



# The following did not work because there was no way to specify 5 GB of memory (see -m=5g above in 'docker run...' command.

# docker-compose up: Build the image (if it does not exists) and then run it.
#Write-Host 'start-process -FilePath "docker-compose" -ArgumentList "-f demo-app-unit-tests.yml up -d" -Wait'
#start-process -FilePath "docker-compose" -ArgumentList "-f docker-compose.yml up" -Wait

#docker-compose down
#Write-Host 'start-process -FilePath "docker-compose" -ArgumentList "-f demo-app-unit-tests.yml down" -Wait'
#start-process -FilePath "docker-compose" -ArgumentList "-f docker-compose.yml down" -Wait