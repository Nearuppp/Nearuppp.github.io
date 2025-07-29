---
title: Installing and Using Gluetun Docker VPN Tunnel
excerpt: Step-by-step guide to set up Gluetun as a Docker VPN tunnel, including docker-compose configuration, testing, and connecting other containers.
tags:
  - Docker
  - VPN
  - Gluetun
  - Networking
  - Linux
  - Docker
  - Compose
  - English
category: Technology
---

Installing Gluetun a docker VPN tunnel. 
First make a folder for Gluetun to exist in.
```shell
mkdir gluetun
```

Make a docker compose file
```shell
nano docker-compose.yml
```

```docker compose
  GNU nano 7.2                docker-compose.yml                          
version: "3"
services:
  gluetun:
    image: qmcgaw/gluetun
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    ports:
      - 8888:8888/tcp # HTTP proxy
      - 8388:8388/tcp # Shadowsocks
      - 8388:8388/udp # Shadowsocks
    volumes:
      - /home/matth/Projects/docker/gluetun:/gluetun
    environment:
      - VPN_SERVICE_PROVIDER=nordvpn
      - VPN_TYPE=openvpn
      - OPENVPN_USER=user
      - OPENVPN_PASSWORD=password
      - TZ=Europe/Berlin
```

## Test it 
```shell
sudo docker run --rm --network=container:gluetun alpine:3.18 sh -c "apk add -q curl && curl -s https://ipinfo.io"
```
What this command does :
- `--rm`: Auto-remove the container after running.
- `--network=container:gluetun`: Uses the same network stack as your `gluetun` container.
- `alpine:3.18`: Minimal image.
- `apk add -q curl`: Quietly installs `curl`.
- `curl -s`: Silently gets the IP info from [https://ipinfo.io](https://ipinfo.io).

## Make new container based on the network interface of Gluetun

You have to add "network_mode: "service:gluetun"" to set the new container on the gluetun docker. Make this a docker compose to make it clean and easy to manage.
Example with Qbittorrent :

```docker
version: "3"
services:
  gluetun:
    image: qmcgaw/gluetun
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    volumes:
      - /home/matth/Projects/docker/gluetun:/gluetun
    environment:
      - VPN_SERVICE_PROVIDER=nordvpn
      - VPN_TYPE=openvpn
      - OPENVPN_USER=CkMpmA1WbHXmGQVcdgwLrsAU
      - OPENVPN_PASSWORD=SCyC57KZshtHFyAUmCsuwPTL
      - TZ=Europe/Berlin
    ports:
      - 8080:8080
  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    network_mode: "service:gluetun"  # 🔥 This is the magic line
    depends_on:
      - gluetun
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Berlin
      - WEBUI_PORT=8080
    volumes:
      - /home/matth/Projects/docker/qbittorrent:/config
      - /mnt/mydrive/torrent:/downloads
    restart: unless-stopped

```

And if you are not sure if the vpn work test it !
``` shell
docker exec qbittorrent curl -s https://ifconfig.me
```
If it returns your IP then it is not working.

To access the qbittorrent web page don't forget to open the port 8080 or something else for gluetun so you can access it and assign it inside qbittorrent with WEBUI_PORT=8080.
Next you need to go in the logs to find the temporary password of qbittorrent :
```shell
sudo docker logs qbittorrent 
```

Don't forget to go change it in Settings>WebUI>Authentication


Sources : https://docker-compose.de/en/gluetun/ 