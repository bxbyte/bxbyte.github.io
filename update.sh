# Update submodule
git submodule foreach "git add . && git commit -m 'submodule update' && git push"

# Update itself
git add .
git commit -m 'submodule update'
git push