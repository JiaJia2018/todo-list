import React, { Component } from 'react';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import { Checkbox, Button, Input, Row, Col } from 'antd';

const listdata = [
  { id: 0, content: "吃饭", status: false },
  { id: 1, content: "跑步", status: false },
  { id: 2, content: "游泳", status: false },
  { id: 3, content: "看书", status: false },
  { id: 4, content: "睡觉", status: false }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockdata: listdata,
      text: ""
    };
    this.selecteSingel = this.selecteSingel.bind(this);
    this.deleteSingelSelected = this.deleteSingelSelected.bind(this);
    this.SaveInfo = this.SaveInfo.bind(this);
    this.deleteAllSelected = this.deleteAllSelected.bind(this);
  }

  selecteSingel = (item) => (e) => {
    const { mockdata } = this.state;
    const { id } = item;
    mockdata.map((data) => {
      if (data.id === id) {
        data.status = e.target.checked;
      }
      return data;
    })
    this.setState({ mockdata });
  }

  SaveInfo() {
    const { mockdata, text } = this.state;
    const obj = { id: mockdata.length, content: text, status: false }
    mockdata.push(obj);
    this.setState({ mockdata });
  }

  getText = (e) => {
    let { text } = this.state;
    text = e.target.value;
    this.setState({ text });
  }

  deleteSingelSelected = (item) => () => {
    const { mockdata } = this.state;
    const { id } = item;
    mockdata.splice(id, 1);
    this.setState({ mockdata });
  }

  deleteAllSelected() {
    const { mockdata } = this.state;
    const dasd = mockdata.filter((data) => data.status === false)

    this.setState({ mockdata: dasd });
  }


  render() {
    const { mockdata } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">任务便签</h1>
        </header>
        <div className="App-content">
          {
            mockdata.map((item, index) => {
              return (
                <div className="list" style={{ backgroundColor: item.status ? "lightgreen" : "lightyellow" }} key={index} >
                  <div className="listitem" style={{ width: "10%" }}><Checkbox onChange={this.selecteSingel(item)} checked={item.status} value={item.id}></Checkbox></div>
                  <div className="listitem" style={{ width: "60%" }}><p>{item.content}</p></div>
                  <div className="listitem" style={{ width: "20%" }}><Button onClick={this.deleteSingelSelected(item)}>删除</Button></div>
                </div>

              )
            })
          }
          <div className="list"><Button onClick={this.deleteAllSelected}>删除已勾选</Button></div>
          <div className="list"><span>2已完成/4总数</span></div>
        </div>
        <footer className="App-footer">
          <Row>
            <Col span={6}><span>任务</span></Col>
            <Col span={16}><Input placeholder="保存新的任务吧。。。" onChange={this.getText} /></Col>
          </Row>
          <div style={{ marginTop: "10px", float: "right" }}><Button onClick={this.SaveInfo}>保存任务</Button></div>
        </footer>
      </div >
    );
  }
}

export default App;
