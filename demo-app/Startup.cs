using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

//using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.Extensions;		// Added as part of migration to ASP.NET Core 3.0.  It replaces Microsoft.AspNetCore.SpaServices which is now obsolete.

namespace demo_app
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
				.AddMvc(options => 
				{ 
					// Added as part of migration to version 3.0 of ASP.NET Core.  When
					// migrating Microsoft recommends using the new Endpoint Routing.  It
					// is the default; hence the need for the statement below.  (Will be 
					// switching to Endpoint Routing soon.)
					options.EnableEndpointRouting = false; 
				})
				.SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            // In production, the Angular files will be served from this directory. 
            services.AddSpaStaticFiles(configuration =>
            {
				// The path specified in the statement below should agree with the 
				// "outputPath" property of the "build" target in the angular.json 
				// file (e.g.. "outputPath": "dist").  This is done so that when a 
				// VS Publish operation occurs the client side code will automatically
				// be in the appropriate location.
				configuration.RootPath = "ClientApp/dist";
            });

			services.Configure<IISServerOptions>(options =>
			{
				options.AutomaticAuthentication = false;
			});
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

				// Microsoft recommends that HTTP Strict Transport Security Protocol (HSTS) headers 
				// should be sent to the client in production code.  HSTS is a web security policy 
				// mechanism that helps to protect websites against protocol downgrade attacks[1] and 
				// cookie hijacking. It allows web servers to declare that web browsers should interact 
				// with it using only HTTPS connections, which provide Transport Layer Security (TLS/SSL).
				// Apps deployed in a reverse proxy configuration (kestrel using IIS as a reverse proxy;
				// which is the "out-of-process" model) do not need HSTS if IIS performs the service.
				app.UseHsts();
            }

			// Microsoft recommends using HTTP redirection for production code to redirect 
			// HTTP requests to HTTPS.  Apps deployed in a reverse proxy configuration (kestrel 
			// using IIS as a reverse proxy; which is the "out-of-process" model) do not need HTTP 
			// redirection if IIS performs the service.
			app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";


				// The sections below were commented out when the migration to ASP.NET Core 3.0
				// occurred.  It appears that it is no longer necessary. It only really mattered 
				// if you wanted to run the app from within Visual Studio using the green triangle 
				// that is used to launch "demo-app".  You can still do the same (without the code
				// below) but instead of using the port specified in the Properties pages (which 
				// is no longer there) you simply use https://localhost.  Not sure how server 
				// side rendering is affected.  It may still be necessary to manually execute 
				// "ng build:ssr".

				//// To learn more about options for serving an Angular SPA from ASP.NET Core,
				//// see https://go.microsoft.com/fwlink/?linkid=864501

				//// **** Added to support Server Side Rendering ****
				//spa.UseSpaPrerendering(options =>
				//{
				//	// The path specified in the statement below should probably be different
				//	// from the path specified above, configuration.RootPath = "ClientApp/dist";
				//	// The reason is that the "outputPath" property of the "build" target in 
				//	// the angular.json file will specify "dist" for sake of convenience.  While
				//	// it may seem nice to have the client code and server-side rendering code in 
				//	// the same directory problems could arise during a VS Publish operation if 
				//	// the contents of the output directory (i.e. "dist") is deleted at the start
				//	// of the operation becasue the directory already contain the server-side
				//	// rendering code.
				//	// 
				//	options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.js";
				//	options.BootModuleBuilder = env.IsDevelopment()
				//		? new AngularCliBuilder(npmScript: "build:ssr")
				//		: null;
				//	options.ExcludeUrls = new[] { "/sockjs-node" };
				//});
				//// **** Added to support Server Side Rendering ****

				//if (env.IsDevelopment())
				//{
				//	// From https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-2.1&tabs=netcore-cli#server-side-rendering
				//	// Around 10 seconds is required to start the Angular CLI server when you try and run your app from within VS.  
				//	// If you want to avoid this delay then comment out the line below and comment in the line below that.  Then 
				//	// manually start the Angular CLI server from a command prompt within the "ClientApp" directory using "npm start".
				//	// Then when you run your app from within VS you can simply leave the browser running (no need to stop it) and
				//	// then modify the client app's file as desired and saving the modifications when you want to see them rendered.
				//	spa.UseAngularCliServer(npmScript: "start");
				//	//spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
				//}


			});
		}
    }
}
