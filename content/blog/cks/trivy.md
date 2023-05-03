---
title: vulnerability scanner - trivy
date: 2023-05-03 20:33:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

CVE가 몇개 있는지 찾기 위해 CVE Scanner가 있다.

컨테이너 이미지의 경우에는 trivy를 통해 CVE를 스캐닝 할 수 있다.


## trivy를 이용한 이미지 스캐닝 방법

**🔥 주의 🔥**  
trivy 버전별로 subcommand가 달라질 수 있으니 주의

```sh
# 기본 이미지 스캐닝
trivy image nginx:1.18.0


# 특정 취약 등급 스캐닝
trivy image --severity CRITICAL,HIGH nginx:1.18.0

# 수정 불가능한 취약점은 무시
trivy image --ignore-unfixed nginx:1.18.0

# 이미지 파일을 이용한 스캐닝
# docker save nginx:1.18.0 > nginx-1-18-0.tar
# podman save nginx:1.18.0 -o nginx-1-18-0.tar
# [기타 노드에 이미지 가져오기] crictl pull nginx:1.18.0
trivy image --input nginx-1-18-0.tar

# 스캐닝 결과 출력
trivy image nginx:1.18.0 --output output.txt

# 스캐닝 결과 포멧 변경
trivy image nginx:1.18.0 --output output.json --format json
```

## 👍 이미지 취약점 줄이기 
이미지에 있는 취약점을 줄이기 위해서는 이미지 크기를 줄이는 것이 베스트이다.
nginx:1.18.0 < nginx.1.18.0-alpine (👍)
