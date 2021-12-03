# Makefile
SHELL := bash

all: scrap clean_data analyse nlp clean


# Scrap web pages
scrap:
	python3 scripts/scrap.py

# Refine data
clean_data:
	python3 scripts/clean.py

# Create .pngs with some graphic visualiztion of the clean data
analyse: 
	python3 scripts/analyse.py

# Create Word cloud and other nlp functions
nlp: 
	python3 scripts/nlp.py


# Delete all created files
# TODO Still not deleting files
clean:
	rm -rf parsed_text.csv data_clean.csv 