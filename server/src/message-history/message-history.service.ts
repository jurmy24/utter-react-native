// src/message-history/message-history.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';

@Injectable()
export class MessageHistoryService extends EventEmitter {
  private historiesFilePath = path.join(__dirname, 'histories.json');

  // Define default prompts for different chatbots
  private defaultPrompts = {
    'english-chatbot': {
      role: "system",
      content: "I am a university student called Tim and I'm interested in sports. I live in California and I enjoy hikes, playing football, and hanging out with friends. I can make up the rest of my background. I'm friendly, interested in talking about yourself, and learning about the user. I correct mistakes constructively and speak naturally."
    },
    'french-chatbot': {
      role: "system",
      content: "Je suis Claire, ta partenaire linguistique française. En plus de partager ma passion pour la culture française, je suis aussi ici pour t'aider à améliorer ton français. J'habite à Nice et j'aime discuter de tout, de la cuisine à la politique. Mon approche reste informelle et amicale, utilisant un langage détendu et le tutoiement pour créer une ambiance conviviale. Je corrigerai tes fautes de français de manière constructive et encourageante, tout en adaptant mon aide à ton niveau de langue. Je partagerai des expressions authentiques et des anecdotes culturelles, et si j'ai besoin de clarifications, je poserai des questions de manière décontractée."
    }
  };

  constructor() {
    super();
    if (!fs.existsSync(this.historiesFilePath)) {
      fs.writeFileSync(this.historiesFilePath, JSON.stringify({}));
    }
  }

  getHistory(deviceId: string, chatbotId: string): any[] {
    const histories = JSON.parse(fs.readFileSync(this.historiesFilePath, 'utf-8'));
    const historyKey = `${deviceId}-${chatbotId}`;

    // Inject default system prompt if the history for this device-chatbot pair doesn't exist
    if (!histories[historyKey]) {
      histories[historyKey] = [this.defaultPrompts[chatbotId] || this.defaultPrompts['english-chatbot']];
      fs.writeFileSync(this.historiesFilePath, JSON.stringify(histories));
    }

    return histories[historyKey];
  }

  appendToHistory(deviceId: string, chatbotId: string, message: any): void {
    const histories = JSON.parse(fs.readFileSync(this.historiesFilePath, 'utf-8'));
    const historyKey = `${deviceId}-${chatbotId}`;

    // Inject default system prompt if the history for this device-chatbot pair doesn't exist
    if (!histories[historyKey]) {
      histories[historyKey] = [this.defaultPrompts[chatbotId] || this.defaultPrompts['english-chatbot']];
      fs.writeFileSync(this.historiesFilePath, JSON.stringify(histories));
    }

    histories[historyKey] = histories[historyKey] || [];
    histories[historyKey].push(message);

    fs.writeFileSync(this.historiesFilePath, JSON.stringify(histories));
    this.emit('historyUpdated', { deviceId, chatbotId, history: histories[historyKey] });
  }
}
