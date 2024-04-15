push: push.modules push.self

push.self:
	git add .
	git commit -m '$m'
	git push

push.modules:
	git submodule foreach --recursive "git add . && git commit -a -m '$m' && git push origin main"

pull: pull.self pull.modules

pull.self:
	git pull

pull.modules:
	git submodule update --force --recursive --init --remote

reset: reset.self reset.modules

reset.self:
	git reset --hard

reset.modules:
	git submodule foreach --recursive "git reset --hard"