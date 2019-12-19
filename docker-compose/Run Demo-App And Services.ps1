Start-Process -FilePath 'docker-compose' -ArgumentList '-f demo-app-and-services.yml up' -NoNewWindow

Read-Host -Prompt 'Press any key to run docker-compose down...'

Start-Process -FilePath 'docker-compose' -ArgumentList '-f demo-app-and-services.yml down' -NoNewWindow