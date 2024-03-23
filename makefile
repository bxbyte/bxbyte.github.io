update: update.modules update.self

update.self:
	echo Updating itself
	git add .
	git commit -m 'submodule update'
	git push

update.modules:
	echo Updating modules
	git submodule foreach --recursive "git add . && git commit -m 'submodule update' && git push origin HEAD:main"

pull:
	git pull --recurse-submodules
	git submodule update --remote --recursive
	git submodule update --force --recursive --init --remote