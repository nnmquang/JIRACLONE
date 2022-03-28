import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/Cyberbugs.js/TaskContant';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function ContentMain(props) {

    const { projectDetail } = props;
    const dispatch = useDispatch();
    const handleDragEnd = (result) => {
        // console.log(result)
        let {projectId,taskId} = JSON.parse(result.draggableId); //Lấy ra chuỗi sau mỗi lần draggable
        let {source,destination} = result;
        if(!result.destination) {
            return;
        }
        if(source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        //gọi API cập nhật lại status
        dispatch({
            type:UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: {
                "taskId": taskId,
                "statusId": destination.droppableId,
                "projectId": projectId
            }
        })
    }


    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                projectDetail.lstTask?.map((taskListDetail, index) => {
                    return <Droppable key={index} droppableId={taskListDetail.statusId}>
                        {(provided) => {
                            return <div
                            ref={provided.innerRef}
                                {...provided.droppableProps}

                             key={index} className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
                                <div className="card-header">
                                    {taskListDetail.statusName}
                                </div>
                                <ul 
                                
                                key ={index} className="list-group list-group-flush" style={{height:'100%'}}>
                                    {taskListDetail.lstTaskDeTail.map((task, index) => {
                                        return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({projectId:task.projectId,taskId:task.taskId})}>
                                            {(provided) => {
                                                return <div 
                                                ref = {provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal"  onClick={() => {
                                                    dispatch({ type: GET_TASK_DETAIL_SAGA, taskId: task.taskId })
                                                }}>
                                                    <p>
                                                        {task.taskName}
                                                    </p>
                                                    <div className="block" style={{ display: 'flex' }}>
                                                        <div className="block-left">
                                                            <p className='text-danger'>{task.priorityTask.priority}</p>
                                                            {/* <i className="fa fa-bookmark" />
                                               <i className="fa fa-arrow-up" /> */}
                                                        </div>
                                                        <div className="block-right">
                                                            <div className="avatar-group" style={{ display: 'flex' }}>
                                                                {task.assigness.map((mem, index) => {
                                                                    return <div className="avatar" key={index}>
                                                                        <img src={mem.avatar} alt="mem.avartar" />
                                                                    </div>
                                                                })}
                                                                {/* <div className="avatar">
                                                       <img src={require('../../../assets/img/download (1).jfif')} alt="1" />
                                                   </div>
                                                   <div className="avatar">
                                                       <img src={require('../../../assets/img/download (2).jfif')} alt="2" />
                                                   </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }}
                                        </Draggable>
                                    })}
                                </ul>
                                {provided.placeholder}
                            </div>
                        }}

                    </Droppable>
                })}
        </DragDropContext>
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}

        </div>
    )
}




{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    BACKLOG 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-bookmark" />
                                <i className="fa fa-arrow-up" />
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar">
                                        <img src={require('../../../assets/img/download (1).jfif')} alt = "1" />
                                    </div>
                                    <div className="avatar">
                                        <img src={require('../../../assets/img/download (2).jfif')} alt = "2"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-check-square" />
                                <i className="fa fa-arrow-up" />
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar">
                                        <img src={require('../../../assets/img/download (1).jfif')} alt = "1" />
                                    </div>
                                    <div className="avatar">
                                        <img src={require('../../../assets/img/download (2).jfif')} alt = "2"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div> */}
{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
    SELECTED FOR DEVELOPMENT 2
</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
    IN PROGRESS 2
</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
    DONE 3
</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */}



  {/* <li className="list-group-item">
                            <p>
                                Each issue has a single reporter but can have multiple
                                assignees
                            </p>
                            <div className="block" style={{ display: 'flex' }}>
                                <div className="block-left">
                                    <i className="fa fa-check-square" />
                                    <i className="fa fa-arrow-up" />
                                </div>
                                <div className="block-right">
                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                        <div className="avatar">
                                            <img src={require('../../../assets/img/download (1).jfif')} alt="1" />
                                        </div>
                                        <div className="avatar">
                                            <img src={require('../../../assets/img/download (2).jfif')} alt="2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">Vestibulum at eros</li> */}


                        