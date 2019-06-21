import React, { Component } from 'react'

import {Card, Table, Button, Icon,Modal,message} from 'antd'


import LinkButton from '../../component/link-button'

import {reqCategorys}from '../../api/index.js'
import UpdateForm from './update-form'
import AddForm from './add-form'
import {reqUpdateCategory} from '../../api/index'
import {reqAddCategory} from '../../api/index'

  


export default class Category extends Component {
    state={
        parentId:'0',
        categorys: [], // 一级分类数组
        subCategorys:[],//二级分类数组
        loading:false,
        parentName: '', // 当前分类列表的父分类名称
        showStatus: 0, // 0: 都不显示, 1: 修改, 2: 添加
    }

// 获取一级分类
    getCategorys= async () =>{
        const {parentId}= this.state
        this.setState({loading: true })
        const result = await reqCategorys(parentId)
        this.setState({loading:false})
            if(result.status === 0){
                const categorys = result.data
               
                if(parentId === '0'){
                    this.setState({
                        categorys
                       
                    })

                }else{
                    this.setState({
                        subCategorys:categorys
                })
            }
                
        }
        
    }
    // 获取二级分类
    showSubCategorys = (category) => {
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            this.getCategorys()
        })
        
    }




    initColumns = () =>{
        this.columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              
            },
           
            {
              title: '操作',
              width:300,
              render: (category)=>{
                return (
                <span>
                    <LinkButton  onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                    {
                this.state.parentId === '0' && <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
              }
                </span>
                )
              }
            },
        ];
    }
    //返回一级列表
    showCategorys = () => {
        this.setState({
          parentId: '0',
          parentName: '',
          subCategorys: [],

        })
      }
//显示更新的界面
      showUpdate = category => {
        // 保存cateogory
        this.category = category
        // 更新状态
        this.setState({
          showStatus: 1
        })
      }
    
//更新分类
updateCategory = () => {
    // 进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) { // 只有验证通过才继续
        // 隐藏修改界面
        this.setState({
          showStatus: 0
        })

        // 得到输入的分类名称
        const categoryName = this.form.getFieldValue('categoryName')
        // 重置输入数据
        this.form.resetFields()
        // 得到分类的_id
        const categoryId = this.category._id

        // console.log('发更新请求', categoryName, categoryId)
        const result = await reqUpdateCategory({ categoryId, categoryName })
        if (result.status===0) {
          message.success('更新分类成功')
          this.getCategorys()
        }
      }
    })
  }
// 添加分类
addCategory  = async () => {
  this.form.validateFields(async (err, values) => {
    if (!err) { // 只有验证通过才继续
      this.setState({
        showStatus: 0
      })
      // 获取输入的数据
      const { categoryName, parentId } = this.form.getFieldsValue()
      // 重置输入数据
      this.form.resetFields()

      // 请求添加
      const result = await reqAddCategory(categoryName, parentId)

      // 提示成功, 并显示最新的列表
      if (result.status===0) {
        message.success('添加分类成功')
        // 1. 添加的是一级分类
        if (parentId==='0') {
          this.getCategorys('0')
        // 2. 添加当前二级分类
        } else if (parentId === this.state.parentId) {
          this.getCategorys()
        }
      }
    }
  }) 
}



    componentWillMount () {
        this.initColumns()
        }

    componentDidMount(){
        this.getCategorys()
        }

    render() {
        
        const {categorys,loading,parentId,subCategorys,parentName,showStatus}=this.state
        
        const category = this.category || {}

        
        
        const title = parentId==='0' ? '一级分类列表' : (
            <span>
              <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
              <Icon type="arrow-right"></Icon>&nbsp;&nbsp;
              <span>{parentName}</span>
            </span>
            )
        const  extra=(
            <Button type="primary" onClick={() => this.setState({ showStatus: 2 })}>
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        return (        
        <Card title={title} extra={extra}>
             <Table
             
                rowKey='_id'
                columns={this.columns}
                dataSource={parentId==='0'?categorys:subCategorys}
                bordered
                loading={loading}
                pagination={{defaultPageSize:4, showQuickJumper:true}}
            />,
            <Modal
                title="更新分类"
                visible={showStatus===1}
                onOk={this.updateCategory}
                onCancel={ ()=>{this.setState({ showStatus: 0 })}}
                >
               <UpdateForm categoryName={category.name} setForm={(form) => this.form = form}/>
            </Modal>
            <Modal
          title="添加分类"
          visible={showStatus===2}
          onOk={this.addCategory}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ showStatus: 0 })
          }}
        >
          <AddForm categorys={categorys} parentId={parentId} setForm={(form) => this.form = form}/>
        </Modal>
        </Card>
        )
    }
}
