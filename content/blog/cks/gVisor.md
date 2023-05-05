---
title: 🔒[CKS] gVisor
date: 2023-05-05 16:16:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

## 컨테이너 런타임 변경하기

### 런타임 클래스 등록
```yaml
apiVersion: node.k8s.io/v1beta1
kind: RuntimeClass
metadata:
  name: gvisor
handler: runsc
```

### 파드 런타임 변경
```yaml
... 생략 
spec:
  runtimeClassName: gvisor # <- 추가 
  containers:
... 생략
```
