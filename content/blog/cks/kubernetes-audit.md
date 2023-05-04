---
title: 🔒🔍[CKS] 모니터링 - audit
date: 2023-05-04 20:27:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

# audit 설정
- 📍 이벤트를 파일 시스템에 기록 (로그 백엔드)
- 이벤트를 외부 HTTP API로 전달 (webhook 백엔드)

## 로그백엔드 설정하기
```yaml
# Log all requests at the Metadata level.
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: Metadata
```

### 언제 로그를 남길 것인가 
`omitStages`에 어떤 단계의 요청을 생략할 것인지 추가 가능하다.

| 단계 | 설명 | 
|:---:|:----|
| RequestReceived | 요청을 받은 직후, 실제 처리가 되기 전 | 
| ResponseStarted | 응답 헤더는 전송되었지만, 응답 본문(body)은 전송되기 전인 단계. 이 단계는 오래 실행되는 요청(예: watch)에 대해서만 생성 | 
| ResponseComplete | 응답 완료 되었으며, 더이상 바이트 전송이 되지 않음 |
| Panic | 패닉 발생 했을 때 생성되는 이벤트 |

### 룰 작성하기 

🔥**주의** 1개 이상의 룰이 있어야 함

#### 감사 레벨
| 레벨 | 설명 | 
|:---:|:----|
| None | 이 규칙에 해당되는 이벤트는 로깅하지 않는다. | 
| Metadata | 요청 메타데이터(요청하는 사용자, 타임스탬프, 리소스, 동사(verb) 등)는 로깅하지만 요청/응답 본문은 로깅하지 않는다. | 
| Request | 이벤트 메타데이터 및 요청 본문을 로깅하지만 응답 본문은 로깅하지 않는다. 리소스 외의 요청에는 적용되지 않는다. |
| RequestResponse | 이벤트 메타데이터 및 요청/응답 본문을 로깅한다. 리소스 외의 요청에는 적용되지 않는다. |


#### 로그 백엔드 적용
```yaml
...
    --audit-policy-file=/etc/kubernetes/audit-policy.yaml # policy 위치 전달
    --audit-log-path=/var/log/kubernetes/audit/audit.log # 어디에 로그를 남길지 작성
    --audit-log-maxage=10 # 10일까지만 보관
    --audit-log-maxbackup=10 # 최대 10개의 파일만 보관
    --audit-log-maxsize=10 # 로테이트 되기 전 최대 크기는 10MB
...
volumeMounts:
  - mountPath: /etc/kubernetes/audit-policy.yaml
    name: audit
    readOnly: true
  - mountPath: /var/log/kubernetes/audit/
    name: audit-log
    readOnly: false
...
volumes:
- name: audit
  hostPath:
    path: /etc/kubernetes/audit-policy.yaml
    type: File

- name: audit-log
  hostPath:
    path: /var/log/kubernetes/audit/
    type: DirectoryOrCreate
```
