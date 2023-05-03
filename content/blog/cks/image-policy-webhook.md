---
title: whitelist allowed registries - image-policy-webhook
date: 2023-05-03 21:00:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

### 👍 프라이빗 레지스트리

프라이빗 레지스트리에 있는 이미지를 사용하는것이 보안상 좋다.

<table>
<tr>
<td> 순서 </td> <td> 명령어 </td>
</tr>
<tr>
<td>

private 레지스트리

계정 정보 시크릿 추가 

</td>

<td>

```sh
kubectl create secret docker-registry <name> \
    --docker-username=<username> \ 
    --docker-password=<password> \ 
    --docker-server=<server>
```

</td>
</tr>
<tr>
<td>
private 레지스트리

계정 정보 주입

</td>
<td>

** 😊 파드에 직접 추가 ** 

```yaml
... 생략
spec:
  containers:
    - name: foo
      image: myprivateregistry/myaccount/awesomeapp:v1
  imagePullSecrets:
    - name: myregistrykey # <- 추가
```

** 😋 서비스어카운트에 추가 **

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  ... 생략
imagePullSecrets:
  - name: myregistrykey # <- 추가 
```

</td>
</tr>

