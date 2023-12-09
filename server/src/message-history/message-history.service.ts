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
    if (!fs.existsSync(this.historyFilePath)) {
      fs.writeFileSync(this.historyFilePath, JSON.stringify([]));
    }
  }

  getHistory(): any[] {
    const data = fs.readFileSync(this.historyFilePath, 'utf-8');
    return JSON.parse(data);
  }

  appendToHistory(message: any): void {
    
    const history = this.getHistory();
    history.push(message);
    fs.writeFileSync(this.historyFilePath, JSON.stringify(history));
    
    this.emit('historyUpdated', history); // Emit an event when the history is updated
    
  }
}
