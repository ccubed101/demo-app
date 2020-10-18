export let configuration = {

    // Use this URL when running BreezeDataService from Visual Studio.  But remember that the database has to be
    // attached to SQL Server Management Studio (or it won't work because it tries to log into the database with
    // what I think is an account that is peculiar to VS, 'MicrosoftAccount\ccubed101@gmail.com'. It may be possible
    // to tell the database to accept that login...but I have not tried it.  And I am not sure if it would be a
    // Windows login or if a password would be required or what it would be.)
    //UrlForBreezeBackEndService: "https://localhost:443/breeze/SchoolModel",

    // Use this URL when launching BreezeDataService via docker-compose file for demo-app and associated services.
    UrlForBreezeBackEndService: "https://localhost:9008/breeze/SchoolModel",
}
