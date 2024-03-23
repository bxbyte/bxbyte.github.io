# Update submodule
git submodule --recursive foreach "git add . && git commit -m 'submodule update' && git push"

# Update itself
git add .
git commit -m 'submodule update'
git push