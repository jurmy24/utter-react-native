// src/message-history/message-history.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MessageHistoryService {
  private historyFilePath = path.join(__dirname, 'messageHistory.json');

  constructor() {
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
  }
}
