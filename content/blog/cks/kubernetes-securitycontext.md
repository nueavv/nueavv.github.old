---
title: 🔒[CKS] securityContext 설정하기 
date: 2023-05-04 22:18:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

## seccomp 설정하기
securityContext에 설정하면 된다.
/var/lib/kubelet/seccomp/profiles 아래에 프로파일을 넣고 다음과 같이 설정한다.

```yaml
securityContext:
  seccompProfile:
    type: Localhost
    localhostProfile: profiles/profile-allow.json
```

⚠️ 경로가 다르다면
만약 다음과 같은 경로에 프로파일이 있다면 `<kubelet-root-dir>/seccomp/wow/profile-profile.json`
다음과 같이 설정한다.
```yaml
securityContext:
  seccompProfile:
    type: Localhost
    localhostProfile: wow/profile-profile.json
```