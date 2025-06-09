.PHONY: pre-commit

setup:
	@echo "Installing necessary packages for this repository..."
	brew bundle

pre-commit:
	@echo "Setting up pre-commit hooks..."
	pre-commit install --hook-type pre-commit --hook-type pre-push

init: setup pre-commit
	@echo "Repository is READY!"
