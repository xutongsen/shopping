import React, { Component } from "react";
import { connect } from "dva";
import { TagSelect } from "ant-design-pro";
import { Card, Row, Col, Skeleton, Icon } from "antd";

@connect(
  state => ({
    courses: state.goods.courses,
    tags: state.goods.tags,
    loading: state.loading
  }),
  {
    getList: () => ({
      type: 'goods/getList'
    }),
    addCart: (payload) => ({
      type: 'cart/addCart',
      payload
    })

  }
)
class Goods extends Component {
  constructor(props) {
    super(props);
    // displayCourses为需要显示的商品数组 
    this.state = {
      displayCourses: new Array(8).fill({}) // 填充数组用于骨架屏展示 
    };
  }
  componentWillReceiveProps(props){
    if(props.tags.length){ this.tagSelectChange(props.tags, props.courses)
    } }
  componentDidMount(){
    this.props.getList({foo:'bar'});
  }
  tagSelectChange = (tags, courses = this.props.courses) => {
    // 过滤出要显示的数据
    let displayCourses = tags.flatMap(tag => courses[tag])
    this.setState({ displayCourses });

  };

  addCart = (e, item) => { 
    e.stopPropagation(); 
    this.props.addCart(item);
  };

  render() {
    if (this.props.loading.models.goods) {
      return <div>加载中...</div>
    }
    return (
      <div>
        <TagSelect onChange={this.tagSelectChange}>
          {
            this.props.tags.map(tag => { 
              return (
                <TagSelect.Option key={tag} value={tag}> {tag}
                </TagSelect.Option> 
              );
            })
          }
        </TagSelect>

        <Row type="flex" justify="start">
          {
            this.state.displayCourses.map((item, index) => { 
              return (
                  <Col key={index} style={{ padding: 10 }} span={6}> 
                  {
                    item.name ? (
                      <Card 
                        hoverable 
                        title={item.name} 
                        cover={<img src={"/course/" + item.img} />}
                        extra={
                          <Icon onClick={
                            e => this.addCart(e, item)
                            }
                            type="shopping-cart"
                            style={{ fontSize: 18 }}
                          >
                          </Icon>
                        }
                      >
                        <Card.Meta
                          description={
                            <div>
                              <span>¥{item.price}</span>
                              <span style={{ float: "right" }}>
                                <Icon type="user" /> {item.solded} 
                              </span>
                            </div> 
                          }
                        />
                        <div />
                      </Card>):
                      (
                        <Skeleton active={true} />
                      )
                  }
                  </Col>
              );
            })
          }
        </Row>
      </div>
    );
  }
}
export default Goods;
