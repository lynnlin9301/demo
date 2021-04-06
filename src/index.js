import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
  const [mapItem] = useState(
    [
      { 
        id: 1,
        lable: [{
                  id: 1,
                  text: "Hight",
                  color: "red",
                }],
        text: "Cook Eggs Don T Boil",
        clockactive: true,
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
        clockactive: false,
        clocktext: "Due in 9 hours",
      }
    ]);

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
            <div className="content-nav-plus"><img alt="Plus" src={Plus} /></div>
            <div className="content-nav-icon"><img alt="Search" src={Search} /></div>
            <div className="content-nav-icon"><img alt="Bell" src={Bell} /></div>
        </div>
        <div className="note">
          <p className="backgroundtext">TODAY</p>
          <p className="note-text">TODAY</p>
          <p className="note-number">6 Tasks</p>
          <Item  mapItem={mapItem} />
        </div>
      </div>
    </div>
  );
}

function Item(props) {
  const { mapItem } = props;

  return (
    <div>
    {mapItem.map((item) => (
      <div className="note-list" key={item.id}>
        <div className="note-list-icon">
          <img alt="Tick" src={Tick} />
        </div>
        {item.lable.map((lable) =>
          <div className="note-list-border" key={lable.id}>
            <button className={["note-list-border-"+lable.color]}>
              <div className="note-list-text">
                {lable.text}
              </div>
            </button>
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
        <div className="note-list-icon">
          <img alt="Point" src={Point} />
        </div>
      </div>
    ))}
    </div>
  );
}

ReactDOM.render(
  <Notebook />,
  document.getElementById('root')
);