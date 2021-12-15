DOCKER_COMPOSE ?= docker-compose -p code-test
DOCKER_RUN ?= ${DOCKER_COMPOSE} run --rm --service-ports
YARN ?= ${DOCKER_RUN} yarn

all: install lint unit-test feature-test build dev

install:
	${MAKEFILE_SUDO_COMMAND} ${YARN} install --check-files --ignore-engines --pure-lockfile
.PHONY: install

dev:
	${MAKEFILE_SUDO_COMMAND} ${DOCKER_COMPOSE} down -v || true
	${MAKEFILE_SUDO_COMMAND} ${DOCKER_COMPOSE} up dev
.PHONY: dev
