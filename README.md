# Keep local github changes up to date with changes made to source repository
you first may need to go to your forked repository and you should see a `sync` repository changes button    
`git fetch upstream` getting all the changes from the source repository  
`git pull upstream main` grabbing the fetched changes and pulling them into your local repo

## NOTES:
upstream is an alias that with a link to my github repo (the source repo)  
you can check what the name and the url of your remote repos by typing the following command `git remote -v`  
`git pull upstream main` the `main` part corresponds to the branch you are pulling in from  
