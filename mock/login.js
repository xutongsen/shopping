export default {
  'post /api/login': (req, res) => {
    const {userName, password} = req.body
    if (userName === 'xutongsen' && password === '123') {
      return res.json({
        code: 0,
        data: {
          userName,
          tole: 'admin',
          balance: 1000,
          token: 'sdfdfsdfsdf'
        }
      })
    }
  return res.status(401).json({
    code: '-1',
    msg: '密码错误'
  })
  }
}