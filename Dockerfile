FROM matthewpatell/universal-docker-nginx:3.7

MAINTAINER Yarmaliuk Mikhail <mikhail.yarmaliuk@lomray.com>

ENV NODE_VERSION 14.2.0
ENV NODE_CHECKSUM=3a621e3d8f4186520c2bf1a81613e526f1f52a097bf945af5fa38d5496b12a8b

# INSTALL NODE & NPM
RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node \
    && apk add --no-cache \
        libstdc++ \
    && apk add --no-cache --virtual .build-deps \
        curl \
    && ARCH= && alpineArch="$(apk --print-arch)" \
      && case "${alpineArch##*-}" in \
        x86_64) \
          ARCH='x64' \
          CHECKSUM="$NODE_CHECKSUM" \
          ;; \
        *) ;; \
      esac \
  && if [ -n "${CHECKSUM}" ]; then \
    set -eu; \
    curl -fsSLO --compressed "https://unofficial-builds.nodejs.org/download/release/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH-musl.tar.xz"; \
    echo "$CHECKSUM  node-v$NODE_VERSION-linux-$ARCH-musl.tar.xz" | sha256sum -c - \
      && tar -xJf "node-v$NODE_VERSION-linux-$ARCH-musl.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
      && ln -s /usr/local/bin/node /usr/local/bin/nodejs; \
  else \
    echo "Building from source" \
    # backup build
    && apk add --no-cache --virtual .build-deps-full \
        binutils-gold \
        g++ \
        gcc \
        gnupg \
        libgcc \
        linux-headers \
        make \
        python \
    # gpg keys listed at https://github.com/nodejs/node#release-keys
    && for key in \
      94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
      FD3A5288F042B6850C66B31F09FE44734EB7990E \
      71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
      DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
      C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
      B9AE9905FFD7803F25714661B63B535A4C206CA9 \
      77984A986EBC2AA786BC0F66B01FBB92821C587A \
      8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
      4ED778F539E3634C779C87C6D7062848A1AB005C \
      A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
      B9E2F5981AA6E0CD28160D9FF13993A75599653C \
    ; do \
      gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
      gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
      gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
    done \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION.tar.xz" \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xf "node-v$NODE_VERSION.tar.xz" \
    && cd "node-v$NODE_VERSION" \
    && ./configure \
    && make -j$(getconf _NPROCESSORS_ONLN) V= \
    && make install \
    && apk del .build-deps-full \
    && cd .. \
    && rm -Rf "node-v$NODE_VERSION" \
    && rm "node-v$NODE_VERSION.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt; \
  fi \
  && rm -f "node-v$NODE_VERSION-linux-$ARCH-musl.tar.xz" \
  && apk del .build-deps \
  # smoke tests
  && node --version \
  && npm --version

# Install tools for bash
RUN apk add --no-cache jq curl

# CONFIGURE NGINX
ENV DOMAIN_COMMON=_
ENV DOMAIN_DEFAULT=_
ENV NGINX_DEFAULT_HOST=no

ENV ENV_PATH=/docker-server/.env
ENV PACKAGE_DOCKER_FOLDER_CONTAINER=/docker-server
ENV PACKAGE_DOCKER_FOLDER=./node_modules/@matthew-p/docker-server/docker

ENV WEB_PATH=/var/www
ENV LOCAL_DEVELOPMENT=false
ENV PROJECT_TEMPLATE=not-exist

WORKDIR $WEB_PATH

RUN mkdir -p /docker-server \
	&& touch $ENV_PATH \
	&& mkdir -p /scripts \
	&& mkdir -p /var/log/nginx \
	&& mkdir -p $WEB_PATH

COPY $PACKAGE_DOCKER_FOLDER $PACKAGE_DOCKER_FOLDER_CONTAINER
COPY $PACKAGE_DOCKER_FOLDER/scripts /scripts
COPY $PACKAGE_DOCKER_FOLDER/nginx/lua /etc/nginx/lua
COPY $PACKAGE_DOCKER_FOLDER/nginx/snippets /etc/nginx/snippets
COPY ./docker/nginx/conf-dynamic.d $PACKAGE_DOCKER_FOLDER_CONTAINER/nginx/conf-dynamic.d

# SITE CONFIG
COPY ./build $WEB_PATH/build
COPY ./package.json $WEB_PATH/package.json
COPY ./node_modules $WEB_PATH/node_modules
COPY ./package-lock.json $WEB_PATH/package-lock.json

CMD export ROOT_PROJECT_DIR=$WEB_PATH/build \
  # Used in nginx
  && export REPLACE_ROOT=$ROOT_PROJECT_DIR/public \
	&& /scripts/init-nginx.sh \
	&& /scripts/start-nginx.sh \
	&& NODE_ENV=production node $ROOT_PROJECT_DIR/server.js &> /var/log/react.log \
	&& tail -f /var/log/react.log
