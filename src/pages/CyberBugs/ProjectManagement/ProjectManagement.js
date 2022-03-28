import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Space, Avatar, Popover, AutoComplete } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { EditOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { Tag, Divider } from 'antd';
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import { Popconfirm, message } from 'antd';
import { NavLink } from 'react-router-dom';


const confirm = (e) => {
  message.success('Click on Yes')
}

// const data = [
//     {
//       "members": [
//         {
//           "userId": 1171,
//           "name": "Luu Phuc Hung",
//           "avatar": "https://ui-avatars.com/api/?name=Luu Phuc Hung"
//         }
//       ],
//       "creator": {
//         "id": 1171,
//         "name": "Luu Phuc Hung"
//       },
//       "id": 3027,
//       "projectName": "hung",
//       "description": "<p>Hun g la zo dich</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "hung",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 850,
//           "name": "thangtva",
//           "avatar": "https://ui-avatars.com/api/?name=thangtva"
//         },
//         {
//           "userId": 882,
//           "name": "Mr Vũ",
//           "avatar": "https://ui-avatars.com/api/?name=Mr Vũ"
//         }
//       ],
//       "creator": {
//         "id": 1027,
//         "name": "Khải"
//       },
//       "id": 3058,
//       "projectName": "hihihi",
//       "description": "<p>qqqq</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "hihihi",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1171,
//           "name": "Luu Phuc Hung",
//           "avatar": "https://ui-avatars.com/api/?name=Luu Phuc Hung"
//         }
//       ],
//       "creator": {
//         "id": 1171,
//         "name": "Luu Phuc Hung"
//       },
//       "id": 3068,
//       "projectName": "Hungdeptrai",
//       "description": "<p>as</p>",
//       "categoryId": 3,
//       "categoryName": "Dự án di động",
//       "alias": "hungdeptrai",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 827,
//           "name": "Tien Do",
//           "avatar": "https://ui-avatars.com/api/?name=Tien Do"
//         },
//         {
//           "userId": 1075,
//           "name": "Do Thien",
//           "avatar": "https://ui-avatars.com/api/?name=Do Thien"
//         },
//         {
//           "userId": 862,
//           "name": "crystall",
//           "avatar": "https://ui-avatars.com/api/?name=crystall"
//         }
//       ],
//       "creator": {
//         "id": 1061,
//         "name": "thien"
//       },
//       "id": 3071,
//       "projectName": "NewProject",
//       "description": "<p>123</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "newproject",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1178,
//         "name": "rainpew"
//       },
//       "id": 3073,
//       "projectName": "dự án 1",
//       "description": "<p>đffdfd</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "du-an-1",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 972,
//           "name": "Thong",
//           "avatar": "https://ui-avatars.com/api/?name=Thong"
//         }
//       ],
//       "creator": {
//         "id": 972,
//         "name": "Thong"
//       },
//       "id": 3076,
//       "projectName": "ahihi",
//       "description": "<p>ahuhu</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "ahihi",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1171,
//           "name": "Luu Phuc Hung",
//           "avatar": "https://ui-avatars.com/api/?name=Luu Phuc Hung"
//         }
//       ],
//       "creator": {
//         "id": 1171,
//         "name": "Luu Phuc Hung"
//       },
//       "id": 3078,
//       "projectName": "hung1",
//       "description": "<p>hung1</p>",
//       "categoryId": 3,
//       "categoryName": "Dự án di động",
//       "alias": "hung1",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1158,
//           "name": "Harry",
//           "avatar": "https://ui-avatars.com/api/?name=Harry"
//         }
//       ],
//       "creator": {
//         "id": 1186,
//         "name": "gbao"
//       },
//       "id": 3079,
//       "projectName": "Jimrio Ngo",
//       "description": "<p>my project</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "jimrio-ngo",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1186,
//         "name": "gbao"
//       },
//       "id": 3080,
//       "projectName": "new",
//       "description": "<p>Initial asd</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "new",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1171,
//           "name": "Luu Phuc Hung",
//           "avatar": "https://ui-avatars.com/api/?name=Luu Phuc Hung"
//         },
//         {
//           "userId": 1027,
//           "name": "Khải",
//           "avatar": "https://ui-avatars.com/api/?name=Khải"
//         },
//         {
//           "userId": 1055,
//           "name": "kieutrang123",
//           "avatar": "https://ui-avatars.com/api/?name=kieutrang123"
//         }
//       ],
//       "creator": {
//         "id": 1171,
//         "name": "Luu Phuc Hung"
//       },
//       "id": 3082,
//       "projectName": "Task Hung",
//       "description": "<p>1</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "task-hung",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 827,
//           "name": "Tien Do",
//           "avatar": "https://ui-avatars.com/api/?name=Tien Do"
//         },
//         {
//           "userId": 850,
//           "name": "thangtva",
//           "avatar": "https://ui-avatars.com/api/?name=thangtva"
//         },
//         {
//           "userId": 1027,
//           "name": "Khải",
//           "avatar": "https://ui-avatars.com/api/?name=Khải"
//         }
//       ],
//       "creator": {
//         "id": 1145,
//         "name": "NhanhH"
//       },
//       "id": 3084,
//       "projectName": "Dự Án Của Nhanh",
//       "description": "<p>dfdfdfsdf</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "du-an-cua-nhanh",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 827,
//         "name": "Tien Do"
//       },
//       "id": 3085,
//       "projectName": "string",
//       "description": "string",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "string",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 827,
//         "name": "Tien Do"
//       },
//       "id": 3086,
//       "projectName": "DA1",
//       "description": "<p>minhquang done task</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "da1",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1186,
//         "name": "gbao"
//       },
//       "id": 3087,
//       "projectName": "bao",
//       "description": "<p>123</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "bao",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1186,
//         "name": "gbao"
//       },
//       "id": 3088,
//       "projectName": "new1",
//       "description": "<p>123</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "new1",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 886,
//           "name": "phuc demon",
//           "avatar": "https://ui-avatars.com/api/?name=phuc demon"
//         },
//         {
//           "userId": 850,
//           "name": "thangtva",
//           "avatar": "https://ui-avatars.com/api/?name=thangtva"
//         },
//         {
//           "userId": 827,
//           "name": "Tien Do",
//           "avatar": "https://ui-avatars.com/api/?name=Tien Do"
//         },
//         {
//           "userId": 875,
//           "name": "Test127",
//           "avatar": "https://ui-avatars.com/api/?name=Test127"
//         },
//         {
//           "userId": 890,
//           "name": "Tester",
//           "avatar": "https://ui-avatars.com/api/?name=Tester"
//         },
//         {
//           "userId": 892,
//           "name": "andrew",
//           "avatar": "https://ui-avatars.com/api/?name=andrew"
//         },
//         {
//           "userId": 913,
//           "name": "Supper Hoàng",
//           "avatar": "https://ui-avatars.com/api/?name=Supper Hoàng"
//         }
//       ],
//       "creator": {
//         "id": 1027,
//         "name": "Khải"
//       },
//       "id": 3089,
//       "projectName": "Bánh Bao Trứng Cút ",
//       "description": "<p>một ng&agrave;y toẹt vời</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "banh-bao-trung-cut",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 827,
//         "name": "Tien Do"
//       },
//       "id": 3090,
//       "projectName": "dsds",
//       "description": "",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "dsds",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1189,
//         "name": "string"
//       },
//       "id": 3091,
//       "projectName": "newproject999",
//       "description": "<p>newproject999</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "newproject999",
//       "deleted": false
//     }
//   ]




export default function ProjectManagement(props) {
  //Ley du lieu tu reducer ve component
  const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList);

  const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer)

  const [value, setValue] = useState('')

  const searchRef = useRef(null);

  //Su dung useDispatch de goi action
  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  })

  useEffect(() => {
    dispatch({ type: 'GET_LIST_PROJECT_SAGA' })
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
        return item2.id - item1.id
      },
      sortDirections: ['descend'],
      // filters: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim' },
      // ],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      // ellipsis: true,
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text,record,index) => {
          return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      }

      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      // ellipsis: true,
    },
    // {
    //   title: 'description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (text,record,index) =>{
    //       let jsxContent = ReactHtmlParser(text);
    //       return <div key={index}>
    //           {jsxContent}
    //       </div>
    //       // console.log('text',text)
    //       // console.log('record',record)
    //       // console.log('index',index)
    //   }
    //   // sorter: (a, b) => a.age - b.age,
    //   // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    //   // ellipsis: true,
    // },

    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      }
    },
    {
      title: 'creator',
      // dataIndex: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        // console.log('text',text)
        return <Tag color="green">{record.creator?.name}</Tag>
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      }
    },
    {
      title: 'member',
      key: 'member',
      render: (text, record, index) => {
        return <div>
          {record.members?.slice(0, 3).map((member, index) => {
            return (
              <Popover key={index} placement="top" title="member" content={() => {
                return <table className='table'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>avatar</th>
                      <th>name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((item, index) => {
                      return <tr key={index}>
                        <td>{item.userId}</td>
                        <td><img src={item.avatar} width="30" height="30" alt="" /></td>
                        <td>{item.name}</td>
                        <td>
                          <button onClick={()=>{
                              dispatch({
                                type:'REMOVE_USER_PROJECT_API',
                                userProject: {
                                    userId:item.userId,
                                    projectId: record.id
                                }
                              })
                          }} className='btn btn-danger' style={{borderRadius:'50%'}}>X</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              }}>
                <Avatar key={index} src={member.avatar} />
              </Popover>
            )
          })}

          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
          <Popover placement="rightTop" title={'Add user'} content={() => {
            return <AutoComplete

              options={userSearch?.map((user, index) => {
                return { label: user.name, value: user.userId.toString() }
              })}

              value={value}  // set gia tri o nhap la trong

              onChange={(text) => {
                setValue(text)
              }}

              onSelect={(valueSelect, option) => {
                //set giá trị của hộp thoại = option.label
                setValue(option.label)
                //Gọi api gửi về backend
                dispatch({
                  type: 'ADD_USER_PROJECT_API',
                  userProject: {
                    "projectID": record.id,
                    "userID": valueSelect
                  }
                })
              }}

              style={{ width: '100%' }} onSearch={(value) => {
                // console.log('value', value)

                if(searchRef.current) {     //Sử dụng debounce search 
                  clearTimeout(searchRef.current);
                }
                searchRef.current = setTimeout(()=>{
                  dispatch({
                    type: 'GET_USER_API',
                    keyWord: value
                  })
                },300)
              
              }} />
          }} trigger="click">
            <Button shape="circle">+</Button>
          </Popover>
        </div>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <button className='btn mr-2 btn-primary' onClick={() => {
            const action = {
              type: 'OPEN_FORM_EDIT_PROJECT',
              title: 'Edit Project',
              Component: <FormEditProject />
            }
            //dispatch len reducer noi dung drawer
            dispatch(action);
            //dispatch du lieu dong hien tai len reducer
            const actionEditProject = {
              type: 'EDIT_PROJECT',
              projectEditModel: record
            }
            dispatch(actionEditProject)

          }} >
            <FormOutlined style={{ fontSize: 17 }} />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: 'DELETE_PROJECT_SAGA', idProject: record.id })
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className='btn mr-2 btn-danger'>
              <DeleteOutlined style={{ fontSize: 17 }} />
            </button>
          </Popconfirm>
        </Space>
      ),
    },

    //   {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    //     filters: [
    //       { text: 'London', value: 'London' },
    //       { text: 'New York', value: 'New York' },
    //     ],
    //     filteredValue: filteredInfo.address || null,
    //     onFilter: (value, record) => record.address.includes(value),
    //     sorter: (a, b) => a.address.length - b.address.length,
    //     sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    //     ellipsis: true,
    //   },
  ];



  return (
    <div className='container mt-5'>
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
    </div>
  )
}
