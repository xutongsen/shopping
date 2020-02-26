import { Layout, Menu } from 'antd'
import styles from  './index.less'
import Link from 'umi/link'

const { Header, Footer, Content} = Layout

export default function(props) {
  let { pathname } = props.location
  let menus = [
    {
      path: '/',
      name: '商品'
    },
    {
      path: '/users',
      name: '用户'
    },
    {
      path: '/about',
      name: '关于'
    },
  ]
  const menusKey = menus.filter( menu => {
    if ( menu.path === '/' ) {
      return menu.path === pathname
    }
    return pathname.startsWith(menu.path)
  }).map(item => {
    return item.path
  })
  console.log(menusKey)
  
  return (
    <Layout>
      <Header className = {styles.header}> 
        <Menu 
          theme = 'dark' 
          mode = 'horizontal' 
          style = {{
            lineHeight: '64px'
          }}
          selectedKeys = {menusKey}
        >
          <Menu.Item key= '/'>
            <Link to = '/'>商品</Link>
          </Menu.Item>
          <Menu.Item key= '/users'>
            <Link to = '/users'>用户</Link>
          </Menu.Item>
          <Menu.Item key= '/about'>
            <Link to = '/about'>关于</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className = {styles.content}>
        <div className = {styles.box}>
          {props.children}
        </div>
      </Content>
      <Footer className = {styles.footer}>哈哈</Footer>
    </Layout>
  )
}