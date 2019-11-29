using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
                app.UseHsts();
            }

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
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

				// **** Added to support Server Side Rendering ****
				spa.UseSpaPrerendering(options =>
				{
					// The path specified in the statement below should probably be different
					// from the path specified above, configuration.RootPath = "ClientApp/dist";
					// The reason is that the "outputPath" property of the "build" target in 
					// the angular.json file will specify "dist" for sake of convenience.  While
					// it may seem nice to have the client code and server-side rendering code in 
					// the same directory problems could arise during a VS Publish operation if 
					// the contents of the output directory (i.e. "dist") is deleted at the start
					// of the operation becasue the directory already contain the server-side
					// rendering code.
					// 
					options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.js";
					options.BootModuleBuilder = env.IsDevelopment()
						? new AngularCliBuilder(npmScript: "build:ssr")
						: null;
					options.ExcludeUrls = new[] { "/sockjs-node" };
				});
				// **** Added to support Server Side Rendering ****

				if (env.IsDevelopment())
                {
					// From https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-2.1&tabs=netcore-cli#server-side-rendering
					// Around 10 seconds is required to start the Angular CLI server when you try and run your app from within VS.  
					// If you want to avoid this delay then comment out the line below and comment in the line below that.  Then 
					// manually start the Angular CLI server from a command prompt within the "ClientApp" directory using "npm start".
					// Then when you run your app from within VS you can simply leave the browser running (no need to stop it) and
					// then modify the client app's file as desired and saving the modifications when you want to see them rendered.
					//spa.UseAngularCliServer(npmScript: "start");
					spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
				}
			});
        }
    }
}
