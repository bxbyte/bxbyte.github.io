update: update.modules update.self

update.self:
	echo Updating itself
	git add .
	git commit -m 'submodule update'
	git push

update.modules:
	echo Updating modules
	git submodule foreach --recursive "git add . && git commit -m 'submodule update' && git push"

pull:
	git submodule update --force --recursive --init --remote