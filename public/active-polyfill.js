// 封装 appendChild 方法，自动处理跨文档操作
(function () {
  const originalAppendChild = Node.prototype.appendChild;

  Node.prototype.appendChild = function (child) {
    try {
      if (this.ownerDocument !== child.ownerDocument) {
        // 如果是跨文档操作，先导入节点
        child = this.ownerDocument.importNode(child, true);
      }
      return originalAppendChild.call(this, child);
    } catch (e) {
      console.error("Error appending child node:", e);
    }
  };
})();


(function () {
  function loadScriptSync(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // false 表示同步
    xhr.send();
    if (xhr.status >= 200 && xhr.status < 300) {
      eval(xhr.responseText); // 执行脚本内容
    } else {
      console.error('Error loading script:', xhr.statusText);
    }
  }

  // 检查是否支持 Shadow DOM
  if (!('attachShadow' in Element.prototype)) {
    loadScriptSync('/seat/webcomponents-lite-min.js');
  }

  // 检查是否支持 ResizeObserver
  if (!('ResizeObserver' in window)) {
    loadScriptSync('/seat/resizeObserver.min.js');
  }
})();
