import React, { Component } from 'react'


import LinkButton from '../../component/link-button'

import {PAGE_SIZE} from '../../utils/constants'

import {
    Card,
    Input,
    Icon,
    Button,
    Select,
    Table,
} from 'antd'

const Option=Select.Option

export default class ProductHome extends Component {
    state = {
      loading: false,
    }

    render() {
      const { loading, products, total, searchType, searchName } = this.state
        const title = (
            <span>
              <Select 
                // value='1' 
                // onChange={value => this.setState({ searchType: value})} 
                style={{ width: 150 }}
              >
                <Option value="2">按名称搜索</Option>
                <Option value="2">按描述搜索</Option>
              </Select>
              <Input 
                placeholder="关键字" 
                style={{ margin: '0 15px', width: 150 }} 
                // value={searchName}
                // onChange={event => this.setState({ searchName: event.target.value })} 
                ></Input>
              <Button type="primary">搜索</Button>
            </span>
          )
      
          const extra = (
            <Button type="primary">
              <Icon type="plus" />
              添加商品
            </Button>
          )
      
        return (
            <Card title={title}  extra={extra}>
              <Table
                  bordered
                  rowKey="_id"
                  loading={loading}
                  columns={this.columns}
                  dataSource={products}
                  pagination={{ 
                  // defaultPageSize: PAGE_SIZE, 
                  showQuickJumper: true, 
                  total,
            // 监视页码改变的监听
            // onChange: (pageNum) => {this.getProducts(pageNum)}
                onChange: this.getProducts
          }}
        />
            </Card>
        )
    }
}
