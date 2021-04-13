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


function Notebook() {
  let [mapItem, setMapItem] = useState(
    [
      {
        lable: [{
                  text: "",
                  color: ""
                }],
        text: "",
        clocktext: ""
      }
    ]
  );

  let [mapList, setMapList] = useState(
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
  let [addisActive, handleAddClick] = useState(false);
  let [changeisActive, handleChangeClick] = useState(false);
  let [alertisActive, handleAlertisActive] = useState(false);

  // 这个地方 del 是一个变量，但是305行，要的是一个函数，所以会报错，暂时没想明白具体怎么改。因为 props 只能传递值下去，如果这里定义为 function 传递下去也是报错的，直接在孙组件里面定义del吗？
  const del = del => {
    let id = del.target.getAttribute("id")
      setMapItem(mapItem.filter(item => item.id !== id));
  };
  const addItem = () => {
    setMapList([...mapList,mapItem]);
    handleAddClick(false);
  }
  // console.log(mapList);

  return (
    <div className="column">
      <div className="column-sidebar">
        <div className='sidebar-nav'>
          <div className="sidebar-nav-icon"><img alt="Upcoming" src={Upcoming} /></div>
          <div className="sidebar-nav-icon"><img alt="Folder" src={Folder} /></div>
          <div className="sidebar-nav-icon"><img alt="timeline" src={timeline} /></div>
          <div className="sidebar-nav-icon"><img alt="Note" src={Note} /></div>
          <div className="sidebar-nav-avatar"><img alt="Avatar" src={Avatar} /></div>
        </div>
      </div>
      <div className="column-content">
        <div className="content-nav">
            <div className="content-nav-plus" onClick={() => handleAddClick(addisActive=true)}><img alt="Plus" src={Plus} /></div>
            <div className="content-nav-icon"><img alt="Search" src={Search} /></div>
            <div className="content-nav-icon"><img alt="Bell" src={Bell} /></div>
        </div>
        <div className="note">
          <p className="backgroundtext">TODAY</p>
          <p className="note-text">TODAY</p>
          <p className="note-number">6 Tasks</p>
          {
            mapList.map((item, index) =>(
              <Item
                key={index.toString()}
                item={item}
                mapItem={mapItem}
                alertisActive={alertisActive}
                handleAlertisActive={handleAlertisActive}
                changeisActive={changeisActive}
                handleChangeClick={handleChangeClick}
              />
              )
            )
          }
        </div>
        {/*这个地方，我暂时分成了2个 dialog ，其实可以写成一个的，后续改改。*/}
        <div style={{display: addisActive ? "block" : "none"}}>
          < AddDialog
            mapItem={mapItem}
            addisActive={addisActive}
            handleAddClick={handleAddClick}
            setMapItem={setMapItem}
            addItem={addItem}

          />
        </div>
        <div style={{display: changeisActive ? "block" : "none"}}>
          < ChangeDialog
            mapItem={mapItem}
            changeisActive={changeisActive}
            handleChangeClick={handleChangeClick}
          />
        </div>
        <div style={{display: alertisActive ? "block" : "none"}}>
          <Alert 
            mapItem={mapItem}
            alertisActive={alertisActive}
            handleAlertisActive={handleAlertisActive}
          />
        </div>
      </div>
    </div>
  );
}

function Item(props) {
  let { item, mapItem, alertisActive, handleAlertisActive, changeisActive, handleChangeClick } = props;
  let isDrop;
  let [isActive, handleClick] = useState(false);

  if (isActive) {
    isDrop = <MenuList 
      alertisActive={alertisActive}
      handleAlertisActive={handleAlertisActive}
      changeisActive={changeisActive}
      handleChangeClick={handleChangeClick}
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
        {/* 这个地方 clock 需要判断逻辑 */}
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
  let { alertisActive, handleAlertisActive, changeisActive, handleChangeClick } = props;
  return(
    <div className="note-list-menubutton" >
      <div onClick={() => handleChangeClick(changeisActive=true)}><button>修改</button></div>
      <div onClick={() => handleAlertisActive(alertisActive=true)}><button>删除</button></div>
    </div>
  );
}

function AddDialog(props) {
  let { mapItem, addisActive, handleAddClick, addItem, setMapItem } = props;
  return(
    <div className="dialog">
      <fieldset>
        <legend>新增数据</legend>
        <div className="dialog-content">
          <div>标签文字</div>
          <input 
            type="text"
            // 这个地方，我不知道怎么写次一级的 lable 里面的数据添加了，我写了2种，都不对。
            // onChange={e => setMapItem({...mapItem, {...lable, text:e.target.value}})}
            />
        </div>
        <div className="dialog-content">
          <div>标签颜色</div>
          <select
            // onChange={e => setMapItem({...mapItem, lable.color:e.target.value})}
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
            onChange={e => setMapItem({...mapItem, text:e.target.value})}
          />
        </div>
        <div className="dialog-content">
          <div>时间</div>
          <div>
            <select
              onChange={e => setMapItem({...mapItem, clocktext:e.target.value})}
            >
              <option value="Due in 30 min">Due in 30 min</option>
              <option value="Due in 1 hours">Due in 1 hours</option>
              <option value="Due in 2 hours">Due in 2 hours</option>
            </select>
          </div>
        </div>
        <div className="dialog-button">
          <button onClick={() => handleAddClick(addisActive=false)}>取消</button>
          <button type="submit" onClick={addItem}>提交</button>
        </div>
      </fieldset>
    </div>
  );
}

function ChangeDialog(props) {
  let { mapItem, changeisActive, handleChangeClick } = props;
  return(
    <div className="dialog">
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

function Alert(props) {
  let { mapItem, del, alertisActive, handleAlertisActive } = props;
  return(
    <div className="dialog-alert" >
      <fieldset>
      <legend>删除数据</legend>
      <div>数据无法恢复，是否删除?</div>
      <div className="dialog-button">
        <button onClick={() => handleAlertisActive(alertisActive=false)}>取消</button>
        {/*这里要的是一个函数，对应上面 61 行代码*/}
        <button onClick={() => del(mapItem)}>确定</button>
      </div>
      </fieldset>
    </div>
  );
}

// 怎么提交表单的简化版 
function Test() {
  const [name, setName, delName] = React.useState({
    firstName: "",
    lastName: ""
  });
  const [nameList, setNameList] = React.useState([
    {
      firstName: "lynn",
      lastName: "lin"
    },
    {
      firstName: "yuanjian",
      lastName: "chang"
    }]);
  const submit = () => {
    setNameList([...nameList,name])
  }

  return (
    <div>
      <input type="text" value={name.firstName} onChange={e =>setName({...name, firstName:e.target.value})} />
      <input type="text" value={name.lastName} onChange={e =>setName({...name, lastName:e.target.value})} />
      <button onClick={submit}>Submit</button>
      {nameList.map(item => <div>{item.firstName}{item.lastName}</div>)}
    </div>
  )
}



ReactDOM.render(
  <Notebook />,
  document.getElementById('root')
);