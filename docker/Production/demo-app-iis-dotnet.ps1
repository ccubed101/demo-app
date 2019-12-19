# Import the "WebAdministration" module in order to setup an IIS website.
# Note that when a module is imported it only stays imported for the duration of
# the PowerShell instance.  Therefore all of the cmdlets below must be executed 
# in the same PowerShell script file.  Executing the cmdlets individually in the
# dockerfile will not work because a different PowerShell instance is used to 
# execute each cmdlet.
Import-Module WebAdministration

# Setup the IIS website.
New-Item iis:\Sites\demo-app -Type Site -bindings @{protocol="https";bindingInformation="*:443:"} -physicalPath C:\inetpub\wwwroot\demo-app
#New-Website -Name demo-app -Port 81 -PhysicalPath C:\inetpub\wwwroot\demo-app -ApplicationPool demo-app

# Setup logging.
Set-ItemProperty 'IIS:\Sites\demo-app' -Name logFile.directory -Value 'C:\'

# Create a new certificate
cd cert:
$cert = New-SelfSignedCertificate -DnsName  myweb -Friendlyname MyCert -CertStoreLocation Cert:\LocalMachine\My
$rootStore = New-Object System.Security.Cryptography.X509Certificates.X509Store -ArgumentList Root, LocalMachine

# Add certificate to the trusted root of the certificate store on the container.
$rootStore.Open("MaxAllowed")
$rootStore.Add($cert)
$rootStore.Close()

# Bind certificate to port 443.
cd iis:
new-item -path IIS:\SslBindings\0.0.0.0!443 -value $cert
iisreset