---
title: 🔒⛓ whitelist allowed registries - image-policy-webhook
date: 2023-05-03 23:44:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

## Admission Configuration 이해하기
kubernetes API 서버에 `--enable-admission-plugins` 옵션을 이용하여 활성화 시킬 plugin을 추가하고 해당 플러그인에 대한 설정은 `--admission-control-config-file` 옵션을 통해 전달할 수 있다. 

### ImagePolicyWebhook
imagepolicy를 확인하기 위한 웹훅(admission webhook) 서버를 호출하기 위해 `AdmissionConfiguration` 리소스의 `ImagePolicyWebhook 플러그인`을 설정 한다.  

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: ImagePolicyWebhook
    configuration:
      imagePolicy:
        kubeConfigFile: <path-to-kubeconfig-file>
        allowTTL: 50
        denyTTL: 50
        retryBackoff: 500
        defaultAllow: true
  - name: ImagePolicyWebhook
    path: path-to/imagepolicyconfig.yaml
```

```yaml 
# path-to/imagepolicyconfig.yaml
imagePolicy:
  kubeConfigFile: /path/to/kubeconfig/for/backend
  # time in s to cache approval
  allowTTL: 50
  # time in s to cache denial
  denyTTL: 50
  # time in ms to wait between retries
  retryBackoff: 500
  # determines behavior if the webhook backend fails
  defaultAllow: true
```

| 항목 |  설명  |
|:----:|:-------------------------------|
| kubeConfigFile | admission webhook 서버와 통신하기 위한 kubeconfig 형식의 파일  | 
| defaultAllow | admission webhook서버와 통신이 불가능할 때의 파드를 배포를 허용 할것인지에 대한 설정이다. `true/false` | 



## 기타
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