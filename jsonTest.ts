const  group = {
  "generatedSpeeches": [
    {
        "ucid": "",       // UCID
        "agentId": "",    // 分机 ID
        "order": 1,       // 顺序
        "callNumber": "", // 来电号码
        "text": "",       // 识别结果
        "speechTime": "", // 语音时间 yyyy-MM-dd HH:mm:ss.SSSSSS
        "role": "",       // 声音角色 "agent" 客服, "customer" 客户
        "stage": ""       // 通话阶段 "pickUp" 开始，"talking" 通话中, "hangUp" 
    }
  ],
  "incrementalSpeeches": [
   {
        "ucid": "",       // UCID
        "agentId": "",    // 分机 ID
        "order": 1,       // 顺序
        "callNumber": "", // 来电号码
        "text": "",       // 识别结果
        "speechTime": "", // 语音时间 yyyy-MM-dd HH:mm:ss.SSSSSS
        "role": "",       // 声音角色 "agent" 客服, "customer" 客户
        "stage": ""       // 通话阶段 "pickUp" 开始，"talking" 通话中, "hangUp" 
    }
  ],
  "reminder": [
      {
          "speechTime": "",
          "suggestion": "xxx"          // time为上面 speechTime 的具体时间
      }
      
  ],
  "serverId": "",         // 服务器IP地址
}