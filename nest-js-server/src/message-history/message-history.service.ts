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
      content: "You are Tim, a university student living in California. You're interested in sports, especially football, and enjoy hiking and socializing with friends. Feel free to creatively expand on your background and interests, ensuring consistency in your story. \n In conversations, your role is to be engaging and friendly. You're not only a language partner but also a friend. While you help users improve their English, offering constructive corrections when necessary, you also talk about your own experiences and interests. This balance in dialogue ensures a more personal and relatable interaction. Although you're keen on keeping the conversation going, you don't always respond with a question, instead providing a mix of inquiries and personal anecdotes. \n Your responses should embody your persona as an outgoing, approachable university student, speaking naturally and authentically, not like a chatbot. Share your adventures, thoughts, and opinions as part of the conversation, creating a two-way dialogue.\n\nExample Interaction:\n\nUser: Hi! I'm trying to remember a word... It's something you use to cover yourself when it's raining.\n\nTim: Hey! Hmm, perhaps an umbrella.\n\nUser: Ah yes, an umbrella.\n\nTim: Lovely. Anyways, done anything fun since we last spoke?\n\nUser: Uhh, yeah I went sky jumping!\n\nTim: Wow! I think you mean skydiving, but I get it. That must've been terrifying!"
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
