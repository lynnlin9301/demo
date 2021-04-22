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
        labletext: "Hight",
        lablecolor: "red",
        text: "Cook Eggs Don T Boil",
        clocktext: "Due in 30 min",
      },
      { 
        labletext: "Cook",
        lablecolor: "blue",
        text: "Smarter Food Choices 101 Tips For Busy Women",
        clocktext: "Due in 1 hours",
      }
    ]
  );
  return (
    <div className="column">
    < SideBar />
    < Content
      mapItem={mapItem}
      setMapItem={setMapItem}
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
  let { mapItem, setMapItem } = props; 
  return (
    <div className="column-content">
      < ContentTitle
        mapItem={mapItem}
        setMapItem={setMapItem}
      />
      < ItemList
        mapItem={mapItem}
        setMapItem={setMapItem}
      />
    </div>
  );
}

function ContentTitle(props) {
  let { mapItem, setMapItem } = props; 
  let [addisActive, handleAddClick] = useState(false);
  return (
    <div className="content-nav">
      <div className="content-nav-plus" onClick={() => handleAddClick(addisActive=true)}><img alt="Plus" src={Plus} /></div>
      <div className="content-nav-icon"><img alt="Search" src={Search} /></div>
      <div className="content-nav-icon"><img alt="Bell" src={Bell} /></div>
      < AddItem
        addisActive={addisActive}
        handleAddClick={handleAddClick}
        mapItem={mapItem}
        setMapItem={setMapItem}      
      />
    </div>
  );
  
}

function AddItem(props) {
  let { addisActive, handleAddClick, mapItem, setMapItem } = props;
  let [addItem, setaddItem] = useState({});

  let addSubmit = () => {
    setMapItem([...mapItem, addItem]);
    handleAddClick(addisActive=false)
  }
  
  if (addisActive) {
    return (
      <div className="add-dialog">
        <fieldset>
          <legend>新增数据</legend>
            <div className="dialog-content">
              <div>标签文字</div>
              <input 
                type="text"
                onChange={e =>setaddItem({...addItem, labletext:e.target.value})}
                />
            </div>
            <div className="dialog-content">
              <div>标签颜色</div>
              <select
                onChange={e =>setaddItem({...addItem, lablecolor:e.target.value})}
              >
                <option></option>
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
              onChange={e =>setaddItem({...addItem, text:e.target.value})}
            />
          </div>
          <div className="dialog-content">
            <div>时间</div>
            <div>
              <select
                onChange={e =>setaddItem({...addItem, clocktext:e.target.value})}
              >
                <option></option>
                <option value="Due in 30 min">Due in 30 min</option>
                <option value="Due in 1 hours">Due in 1 hours</option>
                <option value="Due in 2 hours">Due in 2 hours</option>
              </select>
            </div>
          </div>
          <div className="dialog-button">
            <button onClick={() => handleAddClick(addisActive=false)}>取消</button>
            <button onClick={addSubmit} type="submit">提交</button>
          </div>
        </fieldset>
      </div>
    );
  }

  return null;
}

function ItemList(props) {
  let { mapItem, setMapItem } = props;
  // console.log(mapItem);
  return (
    <div className="note">
      <p className="backgroundtext">TODAY</p>
      <p className="note-text">TODAY</p>
      <p className="note-number">6 Tasks</p>
      {
        mapItem.map((item, index) =>(
          <Item
            key={index}
            item={item}
            mapItem={mapItem}
            setMapItem={setMapItem}
            itemIndex={index}
          />
          )
        )
      }
    </div>
  );
}

function Item(props) {
  let { item, mapItem, setMapItem, itemIndex } = props;
  let isDrop;
  let [isActive, handleClick] = useState(false);
  if (isActive) {
    isDrop = <MenuList
      mapItem={mapItem}
      setMapItem={setMapItem}
      itemIndex={itemIndex}
    />
  };

  return (
    <div className="note-list">
      <div className="note-list-icon">
        <img alt="Tick" src={Tick} />
      </div>
        <div className="note-list-border">
          <div className={["note-list-border-"+item.lablecolor]}>
            <div className="note-list-text">
              {item.labletext}
            </div>
          </div>
        </div>
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

function MenuList(props) {
  let { item, mapItem, setMapItem, itemList, setItemList, itemIndex } = props;
  let [changeisActive, handleChangeClick] = useState(false);
  let [deleteisActive, handleDeleteisActive] = useState(false);
  return(
    <div className="note-list-menubutton" >
      <div onClick={() => handleChangeClick(changeisActive=true)}><button>修改</button></div>
      <ChangeItem
        mapItem={mapItem}
        setMapItem={setMapItem}
        changeisActive={changeisActive}
        handleChangeClick={handleChangeClick}
        itemIndex={itemIndex}
      />
      <div onClick={() => handleDeleteisActive(deleteisActive=true)}><button>删除</button></div>
      <DeleteItem
        mapItem={mapItem}
        setMapItem={setMapItem}
        deleteisActive={deleteisActive}
        handleDeleteisActive={handleDeleteisActive}
        itemIndex={itemIndex}
      />
    </div>
  );
}

function ChangeItem(props) {
  let {changeisActive, handleChangeClick, mapItem, setMapItem, itemIndex } = props;
  let item = mapItem[itemIndex];
  let [changeItem, setChangeItem] = useState();

  let changeSubmit = (e) => {
    setMapItem([...mapItem.slice(0, itemIndex), e, ...mapItem.slice(itemIndex+1)]);
    handleChangeClick(changeisActive=false)
  }
  if (changeisActive) {
    return(
      <div className="change-dialog">
        <fieldset>
          <legend>修改数据</legend>
          <div className="dialog-content">
            <div>标签文字</div>
            <input 
              type="text"
              defaultValue={item.labletext}
              onChange={e =>setChangeItem({...changeItem, labletext:e.target.value})}
              />
          </div>
          <div className="dialog-content">
            <div>标签颜色</div>
            <select
              defaultValue={item.lablecolor}
              onChange={e =>setChangeItem({...changeItem, lablecolor:e.target.value})}
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
              defaultValue={item.text}
              onChange={e =>setChangeItem({...changeItem, text:e.target.value})}
            />
          </div>
          <div className="dialog-content">
            <div>时间</div>
            <div>
              <select
                defaultValue={item.clocktext}
                onChange={e =>setChangeItem({...changeItem, clocktext:e.target.value})}
              >
                <option value="Due in 30 min">Due in 30 min</option>
                <option value="Due in 1 hours">Due in 1 hours</option>
                <option value="Due in 2 hours">Due in 2 hours</option>
              </select>
            </div>
          </div>
          <div className="dialog-button">
            <button onClick={() => handleChangeClick(changeisActive=false)}>取消</button>
            <button onClick={() => changeSubmit(changeItem)}>提交</button>
          </div>
        </fieldset>
      </div>
    );
  }

  return null;
}

function DeleteItem(props) {
  let {deleteisActive, handleDeleteisActive, mapItem, setMapItem, itemIndex } = props;

  let delSubmit = (e) => {
     setMapItem(mapItem.filter((item, index) => index !== e));
    handleDeleteisActive(deleteisActive=false)
  };

  if (deleteisActive) {
    return(
      <div className="delete-dialog">
        <fieldset>
        <legend>删除数据</legend>
        <div>数据无法恢复，是否删除?</div>
        <div className="dialog-button">
          <button onClick={() => handleDeleteisActive(deleteisActive=false)}>取消</button>
          <button onClick={() => delSubmit(itemIndex)}>确定</button>
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