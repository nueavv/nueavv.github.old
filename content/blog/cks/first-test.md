---
title: 🔥[CKS] 따끈따근 🔥🔥 시험 후기 
date: 2023-05-05 23:56:00
category: cks
thumbnail: { thumbnailSrc }
draft: false
---
## 🥲
시험이 비싸서 그런가.. 휴가까지 써가면서 공부한게 속상..

## 😱 시험 후기 
문제 수는 16개였고 2문제를 시간이 부족/ 지식 부족으로 인해 풀지 못했음

1. ciper-suites 설정하는 거였는데 다시 잘 찾아봐도 잘 설정 했는데 문제를 제대로 못읽은건지 api 서버가 계속 뜨질 못했음 > api서버가 안뜰때 디버깅 하는 법을 찾아놔야 할 것 같음
2. falco 직접 컨디션 작성하기 falco에 대해서는 대충 이해를 했지만 문제에서 원하는 조건을 직접 만들기에는 부족했던 것 같음.
3. networkpolicy 설정할 때 잘못 알고 있던 점이 `namespaceSelector + podSelector` 합친 버전은 배열 형식으로 작성하는 버전이 아니라는 것을 알게 됨. 그리고 matchLabels 뿐만 아니라 matchExpression도 사용가능..
    <table>
    <tr><td> 잘못 알고 있었던 버전 </td><td> 정답 </td>
    <tr><td>
    
    ```yaml
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
    ```
    
    </td>
    <td>
    
    ```yaml
        - namespaceSelector:
            matchLabels:
              project: myproject
          podSelector:
            matchLabels:
              role: frontend
    ```

    </td>
    </tr>
    </table>

  어떤 네임스페에서든 해당 되는 파드 라벨이 있는 경우 트래픽을 허용하고 싶다면 다음과 같이 하는게 맞는 듯..
  ```yaml
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              role: frontend
  ```
4. auditing 관련해서도 제대로 설정할 줄 알았다고 생각했는데 operations에 대한 설정은 어떻게 하는지 몰라서 대충 때려맞춤
5. authorization에서도 webhook은 한번도 본적이 없었는데.. 추가 공부가 필요해보임 [링크](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#authorization-modules) [webhook 모드 설정](https://kubernetes.io/docs/reference/access-authn-authz/webhook/)