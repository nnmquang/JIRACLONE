import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function InfoMain(props) {

    const {projectDetail} = props

    const renderAvatar = () => {
        return projectDetail.members?.map((user,index)=>{
            return <div key={index} className="avatar">
            <img src={user.avatar} alt={user.avatar} />
        </div>
        })
    }


    return (
        <>
        <h3>{projectDetail.projectName}</h3>
        <section>
            {ReactHtmlParser(projectDetail.description)}
        </section>
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderAvatar()}
                {/* <div className="avatar">
                    <img src={require('../../../assets/img/download (1).jfif')} alt="download (1).jfif" />
                </div>
                <div className="avatar">
                <img src={require('../../../assets/img/download (2).jfif')} alt="download (2).jfif" />
                </div>
                <div className="avatar">
                <img src={require('../../../assets/img/download (3).jfif')} alt="download (3).jfif" />
                </div> */}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
        </>
    )
}
