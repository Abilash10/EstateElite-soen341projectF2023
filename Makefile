# Use this file to run the project
# dont forget to whitelist the mongodb ip address in the mongodb atlas cluster
# enter 'make' in the terminal to run the project

all: run

run:
	@echo "Starting server..."
	. /Users/penoelothibeaud/.nvm/nvm.sh && cd server/src && nvm use v20.9.0 && npm uninstall bcrypt && npm install bcrypt && node index.js &
	sleep 2 # wait for the server to start

	@echo "Starting client..."
	. /Users/penoelothibeaud/.nvm/nvm.sh && cd client && nvm use v20.9.0 && npm start &
	sleep 2 # wait for the client to start

# todo: add a command to kill the server and the client
# todo: make the credentials private
