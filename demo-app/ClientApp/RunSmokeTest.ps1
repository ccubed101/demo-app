# Use dotnet.exe to execute demo-app.dll using the Kestrel server.
$pinfo = New-Object System.Diagnostics.ProcessStartInfo
$pinfo.FileName = "dotnet"
$pinfo.RedirectStandardError = $true
$pinfo.RedirectStandardOutput = $true
$pinfo.UseShellExecute = $false
$pinfo.Arguments = "demo-app.dll"
$pinfo.Domain = "jenkins"
$pinfo.Password = new-object System.Security.SecureString
$pinfo.WorkingDirectory = ".\\demo-app\\ClientApp\\dist"
$DemoAppProcess = New-Object System.Diagnostics.Process
$DemoAppProcess.StartInfo = $pinfo
$DemoAppProcess.Start() | Out-Null

# Use node.exe to execute ScreenShot.js
$pinfo = New-Object System.Diagnostics.ProcessStartInfo
$pinfo.FileName = "node"
$pinfo.RedirectStandardError = $true
$pinfo.RedirectStandardOutput = $true
$pinfo.UseShellExecute = $false
$pinfo.Arguments = "ScreenShot.js"
$pinfo.Domain = "jenkins"
$pinfo.WorkingDirectory = ".\\demo-app\\ClientApp"
$pinfo.Password = new-object System.Security.SecureString
$SmokeTestProcess = New-Object System.Diagnostics.Process
$SmokeTestProcess.StartInfo = $pinfo
$SmokeTestProcess.Start() | Out-Null
$SmokeTestProcess.WaitForExit()

Write-Host "DotNet Demo-app.dll"
Write-Host "-------------------"
$stdout = $DemoAppProcess.StandardOutput.ReadToEnd()
$stderr = $DemoAppProcess.StandardError.ReadToEnd()
Write-Host "stdout: $stdout"
Write-Host "stderr: $stderr"
Write-Host "exit code: " $DemoAppProcess.ExitCode

Write-Host
Write-Host "Node ScreenShot.js"
Write-Host "------------------"
$stdout = $SmokeTestProcess.StandardOutput.ReadToEnd()
$stderr = $SmokeTestProcess.StandardError.ReadToEnd()
Write-Host "stdout: $stdout"
Write-Host "stderr: $stderr"
Write-Host "exit code: " $SmokeTestProcess.ExitCode

Stop-Process -InputObject $DemoAppProcess

