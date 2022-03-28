import React, { useRef, useState } from 'react'

import {useSpring} from 'react-spring'

import './DemoDragDrop.css'



const defaultValue = [
    {id:1,taskName:'Task 1'},
    {id:2,taskName:'Task 2'},
    {id:3,taskName:'Task 3'},
    {id:4,taskName:'Task 4'},
    {id:5,taskName:'Task 5'},
]



export default function DemoDragDrop(props) {


const [taskList,setTaskList] = useState(defaultValue)
const tagDrag = useRef({})
const tagDragEnter = useRef({});

//Animation
const [propsSpring,set,stio] = useSpring(()=>({from: {bottom:-25}, to:{bottom:0}}))

const handleDragStart = (e,task,index) => {
  console.log('tag',e.target);
  console.log('task',task);
  console.log('index',index);
  //Lưu lại giá trị của ták đang drag
  tagDrag.current = task;
}

const handleDragEnter = (e,taskDragEnter,index) => {

  //Lưu lại giá trị của task được kéo ngang qua
  tagDragEnter.current = {...taskDragEnter}
  
  let taskListUpdate = [...taskList];   //sao chep mảng
  //Lấy ra index thằng đang kéo
  let indexDragTag = taskListUpdate.findIndex(task => task.id === tagDrag.current.id);
  //Lấy ra index thằng bị kéo qua
  let indexDragEnter = taskListUpdate.findIndex(task => task.id === taskDragEnter.id);
  //Biến chứa giá trị thằng đang kéo
  let temp = taskListUpdate[indexDragTag];
  //Lấy giá trị tại vị trí đang kéo gán = thằng kéo qua
  taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
  //Lấy thằng kéo qua gán = đang kéo
  taskListUpdate[indexDragEnter] = temp;

  setTaskList(taskListUpdate);

}

const handleDragOver = (e) => {
  // console.log('targetOver',e.target)
  
}

const handleDragEnd = (e) => {
  // console.log('dragEnd',e.target)
  tagDrag.current = {};
  setTaskList([...taskList])
}

const handleDrop = (e) => {
  // console.log('drag',e.target)
}

  return (
    <div className='container'>
      <div className='text-center display-4'>Task list</div>
        {/* <div className='text-center display-4' onDragOver={handleDragOver}>Task list</div> */}

        <div className='row'>
          <div className='col-2'></div>
        <div className='bg-dark p-5 col-8'>
            {taskList.map((task,index)=>{

              let cssDragTag = task.id === tagDrag.current.id ? 'dragTag' : '';

                return <div
                onDragStart={(e)=>{ handleDragStart(e,task,index) }}
                onDragEnter={(e)=>{handleDragEnter(e,task,index)}}
                onDragEnd={(e)=> {handleDragEnd(e)}}
                // onDragOver={handleDragOver}
                // onDragEnter={handleDragOver}
                // onDragEnd={(e)=>{handleDragEnd(e)}}
                draggable="true" 
                key={index} 
                className={`bg-success text-white m-1 p-3 ${cssDragTag}`}>
                  {task.taskName}</div>
            })}
          </div>
          {/* <div className='col-2 bg-primary' style={{height:500}} 
          // onDragOver={(e)=>{
          //   e.stopPropagation();
          //   e.preventDefault();
          // }} 
          onDrop={(e)=>{handleDrop(e)}}>dsdsds
          </div> */}
        </div>
    </div>
  )
}
