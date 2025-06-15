.PHONY: pre-commit setup init

setup:
	@echo "Installing necessary packages for this repository..."
ifeq ($(OS),Windows_NT)
	@echo "Installing pre-commit via pip on Windows"
	-pip install pre-commit
else
	brew bundle
endif

pre-commit:
	@echo "Setting up pre-commit hooks..."
ifeq ($(OS),Windows_NT)
	@echo "Installing pre-commit via pip on Windows"
	python -m pre_commit install --hook-type pre-commit --hook-type pre-push
else
	pre-commit install --hook-type pre-commit --hook-type pre-push
endif

init: setup pre-commit
	@echo "Repository is READY!"
