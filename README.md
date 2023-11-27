# Utter-app

This is the github repo for the Utter Application. It is where we'll build the cross-platform app for iOS and Android, and it's the private counterpart to the public, more-research focused repo called [utter](https://github.com/jurmy24/utter).

## Commit message convention

When writing commit messages for this project, please try to write your commit messages in the following manner:

_Keyword(scope if needed): write the message in the imperative sense without capitals and no full stop at the end_

### Possible keywords

- Build: Build related changes (eg: npm related/ adding external dependencies)
- Chore: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
- Feat: A new feature
- Fix: A bug fix
- Docs: Documentation related changes
- Refactor: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
- Perf: A code that improves performance
- Style: A code that is related to styling
- Test: Adding new test or making changes to existing test
- Misc: Anything that in no way fits into the other categories

## Using a virtual environment

When using this repo, it is recommended to use a virtual environment and to import the packages from `requirements.txt` to run the code necessary in the relevant folder.

### For mac/linux

- Clone this repository
- `cd` to the _tech-testing_ folder
- Create a .venv folder using `python3 -m venv .venv`
- Activate the .venv using `source .venv/bin/activate`
- `cd` into the folder of interest within _tech-testing_
- In order to run the files in that folder, import the relevant dependencies using `pip install -r requirements.txt`

Note: if you want to save the current dependencies list you have in your .venv in `requirements.txt` you can just write `pip freeze > requirements.txt` into the terminal

### For windows

- Clone this repository
- `cd` to the _tech-testing_ folder
- Create a .venv folder using `python3 -m venv .venv`
- Activate the .venv using `. .venv/Scripts/activate`
- `cd` into the folder of interest within _tech-testing_
- In order to run the files in that folder, import the relevant dependencies using `pip install -r requirements.txt`

Note: if you want to save the current dependencies list you have in your .venv in `requirements.txt` you can just write `pip freeze > requirements.txt` into the command prompt
