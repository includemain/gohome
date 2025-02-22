// 柱状图
export const col_opts = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};
const defaultColor = ['#3BA0FF','#36CBCB','#4DCB73','#FE910C','#FAD337','#F5222D','#975FE4','#B25FE4','#E45FC9','#E45F68','#5FE475']
// 饼状图
export const pie_opts = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接访问'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ]
    }
  ]
};
// 圆型图
export const circle_opts = {
  tooltip: {
    trigger: 'item',
    // 动态传入
    formatter: (param) => {
      const {data} = param
      return `${data.name}<br/>市值：${data.zhi}<br/>权重：${data.value}`
    },
    borderWidth: 0,
    padding:14,
    textStyle: {
      color:'#002865',
    }
  },
  // title: {
  //   // text: '圆环图的例子',
  //   // left: 'center',
  //   // top: 'center'
  // },
  series: [
    {
      type: 'pie',
        label: {
            show: false,
            position: 'center'
        },
        data: [
            {
              value: 335,
            name: 'A',
              zhi:"cehsi",
              itemStyle: {
                  color:'#F5222D'
              }
            },
            {
              value: 234,
              name: 'B',
              itemStyle: {
                  color:'#975FE4'
              }
            },
            {
              value: 1548,
              name: 'C',
              itemStyle: {
                  color:'#3BA0FF'
              }
            }
        ],
        radius: ['75%', '100%'],
        animation: false,
        emphasis: {
          scale: false
        }
    }
  ]
};
// 折线图
export const line_opts = {
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150],
      type: 'line'
    }
  ]
};