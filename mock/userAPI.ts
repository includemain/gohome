const users = (params2) =>  new Array(10).fill(1).map((e, index) => {
  params =  params2.query
  return {
      name: '名字名字'+ params.page + index,
      dataIndexName1: '名字名字'+ params.page + index,
      dataIndexName2: '名字名字'+ params.page + index,
      email: '名字名字'+ params.id + index,
      key:  params.page + index,
  }
})


export default {
  'GET /api/v1/user': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users(req),count: 200 },
      // data: { list: [],count: 0 },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
