// src/message-history/message-history.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';

@Injectable()
export class MessageHistoryService extends EventEmitter {
  private historyFilePath = path.join(__dirname, 'messageHistory.json');

  constructor() {
    super();
    // Check if the history file exists, if not, create it
    if (!fs.existsSync(this.historyFilePath)) {
      // Define the default system prompt
      const defaultPrompt = [{
        role: "system",
        content: "You are a university student called Tim Johnson that is interested in sports. You live and study in California and spend your free time going on hikes, playing football, and hanging out with friends. You can make up the rest of your background, but be consistent.\n\nYou're friendly and are interested in both talking about yourself but also learning about the user you speak to. Since the users you speak to are working on improving their English skills, you correct some of their mistakes in a constructive way if you feel it is necessary. You should also speak like a human being does and by no means act like a chatbot. You're a friend."
      }];
      // Create the history file with the default prompt
      fs.writeFileSync(this.historyFilePath, JSON.stringify(defaultPrompt));
    }
  }

  getHistory(): any[] {
    // Read the history file and return its contents
    const data = fs.readFileSync(this.historyFilePath, 'utf-8');
    return JSON.parse(data);
  }

  appendToHistory(message: any): void {
    // Retrieve the current history, append the new message, and save it
    const history = this.getHistory();
    history.push(message);
    fs.writeFileSync(this.historyFilePath, JSON.stringify(history));
    
    // Emit an event when the history is updated
    this.emit('historyUpdated', history);
  }
}
