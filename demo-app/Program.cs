using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography.X509Certificates;

namespace demo_app
{
    public class Program
    {
        public static void Main(string[] args)
        {
			// Creating an instance of a ConfigurationBuilder looks to be the only way 
			// gain access to configuration data in the this (i.e the Main) method.
			var config = new ConfigurationBuilder()
			   .SetBasePath(Directory.GetCurrentDirectory())
			   .AddJsonFile("appsettings.json", optional: true)
			   .Build();

			CreateWebHostBuilder(args)	

				// The following section configures Kestrel to use HTTPS.
				// Not sure what effect the following statements have if the application is served by IIS (via Docker).
				.UseKestrel((options) => {
					options.ConfigureHttpsDefaults((co) =>
					{
						// When this app was dockerized and run using docker-compose some very strange and
						// unpredictable behavior surrounding the X509 certificate occurred.  Sometimes there
						// would be no problem.  But often 1 of 2 exceptions would be thrown, 
						//   Unable to start Kestrel.  Internal.Cryptography.CryptoThrowHelper+WindowsCryptographicException: The specified network password is not correct.
						//   Unable to start Kestrel.  Internal.Cryptography.CryptoThrowHelper+WindowsCryptographicException: An internal error occurred.
						// All kinds of solutions were tried including the following statement to instantiate 
						// the X509 certificate,
						//   co.ServerCertificate = new X509Certificate2(config.GetValue<string>("NameOfX509CertificateFileUsedForKestrelHTTPS"), "", X509KeyStorageFlags.MachineKeySet);
						// but nothing worked.  Finally came across the following:
						//    https://github.com/dotnet/dotnet-docker/issues/1048
						// It suggested 2 possible solutions.  The first is to specify the "ContainerAdministrator"
						// user in the .yml file using 
						//   user: ContainerAdministrator
						// which is equivalent to adding the following to a "docker run" command,
						//   --user ContainerAdministrator
						// The second solutions is to instantiate the X509 certificate using the following statement,
						//   co.ServerCertificate = new X509Certificate2(config.GetValue<string>("NameOfX509CertificateFileUsedForKestrelHTTPS"), "", X509KeyStorageFlags.EphemeralKeySet);
						// The default user is "ContainerUser".  If you want to stay with the default then
						// you need to use the X509KeyStorageFlags.EphemeralKeySet.
						// The first solution where the .yml file is modified appears to work consistently.
						// The second solution may, or may not, work.  It has not been tested.
						co.ServerCertificate = new X509Certificate2(config.GetValue<string>("NameOfX509CertificateFileUsedForKestrelHTTPS"), "woscers101");
					});
				})
				// If you want to use IIS and the "In-process" model to host this app then call UseIIS().
				// Calling this method makes it possible to run the app in development mode using the 
				// green triangle in the VS toolbar when "IIS Express" is selected.  Also manually setting
				// up to use IIS on this development machine to host the app only works if this method is 
				// called.
				.UseIIS()
				// If you want to host app using IIS and the "Out-of-process" model the call UseIISIntegration(). 
				// The default model is "In-process".  If you want to use "Out-of-process" then add the following
				// to the .csproj file,
				//   <PropertyGroup>
				//	     <AspNetCoreHostingModel>OutOfProcess</AspNetCoreHostingModel>
				//   </PropertyGroup>
				.UseIISIntegration()
				// Specifies where Kestrel listens for encrypted requests.
				.UseUrls(config.GetValue<string>("IPAddressThatKestrelListensForRequests"))
				.Build()
				.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
