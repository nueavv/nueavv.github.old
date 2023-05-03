---
title: cis-benchmarks
date: 2023-05-02 20:05:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

## kube-bench 실행하기 

### 특정 버전에 맞춰 실행하기
kube-bench는 kubernetes API나 kubectl, kubelet 실행 파일을 이용하여 쿠버네티스 버전을 확인합니다. 이 값을 덮어 씌우고 싶다면 다음의 명령어를 사용할 수 있습니다.

아래의 2개의 옵션 모두를 한번에 설정하는 경우 에러가 발생합니다.

```sh
# 쿠버네티스 버전 1.13에 맞는 kube-bench 실행하기 
kube-bench --version 1.13

# 특정 CIS Benchmark 버전에 맞게 실행하기
kube-bench --benchmark cis-1.5
```

### 특정 벤치마크 부분에 대해 실행하기
아무런 타겟도 설정 되지 않은 경우 CIS Benchmark 버전에 맞는 타겟이 설정됩니다. 설정파일에 있는 실행중인 컴포넌트를 확인하여 타겟을 설정합니다.

```sh
kube-bench run --targets master,node

kube-bench run --targets master,node,etcd,policies
```


### 특정 확인사항 혹은 그룹 확인 및 스킵하기

```sh
# check 확인
kube-bench --check="1.1.1,1.1.2,1.2.1,1.3.3"
# group 확인
kube-bench --group="1.1"

# 스킵 
# 1.1 group, 1.2.1,1.3.3 check 스킵
kube-bench --skip="1.1,1.2.1,1.3.3" 
```