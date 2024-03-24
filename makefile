update: update.modules update.self

update.self:
	git add .
	git commit -m '$m'
	git push

update.modules:
	git submodule foreach --recursive "git add . && git commit -m '$m' && git push origin HEAD:main"

pull:
	git pull --force --recurse-submodules
	git submodule update --force --recursive --init --remote