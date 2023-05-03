---
title: 🔒[CKS] apparmor
date: 2023-05-02 18:07:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

## apparmor
### enforce vs complain
- 강제(enforce) 모드 : 허용하지 않은 리소스 접근을 차단하는 모드
- 불평(complain) 모드 : 위반한 내용 기록하는 모드


### 프로파일 내용 이해하기
```txt
#include <tunables/global>

profile apparmor-example {
  #include <abstractions/base>

  capability net_admin,
  capability setuid,
  capability setgid,

  mount fstype=proc -> /mnt/proc/**,

  /etc/hosts.allow rw,
  /root/test.sh rwix,
  /root/test_file w,

  network tcp,
}
```


### 프로파일 추가하기 (적용 X, 로드 O)
1. /etc/apparmor.d/ 경로 아래에 프로파일을 하나 생성
2. `apparmor_parser <파일 위치>`로 프로파일 추가 


### 프로파일 로드 된 리스트 확인하기 

```sh
aa-status # apparmor 상태 확인 명령어 
```



### 쿠버네티스에 적용하기

- AppArmor는 컨테이너 별로 지정 된다. 파드의 메타데이터에 annotation으로 추가한다.
- 적용 되면 enfoce 모드로 적용 된다. 

```yaml
container.apparmor.security.beta.kubernetes.io/<container_name>: <profile_ref>
```

container_name: 컨테이너 이름
profile_ref:
  - runtime/default: 런타임 기본 프로파일 적용 
  - localhost/<profile_name>: 호스트에 있는 프로파일 적용
  - unconfined: 적재할 프로파일이 없음


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello-apparmor
  annotations:
    # 쿠버네티스에 'k8s-apparmor-example-deny-write' AppArmor 프로파일을 적용함을 알린다.
    # 잊지 말 것은 쿠버네티스 노드에서 실행 중인 버전이 1.4 이상이 아닌 경우에는 이 설정은 무시된다는 것이다.
    container.apparmor.security.beta.kubernetes.io/hello: localhost/k8s-apparmor-example-deny-write
spec:
  containers:
  - name: hello
    image: busybox:1.28
    command: [ "sh", "-c", "echo 'Hello AppArmor!' && sleep 1h" ]
```

