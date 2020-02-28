import { Layout, Menu, Badge, Icon, Dropdown } from 'antd'
import styles from  './index.less'
import { connect } from 'dva'
import Link from 'umi/link'

const { Header, Footer, Content} = Layout

export default connect(state=>({
  count: state.cart.length,
  cart: state.cart
}))(function(props) {
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

  const menu = (
    <Menu>
      {
        props.cart.map((item, index) => (
          <Menu.Item key={index}>
            {item.name}×{item.count} 
            <span>¥{item.count * item.price}</span>
          </Menu.Item> 
        ))
      }
    </Menu> 
  );
  
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
        <Dropdown overlay={menu} placement="bottomRight">
          <div>
            <Icon type="shopping-cart" style={{fontSize:18}}/> 
            <span>我的购物车</span>
            <Badge count={props.count} offset={[-4,-18]}/>
          </div>
        </Dropdown>
      </Header>
      <Content className = {styles.content}>
        <div className = {styles.box}>
          {props.children}
        </div>
      </Content>
      <Footer className = {styles.footer}>哈哈</Footer>
    </Layout>
  )
})