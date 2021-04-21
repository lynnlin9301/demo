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
  let [lable, setLable] = useState([]);
  console.log(itemList);
  let addSubmit = () => {
    setMapItem([...mapItem, itemList]);   
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
              /* 这里有个问题，这里的 lable:[] 的写法，是我根据文档自己写的，
                 但是有一个问题，152行和158行，不能同时加数据。我本意是想，两个数据，加到一个lable 里面的，没想出来写法
                 我尝试了以下搜索：
                 - react 新增复杂数组
                 - react 新增二维数组
                 - react 更新复杂数组
                 都没找到啥比较好的，大佬看看，这个搜索思路对不？
              */
              onChange={e =>setLable({...lable, text:e.target.value})}
              />
          </div>
          <div className="dialog-content">
            <div>标签颜色</div>
            <select
              onChange={e =>setLable({...lable, color:e.target.value})}
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
          />
          )
        )
      }
    </div>
  );
}

function Item(props) {
  let { item, mapItem, setMapItem } = props;
  let isDrop;
  let [isActive, handleClick] = useState(false);

  if (isActive) {
    isDrop = <MenuList
      mapItem={mapItem}
      setMapItem={setMapItem}
    />
  };

  return (
    <div className="note-list">
      <div className="note-list-icon">
        <img alt="Tick" src={Tick} />
      </div>
      {item.lable.map((lable, index) =>
        <div className="note-list-border" key={index}>
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
  let { item, mapItem, setMapItem, itemList, setItemList } = props;
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
  let {deleteisActive, handleDeleteisActive, mapItem, setMapItem } = props;

  /*这个地方本来是用 filter 去筛选，这样以后如果多选删除就比较方便，研究了很久，还是有问题
    我原本的预想是，setMapItem 方法，更新mapItem，filter id, 然后剩下的内容返回。但是 console 的结果，发现 ，mapItem.id 返回的是undefined。这个没想明白。
    这里的数据流，mapItem 应该是传下来了。
    原本的代码内容：
    let delSubmit = () => {
      setMapItem(mapItem.filter(item => item.id !== mapItem.id));
      handleDeleteisActive(deleteisActive=false)
    }
  */
  console.log(mapItem);
  let textid = mapItem.indexOf();
  console.log(textid);

  let delSubmit = (index) => {
    const newMapItem = [...mapItem];
    /* 
      这里的 index 是不受控的。所以删除，稳定删除[0] 的内容。
      我知道在 387行，要这样写，onClick={() => delSubmit(XXX)} ,但是暂时我还不知道 XXX 这个地方，怎么拿到对应的 index 的值
    */
    newMapItem.splice(textid, 1);
    console.log(textid);
    setMapItem(newMapItem);
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
          <button onClick={delSubmit}>确定</button>
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