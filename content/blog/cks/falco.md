---
title: 🔒🔍[CKS] syscall 모니터링 - falco
date: 2023-05-03 23:54:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---


![falco 아키텍처](./images/falco_architecture.png)

## falco 

falco 커널 모듈에 syscall이 먼저 전달 되고 falco는 policy엔진으로 해당 호출을 보내서 유저 영역에 있는 정책 룰을 통해 정해진 결과물을 출력한다.

## falco 설치
[공식 문서 링크](https://falco.org/docs/getting-started/installation/)

- 서비스로 설치하기 
- daemonset으로 설치