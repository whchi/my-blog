#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo # if using a theme, replace with `hugo -t <YOURTHEME>`

# Go To Public folder
#cd public
# Add changes to git.
#git add .

# Commit changes.
#git commit -m "rebuilding site `date`"

# Push source and build repos.
#git push origin master

# Come Back up to the Project Root
#cd ..

# push using submodule
git subtree push --prefix=public sub_public master

# raw update
msg="updated at `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -am "$msg"
git push origin master
