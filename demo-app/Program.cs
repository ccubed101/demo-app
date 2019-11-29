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
						// Certificate used to encrypt data over TLS (i.e. SSL)
						co.ServerCertificate = new X509Certificate2(config.GetValue<string>("NameOfX509CertificateFileUsedForKestrelHTTPS"));
					});
				})
				// Specifies where Kestrel listens for encrypted requests.
				.UseUrls(config.GetValue<string>("IPAddressThatKestrelListensForRequests"))
				.UseIISIntegration()
				.Build()
				.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
