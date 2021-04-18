import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './dialog.css';
import Note from './assets/sidebar/note.png';
import Folder from './assets/sidebar/folder.png';
import Upcoming from './assets/sidebar/upcoming.png';
import Avatar from './assets/sidebar/avatar.png';
import timeline from './assets/sidebar/timeline.png';
import Plus from './assets/content/plusicon.png';
import Clock from './assets/content/clock.png';
import Bell from './assets/content/bell.png';
import Search from './assets/content/search.png';
import Tick from './assets/content/tick.png';
import Point from './assets/content/point.png';


/*
项目结构：
NoteBook
  - SideBar
  - Content
    - ContentTitle
      - AddItem
    - ItemList
      - Item 1
        - MenuList
          - ChangeItem
          - DeleteItem
        - MarkItem (这个后面做)
      - Item 2
        ...
      - Item N
*/

function NoteBook() {
  let [mapItem, setMapItem] = useState(
    [
      { 
        lable: [{
                  text: "Hight",
                  color: "red",
                }],
        text: "Cook Eggs Don T Boil",
        clocktext: "Due in 30 min",
      },
      { 
        lable: [{
                  text: "Medium",
                  color: "grey"
                },
                {
                  text: "Cook",
                  color: "blue",
                }],
        text: "Smarter Food Choices 101 Tips For Busy Women",
        clocktext: "Due in 9 hours",
      }
    ]
  );
  return (
    <div className="column">
    < SideBar />
    < Content
      mapItem={mapItem}
    />
    </div>
  );

}

function SideBar() {
  return (
    <div className="column-sidebar">
      <div className='sidebar-nav'>
        <div className="sidebar-nav-icon"><img alt="Upcoming" src={Upcoming} /></div>
        <div className="sidebar-nav-icon"><img alt="Folder" src={Folder} /></div>
        <div className="sidebar-nav-icon"><img alt="timeline" src={timeline} /></div>
        <div className="sidebar-nav-icon"><img alt="Note" src={Note} /></div>
        <div className="sidebar-nav-avatar"><img alt="Avatar" src={Avatar} /></div>
      </div>
    </div>    
  );
}

function Content(props) {
  let { mapItem } = props; 
  return (
    <div className="column-content">
      < ContentTitle />
      < ItemList
        mapItem={mapItem}
      />
    </div>
  );
}

function ContentTitle() {
  let [addisActive, handleAddClick] = useState(false);
  return (
    <div className="content-nav">
      <div className="content-nav-plus" onClick={() => handleAddClick(addisActive=true)}><img alt="Plus" src={Plus} /></div>
      <div className="content-nav-icon"><img alt="Search" src={Search} /></div>
      <div className="content-nav-icon"><img alt="Bell" src={Bell} /></div>
      < AddItem
        addisActive={addisActive}
        handleAddClick={handleAddClick}
      />
    </div>
  );
  
}


function AddItem(props) {
  let { addisActive, handleAddClick } = props;
  if (addisActive) {
    return (
      <div className="add-dialog">
        <fieldset>
          <legend>新增数据</legend>
          <div className="dialog-content">
            <div>标签文字</div>
            <input 
              type="text"
              />
          </div>
          <div className="dialog-content">
            <div>标签颜色</div>
            <select
            >
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="grey">grey</option>
              <option value="green">green</option>
            </select>
          </div>
          <div className="dialog-content">
            <div>内容</div>
            <input 
              type="text"
            />
          </div>
          <div className="dialog-content">
            <div>时间</div>
            <div>
              <select
              >
                <option value="Due in 30 min">Due in 30 min</option>
                <option value="Due in 1 hours">Due in 1 hours</option>
                <option value="Due in 2 hours">Due in 2 hours</option>
              </select>
            </div>
          </div>
          <div className="dialog-button">
            <button onClick={() => handleAddClick(addisActive=false)}>取消</button>
            <button type="submit">提交</button>
          </div>
        </fieldset>
      </div>
    );
  }

  return null;
}

function ItemList(props) {
  let { mapItem } = props; 
  return (
    <div className="note">
      <p className="backgroundtext">TODAY</p>
      <p className="note-text">TODAY</p>
      <p className="note-number">6 Tasks</p>
      {
        mapItem.map((item, index) =>(
          <Item
            key={index.toString()}
            item={item}
            mapItem={mapItem}
          />
          )
        )
      }
    </div>
  );
}

function Item(props) {
  let { item, mapItem } = props;
  let isDrop;
  let [isActive, handleClick] = useState(false);

  if (isActive) {
    isDrop = <MenuList
    />
  };

  return (
    <div className="note-list">
      <div className="note-list-icon">
        <img alt="Tick" src={Tick} />
      </div>
      {item.lable.map((lable, index) =>
        <div className="note-list-border" key={index.toString()}>
          <div className={["note-list-border-"+lable.color]}>
            <div className="note-list-text">
              {lable.text}
            </div>
          </div>
        </div>
      )}
      <div className="note-list-text">
        {item.text}
      </div>
      <div className="note-list-clock">
        <img alt="Clock" src={Clock} />
        <div className="note-list-clocktime">
          {item.clocktext}
        </div>
      </div>
      <div className="note-list-menu" >
        <div onClick={() => handleClick(!isActive)}><img alt="Point" src={Point} /></div>
        {isDrop}
      </div>
    </div>
  );
}

function MenuList() {
  let [changeisActive, handleChangeClick] = useState(false);
  let [deleteisActive, handleDeleteisActive] = useState(false);
  return(
    <div className="note-list-menubutton" >
      <div onClick={() => handleChangeClick(changeisActive=true)}><button>修改</button></div>
      <ChangeItem
        changeisActive={changeisActive}
        handleChangeClick={handleChangeClick}
      />
      <div onClick={() => handleDeleteisActive(deleteisActive=true)}><button>删除</button></div>
      <DeleteItem
        deleteisActive={deleteisActive}
        handleDeleteisActive={handleDeleteisActive}
      />
    </div>
  );
}

function ChangeItem(props) {
  let {changeisActive, handleChangeClick } = props;
  if (changeisActive) {
    return(
      <div className="change-dialog">
        <fieldset>
          <legend>修改数据</legend>
          <div className="dialog-content">
            <div>标签文字</div>
            <input 
              type="text"
              />
          </div>
          <div className="dialog-content">
            <div>标签颜色</div>
            <select >
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="grey">grey</option>
              <option value="green">green</option>
            </select>
          </div>
          <div className="dialog-content">
            <div>内容</div>
            <input type="text" />
          </div>
          <div className="dialog-content">
            <div>时间</div>
            <div>
              <select>
                <option value="Due in 30 min">Due in 30 min</option>
                <option value="Due in 1 hours">Due in 1 hours</option>
                <option value="Due in 2 hours">Due in 2 hours</option>
              </select>
            </div>
          </div>
          <div className="dialog-button">
            <button onClick={() => handleChangeClick(changeisActive=false)}>取消</button>
            <button>提交</button>
          </div>
        </fieldset>
      </div>
    );
  }

  return null;
}

function DeleteItem(props) {
  let {deleteisActive, handleDeleteisActive } = props;
  if (deleteisActive) {
    return(
      <div className="delete-dialog">
        <fieldset>
        <legend>删除数据</legend>
        <div>数据无法恢复，是否删除?</div>
        <div className="dialog-button">
          <button onClick={() => handleDeleteisActive(deleteisActive=false)}>取消</button>
          <button>确定</button>
        </div>
        </fieldset>
      </div>
    );
  }
  
  return null;
}

ReactDOM.render(
  <NoteBook />,
  document.getElementById('root')
);