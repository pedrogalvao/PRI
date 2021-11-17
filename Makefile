# Makefile
SHELL := bash

all: analyse nlp

# Create .pngs with some graphic visualiztion of the clean data
analyse: clean_data
	python3 scripts/analyse.py

# Create Word cloud and other nlp functions
nlp: clean_data
	python3 scripts/nlp.py

clean_data:
	python3 scripts/clean.py



# Delete all created files
clean:
	rm parsed_text.csv data_clean.csv 