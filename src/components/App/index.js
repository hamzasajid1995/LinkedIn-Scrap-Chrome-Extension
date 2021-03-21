/* global chrome */

import React from "react";
import { Component } from "react";

class index extends Component {
  constructor() {
    super();
    this.state = { details: {} };
  }

  handleClick = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, ([activeTab]) => {
      chrome.tabs.sendMessage(activeTab.id, { message: "start" });
      chrome.tabs.executeScript(
        activeTab.id,
        {
          code:
            `(` +
            function query() {
              let executedQueries = {};
              const queries = {
                name: "ul.pv-top-card--list li.inline.t-24.t-black.t-normal.break-words",
                title: "h2.mt1.t-18.t-black.t-normal.break-words",
                location: "li.t-16.t-black.t-normal.inline-block",
              };
              for (let i in queries) {
                try {
                  executedQueries[i] = document.querySelector(queries[i]).innerText;
                } catch (error) {
                  executedQueries[i] = "error: " + JSON.stringify(error) + " query: " + queries[i];
                }
              }
              return executedQueries;
            } +
            `)()`,
        },
        (result) => {
          this.setState({ details: result[0] });
        }
      );
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Scrap</button>
        <ul>
          {Object.keys(this.state.details).map((item, index) => (
            <li key={index}>
              <b>{item}</b>
              {": "}
              <b>{this.state.details[item]}</b>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default index;
