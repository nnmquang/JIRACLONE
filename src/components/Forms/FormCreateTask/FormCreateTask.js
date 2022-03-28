import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import { Select, Radio, Slider } from 'antd';
import {useSelector,useDispatch,connect} from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs.js/ProjectCyberbugsConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Cyberbugs.js/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/Cyberbugs.js/PriorityConstants';
import { withFormik } from 'formik';
import * as Yup from 'yup';   //import thang nay de bat validate
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/Cyberbugs.js/StatusConstants';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../../redux/constants/Cyberbugs.js/UserConstants';
const { Option } = Select;

const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

function FormCreateTask(props) {

    //Lay du lieu tu redux
    const {arrProject} = useSelector(state=>state.ProjectCyberBugsReducer)

    const {arrTaskType} = useSelector(state=>state.TaskTypeReducer)

    const {arrPriority} = useSelector(state=>state.PriorityReducer)

    const {arrUser} = useSelector(state=>state.UserLoginCyberBugsReducer)

    const {arrStatus} = useSelector(state=>state.StatusReducer)
    console.log(arrStatus)
    //Hàm biến đổi options cho thẻ select
    const userOptions = arrUser.map((item,index)=> {
        // console.log(userSearch)
        return {value:item.userId,label:item.name}
    })
    // console.log(userOptions)
    //Do kết nối với withFormik => component có các props
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      } = props;

    const dispatch = useDispatch();


    const [size, setSize] = React.useState('default');

    const [timeTracking,setTimetracking] = useState({
        timeTrackingSpent:0,
        timeTrackingRemaining:0
    })

    //hook
    useEffect(()=>{
        dispatch({type:GET_ALL_PROJECT_SAGA});
        dispatch({type:GET_ALL_TASK_TYPE_SAGA});
        dispatch({type:GET_ALL_PRIORITY_SAGA});
        dispatch({type:GET_ALL_STATUS_SAGA});
        //Đưa hàm handle submit lên drawer reducer để cập nhật lại sự kiện cho nút submit
        dispatch({type:'SET_SUBMIT_CREATE_TASK',submitFunction:handleSubmit})
        
        dispatch({type:'GET_USER_API',keyWord:''});
    },[])

    // const handleEditorChange = (content, editor) => {

    // }

    // function handleChange(value) {
    //     console.log(`Selected: ${value}`);
    // }

    
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Project</p>
                <select name="projectId" className='form-control' onChange={(e)=>{

                    //dispatch giá trị làm thay đổi arrUser
                    let {value} = e.target;
                    dispatch({
                        type:GET_USER_BY_PROJECT_ID_SAGA,
                        idProject:value
                    }) 

                    //cập nhật giá trị cho project Id
                    setFieldValue('projectId',e.target.value);

                }}>
                    {arrProject.map((project,index)=>{
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                    {/* <option value="54">Project A</option>
                    <option value="55">Project A</option> */}
                </select>
            </div>
            <div className='form-group'>
                <p>Task name</p>
                <input name="taskName" className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <p>Status</p>
                <select name="statusId" className='form-control' onChange={handleChange}>
                    {arrStatus.map((statusItem,index)=>{
                        return <option key={index} value={statusItem.statusId}>{statusItem.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select className='form-control' name="priorityId" onChange={handleChange}>
                            {arrPriority.map((priority,index)=>{
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                            {/* <option>High</option>
                            <option>Low</option> */}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task Type</p>
                        <select className='form-control' name="typeId" onChange={handleChange}>
                            {arrTaskType.map((taskType,index)=>{
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                            {/* <option>New Task</option>
                            <option>Bugs</option> */}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="tags"
                            size={size}
                            options={userOptions}
                            placeholder="Please select"
                            // defaultValue={['a10', 'c12']}
                            optionFilterProp="label"
                            onChange={(values)=>{
                                // console.log(values)
                                setFieldValue('listUserAsign',values)  // ko xet duoc onchange de lay gia tri nhu nhung thang kia, do no la value nen dung setFielvalue cua formik
                            }}
                            onSelect={(value)=>{
                                console.log('value',value)
                                
                            
                            }}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <p>Original estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className='form-control' onChange={handleChange}/>
                            </div>
                        </div>

                    </div>
                    <div className='col-6'>
                        <p>Time tracking</p>
                    <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                    <div className='row'>
                        <div className='col-6 text-left font-weight-bold'>{timeTracking.timeTrackingSpent}h logged</div>
                        <div className='col-6 text-right font-weight-bold'>{timeTracking.timeTrackingRemaining}h remaining</div>
                    </div>
                    <div className='row' style={{marginTop:5}}>
                        <div className='col-6'>
                            <p>Time spent</p>
                            <input type="number" defaultValue={0} min="0" className='form-control' name="timeTrackingSpent" onChange={(e)=>{
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent:e.target.value
                                    });
                                    setFieldValue('timeTrackingSpent',e.target.value)
                            }}/>
                        </div>
                        <div className='col-6'>
                            <p>Time remaining</p>
                            <input type="number" defaultValue={0} min="0" className='form-control' name="timeTrackingRemaining" onChange={(e)=>{
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining:e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining',e.target.value)
                            }}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p>Description</p>
                <Editor
                    name="description"
                    // onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content,editor)=>{
                        setFieldValue('description',content)
                    }}
                />
            </div>
            {/* <button type="submit">submit</button> */}



        </form>
    )
}

//video 30- api /api/Project/createTask
const frmCreateTask = withFormik({
    enableReinitialize:true,  //khi thuoc tinh nay duoc kich len, thi moi lan prop cua redux thay thi lap tuc binding gia tri cua object nay
    mapPropsToValues: (props) => {
        //console.log('propsvalue', props)
        const {arrProject,arrTaskType,arrPriority,arrStatus} = props;
        
        // if(arrProject?.length>0){  //nghiep vu lay use assign lan dau tien video 31 11/02/2022
        //     props.dispatch({type:GET_USER_BY_PROJECT_ID_SAGA,idProject:arrTaskType[0]?.id})
        // }

        
        
        return {
            taskName: '',
            description: '',
            statusId:arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId:arrProject[0]?.id,
            typeId:arrTaskType[0]?.id,
            priorityId:arrPriority[0]?.priorityId,
            listUserAsign: [],
        }
    },
  
    validationSchema: Yup.object().shape({


    }),

    handleChange: (values, { setSubmitting }) => {    //ham nay bi huy bo trong prop nen goi ko duoc, bat buoc phai co ham handlechange moi lay duoc gia tri value        console.log(values);
      
    },
  
    handleSubmit: (values, {props, setSubmitting }) => {
        props.dispatch({type:'CREATE_TASK_SAGA',taskObject:values})
        console.log('taskObject',values)
    },
    displayName: 'createTaskForm',
  })(FormCreateTask);

//   const {arrProject} = useSelector(state=>state.ProjectCyberBugsReducer)
//   const {arrTaskType} = useSelector(state=>state.TaskTypeReducer)
//   const {arrPriority} = useSelector(state=>state.PriorityReducer)
//   const {userSearch} = useSelector(state=>state.UserLoginCyberBugsReducer)
//   const {arrStatus} = useSelector(state=>state.StatusReducer)

  const mapStateToProps = (state) => {
      return {
        arrProject:state.ProjectCyberBugsReducer.arrProject,
        arrTaskType:state.TaskTypeReducer.arrTaskType,
        arrPriority:state.PriorityReducer.arrPriority,
        arrStatus:state.StatusReducer.arrStatus
      }
  }

export default connect(mapStateToProps) (frmCreateTask)