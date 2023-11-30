# Define the default target that runs when you just type 'make'.
all: run

# Define the rule for the 'run' target.
run:
	@echo "Starting server..."
	. /Users/penoelothibeaud/.nvm/nvm.sh && cd server/src && nvm use v20.9.0 && npm uninstall bcrypt && npm install bcrypt && node index.js &
	sleep 2 # wait for the server to start

	@echo "Starting client..."
	. /Users/penoelothibeaud/.nvm/nvm.sh && cd client && nvm use v20.9.0 && npm start &
	sleep 2 # wait for the client to start
	
	# @echo "Running Python scripts..."
	# cd Tests && \
	# python3 UAT1_UAT3_test.py && python3 UAT2_P1_test.py && python3 UAT2_P2_UAT4_test.py && \
	# python3 UAT5_UAT6_test.py && python3 UAT7_UAT8_test.py && python3 UAT9_test.py && \
	# python3 UAT10_test.py && python3 UAT11_UAT12_UAT13_test.py && python3 UAT14_test.py

