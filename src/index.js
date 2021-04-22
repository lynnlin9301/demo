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
        id: 1,
        lable: [{
                  id: 1,
                  text: "Hight",
                  color: "red",
                }],
        text: "Cook Eggs Don T Boil",
        clocktext: "Due in 30 min",
      },
      { 
        id: 2,
        lable: [{
                  id: 1,
                  text: "Medium",
                  color: "grey"
                },
                {
                  id: 2,
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
  let [itemList, setItemList] = useState([]);
  let [newLable, setnewLable] = useState([]);

  // 拿到最大id
  // let maxId = Math.max.apply(Math, mapItem.map(item => {return item.id}));
  console.log(newLable);
  console.log(itemList);
  let addLable = () => {
    setnewLable({...newLable, id: 1});
    // setMapItem({...itemList, lable:newLable})
  }
  let addSubmit = () => {
    // setItemList({...itemList, id: maxId+1})
    setMapItem(...mapItem, itemList);
    handleAddClick(addisActive=false)

  }
  
  if (addisActive) {
    return (
      <div className="add-dialog">
        <fieldset>
          <legend>新增数据</legend>
          <fieldset>
            <legend>新增标签</legend>
            <div className="dialog-content">
              <div>标签文字</div>
              <input 
                type="text"
                onChange={e =>setnewLable({...newLable, text:e.target.value})}
                />
            </div>
            <div className="dialog-content">
              <div>标签颜色</div>
              <select
                onChange={e =>setnewLable({...newLable, color:e.target.value})}
              >
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="grey">grey</option>
                <option value="green">green</option>
              </select>
            </div>
            <div className="dialog-lable">
              <button onClick={addLable} type="submit">提交</button>
            </div>
          </fieldset>
          <div className="dialog-content">
            <div>内容</div>
            <input 
              type="text"
              onChange={e =>setItemList({...itemList, text:e.target.value})}
            />
          </div>
          <div className="dialog-content">
            <div>时间</div>
            <div>
              <select
                onChange={e =>setItemList({...itemList, clocktext:e.target.value})}
              >
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
        mapItem.map((item) =>(
          <Item
            key={item.id}
            item={item}
            mapItem={mapItem}
            setMapItem={setMapItem}
            itemId={item.id}
          />
          )
        )
      }
    </div>
  );

}

function Item(props) {
  let { item, mapItem, setMapItem, itemId } = props;

  // console.log(itemId);
  let isDrop;
  let [isActive, handleClick] = useState(false);
  if (isActive) {
    isDrop = <MenuList
      mapItem={mapItem}
      setMapItem={setMapItem}
      itemId={itemId}
    />
  };

  return (
    <div className="note-list">
      <div className="note-list-icon">
        <img alt="Tick" src={Tick} />
      </div>
      {item.lable.map((lable) =>
        <div className="note-list-border" key={lable.id}>
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

function MenuList(props) {
  let { item, mapItem, setMapItem, itemList, setItemList, itemId } = props;
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
      />
      <div onClick={() => handleDeleteisActive(deleteisActive=true)}><button>删除</button></div>
      <DeleteItem
        mapItem={mapItem}
        setMapItem={setMapItem}
        deleteisActive={deleteisActive}
        handleDeleteisActive={handleDeleteisActive}
        itemId={itemId}
      />
    </div>
  );
}

function ChangeItem(props) {
  let {changeisActive, handleChangeClick, mapItem, setMapItem } = props;
  // 这里 可以用 useEffect 更新数组？
  let changeSubmit = () => {
    const newMapItem = [...mapItem];
    handleChangeClick(changeisActive=false)
  }
  if (changeisActive) {
    return(
      <div className="change-dialog">
        <fieldset>
          <legend>修改数据</legend>
          <fieldset>
            <legend>修改标签</legend>
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
            <div className="dialog-lable">
              <button type="submit">提交</button>
            </div>
          </fieldset>
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
            <button onClick={() => handleChangeClick(changeisActive=false)}>取消</button>
            <button onClick={changeSubmit}>提交</button>
          </div>
        </fieldset>
      </div>
    );
  }

  return null;
}

function DeleteItem(props) {
  let {deleteisActive, handleDeleteisActive, mapItem, setMapItem, itemId } = props;

  let delSubmit = (id) => {
     setMapItem(mapItem.filter(item => item.id !== id));
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
          <button onClick={() => delSubmit(itemId)}>确定</button>
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