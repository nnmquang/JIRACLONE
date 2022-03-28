import React,{useEffect,useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Switch, useHistory} from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import TodolistRCC from './pages/Todolist/TodolistRCC';
import TodolistRFC from './pages/Todolist/TodolistRFC';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import {useDispatch} from 'react-redux';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import indexCyberBugs from './pages/CyberBugs/ProjectDetail/indexCyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberbugs from './HOC/CyberbugsHOC/DrawerCyberbugs';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import DragAndDropDnD from './pages/DragAndDropDnD/DragAndDropDnD';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(history)
    dispatch({type: 'ADD_HISTORY', history:history})
  }, []);
  


  return (
    <>
      {/* <Header /> */}
      {/* <Modal/> */}
      <LoadingComponent/>
      <DrawerCyberbugs/>
      <Switch>
        {/* <Route exact path='/home' component={Home} /> */}

        <HomeTemplate path="/home" exact Component={Home}/>
        <HomeTemplate exact path='/contact' Component={Contact} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <HomeTemplate exact path='/about' Component={About} />
        <HomeTemplate exact path='/dragdrop' Component={DemoDragDrop} />
        <HomeTemplate exact path='/demodragdropdnd' Component={DragAndDropDnD} />
        <HomeTemplate exact path='/detail/:id' Component={Detail} />
        <HomeTemplate exact path='/profile' Component={Profile} />
        <HomeTemplate exact path='/todolistrcc' Component={TodolistRCC} />
        <HomeTemplate exact path='/todolistrfc' Component={TodolistRFC} />
        <HomeTemplate exact path='/todolistredux' Component={ToDoListRedux} />
        <HomeTemplate exact path='/todolistsaga' Component={BaiTapToDoListSaga} />
        <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal} />
        <CyberbugsTemplate exact path='/cyberbugs' Component={indexCyberBugs} />
        <CyberbugsTemplate exact path='/createProject' Component={CreateProject} />
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={indexCyberBugs} />

        <CyberbugsTemplate exact path='/' Component={ProjectManagement} />
        {/* <Route exact path='/contact' component={Contact} /> */}
        {/* <Route exact path='/about' component={About} /> */}
        {/* <Route exact path='/login' component={Login} /> */}
        {/* <Route exact path='/detail/:id' component={Detail} />
        <Route exact path='/profile' component={Profile} /> */}
        {/* <Route path='*' component={PageNotFound} />  Danh bay ba quay lai home hoac pagenotdefault */}
        {/* <Route path='*' component={Home} />  */}
        {/* <Route exact path='/todolistrcc' component={TodolistRCC} />
        <Route exact path='/todolistrfc' component={TodolistRFC} />
        <Route exact path='/todolistredux' component={ToDoListRedux} />
        <Route exact path='/todolistsaga' component={BaiTapToDoListSaga} />
        <Route exact path='/demohocmodal' component={DemoHOCModal} /> */}



        {/* <HomeTemplate exact path='/' component={Home} /> */}
        
      </Switch>
    </>
  );
}

export default App;
