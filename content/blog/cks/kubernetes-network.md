---
title: 🔒🔧[CKS] kubernetes network security
date: 2023-05-03 23:50:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---

## network policy
📝 [NetworkPolicy 에디터](https://editor.networkpolicy.io/)를 통해 좀 더 빠르게 네트워크 폴리시를 이해할 수 있다.

NetworkPolicy 타입에는 `**Ingress/Egress**`가 있고 두개를 별도로 혹은 같이 사용할 수 있다.
`Ingress`의 경우 `from`을 통해 규칙을 생성하고 `Egress`의 경우 `to`를 통해 규칙을 생성한다. 
 
### NetworkPolicy Ingress 룰 작성하기 
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:    # 이 규칙을 적용시킬 파드를 선택한다. 
    matchLabels:
      role: db
  #podSelector: {} -> 이 경우 이 규칙이 배포된 네임스페이스의 모든 파드에 적용 된다.
  policyTypes:
    - Ingress
  ingress:
    - from:  # ingress라서 from
        - ipBlock:  # 어떤 아이피 대역을 허용할 것인지
            cidr: 172.17.0.0/16 # 허용할 아이피 대역
            except:
              - 172.17.1.0/24 # 해당 아이피 대역 중 어떤 아이피는 예외하고 허용할지 
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 6379

```

### NetworkPolicy Egress 룰 작성하기 
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Egress
  egress: 
    - to: # egress라서 to
        - ipBlock:
            cidr: 10.0.0.0/24
      ports:
        - protocol: TCP
          port: 5978

```

#### 규칙의 namespaceSelector/ podSelector조합 설명
| 조합 | 설명 | 
|:-------:|:-----------|
| namespaceSelector만 있는 경우 | `조건에 맞는 네임스페이스`에 있는 모든 파드를 허용  |
| podSelector만 있는 경우 | 조건에 맞는 `같은 네임스페이스`에 있는 파드를 허용 | 
| namespaceSelector + podSelector가 같이 있는 경우 | 조건에 맞는 네임스페이스에 있는 파드 중 조건에 맞는 파드를 허용 |  

## ingress
후추 작성