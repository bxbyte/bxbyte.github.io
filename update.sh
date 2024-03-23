# Update submodule
git submodule foreach --recursive "git add . && git commit -m 'submodule update' && git push"

# Update itself
git add .
git commit -m 'submodule update'
git push