#########
# STAGE #
#########
FROM node:16.13.1 as buildstage

RUN apt update -y && \
    apt install -y --no-install-recommends --no-install-suggests \
    nginx \
    ca-certificates &&\
    rm -rf /var/cache/apt/ &&\
    rm -rf /var/lib/apt/lists/*
RUN mkdir -p /project
COPY . /project
WORKDIR /project
RUN cd
RUN npm install && npm run build # && rm -rf node_modules
#TODO remove node_modules when the build is used to start
#RUN cd server && npm install && npm run build && rm -fr node_modules

COPY docker/scripts/start_all.sh /project/
RUN chmod 777 /project/start_all.sh

RUN rm -rf /etc/apt/apt.conf.d/90nginx

#########
# STAGE #
#########
FROM node:16.13.1
RUN mkdir -p /project
COPY --from=buildstage /project /project
RUN rm -rf /etc/apt/apt.conf.d/90nginx

EXPOSE 98
STOPSIGNAL SIGTERM
CMD ["/bin/bash", "-c", "/project/start_all.sh"]
