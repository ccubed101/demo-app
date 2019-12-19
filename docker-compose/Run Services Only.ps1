Start-Process -FilePath 'docker-compose' -ArgumentList '-f services-only.yml up' -NoNewWindow

Read-Host -Prompt 'Press any key to run docker-compose down...'

Start-Process -FilePath 'docker-compose' -ArgumentList '-f services-only.yml down' -NoNewWindow